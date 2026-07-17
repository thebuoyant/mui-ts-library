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
  noCardsLabel:       "No cards",
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
  /** Show the assignee label on cards (default: true). */
  showAssignee?: boolean;
  /** Show the due date on cards (default: true). */
  showDueDate?: boolean;
  /** Height of the board. Default: "100%". */
  height?: number | string;
  /** Override any label or message — unset keys fall back to English defaults. */
  translation?: Partial<KanbanBoardTranslation>;
};
