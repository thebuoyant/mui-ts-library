export type StrengthScore = 0 | 1 | 2 | 3 | 4;

export type MeterStatus = "weak" | "ok" | "good" | "very good";

export type StrengthResult = {
  score: StrengthScore;
  percent: number; // 0..100, immer score * 25
  meterStatus: MeterStatus;
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasDigit: boolean;
  hasSymbol: boolean;
};

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
  // {n} wird zur Laufzeit durch passwordMinLength ersetzt, z. B. "At least 8 characters".
  summaryMinChars: string;
  summaryCapitalLetter: string;
  summaryLowerCaseLetter: string;
  summaryNumber: string;
  summarySpecialChar: string;
  showPasswordLabel: string;
  hidePasswordLabel: string;
  meterAriaLabel: string;
};

export const DEFAULT_PASSWORD_TRANSLATIONS: PasswordStrengthMeterTranslation = {
  label: "Password",
  summaryHeaderLabel: "Requirements for your password",
  summaryMinChars: "At least {n} characters",
  summaryCapitalLetter: "At least 1 capital letter",
  summaryLowerCaseLetter: "At least 1 lowercase letter",
  summaryNumber: "At least 1 number",
  summarySpecialChar: "At least 1 special character",
  showPasswordLabel: "Show password",
  hidePasswordLabel: "Hide password",
  meterAriaLabel: "Password strength",
};

export const DEFAULT_METER_COLORS: MeterColors = {
  weak: "#cc0000",
  ok: "#fdc010",
  good: "#8bc34a",
  veryGood: "#43a047",
};

export const DEFAULT_CHECK_COLORS: CheckColors = {
  failure: "#cc0000",
  success: "#43a047",
};

export type PasswordStrengthMeterProps = {
  // Wenn gesetzt, wird die Komponente kontrolliert: das Passwort kommt von außen,
  // Änderungen werden über onPasswordChange nach oben gegeben.
  value?: string;
  showPasswordAdornment?: boolean;
  showMeter?: boolean;
  showSummary?: boolean;
  inputSize?: "small" | "medium";
  // Nur abweichende Keys angeben — Rest fällt auf DEFAULT_PASSWORD_TRANSLATIONS zurück.
  translation?: Partial<PasswordStrengthMeterTranslation>;
  // Nur abweichende Keys angeben — Rest fällt auf DEFAULT_METER_COLORS zurück.
  meterColors?: Partial<MeterColors>;
  passwordMinLength?: number;
  checkColors?: CheckColors;
  onPasswordChange?: (password: string, strengthResult: StrengthResult) => void;
};
