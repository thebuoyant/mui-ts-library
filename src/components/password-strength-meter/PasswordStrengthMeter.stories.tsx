import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

const meta: Meta<typeof PasswordStrengthMeter> = {
  title: "Components/PasswordStrengthMeter",
  component: PasswordStrengthMeter,
};

export default meta;

type Story = StoryObj<typeof PasswordStrengthMeter>;

export const Default: Story = {
  args: {
    passwordMinLength: 8,
    showPasswordAdornment: true,
    showMeter: true,
    showSummary: true,
    inputSize: "small",
    translation: {
      label: "Password",
      summaryHeaderLabel: "Requirements for your password",
      summaryMinCharsLeft: "At least",
      summaryMinCharsRight: "characters",
      summaryCapitalLetter: "At least 1 capital letter",
      summaryLowerCaseLetter: "At least 1 lowercase letter",
      summaryNumber: "At least 1 number",
      summarySpecialChar: "At least 1 special character",
    },
    meterColors: {
      weak: "#cc0000",
      ok: "#fdc010",
      good: "#8bc34a",
      veryGood: "#43a047",
    },
    checkColors: {
      failure: "#cc0000",
      success: "#43a047",
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
  render: () => {
    const [password, setPassword] = useState("");

    return (
      <Box sx={{ maxWidth: 420, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="External password field"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="Dieses Feld steuert den PasswordStrengthMeter von außen."
        />
        <PasswordStrengthMeter
          value={password}
          showPasswordAdornment={false}
          inputSize="small"
          onPasswordChange={(_, result) => {
            console.log("Strength:", result.meterStatus);
          }}
        />
      </Box>
    );
  },
};
