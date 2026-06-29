# HorizontalTreeChart — User Manual

> [Deutsche Version →](HorizontalTreeChart.de.md)

**Visualize any hierarchy as a tree with four possible orientations — left→right, right→left, top→bottom, bottom→top.** Use `HorizontalTreeChart` for architecture diagrams, org charts, dependency trees, file system hierarchies, or any data where the parent→child relationship should be read in a clear linear direction.

## Overview

The `HorizontalTreeChart` renders hierarchical data using [D3 v7](https://d3js.org)'s tree layout with curved Bézier links. It supports 4 growth directions, colored bubble nodes with icons, Ctrl / Cmd ⌘+Click drill-down, and Ctrl / Cmd ⌘+Scroll zoom. It is the fifth component in the **D3 Charts family** and shares all conventions (`colorConfig`, `chartColors`, `zoomable`, `drillable`, MUI Tooltip) with its siblings.

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

const data: HorizontalTreeData = {
  id: 'platform', name: 'Platform',
  children: [
    { id: 'fe', name: 'Frontend', subname: 'React',
      children: [
        { id: 'web',    name: 'Web App',  specialValueA: 'Next.js 15' },
        { id: 'mobile', name: 'Mobile',   specialValueA: 'React Native' },
      ],
    },
    { id: 'be', name: 'Backend', subname: 'Node.js' },
  ],
};

<HorizontalTreeChart
  data={data}
  orientation="LR"
  drillable
  zoomable
  onNodeClick={(info) => console.log(info.name, info.depth)}
/>
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `HorizontalTreeData` | — | **Required.** Root node |
| `orientation` | `'LR' \| 'RL' \| 'TB' \| 'BT'` | `'LR'` | Tree growth direction |
| `width` | `number` | `800` | SVG width in px |
| `height` | `number` | `500` | SVG height in px |
| `levelSpacing` | `number` | `200` | Distance between depth levels in px |
| `nodeRadius` | `number` | `10` | Node circle radius in px |
| `sortBy` | `'name' \| 'value'` | `'name'` | Sort children |
| `showLabels` | `boolean` | `true` | Show node name labels |
| `showIcons` | `boolean` | `true` | White icon inside circle (folder/person) |
| `labelFontSize` | `number` | `12` | Label font size in px |
| `labelColor` | `string` | theme text | Label color |
| `chartColors` | `string[]` | MUI palette | Per-depth color palette |
| `linkStrokeOpacity` | `number` | `1` | Link line opacity |
| `linkStrokeWidth` | `number` | `1.5` | Link line width in px |
| `linkColor` | `string` | theme text.secondary | Link color |
| `zoomable` | `boolean` | `false` | `Ctrl / Cmd ⌘+Scroll` visual zoom |
| `drillable` | `boolean` | `false` | `Ctrl / Cmd ⌘+Click` drill-down |
| `duration` | `number` | `750` | Drill-in/out crossfade duration in ms. `0` disables it (instant jump). |
| `onFocusChange` | `(zoom) => void` | — | Fires when drill-down changes |
| `showNodePopover` | `boolean` | `false` | Built-in MUI Popover on click |
| `renderNodePopoverContent` | `(info) => ReactNode` | — | Custom popover content |
| `onNodeClick` | `(info, event) => void` | — | Fires on regular click |
| `disabled` | `boolean` | `false` | Mutes all interactions |
| `translation` | `Partial<HorizontalTreeTranslation>` | EN defaults | Override strings |

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

## Orientations

```tsx
<HorizontalTreeChart data={data} orientation="LR" />  // left → right (default)
<HorizontalTreeChart data={data} orientation="RL" />  // right → left
<HorizontalTreeChart data={data} orientation="TB" />  // top → bottom
<HorizontalTreeChart data={data} orientation="BT" />  // bottom → top
```

---

## Interaction Model

> **macOS:** Use `Cmd ⌘` instead of `Ctrl`.

| Gesture | Action | Requires |
|---|---|---|
| **Click** | Fires `onNodeClick` immediately | always |
| **Ctrl / Cmd ⌘+Click** on branch | Drill-down into subtree | `drillable` |
| **Ctrl / Cmd ⌘+DblClick** | Zoom out one level | `drillable` |
| **Ctrl / Cmd ⌘+Scroll** | Visual zoom — clips at boundary | `zoomable` |
| **Escape** | Reset drill-down + zoom | both |

**Drill transitions:** drilling in/out re-roots the underlying D3 hierarchy entirely — each focus level has its own, differently-sized node set. Rather than tweening individual node positions (which would need enter/update/exit matching by node ID), the previous layout crossfades out on top of the new one over `duration` ms (default `750`), rendered as a static, non-interactive ghost layer. `onFocusChange`/`onNodeClick` fire immediately on interaction regardless of `duration` — only the visual transition is animated. Set `duration={0}` to disable it and jump directly to the new focus.

---

## Colors & `colorConfig`

### Default — MUI theme palette (per depth)

`primary` → `secondary` → `error` → `warning` → `success` → `info` — adapts automatically to dark mode.

### Per-node override

```tsx
const data: HorizontalTreeData = {
  id: 'root', name: 'Platform',
  children: [
    { id: 'fe', name: 'Frontend', colorConfig: { fill: '#1565C0' } },
    { id: 'be', name: 'Backend',  colorConfig: { fill: '#6A1B9A' } },
  ],
};
```

---

## Callbacks / Events

> **Which callbacks fire for which action?**
>
> | Action | Callbacks fired |
> |---|---|
> | Regular click on a node | `onNodeClick` |
> | Ctrl / Cmd ⌘+Click to drill into a branch node | `onFocusChange` |
> | Ctrl / Cmd ⌘+Click on leaf or Ctrl / Cmd ⌘+DblClick to drill out | `onFocusChange` |
> | Escape key pressed (reset drill-down and zoom) | `onFocusChange` |

| Callback | Signature | When it fires | Use it when... |
|---|---|---|---|
| `onNodeClick` | `(info: HorizontalTreeNodeInfo, event: React.MouseEvent) => void` | Regular click on any node (not Ctrl/Cmd) | Showing a detail panel or popover for the clicked node |
| `onFocusChange` | `(state: { focusedNode: HorizontalTreeNodeInfo; isRoot: boolean }) => void` | Drill-down focus changes via Ctrl/Cmd+Click, Ctrl/Cmd+DblClick or Escape | Tracking drill-down depth, breadcrumb navigation |

---

## No Data

When `data` has no `children` and no `value`, the chart renders the `translation.noData` string (default `'No data'`) centered in the SVG instead of an empty tree:

```tsx
<HorizontalTreeChart
  data={{ id: 'root', name: 'Root' }}
  translation={{ noData: 'Nothing to show yet' }}
/>
```

All translation keys are optional — unset keys fall back to the English defaults (`noData: 'No data'`, `specialValueA: 'Value A'`, `specialValueB: 'Value B'`).

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
