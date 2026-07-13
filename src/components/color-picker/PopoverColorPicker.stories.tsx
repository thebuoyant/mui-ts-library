import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useState, type ComponentProps } from "react";
import { PopoverColorPicker } from "./PopoverColorPicker";

const meta: Meta<typeof PopoverColorPicker> = {
  title: "Components/PopoverColorPicker",
  component: PopoverColorPicker,
  args: {
    colorGradientSize:  "medium",
    disabled:           false,
    inputSize:          "medium",
    showAlpha:          true,
    showEyeDropper:     true,
    showInputSection:   true,
    showSliderSection:  true,
    swatchShape:        "square",
    swatchSize:         28,
    width:              280,
    onChange:           fn(),
    onChangeCommitted:  fn(),
  },
  argTypes: {
    // PopoverColorPicker-specific
    swatchShape:        { control: "radio", options: ["square", "circle"] },
    swatchSize:         { control: "number" },
    // ColorPicker pass-through
    colorGradientSize:  { control: "radio", options: ["small", "medium"] },
    defaultFormat:      { control: false },
    disabled:           { control: "boolean" },
    format:             { control: false },
    inputSize:          { control: "radio", options: ["small", "medium"] },
    name:               { control: false },
    savedColors:        { control: false },
    showAlpha:          { control: "boolean" },
    showEyeDropper:     { control: "boolean" },
    showInputSection:   { control: "boolean" },
    showSliderSection:  { control: "boolean" },
    translation:        { control: false },
    value:              { control: false },
    width:              { control: "number" },
    // Callbacks
    onChange:           { control: false },
    onChangeCommitted:  { control: false },
    onFormatChange:     { control: false },
  },
  parameters: {
    controls: { sort: "alpha" },
  },
};

export default meta;

type Story = StoryObj<typeof PopoverColorPicker>;

function Controlled(
  args: ComponentProps<typeof PopoverColorPicker> & { initialValue?: string },
) {
  const [value, setValue] = useState(args.initialValue ?? "#1976d2");
  return (
    <PopoverColorPicker
      {...args}
      value={value}
      onChange={(hex, info) => {
        args.onChange?.(hex, info);
        setValue(hex);
      }}
      onChangeCommitted={(hex, info) => {
        args.onChangeCommitted?.(hex, info);
      }}
    />
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**`PopoverColorPicker`** — a convenience wrapper that combines a colored swatch trigger button with ' +
          'a popover containing the full `ColorPicker`. No `Popover`, `anchorEl`, or open/close state needed — ' +
          'just `value` + `onChange`. All `ColorPicker` props pass through directly.',
      },
    },
  },
  render: (args) => <Controlled {...args} />,
};

export const CircleSwatch: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`swatchShape="circle"` renders the trigger as a circle — typical for color swatches in toolbars ' +
          'and design tools. Combine with `swatchSize` to match your icon grid.',
      },
    },
  },
  args: { swatchShape: "circle", swatchSize: 32 },
  render: (args) => <Controlled {...args} initialValue="#f57c00" />,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`disabled={true}` prevents opening the popover and mutes the swatch button visually.',
      },
    },
  },
  args: { disabled: true },
  render: (args) => <Controlled {...args} initialValue="#9c27b0" />,
};

export const WithSavedColors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'All `ColorPicker` props pass through — here `savedColors` adds a swatch palette inside the popover.',
      },
    },
  },
  args: {
    savedColors: [
      "#f44336", "#e91e63", "#9c27b0", "#3f51b5",
      "#2196f3", "#4caf50", "#ff9800", "#795548",
    ],
  },
  render: (args) => <Controlled {...args} />,
};

// ── Real-world showcase: multi-picker live theming ────────────────────────────

function LiveThemingStory() {
  const [bg,     setBg]     = useState("#1976d2");
  const [text,   setText]   = useState("#ffffff");
  const [accent, setAccent] = useState("#f57c00");

  return (
    <Stack spacing={3} sx={{ maxWidth: 480 }}>
      <Typography variant="body2" color="text.secondary">
        Click any swatch to open the picker. The swatch and preview update live while you drag.
      </Typography>

      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <PopoverColorPicker value={bg}     onChange={setBg}     />
        <Typography variant="body2">Background color</Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <PopoverColorPicker value={text}   onChange={setText}   />
        <Typography variant="body2">Text color</Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <PopoverColorPicker value={accent} onChange={setAccent} swatchShape="circle" swatchSize={32} />
        <Typography variant="body2">Accent color (circle, size 32)</Typography>
      </Stack>

      <Divider />

      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: bg,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="subtitle1" sx={{ color: text, fontWeight: 600 }}>
          Live preview
        </Typography>
        <Typography variant="body2" sx={{ color: text, mt: 0.5 }}>
          Adjust the colors above to see this box update in real time.
        </Typography>
        <Box
          sx={{
            mt: 1.5,
            display: "inline-block",
            px: 2,
            py: 0.5,
            borderRadius: 1,
            backgroundColor: accent,
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Accent button
        </Box>
      </Box>
    </Stack>
  );
}

export const LiveTheming: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Real-world use case: multi-picker live theming.** Each swatch controls one color role — ' +
          'background, text, accent — and the preview box updates immediately. ' +
          'This is the typical pattern for theme customizers or settings pages.',
      },
    },
    controls: { disable: true },
  },
  render: () => <LiveThemingStory />,
};
