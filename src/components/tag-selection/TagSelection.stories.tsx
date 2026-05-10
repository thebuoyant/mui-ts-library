import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
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
};

export default meta;

type Story = StoryObj<typeof TagSelection>;

export const Default: Story = {
  args: {
    tags: sampleTags,
    inputSize: "small",
    chipSize: "small",
    showSelectedTags: true,
    showSelectedTagsLabel: true,
    showAutoComplete: true,
    showStartIcon: true,
    showDeleteIcon: true,
    translation: {
      selectedTagsLabel: "Selected tags",
      autoCompleteLabel: "Search and add tags",
      detailsLabel: "All tags",
      noSelectedTagsText: "No tags selected.",
      noAvailableTagsText: "No tags available.",
      placeholder: "Type to search...",
    },
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection
        {...args}
        onTagSelect={(tag, selectedTags, allTags) => {
          console.log("onTagSelect", tag, selectedTags, allTags);
        }}
        onTagDelete={(tag, selectedTags, allTags) => {
          console.log("onTagDelete", tag, selectedTags, allTags);
        }}
        onTagsChange={(selectedTags, allTags) => {
          console.log("onTagsChange", selectedTags, allTags);
        }}
        onSearchChange={(searchValue) => {
          console.log("onSearchChange", searchValue);
        }}
      />
    </Box>
  ),
};
