export type SqlQueryHistoryEntry = {
  // Unique per entry, independent of `timestamp` — two queries executed within
  // the same millisecond would otherwise share a `timestamp`, colliding as a
  // React list key. Generated fresh on add; persisted/restored entries from
  // localStorage keep their original id since it's part of the stored JSON.
  id: string;
  sql: string;
  timestamp: number;
};

let fallbackIdCounter = 0;

/** crypto.randomUUID() where available; a counter-based fallback otherwise (older environments). */
function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  fallbackIdCounter += 1;
  return `${Date.now()}-${fallbackIdCounter}`;
}

export function loadQueryHistory(storageKey: string): SqlQueryHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (entry): entry is Omit<SqlQueryHistoryEntry, "id"> & { id?: unknown } =>
          typeof entry?.sql === "string" && typeof entry?.timestamp === "number",
      )
      // Entries persisted before `id` existed don't have one — assign one on
      // load instead of dropping otherwise-valid history.
      .map((entry) => ({ ...entry, id: typeof entry.id === "string" ? entry.id : generateId() }));
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
  const updated = [{ id: generateId(), sql: trimmed, timestamp: Date.now() }, ...deduped];
  return updated.slice(0, Math.max(0, maxEntries));
}
