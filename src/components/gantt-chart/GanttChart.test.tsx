import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GanttChart } from "./GanttChart";
import type { GanttTask } from "./GanttChart.types";

const tasks: GanttTask[] = [
  {
    id: "root",
    name: "Root Task",
    status: "in-progress",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-03-31"),
  },
  {
    id: "child",
    parentId: "root",
    name: "Child Task",
    status: "planned",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
  },
  {
    id: "milestone",
    parentId: "root",
    name: "Sprint End",
    status: "planned",
    startDate: new Date("2025-03-31"),
    endDate: new Date("2025-03-31"),
    isMilestone: true,
  },
];

describe("GanttChart", () => {
  it("renders without crashing", () => {
    render(<GanttChart tasks={tasks} />);
  });

  it("shows root and all direct children since root is expanded by default", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByText("Root Task")).toBeInTheDocument();
    expect(screen.getByText("Child Task")).toBeInTheDocument();
    expect(screen.getByText("Sprint End")).toBeInTheDocument();
  });

  it("hides child tasks after collapsing the parent", () => {
    render(<GanttChart tasks={tasks} />);

    fireEvent.click(screen.getByText("▼"));

    expect(screen.queryByText("Child Task")).not.toBeInTheDocument();
    expect(screen.queryByText("Sprint End")).not.toBeInTheDocument();
  });

  it("shows child tasks again after re-expanding the parent", () => {
    render(<GanttChart tasks={tasks} />);

    fireEvent.click(screen.getByText("▼"));
    fireEvent.click(screen.getByText("▶"));

    expect(screen.getByText("Child Task")).toBeInTheDocument();
  });

  it("calls onTaskClick when a task row is clicked", () => {
    const onTaskClick = vi.fn();
    render(<GanttChart tasks={tasks} onTaskClick={onTaskClick} />);

    fireEvent.click(screen.getByTestId("gantt-task-row-child"));

    expect(onTaskClick).toHaveBeenCalledOnce();
    expect(onTaskClick).toHaveBeenCalledWith(expect.objectContaining({ id: "child" }));
  });

  it("calls onMilestoneClick when a milestone diamond is clicked", () => {
    const onMilestoneClick = vi.fn();
    render(<GanttChart tasks={tasks} onMilestoneClick={onMilestoneClick} />);

    fireEvent.click(screen.getByTestId("gantt-milestone-milestone"));

    expect(onMilestoneClick).toHaveBeenCalledOnce();
    expect(onMilestoneClick).toHaveBeenCalledWith(expect.objectContaining({ id: "milestone" }));
  });

  it("renders a bar for each non-milestone visible task", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-bar-root")).toBeInTheDocument();
    expect(screen.getByTestId("gantt-bar-child")).toBeInTheDocument();
  });

  it("renders a milestone diamond instead of a bar for milestone tasks", () => {
    render(<GanttChart tasks={tasks} />);

    expect(screen.getByTestId("gantt-milestone-milestone")).toBeInTheDocument();
    expect(screen.queryByTestId("gantt-bar-milestone")).not.toBeInTheDocument();
  });

  it("does not show bar rows for hidden (collapsed) children", () => {
    render(<GanttChart tasks={tasks} />);

    fireEvent.click(screen.getByText("▼"));

    expect(screen.queryByTestId("gantt-bar-child")).not.toBeInTheDocument();
    expect(screen.queryByTestId("gantt-milestone-milestone")).not.toBeInTheDocument();
  });
});
