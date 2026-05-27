import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box } from "@mui/material";
import { GanttChart } from "./GanttChart";
import type { GanttTask, GanttTaskStatus, GanttTranslations } from "./GanttChart.types";

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
  todayLabel: "Today",
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
  dialogFieldDependencies: "Predecessors",
  dialogFieldDependenciesNone: "— None —",
  scrollToTodayTooltip: "Scroll to today",
  expandAllTooltip: "Expand all",
  collapseAllTooltip: "Collapse all",
  resetViewTooltip: "Reset view",
  columnActions: "Actions",
  addTaskTooltip: "Add task",
  editTaskTooltip: "Edit task",
  deleteTaskTooltip: "Delete task",
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
    // A–Z
    cascadeDependencies:  true,
    draggable:            true,
    enableBuiltinDialogs: true,
    height:               500,
    initialExpandAll:     true,
    inlineEdit:           true,
    maxPanelWidth:        600,
    minPanelWidth:        200,
    progressDraggable:    true,
    resizable:            true,
    showCriticalPath:     false,
    showToolbar:          true,
    virtualizeRows:       false,
    width:                "auto",
    zoomable:             true,
    // Callbacks — alle als fn() damit sie im Storybook-Actions-Tab erscheinen.
    onAddTask:        fn(),
    onDeleteTask:     fn(),
    onEditTask:       fn(),
    onMilestoneClick: fn(),
    onStatusChange:   fn(),
    onTaskClick:      fn(),
    onTaskCreated:    fn(),
    onTaskDeleted:    fn(),
    onTaskMoved:      fn(),
    onTaskResized:    fn(),
    onTasksChange:    fn(),
    onTaskUpdated:    fn(),
  },
  argTypes: {
    // A–Z
    cascadeDependencies:  { control: "boolean" },
    // Date objects aren't directly controllable — use the CustomDateRange story instead.
    defaultRangeEnd:   { control: false },
    defaultRangeStart: { control: false },
    draggable:            { control: "boolean" },
    enableBuiltinDialogs: { control: "boolean" },
    ganttTheme:           { control: false },
    height:               { control: "text" },
    initialExpandAll:     { control: "boolean" },
    inlineEdit:           { control: "boolean" },
    maxPanelWidth:        { control: "number" },
    minPanelWidth:        { control: "number" },
    progressDraggable:    { control: "boolean" },
    resizable:            { control: "boolean" },
    showCriticalPath:     { control: "boolean" },
    showToolbar:          { control: "boolean" },
    statusColors:         { control: false },
    timeScale: { control: "radio", options: ["days", "weeks", "months", "quarters"] },
    toolbarConfig:        { control: false },
    translations:         { control: false },
    virtualizeRows:       { control: "boolean" },
    width:                { control: "text" },
    zoomable:             { control: "boolean" },
    // Callbacks
    onAddTask:        { control: false },
    onDeleteTask:     { control: false },
    onEditTask:       { control: false },
    onMilestoneClick: { control: false },
    onStatusChange:   { control: false },
    onTaskClick:      { control: false },
    onTaskCreated:    { control: false },
    onTaskDeleted:    { control: false },
    onTaskMoved:      { control: false },
    onTaskResized:    { control: false },
    onTasksChange:    { control: false },
    onTaskUpdated:    { control: false },
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
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates two timeline navigation features:\n\n' +
          '**Ctrl+Scroll zoom** (`zoomable`): Hold `Ctrl` (Windows/Linux) or `Cmd` (macOS) and scroll ' +
          'with the mouse wheel inside the timeline to cycle through zoom levels — ' +
          '`days` → `weeks` → `months` → `quarters` and back.\n\n' +
          '**Today chip**: The small labeled chip at the top of the dashed today line. ' +
          'Its label is configurable via `translations.todayLabel` (default: `"Heute"`, English: `"Today"`). ' +
          'Set `todayLabel: ""` to hide it. Hover the chip for a tooltip with the full localized date.',
      },
    },
  },
  args: {
    tasks:               sampleTasks,
    timeScale:           "months",
    zoomable:            true,
    enableBuiltinDialogs: true,
    height:              500,
    translations:        EN_TRANSLATIONS,
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

export const DragAndResize: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Drag** (`draggable`): Grab any task bar and drag it horizontally to shift its start and end date in sync. ' +
          'A tooltip shows the current dates while dragging.\n\n' +
          '**Resize** (`resizable`): Drag the right edge of a bar to extend or shorten the end date. ' +
          'A tooltip shows the new end date while dragging.\n\n' +
          'Both interactions fire the `onTaskMoved` / `onTaskResized` callbacks and update the task list ' +
          'via `onTasksChange`. Use `cascadeDependencies` (default: `true`) to automatically shift all ' +
          'downstream tasks when a predecessor moves.',
      },
    },
  },
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

// ---------------------------------------------------------------------------
// LargeDataset — Phase 16: Virtualisierung
// ---------------------------------------------------------------------------

function generateLargeTasks(): GanttTask[] {
  const statuses: GanttTaskStatus[] = ["planned", "in-progress", "done", "blocked"];
  const tasks: GanttTask[] = [];
  let counter = 0;

  const d = (year: number, month: number, day: number) => new Date(year, month - 1, day);

  for (let p = 0; p < 4; p++) {
    const programId = `prog-${p}`;
    tasks.push({
      id: programId,
      name: `Program ${p + 1}`,
      status: statuses[counter++ % 4],
      startDate: d(2025, 1 + p * 3, 1),
      endDate: d(2026, 3 + p * 3, 30),
    });

    for (let r = 0; r < 4; r++) {
      const releaseId = `prog-${p}-rel-${r}`;
      tasks.push({
        id: releaseId,
        parentId: programId,
        name: `Release ${r + 1}`,
        status: statuses[counter++ % 4],
        startDate: d(2025, 1 + p * 3 + r, 1),
        endDate: d(2025, 2 + p * 3 + r, 28),
      });

      for (let t = 0; t < 5; t++) {
        const teamId = `prog-${p}-rel-${r}-team-${t}`;
        tasks.push({
          id: teamId,
          parentId: releaseId,
          name: `Team ${t + 1}`,
          status: statuses[counter++ % 4],
          startDate: d(2025, 1 + p * 3 + r, 1 + t * 4),
          endDate: d(2025, 1 + p * 3 + r, 5 + t * 5),
        });

        for (let s = 0; s < 4; s++) {
          tasks.push({
            id: `prog-${p}-rel-${r}-team-${t}-sprint-${s}`,
            parentId: teamId,
            name: `Sprint ${s + 1}`,
            status: statuses[counter++ % 4],
            startDate: d(2025, 1 + p * 3 + r, 1 + s * 7),
            endDate: d(2025, 1 + p * 3 + r, 7 + s * 7),
          });
        }
      }
    }
  }

  return tasks;
}

const largeTasks = generateLargeTasks();

export const CustomGanttTheme: Story = {
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    initialExpandAll: true,
    height: 500,
    enableBuiltinDialogs: true,
    showCriticalPath: true,
    ganttTheme: {
      statusColors: {
        planned: "#7c3aed",
        "in-progress": "#0ea5e9",
        done: "#16a34a",
        blocked: "#dc2626",
      },
      criticalPathColor: "#ff6b35",
      milestoneColor: "#7c3aed",
      todayLineColor: "#ff6b35",
      weekendColor: "rgba(124, 58, 237, 0.06)",
      barBorderRadius: 8,
    },
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

const coloredTasks: typeof sampleTasks = sampleTasks.map((t, i) => ({
  ...t,
  color: i % 5 === 0 ? "#e11d48" : i % 5 === 1 ? "#0891b2" : i % 5 === 2 ? "#16a34a" : i % 5 === 3 ? "#d97706" : undefined,
}));

export const PerTaskColor: Story = {
  args: {
    tasks: coloredTasks,
    timeScale: "months",
    initialExpandAll: true,
    height: 500,
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

export const CriticalPath: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showCriticalPath` highlights the **longest dependency chain** in the project — ' +
          'the sequence of tasks that directly determines the earliest possible finish date. ' +
          'Critical tasks and their dependency arrows are rendered in `ganttTheme.criticalPathColor` ' +
          '(default: MUI `error.main`). Hover a task bar to see its status.',
      },
    },
  },
  args: {
    tasks:           dependencyTasks,
    timeScale:       "months",
    showCriticalPath: true,
    initialExpandAll: true,
    height:          450,
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 900, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

export const WithProgressAndInlineEdit: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Two interactive editing features in one story:\n\n' +
          '**Progress drag** (`progressDraggable`): Drag the small triangular handle on the right side ' +
          'of a task bar to adjust the progress percentage (0–100 %) directly in the timeline. ' +
          'The semi-transparent overlay expands as you drag right.\n\n' +
          '**Inline edit** (`inlineEdit`): **Double-click a task name** in the left panel to edit it ' +
          'in-place. Press Enter or click outside to confirm, Escape to cancel.',
      },
    },
  },
  args: {
    tasks:            sampleTasks,
    timeScale:        "months",
    draggable:        true,
    progressDraggable: true,
    inlineEdit:       true,
    initialExpandAll: true,
    height:           550,
    enableBuiltinDialogs: true,
    onTaskMoved:      fn(),
    onTasksChange:    fn(),
  },
  render: (args) => (
    <Box sx={{ width: "100%", maxWidth: 1100, height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};

export const LargeDataset: Story = {
  args: {
    tasks: largeTasks,
    timeScale: "months",
    initialExpandAll: true,
    virtualizeRows: true,
    height: 600,
    enableBuiltinDialogs: true,
  },
  render: (args) => (
    <Box sx={{ width: "100%", height: args.height }}>
      <GanttChart {...args} />
    </Box>
  ),
};
