# mui-ts-library

> [Deutsche Version →](README.de.md)

A type-safe React component library built on **TypeScript** and **MUI (Material UI v9)**. Components follow MUI's design language, support dark mode and theming out of the box, and ship with complete TypeScript types, Storybook stories, and unit tests.

---

## Components

| Component | Description | Docs |
|---|---|---|
| [`ConfirmDialog`](#confirmdialog) | Declarative async confirmation dialog — `await confirm({ title, severity })` from anywhere in the app | [Full Manual →](user-manuals/ConfirmDialog.md) |
| [`GanttChart`](#ganttchart) | Project timeline with hierarchical tasks, milestones, drag & drop, zoom, and built-in CRUD dialogs | [Full Manual →](user-manuals/GanttChart.md) |
| [`TagSelection`](#tagselection) | Multi-tag selector with autocomplete, free tag creation, overflow chips, and MUI theme colors | [Full Manual →](user-manuals/TagSelection.md) |
| [`PasswordStrengthMeter`](#passwordstrengthmeter) | Password input with animated strength meter and requirements checklist | [Full Manual →](user-manuals/PasswordStrengthMeter.md) |
| [`RichTextEditor`](#richtexteditor) | WYSIWYG editor (TipTap v3) with toolbar, link dialog, text color, highlight, and Markdown paste | [Full Manual →](user-manuals/RichTextEditor.md) |
| [`SqlEditor`](#sqleditor) | SQL code editor (CodeMirror 6) with syntax highlighting, multi-dialect, autocomplete, and linting | [Full Manual →](user-manuals/SqlEditor.md) |
| [`JsonEditor`](#jsoneditor) | JSON code editor (CodeMirror 6) with real-time validation, Format, and Compact buttons | [Full Manual →](user-manuals/JsonEditor.md) |

---

## Installation

### Step 1 — Get the package file

Clone this repository and run:

```bash
npm install
npm run pack-release
```

This builds the library and places a ready-to-use package file in the `releases/` folder:

```
releases/thebuoyant-tsdev-mui-ts-library-1.3.0.tgz
```

Share this file with your team via Slack, email, or a network drive.

### Step 2 — Install in your project

Open a terminal in **your own React project** and run:

```bash
npm install /path/to/thebuoyant-tsdev-mui-ts-library-1.3.0.tgz
```

**Examples:**

```bash
# File is in your Downloads folder
npm install ~/Downloads/thebuoyant-tsdev-mui-ts-library-1.3.0.tgz

# File is next to your project folder
npm install ../thebuoyant-tsdev-mui-ts-library-1.3.0.tgz
```

### Step 3 — Install peer dependencies

If your project doesn't have MUI set up yet:

```bash
npm install react@^19 react-dom@^19 @mui/material@^9 @emotion/react @emotion/styled @mui/icons-material@^9
```

### Step 4 — Done

Import any component and TypeScript types are included automatically:

```tsx
import { GanttChart, JsonEditor, useConfirm } from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Quick Start

Wrap your app in MUI's `ThemeProvider` as usual. `ConfirmDialog` additionally requires a `ConfirmDialogProvider` near the app root — all other components work without a provider.

### ConfirmDialog

```tsx
import { ConfirmDialogProvider, useConfirm } from '@thebuoyant-tsdev/mui-ts-library';

// App root — once
<ConfirmDialogProvider>
  <App />
</ConfirmDialogProvider>

// Anywhere inside
const confirm = useConfirm();
const ok = await confirm({ title: 'Delete entry?', severity: 'error', confirmLabel: 'Delete' });
if (ok) handleDelete();
```

→ [Full documentation](user-manuals/ConfirmDialog.md)

---

### GanttChart

```tsx
import { GanttChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { GanttTask } from '@thebuoyant-tsdev/mui-ts-library';

const tasks: GanttTask[] = [
  { id: '1', name: 'Phase 1', status: 'in-progress', startDate: new Date('2026-01-01'), endDate: new Date('2026-03-31') },
  { id: '2', name: 'Go-Live', status: 'planned', startDate: new Date('2026-03-31'), endDate: new Date('2026-03-31'), isMilestone: true },
];

<GanttChart tasks={tasks} timeScale="months" height={500} draggable resizable onTasksChange={save} />
```

→ [Full documentation](user-manuals/GanttChart.md)

---

### TagSelection

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

```tsx
import { PasswordStrengthMeter } from '@thebuoyant-tsdev/mui-ts-library';

<PasswordStrengthMeter
  passwordMinLength={10}
  onPasswordChange={(password, result) => console.log(result.score)}
/>
```

→ [Full documentation](user-manuals/PasswordStrengthMeter.md)

---

### RichTextEditor

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

```tsx
import { SqlEditor } from '@thebuoyant-tsdev/mui-ts-library';

<SqlEditor
  placeholder="Enter SQL query…"
  dialect="postgresql"
  onChange={(sql) => console.log(sql)}
/>
```

→ [Full documentation](user-manuals/SqlEditor.md)

---

### JsonEditor

```tsx
import { JsonEditor } from '@thebuoyant-tsdev/mui-ts-library';

<JsonEditor
  placeholder="Enter JSON…"
  showValidation
  onChange={(json) => console.log(json)}
/>
```

→ [Full documentation](user-manuals/JsonEditor.md)

---

## TypeScript

All types and defaults are exported directly — no separate `@types/...` package needed.

```tsx
import type {
  GanttTask,
  ConfirmDialogOptions,
  JsonEditorHighlightColors,
  SqlEditorProps,
  RichTextEditorTranslation,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Development

For local setup, Storybook, tests, and publishing instructions, see [DEVELOPMENT.md](DEVELOPMENT.md).

---

## License

MIT © Thomas Schlender
