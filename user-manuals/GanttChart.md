# GanttChart — User Manual

> [Deutsche Version →](GanttChart.de.md)

## Overview

The `GanttChart` is a fully interactive project planning component built on React and Material UI. It visualizes tasks as bars on a timeline and supports hierarchical structures, task dependencies, drag & drop, inline editing, and a critical path mode.

**Typical use cases:**

- Project management applications (sprint planning, release roadmaps)
- Resource planning and capacity visualization
- Milestone tracking in agile projects
- Dashboards with a temporal overview of ongoing tasks

![GanttChart – Component Preview](GanttChart.png)

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
| `dependencies` | `string[]` | No | IDs of predecessor tasks. Shown as a multi-select in the edit dialog. When used with `cascadeDependencies`, successors are automatically shifted when a predecessor moves. |
| `isMilestone` | `boolean` | No | When `true`, the task is rendered as a diamond (♦) instead of a bar. Milestones should have `startDate ≈ endDate`. |
| `progress` | `number` | No | Progress in percent (0–100). Rendered as a semi-transparent overlay bar on top of the task bar. Interactive when `progressDraggable={true}`. |
| `color` | `string` | No | Overrides the status-based bar color for this individual task (highest priority). Any CSS color value (e.g. `"#e91e63"` or `"rgb(0,150,136)"`). |

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
};
```

---

### Component props: `GanttChartProps`

#### Core data

| Prop | Type | Default | Description |
|---|---|---|---|
| `tasks` | `GanttTask[]` | — | **Required.** Flat array of all tasks. Hierarchy is built internally via `parentId`. Changes are reflected back via the `onTasksChange` callback. |
| `timeScale` | `GanttTimeScale` | `"months"` | Initial time scale: `"days"` · `"weeks"` · `"months"` · `"quarters"`. The user can switch the scale via the toolbar at any time. |

#### Display & sizing

| Prop | Type | Default | Description |
|---|---|---|---|
| `height` | `number \| string` | `400` | Total chart height in pixels or as a CSS value. `"auto"` adapts to the parent element. |
| `width` | `number \| string` | `"100%"` | Total chart width. Default fills the available space. |
| `minPanelWidth` | `number` | `200` | Minimum width of the left task panel in pixels. Prevents the user from making the panel too narrow. |
| `maxPanelWidth` | `number` | `600` | Maximum width of the left task panel in pixels. |
| `virtualizeRows` | `boolean` | `false` | When `true`, only currently visible rows are rendered (virtual list). Recommended for ~200+ tasks as it drastically reduces DOM size. |

#### Expand behavior

| Prop | Type | Default | Description |
|---|---|---|---|
| `initialExpandAll` | `boolean` | `false` | Starts the chart with all hierarchy levels expanded. Default: only root tasks are expanded, their direct children are visible. |

#### Timeline & range

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultRangeStart` | `Date` | auto | Overrides the automatically calculated left boundary of the timeline. Useful for fixing a specific date range from the start. |
| `defaultRangeEnd` | `Date` | auto | Overrides the automatically calculated right boundary of the timeline. |

> **Note:** When `defaultRangeStart`/`defaultRangeEnd` are not set, the chart calculates the range automatically from the earliest and latest task dates and adds a 1-month buffer at both ends.

#### Toolbar

| Prop | Type | Default | Description |
|---|---|---|---|
| `showToolbar` | `boolean` | `true` | Shows or hides the entire toolbar (scale buttons, date range, action buttons). |
| `toolbarConfig` | `GanttToolbarConfig` | all `true` | Fine-grained control over individual toolbar elements. Only specify deviating keys — unset keys remain visible. See [GanttToolbarConfig](#gantttoolbarconfig). |

#### Interaction modes

| Prop | Type | Default | Description |
|---|---|---|---|
| `enableBuiltinDialogs` | `boolean` | `true` | When `true`, the action icons (Add, Edit, Delete) open built-in MUI dialogs. When `false`, only the callbacks `onAddTask`, `onEditTask`, `onDeleteTask` are called — for custom dialog implementations. |
| `zoomable` | `boolean` | `false` | Enables zoom via `Ctrl + mouse wheel`. Cycles through time scales (Days ↔ Weeks ↔ Months ↔ Quarters). |
| `draggable` | `boolean` | `false` | Allows horizontal dragging of task bars. Updates `startDate` and `endDate` in sync. |
| `resizable` | `boolean` | `false` | Allows changing the `endDate` by dragging the right edge of a bar. |
| `cascadeDependencies` | `boolean` | `false` | When `true`, moving or resizing a task automatically shifts all finish-to-start successors (via `dependencies`) by the same amount. Works transitively across multiple levels. |
| `inlineEdit` | `boolean` | `false` | Enables inline editing of the task name by double-clicking directly in the panel. |
| `progressDraggable` | `boolean` | `false` | Shows a progress handle on the task bar. The user can set the progress (0–100 %) by dragging directly in the chart. |
| `showCriticalPath` | `boolean` | `false` | Highlights the critical path — the longest dependency chain that determines the project duration. |

#### Theming & colors

| Prop | Type | Default | Description |
|---|---|---|---|
| `ganttTheme` | `GanttTheme` | — | Bundled theming object. Recommended way for visual customization. Individual keys override the defaults — unset keys keep their default appearance. See [GanttTheme](#gantttheme). |
| `statusColors` | `GanttStatusColors` | — | ⚠️ **Deprecated.** Use `ganttTheme.statusColors` instead. Overrides bar colors per status. |
| `translations` | `Partial<GanttTranslations>` | German/English | Texts for all UI elements. Only specify deviating keys. See [Translations](#translations). |

---

### `GanttToolbarConfig` {#gantttoolbarconfig}

Allows selectively hiding individual toolbar elements. All fields are optional — unset keys remain visible (`true`).

| Field | Type | Default | Controls |
|---|---|---|---|
| `showScaleDays` | `boolean` | `true` | Days scale button |
| `showScaleWeeks` | `boolean` | `true` | Weeks scale button |
| `showScaleMonths` | `boolean` | `true` | Months scale button |
| `showScaleQuarters` | `boolean` | `true` | Quarters scale button |
| `showExpandCollapseAll` | `boolean` | `true` | Expand all / Collapse all |
| `showScrollToToday` | `boolean` | `true` | "Scroll to today" button |
| `showDateRange` | `boolean` | `true` | From/To date inputs |
| `showRangeReset` | `boolean` | `true` | Reset button (only appears when range has been manually adjusted) |
| `showResetView` | `boolean` | `true` | Reset view (scale + range back to defaults) |

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

| Callback | Signature | When fired |
|---|---|---|
| `onTaskClick` | `(task: GanttTask) => void` | Click on a task bar in the timeline. |
| `onMilestoneClick` | `(task: GanttTask) => void` | Click on a milestone diamond. |
| `onAddTask` | `(parentTask?: GanttTask) => void` | Click on the "Add" icon in a task row. `parentTask` is set when the new task should be a child. Only fires when `enableBuiltinDialogs={false}`. |
| `onEditTask` | `(task: GanttTask) => void` | Click on the "Edit" icon. Only fires when `enableBuiltinDialogs={false}`. |
| `onDeleteTask` | `(task: GanttTask) => void` | Click on the "Delete" icon. Only fires when `enableBuiltinDialogs={false}`. |
| `onStatusChange` | `(task: GanttTask, status: GanttTaskStatus) => void` | New status selected via the right-click context menu on the bar. |
| `onTaskMoved` | `(task: GanttTask, newStart: Date, newEnd: Date) => void` | Task was horizontally moved by drag (`draggable={true}`). `task` contains the original metadata (id, name, status, etc.) with the **old** dates. The new dates are exclusively in `newStart` and `newEnd`. |
| `onTaskResized` | `(task: GanttTask, newEnd: Date) => void` | Task bar was extended/shortened by dragging the right edge (`resizable={true}`). |
| `onTasksChange` | `(tasks: GanttTask[]) => void` | Called after **every** CRUD action with the complete, current task list. Central callback for data-driven architectures (e.g. Redux, Zustand, React Query). |
| `onTaskCreated` | `(task: GanttTask) => void` | New task was created via the built-in dialog (`enableBuiltinDialogs={true}`). |
| `onTaskUpdated` | `(task: GanttTask) => void` | Task was edited via the built-in dialog (`enableBuiltinDialogs={true}`). |
| `onTaskDeleted` | `(taskId: string) => void` | Task was deleted via the built-in confirmation dialog (`enableBuiltinDialogs={true}`). |

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
  dateLocale: string;
  columnName: string;
  columnStatus: string;
  columnActions: string;
  addTaskTooltip: string;
  editTaskTooltip: string;
  deleteTaskTooltip: string;
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
| `dateLocale` | `"de-DE"` | BCP-47 locale for date formatting in the timeline header (e.g. `"en-US"`, `"fr-FR"`) |
| `columnName` | `"Name"` | Column header of the left panel |
| `columnStatus` | `"Status"` | Column header for the status chip |
| `columnActions` | `"Aktionen"` | Column header for the action icons |
| `addTaskTooltip` | `"Aufgabe hinzufügen"` | Tooltip for the plus icon in a row |
| `editTaskTooltip` | `"Aufgabe bearbeiten"` | Tooltip for the edit icon |
| `deleteTaskTooltip` | `"Aufgabe löschen"` | Tooltip for the delete icon |
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
| **`statusColors` (deprecated)** | The `statusColors` prop at the component level is deprecated. Use `ganttTheme.statusColors` instead. When both are set, `ganttTheme.statusColors` takes precedence. |
| **`virtualizeRows` in jsdom** | In unit tests with jsdom, `clientHeight` is always 0, so only overscan rows appear in the DOM. This is not a bug — virtualization works correctly in real browsers. |
| **`cascadeDependencies`** | Only applies to finish-to-start dependencies (via the `dependencies` array). Circular dependencies are detected and aborted. |
| **Progress drag** | `progressDraggable` requires `progress` in the task data. When `progress` is undefined, the handle is not shown. |
