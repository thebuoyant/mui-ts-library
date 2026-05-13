import { useEffect, useId, useMemo } from "react";
import { type RefObject, type UIEventHandler } from "react";
import { Box, useTheme } from "@mui/material";
import { useGanttChartStore, useGanttTranslations } from "./GanttChart";
import type { GanttTask } from "./GanttChart.types";
import type { GanttTaskNode } from "./GanttChart.types";
import {
  calculateTaskPosition,
  endOfQuarter,
  getDaysInRange,
  getISOWeekNumber,
  getMonthsInRange,
  getQuartersInRange,
  getVisibleTasks,
  getWeeksInRange,
  startOfQuarter,
  startOfWeek,
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
};

export function GanttTimeline({
  scrollRef,
  onScroll,
  onTaskClick,
  onMilestoneClick,
}: GanttTimelineProps) {
  const theme = useTheme();
  const taskTree = useGanttChartStore((s) => s.taskTree);
  const expandedIds = useGanttChartStore((s) => s.expandedIds);
  const timelineRange = useGanttChartStore((s) => s.timelineRange);
  const timeScale = useGanttChartStore((s) => s.timeScale);
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
  const displayRange = useMemo((): TimelineRange => {
    if (timeScale === "weeks") {
      return { start: startOfWeek(timelineRange.start), end: timelineRange.end };
    }
    if (timeScale === "quarters") {
      return {
        start: startOfQuarter(timelineRange.start),
        end: endOfQuarter(timelineRange.end),
      };
    }
    return timelineRange;
  }, [timeScale, timelineRange]);

  const columns = useMemo((): HeaderColumn[] => {
    if (timeScale === "days") {
      return getDaysInRange(displayRange).map((d) => ({
        key: d.toISOString(),
        label: String(d.getDate()),
        width: COLUMN_WIDTH_DAY,
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

  return (
    <Box ref={scrollRef} onScroll={onScroll} sx={{ flex: 1, overflow: "auto" }}>
      {/* position: relative ist Pflicht damit der SVG-Layer korrekt absolut positioniert wird. */}
      <Box sx={{ minWidth: totalWidth, position: "relative" }}>
        <GanttTimelineHeader columns={columns} groups={groups} />

        {visibleTasks.map((task) => {
          const { left, width } = calculateTaskPosition(task, displayRange);

          return (
            <Box
              key={task.id}
              data-testid={`gantt-bar-row-${task.id}`}
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
                // Meilensteine außerhalb des sichtbaren Bereichs nicht rendern.
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
                      "&:hover": onMilestoneClick ? { opacity: 0.8 } : undefined,
                    }}
                    onClick={() => onMilestoneClick?.(task)}
                  />
                ) : null
              ) : (() => {
                // Balken auf den sichtbaren Bereich [0%, 100%] klemmen damit absolute
                // Elemente außerhalb der Timeline nicht den Scroll-Bereich ausdehnen.
                const clampedLeft = Math.max(0, left);
                const clampedRight = Math.min(100, left + Math.max(width, 0.5));
                const clampedWidth = clampedRight - clampedLeft;
                if (clampedWidth <= 0) return null;
                return (
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
                      cursor: onTaskClick ? "pointer" : "default",
                      "&:hover": onTaskClick ? { opacity: 0.8 } : undefined,
                    }}
                    onClick={() => onTaskClick?.(task)}
                  >
                    {task.progress !== undefined && task.progress > 0 && (
                      <Box
                        data-testid={`gantt-progress-${task.id}`}
                        sx={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          width: `${Math.min(task.progress, 100)}%`,
                          height: "100%",
                          bgcolor: "currentColor",
                          opacity: 0.4,
                        }}
                      />
                    )}
                  </Box>
                );
              })()}
            </Box>
          );
        })}

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
