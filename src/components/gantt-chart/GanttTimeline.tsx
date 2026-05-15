import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { type RefObject, type UIEventHandler } from "react";
import { Box, Menu, MenuItem, useTheme } from "@mui/material";
import { useGanttChartStore, useGanttTranslations, useRawGanttChartStore } from "./GanttChart";
import type { GanttTask, GanttTaskStatus } from "./GanttChart.types";
import type { GanttTaskNode } from "./GanttChart.types";
import {
  addDays,
  calculateTaskPosition,
  computeCriticalPath,
  getDaysInRange,
  getDisplayRange,
  getISOWeekNumber,
  getMonthsInRange,
  getQuartersInRange,
  getVisibleTasks,
  getWeeksInRange,
} from "./util/gantt-chart.util";
import type { TimelineRange } from "./util/gantt-chart.util";
import { GanttTimelineHeader } from "./GanttTimelineHeader";
import type { HeaderColumn, HeaderGroup } from "./GanttTimelineHeader";
import {
  BAR_HEIGHT,
  COLUMN_WIDTH_DAY,
  COLUMN_WIDTH_MONTH,
  COLUMN_WIDTH_QUARTER,
  COLUMN_WIDTH_WEEK,
  HEADER_HEIGHT,
  ROW_HEIGHT,
} from "./GanttChart.constants";

const BAR_COLOR: Record<string, string> = {
  planned: "warning.light",
  "in-progress": "info.main",
  done: "success.main",
  blocked: "error.main",
};

const MS_PER_DAY = 86_400_000;

// ---------------------------------------------------------------------------
// SVG-Abhängigkeitspfeile
// ---------------------------------------------------------------------------

type DependencyLine = {
  key: string;
  d: string;
};

/**
 * Berechnet Z-förmige Pfadkoordinaten für alle sichtbaren Finish-to-Start-Abhängigkeiten.
 * Nicht sichtbare Vorgänger (z. B. eingeklappt) werden übersprungen.
 *
 * Drei Routing-Fälle damit das Z immer sichtbar ist:
 *   1. Viel Platz (x2 >> x1)     → Mittelpunkt-Z, ausgewogen
 *   2. Wenig Platz, rechts Platz  → Z mit festem Austrittsversatz nach rechts
 *   3. Am rechten Timeline-Rand   → Umgekehrtes Z: erst nach links, dann runter, dann rechts
 */
function computeDependencyLines(
  visibleTasks: GanttTaskNode[],
  displayRange: TimelineRange,
  totalWidth: number,
): DependencyLine[] {
  if (totalWidth === 0) return [];

  const SEGMENT = 24; // Mindestlänge eines horizontalen Z-Schenkels in Pixeln
  const MARGIN = 8;   // Sicherheitsabstand vom rechten Rand

  const lines: DependencyLine[] = [];
  // Map statt findIndex damit die Berechnung O(n) statt O(n²) bleibt.
  const visibleIndexMap = new Map(visibleTasks.map((t, i) => [t.id, i]));

  for (const successor of visibleTasks) {
    if (!successor.dependencies?.length) continue;

    const succIdx = visibleIndexMap.get(successor.id)!;
    const succPos = calculateTaskPosition(successor, displayRange);
    const x2 = (succPos.left / 100) * totalWidth;
    const y2 = succIdx * ROW_HEIGHT + ROW_HEIGHT / 2;

    for (const predId of successor.dependencies) {
      const predIdx = visibleIndexMap.get(predId);
      if (predIdx === undefined) continue; // Vorgänger nicht sichtbar → kein Pfeil

      const predecessor = visibleTasks[predIdx];
      const predPos = calculateTaskPosition(predecessor, displayRange);
      const x1 = ((predPos.left + predPos.width) / 100) * totalWidth;
      const y1 = predIdx * ROW_HEIGHT + ROW_HEIGHT / 2;

      let xBend: number;
      if (x2 >= x1 + 2 * SEGMENT) {
        // Fall 1: Genug Platz — Mittelpunkt ergibt ein ausgewogenes Z
        xBend = (x1 + x2) / 2;
      } else if (x1 + SEGMENT <= totalWidth - MARGIN) {
        // Fall 2: Wenig Platz, aber rechts noch Luft — fixer Austrittsversatz
        xBend = x1 + SEGMENT;
      } else {
        // Fall 3: Am rechten Rand — nach links umleiten damit der Pfad sichtbar bleibt
        xBend = Math.max(x2 - SEGMENT, MARGIN);
      }

      lines.push({
        key: `${predId}-${successor.id}`,
        d: `M ${x1} ${y1} H ${xBend} V ${y2} H ${x2}`,
      });
    }
  }

  return lines;
}

// ---------------------------------------------------------------------------
// Drag-State-Typen
// ---------------------------------------------------------------------------

type DragType = "move" | "resize" | "progress";

type DragInit = {
  type: DragType;
  taskId: string;
  startX: number;
  originalStart: Date;
  originalEnd: Date;
  initialProgress?: number;
  barWidthPx?: number;
};

type ActiveDrag = { taskId: string; type: DragType; deltaDays: number; newProgress?: number };

// ---------------------------------------------------------------------------
// Komponente
// ---------------------------------------------------------------------------

type GanttTimelineProps = {
  scrollRef: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
  onTaskClick?: (task: GanttTask) => void;
  onMilestoneClick?: (task: GanttTask) => void;
  draggable?: boolean;
  resizable?: boolean;
  progressDraggable?: boolean;
  showCriticalPath?: boolean;
  virtualizeRows?: boolean;
  onTaskMoved?: (task: GanttTask, newStart: Date, newEnd: Date) => void;
  onTaskResized?: (task: GanttTask, newEnd: Date) => void;
  onTasksChange?: (tasks: GanttTask[]) => void;
  onStatusChange?: (task: GanttTask, status: GanttTaskStatus) => void;
};

export function GanttTimeline({
  scrollRef,
  onScroll,
  onTaskClick,
  onMilestoneClick,
  draggable = false,
  resizable = false,
  progressDraggable = false,
  showCriticalPath = false,
  virtualizeRows = false,
  onTaskMoved,
  onTaskResized,
  onTasksChange,
  onStatusChange,
}: GanttTimelineProps) {
  const theme = useTheme();
  const taskTree = useGanttChartStore((s) => s.taskTree);
  const allTasks = useGanttChartStore((s) => s.tasks);
  const expandedIds = useGanttChartStore((s) => s.expandedIds);
  const timelineRange = useGanttChartStore((s) => s.timelineRange);
  const timeScale = useGanttChartStore((s) => s.timeScale);
  const updateTask = useGanttChartStore((s) => s.updateTask);
  const rawStore = useRawGanttChartStore();
  const t = useGanttTranslations();

  // Jede Instanz braucht eine eigene Marker-ID damit mehrere GanttCharts auf einer Seite
  // nicht dieselbe SVG-defs-Referenz teilen.
  const instanceId = useId().replace(/:/g, "");
  const arrowMarkerId = `gantt-arrow-${instanceId}`;

  // Selector würde bei jedem Aufruf eine neue Array-Referenz liefern → Endlosschleife.
  const visibleTasks = useMemo(
    () => getVisibleTasks(taskTree, expandedIds),
    [taskTree, expandedIds],
  );

  // Anzeigebereich auf Spalten-Grenzen ausweiten damit Balken-Prozente korrekt ausgerichtet sind.
  const displayRange = useMemo(
    () => getDisplayRange(timelineRange, timeScale),
    [timelineRange, timeScale],
  );

  const columns = useMemo((): HeaderColumn[] => {
    if (timeScale === "days") {
      return getDaysInRange(displayRange).map((d) => ({
        key: d.toISOString(),
        label: String(d.getDate()),
        width: COLUMN_WIDTH_DAY,
        isWeekend: d.getDay() === 0 || d.getDay() === 6,
      }));
    }
    if (timeScale === "weeks") {
      return getWeeksInRange(displayRange).map((w) => ({
        key: w.toISOString(),
        label: `${t.weekColumnPrefix}${getISOWeekNumber(w)}`,
        width: COLUMN_WIDTH_WEEK,
      }));
    }
    if (timeScale === "quarters") {
      return getQuartersInRange(displayRange).map((q) => ({
        key: q.key,
        label: q.label,
        width: COLUMN_WIDTH_QUARTER,
      }));
    }
    return getMonthsInRange(displayRange).map((m) => ({
      key: m.toISOString(),
      label: m.toLocaleString(t.dateLocale, { month: "short", year: "2-digit" }),
      width: COLUMN_WIDTH_MONTH,
    }));
  }, [timeScale, displayRange, t.weekColumnPrefix, t.dateLocale]);

  const totalWidth = useMemo(
    () => columns.reduce((sum, col) => sum + col.width, 0),
    [columns],
  );

  // Obere Monatsgruppen für den Zwei-Ebenen-Header der Tages-Skala.
  const groups = useMemo((): HeaderGroup[] | undefined => {
    if (timeScale !== "days") return undefined;
    const monthMap = new Map<string, { label: string; width: number }>();
    for (const col of columns) {
      const d = new Date(col.key);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (!monthMap.has(key)) {
        monthMap.set(key, {
          label: d.toLocaleString(t.dateLocale, { month: "short", year: "2-digit" }),
          width: 0,
        });
      }
      monthMap.get(key)!.width += COLUMN_WIDTH_DAY;
    }
    return Array.from(monthMap.entries()).map(([key, val]) => ({ key, ...val }));
  }, [timeScale, columns, t.dateLocale]);

  const dependencyLines = useMemo(
    () => computeDependencyLines(visibleTasks, displayRange, totalWidth),
    [visibleTasks, displayRange, totalWidth],
  );

  const criticalTaskIds = useMemo(
    () => showCriticalPath ? computeCriticalPath(allTasks) : new Set<string>(),
    [showCriticalPath, allTasks],
  );

  const rowVirtualizer = useVirtualizer({
    count: visibleTasks.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
  });

  // Positionen der Wochenend-Spalten für das Hintergrund-Highlight (nur Tages-Skala).
  const weekendStrips = useMemo(() => {
    if (timeScale !== "days") return [];
    let x = 0;
    return columns.flatMap((col) => {
      const strip = col.isWeekend ? [{ key: col.key, left: x }] : [];
      x += col.width;
      return strip;
    });
  }, [timeScale, columns]);

  // X-Position des heutigen Datums — null wenn außerhalb des sichtbaren Bereichs.
  const todayX = useMemo(() => {
    const now = Date.now();
    const start = displayRange.start.getTime();
    const end = displayRange.end.getTime();
    if (now < start || now > end) return null;
    return ((now - start) / (end - start)) * totalWidth;
  }, [displayRange, totalWidth]);

  // Beim ersten Rendern den heutigen Tag horizontal in die Mitte scrollen.
  useEffect(() => {
    if (todayX === null || !scrollRef.current) return;
    const viewportWidth = scrollRef.current.clientWidth;
    scrollRef.current.scrollLeft = Math.max(0, todayX - viewportWidth / 2);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const gridColumnWidth =
    timeScale === "days"
      ? COLUMN_WIDTH_DAY
      : timeScale === "weeks"
        ? COLUMN_WIDTH_WEEK
        : timeScale === "quarters"
          ? COLUMN_WIDTH_QUARTER
          : COLUMN_WIDTH_MONTH;

  // Zwei-Ebenen-Header (Tages-Skala) ist doppelt so hoch → SVG-Offset anpassen.
  const headerTotalHeight = groups ? HEADER_HEIGHT * 2 : HEADER_HEIGHT;

  // ---------------------------------------------------------------------------
  // Drag & Resize
  // ---------------------------------------------------------------------------

  const dayWidthPxRef = useRef(1);
  dayWidthPxRef.current = totalWidth > 0
    ? totalWidth / ((displayRange.end.getTime() - displayRange.start.getTime()) / MS_PER_DAY)
    : 1;

  // Ref für den Drag-Start (stabile Werte — keine Re-render nötig).
  const dragInitRef = useRef<DragInit | null>(null);
  // Ref für das aktuelle Delta (für Zugriff aus mouseup-Closure ohne stale state).
  const activeDragRef = useRef<ActiveDrag | null>(null);
  // State löst Re-render aus damit Balken-Position während Drag aktualisiert wird.
  const [activeDrag, setActiveDrag] = useState<ActiveDrag | null>(null);
  // Verhindert onClick nach echtem Drag (Maus bewegt sich ≥ 5px).
  const suppressClickRef = useRef(false);

  // Context-Menu-State für Schnell-Statuswechsel per Rechtsklick.
  const [contextMenu, setContextMenu] = useState<{ task: GanttTaskNode; mouseX: number; mouseY: number } | null>(null);

  // Refs damit die Callbacks immer die aktuellen Prop-Werte lesen ohne useCallback-Rebuilds.
  const onTaskMovedRef = useRef(onTaskMoved);
  onTaskMovedRef.current = onTaskMoved;
  const onTaskResizedRef = useRef(onTaskResized);
  onTaskResizedRef.current = onTaskResized;
  const onTasksChangeRef = useRef(onTasksChange);
  onTasksChangeRef.current = onTasksChange;
  const onStatusChangeRef = useRef(onStatusChange);
  onStatusChangeRef.current = onStatusChange;

  const handleBarMouseDown = (e: React.MouseEvent, task: GanttTaskNode, type: DragType) => {
    e.stopPropagation();
    suppressClickRef.current = false;
    dragInitRef.current = {
      type,
      taskId: task.id,
      startX: e.clientX,
      originalStart: task.startDate,
      originalEnd: task.endDate,
    };

    document.body.style.cursor = type === "resize" ? "ew-resize" : "grabbing";

    const onMouseMove = (ev: MouseEvent) => {
      const init = dragInitRef.current;
      if (!init || init.type === "progress") return;
      const deltaPx = ev.clientX - init.startX;
      const deltaDays = Math.round(deltaPx / dayWidthPxRef.current);
      if (Math.abs(deltaPx) >= 5) suppressClickRef.current = true;
      const drag: ActiveDrag = { taskId: init.taskId, type: init.type, deltaDays };
      activeDragRef.current = drag;
      setActiveDrag(drag);
    };

    const onMouseUp = () => {
      document.body.style.cursor = "";
      const init = dragInitRef.current;
      const drag = activeDragRef.current;

      if (init && drag && suppressClickRef.current && drag.deltaDays !== 0) {
        const currentTask = rawStore.getState().tasks.find((t) => t.id === init.taskId);
        if (currentTask) {
          if (drag.type === "move") {
            const newStart = addDays(init.originalStart, drag.deltaDays);
            const newEnd = addDays(init.originalEnd, drag.deltaDays);
            updateTask({ ...currentTask, startDate: newStart, endDate: newEnd });
            onTaskMovedRef.current?.(currentTask, newStart, newEnd);
          } else {
            const rawNewEnd = addDays(init.originalEnd, drag.deltaDays);
            const newEnd = rawNewEnd > init.originalStart
              ? rawNewEnd
              : addDays(init.originalStart, 1);
            updateTask({ ...currentTask, endDate: newEnd });
            onTaskResizedRef.current?.(currentTask, newEnd);
          }
          onTasksChangeRef.current?.(rawStore.getState().tasks);
        }
      }

      dragInitRef.current = null;
      activeDragRef.current = null;
      setActiveDrag(null);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleProgressMouseDown = (
    e: React.MouseEvent,
    task: GanttTaskNode,
    initialProgress: number,
    barWidthPx: number,
  ) => {
    e.stopPropagation();
    suppressClickRef.current = false;
    dragInitRef.current = {
      type: "progress",
      taskId: task.id,
      startX: e.clientX,
      originalStart: task.startDate,
      originalEnd: task.endDate,
      initialProgress,
      barWidthPx,
    };

    document.body.style.cursor = "ew-resize";

    const onMouseMove = (ev: MouseEvent) => {
      const init = dragInitRef.current;
      if (!init || init.type !== "progress") return;
      const deltaPx = ev.clientX - init.startX;
      if (Math.abs(deltaPx) >= 5) suppressClickRef.current = true;
      const deltaPercent = (deltaPx / (init.barWidthPx ?? 1)) * 100;
      const newProgress = Math.round(Math.max(0, Math.min(100, (init.initialProgress ?? 0) + deltaPercent)));
      const drag: ActiveDrag = { taskId: init.taskId, type: "progress", deltaDays: 0, newProgress };
      activeDragRef.current = drag;
      setActiveDrag(drag);
    };

    const onMouseUp = () => {
      document.body.style.cursor = "";
      const init = dragInitRef.current;
      const drag = activeDragRef.current;

      if (init && drag && drag.type === "progress" && drag.newProgress !== undefined && suppressClickRef.current) {
        const currentTask = rawStore.getState().tasks.find((t) => t.id === init.taskId);
        if (currentTask) {
          updateTask({ ...currentTask, progress: drag.newProgress });
          onTasksChangeRef.current?.(rawStore.getState().tasks);
        }
      }

      dragInitRef.current = null;
      activeDragRef.current = null;
      setActiveDrag(null);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const formatDragDate = (d: Date) =>
    d.toLocaleDateString(t.dateLocale, { day: "2-digit", month: "short" });

  return (
    <Box ref={scrollRef} onScroll={onScroll} data-testid="gantt-timeline-scroll" sx={{ flex: 1, overflow: "auto" }}>
      {/* position: relative ist Pflicht damit der SVG-Layer korrekt absolut positioniert wird. */}
      <Box sx={{ minWidth: totalWidth, position: "relative" }}>
        <GanttTimelineHeader columns={columns} groups={groups} />

        {/* Wochenend-Hintergrund — ein Layer für alle Zeilen, pointerEvents: none damit Klicks durchgehen. */}
        {weekendStrips.length > 0 && (
          <Box
            aria-hidden
            data-testid="gantt-weekend-strips"
            sx={{
              position: "absolute",
              top: headerTotalHeight,
              left: 0,
              width: totalWidth,
              height: visibleTasks.length * ROW_HEIGHT,
              pointerEvents: "none",
            }}
          >
            {weekendStrips.map((strip) => (
              <Box
                key={strip.key}
                sx={{
                  position: "absolute",
                  left: strip.left,
                  width: COLUMN_WIDTH_DAY,
                  top: 0,
                  height: "100%",
                  bgcolor: "action.hover",
                }}
              />
            ))}
          </Box>
        )}

        {(() => {
          // Lokale Hilfsfunktion — rendert eine Zeile; virtualTop macht sie absolut positioniert.
          const renderBarRow = (task: GanttTaskNode, rowKey: React.Key, virtualTop?: number) => {
            const isDragging = activeDrag?.taskId === task.id;
            let effectiveTask: GanttTask = task;
            if (isDragging && activeDrag) {
              if (activeDrag.type === "move") {
                effectiveTask = {
                  ...task,
                  startDate: addDays(task.startDate, activeDrag.deltaDays),
                  endDate: addDays(task.endDate, activeDrag.deltaDays),
                };
              } else if (activeDrag.type === "resize") {
                const rawEnd = addDays(task.endDate, activeDrag.deltaDays);
                effectiveTask = {
                  ...task,
                  endDate: rawEnd > task.startDate ? rawEnd : addDays(task.startDate, 1),
                };
              } else if (activeDrag.type === "progress" && activeDrag.newProgress !== undefined) {
                effectiveTask = { ...task, progress: activeDrag.newProgress };
              }
            }

            const { left, width } = calculateTaskPosition(effectiveTask, displayRange);

            return (
              <Box
                key={rowKey}
                data-testid={`gantt-bar-row-${task.id}`}
                style={virtualTop !== undefined
                  ? { position: "absolute", top: virtualTop, left: 0, width: "100%" }
                  : undefined}
                sx={{
                  height: ROW_HEIGHT,
                  position: "relative",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  backgroundImage: (theme) =>
                    `linear-gradient(to right, transparent calc(${gridColumnWidth}px - 1px), ${theme.palette.divider} calc(${gridColumnWidth}px - 1px), ${theme.palette.divider} ${gridColumnWidth}px)`,
                  backgroundSize: `${gridColumnWidth}px 100%`,
                  backgroundRepeat: "repeat-x",
                }}
              >
                {task.isMilestone ? (
                  left >= 0 && left <= 100 ? (
                    <Box
                      data-testid={`gantt-milestone-${task.id}`}
                      sx={{
                        position: "absolute",
                        left: `${left}%`,
                        top: "50%",
                        width: 12,
                        height: 12,
                        bgcolor: "warning.main",
                        transform: "translate(-50%, -50%) rotate(45deg)",
                        cursor: onMilestoneClick ? "pointer" : "default",
                        boxShadow: criticalTaskIds.has(task.id)
                          ? `0 0 0 2.5px ${theme.palette.error.main}`
                          : undefined,
                        "&:hover": onMilestoneClick ? { opacity: 0.8 } : undefined,
                      }}
                      onClick={() => onMilestoneClick?.(task)}
                    />
                  ) : null
                ) : (() => {
                  const clampedLeft = Math.max(0, left);
                  const clampedRight = Math.min(100, left + Math.max(width, 0.5));
                  const clampedWidth = clampedRight - clampedLeft;
                  if (clampedWidth <= 0) return null;
                  return (
                    <>
                      {isDragging && activeDrag && activeDrag.type !== "progress" && activeDrag.deltaDays !== 0 && (
                        <Box
                          sx={{
                            position: "absolute",
                            left: `${clampedLeft}%`,
                            top: 2,
                            bgcolor: "grey.800",
                            color: "common.white",
                            borderRadius: 0.5,
                            px: 0.75,
                            lineHeight: "18px",
                            fontSize: "0.65rem",
                            whiteSpace: "nowrap",
                            pointerEvents: "none",
                            zIndex: 100,
                          }}
                        >
                          {activeDrag.type === "move"
                            ? `${formatDragDate(effectiveTask.startDate)} – ${formatDragDate(effectiveTask.endDate)}`
                            : `→ ${formatDragDate(effectiveTask.endDate)}`}
                        </Box>
                      )}
                      {isDragging && activeDrag?.type === "progress" && activeDrag.newProgress !== undefined && (
                        <Box
                          sx={{
                            position: "absolute",
                            left: `${clampedLeft}%`,
                            top: 2,
                            bgcolor: "grey.800",
                            color: "common.white",
                            borderRadius: 0.5,
                            px: 0.75,
                            lineHeight: "18px",
                            fontSize: "0.65rem",
                            whiteSpace: "nowrap",
                            pointerEvents: "none",
                            zIndex: 100,
                          }}
                        >
                          {activeDrag.newProgress}%
                        </Box>
                      )}
                      <Box
                        data-testid={`gantt-bar-${task.id}`}
                        sx={{
                          position: "absolute",
                          left: `${clampedLeft}%`,
                          width: `${clampedWidth}%`,
                          height: BAR_HEIGHT,
                          top: "50%",
                          transform: "translateY(-50%)",
                          bgcolor: BAR_COLOR[task.status] ?? "grey.300",
                          borderRadius: 1,
                          overflow: "hidden",
                          opacity: isDragging ? 0.75 : 1,
                          boxShadow: criticalTaskIds.has(task.id)
                            ? `inset 0 0 0 2.5px ${theme.palette.error.main}`
                            : undefined,
                          cursor: isDragging
                            ? "grabbing"
                            : draggable
                              ? "grab"
                              : onTaskClick
                                ? "pointer"
                                : "default",
                          userSelect: "none",
                          "&:hover": (draggable || onTaskClick) ? { opacity: isDragging ? 0.75 : 0.8 } : undefined,
                        }}
                        onMouseDown={draggable ? (e) => handleBarMouseDown(e, task, "move") : undefined}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setContextMenu({ task, mouseX: e.clientX, mouseY: e.clientY });
                        }}
                        onClick={() => {
                          if (suppressClickRef.current) {
                            suppressClickRef.current = false;
                            return;
                          }
                          onTaskClick?.(task);
                        }}
                      >
                        {effectiveTask.progress !== undefined && effectiveTask.progress > 0 && (
                          <Box
                            data-testid={`gantt-progress-${task.id}`}
                            sx={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              width: `${Math.min(effectiveTask.progress, 100)}%`,
                              height: "100%",
                              bgcolor: "currentColor",
                              opacity: 0.4,
                            }}
                          />
                        )}
                        {progressDraggable && (
                          <Box
                            data-testid={`gantt-progress-handle-${task.id}`}
                            sx={{
                              position: "absolute",
                              left: `${Math.min(effectiveTask.progress ?? 0, 100)}%`,
                              top: 0,
                              width: 6,
                              height: "100%",
                              transform: "translateX(-50%)",
                              cursor: "ew-resize",
                              bgcolor: "rgba(255,255,255,0.35)",
                            }}
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              const barWidthPx = (clampedWidth / 100) * totalWidth;
                              handleProgressMouseDown(e, task, effectiveTask.progress ?? 0, barWidthPx);
                            }}
                          />
                        )}
                        {resizable && (
                          <Box
                            data-testid={`gantt-resize-handle-${task.id}`}
                            sx={{
                              position: "absolute",
                              right: 0,
                              top: 0,
                              width: 6,
                              height: "100%",
                              cursor: "ew-resize",
                            }}
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              handleBarMouseDown(e, task, "resize");
                            }}
                          />
                        )}
                      </Box>
                    </>
                  );
                })()}
              </Box>
            );
          };

          return virtualizeRows ? (
            <Box sx={{ position: "relative", height: rowVirtualizer.getTotalSize() }}>
              {rowVirtualizer.getVirtualItems().map((vRow) =>
                renderBarRow(visibleTasks[vRow.index], vRow.key, vRow.start)
              )}
            </Box>
          ) : (
            <>{visibleTasks.map((task) => renderBarRow(task, task.id))}</>
          );
        })()}

        {/* Kontext-Menü für Schnell-Statuswechsel per Rechtsklick auf einen Balken. */}
        <Menu
          open={contextMenu !== null}
          onClose={() => setContextMenu(null)}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          {(["planned", "in-progress", "done", "blocked"] as GanttTaskStatus[]).map((s) => {
            const labels: Record<GanttTaskStatus, string> = {
              planned: t.statusPlanned,
              "in-progress": t.statusInProgress,
              done: t.statusDone,
              blocked: t.statusBlocked,
            };
            return (
              <MenuItem
                key={s}
                selected={contextMenu?.task.status === s}
                data-testid={`gantt-status-menu-${s}`}
                onClick={() => {
                  if (!contextMenu) return;
                  const currentTask =
                    rawStore.getState().tasks.find((tt) => tt.id === contextMenu.task.id) ??
                    contextMenu.task;
                  updateTask({ ...currentTask, status: s });
                  onStatusChangeRef.current?.(currentTask, s);
                  onTasksChangeRef.current?.(rawStore.getState().tasks);
                  setContextMenu(null);
                }}
              >
                {labels[s]}
              </MenuItem>
            );
          })}
        </Menu>

        {/* SVG-Layer über allen Balken — pointer-events: none damit Klicks durchgehen. */}
        {(dependencyLines.length > 0 || todayX !== null) && (
          <svg
            data-testid="gantt-dependency-arrows"
            style={{
              position: "absolute",
              top: headerTotalHeight,
              left: 0,
              width: totalWidth,
              height: visibleTasks.length * ROW_HEIGHT,
              pointerEvents: "none",
              overflow: "visible",
            }}
          >
            {dependencyLines.length > 0 && (
              <defs>
                <marker
                  id={arrowMarkerId}
                  markerWidth="6"
                  markerHeight="4"
                  refX="5"
                  refY="2"
                  orient="auto"
                >
                  <polygon points="0 0, 6 2, 0 4" fill="currentColor" />
                </marker>
              </defs>
            )}
            {dependencyLines.map((line) => (
              <path
                key={line.key}
                data-testid={`gantt-dep-${line.key}`}
                d={line.d}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeOpacity={0.4}
                markerEnd={`url(#${arrowMarkerId})`}
              />
            ))}
            {todayX !== null && (
              <line
                data-testid="gantt-today-line"
                x1={todayX}
                y1={0}
                x2={todayX}
                y2={visibleTasks.length * ROW_HEIGHT}
                stroke={theme.palette.primary.main}
                strokeWidth={1.5}
                strokeDasharray="4 2"
              />
            )}
          </svg>
        )}
      </Box>
    </Box>
  );
}
