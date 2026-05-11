import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
import { GanttChart } from "./GanttChart";
import type { GanttTask } from "./GanttChart.types";

const sampleTasks: GanttTask[] = [
  {
    id: "project",
    name: "E-Commerce Platform v2.0",
    status: "in-progress",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-06-30"),
  },

  // Release 1 — Backend API
  {
    id: "release-1",
    parentId: "project",
    name: "Release 1 — Backend API",
    status: "in-progress",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-04-30"),
  },
  {
    id: "r1-team-alpha",
    parentId: "release-1",
    name: "Team Alpha",
    status: "done",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-03-31"),
  },
  {
    id: "r1-alpha-sprint-1",
    parentId: "r1-team-alpha",
    name: "Sprint 1 — Auth Service",
    status: "done",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-03-15"),
  },
  {
    id: "r1-alpha-sprint-2",
    parentId: "r1-team-alpha",
    name: "Sprint 2 — Product API",
    status: "done",
    startDate: new Date("2025-03-16"),
    endDate: new Date("2025-03-31"),
  },
  {
    id: "r1-team-beta",
    parentId: "release-1",
    name: "Team Beta",
    status: "in-progress",
    startDate: new Date("2025-04-01"),
    endDate: new Date("2025-04-30"),
  },
  {
    id: "r1-beta-sprint-1",
    parentId: "r1-team-beta",
    name: "Sprint 1 — Order Service",
    status: "done",
    startDate: new Date("2025-04-01"),
    endDate: new Date("2025-04-15"),
  },
  {
    id: "r1-beta-sprint-2",
    parentId: "r1-team-beta",
    name: "Sprint 2 — Payment Integration",
    status: "in-progress",
    startDate: new Date("2025-04-16"),
    endDate: new Date("2025-04-30"),
  },

  // Release 2 — Frontend
  {
    id: "release-2",
    parentId: "project",
    name: "Release 2 — Frontend",
    status: "planned",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-06-30"),
    dependencies: ["release-1"],
  },
  {
    id: "r2-team-alpha",
    parentId: "release-2",
    name: "Team Alpha",
    status: "planned",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-05-31"),
  },
  {
    id: "r2-alpha-sprint-1",
    parentId: "r2-team-alpha",
    name: "Sprint 1 — Component Library",
    status: "planned",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-05-15"),
  },
  {
    id: "r2-alpha-sprint-2",
    parentId: "r2-team-alpha",
    name: "Sprint 2 — Product Catalog UI",
    status: "planned",
    startDate: new Date("2025-05-16"),
    endDate: new Date("2025-05-31"),
  },
  {
    id: "r2-team-beta",
    parentId: "release-2",
    name: "Team Beta",
    status: "planned",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-06-30"),
  },
  {
    id: "r2-beta-sprint-1",
    parentId: "r2-team-beta",
    name: "Sprint 1 — Checkout Flow",
    status: "planned",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-06-15"),
  },
  {
    id: "r2-beta-sprint-2",
    parentId: "r2-team-beta",
    name: "Sprint 2 — Testing & QA",
    status: "planned",
    startDate: new Date("2025-06-16"),
    endDate: new Date("2025-06-30"),
  },

  // Milestone
  {
    id: "milestone-go-live",
    parentId: "project",
    name: "Go-Live",
    status: "planned",
    startDate: new Date("2025-06-30"),
    endDate: new Date("2025-06-30"),
    isMilestone: true,
    dependencies: ["release-2"],
  },
];

const meta: Meta<typeof GanttChart> = {
  title: "Components/GanttChart",
  component: GanttChart,
};

export default meta;

type Story = StoryObj<typeof GanttChart>;

export const Default: Story = {
  args: {
    tasks: sampleTasks,
    timeScale: "months",
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: 500 }}>
      <GanttChart
        {...args}
        onTaskClick={(task) => console.log("onTaskClick", task)}
        onMilestoneClick={(task) => console.log("onMilestoneClick", task)}
        onAddTask={(parent) => console.log("onAddTask", parent)}
        onDeleteTask={(task) => console.log("onDeleteTask", task)}
        onStatusChange={(task, status) => console.log("onStatusChange", task, status)}
      />
    </Box>
  ),
};

export const WeeksScale: Story = {
  args: {
    tasks: sampleTasks,
    timeScale: "weeks",
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: 500 }}>
      <GanttChart {...args} onTaskClick={(task) => console.log("onTaskClick", task)} />
    </Box>
  ),
};

export const QuartersScale: Story = {
  args: {
    tasks: sampleTasks,
    timeScale: "quarters",
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: 500 }}>
      <GanttChart {...args} onTaskClick={(task) => console.log("onTaskClick", task)} />
    </Box>
  ),
};

export const MinimalFlat: Story = {
  args: {
    tasks: sampleTasks.filter((t) => !t.parentId || t.parentId === "project"),
    timeScale: "months",
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 700, height: 300 }}>
      <GanttChart {...args} />
    </Box>
  ),
};
