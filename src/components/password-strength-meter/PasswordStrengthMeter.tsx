import { Stack } from "@mui/material";
import * as React from "react";

export type PasswordStrengthMeterProps = {
  password: string;
};

export function PasswordStrengthMeter({
  password,
}: PasswordStrengthMeterProps) {
  return <Stack>{password}</Stack>;
}
