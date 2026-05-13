import { describe, expect, it } from "vitest";
import { createGanttChartStore } from "./GanttChart.store";
import type { GanttTask } from "./GanttChart.types";

const tasks: GanttTask[] = [
  {
    id: "project",
    name: "My Project",
    status: "in-progress",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-04-30"),
  },
  {
    id: "release-1",
    parentId: "project",
    name: "Release 1",
    status: "in-progress",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-02-28"),
  },
  {
    id: "sprint-1",
    parentId: "release-1",
    name: "Sprint 1",
    status: "done",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-14"),
  },
];

describe("createGanttChartStore", () => {
  it("Should initialise with the provided tasks and a built task tree", () => {
    const store = createGanttChartStore(tasks);
    const state = store.getState();

    expect(state.tasks).toHaveLength(3);
    expect(state.taskTree).toHaveLength(1);
    expect(state.taskTree[0].id).toBe("project");
    expect(state.taskTree[0].children).toHaveLength(1);
  });

  it("Should default to months time scale", () => {
    const store = createGanttChartStore(tasks);

    expect(store.getState().timeScale).toBe("months");
  });

  it("Should accept a custom initial time scale", () => {
    const store = createGanttChartStore(tasks, "weeks");

    expect(store.getState().timeScale).toBe("weeks");
  });

  it("Should expand root tasks by default", () => {
    const store = createGanttChartStore(tasks);
    const { expandedIds } = store.getState();

    expect(expandedIds.has("project")).toBe(true);
    expect(expandedIds.has("release-1")).toBe(false);
  });

  it("Should toggle a task from collapsed to expanded and back", () => {
    const store = createGanttChartStore(tasks);

    store.getState().toggleExpand("release-1");
    expect(store.getState().expandedIds.has("release-1")).toBe(true);

    store.getState().toggleExpand("release-1");
    expect(store.getState().expandedIds.has("release-1")).toBe(false);
  });

  it("Should expand all tasks", () => {
    const store = createGanttChartStore(tasks);

    store.getState().expandAll();

    const { expandedIds } = store.getState();
    expect(expandedIds.has("project")).toBe(true);
    expect(expandedIds.has("release-1")).toBe(true);
    expect(expandedIds.has("sprint-1")).toBe(true);
  });

  it("Should collapse all tasks", () => {
    const store = createGanttChartStore(tasks);
    store.getState().expandAll();
    store.getState().collapseAll();

    expect(store.getState().expandedIds.size).toBe(0);
  });

  it("Should update time scale", () => {
    const store = createGanttChartStore(tasks);

    store.getState().setTimeScale("days");

    expect(store.getState().timeScale).toBe("days");
  });

  it("Should replace tasks and rebuild the tree on setTasks", () => {
    const store = createGanttChartStore(tasks);
    const newTasks: GanttTask[] = [
      {
        id: "new-root",
        name: "New Project",
        status: "planned",
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-08-31"),
      },
    ];

    store.getState().setTasks(newTasks);

    expect(store.getState().tasks).toHaveLength(1);
    expect(store.getState().taskTree[0].id).toBe("new-root");
  });

  it("Should show root task and its direct children when only the root is expanded by default", () => {
    const store = createGanttChartStore(tasks);
    // Root-Tasks sind standardmäßig aufgeklappt → direkte Kinder sichtbar, Enkel nicht.
    const visible = store.getState().getVisibleTasks();

    expect(visible.map((t) => t.id)).toEqual(["project", "release-1"]);
  });

  it("Should include grandchildren via getVisibleTasks after expanding an intermediate node", () => {
    const store = createGanttChartStore(tasks);

    store.getState().toggleExpand("release-1");
    const visible = store.getState().getVisibleTasks();

    expect(visible.map((t) => t.id)).toEqual(["project", "release-1", "sprint-1"]);
  });

  it("Should set a custom timeline range and mark it as customized", () => {
    const store = createGanttChartStore(tasks);
    const customRange = { start: new Date("2024-01-01"), end: new Date("2026-12-31") };

    store.getState().setTimelineRange(customRange);

    expect(store.getState().timelineRange.start.getFullYear()).toBe(2024);
    expect(store.getState().timelineRange.end.getFullYear()).toBe(2026);
    expect(store.getState().isRangeCustomized).toBe(true);
  });

  it("Should reset to the auto-calculated range after resetTimelineRange", () => {
    const store = createGanttChartStore(tasks);
    store.getState().setTimelineRange({ start: new Date("2024-01-01"), end: new Date("2026-12-31") });

    store.getState().resetTimelineRange();

    // Auto-Range inkl. 1-Monat-Puffer: frühester Start = 2025-01-01 → Puffer = Dez 2024
    expect(store.getState().timelineRange.start.getFullYear()).toBe(2024);
    expect(store.getState().isRangeCustomized).toBe(false);
  });

  it("Should add a task and rebuild the tree", () => {
    const store = createGanttChartStore(tasks);
    const newTask: GanttTask = {
      id: "new-task",
      parentId: "project",
      name: "New Task",
      status: "planned",
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-02-28"),
    };

    store.getState().addTask(newTask);

    expect(store.getState().tasks).toHaveLength(4);
    expect(store.getState().tasks.find((t) => t.id === "new-task")).toBeDefined();
    // Baum muss neu aufgebaut worden sein: project hat jetzt 2 direkte Kinder.
    expect(store.getState().taskTree[0].children).toHaveLength(2);
  });

  it("Should update a task and rebuild the tree", () => {
    const store = createGanttChartStore(tasks);
    const updated: GanttTask = { ...tasks[0], name: "Updated Project" };

    store.getState().updateTask(updated);

    expect(store.getState().tasks[0].name).toBe("Updated Project");
    expect(store.getState().taskTree[0].name).toBe("Updated Project");
  });

  it("Should delete a task and cascade to all descendants", () => {
    const store = createGanttChartStore(tasks);

    // release-1 löschen → sprint-1 (Kind von release-1) muss auch entfernt werden.
    store.getState().deleteTask("release-1");

    const ids = store.getState().tasks.map((t) => t.id);
    expect(ids).toContain("project");
    expect(ids).not.toContain("release-1");
    expect(ids).not.toContain("sprint-1");
    expect(store.getState().taskTree[0].children).toHaveLength(0);
  });

  it("Should expand the timeline range when a task is added outside the current range", () => {
    const store = createGanttChartStore(tasks);
    // Aktueller Bereich: ca. Dez 2024 – Mai 2025 (auto-berechnet aus tasks)
    const rangeBefore = store.getState().timelineRange;

    const futureTask: GanttTask = {
      id: "future",
      name: "Future Task",
      status: "planned",
      startDate: new Date("2027-03-01"),
      endDate: new Date("2027-05-31"),
    };
    store.getState().addTask(futureTask);

    const rangeAfter = store.getState().timelineRange;
    expect(rangeAfter.end > rangeBefore.end).toBe(true);
    expect(rangeAfter.end.getFullYear()).toBe(2027);
  });

  it("Should expand the timeline range when a task is updated to dates outside the current range", () => {
    const store = createGanttChartStore(tasks);
    const rangeBefore = store.getState().timelineRange;

    const updatedTask: GanttTask = {
      ...tasks[0],
      startDate: new Date("2023-06-01"),
      endDate: new Date("2023-12-31"),
    };
    store.getState().updateTask(updatedTask);

    const rangeAfter = store.getState().timelineRange;
    expect(rangeAfter.start < rangeBefore.start).toBe(true);
    expect(rangeAfter.start.getFullYear()).toBe(2023);
  });

  it("Should not overwrite a custom range when setTasks is called", () => {
    const store = createGanttChartStore(tasks);
    const customRange = { start: new Date("2024-01-01"), end: new Date("2026-12-31") };
    store.getState().setTimelineRange(customRange);

    const newTasks = tasks.map((t) => ({ ...t, startDate: new Date("2023-01-01") }));
    store.getState().setTasks(newTasks);

    // Manuell gesetzter Bereich bleibt erhalten.
    expect(store.getState().timelineRange.start.getFullYear()).toBe(2024);
    expect(store.getState().isRangeCustomized).toBe(true);
  });
});
