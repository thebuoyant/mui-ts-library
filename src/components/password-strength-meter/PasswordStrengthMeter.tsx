import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import { useId, useMemo, useState } from "react";
import { scorePassword } from "./util/password-strength.util";
import { PasswordStrengthBar } from "./PasswordStrengthBar";
import type {
  CheckColors,
  CustomRequirement,
  MeterColors,
  PasswordGeneratorOptions,
  PasswordStrengthMeterProps,
  PasswordStrengthMeterTranslation,
  StrengthResult,
} from "./PasswordStrengthMeter.types";
import {
  DEFAULT_CHECK_COLORS,
  DEFAULT_METER_COLORS,
  DEFAULT_PASSWORD_TRANSLATIONS,
} from "./PasswordStrengthMeter.types";

// ── Cryptographically secure password generator ───────────────────────────────
function generateSecurePassword(opts: Required<PasswordGeneratorOptions>): string {
  const charSets: string[] = [];
  if (opts.upper)   charSets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (opts.lower)   charSets.push("abcdefghijklmnopqrstuvwxyz");
  if (opts.numbers) charSets.push("0123456789");
  if (opts.symbols) charSets.push("!@#$%^&*()-_=+[]{}|;:,.<>?");
  if (charSets.length === 0) charSets.push("abcdefghijklmnopqrstuvwxyz");

  const allChars = charSets.join("");
  const array    = new Uint32Array(opts.length);
  crypto.getRandomValues(array);

  // Guarantee at least one char from each active class
  const guaranteed = charSets.map((set) => {
    const idx = crypto.getRandomValues(new Uint32Array(1))[0] % set.length;
    return set[idx];
  });

  const remaining = Array.from(array.slice(guaranteed.length)).map(
    (n) => allChars[n % allChars.length],
  );

  // Shuffle the result so the guaranteed chars aren't always at the start
  const combined = [...guaranteed, ...remaining];
  for (let i = combined.length - 1; i > 0; i--) {
    const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }
  return combined.join("");
}

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
    <Stack direction="row" sx={{ alignItems: "center", mb: 0.25 }} spacing={0.5}>
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
  name,
  inputRef,
  disabled = false,
  error = false,
  helperText,
  autoComplete,
  customRequirements,
  generatorOptions,
  showPasswordAdornment = true,
  showMeter = true,
  showPasswordGenerator = false,
  showSegmentedBar = false,
  showSummary = true,
  inputSize = "medium",
  translation,
  meterColors,
  passwordMinLength = 8,
  checkColors = DEFAULT_CHECK_COLORS,
  onPasswordChange,
  onPasswordGenerated,
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

  const handleGenerate = () => {
    const opts: Required<PasswordGeneratorOptions> = {
      length:  generatorOptions?.length  ?? Math.max(16, passwordMinLength),
      upper:   generatorOptions?.upper   ?? true,
      lower:   generatorOptions?.lower   ?? true,
      numbers: generatorOptions?.numbers ?? true,
      symbols: generatorOptions?.symbols ?? true,
    };
    const generated = generateSecurePassword(opts);
    if (value === undefined) setInternalPassword(generated);
    onPasswordChange?.(generated, scorePassword(generated, passwordMinLength));
    onPasswordGenerated?.(generated);
    // Show the generated password so the user can see it
    setShowPassword(true);
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
      <FormControl variant="outlined" fullWidth error={error}>
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
          disabled={disabled}
          inputRef={inputRef}
          inputProps={{ "data-testid": "psm-input", name, autoComplete }}
          endAdornment={
            showPasswordAdornment ? (
              <InputAdornment position="end">
                <IconButton
                  data-testid="psm-toggle"
                  disabled={disabled}
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
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>

      {showPasswordGenerator && (
        <Tooltip title={t.generatePasswordLabel} arrow>
          <span>
            <Button
              data-testid="psm-generate"
              size="small"
              variant="text"
              startIcon={<AutoFixHighIcon fontSize="small" />}
              disabled={disabled}
              onClick={handleGenerate}
              sx={{ mt: 0.5, alignSelf: "flex-start", textTransform: "none" }}
            >
              {t.generatePasswordLabel}
            </Button>
          </span>
        </Tooltip>
      )}

      {showMeter && (
        <PasswordStrengthBar
          percent={strengthResult.percent}
          color={calculateStrengthColor(strengthResult)}
          ariaLabel={t.meterAriaLabel}
          segments={showSegmentedBar}
        />
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
              {customRequirements?.map((req: CustomRequirement, idx: number) => (
                <RequirementItem
                  key={idx}
                  label={req.label}
                  fulfilled={typeof req.fulfilled === "function" ? req.fulfilled(password) : req.fulfilled}
                  checkColors={checkColors}
                />
              ))}
            </Stack>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
