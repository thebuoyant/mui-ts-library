import { describe, expect, it, beforeEach } from "vitest";
import {
  loadQueryHistory,
  saveQueryHistory,
  addQueryToHistory,
  type SqlQueryHistoryEntry,
} from "./sqlQueryHistory.util";

const KEY = "test-sql-history";

beforeEach(() => {
  window.localStorage.clear();
});

describe("loadQueryHistory", () => {
  it("returns an empty array when nothing is stored", () => {
    expect(loadQueryHistory(KEY)).toEqual([]);
  });

  it("returns the stored entries", () => {
    const entries: SqlQueryHistoryEntry[] = [{ sql: "SELECT 1;", timestamp: 100 }];
    window.localStorage.setItem(KEY, JSON.stringify(entries));
    expect(loadQueryHistory(KEY)).toEqual(entries);
  });

  it("returns an empty array for malformed JSON", () => {
    window.localStorage.setItem(KEY, "{not json");
    expect(loadQueryHistory(KEY)).toEqual([]);
  });

  it("returns an empty array when the stored value is not an array", () => {
    window.localStorage.setItem(KEY, JSON.stringify({ sql: "SELECT 1;" }));
    expect(loadQueryHistory(KEY)).toEqual([]);
  });

  it("filters out malformed entries", () => {
    window.localStorage.setItem(
      KEY,
      JSON.stringify([{ sql: "SELECT 1;", timestamp: 100 }, { sql: 123, timestamp: 200 }, "not-an-entry"]),
    );
    expect(loadQueryHistory(KEY)).toEqual([{ sql: "SELECT 1;", timestamp: 100 }]);
  });
});

describe("saveQueryHistory", () => {
  it("persists entries to localStorage", () => {
    const entries: SqlQueryHistoryEntry[] = [{ sql: "SELECT 1;", timestamp: 100 }];
    saveQueryHistory(KEY, entries);
    expect(JSON.parse(window.localStorage.getItem(KEY)!)).toEqual(entries);
  });
});

describe("addQueryToHistory", () => {
  it("adds a new entry to the front", () => {
    const result = addQueryToHistory([], "SELECT 1;", 20);
    expect(result).toHaveLength(1);
    expect(result[0].sql).toBe("SELECT 1;");
  });

  it("trims whitespace from the SQL", () => {
    const result = addQueryToHistory([], "  SELECT 1;  ", 20);
    expect(result[0].sql).toBe("SELECT 1;");
  });

  it("ignores empty or whitespace-only SQL", () => {
    expect(addQueryToHistory([], "", 20)).toEqual([]);
    expect(addQueryToHistory([], "   ", 20)).toEqual([]);
  });

  it("moves a duplicate entry to the front instead of duplicating it", () => {
    const existing: SqlQueryHistoryEntry[] = [
      { sql: "SELECT 1;", timestamp: 100 },
      { sql: "SELECT 2;", timestamp: 200 },
    ];
    const result = addQueryToHistory(existing, "SELECT 1;", 20);
    expect(result).toHaveLength(2);
    expect(result[0].sql).toBe("SELECT 1;");
    expect(result[1].sql).toBe("SELECT 2;");
  });

  it("caps the result at maxEntries, dropping the oldest", () => {
    const existing: SqlQueryHistoryEntry[] = [
      { sql: "A", timestamp: 1 },
      { sql: "B", timestamp: 2 },
    ];
    const result = addQueryToHistory(existing, "C", 2);
    expect(result.map((e) => e.sql)).toEqual(["C", "A"]);
  });
});
