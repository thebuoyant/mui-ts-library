import { useMemo } from "react";
import { type RefObject, type UIEventHandler } from "react";
import { Box, Typography } from "@mui/material";
import { useGanttChartStore } from "./GanttChart";
import type { GanttTask } from "./GanttChart.types";
import { getVisibleTasks } from "./util/gantt-chart.util";
import { ROW_HEIGHT, HEADER_HEIGHT, LEFT_PANEL_WIDTH } from "./GanttChart.constants";

const STATUS_DOT_COLOR: Record<string, string> = {
  planned: "warning.main",
  "in-progress": "info.main",
  done: "success.main",
  blocked: "error.main",
};

type GanttTaskPanelProps = {
  scrollRef: RefObject<HTMLDivElement>;
  onScroll: UIEventHandler<HTMLDivElement>;
  onTaskClick?: (task: GanttTask) => void;
};

export function GanttTaskPanel({ scrollRef, onScroll, onTaskClick }: GanttTaskPanelProps) {
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
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Name
        </Typography>
      </Box>

      {visibleTasks.map((task) => (
        <Box
          key={task.id}
          data-testid={`gantt-task-row-${task.id}`}
          sx={{
            height: ROW_HEIGHT,
            display: "flex",
            alignItems: "center",
            // Einrückung: 1 Spacing-Einheit Basis + 2 pro Tiefe-Level
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

          <Typography variant="body2" noWrap sx={{ flex: 1 }}>
            {task.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
