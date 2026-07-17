import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Chip, Typography } from "@mui/material";
import type { KanbanBoardTranslation, KanbanColumn, KanbanTask } from "./KanbanBoard.types";
import { KanbanBoardCard } from "./KanbanBoardCard";
import { kanbanBoardClasses } from "./kanbanBoardClasses";

type KanbanBoardColumnProps = {
  column: KanbanColumn;
  tasks: KanbanTask[];
  showAssignee: boolean;
  showDueDate: boolean;
  t: Required<KanbanBoardTranslation>;
  enableBuiltinDialogs: boolean;
  onCardClick: (task: KanbanTask) => void;
  onAddClick: (columnId: string) => void;
};

export function KanbanBoardColumn({
  column,
  tasks,
  showAssignee,
  showDueDate,
  t,
  enableBuiltinDialogs,
  onCardClick,
  onAddClick,
}: KanbanBoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  const isOverLimit = column.wipLimit !== undefined && tasks.length > column.wipLimit;
  const countLabel = column.wipLimit !== undefined
    ? `${tasks.length} / ${column.wipLimit}`
    : `${tasks.length}`;

  return (
    <Box
      className={kanbanBoardClasses.column}
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 240,
        maxWidth: 320,
        flex: "1 1 240px",
        bgcolor: "background.paper",
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Column header */}
      <Box
        className={kanbanBoardClasses.columnHeader}
        sx={{
          px: 2,
          py: 1.25,
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          borderTop: column.color ? `3px solid ${column.color}` : "3px solid transparent",
        }}
      >
        <Typography
          className={kanbanBoardClasses.columnTitle}
          variant="subtitle2"
          sx={{ flex: 1, fontWeight: 700 }}
        >
          {column.label}
        </Typography>
        <Chip
          className={kanbanBoardClasses.columnCount}
          label={countLabel}
          size="small"
          color={isOverLimit ? "error" : "default"}
          sx={{ height: 20, fontSize: "0.7rem" }}
          aria-label={`${tasks.length} cards${column.wipLimit ? ` of ${column.wipLimit} limit` : ""}`}
        />
      </Box>

      {/* Card list */}
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <Box
          ref={setNodeRef}
          className={kanbanBoardClasses.columnBody}
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 1,
            minHeight: 80,
            bgcolor: isOver ? "action.hover" : undefined,
            transition: "background-color 0.15s",
          }}
        >
          {tasks.length === 0 && !isOver && (
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ display: "block", textAlign: "center", mt: 2 }}
            >
              {t.noCardsLabel}
            </Typography>
          )}
          {tasks.map((task) => (
            <KanbanBoardCard
              key={task.id}
              task={task}
              showAssignee={showAssignee}
              showDueDate={showDueDate}
              t={t}
              onCardClick={onCardClick}
            />
          ))}
        </Box>
      </SortableContext>

      {/* Add button */}
      {enableBuiltinDialogs && (
        <Box sx={{ p: 1, borderTop: "1px solid", borderColor: "divider" }}>
          <Button
            className={kanbanBoardClasses.addButton}
            startIcon={<AddIcon />}
            size="small"
            fullWidth
            variant="text"
            onClick={() => onAddClick(column.id)}
            sx={{ justifyContent: "flex-start", color: "text.secondary" }}
          >
            {t.addCardLabel}
          </Button>
        </Box>
      )}
    </Box>
  );
}
