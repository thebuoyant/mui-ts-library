/**
 * Wandelt numerische Strings in Zahlen um (für Storybook-Controls),
 * lässt alle anderen Werte unverändert durch.
 *
 * Beispiele:
 *   "300"  → 300
 *   "auto" → "auto"
 *   300    → 300
 *   undefined → undefined
 */
export function normalizeSize(val: number | string | undefined): number | string | undefined {
  if (val === "" || val === undefined) return undefined;
  if (typeof val === "string" && val !== "auto" && !isNaN(Number(val))) return Number(val);
  return val;
}
