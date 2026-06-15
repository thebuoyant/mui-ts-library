import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { useGanttTheme } from "./GanttChart";
import type { GanttTask, GanttTaskNode } from "./GanttChart.types";
import { addDays, calculateTaskPosition } from "./util/gantt-chart.util";
import type { TimelineRange } from "./util/gantt-chart.util";
import { BAR_HEIGHT, ROW_HEIGHT, STATUS_BAR_COLOR } from "./GanttChart.constants";
import type { ActiveDrag, DragType } from "./hooks/useGanttDrag";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

type GanttBarRowProps = {
  task:                GanttTaskNode;
  virtualTop?:         number;
  activeDrag:          ActiveDrag | null;
  displayRange:        TimelineRange;
  totalWidth:          number;
  gridColumnWidth:     number;
  criticalTaskIds:     Set<string>;
  draggable?:          boolean;
  resizable?:          boolean;
  progressDraggable?:  boolean;
  onTaskClick?:        (task: GanttTask) => void;
  onMilestoneClick?:   (task: GanttTask) => void;
  onContextMenu:       (task: GanttTaskNode, mouseX: number, mouseY: number) => void;
  suppressClickRef:    React.MutableRefObject<boolean>;
  handleBarMouseDown:  (e: React.MouseEvent, task: GanttTaskNode, type: DragType) => void;
  handleProgressMouseDown: (e: React.MouseEvent, task: GanttTaskNode, initialProgress: number, barWidthPx: number) => void;
  formatDragDate:      (d: Date) => string;
};

// ---------------------------------------------------------------------------
// Komponente
// ---------------------------------------------------------------------------

export function GanttBarRow({
  task,
  virtualTop,
  activeDrag,
  displayRange,
  totalWidth,
  gridColumnWidth,
  criticalTaskIds,
  draggable = false,
  resizable = false,
  progressDraggable = false,
  onTaskClick,
  onMilestoneClick,
  onContextMenu,
  suppressClickRef,
  handleBarMouseDown,
  handleProgressMouseDown,
  formatDragDate,
}: GanttBarRowProps) {
  const theme      = useTheme();
  const ganttTheme = useGanttTheme();
  const { statusColors, criticalPathColor, milestoneColor, barBorderRadius } = ganttTheme;

  // Effektiven Task aus Drag-State berechnen — Balken folgt der Maus in Echtzeit.
  const isDragging = activeDrag?.taskId === task.id;
  let effectiveTask: GanttTask = task;
  if (isDragging && activeDrag) {
    if (activeDrag.type === "move") {
      effectiveTask = {
        ...task,
        startDate: addDays(task.startDate, activeDrag.deltaDays),
        endDate:   addDays(task.endDate,   activeDrag.deltaDays),
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
      data-testid={`gantt-bar-row-${task.id}`}
      style={virtualTop !== undefined
        ? { position: "absolute", top: virtualTop, left: 0, width: "100%" }
        : undefined}
      sx={{
        height:          ROW_HEIGHT,
        position:        "relative",
        borderBottom:    "1px solid",
        borderColor:     "divider",
        backgroundImage: (t) =>
          `linear-gradient(to right, transparent calc(${gridColumnWidth}px - 1px), ${t.palette.divider} calc(${gridColumnWidth}px - 1px), ${t.palette.divider} ${gridColumnWidth}px)`,
        backgroundSize:   `${gridColumnWidth}px 100%`,
        backgroundRepeat: "repeat-x",
      }}
    >
      {task.isMilestone ? (
        <GanttMilestoneBar
          task={task}
          left={left}
          milestoneColor={milestoneColor}
          criticalPathColor={criticalPathColor}
          isCritical={criticalTaskIds.has(task.id)}
          onMilestoneClick={onMilestoneClick}
          theme={theme}
        />
      ) : (
        <GanttTaskBar
          task={task}
          effectiveTask={effectiveTask}
          left={left}
          width={width}
          totalWidth={totalWidth}
          isDragging={isDragging}
          activeDrag={activeDrag}
          draggable={draggable}
          resizable={resizable}
          progressDraggable={progressDraggable}
          isCritical={criticalTaskIds.has(task.id)}
          statusColors={statusColors}
          criticalPathColor={criticalPathColor}
          barBorderRadius={barBorderRadius}
          onTaskClick={onTaskClick}
          onContextMenu={onContextMenu}
          suppressClickRef={suppressClickRef}
          handleBarMouseDown={handleBarMouseDown}
          handleProgressMouseDown={handleProgressMouseDown}
          formatDragDate={formatDragDate}
          theme={theme}
        />
      )}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Milestone-Bar
// ---------------------------------------------------------------------------

type GanttMilestoneBarProps = {
  task:              GanttTaskNode;
  left:              number;
  milestoneColor?:   string;
  criticalPathColor?: string;
  isCritical:        boolean;
  onMilestoneClick?: (task: GanttTask) => void;
  theme:             Theme;
};

function GanttMilestoneBar({ task, left, milestoneColor, criticalPathColor, isCritical, onMilestoneClick, theme }: GanttMilestoneBarProps) {
  if (left < 0 || left > 100) return null;
  return (
    <Box
      data-testid={`gantt-milestone-${task.id}`}
      sx={{
        position:  "absolute",
        left:      `${left}%`,
        top:       "50%",
        width:     12,
        height:    12,
        bgcolor:   milestoneColor || "warning.main",
        transform: "translate(-50%, -50%) rotate(45deg)",
        cursor:    onMilestoneClick ? "pointer" : "default",
        boxShadow: isCritical
          ? `0 0 0 2.5px ${criticalPathColor || theme.palette.error.main}`
          : undefined,
        "&:hover": onMilestoneClick ? { opacity: 0.8 } : undefined,
      }}
      onClick={() => onMilestoneClick?.(task)}
    />
  );
}

// ---------------------------------------------------------------------------
// Task-Bar (regulärer Balken)
// ---------------------------------------------------------------------------

type GanttTaskBarProps = {
  task:               GanttTaskNode;
  effectiveTask:      GanttTask;
  left:               number;
  width:              number;
  totalWidth:         number;
  isDragging:         boolean;
  activeDrag:         ActiveDrag | null;
  draggable?:         boolean;
  resizable?:         boolean;
  progressDraggable?: boolean;
  isCritical:         boolean;
  statusColors?:      Record<string, string>;
  criticalPathColor?: string;
  barBorderRadius?:   number;
  onTaskClick?:       (task: GanttTask) => void;
  onContextMenu:      (task: GanttTaskNode, mouseX: number, mouseY: number) => void;
  suppressClickRef:   React.MutableRefObject<boolean>;
  handleBarMouseDown: (e: React.MouseEvent, task: GanttTaskNode, type: DragType) => void;
  handleProgressMouseDown: (e: React.MouseEvent, task: GanttTaskNode, initialProgress: number, barWidthPx: number) => void;
  formatDragDate:     (d: Date) => string;
  theme:              Theme;
};

function GanttTaskBar({
  task, effectiveTask, left, width, totalWidth,
  isDragging, activeDrag, draggable, resizable, progressDraggable,
  isCritical, statusColors, criticalPathColor, barBorderRadius,
  onTaskClick, onContextMenu, suppressClickRef,
  handleBarMouseDown, handleProgressMouseDown, formatDragDate, theme,
}: GanttTaskBarProps) {
  const clampedLeft  = Math.max(0, left);
  const clampedRight = Math.min(100, left + Math.max(width, 0.5));
  const clampedWidth = clampedRight - clampedLeft;
  if (clampedWidth <= 0) return null;

  return (
    <>
      {/* Drag-Tooltip: Datum bei Move/Resize */}
      {isDragging && activeDrag && activeDrag.type !== "progress" && activeDrag.deltaDays !== 0 && (
        <DragTooltip left={clampedLeft}>
          {activeDrag.type === "move"
            ? `${formatDragDate(effectiveTask.startDate)} – ${formatDragDate(effectiveTask.endDate)}`
            : `→ ${formatDragDate(effectiveTask.endDate)}`}
        </DragTooltip>
      )}

      {/* Drag-Tooltip: Prozent bei Progress */}
      {isDragging && activeDrag?.type === "progress" && activeDrag.newProgress !== undefined && (
        <DragTooltip left={clampedLeft}>{activeDrag.newProgress}%</DragTooltip>
      )}

      {/* Hauptbalken */}
      <Box
        data-testid={`gantt-bar-${task.id}`}
        sx={{
          position:     "absolute",
          left:         `${clampedLeft}%`,
          width:        `${clampedWidth}%`,
          height:       BAR_HEIGHT,
          top:          "50%",
          transform:    "translateY(-50%)",
          bgcolor:      task.color ?? statusColors?.[task.status] ?? STATUS_BAR_COLOR[task.status] ?? "grey.300",
          borderRadius: barBorderRadius !== undefined ? `${barBorderRadius}px` : 1,
          overflow:     "hidden",
          opacity:      isDragging ? 0.75 : 1,
          boxShadow:    isCritical
            ? `inset 0 0 0 2.5px ${criticalPathColor || theme.palette.error.main}`
            : undefined,
          cursor: isDragging ? "grabbing" : draggable ? "grab" : onTaskClick ? "pointer" : "default",
          userSelect: "none",
          "&:hover": (draggable || onTaskClick) ? { opacity: isDragging ? 0.75 : 0.8 } : undefined,
        }}
        onMouseDown={draggable ? (e) => handleBarMouseDown(e, task, "move") : undefined}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onContextMenu(task, e.clientX, e.clientY);
        }}
        onClick={() => {
          if (suppressClickRef.current) {
            suppressClickRef.current = false;
            return;
          }
          onTaskClick?.(task);
        }}
      >
        {/* Fortschrittsbalken */}
        {effectiveTask.progress !== undefined && effectiveTask.progress > 0 && (
          <Box
            data-testid={`gantt-progress-${task.id}`}
            sx={{
              position: "absolute",
              left: 0, top: 0,
              width:   `${Math.min(effectiveTask.progress, 100)}%`,
              height:  "100%",
              bgcolor: "currentColor",
              opacity: 0.4,
            }}
          />
        )}

        {/* Progress-Drag-Handle */}
        {progressDraggable && (
          <Box
            data-testid={`gantt-progress-handle-${task.id}`}
            sx={{
              position:  "absolute",
              left:      `${Math.min(effectiveTask.progress ?? 0, 100)}%`,
              top:       0,
              width:     6,
              height:    "100%",
              transform: "translateX(-50%)",
              cursor:    "ew-resize",
              bgcolor:   "rgba(255,255,255,0.35)",
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              const barWidthPx = (clampedWidth / 100) * totalWidth;
              handleProgressMouseDown(e, task, effectiveTask.progress ?? 0, barWidthPx);
            }}
          />
        )}

        {/* Resize-Handle */}
        {resizable && (
          <Box
            data-testid={`gantt-resize-handle-${task.id}`}
            sx={{
              position: "absolute",
              right: 0, top: 0,
              width:  6,
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
}

// ---------------------------------------------------------------------------
// Drag-Tooltip (kleine Box oben links am Balken während Drag)
// ---------------------------------------------------------------------------

function DragTooltip({ left, children }: { left: number; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        position:      "absolute",
        left:          `${left}%`,
        top:           2,
        bgcolor:       "grey.800",
        color:         "common.white",
        borderRadius:  0.5,
        px:            0.75,
        lineHeight:    "18px",
        fontSize:      "0.65rem",
        whiteSpace:    "nowrap",
        pointerEvents: "none",
        zIndex:        100,
      }}
    >
      {children}
    </Box>
  );
}
