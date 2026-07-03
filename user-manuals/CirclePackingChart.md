# CirclePackingChart — User Manual

> [Deutsche Version →](CirclePackingChart.de.md)

**Visualize any hierarchy as nested circles — each circle's area proportional to its value, with a smooth animated zoom on double-click.** Use `CirclePackingChart` for budget breakdowns, portfolio analysis, file system sizes, or any data where proportional nesting and drill-down navigation matter.

## Overview

The `CirclePackingChart` renders hierarchical data using [D3 v7](https://d3js.org)'s circle packing layout. Circles are nested and sized proportionally to their values. Double-clicking zooms in with a smooth D3 interpolation animation — not a simple viewBox scale, but a genuine wipe transition that repositions and resizes all circles. It is the fourth component in the **D3 Charts family**.

### What does this component do?

The user sees a large outer circle (the root) that contains smaller circles (its children), which in turn contain even smaller circles (grandchildren). **Circle area is proportional to `value`** — a node with value 620 is visibly larger than one with value 210. Labels appear inside each circle.

**Double-click** any circle: a smooth animated "wipe" zooms in — that circle expands to fill the entire canvas and its children grow to fill it. The labels of the newly focused direct children fade in. Double-click the background to zoom back out one level.

> **Key concept:** only **leaf nodes** need a `value`. Parent nodes aggregate their children's values automatically — just like `SunburstChart`. The outer circle always shows the total sum.

> **Alt + Double-click** runs the same zoom at 10× slower speed — useful for demos and presentations.

| New in v2.5.0 | |
|---|---|
| **CirclePackingChart** | D3 circle packing, animated zoom, depth gradient or palette, MUI theme |

---

## Prerequisites

| Dependency | Minimum version |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |
| `d3` | 7.x |

---

## Import

```tsx
import { CirclePackingChart } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  CirclePackingData,
  CirclePackingNodeInfo,
  CirclePackingZoomInfo,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Quick Start

```tsx
import { CirclePackingChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { CirclePackingData } from '@thebuoyant-tsdev/mui-ts-library';

const data: CirclePackingData = {
  // Root node — the outermost circle. No value needed (D3 sums children automatically).
  name: 'Company',
  children: [
    {
      name: 'Engineering', // inner group circle — also no value needed
      children: [
        // Leaf nodes need a value → determines circle size relative to siblings
        { name: 'Frontend',  value: 480 },
        { name: 'Backend',   value: 620 }, // larger circle than Frontend (620 > 480)
        { name: 'DevOps',    value: 210 },
      ]
    },
    { name: 'Sales',   value: 890 }, // leaf at top level — directly inside the root
    { name: 'Product', value: 640 },
  ],
};

function App() {
  return (
    <CirclePackingChart
      data={data}
      size={600}                 // SVG width & height in px (always square)
      onCircleClick={(info) => console.log(info.name, info.value)}
      onZoomChange={(zoom) => console.log('Zoomed to:', zoom.currentName)}
      // Double-click a circle to zoom in with smooth D3 animation
      // Double-click the background to zoom back out
    />
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `CirclePackingData` | — | **Required.** Root node of the hierarchy |
| `size` | `number` | `600` | Width and height of the SVG in px (always square) |
| `padding` | `number` | `3` | Spacing between nested circles in px |
| `sortBy` | `CirclePackingSortBy` | `'value'` | Sort children by value (largest first) or alphabetically |
| `showLabels` | `boolean` | `true` | Show centered name labels; fade in/out during zoom |
| `showAllLabels` | `boolean` | `false` | Also show truncated labels on all visible nested circles (≥14px radius) that aren't direct children of the current focus, not just the outer focused ring |
| `labelFontSize` | `number` | `13` | Outer-ring label font size in px (bold) |
| `innerLabelFontSize` | `number` | `9` | Inner circle label font size in px — used when `showAllLabels` is `true` |
| `labelColor` | `string` | theme text | Label text color |
| `chartColors` | `string[]` | — | Per-depth palette — overrides gradient |
| `depthColorStart` | `string` | theme primary | Gradient start color (when no `chartColors`) |
| `depthColorEnd` | `string` | theme secondary | Gradient end color (when no `chartColors`) |
| `background` | `string` | theme background | SVG background fill |
| `duration` | `number` | `750` | Zoom animation duration in ms |
| `zoomable` | `boolean` | `false` | Enable `Ctrl / Cmd ⌘ + Scroll` visual zoom — clips at `size` boundary |
| `disabled` | `boolean` | `false` | Mutes all interactions |
| `onCircleClick` | `(info, event) => void` | — | Fires on single click |
| `onZoomChange` | `(zoom) => void` | — | Fires on every zoom transition |
| `translation` | `Partial<CirclePackingTranslation>` | EN defaults | Override strings |

---

## TypeScript Types

```ts
type CirclePackingData = {
  name:      string;
  value?:    number;
  children?: CirclePackingData[];
};

type CirclePackingNodeInfo = {
  name:          string;
  value:         number | null;
  depth:         number;
  path:          string[];       // breadcrumb from root
  childrenCount: number;
  data:          CirclePackingData;
};

type CirclePackingZoomInfo = {
  previousName:  string;
  currentName:   string;
  currentDepth:  number;
  isRoot:        boolean;        // true when zoomed back to root
};

type CirclePackingSortBy = 'value' | 'name';
```

---

## Interaction Model

| Gesture | Action |
|---|---|
| **Double-click** a circle | Animated zoom into that circle (D3 `interpolateZoom` transition) |
| **Double-click** the background | Animated zoom out one level |
| **Alt+Double-click** | Same as double-click but 10× slower — great for demos |
| **Single click** a circle | Fires `onCircleClick` immediately |

The zoom uses D3's `d3.interpolateZoom` — a genuine smooth "wipe" animation that repositions and resizes all circles, not a simple SVG scale. Labels of the newly focused node's direct children fade in; all others fade out. Set `duration={0}` to make the zoom effectively instant.

A **breadcrumb hint** appears when zoomed in, showing the current focus circle's name.

---

## Colors

### Default — depth gradient (automatic)

When `chartColors` is not set, the chart uses an HCL-interpolated gradient from `depthColorStart` to `depthColorEnd`, both defaulting to the active MUI theme palette:

| Setting | MUI token |
|---|---|
| `depthColorStart` | `theme.palette.primary.light` |
| `depthColorEnd` | `theme.palette.secondary.dark` |

**Dark mode is handled automatically** — gradient colors adapt to the active theme.

### Custom fixed palette

```tsx
// Blues from deep to light — 5 depth levels
<CirclePackingChart
  data={data}
  chartColors={['#1565C0', '#1976D2', '#42A5F5', '#90CAF9', '#E3F2FD']}
  background="#F5F5F5"
/>
```

### Custom gradient

```tsx
<CirclePackingChart
  data={data}
  depthColorStart="hsl(200, 80%, 85%)"
  depthColorEnd="hsl(260, 60%, 35%)"
/>
```

### Using MUI theme tokens

```tsx
import { useTheme } from '@mui/material';

function MyChart({ data }) {
  const theme = useTheme();
  return (
    <CirclePackingChart
      data={data}
      depthColorStart={theme.palette.primary.light}
      depthColorEnd={theme.palette.secondary.dark}
      background={theme.palette.background.paper}
    />
  );
}
```

---

## Per-node color override — `colorConfig`

Any node can define its own fill color directly in the data, overriding the chart-level palette or gradient:

```tsx
const data: CirclePackingData = {
  id: "company", name: "Company",
  children: [
    {
      id: "engineering", name: "Engineering",
      colorConfig: { fill: "#1565C0" },        // brand blue
      children: [
        { id: "fe", name: "Frontend",  value: 480, colorConfig: { fill: "#1976D2" } },
        { id: "be", name: "Backend",   value: 620, colorConfig: { fill: "#0D47A1" } },
      ],
    },
    {
      id: "ops", name: "Operations",
      // no colorConfig → uses default MUI palette
      children: [/* ... */],
    },
  ],
};
```

`colorConfig` fields:
| Field | Description |
|---|---|
| `fill` | Circle fill / background color |
| `textColor` | Label text color (future use) |
| `stroke` | Circle border color |

This is consistent with `SunburstChart`, `RadialTreeChart`, and `ChordChart` — all D3 charts support per-node color overrides.

## Callbacks / Events

> **Which callbacks fire for which action?**
>
> | Action | Callbacks fired |
> |---|---|
> | Regular click on a circle | `onCircleClick` |
> | Ctrl / Cmd ⌘+Click to zoom in | `onZoomChange` |
> | Ctrl / Cmd ⌘+DblClick to zoom out | `onZoomChange` |
> | Escape key pressed (reset to root) | `onZoomChange` |

| Callback | Signature | When it fires | Use it when... |
|---|---|---|---|
| `onCircleClick` | `(info: CirclePackingNodeInfo, event: React.MouseEvent) => void` | Regular click on a circle (not Ctrl/Cmd) | Showing node details, filtering a dashboard |
| `onZoomChange` | `(zoom: CirclePackingZoomInfo) => void` | Focus changes: Ctrl/Cmd+Click zoom-in, Ctrl/Cmd+DblClick zoom-out, Escape reset | Tracking drill-down state, breadcrumb navigation |

```tsx
<CirclePackingChart
  data={data}
  onCircleClick={(info, event) => {
    console.log(info.name);          // "Frontend"
    console.log(info.value);         // 480
    console.log(info.depth);         // 2
    console.log(info.path);          // ["Company", "Engineering", "Frontend"]
    console.log(info.childrenCount); // 0 (leaf)
  }}
  onZoomChange={(zoom) => {
    console.log(zoom.previousName);  // "Company"
    console.log(zoom.currentName);   // "Engineering"
    console.log(zoom.currentDepth);  // 1
    console.log(zoom.isRoot);        // false
  }}
/>
```

---

## Disabled State

```tsx
<CirclePackingChart data={data} disabled />
```

All interactions are muted. The chart renders at reduced opacity (`0.5`).

---

## No Data

When `data` has no `children` and no `value`, the chart renders the `translation.noData` string (default `'No data'`) centered in the SVG instead of an empty circle:

```tsx
<CirclePackingChart
  data={{ name: 'Root' }}
  translation={{ noData: 'Nothing to show yet' }}
/>
```

---

## D3 Charts Family

All 5 D3 charts have shipped:

| Component | Description | Status |
|---|---|---|
| `SunburstChart` | Concentric ring hierarchy chart | ✅ v2.2.0 |
| `ChordChart` | Flow and relationship diagram | ✅ v2.3.0 |
| `RadialTreeChart` | Radial tree with node icons and popover | ✅ v2.4.0 |
| `CirclePackingChart` | Nested circles with animated zoom | ✅ v2.5.0 |
| `HorizontalTreeChart` | Decision trees in 4 orientations | ✅ v2.6.0 |
| `RadialStackedBarChart` | Multi-series stacked bars in a radial layout | ✅ v3.15.0 |

Open feature ideas per chart: [`component-features-nice-to-have.md`](../component-features-nice-to-have.md).
