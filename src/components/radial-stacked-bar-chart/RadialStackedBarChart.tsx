import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import {
  type RadialStackedBarChartProps,
  type RadialStackedBarBarInfo,
  type RadialStackedBarSeries,
  DEFAULT_RADIAL_STACKED_BAR_CHART_TRANSLATION,
} from "./RadialStackedBarChart.types";
import type { RadialStackedBarData } from "./RadialStackedBarChart.types";

// ── helpers ──────────────────────────────────────────────────────────────────

function formatNumber(
  value: number,
  decimals = 0,
  decimalSep = ".",
  thousandSep = ",",
): string {
  const fixed = value.toFixed(Math.max(0, decimals));
  const [intPart, decPart] = fixed.split(".");
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);
  return decPart ? `${withThousands}${decimalSep}${decPart}` : withThousands;
}

function defaultGridFormatter(value: number): string {
  if (Math.abs(value) >= 1e9) return `${(value / 1e9).toFixed(1).replace(/\.0$/, "")}B`;
  if (Math.abs(value) >= 1e6) return `${(value / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
  if (Math.abs(value) >= 1e3) return `${(value / 1e3).toFixed(1).replace(/\.0$/, "")}k`;
  return String(value);
}

function normalizeSeries(keys: RadialStackedBarSeries[] | string[]): RadialStackedBarSeries[] {
  return keys.map((k) => (typeof k === "string" ? { key: k, label: k } : k));
}

// ── tooltip content ───────────────────────────────────────────────────────────

type TooltipTitleProps = {
  barData:        RadialStackedBarData;
  seriesKey:      string;
  seriesLabel:    string;
  decimals:       number;
  decimalSep:     string;
  thousandSep:    string;
  valueFormatter?: (value: number, seriesKey: string) => string;
};

function TooltipTitle({ barData, seriesKey, seriesLabel, decimals, decimalSep, thousandSep, valueFormatter }: TooltipTitleProps) {
  const segValue = barData.values[seriesKey] ?? 0;
  const total    = d3.sum(Object.values(barData.values));
  const pct      = total > 0 ? Math.round((segValue / total) * 1000) / 10 : 0;
  const fmt      = (v: number, key: string) =>
    valueFormatter ? valueFormatter(v, key) : formatNumber(v, decimals, decimalSep, thousandSep);

  return (
    <Box sx={{ py: 0.25 }}>
      <Typography variant="caption" sx={{ fontWeight: "bold", display: "block" }}>
        {barData.label}
      </Typography>
      <Typography variant="caption" sx={{ display: "block", opacity: 0.85 }}>
        {seriesLabel}: {fmt(segValue, seriesKey)}
      </Typography>
      <Typography variant="caption" sx={{ display: "block", opacity: 0.65, mt: 0.25 }}>
        {pct}% · Total: {fmt(total, "")}
      </Typography>
    </Box>
  );
}

// ── component ─────────────────────────────────────────────────────────────────

export function RadialStackedBarChart({
  data,
  keys,
  size = 500,
  innerRadius,
  barPadding = 0.12,
  chartColors,
  colorConfig,
  showLabels = true,
  showGridLines = true,
  gridLineCount = 3,
  showGridValues = true,
  showLegend = true,
  sortBy = "none",
  valueDecimalCount = 0,
  valueDecimalSeparator = ".",
  valueThousandsSeparator = ",",
  valueFormatter,
  gridValueFormatter,
  zoomable = false,
  onBarClick,
  disabled = false,
  translation,
}: RadialStackedBarChartProps) {
  const theme  = useTheme();
  const t      = { ...DEFAULT_RADIAL_STACKED_BAR_CHART_TRANSLATION, ...translation };
  const series = useMemo(() => normalizeSeries(keys), [keys]);
  const seriesKeys = useMemo(() => series.map((s) => s.key), [series]);

  const isEmpty = data.length === 0 || series.length === 0;

  // ── layout constants ──────────────────────────────────────────────────────
  const labelGap    = 8;
  const labelFontSz = 11;
  // Reserve space for outer labels and the top grid-value label
  const outerMargin = showLabels ? labelGap + labelFontSz * 5 : 16;
  const outerR      = size / 2 - outerMargin;
  const innerR      = innerRadius != null
    ? Math.max(0, Math.min(innerRadius, outerR - 1))
    : Math.round(size * 0.18);

  // ── colour palette ────────────────────────────────────────────────────────
  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
    "#8e24aa",
    "#00897b",
    "#f06292",
    "#a1887f",
  ];
  const palette = chartColors && chartColors.length > 0 ? chartColors : defaultColors;

  const colorFor = useCallback(
    (key: string, idx: number): string => {
      const override = colorConfig?.[key];
      if (override?.fill) return override.fill;
      return palette[idx % palette.length];
    },
    [colorConfig, palette],
  );

  // ── sorted data ───────────────────────────────────────────────────────────
  const sortedData = useMemo(() => {
    if (sortBy === "value") {
      return [...data].sort(
        (a, b) =>
          d3.sum(seriesKeys, (k) => b.values[k] ?? 0) -
          d3.sum(seriesKeys, (k) => a.values[k] ?? 0),
      );
    }
    if (sortBy === "label") {
      return [...data].sort((a, b) =>
        a.label.localeCompare(b.label, undefined, { numeric: true, sensitivity: "base" }),
      );
    }
    return data;
  }, [data, sortBy, seriesKeys]);

  // ── scales ────────────────────────────────────────────────────────────────
  const maxTotal = useMemo(
    () => d3.max(sortedData, (d) => d3.sum(seriesKeys, (k) => d.values[k] ?? 0)) ?? 0,
    [sortedData, seriesKeys],
  );

  const xScale = useMemo(
    () =>
      d3
        .scaleBand<string>()
        .domain(sortedData.map((d) => d.id))
        .range([0, 2 * Math.PI])
        .padding(barPadding),
    [sortedData, barPadding],
  );

  const yScale = useMemo(
    () => d3.scaleLinear().domain([0, maxTotal]).range([innerR, outerR]),
    [innerR, outerR, maxTotal],
  );

  // ── stacked layers ────────────────────────────────────────────────────────
  const layers = useMemo(() => {
    if (isEmpty) return [];
    const stacker = d3
      .stack<RadialStackedBarData>()
      .keys(seriesKeys)
      .value((d, k) => d.values[k] ?? 0)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);
    return stacker(sortedData);
  }, [isEmpty, sortedData, seriesKeys]);

  // ── arc generator ─────────────────────────────────────────────────────────
  const arcGen = useMemo(
    () =>
      d3
        .arc<{ x0: number; x1: number; y0: number; y1: number }>()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .innerRadius((d) => d.y0)
        .outerRadius((d) => d.y1)
        .padAngle(0.008)
        .padRadius(innerR + 10),
    [innerR],
  );

  // ── grid tick values ──────────────────────────────────────────────────────
  const gridTicks = useMemo(
    () => (maxTotal > 0 ? d3.ticks(0, maxTotal, gridLineCount).filter((v) => v > 0) : []),
    [maxTotal, gridLineCount],
  );

  const fmt = gridValueFormatter ?? defaultGridFormatter;

  // ── viewBox zoom ──────────────────────────────────────────────────────────
  const [zoomScale, setZoomScale] = useState(1);
  const contentRef = useRef<SVGGElement>(null);
  const [baseViewBox, setBaseViewBox] = useState(
    `-${size / 2} -${size / 2} ${size} ${size}`,
  );

  const viewBox = useMemo(() => {
    if (zoomScale === 1) return baseViewBox;
    const [x, y, w, h] = baseViewBox.split(" ").map(Number);
    const nw = w / zoomScale;
    const nh = h / zoomScale;
    return `${x + (w - nw) / 2} ${y + (h - nh) / 2} ${nw} ${nh}`;
  }, [baseViewBox, zoomScale]);

  useLayoutEffect(() => {
    const g = contentRef.current;
    if (!g) return;
    const id = requestAnimationFrame(() => {
      try {
        const box = g.getBBox();
        const pad = 4;
        setBaseViewBox(
          `${box.x - pad} ${box.y - pad} ${box.width + 2 * pad} ${box.height + 2 * pad}`,
        );
      } catch {
        setBaseViewBox(`-${size / 2} -${size / 2} ${size} ${size}`);
      }
    });
    return () => cancelAnimationFrame(id);
  }, [size, data, keys, innerR, outerR, showLabels, showGridLines]);

  useLayoutEffect(() => {
    if (disabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomScale(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [disabled]);

  const handleWheel = useCallback(
    (e: React.WheelEvent<SVGSVGElement>) => {
      if (!zoomable || disabled || !e.ctrlKey) return;
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      setZoomScale((prev) => Math.max(0.25, Math.min(8, prev * factor)));
    },
    [zoomable, disabled],
  );

  // ── legend geometry ───────────────────────────────────────────────────────
  const legendSwatchSize = 10;
  const legendLineHeight = 16;
  const legendFontSize   = 9;
  const legendGap        = 5; // px between swatch and text

  const legendTotalH = series.length * legendLineHeight;
  const legendY0     = -legendTotalH / 2;

  // Max text width that fits inside inner circle (diameter − swatch − gap − side padding)
  const legendMaxTextPx = Math.max(0, innerR * 2 - legendSwatchSize - legendGap - 10);
  // Estimated character width at fontSize 9 (~0.57 em)
  const estCharW = legendFontSize * 0.57;
  // Actual legend text column width based on longest label, clamped to available space
  const legendMaxLabelLen = series.reduce(
    (m, s) => Math.max(m, (s.label ?? s.key).length),
    0,
  );
  const legendTextWidth = Math.min(legendMaxLabelLen * estCharW, legendMaxTextPx);
  // Total legend width → used to center the whole group around x=0
  const legendTotalW  = legendSwatchSize + legendGap + legendTextWidth;
  const legendOffsetX = -(legendTotalW / 2);
  // Max chars per label before we truncate with "…"
  const legendMaxChars = Math.max(1, Math.floor(legendMaxTextPx / estCharW));

  const truncateLegendLabel = (label: string) =>
    label.length <= legendMaxChars ? label : `${label.slice(0, legendMaxChars - 1)}…`;

  // ── shared tooltip props ──────────────────────────────────────────────────
  const tooltipProps = {
    followCursor:    true,
    enterDelay:      50,
    enterNextDelay:  0,
    disableHoverListener: disabled,
    slotProps: { tooltip: { sx: { maxWidth: 240 } } },
  } as const;

  const textColor  = theme.palette.text.primary;
  const gridColor  = theme.palette.divider;
  const fontFamily = theme.typography.fontFamily;

  return (
    <Box
      style={{ opacity: disabled ? 0.5 : 1 }}
      sx={{
        display:    "inline-flex",
        cursor:     disabled ? "not-allowed" : "default",
        userSelect: "none",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        onWheel={handleWheel}
        style={{
          fontFamily: fontFamily ?? "sans-serif",
          overflow:   zoomable && zoomScale > 1 ? "hidden" : "visible",
        }}
        role="img"
        aria-label="Radial stacked bar chart"
      >
        <g ref={contentRef}>
          {/* ── empty state ─────────────────────────────────────────── */}
          {isEmpty && (
            <text
              textAnchor="middle"
              dy="0.35em"
              fontSize={13}
              fill={theme.palette.text.secondary}
            >
              {t.noData}
            </text>
          )}

          {!isEmpty && (
            <>
              {/* ── grid rings ────────────────────────────────────────── */}
              {showGridLines && gridTicks.map((tick) => (
                <circle
                  key={`grid-${tick}`}
                  r={yScale(tick)}
                  fill="none"
                  stroke={gridColor}
                  strokeWidth={0.5}
                  strokeDasharray="3 2"
                />
              ))}

              {/* innermost ring (base line) */}
              {showGridLines && (
                <circle
                  r={innerR}
                  fill="none"
                  stroke={gridColor}
                  strokeWidth={0.75}
                />
              )}

              {/* ── grid value labels ─────────────────────────────────── */}
              {showGridLines && showGridValues && gridTicks.map((tick) => (
                <text
                  key={`gv-${tick}`}
                  x={0}
                  y={-yScale(tick)}
                  textAnchor="middle"
                  dy="-3"
                  fontSize={9}
                  fill={theme.palette.text.secondary}
                  pointerEvents="none"
                >
                  {fmt(tick)}
                </text>
              ))}

              {/* ── stacked bar segments ───────────────────────────────── */}
              {layers.map((layer, layerIdx) => {
                const seriesKey   = layer.key;
                const seriesLabel = series[layerIdx]?.label ?? seriesKey;
                const fill        = colorFor(seriesKey, layerIdx);

                return layer.map((cell, cellIdx) => {
                  const barDatum  = cell.data;
                  const θ0        = xScale(barDatum.id) ?? 0;
                  const θ1        = θ0 + xScale.bandwidth();
                  const r0        = yScale(cell[0]);
                  const r1        = yScale(cell[1]);
                  // skip zero-height segments
                  if (r1 - r0 < 0.5) return null;
                  const d         = arcGen({ x0: θ0, x1: θ1, y0: r0, y1: r1 }) ?? "";

                  return (
                    <Tooltip
                      key={`${seriesKey}-${cellIdx}`}
                      {...tooltipProps}
                      placement="top"
                      title={
                        <TooltipTitle
                          barData={barDatum}
                          seriesKey={seriesKey}
                          seriesLabel={seriesLabel}
                          decimals={valueDecimalCount}
                          decimalSep={valueDecimalSeparator}
                          thousandSep={valueThousandsSeparator}
                          valueFormatter={valueFormatter}
                        />
                      }
                    >
                      <path
                        d={d}
                        fill={fill}
                        style={{
                          cursor:     disabled ? "not-allowed" : "pointer",
                          transition: "opacity 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          if (!disabled) (e.currentTarget as SVGPathElement).style.opacity = "0.75";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as SVGPathElement).style.opacity = "1";
                        }}
                        onClick={(e) => {
                          if (disabled) return;
                          const total = d3.sum(seriesKeys, (k) => barDatum.values[k] ?? 0);
                          const info: RadialStackedBarBarInfo = {
                            id:        barDatum.id,
                            label:     barDatum.label,
                            seriesKey,
                            value:     barDatum.values[seriesKey] ?? 0,
                            total,
                            values:    barDatum.values,
                          };
                          onBarClick?.(info, e);
                        }}
                      />
                    </Tooltip>
                  );
                });
              })}

              {/* ── outer bar labels ──────────────────────────────────── */}
              {showLabels && sortedData.map((barDatum) => {
                const θMid = (xScale(barDatum.id) ?? 0) + xScale.bandwidth() / 2;
                const r    = outerR + labelGap;
                const x    = r * Math.sin(θMid);
                const y    = -r * Math.cos(θMid);
                // rotate so text reads outward
                const deg  = (θMid * 180) / Math.PI;
                const rot  = deg < 180 ? deg - 90 : deg + 90;

                return (
                  <text
                    key={`lbl-${barDatum.id}`}
                    x={x}
                    y={y}
                    transform={`rotate(${rot},${x},${y})`}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={labelFontSz}
                    fill={textColor}
                    pointerEvents="none"
                  >
                    {barDatum.label}
                  </text>
                );
              })}

              {/* ── center legend ─────────────────────────────────────── */}
              {showLegend && (
                <g pointerEvents="none" transform={`translate(${legendOffsetX},0)`}>
                  {series.map((s, idx) => {
                    const fill  = colorFor(s.key, idx);
                    const y     = legendY0 + idx * legendLineHeight;
                    const label = truncateLegendLabel(s.label ?? s.key);
                    return (
                      <g key={`leg-${s.key}`} transform={`translate(0,${y})`}>
                        <rect
                          x={0}
                          y={0}
                          width={legendSwatchSize}
                          height={legendSwatchSize}
                          fill={fill}
                          rx={2}
                        />
                        <text
                          x={legendSwatchSize + legendGap}
                          y={legendSwatchSize / 2}
                          dominantBaseline="central"
                          fontSize={legendFontSize}
                          fill={textColor}
                        >
                          {label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}
            </>
          )}
        </g>
      </svg>
    </Box>
  );
}

RadialStackedBarChart.displayName = "RadialStackedBarChart";
