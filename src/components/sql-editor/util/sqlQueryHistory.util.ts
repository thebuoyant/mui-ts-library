export type SqlQueryHistoryEntry = {
  sql: string;
  timestamp: number;
};

export function loadQueryHistory(storageKey: string): SqlQueryHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is SqlQueryHistoryEntry =>
        typeof entry?.sql === "string" && typeof entry?.timestamp === "number",
    );
  } catch {
    return [];
  }
}

export function saveQueryHistory(storageKey: string, history: SqlQueryHistoryEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(history));
  } catch {
    // localStorage unavailable (private mode, quota exceeded) — fail silently.
  }
}

/**
 * Adds a new entry to the front of the history. An existing entry with the
 * same SQL is moved to the front instead of duplicated. Result is capped at
 * maxEntries.
 */
export function addQueryToHistory(
  history: SqlQueryHistoryEntry[],
  sql: string,
  maxEntries: number,
): SqlQueryHistoryEntry[] {
  const trimmed = sql.trim();
  if (!trimmed) return history;
  const deduped = history.filter((entry) => entry.sql !== trimmed);
  const updated = [{ sql: trimmed, timestamp: Date.now() }, ...deduped];
  return updated.slice(0, Math.max(0, maxEntries));
}
