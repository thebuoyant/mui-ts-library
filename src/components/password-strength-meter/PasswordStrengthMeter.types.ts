import type { StrengthResult } from "./util/password-strength.util";

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
  // Der Mindestlängen-Text ist in zwei Teile aufgeteilt, damit die Zahl (passwordMinLength)
  // dynamisch eingefügt werden kann: z. B. "At least" + 8 + "characters".
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
  showSummary?: boolean;
  inputSize?: "small" | "medium";
  translation?: PasswordStrengthMeterTranslation;
  meterColors?: MeterColors;
  passwordMinLength?: number;
  checkColors?: CheckColors;
  onPasswordChange?: (password: string, strengthResult: StrengthResult) => void;
};
