# CirclePackingChart — User Manual

> [Deutsche Version →](CirclePackingChart.de.md)

**Visualize any hierarchy as nested circles — each circle's area proportional to its value, with a smooth animated zoom on double-click.** Use `CirclePackingChart` for budget breakdowns, portfolio analysis, file system sizes, or any data where proportional nesting and drill-down navigation matter.

## Overview

The `CirclePackingChart` renders hierarchical data using [D3 v7](https://d3js.org)'s circle packing layout. Circles are nested and sized proportionally to their values. Double-clicking zooms in with a smooth D3 interpolation animation — not a simple viewBox scale, but a genuine wipe transition that repositions and resizes all circles. It is the fourth component in the **D3 Charts family**.

| ✨ New in v2.5.0 | |
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
  name: 'Company',
  children: [
    { name: 'Engineering', children: [
      { name: 'Frontend',  value: 480 },
      { name: 'Backend',   value: 620 },
      { name: 'DevOps',    value: 210 },
    ]},
    { name: 'Sales',   value: 890 },
    { name: 'Product', value: 640 },
  ],
};

function App() {
  return (
    <CirclePackingChart
      data={data}
      size={600}
      onCircleClick={(info) => console.log(info.name, info.value)}
      onZoomChange={(zoom) => console.log('Zoomed to:', zoom.currentName)}
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
| `labelFontSize` | `number` | `11` | Label font size in px |
| `labelColor` | `string` | theme text | Label text color |
| `chartColors` | `string[]` | — | Per-depth palette — overrides gradient |
| `depthColorStart` | `string` | theme primary | Gradient start color (when no `chartColors`) |
| `depthColorEnd` | `string` | theme secondary | Gradient end color (when no `chartColors`) |
| `background` | `string` | theme background | SVG background fill |
| `duration` | `number` | `750` | Zoom animation duration in ms |
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

The zoom uses D3's `d3.interpolateZoom` — a genuine smooth "wipe" animation that repositions and resizes all circles, not a simple SVG scale. Labels of the newly focused node's direct children fade in; all others fade out.

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

## Callbacks

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

## D3 Charts Roadmap

| Component | Description | Status |
|---|---|---|
| `SunburstChart` | Concentric ring hierarchy chart | ✅ v2.2.0 |
| `ChordChart` | Flow and relationship diagram | ✅ v2.3.0 |
| `RadialTreeChart` | Radial tree with node icons and popover | ✅ v2.4.0 |
| `CirclePackingChart` | Nested circles with animated zoom | ✅ v2.5.0 |
| `TreemapChart` | Nested rectangles — proportional hierarchy | Planned |
