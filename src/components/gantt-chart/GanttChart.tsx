import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useStore } from "zustand";
import { Box, Typography } from "@mui/material";
import {
  createGanttChartStore,
  type GanttChartStore,
} from "./GanttChart.store";
import type { GanttChartProps } from "./GanttChart.types";
import { getVisibleTasks } from "./util/gantt-chart.util";

const GanttChartStoreContext = createContext<GanttChartStore | null>(null);

export function useGanttChartStore<T>(
  selector: (state: ReturnType<GanttChartStore["getState"]>) => T,
) {
  const store = useContext(GanttChartStoreContext);

  if (!store) {
    throw new Error("GanttChartStoreContext is missing.");
  }

  return useStore(store, selector);
}

type GanttChartInnerProps = GanttChartProps;

// Platzhalter — wird in Phase 2 durch das echte Split-Layout ersetzt.
function GanttChartInner({
  tasks,
  onTaskClick,
  onAddTask,
  onDeleteTask,
  onStatusChange,
}: GanttChartInnerProps) {
  const setTasks = useGanttChartStore((s) => s.setTasks);
  const taskTree = useGanttChartStore((s) => s.taskTree);
  const expandedIds = useGanttChartStore((s) => s.expandedIds);
  const toggleExpand = useGanttChartStore((s) => s.toggleExpand);
  // Selector würde bei jedem Aufruf eine neue Array-Referenz erzeugen → Endlosschleife.
  const visibleTasks = useMemo(() => getVisibleTasks(taskTree, expandedIds), [taskTree, expandedIds]);

  useEffect(() => {
    setTasks(tasks);
  }, [tasks, setTasks]);

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
        width: "100%",
      }}
    >
      {visibleTasks.map((task) => (
        <Box
          key={task.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 0.75,
            pl: 2 + task.depth * 3,
            borderBottom: "1px solid",
            borderColor: "divider",
            cursor: onTaskClick ? "pointer" : "default",
            "&:hover": onTaskClick ? { bgcolor: "action.hover" } : undefined,
          }}
          onClick={() => onTaskClick?.(task)}
        >
          {/* Expand/Collapse-Button für Tasks mit Kindern */}
          {task.children.length > 0 && (
            <Box
              component="span"
              sx={{ fontSize: 10, userSelect: "none", minWidth: 12 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(task.id);
              }}
            >
              {expandedIds.has(task.id) ? "▼" : "▶"}
            </Box>
          )}
          <Typography variant="body2" noWrap>
            {task.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: "auto" }}>
            {task.status}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export function GanttChart({
  tasks,
  timeScale = "months",
  onTaskClick,
  onMilestoneClick,
  onAddTask,
  onDeleteTask,
  onStatusChange,
}: GanttChartProps) {
  const [store] = useState(() => createGanttChartStore(tasks, timeScale));

  return (
    <GanttChartStoreContext.Provider value={store}>
      <GanttChartInner
        tasks={tasks}
        timeScale={timeScale}
        onTaskClick={onTaskClick}
        onMilestoneClick={onMilestoneClick}
        onAddTask={onAddTask}
        onDeleteTask={onDeleteTask}
        onStatusChange={onStatusChange}
      />
    </GanttChartStoreContext.Provider>
  );
}
