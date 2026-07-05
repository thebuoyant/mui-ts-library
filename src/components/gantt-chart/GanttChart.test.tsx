import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GanttChart } from "./GanttChart";
import type { GanttTask } from "./GanttChart.types";
import { computeCriticalPath } from "./util/gantt-chart.util";

const tasks: GanttTask[] = [
  {
    id: "root",
    name: "Root Task",
    status: "in-progress",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-03-31"),
  },
  {
    id: "child",
    parentId: "root",
    name: "Child Task",
    status: "planned",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
  },
  {
    id: "milestone",
    parentId: "root",
    name: "Sprint End",
    status: "planned",
    startDate: new Date("2025-03-31"),
    endDate: new Date("2025-03-31"),
    isMilestone: true,
  },
];

describe("GanttChart", () => {
  it("Should render without crashing", () => {
    render(<GanttChart tasks={tasks} />);
  });

  it("Should show root and all direct children since root is expanded by default", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByText("Root Task")).toBeInTheDocument();
    expect(screen.getByText("Child Task")).toBeInTheDocument();
    expect(screen.getByText("Sprint End")).toBeInTheDocument();
  });

  it("Should hide child tasks after collapsing the parent", () => {
    render(<GanttChart tasks={tasks} />);

    fireEvent.click(screen.getByText("▼"));

    expect(screen.queryByText("Child Task")).not.toBeInTheDocument();
    expect(screen.queryByText("Sprint End")).not.toBeInTheDocument();
  });

  it("Should show child tasks again after re-expanding the parent", () => {
    render(<GanttChart tasks={tasks} />);

    fireEvent.click(screen.getByText("▼"));
    fireEvent.click(screen.getByText("▶"));

    expect(screen.getByText("Child Task")).toBeInTheDocument();
  });

  it("Should call onTaskClick when a task row is clicked", () => {
    const onTaskClick = vi.fn();
    render(<GanttChart tasks={tasks} onTaskClick={onTaskClick} />);

    fireEvent.click(screen.getByTestId("gantt-task-row-child"));

    expect(onTaskClick).toHaveBeenCalledOnce();
    expect(onTaskClick).toHaveBeenCalledWith(expect.objectContaining({ id: "child" }));
  });

  it("Should call onMilestoneClick when a milestone diamond is clicked", () => {
    const onMilestoneClick = vi.fn();
    render(<GanttChart tasks={tasks} onMilestoneClick={onMilestoneClick} />);

    fireEvent.click(screen.getByTestId("gantt-milestone-milestone"));

    expect(onMilestoneClick).toHaveBeenCalledOnce();
    expect(onMilestoneClick).toHaveBeenCalledWith(expect.objectContaining({ id: "milestone" }));
  });

  it("Should render a bar for each non-milestone visible task", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-bar-root")).toBeInTheDocument();
    expect(screen.getByTestId("gantt-bar-child")).toBeInTheDocument();
  });

  it("Should render a milestone diamond instead of a bar for milestone tasks", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-milestone-milestone")).toBeInTheDocument();
    expect(screen.queryByTestId("gantt-bar-milestone")).not.toBeInTheDocument();
  });

  it("Should not show bar rows for hidden (collapsed) children", () => {
    render(<GanttChart tasks={tasks} />);

    fireEvent.click(screen.getByText("▼"));

    expect(screen.queryByTestId("gantt-bar-child")).not.toBeInTheDocument();
    expect(screen.queryByTestId("gantt-milestone-milestone")).not.toBeInTheDocument();
  });

  it("Should render a status chip for each visible task row", () => {
    render(<GanttChart tasks={tasks} />);

    // "In Progress" für root (status = "in-progress"), "Planned" für child und milestone
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getAllByText("Planned")).toHaveLength(2);
  });

  it("Should render the weeks scale header with KW labels", () => {
    render(<GanttChart tasks={tasks} timeScale="weeks" />);

    const kwLabels = screen.getAllByText(/^KW\d+$/);
    expect(kwLabels.length).toBeGreaterThan(0);
  });

  it("Should render the days scale header with day number labels and a two-row header", () => {
    render(<GanttChart tasks={tasks} timeScale="days" />);

    // Tages-Spalten zeigen Zahlen 1–31 — "15" muss für jeden Monat im Range vorhanden sein
    const fifteenLabels = screen.getAllByText("15");
    expect(fifteenLabels.length).toBeGreaterThan(0);

    // Monatsgruppen der oberen Zeile sind sichtbar (Jan–Mär 2025 aus den Test-Tasks)
    const monthLabels = screen.getAllByText(/^(Jan|Feb|März|Apr|Mai|Jun|Jul|Aug|Sep|Okt|Nov|Dez)/);
    expect(monthLabels.length).toBeGreaterThan(0);
  });

  it("Should show all tasks at all depths when initialExpandAll is true", () => {
    const deepTasks: GanttTask[] = [
      {
        id: "root",
        name: "Root",
        status: "planned",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-03-31"),
      },
      {
        id: "child",
        parentId: "root",
        name: "Child",
        status: "planned",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-02-28"),
      },
      {
        id: "grandchild",
        parentId: "child",
        name: "Grandchild",
        status: "planned",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-01-31"),
      },
    ];

    render(<GanttChart tasks={deepTasks} initialExpandAll />);

    // Ohne initialExpandAll wäre Grandchild nicht sichtbar, da child standardmäßig eingeklappt ist.
    expect(screen.getByText("Grandchild")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Phase 8 — Toolbar
// ---------------------------------------------------------------------------

describe("GanttChart — toolbar", () => {
  it("Should render the toolbar by default", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-toolbar")).toBeInTheDocument();
  });

  it("Should not render the toolbar when showToolbar is false", () => {
    render(<GanttChart tasks={tasks} showToolbar={false} />);

    expect(screen.queryByTestId("gantt-toolbar")).not.toBeInTheDocument();
  });

  it("Should change the time scale when a scale button is clicked", () => {
    render(<GanttChart tasks={tasks} />);

    fireEvent.click(screen.getByTestId("gantt-scale-weeks"));

    // Nach dem Wechsel auf Wochen erscheinen KW-Labels im Header.
    expect(screen.getAllByText(/^KW\d+$/).length).toBeGreaterThan(0);
  });

  it("Should initialise the visible date range from defaultRangeStart and defaultRangeEnd", () => {
    render(
      <GanttChart
        tasks={tasks}
        defaultRangeStart={new Date("2024-01-01")}
        defaultRangeEnd={new Date("2026-12-31")}
      />,
    );

    // Der reset-Button muss direkt sichtbar sein, weil ein initialer Bereich gesetzt ist.
    expect(screen.getByTestId("gantt-range-reset")).toBeInTheDocument();
  });

  it("Should render translated labels when translations prop is provided", () => {
    render(
      <GanttChart
        tasks={tasks}
        translations={{ rangeFrom: "From", rangeTo: "To", scaleDays: "Days" }}
      />,
    );

    // TextField rendert Label-Text zweimal (label-Element + sichtbare span)
    expect(screen.getAllByText("From").length).toBeGreaterThan(0);
    expect(screen.getAllByText("To").length).toBeGreaterThan(0);
    expect(screen.getByText("Days")).toBeInTheDocument();
  });

  it("Should show a reset button only after the date range has been customized", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.queryByTestId("gantt-range-reset")).not.toBeInTheDocument();

    const startInput = screen.getByTestId("gantt-range-start");
    fireEvent.change(startInput, { target: { value: "2024-01-01" } });

    expect(screen.getByTestId("gantt-range-reset")).toBeInTheDocument();
  });

  it("Should hide the reset button and restores the auto range after clicking reset", () => {
    render(<GanttChart tasks={tasks} />);

    fireEvent.change(screen.getByTestId("gantt-range-start"), { target: { value: "2024-01-01" } });
    expect(screen.getByTestId("gantt-range-reset")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("gantt-range-reset"));
    expect(screen.queryByTestId("gantt-range-reset")).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Phase 5 — Callback-API
// ---------------------------------------------------------------------------

describe("GanttChart — onAddTask / onDeleteTask", () => {
  it("Should call onAddTask with the task when the add icon is clicked", () => {
    const onAddTask = vi.fn();
    render(<GanttChart tasks={tasks} onAddTask={onAddTask} enableBuiltinDialogs={false} />);

    fireEvent.click(screen.getByTestId("gantt-add-task-root"));

    expect(onAddTask).toHaveBeenCalledOnce();
    expect(onAddTask).toHaveBeenCalledWith(expect.objectContaining({ id: "root" }));
  });

  it("Should call onDeleteTask with the task when the delete icon is clicked", () => {
    const onDeleteTask = vi.fn();
    render(<GanttChart tasks={tasks} onDeleteTask={onDeleteTask} enableBuiltinDialogs={false} />);

    fireEvent.click(screen.getByTestId("gantt-delete-task-child"));

    expect(onDeleteTask).toHaveBeenCalledOnce();
    expect(onDeleteTask).toHaveBeenCalledWith(expect.objectContaining({ id: "child" }));
  });

  it("Should not call onTaskClick when the add icon is clicked", () => {
    const onTaskClick = vi.fn();
    const onAddTask = vi.fn();
    render(<GanttChart tasks={tasks} onTaskClick={onTaskClick} onAddTask={onAddTask} enableBuiltinDialogs={false} />);

    fireEvent.click(screen.getByTestId("gantt-add-task-root"));

    expect(onTaskClick).not.toHaveBeenCalled();
  });
});

describe("GanttChart — onStatusChange", () => {
  it("Should call onStatusChange when a status menu item is clicked", () => {
    const onStatusChange = vi.fn();
    render(<GanttChart tasks={tasks} onStatusChange={onStatusChange} />);

    fireEvent.click(screen.getByTestId("gantt-task-row-child").querySelector(".MuiChip-root")!);
    fireEvent.click(screen.getByText("Done"));

    expect(onStatusChange).toHaveBeenCalledOnce();
    expect(onStatusChange).toHaveBeenCalledWith(
      expect.objectContaining({ id: "child" }),
      "done",
    );
  });
});

// ---------------------------------------------------------------------------
// Phase 9 — Built-in CRUD Dialoge
// ---------------------------------------------------------------------------

describe("GanttChart — enableBuiltinDialogs", () => {
  it("Should show the edit icon by default (enableBuiltinDialogs defaults to true)", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-edit-task-root")).toBeInTheDocument();
  });

  it("Should not show the edit icon when enableBuiltinDialogs is false", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs={false} />);

    expect(screen.queryByTestId("gantt-edit-task-root")).not.toBeInTheDocument();
  });

  it("Should show the edit icon on each row when enableBuiltinDialogs is true", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    expect(screen.getByTestId("gantt-edit-task-root")).toBeInTheDocument();
  });

  it("Should open the add dialog when the add icon is clicked", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    fireEvent.click(screen.getByTestId("gantt-add-task-root"));

    expect(screen.getByTestId("gantt-task-dialog")).toBeInTheDocument();
    expect(screen.getByText("Aufgabe hinzufügen")).toBeInTheDocument();
  });

  it("Should open the edit dialog when the edit icon is clicked", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    fireEvent.click(screen.getByTestId("gantt-edit-task-root"));

    expect(screen.getByTestId("gantt-task-dialog")).toBeInTheDocument();
    expect(screen.getByText("Aufgabe bearbeiten")).toBeInTheDocument();
  });

  it("Should open the delete dialog when the delete icon is clicked", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    fireEvent.click(screen.getByTestId("gantt-delete-task-child"));

    expect(screen.getByTestId("gantt-delete-dialog")).toBeInTheDocument();
  });

  it("Should call onTaskCreated with correct data after submitting the add dialog", () => {
    const onTaskCreated = vi.fn();
    render(<GanttChart tasks={tasks} enableBuiltinDialogs onTaskCreated={onTaskCreated} />);

    fireEvent.click(screen.getByTestId("gantt-add-task-root"));
    fireEvent.change(screen.getByTestId("gantt-dialog-field-name"), { target: { value: "New Task" } });
    fireEvent.click(screen.getByTestId("gantt-dialog-save"));

    expect(onTaskCreated).toHaveBeenCalledOnce();
    expect(onTaskCreated).toHaveBeenCalledWith(
      expect.objectContaining({ name: "New Task", parentId: "root" }),
    );
  });

  it("Should call onTaskUpdated with the updated task after submitting the edit dialog", () => {
    const onTaskUpdated = vi.fn();
    render(<GanttChart tasks={tasks} enableBuiltinDialogs onTaskUpdated={onTaskUpdated} />);

    fireEvent.click(screen.getByTestId("gantt-edit-task-root"));
    fireEvent.change(screen.getByTestId("gantt-dialog-field-name"), { target: { value: "Updated Root" } });
    fireEvent.click(screen.getByTestId("gantt-dialog-save"));

    expect(onTaskUpdated).toHaveBeenCalledOnce();
    expect(onTaskUpdated).toHaveBeenCalledWith(
      expect.objectContaining({ id: "root", name: "Updated Root" }),
    );
  });

  it("Should call onTaskDeleted with the task id after confirming the delete dialog", () => {
    const onTaskDeleted = vi.fn();
    render(<GanttChart tasks={tasks} enableBuiltinDialogs onTaskDeleted={onTaskDeleted} />);

    fireEvent.click(screen.getByTestId("gantt-delete-task-child"));
    fireEvent.click(screen.getByTestId("gantt-dialog-delete-confirm"));

    expect(onTaskDeleted).toHaveBeenCalledOnce();
    expect(onTaskDeleted).toHaveBeenCalledWith("child");
  });

  it("Should not call onTaskDeleted when the delete dialog is cancelled", () => {
    const onTaskDeleted = vi.fn();
    render(<GanttChart tasks={tasks} enableBuiltinDialogs onTaskDeleted={onTaskDeleted} />);

    fireEvent.click(screen.getByTestId("gantt-delete-task-child"));
    fireEvent.click(screen.getByText("Abbrechen"));

    expect(onTaskDeleted).not.toHaveBeenCalled();
  });

  it("Should pre-fill the edit dialog with the task's current name", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    fireEvent.click(screen.getByTestId("gantt-edit-task-root"));

    const nameInput = screen.getByTestId("gantt-dialog-field-name") as HTMLInputElement;
    expect(nameInput.value).toBe("Root Task");
  });

  it("Should reflect the added task in the panel immediately after confirming the add dialog", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    fireEvent.click(screen.getByTestId("gantt-add-task-root"));
    fireEvent.change(screen.getByTestId("gantt-dialog-field-name"), { target: { value: "Brand New Task" } });
    fireEvent.click(screen.getByTestId("gantt-dialog-save"));

    expect(screen.getByText("Brand New Task")).toBeInTheDocument();
  });

  it("Should remove the task from the panel immediately after confirming the delete dialog", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    expect(screen.getByText("Child Task")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("gantt-delete-task-child"));
    fireEvent.click(screen.getByTestId("gantt-dialog-delete-confirm"));

    expect(screen.queryByText("Child Task")).not.toBeInTheDocument();
  });

  it("Should disable the end date field when the milestone checkbox is checked", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    fireEvent.click(screen.getByTestId("gantt-add-task-root"));
    fireEvent.click(screen.getByTestId("gantt-dialog-field-milestone"));

    const endDateInput = screen.getByTestId("gantt-dialog-field-end") as HTMLInputElement;
    expect(endDateInput).toBeDisabled();
  });

  it("Should auto-advance end date when start date is changed to be after end date", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    fireEvent.click(screen.getByTestId("gantt-add-task-root"));

    const startInput = screen.getByTestId("gantt-dialog-field-start") as HTMLInputElement;
    const endInput = screen.getByTestId("gantt-dialog-field-end") as HTMLInputElement;

    // First pin start to an early date so end can be set to a later date.
    fireEvent.change(startInput, { target: { value: "2025-02-01" } });
    fireEvent.change(endInput, { target: { value: "2025-02-15" } });
    // Now advance start past end — end should follow.
    fireEvent.change(startInput, { target: { value: "2025-02-20" } });

    expect(startInput.value).toBe("2025-02-20");
    expect(endInput.value).toBe("2025-02-20");
  });

  it("Should clamp end date to start date when end date is changed to be before start date", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    fireEvent.click(screen.getByTestId("gantt-add-task-root"));

    const startInput = screen.getByTestId("gantt-dialog-field-start") as HTMLInputElement;
    const endInput = screen.getByTestId("gantt-dialog-field-end") as HTMLInputElement;

    fireEvent.change(startInput, { target: { value: "2025-05-01" } });
    fireEvent.change(endInput, { target: { value: "2025-04-01" } });

    expect(endInput.value).toBe("2025-05-01");
  });
});

// ---------------------------------------------------------------------------
// Phase 10 — Progress-Balken + Today-Linie
// ---------------------------------------------------------------------------

describe("GanttChart — progress bar", () => {
  it("Should render a progress bar for a task with progress > 0", () => {
    const progressTasks: GanttTask[] = [
      {
        id: "work",
        name: "Work",
        status: "in-progress",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-03-31"),
        progress: 60,
      },
    ];
    render(<GanttChart tasks={progressTasks} />);

    expect(screen.getByTestId("gantt-progress-work")).toBeInTheDocument();
  });

  it("Should not render a progress bar when progress is undefined", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.queryByTestId("gantt-progress-root")).not.toBeInTheDocument();
  });

  it("Should not render a progress bar when progress is 0", () => {
    const zeroTasks: GanttTask[] = [
      {
        id: "zero",
        name: "Zero",
        status: "planned",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-03-31"),
        progress: 0,
      },
    ];
    render(<GanttChart tasks={zeroTasks} />);

    expect(screen.queryByTestId("gantt-progress-zero")).not.toBeInTheDocument();
  });
});

describe("GanttChart — today line", () => {
  it("Should render the today line when today falls within the timeline range", () => {
    vi.useFakeTimers();
    // tasks-Range mit Puffer: Dez 2024 – Apr 2025 → 2025-02-15 liegt darin.
    vi.setSystemTime(new Date("2025-02-15"));

    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-today-line")).toBeInTheDocument();

    vi.useRealTimers();
  });

  it("Should not render the today line when today is outside the timeline range", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2030-06-01"));

    // Expliziten Bereich setzen damit getTimelineRange das heutige Quartal nicht einschließt.
    render(
      <GanttChart
        tasks={tasks}
        defaultRangeStart={new Date("2025-01-01")}
        defaultRangeEnd={new Date("2025-06-30")}
      />,
    );

    expect(screen.queryByTestId("gantt-today-line")).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// SVG-Abhängigkeitspfeile
// ---------------------------------------------------------------------------

const tasksWithDeps: GanttTask[] = [
  {
    id: "pred",
    name: "Predecessor",
    status: "done",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
  },
  {
    id: "succ",
    name: "Successor",
    status: "planned",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-02-28"),
    dependencies: ["pred"],
  },
];

describe("GanttChart — dependency arrows", () => {
  it("Should render an SVG arrow between two visible tasks", () => {
    render(<GanttChart tasks={tasksWithDeps} />);

    expect(screen.getByTestId("gantt-dep-pred-succ")).toBeInTheDocument();
  });

  it("Should not render an SVG arrow when the predecessor ID does not exist in the task list", () => {
    const tasksMissingDep: GanttTask[] = [
      {
        id: "only",
        name: "Only Task",
        status: "planned",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-01-31"),
        dependencies: ["nonexistent"],
      },
    ];
    render(<GanttChart tasks={tasksMissingDep} />);

    expect(screen.queryByTestId(/^gantt-dep-/)).not.toBeInTheDocument();
  });

  it("Should hide the arrow when the predecessor becomes invisible after collapsing its parent", () => {
    const tasksHiddenDep: GanttTask[] = [
      {
        id: "parent",
        name: "Parent",
        status: "done",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-03-31"),
      },
      {
        id: "hidden-pred",
        parentId: "parent",
        name: "Hidden Pred",
        status: "done",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-01-31"),
      },
      {
        id: "successor",
        name: "Successor",
        status: "planned",
        startDate: new Date("2025-02-01"),
        endDate: new Date("2025-03-31"),
        dependencies: ["hidden-pred"],
      },
    ];
    render(<GanttChart tasks={tasksHiddenDep} />);

    // parent ist aufgeklappt → hidden-pred sichtbar → Pfeil vorhanden
    expect(screen.getByTestId("gantt-dep-hidden-pred-successor")).toBeInTheDocument();

    // parent einklappen → hidden-pred verschwindet → Pfeil ebenfalls weg
    fireEvent.click(screen.getByText("▼"));
    expect(screen.queryByTestId("gantt-dep-hidden-pred-successor")).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Phase 11 — Split-Pane, tabular layout, onTasksChange, onEditTask
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Timeline clipping — Tasks außerhalb des sichtbaren Bereichs
// ---------------------------------------------------------------------------

describe("GanttChart — timeline clipping", () => {
  it("Should not render a bar for a task entirely outside the timeline range", () => {
    render(
      <GanttChart
        tasks={[{
          id: "future",
          name: "Far Future",
          status: "planned",
          startDate: new Date("2030-01-01"),
          endDate: new Date("2030-06-30"),
        }]}
        defaultRangeStart={new Date("2025-01-01")}
        defaultRangeEnd={new Date("2025-12-31")}
      />,
    );
    expect(screen.queryByTestId("gantt-bar-future")).not.toBeInTheDocument();
    // Zeile im Timeline soll trotzdem gerendert werden (Gridlinien + Border)
    expect(screen.getByTestId("gantt-bar-row-future")).toBeInTheDocument();
  });

  it("Should not render a milestone outside the timeline range", () => {
    render(
      <GanttChart
        tasks={[{
          id: "ms-far",
          name: "Far Milestone",
          status: "planned",
          startDate: new Date("2030-06-01"),
          endDate: new Date("2030-06-01"),
          isMilestone: true,
        }]}
        defaultRangeStart={new Date("2025-01-01")}
        defaultRangeEnd={new Date("2025-12-31")}
      />,
    );
    expect(screen.queryByTestId("gantt-milestone-ms-far")).not.toBeInTheDocument();
    expect(screen.getByTestId("gantt-bar-row-ms-far")).toBeInTheDocument();
  });
});

describe("GanttChart — split pane", () => {
  it("Should render the resize divider between panel and timeline", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-panel-divider")).toBeInTheDocument();
  });
});

describe("GanttChart — onTasksChange", () => {
  it("Should call onTasksChange with the updated task list after adding a task", () => {
    const onTasksChange = vi.fn();
    render(<GanttChart tasks={tasks} enableBuiltinDialogs onTasksChange={onTasksChange} />);

    fireEvent.click(screen.getByTestId("gantt-add-task-root"));
    fireEvent.change(screen.getByTestId("gantt-dialog-field-name"), { target: { value: "New Task" } });
    fireEvent.click(screen.getByTestId("gantt-dialog-save"));

    expect(onTasksChange).toHaveBeenCalledOnce();
    const updated = onTasksChange.mock.calls[0][0] as GanttTask[];
    expect(updated.some((t) => t.name === "New Task")).toBe(true);
  });

  it("Should call onTasksChange with the updated task list after updating a task", () => {
    const onTasksChange = vi.fn();
    render(<GanttChart tasks={tasks} enableBuiltinDialogs onTasksChange={onTasksChange} />);

    fireEvent.click(screen.getByTestId("gantt-edit-task-root"));
    fireEvent.change(screen.getByTestId("gantt-dialog-field-name"), { target: { value: "Renamed Root" } });
    fireEvent.click(screen.getByTestId("gantt-dialog-save"));

    expect(onTasksChange).toHaveBeenCalledOnce();
    const updated = onTasksChange.mock.calls[0][0] as GanttTask[];
    expect(updated.some((t) => t.id === "root" && t.name === "Renamed Root")).toBe(true);
  });

  it("Should call onTasksChange with the updated task list after deleting a task", () => {
    const onTasksChange = vi.fn();
    render(<GanttChart tasks={tasks} enableBuiltinDialogs onTasksChange={onTasksChange} />);

    fireEvent.click(screen.getByTestId("gantt-delete-task-child"));
    fireEvent.click(screen.getByTestId("gantt-dialog-delete-confirm"));

    expect(onTasksChange).toHaveBeenCalledOnce();
    const updated = onTasksChange.mock.calls[0][0] as GanttTask[];
    expect(updated.some((t) => t.id === "child")).toBe(false);
  });
});

describe("GanttChart — onEditTask direct callback", () => {
  it("Should call onEditTask with the task when the edit icon is clicked (direct callback mode)", () => {
    const onEditTask = vi.fn();
    render(<GanttChart tasks={tasks} enableBuiltinDialogs={false} onEditTask={onEditTask} />);

    fireEvent.click(screen.getByTestId("gantt-edit-task-root"));

    expect(onEditTask).toHaveBeenCalledOnce();
    expect(onEditTask).toHaveBeenCalledWith(expect.objectContaining({ id: "root" }));
  });

  it("Should not call onTaskClick when the edit icon is clicked in direct callback mode", () => {
    const onTaskClick = vi.fn();
    const onEditTask = vi.fn();
    render(
      <GanttChart tasks={tasks} enableBuiltinDialogs={false} onTaskClick={onTaskClick} onEditTask={onEditTask} />,
    );

    fireEvent.click(screen.getByTestId("gantt-edit-task-root"));

    expect(onTaskClick).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Phase 13 — Heute-Button + Wochenend-Highlight + Zoom
// ---------------------------------------------------------------------------

describe("GanttChart — scroll-to-today button", () => {
  it("Should render the scroll-to-today button in the toolbar", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-scroll-to-today")).toBeInTheDocument();
  });

  it("Should disable the scroll-to-today button when today is outside the timeline range", () => {
    render(
      <GanttChart
        tasks={tasks}
        defaultRangeStart={new Date("2020-01-01")}
        defaultRangeEnd={new Date("2020-12-31")}
      />,
    );

    const btn = screen.getByTestId("gantt-scroll-to-today");
    expect(btn).toBeDisabled();
  });
});

describe("GanttChart — weekend highlight", () => {
  it("Should render weekend strips in the days scale", () => {
    render(<GanttChart tasks={tasks} timeScale="days" />);

    expect(screen.getByTestId("gantt-weekend-strips")).toBeInTheDocument();
  });

  it("Should not render weekend strips in the months scale", () => {
    render(<GanttChart tasks={tasks} timeScale="months" />);

    expect(screen.queryByTestId("gantt-weekend-strips")).not.toBeInTheDocument();
  });
});

describe("GanttChart — zoom (Ctrl+wheel)", () => {
  it("Should change time scale from months to weeks on ctrl+wheel up when zoomable", () => {
    render(<GanttChart tasks={tasks} timeScale="months" zoomable />);

    expect(screen.getByTestId("gantt-scale-months").closest("button")).toHaveAttribute("aria-pressed", "true");

    fireEvent.wheel(screen.getByTestId("gantt-timeline-scroll"), { ctrlKey: true, deltaY: -100 });

    expect(screen.getByTestId("gantt-scale-weeks").closest("button")).toHaveAttribute("aria-pressed", "true");
  });
});

// ---------------------------------------------------------------------------
// Phase 13 — Expand/Collapse All
// ---------------------------------------------------------------------------

describe("GanttChart — expand/collapse all button", () => {
  it("Should render the expand/collapse-all button in the toolbar", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-expand-collapse-all")).toBeInTheDocument();
  });

  it("Should hide child rows after collapsing all when starting fully expanded", () => {
    render(<GanttChart tasks={tasks} initialExpandAll />);

    // Child is visible before collapse
    expect(screen.getByTestId("gantt-bar-row-child")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("gantt-expand-collapse-all"));

    // After collapse-all, child is no longer rendered
    expect(screen.queryByTestId("gantt-bar-row-child")).not.toBeInTheDocument();
  });

  it("Should restore child rows after expanding all following a collapse", () => {
    render(<GanttChart tasks={tasks} initialExpandAll />);

    const btn = screen.getByTestId("gantt-expand-collapse-all");

    // First click: collapse all
    fireEvent.click(btn);
    expect(screen.queryByTestId("gantt-bar-row-child")).not.toBeInTheDocument();

    // Second click: expand all
    fireEvent.click(btn);
    expect(screen.getByTestId("gantt-bar-row-child")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Phase 12 — Drag & Drop: Balken verschieben + Resize
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Toolbar-Konfiguration
// ---------------------------------------------------------------------------

describe("GanttChart — toolbarConfig", () => {
  it("Should hide individual scale buttons via toolbarConfig", () => {
    render(
      <GanttChart
        tasks={tasks}
        toolbarConfig={{ showScaleDays: false, showScaleWeeks: false }}
      />,
    );

    expect(screen.queryByTestId("gantt-scale-days")).not.toBeInTheDocument();
    expect(screen.queryByTestId("gantt-scale-weeks")).not.toBeInTheDocument();
    expect(screen.getByTestId("gantt-scale-months")).toBeInTheDocument();
    expect(screen.getByTestId("gantt-scale-quarters")).toBeInTheDocument();
  });

  it("Should hide expand/collapse button via toolbarConfig", () => {
    render(<GanttChart tasks={tasks} toolbarConfig={{ showExpandCollapseAll: false }} />);

    expect(screen.queryByTestId("gantt-expand-collapse-all")).not.toBeInTheDocument();
  });

  it("Should hide date range inputs via toolbarConfig", () => {
    render(<GanttChart tasks={tasks} toolbarConfig={{ showDateRange: false }} />);

    expect(screen.queryByTestId("gantt-range-start")).not.toBeInTheDocument();
    expect(screen.queryByTestId("gantt-range-end")).not.toBeInTheDocument();
  });

  it("Should show reset-view button and disables it when view is at default", () => {
    render(<GanttChart tasks={tasks} timeScale="months" />);

    const btn = screen.getByTestId("gantt-reset-view");
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });

  it("Should enable reset-view button after time scale changes", () => {
    render(<GanttChart tasks={tasks} timeScale="months" />);

    fireEvent.click(screen.getByTestId("gantt-scale-weeks"));

    expect(screen.getByTestId("gantt-reset-view")).not.toBeDisabled();
  });

  it("Should reset time scale and range after clicking reset-view", () => {
    render(<GanttChart tasks={tasks} timeScale="months" />);

    // Change scale
    fireEvent.click(screen.getByTestId("gantt-scale-weeks"));
    expect(screen.getByTestId("gantt-scale-weeks").closest("button")).toHaveAttribute("aria-pressed", "true");

    // Reset
    fireEvent.click(screen.getByTestId("gantt-reset-view"));
    expect(screen.getByTestId("gantt-scale-months").closest("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("Should hide reset-view button via toolbarConfig", () => {
    render(<GanttChart tasks={tasks} toolbarConfig={{ showResetView: false }} />);

    expect(screen.queryByTestId("gantt-reset-view")).not.toBeInTheDocument();
  });
});

describe("GanttChart — drag (draggable prop)", () => {
  it("Should render bars with grab cursor when draggable=true", () => {
    render(<GanttChart tasks={tasks} draggable />);

    const bar = screen.getByTestId("gantt-bar-root");
    expect(bar).toBeInTheDocument();
    // cursor wird via sx gesetzt — wir prüfen nur dass das Element existiert und kein Fehler auftritt
  });

  it("Should call onTaskMoved after a drag sequence with movement >= 5px", () => {
    const onTaskMoved = vi.fn();
    render(
      <GanttChart
        tasks={tasks}
        draggable
        timeScale="days"
        defaultRangeStart={new Date("2025-01-01")}
        defaultRangeEnd={new Date("2025-12-31")}
        onTaskMoved={onTaskMoved}
      />,
    );

    const bar = screen.getByTestId("gantt-bar-root");

    // Drag: 40px nach rechts (> 5px Schwelle)
    fireEvent.mouseDown(bar, { clientX: 100 });
    fireEvent.mouseMove(document, { clientX: 140 });
    fireEvent.mouseUp(document);

    expect(onTaskMoved).toHaveBeenCalledTimes(1);
    expect(onTaskMoved).toHaveBeenCalledWith(
      expect.objectContaining({ id: "root" }),
      expect.any(Date),
      expect.any(Date),
    );
  });

  // Regression: document-level mousemove/mouseup listeners registered on
  // mousedown were only ever removed inside the mouseup handler itself —
  // unmounting mid-drag (e.g. the row disappears via a collapse or filter)
  // left them attached to `document` forever, leaking memory and continuing
  // to read from a possibly-stale closure on every future mouse move anywhere
  // on the page.
  it("Should remove the document-level drag listeners when unmounted mid-drag", () => {
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");
    const onTaskMoved = vi.fn();
    const { unmount } = render(
      <GanttChart tasks={tasks} draggable onTaskMoved={onTaskMoved} />,
    );

    const bar = screen.getByTestId("gantt-bar-root");
    fireEvent.mouseDown(bar, { clientX: 100 });
    fireEvent.mouseMove(document, { clientX: 140 }); // mid-drag, never reaches mouseup

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith("mouseup", expect.any(Function));

    // Firing the events post-unmount must be a no-op now, not a crash or a
    // callback firing against an unmounted component.
    expect(() => {
      fireEvent.mouseMove(document, { clientX: 200 });
      fireEvent.mouseUp(document);
    }).not.toThrow();
    expect(onTaskMoved).not.toHaveBeenCalled();

    removeEventListenerSpy.mockRestore();
  });

  it("Should not call onTaskMoved when drag movement is below threshold", () => {
    const onTaskMoved = vi.fn();
    render(
      <GanttChart tasks={tasks} draggable onTaskMoved={onTaskMoved} />,
    );

    const bar = screen.getByTestId("gantt-bar-root");

    // Keine Bewegung — nur mouseDown + mouseUp
    fireEvent.mouseDown(bar, { clientX: 100 });
    fireEvent.mouseUp(document);

    expect(onTaskMoved).not.toHaveBeenCalled();
  });
});

describe("GanttChart — onDragStart callback", () => {
  it("Should call onDragStart immediately on mousedown when dragging a bar", () => {
    const onDragStart = vi.fn();
    render(
      <GanttChart
        tasks={tasks}
        draggable
        timeScale="days"
        defaultRangeStart={new Date("2025-01-01")}
        defaultRangeEnd={new Date("2025-12-31")}
        onDragStart={onDragStart}
      />,
    );
    const bar = screen.getByTestId("gantt-bar-root");
    fireEvent.mouseDown(bar, { clientX: 100 });
    expect(onDragStart).toHaveBeenCalledOnce();
    expect(onDragStart).toHaveBeenCalledWith(
      expect.objectContaining({ id: "root" }),
      "move",
    );
    fireEvent.mouseUp(document);
  });

  it("Should call onDragStart with type 'resize' when resizing a bar", () => {
    const onDragStart = vi.fn();
    render(
      <GanttChart
        tasks={tasks}
        resizable
        timeScale="days"
        defaultRangeStart={new Date("2025-01-01")}
        defaultRangeEnd={new Date("2025-12-31")}
        onDragStart={onDragStart}
      />,
    );
    const handle = screen.getByTestId("gantt-resize-handle-root");
    fireEvent.mouseDown(handle, { clientX: 100 });
    expect(onDragStart).toHaveBeenCalledOnce();
    expect(onDragStart).toHaveBeenCalledWith(
      expect.objectContaining({ id: "root" }),
      "resize",
    );
    fireEvent.mouseUp(document);
  });
});

describe("GanttChart — resize (resizable prop)", () => {
  it("Should render resize handles when resizable=true", () => {
    render(<GanttChart tasks={tasks} resizable />);

    expect(screen.getByTestId("gantt-resize-handle-root")).toBeInTheDocument();
  });

  it("Should call onTaskResized after a resize drag", () => {
    const onTaskResized = vi.fn();
    render(
      <GanttChart
        tasks={tasks}
        resizable
        timeScale="days"
        defaultRangeStart={new Date("2025-01-01")}
        defaultRangeEnd={new Date("2025-12-31")}
        onTaskResized={onTaskResized}
      />,
    );

    const handle = screen.getByTestId("gantt-resize-handle-root");

    fireEvent.mouseDown(handle, { clientX: 200 });
    fireEvent.mouseMove(document, { clientX: 240 });
    fireEvent.mouseUp(document);

    expect(onTaskResized).toHaveBeenCalledTimes(1);
    expect(onTaskResized).toHaveBeenCalledWith(
      expect.objectContaining({ id: "root" }),
      expect.any(Date),
    );
  });
});

// ---------------------------------------------------------------------------
// Phase 14 — Inline-Edit, Schnell-Statuswechsel, Fortschritt per Drag
// ---------------------------------------------------------------------------

describe("GanttChart — inlineEdit", () => {
  it("Should show a text field after double-clicking the task name when inlineEdit=true", () => {
    render(<GanttChart tasks={tasks} inlineEdit />);

    fireEvent.dblClick(screen.getByText("Root Task"));

    expect(screen.getByTestId("gantt-inline-edit-root")).toBeInTheDocument();
  });

  it("Should not show a text field on double-click when inlineEdit=false", () => {
    render(<GanttChart tasks={tasks} />);

    fireEvent.dblClick(screen.getByText("Root Task"));

    expect(screen.queryByTestId("gantt-inline-edit-root")).not.toBeInTheDocument();
  });

  it("Should save the new name and hides the field after pressing Enter", () => {
    render(<GanttChart tasks={tasks} inlineEdit />);

    fireEvent.dblClick(screen.getByText("Root Task"));

    const input = screen.getByTestId("gantt-inline-edit-root");
    fireEvent.change(input, { target: { value: "Renamed Root" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.queryByTestId("gantt-inline-edit-root")).not.toBeInTheDocument();
    expect(screen.getByText("Renamed Root")).toBeInTheDocument();
  });

  it("Should cancel editing without saving after pressing Escape", () => {
    render(<GanttChart tasks={tasks} inlineEdit />);

    fireEvent.dblClick(screen.getByText("Root Task"));

    const input = screen.getByTestId("gantt-inline-edit-root");
    fireEvent.change(input, { target: { value: "Should Not Save" } });
    fireEvent.keyDown(input, { key: "Escape" });

    expect(screen.queryByTestId("gantt-inline-edit-root")).not.toBeInTheDocument();
    expect(screen.getByText("Root Task")).toBeInTheDocument();
    expect(screen.queryByText("Should Not Save")).not.toBeInTheDocument();
  });

  it("Should save the new name on blur", () => {
    render(<GanttChart tasks={tasks} inlineEdit />);

    fireEvent.dblClick(screen.getByText("Root Task"));

    const input = screen.getByTestId("gantt-inline-edit-root");
    fireEvent.change(input, { target: { value: "Blur Saved" } });
    fireEvent.blur(input);

    expect(screen.queryByTestId("gantt-inline-edit-root")).not.toBeInTheDocument();
    expect(screen.getByText("Blur Saved")).toBeInTheDocument();
  });

  it("Should call onTasksChange after an inline rename", () => {
    const onTasksChange = vi.fn();
    render(<GanttChart tasks={tasks} inlineEdit onTasksChange={onTasksChange} />);

    fireEvent.dblClick(screen.getByText("Root Task"));
    const input = screen.getByTestId("gantt-inline-edit-root");
    fireEvent.change(input, { target: { value: "Changed" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onTasksChange).toHaveBeenCalledOnce();
    const updated = onTasksChange.mock.calls[0][0] as GanttTask[];
    expect(updated.some((t) => t.id === "root" && t.name === "Changed")).toBe(true);
  });
});

describe("GanttChart — status context menu (right-click on bar)", () => {
  it("Should show a status menu after right-clicking a task bar", () => {
    render(<GanttChart tasks={tasks} />);

    fireEvent.contextMenu(screen.getByTestId("gantt-bar-root"));

    expect(screen.getByTestId("gantt-status-menu-done")).toBeInTheDocument();
  });

  it("Should update the task status after selecting a menu item", () => {
    render(<GanttChart tasks={tasks} />);

    fireEvent.contextMenu(screen.getByTestId("gantt-bar-root"));
    fireEvent.click(screen.getByTestId("gantt-status-menu-done"));

    // Chip der Root-Zeile muss "Done" zeigen — nicht mehr "In Progress"
    const rootRow = screen.getByTestId("gantt-task-row-root");
    expect(rootRow.querySelector(".MuiChip-root")).toHaveTextContent("Done");
    expect(rootRow.querySelector(".MuiChip-root")).not.toHaveTextContent("In Progress");
  });

  it("Should call onStatusChange when a status is selected from the context menu", () => {
    const onStatusChange = vi.fn();
    render(<GanttChart tasks={tasks} onStatusChange={onStatusChange} />);

    fireEvent.contextMenu(screen.getByTestId("gantt-bar-root"));
    fireEvent.click(screen.getByTestId("gantt-status-menu-planned"));

    expect(onStatusChange).toHaveBeenCalledOnce();
    expect(onStatusChange).toHaveBeenCalledWith(
      expect.objectContaining({ id: "root" }),
      "planned",
    );
  });
});

const progressTaskList: GanttTask[] = [
  {
    id: "work",
    name: "Work",
    status: "in-progress",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-03-31"),
    progress: 50,
  },
];

describe("GanttChart — progressDraggable", () => {
  it("Should render a progress handle when progressDraggable=true", () => {
    render(<GanttChart tasks={progressTaskList} progressDraggable />);

    expect(screen.getByTestId("gantt-progress-handle-work")).toBeInTheDocument();
  });

  it("Should not render a progress handle when progressDraggable=false", () => {
    render(<GanttChart tasks={progressTaskList} />);

    expect(screen.queryByTestId("gantt-progress-handle-work")).not.toBeInTheDocument();
  });

  it("Should call onTasksChange with updated progress after a progress drag", () => {
    const onTasksChange = vi.fn();
    render(
      <GanttChart
        tasks={progressTaskList}
        progressDraggable
        timeScale="days"
        defaultRangeStart={new Date("2025-01-01")}
        defaultRangeEnd={new Date("2025-12-31")}
        onTasksChange={onTasksChange}
      />,
    );

    const handle = screen.getByTestId("gantt-progress-handle-work");

    fireEvent.mouseDown(handle, { clientX: 100 });
    fireEvent.mouseMove(document, { clientX: 160 });
    fireEvent.mouseUp(document);

    expect(onTasksChange).toHaveBeenCalledTimes(1);
    const updated = onTasksChange.mock.calls[0][0] as GanttTask[];
    expect(updated[0].progress).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Phase 15 — computeCriticalPath util
// ---------------------------------------------------------------------------

describe("computeCriticalPath", () => {
  it("Should return empty set for an empty task list", () => {
    expect(computeCriticalPath([])).toEqual(new Set());
  });

  it("Should return only the task with the latest end date when there are no dependencies", () => {
    const cpTasks: GanttTask[] = [
      { id: "a", name: "A", status: "planned", startDate: new Date("2025-01-01"), endDate: new Date("2025-01-31") },
      { id: "b", name: "B", status: "planned", startDate: new Date("2025-01-01"), endDate: new Date("2025-03-31") },
    ];
    const result = computeCriticalPath(cpTasks);
    expect(result.has("b")).toBe(true);
    expect(result.has("a")).toBe(false);
  });

  it("Should return the full chain when tasks are sequentially dependent", () => {
    const cpTasks: GanttTask[] = [
      { id: "a", name: "A", status: "planned", startDate: new Date("2025-01-01"), endDate: new Date("2025-01-31") },
      { id: "b", name: "B", status: "planned", startDate: new Date("2025-02-01"), endDate: new Date("2025-02-28"), dependencies: ["a"] },
      { id: "c", name: "C", status: "planned", startDate: new Date("2025-03-01"), endDate: new Date("2025-03-31"), dependencies: ["b"] },
    ];
    const result = computeCriticalPath(cpTasks);
    expect(result.has("a")).toBe(true);
    expect(result.has("b")).toBe(true);
    expect(result.has("c")).toBe(true);
  });

  it("Should include all tasks that can reach the project end, even shorter parallel branches", () => {
    // Both "short" and "long" lead to "final" — both are critical by the "reachability" algorithm.
    // Tasks that contribute nothing to the project end would be excluded.
    const cpTasks: GanttTask[] = [
      { id: "short", name: "Short", status: "planned", startDate: new Date("2025-01-01"), endDate: new Date("2025-01-31") },
      { id: "long", name: "Long",  status: "planned", startDate: new Date("2025-01-01"), endDate: new Date("2025-02-28") },
      { id: "final", name: "Final", status: "planned", startDate: new Date("2025-03-01"), endDate: new Date("2025-03-31"), dependencies: ["short", "long"] },
      { id: "orphan", name: "Orphan", status: "planned", startDate: new Date("2025-01-01"), endDate: new Date("2025-01-15") },
    ];
    const result = computeCriticalPath(cpTasks);
    expect(result.has("short")).toBe(true);
    expect(result.has("long")).toBe(true);
    expect(result.has("final")).toBe(true);
    // "orphan" ends on 2025-01-15, well before the project end — not critical.
    expect(result.has("orphan")).toBe(false);
  });

  it("Should not loop infinitely on circular dependencies", () => {
    const cpTasks: GanttTask[] = [
      { id: "a", name: "A", status: "planned", startDate: new Date("2025-01-01"), endDate: new Date("2025-01-31"), dependencies: ["b"] },
      { id: "b", name: "B", status: "planned", startDate: new Date("2025-01-01"), endDate: new Date("2025-02-28"), dependencies: ["a"] },
    ];
    expect(() => computeCriticalPath(cpTasks)).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// Phase 15 — dialog dependencies field
// ---------------------------------------------------------------------------

const depDialogTasks: GanttTask[] = [
  {
    id: "pred",
    name: "Predecessor",
    status: "done",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
  },
  {
    id: "main",
    name: "Main Task",
    status: "in-progress",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-03-31"),
    dependencies: ["pred"],
  },
];

describe("GanttChart — dialog dependencies", () => {
  it("Should render the dependencies field in the add dialog", () => {
    render(<GanttChart tasks={depDialogTasks} enableBuiltinDialogs />);
    fireEvent.click(screen.getByTestId("gantt-add-task-pred"));
    expect(screen.getByTestId("gantt-dialog-field-dependencies")).toBeInTheDocument();
  });

  it("Should render the dependencies field in the edit dialog", () => {
    render(<GanttChart tasks={depDialogTasks} enableBuiltinDialogs />);
    fireEvent.click(screen.getByTestId("gantt-edit-task-main"));
    expect(screen.getByTestId("gantt-dialog-field-dependencies")).toBeInTheDocument();
  });

  it("Should preserve existing dependencies when saving via edit dialog", () => {
    const onTaskUpdated = vi.fn();
    render(<GanttChart tasks={depDialogTasks} enableBuiltinDialogs onTaskUpdated={onTaskUpdated} />);
    fireEvent.click(screen.getByTestId("gantt-edit-task-main"));
    fireEvent.click(screen.getByTestId("gantt-dialog-save"));
    expect(onTaskUpdated).toHaveBeenCalledOnce();
    const saved = onTaskUpdated.mock.calls[0][0] as GanttTask;
    expect(saved.dependencies).toEqual(["pred"]);
  });

  it("Should not include dependencies on a newly added task by default", () => {
    const onTaskCreated = vi.fn();
    render(<GanttChart tasks={depDialogTasks} enableBuiltinDialogs onTaskCreated={onTaskCreated} />);
    fireEvent.click(screen.getByTestId("gantt-add-task-pred"));
    fireEvent.change(screen.getByTestId("gantt-dialog-field-name"), { target: { value: "New Task" } });
    fireEvent.click(screen.getByTestId("gantt-dialog-save"));
    expect(onTaskCreated).toHaveBeenCalledOnce();
    const created = onTaskCreated.mock.calls[0][0] as GanttTask;
    expect(created.dependencies).toBeUndefined();
  });

  // The testid sits on MUI's hidden, aria-hidden/tabindex=-1 native input (for form
  // value sync) — the actual clickable trigger is the sibling [role="combobox"] div.
  function openDependenciesDropdown() {
    const hiddenInput = screen.getByTestId("gantt-dialog-field-dependencies");
    const combobox = hiddenInput.parentElement!.querySelector('[role="combobox"]')!;
    fireEvent.mouseDown(combobox);
  }

  // Regression: nothing prevented selecting a dependency that already (directly or
  // transitively) depends on the task being edited — a deadlock where both tasks wait
  // on each other. "main" already depends on "pred", so editing "pred" must not offer
  // "main" as a selectable dependency (would close a 2-node cycle).
  it("Should not offer a task that already depends on the edited task as a dependency option (cycle guard)", () => {
    render(<GanttChart tasks={depDialogTasks} enableBuiltinDialogs />);
    fireEvent.click(screen.getByTestId("gantt-edit-task-pred"));
    openDependenciesDropdown();
    expect(screen.getByRole("listbox")).toBeInTheDocument(); // sanity: dropdown actually opened
    expect(screen.queryByRole("option", { name: "Main Task" })).not.toBeInTheDocument();
  });

  it("Should still offer an unrelated task as a dependency option", () => {
    const tasks: GanttTask[] = [
      ...depDialogTasks,
      { id: "other", name: "Other Task", status: "planned", startDate: new Date("2025-04-01"), endDate: new Date("2025-04-30") },
    ];
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);
    fireEvent.click(screen.getByTestId("gantt-edit-task-pred"));
    openDependenciesDropdown();
    expect(screen.getByRole("option", { name: "Other Task" })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Phase 15 — showCriticalPath
// ---------------------------------------------------------------------------

const cpChainTasks: GanttTask[] = [
  {
    id: "cp-a",
    name: "CP Task A",
    status: "planned",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
  },
  {
    id: "cp-b",
    name: "CP Task B",
    status: "planned",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-03-31"),
    dependencies: ["cp-a"],
  },
];

describe("GanttChart — showCriticalPath", () => {
  it("Should render without crashing when showCriticalPath=true", () => {
    render(<GanttChart tasks={cpChainTasks} showCriticalPath />);
    expect(screen.getByTestId("gantt-bar-cp-a")).toBeInTheDocument();
    expect(screen.getByTestId("gantt-bar-cp-b")).toBeInTheDocument();
  });

  it("Should render without crashing when showCriticalPath=false (default)", () => {
    render(<GanttChart tasks={cpChainTasks} />);
    expect(screen.getByTestId("gantt-bar-cp-a")).toBeInTheDocument();
    expect(screen.getByTestId("gantt-bar-cp-b")).toBeInTheDocument();
  });

  it("Should render the component with milestone tasks when showCriticalPath=true", () => {
    const msTask: GanttTask = {
      id: "ms",
      name: "Milestone",
      status: "planned",
      startDate: new Date("2025-04-01"),
      endDate: new Date("2025-04-01"),
      isMilestone: true,
      dependencies: ["cp-b"],
    };
    render(<GanttChart tasks={[...cpChainTasks, msTask]} showCriticalPath />);
    expect(screen.getByTestId("gantt-milestone-ms")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Phase 16 — virtualizeRows
// ---------------------------------------------------------------------------

function buildVirtualTasks(count: number): GanttTask[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `vt-${i}`,
    name: `Task ${i + 1}`,
    status: (["planned", "in-progress", "done", "blocked"] as const)[i % 4],
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-03-31"),
  }));
}

describe("GanttChart — virtualizeRows", () => {
  it("Should render without crashing with virtualizeRows=true and many tasks", () => {
    render(<GanttChart tasks={buildVirtualTasks(300)} virtualizeRows />);
  });

  it("Should render fewer DOM rows than total tasks when virtualizeRows=true (jsdom has clientHeight=0 so only overscan rows are in DOM)", () => {
    const totalTasks = 50;
    render(<GanttChart tasks={buildVirtualTasks(totalTasks)} virtualizeRows />);
    // Overscan=5 → at most 10 rows rendered (5 top + 5 bottom) — far fewer than 50.
    const rows = document.querySelectorAll(".gantt-task-row");
    expect(rows.length).toBeLessThan(totalTasks);
  });

  it("Should render all rows normally when virtualizeRows=false (default)", () => {
    const totalTasks = 20;
    render(<GanttChart tasks={buildVirtualTasks(totalTasks)} />);
    const rows = document.querySelectorAll(".gantt-task-row");
    expect(rows.length).toBe(totalTasks);
  });

  it("Should render the timeline scroll container when virtualizeRows=true", () => {
    // In jsdom the virtualizer may render 0 timeline rows (no layout),
    // so we just verify the scroll container is present and the component doesn't crash.
    render(<GanttChart tasks={buildVirtualTasks(50)} virtualizeRows />);
    expect(screen.getByTestId("gantt-timeline-scroll")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Phase 17 — columnActions header + statusColors + icon Tooltips
// ---------------------------------------------------------------------------

describe("GanttChart — columnActions header", () => {
  it("Should show 'Aktionen' label in the panel header when actions column is visible", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);
    expect(screen.getByText("Aktionen")).toBeInTheDocument();
  });

  it("Should show custom columnActions label from translations", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs translations={{ columnActions: "Actions" }} />);
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("Should not show actions header when no action callbacks are present", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs={false} />);
    expect(screen.queryByText("Aktionen")).not.toBeInTheDocument();
  });
});

describe("GanttChart — statusColors prop", () => {
  it("Should render without crashing when custom statusColors are provided", () => {
    render(
      <GanttChart
        tasks={tasks}
        statusColors={{ planned: "#7c3aed", "in-progress": "#0ea5e9", done: "#16a34a", blocked: "#dc2626" }}
      />,
    );
    expect(screen.getByTestId("gantt-bar-root")).toBeInTheDocument();
  });

  it("Should render without crashing with partial statusColors (only one status overridden)", () => {
    render(<GanttChart tasks={tasks} statusColors={{ done: "#ff0000" }} />);
    expect(screen.getByTestId("gantt-bar-root")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Phase 18 — ganttTheme + GanttTask.color
// ---------------------------------------------------------------------------

describe("GanttChart — ganttTheme prop", () => {
  it("Should render without crashing with a full ganttTheme", () => {
    render(
      <GanttChart
        tasks={tasks}
        ganttTheme={{
          statusColors: { planned: "#7c3aed", "in-progress": "#0ea5e9", done: "#16a34a", blocked: "#dc2626" },
          criticalPathColor: "#ff6b35",
          milestoneColor: "#7c3aed",
          todayLineColor: "#ff6b35",
          weekendColor: "rgba(124,58,237,0.06)",
          barBorderRadius: 8,
        }}
      />,
    );
    expect(screen.getByTestId("gantt-bar-root")).toBeInTheDocument();
  });

  it("Should show that ganttTheme.statusColors overrides the top-level statusColors prop", () => {
    // Both props set "planned" — ganttTheme wins. Component must not crash.
    render(
      <GanttChart
        tasks={tasks}
        statusColors={{ planned: "#aaaaaa" }}
        ganttTheme={{ statusColors: { planned: "#7c3aed" } }}
      />,
    );
    expect(screen.getByTestId("gantt-bar-root")).toBeInTheDocument();
  });

  it("Should render criticalPathColor without crashing when showCriticalPath=true", () => {
    render(
      <GanttChart
        tasks={tasks}
        showCriticalPath
        ganttTheme={{ criticalPathColor: "#ff6b35" }}
      />,
    );
    expect(screen.getByTestId("gantt-bar-root")).toBeInTheDocument();
  });

  it("Should render partial ganttTheme (only barBorderRadius) without crashing", () => {
    render(<GanttChart tasks={tasks} ganttTheme={{ barBorderRadius: 0 }} />);
    expect(screen.getByTestId("gantt-bar-root")).toBeInTheDocument();
  });
});

describe("GanttChart — GanttTask.color", () => {
  it("Should render without crashing when a task has a custom color", () => {
    const coloredTasks = tasks.map((t) => (t.id === "root" ? { ...t, color: "#e11d48" } : t));
    render(<GanttChart tasks={coloredTasks} />);
    expect(screen.getByTestId("gantt-bar-root")).toBeInTheDocument();
  });

  it("Should render without crashing when only some tasks have a custom color", () => {
    const mixed = [
      { ...tasks[0], color: "#e11d48" },
      tasks[1],
      tasks[2],
    ];
    render(<GanttChart tasks={mixed} />);
    expect(screen.getByTestId("gantt-task-row-root")).toBeInTheDocument();
    expect(screen.getByTestId("gantt-task-row-child")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Phase 21 — Dialog progress field (⭐ since v3.16.0)
// ---------------------------------------------------------------------------

describe("GanttChart — dialog progress field", () => {
  const taskWithProgress: GanttTask = {
    id: "prog",
    name: "Progress Task",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-03-15"),
    status: "in-progress",
    progress: 60,
  };

  it("Should render the progress slider in the add dialog", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);
    fireEvent.click(screen.getByTestId("gantt-add-task-root"));
    expect(screen.getByTestId("gantt-dialog-field-progress-wrapper")).toBeInTheDocument();
  });

  it("Should pre-fill the progress slider with the task's current progress in the edit dialog", () => {
    render(<GanttChart tasks={[taskWithProgress]} enableBuiltinDialogs />);
    fireEvent.click(screen.getByTestId("gantt-edit-task-prog"));
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "60");
  });

  it("Should reset progress to 0 when the milestone checkbox is toggled on", () => {
    // When a task has progress and is then marked as a milestone, progress must reset to 0
    // because milestones are point-in-time events with no progress bar.
    render(<GanttChart tasks={[taskWithProgress]} enableBuiltinDialogs />);
    fireEvent.click(screen.getByTestId("gantt-edit-task-prog"));
    // Pre-filled at 60 — verify before toggling
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "60");
    fireEvent.click(screen.getByTestId("gantt-dialog-field-milestone"));
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "0");
  });

  it("Should include the pre-filled progress value when saving the edit dialog without changes", () => {
    const onTaskUpdated = vi.fn();
    render(
      <GanttChart
        tasks={[taskWithProgress]}
        enableBuiltinDialogs
        onTaskUpdated={onTaskUpdated}
      />,
    );
    fireEvent.click(screen.getByTestId("gantt-edit-task-prog"));
    fireEvent.click(screen.getByTestId("gantt-dialog-save"));
    expect(onTaskUpdated).toHaveBeenCalledOnce();
    expect(onTaskUpdated).toHaveBeenCalledWith(
      expect.objectContaining({ id: "prog", progress: 60 }),
    );
  });
});

describe("GanttChart — assignee filter", () => {
  const assigneeTasks: GanttTask[] = [
    {
      id: "parent",
      name: "Parent Task",
      status: "in-progress",
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-03-31"),
    },
    {
      id: "alice-task",
      parentId: "parent",
      name: "Alice Task",
      assignee: "Alice",
      status: "planned",
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-31"),
    },
    {
      id: "bob-task",
      name: "Bob Task",
      assignee: "Bob",
      status: "planned",
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-02-28"),
    },
  ];

  // Mirrors the pattern from the dependencies-dropdown tests: testid is on MUI's hidden
  // native input, so we navigate up to the combobox trigger to open the dropdown.
  function openAssigneeFilter() {
    const hiddenInput = screen.getByTestId("gantt-assignee-filter");
    const combobox = hiddenInput.parentElement!.querySelector('[role="combobox"]')!;
    fireEvent.mouseDown(combobox);
  }

  it("Should render the assignee filter dropdown when showAssigneeFilter is true and tasks have assignees", () => {
    render(<GanttChart tasks={assigneeTasks} toolbarConfig={{ showAssigneeFilter: true }} />);
    expect(screen.getByTestId("gantt-assignee-filter")).toBeInTheDocument();
  });

  it("Should not render the assignee filter when showAssigneeFilter is false (default)", () => {
    render(<GanttChart tasks={assigneeTasks} />);
    expect(screen.queryByTestId("gantt-assignee-filter")).not.toBeInTheDocument();
  });

  it("Should show only matching tasks and their ancestors when an assignee is selected", () => {
    render(<GanttChart tasks={assigneeTasks} toolbarConfig={{ showAssigneeFilter: true }} />);
    openAssigneeFilter();
    fireEvent.click(screen.getByRole("option", { name: "Alice" }));
    expect(screen.getByText("Alice Task")).toBeInTheDocument();
    // Ancestor of alice-task is shown even though its own assignee is unset
    expect(screen.getByText("Parent Task")).toBeInTheDocument();
    // Bob has no matching descendant — excluded
    expect(screen.queryByText("Bob Task")).not.toBeInTheDocument();
  });

  it("Should show all tasks again when the 'Alle' option is selected after filtering", () => {
    render(<GanttChart tasks={assigneeTasks} toolbarConfig={{ showAssigneeFilter: true }} />);
    openAssigneeFilter();
    fireEvent.click(screen.getByRole("option", { name: "Alice" }));
    expect(screen.queryByText("Bob Task")).not.toBeInTheDocument();
    openAssigneeFilter();
    fireEvent.click(screen.getByRole("option", { name: "Alle" }));
    expect(screen.getByText("Bob Task")).toBeInTheDocument();
    expect(screen.getByText("Alice Task")).toBeInTheDocument();
    expect(screen.getByText("Parent Task")).toBeInTheDocument();
  });

  it("Should enable the reset-view button when an assignee filter is active", () => {
    render(
      <GanttChart
        tasks={assigneeTasks}
        toolbarConfig={{ showAssigneeFilter: true, showResetView: true }}
      />,
    );
    // Initially disabled — nothing changed
    expect(screen.getByTestId("gantt-reset-view")).toBeDisabled();

    openAssigneeFilter();
    fireEvent.click(screen.getByRole("option", { name: "Alice" }));

    // Filter is active → reset-view must become enabled
    expect(screen.getByTestId("gantt-reset-view")).not.toBeDisabled();
  });

  it("Should clear the assignee filter when reset-view is clicked", () => {
    render(
      <GanttChart
        tasks={assigneeTasks}
        toolbarConfig={{ showAssigneeFilter: true, showResetView: true }}
      />,
    );
    openAssigneeFilter();
    fireEvent.click(screen.getByRole("option", { name: "Alice" }));
    expect(screen.queryByText("Bob Task")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("gantt-reset-view"));

    // All tasks visible again → filter was cleared
    expect(screen.getByText("Bob Task")).toBeInTheDocument();
    expect(screen.getByText("Alice Task")).toBeInTheDocument();
    // Reset-view button is disabled again
    expect(screen.getByTestId("gantt-reset-view")).toBeDisabled();
  });
});
