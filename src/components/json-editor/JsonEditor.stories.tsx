import { type ComponentProps, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box } from "@mui/material";
import { JsonEditor } from "./JsonEditor";

const meta: Meta<typeof JsonEditor> = {
  title: "Components/JsonEditor",
  component: JsonEditor,
  argTypes: {
    // A–Z: kontrollierbare Props
    disabled:        { control: "boolean" },
    error:           { control: "boolean" },
    height:          { control: "text" },
    helperText:      { control: "text" },
    indent:          { control: "number" },
    name:            { control: "text" },
    placeholder:     { control: "text" },
    readonly:        { control: "boolean" },
    showLineColumn:  { control: "boolean" },
    showLineNumbers: { control: "boolean" },
    showMinimap:     { control: "boolean" },
    showValidation:  { control: "boolean" },
    width:           { control: "text" },
    // Komplexe Objekte / Callbacks — dedizierte Stories verwenden
    highlightColors: { control: false },
    toolbarConfig:   { control: false },
    translation:     { control: false },
    value:           { control: false },
    onBlur:          { control: false },
    onChange:        { control: false },
    onFocus:         { control: false },
    onValidChange:   { control: false },
  },
  args: {
    // A–Z
    disabled:        false,
    error:           false,
    height:          "",
    helperText:      "",
    indent:          2,
    name:            "",
    placeholder:     "Enter JSON …",
    readonly:        false,
    showLineColumn:  true,
    showLineNumbers: true,
    showMinimap:     false,
    showValidation:  false,
    width:           "",
    // Callbacks
    onBlur:          fn(),
    onChange:        fn(),
    onFocus:         fn(),
    onValidChange:   fn(),
  },
  parameters: {
    controls: { sort: 'alpha' },
  },
};

export default meta;
type Story = StoryObj<typeof JsonEditor>;

const SAMPLE_JSON = JSON.stringify(
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    active: true,
    score: 98.5,
    tags: ["admin", "editor"],
    address: {
      street: "123 Main St",
      city: "Springfield",
      zip: "12345",
    },
    metadata: null,
  },
  null,
  2,
);

const LARGE_JSON = JSON.stringify(
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    active: i % 2 === 0,
    role: i % 3 === 0 ? "admin" : "viewer",
    createdAt: "2024-01-15T10:30:00Z",
  })),
  null,
  2,
);

const INVALID_JSON = `{
  "name": "Alice",
  "age": 30,
  "active": true,
  missing_quotes: "oops"
}`;

const COMPACT_JSON = `{"id":1,"name":"Alice","email":"alice@example.com","active":true,"score":98.5,"tags":["admin","editor"]}`;

export const Default: Story = {
  args: {
    placeholder: "Enter JSON …",
  },
};

export const WithJson: Story = {
  args: {
    value: SAMPLE_JSON,
  },
};

export const WithValidation: Story = {
  args: {
    value:          SAMPLE_JSON,
    showValidation: true,
  },
};

export const InvalidJson: Story = {
  args: {
    value:          INVALID_JSON,
    showValidation: true,
  },
};

export const CompactJson: Story = {
  args: {
    value: COMPACT_JSON,
  },
};

export const WithFixedHeight: Story = {
  args: {
    value:  LARGE_JSON,
    height: "200",
  },
};

export const WithAutoHeight: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ height: 500, display: "flex", flexDirection: "column", border: "2px dashed", borderColor: "divider", p: 1 }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    value:  SAMPLE_JSON,
    height: "auto",
  },
};

function ControlledStory(args: ComponentProps<typeof JsonEditor>) {
  const [json, setJson] = useState(SAMPLE_JSON);
  return (
    <JsonEditor
      {...args}
      value={json}
      onChange={(val) => {
        setJson(val);
        args.onChange?.(val);
      }}
    />
  );
}

export const Controlled: Story = {
  render: (args) => <ControlledStory {...args} />,
  args: {
    showValidation: true,
  },
};

export const IndentFour: Story = {
  args: {
    value:  SAMPLE_JSON,
    indent: 4,
  },
};

export const ReadOnly: Story = {
  args: {
    value:    SAMPLE_JSON,
    readonly: true,
  },
};

export const Disabled: Story = {
  args: {
    value:    SAMPLE_JSON,
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    error:      true,
    helperText: "Invalid JSON provided.",
    value:      INVALID_JSON,
  },
};

export const NoLineNumbers: Story = {
  args: {
    value:           SAMPLE_JSON,
    showLineNumbers: false,
    showLineColumn:  false,
  },
};

export const CustomHighlightColors: Story = {
  args: {
    value: SAMPLE_JSON,
    highlightColors: {
      propertyName: "#c678dd",
      string:       "#98c379",
      number:       "#d19a66",
      boolean:      "#56b6c2",
      null:         "#abb2bf",
    },
  },
};

export const GermanTranslation: Story = {
  args: {
    value:          SAMPLE_JSON,
    showValidation: true,
    translation: {
      format:      "JSON formatieren",
      compact:     "JSON komprimieren",
      copy:        "Kopieren",
      copySuccess: "Kopiert!",
      clear:       "Leeren",
      undo:        "Rückgängig",
      redo:        "Wiederholen",
      lineColumn:  "Zeile {line}, Sp. {col}",
      validJson:   "Gültiges JSON",
      invalidJson: "Ungültiges JSON",
    },
  },
};

export const LargeDataset: Story = {
  args: {
    value:  LARGE_JSON,
    height: "500",
  },
};

export const WithMinimap: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showMinimap` adds a **vertical minimap panel** (80 px wide) on the right side of the editor. ' +
          'The minimap renders a condensed overview of the entire document and lets you **click or drag** to jump ' +
          'to any position instantly — especially useful for large JSON files with hundreds of lines. ' +
          'Powered by `@replit/codemirror-minimap` (MIT). Try scrolling inside the minimap.',
      },
    },
  },
  args: {
    value:       LARGE_JSON,
    height:      "500",
    showMinimap: true,
  },
};
