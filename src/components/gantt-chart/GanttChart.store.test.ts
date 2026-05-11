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
});
