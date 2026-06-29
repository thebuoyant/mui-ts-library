# GanttChart — User Manual

> [Deutsche Version →](GanttChart.de.md)

**An interactive project timeline with drag & drop, milestones, and dependencies — ready to drop into any React app.** Use `GanttChart` in project management dashboards, sprint planners, or resource views where teams need to see and manage schedules at a glance.

## Overview

The `GanttChart` is a fully interactive project planning component built on React and Material UI. It visualizes tasks as bars on a timeline and supports hierarchical structures, task dependencies, drag & drop, inline editing, and a critical path mode.

**Typical use cases:**

- Project management applications (sprint planning, release roadmaps)
- Resource planning and capacity visualization
- Milestone tracking in agile projects
- Dashboards with a temporal overview of ongoing tasks

---

> ### New in v2.7.0
>
> | Feature | Description | Jump to |
> |---|---|---|
> | **`showAssigneeColumn`** | Adds an Assignee column to the task panel | [→ Props](#props-reference) |
> | **`showExportCSV`** | CSV download button for the current task list | [→ Props](#props-reference) |

---

## Prerequisites

| Dependency | Minimum version |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |
| Zustand | 5 |

---

## Import

```tsx
import { GanttChart } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  GanttTask,
  GanttTaskStatus,
  GanttTimeScale,
  GanttTheme,
  GanttTranslations,
  GanttToolbarConfig,
  GanttStatusColors,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Quick Start

```tsx
import { GanttChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { GanttTask } from '@thebuoyant-tsdev/mui-ts-library';

const tasks: GanttTask[] = [
  {
    id: 'project',
    name: 'Website Relaunch',
    status: 'in-progress',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-06-30'),
  },
  {
    id: 'design',
    parentId: 'project',
    name: 'Design Phase',
    status: 'done',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-02-28'),
  },
  {
    id: 'development',
    parentId: 'project',
    name: 'Development',
    status: 'in-progress',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-05-31'),
    dependencies: ['design'],
  },
];

function App() {
  return (
    <GanttChart
      tasks={tasks}
      timeScale="months"
      height={400}
    />
  );
}
```

---

## Props Reference

### Data structure: `GanttTask`

Each task is passed as a `GanttTask` object. The `tasks` prop expects a flat array — the hierarchy is built internally from `parentId` references.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Unique task identifier. Used as a React key and for dependency references. Must be unique within the `tasks` array. |
| `name` | `string` | **Yes** | Display name of the task in the left panel and in dialogs. |
| `status` | `GanttTaskStatus` | **Yes** | Current status: `"planned"` · `"in-progress"` · `"done"` · `"blocked"`. Controls bar color and status chip. |
| `startDate` | `Date` | **Yes** | Start date of the task. Determines the left edge of the bar. |
| `endDate` | `Date` | **Yes** | End date of the task. Determines the right edge of the bar. |
| `parentId` | `string` | No | ID of the parent task. Omit for root tasks (top level). When set, creates an indented row in the panel and builds the tree. |
| `dependencies` | `string[]` | No | IDs of predecessor tasks. Shown as a multi-select in the edit dialog — any task that already (directly or transitively) depends on the task being edited is excluded from the options, so the built-in dialog cannot create a dependency cycle. When used with `cascadeDependencies`, successors are automatically shifted when a predecessor moves. |
| `isMilestone` | `boolean` | No | When `true`, the task is rendered as a diamond (♦) instead of a bar. Milestones should have `startDate ≈ endDate`. |
| `progress` | `number` | No | Progress in percent (0–100). Rendered as a semi-transparent overlay bar on top of the task bar. Interactive when `progressDraggable={true}`. |
| `color` | `string` | No | Overrides the status-based bar color for this individual task (highest priority). Any CSS color value (e.g. `"#e91e63"` or `"rgb(0,150,136)"`). |
| `assignee` | `string` | No | Person or team responsible for the task — shown in the Assignee column when `showAssigneeColumn={true}`. |

**TypeScript types:**

```ts
type GanttTaskStatus = "planned" | "in-progress" | "done" | "blocked";
type GanttTimeScale  = "days" | "weeks" | "months" | "quarters";

type GanttTask = {
  id:            string;
  name:          string;
  status:        GanttTaskStatus;
  startDate:     Date;
  endDate:       Date;
  parentId?:     string;
  dependencies?: string[];
  isMilestone?:  boolean;
  progress?:     number;
  color?:        string;
  assignee?:     string;
};
```

---

### Component props: `GanttChartProps`

| Prop | Type | Default | Description |
|---|---|---|---|
| `cascadeDependencies` | `boolean` | `false` | When `true`, moving or resizing a task automatically shifts all finish-to-start successors by the same amount. Works transitively. |
| `defaultRangeEnd` | `Date` | auto | Overrides the automatically calculated right boundary of the timeline. |
| `defaultRangeStart` | `Date` | auto | Overrides the automatically calculated left boundary of the timeline. |
| `draggable` | `boolean` | `false` | Allows horizontal dragging of task bars. Updates `startDate` and `endDate` in sync. |
| `enableBuiltinDialogs` | `boolean` | `true` | `true` = built-in MUI dialogs for Add/Edit/Delete. `false` = only callbacks fire. |
| `ganttTheme` | `GanttTheme` | — | Bundled theming object. See [GanttTheme](#gantttheme). |
| `height` | `number \| string` | `400` | Total chart height. `"auto"` adapts to the parent element. |
| `initialExpandAll` | `boolean` | `false` | Starts with all hierarchy levels expanded. |
| `inlineEdit` | `boolean` | `false` | Double-click on a task name to rename inline. |
| `maxPanelWidth` | `number` | `600` | Maximum width of the left task panel in px. |
| `minPanelWidth` | `number` | `200` | Minimum width of the left task panel in px. |
| `progressDraggable` | `boolean` | `false` | Shows a draggable progress handle on the task bar. |
| `resizable` | `boolean` | `false` | Allows changing `endDate` by dragging the right edge of a bar. |
| `showAssigneeColumn` | `boolean` | `false` | Shows an **Assignee** column in the task panel. Populate via `task.assignee`. |
| `showCriticalPath` | `boolean` | `false` | Highlights the critical path — the longest dependency chain. |
| `showToolbar` | `boolean` | `true` | Shows or hides the entire toolbar. |
| `tasks` | `GanttTask[]` | — | **Required.** Flat task array — hierarchy built internally via `parentId`. |
| `timeScale` | `GanttTimeScale` | `"months"` | Initial time scale: `"days"` · `"weeks"` · `"months"` · `"quarters"`. |
| `toolbarConfig` | `GanttToolbarConfig` | — | Fine-grained toolbar control. See [GanttToolbarConfig](#gantttoolbarconfig). |
| `translations` | `Partial<GanttTranslations>` | DE/EN mix | Override any UI text. See [Translations](#translations). |
| `virtualizeRows` | `boolean` | `false` | Virtual list — recommended for 200+ tasks. |
| `width` | `number \| string` | `"100%"` | Total chart width. |
| `zoomable` | `boolean` | `false` | `Ctrl / Cmd ⌘+Scroll` cycles through time scales. |

> **Note on `defaultRangeStart`/`defaultRangeEnd`:** When not set, the chart calculates the range automatically from the earliest and latest task dates and adds a 1-month buffer at both ends.

---

### `GanttToolbarConfig` {#gantttoolbarconfig}

Allows selectively hiding individual toolbar elements. All fields are optional — unset keys remain visible (`true`).

| Field | Type | Default | Controls |
|---|---|---|---|
| `showDateRange` | `boolean` | `true` | From/To date inputs |
| `showExpandCollapseAll` | `boolean` | `true` | Expand all / Collapse all |
| `showExportCSV` | `boolean` | `false` | CSV download button — triggers `onExportCSV` or browser download |
| `showRangeReset` | `boolean` | `true` | Reset button (appears when range was manually adjusted) |
| `showResetView` | `boolean` | `true` | Reset view (scale + range back to defaults) |
| `showScaleDays` | `boolean` | `true` | Days scale button |
| `showScaleMonths` | `boolean` | `true` | Months scale button |
| `showScaleQuarters` | `boolean` | `true` | Quarters scale button |
| `showScaleWeeks` | `boolean` | `true` | Weeks scale button |
| `showScrollToToday` | `boolean` | `true` | "Scroll to today" button |

**TypeScript type:**

```ts
type GanttToolbarConfig = {
  showScaleDays?:         boolean;
  showScaleWeeks?:        boolean;
  showScaleMonths?:       boolean;
  showScaleQuarters?:     boolean;
  showExpandCollapseAll?: boolean;
  showScrollToToday?:     boolean;
  showDateRange?:         boolean;
  showRangeReset?:        boolean;
  showResetView?:         boolean;
};
```

**Example — show only scale buttons:**

```tsx
<GanttChart
  tasks={tasks}
  toolbarConfig={{
    showExpandCollapseAll: false,
    showScrollToToday: false,
    showDateRange: false,
    showRangeReset: false,
    showResetView: false,
  }}
/>
```

---

### `GanttTheme` {#gantttheme}

All fields are optional. Unset keys use the MUI palette defaults.

| Field | Type | Default | Description |
|---|---|---|---|
| `statusColors` | `GanttStatusColors` | MUI palette | Bar colors per status as CSS color values. All four statuses can be set independently. |
| `criticalPathColor` | `string` | `error.main` | Highlight color for tasks on the critical path (only relevant when `showCriticalPath={true}`). |
| `milestoneColor` | `string` | `warning.main` | Color of the milestone diamond. |
| `todayLineColor` | `string` | `primary.main` | Color of the vertical "today" line in the timeline. |
| `weekendColor` | `string` | `action.hover` | Background color of weekend columns (only visible on the days scale). |
| `barBorderRadius` | `number` | `4` | Corner radius of task bars in pixels. `0` = square bars. |

**TypeScript types:**

```ts
type GanttStatusColors = Partial<Record<GanttTaskStatus, string>>;

type GanttTheme = {
  statusColors?:      GanttStatusColors;
  criticalPathColor?: string;
  milestoneColor?:    string;
  todayLineColor?:    string;
  weekendColor?:      string;
  barBorderRadius?:   number;
};
```

**Example:**

```tsx
const ganttTheme: GanttTheme = {
  statusColors: {
    planned:       '#7c3aed',
    'in-progress': '#0ea5e9',
    done:          '#16a34a',
    blocked:       '#dc2626',
  },
  criticalPathColor: '#f59e0b',
  barBorderRadius: 8,
};

<GanttChart tasks={tasks} ganttTheme={ganttTheme} />
```

---

## Callbacks / Events

> **Which callbacks fire for which action?**
>
> | Action | Callbacks fired |
> |---|---|
> | Click task bar (timeline) | `onTaskClick` |
> | Click milestone diamond | `onMilestoneClick` |
> | Status changed via context menu | `onStatusChange` · `onTasksChange` |
> | Task created via built-in dialog (`enableBuiltinDialogs={true}`) | `onTaskCreated` · `onTasksChange` |
> | Task edited via built-in dialog (`enableBuiltinDialogs={true}`) | `onTaskUpdated` · `onTasksChange` |
> | Task deleted via built-in dialog (`enableBuiltinDialogs={true}`) | `onTaskDeleted` · `onTasksChange` |
> | Add icon clicked (`enableBuiltinDialogs={false}`) | `onAddTask` |
> | Edit icon clicked (`enableBuiltinDialogs={false}`) | `onEditTask` |
> | Delete icon clicked (`enableBuiltinDialogs={false}`) | `onDeleteTask` |
> | Task bar dragged (`draggable={true}`) | `onTaskMoved` · `onTasksChange` |
> | Task bar right edge resized (`resizable={true}`) | `onTaskResized` · `onTasksChange` |
> | CSV export button clicked | `onExportCSV` (or browser download if not provided) |
>
> **Recommendation:** Use `onTasksChange` for simple data persistence. Add `onTaskCreated`/`onTaskUpdated`/`onTaskDeleted` only when your backend needs separate API calls per action type.

| Callback | Signature | When it fires | Use it when... |
|---|---|---|---|
| `onTasksChange` | `(tasks: GanttTask[]) => void` | After every CRUD action with the full current task list | Simple state sync — this is all most apps need |
| `onTaskClick` | `(task: GanttTask) => void` | Click on a task bar in the timeline | Opening a detail panel or custom dialog |
| `onMilestoneClick` | `(task: GanttTask) => void` | Click on a milestone diamond | Reacting to milestone interactions specifically |
| `onStatusChange` | `(task: GanttTask, status: GanttTaskStatus) => void` | New status selected via the right-click context menu on a bar | Syncing status changes to a backend immediately |
| `onTaskCreated` | `(task: GanttTask) => void` | Task confirmed in the built-in Add dialog (`enableBuiltinDialogs={true}`) | Separate API call for create vs. update vs. delete |
| `onTaskUpdated` | `(task: GanttTask) => void` | Task saved in the built-in Edit dialog (`enableBuiltinDialogs={true}`) | Separate API call for updates |
| `onTaskDeleted` | `(taskId: string) => void` | Task confirmed in the built-in Delete dialog (`enableBuiltinDialogs={true}`) | Separate API call for deletes |
| `onAddTask` | `(parentTask?: GanttTask) => void` | Add icon clicked — **only** when `enableBuiltinDialogs={false}` | Custom Add dialog / drawer |
| `onEditTask` | `(task: GanttTask) => void` | Edit icon clicked — **only** when `enableBuiltinDialogs={false}` | Custom Edit dialog / drawer |
| `onDeleteTask` | `(task: GanttTask) => void` | Delete icon clicked — **only** when `enableBuiltinDialogs={false}` | Custom Delete confirmation |
| `onTaskMoved` | `(task: GanttTask, newStart: Date, newEnd: Date) => void` | Task bar dragged to a new position (`draggable={true}`). `task` carries the original metadata; new dates are in `newStart`/`newEnd` | Persisting drag results to a backend |
| `onTaskResized` | `(task: GanttTask, newEnd: Date) => void` | Task bar right edge dragged (`resizable={true}`) | Persisting resize results |
| `onExportCSV` | `(csv: string, tasks: GanttTask[]) => void` | CSV export button clicked — when not provided, the chart triggers a browser download of `gantt-tasks.csv` automatically | Custom export handling (upload to server, custom filename) |

> **Tip — `onTasksChange` vs. specific callbacks:** For simple data persistence, `onTasksChange` alone is sufficient. The specific callbacks (`onTaskCreated`, `onTaskUpdated`, etc.) are intended for applications that need to react differently to specific actions (e.g. separate API calls for Create/Update/Delete).

---

## Translations {#translations}

All displayed texts can be overridden via the `translations` prop. Only the keys that deviate from the default need to be specified.

> **Important:** The component's default values are a mix of German (toolbar labels) and English (status labels). For a completely consistent language, **all** keys should be set.

The pre-filled German default values can be imported directly:

```ts
import { DEFAULT_GANTT_TRANSLATIONS } from '@thebuoyant-tsdev/mui-ts-library';
import type { GanttTranslations } from '@thebuoyant-tsdev/mui-ts-library';

// Full TypeScript type:
type GanttTranslations = {
  scaleDays: string;
  scaleWeeks: string;
  scaleMonths: string;
  scaleQuarters: string;
  rangeFrom: string;
  rangeTo: string;
  rangeResetTooltip: string;
  scrollToTodayTooltip: string;
  expandAllTooltip: string;
  collapseAllTooltip: string;
  resetViewTooltip: string;
  weekColumnPrefix: string;
  todayLabel?: string;      // Set to "" to hide the chip — @since 2.0.0, see compatibility note below
  dateLocale: string;
  columnName: string;
  columnStatus: string;
  columnActions: string;
  columnAssignee?: string;  // @since 2.7.0, see compatibility note below
  addTaskTooltip: string;
  editTaskTooltip: string;
  deleteTaskTooltip: string;
  exportCsvTooltip?: string; // @since 2.7.0, see compatibility note below
  statusPlanned: string;
  statusInProgress: string;
  statusDone: string;
  statusBlocked: string;
  dialogAddTitle: string;
  dialogEditTitle: string;
  dialogDeleteTitle: string;
  dialogSave: string;
  dialogCancel: string;
  dialogDelete: string;
  dialogFieldName: string;
  dialogFieldStartDate: string;
  dialogFieldEndDate: string;
  dialogFieldStatus: string;
  dialogFieldMilestone: string;
  dialogFieldParent: string;
  dialogFieldParentNone: string;
  dialogDeleteConfirm: string;  // {name} is replaced with the task name at runtime
  dialogFieldDependencies: string;
  dialogFieldDependenciesNone: string;
};
```

> **⚠️ Compatibility note:** `todayLabel` (added in `v2.0.0`) and `columnAssignee`/`exportCsvTooltip` (added in `v2.7.0`) are optional on this type — unlike the other keys, which are required. This is intentional: it lets older code that declares a full `GanttTranslations` literal (instead of passing a partial object to the `translations` prop) keep compiling without changes when we add new keys in the future. Internally, the component always resolves missing keys against `DEFAULT_GANTT_TRANSLATIONS`, so you never need to provide them.

| Key | Default value | Description |
|---|---|---|
| `scaleDays` | `"Tage"` | Toolbar button for days scale |
| `scaleWeeks` | `"Wochen"` | Toolbar button for weeks scale |
| `scaleMonths` | `"Monate"` | Toolbar button for months scale |
| `scaleQuarters` | `"Quartale"` | Toolbar button for quarters scale |
| `rangeFrom` | `"Von"` | Label for the start date input |
| `rangeTo` | `"Bis"` | Label for the end date input |
| `rangeResetTooltip` | `"Bereich zurücksetzen"` | Tooltip for the reset button |
| `scrollToTodayTooltip` | `"Zum heutigen Tag"` | Tooltip for the today button |
| `expandAllTooltip` | `"Alle aufklappen"` | Tooltip for the expand all button |
| `collapseAllTooltip` | `"Alle zuklappen"` | Tooltip for the collapse all button |
| `resetViewTooltip` | `"Ansicht zurücksetzen"` | Tooltip for the reset view button |
| `weekColumnPrefix` | `"KW"` | Prefix for calendar week columns (e.g. "KW 12"). English: `"W"` |
| `todayLabel` | `"Heute"` | Label on the chip that floats above the dashed today line. Set to `""` to hide the chip entirely. |
| `dateLocale` | `"de-DE"` | BCP-47 locale for date formatting in the timeline header (e.g. `"en-US"`, `"fr-FR"`) |
| `columnName` | `"Name"` | Column header of the left panel |
| `columnStatus` | `"Status"` | Column header for the status chip |
| `columnActions` | `"Aktionen"` | Column header for the action icons |
| `columnAssignee` | `"Assignee"` | Header label for the Assignee column — shown when `showAssigneeColumn={true}` |
| `addTaskTooltip` | `"Aufgabe hinzufügen"` | Tooltip for the plus icon in a row |
| `editTaskTooltip` | `"Aufgabe bearbeiten"` | Tooltip for the edit icon |
| `deleteTaskTooltip` | `"Aufgabe löschen"` | Tooltip for the delete icon |
| `exportCsvTooltip` | `"Als CSV exportieren"` | Toolbar tooltip for the CSV export button — shown when `showExportCSV={true}` |
| `statusPlanned` | `"Planned"` | Label for "planned" status |
| `statusInProgress` | `"In Progress"` | Label for "in progress" status |
| `statusDone` | `"Done"` | Label for "done" status |
| `statusBlocked` | `"Blocked"` | Label for "blocked" status |
| `dialogAddTitle` | `"Aufgabe hinzufügen"` | Title of the add dialog |
| `dialogEditTitle` | `"Aufgabe bearbeiten"` | Title of the edit dialog |
| `dialogDeleteTitle` | `"Aufgabe löschen"` | Title of the delete dialog |
| `dialogSave` | `"Speichern"` | Save button in the dialog |
| `dialogCancel` | `"Abbrechen"` | Cancel button in the dialog |
| `dialogDelete` | `"Löschen"` | Delete button in the confirmation dialog |
| `dialogFieldName` | `"Name"` | Form field label for the task name |
| `dialogFieldStartDate` | `"Startdatum"` | Form field label for the start date |
| `dialogFieldEndDate` | `"Enddatum"` | Form field label for the end date |
| `dialogFieldStatus` | `"Status"` | Form field label for the status |
| `dialogFieldMilestone` | `"Ist Meilenstein"` | Checkbox label for the milestone flag |
| `dialogFieldParent` | `"Übergeordnete Aufgabe"` | Form field label for the parent task |
| `dialogFieldParentNone` | `"— Keine —"` | Option for "no parent task" |
| `dialogFieldDependencies` | `"Vorgänger"` | Form field label for dependencies |
| `dialogFieldDependenciesNone` | `"— Keine —"` | Option for "no dependencies" |
| `dialogDeleteConfirm` | `"Soll die Aufgabe \"{name}\" wirklich gelöscht werden?"` | Confirmation text. `{name}` is replaced with the task name. |

**Full English translation:**

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
    scrollToTodayTooltip: 'Scroll to today',
    expandAllTooltip: 'Expand all',
    collapseAllTooltip: 'Collapse all',
    resetViewTooltip: 'Reset view',
    weekColumnPrefix: 'W',
    todayLabel: 'Today',
    dateLocale: 'en-US',
    columnName: 'Name',
    columnStatus: 'Status',
    columnActions: 'Actions',
    addTaskTooltip: 'Add task',
    editTaskTooltip: 'Edit task',
    deleteTaskTooltip: 'Delete task',
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
    dialogFieldDependencies: 'Predecessors',
    dialogFieldDependenciesNone: '— None —',
    dialogDeleteConfirm: 'Delete task "{name}"?',
  }}
/>
```

---

## Usage Examples

### Read-only view (no editing)

```tsx
<GanttChart
  tasks={tasks}
  timeScale="weeks"
  showToolbar={false}
  enableBuiltinDialogs={false}
  onTaskClick={(task) => console.log('Clicked:', task.name)}
/>
```

### Fully interactive with external state

```tsx
const [tasks, setTasks] = useState<GanttTask[]>(initialTasks);

<GanttChart
  tasks={tasks}
  draggable
  resizable
  cascadeDependencies
  inlineEdit
  progressDraggable
  zoomable
  showCriticalPath
  onTasksChange={setTasks}
  onTaskCreated={(task) => api.createTask(task)}
  onTaskUpdated={(task) => api.updateTask(task)}
  onTaskDeleted={(id) => api.deleteTask(id)}
/>
```

### With a custom edit dialog

```tsx
const [editTarget, setEditTarget] = useState<GanttTask | null>(null);

<GanttChart
  tasks={tasks}
  enableBuiltinDialogs={false}
  onEditTask={(task) => setEditTarget(task)}
  onAddTask={(parent) => openCreateDialog(parent)}
  onDeleteTask={(task) => openDeleteConfirm(task)}
/>
{editTarget && <MyCustomDialog task={editTarget} onClose={() => setEditTarget(null)} />}
```

### Milestones

```tsx
const tasks: GanttTask[] = [
  {
    id: 'release',
    name: 'Release v2.0',
    status: 'planned',
    startDate: new Date('2025-06-30'),
    endDate: new Date('2025-06-30'),
    isMilestone: true,
  },
];
```

### Virtualization for large datasets

```tsx
{/* Recommended for 200+ tasks */}
<GanttChart
  tasks={largeTasks}
  virtualizeRows
  height={600}
/>
```

---

## Today Line & Chip

The dashed today line marks the current date in the timeline. A small labeled **chip** floats at the very top of this line, straddling the header and the task rows.

```tsx
{/* Default: shows "Heute" chip */}
<GanttChart tasks={tasks} />

{/* English label */}
<GanttChart tasks={tasks} translations={{ todayLabel: 'Today' }} />

{/* Hide the chip entirely */}
<GanttChart tasks={tasks} translations={{ todayLabel: '' }} />
```

**Customization points:**

| Aspect | How to control |
|---|---|
| Chip label | `translations.todayLabel` (default: `"Heute"`, set to `""` to hide) |
| Chip & line color | `ganttTheme.todayLineColor` (default: MUI `primary.main`) |
| Date format in Tooltip | `translations.dateLocale` (BCP-47, e.g. `"en-US"`) |

Hovering the chip shows a Tooltip with the full localized date (e.g. "Wednesday, 27 May 2026").

---

## Ctrl+Scroll Zoom

> **macOS:** Use `Cmd ⌘ + Scroll` instead of `Ctrl + Scroll`.

When `zoomable={true}`, the user can cycle through zoom levels directly in the timeline:

| Action | Result |
|---|---|
| `Ctrl + Scroll up` / `Cmd ⌘ + Scroll up` | Zoom in — cycles `quarters` → `months` → `weeks` → `days` |
| `Ctrl + Scroll down` / `Cmd ⌘ + Scroll down` | Zoom out — cycles `days` → `weeks` → `months` → `quarters` |

```tsx
<GanttChart tasks={tasks} zoomable />
```

`zoomable` is `false` by default to avoid accidental zoom while scrolling the page.

---

## Accessibility

- All action icons (Add, Edit, Delete) are equipped with tooltips that serve as `aria-label`.
- Status chips use semantic MUI color assignments that are automatically adapted in dark mode themes.
- All toolbar button texts and dialog labels are fully localizable via `translations`, including accessibility-relevant labels.
- Keyboard navigation: dialogs follow the MUI standard (focus trap, Escape to close).

---

## Notes and Known Limitations

| Topic | Note |
|---|---|
| **Default language** | The default texts are a mix: toolbar labels in German, status labels in English. For consistent localization, set all keys. |
| **`virtualizeRows` in jsdom** | In unit tests with jsdom, `clientHeight` is always 0, so only overscan rows appear in the DOM. This is not a bug — virtualization works correctly in real browsers. |
| **`cascadeDependencies`** | Only applies to finish-to-start dependencies (via the `dependencies` array). Circular dependencies are detected and aborted. |
| **Progress drag** | `progressDraggable` requires `progress` in the task data. When `progress` is undefined, the handle is not shown. |
