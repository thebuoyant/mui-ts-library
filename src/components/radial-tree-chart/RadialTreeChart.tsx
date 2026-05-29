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
import FolderOutlinedIcon    from "@mui/icons-material/FolderOutlined";
import PersonOutlinedIcon    from "@mui/icons-material/PersonOutlined";
import {
  type RadialTreeChartProps,
  type RadialTreeNodeInfo,
  type RadialTreeNodeIconSpec,
  DEFAULT_RADIAL_TREE_CHART_TRANSLATION,
} from "./RadialTreeChart.types";
import type { RadialTreeChartData } from "./RadialTreeChart.types";

// Discriminates between { icon, color } spec and bare component
const isIconSpec = (s: RadialTreeNodeIconSpec): s is { icon: React.ElementType; color?: string } =>
  typeof s === "object" && "icon" in s;

// ── Built-in node popover content ─────────────────────────────────────────────

type DefaultPopoverContentProps = {
  info:           RadialTreeNodeInfo;
  labelA:         string;
  labelB:         string;
};

function DefaultPopoverContent({ info, labelA, labelB }: DefaultPopoverContentProps) {
  return (
    <Box sx={{ p: 2, minWidth: 200, maxWidth: 280 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
        <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
          {info.name.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>{info.name}</Typography>
          {info.subname && (
            <Typography variant="caption" color="text.secondary">{info.subname}</Typography>
          )}
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

export function RadialTreeChart({
  data,
  size = 600,
  autoFit = true,
  sortBy = "name",
  showLabels = true,
  chartColors,
  linkStrokeOpacity = 0.4,
  linkStrokeWidth = 1.5,
  nodeRadius = 4,
  separationSibling = 1,
  separationCousin = 2,
  showIcons = true,
  iconSize = 18,
  nodeIconsByDepth,
  renderNodeIcon,
  showNodePopover = false,
  renderNodePopoverContent,
  onNodeClick,
  disabled = false,
  translation,
}: RadialTreeChartProps) {
  const theme = useTheme();
  const t = { ...DEFAULT_RADIAL_TREE_CHART_TRANSLATION, ...translation };

  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.success.main,
    theme.palette.info.main,
  ];
  const palette = chartColors && chartColors.length > 0 ? chartColors : defaultColors;

  const margin = 40;
  const radius = Math.max(1, size / 2 - margin);

  // ── hierarchy + layout ────────────────────────────────────────────────────
  const root = useMemo(() => {
    const h = d3.hierarchy<RadialTreeChartData>(data);
    if (sortBy === "value") {
      h.sum((d) => d.value ?? 0);
      h.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
    } else {
      h.sort((a, b) => d3.ascending(String(a.data.name), String(b.data.name)));
    }
    const spacingBoost = showIcons ? 1.25 : 1;
    return d3
      .tree<RadialTreeChartData>()
      .size([2 * Math.PI, radius])
      .separation((a, b) => {
        const base = a.parent === b.parent ? separationSibling : separationCousin;
        return (base * spacingBoost) / Math.max(1, a.depth);
      })(h);
  }, [data, sortBy, radius, separationSibling, separationCousin, showIcons]);

  const links  = root.links();
  const nodes  = root.descendants();

  // ── radial link generator ─────────────────────────────────────────────────
  const linkGen = useMemo(
    () =>
      d3
        .linkRadial<HierarchyPointLink<RadialTreeChartData>, HierarchyPointNode<RadialTreeChartData>>()
        .angle((n) => n.x)
        .radius((n) => n.y),
    [],
  );

  // ── color per depth ───────────────────────────────────────────────────────
  const nodeColor = useCallback(
    (node: HierarchyPointNode<RadialTreeChartData>): string => {
      if (palette.length > 0) return palette[node.depth % palette.length];
      return node.children
        ? theme.palette.text.secondary
        : theme.palette.action.disabled;
    },
    [palette, theme],
  );

  // ── icon resolution ───────────────────────────────────────────────────────
  const pickIcon = useCallback(
    (node: HierarchyPointNode<RadialTreeChartData>) => {
      if (!showIcons) return null;
      const info = serializeNode(node);
      if (renderNodeIcon) return renderNodeIcon(info);
      const spec = nodeIconsByDepth?.[node.depth];
      let Comp: React.ElementType = node.children ? FolderOutlinedIcon : PersonOutlinedIcon;
      let color: string | undefined;
      if (spec) {
        if (isIconSpec(spec)) { Comp = spec.icon; color = spec.color; }
        else { Comp = spec; }
      }
      return <Comp style={{ fontSize: iconSize, width: iconSize, height: iconSize, color }} />;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showIcons, renderNodeIcon, nodeIconsByDepth, iconSize],
  );

  // ── serializer ────────────────────────────────────────────────────────────
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

  // ── auto-fit viewBox ──────────────────────────────────────────────────────
  const contentRef = useRef<SVGGElement>(null);
  const [viewBox, setViewBox] = useState(`-${size / 2} -${size / 2} ${size} ${size}`);

  useLayoutEffect(() => {
    const g = contentRef.current;
    if (!g) return;
    const id = requestAnimationFrame(() => {
      try {
        const box = g.getBBox();
        const pad = showLabels ? 16 + iconSize : 8;
        if (autoFit) {
          setViewBox(`${box.x - pad} ${box.y - pad} ${box.width + 2 * pad} ${box.height + 2 * pad}`);
        } else {
          setViewBox(`-${size / 2} -${size / 2} ${size} ${size}`);
        }
      } catch {
        setViewBox(`-${size / 2} -${size / 2} ${size} ${size}`);
      }
    });
    return () => cancelAnimationFrame(id);
  }, [autoFit, size, root, showLabels, iconSize]);

  // ── popover state ─────────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorRef    = useRef<HTMLDivElement>(null);
  const [popoverOpen,    setPopoverOpen]    = useState(false);
  const [popoverAnchor,  setPopoverAnchor]  = useState<HTMLElement | null>(null);
  const [popoverAnchorPos, setPopoverAnchorPos] = useState({ left: 0, top: 0 });
  const [activeInfo,     setActiveInfo]     = useState<RadialTreeNodeInfo | null>(null);

  const handleNodeClick: React.MouseEventHandler<SVGGElement> = (e) => {
    if (disabled) return;
    const idx = Number(e.currentTarget.getAttribute("data-idx"));
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

  const textColor  = theme.palette.text.primary;
  const bgColor    = theme.palette.background.paper;
  const linkColor  = theme.palette.divider;
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
      {/* invisible anchor for MUI Popover positioning */}
      <Box
        ref={anchorRef}
        sx={{
          position: "absolute",
          left:     popoverAnchorPos.left,
          top:      popoverAnchorPos.top,
          width:    0,
          height:   0,
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
          {/* Links */}
          <g fill="none" stroke={linkColor} strokeOpacity={linkStrokeOpacity} strokeWidth={linkStrokeWidth}>
            {links.map((link, i) => (
              <path key={`link-${i}`} d={linkGen(link) as string} />
            ))}
          </g>

          {/* Nodes */}
          <g>
            {nodes.map((node, i) => {
              const icon     = pickIcon(node);
              const showCircle = !(showIcons && icon);
              const info     = serializeNode(node);
              const tooltipTitle = (
                <Box sx={{ py: 0.25 }}>
                  <Typography variant="caption" sx={{ fontWeight: "bold", display: "block" }}>
                    {node.data.name}
                  </Typography>
                  {node.data.subname && (
                    <Typography variant="caption" sx={{ display: "block", opacity: 0.75 }}>
                      {node.data.subname}
                    </Typography>
                  )}
                  <Typography variant="caption" sx={{ display: "block", opacity: 0.6, mt: 0.25 }}>
                    {info.path.join(" › ")}
                  </Typography>
                </Box>
              );

              return (
                <Tooltip
                  key={`node-${node.data.id}-${i}`}
                  title={tooltipTitle}
                  followCursor
                  enterDelay={50}
                  enterNextDelay={0}
                  disableHoverListener={disabled}
                  slotProps={{ tooltip: { sx: { maxWidth: 240 } } }}
                >
                  <g
                    data-idx={i}
                    transform={`rotate(${(node.x * 180) / Math.PI - 90}) translate(${node.y},0)`}
                    onClick={handleNodeClick}
                    style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                  >
                    {showCircle && (
                      <circle r={nodeRadius} fill={nodeColor(node)} />
                    )}
                    {icon && (
                      <foreignObject
                        x={-iconSize / 2}
                        y={-iconSize / 2}
                        width={iconSize}
                        height={iconSize}
                        style={{ overflow: "visible" }}
                      >
                        {/* xmlns required for foreignObject HTML content */}
                        <span
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          {...{ xmlns: "http://www.w3.org/1999/xhtml" } as any}
                          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: iconSize, height: iconSize }}
                        >
                          {icon}
                        </span>
                      </foreignObject>
                    )}
                  </g>
                </Tooltip>
              );
            })}
          </g>

          {/* Labels */}
          {showLabels && (
            <g strokeLinejoin="round" strokeWidth={3}>
              {nodes.map((node, i) => {
                const isRight  = node.x < Math.PI === !node.children;
                const xOffset  = isRight
                  ? (showIcons ? iconSize * 0.7 + 4 : nodeRadius + 4)
                  : -(showIcons ? iconSize * 0.7 + 4 : nodeRadius + 4);
                const anchor   = isRight ? "start" : "end";
                return (
                  <text
                    key={`lbl-${node.data.id}-${i}`}
                    transform={`rotate(${(node.x * 180) / Math.PI - 90}) translate(${node.y},0) rotate(${node.x >= Math.PI ? 180 : 0})`}
                    dy="0.31em"
                    x={xOffset}
                    textAnchor={anchor}
                    paintOrder="stroke"
                    stroke={bgColor}
                    strokeWidth={3}
                    fill={textColor}
                    fontSize={11}
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

      {/* Built-in MUI Popover */}
      {showNodePopover && (
        <Popover
          open={popoverOpen}
          anchorEl={popoverAnchor}
          onClose={() => setPopoverOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          slotProps={{ paper: { elevation: 4 } }}
        >
          {activeInfo && (
            renderNodePopoverContent
              ? renderNodePopoverContent(activeInfo)
              : <DefaultPopoverContent
                  info={activeInfo}
                  labelA={t.specialValueA ?? "Value A"}
                  labelB={t.specialValueB ?? "Value B"}
                />
          )}
        </Popover>
      )}
    </Box>
  );
}

RadialTreeChart.displayName = "RadialTreeChart";
