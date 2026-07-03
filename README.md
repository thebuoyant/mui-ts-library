# mui-ts-library

> [Deutsche Version →](README.de.md)

A type-safe React component library built on **TypeScript** and **MUI (Material UI v9)**. Components follow MUI's design language, support dark mode and theming out of the box, and ship with complete TypeScript types, Storybook stories, and unit tests.

**[→ Live Storybook](https://thebuoyant.github.io/mui-ts-library/)** — explore all components interactively, no installation needed.

**[→ Try it on StackBlitz](https://stackblitz.com/github/thebuoyant/mui-ts-library/tree/main/stackblitz-demo?startScript=dev)** — live editable demo in your browser, no installation required.

---

## Components

12 production-ready components across three categories. Each links to a live, interactive demo and a full manual covering every prop, type, and pattern.

### Interactive UI

| Component | What it's for | Try it |
|---|---|---|
| [`GanttChart`](#ganttchart) | Drag-and-drop project timelines with milestones, dependencies, and CSV export | [Live demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-ganttchart--default) · [Docs](user-manuals/GanttChart.md) |
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

## TypeScript

All types and defaults are exported directly — no separate `@types/...` package needed.

```tsx
import type {
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

  // HorizontalTreeChart
  HorizontalTreeData, HorizontalTreeNodeInfo, HorizontalTreeOrientation,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Versioning & Compatibility

This project follows [Semantic Versioning](https://semver.org/). In practice:

- **Patch** (`3.7.0` → `3.7.1`) — bug fixes only, always safe to upgrade.
- **Minor** (`3.6.0` → `3.7.0`) — new features, fully backwards compatible.
- **Major** (`2.x` → `3.0.0`) — breaking changes, called out explicitly in the [Changelog](#changelog).

**Only one breaking release to date:** [`3.0.0`](#300--2026-06-15--breaking-changes) removed `ConfirmDialog` / `ConfirmDialogProvider` / `useConfirm` and changed `TagSelection`'s `onTagCreate` signature. Every other release since has been additive.

**TypeScript note:** translation types (e.g. `TagSelectionTranslation`, `SqlEditorTranslation`, `GanttTranslations`) gain new optional fields over time as features are added — passing a `Partial<...>` object straight to the `translation`/`translations` prop (the pattern used throughout this README) is always forward-compatible. Declaring a standalone variable typed against the full named type only stays compatible if new fields are optional. An audit across all components turned up one gap — `GanttTranslations` had 3 required fields added after release — fixed in `3.9.1` (see [Changelog](#391--2026-06-25)). Every translation type is optional-safe as of that version.

---

## Changelog

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
