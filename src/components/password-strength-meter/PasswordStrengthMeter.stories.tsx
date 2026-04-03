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
    showPasswordAdornment: true,
    inputSize: "small",
    translation: {
      label: "Passwort eingeben",
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
