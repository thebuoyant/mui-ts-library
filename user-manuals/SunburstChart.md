# SunburstChart — User Manual

> [Deutsche Version →](SunburstChart.de.md)

**Visualize any hierarchy where size matters — budgets, org structures, file systems — as concentric rings with drill-down.** Use `SunburstChart` when you need to show both the hierarchical structure and the proportional weight of each node at the same time.

## Overview

The `SunburstChart` visualizes **hierarchical data as concentric rings** — the root node sits at the center, and each depth level forms one ring around it. Segment sizes are proportional to their values. It is the first component in the **D3 Charts family** of this library.

### What does this component do?

The user sees a circular diagram: a label at the center (the root, or the current drill-down focus), surrounded by a series of concentric rings. Each ring is one level of the hierarchy. Segments within a ring are sized proportionally to their `value` — a department with twice the budget gets an arc twice as wide.

**Hovering** a segment shows a tooltip with name, value, percentage share of the total, and the full breadcrumb path (e.g. "Company → Engineering → Frontend").

**Drill-down** (`Ctrl / Cmd ⌘+Click`): clicking a segment with the modifier key zooms in — that segment slides to the center and only its descendants are shown. The center label updates to reflect the current focus. `Ctrl / Cmd ⌘+Click` on the center (or `Ctrl / Cmd ⌘+Double-click`, or `Escape`) zooms back out.

> **Key insight:** only **leaf nodes** need a `value`. Parent nodes aggregate their children's values automatically via D3 — you never need to compute sums yourself.

**Typical use cases:**

- Budget or cost breakdowns by department and category
- Organizational hierarchies
- File system sizes
- Product taxonomy drill-downs
- Any data that is both hierarchical and proportional

| New in v2.2.0 | |
|---|---|
| **SunburstChart** | First D3 chart — Ctrl / Cmd ⌘+Click drill-down zoom, donut mode, MUI theme palette |
| **`zoomable`** *(v2.4.0)* | `Ctrl / Cmd ⌘ + Scroll` visual zoom — content clipped at `size` boundary |
| **`duration`** *(v3.10.0)* | Drill-in/out now animates smoothly between focus levels — [→ Interaction Model](#interaction-model) |

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
  // The root node — shown in the center. Does NOT need a value (D3 sums children).
  id: 'company', name: 'Company',
  children: [
    {
      id: 'engineering', name: 'Engineering', // inner ring segment — also no value needed
      children: [
        // Leaf nodes need a value → controls arc width (proportional to siblings)
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
      size={500}                 // SVG width & height in px
      onSegmentClick={(info) => console.log(info.path, info.value)}
      // Ctrl/Cmd+Click to drill into a segment (zoom in)
      // Ctrl/Cmd+Click center label to zoom back out — or press Escape
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
| `onSegmentHover` | `(info \| null, event) => void` | — | Fires on mouse enter/leave of a segment — `null` on leave. *Since v3.27.0* |
| `onZoomChange` | `(zoom: SunburstZoomInfo) => void` | — | Fires when drill-down focus changes (Ctrl / Cmd ⌘+Click, Ctrl / Cmd ⌘+DblClick, Escape) |
| `zoomable` | `boolean` | `false` | Enable `Ctrl / Cmd ⌘ + Scroll` visual zoom — clips content at `size` boundary |
| `duration` | `number` | `750` | Drill-in/out transition duration in ms. `0` disables the animation (instant jump). |
| `valueDecimalCount` | `number` | `0` | Decimal places in tooltip values |
| `valueDecimalSeparator` | `string` | `'.'` | Decimal separator |
| `valueThousandsSeparator` | `string` | `','` | Thousands separator |
| `valueFormatter` | `(value: number) => string` | — | Custom formatter for tooltip values. When set, overrides `valueDecimalCount` / `valueDecimalSeparator` / `valueThousandsSeparator`. *Since v3.22.0* |
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
| **Hover** segment | Fires `onSegmentHover(info, event)` |
| **Mouse leave** segment | Fires `onSegmentHover(null, event)` |
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

**Animated transitions:** every drill-in, drill-out, and Escape-reset smoothly tweens between focus levels over `duration` ms (default `750`) instead of jump-cutting. `onZoomChange` still fires the instant the interaction is triggered — only the visual rendering animates, so consumers reacting to the callback don't need to wait for the transition to finish. Set `duration={0}` to disable the animation and snap directly to the new focus.

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

## Callbacks / Events

> **Which callbacks fire for which action?**
>
> | Action | Callbacks fired |
> |---|---|
> | Hover over a segment | `onSegmentHover(info, event)` |
> | Mouse leave a segment | `onSegmentHover(null, event)` |
> | Click on a segment | `onSegmentClick` |
> | Ctrl / Cmd ⌘+Click to zoom into a segment | `onZoomChange` |
> | Click center label / donut hole to zoom out | `onZoomChange` |
> | Escape key pressed (reset zoom) | `onZoomChange` |

| Callback | Signature | When it fires | Use it when... |
|---|---|---|---|
| `onSegmentHover` | `(info: SunburstSegmentInfo \| null, event: React.MouseEvent) => void` | Mouse enter/leave a segment — `null` on leave | Linked views: highlight the same segment in another chart or table |
| `onSegmentClick` | `(info: SunburstSegmentInfo, event: React.MouseEvent) => void` | Regular click on a segment arc or center label | Showing a detail panel, navigating to a filtered view |
| `onZoomChange` | `(zoom: SunburstZoomInfo) => void` | Focus changes: Ctrl/Cmd+Click zoom-in, center click zoom-out, or Escape reset | Tracking drill-down state, breadcrumb navigation |

```tsx
<SunburstChart
  data={data}
  onSegmentHover={(info, event) => {
    // info is null on mouse leave — use to clear linked-view highlighting
    if (info) setHighlightedId(info.id);
    else setHighlightedId(null);
  }}
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

## D3 Charts Family

`SunburstChart` was the first component in the **D3 Charts family** — all 5 have since shipped:

| Component | Description | Status |
|---|---|---|
| `SunburstChart` | Concentric ring hierarchy chart | ✅ v2.2.0 |
| `ChordChart` | Flow and relationship diagram between groups | ✅ v2.3.0 |
| `RadialTreeChart` | Radial tree with custom node icons | ✅ v2.4.0 |
| `CirclePackingChart` | Nested circles with animated zoom | ✅ v2.5.0 |
| `HorizontalTreeChart` | Decision trees in 4 orientations | ✅ v2.6.0 |
| `RadialStackedBarChart` | Multi-series stacked bars in a radial layout | ✅ v3.15.0 |

All D3 charts follow the same conventions: `chartColors`, `translation`, `disabled`, `onXxxClick`, MUI theme integration, and dark mode support. See [`component-features-nice-to-have.md`](../component-features-nice-to-have.md) for open feature ideas per chart.
