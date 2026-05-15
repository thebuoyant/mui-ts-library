import { useMemo, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { type RefObject, type UIEventHandler } from "react";
import { Box, Chip, IconButton, Menu, MenuItem, TextField, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useGanttChartStore, useGanttTheme, useGanttTranslations, useRawGanttChartStore } from "./GanttChart";
import type { GanttTask, GanttTaskNode, GanttTaskStatus, GanttTranslations } from "./GanttChart.types";
import { getVisibleTasks } from "./util/gantt-chart.util";
import { ROW_HEIGHT, HEADER_HEIGHT, ACTIONS_COL_WIDTH, STATUS_COL_WIDTH } from "./GanttChart.constants";
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
  hasActionsColumn: boolean;
  onTaskClick?: (task: GanttTask) => void;
  onAddTask?: (task: GanttTask) => void;
  onEditTask?: (task: GanttTask) => void;
  onDeleteTask?: (task: GanttTask) => void;
  onStatusChange?: (task: GanttTask, status: GanttTaskStatus) => void;
  inlineEdit?: boolean;
  onInlineRename?: (task: GanttTask, newName: string) => void;
};

function GanttTaskRow({
  task,
  expandedIds,
  toggleExpand,
  hasActionsColumn,
  onTaskClick,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  inlineEdit,
  onInlineRename,
}: GanttTaskRowProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editingName, setEditingName] = useState<string | null>(null);
  const t = useGanttTranslations();
  const ganttTheme = useGanttTheme();
  const { statusColors } = ganttTheme;

  const commitRename = () => {
    if (editingName !== null && editingName.trim()) {
      onInlineRename?.(task, editingName.trim());
    }
    setEditingName(null);
  };

  return (
    <Box
      className="gantt-task-row"
      data-testid={`gantt-task-row-${task.id}`}
      sx={{
        height: ROW_HEIGHT,
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid",
        borderRight: "1px solid",
        borderColor: "divider",
        cursor: onTaskClick ? "pointer" : "default",
        "&:hover": onTaskClick ? { bgcolor: "action.hover" } : undefined,
      }}
      onClick={() => onTaskClick?.(task)}
    >
      {/* Name-Spalte — flex, enthält Einzug + Expand-Icon + Status-Dot + Text */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          pl: 1 + task.depth * 2,
          pr: 0.5,
          height: "100%",
        }}
      >
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

        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: task.isMilestone ? 0 : "50%",
            transform: task.isMilestone ? "rotate(45deg)" : undefined,
            flexShrink: 0,
            bgcolor: task.color ?? statusColors?.[task.status] ?? STATUS_DOT_COLOR[task.status] ?? "grey.400",
          }}
        />

        {editingName !== null ? (
          <TextField
            size="small"
            variant="standard"
            value={editingName}
            autoFocus
            onChange={(e) => setEditingName(e.target.value)}
            onBlur={commitRename}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.preventDefault(); commitRename(); }
              if (e.key === "Escape") { e.stopPropagation(); setEditingName(null); }
            }}
            onClick={(e) => e.stopPropagation()}
            sx={{ flex: 1, minWidth: 0 }}
            inputProps={{ "data-testid": `gantt-inline-edit-${task.id}` }}
          />
        ) : (
          <Typography
            variant="body2"
            noWrap
            sx={{ flex: 1, minWidth: 0, cursor: inlineEdit ? "text" : "inherit" }}
            onDoubleClick={inlineEdit ? (e) => { e.stopPropagation(); setEditingName(task.name); } : undefined}
          >
            {task.name}
          </Typography>
        )}
      </Box>

      {/* Aktions-Spalte — feste Breite, immer vorhanden wenn hasActionsColumn */}
      {hasActionsColumn && (
        <Box
          className="gantt-row-actions"
          sx={{
            width: ACTIONS_COL_WIDTH,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            pr: 0.5,
          }}
        >
          {onEditTask && (
            <Tooltip title={t.editTaskTooltip}>
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
            </Tooltip>
          )}
          {onAddTask && (
            <Tooltip title={t.addTaskTooltip}>
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
            </Tooltip>
          )}
          {onDeleteTask && (
            <Tooltip title={t.deleteTaskTooltip}>
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
            </Tooltip>
          )}
        </Box>
      )}

      {/* Status-Spalte — feste Breite */}
      <Box
        sx={{
          width: STATUS_COL_WIDTH,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Chip
          label={getStatusLabel(task.status, t)}
          size="small"
          variant="outlined"
          color={(task.color ?? statusColors?.[task.status]) ? "default" : STATUS_CHIP_COLOR[task.status] ?? "default"}
          sx={{
            height: 20,
            fontSize: 10,
            cursor: onStatusChange ? "pointer" : "default",
            ...((task.color ?? statusColors?.[task.status]) && {
              borderColor: task.color ?? statusColors?.[task.status],
              color: task.color ?? statusColors?.[task.status],
            }),
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
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Panel-Komponente
// ---------------------------------------------------------------------------

type GanttTaskPanelProps = {
  scrollRef: RefObject<HTMLDivElement | null>;
  onScroll: UIEventHandler<HTMLDivElement>;
  panelWidth: number;
  onTaskClick?: (task: GanttTask) => void;
  onAddTask?: (task: GanttTask) => void;
  onEditTask?: (task: GanttTask) => void;
  onDeleteTask?: (task: GanttTask) => void;
  onStatusChange?: (task: GanttTask, status: GanttTaskStatus) => void;
  onTasksChange?: (tasks: GanttTask[]) => void;
  enableBuiltinDialogs?: boolean;
  onTaskCreated?: (task: GanttTask) => void;
  onTaskUpdated?: (task: GanttTask) => void;
  onTaskDeleted?: (taskId: string) => void;
  inlineEdit?: boolean;
  virtualizeRows?: boolean;
};

export function GanttTaskPanel({
  scrollRef,
  onScroll,
  panelWidth,
  onTaskClick,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onTasksChange,
  enableBuiltinDialogs,
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
  inlineEdit,
  virtualizeRows = false,
}: GanttTaskPanelProps) {
  const t = useGanttTranslations();
  const rawStore = useRawGanttChartStore();
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

  const rowVirtualizer = useVirtualizer({
    count: visibleTasks.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
  });

  // Dialog-State
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<GanttTask | null>(null);

  // Dialog-Save-Handler
  const handleAddSave = (data: Omit<GanttTask, "id">) => {
    const newTask: GanttTask = { ...data, id: crypto.randomUUID() };
    storeAddTask(newTask);
    onTasksChange?.(rawStore.getState().tasks);
    onTaskCreated?.(newTask);
    setAddOpen(false);
  };

  const handleEditSave = (data: Omit<GanttTask, "id">) => {
    if (!activeTask) return;
    const updatedTask: GanttTask = { ...data, id: activeTask.id };
    storeUpdateTask(updatedTask);
    onTasksChange?.(rawStore.getState().tasks);
    onTaskUpdated?.(updatedTask);
    setEditOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!activeTask) return;
    storeDeleteTask(activeTask.id);
    onTasksChange?.(rawStore.getState().tasks);
    onTaskDeleted?.(activeTask.id);
    setDeleteOpen(false);
  };

  const handleInlineRename = (task: GanttTask, newName: string) => {
    const updated = { ...task, name: newName };
    storeUpdateTask(updated);
    onTasksChange?.(rawStore.getState().tasks);
    onTaskUpdated?.(updated);
  };

  // Row-Action-Handler: bei enableBuiltinDialogs Dialoge öffnen, sonst Props direkt durchreichen.
  const rowOnAdd = enableBuiltinDialogs
    ? (task: GanttTask) => { setActiveTask(task); setAddOpen(true); }
    : onAddTask;

  const rowOnEdit = enableBuiltinDialogs
    ? (task: GanttTask) => { setActiveTask(task); setEditOpen(true); }
    : onEditTask;

  const rowOnDelete = enableBuiltinDialogs
    ? (task: GanttTask) => { setActiveTask(task); setDeleteOpen(true); }
    : onDeleteTask;

  const hasActionsColumn = !!(rowOnAdd || rowOnEdit || rowOnDelete);

  // Tages-Skala hat einen zweizeiligen Header (Monat + Tag) → Panel-Header muss gleich hoch sein.
  const headerHeight = timeScale === "days" ? HEADER_HEIGHT * 2 : HEADER_HEIGHT;

  return (
    <Box
      ref={scrollRef}
      onScroll={onScroll}
      sx={{
        width: panelWidth,
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
        {/* Erste Zeile: Spalten-Labels — gleiche Spaltenstruktur wie die Task-Zeilen */}
        <Box
          sx={{
            height: HEADER_HEIGHT,
            display: "flex",
            alignItems: "center",
            borderBottom: timeScale === "days" ? "1px solid" : undefined,
            borderColor: timeScale === "days" ? "divider" : undefined,
          }}
        >
          {/* Name-Spalte */}
          <Box sx={{ flex: 1, minWidth: 0, pl: 2 }}>
            <Typography variant="caption" color="text.secondary">
              {t.columnName}
            </Typography>
          </Box>
          {/* Aktions-Spalten-Header */}
          {hasActionsColumn && (
            <Box sx={{ width: ACTIONS_COL_WIDTH, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography variant="caption" color="text.secondary">
                {t.columnActions}
              </Typography>
            </Box>
          )}
          {/* Status-Spalte */}
          <Box
            sx={{
              width: STATUS_COL_WIDTH,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {t.columnStatus}
            </Typography>
          </Box>
        </Box>
        {/* Zweite Zeile nur bei Tages-Skala — leer, richtet sich an den Tag-Nummern aus */}
        {timeScale === "days" && <Box sx={{ flex: 1 }} />}
      </Box>

      {virtualizeRows ? (
        <Box sx={{ position: "relative", height: rowVirtualizer.getTotalSize() }}>
          {rowVirtualizer.getVirtualItems().map((vRow) => (
            <Box
              key={vRow.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: ROW_HEIGHT,
                transform: `translateY(${vRow.start}px)`,
              }}
            >
              <GanttTaskRow
                task={visibleTasks[vRow.index]}
                expandedIds={expandedIds}
                toggleExpand={toggleExpand}
                hasActionsColumn={hasActionsColumn}
                onTaskClick={onTaskClick}
                onAddTask={rowOnAdd}
                onEditTask={rowOnEdit}
                onDeleteTask={rowOnDelete}
                onStatusChange={onStatusChange}
                inlineEdit={inlineEdit}
                onInlineRename={inlineEdit ? handleInlineRename : undefined}
              />
            </Box>
          ))}
        </Box>
      ) : (
        visibleTasks.map((task) => (
          <GanttTaskRow
            key={task.id}
            task={task}
            expandedIds={expandedIds}
            toggleExpand={toggleExpand}
            hasActionsColumn={hasActionsColumn}
            onTaskClick={onTaskClick}
            onAddTask={rowOnAdd}
            onEditTask={rowOnEdit}
            onDeleteTask={rowOnDelete}
            onStatusChange={onStatusChange}
            inlineEdit={inlineEdit}
            onInlineRename={inlineEdit ? handleInlineRename : undefined}
          />
        ))
      )}

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
