import { createStore } from "zustand/vanilla";
import type { GanttTask, GanttTaskNode, GanttTimeScale } from "./GanttChart.types";
import { buildTaskTree, getTimelineRange, getVisibleTasks } from "./util/gantt-chart.util";
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

  setTasks: (tasks: GanttTask[]) => void;
  toggleExpand: (taskId: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  setTimeScale: (scale: GanttTimeScale) => void;
  setTimelineRange: (range: TimelineRange) => void;
  resetTimelineRange: () => void;

  // Gibt die aktuell sichtbare, geordnete Flachliste zurück.
  getVisibleTasks: () => GanttTaskNode[];
};

export type GanttChartStore = ReturnType<typeof createGanttChartStore>;

export function createGanttChartStore(
  initialTasks: GanttTask[],
  initialTimeScale: GanttTimeScale = "months",
  initialExpandAll = false,
  initialRange?: TimelineRange,
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

    setTasks: (tasks) => {
      set((state) => ({
        tasks,
        taskTree: buildTaskTree(tasks),
        // Manuell gesetzten Bereich nicht überschreiben wenn der Nutzer ihn angepasst hat.
        ...(state.isRangeCustomized ? {} : { timelineRange: getTimelineRange(tasks) }),
      }));
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
      }));
    },

    collapseAll: () => {
      set({ expandedIds: new Set() });
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

    getVisibleTasks: () => {
      const { taskTree, expandedIds } = get();
      return getVisibleTasks(taskTree, expandedIds);
    },
  }));
}
