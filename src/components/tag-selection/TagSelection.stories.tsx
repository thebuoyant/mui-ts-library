import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box } from "@mui/material";
import { useState, type ComponentProps } from "react";
import { TagSelection } from "./TagSelection";
import type { TagSelectionItem } from "./TagSelection.types";

const sampleTags: TagSelectionItem[] = [
  { id: "javascript", label: "JavaScript", selected: true, color: "warning" },
  { id: "typescript", label: "TypeScript", selected: true, color: "info" },
  { id: "react",      label: "React",      color: "primary" },
  { id: "mui",        label: "MUI",        color: "secondary" },
  { id: "css",        label: "CSS",        color: "info" },
  { id: "html",       label: "HTML",       color: "error" },
  { id: "python",     label: "Python",     color: "success" },
  { id: "golang",     label: "Golang",     color: "primary" },
  { id: "jquery",     label: "jQuery",     disabled: true, color: "default" },
  { id: "dotnet",     label: ".Net",       disabled: true, color: "default" },
];

const meta: Meta<typeof TagSelection> = {
  title: "Components/TagSelection",
  component: TagSelection,
  args: {
    // A–Z
    allowCreate:          true,
    chipSize:             "small",
    disabled:             false,
    inputSize:            "medium",
    listboxMaxHeight:     300,
    loading:              false,
    maxTags:              10,
    maxVisibleChips:      10,
    popoverPlacement:     "bottom",
    showAutoComplete:     true,
    showSelectedTags:     true,
    showSelectedTagsLabel: true,
    tags:                 sampleTags,
    // Callbacks
    onSearchChange: fn(),
    onTagCreate:    fn(),
    onTagDelete:    fn(),
    onTagSelect:    fn(),
    onTagsChange:   fn(),
  },
  argTypes: {
    // A–Z
    allowCreate:          { control: "boolean" },
    chipSize:             { control: "radio", options: ["small", "medium"] },
    disabled:             { control: "boolean" },
    inputSize:            { control: "radio", options: ["small", "medium"] },
    listboxMaxHeight:     { control: "number" },
    loading:              { control: "boolean" },
    maxTags:              { control: "number" },
    maxVisibleChips:      { control: "number" },
    popoverPlacement:     { control: "radio", options: ["top", "bottom"] },
    showAutoComplete:     { control: "boolean" },
    showSelectedTags:     { control: "boolean" },
    showSelectedTagsLabel: { control: "boolean" },
    // Komplexe Objekte — stattdessen dedizierte Stories verwenden.
    tags:        { control: false },
    translation: { control: false },
    // Callbacks
    onSearchChange: { control: false },
    onTagCreate:    { control: false },
    onTagDelete:    { control: false },
    onTagSelect:    { control: false },
    onTagsChange:   { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof TagSelection>;

export const Default: Story = {
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

export const SmallInput: Story = {
  args: {
    inputSize: "small",
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

export const NoSelectedTags: Story = {
  args: {
    showSelectedTags: false,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

export const NoAutoComplete: Story = {
  args: {
    showAutoComplete: false,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

export const GermanTranslation: Story = {
  args: {
    translation: {
      selectedTagsLabel: "Ausgewählte Tags",
      autoCompleteLabel: "Tags suchen und hinzufügen",
      noSelectedTagsText: "Keine Tags ausgewählt.",
      noAvailableTagsText: "Keine Tags verfügbar.",
      placeholder: "Suchen...",
      loadingText: "Laden...",
      maxTagsReachedText: "Maximale Anzahl an Tags erreicht.",
    },
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

const customColorTags: TagSelectionItem[] = [
  { id: "brand-primary",   label: "Branding Primär",   selected: true, foregroundColor: "#ffffff", backgroundColor: "#6200ea" },
  { id: "brand-secondary", label: "Branding Sekundär", selected: true, foregroundColor: "#ffffff", backgroundColor: "#00897b" },
  { id: "highlight",       label: "Highlight",                         foregroundColor: "#1a1a1a", backgroundColor: "#ffea00" },
  { id: "accent",          label: "Akzent",                            foregroundColor: "#ffffff", backgroundColor: "#e64a19" },
];

export const CustomColors: Story = {
  args: {
    tags: customColorTags,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

// Simuliert den Zustand während ein API-Call läuft: keine Tags vorhanden,
// Autocomplete zeigt einen Lade-Spinner wenn das Dropdown geöffnet wird.
export const Loading: Story = {
  args: {
    tags: [],
    loading: true,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

export const MaxTags: Story = {
  args: {
    maxTags: 2,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

function CreatableStory(args: ComponentProps<typeof TagSelection>) {
  const [localTags, setLocalTags] = useState(sampleTags);

  return (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection
        {...args}
        tags={localTags}
        onTagCreate={(label, color) => {
          args.onTagCreate?.(label, color);
          setLocalTags((prev) => [
            ...prev,
            { id: label.toLowerCase().replace(/\s+/g, "-"), label, color, selected: true },
          ]);
        }}
      />
    </Box>
  );
}

// Neue Tags können durch freie Texteingabe erstellt werden. onTagCreate gibt
// Label und Farbe zurück — der aufrufende Code fügt den Tag in seine tags-Liste
// ein (hier per lokalem State demonstriert). Der neue Tag muss selected: true haben.
export const Creatable: Story = {
  render: (args) => <CreatableStory {...args} />,
};

// maxVisibleChips begrenzt die sichtbaren Chips. Überzählige Chips werden hinter
// einem "+N"-Chip versteckt, der einen Popover öffnet. popoverPlacement steuert
// die Öffnungsrichtung.
export const OverflowChips: Story = {
  args: {
    maxVisibleChips: 3,
    popoverPlacement: "bottom",
    tags: sampleTags.map((t) => ({ ...t, selected: true })),
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};
