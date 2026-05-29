# Changelog

> [Deutsche Version →](CHANGELOG.de.md)

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [2.4.0] — 2026-05-29

### Added

#### RadialTreeChart — New Component (MTL-21) · D3 Charts family #3

- **Hierarchical data as a radial tree** — nodes placed on concentric rings connected by curved Bézier links; ideal for org charts, taxonomies, dependency trees, and knowledge graphs
- **`data: RadialTreeChartData`** — recursive tree with optional `subname`, `value`, `specialValueA`, `specialValueB` fields
- **Icons on nodes** (`showIcons`, default `true`) — default: `FolderOutlined` for branch nodes, `PersonOutlined` for leaves; override per depth via `nodeIconsByDepth` or fully custom via `renderNodeIcon`
- **MUI Tooltip** (`followCursor`) on every node — shows name, subname, and breadcrumb path on hover
- **Built-in MUI Popover** (`showNodePopover`, default `false`) — click a node to open a styled card with Avatar, name, subname, and labeled special values; fully replaceable via `renderNodePopoverContent`
- **`onNodeClick?: (info: RadialTreeNodeInfo, event) => void`** — clean callback without D3 or Fluent UI types; `RadialTreeNodeInfo`: `{ id, name, subname, value, specialValueA, specialValueB, depth, path, childrenCount, data }`
- **`chartColors?: string[]`** — per-depth colors; falls back to MUI theme palette
- **`autoFit?: boolean`** (default `true`) — auto-fits the viewBox to the rendered content
- **`sortBy?: 'name' | 'value'`** (default `'name'`)
- **`disabled?: boolean`** — mutes all interactions, reduces opacity
- Migrated from Fluent UI (`@fluentui/react-components`, `@fluentui/react-icons`) to MUI: icons, Avatar, Popover — zero Fluent UI dependencies
- New exported types: `RadialTreeChartData`, `RadialTreeNodeInfo`, `RadialTreeNodeIconSpec`, `RadialTreeSortBy`, `RadialTreeChartTranslation`

---

## [2.3.0] — 2026-05-29

### Added

#### ChordChart — New Component (MTL-20) · D3 Charts family #2

- **Flow visualization** as concentric arc groups connected by ribbons — ideal for dependency maps, migrations, trade flows, or any source→target relationship data
- **`data: ChordChartData[]`** — flat array of `{ source: string, target: string, value: number }` links; groups are auto-derived from unique names
- **Hover highlight** — hovering any arc group dims unrelated ribbons (opacity 0.12), focusing attention on the hovered group's flows
- **`directed?: boolean`** (default: `true`) — `true` = arrow ribbons (directional flows); `false` = symmetric ribbons
- **`chartColors?: string[]`** — custom palette; falls back to MUI theme palette (`primary`, `secondary`, `error`, `warning`, `success`, `info`)
- **`showGroupLabels?: boolean`** (default: `true`) — group name labels outside the arc ring
- **`ringThickness?: number`** (default: `20`) — thickness of the arc ring in px
- **`ribbonOpacity?: number`** (default: `0.75`) — opacity of all ribbons
- **`ribbonBlendMode?`** (default: `'multiply'`) — CSS mix-blend-mode for ribbons
- **`sortSubgroups?` / `sortChords?`** — `'ascending' | 'descending' | 'none'` (default: `'descending'`)
- **`onGroupClick?: (info: ChordGroupInfo, event) => void`** — `ChordGroupInfo`: `{ name, index, valueOut, valueIn }`
- **`onChordClick?: (info: ChordInfo, event) => void`** — `ChordInfo`: `{ source: { name, index, value }, target: { name, index, value } }`
- **`disabled?: boolean`** — mutes all interactions, reduces opacity
- MUI `<Tooltip followCursor>` on every group arc and ribbon — instant appear, no browser delay
- MUI theme integration: colors, font family, text color, dark mode
- New exported types: `ChordChartData`, `ChordGroupInfo`, `ChordInfo`, `ChordChartTranslation`, `ChordSortBy`

---

## [2.2.0] — 2026-05-28

### Added

#### SunburstChart — New Component (MTL-19) · First of the D3 Charts family

The `SunburstChart` is the first component in the new **D3 Charts** family. More charts (Treemap, ZoomableCirclePacking, Chord, RadialTree) will follow in subsequent releases.

- **Hierarchical data visualization** as concentric rings — root at the center, each depth level forms a ring
- **`data: SunburstChartData`** — recursive tree structure: `{ id, name, value?, children? }`
- **Zoom interactions:**
  - `Ctrl+Click` on a segment with children → zoom in (drill down)
  - `Ctrl+Double-click` → zoom out one level
  - `Ctrl+Click` on the center label → zoom out one level
  - `Escape` → reset zoom to root
  - Regular `Click` → fires `onSegmentClick` callback immediately (no delay)
- **`innerRadius?: number`** — `0` = solid sunburst (default); `> 0` = donut style
- **`sortBy?: 'value' | 'name'`** — sort segments by value (largest first) or alphabetically
- **`chartColors?: string[]`** — custom color palette; falls back to MUI theme palette (`primary`, `secondary`, `error`, `warning`, `success`, `info`)
- **`showSegmentLabels?: boolean`** — arc-aligned text labels (default: `true`)
- **`showRootLabel?: boolean`** — center label showing current focus node name (default: `true`)
- **`onSegmentClick?: (info: SunburstSegmentInfo, event) => void`** — clean callback with `name`, `value`, `depth`, `path[]`, `childrenCount`, `data`
- **`disabled?: boolean`** — mutes all interactions, reduces opacity
- **`translation?: Partial<SunburstChartTranslation>`** — i18n for tooltip hints
- MUI theme integration: colors, font family, text color, dark mode out of the box
- New exported types: `SunburstChartData`, `SunburstSegmentInfo`, `SunburstChartTranslation`
- New dependency: `d3@^7.9.0`

---

## [2.1.0] — 2026-05-28

### Added

#### RichTextEditor — Phase 2: Content Enrichment (MTL-18)

- **`showTableButton?: boolean`** (default `false`) — table toolbar button; opens a dropdown menu to insert a 3×3 table with header row; when cursor is inside a table the menu also offers: Add Row Before/After, Delete Row, Add Column Before/After, Delete Column, Delete Table; powered by `@tiptap/extension-table` (TableKit)
- **`showImageButton?: boolean`** (default `false`) — image toolbar button; opens a dialog with Image URL and optional Alt text fields; images are displayed inline with `max-width: 100%`; supports Base64 URLs; powered by `@tiptap/extension-image`
- **`showEmojiButton?: boolean`** (default `false`) — emoji picker toolbar button; opens a MUI Popover with ~200 curated emojis across 6 categories (Smileys, Gestures, Hearts & Symbols, Nature, Food, Objects & Travel); live search by emoji name; no external dependency
- New translation keys: `table`, `insertTable`, `addRowBefore`, `addRowAfter`, `deleteRow`, `addColumnBefore`, `addColumnAfter`, `deleteColumn`, `deleteTable`, `image`, `imageDialogTitle`, `imageDialogUrlLabel`, `imageDialogAltLabel`, `imageDialogSave`, `imageDialogCancel`, `emoji`, `emojiSearchPlaceholder`
- New dependencies: `@tiptap/extension-table@^3.23.6`, `@tiptap/extension-image@^3.23.6`; all other `@tiptap/*` packages updated to `^3.23.6` for consistency

---

## [2.0.1] — 2026-05-27

### Changed

- Removed GitHub Pages Storybook deployment workflow (infrastructure too fragile for public repos without Enterprise plan)
- Removed `preview-storybook` npm script and `http-server` devDependency
- Updated `README.md` — removed dead Live Storybook link
- Storybook remains available locally via `npm run storybook` and as Docker distribution via `npm run build-storybook-docker`

---

## [2.0.0] — 2026-05-27

### Added

#### SqlEditor — Quick Wins (MTL-17)

- **`Cmd+Enter` / `Ctrl+Enter` keyboard shortcut** — triggers `onExecute` directly from the editor without clicking the Execute toolbar button; implemented via CodeMirror `keymap.of([{ key: "Mod-Enter" }])`; works regardless of toolbar visibility
- **Auto-sizing line-number gutter** — gutter width now adjusts automatically to the number of digits; previously had a hardcoded `minWidth: 36px` that caused unnecessary padding on short files

#### ConfirmDialog — Quick Wins (MTL-17)

- **`countdown?: number` prop** — auto-confirms the dialog after n seconds; the confirm button label shows a live countdown (`"Delete (5)"`, `"Delete (4)"`, …) and fires `onConfirm` when it reaches 0; countdown resets whenever the dialog closes
- **`Enter` keyboard shortcut** — pressing Enter in an open dialog triggers Confirm; implemented via `onKeyDown` on the Dialog element; Escape still cancels as before

#### PasswordStrengthMeter — Quick Wins (MTL-17)

- **`showSegmentedBar?: boolean` prop** (default: `false`) — replaces the single animated strength bar with 4 individually animated segments; filled segment count maps directly to strength score (0–4)
- **`customRequirements?: CustomRequirement[]` prop** — additional password requirements beyond the built-in 5; each entry has a `label: string` and `fulfilled: boolean | ((password: string) => boolean)`; the function form is evaluated live on every keystroke
- New exported type: `CustomRequirement`

#### JsonEditor — Quick Wins (MTL-17)

- **`showMinimap?: boolean` prop** (default: `false`) — adds an 80 px wide minimap panel on the right side of the editor for fast navigation in large documents; powered by `@replit/codemirror-minimap` (MIT, 1 transitive dependency)
- New dependency: `@replit/codemirror-minimap`

#### GanttChart — Quick Wins (MTL-17)

- **Today chip** — a small labeled chip floats at the very top of the dashed today line, straddling the timeline header and the task rows; the chip color matches `ganttTheme.todayLineColor` (fallback: MUI `primary.main`), text contrast is computed automatically via `theme.palette.getContrastText`; hovering shows a Tooltip with the current date as a localized long-form string (e.g. "Wednesday, 27 May 2026") using `translations.dateLocale`
- New translation key **`todayLabel`** in `GanttTranslations` — default `"Heute"`, English: `"Today"`, set to `""` to hide the chip entirely

---

## [1.4.0] — 2026-05-26

### Added

#### RichTextEditor — Phase 1: Quick Wins (MTL-16)

- **`showWordCount` prop** — displays a word counter in the footer alongside the existing character counter; fully independent (can be used with or without `showCharacterCount` or `maxCharacters`); the `CharacterCount` TipTap extension is loaded automatically when enabled
- **`showToolbar` prop** (default: `true`) — hides the toolbar while keeping the editor fully editable; unlike `readonly`, the editor remains interactive (useful for minimal editors or custom toolbar implementations)
- **`showFullscreenButton` in `toolbarConfig`** (default: `false`, opt-in) — adds a fullscreen toggle button at the right end of the toolbar; clicking expands the editor to cover the full viewport (`100vw × 100vh`) with a CSS `position: fixed` overlay; no new dependencies
- **3 new translation keys** in `RichTextEditorTranslation`: `wordCount` (default: `"{count} words"`), `fullscreen` (default: `"Full screen"`), `exitFullscreen` (default: `"Exit full screen"`)
- All props now documented and ordered alphabetically (A–Z) in stories and user manual
- 2 new Storybook stories: `WithWordCount`, `WithFullscreen`
- 9 new Vitest tests (4 for Word Count, 5 for Fullscreen)

---

## [1.3.2] — 2026-05-25

### Internal — MTL-15: Code Quality & Refactoring

- Extract `useGanttDrag` hook from `GanttTimeline` — all drag, resize, and progress-drag logic lives in `hooks/useGanttDrag.ts`; documents 4 patterns for complex interaction hooks (stable callback refs, two-level state, document-level listeners, suppress-click)
- Extract `GanttBarRow` component from `GanttTimeline` — bar rendering with sub-components `GanttMilestoneBar`, `GanttTaskBar`, `DragTooltip`; reads theme internally via `useGanttTheme()`
- Extract `GanttWeekendStrips` component — weekend background strips, reads `weekendColor` from `useGanttTheme()`
- Extract `GanttStatusContextMenu` component — right-click status menu, purely presentational; business logic stays in GanttTimeline via `onSelect` callback
- Extract `GanttDependencyArrows` component — SVG layer for dependency arrows and today-line, reads theme internally
- `GanttTimeline.tsx` reduced from 811 to ~300 lines
- Shared `ToolbarButton` component in `src/components/shared/` — replaces three identical local implementations in SqlEditorToolbar, JsonEditorToolbar, RichTextEditorToolbar
- Shared `normalizeSize` utility in `src/components/shared/` — replaces three identical local functions
- Unified Gantt status color maps (`STATUS_BAR_COLOR`, `STATUS_CHIP_COLOR`) in `GanttChart.constants.ts`
- Extract `PasswordStrengthBar` component from `PasswordStrengthMeter` — props: `percent`, `color`, `ariaLabel`; better testability and reusability
- Replace three identical `H1Icon`/`H2Icon`/`H3Icon` components with single `HeadingIcon({ level: 1 | 2 | 3 })` in `RichTextEditorToolbar`

---

## [1.3.1] — 2026-05-25

### Fixed

- Externalize all `dependencies` in the Vite build (TipTap, CodeMirror, sql-formatter, zustand, @tanstack/react-virtual) — they are no longer bundled into the dist files
- `dist/index.js` reduced from 1.7 MB to 124 KB, `dist/index.cjs` from 1.4 MB to 91 KB
- Package size reduced from 922 kB to 69 kB (packed)
- Fix publint warning: split `exports` types for ESM (`index.d.ts`) and CJS (`index.d.cts`)
- Fix `repository.url` — added `git+` prefix per npm convention

---

## [1.3.0] — 2026-05-23

### Added

#### JsonEditor

- JSON code editor based on CodeMirror 6 with the same MUI Paper layout as `SqlEditor`
- Real-time JSON validation via built-in `jsonParseLinter` — inline error markers and wavy underlines
- **Format** button — pretty-prints JSON with configurable indentation (`indent` prop, default: 2 spaces)
- **Compact** button — minifies JSON to a single line
- Validation status indicator in the footer — "Valid JSON" / "Invalid JSON" with color-coded icon (`showValidation`)
- `onValidChange?: (isValid: boolean) => void` callback — fires whenever JSON validity changes
- Configurable syntax highlight colors via `highlightColors` prop (property names, strings, numbers, booleans, null)
- Full i18n via `Partial<JsonEditorTranslation>` — all toolbar tooltips, validation labels, and cursor position format
- Cursor position footer (`showLineColumn`)
- `readonly` mode — hides toolbar, editor is non-editable
- `disabled` mode — toolbar disabled, editor grayed out
- `error` + `helperText` for form integration consistent with MUI TextField
- `name` prop — hidden `<input type="hidden">` for native form submission
- `height` / `width` props — numeric values → px, CSS strings passed as-is, `"auto"` fills surrounding flex container
- 14 Storybook stories: Default, WithJson, WithValidation, InvalidJson, CompactJson, WithFixedHeight, WithAutoHeight, Controlled, IndentFour, ReadOnly, Disabled, WithError, NoLineNumbers, CustomHighlightColors, GermanTranslation, LargeDataset
- 17 Vitest unit tests covering all major use cases
- Bilingual user manual: `user-manuals/JsonEditor.md` (EN) and `user-manuals/JsonEditor.de.md` (DE)
- Added `@codemirror/lang-json` as dependency

---

## [1.2.0] — 2026-05-23

### Added

#### ConfirmDialog
- Declarative confirmation dialog system — replaces the `useState + Dialog + DialogTitle + DialogContent + DialogActions` boilerplate with a single hook call
- `ConfirmDialogProvider` — renders a single MUI Dialog at the app root; accepts optional default `translation` (confirm/cancel labels)
- `useConfirm` hook — returns an `async (options) => Promise<boolean>` function usable anywhere inside the provider
- `ConfirmDialogOptions` per-call configuration:
  - `title` — dialog heading
  - `description` — body text (`string`) or any React node (JSX, `<Stack>`, etc.)
  - `confirmLabel` / `cancelLabel` — per-call label overrides (fall back to provider `translation`)
  - `severity` — `"info"` | `"warning"` | `"error"` | `"success"`: tints the confirm button and shows a matching icon
  - `hideCancelButton` — alert mode with a single confirm button (useful for informational notices)
  - `maxWidth` — MUI Dialog max width (`"xs"` default through `"xl"`)
  - `showIcon` — show/hide the severity icon in the title (default: `true`)
- Backdrop click and Escape key resolve the promise as `false` (cancel)
- Sequential calls: a second `confirm()` while a dialog is open auto-cancels the first with `false`
- `DEFAULT_CONFIRM_DIALOG_TRANSLATION` exported for reference
- Exported types: `ConfirmDialogOptions`, `ConfirmDialogSeverity`, `ConfirmDialogTranslation`, `ConfirmDialogProviderProps`
- 11 Storybook stories: Default, NoDescription, Destructive, Warning, Success, AlertOnly, NoIcon, CustomLabels, LargeDialog, GermanTranslation, MultipleDialogs
- 16 Vitest unit tests covering all options, translations, severity, sequential calls, and ReactNode descriptions
- Bilingual user manual: `user-manuals/ConfirmDialog.md` (EN) and `user-manuals/ConfirmDialog.de.md` (DE)

---

## [1.1.0] — 2026-05-22

### Added

#### SqlEditor
- SQL code editor based on CodeMirror 6 with the same MUI Paper layout as `RichTextEditor`
- SQL syntax highlighting with MUI theme colors: keywords (`primary.main`, bold), strings (`success.main`, bold), identifiers (`info.main`), numbers (`warning.main`), functions (`secondary.main`), comments (`text.disabled`, italic)
- Dark mode support — all colors sourced from the active MUI theme
- 5 SQL dialects: Standard SQL, MySQL, PostgreSQL, SQLite, MS SQL Server
- **Format button** — prettifies SQL via `sql-formatter` (dialect-aware, try/catch safe)
- **Server-side linting** via async `onLint` callback (600 ms debounce); errors shown as wavy underlines and lint gutter markers
- **Schema-aware autocomplete** — `schema` prop accepts `SqlSchema` (`tables` with `name` + `columns`) and suggests table/column names with type hints in the dropdown
- **Configurable highlight colors** — `highlightColors` prop overrides keyword, string, and identifier colors independently
- SQL keyword autocomplete out of the box (`autocompletion()` + `completionKeymap`)
- Toolbar: Format, Copy (with "Copied!" feedback), Clear, Undo, Redo, Execute (off by default)
- Footer: cursor position (`Ln {line}, Col {col}`) and error count (`showErrorCount`)
- `toolbarConfig` prop to show/hide individual toolbar buttons
- `translation` prop for full i18n of all toolbar tooltips and footer labels
- `dialect` prop: `"standard"` | `"mysql"` | `"postgresql"` | `"sqlite"` | `"mssql"`
- `showLineNumbers`, `showLineColumn`, `showErrorCount` display flags
- Controlled mode via `value` / `onChange` (syncs without cursor jump)
- `readonly` mode (no toolbar) and `disabled` mode (grayed out)
- `error` state and `helperText` — consistent with MUI TextField
- `onBlur` / `onFocus` callbacks
- `onExecute` callback for the Execute button
- `name` prop for native form submission via hidden `<input type="hidden">`
- Configurable `height` and `width` (number → px, CSS strings, `"auto"` for flex containers)
- 17 Storybook stories covering all features
- Exported types: `SqlEditorProps`, `SqlEditorDialect`, `SqlEditorToolbarConfig`, `SqlEditorTranslation`, `SqlEditorHighlightColors`, `SqlLintError`, `SqlSchema`, `SqlTable`, `SqlColumn`
- Exported defaults: `DEFAULT_SQL_EDITOR_TOOLBAR_CONFIG`, `DEFAULT_SQL_EDITOR_TRANSLATION`

#### Storybook Docker Distribution
- New `npm run build-storybook-docker` script — builds a self-contained ZIP for sharing Storybook with non-developers
- ZIP contains a pre-built Docker image (nginx:alpine + Storybook static files), `docker-compose.yml`, `start.sh` (macOS/Linux), `start.bat` (Windows), and bilingual how-to guides
- Recipients only need Docker Desktop — no Node.js, no build step
- Output: `storybook-docker/storybook-{version}.zip`
- End-user guides: `storybook-docker/how-to.md` (EN) and `storybook-docker/how-to.de.md` (DE)

#### General
- Added `@lezer/highlight` as explicit dependency (was previously only a transitive dep, used directly in `SqlEditorContent`)
- Updated `package.json` description and keywords to include SqlEditor / CodeMirror / SQL
- Security: patched `ws` (8.20.0 → 8.20.1) and `brace-expansion` (5.0.5 → 5.0.6) via `npm audit fix`
- Updated `.gitignore`: `storybook-docker/storybook-*/`, `storybook-docker/*.tar`, `*.tgz` excluded from repository
- Bilingual user manual: `user-manuals/SqlEditor.md` (EN) and `user-manuals/SqlEditor.de.md` (DE)
- Updated `PROJECT-SHARE.md`: covers both `.tgz` (library) and Storybook Docker ZIP distribution

---

## [1.0.0] — 2026-05-21

Initial public release of `@thebuoyant-tsdev/mui-ts-library`.

### Added

#### GanttChart

A fully interactive project timeline built on React, MUI, and Zustand.

**Data model**
- Hierarchical task structure via flat `tasks` array + `parentId` — tree is built internally
- Task fields: `id`, `name`, `status`, `startDate`, `endDate`, `parentId?`, `dependencies?`, `isMilestone?`, `progress?`, `color?`
- 4 statuses: `"planned"` · `"in-progress"` · `"done"` · `"blocked"` — color-coded bars and status chips
- Milestone markers rendered as rotated diamonds (♦) instead of bars
- Per-task color override via `GanttTask.color` (any CSS color value)
- Progress field (0–100 %) shown as a semi-transparent overlay on the bar

**Timeline view**
- 4 zoom levels: `"days"` · `"weeks"` · `"months"` · `"quarters"` — user can switch via toolbar
- Z-shaped finish-to-start dependency arrows between tasks
- Today-line indicator with automatic horizontal scroll to center on load
- Weekend background highlights on the days scale
- Resizable left panel via draggable divider (`minPanelWidth`, `maxPanelWidth`)
- Virtualized row rendering for large datasets (`virtualizeRows`) via `@tanstack/react-virtual`
- `defaultRangeStart` / `defaultRangeEnd` to pin the visible date range

**Toolbar**
- Scale buttons, date range inputs with From/To fields, Expand All / Collapse All, Scroll to Today, Reset View
- Fine-grained control via `toolbarConfig` — show/hide individual toolbar elements independently
- `showToolbar={false}` to hide the entire toolbar

**Interaction**
- `draggable` — move task bars horizontally; updates `startDate` and `endDate` in sync
- `resizable` — drag right edge of a bar to change `endDate`
- `progressDraggable` — drag handle on bar to set progress (0–100 %) interactively
- `cascadeDependencies` — automatically shifts all finish-to-start successors when a predecessor moves (transitive, circular-dependency-safe)
- `showCriticalPath` — highlights the longest dependency chain that determines project duration
- `zoomable` — `Ctrl + mouse wheel` cycles through zoom levels
- `inlineEdit` — double-click task name in the left panel for direct editing
- Right-click context menu on task bars for instant status change (`onStatusChange` callback)
- Panel row reordering via drag & drop (`@dnd-kit`)

**CRUD dialogs**
- Built-in MUI dialogs for Add / Edit / Delete (`enableBuiltinDialogs={true}`, default)
- Dialog fields: name, start date, end date, status, parent task, milestone flag, dependencies (multi-select)
- `enableBuiltinDialogs={false}` — bypasses built-in dialogs and calls `onAddTask` / `onEditTask` / `onDeleteTask` instead (custom dialog integration)

**Theming** — via `ganttTheme: GanttTheme`
- `statusColors` — bar colors per status as CSS values
- `criticalPathColor` — highlight color for critical path (default: `error.main`)
- `milestoneColor` — diamond color (default: `warning.main`)
- `todayLineColor` — today-line color (default: `primary.main`)
- `weekendColor` — weekend column background (default: `action.hover`)
- `barBorderRadius` — task bar corner radius in px (default: `4`)

**Callbacks**
- `onTaskClick(task)` · `onMilestoneClick(task)` — click on bar / milestone diamond
- `onTaskMoved(task, newStart, newEnd)` — fired after a successful bar drag
- `onTaskResized(task, newEnd)` — fired after a resize drag
- `onStatusChange(task, status)` — fired after context menu status selection
- `onTasksChange(tasks)` — fires after every change with the complete current task list (central callback for data-driven architectures)
- `onTaskCreated(task)` · `onTaskUpdated(task)` · `onTaskDeleted(taskId)` — specific callbacks for built-in dialog actions
- `onAddTask(parent?)` · `onEditTask(task)` · `onDeleteTask(task)` — called when `enableBuiltinDialogs={false}`

**TypeScript exports**
- Types: `GanttTask`, `GanttTaskNode`, `GanttTaskStatus`, `GanttTimeScale`, `GanttTranslations`, `GanttTheme`, `GanttStatusColors`, `GanttChartProps`, `GanttToolbarConfig`
- `DEFAULT_GANTT_TRANSLATIONS` — pre-filled default translations (mix of German/English)

**i18n & accessibility**
- All UI texts overridable via `translations` prop — 30+ keys including dialog labels, toolbar tooltips, status labels, date locale
- Action icon tooltips double as `aria-label`; dialogs have focus trap + Escape handling
- Dark mode support via MUI theme

**Storybook & tests**
- Storybook stories covering all major scenarios
- Vitest unit tests (included in the 271-test total at v1.0.0)
- Bilingual user manual: `user-manuals/GanttChart.md` (EN) + `user-manuals/GanttChart.de.md` (DE)

#### TagSelection

Multi-tag selector with autocomplete, chip display, async support, and free-tag creation.

**Data model**
- `TagSelectionItem` fields: `id`, `label`, `selected?`, `disabled?`, `color?`, `foregroundColor?`, `backgroundColor?`
- `TagColor`: `"default"` · `"primary"` · `"secondary"` · `"error"` · `"info"` · `"success"` · `"warning"`
- Two color systems: semantic `color` (MUI theme, dark-mode-safe) or `foregroundColor`/`backgroundColor` (custom CSS) — mutually exclusive
- Disabled tags cannot be selected; already-selected disabled tags cannot be removed
- All chips and dropdown entries sorted alphabetically

**Display & visibility**
- `showSelectedTags` — show/hide the entire chip area
- `showSelectedTagsLabel` — show/hide the heading above the chips
- `showAutoComplete` — show/hide the search input (display-only mode when `false`)
- `inputSize` / `chipSize` — `"small"` or `"medium"` (MUI standard)

**Interaction**
- `maxTags` — maximum simultaneously selected tags; input auto-disables when limit reached, with hint text
- `maxVisibleChips` — excess chips hidden behind `+N` chip; clicking opens an overflow popover (`popoverPlacement`: `"top"` or `"bottom"`)
- `loading` — loading indicator in dropdown for async tag sources
- `disabled` — entire component locked; chips visible without delete icons
- `listboxMaxHeight` — max height of the autocomplete dropdown list in px

**Free tag creation** (`allowCreate={true}`)
- When typed text matches no existing tag, the input switches to create mode
- CheckIcon (confirm) + CloseIcon (cancel) appear in the field; 7 MUI theme color chips appear below for color selection
- Confirm by clicking CheckIcon **or pressing Enter**
- New tag is immediately marked as selected internally; `onTagCreate` fires for external state sync

**Callbacks**
- `onTagSelect(tag, selectedTags, allTags)` — tag selected from dropdown
- `onTagDelete(tag, selectedTags, allTags)` — chip removed
- `onTagsChange(selectedTags, allTags)` — central callback, fires after every selection change
- `onSearchChange(value)` — for server-side filtering and async loading
- `onTagCreate(label, color)` — new tag confirmed in create mode (`allowCreate={true}`)

**TypeScript exports**
- Types: `TagSelectionItem`, `TagSelectionProps`, `TagSelectionTranslation`, `TagColor`
- `DEFAULT_TAG_SELECTION_TRANSLATION`

**i18n** (7 keys): `selectedTagsLabel`, `autoCompleteLabel`, `noSelectedTagsText`, `noAvailableTagsText`, `placeholder`, `loadingText`, `maxTagsReachedText`

**Storybook & tests**
- Storybook stories covering all major scenarios (Storybook v10)
- Vitest unit tests (included in 271 total at v1.0.0)
- Bilingual user manual: `user-manuals/TagSelection.md` (EN) + `user-manuals/TagSelection.de.md` (DE)

#### PasswordStrengthMeter

Password input with animated strength bar, requirements checklist, and full form library integration.

**Core features**
- Live strength scoring (5 levels: empty/weak/ok/good/very good) on every keystroke
- Animated strength bar with configurable colors per level (`meterColors`)
- Requirements checklist with 5 criteria: minimum length, uppercase, lowercase, digits, special characters
- Visibility toggle button (show/hide password)
- Controlled and uncontrolled modes

**Props**
- `value` — controlled mode (external state)
- `passwordMinLength` (default: `8`) — minimum length threshold; passwords below always score `weak`
- `showMeter`, `showSummary`, `showPasswordAdornment` — show/hide individual UI sections independently
- `inputSize` — `"small"` or `"medium"` (MUI standard)

**Form integration**
- `name` — for native `<form>` submission and React Hook Form `register()`
- `inputRef` — ref to the native `<input>` for React Hook Form / Formik
- `disabled`, `error`, `helperText`, `autoComplete` — consistent with MUI `TextField`

**Color customization**
- `meterColors: Partial<MeterColors>` — bar colors for `weak`, `ok`, `good`, `veryGood`
- `checkColors: CheckColors` — icon colors for `failure` (unmet) and `success` (met) requirements
- `DEFAULT_METER_COLORS`, `DEFAULT_CHECK_COLORS` exported for reference

**Callback**
- `onPasswordChange(password: string, result: StrengthResult)` — fires on every keystroke

**`StrengthResult`** (returned in `onPasswordChange`)
- `score: 0|1|2|3|4`, `percent: 0|25|50|75|100`, `meterStatus: "weak"|"ok"|"good"|"very good"`
- `length`, `hasLower`, `hasUpper`, `hasDigit`, `hasSymbol`

**Scoring algorithm** (client-side, deterministic, no external services)
- Base: minimum length met +1, extra length bonus +1
- Character variety: 2 classes +1, 3 classes +1
- Penalties: repeated chars −2, known weak patterns (`1234`, `password`, …) −2
- Score clamped to 0–4

**TypeScript exports**
- Types: `PasswordStrengthMeterProps`, `PasswordStrengthMeterTranslation`, `StrengthResult`, `StrengthScore`, `MeterStatus`, `MeterColors`, `CheckColors`
- `DEFAULT_PASSWORD_TRANSLATIONS`, `DEFAULT_METER_COLORS`, `DEFAULT_CHECK_COLORS`

**Stable `data-testid` attributes**: `psm-input`, `psm-toggle`, `psm-meter`, `psm-summary`, `psm-req-success`, `psm-req-failure`

**i18n** (10 keys): `label`, `summaryHeaderLabel`, `summaryMinChars` (with `{n}` placeholder for `passwordMinLength`), `summaryCapitalLetter`, `summaryLowerCaseLetter`, `summaryNumber`, `summarySpecialChar`, `showPasswordLabel`, `hidePasswordLabel`, `meterAriaLabel`

**Storybook & tests**
- Storybook stories covering all major scenarios (Storybook v10)
- Vitest unit tests (included in 271 total at v1.0.0)
- Bilingual user manual: `user-manuals/PasswordStrengthMeter.md` (EN) + `user-manuals/PasswordStrengthMeter.de.md` (DE)

#### RichTextEditor

Full-featured WYSIWYG editor built on TipTap v3 and ProseMirror, zero external CSS dependencies.

**Toolbar** (all buttons individually toggleable via `toolbarConfig`)
- Text formatting: Bold, Italic, Underline, Strikethrough
- Headings: H1, H2, H3
- Lists: Bullet List, Ordered List
- Blocks: Blockquote, Code Block, Horizontal Rule
- Link: insert/edit dialog with URL field and Remove button
- Text Color + Highlight: color palette with 10 presets, rainbow swatch opens native browser color picker, trash removes color
- History: Undo, Redo, Clear Format

**Props**
- `value` / `onChange` — controlled mode; external sync without cursor jump
- `placeholder` — placeholder text when editor is empty
- `outputFormat` — `"html"` (default) or `"json"` (TipTap/ProseMirror document format)
- `showCharacterCount` — character counter at bottom right
- `maxCharacters` — hard limit; input is blocked when reached, counter turns red
- `height` / `width` — numeric → px, CSS strings, `"auto"` fills surrounding flex container
- `readonly` — no toolbar, non-editable
- `disabled` — toolbar disabled, editor grayed out
- `name` — hidden `<input type="hidden">` for native `<form>` submission
- `error` + `helperText` — consistent with MUI `TextField`
- `onBlur` / `onFocus` callbacks

**Markdown paste**
- Pasted Markdown (from `.md` files, GitHub READMEs, Markdown editors) is auto-converted to rich text via `tiptap-markdown` — headings, lists, bold, italic, blockquotes, code, links

**TypeScript exports**
- Types: `RichTextEditorProps`, `RichTextEditorOutputFormat`, `RichTextEditorToolbarConfig`, `RichTextEditorTranslation`
- `DEFAULT_RICH_TEXT_EDITOR_TRANSLATION`, `DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG`

**i18n** (26 keys): toolbar tooltips for all 18 buttons, link dialog labels (title/URL/Save/Cancel/Remove), character counter format strings (`{count}`, `{count}/{max}`)

**Storybook & tests**
- Storybook stories covering all major scenarios (Storybook v10)
- Vitest unit tests (included in 271 total at v1.0.0)
- Bilingual user manual: `user-manuals/RichTextEditor.md` (EN) + `user-manuals/RichTextEditor.de.md` (DE)

#### General
- Dual ESM + CJS output (`dist/index.js` / `dist/index.cjs`)
- Full TypeScript declarations (`.d.ts`) for all components and types
- Tree-shakeable (`sideEffects: false`)
- Peer dependencies: React 19, MUI 9, Emotion
- Storybook v10 stories for all components — multiple scenarios per component
- 271 unit tests with Vitest and Testing Library
- Bilingual documentation: English (`*.md`) and German (`*.de.md`)
