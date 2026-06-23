# RadialTreeChart — User Manual

> [Deutsche Version →](RadialTreeChart.de.md)

**Visualize any hierarchy as a radial tree — nodes spread across concentric rings, connected by curved links.** Use `RadialTreeChart` for org charts, skill taxonomies, file trees, dependency graphs, or any hierarchy where spatial layout and depth level both carry meaning.

## Overview

The `RadialTreeChart` renders hierarchical data as a circular radial tree built on [D3 v7](https://d3js.org). The root sits at the center, and child nodes radiate outward in rings. Each node can have an icon, and clicking a node can open a built-in MUI Popover with node details. It is the third component in the **D3 Charts family**.

**Typical use cases:**

- Organizational charts and reporting hierarchies
- Skill or competency taxonomies
- Module or package dependency trees
- Knowledge graphs and topic maps
- Any hierarchical structure with 2–4 depth levels

| New in v2.4.0 | |
|---|---|
| **RadialTreeChart** | D3 radial tree, MUI icons, built-in node popover |
| **`zoomable`** | `Ctrl / Cmd ⌘ + Scroll` visual zoom — clips content at `size` boundary |
| **`drillable`** | `Ctrl / Cmd ⌘ + Click` drill-down into subtrees, `Ctrl / Cmd ⌘ + DblClick` back out |

> **macOS keyboard shortcuts:** Use `Cmd ⌘` instead of `Ctrl` — e.g. `Cmd ⌘+Click`, `Cmd ⌘+Scroll`.  
> All interactions check `ctrlKey || metaKey`, so both keys work on every platform.

---

## Prerequisites

| Dependency | Minimum version |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |
| `@mui/icons-material` | 9 |
| `d3` | 7.x |

---

## Import

```tsx
import { RadialTreeChart } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  RadialTreeChartData,
  RadialTreeChartProps,
  RadialTreeNodeInfo,
  RadialTreeNodeIconSpec,
  RadialTreeSortBy,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Quick Start

```tsx
import { RadialTreeChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { RadialTreeChartData } from '@thebuoyant-tsdev/mui-ts-library';

const data: RadialTreeChartData = {
  id: 'ceo', name: 'CEO', subname: 'Leadership',
  children: [
    {
      id: 'cto', name: 'CTO', subname: 'Technology',
      children: [
        { id: 'fe', name: 'Frontend Lead', specialValueA: 'L2', specialValueB: '8 reports' },
        { id: 'be', name: 'Backend Lead',  specialValueA: 'L2', specialValueB: '6 reports' },
      ],
    },
    { id: 'cpo', name: 'CPO', subname: 'Product' },
  ],
};

function App() {
  return (
    <RadialTreeChart
      data={data}
      size={600}
      showNodePopover
      onNodeClick={(info) => console.log(info.name, info.depth)}
    />
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `RadialTreeChartData` | — | **Required.** Root node of the hierarchy |
| `size` | `number` | `600` | Width and height of the SVG in pixels |
| `autoFit` | `boolean` | `true` | Auto-fit viewBox to rendered content |
| `sortBy` | `RadialTreeSortBy` | `'name'` | Sort children alphabetically or by value |
| `showLabels` | `boolean` | `true` | Show node name labels |
| `chartColors` | `string[]` | MUI palette | Per-depth node colors |
| `linkStrokeOpacity` | `number` | `0.4` | Link line opacity |
| `linkStrokeWidth` | `number` | `1.5` | Link line width in px |
| `nodeRadius` | `number` | `4` | Node circle radius in px (when no icon) |
| `separationSibling` | `number` | `1` | Separation factor between sibling nodes |
| `separationCousin` | `number` | `2` | Separation factor between cousin nodes |
| `showIcons` | `boolean` | `true` | Show icons on nodes |
| `iconSize` | `number` | `18` | Icon size in px |
| `nodeIconsByDepth` | `Record<number, RadialTreeNodeIconSpec>` | — | Icon overrides per depth level |
| `renderNodeIcon` | `(info) => ReactElement \| null` | — | Fully custom icon renderer per node |
| `zoomable` | `boolean` | `false` | Enable `Ctrl / Cmd ⌘ + Scroll` visual zoom — clips at `size` |
| `drillable` | `boolean` | `false` | Enable `Ctrl / Cmd ⌘ + Click` drill-down into subtrees |
| `onFocusChange` | `(info \| null) => void` | — | Fires when drill-down focus changes |
| `showNodePopover` | `boolean` | `false` | Open built-in MUI Popover on node click |
| `renderNodePopoverContent` | `(info) => ReactNode` | — | Custom popover content (replaces default) |
| `onNodeClick` | `(info, event) => void` | — | Fires on every regular click |
| `disabled` | `boolean` | `false` | Mutes all interactions, reduces opacity |
| `translation` | `Partial<RadialTreeChartTranslation>` | EN defaults | Override translation strings |

---

## Colors & Visual Customization

### Node colors — depth-based (automatic)

`chartColors` assigns colors **per depth level** (not per group). When not set, the MUI theme palette is used:

| Depth | Role | MUI token | Default (blue theme) |
|---|---|---|---|
| 0 | Root | `theme.palette.primary.main` | `#1976d2` |
| 1 | 1st ring | `theme.palette.secondary.main` | `#9c27b0` |
| 2 | 2nd ring | `theme.palette.error.main` | `#d32f2f` |
| 3 | 3rd ring | `theme.palette.warning.main` | `#ed6c02` |
| 4 | 4th ring | `theme.palette.success.main` | `#2e7d32` |
| 5+ | deeper | `theme.palette.info.main` | `#0288d1` |

**Dark mode is handled automatically** — colors adapt with the active MUI theme.

### Custom depth colors

```tsx
// 3-level org chart: root blue, managers purple, team members teal
<RadialTreeChart
  data={data}
  chartColors={['#1565C0', '#6A1B9A', '#00695C']}
/>
```

### Using MUI theme tokens at runtime

```tsx
import { useTheme } from '@mui/material';

function MyChart({ data }) {
  const theme = useTheme();
  return (
    <RadialTreeChart
      data={data}
      chartColors={[
        theme.palette.primary.dark,    // root
        theme.palette.secondary.main,  // managers
        theme.palette.info.light,      // team members
      ]}
    />
  );
}
```

### Per-node color override — `colorConfig`

Any node in the data can define its own fill color, overriding the depth-based palette:

```tsx
const data: RadialTreeChartData = {
  id: "ceo", name: "CEO",
  colorConfig: { fill: "#1A237E" },          // deep navy for root
  children: [
    {
      id: "cto", name: "CTO",
      colorConfig: { fill: "#1565C0" },       // blue for tech subtree
      children: [
        { id: "fe", name: "Frontend Lead", colorConfig: { fill: "#42A5F5" } },
        { id: "be", name: "Backend Lead",  colorConfig: { fill: "#0D47A1" } },
      ],
    },
    {
      id: "cfo", name: "CFO",
      // no colorConfig → uses depth-based palette
    },
  ],
};
```

| Field | Description |
|---|---|
| `fill` | Node circle fill color |
| `textColor` | Label text color (future use) |
| `stroke` | Node circle border color |

### Link and label colors

The link lines and text labels can also be customized independently:

```tsx
<RadialTreeChart
  data={data}
  linkColor="#bdbdbd"          // link line color (default: theme.palette.text.secondary)
  linkStrokeOpacity={0.6}      // 0–1
  linkStrokeWidth={1}          // px
  labelColor="#424242"         // text color (default: theme.palette.text.primary)
  labelFontSize={11}           // px
/>
```

> **Tip:** Leave `linkColor` and `labelColor` unset to automatically adapt to light/dark mode via MUI theme tokens.

## TypeScript Types

```ts
type RadialTreeChartData = {
  id:            string;
  name:          string;
  subname?:      string;        // subtitle in the built-in popover
  value?:        number;
  specialValueA?: string | number; // custom field A
  specialValueB?: string | number; // custom field B
  children?:     RadialTreeChartData[];
};

type RadialTreeNodeInfo = {
  id:            string;
  name:          string;
  subname:       string | null;
  value:         number | null;
  specialValueA: string | number | null;
  specialValueB: string | number | null;
  depth:         number;
  path:          string[];      // breadcrumb from root
  childrenCount: number;
  data:          RadialTreeChartData;
};

// Icon spec: either a React component or { icon, color }
type RadialTreeNodeIconSpec =
  | React.ElementType
  | { icon: React.ElementType; color?: string };

type RadialTreeSortBy = 'name' | 'value';

type RadialTreeChartTranslation = {
  noData:         string;
  specialValueA?: string; // label for specialValueA in the popover
  specialValueB?: string; // label for specialValueB in the popover
};
```

---

## Interaction Model

> **macOS:** Use `Cmd ⌘` instead of `Ctrl` for all shortcuts below.

| Gesture | Action | Requires |
|---|---|---|
| **Hover** any node | MUI tooltip near cursor — shows name, subname, data values | always |
| **Click** any node | Fires `onNodeClick` + opens popover if `showNodePopover` | always |
| **Ctrl / Cmd ⌘ + Click** on branch node | Drill-down into subtree (250 ms to distinguish from DblClick) | `drillable` |
| **Ctrl / Cmd ⌘ + DblClick** | Zoom out one level | `drillable` |
| **Ctrl / Cmd ⌘ + Scroll up** | Visual zoom in (clips at `size` boundary) | `zoomable` |
| **Ctrl / Cmd ⌘ + Scroll down** | Visual zoom out | `zoomable` |
| **Escape** | Reset drill-down to root + reset visual zoom | `drillable` / `zoomable` |

---

## Node Icons

### Default icons

- Branch nodes (have children): `FolderOutlined` from `@mui/icons-material`
- Leaf nodes (no children): `PersonOutlined` from `@mui/icons-material`

### Per-depth icons

```tsx
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import GroupsOutlinedIcon          from '@mui/icons-material/GroupsOutlined';

<RadialTreeChart
  data={data}
  nodeIconsByDepth={{
    0: { icon: BusinessCenterOutlinedIcon, color: '#1565C0' }, // root
    1: { icon: GroupsOutlinedIcon,         color: '#6A1B9A' }, // first ring
    // depth 2+ falls back to default
  }}
/>
```

### Fully custom icon renderer

```tsx
<RadialTreeChart
  data={data}
  renderNodeIcon={(info) => {
    if (info.depth === 0) return <MyRootIcon style={{ fontSize: 20 }} />;
    return null; // fall through to default
  }}
/>
```

---

## Built-in Node Popover

```tsx
<RadialTreeChart
  data={data}
  showNodePopover
  translation={{ specialValueA: 'Level', specialValueB: 'Team size' }}
/>
```

The default popover shows an Avatar with the name initial, the node name and subname, and both special values with configurable labels. To replace the popover content entirely:

```tsx
<RadialTreeChart
  data={data}
  showNodePopover
  renderNodePopoverContent={(info) => (
    <Box sx={{ p: 2 }}>
      <Typography variant="body2">{info.name}</Typography>
      <Typography variant="caption">{info.path.join(' › ')}</Typography>
    </Box>
  )}
/>
```

---

## Callbacks / Events

> **Which callbacks fire for which action?**
>
> | Action | Callbacks fired |
> |---|---|
> | Regular click on a node | `onNodeClick` |
> | Ctrl / Cmd ⌘+Click to drill into a branch node | `onFocusChange` |
> | Ctrl / Cmd ⌘+DblClick to drill out | `onFocusChange` |
> | Escape key pressed (reset drill-down and zoom) | `onFocusChange` |

| Callback | Signature | When it fires | Use it when... |
|---|---|---|---|
| `onNodeClick` | `(info: RadialTreeNodeInfo, event: React.MouseEvent) => void` | Regular click on any node (not Ctrl/Cmd) | Showing a detail panel or popover for the clicked node |
| `onFocusChange` | `(info: RadialTreeNodeInfo \| null) => void` | Drill-down focus changes via Ctrl/Cmd+Click or Escape. `null` when reset to root | Tracking drill-down depth, breadcrumb navigation |

---

## Disabled State

```tsx
<RadialTreeChart data={data} disabled />
```

All interactions (hover tooltip, click, popover) are muted. The chart renders at reduced opacity (`0.5`).

---

## D3 Charts Roadmap

| Component | Description | Status |
|---|---|---|
| `SunburstChart` | Concentric ring hierarchy chart | ✅ v2.2.0 |
| `ChordChart` | Flow and relationship diagram | ✅ v2.3.0 |
| `RadialTreeChart` | Radial tree with node icons and popover | ✅ v2.4.0 |
| `TreemapChart` | Nested rectangles — proportional hierarchy | Planned |
| `ZoomableCirclePackingChart` | Nested circles with zoom | Planned |
