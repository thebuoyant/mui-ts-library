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
import { useId, useMemo, useState } from "react";
import { scorePassword } from "./util/password-strength.util";
import type {
  CheckColors,
  MeterColors,
  PasswordStrengthMeterProps,
  PasswordStrengthMeterTranslation,
  StrengthResult,
} from "./PasswordStrengthMeter.types";
import {
  DEFAULT_CHECK_COLORS,
  DEFAULT_METER_COLORS,
  DEFAULT_PASSWORD_TRANSLATIONS,
} from "./PasswordStrengthMeter.types";

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
          data-testid="psm-req-success"
          style={{ fontSize: 16, color: checkColors.success }}
        />
      ) : (
        <ErrorOutlineIcon
          data-testid="psm-req-failure"
          style={{ fontSize: 16, color: checkColors.failure }}
        />
      )}
    </Stack>
  );
}

export function PasswordStrengthMeter({
  value,
  showPasswordAdornment = true,
  showMeter = true,
  showSummary = true,
  inputSize = "medium",
  translation,
  meterColors,
  passwordMinLength = 8,
  checkColors = DEFAULT_CHECK_COLORS,
  onPasswordChange,
}: PasswordStrengthMeterProps) {
  const t: PasswordStrengthMeterTranslation = { ...DEFAULT_PASSWORD_TRANSLATIONS, ...translation };
  const resolvedMeterColors: MeterColors = { ...DEFAULT_METER_COLORS, ...meterColors };
  // useId() erzeugt eine pro-Instanz eindeutige ID – verhindert Konflikte
  // wenn mehrere PasswordStrengthMeter auf der gleichen Seite gerendert werden.
  const uniqueId = useId();
  const inputId = `${uniqueId}-password`;

  const [showPassword, setShowPassword] = useState(false);
  const [internalPassword, setInternalPassword] = useState("");

  // Im kontrollierten Modus kommt der Wert von außen (value-Prop),
  // im unkontrollierten Modus wird der interne State genutzt.
  const password = value !== undefined ? value : internalPassword;

  const strengthResult = useMemo(
    () => scorePassword(password, passwordMinLength),
    [password, passwordMinLength],
  );

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

    if (value === undefined) {
      setInternalPassword(readPassword);
    }

    if (onPasswordChange) {
      onPasswordChange(readPassword, scorePassword(readPassword, passwordMinLength));
    }
  };

  const calculateStrengthColor = (result: StrengthResult): string => {
    switch (result.meterStatus) {
      case "weak":    return resolvedMeterColors.weak;
      case "ok":      return resolvedMeterColors.ok;
      case "good":    return resolvedMeterColors.good;
      case "very good": return resolvedMeterColors.veryGood;
      default:        return "transparent";
    }
  };

  return (
    <Stack>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor={inputId} size={inputSize}>
          {t.label}
        </InputLabel>

        <OutlinedInput
          id={inputId}
          type={showPassword ? "text" : "password"}
          fullWidth
          size={inputSize}
          value={password}
          onChange={handleOnChange}
          inputProps={{ "data-testid": "psm-input" }}
          endAdornment={
            showPasswordAdornment ? (
              <InputAdornment position="end">
                <IconButton
                  data-testid="psm-toggle"
                  aria-label={showPassword ? t.hidePasswordLabel : t.showPasswordLabel}
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
          label={t.label}
        />
      </FormControl>

      {showMeter && (
        // role="progressbar" macht den Balken für Screenreader verständlich –
        // ohne diese Attribute ist er für assistive Technologien unsichtbar.
        <Box
          role="progressbar"
          aria-label={t.meterAriaLabel}
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
            data-testid="psm-meter"
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
        <Box data-testid="psm-summary" sx={{ mt: 0.5, p: 0.5 }}>
          <Typography
            variant="caption"
            gutterBottom
            sx={{ display: "block", fontSize: 14 }}
          >
            {t.summaryHeaderLabel}
          </Typography>

          <Stack direction="row" spacing={6}>
            <Stack direction="column">
              <RequirementItem
                label={t.summaryMinChars.replace("{n}", String(passwordMinLength))}
                fulfilled={strengthResult.length >= passwordMinLength}
                checkColors={checkColors}
              />
              <RequirementItem
                label={t.summaryCapitalLetter}
                fulfilled={strengthResult.hasUpper}
                checkColors={checkColors}
              />
              <RequirementItem
                label={t.summaryLowerCaseLetter}
                fulfilled={strengthResult.hasLower}
                checkColors={checkColors}
              />
            </Stack>

            <Stack direction="column">
              <RequirementItem
                label={t.summaryNumber}
                fulfilled={strengthResult.hasDigit}
                checkColors={checkColors}
              />
              <RequirementItem
                label={t.summarySpecialChar}
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
