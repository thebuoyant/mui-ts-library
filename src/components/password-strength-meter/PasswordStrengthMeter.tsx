import {
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
import { useState } from "react";
import {
  scorePassword,
  StrengthResult,
} from "../../util/password-strength.util";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export type CheckColors = {
  failure: string;
  success: string;
};

export type MeterColors = {
  weak: string;
  ok: string;
  good: string;
  veryGood: string;
};

export type PasswordStrengthMeterTranslation = {
  label: string;
  summaryHeaderLabel: string;
  summaryMinCharsLeft: string;
  summaryMinCharsRight: string;
  summaryCapitalLetter: string;
  summaryLowerCaseLetter: string;
  summaryNumber: string;
};

export type PasswordStrengthMeterProps = {
  showPasswordAdornment: boolean;
  showMeter: boolean;
  inputSize: "small" | "medium";
  translation: PasswordStrengthMeterTranslation;
  meterColors: MeterColors;
  passwordMinLength: number;
  checkColors: CheckColors;
};

export function PasswordStrengthMeter({
  showPasswordAdornment = true,
  showMeter = true,
  inputSize = "medium",
  translation = {
    label: "Password",
    summaryHeaderLabel: "Requirements for your password",
    summaryMinCharsLeft: "At least ",
    summaryMinCharsRight: "characters",
    summaryCapitalLetter: "At least 1 capital letter",
    summaryLowerCaseLetter: "At least 1 lovercase letter",
    summaryNumber: "At least 1 number",
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
}: PasswordStrengthMeterProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [strengthResult, setStrengthResult] = useState<StrengthResult>({
    score: 0,
    percent: 0,
    meterStatus: "weak",
    length: 0,
    hasLower: false,
    hasUpper: false,
    hasDigit: false,
    hasSymbol: false,
  });

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
    const readPassword = event.target.value;

    setStrengthResult(scorePassword(readPassword, passwordMinLength));
    setPassword(readPassword);
  };

  console.log("strengthResult:", strengthResult);

  const calculateStrengthColor = (strengthResult: StrengthResult): string => {
    switch (strengthResult.meterStatus) {
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
            label={label}
          />
        </FormControl>
      </div>
      {showMeter && (
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
          <div
            className="meter-result"
            style={{
              height: "100%",
              width: `${strengthResult.percent}%`,
              backgroundColor: calculateStrengthColor(strengthResult),
            }}
          ></div>
        </div>
      )}
      <div
        className="summary-section"
        style={{ marginTop: "4px", padding: "4px" }}
      >
        <div className="summary" style={{ marginBottom: "4px" }}>
          <Typography
            variant="caption"
            gutterBottom
            sx={{ display: "block", fontSize: 14 }}
          >
            {translation.summaryHeaderLabel}
          </Typography>
          <Stack direction="row" spacing={4}>
            <Stack direction="column">
              <div className="summary-item" style={{ display: "flex" }}>
                <Typography variant="caption" gutterBottom>
                  {`${translation.summaryMinCharsLeft} ${passwordMinLength} ${translation.summaryMinCharsRight}`}
                </Typography>
                {strengthResult.length >= passwordMinLength ? (
                  <CheckCircleOutlineIcon
                    style={{
                      fontSize: 16,
                      color: checkColors.success,
                      position: "relative",
                      top: 1,
                      left: 3,
                    }}
                  />
                ) : (
                  <ErrorOutlineIcon
                    style={{
                      fontSize: 16,
                      color: checkColors.failure,
                      position: "relative",
                      top: 1,
                      left: 3,
                    }}
                  />
                )}
              </div>
              <div className="summary-item" style={{ display: "flex" }}>
                <Typography variant="caption" gutterBottom>
                  {`${translation.summaryCapitalLetter}`}
                </Typography>
                {strengthResult.hasUpper ? (
                  <CheckCircleOutlineIcon
                    style={{
                      fontSize: 16,
                      color: checkColors.success,
                      position: "relative",
                      top: 1,
                      left: 3,
                    }}
                  />
                ) : (
                  <ErrorOutlineIcon
                    style={{
                      fontSize: 16,
                      color: checkColors.failure,
                      position: "relative",
                      top: 1,
                      left: 3,
                    }}
                  />
                )}
              </div>
              <div className="summary-item" style={{ display: "flex" }}>
                <Typography variant="caption" gutterBottom>
                  {`${translation.summaryLowerCaseLetter}`}
                </Typography>
                {strengthResult.hasLower ? (
                  <CheckCircleOutlineIcon
                    style={{
                      fontSize: 16,
                      color: checkColors.success,
                      position: "relative",
                      top: 1,
                      left: 3,
                    }}
                  />
                ) : (
                  <ErrorOutlineIcon
                    style={{
                      fontSize: 16,
                      color: checkColors.failure,
                      position: "relative",
                      top: 1,
                      left: 3,
                    }}
                  />
                )}
              </div>
            </Stack>
            <Stack direction="column">
              <div className="summary-item" style={{ display: "flex" }}>
                <Typography variant="caption" gutterBottom>
                  {`${translation.summaryNumber}`}
                </Typography>
                {strengthResult.hasDigit ? (
                  <CheckCircleOutlineIcon
                    style={{
                      fontSize: 16,
                      color: checkColors.success,
                      position: "relative",
                      top: 1,
                      left: 3,
                    }}
                  />
                ) : (
                  <ErrorOutlineIcon
                    style={{
                      fontSize: 16,
                      color: checkColors.failure,
                      position: "relative",
                      top: 1,
                      left: 3,
                    }}
                  />
                )}
              </div>
            </Stack>
          </Stack>
        </div>
      </div>
    </Stack>
  );
}
