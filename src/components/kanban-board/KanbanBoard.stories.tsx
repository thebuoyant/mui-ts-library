import type { ComponentProps } from "react";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { KanbanBoard } from "./KanbanBoard";
import type { KanbanColumn, KanbanTask } from "./KanbanBoard.types";

// ── Shared fixtures ───────────────────────────────────────────────────────────

const DEFAULT_COLUMNS: KanbanColumn[] = [
  { id: "todo",        label: "To Do",       color: "#9e9e9e" },
  { id: "in-progress", label: "In Progress", color: "#2196f3" },
  { id: "review",      label: "In Review",   color: "#ff9800" },
  { id: "done",        label: "Done",        color: "#4caf50" },
];

const DEFAULT_TASKS: KanbanTask[] = [
  { id: "1", title: "Set up project structure",    status: "done",        assignee: "Alice",   dueDate: new Date("2026-07-01") },
  { id: "2", title: "Design component API",        status: "done",        assignee: "Bob" },
  { id: "3", title: "Implement drag and drop",     status: "in-progress", assignee: "Alice",   dueDate: new Date("2026-07-20") },
  { id: "4", title: "Write unit tests",            status: "in-progress", assignee: "Charlie" },
  { id: "5", title: "Add Storybook stories",       status: "review",      assignee: "Bob",     dueDate: new Date("2026-07-22") },
  { id: "6", title: "Write user documentation",    status: "todo",        assignee: "Alice",   dueDate: new Date("2026-07-25") },
  { id: "7", title: "Accessibility audit",         status: "todo" },
  { id: "8", title: "Performance profiling",       status: "todo",        assignee: "Charlie" },
  { id: "9", title: "Publish npm release",         status: "todo",        dueDate: new Date("2026-07-31") },
];

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof KanbanBoard> = {
  title: "Components/KanbanBoard",
  component: KanbanBoard,
  args: {
    columns:              DEFAULT_COLUMNS,
    tasks:                DEFAULT_TASKS,
    enableBuiltinDialogs: true,
    filterText:           "",
    showSearchField:      false,
    showPriority:         true,
    showAssignee:         true,
    showDueDate:          true,
    showDueDateWarning:   true,
    showSubtasks:         true,
    chipVariant:          "outlined",
    width:                "100%",
    height:               500,
    onTasksChange:        fn(),
    onTaskCreated:        fn(),
    onTaskUpdated:        fn(),
    onTaskDeleted:        fn(),
    onTaskMoved:          fn(),
    onCardClick:          fn(),
  },
  argTypes: {
    chipVariant:          { control: "radio", options: ["outlined", "filled"] },
    enableBuiltinDialogs: { control: "boolean" },
    filterText:           { control: "text" },
    showSearchField:      { control: "boolean" },
    height:               { control: "number" },
    showAssignee:         { control: "boolean" },
    showDueDate:          { control: "boolean" },
    showDueDateWarning:   { control: "boolean" },
    showPriority:         { control: "boolean" },
    showSubtasks:         { control: "boolean" },
    width:                { control: "text" },
    // Complex objects — use dedicated stories instead.
    columns:              { control: false },
    tasks:                { control: false },
    translation:          { control: false },
    // Callbacks
    onCardClick:          { control: false },
    onTaskCreated:        { control: false },
    onTaskDeleted:        { control: false },
    onTaskMoved:          { control: false },
    onTasksChange:        { control: false },
    onTaskUpdated:        { control: false },
  },
  parameters: {
    controls: { sort: "alpha" },
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "Default",
};

function ControlledStory(args: ComponentProps<typeof KanbanBoard>) {
  const [tasks, setTasks] = useState<KanbanTask[]>(DEFAULT_TASKS);
  function handleChange(updated: KanbanTask[]) {
    setTasks(updated);
    args.onTasksChange?.(updated);
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <KanbanBoard {...args} tasks={tasks} onTasksChange={handleChange} />
      <Typography variant="caption" color="text.secondary" sx={{ px: 2, py: 0.5 }}>
        {tasks.length} cards total · drag between columns to reorder
      </Typography>
    </Box>
  );
}

export const Controlled: Story = {
  name: "Controlled (drag + CRUD live)",
  render: (args) => <ControlledStory {...args} />,
  args: { height: "calc(100vh - 32px)" },
};

export const WithWipLimits: Story = {
  name: "With WIP limits",
  args: {
    columns: [
      { id: "todo",        label: "Backlog",      color: "#9e9e9e", wipLimit: 10 },
      { id: "in-progress", label: "In Progress",  color: "#2196f3", wipLimit: 3  },
      { id: "review",      label: "Review",       color: "#ff9800", wipLimit: 2  },
      { id: "done",        label: "Done",         color: "#4caf50" },
    ],
  },
};

export const MinimalCards: Story = {
  name: "Cards — no meta (no assignee / no due date)",
  args: {
    showAssignee: false,
    showDueDate:  false,
  },
};

export const CardColors: Story = {
  name: "Cards — individual colors",
  args: {
    tasks: [
      { id: "a", title: "High priority bug",    status: "todo",        color: "#f44336", assignee: "Alice" },
      { id: "b", title: "Feature request",      status: "todo",        color: "#2196f3" },
      { id: "c", title: "Tech debt cleanup",    status: "in-progress", color: "#ff9800", assignee: "Bob" },
      { id: "d", title: "Documentation update", status: "in-progress" },
      { id: "e", title: "Security patch",       status: "review",      color: "#9c27b0" },
      { id: "f", title: "Released!",            status: "done",        color: "#4caf50", assignee: "Alice" },
    ],
  },
};

export const EmptyBoard: Story = {
  name: "Empty columns",
  args: {
    tasks: [],
  },
};

export const SingleColumn: Story = {
  name: "Single column — backlog",
  args: {
    columns: [{ id: "backlog", label: "Backlog", color: "#607d8b" }],
    tasks: DEFAULT_TASKS.map((t) => ({ ...t, status: "backlog" })),
  },
};

export const PriorityIndicators: Story = {
  name: "Priority indicators",
  args: {
    columns: [
      { id: "todo",        label: "To Do",       color: "#9e9e9e" },
      { id: "in-progress", label: "In Progress",  color: "#2196f3" },
      { id: "done",        label: "Done",         color: "#4caf50" },
    ],
    tasks: [
      { id: "p1", title: "Critical — fix prod outage",    status: "todo",        priority: "critical", assignee: "Alice" },
      { id: "p2", title: "High — security patch",         status: "todo",        priority: "high",     assignee: "Bob" },
      { id: "p3", title: "Medium — improve performance",  status: "in-progress", priority: "medium",   assignee: "Alice" },
      { id: "p4", title: "Low — update dependencies",     status: "in-progress", priority: "low" },
      { id: "p5", title: "No priority set",               status: "todo" },
      { id: "p6", title: "Done — was critical",           status: "done",        priority: "critical", assignee: "Bob" },
    ],
    // Toggle showPriority in Controls panel to compare on/off.
    showPriority: true,
  },
};

export const OverdueWarning: Story = {
  name: "Overdue due-date warning",
  args: {
    columns: [
      { id: "todo",        label: "To Do",       color: "#9e9e9e" },
      { id: "in-progress", label: "In Progress",  color: "#2196f3" },
      { id: "done",        label: "Done",         color: "#4caf50" },
    ],
    tasks: [
      { id: "a", title: "Overdue — 2 weeks ago",  status: "todo",        assignee: "Alice",   dueDate: new Date(Date.now() - 14 * 86_400_000) },
      { id: "b", title: "Overdue — yesterday",    status: "in-progress", assignee: "Bob",     dueDate: new Date(Date.now() -      86_400_000) },
      { id: "c", title: "Due tomorrow (on time)", status: "todo",        assignee: "Charlie", dueDate: new Date(Date.now() +      86_400_000) },
      { id: "d", title: "Due in 7 days",          status: "in-progress",                      dueDate: new Date(Date.now() +  7 * 86_400_000) },
      { id: "e", title: "No due date",            status: "todo" },
      { id: "f", title: "Completed on time",      status: "done",        assignee: "Alice",   dueDate: new Date(Date.now() +  3 * 86_400_000) },
    ],
    // Toggle showDueDateWarning in Controls panel to compare on/off.
    showDueDateWarning: true,
  },
};

const SUBTASK_TASKS: KanbanTask[] = [
  {
    id: "s1", title: "Set up project", status: "done", assignee: "Alice",
    subtasks: [
      { id: "sub1", title: "Create repo",          done: true },
      { id: "sub2", title: "Install dependencies", done: true },
      { id: "sub3", title: "Configure CI",         done: true },
    ],
  },
  {
    id: "s2", title: "Design component API", status: "in-progress", assignee: "Bob",
    subtasks: [
      { id: "sub4", title: "Define TypeScript types", done: true  },
      { id: "sub5", title: "Write unit tests",        done: false },
      { id: "sub6", title: "Document all props",      done: false },
    ],
  },
  {
    id: "s3", title: "Implement drag and drop", status: "in-progress",
    subtasks: [
      { id: "sub7", title: "Core DnD logic",  done: true  },
      { id: "sub8", title: "UI interactions", done: false },
    ],
  },
  {
    id: "s4", title: "Write documentation", status: "todo", assignee: "Alice",
    subtasks: [
      { id: "sub9",  title: "User manual",       done: false },
      { id: "sub10", title: "Storybook stories", done: false },
      { id: "sub11", title: "README",            done: false },
      { id: "sub12", title: "Changelog",         done: false },
    ],
  },
  {
    id: "s5", title: "Publish npm release", status: "todo",
    subtasks: [
      { id: "sub13", title: "Version bump",    done: false },
      { id: "sub14", title: "Tag git release", done: false },
    ],
  },
  {
    id: "s6", title: "Regular card — no subtasks", status: "review", assignee: "Bob",
  },
];

function WithSubtasksStory(args: ComponentProps<typeof KanbanBoard>) {
  const [tasks, setTasks] = useState<KanbanTask[]>(SUBTASK_TASKS);
  return (
    <KanbanBoard
      {...args}
      tasks={tasks}
      onTasksChange={(updated) => { setTasks(updated); args.onTasksChange?.(updated); }}
      onTaskCreated={(task) => args.onTaskCreated?.(task)}
      onTaskUpdated={(task) => args.onTaskUpdated?.(task)}
      onTaskDeleted={(id) => args.onTaskDeleted?.(id)}
      onTaskMoved={(task, from, to) => args.onTaskMoved?.(task, from, to)}
    />
  );
}

export const WithSubtasks: Story = {
  name: "Subtasks — progress bar on cards (live)",
  render: (args) => <WithSubtasksStory {...args} />,
};

export const FilterSearch: Story = {
  name: "Filter / Suche — built-in field (showSearchField)",
  args: {
    showSearchField: true,
    height: 520,
  },
};

function ExternalFilterStory(args: ComponentProps<typeof KanbanBoard>) {
  const [tasks, setTasks]       = useState<KanbanTask[]>(DEFAULT_TASKS);
  const [filterText, setFilter] = useState("");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", gap: 0 }}>
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <TextField
          size="small"
          placeholder="Search by title or assignee…"
          value={filterText}
          onChange={(e) => setFilter((e.target as HTMLInputElement).value)}
          sx={{ width: 280 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: "text.disabled" }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <KanbanBoard
        {...args}
        tasks={tasks}
        filterText={filterText}
        height="calc(100vh - 72px)"
        onTasksChange={(updated) => { setTasks(updated); args.onTasksChange?.(updated); }}
      />
    </Box>
  );
}

export const FilterSearchExternal: Story = {
  name: "Filter / Suche — external field (filterText)",
  render: (args) => <ExternalFilterStory {...args} />,
};

export const GermanLabels: Story = {
  name: "German labels",
  args: {
    translation: {
      addCardLabel:           "Karte hinzufügen",
      dialogAddTitle:         "Karte hinzufügen",
      dialogEditTitle:        "Karte bearbeiten",
      dialogDeleteTitle:      "Karte löschen",
      dialogSave:             "Speichern",
      dialogCancel:           "Abbrechen",
      dialogDelete:           "Löschen",
      dialogDeleteConfirm:    '"{title}" wirklich löschen?',
      dialogFieldTitle:       "Titel",
      dialogFieldDescription: "Beschreibung",
      dialogFieldAssignee:    "Zuständig",
      dialogFieldDueDate:     "Fälligkeitsdatum",
      dialogFieldStatus:      "Status",
      noCardsLabel:           "Keine Karten",
    },
    columns: [
      { id: "todo",        label: "Zu erledigen", color: "#9e9e9e" },
      { id: "in-progress", label: "In Arbeit",    color: "#2196f3" },
      { id: "review",      label: "In Prüfung",   color: "#ff9800" },
      { id: "done",        label: "Erledigt",      color: "#4caf50" },
    ],
  },
};
