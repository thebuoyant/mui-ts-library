import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { useSqlQueryHistory } from "./useSqlQueryHistory";

beforeEach(() => {
  window.localStorage.clear();
});

describe("useSqlQueryHistory", () => {
  it("loads history for the initial storageKey", () => {
    window.localStorage.setItem(
      "key-a",
      JSON.stringify([{ id: "1", sql: "SELECT 1;", timestamp: 100 }]),
    );
    const { result } = renderHook(() => useSqlQueryHistory("key-a", 20));
    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].sql).toBe("SELECT 1;");
  });

  // Regression: history was only ever loaded once via the useState initializer
  // — switching storageKey on a live instance (e.g. changing DB connections)
  // kept showing the previous key's entries indefinitely, while addEntry/
  // clearHistory already correctly wrote to the new key.
  it("reloads history when storageKey changes on a live instance", () => {
    window.localStorage.setItem(
      "key-a",
      JSON.stringify([{ id: "1", sql: "SELECT * FROM a;", timestamp: 100 }]),
    );
    window.localStorage.setItem(
      "key-b",
      JSON.stringify([{ id: "2", sql: "SELECT * FROM b;", timestamp: 200 }]),
    );

    const { result, rerender } = renderHook(
      ({ storageKey }) => useSqlQueryHistory(storageKey, 20),
      { initialProps: { storageKey: "key-a" } },
    );
    expect(result.current.history[0].sql).toBe("SELECT * FROM a;");

    rerender({ storageKey: "key-b" });
    expect(result.current.history[0].sql).toBe("SELECT * FROM b;");
  });

  it("addEntry writes to the current storageKey, not a stale one", () => {
    const { result, rerender } = renderHook(
      ({ storageKey }) => useSqlQueryHistory(storageKey, 20),
      { initialProps: { storageKey: "key-a" } },
    );
    rerender({ storageKey: "key-b" });

    act(() => { result.current.addEntry("SELECT * FROM b;"); });

    expect(window.localStorage.getItem("key-a")).toBeNull();
    const stored = JSON.parse(window.localStorage.getItem("key-b")!);
    expect(stored[0].sql).toBe("SELECT * FROM b;");
  });
});
