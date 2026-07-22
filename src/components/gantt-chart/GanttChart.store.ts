import { createStore } from "zustand/vanilla";
import type { GanttTask, GanttTaskNode, GanttTimeScale } from "./GanttChart.types";
import { addMonths, buildTaskTree, cascadeDateUpdate, endOfMonth, getTimelineRange, getVisibleTasks, startOfMonth } from "./util/gantt-chart.util";
import type { TimelineRange } from "./util/gantt-chart.util";

export type GanttChartStoreState = {
  tasks: GanttTask[];
  // Abgeleiteter Baum — wird bei jedem setTasks neu berechnet, nicht separat gespeichert,
  // damit tasks und tree niemals auseinanderlaufen können.
  taskTree: GanttTaskNode[];
  expandedIds: Set<string>;
  timeScale: GanttTimeScale;
  timelineRange: TimelineRange;
  // true sobald der Nutzer den Bereich manuell gesetzt hat — verhindert Auto-Reset durch setTasks.
  isRangeCustomized: boolean;
  // Wenn true, werden beim updateTask alle Finish-to-Start-Nachfolger um dasselbe Delta verschoben.
  cascadeDependencies: boolean;
  // Ausgangsskala für den Reset-Button.
  defaultTimeScale: GanttTimeScale;
  // Ausgangszustand des Expand-All — für resetView.
  initialExpandAll: boolean;
  // true sobald expandAll/collapseAll aufgerufen wurde — aktiviert den Reset-Button.
  isExpandedCustomized: boolean;

  assigneeFilter: string;
  setAssigneeFilter: (assignee: string) => void;

  setTasks: (tasks: GanttTask[]) => void;
  addTask: (task: GanttTask) => void;
  updateTask: (task: GanttTask) => void;
  // Löscht den Task und alle Nachkommen kaskadierend.
  deleteTask: (taskId: string) => void;
  toggleExpand: (taskId: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  setTimeScale: (scale: GanttTimeScale) => void;
  setTimelineRange: (range: TimelineRange) => void;
  resetTimelineRange: () => void;
  // Setzt Zeitskala und Datumsbereich auf den Ausgangszustand zurück.
  resetView: () => void;

  // Gibt die aktuell sichtbare, geordnete Flachliste zurück.
  getVisibleTasks: () => GanttTaskNode[];
};

export type GanttChartStore = ReturnType<typeof createGanttChartStore>;

// Expandiert den Bereich auf Task-Grenzen (mit ±1-Monat-Puffer, auf Monatsgrenzen gerundet).
// Verkleinert den Bereich nie — nur Erweiterungen sind möglich.
function expandRangeForTask(range: TimelineRange, task: GanttTask): TimelineRange {
  const newStart =
    task.startDate < range.start
      ? startOfMonth(addMonths(task.startDate, -1))
      : range.start;
  const newEnd =
    task.endDate > range.end
      ? endOfMonth(addMonths(task.endDate, 1))
      : range.end;
  if (newStart === range.start && newEnd === range.end) return range;
  return { start: newStart, end: newEnd };
}

export function createGanttChartStore(
  initialTasks: GanttTask[],
  initialTimeScale: GanttTimeScale = "months",
  initialExpandAll = false,
  initialRange?: TimelineRange,
  cascadeDependencies = false,
  workdays: number[] = [],
  normalizedHolidays: Set<string> = new Set(),
) {
  const autoRange = getTimelineRange(initialTasks);

  return createStore<GanttChartStoreState>((set, get) => ({
    tasks: initialTasks,
    taskTree: buildTaskTree(initialTasks),
    // initialExpandAll: alle Knoten aufgeklappt — sonst nur Root-Tasks.
    expandedIds: initialExpandAll
      ? new Set(initialTasks.map((t) => t.id))
      : new Set(initialTasks.filter((t) => !t.parentId).map((t) => t.id)),
    timeScale: initialTimeScale,
    timelineRange: initialRange ?? autoRange,
    // Manuell übergebener Bereich wird als customized markiert → setTasks überschreibt ihn nicht.
    isRangeCustomized: initialRange !== undefined,
    cascadeDependencies,
    defaultTimeScale: initialTimeScale,
    initialExpandAll,
    isExpandedCustomized: false,
    assigneeFilter: "",

    setAssigneeFilter: (assignee) => set({ assigneeFilter: assignee }),

    setTasks: (tasks) => {
      set((state) => ({
        tasks,
        taskTree: buildTaskTree(tasks),
        // Manuell gesetzten Bereich nicht überschreiben wenn der Nutzer ihn angepasst hat.
        ...(state.isRangeCustomized ? {} : { timelineRange: getTimelineRange(tasks) }),
      }));
    },

    addTask: (task) => {
      set((state) => {
        const tasks = [...state.tasks, task];
        return {
          tasks,
          taskTree: buildTaskTree(tasks),
          timelineRange: expandRangeForTask(state.timelineRange, task),
        };
      });
    },

    updateTask: (task) => {
      set((state) => {
        const original = state.tasks.find((t) => t.id === task.id);
        let tasks = state.tasks.map((t) => (t.id === task.id ? task : t));

        if (state.cascadeDependencies && original) {
          const deltaMs = task.endDate.getTime() - original.endDate.getTime();
          tasks = cascadeDateUpdate(
            tasks, task.id, deltaMs,
            workdays.length > 0 ? workdays : undefined,
            workdays.length > 0 ? normalizedHolidays : undefined,
          );
        }

        let timelineRange = expandRangeForTask(state.timelineRange, task);
        for (const t of tasks) {
          timelineRange = expandRangeForTask(timelineRange, t);
        }

        return { tasks, taskTree: buildTaskTree(tasks), timelineRange };
      });
    },

    deleteTask: (taskId) => {
      set((state) => {
        const idsToRemove = new Set<string>();
        const collect = (id: string) => {
          idsToRemove.add(id);
          state.tasks.filter((t) => t.parentId === id).forEach((t) => collect(t.id));
        };
        collect(taskId);
        const tasks = state.tasks.filter((t) => !idsToRemove.has(t.id));
        return { tasks, taskTree: buildTaskTree(tasks) };
      });
    },

    toggleExpand: (taskId) => {
      set((state) => {
        const next = new Set(state.expandedIds);
        if (next.has(taskId)) {
          next.delete(taskId);
        } else {
          next.add(taskId);
        }
        return { expandedIds: next };
      });
    },

    expandAll: () => {
      set((state) => ({
        expandedIds: new Set(state.tasks.map((t) => t.id)),
        isExpandedCustomized: true,
      }));
    },

    collapseAll: () => {
      set({ expandedIds: new Set(), isExpandedCustomized: true });
    },

    setTimeScale: (timeScale) => {
      set({ timeScale });
    },

    setTimelineRange: (range) => {
      set({ timelineRange: range, isRangeCustomized: true });
    },

    resetTimelineRange: () => {
      set((state) => ({
        timelineRange: getTimelineRange(state.tasks),
        isRangeCustomized: false,
      }));
    },

    resetView: () => {
      set((state) => ({
        timeScale: state.defaultTimeScale,
        timelineRange: getTimelineRange(state.tasks),
        isRangeCustomized: false,
        isExpandedCustomized: false,
        assigneeFilter: "",
        expandedIds: state.initialExpandAll
          ? new Set(state.tasks.map((t) => t.id))
          : new Set(state.tasks.filter((t) => !t.parentId).map((t) => t.id)),
      }));
    },

    getVisibleTasks: () => {
      const { taskTree, expandedIds } = get();
      return getVisibleTasks(taskTree, expandedIds);
    },
  }));
}
