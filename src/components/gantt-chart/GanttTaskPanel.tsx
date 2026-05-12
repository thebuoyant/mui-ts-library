import { useMemo, useState } from "react";
import { type RefObject, type UIEventHandler } from "react";
import { Box, Chip, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useGanttChartStore, useGanttTranslations } from "./GanttChart";
import type { GanttTask, GanttTaskNode, GanttTaskStatus, GanttTranslations } from "./GanttChart.types";
import { getVisibleTasks } from "./util/gantt-chart.util";
import { ROW_HEIGHT, HEADER_HEIGHT, LEFT_PANEL_WIDTH } from "./GanttChart.constants";
import { GanttTaskDialog } from "./GanttTaskDialog";
import { GanttDeleteDialog } from "./GanttDeleteDialog";


const STATUS_DOT_COLOR: Record<string, string> = {
  planned: "warning.main",
  "in-progress": "info.main",
  done: "success.main",
  blocked: "error.main",
};

const STATUS_CHIP_COLOR: Record<
  GanttTaskStatus,
  "default" | "warning" | "info" | "success" | "error"
> = {
  planned: "warning",
  "in-progress": "info",
  done: "success",
  blocked: "error",
};

function getStatusLabel(status: GanttTaskStatus, t: GanttTranslations): string {
  const map: Record<GanttTaskStatus, string> = {
    planned: t.statusPlanned,
    "in-progress": t.statusInProgress,
    done: t.statusDone,
    blocked: t.statusBlocked,
  };
  return map[status];
}

// ---------------------------------------------------------------------------
// Sub-Komponente pro Zeile — eigener anchorEl-State für das Status-Menü.
// ---------------------------------------------------------------------------

type GanttTaskRowProps = {
  task: GanttTaskNode;
  expandedIds: Set<string>;
  toggleExpand: (id: string) => void;
  onTaskClick?: (task: GanttTask) => void;
  onAddTask?: (task: GanttTask) => void;
  onEditTask?: (task: GanttTask) => void;
  onDeleteTask?: (task: GanttTask) => void;
  onStatusChange?: (task: GanttTask, status: GanttTaskStatus) => void;
};

function GanttTaskRow({
  task,
  expandedIds,
  toggleExpand,
  onTaskClick,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onStatusChange,
}: GanttTaskRowProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const t = useGanttTranslations();

  return (
    <Box
      className="gantt-task-row"
      data-testid={`gantt-task-row-${task.id}`}
      sx={{
        height: ROW_HEIGHT,
        display: "flex",
        alignItems: "center",
        pl: 1 + task.depth * 2,
        pr: 1,
        gap: 0.75,
        borderBottom: "1px solid",
        borderRight: "1px solid",
        borderColor: "divider",
        cursor: onTaskClick ? "pointer" : "default",
        "&:hover": onTaskClick ? { bgcolor: "action.hover" } : undefined,
      }}
      onClick={() => onTaskClick?.(task)}
    >
      {/* Feste Breite für Expand/Collapse hält die Namenspalte stabil ausgerichtet. */}
      <Box sx={{ width: 16, flexShrink: 0, display: "flex", justifyContent: "center" }}>
        {task.children.length > 0 && (
          <Box
            component="span"
            sx={{ fontSize: 9, userSelect: "none", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(task.id);
            }}
          >
            {expandedIds.has(task.id) ? "▼" : "▶"}
          </Box>
        )}
      </Box>

      {/* Status-Dot, bei Meilensteinen als Raute */}
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: task.isMilestone ? 0 : "50%",
          transform: task.isMilestone ? "rotate(45deg)" : undefined,
          flexShrink: 0,
          bgcolor: STATUS_DOT_COLOR[task.status] ?? "grey.400",
        }}
      />

      <Typography variant="body2" noWrap sx={{ flex: 1, minWidth: 0 }}>
        {task.name}
      </Typography>

      {/* Hover-Icons — opacity 0 im Ruhezustand, 1 bei hover auf die Zeile */}
      {(onAddTask || onDeleteTask || onEditTask) && (
        <Box
          className="gantt-row-actions"
          sx={{
            display: "flex",
            gap: 0.25,
            opacity: 0,
            ".gantt-task-row:hover &": { opacity: 1 },
            flexShrink: 0,
          }}
        >
          {onEditTask && (
            <IconButton
              size="small"
              data-testid={`gantt-edit-task-${task.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onEditTask(task);
              }}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          )}
          {onAddTask && (
            <IconButton
              size="small"
              data-testid={`gantt-add-task-${task.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onAddTask(task);
              }}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          )}
          {onDeleteTask && (
            <IconButton
              size="small"
              data-testid={`gantt-delete-task-${task.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTask(task);
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          )}
        </Box>
      )}

      <Chip
        label={getStatusLabel(task.status, t)}
        size="small"
        variant="outlined"
        color={STATUS_CHIP_COLOR[task.status] ?? "default"}
        sx={{
          flexShrink: 0,
          height: 20,
          fontSize: 10,
          cursor: onStatusChange ? "pointer" : "default",
        }}
        onClick={
          onStatusChange
            ? (e) => {
                e.stopPropagation();
                setAnchorEl(e.currentTarget);
              }
            : undefined
        }
      />

      {onStatusChange && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {(["planned", "in-progress", "done", "blocked"] as GanttTaskStatus[]).map((s) => (
            <MenuItem
              key={s}
              selected={task.status === s}
              onClick={() => {
                onStatusChange(task, s);
                setAnchorEl(null);
              }}
            >
              {getStatusLabel(s, t)}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Panel-Komponente
// ---------------------------------------------------------------------------

type GanttTaskPanelProps = {
  scrollRef: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
  onTaskClick?: (task: GanttTask) => void;
  onAddTask?: (task: GanttTask) => void;
  onDeleteTask?: (task: GanttTask) => void;
  onStatusChange?: (task: GanttTask, status: GanttTaskStatus) => void;
  enableBuiltinDialogs?: boolean;
  onTaskCreated?: (task: GanttTask) => void;
  onTaskUpdated?: (task: GanttTask) => void;
  onTaskDeleted?: (taskId: string) => void;
};

export function GanttTaskPanel({
  scrollRef,
  onScroll,
  onTaskClick,
  onAddTask,
  onDeleteTask,
  onStatusChange,
  enableBuiltinDialogs,
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
}: GanttTaskPanelProps) {
  const t = useGanttTranslations();
  const taskTree = useGanttChartStore((s) => s.taskTree);
  const expandedIds = useGanttChartStore((s) => s.expandedIds);
  const toggleExpand = useGanttChartStore((s) => s.toggleExpand);
  const timeScale = useGanttChartStore((s) => s.timeScale);
  const storeAddTask = useGanttChartStore((s) => s.addTask);
  const storeUpdateTask = useGanttChartStore((s) => s.updateTask);
  const storeDeleteTask = useGanttChartStore((s) => s.deleteTask);

  // Selector würde bei jedem Aufruf eine neue Array-Referenz liefern → Endlosschleife.
  const visibleTasks = useMemo(
    () => getVisibleTasks(taskTree, expandedIds),
    [taskTree, expandedIds],
  );

  // Dialog-State
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<GanttTask | null>(null);

  // Dialog-Save-Handler
  const handleAddSave = (data: Omit<GanttTask, "id">) => {
    const newTask: GanttTask = { ...data, id: crypto.randomUUID() };
    storeAddTask(newTask);
    onTaskCreated?.(newTask);
    setAddOpen(false);
  };

  const handleEditSave = (data: Omit<GanttTask, "id">) => {
    if (!activeTask) return;
    const updatedTask: GanttTask = { ...data, id: activeTask.id };
    storeUpdateTask(updatedTask);
    onTaskUpdated?.(updatedTask);
    setEditOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!activeTask) return;
    storeDeleteTask(activeTask.id);
    onTaskDeleted?.(activeTask.id);
    setDeleteOpen(false);
  };

  // Row-Action-Handler: bei enableBuiltinDialogs Dialoge öffnen, sonst Props direkt durchreichen.
  const rowOnAdd = enableBuiltinDialogs
    ? (task: GanttTask) => { setActiveTask(task); setAddOpen(true); }
    : onAddTask;

  const rowOnEdit = enableBuiltinDialogs
    ? (task: GanttTask) => { setActiveTask(task); setEditOpen(true); }
    : undefined;

  const rowOnDelete = enableBuiltinDialogs
    ? (task: GanttTask) => { setActiveTask(task); setDeleteOpen(true); }
    : onDeleteTask;

  // Tages-Skala hat einen zweizeiligen Header (Monat + Tag) → Panel-Header muss gleich hoch sein.
  const headerHeight = timeScale === "days" ? HEADER_HEIGHT * 2 : HEADER_HEIGHT;

  return (
    <Box
      ref={scrollRef}
      onScroll={onScroll}
      sx={{
        width: LEFT_PANEL_WIDTH,
        flexShrink: 0,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          height: headerHeight,
          position: "sticky",
          top: 0,
          bgcolor: "background.paper",
          zIndex: 1,
          borderBottom: "1px solid",
          borderRight: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Erste Zeile: Spalten-Labels — bei Tages-Skala mit Trenn-Border unten */}
        <Box
          sx={{
            height: HEADER_HEIGHT,
            display: "flex",
            alignItems: "center",
            px: 2,
            gap: 1,
            borderBottom: timeScale === "days" ? "1px solid" : undefined,
            borderColor: timeScale === "days" ? "divider" : undefined,
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
            {t.columnName}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
            {t.columnStatus}
          </Typography>
        </Box>
        {/* Zweite Zeile nur bei Tages-Skala — leer, richtet sich an den Tag-Nummern aus */}
        {timeScale === "days" && <Box sx={{ flex: 1 }} />}
      </Box>

      {visibleTasks.map((task) => (
        <GanttTaskRow
          key={task.id}
          task={task}
          expandedIds={expandedIds}
          toggleExpand={toggleExpand}
          onTaskClick={onTaskClick}
          onAddTask={rowOnAdd}
          onEditTask={rowOnEdit}
          onDeleteTask={rowOnDelete}
          onStatusChange={onStatusChange}
        />
      ))}

      {enableBuiltinDialogs && (
        <>
          <GanttTaskDialog
            open={addOpen}
            mode="add"
            defaultParentId={activeTask?.id}
            onSave={handleAddSave}
            onClose={() => setAddOpen(false)}
          />
          <GanttTaskDialog
            open={editOpen}
            mode="edit"
            initialTask={activeTask ?? undefined}
            onSave={handleEditSave}
            onClose={() => setEditOpen(false)}
          />
          <GanttDeleteDialog
            open={deleteOpen}
            task={activeTask}
            onConfirm={handleDeleteConfirm}
            onClose={() => setDeleteOpen(false)}
          />
        </>
      )}
    </Box>
  );
}
