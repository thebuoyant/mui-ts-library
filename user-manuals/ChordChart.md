# ChordChart — User Manual

> [Deutsche Version →](ChordChart.de.md)

## Overview

The `ChordChart` visualizes **flows between named groups** as a circular diagram — groups are represented as arc segments around the circle, and the flows between them as ribbons connecting the arcs. It is the second component in the **D3 Charts family**.

**Typical use cases:**

- Team or module dependency maps
- Migration flows between systems or regions
- Trade or communication flows between parties
- Any directed or undirected source → target relationship with a numeric weight

| ✨ New in v2.3.0 | |
|---|---|
| **ChordChart** | D3 flow chart — arc groups, ribbons, hover highlight, directed/undirected |

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
import { ChordChart } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  ChordChartData,
  ChordChartProps,
  ChordGroupInfo,
  ChordInfo,
  ChordSortBy,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Quick Start

```tsx
import { ChordChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { ChordChartData } from '@thebuoyant-tsdev/mui-ts-library';

const data: ChordChartData[] = [
  { source: 'Frontend',  target: 'Backend',  value: 45 },
  { source: 'Backend',   target: 'Frontend', value: 20 },
  { source: 'Backend',   target: 'DevOps',   value: 35 },
  { source: 'DevOps',    target: 'Backend',  value: 12 },
];

function App() {
  return (
    <ChordChart
      data={data}
      size={500}
      onGroupClick={(info) => console.log(info.name, info.valueOut)}
      onChordClick={(info) => console.log(info.source.name, '→', info.target.name)}
    />
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `ChordChartData[]` | — | **Required.** Array of flow links `{ source, target, value }` |
| `size` | `number` | `500` | Width and height of the SVG in pixels |
| `innerRadius` | `number` | auto | Inner radius of the arc ring — auto-computed from `size` when omitted |
| `ringThickness` | `number` | `20` | Thickness of the arc ring in px |
| `padAngle` | `number` | auto | Padding angle between arc groups in radians |
| `ribbonPadAngle` | `number` | auto | Padding angle inside ribbon paths |
| `sortSubgroups` | `ChordSortBy` | `'descending'` | Sort order for subgroups within each arc |
| `sortChords` | `ChordSortBy` | `'descending'` | Sort order for ribbons |
| `chartColors` | `string[]` | MUI palette | Custom color palette for arc groups |
| `showGroupLabels` | `boolean` | `true` | Show group name labels outside the arc ring |
| `labelOffset` | `number` | `8` | Gap between arc outer edge and label text in px |
| `ribbonOpacity` | `number` | `0.75` | Opacity of all ribbons (0–1) |
| `ribbonBlendMode` | `CSSProperties['mixBlendMode']` | `'multiply'` | CSS mix-blend-mode for ribbons |
| `directed` | `boolean` | `true` | `true` = arrowhead ribbons; `false` = symmetric ribbons |
| `valueDecimalCount` | `number` | `0` | Decimal places in tooltip values |
| `valueDecimalSeparator` | `string` | `'.'` | Decimal separator |
| `valueThousandsSeparator` | `string` | `','` | Thousands separator |
| `onGroupClick` | `(info, event) => void` | — | Fires on click of a group arc |
| `onChordClick` | `(info, event) => void` | — | Fires on click of a ribbon |
| `disabled` | `boolean` | `false` | Mutes all interactions, reduces opacity |
| `translation` | `Partial<ChordChartTranslation>` | EN defaults | Override translation strings |

---

## TypeScript Types

```ts
type ChordChartData = {
  source: string;
  target: string;
  value:  number;
};

type ChordGroupInfo = {
  name:     string;   // group name
  index:    number;   // zero-based position in sorted names array
  valueOut: number;   // total outgoing flow
  valueIn:  number;   // total incoming flow
};

type ChordInfo = {
  source: { name: string; index: number; value: number };
  target: { name: string; index: number; value: number };
};

type ChordSortBy = 'ascending' | 'descending' | 'none';

type ChordChartTranslation = {
  noData: string;
};
```

---

## Interaction Model

| Gesture | Action |
|---|---|
| **Hover** group arc | Highlights the group's ribbons, dims all others |
| **Mouse leave** | Restores all ribbon opacities |
| **Click** group arc | Fires `onGroupClick` with `ChordGroupInfo` |
| **Click** ribbon | Fires `onChordClick` with `ChordInfo` |

The MUI Tooltip (`followCursor`) appears near the cursor on hover:
- **Group arc**: shows name, outgoing and incoming totals
- **Ribbon**: shows source → target and flow values

---

## Directed vs. Undirected

```tsx
// Directed (default) — arrowhead at the target end
<ChordChart data={data} directed />

// Undirected — symmetric ribbons, no arrowheads
<ChordChart data={data} directed={false} />
```

Use `directed={false}` when the relationship is bidirectional by nature (e.g., "number of shared employees") and direction is irrelevant.

---

## Colors

### Default — MUI Theme Palette

Without `chartColors`, the chart uses the active MUI theme palette:
`primary` → `secondary` → `error` → `warning` → `success` → `info`

Colors repeat cyclically if there are more groups than palette entries.

### Custom Palette

```tsx
<ChordChart
  data={data}
  chartColors={['#1565C0', '#6A1B9A', '#00695C', '#E65100', '#AD1457', '#37474F']}
/>
```

---

## Callbacks

```tsx
<ChordChart
  data={data}
  onGroupClick={(info, event) => {
    console.log(info.name);     // "Frontend"
    console.log(info.valueOut); // total outgoing
    console.log(info.valueIn);  // total incoming
    console.log(info.index);    // position in sorted names
  }}
  onChordClick={(info, event) => {
    console.log(info.source.name, '→', info.target.name); // "Frontend → Backend"
    console.log(info.source.value);                        // flow value
  }}
/>
```

---

## Disabled State

```tsx
<ChordChart data={data} disabled />
```

All interactions (hover highlight, click callbacks) are muted. The chart renders at reduced opacity (`0.5`).

---

## D3 Charts Roadmap

| Component | Description | Status |
|---|---|---|
| `SunburstChart` | Concentric ring hierarchy chart | ✅ v2.2.0 |
| `ChordChart` | Flow and relationship diagram | ✅ v2.3.0 |
| `TreemapChart` | Nested rectangles — proportional hierarchy | Planned |
| `ZoomableCirclePackingChart` | Nested circles with zoom | Planned |
| `RadialTreeChart` | Radial tree with custom node icons | Planned |
