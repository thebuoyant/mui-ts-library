import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import type { KanbanBoardTranslation, KanbanTask } from "./KanbanBoard.types";
import { kanbanBoardClasses } from "./kanbanBoardClasses";
import { muiTsStateClasses } from "../../utils/muiTsClasses";

type KanbanBoardCardProps = {
  task: KanbanTask;
  showAssignee: boolean;
  showDueDate: boolean;
  t: Required<KanbanBoardTranslation>;
  onCardClick: (task: KanbanTask) => void;
  /** True when this card is the drag overlay ghost — rendered without transform/listeners. */
  isOverlay?: boolean;
};

export function KanbanBoardCard({ task, showAssignee, showDueDate, t, onCardClick, isOverlay = false }: KanbanBoardCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    disabled: isOverlay,
  });

  const style = isOverlay
    ? { cursor: "grabbing" }
    : {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
        cursor: "grab",
      };

  const hasMeta = (showAssignee && !!task.assignee) || (showDueDate && !!task.dueDate);
  const dueDateStr = task.dueDate
    ? task.dueDate.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })
    : null;

  return (
    <Card
      ref={isOverlay ? undefined : setNodeRef}
      style={style}
      className={[
        kanbanBoardClasses.card,
        isDragging && muiTsStateClasses.selected,
      ].filter(Boolean).join(" ")}
      sx={{
        mb: 1,
        borderLeft: task.color ? `4px solid ${task.color}` : undefined,
        userSelect: "none",
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
            sx={{ mb: hasMeta ? 1 : 0, lineHeight: 1.4, fontWeight: 600 }}
          >
            {task.title}
          </Typography>

          {hasMeta && (
            <Box
              className={kanbanBoardClasses.cardMeta}
              sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", alignItems: "center" }}
            >
              {showAssignee && task.assignee && (
                <Chip
                  className={kanbanBoardClasses.cardAssignee}
                  icon={<PersonIcon />}
                  label={task.assignee}
                  size="small"
                  variant="outlined"
                  aria-label={`${t.dialogFieldAssignee}: ${task.assignee}`}
                  sx={{ fontSize: "0.7rem", height: 22 }}
                />
              )}
              {showDueDate && dueDateStr && (
                <Chip
                  className={kanbanBoardClasses.cardDueDate}
                  icon={<CalendarTodayIcon />}
                  label={dueDateStr}
                  size="small"
                  variant="outlined"
                  aria-label={`${t.dialogFieldDueDate}: ${dueDateStr}`}
                  sx={{ fontSize: "0.7rem", height: 22 }}
                />
              )}
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
