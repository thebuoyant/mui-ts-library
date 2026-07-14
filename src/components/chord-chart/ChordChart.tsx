import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import {
  type ChordChartProps,
  type ChordGroupInfo,
  type ChordInfo,
  DEFAULT_CHORD_CHART_TRANSLATION,
} from "./ChordChart.types";

function formatNumber(
  value: number,
  decimals = 0,
  decSep = ".",
  thouSep = ",",
): string {
  if (!isFinite(value)) return String(value);
  const fixed = value.toFixed(Math.max(0, decimals));
  const [intPart, decPart] = fixed.split(".");
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thouSep);
  return decPart ? `${withThousands}${decSep}${decPart}` : withThousands;
}

// ── Tooltip content ────────────────────────────────────────────────────────

type GroupTooltipTitleProps = {
  name:     string;
  valueOut: number;
  valueIn:  number;
  fmt:      (n: number) => string;
};

function GroupTooltipTitle({ name, valueOut, valueIn, fmt }: GroupTooltipTitleProps) {
  return (
    <Box sx={{ py: 0.25 }}>
      <Typography variant="caption" sx={{ fontWeight: "bold", display: "block" }}>
        {name}
      </Typography>
      <Typography variant="caption" sx={{ display: "block", opacity: 0.85 }}>
        {fmt(valueOut)} outgoing →
      </Typography>
      <Typography variant="caption" sx={{ display: "block", opacity: 0.85 }}>
        {fmt(valueIn)} incoming ←
      </Typography>
    </Box>
  );
}

type ChordTooltipTitleProps = {
  sourceName: string;
  targetName: string;
  sourceValue: number;
  targetValue: number;
  directed:   boolean;
  fmt:        (n: number) => string;
};

function ChordTooltipTitle({ sourceName, targetName, sourceValue, targetValue, directed, fmt }: ChordTooltipTitleProps) {
  return (
    <Box sx={{ py: 0.25 }}>
      <Typography variant="caption" sx={{ fontWeight: "bold", display: "block" }}>
        {sourceName} → {targetName}
      </Typography>
      <Typography variant="caption" sx={{ display: "block", opacity: 0.85 }}>
        {fmt(sourceValue)}
      </Typography>
      {directed && targetValue > 0 && targetValue !== sourceValue && (
        <Typography variant="caption" sx={{ display: "block", opacity: 0.7, mt: 0.25 }}>
          {targetName} → {sourceName}: {fmt(targetValue)}
        </Typography>
      )}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function ChordChart({
  data,
  size = 500,
  innerRadius,
  ringThickness = 20,
  padAngle,
  ribbonPadAngle,
  sortSubgroups = "descending",
  sortChords = "descending",
  chartColors,
  groupColorConfigs,
  showGroupLabels = true,
  labelOffset = 8,
  ribbonOpacity = 0.75,
  ribbonBlendMode,
  directed = true,
  valueDecimalCount = 0,
  valueDecimalSeparator = ".",
  valueThousandsSeparator = ",",
  valueFormatter,
  onGroupClick,
  onGroupHover,
  onChordClick,
  onChordHover,
  zoomable = false,
  disabled = false,
  translation,
}: ChordChartProps) {
  const theme = useTheme();
  const t = { ...DEFAULT_CHORD_CHART_TRANSLATION, ...translation };
  const isEmpty = data.length === 0;
  const resolvedBlendMode = ribbonBlendMode ?? (theme.palette.mode === "dark" ? "normal" : "multiply");

  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.success.main,
    theme.palette.info.main,
  ];
  const palette = chartColors && chartColors.length > 0 ? chartColors : defaultColors;

  const computedInner = innerRadius ?? Math.min(size, size) * 0.5 - 90;
  const radiusInner = Math.max(10, computedInner);
  const radiusOuter = radiusInner + Math.max(1, ringThickness);
  const chordPadAngle = padAngle ?? 10 / radiusInner;
  const ribbonPad    = ribbonPadAngle ?? 1 / radiusInner;

  const fmt = useCallback(
    (n: number) => valueFormatter ? valueFormatter(n) : formatNumber(n, valueDecimalCount, valueDecimalSeparator, valueThousandsSeparator),
    [valueFormatter, valueDecimalCount, valueDecimalSeparator, valueThousandsSeparator],
  );

  // ── matrix from link list ───────────────────────────────────────────────
  const { names, matrix } = useMemo(() => {
    const ns = d3.sort(
      d3.union(
        data.map((l) => l.source),
        data.map((l) => l.target),
      ),
    );
    const idx = new Map<string, number>(ns.map((n, i) => [n, i]));
    const mat = Array.from({ length: ns.length }, () => new Array<number>(ns.length).fill(0));
    for (const { source, target, value } of data) {
      const s = idx.get(source);
      const t = idx.get(target);
      if (s == null || t == null) continue;
      mat[s][t] += value;
    }
    return { names: ns, matrix: mat };
  }, [data]);

  // ── chord layout ────────────────────────────────────────────────────────
  type D3Chords = ReturnType<ReturnType<typeof d3.chord>>;
  type D3ChordGroup = D3Chords["groups"][number];
  type D3Chord = D3Chords[number];

  const chords: D3Chords = useMemo(() => {
    const base = directed ? d3.chordDirected() : d3.chord();
    let layout = base.padAngle(chordPadAngle);
    if (sortSubgroups === "ascending")  layout = layout.sortSubgroups(d3.ascending);
    if (sortSubgroups === "descending") layout = layout.sortSubgroups(d3.descending);
    if (sortChords    === "ascending")  layout = layout.sortChords(d3.ascending);
    if (sortChords    === "descending") layout = layout.sortChords(d3.descending);
    return layout(matrix) as D3Chords;
  }, [matrix, chordPadAngle, directed, sortSubgroups, sortChords]);

  // ── generators ──────────────────────────────────────────────────────────
  const arc = useMemo(
    () => d3.arc<D3ChordGroup>().innerRadius(radiusInner).outerRadius(radiusOuter),
    [radiusInner, radiusOuter],
  );

  const ribbonGen = useMemo(
    () => (directed ? d3.ribbonArrow() : d3.ribbon()).radius(radiusInner - 1).padAngle(ribbonPad),
    [radiusInner, ribbonPad, directed],
  );

  const ribbonPath = useCallback(
    (chord: D3Chord): string => {
      const datum = {
        source: { startAngle: chord.source.startAngle, endAngle: chord.source.endAngle, radius: radiusInner - 1 },
        target: { startAngle: chord.target.startAngle, endAngle: chord.target.endAngle, radius: radiusInner - 1 },
      };
      return (ribbonGen as unknown as (d: typeof datum) => string | null)(datum) ?? "";
    },
    [ribbonGen, radiusInner],
  );

  // ── color scale — groupColorConfigs override takes priority ──────────────
  const colorScale = useMemo(
    () =>
      d3
        .scaleOrdinal<number, string>()
        .domain(d3.range(names.length))
        .range(palette.length >= names.length
          ? palette
          : [...Array(Math.ceil(names.length / palette.length))].flatMap(() => palette).slice(0, names.length)
        ),
    [palette, names.length],
  );

  const groupFill = useCallback(
    (index: number): string =>
      groupColorConfigs?.[names[index]]?.fill ?? colorScale(index),
    [groupColorConfigs, names, colorScale],
  );

  // ── viewBox auto-fit + zoom ──────────────────────────────────────────────
  const contentRef = useRef<SVGGElement>(null);
  const [baseViewBox, setBaseViewBox] = useState(`-${size / 2} -${size / 2} ${size} ${size}`);
  const [zoomScale,   setZoomScale]   = useState(1);

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
        const pad = 8;
        setBaseViewBox(`${box.x - pad} ${box.y - pad} ${box.width + 2 * pad} ${box.height + 2 * pad}`);
      } catch {
        setBaseViewBox(`-${size / 2} -${size / 2} ${size} ${size}`);
      }
    });
    return () => cancelAnimationFrame(id);
  }, [size, radiusInner, radiusOuter, names.length, chords]);

  // ── hover state (dims unrelated ribbons) ────────────────────────────────
  const [hoverGroup, setHoverGroup] = useState<number | null>(null);

  // ── serializers ─────────────────────────────────────────────────────────
  // d3.chordDirected() emits one Chord PER direction (source.value and
  // target.value both equal that single flow amount) — checking only the
  // source side per group was already correct there. d3.chord() (undirected)
  // instead emits one Chord per unordered PAIR representing the COMBINED
  // bidirectional flow: source.value = matrix[source.index][target.index]
  // (flow i→j), target.value = matrix[target.index][source.index] (flow j→i)
  // — see d3-chord's ChordSubgroup docs. A group can be on EITHER side of such
  // a merged chord, so undirected mode must check both sides (additively, not
  // else-if, since a self-loop chord — index i === j — can match both).
  const serializeGroup = useCallback(
    (group: D3ChordGroup): ChordGroupInfo => ({
      name:  names[group.index],
      index: group.index,
      valueOut: d3.sum(chords, (c) =>
        (c.source.index === group.index ? c.source.value : 0) +
        (!directed && c.target.index === group.index ? c.target.value : 0),
      ),
      valueIn: d3.sum(chords, (c) =>
        (c.target.index === group.index ? c.source.value : 0) +
        (!directed && c.source.index === group.index ? c.target.value : 0),
      ),
    }),
    [names, chords, directed],
  );

  const serializeChord = useCallback(
    (chord: D3Chord): ChordInfo => ({
      source: { name: names[chord.source.index], index: chord.source.index, value: chord.source.value },
      target: { name: names[chord.target.index], index: chord.target.index, value: chord.target.value },
    }),
    [names],
  );

  // ── label transform ─────────────────────────────────────────────────────
  const labelTransform = (group: D3ChordGroup): string => {
    const angle   = (group.startAngle + group.endAngle) / 2;
    const rotateDeg = (angle * 180) / Math.PI - 90;
    const flip    = angle > Math.PI ? " rotate(180)" : "";
    return `rotate(${rotateDeg}) translate(${radiusOuter + labelOffset})${flip}`;
  };

  const textAnchor = (group: D3ChordGroup) =>
    (group.startAngle + group.endAngle) / 2 > Math.PI ? "end" : "start";

  // Ctrl / Cmd ⌘ + Scroll visual zoom
  const handleWheel = useCallback(
    (e: React.WheelEvent<SVGSVGElement>) => {
      if (!zoomable || disabled || !e.ctrlKey) return;
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      setZoomScale((prev) => Math.max(0.25, Math.min(8, prev * factor)));
    },
    [zoomable, disabled],
  );

  useLayoutEffect(() => {
    if (!zoomable) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomScale(1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomable]);

  const tooltipProps = {
    followCursor:         true,
    enterDelay:           50,
    enterNextDelay:       0,
    disableHoverListener: disabled,
    slotProps: { tooltip: { sx: { maxWidth: 240 } } },
  } as const;

  const textColor  = theme.palette.text.primary;
  const fontFamily = theme.typography.fontFamily;

  return (
    <Box
      sx={{
        display:    "inline-flex",
        opacity:    disabled ? 0.5 : 1,
        cursor:     disabled ? "not-allowed" : "default",
        userSelect: "none",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        onWheel={handleWheel}
        style={{ fontFamily: fontFamily ?? "sans-serif", overflow: zoomable && zoomScale > 1 ? "hidden" : "visible" }}
        role="img"
        aria-label="Chord chart"
      >
        <g ref={contentRef}>
          {isEmpty && (
            <text textAnchor="middle" dy="0.35em" fontSize={13} fill={theme.palette.text.secondary}>
              {t.noData}
            </text>
          )}

          {/* Group arcs */}
          <g>
            {chords.groups.map((group: D3ChordGroup) => {
              const info    = serializeGroup(group);
              const isHover = hoverGroup === group.index;
              const dimmed  = hoverGroup !== null && !isHover;
              return (
                <Tooltip
                  key={`grp-tt-${group.index}`}
                  {...tooltipProps}
                  title={
                    <GroupTooltipTitle
                      name={info.name}
                      valueOut={info.valueOut}
                      valueIn={info.valueIn}
                      fmt={fmt}
                    />
                  }
                >
                  <g
                    style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                    onMouseEnter={(e) => {
                      if (!disabled) {
                        setHoverGroup(group.index);
                        onGroupHover?.(info, e);
                      }
                    }}
                    onMouseLeave={(e) => {
                      setHoverGroup(null);
                      onGroupHover?.(null, e);
                    }}
                    onClick={(e) => !disabled && onGroupClick?.(info, e)}
                  >
                    <path
                      d={arc(group) || ""}
                      fill={groupFill(group.index)}
                      stroke={theme.palette.divider}
                      opacity={dimmed ? 0.35 : 1}
                      style={{ transition: "opacity 0.15s" }}
                    />
                    {showGroupLabels && (
                      <text
                        dy="0.35em"
                        fontSize={11}
                        fill={textColor}
                        transform={labelTransform(group)}
                        textAnchor={textAnchor(group)}
                        pointerEvents="none"
                      >
                        {names[group.index]}
                      </text>
                    )}
                  </g>
                </Tooltip>
              );
            })}
          </g>

          {/* Ribbons */}
          <g fillOpacity={ribbonOpacity} style={{ mixBlendMode: resolvedBlendMode }}>
            {chords.map((chord: D3Chord, ci: number) => {
              const info    = serializeChord(chord);
              const visible = hoverGroup === null
                || chord.source.index === hoverGroup
                || chord.target.index === hoverGroup;
              return (
                <Tooltip
                  key={`chord-tt-${ci}`}
                  {...tooltipProps}
                  title={
                    <ChordTooltipTitle
                      sourceName={info.source.name}
                      targetName={info.target.name}
                      sourceValue={info.source.value}
                      targetValue={info.target.value}
                      directed={directed}
                      fmt={fmt}
                    />
                  }
                >
                  <path
                    d={ribbonPath(chord)}
                    fill={groupFill(chord.target.index)}
                    stroke="none"
                    opacity={visible ? 1 : 0.12}
                    style={{
                      cursor:     disabled ? "not-allowed" : "pointer",
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!disabled) onChordHover?.(info, e);
                    }}
                    onMouseLeave={(e) => {
                      onChordHover?.(null, e);
                    }}
                    onClick={(e) => !disabled && onChordClick?.(info, e)}
                  />
                </Tooltip>
              );
            })}
          </g>
        </g>
      </svg>
    </Box>
  );
}

ChordChart.displayName = "ChordChart";
