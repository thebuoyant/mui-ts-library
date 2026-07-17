/**
 * CSS class names for every named slot in the KanbanBoard component.
 *
 * Use these to style individual parts of the component without relying on
 * MUI's internal class names, which can change between versions.
 *
 * The root element also receives shared state classes from `muiTsStateClasses`:
 * - `MuiTs-disabled` — when the board is disabled (future prop)
 *
 * Individual cards receive:
 * - `MuiTs-selected` — while the card is being dragged
 *
 * @example
 * ```css
 * .MuiTsKanbanBoard-column { min-width: 280px; }
 * .MuiTsKanbanBoard-card.MuiTs-selected { box-shadow: 0 8px 24px rgba(0,0,0,.2); }
 * .MuiTsKanbanBoard-columnHeader { border-radius: 0; }
 * ```
 */
export const kanbanBoardClasses = {
  /** The outermost wrapper element. */
  root:         "MuiTsKanbanBoard-root",
  /** The horizontal flex row that contains all columns. */
  columns:      "MuiTsKanbanBoard-columns",
  /** One column (wrapper for header + body + add button). */
  column:       "MuiTsKanbanBoard-column",
  /** The colored top bar of a column containing title and card count. */
  columnHeader: "MuiTsKanbanBoard-columnHeader",
  /** The column title text inside the header. */
  columnTitle:  "MuiTsKanbanBoard-columnTitle",
  /** The "{count} / {wipLimit}" badge inside the header. */
  columnCount:  "MuiTsKanbanBoard-columnCount",
  /** The scrollable area that holds the cards. */
  columnBody:   "MuiTsKanbanBoard-columnBody",
  /** One card. Also receives `MuiTs-selected` while being dragged. */
  card:         "MuiTsKanbanBoard-card",
  /** The card title text. */
  cardTitle:    "MuiTsKanbanBoard-cardTitle",
  /** The row below the title that holds assignee and due date. */
  cardMeta:     "MuiTsKanbanBoard-cardMeta",
  /** The assignee label on a card. */
  cardAssignee: "MuiTsKanbanBoard-cardAssignee",
  /** The due date label on a card. */
  cardDueDate:  "MuiTsKanbanBoard-cardDueDate",
  /** The "+ Add card" button at the bottom of each column. */
  addButton:    "MuiTsKanbanBoard-addButton",
} as const;
