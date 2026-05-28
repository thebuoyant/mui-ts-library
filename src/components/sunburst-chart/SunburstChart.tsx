import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import {
  type SunburstChartProps,
  type SunburstSegmentInfo,
  type SunburstZoomInfo,
  DEFAULT_SUNBURST_CHART_TRANSLATION,
} from "./SunburstChart.types";
import type { SunburstChartData } from "./SunburstChart.types";

const TWO_PI       = 2 * Math.PI;
const LABEL_SIZE   = 11;          // px — font-size of arc labels
const AVG_CHAR_W   = LABEL_SIZE * 0.58; // rough average char width for sans-serif

function formatNumber(
  value: number | null | undefined,
  decimals = 0,
  decimalSep = ".",
  thousandSep = ",",
): string {
  if (value == null || !isFinite(value)) return "0";
  const fixed = value.toFixed(Math.max(0, decimals));
  const [intPart, decPart] = fixed.split(".");
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);
  return decPart ? `${withThousands}${decimalSep}${decPart}` : withThousands;
}

// Truncate label to fit available arc width — adds "…" when clipped
function truncateLabel(name: string, availPx: number): string {
  const maxChars = Math.floor(availPx / AVG_CHAR_W);
  if (maxChars <= 0) return "";
  if (name.length <= maxChars) return name;
  if (maxChars <= 2) return "…";
  return name.slice(0, maxChars - 1) + "…";
}

type TooltipState = {
  node: d3.HierarchyRectangularNode<SunburstChartData>;
  x: number;  // px relative to container
  y: number;
};

export function SunburstChart({
  data,
  size = 500,
  showSegmentLabels = true,
  innerRadius = 0,
  sortBy = "value",
  chartColors,
  showRootLabel = true,
  onSegmentClick,
  onZoomChange,
  valueDecimalCount = 0,
  valueDecimalSeparator = ".",
  valueThousandsSeparator = ",",
  disabled = false,
  translation,
}: SunburstChartProps) {
  const theme = useTheme();
  const t = { ...DEFAULT_SUNBURST_CHART_TRANSLATION, ...translation };

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<SVGGElement>(null);
  const [viewBox,      setViewBox]      = useState(`-${size / 2} -${size / 2} ${size} ${size}`);
  const [tooltipState, setTooltipState] = useState<TooltipState | null>(null);

  const radius      = size / 2;
  const clampedInner = Math.max(0, Math.min(innerRadius, Math.max(0, radius - 1)));
  const radialSpan  = Math.max(1, radius - clampedInner);

  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.success.main,
    theme.palette.info.main,
  ];
  const palette = chartColors && chartColors.length > 0 ? chartColors : defaultColors;

  const { root, ringThickness } = useMemo(() => {
    const h = d3.hierarchy<SunburstChartData>(data).sum((d) => d.value ?? 0);
    if (sortBy === "value") {
      h.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
    } else {
      h.sort((a, b) =>
        String(a.data.name).localeCompare(String(b.data.name), undefined, {
          numeric: true,
          sensitivity: "base",
        }),
      );
    }
    const rootLayout = d3.partition<SunburstChartData>().size([TWO_PI, radialSpan])(h);
    const maxDepth   = d3.max(rootLayout.descendants(), (d) => d.depth) ?? 0;
    const thick      = maxDepth > 0 ? radialSpan / maxDepth : radialSpan;
    if (maxDepth > 0) {
      rootLayout.descendants().forEach((node) => {
        if (node.depth === 0) { node.y0 = 0; node.y1 = 0; }
        else { node.y0 = (node.depth - 1) * thick; node.y1 = node.depth * thick; }
      });
    }
    return { root: rootLayout, ringThickness: thick };
  }, [data, radialSpan, sortBy]);

  const [focusNode, setFocusNode] = useState(root);
  const [prevRoot,  setPrevRoot]  = useState(root);
  if (prevRoot !== root) { setPrevRoot(root); setFocusNode(root); }

  const topLevelNames = useMemo(
    () => root.children?.map((c) => c.data.name) ?? [root.data.name],
    [root],
  );
  const colorScale = useMemo(
    () => d3.scaleOrdinal<string, string>().domain(topLevelNames).range(palette),
    [palette, topLevelNames],
  );

  const fillFor = (node: d3.HierarchyRectangularNode<SunburstChartData>) => {
    let top = node;
    while (top.depth > 1) top = top.parent!;
    return colorScale(top.data.name);
  };

  const arc = useMemo(
    () =>
      d3
        .arc<{ x0: number; x1: number; y0: number; y1: number }>()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius / 2)
        .innerRadius((d) => clampedInner + d.y0)
        .outerRadius((d) => clampedInner + d.y1 - 1),
    [radius, clampedInner],
  );

  const toLocal = useCallback(
    (node: d3.HierarchyRectangularNode<SunburstChartData>) => {
      const angleScale = TWO_PI / (focusNode.x1 - focusNode.x0);
      const x0    = Math.max(0, Math.min(TWO_PI, (node.x0 - focusNode.x0) * angleScale));
      const x1    = Math.max(0, Math.min(TWO_PI, (node.x1 - focusNode.x0) * angleScale));
      const yShift = focusNode.depth === 0 ? 0 : (focusNode.depth - 1) * ringThickness;
      return { x0, x1, y0: Math.max(0, node.y0 - yShift), y1: Math.max(0, node.y1 - yShift) };
    },
    [focusNode, ringThickness],
  );

  const arcVisible = (d: { x0: number; x1: number; y0: number; y1: number }) =>
    d.x1 > d.x0 && d.y1 > d.y0;

  const labelVisible = (d: { x0: number; x1: number; y0: number; y1: number }) => {
    const midR = clampedInner + (d.y0 + d.y1) / 2;
    return midR * (d.x1 - d.x0) > 12;
  };

  const labelTransform = (d: { x0: number; x1: number; y0: number; y1: number }) => {
    const midDeg = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
    const midR   = clampedInner + (d.y0 + d.y1) / 2;
    const flip   = midDeg < 180 ? 0 : 180;
    return `rotate(${midDeg - 90}) translate(${midR},0) rotate(${flip})`;
  };

  const isInFocus = useCallback(
    (node: d3.HierarchyRectangularNode<SunburstChartData>) =>
      node.ancestors().includes(focusNode),
    [focusNode],
  );

  const serialize = useCallback(
    (node: d3.HierarchyRectangularNode<SunburstChartData>): SunburstSegmentInfo => {
      const ancestors = node.ancestors().reverse();
      const nodeValue = node.value ?? 0;
      const rootValue = root.value ?? 0;
      return {
        id:            node.data.id,
        name:          node.data.name,
        value:         nodeValue || null,
        percentage:    rootValue > 0 ? Math.round((nodeValue / rootValue) * 10000) / 100 : 0,
        depth:         node.depth,
        path:          ancestors.map((a) => a.data.name),
        pathIds:       ancestors.map((a) => a.data.id),
        childrenCount: node.children?.length ?? 0,
        data:          node.data,
      };
    },
    [root],
  );

  const zoom = useCallback(
    (newFocus: d3.HierarchyRectangularNode<SunburstChartData>) => {
      setFocusNode(newFocus);
      if (onZoomChange) {
        const info: SunburstZoomInfo = {
          focusNode: serialize(newFocus),
          isRoot:    newFocus === root,
        };
        onZoomChange(info);
      }
    },
    [root, serialize, onZoomChange],
  );

  // Auto-fit viewBox
  useLayoutEffect(() => {
    const g = contentRef.current;
    if (!g) return;
    const id = requestAnimationFrame(() => {
      try {
        const box = g.getBBox();
        const pad = 8;
        setViewBox(`${box.x - pad} ${box.y - pad} ${box.width + 2 * pad} ${box.height + 2 * pad}`);
      } catch {
        setViewBox(`-${size / 2} -${size / 2} ${size} ${size}`);
      }
    });
    return () => cancelAnimationFrame(id);
  }, [size, root, focusNode, clampedInner, ringThickness, showRootLabel]);

  // Ctrl+Click zoom-in timer (distinguishes from Ctrl+DblClick)
  const zoomTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleZoomIn = (fn: () => void) => {
    if (zoomTimerRef.current) { clearTimeout(zoomTimerRef.current); zoomTimerRef.current = null; }
    zoomTimerRef.current = setTimeout(() => { fn(); zoomTimerRef.current = null; }, 250);
  };
  const cancelZoomIn = () => {
    if (zoomTimerRef.current) { clearTimeout(zoomTimerRef.current); zoomTimerRef.current = null; }
  };

  // Escape → reset zoom
  useLayoutEffect(() => {
    if (disabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { cancelZoomIn(); zoom(root); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [disabled, root, zoom]);

  // Tooltip helpers — relative to container Box
  const getRelativePos = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    return rect
      ? { x: e.clientX - rect.left, y: e.clientY - rect.top }
      : { x: e.clientX, y: e.clientY };
  };

  const renderNodes = root.descendants().filter((n) => n.depth > 0);

  const handlePathClick: React.MouseEventHandler<SVGPathElement> = (e) => {
    if (disabled) return;
    const idx  = Number(e.currentTarget.getAttribute("data-idx"));
    const node = renderNodes[idx];
    if (!node) return;
    if (e.ctrlKey || e.metaKey) {
      if (node.children) scheduleZoomIn(() => zoom(node));
      return;
    }
    onSegmentClick?.(serialize(node), e);
  };

  const handlePathDblClick: React.MouseEventHandler<SVGPathElement> = (e) => {
    if (disabled) return;
    if (e.ctrlKey || e.metaKey) {
      cancelZoomIn();
      zoom(focusNode.parent ?? root);
    }
  };

  const handleCenterClick: React.MouseEventHandler<SVGCircleElement | SVGGElement> = (e) => {
    if (disabled) return;
    if (e.ctrlKey || e.metaKey) {
      cancelZoomIn();
      zoom(focusNode.parent ?? root);
      return;
    }
    onSegmentClick?.(serialize(focusNode.parent ?? root), e as React.MouseEvent<SVGCircleElement>);
  };

  // Tooltip position — 14px right + auto-flip if near right edge
  const tooltipOffset = 14;
  const tooltipWidth  = 220;
  let tooltipLeft = (tooltipState?.x ?? 0) + tooltipOffset;
  const tooltipTop  = (tooltipState?.y ?? 0) - 10;
  if (tooltipLeft + tooltipWidth > size) tooltipLeft = (tooltipState?.x ?? 0) - tooltipWidth - tooltipOffset + 10;

  const textColor  = theme.palette.text.primary;
  const fontFamily = theme.typography.fontFamily;

  return (
    <Box
      ref={containerRef}
      sx={{
        display:   "inline-flex",
        position:  "relative",
        opacity:   disabled ? 0.5 : 1,
        cursor:    disabled ? "not-allowed" : "default",
        userSelect: "none",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        style={{ fontFamily: fontFamily ?? "sans-serif", overflow: "visible" }}
        role="img"
        aria-label={data.name}
        onMouseLeave={() => setTooltipState(null)}
      >
        <g ref={contentRef}>
          {/* Center hole hit area (donut mode) */}
          {clampedInner > 0 && (
            <circle
              cx={0} cy={0}
              r={clampedInner}
              fill="transparent"
              pointerEvents={disabled ? "none" : "auto"}
              onClick={handleCenterClick}
              onMouseEnter={(e) => {
                const node = focusNode.parent ?? root;
                setTooltipState({ node, ...getRelativePos(e) });
              }}
              onMouseMove={(e) => setTooltipState((s) => s ? { ...s, ...getRelativePos(e) } : null)}
              style={{ cursor: disabled ? "not-allowed" : "pointer" }}
            />
          )}

          {/* Segments */}
          <g>
            {renderNodes.map((node, idx) => {
              const local       = toLocal(node);
              const visible     = arcVisible(local);
              const hasChildren = !!node.children;
              return (
                <path
                  key={`seg-${node.data.id}-${idx}`}
                  data-idx={idx}
                  d={arc(local) || ""}
                  fill={fillFor(node)}
                  fillOpacity={visible ? (hasChildren ? 0.75 : 0.5) : 0}
                  style={{
                    pointerEvents: visible && !disabled ? "auto" : "none",
                    cursor:        hasChildren && !disabled ? "pointer" : "default",
                    transition:    "fill-opacity 0.15s",
                  }}
                  onClick={handlePathClick}
                  onDoubleClick={handlePathDblClick}
                  onMouseEnter={(e) => visible && setTooltipState({ node, ...getRelativePos(e) })}
                  onMouseMove={(e) =>  visible && setTooltipState((s) => s ? { ...s, ...getRelativePos(e) } : null)}
                  onMouseLeave={() => setTooltipState(null)}
                />
              );
            })}
          </g>

          {/* Arc labels — truncated to fit, full name shown in tooltip */}
          {showSegmentLabels && (
            <g pointerEvents="none" textAnchor="middle" fill={textColor}>
              {renderNodes.map((node, idx) => {
                if (!isInFocus(node)) return null;
                const local = toLocal(node);
                if (!labelVisible(local)) return null;
                const midR      = clampedInner + (local.y0 + local.y1) / 2;
                const availPx   = midR * (local.x1 - local.x0) * 0.82;
                const label     = truncateLabel(node.data.name, availPx);
                if (!label) return null;
                return (
                  <text
                    key={`lbl-${node.data.id}-${idx}`}
                    transform={labelTransform(local)}
                    dy="0.35em"
                    fontSize={LABEL_SIZE}
                  >
                    {label}
                  </text>
                );
              })}
            </g>
          )}

          {/* Center label — current focus node name */}
          {showRootLabel && (
            <g
              textAnchor="middle"
              fill={textColor}
              pointerEvents={disabled ? "none" : "auto"}
              onClick={handleCenterClick}
              style={{ cursor: focusNode !== root && !disabled ? "pointer" : "default" }}
            >
              <text fontSize={13} dy="0.35em" fontWeight="bold">
                {focusNode.data.name}
              </text>
            </g>
          )}
        </g>
      </svg>

      {/* Custom tooltip — instant appear, no browser delay */}
      {tooltipState && (
        <Paper
          elevation={4}
          sx={{
            position:      "absolute",
            left:          tooltipLeft,
            top:           tooltipTop,
            width:         tooltipWidth,
            pointerEvents: "none",
            zIndex:        1500,
            px:            1.5,
            py:            1,
            borderRadius:  1.5,
            border:        "1px solid",
            borderColor:   "divider",
          }}
        >
          {/* Node name */}
          <Typography variant="body2" sx={{ fontWeight: "bold" }} noWrap>
            {tooltipState.node.data.name}
          </Typography>

          {/* Value */}
          {(tooltipState.node.value ?? 0) > 0 && (
            <Typography variant="body2" color="text.secondary">
              {formatNumber(
                tooltipState.node.value ?? 0,
                valueDecimalCount,
                valueDecimalSeparator,
                valueThousandsSeparator,
              )}
            </Typography>
          )}

          {/* Breadcrumb path */}
          {tooltipState.node.depth > 0 && (
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ display: "block", mt: 0.5 }}
              noWrap
            >
              {tooltipState.node.ancestors().map((a) => a.data.name).reverse().join(" › ")}
            </Typography>
          )}

          {/* Zoom hints for parent nodes */}
          {tooltipState.node.children && !disabled && (
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ display: "block", mt: 0.75, borderTop: "1px solid", borderColor: "divider", pt: 0.75 }}
            >
              {t.ctrlClickToZoomIn}
              <br />
              {t.ctrlDblClickToZoomOut}
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
}

SunburstChart.displayName = "SunburstChart";
