import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GanttChart } from "./GanttChart";
import type { GanttTask } from "./GanttChart.types";

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
  it("renders without crashing", () => {
    render(<GanttChart tasks={tasks} />);
  });

  it("shows root and all direct children since root is expanded by default", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByText("Root Task")).toBeInTheDocument();
    expect(screen.getByText("Child Task")).toBeInTheDocument();
    expect(screen.getByText("Sprint End")).toBeInTheDocument();
  });

  it("hides child tasks after collapsing the parent", () => {
    render(<GanttChart tasks={tasks} />);

    fireEvent.click(screen.getByText("▼"));

    expect(screen.queryByText("Child Task")).not.toBeInTheDocument();
    expect(screen.queryByText("Sprint End")).not.toBeInTheDocument();
  });

  it("shows child tasks again after re-expanding the parent", () => {
    render(<GanttChart tasks={tasks} />);

    fireEvent.click(screen.getByText("▼"));
    fireEvent.click(screen.getByText("▶"));

    expect(screen.getByText("Child Task")).toBeInTheDocument();
  });

  it("calls onTaskClick when a task row is clicked", () => {
    const onTaskClick = vi.fn();
    render(<GanttChart tasks={tasks} onTaskClick={onTaskClick} />);

    fireEvent.click(screen.getByTestId("gantt-task-row-child"));

    expect(onTaskClick).toHaveBeenCalledOnce();
    expect(onTaskClick).toHaveBeenCalledWith(expect.objectContaining({ id: "child" }));
  });

  it("calls onMilestoneClick when a milestone diamond is clicked", () => {
    const onMilestoneClick = vi.fn();
    render(<GanttChart tasks={tasks} onMilestoneClick={onMilestoneClick} />);

    fireEvent.click(screen.getByTestId("gantt-milestone-milestone"));

    expect(onMilestoneClick).toHaveBeenCalledOnce();
    expect(onMilestoneClick).toHaveBeenCalledWith(expect.objectContaining({ id: "milestone" }));
  });

  it("renders a bar for each non-milestone visible task", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-bar-root")).toBeInTheDocument();
    expect(screen.getByTestId("gantt-bar-child")).toBeInTheDocument();
  });

  it("renders a milestone diamond instead of a bar for milestone tasks", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-milestone-milestone")).toBeInTheDocument();
    expect(screen.queryByTestId("gantt-bar-milestone")).not.toBeInTheDocument();
  });

  it("does not show bar rows for hidden (collapsed) children", () => {
    render(<GanttChart tasks={tasks} />);

    fireEvent.click(screen.getByText("▼"));

    expect(screen.queryByTestId("gantt-bar-child")).not.toBeInTheDocument();
    expect(screen.queryByTestId("gantt-milestone-milestone")).not.toBeInTheDocument();
  });

  it("renders a status chip for each visible task row", () => {
    render(<GanttChart tasks={tasks} />);

    // "In Progress" für root (status = "in-progress"), "Planned" für child und milestone
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getAllByText("Planned")).toHaveLength(2);
  });

  it("renders the weeks scale header with KW labels", () => {
    render(<GanttChart tasks={tasks} timeScale="weeks" />);

    const kwLabels = screen.getAllByText(/^KW\d+$/);
    expect(kwLabels.length).toBeGreaterThan(0);
  });

  it("renders the days scale header with day number labels and a two-row header", () => {
    render(<GanttChart tasks={tasks} timeScale="days" />);

    // Tages-Spalten zeigen Zahlen 1–31 — "15" muss für jeden Monat im Range vorhanden sein
    const fifteenLabels = screen.getAllByText("15");
    expect(fifteenLabels.length).toBeGreaterThan(0);

    // Monatsgruppen der oberen Zeile sind sichtbar (Jan–Mär 2025 aus den Test-Tasks)
    const monthLabels = screen.getAllByText(/^(Jan|Feb|März|Apr|Mai|Jun|Jul|Aug|Sep|Okt|Nov|Dez)/);
    expect(monthLabels.length).toBeGreaterThan(0);
  });

  it("shows all tasks at all depths when initialExpandAll is true", () => {
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
  it("renders the toolbar by default", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-toolbar")).toBeInTheDocument();
  });

  it("does not render the toolbar when showToolbar is false", () => {
    render(<GanttChart tasks={tasks} showToolbar={false} />);

    expect(screen.queryByTestId("gantt-toolbar")).not.toBeInTheDocument();
  });

  it("changes the time scale when a scale button is clicked", () => {
    render(<GanttChart tasks={tasks} />);

    fireEvent.click(screen.getByTestId("gantt-scale-weeks"));

    // Nach dem Wechsel auf Wochen erscheinen KW-Labels im Header.
    expect(screen.getAllByText(/^KW\d+$/).length).toBeGreaterThan(0);
  });

  it("initialises the visible date range from defaultRangeStart and defaultRangeEnd", () => {
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

  it("renders translated labels when translations prop is provided", () => {
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

  it("shows a reset button only after the date range has been customized", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.queryByTestId("gantt-range-reset")).not.toBeInTheDocument();

    const startInput = screen.getByTestId("gantt-range-start");
    fireEvent.change(startInput, { target: { value: "2024-01-01" } });

    expect(screen.getByTestId("gantt-range-reset")).toBeInTheDocument();
  });

  it("hides the reset button and restores the auto range after clicking reset", () => {
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
  it("calls onAddTask with the task when the add icon is clicked", () => {
    const onAddTask = vi.fn();
    render(<GanttChart tasks={tasks} onAddTask={onAddTask} enableBuiltinDialogs={false} />);

    fireEvent.click(screen.getByTestId("gantt-add-task-root"));

    expect(onAddTask).toHaveBeenCalledOnce();
    expect(onAddTask).toHaveBeenCalledWith(expect.objectContaining({ id: "root" }));
  });

  it("calls onDeleteTask with the task when the delete icon is clicked", () => {
    const onDeleteTask = vi.fn();
    render(<GanttChart tasks={tasks} onDeleteTask={onDeleteTask} enableBuiltinDialogs={false} />);

    fireEvent.click(screen.getByTestId("gantt-delete-task-child"));

    expect(onDeleteTask).toHaveBeenCalledOnce();
    expect(onDeleteTask).toHaveBeenCalledWith(expect.objectContaining({ id: "child" }));
  });

  it("does not call onTaskClick when the add icon is clicked", () => {
    const onTaskClick = vi.fn();
    const onAddTask = vi.fn();
    render(<GanttChart tasks={tasks} onTaskClick={onTaskClick} onAddTask={onAddTask} enableBuiltinDialogs={false} />);

    fireEvent.click(screen.getByTestId("gantt-add-task-root"));

    expect(onTaskClick).not.toHaveBeenCalled();
  });
});

describe("GanttChart — onStatusChange", () => {
  it("calls onStatusChange when a status menu item is clicked", () => {
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
  it("shows the edit icon by default (enableBuiltinDialogs defaults to true)", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-edit-task-root")).toBeInTheDocument();
  });

  it("does not show the edit icon when enableBuiltinDialogs is false", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs={false} />);

    expect(screen.queryByTestId("gantt-edit-task-root")).not.toBeInTheDocument();
  });

  it("shows the edit icon on each row when enableBuiltinDialogs is true", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    expect(screen.getByTestId("gantt-edit-task-root")).toBeInTheDocument();
  });

  it("opens the add dialog when the add icon is clicked", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    fireEvent.click(screen.getByTestId("gantt-add-task-root"));

    expect(screen.getByTestId("gantt-task-dialog")).toBeInTheDocument();
    expect(screen.getByText("Aufgabe hinzufügen")).toBeInTheDocument();
  });

  it("opens the edit dialog when the edit icon is clicked", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    fireEvent.click(screen.getByTestId("gantt-edit-task-root"));

    expect(screen.getByTestId("gantt-task-dialog")).toBeInTheDocument();
    expect(screen.getByText("Aufgabe bearbeiten")).toBeInTheDocument();
  });

  it("opens the delete dialog when the delete icon is clicked", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    fireEvent.click(screen.getByTestId("gantt-delete-task-child"));

    expect(screen.getByTestId("gantt-delete-dialog")).toBeInTheDocument();
  });

  it("calls onTaskCreated with correct data after submitting the add dialog", () => {
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

  it("calls onTaskUpdated with the updated task after submitting the edit dialog", () => {
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

  it("calls onTaskDeleted with the task id after confirming the delete dialog", () => {
    const onTaskDeleted = vi.fn();
    render(<GanttChart tasks={tasks} enableBuiltinDialogs onTaskDeleted={onTaskDeleted} />);

    fireEvent.click(screen.getByTestId("gantt-delete-task-child"));
    fireEvent.click(screen.getByTestId("gantt-dialog-delete-confirm"));

    expect(onTaskDeleted).toHaveBeenCalledOnce();
    expect(onTaskDeleted).toHaveBeenCalledWith("child");
  });

  it("does not call onTaskDeleted when the delete dialog is cancelled", () => {
    const onTaskDeleted = vi.fn();
    render(<GanttChart tasks={tasks} enableBuiltinDialogs onTaskDeleted={onTaskDeleted} />);

    fireEvent.click(screen.getByTestId("gantt-delete-task-child"));
    fireEvent.click(screen.getByText("Abbrechen"));

    expect(onTaskDeleted).not.toHaveBeenCalled();
  });

  it("pre-fills the edit dialog with the task's current name", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    fireEvent.click(screen.getByTestId("gantt-edit-task-root"));

    const nameInput = screen.getByTestId("gantt-dialog-field-name") as HTMLInputElement;
    expect(nameInput.value).toBe("Root Task");
  });

  it("reflects the added task in the panel immediately after confirming the add dialog", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    fireEvent.click(screen.getByTestId("gantt-add-task-root"));
    fireEvent.change(screen.getByTestId("gantt-dialog-field-name"), { target: { value: "Brand New Task" } });
    fireEvent.click(screen.getByTestId("gantt-dialog-save"));

    expect(screen.getByText("Brand New Task")).toBeInTheDocument();
  });

  it("removes the task from the panel immediately after confirming the delete dialog", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    expect(screen.getByText("Child Task")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("gantt-delete-task-child"));
    fireEvent.click(screen.getByTestId("gantt-dialog-delete-confirm"));

    expect(screen.queryByText("Child Task")).not.toBeInTheDocument();
  });

  it("disables the end date field when the milestone checkbox is checked", () => {
    render(<GanttChart tasks={tasks} enableBuiltinDialogs />);

    fireEvent.click(screen.getByTestId("gantt-add-task-root"));
    fireEvent.click(screen.getByTestId("gantt-dialog-field-milestone"));

    const endDateInput = screen.getByTestId("gantt-dialog-field-end") as HTMLInputElement;
    expect(endDateInput).toBeDisabled();
  });

  it("auto-advances end date when start date is changed to be after end date", () => {
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

  it("clamps end date to start date when end date is changed to be before start date", () => {
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
  it("renders a progress bar for a task with progress > 0", () => {
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

  it("does not render a progress bar when progress is undefined", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.queryByTestId("gantt-progress-root")).not.toBeInTheDocument();
  });

  it("does not render a progress bar when progress is 0", () => {
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
  it("renders the today line when today falls within the timeline range", () => {
    vi.useFakeTimers();
    // tasks-Range mit Puffer: Dez 2024 – Apr 2025 → 2025-02-15 liegt darin.
    vi.setSystemTime(new Date("2025-02-15"));

    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-today-line")).toBeInTheDocument();

    vi.useRealTimers();
  });

  it("does not render the today line when today is outside the timeline range", () => {
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
  it("renders an SVG arrow between two visible tasks", () => {
    render(<GanttChart tasks={tasksWithDeps} />);

    expect(screen.getByTestId("gantt-dep-pred-succ")).toBeInTheDocument();
  });

  it("does not render an SVG arrow when the predecessor ID does not exist in the task list", () => {
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

  it("hides the arrow when the predecessor becomes invisible after collapsing its parent", () => {
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
  it("does not render a bar for a task entirely outside the timeline range", () => {
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

  it("does not render a milestone outside the timeline range", () => {
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
  it("renders the resize divider between panel and timeline", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-panel-divider")).toBeInTheDocument();
  });
});

describe("GanttChart — onTasksChange", () => {
  it("calls onTasksChange with the updated task list after adding a task", () => {
    const onTasksChange = vi.fn();
    render(<GanttChart tasks={tasks} enableBuiltinDialogs onTasksChange={onTasksChange} />);

    fireEvent.click(screen.getByTestId("gantt-add-task-root"));
    fireEvent.change(screen.getByTestId("gantt-dialog-field-name"), { target: { value: "New Task" } });
    fireEvent.click(screen.getByTestId("gantt-dialog-save"));

    expect(onTasksChange).toHaveBeenCalledOnce();
    const updated = onTasksChange.mock.calls[0][0] as GanttTask[];
    expect(updated.some((t) => t.name === "New Task")).toBe(true);
  });

  it("calls onTasksChange with the updated task list after updating a task", () => {
    const onTasksChange = vi.fn();
    render(<GanttChart tasks={tasks} enableBuiltinDialogs onTasksChange={onTasksChange} />);

    fireEvent.click(screen.getByTestId("gantt-edit-task-root"));
    fireEvent.change(screen.getByTestId("gantt-dialog-field-name"), { target: { value: "Renamed Root" } });
    fireEvent.click(screen.getByTestId("gantt-dialog-save"));

    expect(onTasksChange).toHaveBeenCalledOnce();
    const updated = onTasksChange.mock.calls[0][0] as GanttTask[];
    expect(updated.some((t) => t.id === "root" && t.name === "Renamed Root")).toBe(true);
  });

  it("calls onTasksChange with the updated task list after deleting a task", () => {
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
  it("calls onEditTask with the task when the edit icon is clicked (direct callback mode)", () => {
    const onEditTask = vi.fn();
    render(<GanttChart tasks={tasks} enableBuiltinDialogs={false} onEditTask={onEditTask} />);

    fireEvent.click(screen.getByTestId("gantt-edit-task-root"));

    expect(onEditTask).toHaveBeenCalledOnce();
    expect(onEditTask).toHaveBeenCalledWith(expect.objectContaining({ id: "root" }));
  });

  it("does not call onTaskClick when the edit icon is clicked in direct callback mode", () => {
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
  it("renders the scroll-to-today button in the toolbar", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-scroll-to-today")).toBeInTheDocument();
  });

  it("disables the scroll-to-today button when today is outside the timeline range", () => {
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
  it("renders weekend strips in the days scale", () => {
    render(<GanttChart tasks={tasks} timeScale="days" />);

    expect(screen.getByTestId("gantt-weekend-strips")).toBeInTheDocument();
  });

  it("does not render weekend strips in the months scale", () => {
    render(<GanttChart tasks={tasks} timeScale="months" />);

    expect(screen.queryByTestId("gantt-weekend-strips")).not.toBeInTheDocument();
  });
});

describe("GanttChart — zoom (Ctrl+wheel)", () => {
  it("changes time scale from months to weeks on ctrl+wheel up when zoomable", () => {
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
  it("renders the expand/collapse-all button in the toolbar", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-expand-collapse-all")).toBeInTheDocument();
  });

  it("hides child rows after collapsing all when starting fully expanded", () => {
    render(<GanttChart tasks={tasks} initialExpandAll />);

    // Child is visible before collapse
    expect(screen.getByTestId("gantt-bar-row-child")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("gantt-expand-collapse-all"));

    // After collapse-all, child is no longer rendered
    expect(screen.queryByTestId("gantt-bar-row-child")).not.toBeInTheDocument();
  });

  it("restores child rows after expanding all following a collapse", () => {
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
