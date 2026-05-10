import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";
import {
  scorePassword,
  type StrengthResult,
} from "./util/password-strength.util";
import type {
  CheckColors,
  MeterColors,
  PasswordStrengthMeterProps,
  PasswordStrengthMeterTranslation,
} from "./PasswordStrengthMeter.types";

export type {
  CheckColors,
  MeterColors,
  PasswordStrengthMeterTranslation,
  PasswordStrengthMeterProps,
};

const INITIAL_STRENGTH_RESULT: StrengthResult = {
  score: 0,
  percent: 0,
  meterStatus: "weak",
  length: 0,
  hasLower: false,
  hasUpper: false,
  hasDigit: false,
  hasSymbol: false,
};

type RequirementItemProps = {
  label: string;
  fulfilled: boolean;
  checkColors: CheckColors;
};

function RequirementItem({
  label,
  fulfilled,
  checkColors,
}: RequirementItemProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5} mb={0.25}>
      <Typography variant="caption">{label}</Typography>
      {fulfilled ? (
        <CheckCircleOutlineIcon
          style={{ fontSize: 16, color: checkColors.success }}
        />
      ) : (
        <ErrorOutlineIcon
          style={{ fontSize: 16, color: checkColors.failure }}
        />
      )}
    </Stack>
  );
}

export function PasswordStrengthMeter({
  showPasswordAdornment = true,
  showMeter = true,
  showSummary = true,
  inputSize = "medium",
  translation = {
    label: "Password",
    summaryHeaderLabel: "Requirements for your password",
    summaryMinCharsLeft: "At least",
    summaryMinCharsRight: "characters",
    summaryCapitalLetter: "At least 1 capital letter",
    summaryLowerCaseLetter: "At least 1 lowercase letter",
    summaryNumber: "At least 1 number",
    summarySpecialChar: "At least 1 special character",
  },
  meterColors = {
    weak: "#cc0000",
    ok: "#fdc010",
    good: "#8bc34a",
    veryGood: "#43a047",
  },
  passwordMinLength = 8,
  checkColors = {
    failure: "#cc0000",
    success: "#43a047",
  },
  onPasswordChange,
}: PasswordStrengthMeterProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [strengthResult, setStrengthResult] = useState<StrengthResult>(
    INITIAL_STRENGTH_RESULT,
  );

  const { label } = translation;

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  // preventDefault verhindert, dass das Textfeld den Fokus verliert,
  // wenn der Nutzer auf den Sichtbarkeits-Button klickt (mousedown/up-Verhalten des Browsers).
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
    const readPassword = event.target.value;
    const nextStrengthResult = scorePassword(readPassword, passwordMinLength);

    setPassword(readPassword);
    setStrengthResult(nextStrengthResult);

    if (onPasswordChange) {
      onPasswordChange(readPassword, nextStrengthResult);
    }
  };

  const calculateStrengthColor = (result: StrengthResult): string => {
    switch (result.meterStatus) {
      case "weak":
        return meterColors.weak;
      case "ok":
        return meterColors.ok;
      case "good":
        return meterColors.good;
      case "very good":
        return meterColors.veryGood;
      default:
        return "transparent";
    }
  };

  return (
    <Stack>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="password-strength-input" size={inputSize}>
          {label}
        </InputLabel>

        <OutlinedInput
          id="password-strength-input"
          type={showPassword ? "text" : "password"}
          fullWidth
          size={inputSize}
          value={password}
          onChange={handleOnChange}
          endAdornment={
            showPasswordAdornment ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
          label={label}
        />
      </FormControl>

      {showMeter && (
        // role="progressbar" macht den Balken für Screenreader verständlich –
        // ohne diese Attribute ist er für assistive Technologien unsichtbar.
        <Box
          role="progressbar"
          aria-label="Password strength"
          aria-valuenow={strengthResult.percent}
          aria-valuemin={0}
          aria-valuemax={100}
          sx={{
            width: "100%",
            height: "8px",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "6px",
            mt: 0.5,
            display: "flex",
          }}
        >
          <Box
            className="meter-result"
            sx={{
              height: "100%",
              width: `${strengthResult.percent}%`,
              backgroundColor: calculateStrengthColor(strengthResult),
              borderRadius: "6px",
              transition: "width 0.2s ease-in-out",
            }}
          />
        </Box>
      )}

      {showSummary && (
        <Box sx={{ mt: 0.5, p: 0.5 }}>
          <Typography
            variant="caption"
            gutterBottom
            sx={{ display: "block", fontSize: 14 }}
          >
            {translation.summaryHeaderLabel}
          </Typography>

          <Stack direction="row" spacing={6}>
            <Stack direction="column">
              <RequirementItem
                label={`${translation.summaryMinCharsLeft} ${passwordMinLength} ${translation.summaryMinCharsRight}`}
                fulfilled={strengthResult.length >= passwordMinLength}
                checkColors={checkColors}
              />
              <RequirementItem
                label={translation.summaryCapitalLetter}
                fulfilled={strengthResult.hasUpper}
                checkColors={checkColors}
              />
              <RequirementItem
                label={translation.summaryLowerCaseLetter}
                fulfilled={strengthResult.hasLower}
                checkColors={checkColors}
              />
            </Stack>

            <Stack direction="column">
              <RequirementItem
                label={translation.summaryNumber}
                fulfilled={strengthResult.hasDigit}
                checkColors={checkColors}
              />
              <RequirementItem
                label={translation.summarySpecialChar}
                fulfilled={strengthResult.hasSymbol}
                checkColors={checkColors}
              />
            </Stack>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
