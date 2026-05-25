/**
 * useGanttDrag — Kapselt die gesamte Drag & Drop / Resize / Progress-Logik des GanttCharts.
 *
 * Muster für komplexe Interaktions-Hooks (auch für zukünftige Komponenten):
 *
 * 1. STABLE CALLBACK REFS — Callbacks (onTaskMoved, onTaskResized, …) werden in Refs
 *    gespiegelt. So können document-Event-Listener immer die aktuellen Props lesen,
 *    ohne bei jeder Prop-Änderung neu registriert werden zu müssen.
 *
 * 2. ZWEI-EBENEN STATE — dragInitRef + activeDragRef halten stabile Werte (kein Re-render),
 *    setActiveDrag(state) löst nur dann einen Re-render aus wenn die UI aktualisiert
 *    werden soll (Balken-Position während des Ziehens). Dadurch kein unnötiges Rendering.
 *
 * 3. DOCUMENT-LEVEL LISTENERS — mousemove/mouseup auf document statt auf dem Element,
 *    damit Drag auch funktioniert wenn der Mauszeiger den Balken verlässt.
 *
 * 4. SUPPRESS-CLICK — suppressClickRef verhindert dass ein onClick ausgelöst wird
 *    wenn der User eigentlich gezogen hat (≥ 5px Bewegung).
 */

import { useRef, useState } from "react";
import { useGanttChartStore, useRawGanttChartStore, useGanttTranslations } from "../GanttChart";
import type { GanttTask, GanttTaskNode } from "../GanttChart.types";
import { addDays } from "../util/gantt-chart.util";
import type { TimelineRange } from "../util/gantt-chart.util";

const MS_PER_DAY = 86_400_000;

// ---------------------------------------------------------------------------
// Typen — exportiert damit GanttTimeline den activeDrag-State für das Rendering nutzen kann
// ---------------------------------------------------------------------------

export type DragType = "move" | "resize" | "progress";

export type ActiveDrag = {
  taskId: string;
  type: DragType;
  deltaDays: number;
  newProgress?: number;
};

type DragInit = {
  type: DragType;
  taskId: string;
  startX: number;
  originalStart: Date;
  originalEnd: Date;
  initialProgress?: number;
  barWidthPx?: number;
};

// ---------------------------------------------------------------------------
// Hook-Interface
// ---------------------------------------------------------------------------

type UseGanttDragOptions = {
  totalWidth: number;
  displayRange: TimelineRange;
  onTaskMoved?: (task: GanttTask, newStart: Date, newEnd: Date) => void;
  onTaskResized?: (task: GanttTask, newEnd: Date) => void;
  onTasksChange?: (tasks: GanttTask[]) => void;
};

type UseGanttDragReturn = {
  activeDrag: ActiveDrag | null;
  suppressClickRef: React.MutableRefObject<boolean>;
  handleBarMouseDown: (e: React.MouseEvent, task: GanttTaskNode, type: DragType) => void;
  handleProgressMouseDown: (e: React.MouseEvent, task: GanttTaskNode, initialProgress: number, barWidthPx: number) => void;
  formatDragDate: (d: Date) => string;
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useGanttDrag({
  totalWidth,
  displayRange,
  onTaskMoved,
  onTaskResized,
  onTasksChange,
}: UseGanttDragOptions): UseGanttDragReturn {
  const updateTask = useGanttChartStore((s) => s.updateTask);
  const rawStore   = useRawGanttChartStore();
  const t          = useGanttTranslations();

  // Pixel pro Tag — als Ref damit mousemove-Closures immer den aktuellen Wert lesen.
  const dayWidthPxRef = useRef(1);
  dayWidthPxRef.current =
    totalWidth > 0
      ? totalWidth / ((displayRange.end.getTime() - displayRange.start.getTime()) / MS_PER_DAY)
      : 1;

  // Stabile Callback-Refs (Muster 1) — kein useCallback-Rebuild bei Prop-Änderungen nötig.
  const onTaskMovedRef   = useRef(onTaskMoved);   onTaskMovedRef.current   = onTaskMoved;
  const onTaskResizedRef = useRef(onTaskResized); onTaskResizedRef.current = onTaskResized;
  const onTasksChangeRef = useRef(onTasksChange); onTasksChangeRef.current = onTasksChange;

  // Zwei-Ebenen State (Muster 2)
  const dragInitRef    = useRef<DragInit | null>(null);
  const activeDragRef  = useRef<ActiveDrag | null>(null);
  const [activeDrag, setActiveDrag] = useState<ActiveDrag | null>(null);

  // Suppress-Click (Muster 4)
  const suppressClickRef = useRef(false);

  // ---------------------------------------------------------------------------
  // Move / Resize
  // ---------------------------------------------------------------------------

  const handleBarMouseDown = (e: React.MouseEvent, task: GanttTaskNode, type: DragType) => {
    e.stopPropagation();
    suppressClickRef.current = false;
    dragInitRef.current = {
      type,
      taskId:        task.id,
      startX:        e.clientX,
      originalStart: task.startDate,
      originalEnd:   task.endDate,
    };

    document.body.style.cursor = type === "resize" ? "ew-resize" : "grabbing";

    const onMouseMove = (ev: MouseEvent) => {
      const init = dragInitRef.current;
      if (!init || init.type === "progress") return;
      const deltaPx  = ev.clientX - init.startX;
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
            const newEnd   = addDays(init.originalEnd,   drag.deltaDays);
            updateTask({ ...currentTask, startDate: newStart, endDate: newEnd });
            onTaskMovedRef.current?.(currentTask, newStart, newEnd);
          } else {
            const rawNewEnd = addDays(init.originalEnd, drag.deltaDays);
            const newEnd    = rawNewEnd > init.originalStart
              ? rawNewEnd
              : addDays(init.originalStart, 1);
            updateTask({ ...currentTask, endDate: newEnd });
            onTaskResizedRef.current?.(currentTask, newEnd);
          }
          onTasksChangeRef.current?.(rawStore.getState().tasks);
        }
      }

      dragInitRef.current   = null;
      activeDragRef.current = null;
      setActiveDrag(null);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup",   onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup",   onMouseUp);
  };

  // ---------------------------------------------------------------------------
  // Progress
  // ---------------------------------------------------------------------------

  const handleProgressMouseDown = (
    e: React.MouseEvent,
    task: GanttTaskNode,
    initialProgress: number,
    barWidthPx: number,
  ) => {
    e.stopPropagation();
    suppressClickRef.current = false;
    dragInitRef.current = {
      type:          "progress",
      taskId:        task.id,
      startX:        e.clientX,
      originalStart: task.startDate,
      originalEnd:   task.endDate,
      initialProgress,
      barWidthPx,
    };

    document.body.style.cursor = "ew-resize";

    const onMouseMove = (ev: MouseEvent) => {
      const init = dragInitRef.current;
      if (!init || init.type !== "progress") return;
      const deltaPx     = ev.clientX - init.startX;
      if (Math.abs(deltaPx) >= 5) suppressClickRef.current = true;
      const deltaPercent = (deltaPx / (init.barWidthPx ?? 1)) * 100;
      const newProgress  = Math.round(Math.max(0, Math.min(100, (init.initialProgress ?? 0) + deltaPercent)));
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

      dragInitRef.current   = null;
      activeDragRef.current = null;
      setActiveDrag(null);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup",   onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup",   onMouseUp);
  };

  // ---------------------------------------------------------------------------
  // Hilfsfunktion für Drag-Tooltip-Datumsformatierung
  // ---------------------------------------------------------------------------

  const formatDragDate = (d: Date) =>
    d.toLocaleDateString(t.dateLocale, { day: "2-digit", month: "short" });

  return {
    activeDrag,
    suppressClickRef,
    handleBarMouseDown,
    handleProgressMouseDown,
    formatDragDate,
  };
}
