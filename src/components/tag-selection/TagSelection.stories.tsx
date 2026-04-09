import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import JavascriptIcon from "@mui/icons-material/Javascript";
import CssIcon from "@mui/icons-material/Css";
import HtmlIcon from "@mui/icons-material/Html";
import DataObjectIcon from "@mui/icons-material/DataObject";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { TagSelection } from "./TagSelection";
import type { TagSelectionItem } from "./TagSelection.types";
import CloseIcon from "@mui/icons-material/Close";

const START_ICON_COLOR = "#ffffff";
const DELETE_ICON_COLOR = "#cccccc";

const sampleTags: TagSelectionItem[] = [
  {
    id: "javascript",
    label: "JavaScript",
    selected: true,
    startIcon: <JavascriptIcon style={{ color: START_ICON_COLOR }} />,
    deleteIcon: <CloseIcon style={{ color: DELETE_ICON_COLOR }} />,
    foregroundColor: "#ffffff",
    backgroundColor: "	#660000",
  },
  {
    id: "typescript",
    label: "TypeScript",
    selected: true,
    startIcon: <DataObjectIcon style={{ color: START_ICON_COLOR }} />,
    deleteIcon: <CloseIcon style={{ color: DELETE_ICON_COLOR }} />,
    foregroundColor: "#ffffff",
    backgroundColor: "#990000",
  },
  {
    id: "react",
    label: "React",
    startIcon: <CodeIcon style={{ color: START_ICON_COLOR }} />,
    deleteIcon: <CloseIcon style={{ color: DELETE_ICON_COLOR }} />,
    foregroundColor: "#ffffff",
    backgroundColor: "#002241",
  },
  {
    id: "mui",
    label: "MUI",
    startIcon: <SmartToyIcon style={{ color: START_ICON_COLOR }} />,
    deleteIcon: <CloseIcon style={{ color: DELETE_ICON_COLOR }} />,
    foregroundColor: "#ffffff",
    backgroundColor: "#7a5c8e",
  },
  {
    id: "css",
    label: "CSS",
    startIcon: <CssIcon />,
    deleteIcon: <CloseIcon />,
    foregroundColor: "#1565c0",
    backgroundColor: "#e3f2fd",
  },
  {
    id: "html",
    label: "HTML",
    startIcon: <HtmlIcon />,
    deleteIcon: <CloseIcon />,
    foregroundColor: "#1565c0",
    backgroundColor: "#e3f2fd",
  },
  {
    id: "python",
    label: "Python",
    startIcon: <CodeIcon />,
    deleteIcon: <CloseIcon />,
    foregroundColor: "#ffffff",
    backgroundColor: "#1976d2",
  },
  {
    id: "golang",
    label: "Golang",
    startIcon: <CodeIcon />,
    deleteIcon: <CloseIcon />,
    foregroundColor: "#1565c0",
    backgroundColor: "#e3f2fd",
  },
  {
    id: "jquery",
    label: "jQuery",
    disabled: true,
    startIcon: <CodeIcon />,
    deleteIcon: <CloseIcon />,
    foregroundColor: "#9e9e9e",
    backgroundColor: "#f5f5f5",
  },
  {
    id: "dotnet",
    label: ".Net",
    disabled: true,
    startIcon: <CodeIcon />,
    deleteIcon: <CloseIcon />,
    foregroundColor: "#9e9e9e",
    backgroundColor: "#f5f5f5",
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
    showSelectedTags: true,
    showSelectedTagsLabel: false,
    showAutoComplete: true,
    showDetails: true,
    showStartIcon: true,
    showDeleteIcon: true,
    translation: {
      selectedTagsLabel: "Selected tags",
      autoCompleteLabel: "Search and add tags",
      detailsLabel: "All tags",
      selectedGroupLabel: "Selected",
      availableGroupLabel: "Available",
      disabledGroupLabel: "Disabled",
      noSelectedTagsText: "No tags selected.",
      noAvailableTagsText: "No tags available.",
      placeholder: "Type to search...",
    },
  },
  render: (args) => (
    <Box sx={{ maxWidth: 700 }}>
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
        onDetailsToggle={(expanded) => {
          console.log("onDetailsToggle", expanded);
        }}
      />
    </Box>
  ),
};
