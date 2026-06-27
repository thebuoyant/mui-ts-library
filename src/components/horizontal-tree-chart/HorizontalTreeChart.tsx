import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import type { HierarchyPointNode, HierarchyPointLink } from "d3-hierarchy";
import {
  Avatar,
  Box,
  Divider,
  Popover,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  type HorizontalTreeChartProps,
  type HorizontalTreeNodeInfo,
  DEFAULT_HORIZONTAL_TREE_TRANSLATION,
} from "./HorizontalTreeChart.types";
import type { HorizontalTreeData } from "./HorizontalTreeChart.types";

// ── SVG icon paths (same as RadialTreeChart) ──────────────────────────────────
const ICON_PATHS = {
  folder: "M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z",
  person: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
};

function NodeIcon({ path, size }: { path: string; size: number }) {
  const half = size / 2;
  return (
    <g transform={`translate(${-half},${-half})`} pointerEvents="none">
      <svg width={size} height={size} viewBox="0 0 24 24" overflow="visible">
        <path d={path} fill="white" />
      </svg>
    </g>
  );
}

// ── Built-in node popover ─────────────────────────────────────────────────────
function DefaultPopoverContent({ info, labelA, labelB }: {
  info: HorizontalTreeNodeInfo; labelA: string; labelB: string;
}) {
  return (
    <Box sx={{ p: 2, minWidth: 200, maxWidth: 280 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
        <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
          {info.name.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>{info.name}</Typography>
          {info.subname && <Typography variant="caption" color="text.secondary">{info.subname}</Typography>}
        </Box>
      </Box>
      {(info.specialValueA != null || info.specialValueB != null) && (
        <>
          <Divider sx={{ mb: 1.5 }} />
          {info.specialValueA != null && (
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">{labelA}</Typography>
              <Typography variant="caption">{String(info.specialValueA)}</Typography>
            </Box>
          )}
          {info.specialValueB != null && (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption" color="text.secondary">{labelB}</Typography>
              <Typography variant="caption">{String(info.specialValueB)}</Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function HorizontalTreeChart({
  data,
  orientation = "LR",
  width = 800,
  height = 500,
  levelSpacing = 200,
  nodeRadius = 10,
  sortBy = "name",
  showLabels = true,
  labelFontSize = 12,
  labelColor,
  showIcons = true,
  chartColors,
  linkStrokeOpacity = 1,
  linkStrokeWidth = 1.5,
  linkColor,
  zoomable = false,
  drillable = false,
  onFocusChange,
  showNodePopover = false,
  renderNodePopoverContent,
  onNodeClick,
  duration = 750,
  disabled = false,
  translation,
}: HorizontalTreeChartProps) {
  const theme = useTheme();
  const t = { ...DEFAULT_HORIZONTAL_TREE_TRANSLATION, ...translation };

  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.success.main,
    theme.palette.info.main,
  ];
  const palette         = chartColors && chartColors.length > 0 ? chartColors : defaultColors;
  const resolvedLabel   = labelColor || theme.palette.text.primary;
  const resolvedLink    = linkColor  || theme.palette.text.secondary;
  const bgColor         = theme.palette.background.paper;
  const fontFamily      = theme.typography.fontFamily;

  // TB/BT swap width & height for the layout
  const isVertical = orientation === "TB" || orientation === "BT";
  const layoutW    = isVertical ? height : width;
  const layoutH    = isVertical ? width  : height;

  // ── Drill-down focus stack ─────────────────────────────────────────────────
  const [focusStack, setFocusStack] = useState<HorizontalTreeData[]>([data]);
  const focusData = focusStack[focusStack.length - 1];
  const [prevData, setPrevData] = useState(data);
  const [skipNextFade, setSkipNextFade] = useState(false);
  if (prevData !== data) {
    setPrevData(data);
    setFocusStack([data]);
    setSkipNextFade(true); // brand-new data — jump instantly, don't crossfade
  }

  // ── D3 tree layout ─────────────────────────────────────────────────────────
  const root = useMemo(() => {
    const h = d3.hierarchy<HorizontalTreeData>(focusData);
    if (sortBy === "value") {
      h.sum((d) => d.value ?? 0);
      h.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
    } else {
      h.sort((a, b) => d3.ascending(String(a.data.name), String(b.data.name)));
    }
    const maxDepth = d3.max(h.descendants(), (d) => d.depth) ?? 1;
    return d3.tree<HorizontalTreeData>()
      .size([layoutW * 0.8, Math.min(maxDepth * levelSpacing, layoutH * 0.85)])(h);
  }, [focusData, sortBy, layoutW, layoutH, levelSpacing]);

  const nodes = root.descendants();
  const links = root.links();

  // ── Drill transition: crossfade the previous layout out on top of the new one ──
  // Same rationale as RadialTreeChart: drilling re-roots the hierarchy entirely
  // (different node set per focus level), so a crossfade avoids needing
  // enter/update/exit node-matching for a smooth transition.
  const prevRootRef    = useRef(root);
  const fadeFrameRef   = useRef<number | null>(null);
  const [fadeFrom,    setFadeFrom]    = useState<typeof root | null>(null);
  const [fadeOpacity, setFadeOpacity] = useState(0);

  useEffect(() => {
    const old = prevRootRef.current;
    prevRootRef.current = root;
    if (old === root) return;

    if (fadeFrameRef.current != null) { cancelAnimationFrame(fadeFrameRef.current); fadeFrameRef.current = null; }

    if (skipNextFade || duration <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSkipNextFade(false);
      setFadeFrom(null);
      return;
    }

    setFadeFrom(old);
    setFadeOpacity(1);
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setFadeOpacity(1 - d3.easeCubic(t));
      if (t < 1) {
        fadeFrameRef.current = requestAnimationFrame(tick);
      } else {
        fadeFrameRef.current = null;
        setFadeFrom(null);
      }
    };
    fadeFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (fadeFrameRef.current != null) cancelAnimationFrame(fadeFrameRef.current);
    };
  }, [root, duration, skipNextFade]);

  // ── Color per depth ────────────────────────────────────────────────────────
  const nodeColor = useCallback(
    (node: HierarchyPointNode<HorizontalTreeData>): string =>
      node.data.colorConfig?.fill ?? palette[node.depth % palette.length],
    [palette],
  );

  // ── Coordinate transform based on orientation ──────────────────────────────
  // D3 tree: x = perpendicular spread, y = depth (distance from root)
  const toSvg = useCallback(
    (node: HierarchyPointNode<HorizontalTreeData>): { x: number; y: number } => {
      switch (orientation) {
        case "LR": return { x: node.y, y: node.x - layoutW * 0.4 };
        case "RL": return { x: layoutH * 0.85 - node.y, y: node.x - layoutW * 0.4 };
        case "TB": return { x: node.x - layoutW * 0.4, y: node.y };
        case "BT": return { x: node.x - layoutW * 0.4, y: layoutH * 0.85 - node.y };
      }
    },
    [orientation, layoutW, layoutH],
  );

  // ── Link generator ─────────────────────────────────────────────────────────
  const linkPath = useCallback(
    (link: HierarchyPointLink<HorizontalTreeData>): string => {
      const s = toSvg(link.source);
      const t2 = toSvg(link.target);
      if (orientation === "LR" || orientation === "RL") {
        const mx = (s.x + t2.x) / 2;
        return `M${s.x},${s.y} C${mx},${s.y} ${mx},${t2.y} ${t2.x},${t2.y}`;
      }
      const my = (s.y + t2.y) / 2;
      return `M${s.x},${s.y} C${s.x},${my} ${t2.x},${my} ${t2.x},${t2.y}`;
    },
    [toSvg, orientation],
  );

  // ── Serializer ─────────────────────────────────────────────────────────────
  const serialize = useCallback(
    (node: HierarchyPointNode<HorizontalTreeData>): HorizontalTreeNodeInfo => ({
      id:            node.data.id ?? null,
      name:          node.data.name,
      subname:       node.data.subname ?? null,
      value:         node.value ?? node.data.value ?? null,
      specialValueA: node.data.specialValueA ?? null,
      specialValueB: node.data.specialValueB ?? null,
      depth:         node.depth,
      path:          node.ancestors().map((a) => a.data.name).reverse(),
      childrenCount: node.children?.length ?? 0,
      data:          node.data,
    }),
    [],
  );

  // ── ViewBox ─────────────────────────────────────────────────────────────────
  const [baseViewBox, setBaseViewBox] = useState(`0 -${height / 2} ${width} ${height}`);
  const [zoomScale,   setZoomScale]   = useState(1);
  const contentRef = useRef<SVGGElement>(null);

  const viewBox = useMemo(() => {
    if (zoomScale === 1) return baseViewBox;
    const [x, y, w, h] = baseViewBox.split(" ").map(Number);
    const nw = w / zoomScale; const nh = h / zoomScale;
    return `${x + (w - nw) / 2} ${y + (h - nh) / 2} ${nw} ${nh}`;
  }, [baseViewBox, zoomScale]);

  useLayoutEffect(() => {
    const g = contentRef.current;
    if (!g) return;
    const id = requestAnimationFrame(() => {
      try {
        const box = g.getBBox();
        const pad = 24;
        setBaseViewBox(`${box.x - pad} ${box.y - pad} ${box.width + 2 * pad} ${box.height + 2 * pad}`);
      } catch { setBaseViewBox(`0 -${height / 2} ${width} ${height}`); }
    });
    return () => cancelAnimationFrame(id);
  }, [root, width, height, orientation]);

  // ── Zoom ───────────────────────────────────────────────────────────────────
  const handleWheel = useCallback((e: React.WheelEvent<SVGSVGElement>) => {
    if (!zoomable || disabled || !e.ctrlKey) return;
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    setZoomScale((prev) => Math.max(0.25, Math.min(8, prev * factor)));
  }, [zoomable, disabled]);

  // ── Drill-down ─────────────────────────────────────────────────────────────
  const zoomTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleDrill = (fn: () => void) => {
    if (zoomTimerRef.current) { clearTimeout(zoomTimerRef.current); zoomTimerRef.current = null; }
    zoomTimerRef.current = setTimeout(() => { fn(); zoomTimerRef.current = null; }, 250);
  };
  const cancelDrill = () => {
    if (zoomTimerRef.current) { clearTimeout(zoomTimerRef.current); zoomTimerRef.current = null; }
  };

  const drillOut = useCallback(() => {
    setFocusStack((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.slice(0, -1);
      onFocusChange?.({ focusedNode: { id: next[next.length - 1].id ?? null, name: next[next.length - 1].name, subname: next[next.length - 1].subname ?? null, value: null, specialValueA: null, specialValueB: null, depth: next.length - 1, path: next.map((n) => n.name), childrenCount: next[next.length - 1].children?.length ?? 0, data: next[next.length - 1] }, isRoot: next.length <= 1 });
      return next;
    });
  }, [onFocusChange]);

  useLayoutEffect(() => {
    if (!zoomable && !drillable) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomable) setZoomScale(1);
        if (drillable) { setFocusStack([data]); onFocusChange?.({ focusedNode: { id: data.id ?? null, name: data.name, subname: data.subname ?? null, value: null, specialValueA: null, specialValueB: null, depth: 0, path: [data.name], childrenCount: data.children?.length ?? 0, data }, isRoot: true }); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomable, drillable, data, onFocusChange]);

  // ── Popover state ──────────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorRef    = useRef<HTMLDivElement>(null);
  const [popoverOpen,      setPopoverOpen]      = useState(false);
  const [popoverAnchor,    setPopoverAnchor]    = useState<HTMLElement | null>(null);
  const [popoverAnchorPos, setPopoverAnchorPos] = useState({ left: 0, top: 0 });
  const [activeInfo,       setActiveInfo]       = useState<HorizontalTreeNodeInfo | null>(null);

  const handleNodeClick = (node: HierarchyPointNode<HorizontalTreeData>, e: React.MouseEvent<SVGGElement>) => {
    if (disabled) return;
    const info = serialize(node);
    if ((e.ctrlKey || e.metaKey) && drillable && node.children) {
      scheduleDrill(() => { setFocusStack((prev) => [...prev, node.data]); onFocusChange?.({ focusedNode: info, isRoot: false }); });
      return;
    }
    if ((e.ctrlKey || e.metaKey) && drillable) { cancelDrill(); drillOut(); return; }
    if (showNodePopover) {
      const rect = containerRef.current?.getBoundingClientRect();
      setPopoverAnchorPos({ left: rect ? e.clientX - rect.left : e.clientX, top: rect ? e.clientY - rect.top : e.clientY });
      setPopoverAnchor(anchorRef.current);
      setActiveInfo(info);
      setPopoverOpen(true);
    }
    onNodeClick?.(info, e);
  };

  const handleNodeDblClick = (node: HierarchyPointNode<HorizontalTreeData>, e: React.MouseEvent<SVGGElement>) => {
    if (disabled || !drillable) return;
    if (e.ctrlKey || e.metaKey) { cancelDrill(); drillOut(); }
  };

  const tooltipProps = {
    followCursor: true, enterDelay: 50, enterNextDelay: 0,
    disableHoverListener: disabled,
    slotProps: { tooltip: { sx: { maxWidth: 240 } } },
  } as const;

  const iSize = Math.round(nodeRadius * 1.3);

  // Static, non-interactive render of a (now superseded) layout, fading out on
  // top of the live one during a drill transition. No labels/tooltips/handlers
  // — kept deliberately minimal so two layers never visually compete for clarity.
  const renderGhostLayer = (ghostRoot: typeof root, opacity: number) => (
    <g data-testid="drill-ghost-layer" opacity={opacity} pointerEvents="none">
      <g fill="none" stroke={resolvedLink} strokeOpacity={linkStrokeOpacity} strokeWidth={linkStrokeWidth}>
        {ghostRoot.links().map((link, i) => (
          <path key={`ghost-link-${i}`} d={linkPath(link)} />
        ))}
      </g>
      <g>
        {ghostRoot.descendants().map((node, i) => {
          const pos = toSvg(node);
          return (
            <g key={`ghost-node-${i}`} transform={`translate(${pos.x},${pos.y})`}>
              <circle r={nodeRadius + 2} fill={nodeColor(node)} fillOpacity={0.15} />
              <circle r={nodeRadius} fill={nodeColor(node)} />
              {showIcons && (
                <NodeIcon path={node.children ? ICON_PATHS.folder : ICON_PATHS.person} size={iSize} />
              )}
            </g>
          );
        })}
      </g>
    </g>
  );

  return (
    <Box
      ref={containerRef}
      sx={{ display: "inline-flex", position: "relative", opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "default", userSelect: "none" }}
    >
      <Box ref={anchorRef} sx={{ position: "absolute", left: popoverAnchorPos.left, top: popoverAnchorPos.top, width: 0, height: 0 }} />

      {/* Drill breadcrumb */}
      {drillable && focusStack.length > 1 && (
        <Box sx={{ position: "absolute", top: 4, left: 0, right: 0, display: "flex", justifyContent: "center", pointerEvents: "none", zIndex: 1 }}>
          <Typography variant="caption" sx={{ bgcolor: "action.hover", borderRadius: 1, px: 1, py: 0.25, color: "text.secondary", fontSize: "0.7rem" }}>
            {focusStack.map((n) => n.name).join(" › ")}
          </Typography>
        </Box>
      )}

      <svg
        width={width} height={height}
        viewBox={viewBox}
        onWheel={handleWheel}
        style={{ fontFamily: fontFamily ?? "sans-serif", overflow: zoomable && zoomScale > 1 ? "hidden" : "visible" }}
        role="img"
        aria-label={data.name}
      >
        <g ref={contentRef}>
          {/* Links */}
          <g fill="none" stroke={resolvedLink} strokeOpacity={linkStrokeOpacity} strokeWidth={linkStrokeWidth}>
            {links.map((link, i) => (
              <path key={`link-${i}`} d={linkPath(link)} />
            ))}
          </g>

          {/* Nodes */}
          {nodes.map((node, i) => {
            const pos     = toSvg(node);
            const color   = nodeColor(node);
            const info    = serialize(node);
            const iconPath = node.children ? ICON_PATHS.folder : ICON_PATHS.person;
            const isLR    = orientation === "LR";
            const isRL    = orientation === "RL";
            const labelX  = isLR ? nodeRadius + 6 : isRL ? -(nodeRadius + 6) : 0;
            const labelY  = (!isLR && !isRL) ? (orientation === "TB" ? nodeRadius + 16 : -(nodeRadius + 6)) : 0;
            const anchor  = isLR ? "start" : isRL ? "end" : "middle";

            const tooltipContent = (
              <Box sx={{ py: 0.5, minWidth: 140 }}>
                <Typography variant="caption" sx={{ fontWeight: "bold", display: "block", fontSize: "0.8rem" }}>
                  {node.data.name}
                </Typography>
                {node.data.subname && <Typography variant="caption" sx={{ display: "block", opacity: 0.85 }}>{node.data.subname}</Typography>}
                {(info.specialValueA != null || info.specialValueB != null || node.children) && (
                  <Box sx={{ mt: 0.75, borderTop: "1px solid rgba(255,255,255,0.2)", pt: 0.75 }}>
                    {info.specialValueA != null && (
                      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                        <Typography variant="caption" sx={{ opacity: 0.6 }}>{t.specialValueA ?? "A"}</Typography>
                        <Typography variant="caption">{String(info.specialValueA)}</Typography>
                      </Box>
                    )}
                    {info.specialValueB != null && (
                      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                        <Typography variant="caption" sx={{ opacity: 0.6 }}>{t.specialValueB ?? "B"}</Typography>
                        <Typography variant="caption">{String(info.specialValueB)}</Typography>
                      </Box>
                    )}
                    {node.children && (
                      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                        <Typography variant="caption" sx={{ opacity: 0.6 }}>Reports</Typography>
                        <Typography variant="caption">{node.children.length}</Typography>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            );

            return (
              <Tooltip key={`node-${i}`} {...tooltipProps} title={tooltipContent}>
                <g
                  transform={`translate(${pos.x},${pos.y})`}
                  onClick={(e) => handleNodeClick(node, e)}
                  onDoubleClick={(e) => handleNodeDblClick(node, e)}
                  style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                >
                  {/* Hit area */}
                  <circle r={nodeRadius + 8} fill="transparent" />
                  {/* Halo */}
                  <circle r={nodeRadius + 2} fill={color} fillOpacity={0.15} />
                  {/* Main circle */}
                  <circle r={nodeRadius} fill={color} />
                  {/* Icon */}
                  {showIcons && <NodeIcon path={iconPath} size={iSize} />}
                  {/* Label */}
                  {showLabels && (
                    <text
                      x={labelX} y={labelY}
                      dy="0.35em"
                      textAnchor={anchor}
                      fontSize={labelFontSize}
                      fontWeight={node.children ? "bold" : "normal"}
                      fill={node.data.colorConfig?.textColor ?? resolvedLabel}
                      paintOrder="stroke"
                      stroke={bgColor}
                      strokeWidth={3}
                      pointerEvents="none"
                    >
                      {node.data.name}
                    </text>
                  )}
                </g>
              </Tooltip>
            );
          })}

          {/* ── Drill transition ghost — previous layout fading out on top ─── */}
          {fadeFrom && renderGhostLayer(fadeFrom, fadeOpacity)}
        </g>
      </svg>

      {/* MUI Popover */}
      {showNodePopover && (
        <Popover open={popoverOpen} anchorEl={popoverAnchor} onClose={() => setPopoverOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          slotProps={{ paper: { elevation: 4 } }}
        >
          {activeInfo && (renderNodePopoverContent ? renderNodePopoverContent(activeInfo) :
            <DefaultPopoverContent info={activeInfo} labelA={t.specialValueA ?? "Value A"} labelB={t.specialValueB ?? "Value B"} />
          )}
        </Popover>
      )}
    </Box>
  );
}

HorizontalTreeChart.displayName = "HorizontalTreeChart";
