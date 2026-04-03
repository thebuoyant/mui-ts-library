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

export type PasswordStrengthMeterTranslation = {
  label: string;
};

export type PasswordStrengthMeterProps = {
  showPasswordAdornment?: boolean;
  inputSize: "small" | "medium";
  translation: PasswordStrengthMeterTranslation;
};

export function PasswordStrengthMeter({
  showPasswordAdornment = true,
  inputSize = "medium",
  translation = {
    label: "Input Label",
  },
}: PasswordStrengthMeterProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const { label } = translation;

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
    </Stack>
  );
}
