export type StrengthScore = 0 | 1 | 2 | 3 | 4;

export type MeterStatus = "weak" | "ok" | "good" | "very good";

export type StrengthResult = {
  score: StrengthScore;
  percent: number; // 0..100
  meterStatus: MeterStatus;
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasDigit: boolean;
  hasSymbol: boolean;
};

const clampScore = (value: number): StrengthScore => {
  return Math.max(0, Math.min(4, Math.round(value))) as StrengthScore;
};

export function scorePassword(
  password: string,
  passwordMinLength: number,
): StrengthResult {
  const normalizedPassword = password ?? "";

  const length = normalizedPassword.length;
  const hasLower = /[a-z]/.test(normalizedPassword);
  const hasUpper = /[A-Z]/.test(normalizedPassword);
  const hasDigit = /\d/.test(normalizedPassword);
  const hasSymbol = /[^A-Za-z0-9]/.test(normalizedPassword);

  const classes = [hasLower, hasUpper, hasDigit, hasSymbol].filter(
    Boolean,
  ).length;

  // Harte Mindestregel:
  // Solange das Passwort kürzer als passwordMinLength ist,
  // bleibt der Status immer "weak".
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

  // Mindestlänge erfüllt
  points += 1;

  // Bonus für deutlich längeres Passwort
  if (length >= passwordMinLength + 4) {
    points += 1;
  }

  // Bonus für Zeichenklassen
  if (classes >= 2) {
    points += 1;
  }

  if (classes >= 3) {
    points += 1;
  }

  // Schlechte Muster bestrafen
  if (/^(.)\1+$/.test(normalizedPassword)) {
    points -= 2;
  }

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
