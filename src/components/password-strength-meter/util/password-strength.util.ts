import type { MeterStatus, StrengthResult, StrengthScore } from "../PasswordStrengthMeter.types";

const clampScore = (value: number): StrengthScore => {
  return Math.max(0, Math.min(4, Math.round(value))) as StrengthScore;
};

export function scorePassword(
  password: string,
  passwordMinLength: number,
): StrengthResult {
  // Nullish-Fallback schützt gegen fehlerhafte Aufrufe mit undefined/null.
  const normalizedPassword = password ?? "";

  const length = normalizedPassword.length;
  const hasLower = /[a-z]/.test(normalizedPassword);
  const hasUpper = /[A-Z]/.test(normalizedPassword);
  const hasDigit = /\d/.test(normalizedPassword);
  const hasSymbol = /[^A-Za-z0-9]/.test(normalizedPassword);

  const classes = [hasLower, hasUpper, hasDigit, hasSymbol].filter(
    Boolean,
  ).length;

  // Harte Mindestregel: Passwörter unter der Mindestlänge bleiben immer "weak",
  // unabhängig davon, wie viele Zeichenklassen sie verwenden.
  if (length < passwordMinLength) {
    const score: StrengthScore = length === 0 ? 0 : 1;

    return {
      score,
      percent: score * 25,
      meterStatus: "weak",
      length,
      hasLower,
      hasUpper,
      hasDigit,
      hasSymbol,
    };
  }

  let points = 0;

  points += 1; // Mindestlänge erfüllt

  if (length >= passwordMinLength + 4) {
    points += 1; // Bonus für deutlich längere Passwörter
  }

  if (classes >= 2) {
    points += 1;
  }

  if (classes >= 3) {
    points += 1;
  }

  // Strafe für komplett wiederholte Zeichen (z. B. "AAAAAAA").
  if (/^(.)\1+$/.test(normalizedPassword)) {
    points -= 2;
  }

  // Strafe für bekannte, unsichere Muster.
  if (/1234|abcd|qwer|password|passwort|admin/i.test(normalizedPassword)) {
    points -= 2;
  }

  const score = clampScore(points);

  const meterStatus: MeterStatus =
    score <= 1
      ? "weak"
      : score === 2
        ? "ok"
        : score === 3
          ? "good"
          : "very good";

  return {
    score,
    percent: score * 25,
    meterStatus,
    length,
    hasLower,
    hasUpper,
    hasDigit,
    hasSymbol,
  };
}
