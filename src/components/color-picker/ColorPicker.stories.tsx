import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box, Paper, Typography } from "@mui/material";
import { useState, type ComponentProps } from "react";
import { ColorPicker } from "./ColorPicker";
import type { ColorPickerColorInfo } from "./ColorPicker.types";

const meta: Meta<typeof ColorPicker> = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  args: {
    // A–Z
    colorGradientSize:  "medium",
    disabled:           false,
    defaultFormat:      "hex",
    inputSize:          "medium",
    showAlpha:          true,
    showEyeDropper:     true,
    showInputSection:   true,
    showSliderSection:  true,
    width:              280,
    // Callbacks
    onChange:           fn(),
  },
  argTypes: {
    // A–Z
    colorGradientSize:  { control: "radio", options: ["small", "medium"] },
    defaultFormat:      { control: "radio", options: ["hex", "rgb", "hsl"] },
    disabled:           { control: "boolean" },
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
    // Callbacks A–Z
    onChange:           { control: false },
    onChangeCommitted:  { control: false },
    onFormatChange:     { control: false },
  },
  parameters: {
    controls: { sort: 'alpha' },
  },
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

// Storybook's args don't support live two-way binding, so every story wraps ColorPicker
// in local state — exactly the pattern a real consumer uses for this controlled component.
function ControlledColorPicker(
  args: ComponentProps<typeof ColorPicker> & { initialValue?: string },
) {
  const [value, setValue] = useState(args.initialValue ?? "#1976d2");
  return (
    <ColorPicker
      {...args}
      value={value}
      onChange={(hex, info) => {
        args.onChange?.(hex, info);
        setValue(hex);
      }}
    />
  );
}

export const Default: Story = {
  render: (args) => <ControlledColorPicker {...args} />,
};

export const WithoutAlpha: Story = {
  parameters: {
    docs: {
      description: {
        story: '`showAlpha={false}` hides the alpha slider and the opacity field — only RGB/hue is adjustable.',
      },
    },
  },
  args: { showAlpha: false },
  render: (args) => <ControlledColorPicker {...args} />,
};

export const SmallSize: Story = {
  args: { colorGradientSize: "small", width: 240 },
  render: (args) => <ControlledColorPicker {...args} />,
};

export const SmallInputSize: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`inputSize` controls the format dropdown and value/alpha fields independently of `size` ' +
          '(which scales the gradient area, sliders, and swatches) — useful for matching a denser form layout ' +
          'without shrinking the picker itself.',
      },
    },
  },
  args: { inputSize: "small" },
  render: (args) => <ControlledColorPicker {...args} />,
};

export const SlidersOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: '`showInputSection={false}` hides the format dropdown and value/alpha fields — gradient area and sliders only.',
      },
    },
  },
  args: { showInputSection: false },
  render: (args) => <ControlledColorPicker {...args} />,
};

export const InputsOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showSliderSection={false}` hides the eyedropper and the hue/alpha sliders — a compact picker driven ' +
          'entirely by the gradient area plus typed values.',
      },
    },
  },
  args: { showSliderSection: false },
  render: (args) => <ControlledColorPicker {...args} />,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '`disabled={true}` mutes all interactions (drag, typing, swatch clicks) and reduces opacity.',
      },
    },
  },
  args: { disabled: true },
  render: (args) => <ControlledColorPicker {...args} initialValue="#9c27b0" />,
};

export const RgbFormat: Story = {
  args: { defaultFormat: "rgb" },
  render: (args) => <ControlledColorPicker {...args} />,
};

export const HslFormat: Story = {
  args: { defaultFormat: "hsl" },
  render: (args) => <ControlledColorPicker {...args} />,
};

export const WithSavedColors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`savedColors` renders a click-to-select swatch grid below the picker — a purely display/select prop, ' +
          'the caller owns persisting the list (e.g. recently used or brand colors).',
      },
    },
  },
  args: {
    savedColors: [
      "#f44336", "#e91e63", "#9c27b0", "#673ab7",
      "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4",
      "#4caf50", "#ffeb3b", "#ff9800", "#795548",
      "#000000", "#ffffff80",
    ],
  },
  render: (args) => <ControlledColorPicker {...args} />,
};

export const FormIntegration: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`name` renders a hidden `<input>` carrying the current hex value, so the picker participates in ' +
          'native form submission, React Hook Form, or Formik without extra wiring.',
      },
    },
  },
  args: { name: "brandColor" },
  render: (args) => <ControlledColorPicker {...args} />,
};

function ChangeCommittedStory(args: ComponentProps<typeof ColorPicker>) {
  const [value, setValue] = useState("#1976d2");
  const [liveCount, setLiveCount] = useState(0);
  const [committedCount, setCommittedCount] = useState(0);
  const [lastCommitted, setLastCommitted] = useState("#1976d2");

  return (
    <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
      <ColorPicker
        {...args}
        value={value}
        onChange={(hex) => { setValue(hex); setLiveCount((n) => n + 1); }}
        onChangeCommitted={(hex) => { setCommittedCount((n) => n + 1); setLastCommitted(hex); }}
      />
      <Paper variant="outlined" sx={{ p: 2, width: 200 }}>
        <Typography variant="caption" sx={{ display: "block", color: "text.secondary" }}>
          onChange calls (every drag frame / keystroke)
        </Typography>
        <Typography variant="h6">{liveCount}</Typography>
        <Typography variant="caption" sx={{ display: "block", color: "text.secondary", mt: 1.5 }}>
          onChangeCommitted calls (per gesture — drag release, blur, swatch/eyedropper pick)
        </Typography>
        <Typography variant="h6">{committedCount}</Typography>
        <Typography variant="caption" sx={{ display: "block", color: "text.secondary", mt: 1.5 }}>
          Last committed: {lastCommitted}
        </Typography>
      </Paper>
    </Box>
  );
}

export const WithChangeCommitted: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`onChangeCommitted` fires once per "gesture" (drag release, field blur, swatch/eyedropper pick) — ' +
          'compare the two counters while dragging the gradient area: `onChange` climbs on every frame, ' +
          '`onChangeCommitted` only increments once you release. Use it instead of debouncing `onChange` ' +
          'yourself for expensive side effects like persisting to a backend — same dual-callback pattern as ' +
          "MUI's own `Slider` (`onChange` / `onChangeCommitted`).",
      },
    },
  },
  render: (args) => <ChangeCommittedStory {...args} />,
};

export const GermanTranslation: Story = {
  args: {
    translation: {
      formatLabel: "Farbformat",
      hexFieldLabel: "Hex-Wert",
      redLabel: "Rot",
      greenLabel: "Grün",
      blueLabel: "Blau",
      hueFieldLabel: "Farbton",
      saturationFieldLabel: "Sättigung",
      lightnessFieldLabel: "Helligkeit",
      alphaFieldLabel: "Deckkraft",
      eyeDropperLabel: "Farbe vom Bildschirm aufnehmen",
      savedColorsLabel: "Gespeicherte Farben",
      gradientAreaLabel: "Sättigung und Helligkeit",
      hueSliderLabel: "Farbton",
    },
    savedColors: ["#1976d2", "#388e3c", "#d32f2f"],
  },
  render: (args) => <ControlledColorPicker {...args} />,
};

// ── Real-world use case: a live brand-color theming preview ──────────────────

function BrandColorThemeStory(args: ComponentProps<typeof ColorPicker>) {
  const [color, setColor] = useState("#1976d2");
  const [info, setInfo] = useState<ColorPickerColorInfo | null>(null);

  return (
    <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
      <ColorPicker
        {...args}
        value={color}
        onChange={(hex, nextInfo) => { setColor(hex); setInfo(nextInfo); }}
        savedColors={["#1976d2", "#388e3c", "#d32f2f", "#f57c00", "#7b1fa2"]}
      />
      <Paper variant="outlined" sx={{ p: 2, width: 220 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Live preview</Typography>
        <Box
          sx={{
            height: 80,
            borderRadius: 1,
            backgroundColor: color,
            border: "1px solid",
            borderColor: "divider",
            mb: 1.5,
          }}
        />
        <Typography variant="caption" sx={{ display: "block", color: "text.secondary" }}>
          {info && `rgb(${info.rgb.r}, ${info.rgb.g}, ${info.rgb.b})`}
        </Typography>
        <Typography variant="caption" sx={{ display: "block", color: "text.secondary" }}>
          {color}
        </Typography>
      </Paper>
    </Box>
  );
}

export const BrandColorTheming: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Real-world use case: picking a brand/accent color for live theming.** ' +
          'The preview panel updates immediately as you drag, type, or pick a saved swatch — exactly the kind ' +
          'of "pick a color, see it applied instantly" flow a theme customizer or design-system playground needs.',
      },
    },
  },
  render: (args) => <BrandColorThemeStory {...args} />,
};
