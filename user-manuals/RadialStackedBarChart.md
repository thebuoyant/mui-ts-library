# RadialStackedBarChart — User Manual

> [Deutsche Version →](RadialStackedBarChart.de.md)

**Compare multiple categories across several sub-series simultaneously — population by age group, quarterly revenue by region, or any multi-dimensional data — as a radial stacked bar chart.** Use `RadialStackedBarChart` when you need the visual impact of a circular layout and the analytical depth of a stacked breakdown.

## Overview

`RadialStackedBarChart` arranges bars in a circle: each bar radiates outward from a shared center hole, and is vertically subdivided into **stacked segments** — one segment per series key (e.g. "Q1", "Q2", age groups). Bar heights are proportional to their total value; segments within a bar are proportional to each series' share.

### What does this component do?

The user sees a ring of outward-pointing bars arranged like the spokes of a wheel. Each bar is labeled on the outer edge (e.g. a US state abbreviation or a city name). Bars are color-coded by series according to the legend in the center hole.

**Concentric dashed rings** mark value milestones (e.g. 10M, 20M, 30M population), labeled at the top. The innermost ring marks the baseline (zero value).

**Hovering** a segment shows a tooltip with three lines:
- The bar label (e.g. "California")
- The series name and its value (e.g. "25 to 44 Years: 9,109,000")
- The percentage share and the bar total (e.g. "26% · Total: 34,224,000")

**Clicking** a segment fires `onBarClick` with the full bar and series context — useful for linking the chart to a data table or a side panel.

**Zoom** (`Ctrl / Cmd ⌘ + Scroll`, requires `zoomable={true}`): pan in/out for dense datasets. Press `Escape` to reset.

> **Typical use cases:**
>
> - Population by age group across states / countries
> - Quarterly or monthly revenue / cost breakdown by region
> - Survey responses by category across multiple groups
> - Any multi-series data where circular layout helps compare many items at once

| New in v3.15.0 | |
|---|---|
| **RadialStackedBarChart** | New D3 chart — radial stacked bars, configurable grid rings, center legend, sortBy, custom colors, zoom, `onBarClick` |

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
import { RadialStackedBarChart } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  RadialStackedBarData,
  RadialStackedBarSeries,
  RadialStackedBarBarInfo,
  RadialStackedBarColorConfigs,
  RadialStackedBarChartProps,
  RadialStackedBarChartTranslation,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Quick Start

```tsx
import { RadialStackedBarChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { RadialStackedBarData, RadialStackedBarSeries } from '@thebuoyant-tsdev/mui-ts-library';

// One item per bar — each has a unique id, a display label, and a value per series key
const data: RadialStackedBarData[] = [
  { id: 'berlin',    label: 'Berlin',    values: { q1: 120, q2: 145, q3: 98,  q4: 175 } },
  { id: 'munich',    label: 'Munich',    values: { q1: 210, q2: 185, q3: 220, q4: 195 } },
  { id: 'hamburg',   label: 'Hamburg',   values: { q1: 95,  q2: 110, q3: 88,  q4: 130 } },
  { id: 'frankfurt', label: 'Frankfurt', values: { q1: 165, q2: 150, q3: 180, q4: 200 } },
];

// Series = the sub-groups that stack up inside each bar
const keys: RadialStackedBarSeries[] = [
  { key: 'q1', label: 'Q1' }, // key matches the field name in values{}
  { key: 'q2', label: 'Q2' }, // label is shown in the center legend
  { key: 'q3', label: 'Q3' },
  { key: 'q4', label: 'Q4' },
];

function App() {
  return (
    <RadialStackedBarChart
      data={data}   // array of bars
      keys={keys}   // series definitions, in stack order (innermost first)
      size={480}    // SVG width and height in px
    />
  );
}
```

> **Minimal version:** if you only need quick series names without separate legend labels, pass `keys` as a plain `string[]`:
> ```tsx
> <RadialStackedBarChart data={data} keys={['q1', 'q2', 'q3', 'q4']} />
> ```
> The string is used both as the `values` field key and as the legend label.

---

## Props

### Core

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `RadialStackedBarData[]` | — | **Required.** Array of bars. Each item is one spoke of the wheel. |
| `keys` | `RadialStackedBarSeries[] \| string[]` | — | **Required.** Series definitions in stack order (innermost segment first). |
| `size` | `number` | `500` | Width and height of the SVG in pixels (always square). |
| `innerRadius` | `number` | `size × 0.18` | Radius of the center hole in px. Increase for a wider center legend area. |
| `barPadding` | `number` | `0.12` | Fractional gap between adjacent bars — `0` = no gap, `1` = all gap. |

### Grid

| Prop | Type | Default | Description |
|---|---|---|---|
| `showGridLines` | `boolean` | `true` | Show / hide concentric dashed grid rings. |
| `gridLineCount` | `number` | `3` | Number of concentric grid rings (D3 tick approximation). |
| `showGridValues` | `boolean` | `true` | Show value labels at the top of each grid ring. |
| `gridValueFormatter` | `(value: number) => string` | compact notation | Custom formatter for grid ring labels. Example: `(v) => \`${(v / 1e6).toFixed(0)}M\`` |

### Labels & Legend

| Prop | Type | Default | Description |
|---|---|---|---|
| `showLabels` | `boolean` | `true` | Show bar identifiers on the outer edge of the chart. |
| `showLegend` | `boolean` | `true` | Show the series color legend in the center hole. |

### Sorting

| Prop | Type | Default | Description |
|---|---|---|---|
| `sortBy` | `'value' \| 'label' \| 'none'` | `'none'` | Sort bars by total value descending, by label ascending (A → Z), or keep the original array order. |

### Value Formatting (Tooltips)

| Prop | Type | Default | Description |
|---|---|---|---|
| `valueDecimalCount` | `number` | `0` | Decimal places for segment values in tooltips. |
| `valueDecimalSeparator` | `string` | `'.'` | Decimal separator character. |
| `valueThousandsSeparator` | `string` | `','` | Thousands separator character. |
| `valueFormatter` | `(value: number, seriesKey: string) => string` | — | Custom formatter for all tooltip values. When set, overrides `valueDecimalCount` / `valueDecimalSeparator` / `valueThousandsSeparator`. `seriesKey` is the series key for segment values, or an empty string `""` for the bar total line. *Since v3.22.0* |

### Colors

| Prop | Type | Default | Description |
|---|---|---|---|
| `chartColors` | `string[]` | MUI theme palette | Custom color palette for all series. Falls back to MUI theme tokens when omitted. |
| `colorConfig` | `RadialStackedBarColorConfigs` | — | Per-series color overrides keyed by series key. Takes priority over `chartColors`. |

### Interaction

| Prop | Type | Default | Description |
|---|---|---|---|
| `zoomable` | `boolean` | `false` | Enable `Ctrl / Cmd ⌘ + Scroll` visual zoom — content outside `size` is clipped. Press `Escape` to reset. |
| `onBarClick` | `(info: RadialStackedBarBarInfo, event: React.MouseEvent) => void` | — | Fires when the user clicks any bar segment. |
| `disabled` | `boolean` | `false` | Mutes all interactions and reduces opacity to `0.5`. |

### i18n

| Prop | Type | Default | Description |
|---|---|---|---|
| `translation` | `Partial<RadialStackedBarChartTranslation>` | EN defaults | Override any translation string. Only provide keys you want to change. |

---

## TypeScript Types

```ts
// One bar (one spoke of the wheel)
type RadialStackedBarData = {
  id:     string;             // unique identifier — used as React key and in callback payloads
  label:  string;             // outer-edge label
  values: Record<string, number>; // value per series key — missing keys are treated as 0
};

// One series (one color layer in the stack)
type RadialStackedBarSeries = {
  key:    string;  // must match a key in values{}
  label?: string;  // legend label — falls back to key when omitted
};

// Payload delivered to onBarClick
type RadialStackedBarBarInfo = {
  id:        string;
  label:     string;
  seriesKey: string;              // the series that was clicked
  value:     number;              // value of the clicked segment
  total:     number;              // total bar value (sum of all series)
  values:    Record<string, number>; // all values for this bar
};

// Per-series color overrides
type RadialStackedBarColorConfigs = Record<string, { fill?: string } | null>;

type RadialStackedBarChartTranslation = {
  noData: string; // shown when data or keys is empty
};
```

---

## Data Shape

Each element in `data` represents **one bar** (one angular position on the wheel). The `values` object maps **series keys** to numbers:

```ts
{ id: 'ca', label: 'CA', values: { under5: 2_486_000, age5_13: 4_926_000, age65plus: 4_032_000 } }
//                                  ↑ must match a key in the keys[] array
```

Series keys missing from `values` are silently treated as `0` — you never need to fill every slot explicitly.

> **Order matters for stacking:** series are stacked in the order they appear in `keys[]`. The first key forms the innermost (bottom) segment, the last key forms the outermost (top) segment.

---

## Grid

Concentric dashed rings mark value milestones on the radial (Y) axis. D3 automatically picks "nice" tick values based on `maxTotal` and `gridLineCount`.

```tsx
// Default: 3 rings with compact labels (30000 → "30k", 3000000 → "3M")
<RadialStackedBarChart data={data} keys={keys} />

// Custom ring count
<RadialStackedBarChart data={data} keys={keys} gridLineCount={5} />

// Fully custom grid value labels
<RadialStackedBarChart
  data={data}
  keys={keys}
  gridValueFormatter={(v) => `${(v / 1_000_000).toFixed(1)} M`}
/>

// Hide grid entirely
<RadialStackedBarChart data={data} keys={keys} showGridLines={false} />
```

---

## Sorting

```tsx
// Keep original data array order (default)
<RadialStackedBarChart data={data} keys={keys} sortBy="none" />

// Largest total bar first (top of wheel, clockwise decreasing)
<RadialStackedBarChart data={data} keys={keys} sortBy="value" />

// Alphabetical ascending by label
<RadialStackedBarChart data={data} keys={keys} sortBy="label" />
```

---

## Colors

### Default — MUI Theme Palette (automatic)

When `chartColors` is not set, the chart uses MUI theme tokens in this order:

| Series index | MUI token |
|---|---|
| 0 | `theme.palette.primary.main` |
| 1 | `theme.palette.secondary.main` |
| 2 | `theme.palette.success.main` |
| 3 | `theme.palette.warning.main` |
| 4 | `theme.palette.error.main` |
| 5 | `theme.palette.info.main` |
| 6+ | `#8e24aa`, `#00897b`, `#f06292`, … |

**Dark mode is handled automatically** — colors adapt when the user switches to a dark MUI theme.

### Custom palette

```tsx
<RadialStackedBarChart
  data={data}
  keys={keys}
  chartColors={['#1565C0', '#6A1B9A', '#00695C', '#E65100', '#AD1457', '#F57F17', '#4E342E']}
/>
```

### Per-series color override

```tsx
<RadialStackedBarChart
  data={data}
  keys={keys}
  colorConfig={{
    q2: { fill: '#f57c00' },  // brand orange for Q2 — overrides chartColors
    q4: { fill: '#6a1b9a' },  // brand purple for Q4
    // q1 and q3 fall back to chartColors / MUI palette
  }}
/>
```

`colorConfig` accepts `null` or an omitted key to fall back to `chartColors`. `fill` is the only currently supported field.

---

## Interaction Model

| Gesture | Action |
|---|---|
| **Hover** over a segment | Shows a tooltip: bar label, series name + value, percentage + total |
| **Click** any segment | Fires `onBarClick(info, event)` — see type `RadialStackedBarBarInfo` |
| **Ctrl / Cmd ⌘ + Scroll** *(requires `zoomable`)* | Visual zoom in / out — content clipped at `size` boundary |
| **Escape** *(requires `zoomable`)* | Reset zoom to 1× |

> **macOS:** Use `Cmd ⌘` instead of `Ctrl` for zoom.

### `onBarClick` payload

```tsx
<RadialStackedBarChart
  data={data}
  keys={keys}
  onBarClick={(info, event) => {
    console.log(info.id);        // "berlin"
    console.log(info.label);     // "Berlin"
    console.log(info.seriesKey); // "q2"        — the series that was clicked
    console.log(info.value);     // 145          — value of the clicked segment
    console.log(info.total);     // 660          — sum of all series for this bar
    console.log(info.values);    // { q1: 120, q2: 145, q3: 98, q4: 175 }
  }}
/>
```

---

## Disabled State

```tsx
<RadialStackedBarChart data={data} keys={keys} disabled />
```

All interactions are muted (tooltips, clicks, zoom). The chart renders at opacity `0.5`. Useful for read-only dashboards or loading states.

---

## Empty State

When `data` is empty or `keys` is empty, the chart renders an empty-state message instead of an SVG:

```tsx
<RadialStackedBarChart data={[]} keys={keys} />
{/* Shows: "No data" */}

<RadialStackedBarChart
  data={[]}
  keys={keys}
  translation={{ noData: 'No data available for this period' }}
/>
```

---

## i18n — Translations

Pass only the keys you want to override — unset keys fall back to the English defaults:

```tsx
<RadialStackedBarChart
  data={data}
  keys={keys}
  translation={{ noData: 'Keine Daten vorhanden' }}
/>
```

| Key | Default (EN) | Description |
|---|---|---|
| `noData` | `'No data'` | Shown when `data` or `keys` is empty |

---

## Recipes

### Large dataset with compact grid labels

```tsx
const US_STATES_DATA: RadialStackedBarData[] = [/* 20 states × 7 age groups */];
const AGE_KEYS: RadialStackedBarSeries[] = [
  { key: 'under5',    label: 'Under 5 Years' },
  { key: 'age5_13',   label: '5 to 13 Years' },
  { key: 'age14_17',  label: '14 to 17 Years' },
  { key: 'age18_24',  label: '18 to 24 Years' },
  { key: 'age25_44',  label: '25 to 44 Years' },
  { key: 'age45_64',  label: '45 to 64 Years' },
  { key: 'age65plus', label: '65 Years and Over' },
];

<RadialStackedBarChart
  data={US_STATES_DATA}
  keys={AGE_KEYS}
  size={600}
  sortBy="value"
  gridValueFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`}
  zoomable
/>
```

### Linked detail panel via `onBarClick`

```tsx
const [detail, setDetail] = useState<RadialStackedBarBarInfo | null>(null);

<Box sx={{ display: 'flex', gap: 2 }}>
  <RadialStackedBarChart
    data={data}
    keys={keys}
    onBarClick={(info) => setDetail(info)}
  />
  {detail && (
    <Box>
      <Typography variant="h6">{detail.label}</Typography>
      <Typography>Total: {detail.total}</Typography>
      {Object.entries(detail.values).map(([k, v]) => (
        <Typography key={k}>{k}: {v}</Typography>
      ))}
    </Box>
  )}
</Box>
```

### Currency formatting in tooltips

```tsx
<RadialStackedBarChart
  data={revenueData}
  keys={quarterlyKeys}
  valueDecimalCount={2}
  valueDecimalSeparator=","
  valueThousandsSeparator="."
  gridValueFormatter={(v) => `€${(v / 1000).toFixed(0)}k`}
/>
```

### Compact chart without labels and legend

```tsx
<RadialStackedBarChart
  data={data}
  keys={keys}
  size={320}
  showLabels={false}
  showLegend={false}
  showGridValues={false}
/>
```

---

## D3 Charts Family

`RadialStackedBarChart` is the 6th component in the **D3 Charts family**:

| Component | Description | Status |
|---|---|---|
| `SunburstChart` | Concentric ring hierarchy chart | ✅ v2.2.0 |
| `ChordChart` | Flow and relationship diagram between groups | ✅ v2.3.0 |
| `RadialTreeChart` | Radial tree with custom node icons | ✅ v2.4.0 |
| `CirclePackingChart` | Nested circles with animated zoom | ✅ v2.5.0 |
| `HorizontalTreeChart` | Decision trees in 4 orientations | ✅ v2.6.0 |
| `RadialStackedBarChart` | Multi-series stacked bars in a radial layout | ✅ v3.15.0 |

All D3 charts follow the same conventions: `chartColors`, `translation`, `disabled`, `onXxxClick`, MUI theme integration, dark mode support, and `Ctrl / Cmd ⌘ + Scroll` zoom. See [`component-features-nice-to-have.md`](../component-features-nice-to-have.md) for open feature ideas.
