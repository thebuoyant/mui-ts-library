import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Card, CardActionArea, CardContent, Chip, IconButton, LinearProgress, Tooltip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { KanbanBoardTranslation, KanbanTask, KanbanTaskPriority } from "./KanbanBoard.types";
import { kanbanBoardClasses } from "./kanbanBoardClasses";
import { muiTsStateClasses } from "../../utils/muiTsClasses";

const PRIORITY_COLORS: Record<KanbanTaskPriority, string> = {
  low:      "#4caf50",
  medium:   "#ff9800",
  high:     "#f44336",
  critical: "#9c27b0",
};

// Shared sx for meta chips — explicit width/height on the icon so the SVG can never
// override the container's font-size (MuiSvgIcon-fontSizeMedium sets 1.5rem by default).
const CHIP_SX = {
  fontSize: "0.7rem",
  height: 22,
  "& .MuiChip-icon": {
    fontSize: "0.75rem",
    width:    "0.75rem",
    height:   "0.75rem",
    ml: "8px",
    mr: "4px",
  },
  "& .MuiChip-label": {
    pl: "2px",
    pr: "10px",
  },
} as const;

type KanbanBoardCardProps = {
  task: KanbanTask;
  showPriority: boolean;
  showAssignee: boolean;
  showDueDate: boolean;
  showDueDateWarning: boolean;
  showSubtasks: boolean;
  enableBuiltinDialogs: boolean;
  chipVariant: "outlined" | "filled";
  t: Required<KanbanBoardTranslation>;
  onCardClick: (task: KanbanTask) => void;
  /** True when this card is the drag overlay ghost — rendered without transform/listeners. */
  isOverlay?: boolean;
};

export function KanbanBoardCard({
  task,
  showPriority,
  showAssignee,
  showDueDate,
  showDueDateWarning,
  showSubtasks,
  enableBuiltinDialogs,
  chipVariant,
  t,
  onCardClick,
  isOverlay = false,
}: KanbanBoardCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    disabled: isOverlay,
  });

  const style = isOverlay
    ? undefined
    : {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
      };

  const hasMeta = (showAssignee && !!task.assignee) || (showDueDate && !!task.dueDate);
  const hasSubtasks = showSubtasks && !!task.subtasks?.length;
  const subtaskTotal = task.subtasks?.length ?? 0;
  const subtaskDone  = task.subtasks?.filter((s) => s.done).length ?? 0;
  const dueDateStr = task.dueDate
    ? task.dueDate.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })
    : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isOverdue = showDueDateWarning && !!task.dueDate && task.dueDate < today;

  return (
    <Card
      ref={isOverlay ? undefined : setNodeRef}
      style={style}
      elevation={0}
      className={[
        kanbanBoardClasses.card,
        isDragging && muiTsStateClasses.selected,
      ].filter(Boolean).join(" ")}
      sx={{
        mb: 1,
        // Border — 1px on all sides, 4px accent on left when applicable
        border: "1px solid",
        borderColor: (isOverdue && !task.color) ? "error.light" : "divider",
        borderLeft: task.color
          ? `4px solid ${task.color}`
          : isOverdue
            ? (theme) => `4px solid ${theme.palette.error.main}`
            : undefined,
        userSelect: "none",
        cursor: isOverlay ? "grabbing" : "grab",
        bgcolor: (theme) => {
          if (isOverdue) {
            return theme.palette.mode === "dark"
              ? alpha(theme.palette.error.main, 0.12)
              : alpha(theme.palette.error.main, 0.04);
          }
          return theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.background.paper;
        },
        // Controlled shadow — subtle always, lifted on hover
        boxShadow: (theme) => theme.palette.mode === "dark"
          ? "0 1px 3px rgba(0,0,0,0.4)"
          : "0 1px 3px rgba(0,0,0,0.08)",
        transition: "box-shadow 0.15s ease, transform 0.15s ease",
        ...(!isDragging && !isOverlay && {
          "&:hover": {
            boxShadow: (theme) => theme.palette.mode === "dark"
              ? "0 4px 14px rgba(0,0,0,0.5)"
              : "0 4px 14px rgba(0,0,0,0.12)",
            transform: "translateY(-1px)",
          },
        }),
        "&:active": { cursor: "grabbing" },
      }}
      {...(isOverlay ? {} : { ...attributes, ...listeners })}
      onClick={() => !isDragging && onCardClick(task)}
      aria-label={task.title}
    >
      <CardActionArea component="div" sx={{ cursor: "inherit" }}>
        <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.75, mb: hasMeta || hasSubtasks ? 1 : 0 }}>
            {showPriority && task.priority && (
              <Box
                className={kanbanBoardClasses.cardPriorityDot}
                role="img"
                aria-label={`Priority: ${task.priority}`}
                sx={{
                  width: 8,
                  height: 8,
                  minWidth: 8,
                  borderRadius: "50%",
                  bgcolor: PRIORITY_COLORS[task.priority],
                  mt: "5px",
                  flexShrink: 0,
                }}
              />
            )}
            <Typography
              className={kanbanBoardClasses.cardTitle}
              variant="body2"
              sx={{ lineHeight: 1.4, fontWeight: 700, letterSpacing: "-0.01em" }}
            >
              {task.title}
            </Typography>
          </Box>

          {hasMeta && (
            <Box
              className={kanbanBoardClasses.cardMeta}
              sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}
            >
              {showAssignee && task.assignee && (
                <Chip
                  className={kanbanBoardClasses.cardAssignee}
                  icon={<PersonIcon />}
                  label={task.assignee}
                  size="small"
                  variant={chipVariant}
                  aria-label={`${t.dialogFieldAssignee}: ${task.assignee}`}
                  sx={CHIP_SX}
                />
              )}
              {showDueDate && dueDateStr && (
                <Chip
                  className={kanbanBoardClasses.cardDueDate}
                  icon={<CalendarTodayIcon />}
                  label={dueDateStr}
                  size="small"
                  variant={chipVariant}
                  color={isOverdue ? "error" : "default"}
                  aria-label={`${t.dialogFieldDueDate}: ${dueDateStr}`}
                  sx={CHIP_SX}
                />
              )}
            </Box>
          )}

          {hasSubtasks && (
            <Box
              className={kanbanBoardClasses.cardSubtasks}
              sx={{ display: "flex", alignItems: "center", gap: 1, mt: hasMeta ? 0.75 : 0 }}
            >
              <LinearProgress
                className={kanbanBoardClasses.cardSubtasksBar}
                variant="determinate"
                value={(subtaskDone / subtaskTotal) * 100}
                sx={{ flex: 1, height: 4, borderRadius: 2 }}
                aria-label={`${subtaskDone} of ${subtaskTotal} subtasks done`}
              />
              <Typography
                variant="caption"
                sx={{ whiteSpace: "nowrap", color: "text.secondary", fontSize: "0.65rem", lineHeight: 1 }}
              >
                {subtaskDone} / {subtaskTotal} ✓
              </Typography>
              {enableBuiltinDialogs && !isOverlay && (
                <Tooltip title={t.cardSubtaskAdd} placement="top" arrow>
                  <IconButton
                    size="small"
                    aria-label={t.cardSubtaskAdd}
                    onClick={(e) => { e.stopPropagation(); onCardClick(task); }}
                    sx={{
                      p: 0.25,
                      opacity: 0,
                      transition: "opacity 0.15s",
                      [`.${kanbanBoardClasses.card}:hover &`]: { opacity: 1 },
                    }}
                  >
                    <AddIcon sx={{ fontSize: "0.85rem" }} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
