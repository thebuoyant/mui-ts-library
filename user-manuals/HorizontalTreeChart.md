# HorizontalTreeChart — User Manual

> [Deutsche Version →](HorizontalTreeChart.de.md)

**Visualize any hierarchy as a tree — in four orientations.** Use `HorizontalTreeChart` for org charts, architecture diagrams, dependency trees, file system hierarchies, or any data where the parent→child relationship should be read in a clear linear direction.

## Overview

### What does this component do?

The user sees a tree diagram: a root node on one side with branches spreading outward, each node shown as a colored circle with a label. The tree can grow left→right, right→left, top→bottom, or bottom→top — your choice.

Two optional interactive modes:
- **Drill-down** (`drillable`): `Ctrl / Cmd ⌘+Click` on a branch node zooms in so that node becomes the new root, hiding the rest of the tree. `Ctrl / Cmd ⌘+Double-click` zooms back out. Useful for large trees where you want to explore one branch at a time.
- **Visual zoom** (`zoomable`): `Ctrl / Cmd ⌘+Scroll` scales the whole SVG up or down — like zooming a map.

`Escape` resets both drill-down and zoom at once.

**Typical use cases:**

- Org charts (company structure, team hierarchies)
- Software architecture diagrams (services, dependencies)
- File system or folder visualizations
- Any hierarchy where reading direction matters (left-to-right for "parent causes child", top-to-bottom for "boss over employee")

It is the fifth component in the **D3 Charts family** and shares all conventions (`colorConfig`, `chartColors`, `zoomable`, `drillable`, MUI Tooltip) with its siblings.

| New in v2.6.0 | |
|---|---|
| **HorizontalTreeChart** | 4 orientations, D3 tree layout, drill-down, zoom, MUI theme |
| **`duration`** *(v3.11.0)* | Drill in/out now crossfades the layout instead of jump-cutting — [→ Interaction Model](#interaction-model) |

> **macOS:** Use `Cmd ⌘` instead of `Ctrl` for all keyboard shortcuts.

---

## Prerequisites

| Dependency | Minimum version |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`, `@mui/icons-material`) | 9 |
| `d3` | 7.x |

---

## Import

```tsx
import { HorizontalTreeChart } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  HorizontalTreeData,
  HorizontalTreeNodeInfo,
  HorizontalTreeOrientation,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Quick Start

```tsx
import { HorizontalTreeChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { HorizontalTreeData } from '@thebuoyant-tsdev/mui-ts-library';

// Your data is a tree: each node can have children, which can have children, etc.
// "name" is shown as the label, "id" is used internally (optional but recommended).
const data: HorizontalTreeData = {
  id: 'platform', name: 'Platform',          // root node
  children: [
    {
      id: 'fe', name: 'Frontend', subname: 'React',  // subname appears below the label
      children: [
        { id: 'web',    name: 'Web App',  specialValueA: 'Next.js 15' },
        { id: 'mobile', name: 'Mobile',   specialValueA: 'React Native' },
      ],
    },
    { id: 'be', name: 'Backend', subname: 'Node.js' }, // leaf node (no children)
  ],
};

<HorizontalTreeChart
  data={data}
  orientation="LR"  // left → right: root on the left, leaves on the right
  drillable         // Ctrl/Cmd+Click on a branch zooms into that subtree
  zoomable          // Ctrl/Cmd+Scroll scales the whole chart
  onNodeClick={(info) => console.log(info.name, info.depth)}
/>
```

---

## Data Format

Each node in the tree is a `HorizontalTreeData` object. Only `name` is required — everything else is optional:

| Field | Type | What it does |
|---|---|---|
| `name` | `string` | **Required.** The label shown next to the node circle |
| `id` | `string` | Unique identifier — recommended for drill-down to work reliably |
| `subname` | `string` | A second, smaller label below `name` |
| `value` | `number` | Numeric value — shown via `specialValueA`/`B` labels or used for `sortBy: 'value'` |
| `specialValueA` | `string \| number` | Extra text shown in the node label area |
| `specialValueB` | `string \| number` | Second extra text |
| `colorConfig` | `object` | Per-node color override — see [Colors & colorConfig](#colors--colorconfig) |
| `children` | `HorizontalTreeData[]` | Child nodes — omit for leaf nodes |

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `HorizontalTreeData` | — | **Required.** Root node |
| `orientation` | `'LR' \| 'RL' \| 'TB' \| 'BT'` | `'LR'` | Tree growth direction — see [Orientations](#orientations) |
| `width` | `number` | `800` | SVG width in px |
| `height` | `number` | `500` | SVG height in px |
| `levelSpacing` | `number` | `200` | Distance between depth levels in px |
| `nodeRadius` | `number` | `10` | Node circle radius in px |
| `sortBy` | `'name' \| 'value'` | `'name'` | Sort children alphabetically or by value |
| `showLabels` | `boolean` | `true` | Show node name labels |
| `showIcons` | `boolean` | `true` | White icon inside circle (folder for branches, person for leaves) |
| `labelFontSize` | `number` | `12` | Label font size in px |
| `labelColor` | `string` | theme text | Label color |
| `chartColors` | `string[]` | MUI palette | Per-depth color palette |
| `linkStrokeOpacity` | `number` | `1` | Link line opacity (0–1) |
| `linkStrokeWidth` | `number` | `1.5` | Link line width in px |
| `linkColor` | `string` | theme text.secondary | Link color |
| `zoomable` | `boolean` | `false` | Enable `Ctrl / Cmd ⌘+Scroll` visual zoom |
| `drillable` | `boolean` | `false` | Enable `Ctrl / Cmd ⌘+Click` drill-down |
| `duration` | `number` | `750` | Drill-in/out crossfade duration in ms. `0` disables animation (instant jump). |
| `onFocusChange` | `(zoom) => void` | — | Fires when drill-down focus changes |
| `showNodePopover` | `boolean` | `false` | Show a built-in MUI Popover on click |
| `renderNodePopoverContent` | `(info) => ReactNode` | — | Custom content inside the popover |
| `onNodeClick` | `(info, event) => void` | — | Fires on regular click (not Ctrl/Cmd+Click) |
| `disabled` | `boolean` | `false` | Mutes all interactions |
| `translation` | `Partial<HorizontalTreeTranslation>` | EN defaults | Override displayed strings |

---

## Orientations

The four values control which direction the tree grows from its root:

```tsx
<HorizontalTreeChart data={data} orientation="LR" />  // left → right (default)
<HorizontalTreeChart data={data} orientation="RL" />  // right → left
<HorizontalTreeChart data={data} orientation="TB" />  // top → bottom
<HorizontalTreeChart data={data} orientation="BT" />  // bottom → top
```

**When to use which:**
- `"LR"` — the most readable for Western audiences; natural for org charts and dependency diagrams
- `"TB"` — good for family trees or hierarchies that are conceptually "above → below"
- `"RL"` / `"BT"` — when the visual flow of your layout requires it (e.g., the root is on the right side of your page)

---

## Interaction Model

> **macOS:** Use `Cmd ⌘` instead of `Ctrl`.

| Gesture | Action | Requires |
|---|---|---|
| **Click** | Fires `onNodeClick` immediately | always |
| **Ctrl / Cmd ⌘+Click** on a branch node | Drill into that subtree (re-roots the tree) | `drillable` |
| **Ctrl / Cmd ⌘+Double-click** | Zoom out one level | `drillable` |
| **Ctrl / Cmd ⌘+Scroll** | Visual zoom — scales the SVG | `zoomable` |
| **Escape** | Reset drill-down and zoom | both |

**How drill-down works:** clicking into a branch re-roots the entire D3 hierarchy at that node — only its subtree is shown. The previous layout crossfades out over `duration` ms (default `750`) so the transition feels smooth rather than abrupt. `onFocusChange` and `onNodeClick` fire immediately on the interaction regardless of `duration` — only the visual animation is deferred. Set `duration={0}` to jump directly to the new focus without animation.

---

## Colors & `colorConfig`

### Default — MUI theme palette (per depth level)

Without any color configuration, each depth level of the tree gets a different MUI theme color: `primary` → `secondary` → `error` → `warning` → `success` → `info`. This adapts automatically to dark mode.

### Per-node color override

Any node can override its color individually via `colorConfig`:

```tsx
const data: HorizontalTreeData = {
  id: 'root', name: 'Platform',
  children: [
    // these nodes each have their own color, independent of their depth level
    { id: 'fe', name: 'Frontend', colorConfig: { fill: '#1565C0' } },
    { id: 'be', name: 'Backend',  colorConfig: { fill: '#6A1B9A' } },
  ],
};
```

### Using a custom palette for all depths

```tsx
<HorizontalTreeChart
  data={data}
  chartColors={['#e53935', '#8e24aa', '#1e88e5', '#43a047']}
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
> | Ctrl / Cmd ⌘+Click on leaf or Ctrl / Cmd ⌘+Double-click to drill out | `onFocusChange` |
> | Escape key pressed (reset drill-down and zoom) | `onFocusChange` |

| Callback | Signature | When it fires | Use it when... |
|---|---|---|---|
| `onNodeClick` | `(info: HorizontalTreeNodeInfo, event: React.MouseEvent) => void` | Regular click on any node (not Ctrl/Cmd) | Showing a detail panel or popover for the clicked node |
| `onFocusChange` | `(state: { focusedNode: HorizontalTreeNodeInfo; isRoot: boolean }) => void` | Drill-down focus changes via Ctrl/Cmd+Click, Ctrl/Cmd+Double-click or Escape | Tracking drill-down depth, breadcrumb navigation |

The `info` object passed to both callbacks contains everything you need about the clicked node:

```ts
type HorizontalTreeNodeInfo = {
  id:            string | null;      // the node's id from your data
  name:          string;             // the label
  subname:       string | null;
  value:         number | null;
  specialValueA: string | number | null;
  specialValueB: string | number | null;
  depth:         number;             // 0 = root, 1 = first level, etc.
  path:          string[];           // names from root to this node, e.g. ["Platform", "Frontend"]
  childrenCount: number;             // 0 for leaf nodes
  data:          HorizontalTreeData; // the original node from your data
};
```

---

## No Data

When `data` has no `children` and no `value`, the chart renders the `translation.noData` string centered in the SVG instead of an empty tree:

```tsx
<HorizontalTreeChart
  data={{ id: 'root', name: 'Root' }}
  translation={{ noData: 'Nothing to show yet' }}
/>
```

All translation keys are optional — unset keys fall back to the English defaults (`noData: 'No data'`, `specialValueA: 'Value A'`, `specialValueB: 'Value B'`).

---

## TypeScript Types

```ts
type HorizontalTreeData = {
  id?:            string;
  name:           string;
  subname?:       string;
  value?:         number;
  specialValueA?: string | number;
  specialValueB?: string | number;
  colorConfig?:   { fill?: string; textColor?: string; stroke?: string } | null;
  children?:      HorizontalTreeData[];
};

type HorizontalTreeNodeInfo = {
  id:            string | null;
  name:          string;
  subname:       string | null;
  value:         number | null;
  specialValueA: string | number | null;
  specialValueB: string | number | null;
  depth:         number;
  path:          string[];
  childrenCount: number;
  data:          HorizontalTreeData;
};

type HorizontalTreeOrientation = 'LR' | 'RL' | 'TB' | 'BT';
```

---

## D3 Charts Family

All 5 D3 charts have shipped:

| Component | Status |
|---|---|
| `SunburstChart` | ✅ v2.2.0 |
| `ChordChart` | ✅ v2.3.0 |
| `RadialTreeChart` | ✅ v2.4.0 |
| `CirclePackingChart` | ✅ v2.5.0 |
| `HorizontalTreeChart` | ✅ v2.6.0 |

Open feature ideas per chart: [`component-features-nice-to-have.md`](../component-features-nice-to-have.md).
