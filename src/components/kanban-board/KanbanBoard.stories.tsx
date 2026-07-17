import type { ComponentProps } from "react";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box, Typography } from "@mui/material";
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
    showAssignee:         true,
    showDueDate:          true,
    chipVariant:          "outlined",
    height:               500,
    onTasksChange:        fn(),
    onTaskCreated:        fn(),
    onTaskUpdated:        fn(),
    onTaskDeleted:        fn(),
    onTaskMoved:          fn(),
    onCardClick:          fn(),
  },
  argTypes: {
    enableBuiltinDialogs: { control: "boolean" },
    showAssignee:         { control: "boolean" },
    showDueDate:          { control: "boolean" },
    chipVariant:          { control: "radio", options: ["outlined", "filled"] },
    height:               { control: "number" },
    // Complex objects — use dedicated stories instead.
    columns:              { control: false },
    tasks:                { control: false },
    translation:          { control: false },
    // Callbacks
    onTasksChange:        { control: false },
    onTaskCreated:        { control: false },
    onTaskUpdated:        { control: false },
    onTaskDeleted:        { control: false },
    onTaskMoved:          { control: false },
    onCardClick:          { control: false },
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
