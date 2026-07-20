import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import type { KanbanTask } from "./KanbanBoard.types";
import { DEFAULT_KANBAN_BOARD_TRANSLATION, type KanbanBoardProps } from "./KanbanBoard.types";
import { KanbanBoardCard } from "./KanbanBoardCard";
import type { KanbanDialogState } from "./KanbanBoardCardDialog";
import { KanbanBoardCardDialog } from "./KanbanBoardCardDialog";
import { KanbanBoardColumn } from "./KanbanBoardColumn";
import { kanbanBoardClasses } from "./kanbanBoardClasses";

export function KanbanBoard({
  tasks,
  columns,
  onTasksChange,
  onCardClick,
  enableBuiltinDialogs = true,
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
  onTaskMoved,
  showPriority       = true,
  showAssignee       = true,
  showDueDate        = true,
  showDueDateWarning = true,
  showSubtasks       = true,
  chipVariant        = "outlined",
  showSearchField    = false,
  filterText         = "",
  width         = "100%",
  height        = "100%",
  translation,
}: KanbanBoardProps) {
  const t = { ...DEFAULT_KANBAN_BOARD_TRANSLATION, ...translation };

  // Internal task list — kept in sync with prop, used for optimistic DnD updates.
  const [internalTasks, setInternalTasks] = useState<KanbanTask[]>(tasks);
  useEffect(() => { setInternalTasks(tasks); }, [tasks]);

  const [activeTask, setActiveTask]       = useState<KanbanTask | null>(null);
  const [dialogState, setDialogState]     = useState<KanbanDialogState | null>(null);
  const [internalFilter, setInternalFilter] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // ── Drag handlers ────────────────────────────────────────────────────────────

  function handleDragStart({ active }: DragStartEvent) {
    setActiveTask(internalTasks.find((t) => t.id === active.id) ?? null);
  }

  function handleDragOver({ active, over }: DragOverEvent) {
    if (!over) return;

    const activeId = active.id as string;
    const overId   = over.id   as string;

    const activeTask = internalTasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    // overId is either a column id or another task id
    const targetColumn = columns.find((c) => c.id === overId);
    const overTask     = internalTasks.find((t) => t.id === overId);
    const targetColumnId = targetColumn?.id ?? overTask?.status;

    if (!targetColumnId || activeTask.status === targetColumnId) return;

    // Optimistically move card to new column (position = end of column)
    setInternalTasks((prev) =>
      prev.map((t) => t.id === activeId ? { ...t, status: targetColumnId } : t),
    );
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    // Capture the original column before clearing activeTask — it's the source
    // of truth for fromColumnId since handleDragOver may have already mutated status.
    const fromColumnId = activeTask?.status;
    setActiveTask(null);

    if (!over) {
      setInternalTasks(tasks); // revert
      return;
    }

    const activeId = active.id as string;
    const overId   = over.id   as string;

    const activeIndex = internalTasks.findIndex((t) => t.id === activeId);
    const overIndex   = internalTasks.findIndex((t) => t.id === overId);

    let finalTasks: KanbanTask[];
    if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
      finalTasks = arrayMove(internalTasks, activeIndex, overIndex);
    } else {
      finalTasks = [...internalTasks];
    }

    setInternalTasks(finalTasks);
    onTasksChange?.(finalTasks);

    // Fire only when the card crossed a column boundary (not for in-column reorder).
    if (fromColumnId) {
      const movedTask = finalTasks.find((t) => t.id === activeId);
      if (movedTask && movedTask.status !== fromColumnId) {
        onTaskMoved?.(movedTask, fromColumnId, movedTask.status);
      }
    }
  }

  // ── Dialog handlers ───────────────────────────────────────────────────────────

  function handleCardClick(task: KanbanTask) {
    if (enableBuiltinDialogs) {
      setDialogState({ mode: "edit", task });
    } else {
      onCardClick?.(task);
    }
  }

  function handleAddClick(columnId: string) {
    setDialogState({ mode: "add", columnId });
  }

  function handleDialogSave(task: KanbanTask) {
    const isNew = !internalTasks.find((t) => t.id === task.id);
    const updated = isNew
      ? [...internalTasks, task]
      : internalTasks.map((t) => t.id === task.id ? task : t);

    setInternalTasks(updated);
    onTasksChange?.(updated);
    if (isNew) onTaskCreated?.(task);
    else        onTaskUpdated?.(task);
    setDialogState(null);
  }

  function handleDialogDelete(taskId: string) {
    const updated = internalTasks.filter((t) => t.id !== taskId);
    setInternalTasks(updated);
    onTasksChange?.(updated);
    onTaskDeleted?.(taskId);
    setDialogState(null);
  }

  function handleRequestDelete(task: KanbanTask) {
    setDialogState({ mode: "delete", task });
  }

  // ── Filter ────────────────────────────────────────────────────────────────────

  // External filterText takes priority; internal field is used when showSearchField=true.
  const needle = (filterText || internalFilter).trim().toLowerCase();
  function matchesFilter(task: KanbanTask) {
    if (!needle) return true;
    return (
      task.title.toLowerCase().includes(needle) ||
      (task.assignee?.toLowerCase().includes(needle) ?? false)
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <Box
      className={kanbanBoardClasses.root}
      sx={{ width, height, display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      {showSearchField && (
        <Box
          className={kanbanBoardClasses.searchFieldWrapper}
          sx={{ px: 2, pt: 1.5, pb: 0.5 }}
        >
          <TextField
            className={kanbanBoardClasses.searchField}
            size="small"
            placeholder={t.searchFieldPlaceholder}
            value={internalFilter}
            onChange={(e) => setInternalFilter((e.target as HTMLInputElement).value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: "text.disabled" }} />
                  </InputAdornment>
                ),
              },
              htmlInput: { "aria-label": t.searchFieldPlaceholder },
            }}
            sx={{ width: 280 }}
          />
        </Box>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Box
          className={kanbanBoardClasses.columns}
          sx={{
            flex: 1,
            display: "flex",
            gap: 2,
            p: 2,
            overflowX: "auto",
            overflowY: "hidden",
            alignItems: "stretch",
          }}
        >
          {columns.map((column) => {
            const allColumnTasks     = internalTasks.filter((t) => t.status === column.id);
            const visibleColumnTasks = allColumnTasks.filter(matchesFilter);
            return (
              <KanbanBoardColumn
                key={column.id}
                column={column}
                tasks={visibleColumnTasks}
                totalCount={allColumnTasks.length}
                showPriority={showPriority}
                showAssignee={showAssignee}
                showDueDate={showDueDate}
                showDueDateWarning={showDueDateWarning}
                showSubtasks={showSubtasks}
                chipVariant={chipVariant}
                t={t}
                enableBuiltinDialogs={enableBuiltinDialogs}
                onCardClick={handleCardClick}
                onAddClick={handleAddClick}
              />
            );
          })}
        </Box>

        <DragOverlay>
          {activeTask && (
            <KanbanBoardCard
              task={activeTask}
              showPriority={showPriority}
              showAssignee={showAssignee}
              showDueDate={showDueDate}
              showDueDateWarning={showDueDateWarning}
              showSubtasks={showSubtasks}
              chipVariant={chipVariant}
              t={t}
              onCardClick={() => {}}
              isOverlay
            />
          )}
        </DragOverlay>
      </DndContext>

      {enableBuiltinDialogs && (
        <KanbanBoardCardDialog
          key={
            dialogState
              ? `${dialogState.mode}-${dialogState.mode === "add" ? dialogState.columnId : dialogState.task.id}`
              : "closed"
          }
          state={dialogState}
          columns={columns}
          t={t}
          showSubtasks={showSubtasks}
          onSave={handleDialogSave}
          onDelete={handleDialogDelete}
          onRequestDelete={handleRequestDelete}
          onClose={() => setDialogState(null)}
        />
      )}
    </Box>
  );
}
