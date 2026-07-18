# KanbanBoard — User Manual

> [Deutsche Version →](KanbanBoard.de.md)

**A drag-and-drop Kanban board with built-in CRUD dialogs, WIP limits, and full i18n — ready to drop into any React app.** Use `KanbanBoard` for task management dashboards, sprint boards, or any workflow where users need to move work items between status columns.

## Overview

The `KanbanBoard` renders a horizontal row of columns, each containing a list of cards. Users can drag cards between columns to change their status, reorder cards within a column, and manage cards via built-in Add / Edit / Delete dialogs.

### What does this component do?

- **Columns** display a header with a color accent bar, a task count chip, and an optional WIP limit indicator.
- **Cards** show the task title and optional meta chips (assignee, due date). A colored left border can be added per card.
- **Drag and drop** (powered by `@dnd-kit`): grab a card and drop it into any column. In-column reordering is also supported.
- **Built-in dialogs**: click a card to open the Edit dialog; click "+ Add card" in a column to open the Add dialog. A Delete confirmation is reachable from the Edit dialog.
- **WIP limits**: set `wipLimit` on a column — the count chip turns red when the limit is exceeded.
- **Keyboard sensor**: cards are also accessible via keyboard (`Space` to pick up, arrow keys to navigate, `Space`/`Enter` to drop).

---

## Quick start

```tsx
import { KanbanBoard } from "mui-ts-library";
import type { KanbanColumn, KanbanTask } from "mui-ts-library";

const columns: KanbanColumn[] = [
  { id: "todo",        label: "To Do",       color: "#9e9e9e" },
  { id: "in-progress", label: "In Progress", color: "#2196f3" },
  { id: "done",        label: "Done",        color: "#4caf50" },
];

const [tasks, setTasks] = useState<KanbanTask[]>([
  { id: "1", title: "Set up project",   status: "todo",        assignee: "Alice" },
  { id: "2", title: "Implement feature", status: "in-progress", assignee: "Bob", dueDate: new Date("2026-08-01") },
  { id: "3", title: "Write tests",      status: "done" },
]);

<KanbanBoard
  columns={columns}
  tasks={tasks}
  onTasksChange={setTasks}
  height={500}
/>
```

Every drag-and-drop, Add, Edit, and Delete action calls `onTasksChange` with the full updated task list — your state stays in sync automatically.

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tasks` | `KanbanTask[]` | — | **Required.** The current list of tasks. Each task's `status` must match a `KanbanColumn.id`. |
| `columns` | `KanbanColumn[]` | — | **Required.** The columns to display, left to right. |
| `onTasksChange` | `(tasks: KanbanTask[]) => void` | — | Called after every CRUD action and drag-and-drop with the full updated list. |
| `onCardClick` | `(task: KanbanTask) => void` | — | Called when a card is clicked and `enableBuiltinDialogs` is `false`. |
| `enableBuiltinDialogs` | `boolean` | `true` | Show the built-in Add / Edit / Delete dialogs. Set to `false` to handle dialogs yourself via `onCardClick`. |
| `onTaskCreated` | `(task: KanbanTask) => void` | — | Called after a new card is saved via the Add dialog. |
| `onTaskUpdated` | `(task: KanbanTask) => void` | — | Called after an existing card is saved via the Edit dialog. |
| `onTaskDeleted` | `(taskId: string) => void` | — | Called after a card is deleted via the Delete confirmation. |
| `onTaskMoved` | `(task: KanbanTask, fromColumnId: string, toColumnId: string) => void` | — | Called when a card is moved to a **different column** via drag and drop. Not fired for in-column reordering or dialog-based status changes — use `onTaskUpdated` for those. |
| `showPriority` | `boolean` | `true` | Show the priority dot on cards. Has no visual effect when a card has no `priority` field. |
| `showAssignee` | `boolean` | `true` | Show the assignee chip on cards. |
| `showDueDate` | `boolean` | `true` | Show the due-date chip on cards. |
| `showDueDateWarning` | `boolean` | `true` | When `true`, cards with a `dueDate` in the past are highlighted: the date chip turns red and the card gets a red background tint + left border. Set to `false` to disable. Has no effect when `showDueDate` is `false`. |
| `chipVariant` | `"outlined" \| "filled"` | `"outlined"` | MUI Chip variant for the assignee and due-date chips. `"outlined"` = subtle border; `"filled"` = solid background. |
| `width` | `number \| string` | `"100%"` | Width of the board. Use a fixed pixel value or any CSS length. |
| `height` | `number \| string` | `"100%"` | Height of the board. Use a fixed pixel value or any CSS length. |
| `translation` | `Partial<KanbanBoardTranslation>` | — | Override any label or message. Unset keys fall back to English defaults. |

---

## KanbanTask type

```ts
type KanbanTask = {
  id:           string;              // unique identifier
  title:        string;              // card title
  status:       string;              // must match a KanbanColumn.id
  description?: string;              // optional longer text (shown in edit dialog)
  assignee?:    string;              // shown as a chip on the card
  color?:       string;              // left border color — any CSS color value
  dueDate?:     Date;                // shown as a chip on the card
  priority?:    KanbanTaskPriority;  // colored dot next to the title
};

type KanbanTaskPriority = "low" | "medium" | "high" | "critical";
```

### Priority colors

| Value | Color | Hex |
|---|---|---|
| `"low"` | Green | `#4caf50` |
| `"medium"` | Orange | `#ff9800` |
| `"high"` | Red | `#f44336` |
| `"critical"` | Purple | `#9c27b0` |

## KanbanColumn type

```ts
type KanbanColumn = {
  id:        string;    // unique — must match KanbanTask.status values
  label:     string;    // column heading
  color?:    string;    // accent bar color in column header (any CSS color)
  wipLimit?: number;    // optional WIP limit — chip turns red when exceeded
};
```

---

## Controlling the board yourself (`enableBuiltinDialogs={false}`)

When you want to implement your own dialogs, set `enableBuiltinDialogs={false}`. The "+" button is hidden; clicking a card fires `onCardClick` instead of opening the built-in dialog.

```tsx
<KanbanBoard
  columns={columns}
  tasks={tasks}
  onTasksChange={setTasks}
  enableBuiltinDialogs={false}
  onCardClick={(task) => openMyCustomDrawer(task)}
/>
```

---

## Reacting to column moves (`onTaskMoved`)

`onTaskMoved` fires exclusively when a card is dragged from one column to another. It carries the full updated task plus both column ids, so you can issue a targeted backend call without diffing the full list.

```tsx
<KanbanBoard
  columns={columns}
  tasks={tasks}
  onTasksChange={setTasks}
  onTaskMoved={(task, fromColumnId, toColumnId) => {
    // Targeted status update — no full-list diff required
    api.patch(`/tasks/${task.id}`, { status: task.status });

    // Business logic based on the transition
    if (toColumnId === "done") {
      slack.notify(`"${task.title}" wurde als erledigt markiert.`);
    }

    // Undo support
    undoStack.push({
      label: `Move "${task.title}" back to ${fromColumnId}`,
      undo: () => api.patch(`/tasks/${task.id}`, { status: fromColumnId }),
    });
  }}
/>
```

**When does it fire?**

| Action | `onTasksChange` | `onTaskUpdated` | `onTaskMoved` |
|---|---|---|---|
| Card dragged to different column | ✓ | — | ✓ |
| Card reordered within same column | ✓ | — | — |
| Card saved via Edit dialog (title, assignee, …) | ✓ | ✓ | — |
| Card status changed via Edit dialog dropdown | ✓ | ✓ | — |
| New card added | ✓ | — | — |
| Card deleted | ✓ | — | — |

---

## Priority indicators (`showPriority`)

Set `priority` on any `KanbanTask` to display a small colored dot to the left of the card title. The dot is shown when `showPriority` is `true` (the default).

```tsx
const tasks: KanbanTask[] = [
  { id: "1", title: "Fix prod outage",   status: "todo", priority: "critical" },
  { id: "2", title: "Security patch",    status: "todo", priority: "high" },
  { id: "3", title: "Improve perf",      status: "in-progress", priority: "medium" },
  { id: "4", title: "Update readme",     status: "todo", priority: "low" },
  { id: "5", title: "No priority set",   status: "todo" },  // no dot shown
];

<KanbanBoard columns={columns} tasks={tasks} />
```

Set `showPriority={false}` to hide all dots without touching your data:

```tsx
<KanbanBoard columns={columns} tasks={tasks} showPriority={false} />
```

**Notes:**
- Cards with no `priority` field never show a dot, regardless of `showPriority`.
- The dot is accessible: it carries `role="img"` and `aria-label="Priority: {level}"`.
- The CSS class `MuiTsKanbanBoard-cardPriorityDot` lets you style the dot via plain CSS.

---

## Overdue due-date warning (`showDueDateWarning`)

When `showDueDateWarning` is `true` (the default), any card whose `dueDate` is before today is automatically highlighted:

- The due-date chip turns red (`color="error"` — works with both `"outlined"` and `"filled"` chip variants).
- The card gets a subtle red background tint.
- A 4 px red left-border accent is added (unless `task.color` is set, in which case that color takes priority for the left border).

```tsx
// Opt out of the warning — date chips always show in their default color
<KanbanBoard
  columns={columns}
  tasks={tasks}
  showDueDateWarning={false}
/>
```

**Notes:**
- Has no visual effect when `showDueDate` is `false` or a card has no `dueDate`.
- "Overdue" means `dueDate < start of today` — cards due today are not highlighted.
- The highlight applies to cards in any column, including "Done". If you want to suppress it for completed tasks, omit `dueDate` on done cards or set `showDueDateWarning={false}` for the whole board.

---

## WIP limits

Set `wipLimit` on a column to limit how many cards are allowed in it. The count chip in the column header shows `{count} / {limit}` and turns red when the limit is exceeded. This is a visual indicator only — users can still drag cards in.

```tsx
const columns: KanbanColumn[] = [
  { id: "in-progress", label: "In Progress", color: "#2196f3", wipLimit: 3 },
  { id: "done",        label: "Done",        color: "#4caf50" },
];
```

---

## Internationalization (i18n)

Pass a `translation` object with any labels you want to override. Unset keys fall back to the English defaults.

```tsx
<KanbanBoard
  columns={columns}
  tasks={tasks}
  translation={{
    addCardLabel:           "Karte hinzufügen",
    dialogAddTitle:         "Karte hinzufügen",
    dialogEditTitle:        "Karte bearbeiten",
    dialogDeleteTitle:      "Karte löschen",
    dialogSave:             "Speichern",
    dialogCancel:           "Abbrechen",
    dialogDelete:           "Löschen",
    dialogDeleteConfirm:    '"{title}" wirklich löschen?',
    dialogFieldTitle:       "Titel",
    dialogFieldDescription: "Beschreibung",
    dialogFieldAssignee:    "Zuständig",
    dialogFieldDueDate:     "Fälligkeitsdatum",
    dialogFieldStatus:      "Status",
    noCardsLabel:           "Keine Karten",
  }}
/>
```

The `dialogDeleteConfirm` string supports the placeholder `{title}` — it is replaced at runtime with the card's title.

### All translation keys

| Key | Default | Description |
|---|---|---|
| `addCardLabel` | `"Add card"` | Label on the "+" button in each column footer |
| `dialogAddTitle` | `"Add card"` | Title of the Add card dialog |
| `dialogEditTitle` | `"Edit card"` | Title of the Edit card dialog |
| `dialogDeleteTitle` | `"Delete card"` | Title of the Delete confirmation dialog |
| `dialogSave` | `"Save"` | Save button in Add/Edit dialog |
| `dialogCancel` | `"Cancel"` | Cancel button in all dialogs |
| `dialogDelete` | `"Delete"` | Delete button in Delete confirmation |
| `dialogDeleteConfirm` | `'Delete "{title}"?'` | Body text of Delete confirmation — `{title}` is replaced with card title |
| `dialogFieldTitle` | `"Title"` | Label for the Title input in Add/Edit dialog |
| `dialogFieldDescription` | `"Description"` | Label for the Description input |
| `dialogFieldAssignee` | `"Assignee"` | Label for the Assignee input and chip aria-label |
| `dialogFieldDueDate` | `"Due date"` | Label for the Due date input and chip aria-label |
| `dialogFieldStatus` | `"Status"` | Label for the Status dropdown in Add/Edit dialog |
| `noCardsLabel` | `"No cards"` | Placeholder shown in an empty column |

---

## CSS classes API

Every visual slot exposes a stable CSS class for custom styling. All classes use the `MuiTsKanbanBoard-` prefix and can be combined with the state class `MuiTs-selected` (added to a card while it is being dragged).

```ts
import { kanbanBoardClasses } from "mui-ts-library";
// kanbanBoardClasses.root         → "MuiTsKanbanBoard-root"
// kanbanBoardClasses.columns      → "MuiTsKanbanBoard-columns"
// kanbanBoardClasses.column       → "MuiTsKanbanBoard-column"
// kanbanBoardClasses.columnHeader → "MuiTsKanbanBoard-columnHeader"
// kanbanBoardClasses.columnTitle  → "MuiTsKanbanBoard-columnTitle"
// kanbanBoardClasses.columnCount  → "MuiTsKanbanBoard-columnCount"
// kanbanBoardClasses.columnBody   → "MuiTsKanbanBoard-columnBody"
// kanbanBoardClasses.card         → "MuiTsKanbanBoard-card"
// kanbanBoardClasses.cardTitle    → "MuiTsKanbanBoard-cardTitle"
// kanbanBoardClasses.cardMeta     → "MuiTsKanbanBoard-cardMeta"
// kanbanBoardClasses.cardAssignee → "MuiTsKanbanBoard-cardAssignee"
// kanbanBoardClasses.cardDueDate  → "MuiTsKanbanBoard-cardDueDate"
// kanbanBoardClasses.addButton    → "MuiTsKanbanBoard-addButton"
```

### Example: custom card style

```css
/* Make "done" cards visually muted */
.done-column .MuiTsKanbanBoard-card {
  opacity: 0.6;
}

/* Highlight the card being dragged */
.MuiTsKanbanBoard-card.MuiTs-selected {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transform: rotate(1.5deg);
}

/* Bold column headers */
.MuiTsKanbanBoard-columnTitle {
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Style the "Add card" button */
.MuiTsKanbanBoard-addButton {
  border-style: solid !important;
  font-size: 0.9rem;
}
```

---

## Using KanbanBoard and GanttChart together

`KanbanBoard` and `GanttChart` use **separate, independent data models** — this is intentional. A Gantt task carries temporal data (`startDate`, `endDate`, `dependencies`, `progress`, `isMilestone`) that has no meaning on a Kanban card. A Kanban task has a `status` column that does not exist on a Gantt task.

When your application models tasks once but wants to display them in both views, write a thin adapter for each direction. The pattern keeps your domain model clean and lets each component be consumed with exactly the shape it needs.

### Adapter: GanttTask → KanbanTask

```ts
import type { GanttTask } from "mui-ts-library";
import type { KanbanTask } from "mui-ts-library";

function ganttToKanban(ganttTask: GanttTask): KanbanTask {
  // Map the Gantt status to a Kanban column id.
  // Your column ids and status values should agree — adjust the map below.
  const statusMap: Record<string, string> = {
    planned:     "todo",
    in_progress: "in-progress",
    done:        "done",
    blocked:     "blocked",
  };

  return {
    id:          ganttTask.id,
    title:       ganttTask.name,
    status:      statusMap[ganttTask.status] ?? "todo",
    assignee:    ganttTask.assignee,
    color:       ganttTask.color,
    dueDate:     ganttTask.endDate ? new Date(ganttTask.endDate) : undefined,
    description: ganttTask.notes,
  };
}

// Usage
const kanbanTasks = ganttTasks.map(ganttToKanban);
```

### Adapter: KanbanTask → GanttTask

```ts
import type { GanttTask } from "mui-ts-library";
import type { KanbanTask } from "mui-ts-library";

function kanbanToGantt(kanbanTask: KanbanTask, today: Date = new Date()): GanttTask {
  const statusMap: Record<string, string> = {
    "todo":        "planned",
    "in-progress": "in_progress",
    "done":        "done",
    "blocked":     "blocked",
  };

  // Gantt requires startDate and endDate — derive sensible defaults
  // if your Kanban tasks don't carry them.
  const startDate = today.toISOString().split("T")[0];
  const endDate   = kanbanTask.dueDate
    ? kanbanTask.dueDate.toISOString().split("T")[0]
    : startDate;

  return {
    id:        kanbanTask.id,
    name:      kanbanTask.title,
    startDate,
    endDate,
    status:    statusMap[kanbanTask.status] ?? "planned",
    assignee:  kanbanTask.assignee,
    color:     kanbanTask.color,
  };
}

// Usage
const ganttTasks = kanbanTasks.map((t) => kanbanToGantt(t));
```

### "Same data, two views" pattern

```tsx
import { useState }     from "react";
import { GanttChart }   from "mui-ts-library";
import { KanbanBoard }  from "mui-ts-library";
import type { GanttTask, KanbanTask, KanbanColumn } from "mui-ts-library";

const COLUMNS: KanbanColumn[] = [
  { id: "todo",        label: "To Do",       color: "#9e9e9e" },
  { id: "in-progress", label: "In Progress", color: "#2196f3" },
  { id: "done",        label: "Done",        color: "#4caf50" },
];

export function ProjectDashboard({ initialGanttTasks }: { initialGanttTasks: GanttTask[] }) {
  const [ganttTasks, setGanttTasks] = useState(initialGanttTasks);
  const [view, setView]             = useState<"gantt" | "kanban">("kanban");

  const kanbanTasks = ganttTasks.map(ganttToKanban);

  function handleKanbanChange(updated: KanbanTask[]) {
    // Merge status changes back into the Gantt model.
    const statusMap: Record<string, string> = {
      "todo": "planned", "in-progress": "in_progress", "done": "done",
    };
    setGanttTasks((prev) =>
      prev.map((g) => {
        const k = updated.find((k) => k.id === g.id);
        return k ? { ...g, status: statusMap[k.status] ?? g.status } : g;
      }),
    );
  }

  return (
    <>
      <button onClick={() => setView(view === "gantt" ? "kanban" : "gantt")}>
        Switch to {view === "gantt" ? "Kanban" : "Gantt"}
      </button>

      {view === "gantt" ? (
        <GanttChart tasks={ganttTasks} onTasksChange={setGanttTasks} />
      ) : (
        <KanbanBoard
          columns={COLUMNS}
          tasks={kanbanTasks}
          onTasksChange={handleKanbanChange}
        />
      )}
    </>
  );
}
```

---

## TypeScript exports

```ts
import {
  KanbanBoard,
  kanbanBoardClasses,
  // Types
  type KanbanTask,
  type KanbanColumn,
  type KanbanBoardProps,
  type KanbanBoardTranslation,
} from "mui-ts-library";
```
