import { describe, expect, it } from "vitest";
import type { GanttTask } from "../GanttChart.types";
import {
  buildTaskTree,
  calculateTaskPosition,
  getMonthsInRange,
  getQuartersInRange,
  getTimelineRange,
  getVisibleTasks,
  startOfMonth,
  startOfQuarter,
  endOfMonth,
  addMonths,
} from "./gantt-chart.util";

// ---------------------------------------------------------------------------
// Hilfsfunktionen
// ---------------------------------------------------------------------------

function makeTask(overrides: Partial<GanttTask> & { id: string }): GanttTask {
  return {
    name: overrides.id,
    status: "planned",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Datum-Hilfsfunktionen
// ---------------------------------------------------------------------------

describe("startOfMonth", () => {
  it("Should return the first day of the month at midnight", () => {
    const result = startOfMonth(new Date("2025-03-15"));

    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(2); // März = Index 2
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
  });
});

describe("endOfMonth", () => {
  it("Should return the last day of the month at 23:59:59", () => {
    const result = endOfMonth(new Date("2025-02-10"));

    expect(result.getDate()).toBe(28); // Februar 2025 hat 28 Tage
    expect(result.getHours()).toBe(23);
  });
});

describe("addMonths", () => {
  it("Should add months correctly across year boundaries", () => {
    const result = addMonths(new Date("2025-11-15"), 3);

    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(1); // Februar = Index 1
  });
});

describe("getMonthsInRange", () => {
  it("Should return one entry per month within the range", () => {
    const months = getMonthsInRange({
      start: new Date("2025-01-01"),
      end: new Date("2025-03-31"),
    });

    expect(months).toHaveLength(3);
    expect(months[0].getMonth()).toBe(0); // Januar
    expect(months[2].getMonth()).toBe(2); // März
  });
});

describe("startOfQuarter", () => {
  it("Should return the first day of Q1 for a January date", () => {
    const result = startOfQuarter(new Date("2025-02-15"));

    expect(result.getMonth()).toBe(0); // Januar = Q1-Start
    expect(result.getDate()).toBe(1);
  });

  it("Should return the first day of Q3 for an August date", () => {
    const result = startOfQuarter(new Date("2025-08-20"));

    expect(result.getMonth()).toBe(6); // Juli = Q3-Start
    expect(result.getDate()).toBe(1);
  });
});

describe("getQuartersInRange", () => {
  it("Should return one entry per quarter within the range", () => {
    const quarters = getQuartersInRange({
      start: new Date("2025-01-01"),
      end: new Date("2025-09-30"),
    });

    expect(quarters).toHaveLength(3);
    expect(quarters[0].key).toBe("2025-Q1");
    expect(quarters[1].key).toBe("2025-Q2");
    expect(quarters[2].key).toBe("2025-Q3");
  });

  it("Should include a quarter when the range starts mid-quarter", () => {
    const quarters = getQuartersInRange({
      start: new Date("2025-02-15"), // mitten in Q1
      end: new Date("2025-04-01"),   // Anfang Q2
    });

    // startOfQuarter rundet auf Q1-Beginn zurück → Q1 und Q2 werden zurückgegeben.
    expect(quarters[0].key).toBe("2025-Q1");
    expect(quarters).toHaveLength(2);
  });

  it("Should generate correct labels", () => {
    const quarters = getQuartersInRange({
      start: new Date("2025-10-01"),
      end: new Date("2025-12-31"),
    });

    expect(quarters[0].label).toBe("Q4 2025");
  });

  it("Should span year boundaries correctly", () => {
    const quarters = getQuartersInRange({
      start: new Date("2025-10-01"),
      end: new Date("2026-03-31"),
    });

    expect(quarters).toHaveLength(2);
    expect(quarters[0].key).toBe("2025-Q4");
    expect(quarters[1].key).toBe("2026-Q1");
  });
});

// ---------------------------------------------------------------------------
// Timeline-Bereich
// ---------------------------------------------------------------------------

describe("getTimelineRange", () => {
  it("Should return a fallback range of 3 months when the task list is empty", () => {
    const range = getTimelineRange([]);

    expect(range.end.getTime()).toBeGreaterThan(range.start.getTime());
  });

  it("Should span from the earliest start to the latest end across all tasks", () => {
    const tasks: GanttTask[] = [
      makeTask({ id: "a", startDate: new Date("2025-02-01"), endDate: new Date("2025-03-01") }),
      makeTask({ id: "b", startDate: new Date("2025-01-15"), endDate: new Date("2025-04-30") }),
    ];

    const range = getTimelineRange(tasks);

    // Start muss vor dem frühesten startDate liegen (startOfMonth schneidet auf Monatsbeginn ab)
    expect(range.start.getTime()).toBeLessThanOrEqual(new Date("2025-01-15").getTime());
    expect(range.end.getTime()).toBeGreaterThanOrEqual(new Date("2025-04-30").getTime());
  });
});

// ---------------------------------------------------------------------------
// Balken-Positionierung
// ---------------------------------------------------------------------------

describe("calculateTaskPosition", () => {
  const range = {
    start: new Date("2025-01-01"),
    end: new Date("2025-04-30"),
  };

  it("Should return left=0 and width>0 for a task starting at the timeline start", () => {
    const task = makeTask({
      id: "a",
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-31"),
    });

    const pos = calculateTaskPosition(task, range);

    expect(pos.left).toBe(0);
    expect(pos.width).toBeGreaterThan(0);
  });

  it("Should return left>0 for a task that starts after the timeline start", () => {
    const task = makeTask({
      id: "b",
      startDate: new Date("2025-03-01"),
      endDate: new Date("2025-03-31"),
    });

    const pos = calculateTaskPosition(task, range);

    expect(pos.left).toBeGreaterThan(0);
  });

  it("Should not produce negative values for tasks at the boundaries", () => {
    const task = makeTask({
      id: "c",
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-04-30"),
    });

    const pos = calculateTaskPosition(task, range);

    expect(pos.left).toBeGreaterThanOrEqual(0);
    expect(pos.width).toBeGreaterThanOrEqual(0);
  });

  it("Should return zeroes when the range has no duration", () => {
    const singleDay = { start: new Date("2025-01-01"), end: new Date("2025-01-01") };
    const task = makeTask({ id: "d" });

    const pos = calculateTaskPosition(task, singleDay);

    expect(pos.left).toBe(0);
    expect(pos.width).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Task-Baum
// ---------------------------------------------------------------------------

describe("buildTaskTree", () => {
  it("Should return root tasks when no parentId is set", () => {
    const tasks = [makeTask({ id: "a" }), makeTask({ id: "b" })];
    const tree = buildTaskTree(tasks);

    expect(tree).toHaveLength(2);
    expect(tree[0].children).toHaveLength(0);
  });

  it("Should nest child tasks under their parent", () => {
    const tasks = [
      makeTask({ id: "parent" }),
      makeTask({ id: "child", parentId: "parent" }),
    ];
    const tree = buildTaskTree(tasks);

    expect(tree).toHaveLength(1);
    expect(tree[0].children).toHaveLength(1);
    expect(tree[0].children[0].id).toBe("child");
  });

  it("Should set depth=0 for root tasks and depth=1 for their children", () => {
    const tasks = [
      makeTask({ id: "root" }),
      makeTask({ id: "child", parentId: "root" }),
      makeTask({ id: "grandchild", parentId: "child" }),
    ];
    const tree = buildTaskTree(tasks);
    const child = tree[0].children[0];
    const grandchild = child.children[0];

    expect(tree[0].depth).toBe(0);
    expect(child.depth).toBe(1);
    expect(grandchild.depth).toBe(2);
  });

  it("Should treat tasks with an unknown parentId as root tasks", () => {
    const tasks = [makeTask({ id: "orphan", parentId: "nonexistent" })];
    const tree = buildTaskTree(tasks);

    expect(tree).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// Sichtbare Tasks
// ---------------------------------------------------------------------------

describe("getVisibleTasks", () => {
  const tasks = [
    makeTask({ id: "root" }),
    makeTask({ id: "child", parentId: "root" }),
    makeTask({ id: "grandchild", parentId: "child" }),
  ];

  it("Should show only root tasks when nothing is expanded", () => {
    const tree = buildTaskTree(tasks);
    const visible = getVisibleTasks(tree, new Set());

    expect(visible.map((t) => t.id)).toEqual(["root"]);
  });

  it("Should show root and its direct children when root is expanded", () => {
    const tree = buildTaskTree(tasks);
    const visible = getVisibleTasks(tree, new Set(["root"]));

    expect(visible.map((t) => t.id)).toEqual(["root", "child"]);
  });

  it("Should show all tasks when every node is expanded", () => {
    const tree = buildTaskTree(tasks);
    const visible = getVisibleTasks(tree, new Set(["root", "child"]));

    expect(visible.map((t) => t.id)).toEqual(["root", "child", "grandchild"]);
  });
});
