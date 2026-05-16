import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box, TextField, Typography } from "@mui/material";
import { useState, type ComponentProps } from "react";
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
    disabled: false,
    error: false,
    onPasswordChange: fn(),
  },
  argTypes: {
    showPasswordAdornment: { control: "boolean" },
    showMeter: { control: "boolean" },
    showSummary: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    helperText: { control: "text" },
    inputSize: { control: "radio", options: ["small", "medium"] },
    passwordMinLength: { control: "number" },
    // Wird über render in der Controlled-Story gesteuert — nicht direkt editierbar.
    value: { control: false },
    // Form-Integration-Props — über dedizierte Stories oder per render übergeben.
    name: { control: false },
    inputRef: { control: false },
    autoComplete: { control: false },
    // Komplexe Objekte — stattdessen dedizierte Stories verwenden.
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
