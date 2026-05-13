# mui-ts-library

A type-safe React component library built with **TypeScript** and **MUI (Material UI v7)**. Components are designed as standalone additions to MUI — they follow MUI's design language, support theming out of the box, and ship with full TypeScript types, Storybook stories, and unit tests.

---

## Table of Contents

- [Components](#components)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [GanttChart](#gantchart)
  - [TagSelection](#tagselection)
  - [PasswordStrengthMeter](#passwordstrengthmeter)
- [Props Reference](#props-reference)
  - [GanttChart Props](#ganttchart-props)
  - [GanttTask](#gantttask)
  - [GanttTranslations](#gannttranslations)
  - [TagSelection Props](#tagselection-props)
  - [TagSelectionItem](#tagselectionitem)
  - [PasswordStrengthMeter Props](#passwordstrengthmeter-props)
- [Customization](#customization)
  - [Translations](#translations)
  - [Colors & Theming](#colors--theming)
- [Development](#development)
- [Publishing to npm](#publishing-to-npm)
- [License](#license)

---

## Components

| Component | Description |
|---|---|
| `GanttChart` | Interactive project timeline with hierarchical tasks, milestones, dependencies, drag-to-scroll, built-in CRUD dialogs, and live today-line |
| `TagSelection` | Multi-tag picker with search autocomplete, chip display, and full callback API |
| `PasswordStrengthMeter` | Password input with live strength scoring, animated meter, and requirements checklist |

---

## Requirements

This library treats the following packages as **peer dependencies**. Your project must have them installed:

```
react >= 19
react-dom >= 19
@mui/material >= 7
@emotion/react >= 11
@emotion/styled >= 11
@mui/icons-material >= 7
zustand >= 5
```

---

## Installation

```bash
# npm
npm install mui-ts-library

# yarn
yarn add mui-ts-library

# pnpm
pnpm add mui-ts-library
```

> **Note:** Make sure all peer dependencies are installed. If you have not set up MUI yet, follow the [MUI installation guide](https://mui.com/material-ui/getting-started/installation/).

---

## Usage

Wrap your app in MUI's `ThemeProvider` as usual. No additional provider is needed for this library.

---

### GanttChart

A full-featured project timeline component with hierarchical tasks, milestones, dependency arrows, progress tracking, and built-in CRUD dialogs.

```tsx
import { GanttChart } from 'mui-ts-library';
import type { GanttTask } from 'mui-ts-library';

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
      onTaskCreated={(task) => console.log('Created:', task)}
      onTaskUpdated={(task) => console.log('Updated:', task)}
      onTaskDeleted={(id) => console.log('Deleted:', id)}
      onTasksChange={(all) => console.log('All tasks:', all)}
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

**With custom date range and English translations:**

```tsx
import type { GanttTranslations } from 'mui-ts-library';

const EN: Partial<GanttTranslations> = {
  scaleDays: 'Days',
  scaleWeeks: 'Weeks',
  scaleMonths: 'Months',
  scaleQuarters: 'Quarters',
  rangeFrom: 'From',
  rangeTo: 'To',
  weekColumnPrefix: 'W',
  dateLocale: 'en-US',
  dialogAddTitle: 'Add Task',
  dialogEditTitle: 'Edit Task',
  statusPlanned: 'Planned',
  statusInProgress: 'In Progress',
  statusDone: 'Done',
  statusBlocked: 'Blocked',
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
import { TagSelection } from 'mui-ts-library';
import type { TagSelectionItem } from 'mui-ts-library';

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

**With custom icons and colors:**

```tsx
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';

const tags: TagSelectionItem[] = [
  {
    id: 'featured',
    label: 'Featured',
    selected: true,
    startIcon: <StarIcon style={{ color: '#fff' }} />,
    deleteIcon: <CloseIcon style={{ color: '#ccc' }} />,
    foregroundColor: '#ffffff',
    backgroundColor: '#1976d2',
  },
];
```

---

### PasswordStrengthMeter

```tsx
import { PasswordStrengthMeter } from 'mui-ts-library';
import type { StrengthResult } from 'mui-ts-library';

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
/>
```

---

## Props Reference

### GanttChart Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tasks` | `GanttTask[]` | — | **Required.** Full flat list of tasks (hierarchy is derived via `parentId`). |
| `timeScale` | `"days" \| "weeks" \| "months" \| "quarters"` | `"months"` | Initial time scale of the timeline. |
| `height` | `number \| string \| "auto"` | `400` | Chart height. `"auto"` fills the parent container. |
| `width` | `number \| string \| "auto"` | `"100%"` | Chart width. `"auto"` fills the parent container. |
| `initialExpandAll` | `boolean` | `false` | Expand all nodes on mount instead of only root tasks. |
| `showToolbar` | `boolean` | `true` | Show/hide the scale switcher and date-range toolbar. |
| `defaultRangeStart` | `Date` | current quarter | Overrides the auto-computed start of the visible range. |
| `defaultRangeEnd` | `Date` | current quarter | Overrides the auto-computed end of the visible range. |
| `translations` | `Partial<GanttTranslations>` | German defaults | Override individual display strings for i18n (see [Translations](#translations)). |
| `minPanelWidth` | `number` | `200` | Minimum width of the left task panel in pixels. |
| `maxPanelWidth` | `number` | `600` | Maximum width of the left task panel in pixels. |
| `enableBuiltinDialogs` | `boolean` | `true` | When `true`, Add/Edit/Delete icons open MUI dialogs and update the internal store. When `false`, callbacks are invoked directly instead. |
| `onTaskClick` | `(task: GanttTask) => void` | — | Called when a task bar is clicked. |
| `onMilestoneClick` | `(task: GanttTask) => void` | — | Called when a milestone diamond is clicked. |
| `onAddTask` | `(parentTask?: GanttTask) => void` | — | Called when the Add icon is clicked (`enableBuiltinDialogs=false` only). |
| `onEditTask` | `(task: GanttTask) => void` | — | Called when the Edit icon is clicked (`enableBuiltinDialogs=false` only). |
| `onDeleteTask` | `(task: GanttTask) => void` | — | Called when the Delete icon is clicked (`enableBuiltinDialogs=false` only). |
| `onStatusChange` | `(task: GanttTask, status: GanttTaskStatus) => void` | — | Called when a task status changes. |
| `onTasksChange` | `(tasks: GanttTask[]) => void` | — | Called after every CRUD operation with the full updated task list. |
| `onTaskCreated` | `(task: GanttTask) => void` | — | Called after a task is created via the built-in dialog (includes generated UUID). |
| `onTaskUpdated` | `(task: GanttTask) => void` | — | Called after a task is updated via the built-in dialog. |
| `onTaskDeleted` | `(taskId: string) => void` | — | Called after a task (and all its descendants) are deleted via the built-in dialog. |

### GanttTask

```ts
type GanttTask = {
  id: string;                   // Unique identifier (also used as React key and for dependencies)
  parentId?: string;            // Omit for root tasks
  name: string;
  status: 'planned' | 'in-progress' | 'done' | 'blocked';
  startDate: Date;
  endDate: Date;
  dependencies?: string[];      // IDs of predecessor tasks (Finish-to-Start arrows)
  isMilestone?: boolean;        // Renders as a diamond; startDate ≈ endDate
  progress?: number;            // 0–100, renders a semi-transparent overlay bar
};
```

### GanttTranslations

All UI strings can be overridden via the `translations` prop. Only pass the keys you want to change — all others fall back to the built-in German defaults.

```ts
type GanttTranslations = {
  // Toolbar — scale buttons
  scaleDays: string;            // Default: "Tage"
  scaleWeeks: string;           // Default: "Wochen"
  scaleMonths: string;          // Default: "Monate"
  scaleQuarters: string;        // Default: "Quartale"
  // Toolbar — date range
  rangeFrom: string;            // Default: "Von"
  rangeTo: string;              // Default: "Bis"
  rangeResetTooltip: string;    // Default: "Bereich zurücksetzen"
  // Panel headers
  columnName: string;           // Default: "Name"
  columnStatus: string;         // Default: "Status"
  // Status chip labels
  statusPlanned: string;        // Default: "Planned"
  statusInProgress: string;     // Default: "In Progress"
  statusDone: string;           // Default: "Done"
  statusBlocked: string;        // Default: "Blocked"
  // Timeline
  weekColumnPrefix: string;     // Default: "KW"  (use "W" for English)
  dateLocale: string;           // Default: "de-DE"
  // Dialog titles and buttons
  dialogAddTitle: string;
  dialogEditTitle: string;
  dialogDeleteTitle: string;
  dialogSave: string;
  dialogCancel: string;
  dialogDelete: string;
  // Dialog form field labels
  dialogFieldName: string;
  dialogFieldStartDate: string;
  dialogFieldEndDate: string;
  dialogFieldStatus: string;
  dialogFieldMilestone: string;
  dialogFieldParent: string;
  dialogFieldParentNone: string;
  // Delete confirmation ({name} is replaced by the task name)
  dialogDeleteConfirm: string;
};
```

---

### TagSelection Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tags` | `TagSelectionItem[]` | — | **Required.** Full list of tags (selected + available + disabled). |
| `showSelectedTags` | `boolean` | `true` | Show the selected-tags chip area. |
| `showSelectedTagsLabel` | `boolean` | `true` | Show the label above the selected chips. |
| `showAutoComplete` | `boolean` | `true` | Show the search autocomplete input. |
| `showStartIcon` | `boolean` | `true` | Globally toggle start icons on all chips. |
| `showDeleteIcon` | `boolean` | `true` | Globally toggle delete icons on all chips. |
| `inputSize` | `"small" \| "medium"` | `"medium"` | Size of the autocomplete input. |
| `chipSize` | `"small" \| "medium"` | `"medium"` | Size of all chips. |
| `translation` | `TagSelectionTranslation` | English defaults | All display texts (see [Translations](#translations)). |
| `onTagSelect` | `(tag, selectedTags, allTags) => void` | — | Called when a tag is selected. |
| `onTagDelete` | `(tag, selectedTags, allTags) => void` | — | Called when a tag is removed. |
| `onTagsChange` | `(selectedTags, allTags) => void` | — | Called after every selection change. |
| `onSearchChange` | `(searchValue: string) => void` | — | Called when the search input changes. |

### TagSelectionItem

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique identifier. |
| `label` | `string` | Yes | Display text of the tag. |
| `selected` | `boolean` | No | Pre-selected on initial render. |
| `disabled` | `boolean` | No | Prevents selection and deletion. |
| `foregroundColor` | `string` | No | Text color of the chip. |
| `backgroundColor` | `string` | No | Background and border color of the chip. |
| `startIcon` | `ReactElement` | No | Icon rendered at the start of the chip. |
| `deleteIcon` | `ReactElement` | No | Replaces MUI's default delete icon. |

---

### PasswordStrengthMeter Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `showPasswordAdornment` | `boolean` | `true` | Show the show/hide password toggle button. |
| `showMeter` | `boolean` | `true` | Show the animated strength meter bar. |
| `showSummary` | `boolean` | `true` | Show the requirements checklist. |
| `inputSize` | `"small" \| "medium"` | `"medium"` | Size of the password input field. |
| `passwordMinLength` | `number` | `8` | Minimum required password length. |
| `translation` | `PasswordStrengthMeterTranslation` | English defaults | All display texts (see [Translations](#translations)). |
| `meterColors` | `MeterColors` | Red → Green gradient | Colors for each of the four strength levels. |
| `checkColors` | `CheckColors` | Red / Green | Colors for the fulfilled/unfulfilled requirement icons. |
| `onPasswordChange` | `(password, result: StrengthResult) => void` | — | Called on every keystroke with the current password and strength result. |

**`StrengthResult` shape:**

```ts
type StrengthResult = {
  score: 0 | 1 | 2 | 3 | 4;
  percent: number;            // 0, 25, 50, 75, or 100
  meterStatus: 'weak' | 'ok' | 'good' | 'very good';
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasDigit: boolean;
  hasSymbol: boolean;
};
```

---

## Customization

### Translations

All three components support full i18n without any external library. Pass only the keys you want to override.

**GanttChart — English:**

```tsx
<GanttChart
  tasks={tasks}
  translations={{
    scaleDays: 'Days',
    scaleWeeks: 'Weeks',
    scaleMonths: 'Months',
    scaleQuarters: 'Quarters',
    rangeFrom: 'From',
    rangeTo: 'To',
    rangeResetTooltip: 'Reset range',
    weekColumnPrefix: 'W',
    dateLocale: 'en-US',
    columnName: 'Name',
    columnStatus: 'Status',
    statusPlanned: 'Planned',
    statusInProgress: 'In Progress',
    statusDone: 'Done',
    statusBlocked: 'Blocked',
    dialogAddTitle: 'Add Task',
    dialogEditTitle: 'Edit Task',
    dialogDeleteTitle: 'Delete Task',
    dialogSave: 'Save',
    dialogCancel: 'Cancel',
    dialogDelete: 'Delete',
    dialogFieldName: 'Name',
    dialogFieldStartDate: 'Start Date',
    dialogFieldEndDate: 'End Date',
    dialogFieldStatus: 'Status',
    dialogFieldMilestone: 'Is Milestone',
    dialogFieldParent: 'Parent Task',
    dialogFieldParentNone: '— None —',
    dialogDeleteConfirm: 'Delete task "{name}"?',
  }}
/>
```

**TagSelection — German:**

```tsx
<TagSelection
  tags={tags}
  translation={{
    selectedTagsLabel:   'Ausgewählte Tags',
    autoCompleteLabel:   'Tags suchen und hinzufügen',
    noSelectedTagsText:  'Keine Tags ausgewählt.',
    noAvailableTagsText: 'Keine Tags verfügbar.',
    placeholder:         'Suchen...',
  }}
/>
```

**PasswordStrengthMeter — German:**

```tsx
<PasswordStrengthMeter
  passwordMinLength={10}
  translation={{
    label:                  'Passwort',
    summaryHeaderLabel:     'Anforderungen an dein Passwort',
    summaryMinCharsLeft:    'Mindestens',
    summaryMinCharsRight:   'Zeichen',
    summaryCapitalLetter:   'Mindestens 1 Großbuchstabe',
    summaryLowerCaseLetter: 'Mindestens 1 Kleinbuchstabe',
    summaryNumber:          'Mindestens 1 Zahl',
    summarySpecialChar:     'Mindestens 1 Sonderzeichen',
  }}
/>
```

### Colors & Theming

All components use MUI's theme system wherever possible (`color="text.secondary"`, `borderColor: "divider"`, etc.) and automatically adapt to light and dark mode. Custom colors can be passed via props where supported:

```tsx
<PasswordStrengthMeter
  meterColors={{
    weak:     '#e53935',
    ok:       '#fb8c00',
    good:     '#43a047',
    veryGood: '#00897b',
  }}
  checkColors={{
    failure: '#e53935',
    success: '#00897b',
  }}
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

# 3. Start the Vite development server
npm run dev
```

### Storybook

Each component ships with Storybook stories covering all major use cases.

```bash
# Start Storybook dev server (http://localhost:6006)
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

Coverage reports are generated in `./coverage/`. Open `coverage/index.html` to view the full report. Coverage is configured to include all component source files (`src/components/**/*.{ts,tsx}`) and excludes stories and type-only files.

---

## Publishing to npm

### 1. Prepare package.json

Before the first publish, update `package.json`:

```json
{
  "name": "@your-org/mui-ts-library",
  "version": "1.0.0",
  "private": false,
  "description": "Type-safe React component library built on MUI",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "sideEffects": false,
  "license": "MIT"
}
```

### 2. Versioning (SemVer)

| Change type | Bump | Example |
|---|---|---|
| Bug fix, non-breaking improvement | **Patch** | `1.0.0` → `1.0.1` |
| New feature, backwards compatible | **Minor** | `1.0.0` → `1.1.0` |
| Breaking API change | **Major** | `1.0.0` → `2.0.0` |

```bash
npm version patch   # or minor / major
```

### 3. Build & Publish

```bash
# Always build before publishing
npm run build

# Inspect what will be uploaded (no actual publish)
npm pack --dry-run

# Publish
npm login
npm publish --access public
```

### 4. Automate with GitHub Actions

Create `.github/workflows/publish.yml`:

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

Add your npm automation token as `NPM_TOKEN` in **GitHub → Settings → Secrets → Actions**, then trigger a publish:

```bash
npm version minor
git push origin main --tags
```

---

## License

MIT © Thomas Schlender
