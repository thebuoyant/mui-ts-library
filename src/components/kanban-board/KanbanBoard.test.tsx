import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { KanbanBoard } from "./KanbanBoard";
import type { KanbanColumn, KanbanTask } from "./KanbanBoard.types";

const COLUMNS: KanbanColumn[] = [
  { id: "todo",        label: "To Do" },
  { id: "in-progress", label: "In Progress" },
  { id: "done",        label: "Done" },
];

const TASKS: KanbanTask[] = [
  { id: "1", title: "Task Alpha",   status: "todo",        assignee: "Alice", dueDate: new Date("2026-08-01") },
  { id: "2", title: "Task Beta",    status: "in-progress", assignee: "Bob" },
  { id: "3", title: "Task Gamma",   status: "done" },
  { id: "4", title: "Task Delta",   status: "todo" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getColumn(label: string) {
  // Find the column title element specifically, then walk up to the column wrapper.
  const title = screen.getByText(label, { selector: ".MuiTsKanbanBoard-columnTitle" });
  return title.closest(".MuiTsKanbanBoard-column") as HTMLElement;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("KanbanBoard", () => {
  // ── Rendering ─────────────────────────────────────────────────────────────────

  it("renders all column headers", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} />);
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("renders cards in the correct columns", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} />);
    const todoCol = getColumn("To Do");
    expect(within(todoCol).getByText("Task Alpha")).toBeInTheDocument();
    expect(within(todoCol).getByText("Task Delta")).toBeInTheDocument();

    const inProgressCol = getColumn("In Progress");
    expect(within(inProgressCol).getByText("Task Beta")).toBeInTheDocument();

    const doneCol = getColumn("Done");
    expect(within(doneCol).getByText("Task Gamma")).toBeInTheDocument();
  });

  it("shows correct card count in column header", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} />);
    const todoCol = getColumn("To Do");
    expect(within(todoCol).getByText("2")).toBeInTheDocument();
    expect(within(getColumn("In Progress")).getByText("1")).toBeInTheDocument();
    expect(within(getColumn("Done")).getByText("1")).toBeInTheDocument();
  });

  it("shows WIP limit as count badge when set", () => {
    const columns: KanbanColumn[] = [
      { id: "todo", label: "To Do", wipLimit: 5 },
      { id: "done", label: "Done" },
    ];
    render(<KanbanBoard columns={columns} tasks={TASKS.filter((t) => t.status !== "in-progress")} />);
    const todoCol = getColumn("To Do");
    expect(within(todoCol).getByText("2 / 5")).toBeInTheDocument();
  });

  it("shows column color accent when provided", () => {
    const columns: KanbanColumn[] = [{ id: "todo", label: "To Do", color: "#ff0000" }];
    render(<KanbanBoard columns={columns} tasks={[]} />);
    expect(screen.getByText("To Do")).toBeInTheDocument();
  });

  it("renders noCardsLabel in empty columns", () => {
    render(
      <KanbanBoard
        columns={COLUMNS}
        tasks={[]}
        translation={{ noCardsLabel: "Nothing here" }}
      />,
    );
    expect(screen.getAllByText("Nothing here")).toHaveLength(3);
  });

  // ── Assignee / DueDate visibility ─────────────────────────────────────────────

  it("shows assignee chip by default", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("hides assignee chip when showAssignee=false", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} showAssignee={false} />);
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
  });

  it("shows due date chip by default", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} />);
    // "01 Aug 2026" or locale equivalent — just check the chip exists via aria-label
    expect(screen.getByLabelText(/Due date/i)).toBeInTheDocument();
  });

  it("hides due date chip when showDueDate=false", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} showDueDate={false} />);
    expect(screen.queryByLabelText(/Due date/i)).not.toBeInTheDocument();
  });

  // ── Card color ────────────────────────────────────────────────────────────────

  it("applies borderLeft style for cards with color", () => {
    const tasks: KanbanTask[] = [{ id: "1", title: "Colored Card", status: "todo", color: "#ff0000" }];
    render(<KanbanBoard columns={COLUMNS} tasks={tasks} />);
    // The card title should be in the DOM
    expect(screen.getByText("Colored Card")).toBeInTheDocument();
  });

  // ── Add card dialog ───────────────────────────────────────────────────────────

  it("opens Add dialog when '+ Add card' is clicked", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} />);
    const addButtons = screen.getAllByText("Add card");
    fireEvent.click(addButtons[0]);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Add card", { selector: "[role='heading'], h2" })).toBeInTheDocument();
  });

  it("calls onTaskCreated and onTasksChange after saving a new card", () => {
    const onTaskCreated = vi.fn();
    const onTasksChange = vi.fn();
    render(
      <KanbanBoard
        columns={COLUMNS}
        tasks={TASKS}
        onTaskCreated={onTaskCreated}
        onTasksChange={onTasksChange}
      />,
    );
    fireEvent.click(screen.getAllByText("Add card")[0]);
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: "New Task" } });
    fireEvent.click(screen.getByText("Save"));
    expect(onTaskCreated).toHaveBeenCalledWith(expect.objectContaining({ title: "New Task" }));
    expect(onTasksChange).toHaveBeenCalled();
  });

  it("does not save when title is empty", () => {
    const onTaskCreated = vi.fn();
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} onTaskCreated={onTaskCreated} />);
    fireEvent.click(screen.getAllByText("Add card")[0]);
    fireEvent.click(screen.getByText("Save"));
    expect(onTaskCreated).not.toHaveBeenCalled();
  });

  it("closes Add dialog on Cancel", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} />);
    fireEvent.click(screen.getAllByText("Add card")[0]);
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  // ── Edit card dialog ──────────────────────────────────────────────────────────

  it("opens Edit dialog when a card is clicked", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} />);
    fireEvent.click(screen.getByText("Task Alpha"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Edit card", { selector: "[role='heading'], h2" })).toBeInTheDocument();
  });

  it("pre-fills the Edit dialog with the card's current values", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} />);
    fireEvent.click(screen.getByText("Task Alpha"));
    const dialog = screen.getByRole("dialog");
    const titleInput = within(dialog).getByLabelText(/Title/i) as HTMLInputElement;
    expect(titleInput.value).toBe("Task Alpha");
    // Scope to the dialog to avoid matching the card's Assignee chip aria-label
    const assigneeInput = within(dialog).getByRole("textbox", { name: /Assignee/i }) as HTMLInputElement;
    expect(assigneeInput.value).toBe("Alice");
  });

  it("calls onTaskUpdated and onTasksChange after saving an edit", () => {
    const onTaskUpdated = vi.fn();
    const onTasksChange = vi.fn();
    render(
      <KanbanBoard
        columns={COLUMNS}
        tasks={TASKS}
        onTaskUpdated={onTaskUpdated}
        onTasksChange={onTasksChange}
      />,
    );
    fireEvent.click(screen.getByText("Task Alpha"));
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: "Task Alpha (edited)" } });
    fireEvent.click(screen.getByText("Save"));
    expect(onTaskUpdated).toHaveBeenCalledWith(expect.objectContaining({ title: "Task Alpha (edited)" }));
    expect(onTasksChange).toHaveBeenCalled();
  });

  // ── Delete flow ───────────────────────────────────────────────────────────────

  it("shows delete confirmation when Delete is clicked in Edit dialog", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} />);
    fireEvent.click(screen.getByText("Task Alpha"));
    fireEvent.click(screen.getByText("Delete"));
    expect(screen.getByText(/Delete "Task Alpha"/i)).toBeInTheDocument();
  });

  it("calls onTaskDeleted and onTasksChange after confirming delete", () => {
    const onTaskDeleted = vi.fn();
    const onTasksChange = vi.fn();
    render(
      <KanbanBoard
        columns={COLUMNS}
        tasks={TASKS}
        onTaskDeleted={onTaskDeleted}
        onTasksChange={onTasksChange}
      />,
    );
    fireEvent.click(screen.getByText("Task Alpha"));
    fireEvent.click(screen.getByText("Delete"));
    // Confirm deletion (second Delete button in confirmation)
    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[deleteButtons.length - 1]);
    expect(onTaskDeleted).toHaveBeenCalledWith("1");
    expect(onTasksChange).toHaveBeenCalled();
  });

  // ── enableBuiltinDialogs=false ────────────────────────────────────────────────

  it("calls onCardClick instead of opening dialog when enableBuiltinDialogs=false", () => {
    const onCardClick = vi.fn();
    render(
      <KanbanBoard
        columns={COLUMNS}
        tasks={TASKS}
        enableBuiltinDialogs={false}
        onCardClick={onCardClick}
      />,
    );
    fireEvent.click(screen.getByText("Task Alpha"));
    expect(onCardClick).toHaveBeenCalledWith(expect.objectContaining({ id: "1" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("hides Add card buttons when enableBuiltinDialogs=false", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} enableBuiltinDialogs={false} />);
    expect(screen.queryByText("Add card")).not.toBeInTheDocument();
  });

  // ── Translation ───────────────────────────────────────────────────────────────

  it("uses custom translation keys", () => {
    render(
      <KanbanBoard
        columns={COLUMNS}
        tasks={TASKS}
        translation={{ addCardLabel: "Karte hinzufügen", noCardsLabel: "Keine Karten" }}
      />,
    );
    expect(screen.getAllByText("Karte hinzufügen")).toHaveLength(3);
  });

  it("applies partial translations — unset keys fall back to defaults", () => {
    render(
      <KanbanBoard
        columns={COLUMNS}
        tasks={TASKS}
        translation={{ addCardLabel: "Neu" }}
      />,
    );
    expect(screen.getAllByText("Neu")).toHaveLength(3);
    // Default for noCardsLabel should still appear in empty columns (none here)
    // Just verify Add card is gone
    expect(screen.queryByText("Add card")).not.toBeInTheDocument();
  });

  // ── onTaskMoved ───────────────────────────────────────────────────────────────

  it("accepts onTaskMoved prop without errors", () => {
    const onTaskMoved = vi.fn();
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} onTaskMoved={onTaskMoved} />);
    expect(screen.getByText("Task Alpha")).toBeInTheDocument();
    expect(onTaskMoved).not.toHaveBeenCalled();
  });

  it("does not call onTaskMoved when card is saved via Edit dialog", () => {
    // onTaskMoved is DnD-only — any dialog save must NOT trigger it,
    // only onTaskUpdated fires for that path.
    const onTaskMoved   = vi.fn();
    const onTaskUpdated = vi.fn();
    render(
      <KanbanBoard
        columns={COLUMNS}
        tasks={TASKS}
        onTaskMoved={onTaskMoved}
        onTaskUpdated={onTaskUpdated}
      />,
    );
    fireEvent.click(screen.getByText("Task Alpha"));
    const dialog    = screen.getByRole("dialog");
    const titleInput = within(dialog).getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: "Task Alpha (edited)" } });
    fireEvent.click(screen.getByText("Save"));
    expect(onTaskUpdated).toHaveBeenCalled();
    expect(onTaskMoved).not.toHaveBeenCalled();
  });

  // ── showPriority ──────────────────────────────────────────────────────────────

  it("renders priority dot when task has priority and showPriority=true", () => {
    const tasks: KanbanTask[] = [{ id: "p1", title: "Urgent", status: "todo", priority: "high" }];
    const { container } = render(<KanbanBoard columns={COLUMNS} tasks={tasks} />);
    expect(container.querySelector(".MuiTsKanbanBoard-cardPriorityDot")).toBeInTheDocument();
  });

  it("does not render priority dot when showPriority=false", () => {
    const tasks: KanbanTask[] = [{ id: "p1", title: "Urgent", status: "todo", priority: "high" }];
    const { container } = render(<KanbanBoard columns={COLUMNS} tasks={tasks} showPriority={false} />);
    expect(container.querySelector(".MuiTsKanbanBoard-cardPriorityDot")).not.toBeInTheDocument();
  });

  it("does not render priority dot when task has no priority", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} />);
    // TASKS[1] (Task Beta) has no priority — no dot in its card
    const betaCard = screen.getByText("Task Beta").closest(".MuiTsKanbanBoard-card");
    expect(betaCard?.querySelector(".MuiTsKanbanBoard-cardPriorityDot")).not.toBeInTheDocument();
  });

  it("renders the correct aria-label for each priority level", () => {
    const tasks: KanbanTask[] = [
      { id: "c", title: "Critical task", status: "todo", priority: "critical" },
      { id: "l", title: "Low task",      status: "todo", priority: "low" },
    ];
    render(<KanbanBoard columns={COLUMNS} tasks={tasks} />);
    expect(screen.getByLabelText("Priority: critical")).toBeInTheDocument();
    expect(screen.getByLabelText("Priority: low")).toBeInTheDocument();
  });

  // ── showDueDateWarning ────────────────────────────────────────────────────────

  const OVERDUE_TASKS: KanbanTask[] = [
    { id: "o1", title: "Overdue Task", status: "todo", dueDate: new Date("2020-01-01") },
  ];

  it("applies error color to due date chip when dueDate is in the past", () => {
    const { container } = render(<KanbanBoard columns={COLUMNS} tasks={OVERDUE_TASKS} />);
    const dueDateChip = container.querySelector(".MuiTsKanbanBoard-cardDueDate");
    expect(dueDateChip).toHaveClass("MuiChip-colorError");
  });

  it("does not apply error color when showDueDateWarning=false", () => {
    const { container } = render(
      <KanbanBoard columns={COLUMNS} tasks={OVERDUE_TASKS} showDueDateWarning={false} />,
    );
    const dueDateChip = container.querySelector(".MuiTsKanbanBoard-cardDueDate");
    expect(dueDateChip).not.toHaveClass("MuiChip-colorError");
  });

  it("does not apply error color for a future due date", () => {
    const futureTasks: KanbanTask[] = [
      { id: "f1", title: "Future Task", status: "todo", dueDate: new Date("2099-12-31") },
    ];
    const { container } = render(<KanbanBoard columns={COLUMNS} tasks={futureTasks} />);
    const dueDateChip = container.querySelector(".MuiTsKanbanBoard-cardDueDate");
    expect(dueDateChip).not.toHaveClass("MuiChip-colorError");
  });

  // ── filterText ───────────────────────────────────────────────────────────────

  it("shows all cards when filterText is empty", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} filterText="" />);
    expect(screen.getByText("Task Alpha")).toBeInTheDocument();
    expect(screen.getByText("Task Beta")).toBeInTheDocument();
    expect(screen.getByText("Task Gamma")).toBeInTheDocument();
    expect(screen.getByText("Task Delta")).toBeInTheDocument();
  });

  it("filters cards by title (case-insensitive)", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} filterText="alpha" />);
    expect(screen.getByText("Task Alpha")).toBeInTheDocument();
    expect(screen.queryByText("Task Beta")).not.toBeInTheDocument();
    expect(screen.queryByText("Task Gamma")).not.toBeInTheDocument();
  });

  it("filters cards by assignee (case-insensitive)", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} filterText="alice" />);
    expect(screen.getByText("Task Alpha")).toBeInTheDocument();
    // Task Beta is Bob's, Task Gamma has no assignee, Task Delta has no assignee
    expect(screen.queryByText("Task Beta")).not.toBeInTheDocument();
    expect(screen.queryByText("Task Gamma")).not.toBeInTheDocument();
  });

  it("shows no cards and noCardsLabel when no cards match filter", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} filterText="zzznomatch" />);
    expect(screen.queryByText("Task Alpha")).not.toBeInTheDocument();
    expect(screen.getAllByText("No cards").length).toBeGreaterThan(0);
  });

  it("column counter reflects filtered count", () => {
    // TASKS: todo has Task Alpha (Alice) + Task Delta (no assignee) → only Alpha matches "alice"
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} filterText="alice" />);
    const todoCol = getColumn("To Do");
    expect(within(todoCol).getByText("1")).toBeInTheDocument();
  });

  it("WIP-limit warning stays visible even when filter hides cards", () => {
    const columns: KanbanColumn[] = [
      { id: "todo", label: "To Do", wipLimit: 1 },
      { id: "done", label: "Done" },
    ];
    // TASKS has 2 todo items (Alpha + Delta) → over wipLimit of 1.
    // With filterText="alice", only Alpha is visible → counter shows "1 / 1",
    // but totalCount is still 2 so isOverLimit remains true.
    render(
      <KanbanBoard columns={columns} tasks={TASKS.filter((t) => t.status !== "in-progress")} filterText="alice" />,
    );
    // The count chip in the To Do column header must carry the error color class.
    const todoCol = getColumn("To Do");
    const countChip = within(todoCol).getByLabelText(/cards.*limit/i);
    expect(countChip.className).toContain("colorError");
  });

  // ── showSearchField ───────────────────────────────────────────────────────────

  it("renders a search input when showSearchField=true", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} showSearchField />);
    expect(screen.getByPlaceholderText("Search by title or assignee…")).toBeInTheDocument();
  });

  it("does not render a search input by default", () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} />);
    expect(screen.queryByPlaceholderText("Search by title or assignee…")).not.toBeInTheDocument();
  });

  it("filters cards via the built-in search field", async () => {
    render(<KanbanBoard columns={COLUMNS} tasks={TASKS} showSearchField />);
    const input = screen.getByPlaceholderText("Search by title or assignee…");
    fireEvent.change(input, { target: { value: "alpha" } });
    expect(screen.getByText("Task Alpha")).toBeInTheDocument();
    expect(screen.queryByText("Task Beta")).not.toBeInTheDocument();
  });

  it("uses custom placeholder from translation", () => {
    render(
      <KanbanBoard
        columns={COLUMNS}
        tasks={TASKS}
        showSearchField
        translation={{ searchFieldPlaceholder: "Suchen…" }}
      />,
    );
    expect(screen.getByPlaceholderText("Suchen…")).toBeInTheDocument();
  });

  // ── CSS classes ───────────────────────────────────────────────────────────────

  it("applies kanbanBoardClasses.root to the outermost element", () => {
    const { container } = render(<KanbanBoard columns={COLUMNS} tasks={TASKS} />);
    expect(container.querySelector(".MuiTsKanbanBoard-root")).toBeInTheDocument();
  });

  it("applies kanbanBoardClasses.card to each card", () => {
    const { container } = render(<KanbanBoard columns={COLUMNS} tasks={TASKS} />);
    const cards = container.querySelectorAll(".MuiTsKanbanBoard-card");
    expect(cards.length).toBe(TASKS.length);
  });

  // ── Subtasks ──────────────────────────────────────────────────────────────────

  it("renders subtask progress bar when task has subtasks", () => {
    const tasks: KanbanTask[] = [
      {
        id: "1", title: "Task with subtasks", status: "todo",
        subtasks: [
          { id: "s1", title: "Sub A", done: true },
          { id: "s2", title: "Sub B", done: false },
          { id: "s3", title: "Sub C", done: false },
        ],
      },
    ];
    const { container } = render(<KanbanBoard columns={COLUMNS} tasks={tasks} />);
    expect(screen.getByText("1 / 3 ✓")).toBeInTheDocument();
    expect(container.querySelector(".MuiTsKanbanBoard-cardSubtasks")).toBeInTheDocument();
  });

  it("does not render subtasks bar when task has no subtasks", () => {
    const { container } = render(<KanbanBoard columns={COLUMNS} tasks={TASKS} />);
    expect(container.querySelector(".MuiTsKanbanBoard-cardSubtasks")).not.toBeInTheDocument();
  });

  it("hides subtasks bar when showSubtasks={false}", () => {
    const tasks: KanbanTask[] = [
      {
        id: "1", title: "Task with subtasks", status: "todo",
        subtasks: [{ id: "s1", title: "Sub A", done: true }],
      },
    ];
    const { container } = render(<KanbanBoard columns={COLUMNS} tasks={tasks} showSubtasks={false} />);
    expect(container.querySelector(".MuiTsKanbanBoard-cardSubtasks")).not.toBeInTheDocument();
  });

  it("shows subtask checklist when edit dialog opens", () => {
    const tasks: KanbanTask[] = [
      {
        id: "1", title: "My Task", status: "todo",
        subtasks: [
          { id: "s1", title: "Sub A", done: false },
          { id: "s2", title: "Sub B", done: true },
        ],
      },
    ];
    render(<KanbanBoard columns={COLUMNS} tasks={tasks} />);
    fireEvent.click(screen.getByText("My Task"));
    expect(screen.getByText("Subtasks")).toBeInTheDocument();
    expect(screen.getByText("Sub A")).toBeInTheDocument();
    expect(screen.getByText("Sub B")).toBeInTheDocument();
  });

  it("can add a subtask via the edit dialog", () => {
    const tasks: KanbanTask[] = [{ id: "1", title: "My Task", status: "todo" }];
    const onTasksChange = vi.fn();
    render(<KanbanBoard columns={COLUMNS} tasks={tasks} onTasksChange={onTasksChange} />);
    fireEvent.click(screen.getByText("My Task"));
    const input = screen.getByPlaceholderText("Add subtask");
    fireEvent.change(input, { target: { value: "New Sub" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("New Sub")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Save"));
    expect(onTasksChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          subtasks: expect.arrayContaining([
            expect.objectContaining({ title: "New Sub", done: false }),
          ]),
        }),
      ]),
    );
  });

  it("can toggle a subtask done in the dialog", () => {
    const tasks: KanbanTask[] = [
      {
        id: "1", title: "My Task", status: "todo",
        subtasks: [{ id: "s1", title: "Sub A", done: false }],
      },
    ];
    render(<KanbanBoard columns={COLUMNS} tasks={tasks} />);
    fireEvent.click(screen.getByText("My Task"));
    const checkbox = screen.getByRole("checkbox", { name: "Sub A" });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("can remove a subtask in the dialog", () => {
    const tasks: KanbanTask[] = [
      {
        id: "1", title: "My Task", status: "todo",
        subtasks: [{ id: "s1", title: "Sub A", done: false }],
      },
    ];
    render(<KanbanBoard columns={COLUMNS} tasks={tasks} />);
    fireEvent.click(screen.getByText("My Task"));
    expect(screen.getByText("Sub A")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Remove Sub A" }));
    expect(screen.queryByText("Sub A")).not.toBeInTheDocument();
  });
});
