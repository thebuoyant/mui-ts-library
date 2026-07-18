import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { KanbanBoardTranslation, KanbanTask } from "./KanbanBoard.types";
import { kanbanBoardClasses } from "./kanbanBoardClasses";
import { muiTsStateClasses } from "../../utils/muiTsClasses";

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
  showAssignee: boolean;
  showDueDate: boolean;
  showDueDateWarning: boolean;
  chipVariant: "outlined" | "filled";
  t: Required<KanbanBoardTranslation>;
  onCardClick: (task: KanbanTask) => void;
  /** True when this card is the drag overlay ghost — rendered without transform/listeners. */
  isOverlay?: boolean;
};

export function KanbanBoardCard({
  task,
  showAssignee,
  showDueDate,
  showDueDateWarning,
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
          <Typography
            className={kanbanBoardClasses.cardTitle}
            variant="body2"
            sx={{ mb: hasMeta ? 1 : 0, lineHeight: 1.4, fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            {task.title}
          </Typography>

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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
