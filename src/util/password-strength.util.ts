export type StrengthScore = 0 | 1 | 2 | 3 | 4;

export type StrengthResult = {
  score: StrengthScore;
  percent: number; // 0..100
  meterStatus: string;
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasDigit: boolean;
  hasSymbol: boolean;
};

const clampScore = (n: number): StrengthScore =>
  Math.max(0, Math.min(4, Math.round(n))) as StrengthScore;

export function scorePassword(password: string): StrengthResult {
  const p = password ?? "";
  const hints: string[] = [];

  const length = p.length;
  const hasLower = /[a-z]/.test(p);
  const hasUpper = /[A-Z]/.test(p);
  const hasDigit = /\d/.test(p);
  const hasSymbol = /[^A-Za-z0-9]/.test(p);

  const classes = [hasLower, hasUpper, hasDigit, hasSymbol].filter(
    Boolean,
  ).length;

  let points = 0;

  // Length scoring
  if (length >= 8) points += 1;
  else hints.push("Mindestens 8 Zeichen verwenden.");

  if (length >= 12) points += 1;
  else hints.push("12+ Zeichen erhöhen die Sicherheit deutlich.");

  // Character class scoring
  if (classes >= 2) points += 1;
  else
    hints.push("Groß-/Kleinbuchstaben, Zahlen oder Sonderzeichen kombinieren.");

  if (classes >= 3) points += 1;

  // Penalize common bad patterns
  if (/^(.)\1+$/.test(p) && length > 0) {
    points -= 2;
    hints.push("Nicht nur ein Zeichen wiederholen.");
  }

  if (/1234|abcd|qwer|password|passwort|admin/i.test(p)) {
    points -= 2;
    hints.push("Keine häufigen Muster/Wörter verwenden.");
  }

  const score = clampScore(points);
  const meterStatus =
    score <= 1
      ? "weak"
      : score === 2
        ? "ok"
        : score === 3
          ? "good"
          : "very good";
  const percent = score * 25;

  return {
    score,
    percent,
    meterStatus: meterStatus,
    length,
    hasDigit,
    hasLower,
    hasSymbol,
    hasUpper,
  };
}
