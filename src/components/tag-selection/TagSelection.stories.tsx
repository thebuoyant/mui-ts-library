import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box } from "@mui/material";
import { useState, type ComponentProps } from "react";
import CodeIcon from "@mui/icons-material/Code";
import JavascriptIcon from "@mui/icons-material/Javascript";
import CssIcon from "@mui/icons-material/Css";
import HtmlIcon from "@mui/icons-material/Html";
import DataObjectIcon from "@mui/icons-material/DataObject";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";
import { TagSelection } from "./TagSelection";
import type { TagSelectionItem } from "./TagSelection.types";

const sampleTags: TagSelectionItem[] = [
  {
    id: "javascript",
    label: "JavaScript",
    selected: true,
    color: "warning",
    startIcon: <JavascriptIcon />,
    deleteIcon: <CloseIcon />,
  },
  {
    id: "typescript",
    label: "TypeScript",
    selected: true,
    color: "info",
    startIcon: <DataObjectIcon />,
    deleteIcon: <CloseIcon />,
  },
  {
    id: "react",
    label: "React",
    color: "primary",
    startIcon: <CodeIcon />,
    deleteIcon: <CloseIcon />,
  },
  {
    id: "mui",
    label: "MUI",
    color: "secondary",
    startIcon: <SmartToyIcon />,
    deleteIcon: <CloseIcon />,
  },
  {
    id: "css",
    label: "CSS",
    color: "info",
    startIcon: <CssIcon />,
    deleteIcon: <CloseIcon />,
  },
  {
    id: "html",
    label: "HTML",
    color: "error",
    startIcon: <HtmlIcon />,
    deleteIcon: <CloseIcon />,
  },
  {
    id: "python",
    label: "Python",
    color: "success",
    startIcon: <CodeIcon />,
    deleteIcon: <CloseIcon />,
  },
  {
    id: "golang",
    label: "Golang",
    color: "primary",
    startIcon: <CodeIcon />,
    deleteIcon: <CloseIcon />,
  },
  {
    id: "jquery",
    label: "jQuery",
    disabled: true,
    color: "default",
    startIcon: <CodeIcon />,
    deleteIcon: <CloseIcon />,
  },
  {
    id: "dotnet",
    label: ".Net",
    disabled: true,
    color: "default",
    startIcon: <CodeIcon />,
    deleteIcon: <CloseIcon />,
  },
];

const meta: Meta<typeof TagSelection> = {
  title: "Components/TagSelection",
  component: TagSelection,
  args: {
    tags: sampleTags,
    showSelectedTags: true,
    showSelectedTagsLabel: true,
    showAutoComplete: true,
    showStartIcon: true,
    showDeleteIcon: true,
    inputSize: "medium",
    chipSize: "medium",
    disabled: false,
    loading: false,
    allowCreate: false,
    onTagSelect: fn(),
    onTagDelete: fn(),
    onTagsChange: fn(),
    onSearchChange: fn(),
    onTagCreate: fn(),
  },
  argTypes: {
    showSelectedTags: { control: "boolean" },
    showSelectedTagsLabel: { control: "boolean" },
    showAutoComplete: { control: "boolean" },
    showStartIcon: { control: "boolean" },
    showDeleteIcon: { control: "boolean" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    allowCreate: { control: "boolean" },
    inputSize: { control: "radio", options: ["small", "medium"] },
    chipSize: { control: "radio", options: ["small", "medium"] },
    maxTags: { control: "number" },
    // Komplexe Objekte — stattdessen dedizierte Stories verwenden.
    tags: { control: false },
    translation: { control: false },
    onTagSelect: { control: false },
    onTagDelete: { control: false },
    onTagsChange: { control: false },
    onSearchChange: { control: false },
    onTagCreate: { control: false },
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
    chipSize: "small",
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

export const NoStartIcons: Story = {
  args: {
    showStartIcon: false,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

export const NoDeleteIcons: Story = {
  args: {
    showDeleteIcon: false,
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
    },
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

const customColorTags: TagSelectionItem[] = [
  {
    id: "brand-primary",
    label: "Branding Primär",
    selected: true,
    foregroundColor: "#ffffff",
    backgroundColor: "#6200ea",
    deleteIcon: <CloseIcon />,
  },
  {
    id: "brand-secondary",
    label: "Branding Sekundär",
    selected: true,
    foregroundColor: "#ffffff",
    backgroundColor: "#00897b",
    deleteIcon: <CloseIcon />,
  },
  {
    id: "highlight",
    label: "Highlight",
    foregroundColor: "#1a1a1a",
    backgroundColor: "#ffea00",
    deleteIcon: <CloseIcon />,
  },
  {
    id: "accent",
    label: "Akzent",
    foregroundColor: "#ffffff",
    backgroundColor: "#e64a19",
    deleteIcon: <CloseIcon />,
  },
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

export const Loading: Story = {
  args: {
    // Leere Tags simulieren den Zustand während ein API-Call läuft.
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
        onTagCreate={(label) => {
          args.onTagCreate?.(label);
          setLocalTags((prev) => [
            ...prev,
            { id: label.toLowerCase().replace(/\s+/g, "-"), label },
          ]);
        }}
      />
    </Box>
  );
}

// Zeigt den Create-Modus: neue Tags können durch freie Texteingabe erstellt werden.
// onTagCreate gibt den Label-Text zurück — der aufrufende Code ist dafür zuständig,
// den neuen Tag in die tags-Liste einzufügen (hier per lokalem State demonstriert).
export const Creatable: Story = {
  args: {
    allowCreate: true,
  },
  render: (args) => <CreatableStory {...args} />,
};
