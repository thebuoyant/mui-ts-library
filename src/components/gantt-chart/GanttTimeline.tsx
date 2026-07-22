import { useEffect, useId, useMemo, useRef, useState } from "react";

import { useVirtualizer } from "@tanstack/react-virtual";
import { type RefObject, type UIEventHandler } from "react";
import { Box, useTheme } from "@mui/material";
import { useGanttChartStore, useGanttTheme, useGanttTranslations, useGanttWorkingDays, useRawGanttChartStore } from "./GanttChart";
import type { GanttTask, GanttTaskStatus } from "./GanttChart.types";
import type { GanttTaskNode } from "./GanttChart.types";
import { useGanttDrag } from "./hooks/useGanttDrag";
import {
  calculateTaskPosition,
  computeCriticalPath,
  filterByAssignee,
  getDaysInRange,
  getDisplayRange,
  getISOWeekNumber,
  getMonthsInRange,
  getQuartersInRange,
  getVisibleTasks,
  getWeeksInRange,
  isWorkingDay,
} from "./util/gantt-chart.util";
import type { TimelineRange } from "./util/gantt-chart.util";
import { GanttTimelineHeader } from "./GanttTimelineHeader";
import { GanttBarRow } from "./GanttBarRow";
import { GanttWeekendStrips } from "./GanttWeekendStrips";
import { GanttStatusContextMenu } from "./GanttStatusContextMenu";
import { GanttDependencyArrows } from "./GanttDependencyArrows";
import type { HeaderColumn, HeaderGroup } from "./GanttTimelineHeader";
import {
  COLUMN_WIDTH_DAY,
  COLUMN_WIDTH_MONTH,
  COLUMN_WIDTH_QUARTER,
  COLUMN_WIDTH_WEEK,
  HEADER_HEIGHT,
  ROW_HEIGHT,
} from "./GanttChart.constants";

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
  onDragStart?: (task: GanttTask, type: "move" | "resize") => void;
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
  onDragStart,
  onTaskMoved,
  onTaskResized,
  onTasksChange,
  onStatusChange,
}: GanttTimelineProps) {
  const taskTree = useGanttChartStore((s) => s.taskTree);
  const allTasks = useGanttChartStore((s) => s.tasks);
  const expandedIds = useGanttChartStore((s) => s.expandedIds);
  const timelineRange = useGanttChartStore((s) => s.timelineRange);
  const timeScale   = useGanttChartStore((s) => s.timeScale);
  const updateTask  = useGanttChartStore((s) => s.updateTask);
  const rawStore    = useRawGanttChartStore();
  const t           = useGanttTranslations();
  const muiTheme    = useTheme();
  const { todayLineColor } = useGanttTheme();
  const { workdays: wd, normalizedHolidays: nh } = useGanttWorkingDays();
  // Jede Instanz braucht eine eigene Marker-ID damit mehrere GanttCharts auf einer Seite
  // nicht dieselbe SVG-defs-Referenz teilen.
  const instanceId = useId().replace(/:/g, "");
  const arrowMarkerId = `gantt-arrow-${instanceId}`;

  const assigneeFilter = useGanttChartStore((s) => s.assigneeFilter);

  // Selector würde bei jedem Aufruf eine neue Array-Referenz liefern → Endlosschleife.
  const visibleTasks = useMemo(
    () => {
      const flat = getVisibleTasks(taskTree, expandedIds);
      return assigneeFilter ? filterByAssignee(flat, assigneeFilter) : flat;
    },
    [taskTree, expandedIds, assigneeFilter],
  );

  // Anzeigebereich auf Spalten-Grenzen ausweiten damit Balken-Prozente korrekt ausgerichtet sind.
  const displayRange = useMemo(
    () => getDisplayRange(timelineRange, timeScale),
    [timelineRange, timeScale],
  );

  const columns = useMemo((): HeaderColumn[] => {
    if (timeScale === "days") {
      return getDaysInRange(displayRange).map((d) => {
        // isWeekend: ohne workdays-Prop → klassische Sa/So-Erkennung (Abwärtskompatibilität);
        // mit workdays → jeder Wochentag der nicht im Array steht gilt als Wochenende.
        const isWeekend = wd.length > 0
          ? !wd.includes(d.getDay())
          : d.getDay() === 0 || d.getDay() === 6;
        // isHoliday: Wochentag wäre Arbeitstag, ist aber als Feiertag ausgeschlossen
        const isHoliday = !isWeekend && wd.length > 0 && !isWorkingDay(d, wd, nh);
        return {
          key: d.toISOString(),
          label: String(d.getDate()),
          width: COLUMN_WIDTH_DAY,
          isWeekend,
          isHoliday,
        };
      });
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
  }, [timeScale, displayRange, t.weekColumnPrefix, t.dateLocale, wd, nh]);

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

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: visibleTasks.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
  });

  // Positionen nicht-arbeitender Tage (Wochenenden + Feiertage) für das Hintergrund-Highlight (nur Tages-Skala).
  const weekendStrips = useMemo(() => {
    if (timeScale !== "days") return [];
    let x = 0;
    return columns.flatMap((col) => {
      const nonWorking = col.isWeekend || col.isHoliday;
      const strip = nonWorking ? [{ key: col.key, left: x, isHoliday: col.isHoliday }] : [];
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

  // Tooltip-Text für den Heute-Chip: lokalisiertes Langdatum, z. B. "Mittwoch, 28. Mai 2026".
  const todayTooltip = useMemo(
    () =>
      new Date().toLocaleDateString(t.dateLocale, {
        weekday: "long",
        day:     "numeric",
        month:   "long",
        year:    "numeric",
      }),
    [t.dateLocale],
  );

  // Farbe der Heute-Linie und des Chips — aus ganttTheme oder MUI primary.
  const resolvedTodayColor = todayLineColor || muiTheme.palette.primary.main;

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
  // Drag & Resize — ausgelagert in useGanttDrag
  // ---------------------------------------------------------------------------

  const { activeDrag, suppressClickRef, handleBarMouseDown, handleProgressMouseDown, formatDragDate } = useGanttDrag({
    totalWidth,
    displayRange,
    onDragStart,
    onTaskMoved,
    onTaskResized,
    onTasksChange,
  });

  // Context-Menu-State für Schnell-Statuswechsel per Rechtsklick.
  const [contextMenu, setContextMenu] = useState<{ task: GanttTaskNode; mouseX: number; mouseY: number } | null>(null);

  // Stable refs für Callbacks im Status-Context-Menu (Callback-Ref-Muster — siehe useGanttDrag).
  const onStatusChangeRef  = useRef(onStatusChange);  onStatusChangeRef.current  = onStatusChange;
  const onTasksChangeRef   = useRef(onTasksChange);   onTasksChangeRef.current   = onTasksChange;

  return (
    <Box ref={scrollRef} onScroll={onScroll} data-testid="gantt-timeline-scroll" sx={{ flex: 1, overflow: "auto" }}>
      {/* position: relative ist Pflicht damit der SVG-Layer korrekt absolut positioniert wird. */}
      <Box sx={{ minWidth: totalWidth, position: "relative" }}>
        <GanttTimelineHeader
          columns={columns}
          groups={groups}
          todayX={todayX}
          todayLabel={t.todayLabel}
          todayTooltip={todayTooltip}
          todayColor={resolvedTodayColor}
        />

        <GanttWeekendStrips
          strips={weekendStrips}
          totalWidth={totalWidth}
          height={visibleTasks.length * ROW_HEIGHT}
          top={headerTotalHeight}
        />

        {virtualizeRows ? (
          <Box sx={{ position: "relative", height: rowVirtualizer.getTotalSize() }}>
            {rowVirtualizer.getVirtualItems().map((vRow) => (
              <GanttBarRow
                key={vRow.key}
                task={visibleTasks[vRow.index]}
                virtualTop={vRow.start}
                activeDrag={activeDrag}
                displayRange={displayRange}
                totalWidth={totalWidth}
                gridColumnWidth={gridColumnWidth}
                criticalTaskIds={criticalTaskIds}
                draggable={draggable}
                resizable={resizable}
                progressDraggable={progressDraggable}
                onTaskClick={onTaskClick}
                onMilestoneClick={onMilestoneClick}
                onContextMenu={(task, mouseX, mouseY) => setContextMenu({ task, mouseX, mouseY })}
                suppressClickRef={suppressClickRef}
                handleBarMouseDown={handleBarMouseDown}
                handleProgressMouseDown={handleProgressMouseDown}
                formatDragDate={formatDragDate}
              />
            ))}
          </Box>
        ) : (
          <>
            {visibleTasks.map((task) => (
              <GanttBarRow
                key={task.id}
                task={task}
                activeDrag={activeDrag}
                displayRange={displayRange}
                totalWidth={totalWidth}
                gridColumnWidth={gridColumnWidth}
                criticalTaskIds={criticalTaskIds}
                draggable={draggable}
                resizable={resizable}
                progressDraggable={progressDraggable}
                onTaskClick={onTaskClick}
                onMilestoneClick={onMilestoneClick}
                onContextMenu={(task, mouseX, mouseY) => setContextMenu({ task, mouseX, mouseY })}
                suppressClickRef={suppressClickRef}
                handleBarMouseDown={handleBarMouseDown}
                handleProgressMouseDown={handleProgressMouseDown}
                formatDragDate={formatDragDate}
              />
            ))}
          </>
        )}

        <GanttStatusContextMenu
          contextMenu={contextMenu}
          onClose={() => setContextMenu(null)}
          onSelect={(task, status) => {
            const currentTask =
              rawStore.getState().tasks.find((tt) => tt.id === task.id) ?? task;
            updateTask({ ...currentTask, status });
            onStatusChangeRef.current?.(currentTask, status);
            onTasksChangeRef.current?.(rawStore.getState().tasks);
            setContextMenu(null);
          }}
        />

        <GanttDependencyArrows
          dependencyLines={dependencyLines}
          todayX={todayX}
          totalWidth={totalWidth}
          height={visibleTasks.length * ROW_HEIGHT}
          top={headerTotalHeight}
          arrowMarkerId={arrowMarkerId}
        />
      </Box>
    </Box>
  );
}
