import { useCallback, useState } from "react";
import {
  loadQueryHistory,
  saveQueryHistory,
  addQueryToHistory,
  type SqlQueryHistoryEntry,
} from "./util/sqlQueryHistory.util";

export function useSqlQueryHistory(storageKey: string, maxEntries: number) {
  const [history, setHistory] = useState<SqlQueryHistoryEntry[]>(() => loadQueryHistory(storageKey));

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
