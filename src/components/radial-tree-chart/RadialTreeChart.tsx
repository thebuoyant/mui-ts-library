import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
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
  type RadialTreeChartProps,
  type RadialTreeNodeInfo,
  DEFAULT_RADIAL_TREE_CHART_TRANSLATION,
} from "./RadialTreeChart.types";
import type { RadialTreeChartData } from "./RadialTreeChart.types";

// ── Built-in icon path data (MUI-compatible, viewBox 0 0 24 24) ────────────
const ICON_PATHS = {
  folder:
    "M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z",
  person:
    "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
};

// ── Inline icon rendered as white SVG path inside the colored circle ──────
function NodeIcon({ path, size }: { path: string; size: number }) {
  const half = size / 2;
  return (
    // scale from 24×24 viewBox to `size` px, centered at 0,0
    <g transform={`translate(${-half},${-half})`} pointerEvents="none">
      <svg width={size} height={size} viewBox="0 0 24 24" overflow="visible">
        <path d={path} fill="white" />
      </svg>
    </g>
  );
}

// ── Built-in MUI Popover content ──────────────────────────────────────────
function DefaultPopoverContent({
  info,
  labelA,
  labelB,
}: {
  info: RadialTreeNodeInfo;
  labelA: string;
  labelB: string;
}) {
  return (
    <Box sx={{ p: 2, minWidth: 200, maxWidth: 280 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
        <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
          {info.name.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {info.name}
          </Typography>
          {info.subname && (
            <Typography variant="caption" color="text.secondary">
              {info.subname}
            </Typography>
          )}
        </Box>
      </Box>
      {(info.specialValueA != null || info.specialValueB != null) && (
        <>
          <Divider sx={{ mb: 1.5 }} />
          {info.specialValueA != null && (
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                {labelA}
              </Typography>
              <Typography variant="caption">{String(info.specialValueA)}</Typography>
            </Box>
          )}
          {info.specialValueB != null && (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption" color="text.secondary">
                {labelB}
              </Typography>
              <Typography variant="caption">{String(info.specialValueB)}</Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function RadialTreeChart({
  data,
  size = 600,
  autoFit = true,
  sortBy = "name",
  showLabels = true,
  showIcons = true,
  chartColors,
  rootNodeRadius = 22,
  branchNodeRadius = 16,
  leafNodeRadius = 11,
  linkColor,
  linkStrokeOpacity = 1,
  linkStrokeWidth = 1.5,
  labelFontSize = 12,
  labelColor,
  separationSibling = 1,
  separationCousin = 2,
  zoomable = false,
  drillable = false,
  onFocusChange,
  showNodePopover = false,
  renderNodePopoverContent,
  onNodeClick,
  disabled = false,
  translation,
}: RadialTreeChartProps) {
  const theme = useTheme();
  const t = { ...DEFAULT_RADIAL_TREE_CHART_TRANSLATION, ...translation };

  // Depth-based colors from MUI theme palette
  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
  ];
  const palette = chartColors && chartColors.length > 0 ? chartColors : defaultColors;

  // Node sizes by role — root largest, leaves smallest
  const nodeR = useCallback(
    (node: HierarchyPointNode<RadialTreeChartData>): number => {
      if (node.depth === 0) return rootNodeRadius;
      if (node.children) return branchNodeRadius;
      return leafNodeRadius;
    },
    [rootNodeRadius, branchNodeRadius, leafNodeRadius],
  );

  const nodeColor = useCallback(
    (node: HierarchyPointNode<RadialTreeChartData>): string =>
      node.data.colorConfig?.fill ?? palette[node.depth % palette.length],
    [palette],
  );

  // ── Drill-down focus stack ────────────────────────────────────────────────
  const [focusStack, setFocusStack] = useState<RadialTreeChartData[]>([data]);
  const focusData = focusStack[focusStack.length - 1];

  // Reset stack when root data changes
  const [prevData, setPrevData] = useState(data);
  if (prevData !== data) { setPrevData(data); setFocusStack([data]); }

  const margin = 70;
  const radius = Math.max(1, size / 2 - margin);

  // ── D3 hierarchy + radial tree layout — built from focusData ─────────────
  const root = useMemo(() => {
    const h = d3.hierarchy<RadialTreeChartData>(focusData);
    if (sortBy === "value") {
      h.sum((d) => d.value ?? 0);
      h.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
    } else {
      h.sort((a, b) => d3.ascending(a.data.name, b.data.name));
    }
    return d3
      .tree<RadialTreeChartData>()
      .size([2 * Math.PI, radius])
      .separation((a, b) => {
        const base = a.parent === b.parent ? separationSibling : separationCousin;
        return (base * 1.4) / Math.max(1, a.depth);
      })(h);
  }, [focusData, sortBy, radius, separationSibling, separationCousin]);

  const links = root.links();
  const nodes = root.descendants();

  const linkGen = useMemo(
    () =>
      d3
        .linkRadial<HierarchyPointLink<RadialTreeChartData>, HierarchyPointNode<RadialTreeChartData>>()
        .angle((n) => n.x)
        .radius((n) => n.y),
    [],
  );

  // ── Serializer ─────────────────────────────────────────────────────────────
  const serializeNode = useCallback(
    (node: HierarchyPointNode<RadialTreeChartData>): RadialTreeNodeInfo => ({
      id:            node.data.id,
      name:          node.data.name,
      subname:       node.data.subname ?? null,
      value:         (typeof node.value === "number" ? node.value : null) ?? node.data.value ?? null,
      specialValueA: node.data.specialValueA ?? null,
      specialValueB: node.data.specialValueB ?? null,
      depth:         node.depth,
      path:          node.ancestors().map((a) => a.data.name).reverse(),
      childrenCount: node.children?.length ?? 0,
      data:          node.data,
    }),
    [],
  );

  // ── Auto-fit viewBox + zoom ───────────────────────────────────────────────
  const contentRef = useRef<SVGGElement>(null);
  const [baseViewBox, setBaseViewBox] = useState(`-${size / 2} -${size / 2} ${size} ${size}`);
  const [zoomScale,   setZoomScale]   = useState(1);

  useLayoutEffect(() => {
    const g = contentRef.current;
    if (!g) return;
    const id = requestAnimationFrame(() => {
      try {
        const box = g.getBBox();
        const pad = 20;
        setBaseViewBox(`${box.x - pad} ${box.y - pad} ${box.width + 2 * pad} ${box.height + 2 * pad}`);
      } catch {
        setBaseViewBox(`-${size / 2} -${size / 2} ${size} ${size}`);
      }
    });
    return () => cancelAnimationFrame(id);
  }, [size, root, showLabels, autoFit]);

  // Apply zoom to viewBox: shrink/expand around center
  const viewBox = useMemo(() => {
    if (zoomScale === 1) return baseViewBox;
    const [x, y, w, h] = baseViewBox.split(" ").map(Number);
    const nw = w / zoomScale;
    const nh = h / zoomScale;
    return `${x + (w - nw) / 2} ${y + (h - nh) / 2} ${nw} ${nh}`;
  }, [baseViewBox, zoomScale]);

  // Ctrl+Wheel zoom handler
  const handleWheel = useCallback(
    (e: React.WheelEvent<SVGSVGElement>) => {
      if (!zoomable || disabled || !e.ctrlKey) return;
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      setZoomScale((prev) => Math.max(0.25, Math.min(8, prev * factor)));
    },
    [zoomable, disabled],
  );

  // Escape resets zoom + drill-down
  useLayoutEffect(() => {
    if (!zoomable && !drillable) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomable) setZoomScale(1);
        if (drillable) { setFocusStack([data]); onFocusChange?.(null); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomable, drillable, data, onFocusChange]);

  // ── Drill-Down: 250ms timer disambiguates Ctrl+Click vs Ctrl+DblClick ────
  const drillTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleDrill = (fn: () => void) => {
    if (drillTimerRef.current) { clearTimeout(drillTimerRef.current); drillTimerRef.current = null; }
    drillTimerRef.current = setTimeout(() => { fn(); drillTimerRef.current = null; }, 250);
  };
  const cancelDrill = () => {
    if (drillTimerRef.current) { clearTimeout(drillTimerRef.current); drillTimerRef.current = null; }
  };

  // ── Hover state for subtle visual feedback ──────────────────────────────────
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // ── Popover state ──────────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorRef    = useRef<HTMLDivElement>(null);
  const [popoverOpen,     setPopoverOpen]     = useState(false);
  const [popoverAnchor,   setPopoverAnchor]   = useState<HTMLElement | null>(null);
  const [popoverAnchorPos, setPopoverAnchorPos] = useState({ left: 0, top: 0 });
  const [activeInfo,      setActiveInfo]      = useState<RadialTreeNodeInfo | null>(null);

  const drillOut = useCallback(() => {
    setFocusStack((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.slice(0, -1);
      onFocusChange?.(next.length <= 1 ? null : { id: next[next.length - 1].id, name: next[next.length - 1].name, subname: next[next.length - 1].subname ?? null, value: null, specialValueA: null, specialValueB: null, depth: next.length - 1, path: next.map((n) => n.name), childrenCount: next[next.length - 1].children?.length ?? 0, data: next[next.length - 1] });
      return next;
    });
  }, [onFocusChange]);

  const handleNodeDblClick: React.MouseEventHandler<SVGGElement> = (e) => {
    if (disabled || !drillable) return;
    if (e.ctrlKey || e.metaKey) { cancelDrill(); drillOut(); }
  };

  const handleNodeClick: React.MouseEventHandler<SVGGElement> = (e) => {
    if (disabled) return;
    const idx  = Number(e.currentTarget.getAttribute("data-idx"));
    const node = nodes[idx];
    if (!node) return;
    const info = serializeNode(node);

    // Ctrl+Click: drill-down into subtree
    if ((e.ctrlKey || e.metaKey) && drillable && node.children) {
      scheduleDrill(() => {
        setFocusStack((prev) => [...prev, node.data]);
        onFocusChange?.(info);
      });
      return;
    }

    // Regular click: popover + callback
    if (showNodePopover) {
      const rect = containerRef.current?.getBoundingClientRect();
      setPopoverAnchorPos({
        left: rect ? e.clientX - rect.left : e.clientX,
        top:  rect ? e.clientY - rect.top  : e.clientY,
      });
      setPopoverAnchor(anchorRef.current);
      setActiveInfo(info);
      setPopoverOpen(true);
    }
    onNodeClick?.(info, e);
  };

  const textColor    = labelColor || theme.palette.text.primary;
  const resolvedLink = linkColor  || theme.palette.text.secondary;
  const bgColor      = theme.palette.background.paper;
  const fontFamily   = theme.typography.fontFamily;

  return (
    <Box
      ref={containerRef}
      sx={{
        display:    "inline-flex",
        position:   "relative",
        opacity:    disabled ? 0.5 : 1,
        cursor:     disabled ? "not-allowed" : "default",
        userSelect: "none",
      }}
    >
      {/* Drill-down breadcrumb — shown when not at root */}
      {drillable && focusStack.length > 1 && (
        <Box
          sx={{
            position: "absolute",
            top: 4,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 0.5,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              bgcolor: "action.hover",
              borderRadius: 1,
              px: 1,
              py: 0.25,
              color: "text.secondary",
              fontSize: "0.7rem",
            }}
          >
            {focusStack.map((n) => n.name).join(" › ")}
          </Typography>
        </Box>
      )}

      <Box
        ref={anchorRef}
        sx={{
          position: "absolute",
          left: popoverAnchorPos.left,
          top:  popoverAnchorPos.top,
          width: 0, height: 0,
        }}
      />

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

          {/* ── Curved links ─────────────────────────────────────────────── */}
          <g
            fill="none"
            stroke={resolvedLink}
            strokeOpacity={linkStrokeOpacity}
            strokeWidth={linkStrokeWidth}
          >
            {links.map((link, i) => (
              <path key={`link-${i}`} d={linkGen(link) as string} />
            ))}
          </g>

          {/* ── Nodes ────────────────────────────────────────────────────── */}
          <g>
            {nodes.map((node, i) => {
              const r     = nodeR(node);
              const color = nodeColor(node);
              const info  = serializeNode(node);
              const isHov = hoverIdx === i;
              // Icon: folder for branch, person for leaf
              const iconPath = node.children ? ICON_PATHS.folder : ICON_PATHS.person;
              // Icon size = ~65% of circle diameter, fits nicely inside
              const iSize = Math.round(r * 1.3);

              const tooltipContent = (
                <Box sx={{ py: 0.5, minWidth: 160 }}>
                  {/* Role */}
                  <Typography variant="caption" sx={{ fontWeight: "bold", display: "block", fontSize: "0.8rem" }}>
                    {node.data.name}
                  </Typography>
                  {/* Person name */}
                  {node.data.subname && (
                    <Typography variant="caption" sx={{ display: "block", opacity: 0.85 }}>
                      {node.data.subname}
                    </Typography>
                  )}

                  {/* Custom data fields + reports count */}
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
                <Tooltip
                  key={`node-${node.data.id}-${i}`}
                  title={tooltipContent}
                  followCursor
                  enterDelay={50}
                  enterNextDelay={0}
                  disableHoverListener={disabled}
                  slotProps={{ tooltip: { sx: { maxWidth: 260 } } }}
                >
                  <g
                    data-idx={i}
                    transform={`rotate(${(node.x * 180) / Math.PI - 90}) translate(${node.y},0)`}
                    onClick={handleNodeClick}
                    onDoubleClick={handleNodeDblClick}
                    onMouseEnter={() => !disabled && setHoverIdx(i)}
                    onMouseLeave={() => setHoverIdx(null)}
                    style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                  >
                    {/* Large invisible hit area — ensures hover detection on small nodes */}
                    <circle r={Math.max(r + 8, 24)} fill="transparent" />

                    {/* Drop shadow for depth */}
                    <circle
                      r={r + 2}
                      fill={color}
                      fillOpacity={0.15}
                    />

                    {/* Main filled circle */}
                    <circle
                      r={r}
                      fill={color}
                      fillOpacity={isHov ? 0.85 : 1}
                      style={{ transition: "fill-opacity 0.15s" }}
                    />

                    {/* White icon centered inside */}
                    {showIcons && (
                      <NodeIcon path={iconPath} size={iSize} />
                    )}
                  </g>
                </Tooltip>
              );
            })}
          </g>

          {/* ── Labels ───────────────────────────────────────────────────── */}
          {showLabels && (
            <g>
              {nodes.map((node, i) => {
                const r      = nodeR(node);
                const isRight = node.x < Math.PI === !node.children;
                const offset  = r + 6;
                const xOff    = isRight ? offset : -offset;
                const anchor  = isRight ? "start" : "end";

                return (
                  <text
                    key={`lbl-${node.data.id}-${i}`}
                    transform={`rotate(${(node.x * 180) / Math.PI - 90}) translate(${node.y},0) rotate(${node.x >= Math.PI ? 180 : 0})`}
                    dy="0.35em"
                    x={xOff}
                    textAnchor={anchor}
                    paintOrder="stroke"
                    stroke={bgColor}
                    strokeWidth={3}
                    fill={textColor}
                    fontSize={labelFontSize}
                    fontWeight={node.depth === 0 ? "bold" : "normal"}
                    pointerEvents="none"
                  >
                    {node.data.name}
                  </text>
                );
              })}
            </g>
          )}
        </g>
      </svg>

      {/* ── Built-in MUI Popover ────────────────────────────────────────── */}
      {showNodePopover && (
        <Popover
          open={popoverOpen}
          anchorEl={popoverAnchor}
          onClose={() => setPopoverOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          slotProps={{ paper: { elevation: 4 } }}
        >
          {activeInfo &&
            (renderNodePopoverContent ? (
              renderNodePopoverContent(activeInfo)
            ) : (
              <DefaultPopoverContent
                info={activeInfo}
                labelA={t.specialValueA ?? "Value A"}
                labelB={t.specialValueB ?? "Value B"}
              />
            ))}
        </Popover>
      )}
    </Box>
  );
}

RadialTreeChart.displayName = "RadialTreeChart";
