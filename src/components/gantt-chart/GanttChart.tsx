import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useStore } from "zustand";
import { Box } from "@mui/material";
import {
  createGanttChartStore,
  type GanttChartStore,
} from "./GanttChart.store";
import type { GanttChartProps } from "./GanttChart.types";
import { GanttTaskPanel } from "./GanttTaskPanel";
import { GanttTimeline } from "./GanttTimeline";

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

function GanttChartInner({
  tasks,
  onTaskClick,
  onMilestoneClick,
  onAddTask,
  onDeleteTask,
  onStatusChange,
  height = 400,
}: GanttChartInnerProps) {
  const setTasks = useGanttChartStore((s) => s.setTasks);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  // Verhindert gegenseitiges Auslösen der Scroll-Handler (Feedback-Loop).
  const isSyncing = useRef(false);

  useEffect(() => {
    setTasks(tasks);
  }, [tasks, setTasks]);

  const handleLeftScroll = () => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    if (rightRef.current && leftRef.current) {
      rightRef.current.scrollTop = leftRef.current.scrollTop;
    }
    isSyncing.current = false;
  };

  const handleRightScroll = () => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    if (leftRef.current && rightRef.current) {
      leftRef.current.scrollTop = rightRef.current.scrollTop;
    }
    isSyncing.current = false;
  };

  return (
    <Box
      sx={{
        display: "flex",
        height,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <GanttTaskPanel
        scrollRef={leftRef}
        onScroll={handleLeftScroll}
        onTaskClick={onTaskClick}
        onAddTask={onAddTask}
        onDeleteTask={onDeleteTask}
        onStatusChange={onStatusChange}
      />
      <GanttTimeline
        scrollRef={rightRef}
        onScroll={handleRightScroll}
        onTaskClick={onTaskClick}
        onMilestoneClick={onMilestoneClick}
      />
    </Box>
  );
}

export function GanttChart({
  tasks,
  timeScale = "months",
  initialExpandAll = false,
  onTaskClick,
  onMilestoneClick,
  onAddTask,
  onDeleteTask,
  onStatusChange,
  height,
}: GanttChartProps) {
  const [store] = useState(() => createGanttChartStore(tasks, timeScale, initialExpandAll));

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
        height={height}
      />
    </GanttChartStoreContext.Provider>
  );
}
