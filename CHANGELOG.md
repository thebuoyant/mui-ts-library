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

## [Unreleased]

_No unreleased changes yet._
