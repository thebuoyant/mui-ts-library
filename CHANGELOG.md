# Changelog

> [Deutsche Version →](CHANGELOG.de.md)

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-05-21

Initial public release of `@thebuoyant-tsdev/mui-ts-library`.

### Added

#### GanttChart
- Hierarchical project timeline with collapsible task groups
- Milestone markers with distinct visual treatment
- Drag-and-drop row reordering via `@dnd-kit`
- Dependency arrows between tasks
- Zoom levels: day, week, month, quarter
- Built-in CRUD dialogs for creating, editing, and deleting tasks
- Today-line indicator with auto-scroll
- Virtualized row rendering for large datasets
- Full i18n support via `translation` prop
- Dark mode support via MUI theme

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
