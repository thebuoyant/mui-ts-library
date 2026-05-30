import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import type { HierarchyCircularNode } from "d3-hierarchy";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import {
  type CirclePackingChartProps,
  type CirclePackingNodeInfo,
  DEFAULT_CIRCLE_PACKING_TRANSLATION,
} from "./CirclePackingChart.types";
import type { CirclePackingData } from "./CirclePackingChart.types";

export function CirclePackingChart({
  data,
  size = 600,
  padding = 3,
  sortBy = "value",
  showLabels = true,
  labelFontSize = 11,
  labelColor,
  chartColors,
  depthColorStart,
  depthColorEnd,
  background,
  duration = 750,
  disabled = false,
  onCircleClick,
  onZoomChange,
  translation,
}: CirclePackingChartProps) {
  const theme = useTheme();
  // translation currently only has noData — reserved for future use
  void ({ ...DEFAULT_CIRCLE_PACKING_TRANSLATION, ...translation });

  // Resolved colors
  const resolvedLabelColor  = labelColor  ?? theme.palette.text.primary;
  const resolvedBackground  = background  ?? theme.palette.background.default;
  const resolvedColorStart  = depthColorStart ?? theme.palette.primary.light;
  const resolvedColorEnd    = depthColorEnd   ?? theme.palette.secondary.dark;
  const fontFamily          = theme.typography.fontFamily;

  // ── D3 Pack layout ────────────────────────────────────────────────────────
  const root = useMemo(() => {
    const h = d3.hierarchy<CirclePackingData>(data).sum((d) => d.value ?? 0);
    if (sortBy === "value") {
      h.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
    } else {
      h.sort((a, b) =>
        String(a.data.name).localeCompare(String(b.data.name), undefined, {
          numeric: true, sensitivity: "base",
        }),
      );
    }
    return d3.pack<CirclePackingData>().size([size, size]).padding(padding)(h);
  }, [data, size, padding, sortBy]);

  const nodes = root.descendants();
  const maxDepth = useMemo(() => d3.max(nodes, (d) => d.depth) ?? 0, [nodes]);

  // ── Color resolution ──────────────────────────────────────────────────────
  const colorGradient = useMemo(
    () =>
      d3
        .scaleSequential(d3.interpolateHcl(resolvedColorStart, resolvedColorEnd))
        .domain([0, Math.max(1, maxDepth)]),
    [resolvedColorStart, resolvedColorEnd, maxDepth],
  );

  const hasPalette = Array.isArray(chartColors) && chartColors.length > 0;

  const fillFor = useCallback(
    (d: HierarchyCircularNode<CirclePackingData>): string => {
      if (hasPalette) return (chartColors as string[])[d.depth % (chartColors as string[]).length];
      return d.children ? colorGradient(d.depth) : theme.palette.background.paper;
    },
    [hasPalette, chartColors, colorGradient, theme],
  );

  // ── Focus + view state ────────────────────────────────────────────────────
  const svgRef  = useRef<SVGSVGElement | null>(null);
  const viewRef = useRef<[number, number, number]>([root.x, root.y, root.r * 2]);
  const [focus, setFocus] = useState<HierarchyCircularNode<CirclePackingData>>(root);

  // Reset focus when data changes
  const [prevData, setPrevData] = useState(data);
  if (prevData !== data) { setPrevData(data); setFocus(root); }

  // ── Serializer ────────────────────────────────────────────────────────────
  const serialize = useCallback(
    (d: HierarchyCircularNode<CirclePackingData>): CirclePackingNodeInfo => ({
      name:          d.data.name,
      value:         d.value ?? null,
      depth:         d.depth,
      path:          d.ancestors().map((a) => a.data.name).reverse(),
      childrenCount: d.children?.length ?? 0,
      data:          d.data,
    }),
    [],
  );

  // ── Apply current view to DOM (D3 imperative, index-based) ────────────────
  const applyView = useCallback(
    (v: [number, number, number]) => {
      const el = svgRef.current;
      if (!el) return;
      viewRef.current = v;
      const k = size / v[2];

      const groupNodes = el.querySelectorAll<SVGGElement>("g[data-role='nodes'] > g");
      const circles    = el.querySelectorAll<SVGCircleElement>("g[data-role='nodes'] > g > circle");

      for (let i = 0; i < nodes.length; i++) {
        const d  = nodes[i];
        const g  = groupNodes[i];
        if (g) g.setAttribute("transform", `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        const j = i - 1; // circles start at index 1 (root has no circle)
        if (j >= 0 && circles[j]) circles[j].setAttribute("r", String(d.r * k));
      }

      if (showLabels) {
        const labels = el.querySelectorAll<SVGTextElement>("g[data-role='labels'] > text");
        for (let i = 0; i < nodes.length; i++) {
          const d = nodes[i];
          const txt = labels[i];
          if (txt) txt.setAttribute("transform", `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        }
      }
    },
    [nodes, size, showLabels],
  );

  // Initial positioning (no transition)
  useLayoutEffect(() => {
    applyView([focus.x, focus.y, focus.r * 2]);
  }, [root, size, focus, applyView]);

  // ── Smooth D3 zoom transition ─────────────────────────────────────────────
  const performZoom = useCallback(
    (target: HierarchyCircularNode<CirclePackingData>, dur: number) => {
      const el = svgRef.current;
      if (!el) return;

      const prev  = focus;
      const startV = viewRef.current;
      const endV: [number, number, number] = [target.x, target.y, target.r * 2];

      setFocus(target);

      // Main zoom: d3.interpolateZoom creates a smooth "wipe" between two views
      d3.select(el)
        .transition()
        .duration(dur)
        .ease(d3.easeCubic)
        .tween("zoom", () => {
          const interp = d3.interpolateZoom(startV, endV);
          return (t) => applyView(interp(t));
        });

      // Label fade: show only direct children of the new focus
      const labelEls = el.querySelectorAll<SVGTextElement>("g[data-role='labels'] > text");
      d3.selectAll<SVGTextElement, unknown>(labelEls)
        .transition()
        .duration(dur)
        .ease(d3.easeCubic)
        .style("fill-opacity", (_: unknown, i: number) =>
          nodes[i].parent === target ? 1 : 0,
        )
        .on("start", function (_: unknown, i: number) {
          if (nodes[i].parent === target) this.style.display = "inline";
        })
        .on("end", function (_: unknown, i: number) {
          if (nodes[i].parent !== target) this.style.display = "none";
        });

      onZoomChange?.({
        previousName:  prev.data.name,
        currentName:   target.data.name,
        currentDepth:  target.depth,
        isRoot:        target === root,
      });
    },
    [focus, nodes, root, applyView, onZoomChange],
  );

  // ── Click disambiguation: single vs double ────────────────────────────────
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleClick = (fn: () => void) => {
    if (clickTimerRef.current) { clearTimeout(clickTimerRef.current); clickTimerRef.current = null; }
    clickTimerRef.current = setTimeout(() => { fn(); clickTimerRef.current = null; }, 220);
  };
  const cancelClick = () => {
    if (clickTimerRef.current) { clearTimeout(clickTimerRef.current); clickTimerRef.current = null; }
  };

  // ── Event handlers ────────────────────────────────────────────────────────
  const handleSvgDblClick: React.MouseEventHandler<SVGSVGElement> = (e) => {
    if (disabled) return;
    cancelClick();
    e.preventDefault();
    const dur = e.altKey ? Math.max(250, duration * 10) : duration;
    const target = focus.parent ?? root;
    if (target !== focus) performZoom(target, dur);
  };

  // Tooltip shared props
  const tooltipProps = {
    followCursor:         true,
    enterDelay:           50,
    enterNextDelay:       0,
    disableHoverListener: disabled,
    slotProps: { tooltip: { sx: { maxWidth: 220 } } },
  } as const;

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
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
        style={{
          display:    "block",
          background: resolvedBackground,
          fontFamily: fontFamily ?? "sans-serif",
        }}
        role="img"
        aria-label={data.name}
        onDoubleClick={handleSvgDblClick}
      >
        {/* ── Circles ─────────────────────────────────────────── */}
        <g data-role="nodes">
          {nodes.map((d, i) => {
            const info = serialize(d);
            const tooltipContent = (
              <Box sx={{ py: 0.25 }}>
                <Typography variant="caption" sx={{ fontWeight: "bold", display: "block" }}>
                  {d.data.name}
                </Typography>
                {(d.value ?? 0) > 0 && (
                  <Typography variant="caption" sx={{ display: "block", opacity: 0.85 }}>
                    {d.value?.toLocaleString()}
                  </Typography>
                )}
                {d.depth > 0 && (
                  <Typography variant="caption" sx={{ display: "block", opacity: 0.6, mt: 0.25 }}>
                    {info.path.slice(0, -1).join(" › ")}
                  </Typography>
                )}
                {d.children && !disabled && (
                  <Typography variant="caption" sx={{ display: "block", opacity: 0.5, mt: 0.5, borderTop: "1px solid rgba(255,255,255,0.2)", pt: 0.5 }}>
                    DblClick → zoom in
                  </Typography>
                )}
              </Box>
            );

            return (
              <g key={`n-${i}`} transform={`translate(${d.x - size / 2},${d.y - size / 2})`}>
                {i === 0 ? null : (
                  <Tooltip {...tooltipProps} title={tooltipContent}>
                    <circle
                      r={d.r}
                      fill={fillFor(d)}
                      stroke={theme.palette.background.paper}
                      strokeWidth={0.5}
                      style={{
                        cursor:        disabled ? "not-allowed" : d.children ? "pointer" : "default",
                        transition:    "stroke 0.1s",
                      }}
                      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.stroke = theme.palette.divider; }}
                      onMouseLeave={(e) => { e.currentTarget.style.stroke = theme.palette.background.paper; }}
                      onClick={(e) => {
                        if (disabled) return;
                        scheduleClick(() => onCircleClick?.(info, e));
                      }}
                      onDoubleClick={(e) => {
                        if (disabled) return;
                        cancelClick();
                        e.preventDefault();
                        e.stopPropagation();
                        if (d.children) {
                          const dur = e.altKey ? Math.max(250, duration * 10) : duration;
                          performZoom(d, dur);
                        }
                      }}
                    />
                  </Tooltip>
                )}
              </g>
            );
          })}
        </g>

        {/* ── Labels ──────────────────────────────────────────── */}
        {showLabels && (
          <g
            data-role="labels"
            textAnchor="middle"
            dominantBaseline="middle"
            pointerEvents="none"
            fontSize={labelFontSize}
            fill={resolvedLabelColor}
          >
            {nodes.map((d, i) => (
              <text
                key={`lbl-${i}`}
                transform={`translate(${d.x - size / 2},${d.y - size / 2})`}
                style={{
                  display:     d.parent === root ? "inline" : "none",
                  fillOpacity: d.parent === root ? 1 : 0,
                }}
              >
                {d.data.name}
              </text>
            ))}
          </g>
        )}
      </svg>

      {/* Breadcrumb hint when zoomed in */}
      {focus !== root && !disabled && (
        <Box
          sx={{
            position: "absolute",
            bottom: 4,
            right: 8,
            pointerEvents: "none",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              bgcolor: "action.hover",
              borderRadius: 1,
              px: 1, py: 0.25,
              color: "text.secondary",
              fontSize: "0.7rem",
            }}
          >
            {focus.data.name} — DblClick background to zoom out
          </Typography>
        </Box>
      )}
    </Box>
  );
}

CirclePackingChart.displayName = "CirclePackingChart";
