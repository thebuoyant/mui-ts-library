# SunburstChart — User Manual

> [Deutsche Version →](SunburstChart.de.md)

## Overview

The `SunburstChart` visualizes **hierarchical data as concentric rings** — the root node sits at the center, and each depth level forms one ring around it. Segment sizes are proportional to their values. It is the first component in the **D3 Charts family** of this library.

**Typical use cases:**

- Budget or cost breakdowns by department and category
- Organizational hierarchies
- File system sizes
- Product taxonomy drill-downs
- Any data that is both hierarchical and proportional

| ✨ New in v2.2.0 | |
|---|---|
| **SunburstChart** | First D3 chart — Ctrl+Click zoom, donut mode, MUI theme palette |

---

## Prerequisites

| Dependency | Minimum version |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |
| `d3` | 7.x |

> `d3` is a peer dependency — install it alongside the library:
> ```bash
> npm install d3@^7
> ```

---

## Import

```tsx
import { SunburstChart } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  SunburstChartData,
  SunburstChartProps,
  SunburstSegmentInfo,
  SunburstChartTranslation,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Quick Start

```tsx
import { SunburstChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { SunburstChartData } from '@thebuoyant-tsdev/mui-ts-library';

const data: SunburstChartData = {
  id: 'company', name: 'Company',
  children: [
    {
      id: 'engineering', name: 'Engineering',
      children: [
        { id: 'frontend', name: 'Frontend', value: 480 },
        { id: 'backend',  name: 'Backend',  value: 620 },
        { id: 'devops',   name: 'DevOps',   value: 210 },
      ],
    },
    {
      id: 'sales', name: 'Sales',
      children: [
        { id: 'emea',     name: 'EMEA',     value: 540 },
        { id: 'americas', name: 'Americas', value: 490 },
      ],
    },
  ],
};

function App() {
  return (
    <SunburstChart
      data={data}
      size={500}
      onSegmentClick={(info) => console.log(info.path, info.value)}
    />
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `SunburstChartData` | — | **Required.** Root node of the hierarchy |
| `size` | `number` | `500` | Width and height of the SVG in pixels |
| `showSegmentLabels` | `boolean` | `true` | Arc-aligned text labels; auto-truncated with `…` if the arc is too narrow |
| `innerRadius` | `number` | `0` | `0` = solid sunburst; `> 0` = donut hole in px |
| `sortBy` | `'value' \| 'name'` | `'value'` | Sort segments by total value or alphabetically |
| `chartColors` | `string[]` | MUI palette | Custom top-level color palette |
| `showRootLabel` | `boolean` | `true` | Show current focus node name in center |
| `onSegmentClick` | `(info, event) => void` | — | Fires on every regular click |
| `onZoomChange` | `(zoom: SunburstZoomInfo) => void` | — | Fires when zoom focus changes (Ctrl+Click, Ctrl+DblClick, Escape) |
| `valueDecimalCount` | `number` | `0` | Decimal places in tooltip values |
| `valueDecimalSeparator` | `string` | `'.'` | Decimal separator |
| `valueThousandsSeparator` | `string` | `','` | Thousands separator |
| `disabled` | `boolean` | `false` | Mutes all interactions, reduces opacity |
| `translation` | `Partial<SunburstChartTranslation>` | EN defaults | Override tooltip hint texts |

---

## TypeScript Types

```ts
type SunburstChartData = {
  id:        string;
  name:      string;
  value?:    number;      // leaf nodes must have a value
  children?: SunburstChartData[];
};

type SunburstSegmentInfo = {
  id:            string;        // direct access — same as data.id
  name:          string;
  value:         number | null; // D3 aggregate: sum of all descendant leaf values
  percentage:    number;        // share of root total — (value / root.value) * 100
  depth:         number;
  path:          string[];      // breadcrumb from root — array of names
  pathIds:       string[];      // breadcrumb from root — array of IDs (backend linking)
  childrenCount: number;
  data:          SunburstChartData; // original data node
};

type SunburstZoomInfo = {
  focusNode: SunburstSegmentInfo; // node now at the center
  isRoot:    boolean;             // true when zoom was reset to root
};

type SunburstChartTranslation = {
  noData:                string;
  ctrlClickToZoomIn:     string;
  ctrlDblClickToZoomOut: string;
  escToResetZoom:        string;
};
```

---

## Interaction Model

| Gesture | Action |
|---|---|
| **Click** | Fires `onSegmentClick` immediately — no delay |
| **Ctrl+Click** on a parent segment | Zoom in (drill down into that segment) |
| **Ctrl+Double-click** on any segment | Zoom out one level |
| **Ctrl+Click** on center label | Zoom out one level |
| **Escape** | Reset zoom to root |

> **Why Ctrl+Click instead of double-click?**  
> This model eliminates the classic 200ms click-delay hack. `onSegmentClick` fires instantly on every click, giving a snappy feel. Zoom is an explicit, intentional action (modifier key required) and can never happen accidentally.

The center label always shows the **current focus node name** — when zoomed in, it acts as a breadcrumb. Hovering the center shows the available shortcuts as a tooltip.

---

## Donut Mode

Set `innerRadius > 0` to create a hole in the center:

```tsx
<SunburstChart data={data} innerRadius={100} />
```

The center hole area is clickable — `Ctrl+Click` zooms out, regular click fires `onSegmentClick` for the parent.

---

## Sorting

```tsx
// Largest segments first (default)
<SunburstChart data={data} sortBy="value" />

// Alphabetical order at every depth
<SunburstChart data={data} sortBy="name" />
```

---

## Colors

### Default — MUI Theme Palette

Without `chartColors`, the chart uses the active MUI theme palette in this order:
`primary` → `secondary` → `error` → `warning` → `success` → `info`

This means colors automatically adapt when the user switches between light/dark themes or when you apply a custom MUI theme.

### Custom Palette

```tsx
<SunburstChart
  data={data}
  chartColors={['#1565C0', '#6A1B9A', '#00695C', '#E65100', '#AD1457']}
/>
```

Colors are assigned to top-level segments and repeat cyclically if there are more segments than colors.

---

## Segment Click Callback

```tsx
<SunburstChart
  data={data}
  onSegmentClick={(info, event) => {
    console.log(info.id);            // "frontend"
    console.log(info.name);          // "Frontend"
    console.log(info.value);         // 480  (D3 aggregate — sum of descendants)
    console.log(info.percentage);    // 10.2 (% of root total, 2 decimal places)
    console.log(info.depth);         // 2
    console.log(info.path);          // ["Company", "Engineering", "Frontend"]
    console.log(info.pathIds);       // ["company", "engineering", "frontend"]
    console.log(info.childrenCount); // 0 (leaf node)
    console.log(info.data);          // original SunburstChartData node
  }}
  onZoomChange={(zoom) => {
    console.log(zoom.focusNode.name); // "Engineering" — current center
    console.log(zoom.isRoot);         // false — not at root level
  }}
/>
```

---

## Disabled State

```tsx
<SunburstChart data={data} disabled />
```

All interactions are muted. The chart renders at reduced opacity (`0.5`). Useful for read-only dashboards or loading states.

---

## i18n — Translations

```tsx
<SunburstChart
  data={data}
  translation={{
    ctrlClickToZoomIn:     'Ctrl+Klick zum Hineinzoomen',
    ctrlDblClickToZoomOut: 'Ctrl+Doppelklick zum Herauszoomen',
    escToResetZoom:        'Esc zum Zurücksetzen',
    noData:                'Keine Daten',
  }}
/>
```

Translation strings appear in the **MUI `<Tooltip>` component** (dark background, arrow, `enterDelay={50}ms`) that wraps each segment. The tooltip shows the node name, formatted value, breadcrumb path, and zoom shortcut hints. All keys are optional — unset keys fall back to the English defaults.

---

## D3 Charts Roadmap

`SunburstChart` is the first component in the **D3 Charts family**. Planned next:

| Component | Description | Status |
|---|---|---|
| `SunburstChart` | Concentric ring hierarchy chart | ✅ v2.2.0 |
| `TreemapChart` | Nested rectangles — proportional hierarchy | Planned |
| `ZoomableCirclePackingChart` | Nested circles with zoom | Planned |
| `ChordChart` | Flow and relationship diagram between groups | Planned |
| `RadialTreeChart` | Radial tree with custom node icons | Planned |

All D3 charts follow the same conventions: `chartColors`, `translation`, `disabled`, `onXxxClick`, MUI theme integration, and dark mode support.
