import { useMemo } from "react";
import { type RefObject, type UIEventHandler } from "react";
import { Box } from "@mui/material";
import { useGanttChartStore } from "./GanttChart";
import type { GanttTask } from "./GanttChart.types";
import {
  calculateTaskPosition,
  endOfQuarter,
  getMonthsInRange,
  getQuartersInRange,
  getVisibleTasks,
  startOfQuarter,
} from "./util/gantt-chart.util";
import type { TimelineRange } from "./util/gantt-chart.util";
import { GanttTimelineHeader } from "./GanttTimelineHeader";
import type { HeaderColumn } from "./GanttTimelineHeader";
import {
  BAR_HEIGHT,
  COLUMN_WIDTH_MONTH,
  COLUMN_WIDTH_QUARTER,
  ROW_HEIGHT,
} from "./GanttChart.constants";

const BAR_COLOR: Record<string, string> = {
  planned: "warning.light",
  "in-progress": "info.main",
  done: "success.main",
  blocked: "error.main",
};

type GanttTimelineProps = {
  scrollRef: RefObject<HTMLDivElement>;
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
  const taskTree = useGanttChartStore((s) => s.taskTree);
  const expandedIds = useGanttChartStore((s) => s.expandedIds);
  const timelineRange = useGanttChartStore((s) => s.timelineRange);
  const timeScale = useGanttChartStore((s) => s.timeScale);

  // Selector würde bei jedem Aufruf eine neue Array-Referenz liefern → Endlosschleife.
  const visibleTasks = useMemo(
    () => getVisibleTasks(taskTree, expandedIds),
    [taskTree, expandedIds],
  );

  // Für Quartale muss der Anzeigebereich auf Quartalsgrenzen ausgeweitet werden,
  // damit die Balken-Prozentwerte mit den Spalten-Anfängen übereinstimmen.
  const displayRange = useMemo((): TimelineRange => {
    if (timeScale === "quarters") {
      return {
        start: startOfQuarter(timelineRange.start),
        end: endOfQuarter(timelineRange.end),
      };
    }
    return timelineRange;
  }, [timeScale, timelineRange]);

  const columns = useMemo((): HeaderColumn[] => {
    if (timeScale === "quarters") {
      return getQuartersInRange(displayRange).map((q) => ({
        key: q.key,
        label: q.label,
        width: COLUMN_WIDTH_QUARTER,
      }));
    }
    return getMonthsInRange(displayRange).map((m) => ({
      key: m.toISOString(),
      label: m.toLocaleString("de-DE", { month: "short", year: "2-digit" }),
      width: COLUMN_WIDTH_MONTH,
    }));
  }, [timeScale, displayRange]);

  const totalWidth = useMemo(
    () => columns.reduce((sum, col) => sum + col.width, 0),
    [columns],
  );

  // Breite der engsten Spalte — bestimmt den Abstand der Gitterlinien.
  const gridColumnWidth = timeScale === "quarters" ? COLUMN_WIDTH_QUARTER : COLUMN_WIDTH_MONTH;

  return (
    <Box ref={scrollRef} onScroll={onScroll} sx={{ flex: 1, overflow: "auto" }}>
      {/* Innerer Container fixiert die Mindestbreite — verhindert Stauchung bei schmalem Viewport. */}
      <Box sx={{ minWidth: totalWidth }}>
        <GanttTimelineHeader columns={columns} />

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
                // Vertikale Gitter-Linien via Hintergrundmuster — eine Linie pro Spalte.
                backgroundImage: (theme) =>
                  `linear-gradient(to right, transparent calc(${gridColumnWidth}px - 1px), ${theme.palette.divider} calc(${gridColumnWidth}px - 1px), ${theme.palette.divider} ${gridColumnWidth}px)`,
                backgroundSize: `${gridColumnWidth}px 100%`,
                backgroundRepeat: "repeat-x",
              }}
            >
              {task.isMilestone ? (
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
              ) : (
                <Box
                  data-testid={`gantt-bar-${task.id}`}
                  sx={{
                    position: "absolute",
                    left: `${left}%`,
                    // Mindestbreite 0.5% damit Balken nie vollständig unsichtbar werden.
                    width: `${Math.max(width, 0.5)}%`,
                    height: BAR_HEIGHT,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: BAR_COLOR[task.status] ?? "grey.300",
                    borderRadius: 1,
                    cursor: onTaskClick ? "pointer" : "default",
                    "&:hover": onTaskClick ? { opacity: 0.8 } : undefined,
                  }}
                  onClick={() => onTaskClick?.(task)}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
