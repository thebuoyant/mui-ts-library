import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
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
    ml: "8px",   // left edge → icon: 8px (was 5px default)
    mr: "4px",   // icon → text: 4px (was −6px default — which crushed them together)
  },
  "& .MuiChip-label": {
    pl: "2px",   // small — icon mr already provides the gap
    pr: "10px",  // generous right side
  },
} as const;

type KanbanBoardCardProps = {
  task: KanbanTask;
  showAssignee: boolean;
  showDueDate: boolean;
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
        // Subtle tinted background so cards read as slightly off-white —
        // creates contrast against the lighter column body.
        bgcolor: (theme) => theme.palette.mode === "dark" ? "grey.800" : "background.paper",
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
