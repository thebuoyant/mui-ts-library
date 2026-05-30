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
      palette[node.depth % palette.length],
    [palette],
  );

  const margin = 70;
  const radius = Math.max(1, size / 2 - margin);

  // ── D3 hierarchy + radial tree layout ─────────────────────────────────────
  const root = useMemo(() => {
    const h = d3.hierarchy<RadialTreeChartData>(data);
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
  }, [data, sortBy, radius, separationSibling, separationCousin]);

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

  // ── Auto-fit viewBox ────────────────────────────────────────────────────────
  const contentRef = useRef<SVGGElement>(null);
  const [viewBox, setViewBox] = useState(`-${size / 2} -${size / 2} ${size} ${size}`);

  useLayoutEffect(() => {
    const g = contentRef.current;
    if (!g) return;
    const id = requestAnimationFrame(() => {
      try {
        const box = g.getBBox();
        const pad = 20;
        setViewBox(`${box.x - pad} ${box.y - pad} ${box.width + 2 * pad} ${box.height + 2 * pad}`);
      } catch {
        setViewBox(`-${size / 2} -${size / 2} ${size} ${size}`);
      }
    });
    return () => cancelAnimationFrame(id);
  }, [size, root, showLabels, autoFit]);

  // ── Hover state for subtle visual feedback ──────────────────────────────────
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // ── Popover state ──────────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorRef    = useRef<HTMLDivElement>(null);
  const [popoverOpen,     setPopoverOpen]     = useState(false);
  const [popoverAnchor,   setPopoverAnchor]   = useState<HTMLElement | null>(null);
  const [popoverAnchorPos, setPopoverAnchorPos] = useState({ left: 0, top: 0 });
  const [activeInfo,      setActiveInfo]      = useState<RadialTreeNodeInfo | null>(null);

  const handleNodeClick: React.MouseEventHandler<SVGGElement> = (e) => {
    if (disabled) return;
    const idx  = Number(e.currentTarget.getAttribute("data-idx"));
    const node = nodes[idx];
    if (!node) return;
    const info = serializeNode(node);
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

  const textColor    = labelColor ?? theme.palette.text.primary;
  const resolvedLink = linkColor  ?? theme.palette.text.secondary;
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
        style={{ fontFamily: fontFamily ?? "sans-serif", overflow: "visible" }}
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
