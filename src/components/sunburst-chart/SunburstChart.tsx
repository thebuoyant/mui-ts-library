import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import {
  type SunburstChartProps,
  type SunburstSegmentInfo,
  type SunburstZoomInfo,
  DEFAULT_SUNBURST_CHART_TRANSLATION,
} from "./SunburstChart.types";
import type { SunburstChartData } from "./SunburstChart.types";

const TWO_PI      = 2 * Math.PI;
const LABEL_SIZE  = 11;
const AVG_CHAR_W  = LABEL_SIZE * 0.50; // 0.50em ≈ realistic sans-serif average
const MIN_LABEL_L = 5;                 // hide truncated labels shorter than this

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

function truncateLabel(name: string, availPx: number): string {
  const maxChars = Math.floor(availPx / AVG_CHAR_W);
  if (maxChars <= 0) return "";
  if (name.length <= maxChars) return name;
  // hide if the result would be shorter than MIN_LABEL_L chars total (incl. "…")
  if (maxChars < MIN_LABEL_L) return "";
  return name.slice(0, maxChars - 1) + "…";
}

// ── Tooltip content — rendered inside MUI Tooltip (dark background) ──────────

type SegmentTooltipTitleProps = {
  node:              d3.HierarchyRectangularNode<SunburstChartData>;
  valueDecimalCount: number;
  valueDecimalSep:   string;
  valueThousandsSep: string;
  valueFormatter?:   (value: number) => string;
};

function SegmentTooltipTitle({
  node,
  valueDecimalCount,
  valueDecimalSep,
  valueThousandsSep,
  valueFormatter,
}: SegmentTooltipTitleProps) {
  const hasValue   = (node.value ?? 0) > 0;
  const breadcrumb = node.ancestors().map((a) => a.data.name).reverse().join(" › ");
  const fmtValue   = (v: number) =>
    valueFormatter ? valueFormatter(v) : formatNumber(v, valueDecimalCount, valueDecimalSep, valueThousandsSep);

  return (
    <Box sx={{ py: 0.25 }}>
      <Typography variant="caption" sx={{ fontWeight: "bold", display: "block" }}>
        {node.data.name}
      </Typography>
      {hasValue && (
        <Typography variant="caption" sx={{ display: "block", opacity: 0.85 }}>
          {fmtValue(node.value ?? 0)}
        </Typography>
      )}
      {node.depth > 0 && (
        <Typography variant="caption" sx={{ display: "block", opacity: 0.65, mt: 0.25 }}>
          {breadcrumb}
        </Typography>
      )}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

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
  valueFormatter,
  zoomable = false,
  duration = 750,
  disabled = false,
  translation,
}: SunburstChartProps) {
  const theme = useTheme();
  const t = { ...DEFAULT_SUNBURST_CHART_TRANSLATION, ...translation };
  const isEmpty = !data.children?.length && !data.value;

  const contentRef = useRef<SVGGElement>(null);
  const [baseViewBox, setBaseViewBox] = useState(`-${size / 2} -${size / 2} ${size} ${size}`);
  const [zoomScale,   setZoomScale]   = useState(1);

  // Zoom viewBox: shrink/expand around center (0,0 — the SVG center)
  const viewBox = useMemo(() => {
    if (zoomScale === 1) return baseViewBox;
    const [x, y, w, h] = baseViewBox.split(" ").map(Number);
    const nw = w / zoomScale;
    const nh = h / zoomScale;
    return `${x + (w - nw) / 2} ${y + (h - nh) / 2} ${nw} ${nh}`;
  }, [baseViewBox, zoomScale]);

  const radius       = size / 2;
  const clampedInner = Math.max(0, Math.min(innerRadius, Math.max(0, radius - 1)));
  const radialSpan   = Math.max(1, radius - clampedInner);

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
          numeric: true, sensitivity: "base",
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

  // Visual projection params derived from focusNode — x0/x1 (angle window) + yShift (radial offset).
  // Kept separate from focusNode so the shape can animate smoothly toward it instead of jump-cutting.
  const viewFor = (node: d3.HierarchyRectangularNode<SunburstChartData>) => ({
    x0: node.x0,
    x1: node.x1,
    yShift: node.depth === 0 ? 0 : (node.depth - 1) * ringThickness,
  });

  const [renderView, setRenderView] = useState(() => viewFor(root));
  const renderViewRef = useRef(renderView);

  if (prevRoot !== root) {
    setPrevRoot(root);
    setFocusNode(root);
    // Data changed — jump to the new root's view instantly, no animation.
    const resetView = viewFor(root);
    renderViewRef.current = resetView;
    setRenderView(resetView);
  }

  const topLevelNames = useMemo(
    () => root.children?.map((c) => c.data.name) ?? [root.data.name],
    [root],
  );
  const colorScale = useMemo(
    () => d3.scaleOrdinal<string, string>().domain(topLevelNames).range(palette),
    [palette, topLevelNames],
  );

  const fillFor = (node: d3.HierarchyRectangularNode<SunburstChartData>) => {
    if (node.data.colorConfig?.fill) return node.data.colorConfig.fill;
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
      const angleScale = TWO_PI / (renderView.x1 - renderView.x0);
      const x0 = Math.max(0, Math.min(TWO_PI, (node.x0 - renderView.x0) * angleScale));
      const x1 = Math.max(0, Math.min(TWO_PI, (node.x1 - renderView.x0) * angleScale));
      return {
        x0, x1,
        y0: Math.max(0, node.y0 - renderView.yShift),
        y1: Math.max(0, node.y1 - renderView.yShift),
      };
    },
    [renderView],
  );

  // Animate renderView toward focusNode's projection whenever the focus changes
  // (Ctrl+Click drill in/out, Escape). Skipped entirely when duration <= 0.
  useEffect(() => {
    const target = viewFor(focusNode);
    const from   = renderViewRef.current;
    if (from.x0 === target.x0 && from.x1 === target.x1 && from.yShift === target.yShift) return;

    if (duration <= 0) {
      renderViewRef.current = target;
      setRenderView(target);
      return;
    }

    let frame: number | null = null;
    const x0i = d3.interpolateNumber(from.x0, target.x0);
    const x1i = d3.interpolateNumber(from.x1, target.x1);
    const yi  = d3.interpolateNumber(from.yShift, target.yShift);
    const start = performance.now();

    const tick = (now: number) => {
      const t     = Math.min(1, (now - start) / duration);
      const eased = d3.easeCubic(t);
      const next  = { x0: x0i(eased), x1: x1i(eased), yShift: yi(eased) };
      renderViewRef.current = next;
      setRenderView(next);
      frame = t < 1 ? requestAnimationFrame(tick) : null;
    };
    frame = requestAnimationFrame(tick);

    return () => {
      if (frame != null) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusNode, ringThickness, duration]);

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
  }, [size, root, focusNode, clampedInner, ringThickness, showRootLabel]);

  const zoomTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleZoomIn = (fn: () => void) => {
    if (zoomTimerRef.current) { clearTimeout(zoomTimerRef.current); zoomTimerRef.current = null; }
    zoomTimerRef.current = setTimeout(() => { fn(); zoomTimerRef.current = null; }, 250);
  };
  const cancelZoomIn = () => {
    if (zoomTimerRef.current) { clearTimeout(zoomTimerRef.current); zoomTimerRef.current = null; }
  };

  useLayoutEffect(() => {
    if (disabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { cancelZoomIn(); zoom(root); setZoomScale(1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [disabled, root, zoom]);

  // Ctrl+Scroll visual zoom — viewBox scale, content clipped at SVG boundary
  const handleWheel = useCallback(
    (e: React.WheelEvent<SVGSVGElement>) => {
      if (!zoomable || disabled || !e.ctrlKey) return;
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      setZoomScale((prev) => Math.max(0.25, Math.min(8, prev * factor)));
    },
    [zoomable, disabled],
  );

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

  // Shared tooltip props — follows cursor so popup appears right next to the mouse
  const tooltipProps = {
    followCursor:    true,
    enterDelay:      50,
    enterNextDelay:  0,
    disableHoverListener: disabled,
    slotProps: {
      tooltip: { sx: { maxWidth: 260 } },
    },
  } as const;

  const textColor  = theme.palette.text.primary;
  const fontFamily = theme.typography.fontFamily;

  return (
    <Box
      sx={{
        display:   "inline-flex",
        opacity:   disabled ? 0.5 : 1,
        cursor:    disabled ? "not-allowed" : "default",
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
          // clip content at SVG boundary when zoomed in
          overflow: zoomable && zoomScale > 1 ? "hidden" : "visible",
        }}
        role="img"
        aria-label={data.name}
      >
        <g ref={contentRef}>
          {isEmpty && (
            <text textAnchor="middle" dy="0.35em" fontSize={13} fill={theme.palette.text.secondary}>
              {t.noData}
            </text>
          )}

          {/* Center hole hit area (donut mode) */}
          {clampedInner > 0 && (
            <Tooltip
              {...tooltipProps}
              title={focusNode.data.name}
              placement="top"
            >
              <circle
                cx={0} cy={0}
                r={clampedInner}
                fill="transparent"
                pointerEvents={disabled ? "none" : "auto"}
                onClick={handleCenterClick}
                style={{ cursor: disabled ? "not-allowed" : "pointer" }}
              />
            </Tooltip>
          )}

          {/* Segments */}
          <g>
            {renderNodes.map((node, idx) => {
              const local       = toLocal(node);
              const visible     = arcVisible(local);
              const hasChildren = !!node.children;
              return (
                <Tooltip
                  key={`tt-${node.data.id}-${idx}`}
                  {...tooltipProps}
                  placement="top"
                  title={
                    visible ? (
                      <SegmentTooltipTitle
                        node={node}
                        valueDecimalCount={valueDecimalCount}
                        valueDecimalSep={valueDecimalSeparator}
                        valueThousandsSep={valueThousandsSeparator}
                        valueFormatter={valueFormatter}
                      />
                    ) : ""
                  }
                >
                  <path
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
                  />
                </Tooltip>
              );
            })}
          </g>

          {/* Arc labels — truncated to fit, full name in tooltip */}
          {showSegmentLabels && (
            <g pointerEvents="none" textAnchor="middle" fill={textColor}>
              {renderNodes.map((node, idx) => {
                if (!isInFocus(node)) return null;
                const local   = toLocal(node);
                if (!labelVisible(local)) return null;
                const midR    = clampedInner + (local.y0 + local.y1) / 2;
                const availPx = midR * (local.x1 - local.x0) * 0.88;
                const label   = truncateLabel(node.data.name, availPx);
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

          {/* Center label — current focus node name (hidden in the empty-data state, which shows t.noData instead) */}
          {showRootLabel && !isEmpty && (
            <Tooltip
              {...tooltipProps}
              placement="top"
              title=""
            >
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
            </Tooltip>
          )}
        </g>
      </svg>
    </Box>
  );
}

SunburstChart.displayName = "SunburstChart";
