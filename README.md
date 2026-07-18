# mui-ts-library

> [Deutsche Version →](README.de.md)

[![CI](https://github.com/thebuoyant/mui-ts-library/actions/workflows/ci.yml/badge.svg)](https://github.com/thebuoyant/mui-ts-library/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@thebuoyant-tsdev/mui-ts-library)](https://www.npmjs.com/package/@thebuoyant-tsdev/mui-ts-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A type-safe React component library built on **TypeScript** and **MUI (Material UI v9)**. Components follow MUI's design language, support dark mode and theming out of the box, and ship with complete TypeScript types, Storybook stories, and unit tests.

**[→ Live Storybook](https://thebuoyant.github.io/mui-ts-library/)** — explore all components interactively, no installation needed.

**[→ Try it on StackBlitz](https://stackblitz.com/github/thebuoyant/mui-ts-library/tree/main/stackblitz-demo?startScript=dev)** — live editable demo in your browser, no installation required.

---

## Components

15 production-ready components across three categories. Each links to a live, interactive demo and a full manual covering every prop, type, and pattern.

### Interactive UI

| Component | What it's for | Try it |
|---|---|---|
| [`GanttChart`](#ganttchart) | Drag-and-drop project timelines with milestones, dependencies, and CSV export | [Live demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-ganttchart--default) · [Docs](user-manuals/GanttChart.md) |
| [`KanbanBoard`](#kanbanboard) | Drag-and-drop Kanban board with built-in CRUD dialogs, WIP limits, and i18n | [Live demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-kanbanboard--default) · [Docs](user-manuals/KanbanBoard.md) |
| [`DateRangePicker`](#daterangepicker) | Start + end date in one inline picker — fills the MUI X Pro gap, free and dependency-free | [Live demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-daterangepicker--default) · [Docs](user-manuals/DateRangePicker.md) |
| [`TagSelection`](#tagselection) | Multi-tag autocomplete with free-form tag creation and search highlighting | [Live demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-tagselection--default) · [Docs](user-manuals/TagSelection.md) |
| [`PasswordStrengthMeter`](#passwordstrengthmeter) | Real-time strength feedback with a built-in secure password generator | [Live demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-passwordstrengthmeter--default) · [Docs](user-manuals/PasswordStrengthMeter.md) |
| [`ColorPicker`](#colorpicker) | Saturation/hue/alpha color picker panel with an eyedropper tool — MUI ships none | [Live demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-colorpicker--default) · [Docs](user-manuals/ColorPicker.md) |

### Code Editors

| Component | What it's for | Try it |
|---|---|---|
| [`RichTextEditor`](#richtexteditor) | WYSIWYG editing (TipTap v3) with tables, images, and an emoji picker | [Live demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-richtexteditor--default) · [Docs](user-manuals/RichTextEditor.md) |
| [`SqlEditor`](#sqleditor) | SQL editing (CodeMirror 6) with dialect-aware autocomplete and query history | [Live demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-sqleditor--default) · [Docs](user-manuals/SqlEditor.md) |
| [`JsonEditor`](#jsoneditor) | JSON editing (CodeMirror 6) with schema validation, folding, and a path finder | [Live demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-jsoneditor--default) · [Docs](user-manuals/JsonEditor.md) |

### D3 Data Visualization

| Component | What it's for | Try it |
|---|---|---|
| [`SunburstChart`](#sunburstchart) | Hierarchical data as concentric rings — drill down with `Ctrl+Click` | [Live demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-sunburstchart--default) · [Docs](user-manuals/SunburstChart.md) |
| [`ChordChart`](#chordchart) | Flow and relationships between named groups as a circular diagram | [Live demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-chordchart--default) · [Docs](user-manuals/ChordChart.md) |
| [`RadialTreeChart`](#radialtreechart) | Org charts and taxonomies as a radial tree, with drill-down | [Live demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-radialtreechart--default) · [Docs](user-manuals/RadialTreeChart.md) |
| [`CirclePackingChart`](#circlepackingchart) | Nested circles with animated zoom — storage and hierarchy at a glance | [Live demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-circlepackingchart--default) · [Docs](user-manuals/CirclePackingChart.md) |
| [`HorizontalTreeChart`](#horizontaltreechart) | Decision trees and hierarchies in 4 orientations (LR/RL/TB/BT) | [Live demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-horizontaltreechart--default) · [Docs](user-manuals/HorizontalTreeChart.md) |
| [`RadialStackedBarChart`](#radialstackedbarchart) | Multi-series stacked bars in a radial layout — compare categories across segments | [Live demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-radialstackedbarchart--default) · [Docs](user-manuals/RadialStackedBarChart.md) |

All charts share Ctrl / Cmd ⌘+Scroll zoom and full MUI theme integration (dark mode included).

---

## Installation

### Step 1 — Install the library

```bash
npm install @thebuoyant-tsdev/mui-ts-library
```

### Step 2 — Install peer dependencies

If your project doesn't have MUI set up yet:

```bash
npm install react@^19 react-dom@^19 @mui/material@^9 @emotion/react @emotion/styled @mui/icons-material@^9
```

### Step 3 — Done

Import any component — TypeScript types are included automatically:

```tsx
import { GanttChart, JsonEditor, useConfirm } from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Quick Start

Wrap your app in MUI's `ThemeProvider` as usual — all components work without an additional provider.

### GanttChart

An interactive project timeline for planning and tracking tasks. Use it in project management dashboards, sprint planners, or resource views where teams need to see schedules, milestones, dependencies, and progress at a glance — with drag & drop, resize, and Ctrl / Cmd ⌘+Scroll zoom built in.

```tsx
import { GanttChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { GanttTask } from '@thebuoyant-tsdev/mui-ts-library';

const tasks: GanttTask[] = [
  { id: '1', name: 'Phase 1', status: 'in-progress', startDate: new Date('2026-01-01'), endDate: new Date('2026-03-31') },
  { id: '2', name: 'Go-Live', status: 'planned', startDate: new Date('2026-03-31'), endDate: new Date('2026-03-31'), isMilestone: true },
];

<GanttChart tasks={tasks} timeScale="months" height={500} draggable resizable zoomable onTasksChange={save} />
```

→ [Full documentation](user-manuals/GanttChart.md)

---

### KanbanBoard

A drag-and-drop Kanban board with built-in Add / Edit / Delete dialogs, WIP limits, and full i18n. Use it for task management dashboards, sprint boards, or any workflow where users move work items between status columns — with card colors, assignee chips, due-date chips, and a configurable chip style.

```tsx
import { KanbanBoard } from '@thebuoyant-tsdev/mui-ts-library';
import type { KanbanColumn, KanbanTask } from '@thebuoyant-tsdev/mui-ts-library';
import { useState } from 'react';

const columns: KanbanColumn[] = [
  { id: 'todo',        label: 'To Do',       color: '#9e9e9e' },
  { id: 'in-progress', label: 'In Progress', color: '#2196f3' },
  { id: 'done',        label: 'Done',        color: '#4caf50' },
];

function App() {
  const [tasks, setTasks] = useState<KanbanTask[]>([
    { id: '1', title: 'Set up project',    status: 'todo',        assignee: 'Alice' },
    { id: '2', title: 'Implement feature', status: 'in-progress', assignee: 'Bob', dueDate: new Date('2026-08-01') },
    { id: '3', title: 'Write tests',       status: 'done' },
  ]);

  return (
    <KanbanBoard
      columns={columns}
      tasks={tasks}
      onTasksChange={setTasks}
      height={500}
    />
  );
}
```

→ [Full documentation](user-manuals/KanbanBoard.md)

---

### DateRangePicker

Start and end date in a single inline picker — no MUI X Pro license required. Built for forms, filters, and booking flows. Supports controlled/uncontrolled mode, `minDate`/`maxDate`, `required`, inline validation, and full i18n. `onChange` returns both a `Date` object and an ISO string for each date.

```tsx
import { DateRangePicker } from '@thebuoyant-tsdev/mui-ts-library';
import type { DateRange, DateRangeInput } from '@thebuoyant-tsdev/mui-ts-library';
import { useState } from 'react';

function App() {
  const [range, setRange] = useState<DateRangeInput>({ start: null, end: null });

  return (
    <DateRangePicker
      value={range}
      onChange={(r) => setRange({ start: r.start?.date ?? null, end: r.end?.date ?? null })}
      required
      translation={{ fromLabel: 'From', toLabel: 'To' }}
    />
  );
}
```

→ [Full documentation](user-manuals/DateRangePicker.md)

---

### TagSelection

Multi-select input with autocomplete for tag and label management. Best suited for filter UIs, content tagging, skill selection, and any scenario where users pick from a predefined list or create new items on the fly.

```tsx
import { TagSelection } from '@thebuoyant-tsdev/mui-ts-library';
import type { TagSelectionItem } from '@thebuoyant-tsdev/mui-ts-library';

const tags: TagSelectionItem[] = [
  { id: 'react', label: 'React', selected: true },
  { id: 'ts',    label: 'TypeScript' },
];

<TagSelection tags={tags} onTagsChange={(selected) => console.log(selected)} />
```

→ [Full documentation](user-manuals/TagSelection.md)

---

### PasswordStrengthMeter

Password input with real-time strength feedback, a confirm field with match validation, and a built-in secure password generator. Designed for registration flows and password-change screens.

```tsx
import { PasswordStrengthMeter } from '@thebuoyant-tsdev/mui-ts-library';

<PasswordStrengthMeter
  passwordMinLength={10}
  showSegmentedBar
  showConfirmField                 // second input with ✓/✗ match validation
  showPasswordGenerator            // generates a cryptographically secure password
  generatorOptions={{ length: 20 }}
  onPasswordChange={(password, result) => console.log(result.score)}
  onConfirmChange={(value, matches) => console.log('Matches:', matches)}
  onPasswordGenerated={(pw) => console.log('Generated:', pw)}
/>
```

→ [Full documentation](user-manuals/PasswordStrengthMeter.md)

---

### ColorPicker

A saturation/hue/alpha color picker panel — fills a real MUI gap, since MUI ships no color picker at all. Use it for theme customizers, brand-color pickers, or design-system playgrounds. Fully controlled; you own `value` and update it from `onChange`.

```tsx
import { useState } from 'react';
import { ColorPicker } from '@thebuoyant-tsdev/mui-ts-library';

function BrandColorPicker() {
  const [color, setColor] = useState('#1976d2');

  return (
    <ColorPicker
      value={color}
      onChange={(hex) => setColor(hex)}
      savedColors={['#f44336', '#2196f3', '#4caf50', '#ffeb3b']}
    />
  );
}
```

| New in v3.23.0 | |
|---|---|
| **`format` prop** | Controlled display format (`'hex' \| 'rgb' \| 'hsl'`) — lets the parent own the active format, e.g. to reset the picker programmatically from a form reset button. Combine with `onFormatChange` to update it. Omit to use `defaultFormat` (uncontrolled, existing behavior). |

→ [Full documentation](user-manuals/ColorPicker.md)

---

### RichTextEditor

Full-featured WYSIWYG editor for long-form formatted content. Best for CMS fields, email templates, comment boxes, and any input that needs more than a plain `<textarea>` — with toolbar, tables, image embed, emoji picker, fullscreen, and Markdown paste support.

```tsx
import { RichTextEditor } from '@thebuoyant-tsdev/mui-ts-library';

<RichTextEditor
  placeholder="Start typing…"
  onChange={(html) => console.log(html)}
/>
```

→ [Full documentation](user-manuals/RichTextEditor.md)

---

### SqlEditor

SQL code editor with syntax highlighting, dialect-aware autocomplete, and inline linting. Designed for developer tools, database clients, and admin panels where users write and execute SQL queries — with `Cmd+Enter` (Execute) and `Shift+Alt+F` (Format SQL) shortcuts, multi-dialect support (MySQL, PostgreSQL, SQLite, MSSQL), and schema-based autocomplete.

```tsx
import { SqlEditor } from '@thebuoyant-tsdev/mui-ts-library';

<SqlEditor
  placeholder="Enter SQL query…"
  dialect="postgresql"
  onChange={(sql) => console.log(sql)}
  onExecute={(sql) => runQuery(sql)}
/>
```

→ [Full documentation](user-manuals/SqlEditor.md)

---

### JsonEditor

JSON code editor with real-time validation, formatting, and an optional minimap. Ideal for configuration panels, API explorers, and developer tools where users need to view, edit, paste, or validate JSON — with instant error markers, Format and Compact buttons, and cursor-position display.

```tsx
import { JsonEditor } from '@thebuoyant-tsdev/mui-ts-library';

<JsonEditor
  placeholder="Enter JSON…"
  showValidation
  showMinimap
  onChange={(json) => console.log(json)}
/>
```

→ [Full documentation](user-manuals/JsonEditor.md)

---

### SunburstChart

Hierarchical data visualization as concentric rings — root at the center, each depth level forms one ring. Perfect for budget breakdowns, org charts, file system usage, and any data that is both hierarchical and proportional. `Ctrl / Cmd ⌘+Click` to drill down, `Ctrl / Cmd ⌘+Scroll` to zoom.

```tsx
import { SunburstChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { SunburstChartData } from '@thebuoyant-tsdev/mui-ts-library';

const data: SunburstChartData = {
  id: 'root', name: 'Budget',
  children: [
    { id: 'eng',  name: 'Engineering', children: [
      { id: 'fe', name: 'Frontend', value: 480 },
      { id: 'be', name: 'Backend',  value: 620 },
    ]},
    { id: 'sales', name: 'Sales', value: 890 },
  ],
};

<SunburstChart
  data={data}
  size={500}
  onSegmentClick={(info) => console.log(info.path, info.value)}
/>
```

**Drill-down:** `Ctrl+Click` / `Cmd ⌘+Click` · **Zoom out:** `Ctrl+DblClick` / `Cmd ⌘+DblClick` · **Reset:** `Escape`

→ [Full documentation](user-manuals/SunburstChart.md)

---

### ChordChart

Flow and relationship visualization between named groups as a circular diagram. Ideal for dependency maps, migration flows, trade relationships, and any source→target data with a numeric weight. Hover any group to highlight its connections, click to trigger callbacks.

```tsx
import { ChordChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { ChordChartData } from '@thebuoyant-tsdev/mui-ts-library';

const data: ChordChartData[] = [
  { source: 'Frontend', target: 'Backend',  value: 45 },
  { source: 'Backend',  target: 'Frontend', value: 20 },
  { source: 'Backend',  target: 'DevOps',   value: 35 },
];

<ChordChart
  data={data}
  size={500}
  onGroupClick={(info) => console.log(info.name, info.valueOut)}
  onChordClick={(info) => console.log(info.source.name, '→', info.target.name)}
/>
```

→ [Full documentation](user-manuals/ChordChart.md)

---

### RadialTreeChart

Hierarchical data as a radial tree — nodes on concentric rings connected by curved links. Use `RadialTreeChart` for org charts, skill taxonomies, dependency trees, or any hierarchy where you want both structure and spatial layout. Hover for a tooltip, click for a popover with node details. `Ctrl / Cmd ⌘+Click` drills into subtrees, `Ctrl / Cmd ⌘+Scroll` zooms.

```tsx
import { RadialTreeChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { RadialTreeChartData } from '@thebuoyant-tsdev/mui-ts-library';

const data: RadialTreeChartData = {
  id: 'ceo', name: 'CEO', subname: 'Leadership',
  children: [
    { id: 'cto', name: 'CTO', subname: 'Technology',
      children: [
        { id: 'fe', name: 'Frontend Lead' },
        { id: 'be', name: 'Backend Lead'  },
      ]},
    { id: 'cpo', name: 'CPO', subname: 'Product' },
  ],
};

<RadialTreeChart
  data={data}
  size={600}
  drillable    // Ctrl / Cmd ⌘+Click to drill in, DblClick to go back
  zoomable     // Ctrl / Cmd ⌘+Scroll to zoom
  showNodePopover
  onNodeClick={(info) => console.log(info.name, info.depth)}
/>
```

→ [Full documentation](user-manuals/RadialTreeChart.md)

---

### CirclePackingChart

Hierarchical data as nested circles, sized proportionally to value. Use `CirclePackingChart` for disk usage, org budgets, or any hierarchy where relative size matters at a glance. `Ctrl / Cmd ⌘+Click` (or double-click) a circle with children to zoom in with a smooth animated transition; click the background or `Escape` to zoom back out.

```tsx
import { CirclePackingChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { CirclePackingData } from '@thebuoyant-tsdev/mui-ts-library';

const data: CirclePackingData = {
  id: 'disk', name: 'Disk',
  children: [
    { id: 'photos', name: 'Photos', value: 120 },
    { id: 'videos', name: 'Videos', value: 340 },
    { id: 'apps', name: 'Apps',
      children: [
        { id: 'xcode', name: 'Xcode', value: 48 },
        { id: 'docker', name: 'Docker', value: 12 },
      ]},
  ],
};

<CirclePackingChart
  data={data}
  size={500}
  onCircleClick={(info) => console.log(info.name, info.value)}
/>
```

→ [Full documentation](user-manuals/CirclePackingChart.md)

---

### HorizontalTreeChart

Hierarchical data as a left-to-right (or any of 4 orientations) decision tree with curved links. Use `HorizontalTreeChart` for decision logic, escalation paths, or org charts that read more naturally top-to-bottom or side-to-side than radially. `Ctrl / Cmd ⌘+Click` drills into subtrees, `Ctrl / Cmd ⌘+Scroll` zooms.

```tsx
import { HorizontalTreeChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { HorizontalTreeData } from '@thebuoyant-tsdev/mui-ts-library';

const data: HorizontalTreeData = {
  id: 'ticket', name: 'New Ticket',
  children: [
    { id: 'bug', name: 'Bug', specialValueA: 'P1 — 4h SLA',
      children: [
        { id: 'bug-fe', name: 'Frontend Team' },
        { id: 'bug-be', name: 'Backend Team'  },
      ]},
    { id: 'feature', name: 'Feature Request', specialValueA: 'P3 — Backlog' },
  ],
};

<HorizontalTreeChart
  data={data}
  orientation="LR"
  width={700}
  drillable
  onNodeClick={(info) => console.log(info.name, info.depth)}
/>
```

→ [Full documentation](user-manuals/HorizontalTreeChart.md)

---

### RadialStackedBarChart

Multi-series stacked bar chart in a polar (radial) layout. Each bar segment represents one data point, each arc layer represents one series — ideal for comparing quarterly figures, budget breakdowns, or any multi-category totals across a set of items. Concentric grid rings give a visual scale; an auto-centered legend is built in. `Ctrl / Cmd ⌘+Scroll` zooms the chart.

```tsx
import { RadialStackedBarChart } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  RadialStackedBarData,
  RadialStackedBarSeries,
} from '@thebuoyant-tsdev/mui-ts-library';

const keys: RadialStackedBarSeries[] = [
  { key: 'q1', label: 'Q1' },
  { key: 'q2', label: 'Q2' },
  { key: 'q3', label: 'Q3' },
  { key: 'q4', label: 'Q4' },
];

const data: RadialStackedBarData[] = [
  { id: 'berlin',  label: 'Berlin',  values: { q1: 120, q2: 145, q3: 98,  q4: 175 } },
  { id: 'hamburg', label: 'Hamburg', values: { q1: 95,  q2: 110, q3: 130, q4: 88  } },
  { id: 'munich',  label: 'Munich',  values: { q1: 200, q2: 185, q3: 210, q4: 230 } },
];

<RadialStackedBarChart
  data={data}
  keys={keys}
  size={480}
  sortBy="value"
  onBarClick={(info) => console.log(info.label, info.seriesKey, info.value)}
/>
```

→ [Full documentation](user-manuals/RadialStackedBarChart.md)

---

## TypeScript

All types and defaults are exported directly — no separate `@types/...` package needed.

```tsx
import type {
  // GanttChart
  GanttTask, GanttTranslations, GanttTheme, GanttToolbarConfig,

  // KanbanBoard
  KanbanTask, KanbanColumn, KanbanBoardProps, KanbanBoardTranslation,

  // DateRangePicker
  DateRange, DateRangeEntry, DateRangeInput, DateRangePickerProps, DateRangePickerTranslation,

  // TagSelection
  TagSelectionItem,

  // PasswordStrengthMeter
  CustomRequirement, StrengthResult,

  // RichTextEditor
  RichTextEditorToolbarConfig, RichTextEditorTranslation,

  // SqlEditor
  SqlEditorDialect, SqlEditorTranslation, SqlEditorToolbarConfig,

  // JsonEditor
  JsonEditorHighlightColors, JsonEditorTranslation, JsonEditorToolbarConfig,

  // SunburstChart
  SunburstChartData, SunburstSegmentInfo, SunburstZoomInfo,

  // ChordChart
  ChordChartData, ChordGroupInfo, ChordInfo, ChordSortBy,

  // RadialTreeChart
  RadialTreeChartData, RadialTreeNodeInfo, RadialTreeNodeIconSpec, RadialTreeSortBy,

  // CirclePackingChart
  CirclePackingData, CirclePackingNodeInfo, CirclePackingZoomInfo, CirclePackingSortBy,

  // HorizontalTreeChart
  HorizontalTreeData, HorizontalTreeNodeInfo, HorizontalTreeOrientation,

  // RadialStackedBarChart
  RadialStackedBarData, RadialStackedBarSeries, RadialStackedBarClickInfo,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Versioning & Compatibility

This project follows [Semantic Versioning](https://semver.org/):

- **Patch** — bug fixes only, always safe to upgrade.
- **Minor** — new features, fully backwards compatible.
- **Major** — breaking changes, called out explicitly in the [Changelog](#changelog).

**Only one breaking release to date:** [`3.0.0`](#300--2026-06-15--breaking-changes) removed `ConfirmDialog` / `ConfirmDialogProvider` / `useConfirm` and changed `TagSelection`'s `onTagCreate` signature. Every other release has been additive.

**TypeScript note:** Always pass translation objects as `Partial<...>` inline — e.g. `translation={{ noData: 'No data' }}`. Translation types gain new optional fields as features are added; using `Partial<...>` keeps your code forward-compatible automatically.

---

## Changelog

### [3.33.0] — 2026-07-18

**Added**
- **KanbanBoard — `filterText` prop**: `filterText?: string` filters visible cards by title and assignee. The consumer renders the search field and passes the string. Column counters adjust; WIP-limit checks use the unfiltered total. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.32.0] — 2026-07-18

**Added**
- **KanbanBoard — `priority` field + `showPriority` prop**: `priority?: "low" | "medium" | "high" | "critical"` on `KanbanTask` — shown as a colored dot next to the card title. `showPriority={false}` to hide all dots. New type export: `KanbanTaskPriority`. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.31.0] — 2026-07-18

**Added**
- **KanbanBoard — `showDueDateWarning`**: Overdue cards (dueDate in the past) auto-highlight with a red chip, background tint, and left border. `showDueDateWarning={false}` to opt out. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.
- **KanbanBoard — `width` prop**: `width?: number | string` (default `"100%"`).

**Fixed**
- **KanbanBoard — column scroll**: Cards in a tall column now scroll correctly instead of being silently clipped.

**Changed**
- **KanbanBoard — card visual polish**: Explicit `1px` border, controlled box-shadow with hover lift, hidden scrollbar, `fontWeight: 700` title. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.30.0] — 2026-07-17

**Added**
- **KanbanBoard** — new drag-and-drop Kanban board component with built-in Add / Edit / Delete dialogs, WIP limits, card colors, assignee and due-date chips, `chipVariant` prop, full i18n, and a CSS classes API (`kanbanBoardClasses`). See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.29.2] — 2026-07-16

**Fixed**
- `README.md` / `README.de.md`: added missing `DateRangePicker` types to the TypeScript import block. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.29.1] — 2026-07-16

**Fixed**
- Release script and README files: the empty `[Unreleased]` section that appeared above `[3.29.0]` on npm has been removed; `release.sh` now correctly replaces `[Unreleased]` in README files with the version number only (no empty placeholder section preserved). See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.29.0] — 2026-07-16

**Added**
- **DateRangePicker** — new inline start + end date picker component — no MUI X Pro license required. Controlled and uncontrolled modes, `minDate`/`maxDate`, `required` validation with touched-state handling, full i18n via `translation` prop, CSS classes API (`dateRangePickerClasses` + shared `MuiTs-disabled`/`MuiTs-error` state classes on the root), `inputSize`, and `inputMinWidth` to prevent layout shift on validation messages. `onChange` returns `DateRangeEntry` with both a `Date` object and an ISO string. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.28.1] — 2026-07-15

**Fixed**
- Release script: `[Unreleased]` headings are now automatically renamed to the version number before publishing — so npm always shows the correct changelog entry.

---

### [3.28.0] — 2026-07-15

**Added**
- `SqlEditor`: `Shift+Alt+F` keyboard shortcut — triggers the existing SQL Format button directly from the editor (respects `readonly` and `toolbarConfig.showFormat`). No API change.

---

### [3.27.1] — 2026-07-14

**Fixed**
- `GanttChart`: The left task panel can no longer be dragged so narrow that column headers overlap or content overflows. The divider now enforces a column-aware minimum width (Status + Actions + optional Assignee + 80 px for the name). Row and header containers clip cleanly with `overflow: hidden`. No API change.

---

### [3.27.0] — 2026-07-14

**Added**
- Hover callbacks for all 6 D3 charts (`onSegmentHover`, `onGroupHover`, `onChordHover`, `onNodeHover`, `onCircleHover`, `onBarHover`) — fire with typed info on `mouseenter`, `null` on `mouseleave`. Enables linked-view patterns. All props optional, fully backwards compatible.

**Fixed**
- `GanttChart`: `showAssigneeColumn={true}` no longer collapses the name column to ~24 px. Initial panel width now auto-adds `ASSIGNEE_COL_WIDTH` (110 px) when the column is enabled.

---

### [3.26.1] — 2026-07-13

**Fixed**
- README changelog sections (EN + DE) were missing the `[3.25.0]` and `[3.26.0]` entries on npmjs.com. No code changes.

---

### [3.26.0] — 2026-07-13

**Added**
- **`PopoverColorPicker`** — a convenience wrapper that combines a colored swatch trigger button with a MUI Popover containing the full `ColorPicker`. No `Popover`, `anchorEl`, or open/close state needed — just `value` + `onChange`. All `ColorPicker` props pass through directly. New props: `swatchSize` (default `28`) and `swatchShape` (`"square"` | `"circle"`). Fully accessible (aria-expanded, aria-haspopup, keyboard support). New exports: `popoverColorPickerClasses`. Fully backwards-compatible. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.25.0] — 2026-07-12

**Added**
- **`JsonEditor` — Download button:** New toolbar button that exports the current editor content as a `.json` file. Shown by default (`showDownload: true`). Control the filename via `downloadFilename` (default `"file.json"`). Add `toolbarConfig={{ showDownload: false }}` to opt out. Fully backwards-compatible. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.
- **`GanttChart` — Keyboard Navigation:** The task panel is now keyboard-accessible — `Tab` to focus, `↑`/`↓` to move selection, `Enter` to open the edit dialog, `Escape` to deselect. No new props required. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.24.1] — 2026-07-10

**Fixed**
- `RichTextEditor` toolbar: `H1`/`H2`/`H3` and `MD` buttons now render as `<svg><text>` instead of a plain HTML `<span>` — consistent rendering engine, stroke weight, and color behaviour with all other SVG toolbar icons.
- `RadialStackedBarChart` stories: removed unused parameter that caused an ESLint error.

---

### [3.24.0] — 2026-07-10

**Added**
- **CSS Classes API** for `TagSelection`, `PasswordStrengthMeter`, and `ColorPicker` — every significant DOM node now carries a stable `.MuiTs<Component>-<slot>` class name. Style individual slots via plain CSS, CSS Modules, or Tailwind without touching MUI internals. Three typed constants objects exported: `tagSelectionClasses`, `passwordStrengthMeterClasses`, `colorPickerClasses` + shared `muiTsStateClasses` (`.MuiTs-disabled`, `.MuiTs-error`, …). See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.23.0] — 2026-07-10

**Added**
- `ColorPicker`: new `format?: 'hex' | 'rgb' | 'hsl'` prop — controlled display format, lets the parent own the active format (e.g. for programmatic form resets). Combine with `onFormatChange`. Omit to keep existing uncontrolled behaviour. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.22.0] — 2026-07-09

**Added**
- `RadialStackedBarChart`, `ChordChart`, `SunburstChart`, `CirclePackingChart`: new `valueFormatter` prop for full control over numeric values in tooltips — replaces the built-in `valueDecimalCount`/separator props when set. `RadialStackedBarChart` additionally receives a `seriesKey` argument for per-series formatting. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.21.0] — 2026-07-09

**Added**
- `TagSelection`: new `chipVariant?: 'filled' | 'outlined'` prop (default: `'filled'`) — controls the MUI Chip variant for all tag chips in the selected-tags area and in the autocomplete dropdown. Consumers with a design system that prefers `outlined` chips no longer need to override styles manually. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.20.0] — 2026-07-09

**Added**
- `RichTextEditor`: new `onMentionInserted?: (item: MentionItem) => void` prop — fires when the user selects an item from the `@` mention dropdown. The full `MentionItem` (`{ id, label }`) is passed to the callback, so no HTML parsing is needed to track who was mentioned. Purely additive. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.19.0] — 2026-07-08

**Added**
- `RichTextEditor`: new `defaultValue?: string` prop for uncontrolled usage — sets the initial HTML content once on mount, no external state required. Analogous to MUI TextField's `defaultValue`. When both `value` and `defaultValue` are provided, `value` takes precedence. Purely additive — no existing behaviour changes. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.18.0] — 2026-07-08

**Added**
- `RichTextEditor`: new `onSave?: () => void` prop — fires when the user presses **Ctrl+S** (Windows/Linux) or **Cmd+S** (macOS) inside the editor. The browser's native "Save Page" dialog is always suppressed within the editor. Purely additive — no existing behaviour changes. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.17.1] — 2026-07-05

**Fixed**
- `GanttChart`: Reset View button (`showResetView`) now activates when an assignee filter is set — previously the button stayed disabled even though clicking it would have cleared the filter. `isViewChanged` now correctly includes the assignee filter state.

---

### [3.17.0] — 2026-07-05

**Added**
- `GanttChart`: assignee filter dropdown in the toolbar — `toolbarConfig={{ showAssigneeFilter: true }}` adds a Select that filters visible tasks by assignee. The filter is ancestor-inclusive (parents are kept when descendants match). Two new optional translation keys: `filterAssigneeAll`, `filterAssigneeLabel`.
- `GanttChart`: `onDragStart(task, type)` callback — fires immediately on mousedown on a draggable/resizable bar (before the ≥ 5 px movement threshold). `type` is `"move"` or `"resize"`. Intended for optimistic UI, analytics, and shadow elements. No debouncing needed — fires at most once per gesture. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.16.0] — 2026-07-03

**Added**
- `GanttChart`: progress slider in the built-in Add/Edit task dialog — `GanttTask.progress` (0–100 %) is now editable without a mouse, closing an accessibility gap for keyboard users. Slider pre-fills from existing task data in edit mode; resets to 0 when milestone is toggled on. New optional translation key `dialogFieldProgress`. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.15.0] — 2026-07-03

**Added**
- New component: `RadialStackedBarChart` — multi-series stacked bars in a radial layout (6th D3 chart). Features: 20+ props, concentric grid rings with custom formatter, auto-centered legend with overflow protection, `sortBy`, `colorConfig`, `onBarClick`, `zoomable`, and full dark-mode support. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.14.1] — 2026-07-02

**Fixed**
- README: missing changelog entry for 3.14.0 — no code changes.

---

### [3.14.0] — 2026-07-02

**Added**
- RichTextEditor: `@`-mention autocomplete (`mentionItems`, `onMentionSearch`, `mentionTriggerChar`, `translation.mentionNoResults`). Dropdown anchored to the cursor, keyboard navigation (↑/↓/Enter/Escape), serialised as `<span data-type="mention" data-id="…">` in HTML output. New export: `MentionItem`. New peer dependency: `@tiptap/extension-mention`. See [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) for details.

---

### [3.13.0] — 2026-06-29

**Added**
- New component: `ColorPicker` — a saturation/hue/alpha color picker panel with an eyedropper tool, fills a real MUI gap. See [Quick Start](#colorpicker) and the [Changelog](#3130--2026-06-29) for details.

---

### [3.12.0] — 2026-06-29

**Added**
- TagSelection: `searchDebounceMs` (debounces `onSearchChange`) and `serverSideFilter` (trusts `tags` as already filtered, for fuzzy/non-substring server search) — closes the long-standing "Async Search" gap.

**Fixed**
- TagSelection: found while implementing the above — a spurious second `onSearchChange("")` call fired right after every real keystroke (MUI's internal `reason="reset"` event). Now filtered out.

See [Changelog](#3120--2026-06-29) for details.

---

### [3.11.3] — 2026-06-29

**Fixed**
- GanttChart: the built-in task dialog now excludes any task that already (directly or transitively) depends on the task being edited from the dependencies dropdown — closing the last deferred item from the v3.11.2 bug audit (no guard rail against creating a dependency cycle). See [Changelog](#3113--2026-06-29).

---

### [3.11.2] — 2026-06-28

**Fixed**
- A deep bug audit across all 11 components — stale timers/listeners on unmount, `maxTags` bypass, missing `noData` rendering on all 5 D3 charts, `ChordChart` valueIn/valueOut miscount in undirected mode, `HorizontalTreeChart` RL/BT mirror off-center for shallow trees, and more. Every fix is backed by a regression test. See [Changelog](#3112--2026-06-28) for the full list.

---

### [3.11.1] — 2026-06-27

**Fixed**
- TagSelection: duplicate tag in the `WithCustomColorCreation` Storybook story — a story bug, not a component bug. See [Changelog](#3111--2026-06-27).

---

### [3.11.0] — 2026-06-25

**RadialTreeChart & HorizontalTreeChart**
- `duration`: drill in/out and Escape resets now crossfade instead of jump-cutting (default 750ms, `0` disables).

---

### [3.10.0] — 2026-06-25

**SunburstChart**
- `duration`: drill-in/out now animates smoothly between focus levels (default 750ms, `0` disables).

---

### [3.9.1] — 2026-06-25

**Fixed**
- GanttChart: `GanttTranslations` had 3 required keys added after release (`todayLabel`, `columnAssignee`, `exportCsvTooltip`) — now optional, matching every other translation type. See [Versioning & Compatibility](#versioning--compatibility).

---

### [3.9.0] — 2026-06-24

**PasswordStrengthMeter**
- `showCopyButton`: copy-to-clipboard icon next to the password field, pairs with `showPasswordGenerator`.

---

### [3.8.0] — 2026-06-23

**RichTextEditor**
- `showPasteAsPlainTextButton`: toolbar toggle that strips formatting from pasted content.
- `showMarkdownButton` + `onMarkdownChange`: Markdown import/export dialog and a live Markdown callback.

---

### [3.7.1] — 2026-06-23

**Republish — missing README on npm**
- `v3.7.0` published with an empty `readme` registry field (npmjs.com showed no README, though the tarball itself was correct). No code or content changed — this version exists purely to populate the registry metadata correctly.

---

### [3.7.0] — 2026-06-23

**JsonEditor — Folding, Path Finder, and Schema Validation**
- New `showFolding` (fold gutter for objects/arrays), `enablePathFinder` (`Ctrl+Click` a value to copy its JSON path), and `schema` prop (structural validation with inline error diagnostics — type, required, enum, nested shapes).

---

### [3.6.1] — 2026-06-22

**⚠️ TypeScript Compatibility Fix**
- `v3.4.0`/`v3.5.0` made new translation fields required on `TagSelectionTranslation` and `SqlEditorTranslation`, breaking TypeScript builds for code that declares a standalone variable against the full named type. Those fields are now optional — old object literals compile again, no code change needed.

---

### [3.6.0] — 2026-06-22

**Storybook & StackBlitz — Real-World Showcase**
- 17 new Storybook stories across all 11 components, each with a genuinely different, realistic dataset (disk-usage analysis, trade flows, construction schedules, support-ticket routing, and more) instead of prop-toggle variations on one generic fixture.
- StackBlitz demo cards now show a use-case category for quick orientation, with sharpened hero copy.

---

### [3.5.0] — 2026-06-22

**SqlEditor — Query History**
- New `toolbarConfig.showHistory` option saves every executed query to `localStorage` and lets you reload it with one click. New props: `queryHistoryKey`, `queryHistoryMaxEntries`.
- D3 chart Storybook stories now auto-demonstrate drill-down, zoom, and hover-highlight on load.

---

### [3.4.0] — 2026-06-21

**Accessibility & Test Coverage**
- Added missing `aria-label` to 13 icon-only buttons across GanttChart, TagSelection, and RichTextEditor — these previously relied on `Tooltip` alone, which doesn't provide a screen-reader accessible name.
- `SqlEditor` went from 0 tests to 82% line coverage. Overall library coverage: 68% → 74% lines.

---

### [3.3.0] — 2026-06-21

**Tree-Shaking — Per-Component Build Output**
- `import { TagSelection } from '@thebuoyant-tsdev/mui-ts-library'` no longer pulls D3, TipTap, or CodeMirror into your bundle — measured drop from 1.1 MB to 22 KB in a minimal test bundle. No API changes.

---

### [3.2.1] — 2026-06-17

**Bug Fixes**
- **ChordChart** — ribbons now visible in dark mode (`mixBlendMode` auto-switches to `"normal"` on dark backgrounds).
- **HorizontalTreeChart** — link opacity default raised from `0.4` to `1.0`, consistent with RadialTreeChart.

---

### [3.2.0] — 2026-06-16

**StackBlitz Live Demo**
- New interactive demo — open in your browser in seconds, no local setup needed: [→ Try it on StackBlitz](https://stackblitz.com/github/thebuoyant/mui-ts-library/tree/main/stackblitz-demo?startScript=dev)
- Showcases TagSelection (with search highlighting), PasswordStrengthMeter (with generator), and GanttChart (draggable, resizable).

---

### [3.1.0] — 2026-06-16

**TagSelection — Search Result Highlighting**
- Matching portions of tag labels in the dropdown are now rendered in **bold** while the user types (e.g. `"Reac"` → **Reac**t).
- Case-insensitive, no API changes.

---

### [3.0.0] — 2026-06-15 — Breaking Changes

**Removed**
- `ConfirmDialog`, `ConfirmDialogProvider`, `useConfirm` removed entirely. Migration: use MUI `Dialog` directly, or stay on `2.x`.

**TagSelection — `onTagCreate` signature changed**
- Before: `(label: string, color: TagColor) => void`
- After: `(tag: TagSelectionItem) => void` — tag is fully constructed, already includes `selected: true` and chosen colors.

**TagSelection — Custom Color Picker**
- New color picker panel on tag creation: background + text color swatches, hex input, auto WCAG-contrast toggle.

**Chart & Gantt — color prop fix**
- `linkColor`, `labelColor`, `todayColor` and other color props now correctly fall back to theme defaults when set to `""` (empty string). Previously caused invisible chart links in Storybook.

---

[→ Full changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md)

---

## License

MIT © Thomas Schlender
