export type KanbanTaskPriority = "low" | "medium" | "high" | "critical";

export type KanbanSubtask = {
  id: string;
  title: string;
  done: boolean;
};

export type KanbanTask = {
  id: string;
  title: string;
  /** Must match a `KanbanColumn.id`. */
  status: string;
  description?: string;
  assignee?: string;
  /** Overrides the column's default card color for this individual card. Any CSS color value. */
  color?: string;
  dueDate?: Date;
  /** Optional priority level — shown as a colored dot next to the card title when `showPriority` is true. */
  priority?: KanbanTaskPriority;
  /** Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog. */
  subtasks?: KanbanSubtask[];
};

export type KanbanColumn = {
  /** Used as the key — must match `KanbanTask.status` values. */
  id: string;
  label: string;
  /** Accent color for the column header bar. Any CSS color value. */
  color?: string;
  /** Optional WIP limit — shown as "{count} / {wipLimit}" in the column header. */
  wipLimit?: number;
};

export type KanbanBoardTranslation = {
  addCardLabel: string;
  dialogAddTitle: string;
  dialogEditTitle: string;
  dialogDeleteTitle: string;
  dialogSave: string;
  dialogCancel: string;
  dialogDelete: string;
  /** "{title}" is replaced with the card title. */
  dialogDeleteConfirm: string;
  dialogFieldTitle: string;
  dialogFieldDescription: string;
  dialogFieldAssignee: string;
  dialogFieldDueDate: string;
  dialogFieldStatus: string;
  noCardsLabel: string;
  /** Placeholder text for the built-in search field (`showSearchField={true}`). */
  searchFieldPlaceholder: string;
  /** Section label for the subtask checklist in the edit/add dialog. */
  dialogFieldSubtasks: string;
  /** Placeholder for the "add subtask" input in the dialog. */
  dialogSubtaskAdd: string;
};

export const DEFAULT_KANBAN_BOARD_TRANSLATION: Required<KanbanBoardTranslation> = {
  addCardLabel:       "Add card",
  dialogAddTitle:     "Add card",
  dialogEditTitle:    "Edit card",
  dialogDeleteTitle:  "Delete card",
  dialogSave:         "Save",
  dialogCancel:       "Cancel",
  dialogDelete:       "Delete",
  dialogDeleteConfirm: 'Delete "{title}"?',
  dialogFieldTitle:       "Title",
  dialogFieldDescription: "Description",
  dialogFieldAssignee:    "Assignee",
  dialogFieldDueDate:     "Due date",
  dialogFieldStatus:      "Status",
  noCardsLabel:           "No cards",
  searchFieldPlaceholder: "Search by title or assignee…",
  dialogFieldSubtasks:    "Subtasks",
  dialogSubtaskAdd:       "Add subtask",
};

export type KanbanBoardProps = {
  tasks: KanbanTask[];
  columns: KanbanColumn[];
  /**
   * Called after every CRUD action and after every drag-and-drop.
   * Receives the complete updated task list.
   */
  onTasksChange?: (tasks: KanbanTask[]) => void;
  /**
   * Called when a card is clicked.
   * When `enableBuiltinDialogs` is true this opens the Edit dialog instead.
   */
  onCardClick?: (task: KanbanTask) => void;
  /**
   * When true (default), clicking a card opens the built-in Edit dialog and
   * the "+" button opens the built-in Add dialog.
   */
  enableBuiltinDialogs?: boolean;
  /** Called after a new card is saved via the built-in Add dialog. */
  onTaskCreated?: (task: KanbanTask) => void;
  /** Called after an existing card is saved via the built-in Edit dialog. */
  onTaskUpdated?: (task: KanbanTask) => void;
  /** Called after a card is deleted via the built-in Delete confirmation. */
  onTaskDeleted?: (taskId: string) => void;
  /**
   * Called when a card is moved to a different column via drag and drop.
   * NOT fired for in-column reordering or dialog-based status changes — use
   * `onTaskUpdated` for those. Carries the full updated task plus both column ids
   * so consumers can issue a targeted API call without diffing the full list.
   */
  onTaskMoved?: (task: KanbanTask, fromColumnId: string, toColumnId: string) => void;
  /**
   * Show the priority dot on cards (default: true).
   * Has no visual effect when a card has no `priority` field set.
   */
  showPriority?: boolean;
  /** Show the assignee label on cards (default: true). */
  showAssignee?: boolean;
  /** Show the due date on cards (default: true). */
  showDueDate?: boolean;
  /**
   * Highlight cards whose `dueDate` is in the past (default: true).
   * When true, the due-date chip turns red (`color="error"`) and the card
   * receives a subtle red background tint and left border stripe.
   * Has no effect when `showDueDate` is false or when the card has no `dueDate`.
   */
  showDueDateWarning?: boolean;
  /**
   * MUI Chip variant for assignee and due-date chips on cards.
   * `"outlined"` (default) — subtle border, transparent background.
   * `"filled"` — solid background, more prominent.
   */
  chipVariant?: "outlined" | "filled";
  /**
   * Show the subtask progress bar on cards and the subtask checklist in the edit/add dialog (default: true).
   * Has no visual effect when a card has no `subtasks` field set.
   */
  showSubtasks?: boolean;
  /**
   * When `true`, renders a built-in `size="small"` search field above the board columns.
   * The board manages the search state internally — no extra wiring needed.
   * Customize the placeholder via `translation.searchFieldPlaceholder`.
   *
   * For full control over placement, styling, or debouncing, leave this `false` (default)
   * and pass `filterText` instead.
   */
  showSearchField?: boolean;
  /**
   * Filters visible cards by title and assignee (case-insensitive substring match).
   * The consumer is responsible for rendering the search input and passing the string.
   * An empty string or `undefined` shows all cards.
   * Column counters reflect the filtered count; WIP-limit checks always use the
   * unfiltered column total so the over-limit warning is never hidden by a filter.
   *
   * Alternative: set `showSearchField={true}` to let the board render a built-in field.
   */
  filterText?: string;
  /** Width of the board. Default: "100%". */
  width?: number | string;
  /** Height of the board. Default: "100%". */
  height?: number | string;
  /** Override any label or message — unset keys fall back to English defaults. */
  translation?: Partial<KanbanBoardTranslation>;
};
