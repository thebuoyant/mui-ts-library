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
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";
import {
  scorePassword,
  type StrengthResult,
} from "../../util/password-strength.util";

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
  summarySpecialChar: string;
};

export type PasswordStrengthMeterProps = {
  showPasswordAdornment?: boolean;
  showMeter?: boolean;
  inputSize?: "small" | "medium";
  translation?: PasswordStrengthMeterTranslation;
  meterColors?: MeterColors;
  passwordMinLength?: number;
  checkColors?: CheckColors;

  /**
   * Wird bei jeder Passwort-Änderung aufgerufen.
   * So kann der Consumer das Passwort und das StrengthResult
   * außerhalb der Komponente weiterverwenden.
   */
  onPasswordChange?: (password: string, strengthResult: StrengthResult) => void;
};

/**
 * Kleine Hilfskomponente für die Anforderungsliste.
 * So vermeiden wir doppelten Code und halten die Hauptkomponente lesbarer.
 */
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
    <div className="summary-item" style={{ display: "flex" }}>
      <Typography variant="caption" gutterBottom>
        {label}
      </Typography>

      {fulfilled ? (
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
  );
}

export function PasswordStrengthMeter({
  showPasswordAdornment = true,
  showMeter = true,
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

    // StrengthResult genau einmal berechnen
    const nextStrengthResult = scorePassword(readPassword, passwordMinLength);

    // Lokalen State aktualisieren
    setPassword(readPassword);
    setStrengthResult(nextStrengthResult);

    // Optional den Consumer informieren
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
              borderRadius: "6px",
              transition: "width 0.2s ease-in-out",
            }}
          />
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
        </div>
      </div>
    </Stack>
  );
}
