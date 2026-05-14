import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box } from "@mui/material";
import { GanttChart } from "./GanttChart";
import type { GanttTask, GanttTranslations } from "./GanttChart.types";

const EN_TRANSLATIONS: GanttTranslations = {
  scaleDays: "Days",
  scaleWeeks: "Weeks",
  scaleMonths: "Months",
  scaleQuarters: "Quarters",
  rangeFrom: "From",
  rangeTo: "To",
  rangeResetTooltip: "Reset range",
  columnName: "Name",
  columnStatus: "Status",
  statusPlanned: "Planned",
  statusInProgress: "In Progress",
  statusDone: "Done",
  statusBlocked: "Blocked",
  weekColumnPrefix: "W",
  dateLocale: "en-US",
  dialogAddTitle: "Add Task",
  dialogEditTitle: "Edit Task",
  dialogDeleteTitle: "Delete Task",
  dialogSave: "Save",
  dialogCancel: "Cancel",
  dialogDelete: "Delete",
  dialogFieldName: "Name",
  dialogFieldStartDate: "Start Date",
  dialogFieldEndDate: "End Date",
  dialogFieldStatus: "Status",
  dialogFieldMilestone: "Is Milestone",
  dialogFieldParent: "Parent Task",
  dialogFieldParentNone: "— None —",
  dialogDeleteConfirm: "Delete task \"{name}\"?",
  scrollToTodayTooltip: "Scroll to today",
  expandAllTooltip: "Expand all",
  collapseAllTooltip: "Collapse all",
  resetViewTooltip: "Reset view",
};

const sampleTasks: GanttTask[] = [
  {
    id: "project",
    name: "E-Commerce Platform v2.0",
    status: "in-progress",
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-06-30"),
  },

  // Release 1 — Backend API
  {
    id: "release-1",
    parentId: "project",
    name: "Release 1 — Backend API",
    status: "in-progress",
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-04-30"),
  },
  {
    id: "r1-team-alpha",
    parentId: "release-1",
    name: "Team Alpha",
    status: "done",
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-03-31"),
  },
  {
    id: "r1-alpha-sprint-1",
    parentId: "r1-team-alpha",
    name: "Sprint 1 — Auth Service",
    status: "done",
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-03-15"),
  },
  {
    id: "r1-alpha-sprint-2",
    parentId: "r1-team-alpha",
    name: "Sprint 2 — Product API",
    status: "done",
    startDate: new Date("2026-03-16"),
    endDate: new Date("2026-03-31"),
  },
  {
    id: "r1-team-beta",
    parentId: "release-1",
    name: "Team Beta",
    status: "in-progress",
    startDate: new Date("2026-04-01"),
    endDate: new Date("2026-04-30"),
  },
  {
    id: "r1-beta-sprint-1",
    parentId: "r1-team-beta",
    name: "Sprint 1 — Order Service",
    status: "done",
    startDate: new Date("2026-04-01"),
    endDate: new Date("2026-04-15"),
  },
  {
    id: "r1-beta-sprint-2",
    parentId: "r1-team-beta",
    name: "Sprint 2 — Payment Integration",
    status: "in-progress",
    startDate: new Date("2026-04-16"),
    endDate: new Date("2026-04-30"),
  },

  // Release 2 — Frontend
  {
    id: "release-2",
    parentId: "project",
    name: "Release 2 — Frontend",
    status: "planned",
    startDate: new Date("2026-05-01"),
    endDate: new Date("2026-06-30"),
    dependencies: ["release-1"],
  },
  {
    id: "r2-team-alpha",
    parentId: "release-2",
    name: "Team Alpha",
    status: "planned",
    startDate: new Date("2026-05-01"),
    endDate: new Date("2026-05-31"),
  },
  {
    id: "r2-alpha-sprint-1",
    parentId: "r2-team-alpha",
    name: "Sprint 1 — Component Library",
    status: "planned",
    startDate: new Date("2026-05-01"),
    endDate: new Date("2026-05-15"),
  },
  {
    id: "r2-alpha-sprint-2",
    parentId: "r2-team-alpha",
    name: "Sprint 2 — Product Catalog UI",
    status: "planned",
    startDate: new Date("2026-05-16"),
    endDate: new Date("2026-05-31"),
  },
  {
    id: "r2-team-beta",
    parentId: "release-2",
    name: "Team Beta",
    status: "planned",
    startDate: new Date("2026-06-01"),
    endDate: new Date("2026-06-30"),
  },
  {
    id: "r2-beta-sprint-1",
    parentId: "r2-team-beta",
    name: "Sprint 1 — Checkout Flow",
    status: "planned",
    startDate: new Date("2026-06-01"),
    endDate: new Date("2026-06-15"),
  },
  {
    id: "r2-beta-sprint-2",
    parentId: "r2-team-beta",
    name: "Sprint 2 — Testing & QA",
    status: "planned",
    startDate: new Date("2026-06-16"),
    endDate: new Date("2026-06-30"),
  },

  // Milestone
  {
    id: "milestone-go-live",
    parentId: "project",
    name: "Go-Live",
    status: "planned",
    startDate: new Date("2026-06-30"),
    endDate: new Date("2026-06-30"),
    isMilestone: true,
    dependencies: ["release-2"],
  },
];

const meta: Meta<typeof GanttChart> = {
  title: "Components/GanttChart",
  component: GanttChart,
  args: {
    height: 500,
    width: "auto",
    initialExpandAll: true,
    showToolbar: true,
    enableBuiltinDialogs: true,
    zoomable: true,
    draggable: true,
    resizable: true,
    cascadeDependencies: true,
    minPanelWidth: 200,
    maxPanelWidth: 600,
    // Alle Callbacks als fn() damit sie im Storybook-Actions-Tab erscheinen.
    onTaskClick: fn(),
    onMilestoneClick: fn(),
    onAddTask: fn(),
    onEditTask: fn(),
    onDeleteTask: fn(),
    onStatusChange: fn(),
    onTasksChange: fn(),
    onTaskCreated: fn(),
    onTaskUpdated: fn(),
    onTaskDeleted: fn(),
  },
  argTypes: {
    timeScale: { control: "radio", options: ["days", "weeks", "months", "quarters"] },
    height: { control: "text" },
    width: { control: "text" },
    initialExpandAll: { control: "boolean" },
    showToolbar: { control: "boolean" },
    enableBuiltinDialogs: { control: "boolean" },
    zoomable: { control: "boolean" },
    draggable: { control: "boolean" },
    resizable: { control: "boolean" },
    cascadeDependencies: { control: "boolean" },
    toolbarConfig: { control: false },
    onTaskMoved: { control: false },
    onTaskResized: { control: false },
    minPanelWidth: { control: "number" },
    maxPanelWidth: { control: "number" },
    // Date objects aren't directly controllable — use the CustomDateRange story instead.
    defaultRangeStart: { control: false },
    defaultRangeEnd: { control: false },
    translations: { control: false },
    onTaskClick: { control: false },
    onMilestoneClick: { control: false },
    onAddTask: { control: false },
    onEditTask: { control: false },
    onDeleteTask: { control: false },
    onStatusChange: { control: false },
    onTasksChange: { control: false },
    onTaskCreated: { control: false },
    onTaskUpdated: { control: false },
    onTaskDeleted: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof GanttChart>;

export const Default: Story = {
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    enableBuiltinDialogs: true,
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

export const WeeksScale: Story = {
  args: {
    tasks: sampleTasks,
    timeScale: "weeks",
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

export const QuartersScale: Story = {
  args: {
    tasks: sampleTasks,
    timeScale: "quarters",
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

export const DaysScale: Story = {
  args: {
    tasks: sampleTasks,
    timeScale: "days",
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

export const FullyExpanded: Story = {
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    initialExpandAll: true,
    height: 700,
    enableBuiltinDialogs: true,
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

const dependencyTasks: GanttTask[] = [
  {
    id: "design",
    name: "Design",
    status: "done",
    startDate: new Date("2026-01-01"),
    endDate: new Date("2026-01-31"),
  },
  {
    id: "research",
    name: "Research",
    status: "done",
    startDate: new Date("2026-01-01"),
    endDate: new Date("2026-02-15"),
  },
  {
    id: "dev",
    name: "Development",
    status: "in-progress",
    startDate: new Date("2026-02-01"),
    endDate: new Date("2026-03-31"),
    dependencies: ["design"],
  },
  {
    id: "docs",
    name: "Documentation",
    status: "planned",
    startDate: new Date("2026-02-15"),
    endDate: new Date("2026-03-15"),
    dependencies: ["design"],
  },
  {
    id: "testing",
    name: "Testing",
    status: "planned",
    startDate: new Date("2026-04-01"),
    endDate: new Date("2026-04-30"),
    dependencies: ["dev", "research"],
  },
  {
    id: "release",
    name: "Release",
    status: "planned",
    startDate: new Date("2026-05-01"),
    endDate: new Date("2026-05-15"),
    dependencies: ["testing", "docs"],
  },
  {
    id: "go-live",
    name: "Go-Live",
    status: "planned",
    startDate: new Date("2026-05-15"),
    endDate: new Date("2026-05-15"),
    isMilestone: true,
    dependencies: ["release"],
  },
];

export const WithDependencies: Story = {
  args: {
    tasks: dependencyTasks,
    timeScale: "months",
    height: 400,
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

export const CustomDateRange: Story = {
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    defaultRangeStart: new Date("2026-01-01"),
    defaultRangeEnd: new Date("2026-12-31"),
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

export const EnglishTranslations: Story = {
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    translations: EN_TRANSLATIONS,
    enableBuiltinDialogs: true,
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

export const NoToolbar: Story = {
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    showToolbar: false,
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

export const MinimalFlat: Story = {
  args: {
    tasks: sampleTasks.filter((t) => !t.parentId || t.parentId === "project"),
    timeScale: "months",
    height: 300,
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 700, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

const progressTasks: GanttTask[] = [
  {
    id: "project",
    name: "E-Commerce Platform v2.0",
    status: "in-progress",
    startDate: new Date("2026-01-01"),
    endDate: new Date("2026-12-31"),
    progress: 45,
  },
  {
    id: "phase-1",
    parentId: "project",
    name: "Phase 1 — Backend",
    status: "done",
    startDate: new Date("2026-01-01"),
    endDate: new Date("2026-03-31"),
    progress: 100,
  },
  {
    id: "phase-2",
    parentId: "project",
    name: "Phase 2 — Frontend",
    status: "in-progress",
    startDate: new Date("2026-04-01"),
    endDate: new Date("2026-07-31"),
    progress: 60,
  },
  {
    id: "phase-3",
    parentId: "project",
    name: "Phase 3 — QA & Release",
    status: "planned",
    startDate: new Date("2026-08-01"),
    endDate: new Date("2026-11-30"),
    progress: 0,
  },
  {
    id: "go-live",
    parentId: "project",
    name: "Go-Live",
    status: "planned",
    startDate: new Date("2026-12-01"),
    endDate: new Date("2026-12-01"),
    isMilestone: true,
  },
];

export const WithProgress: Story = {
  args: {
    tasks: progressTasks,
    timeScale: "months",
    initialExpandAll: true,
    height: 400,
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

export const WithBuiltinDialogs: Story = {
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    enableBuiltinDialogs: true,
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

export const ZoomAndToday: Story = {
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    zoomable: true,
    enableBuiltinDialogs: true,
    height: 500,
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

export const DragAndResize: Story = {
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    draggable: true,
    resizable: true,
    initialExpandAll: true,
    enableBuiltinDialogs: true,
    height: 600,
    onTaskMoved: fn(),
    onTaskResized: fn(),
    onTasksChange: fn(),
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 1100, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};
