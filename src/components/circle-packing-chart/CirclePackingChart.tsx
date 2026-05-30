import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import type { HierarchyCircularNode } from "d3-hierarchy";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import {
  type CirclePackingChartProps,
  type CirclePackingNodeInfo,
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
}: CirclePackingChartProps) {
  const theme = useTheme();

  // MUI palette as default (same order as all other D3 charts)
  const defaultPalette = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.success.main,
    theme.palette.info.main,
  ];

  const resolvedLabelColor = labelColor  ?? theme.palette.text.primary;
  const resolvedBackground = background  ?? theme.palette.background.default;
  const fontFamily         = theme.typography.fontFamily;

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

  const nodes    = root.descendants();
  const maxDepth = useMemo(() => d3.max(nodes, (d) => d.depth) ?? 0, [nodes]);

  // ── Color logic — MUI palette by default, gradient when explicitly set ────
  const useGradient = !!(depthColorStart && depthColorEnd);

  const colorGradient = useMemo(
    () =>
      useGradient
        ? d3.scaleSequential(
            d3.interpolateHcl(depthColorStart!, depthColorEnd!),
          ).domain([0, Math.max(1, maxDepth)])
        : null,
    [useGradient, depthColorStart, depthColorEnd, maxDepth],
  );

  const palette = chartColors && chartColors.length > 0 ? chartColors : defaultPalette;

  const fillFor = useCallback(
    (d: HierarchyCircularNode<CirclePackingData>): string => {
      if (useGradient && colorGradient) {
        return d.children ? colorGradient(d.depth) : theme.palette.background.paper;
      }
      return palette[d.depth % palette.length];
    },
    [useGradient, colorGradient, palette, theme],
  );

  // ── Serializer — enriched like SunburstChart ──────────────────────────────
  const serialize = useCallback(
    (d: HierarchyCircularNode<CirclePackingData>): CirclePackingNodeInfo => {
      const nodeValue  = d.value ?? 0;
      const rootValue  = root.value ?? 0;
      return {
        id:            d.data.id ?? null,
        name:          d.data.name,
        value:         nodeValue || null,
        percentage:    rootValue > 0 ? Math.round((nodeValue / rootValue) * 10000) / 100 : 0,
        depth:         d.depth,
        path:          d.ancestors().map((a) => a.data.name).reverse(),
        childrenCount: d.children?.length ?? 0,
        data:          d.data,
      };
    },
    [root],
  );

  // ── Focus + view state ────────────────────────────────────────────────────
  const svgRef  = useRef<SVGSVGElement | null>(null);
  const viewRef = useRef<[number, number, number]>([root.x, root.y, root.r * 2]);
  const [focus, setFocus] = useState<HierarchyCircularNode<CirclePackingData>>(root);

  const [prevData, setPrevData] = useState(data);
  if (prevData !== data) { setPrevData(data); setFocus(root); }

  // ── Apply view to DOM (D3 imperative index-based) ─────────────────────────
  const applyView = useCallback(
    (v: [number, number, number]) => {
      const el = svgRef.current;
      if (!el) return;
      viewRef.current = v;
      const k = size / v[2];

      const groupNodes = el.querySelectorAll<SVGGElement>("g[data-role='nodes'] > g");
      const circles    = el.querySelectorAll<SVGCircleElement>("g[data-role='nodes'] > g > circle");

      for (let i = 0; i < nodes.length; i++) {
        const d = nodes[i];
        const g = groupNodes[i];
        if (g) g.setAttribute("transform", `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        const j = i - 1;
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

  useLayoutEffect(() => {
    applyView([focus.x, focus.y, focus.r * 2]);
  }, [root, size, focus, applyView]);

  // ── Smooth D3 zoom transition ─────────────────────────────────────────────
  const performZoom = useCallback(
    (target: HierarchyCircularNode<CirclePackingData>, dur: number) => {
      const el = svgRef.current;
      if (!el) return;

      const prev   = focus;
      const startV = viewRef.current;
      const endV: [number, number, number] = [target.x, target.y, target.r * 2];

      setFocus(target);

      d3.select(el)
        .transition()
        .duration(dur)
        .ease(d3.easeCubic)
        .tween("zoom", () => {
          const interp = d3.interpolateZoom(startV, endV);
          return (t) => applyView(interp(t));
        });

      const labelEls = el.querySelectorAll<SVGTextElement>("g[data-role='labels'] > text");
      d3.selectAll<SVGTextElement, unknown>(labelEls)
        .transition()
        .duration(dur)
        .ease(d3.easeCubic)
        .style("fill-opacity", (_: unknown, i: number) => nodes[i].parent === target ? 1 : 0)
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

  // ── Ctrl/Cmd+Click zoom-in timer (250ms to detect DblClick) ──────────────
  const zoomTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleZoom = (fn: () => void) => {
    if (zoomTimerRef.current) { clearTimeout(zoomTimerRef.current); zoomTimerRef.current = null; }
    zoomTimerRef.current = setTimeout(() => { fn(); zoomTimerRef.current = null; }, 250);
  };
  const cancelZoom = () => {
    if (zoomTimerRef.current) { clearTimeout(zoomTimerRef.current); zoomTimerRef.current = null; }
  };

  // ── Escape → reset to root ────────────────────────────────────────────────
  useLayoutEffect(() => {
    if (disabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { cancelZoom(); performZoom(root, duration); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, root, duration]);

  // ── Event handlers ────────────────────────────────────────────────────────

  // Ctrl/Cmd+DblClick on background → zoom out
  const handleSvgDblClick: React.MouseEventHandler<SVGSVGElement> = (e) => {
    if (disabled || !(e.ctrlKey || e.metaKey)) return;
    cancelZoom();
    e.preventDefault();
    const target = focus.parent ?? root;
    if (target !== focus) {
      const dur = e.altKey ? Math.max(250, duration * 10) : duration;
      performZoom(target, dur);
    }
  };

  const tooltipProps = {
    followCursor: true, enterDelay: 50, enterNextDelay: 0,
    disableHoverListener: disabled,
    slotProps: { tooltip: { sx: { maxWidth: 220 } } },
  } as const;

  return (
    <Box sx={{
      display: "inline-flex", position: "relative",
      opacity: disabled ? 0.5 : 1,
      cursor:  disabled ? "not-allowed" : "default",
      userSelect: "none",
    }}>
      <svg
        ref={svgRef}
        width={size} height={size}
        viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
        style={{ display: "block", background: resolvedBackground, fontFamily: fontFamily ?? "sans-serif" }}
        role="img"
        aria-label={data.name}
        onDoubleClick={handleSvgDblClick}
      >
        {/* ── Circles ── */}
        <g data-role="nodes">
          {nodes.map((d, i) => {
            const info = serialize(d);
            const tooltipContent = (
              <Box sx={{ py: 0.5, minWidth: 160 }}>
                <Typography variant="caption" sx={{ fontWeight: "bold", display: "block", fontSize: "0.8rem" }}>
                  {d.data.name}
                </Typography>
                {(d.value ?? 0) > 0 && (
                  <Box sx={{ mt: 0.75, borderTop: "1px solid rgba(255,255,255,0.2)", pt: 0.75 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                      <Typography variant="caption" sx={{ opacity: 0.6 }}>Value</Typography>
                      <Typography variant="caption">{d.value?.toLocaleString()}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                      <Typography variant="caption" sx={{ opacity: 0.6 }}>Share</Typography>
                      <Typography variant="caption">{info.percentage}%</Typography>
                    </Box>
                    {d.children && (
                      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                        <Typography variant="caption" sx={{ opacity: 0.6 }}>Children</Typography>
                        <Typography variant="caption">{d.children.length}</Typography>
                      </Box>
                    )}
                  </Box>
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
                      strokeWidth={0.75}
                      style={{ cursor: disabled ? "not-allowed" : d.children ? "pointer" : "default", transition: "stroke-width 0.1s" }}
                      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.strokeWidth = "2"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.strokeWidth = "0.75"; }}
                      onClick={(e) => {
                        if (disabled) return;
                        if (e.ctrlKey || e.metaKey) {
                          // Ctrl/Cmd+Click → schedule zoom in
                          if (d.children) {
                            const dur = e.altKey ? Math.max(250, duration * 10) : duration;
                            scheduleZoom(() => performZoom(d, dur));
                          }
                          return;
                        }
                        // Regular click → immediate callback
                        onCircleClick?.(info, e);
                      }}
                      onDoubleClick={(e) => {
                        if (disabled) return;
                        if (e.ctrlKey || e.metaKey) {
                          // Ctrl/Cmd+DblClick → cancel zoom-in, zoom out
                          cancelZoom();
                          e.preventDefault(); e.stopPropagation();
                          const target = focus.parent ?? root;
                          if (target !== focus) {
                            const dur = e.altKey ? Math.max(250, duration * 10) : duration;
                            performZoom(target, dur);
                          }
                        }
                      }}
                    />
                  </Tooltip>
                )}
              </g>
            );
          })}
        </g>

        {/* ── Labels ── */}
        {showLabels && (
          <g data-role="labels" textAnchor="middle" dominantBaseline="middle"
             pointerEvents="none" fontSize={labelFontSize} fill={resolvedLabelColor}>
            {nodes.map((d, i) => (
              <text key={`lbl-${i}`}
                transform={`translate(${d.x - size / 2},${d.y - size / 2})`}
                style={{ display: d.parent === root ? "inline" : "none", fillOpacity: d.parent === root ? 1 : 0 }}>
                {d.data.name}
              </text>
            ))}
          </g>
        )}
      </svg>

      {/* Breadcrumb when zoomed in */}
      {focus !== root && !disabled && (
        <Box sx={{ position: "absolute", bottom: 6, left: 0, right: 0, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
          <Typography variant="caption" sx={{ bgcolor: "action.hover", borderRadius: 1, px: 1, py: 0.25, color: "text.secondary", fontSize: "0.7rem" }}>
            {focus.ancestors().map((n) => n.data.name).reverse().join(" › ")}
            {" · Ctrl / Cmd ⌘+DblClick to zoom out · Escape to reset"}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

CirclePackingChart.displayName = "CirclePackingChart";
