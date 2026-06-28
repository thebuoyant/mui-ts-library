import { useCallback, useEffect, useState } from "react";
import {
  loadQueryHistory,
  saveQueryHistory,
  addQueryToHistory,
  type SqlQueryHistoryEntry,
} from "./util/sqlQueryHistory.util";

export function useSqlQueryHistory(storageKey: string, maxEntries: number) {
  const [history, setHistory] = useState<SqlQueryHistoryEntry[]>(() => loadQueryHistory(storageKey));

  // The useState initializer above only runs once on mount — without this,
  // changing storageKey on a live instance (e.g. switching DB connections)
  // would keep showing the previous key's history while addEntry/clearHistory
  // (recreated below since they depend on storageKey) already write to the new one.
  useEffect(() => {
    setHistory(loadQueryHistory(storageKey));
  }, [storageKey]);

  const addEntry = useCallback(
    (sql: string) => {
      setHistory((prev) => {
        const updated = addQueryToHistory(prev, sql, maxEntries);
        saveQueryHistory(storageKey, updated);
        return updated;
      });
    },
    [storageKey, maxEntries],
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    saveQueryHistory(storageKey, []);
  }, [storageKey]);

  return { history, addEntry, clearHistory };
}
