import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "zustand";
import { Box } from "@mui/material";
import {
  createGanttChartStore,
  type GanttChartStore,
} from "./GanttChart.store";
import type { GanttChartProps, GanttTranslations } from "./GanttChart.types";
import { DEFAULT_GANTT_TRANSLATIONS } from "./GanttChart.types";
import { getTimelineRange } from "./util/gantt-chart.util";
import { GanttTaskPanel } from "./GanttTaskPanel";
import { GanttTimeline } from "./GanttTimeline";
import { GanttToolbar } from "./GanttToolbar";

// ---------------------------------------------------------------------------
// Store-Kontext
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Translations-Kontext
// ---------------------------------------------------------------------------

const GanttTranslationsContext = createContext<GanttTranslations>(DEFAULT_GANTT_TRANSLATIONS);

export function useGanttTranslations(): GanttTranslations {
  return useContext(GanttTranslationsContext);
}

// ---------------------------------------------------------------------------
// Inner component (hat Zugriff auf beide Kontexte)
// ---------------------------------------------------------------------------

// "auto" → "100%" (füllt den Eltern-Container aus).
// Reine Zahl-Strings ("500") → Zahl, damit MUI sie korrekt als px ausgibt.
function resolveSize(value: number | string | undefined, fallback: number | string): number | string {
  if (value === undefined) return fallback;
  if (value === "auto") return "100%";
  if (typeof value === "string" && /^\d+$/.test(value)) return Number(value);
  return value;
}

type GanttChartInnerProps = GanttChartProps;

function GanttChartInner({
  tasks,
  onTaskClick,
  onMilestoneClick,
  onAddTask,
  onDeleteTask,
  onStatusChange,
  showToolbar = true,
  height,
  width,
}: GanttChartInnerProps) {
  const resolvedHeight = resolveSize(height, 400);
  const resolvedWidth = resolveSize(width, "100%");
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
        flexDirection: "column",
        height: resolvedHeight,
        width: resolvedWidth,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      {showToolbar && <GanttToolbar />}

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
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
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Öffentliche Komponente
// ---------------------------------------------------------------------------

export function GanttChart({
  tasks,
  timeScale = "months",
  initialExpandAll = false,
  showToolbar = true,
  defaultRangeStart,
  defaultRangeEnd,
  translations,
  onTaskClick,
  onMilestoneClick,
  onAddTask,
  onDeleteTask,
  onStatusChange,
  height,
  width,
}: GanttChartProps) {
  const mergedTranslations = useMemo(
    () => ({ ...DEFAULT_GANTT_TRANSLATIONS, ...translations }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [translations],
  );

  const [store] = useState(() => {
    const hasCustomRange = defaultRangeStart !== undefined || defaultRangeEnd !== undefined;
    if (!hasCustomRange) return createGanttChartStore(tasks, timeScale, initialExpandAll);

    const autoRange = getTimelineRange(tasks);
    return createGanttChartStore(tasks, timeScale, initialExpandAll, {
      start: defaultRangeStart ?? autoRange.start,
      end: defaultRangeEnd ?? autoRange.end,
    });
  });

  return (
    <GanttTranslationsContext.Provider value={mergedTranslations}>
      <GanttChartStoreContext.Provider value={store}>
        <GanttChartInner
          tasks={tasks}
          timeScale={timeScale}
          onTaskClick={onTaskClick}
          onMilestoneClick={onMilestoneClick}
          onAddTask={onAddTask}
          onDeleteTask={onDeleteTask}
          onStatusChange={onStatusChange}
          showToolbar={showToolbar}
          height={height}
          width={width}
        />
      </GanttChartStoreContext.Provider>
    </GanttTranslationsContext.Provider>
  );
}
