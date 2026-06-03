import type React from "react";

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
  // {n} wird zur Laufzeit durch passwordMinLength ersetzt, z. B. "Mindestens 8 Zeichen".
  summaryMinChars: string;
  summaryCapitalLetter: string;
  summaryLowerCaseLetter: string;
  summaryNumber: string;
  summarySpecialChar: string;
  showPasswordLabel: string;
  hidePasswordLabel: string;
  meterAriaLabel: string;
  /** Tooltip for the password generator button */
  generatePasswordLabel: string;
  /** Label for the confirm password input */
  confirmLabel: string;
  /** Shown when passwords match */
  confirmMatchLabel: string;
  /** Shown when passwords do not match */
  confirmMismatchLabel: string;
};

/**
 * Options for the built-in password generator.
 * All character classes are included by default.
 */
export type PasswordGeneratorOptions = {
  /** Total password length (default: 16) */
  length?:  number;
  /** Include uppercase letters A–Z (default: true) */
  upper?:   boolean;
  /** Include lowercase letters a–z (default: true) */
  lower?:   boolean;
  /** Include digits 0–9 (default: true) */
  numbers?: boolean;
  /** Include symbols !@#$%^&*... (default: true) */
  symbols?: boolean;
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
  generatePasswordLabel: "Generate secure password",
  confirmLabel: "Confirm password",
  confirmMatchLabel: "Passwords match",
  confirmMismatchLabel: "Passwords do not match",
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

/**
 * A single custom password requirement.
 * `fulfilled` can be a static boolean or a function evaluated on the current password.
 */
export type CustomRequirement = {
  label:     string;
  fulfilled: boolean | ((password: string) => boolean);
};

export type PasswordStrengthMeterProps = {
  autoComplete?:            string;
  checkColors?:             CheckColors;
  /** Additional custom requirements shown alongside the built-in ones. */
  customRequirements?:      CustomRequirement[];
  disabled?:                boolean;
  error?:                   boolean;
  /** Value of the confirm input in controlled mode. */
  confirmValue?:            string;
  /** Options for the built-in password generator (used when showPasswordGenerator=true). */
  generatorOptions?:        PasswordGeneratorOptions;
  helperText?:              string;
  inputRef?:                React.Ref<HTMLInputElement>;
  inputSize?:               "small" | "medium";
  // Nur abweichende Keys angeben — Rest fällt auf DEFAULT_METER_COLORS zurück.
  meterColors?:             Partial<MeterColors>;
  // Form-Integration: kompatibel mit React Hook Form register(), Formik und nativen Forms.
  name?:                    string;
  passwordMinLength?:       number;
  showMeter?:               boolean;
  showPasswordAdornment?:   boolean;
  /** Show a second "Confirm password" input with match validation indicator. */
  showConfirmField?:        boolean;
  /** Show a "Generate secure password" button — generates and fills a strong password on click. */
  showPasswordGenerator?:   boolean;
  showSummary?:             boolean;
  /** Render the strength bar as 4 animated segments instead of a single growing bar. */
  showSegmentedBar?:        boolean;
  // Nur abweichende Keys angeben — Rest fällt auf DEFAULT_PASSWORD_TRANSLATIONS zurück.
  translation?:             Partial<PasswordStrengthMeterTranslation>;
  // Wenn gesetzt, wird die Komponente kontrolliert: das Passwort kommt von außen,
  // Änderungen werden über onPasswordChange nach oben gegeben.
  value?:                   string;
  // Callbacks
  onPasswordChange?:        (password: string, strengthResult: StrengthResult) => void;
  /** Fired when the confirm field value changes — includes whether the passwords match. */
  onConfirmChange?:         (confirmValue: string, matches: boolean) => void;
  /** Fired when a password was generated — receives the generated password. */
  onPasswordGenerated?:     (password: string) => void;
};
