# mui-ts-library

> [Deutsche Version →](README.de.md)

A type-safe React component library built on **TypeScript** and **MUI (Material UI v9)**. The components are designed as self-contained additions to MUI — they follow MUI's design language, support theming out of the box, and ship with complete TypeScript types, Storybook stories, and unit tests.

---

## Table of Contents

- [Components](#components)
- [Documentation](#documentation)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [GanttChart](#ganttchart)
  - [TagSelection](#tagselection)
  - [PasswordStrengthMeter](#passwordstrengthmeter)
  - [RichTextEditor](#richtexteditor)
- [Development](#development)
- [Publishing to npm](#publishing-to-npm)
- [License](#license)

---

## Components

| Component | Description |
|---|---|
| `GanttChart` | Full project timeline with hierarchical tasks, milestones, dependency arrows, drag & drop, cascading dependencies, progress tracking, zoom, split pane, built-in CRUD dialogs, and a configurable toolbar |
| `TagSelection` | Multi-tag selector with search autocomplete, alphabetically sorted chip display and dropdown list, overflow limit (`maxVisibleChips`), free tag creation (`allowCreate`) via click or Enter, MUI theme and custom colors, tag limit, and a complete callback API |
| `PasswordStrengthMeter` | Password input with live strength rating, animated meter, and requirements checklist |
| `RichTextEditor` | WYSIWYG editor based on TipTap v3 with MUI toolbar, text color, highlight, link dialog, automatic Markdown paste conversion, character counter, character limit, configurable height/width, readonly/disabled mode, and full form integration |

---

## Documentation

Full prop references, usage examples, and i18n guides for each component are located in the [`user-manuals/`](user-manuals/) folder:

| Component | User Manual |
|---|---|
| `GanttChart` | [user-manuals/GanttChart.md](user-manuals/GanttChart.md) |
| `TagSelection` | [user-manuals/TagSelection.md](user-manuals/TagSelection.md) |
| `PasswordStrengthMeter` | [user-manuals/PasswordStrengthMeter.md](user-manuals/PasswordStrengthMeter.md) |
| `RichTextEditor` | [user-manuals/RichTextEditor.md](user-manuals/RichTextEditor.md) |

---

## Prerequisites

The following packages are treated as **peer dependencies** and must be installed in the target project:

```
react >= 19
react-dom >= 19
@mui/material >= 9
@emotion/react >= 11
@emotion/styled >= 11
@mui/icons-material >= 9
```

---

## Installation

```bash
# npm
npm install @thebuoyant/mui-ts-library

# yarn
yarn add @thebuoyant/mui-ts-library

# pnpm
pnpm add @thebuoyant/mui-ts-library
```

> **Note:** All peer dependencies must be installed. If MUI is not yet set up, follow the [MUI installation guide](https://mui.com/material-ui/getting-started/installation/).

---

## Usage

Wrap your app in MUI's `ThemeProvider` as usual. No additional provider is required for this library.

---

### GanttChart

A full project timeline component built on MUI. Key features:

- **Hierarchical tasks** via `parentId` — unlimited nesting depth, expand/collapse per node or globally
- **Milestones** rendered as diamonds (`isMilestone: true`)
- **Progress bars** — semi-transparent overlay for 0–100 % completion (`progress`)
- **Progress drag** — drag the progress handle directly on the bar (`progressDraggable`)
- **Dependency arrows** — Z-shaped SVG arrows for finish-to-start relationships
- **Cascading dependencies** — successor tasks are automatically shifted when a predecessor is moved
- **4 time scales** — Days, Weeks, Months, Quarters with instant switching
- **Zoom** — Ctrl + mouse wheel cycles through scales (`zoomable`)
- **Drag & Drop** — move bars horizontally (`draggable`) or resize end dates by dragging (`resizable`)
- **Inline editing** — double-click a task name to edit it directly in the panel (`inlineEdit`)
- **Today line** — dashed vertical marker at the current date; "Scroll to today" button
- **Weekend highlight** — shaded columns on the days scale
- **Split pane** — drag the divider to resize the task panel (bounded by `minPanelWidth` / `maxPanelWidth`)
- **Built-in CRUD dialogs** — Add / Edit / Delete with validation and parent task selection
- **Configurable toolbar** — each toolbar element can be individually shown/hidden via `toolbarConfig`
- **Reset view** — restore scale, date range, and expand/collapse state with one click
- **Row virtualization** — render only visible rows; recommended for 200+ tasks (`virtualizeRows`)
- **Individual task color** — `color` on `GanttTask` overrides the status color for a single task
- **Theming** — bar colors, milestone color, today line, weekend color, corner radius via `ganttTheme`
- **Full i18n** — override every UI text via the `translations` prop (German defaults)

```tsx
import { GanttChart } from '@thebuoyant/mui-ts-library';
import type { GanttTask } from '@thebuoyant/mui-ts-library';

const tasks: GanttTask[] = [
  {
    id: 'project',
    name: 'My Project',
    status: 'in-progress',
    startDate: new Date('2026-03-01'),
    endDate: new Date('2026-06-30'),
  },
  {
    id: 'phase-1',
    parentId: 'project',
    name: 'Phase 1 — Backend',
    status: 'done',
    startDate: new Date('2026-03-01'),
    endDate: new Date('2026-04-30'),
    progress: 100,
  },
  {
    id: 'phase-2',
    parentId: 'project',
    name: 'Phase 2 — Frontend',
    status: 'in-progress',
    startDate: new Date('2026-05-01'),
    endDate: new Date('2026-06-30'),
    progress: 40,
    dependencies: ['phase-1'],
  },
  {
    id: 'go-live',
    parentId: 'project',
    name: 'Go-Live',
    status: 'planned',
    startDate: new Date('2026-06-30'),
    endDate: new Date('2026-06-30'),
    isMilestone: true,
    dependencies: ['phase-2'],
  },
];

function App() {
  return (
    <GanttChart
      tasks={tasks}
      timeScale="months"
      height={500}
      draggable
      resizable
      cascadeDependencies
      onTaskCreated={(task) => console.log('Created:', task)}
      onTaskUpdated={(task) => console.log('Updated:', task)}
      onTaskDeleted={(id) => console.log('Deleted:', id)}
      onTasksChange={(all) => console.log('All tasks:', all)}
      onTaskMoved={(task, newStart, newEnd) => console.log('Moved:', task.name, newStart, newEnd)}
      onTaskResized={(task, newEnd) => console.log('Resized:', task.name, newEnd)}
    />
  );
}
```

**With external CRUD control (`enableBuiltinDialogs={false}`):**

```tsx
<GanttChart
  tasks={tasks}
  enableBuiltinDialogs={false}
  onAddTask={(parentTask) => openMyDialog({ parentId: parentTask?.id })}
  onEditTask={(task) => openMyDialog(task)}
  onDeleteTask={(task) => confirmAndDelete(task.id)}
  onTaskClick={(task) => console.log('Clicked:', task.name)}
  onMilestoneClick={(task) => console.log('Milestone:', task.name)}
/>
```

**With inline editing, progress drag, and row virtualization:**

```tsx
<GanttChart
  tasks={tasks}
  inlineEdit
  progressDraggable
  virtualizeRows
  onTasksChange={(all) => console.log('All tasks:', all)}
/>
```

**With custom theming:**

```tsx
import type { GanttTheme } from '@thebuoyant/mui-ts-library';

const theme: GanttTheme = {
  statusColors: {
    planned:     '#90caf9',
    'in-progress': '#ffe082',
    done:        '#a5d6a7',
    blocked:     '#ef9a9a',
  },
  barBorderRadius: 8,
  todayLineColor: '#e91e63',
};

<GanttChart tasks={tasks} ganttTheme={theme} />
```

**With custom toolbar configuration:**

```tsx
import type { GanttToolbarConfig } from '@thebuoyant/mui-ts-library';

const toolbarConfig: GanttToolbarConfig = {
  showScaleDays: false,      // Hide "Days" button
  showScaleQuarters: false,  // Hide "Quarters" button
  showDateRange: false,      // Hide date range picker
};

<GanttChart
  tasks={tasks}
  toolbarConfig={toolbarConfig}
/>
```

**With custom date range and English translations:**

```tsx
import type { GanttTranslations } from '@thebuoyant/mui-ts-library';

const EN: Partial<GanttTranslations> = {
  scaleDays: 'Days', scaleWeeks: 'Weeks', scaleMonths: 'Months', scaleQuarters: 'Quarters',
  rangeFrom: 'From', rangeTo: 'To', rangeResetTooltip: 'Reset range',
  scrollToTodayTooltip: 'Scroll to today', expandAllTooltip: 'Expand all',
  collapseAllTooltip: 'Collapse all', resetViewTooltip: 'Reset view',
  weekColumnPrefix: 'W', dateLocale: 'en-US',
  columnName: 'Name', columnStatus: 'Status', columnActions: 'Actions',
  addTaskTooltip: 'Add task', editTaskTooltip: 'Edit task', deleteTaskTooltip: 'Delete task',
  dialogAddTitle: 'Add Task', dialogEditTitle: 'Edit Task', dialogDeleteTitle: 'Delete Task',
  dialogSave: 'Save', dialogCancel: 'Cancel', dialogDelete: 'Delete',
  dialogFieldName: 'Name', dialogFieldStartDate: 'Start date', dialogFieldEndDate: 'End date',
  dialogFieldStatus: 'Status', dialogFieldMilestone: 'Is milestone',
  dialogFieldParent: 'Parent task', dialogFieldParentNone: '— None —',
  dialogDeleteConfirm: 'Delete task "{name}"?',
  dialogFieldDependencies: 'Predecessors', dialogFieldDependenciesNone: '— None —',
  statusPlanned: 'Planned', statusInProgress: 'In Progress', statusDone: 'Done', statusBlocked: 'Blocked',
};

<GanttChart
  tasks={tasks}
  timeScale="quarters"
  defaultRangeStart={new Date('2026-01-01')}
  defaultRangeEnd={new Date('2026-12-31')}
  translations={EN}
  height="auto"
  width="auto"
/>
```

---

### TagSelection

```tsx
import { TagSelection } from '@thebuoyant/mui-ts-library';
import type { TagSelectionItem } from '@thebuoyant/mui-ts-library';

const tags: TagSelectionItem[] = [
  { id: 'react',      label: 'React',      selected: true  },
  { id: 'typescript', label: 'TypeScript'                  },
  { id: 'legacy',     label: 'Legacy',     disabled: true  },
];

function App() {
  return (
    <TagSelection
      tags={tags}
      onTagSelect={(tag, selectedTags) => console.log('Selected:', tag.label)}
      onTagDelete={(tag, selectedTags) => console.log('Removed:', tag.label)}
      onTagsChange={(selectedTags) => console.log('Selection:', selectedTags)}
    />
  );
}
```

**With custom colors:**

Each tag supports either an MUI theme color (`color`) or fully custom colors
(`backgroundColor` + `foregroundColor`). Both variants can be mixed:

```tsx
const tags: TagSelectionItem[] = [
  // MUI theme color
  { id: 'react',    label: 'React',    selected: true, color: 'primary'  },
  { id: 'success',  label: 'Done',     selected: true, color: 'success'  },

  // Custom hex colors — foregroundColor should contrast with backgroundColor
  { id: 'brand',    label: 'Branding', selected: true, foregroundColor: '#ffffff', backgroundColor: '#6200ea' },
  { id: 'warning',  label: 'Caution',  selected: true, foregroundColor: '#1a1a1a', backgroundColor: '#ffea00' },
];
```

**With loading state (async tag fetching):**

```tsx
const [tags, setTags] = useState<TagSelectionItem[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchTags().then((result) => {
    setTags(result);
    setLoading(false);
  });
}, []);

<TagSelection tags={tags} loading={loading} />
```

**With tag limit:**

```tsx
{/* Maximum 3 tags — autocomplete locks automatically once limit is reached */}
<TagSelection tags={tags} maxTags={3} />
```

**With overflow limit:**

```tsx
{/* Shows up to 3 chips — additional ones are hidden behind a "+N" chip */}
<TagSelection
  tags={tags}
  maxVisibleChips={3}
  popoverPlacement="bottom"
  listboxMaxHeight={250}
/>
```

**With creatable tags:**

When `allowCreate={true}` is set, a CheckIcon (confirm) and CloseIcon (cancel) appear in the
input once the search term does not match any existing tag. Below the input, 7 theme color chips
are shown for color selection. Confirm by clicking the CheckIcon **or pressing Enter**.

The new tag is internally marked as **selected immediately**. `onTagCreate` is called so the
external state can be synchronized — set `selected: true` to prevent the tag from disappearing
on the next re-render:

```tsx
const [tags, setTags] = useState<TagSelectionItem[]>(initialTags);

<TagSelection
  tags={tags}
  allowCreate={true}
  onTagCreate={(label, color) => {
    setTags((prev) => [
      ...prev,
      {
        id: label.toLowerCase().replace(/\s+/g, '-'),
        label,
        color,         // chosen by the user in the color picker
        selected: true // required: tag disappears on next re-render without this
      },
    ]);
  }}
/>
```

To assign custom hex colors, ignore the `color` argument and set `backgroundColor` and
`foregroundColor` directly in the `onTagCreate` handler:

```tsx
onTagCreate={(label, color) => {
  const myBackgroundColor = computeColorForLabel(label); // custom logic
  setTags((prev) => [
    ...prev,
    {
      id: label.toLowerCase().replace(/\s+/g, '-'),
      label,
      selected: true,
      foregroundColor: '#ffffff',
      backgroundColor: myBackgroundColor,
    },
  ]);
}}
```

---

### PasswordStrengthMeter

```tsx
import { PasswordStrengthMeter } from '@thebuoyant/mui-ts-library';
import type { StrengthResult } from '@thebuoyant/mui-ts-library';

function App() {
  return (
    <PasswordStrengthMeter
      passwordMinLength={10}
      onPasswordChange={(password, result: StrengthResult) => {
        console.log(`Score: ${result.score}/4 — ${result.meterStatus}`);
      }}
    />
  );
}
```

**Minimal variant (input only, no meter or summary):**

```tsx
<PasswordStrengthMeter
  showMeter={false}
  showSummary={false}
  inputSize="small"
/>
```

**With custom translations and meter colors:**

```tsx
import type { PasswordStrengthMeterTranslation, MeterColors } from '@thebuoyant/mui-ts-library';

const DE: Partial<PasswordStrengthMeterTranslation> = {
  label: 'Passwort',
  summaryHeaderLabel: 'Anforderungen',
  summaryMinChars: 'Mindestens {n} Zeichen',
  summaryCapitalLetter: 'Mindestens 1 Großbuchstabe',
  summaryLowerCaseLetter: 'Mindestens 1 Kleinbuchstabe',
  summaryNumber: 'Mindestens 1 Zahl',
  summarySpecialChar: 'Mindestens 1 Sonderzeichen',
  showPasswordLabel: 'Passwort anzeigen',
  hidePasswordLabel: 'Passwort verbergen',
};

const colors: Partial<MeterColors> = {
  weak: '#d32f2f',
  ok: '#f57c00',
  good: '#388e3c',
  veryGood: '#1b5e20',
};

<PasswordStrengthMeter
  passwordMinLength={10}
  translation={DE}
  meterColors={colors}
  onPasswordChange={(password, result) => console.log(result.score)}
/>
```

**With React Hook Form:**

```tsx
import { useForm } from 'react-hook-form';
import { PasswordStrengthMeter } from '@thebuoyant/mui-ts-library';

function SignUpForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<{ password: string }>();
  const { ref, ...rest } = register('password', { required: 'Password is required' });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <PasswordStrengthMeter
        {...rest}
        inputRef={ref}
        autoComplete="new-password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
    </form>
  );
}
```

---

### RichTextEditor

```tsx
import { RichTextEditor } from '@thebuoyant/mui-ts-library';

function App() {
  return (
    <RichTextEditor
      placeholder="Start typing…"
      showCharacterCount
      onChange={(html) => console.log(html)}
      onBlur={() => console.log('blur')}
    />
  );
}
```

**Controlled mode:**

```tsx
const [content, setContent] = useState('<p>Initial content</p>');

<RichTextEditor value={content} onChange={setContent} />
```

**Minimal toolbar (Bold, Italic, Underline only):**

```tsx
<RichTextEditor
  toolbarConfig={{
    showBold: true, showItalic: true, showUnderline: true,
    showStrike: false, showHeading1: false, showHeading2: false,
    showHeading3: false, showBulletList: false, showOrderedList: false,
    showBlockquote: false, showCodeBlock: false, showLink: false,
    showHorizontalRule: false, showUndoRedo: false, showClearFormat: false,
  }}
/>
```

**With character limit and error state:**

```tsx
<RichTextEditor
  maxCharacters={500}
  error={true}
  helperText="This field is required."
/>
```

**Height and width:**

```tsx
{/* Fixed height — content scrolls vertically */}
<RichTextEditor height={400} />

{/* Editor fills the surrounding flex container */}
<Box sx={{ height: 500, display: "flex", flexDirection: "column" }}>
  <RichTextEditor height="auto" />
</Box>

{/* Fixed width */}
<RichTextEditor height={300} width={600} />
```

**JSON output instead of HTML:**

```tsx
{/* Returns content as a TipTap JSON document instead of an HTML string */}
<RichTextEditor outputFormat="json" onChange={(json) => console.log(json)} />
```

**With custom toolbar translations:**

```tsx
import type { RichTextEditorTranslation } from '@thebuoyant/mui-ts-library';

const DE: Partial<RichTextEditorTranslation> = {
  bold: 'Fett', italic: 'Kursiv', underline: 'Unterstrichen',
  heading1: 'Überschrift 1', heading2: 'Überschrift 2', heading3: 'Überschrift 3',
  bulletList: 'Aufzählung', orderedList: 'Nummerierte Liste',
  link: 'Link einfügen', linkDialogTitle: 'Link einfügen',
  linkDialogUrlLabel: 'URL', linkDialogSave: 'Speichern',
  linkDialogCancel: 'Abbrechen', linkDialogRemove: 'Link entfernen',
  undo: 'Rückgängig', redo: 'Wiederholen', clearFormat: 'Formatierung entfernen',
};

<RichTextEditor translation={DE} />
```

**Markdown paste:**

When pasting (`Ctrl+V`) Markdown text from `.md` files or Markdown editors, the syntax is
automatically converted to rich text — `**bold**` becomes bold, `## Heading` becomes a heading, etc.

**With React Hook Form:**

```tsx
import { Controller } from 'react-hook-form';

<Controller
  name="description"
  control={control}
  render={({ field, fieldState }) => (
    <RichTextEditor
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  )}
/>
```

---

## Development

### Local Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd mui-ts-library

# 2. Install dependencies
npm install

# 3. Start the Vite dev server
npm run dev
```

### Storybook

Every component includes Storybook stories covering all major use cases.

```bash
# Start the Storybook dev server (http://localhost:6006)
npm run storybook

# Build a static Storybook for deployment
npm run build-storybook
```

### Tests

Tests are written with [Vitest](https://vitest.dev/) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/).

```bash
# Run tests in watch mode
npm run test

# Run tests once (CI)
npm run test:run
```

### Coverage

```bash
npm run test:coverage
```

Coverage reports are generated in `./coverage/`. Open `coverage/index.html` in a browser for the full report. The coverage configuration includes all component source files (`src/components/**/*.{ts,tsx}`) and excludes stories and pure type files.

---

## Publishing to npm

### Deploy Script

All steps are combined into a single command:

```bash
npm run npm-deploy
```

The script runs automatically through:

1. **User check** — verifies that npm user `tsdev` is logged in; aborts with a `npm login` prompt if not
2. **Git check** — verifies there are no uncommitted changes
3. **Version selection** — interactive: `patch` / `minor` / `major` or no change
4. **Tests → Build → Publish** — runs automatically via `prepublishOnly`
5. **Git push** — commit and tag are pushed to `main`

> npm will prompt for the 2FA code from your authenticator app at the end.

### Versioning (SemVer)

| Change type | Level | Example |
|---|---|---|
| Bug fix, non-breaking improvement | **patch** | `0.1.0` → `0.1.1` |
| New feature, backwards compatible | **minor** | `0.1.0` → `0.2.0` |
| Breaking API change | **major** | `0.1.0` → `1.0.0` |

### Automation with GitHub Actions (optional)

Store an npm automation token under **GitHub → Settings → Secrets → Actions** as `NPM_TOKEN`, then create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'

      - run: npm ci
      - run: npm run test:run
      - run: npm run build
      - run: npm publish --access public --provenance
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Trigger a release: `npm version minor && git push origin main --tags`

---

## License

MIT © Thomas Schlender
