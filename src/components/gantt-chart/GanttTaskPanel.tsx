import { useMemo, useState } from "react";
import { type RefObject, type UIEventHandler } from "react";
import { Box, Chip, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGanttChartStore } from "./GanttChart";
import type { GanttTask, GanttTaskNode, GanttTaskStatus } from "./GanttChart.types";
import { getVisibleTasks } from "./util/gantt-chart.util";
import { ROW_HEIGHT, HEADER_HEIGHT, LEFT_PANEL_WIDTH } from "./GanttChart.constants";

const STATUS_DOT_COLOR: Record<string, string> = {
  planned: "warning.main",
  "in-progress": "info.main",
  done: "success.main",
  blocked: "error.main",
};

const STATUS_CHIP_COLOR: Record<
  GanttTaskStatus,
  "default" | "warning" | "info" | "success" | "error"
> = {
  planned: "warning",
  "in-progress": "info",
  done: "success",
  blocked: "error",
};

function formatStatus(status: GanttTaskStatus): string {
  return status.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ---------------------------------------------------------------------------
// Sub-Komponente pro Zeile — eigener anchorEl-State für das Status-Menü.
// ---------------------------------------------------------------------------

type GanttTaskRowProps = {
  task: GanttTaskNode;
  expandedIds: Set<string>;
  toggleExpand: (id: string) => void;
  onTaskClick?: (task: GanttTask) => void;
  onAddTask?: (task: GanttTask) => void;
  onDeleteTask?: (task: GanttTask) => void;
  onStatusChange?: (task: GanttTask, status: GanttTaskStatus) => void;
};

function GanttTaskRow({
  task,
  expandedIds,
  toggleExpand,
  onTaskClick,
  onAddTask,
  onDeleteTask,
  onStatusChange,
}: GanttTaskRowProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box
      className="gantt-task-row"
      data-testid={`gantt-task-row-${task.id}`}
      sx={{
        height: ROW_HEIGHT,
        display: "flex",
        alignItems: "center",
        pl: 1 + task.depth * 2,
        pr: 1,
        gap: 0.75,
        borderBottom: "1px solid",
        borderColor: "divider",
        cursor: onTaskClick ? "pointer" : "default",
        "&:hover": onTaskClick ? { bgcolor: "action.hover" } : undefined,
      }}
      onClick={() => onTaskClick?.(task)}
    >
      {/* Feste Breite für Expand/Collapse hält die Namenspalte stabil ausgerichtet. */}
      <Box sx={{ width: 16, flexShrink: 0, display: "flex", justifyContent: "center" }}>
        {task.children.length > 0 && (
          <Box
            component="span"
            sx={{ fontSize: 9, userSelect: "none", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(task.id);
            }}
          >
            {expandedIds.has(task.id) ? "▼" : "▶"}
          </Box>
        )}
      </Box>

      {/* Status-Dot, bei Meilensteinen als Raute */}
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: task.isMilestone ? 0 : "50%",
          transform: task.isMilestone ? "rotate(45deg)" : undefined,
          flexShrink: 0,
          bgcolor: STATUS_DOT_COLOR[task.status] ?? "grey.400",
        }}
      />

      <Typography variant="body2" noWrap sx={{ flex: 1, minWidth: 0 }}>
        {task.name}
      </Typography>

      {/* Hover-Icons — opacity 0 im Ruhezustand, 1 bei hover auf die Zeile */}
      {(onAddTask || onDeleteTask) && (
        <Box
          className="gantt-row-actions"
          sx={{
            display: "flex",
            gap: 0.25,
            opacity: 0,
            ".gantt-task-row:hover &": { opacity: 1 },
            flexShrink: 0,
          }}
        >
          {onAddTask && (
            <IconButton
              size="small"
              data-testid={`gantt-add-task-${task.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onAddTask(task);
              }}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          )}
          {onDeleteTask && (
            <IconButton
              size="small"
              data-testid={`gantt-delete-task-${task.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTask(task);
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          )}
        </Box>
      )}

      <Chip
        label={formatStatus(task.status)}
        size="small"
        variant="outlined"
        color={STATUS_CHIP_COLOR[task.status] ?? "default"}
        sx={{
          flexShrink: 0,
          height: 20,
          fontSize: 10,
          cursor: onStatusChange ? "pointer" : "default",
        }}
        onClick={
          onStatusChange
            ? (e) => {
                e.stopPropagation();
                setAnchorEl(e.currentTarget);
              }
            : undefined
        }
      />

      {onStatusChange && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {(["planned", "in-progress", "done", "blocked"] as GanttTaskStatus[]).map((s) => (
            <MenuItem
              key={s}
              selected={task.status === s}
              onClick={() => {
                onStatusChange(task, s);
                setAnchorEl(null);
              }}
            >
              {formatStatus(s)}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Panel-Komponente
// ---------------------------------------------------------------------------

type GanttTaskPanelProps = {
  scrollRef: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
  onTaskClick?: (task: GanttTask) => void;
  onAddTask?: (task: GanttTask) => void;
  onDeleteTask?: (task: GanttTask) => void;
  onStatusChange?: (task: GanttTask, status: GanttTaskStatus) => void;
};

export function GanttTaskPanel({
  scrollRef,
  onScroll,
  onTaskClick,
  onAddTask,
  onDeleteTask,
  onStatusChange,
}: GanttTaskPanelProps) {
  const taskTree = useGanttChartStore((s) => s.taskTree);
  const expandedIds = useGanttChartStore((s) => s.expandedIds);
  const toggleExpand = useGanttChartStore((s) => s.toggleExpand);
  // Selector würde bei jedem Aufruf eine neue Array-Referenz liefern → Endlosschleife.
  const visibleTasks = useMemo(
    () => getVisibleTasks(taskTree, expandedIds),
    [taskTree, expandedIds],
  );

  return (
    <Box
      ref={scrollRef}
      onScroll={onScroll}
      sx={{
        width: LEFT_PANEL_WIDTH,
        flexShrink: 0,
        overflowY: "auto",
        overflowX: "hidden",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          height: HEADER_HEIGHT,
          position: "sticky",
          top: 0,
          bgcolor: "background.paper",
          zIndex: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          px: 2,
          gap: 1,
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
          Name
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
          Status
        </Typography>
      </Box>

      {visibleTasks.map((task) => (
        <GanttTaskRow
          key={task.id}
          task={task}
          expandedIds={expandedIds}
          toggleExpand={toggleExpand}
          onTaskClick={onTaskClick}
          onAddTask={onAddTask}
          onDeleteTask={onDeleteTask}
          onStatusChange={onStatusChange}
        />
      ))}
    </Box>
  );
}
