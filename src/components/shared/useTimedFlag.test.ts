import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useTimedFlag } from "./useTimedFlag";

describe("useTimedFlag", () => {
  it("Should start as false", () => {
    const { result } = renderHook(() => useTimedFlag());
    expect(result.current[0]).toBe(false);
  });

  it("Should become true after trigger and reset to false after the duration", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTimedFlag(2000));

    act(() => { result.current[1](); });
    expect(result.current[0]).toBe(true);

    act(() => { vi.advanceTimersByTime(1999); });
    expect(result.current[0]).toBe(true);

    act(() => { vi.advanceTimersByTime(1); });
    expect(result.current[0]).toBe(false);
    vi.useRealTimers();
  });

  it("Should restart the timer instead of stacking when triggered again before it resets", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTimedFlag(2000));

    act(() => { result.current[1](); });
    act(() => { vi.advanceTimersByTime(1500); });
    act(() => { result.current[1](); }); // re-trigger — should push the reset out by another 2000ms

    act(() => { vi.advanceTimersByTime(1500); }); // 3000ms since first trigger, only 1500ms since second
    expect(result.current[0]).toBe(true); // would be false here if timers had stacked instead of restarting

    act(() => { vi.advanceTimersByTime(500); });
    expect(result.current[0]).toBe(false);
    vi.useRealTimers();
  });

  it("Should not throw or warn when unmounted before the timer fires", () => {
    vi.useFakeTimers();
    const { result, unmount } = renderHook(() => useTimedFlag(2000));

    act(() => { result.current[1](); });
    act(() => { vi.advanceTimersByTime(500); }); // mid-timeout

    expect(() => unmount()).not.toThrow();
    // Advancing past the original duration after unmount must not throw either
    // (the pending setTimeout callback should have been cleared on unmount).
    expect(() => act(() => { vi.advanceTimersByTime(2000); })).not.toThrow();
    vi.useRealTimers();
  });

  it("Should respect a custom duration", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useTimedFlag(500));

    act(() => { result.current[1](); });
    act(() => { vi.advanceTimersByTime(499); });
    expect(result.current[0]).toBe(true);

    act(() => { vi.advanceTimersByTime(1); });
    expect(result.current[0]).toBe(false);
    vi.useRealTimers();
  });
});
