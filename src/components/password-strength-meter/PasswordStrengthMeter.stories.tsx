import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box, TextField, Typography } from "@mui/material";
import { useState, type ComponentProps } from "react";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

const meta: Meta<typeof PasswordStrengthMeter> = {
  title: "Components/PasswordStrengthMeter",
  component: PasswordStrengthMeter,
  args: {
    // A–Z
    disabled:              false,
    error:                 false,
    inputSize:             "medium",
    passwordMinLength:     8,
    showMeter:             true,
    showPasswordAdornment: true,
    showSegmentedBar:      false,
    showSummary:           true,
    // Callback
    onPasswordChange: fn(),
  },
  argTypes: {
    // A–Z: kontrollierbare Props
    disabled:              { control: "boolean" },
    error:                 { control: "boolean" },
    helperText:            { control: "text" },
    inputSize:             { control: "radio", options: ["small", "medium"] },
    passwordMinLength:     { control: "number" },
    showMeter:             { control: "boolean" },
    showPasswordAdornment: { control: "boolean" },
    showSegmentedBar:      { control: "boolean" },
    showSummary:           { control: "boolean" },
    // Komplexe Objekte / Form-Props — dedizierte Stories oder render verwenden
    autoComplete:         { control: false },
    checkColors:          { control: false },
    customRequirements:   { control: false },
    inputRef:             { control: false },
    meterColors:          { control: false },
    name:                 { control: false },
    translation:          { control: false },
    value:                { control: false },
    onPasswordChange:     { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof PasswordStrengthMeter>;

export const Default: Story = {
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const SmallInput: Story = {
  args: {
    inputSize: "small",
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const NoMeter: Story = {
  args: {
    showMeter: false,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const NoSummary: Story = {
  args: {
    showSummary: false,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const NoAdornment: Story = {
  args: {
    showPasswordAdornment: false,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const GermanTranslation: Story = {
  args: {
    translation: {
      label: "Passwort",
      summaryHeaderLabel: "Anforderungen an Ihr Passwort",
      summaryMinChars: "Mindestens {n} Zeichen",
      summaryCapitalLetter: "Mindestens 1 Großbuchstabe",
      summaryLowerCaseLetter: "Mindestens 1 Kleinbuchstabe",
      summaryNumber: "Mindestens 1 Zahl",
      summarySpecialChar: "Mindestens 1 Sonderzeichen",
      showPasswordLabel: "Passwort anzeigen",
      hidePasswordLabel: "Passwort verbergen",
      meterAriaLabel: "Passwortstärke",
    },
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const CustomColors: Story = {
  args: {
    meterColors: {
      weak: "#e91e63",
      ok: "#ff9800",
      good: "#2196f3",
      veryGood: "#9c27b0",
    },
    checkColors: {
      failure: "#e91e63",
      success: "#9c27b0",
    },
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const WithError: Story = {
  args: {
    error: true,
    helperText: "Password does not meet the requirements.",
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

function ControlledStory(args: ComponentProps<typeof PasswordStrengthMeter>) {
  const [password, setPassword] = useState("");

  return (
    <Box sx={{ maxWidth: 420, display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="External password field"
        size="small"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        helperText="This field drives the PasswordStrengthMeter from outside."
      />
      <PasswordStrengthMeter
        {...args}
        value={password}
        showPasswordAdornment={false}
        onPasswordChange={(_, result) => {
          args.onPasswordChange?.(_, result);
        }}
      />
      <Typography variant="caption" color="text.secondary">
        Current value: "{password}"
      </Typography>
    </Box>
  );
}

// Zeigt den kontrollierten Modus: Das Passwort wird von außen verwaltet,
// z. B. wenn die Komponente in ein bestehendes Formular eingebettet wird.
export const Controlled: Story = {
  render: (args) => <ControlledStory {...args} />,
};

export const SegmentedBar: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showSegmentedBar` replaces the single growing strength bar with **4 individually animated segments**. ' +
          'Each segment lights up as the password strength increases. ' +
          'The pre-filled password already shows 3 active segments — try changing it to see the segments animate.',
      },
    },
  },
  args: {
    // Pre-filled so the segmented bar effect is immediately visible without typing.
    value:           "MyP@ssw0rd",
    showSegmentedBar: true,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const WithCustomRequirements: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`customRequirements` adds your own password rules below the built-in 5. ' +
          'Each entry has a `label` and a `fulfilled` value — either a static `boolean` or a **live function** ' +
          '`(password: string) => boolean` that is re-evaluated on every keystroke. ' +
          'The pre-filled password intentionally violates the "no spaces" rule so you can see both ✅ and ❌ states. ' +
          'Try removing the space to watch both custom requirements turn green.',
      },
    },
  },
  args: {
    // "hello world" → "No spaces allowed" ❌, "Must start with a letter" ✅ — shows mixed state immediately.
    value: "hello world",
    customRequirements: [
      { label: "No spaces allowed",        fulfilled: (pw) => !pw.includes(" ") },
      { label: "Must start with a letter", fulfilled: (pw) => /^[a-zA-Z]/.test(pw) },
    ],
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};
