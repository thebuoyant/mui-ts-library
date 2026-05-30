# mui-ts-library

> [Deutsche Version →](README.de.md)

A type-safe React component library built on **TypeScript** and **MUI (Material UI v9)**. Components follow MUI's design language, support dark mode and theming out of the box, and ship with complete TypeScript types, Storybook stories, and unit tests.

---

## Components

| Component | Description | Docs |
|---|---|---|
| [`ConfirmDialog`](#confirmdialog) | Declarative async confirmation dialog — `await confirm({ title, severity })` from anywhere in the app. Supports countdown auto-confirm and `Enter` = confirm shortcut. | [Full Manual →](user-manuals/ConfirmDialog.md) |
| [`GanttChart`](#ganttchart) | Project timeline with hierarchical tasks, milestones, drag & drop, Ctrl / Cmd ⌘+Scroll zoom, today chip, and built-in CRUD dialogs | [Full Manual →](user-manuals/GanttChart.md) |
| [`TagSelection`](#tagselection) | Multi-tag selector with autocomplete, free tag creation, overflow chips, and MUI theme colors | [Full Manual →](user-manuals/TagSelection.md) |
| [`PasswordStrengthMeter`](#passwordstrengthmeter) | Password input with animated strength meter, segmented bar, custom requirements, and requirements checklist | [Full Manual →](user-manuals/PasswordStrengthMeter.md) |
| [`RichTextEditor`](#richtexteditor) | WYSIWYG editor (TipTap v3) with toolbar, link dialog, text color, highlight, word count, fullscreen mode, Markdown paste, table editing, image embed, and emoji picker | [Full Manual →](user-manuals/RichTextEditor.md) |
| [`SqlEditor`](#sqleditor) | SQL code editor (CodeMirror 6) with syntax highlighting, multi-dialect, autocomplete, linting, and `Cmd+Enter` execute shortcut | [Full Manual →](user-manuals/SqlEditor.md) |
| [`JsonEditor`](#jsoneditor) | JSON code editor (CodeMirror 6) with real-time validation, Format, Compact buttons, and optional minimap | [Full Manual →](user-manuals/JsonEditor.md) |
| [`SunburstChart`](#sunburstchart) | D3 v7 hierarchical chart — concentric rings, Ctrl / Cmd ⌘+Click drill-down, Ctrl / Cmd ⌘+Scroll zoom, donut mode, MUI theme integration | [Full Manual →](user-manuals/SunburstChart.md) |
| [`ChordChart`](#chordchart) | D3 v7 flow chart — arc groups connected by ribbons, hover highlight, directed/undirected, MUI theme integration | [Full Manual →](user-manuals/ChordChart.md) |
| [`RadialTreeChart`](#radialtreedchart) | D3 v7 radial tree — hierarchical nodes on concentric rings, MUI icons, Ctrl / Cmd ⌘+Click drill-down, Ctrl / Cmd ⌘+Scroll zoom, MUI theme integration | [Full Manual →](user-manuals/RadialTreeChart.md) |
| [`CirclePackingChart`](#circlepackingchart) | D3 v7 circle packing — nested circles sized by value, animated double-click zoom (D3 interpolation), depth gradient or palette, MUI theme integration | [Full Manual →](user-manuals/CirclePackingChart.md) |

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

Wrap your app in MUI's `ThemeProvider` as usual. `ConfirmDialog` additionally requires a `ConfirmDialogProvider` near the app root — all other components work without a provider.

### ConfirmDialog

Replace every manual `open/setOpen` state pattern with a single `await confirm(...)` call. Eliminates boilerplate from delete confirmations, destructive actions, and any flow that needs user approval before proceeding — with optional countdown auto-confirm and `Enter` = confirm shortcut.

```tsx
import { ConfirmDialogProvider, useConfirm } from '@thebuoyant-tsdev/mui-ts-library';

// App root — once
<ConfirmDialogProvider>
  <App />
</ConfirmDialogProvider>

// Anywhere inside
const confirm = useConfirm();
const ok = await confirm({ title: 'Delete entry?', severity: 'error', confirmLabel: 'Delete', countdown: 10 });
if (ok) handleDelete();
```

→ [Full documentation](user-manuals/ConfirmDialog.md)

---

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

Password input with real-time strength feedback. Designed for registration flows and password-change screens where you want to guide users toward secure passwords with an animated strength bar, segmented segments, and a live requirements checklist.

```tsx
import { PasswordStrengthMeter } from '@thebuoyant-tsdev/mui-ts-library';

<PasswordStrengthMeter
  passwordMinLength={10}
  showSegmentedBar
  onPasswordChange={(password, result) => console.log(result.score)}
/>
```

→ [Full documentation](user-manuals/PasswordStrengthMeter.md)

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

SQL code editor with syntax highlighting, dialect-aware autocomplete, and inline linting. Designed for developer tools, database clients, and admin panels where users write and execute SQL queries — with `Cmd+Enter` shortcut, multi-dialect support (MySQL, PostgreSQL, SQLite, MSSQL), and schema-based autocomplete.

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

## TypeScript

All types and defaults are exported directly — no separate `@types/...` package needed.

```tsx
import type {
  // ConfirmDialog
  ConfirmDialogOptions, ConfirmDialogSeverity,

  // GanttChart
  GanttTask, GanttTranslations, GanttTheme, GanttToolbarConfig,

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
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## License

MIT © Thomas Schlender
