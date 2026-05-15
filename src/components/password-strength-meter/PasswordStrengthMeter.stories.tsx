import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

const meta: Meta<typeof PasswordStrengthMeter> = {
  title: "Components/PasswordStrengthMeter",
  component: PasswordStrengthMeter,
  args: {
    showPasswordAdornment: true,
    showMeter: true,
    showSummary: true,
    inputSize: "medium",
    passwordMinLength: 8,
    onPasswordChange: fn(),
  },
  argTypes: {
    showPasswordAdornment: { control: "boolean" },
    showMeter: { control: "boolean" },
    showSummary: { control: "boolean" },
    inputSize: { control: "radio", options: ["small", "medium"] },
    passwordMinLength: { control: "number" },
    // Controlled via render in the Controlled story — not directly editable.
    value: { control: false },
    // Complex objects — use dedicated stories instead.
    translation: { control: false },
    meterColors: { control: false },
    checkColors: { control: false },
    onPasswordChange: { control: false },
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
      summaryMinCharsLeft: "Mindestens",
      summaryMinCharsRight: "Zeichen",
      summaryCapitalLetter: "Mindestens 1 Großbuchstabe",
      summaryLowerCaseLetter: "Mindestens 1 Kleinbuchstabe",
      summaryNumber: "Mindestens 1 Zahl",
      summarySpecialChar: "Mindestens 1 Sonderzeichen",
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

// Zeigt den kontrollierten Modus: Das Passwort wird von außen verwaltet,
// z. B. wenn die Komponente in ein bestehendes Formular eingebettet wird.
export const Controlled: Story = {
  render: (args) => {
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
  },
};
