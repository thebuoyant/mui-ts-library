import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

export type MeterColors = {
  weak: string;
  ok: string;
  good: string;
  veryGood: string;
};

export type PasswordStrengthMeterTranslation = {
  label: string;
};

export type PasswordStrengthMeterProps = {
  showPasswordAdornment?: boolean;
  inputSize?: "small" | "medium";
  translation?: PasswordStrengthMeterTranslation;
  meterColors?: MeterColors;
};

export function PasswordStrengthMeter({
  showPasswordAdornment = true,
  inputSize = "medium",
  translation = {
    label: "Input Label",
  },
  meterColors = {
    weak: "#cc0000",
    ok: "#fdc010",
    good: "#8bc34a",
    veryGood: "#43a047",
  },
}: PasswordStrengthMeterProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [meterStatus, setMeterStatus] = useState<
    "empty" | "weak" | "ok" | "good" | "very good"
  >("empty");

  const { label } = translation;
  const { weak } = meterColors;

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPassword(event.target.value);
  };

  return (
    <Stack>
      <div className="password-input-wrapper">
        <FormControl variant="outlined" fullWidth>
          <InputLabel
            htmlFor="outlined-adornment-for-password"
            size={inputSize}
          >
            {label}
          </InputLabel>

          <OutlinedInput
            id="outlined-adornment-for-password"
            type={showPassword ? "text" : "password"}
            fullWidth
            size={inputSize}
            value={password}
            onChange={handleOnChange}
            endAdornment={
              showPasswordAdornment ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : null
            }
            label="Password"
          />
        </FormControl>
      </div>
      <div
        className="meter-wrapper"
        style={{
          width: "100%",
          height: "8px",
          border: "1px solid rgba(0, 0, 0, 0.23)",
          borderRadius: "6px",
          marginTop: "4px",
          display: "flex",
        }}
      >
        {meterStatus === "empty" && (
          <div
            className="weak"
            style={{
              height: "100%",
              width: "0",
              backgroundColor: "transparent",
            }}
          ></div>
        )}
        {meterStatus === "weak" && (
          <div
            className="weak"
            style={{ height: "100%", width: "25%", backgroundColor: weak }}
          ></div>
        )}
      </div>
    </Stack>
  );
}
