import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

const meta: Meta<typeof PasswordStrengthMeter> = {
  title: "Components/PasswordStrengthMeter",
  component: PasswordStrengthMeter,
  argTypes: {},
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
      summaryMinCharsLeft: "At least ",
      summaryMinCharsRight: "characters",
      summaryCapitalLetter: "At least 1 capital letter",
      summaryLowerCaseLetter: "At least 1 lowercase letter",
      summaryNumber: "At least 1 number",
      summarySpecialChar: "At least 1 special Character",
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
  render: (args) => {
    return (
      <Box sx={{ maxWidth: 420 }}>
        <PasswordStrengthMeter {...args} />
      </Box>
    );
  },
};
