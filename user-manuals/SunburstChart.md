# SunburstChart — User Manual

> [Deutsche Version →](SunburstChart.de.md)

**Visualize any hierarchy where size matters — budgets, org structures, file systems — as concentric rings with drill-down.** Use `SunburstChart` when you need to show both the hierarchical structure and the proportional weight of each node at the same time.

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
| **SunburstChart** | First D3 chart — Ctrl / Cmd ⌘+Click drill-down zoom, donut mode, MUI theme palette |
| **`zoomable`** *(v2.4.0)* | `Ctrl / Cmd ⌘ + Scroll` visual zoom — content clipped at `size` boundary |

> **macOS keyboard shortcuts:** Use `Cmd ⌘` instead of `Ctrl` — e.g. `Cmd ⌘+Click`, `Cmd ⌘+Scroll`.  
> All interactions check `ctrlKey || metaKey`, so both keys work on every platform.

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
| `onZoomChange` | `(zoom: SunburstZoomInfo) => void` | — | Fires when drill-down focus changes (Ctrl / Cmd ⌘+Click, Ctrl / Cmd ⌘+DblClick, Escape) |
| `zoomable` | `boolean` | `false` | Enable `Ctrl / Cmd ⌘ + Scroll` visual zoom — clips content at `size` boundary |
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
  /** Shown when data has no value or children */
  noData: string;
};
```

---

## Interaction Model

| Gesture | Action |
|---|---|
| **Click** | Fires `onSegmentClick` immediately — no delay |
| **Ctrl+Click** / **Cmd ⌘+Click** on a parent segment | Drill-down — that segment becomes the new center |
| **Ctrl+Double-click** / **Cmd ⌘+Double-click** | Zoom out one level |
| **Ctrl+Click** / **Cmd ⌘+Click** on center label | Zoom out one level |
| **Ctrl+Scroll** / **Cmd ⌘+Scroll** *(requires `zoomable`)* | Visual zoom — clips at `size` boundary |
| **Escape** | Reset all zoom to root |

> **macOS:** Use `Cmd ⌘` instead of `Ctrl` for all shortcuts above.

> **Why modifier+Click instead of double-click?**  
> This eliminates the classic 200ms click-delay hack. `onSegmentClick` fires instantly on every click. Zoom is an explicit, intentional action that can never happen accidentally.

The center label always shows the **current focus node name** — when drilled in, it acts as a breadcrumb. Use `Ctrl / Cmd ⌘+Click` on the center to step back up.

---

## Donut Mode

Set `innerRadius > 0` to create a hole in the center:

```tsx
<SunburstChart data={data} innerRadius={100} />
```

The center hole area is clickable — `Ctrl / Cmd ⌘+Click` zooms out, regular click fires `onSegmentClick` for the parent.

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

### Default — MUI Theme Palette (automatic)

When `chartColors` is not set, the chart derives colors from the active MUI theme in this order:

| Depth 1 segment | MUI token | Default (blue theme) |
|---|---|---|
| 1st | `theme.palette.primary.main` | `#1976d2` |
| 2nd | `theme.palette.secondary.main` | `#9c27b0` |
| 3rd | `theme.palette.error.main` | `#d32f2f` |
| 4th | `theme.palette.warning.main` | `#ed6c02` |
| 5th | `theme.palette.success.main` | `#2e7d32` |
| 6th | `theme.palette.info.main` | `#0288d1` |

Colors repeat cyclically if there are more top-level segments than palette entries. **Dark mode is handled automatically** — when the user switches to a dark MUI theme, colors adapt without any extra configuration.

### Custom fixed colors

Pass any CSS color strings (hex, rgb, hsl, named):

```tsx
<SunburstChart
  data={data}
  chartColors={['#1565C0', '#6A1B9A', '#00695C', '#E65100', '#AD1457']}
/>
```

### Using MUI theme tokens at runtime

To pick colors from a custom MUI theme, read them with `useTheme()` and pass to `chartColors`:

```tsx
import { useTheme } from '@mui/material';

function MyChart({ data }) {
  const theme = useTheme();
  return (
    <SunburstChart
      data={data}
      chartColors={[
        theme.palette.primary.dark,
        theme.palette.secondary.dark,
        theme.palette.success.main,
        theme.palette.warning.main,
      ]}
    />
  );
}
```

### How colors are assigned

Colors are assigned to **top-level segments** (depth 1). All child segments of the same parent automatically receive a lighter tint of the parent's color (via fill-opacity 0.5 vs 0.75).

### Per-node color override — `colorConfig`

Any node in the data can define its own color, overriding the chart-level palette:

```tsx
const data: SunburstChartData = {
  id: "company", name: "Company",
  children: [
    {
      id: "engineering", name: "Engineering",
      colorConfig: { fill: "#1565C0" },   // brand blue — overrides palette
      children: [
        { id: "fe", name: "Frontend", value: 480, colorConfig: { fill: "#1976D2" } },
        { id: "be", name: "Backend",  value: 620, colorConfig: { fill: "#0D47A1" } },
      ],
    },
    {
      id: "sales", name: "Sales",
      // no colorConfig → falls back to chart palette
      children: [/* ... */],
    },
  ],
};
```

`colorConfig` fields:
| Field | Description |
|---|---|
| `fill` | Segment fill / background color |
| `textColor` | Label text color (future use) |
| `stroke` | Segment border color |

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
  translation={{ noData: 'No data available' }}
/>
```

Currently the only translation key is `noData` (shown when the data has no value or children). All keys are optional — unset keys fall back to the English defaults.

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
