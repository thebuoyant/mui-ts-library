import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "zustand";
import { Box } from "@mui/material";
import {
  createGanttChartStore,
  type GanttChartStore,
} from "./GanttChart.store";
import type { GanttChartProps, GanttTheme, GanttToolbarConfig, GanttTranslations } from "./GanttChart.types";
import { DEFAULT_GANTT_TRANSLATIONS } from "./GanttChart.types";
import { getDisplayRange, getTimelineRange } from "./util/gantt-chart.util";
import type { GanttTimeScale } from "./GanttChart.types";
import { GanttTaskPanel } from "./GanttTaskPanel";
import { GanttTimeline } from "./GanttTimeline";
import { GanttToolbar } from "./GanttToolbar";
import { LEFT_PANEL_WIDTH, ASSIGNEE_COL_WIDTH, DIVIDER_WIDTH } from "./GanttChart.constants";

// ---------------------------------------------------------------------------
// Store-Kontext
// ---------------------------------------------------------------------------

const GanttChartStoreContext = createContext<GanttChartStore | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useGanttChartStore<T>(
  selector: (state: ReturnType<GanttChartStore["getState"]>) => T,
) {
  const store = useContext(GanttChartStoreContext);

  if (!store) {
    throw new Error("GanttChartStoreContext is missing.");
  }

  return useStore(store, selector);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRawGanttChartStore(): GanttChartStore {
  const store = useContext(GanttChartStoreContext);
  if (!store) throw new Error("GanttChartStoreContext is missing.");
  return store;
}

// ---------------------------------------------------------------------------
// Translations-Kontext
// ---------------------------------------------------------------------------

const GanttTranslationsContext = createContext<Required<GanttTranslations>>(DEFAULT_GANTT_TRANSLATIONS);

// eslint-disable-next-line react-refresh/only-export-components
export function useGanttTranslations(): Required<GanttTranslations> {
  return useContext(GanttTranslationsContext);
}

// ---------------------------------------------------------------------------
// Theme-Kontext — fasst alle visuellen Konfigurationsoptionen zusammen.
// ---------------------------------------------------------------------------

const GanttThemeContext = createContext<GanttTheme>({});

// eslint-disable-next-line react-refresh/only-export-components
export function useGanttTheme(): GanttTheme {
  return useContext(GanttThemeContext);
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

const SCALE_ORDER: GanttTimeScale[] = ["days", "weeks", "months", "quarters"];

const DEFAULT_TOOLBAR_CONFIG: Required<GanttToolbarConfig> = {
  showScaleDays: true,
  showScaleWeeks: true,
  showScaleMonths: true,
  showScaleQuarters: true,
  showExpandCollapseAll: true,
  showScrollToToday: true,
  showDateRange: true,
  showRangeReset: true,
  showResetView: true,
  showExportCSV: false,
  showAssigneeFilter: false,
};

function GanttChartInner({
  tasks,
  onTaskClick,
  onMilestoneClick,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onTasksChange,
  enableBuiltinDialogs = true,
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
  showToolbar = true,
  toolbarConfig,
  height,
  width,
  minPanelWidth = 200,
  maxPanelWidth = 600,
  zoomable = false,
  draggable = false,
  resizable = false,
  inlineEdit = false,
  progressDraggable = false,
  showCriticalPath = false,
  virtualizeRows = false,
  showAssigneeColumn = false,
  onExportCSV,
  onDragStart,
  onTaskMoved,
  onTaskResized,
}: GanttChartInnerProps) {
  const resolvedHeight = resolveSize(height, 400);
  const resolvedToolbarConfig = useMemo(
    () => ({ ...DEFAULT_TOOLBAR_CONFIG, ...toolbarConfig }),
    [toolbarConfig],
  );
  const resolvedWidth = resolveSize(width, "100%");
  const setTasks = useGanttChartStore((s) => s.setTasks);
  const timeScale = useGanttChartStore((s) => s.timeScale);
  const setTimeScale = useGanttChartStore((s) => s.setTimeScale);
  const timelineRange = useGanttChartStore((s) => s.timelineRange);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  // Verhindert gegenseitiges Auslösen der Scroll-Handler (Feedback-Loop).
  const isSyncing = useRef(false);

  const [panelWidth, setPanelWidth] = useState(
    LEFT_PANEL_WIDTH + (showAssigneeColumn ? ASSIGNEE_COL_WIDTH : 0),
  );
  const rawStore = useRawGanttChartStore();

  const handleExportCSV = useCallback(() => {
    const currentTasks = rawStore.getState().tasks;
    const cols = ["id","name","status","startDate","endDate","progress","assignee","parentId","isMilestone","dependencies","color"];
    const header = cols.join(",");
    const rows = currentTasks.map((task) => [
      task.id,
      `"${task.name.replace(/"/g, '""')}"`,
      task.status,
      task.startDate.toISOString().split("T")[0],
      task.endDate.toISOString().split("T")[0],
      task.progress ?? "",
      task.assignee ? `"${task.assignee.replace(/"/g, '""')}"` : "",
      task.parentId ?? "",
      task.isMilestone ? "true" : "false",
      (task.dependencies ?? []).join(";"),
      task.color ?? "",
    ].join(","));
    const csv = [header, ...rows].join("\n");
    if (onExportCSV) {
      onExportCSV(csv, currentTasks);
    } else {
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "gantt-tasks.csv";
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [rawStore, onExportCSV]);

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

  const scrollToToday = useCallback(() => {
    if (!rightRef.current) return;
    const displayRange = getDisplayRange(timelineRange, timeScale);
    const now = Date.now();
    const start = displayRange.start.getTime();
    const end = displayRange.end.getTime();
    const todayX = ((now - start) / (end - start)) * rightRef.current.scrollWidth;
    rightRef.current.scrollLeft = Math.max(0, todayX - rightRef.current.clientWidth / 2);
  }, [timelineRange, timeScale]);

  // Strg+Mausrad → Zeitskala wechseln (opt-in via zoomable-Prop).
  useEffect(() => {
    if (!zoomable || !rightRef.current) return;
    const el = rightRef.current;
    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const idx = SCALE_ORDER.indexOf(timeScale);
      if (e.deltaY < 0 && idx > 0) setTimeScale(SCALE_ORDER[idx - 1]);
      else if (e.deltaY > 0 && idx < SCALE_ORDER.length - 1) setTimeScale(SCALE_ORDER[idx + 1]);
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [zoomable, timeScale, setTimeScale]);

  const handleDividerMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = panelWidth;
      const onMouseMove = (ev: MouseEvent) => {
        const delta = ev.clientX - startX;
        const newWidth = Math.max(minPanelWidth, Math.min(maxPanelWidth, startWidth + delta));
        setPanelWidth(newWidth);
      };
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [panelWidth, minPanelWidth, maxPanelWidth],
  );

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
      {showToolbar && (
        <GanttToolbar
          onScrollToToday={scrollToToday}
          config={resolvedToolbarConfig}
          onExportCSV={resolvedToolbarConfig.showExportCSV ? handleExportCSV : undefined}
        />
      )}

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <GanttTaskPanel
          scrollRef={leftRef}
          onScroll={handleLeftScroll}
          panelWidth={panelWidth}
          onTaskClick={onTaskClick}
          onAddTask={onAddTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onStatusChange={onStatusChange}
          onTasksChange={onTasksChange}
          enableBuiltinDialogs={enableBuiltinDialogs}
          onTaskCreated={onTaskCreated}
          onTaskUpdated={onTaskUpdated}
          onTaskDeleted={onTaskDeleted}
          inlineEdit={inlineEdit}
          virtualizeRows={virtualizeRows}
          showAssigneeColumn={showAssigneeColumn}
        />
        <Box
          data-testid="gantt-panel-divider"
          sx={{
            width: DIVIDER_WIDTH,
            flexShrink: 0,
            bgcolor: "divider",
            cursor: "col-resize",
            "&:hover": { bgcolor: "action.hover" },
          }}
          onMouseDown={handleDividerMouseDown}
        />
        <GanttTimeline
          scrollRef={rightRef}
          onScroll={handleRightScroll}
          onTaskClick={onTaskClick}
          onMilestoneClick={onMilestoneClick}
          draggable={draggable}
          resizable={resizable}
          progressDraggable={progressDraggable}
          showCriticalPath={showCriticalPath}
          virtualizeRows={virtualizeRows}
          onDragStart={onDragStart}
          onTaskMoved={onTaskMoved}
          onTaskResized={onTaskResized}
          onTasksChange={onTasksChange}
          onStatusChange={onStatusChange}
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
  enableBuiltinDialogs = true,
  toolbarConfig,
  zoomable = false,
  draggable = false,
  resizable = false,
  inlineEdit = false,
  progressDraggable = false,
  showCriticalPath = false,
  virtualizeRows = false,
  showAssigneeColumn = false,
  cascadeDependencies = false,
  statusColors,
  ganttTheme,
  onExportCSV,
  onDragStart,
  onTaskClick,
  onMilestoneClick,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onTasksChange,
  onTaskMoved,
  onTaskResized,
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
  height,
  width,
  minPanelWidth,
  maxPanelWidth,
}: GanttChartProps) {
  const mergedTranslations = useMemo(
    () => ({ ...DEFAULT_GANTT_TRANSLATIONS, ...translations }),
    [translations],
  );

  const [store] = useState(() => {
    const hasCustomRange = defaultRangeStart !== undefined || defaultRangeEnd !== undefined;
    if (!hasCustomRange) {
      return createGanttChartStore(tasks, timeScale, initialExpandAll, undefined, cascadeDependencies);
    }
    const autoRange = getTimelineRange(tasks);
    return createGanttChartStore(tasks, timeScale, initialExpandAll, {
      start: defaultRangeStart ?? autoRange.start,
      end: defaultRangeEnd ?? autoRange.end,
    }, cascadeDependencies);
  });

  // statusColors (Phase 17, backwards compat) wird von ganttTheme.statusColors überschrieben.
  const resolvedTheme = useMemo<GanttTheme>(() => ({
    ...ganttTheme,
    statusColors: { ...statusColors, ...ganttTheme?.statusColors },
  }), [statusColors, ganttTheme]);

  return (
    <GanttTranslationsContext.Provider value={mergedTranslations}>
      <GanttThemeContext.Provider value={resolvedTheme}>
      <GanttChartStoreContext.Provider value={store}>
        <GanttChartInner
          tasks={tasks}
          timeScale={timeScale}
          enableBuiltinDialogs={enableBuiltinDialogs}
          showToolbar={showToolbar}
          toolbarConfig={toolbarConfig}
          zoomable={zoomable}
          draggable={draggable}
          resizable={resizable}
          inlineEdit={inlineEdit}
          progressDraggable={progressDraggable}
          showCriticalPath={showCriticalPath}
          virtualizeRows={virtualizeRows}
          showAssigneeColumn={showAssigneeColumn}
          onExportCSV={onExportCSV}
          onDragStart={onDragStart}
          onTaskClick={onTaskClick}
          onMilestoneClick={onMilestoneClick}
          onAddTask={onAddTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onStatusChange={onStatusChange}
          onTasksChange={onTasksChange}
          onTaskMoved={onTaskMoved}
          onTaskResized={onTaskResized}
          onTaskCreated={onTaskCreated}
          onTaskUpdated={onTaskUpdated}
          onTaskDeleted={onTaskDeleted}
          height={height}
          width={width}
          minPanelWidth={minPanelWidth}
          maxPanelWidth={maxPanelWidth}
        />
      </GanttChartStoreContext.Provider>
      </GanttThemeContext.Provider>
    </GanttTranslationsContext.Provider>
  );
}
