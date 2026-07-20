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
  /** Total tasks in this column before any filter — used for WIP-limit checking. */
  totalCount: number;
  showPriority: boolean;
  showAssignee: boolean;
  showDueDate: boolean;
  showDueDateWarning: boolean;
  showSubtasks: boolean;
  chipVariant: "outlined" | "filled";
  t: Required<KanbanBoardTranslation>;
  enableBuiltinDialogs: boolean;
  onCardClick: (task: KanbanTask) => void;
  onAddClick: (columnId: string) => void;
};

export function KanbanBoardColumn({
  column,
  tasks,
  totalCount,
  showPriority,
  showAssignee,
  showDueDate,
  showDueDateWarning,
  showSubtasks,
  chipVariant,
  t,
  enableBuiltinDialogs,
  onCardClick,
  onAddClick,
}: KanbanBoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  const isOverLimit = column.wipLimit !== undefined && totalCount > column.wipLimit;
  const countLabel = column.wipLimit !== undefined
    ? `${tasks.length} / ${column.wipLimit}`
    : `${tasks.length}`;

  // Accent color: use column.color, fall back to MUI primary.
  const accentColor = column.color ?? "primary.main";

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
          borderTop: `3px solid ${column.color ?? "transparent"}`,
          bgcolor: (theme) => theme.palette.mode === "dark" ? "grey.800" : "grey.300",
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
          sx={{
            height: 20,
            fontSize: "0.7rem",
            ...(!isOverLimit && column.color && {
              bgcolor: column.color,
              color: "#fff",
            }),
          }}
          aria-label={`${tasks.length} cards${column.wipLimit ? ` of ${column.wipLimit} limit` : ""}${tasks.length !== totalCount ? ` (${totalCount} total)` : ""}`}
        />
      </Box>

      {/* Card list — background slightly lighter than cards to create contrast */}
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <Box
          ref={setNodeRef}
          className={kanbanBoardClasses.columnBody}
          sx={{
            flex: 1,
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            p: 1,
            minHeight: 80,
            bgcolor: (theme) => {
              if (isOver) return theme.palette.action.selected;
              return theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[100];
            },
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
              showPriority={showPriority}
              showAssignee={showAssignee}
              showDueDate={showDueDate}
              showDueDateWarning={showDueDateWarning}
              showSubtasks={showSubtasks}
              chipVariant={chipVariant}
              t={t}
              onCardClick={onCardClick}
            />
          ))}
        </Box>
      </SortableContext>

      {/* Add card button — visually prominent via dashed border in column accent color */}
      {enableBuiltinDialogs && (
        <Box sx={{ p: 1, borderTop: "1px solid", borderColor: "divider" }}>
          <Button
            className={kanbanBoardClasses.addButton}
            startIcon={<AddIcon />}
            size="small"
            fullWidth
            onClick={() => onAddClick(column.id)}
            sx={{
              justifyContent: "flex-start",
              color: accentColor,
              border: "1px dashed",
              borderColor: accentColor,
              borderRadius: 1,
              py: 0.75,
              fontWeight: 600,
              letterSpacing: 0.5,
              "&:hover": {
                bgcolor: "action.hover",
                borderStyle: "dashed",
              },
            }}
          >
            {t.addCardLabel}
          </Button>
        </Box>
      )}
    </Box>
  );
}
