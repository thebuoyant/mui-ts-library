import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

const meta: Meta<typeof PasswordStrengthMeter> = {
  title: "Components/PasswordStrengthMeter",
  component: PasswordStrengthMeter,
  argTypes: {
    password: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof PasswordStrengthMeter>;

export const Default: Story = {
  args: {},
  render: (args, context) => {
    const [pw, setPw] = React.useState("");

    return (
      <Box sx={{ maxWidth: 420 }}>
        <TextField
          fullWidth
          type="password"
          label="Passwort"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />

        <Box sx={{ mt: 2 }}>
          <PasswordStrengthMeter {...args} password={pw} />
        </Box>
      </Box>
    );
  },
};
