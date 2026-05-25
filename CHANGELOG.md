# Changelog

> [Deutsche Version →](CHANGELOG.de.md)

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

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
- Multi-tag selector with autocomplete search
- Optional tag creation mode (`allowCreate`) with Enter key shortcut
- Configurable chip size and maximum visible chips
- Alphabetical sorting of selected chips and dropdown options
- `onTagCreate` callback for persisting newly created tags
- Full i18n support via `translation` prop
- Dark mode support via MUI theme

#### PasswordStrengthMeter
- Password input with live strength rating (0–4 levels)
- Configurable strength requirements checklist
- Toggle visibility button
- Strength label customization via `translation` prop
- Dark mode support via MUI theme

#### RichTextEditor
- WYSIWYG editor based on TipTap v3 and ProseMirror
- Toolbar: Bold, Italic, Underline, Strikethrough, Headings (H1–H3), Bullet List, Ordered List, Blockquote, Code Block, Link, Horizontal Rule, Text Color, Highlight, Undo/Redo, Clear Format
- Configurable toolbar via `toolbarConfig` prop (show/hide individual buttons)
- Text color and highlight with color palette and native browser color picker
- Link insert/edit dialog
- Character count display with optional hard limit (`maxCharacters`)
- Controlled mode via `value` / `onChange`
- Output format: `"html"` (default) or `"json"`
- Markdown-to-rich-text conversion on paste
- `readonly` mode (no toolbar) and `disabled` mode
- Native form integration via hidden `<input type="hidden">`
- `error` state and `helperText` — consistent with MUI TextField
- `onBlur` / `onFocus` callbacks
- Configurable `height` and `width` (number → px, CSS strings, `"auto"` for flex containers)
- Full i18n support via `translation` prop
- Dark mode support via MUI theme

#### General
- Dual ESM + CJS output (`dist/index.js` / `dist/index.cjs`)
- Full TypeScript declarations (`.d.ts`) for all components and types
- Tree-shakeable (`sideEffects: false`)
- Peer dependencies: React 19, MUI 9, Emotion
- Storybook 10 stories for all components
- 271 unit tests with Vitest and Testing Library
- Bilingual documentation: English (`*.md`) and German (`*.de.md`)
