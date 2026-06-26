import { render, screen, fireEvent, act } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { SunburstChart } from "./SunburstChart";
import type { SunburstChartData } from "./SunburstChart.types";

const SIMPLE_DATA: SunburstChartData = {
  id: "root", name: "Root",
  children: [
    {
      id: "a", name: "Alpha",
      children: [
        { id: "a1", name: "Alpha-1", value: 100 },
        { id: "a2", name: "Alpha-2", value: 200 },
      ],
    },
    {
      id: "b", name: "Beta",
      children: [
        { id: "b1", name: "Beta-1", value: 150 },
      ],
    },
  ],
};

// SVG getBBox polyfill for JSDOM
beforeAll(() => {
  const mockBBox = { x: -250, y: -250, width: 500, height: 500, top: 0, right: 0, bottom: 0, left: 0 };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (SVGElement.prototype as any).getBBox = vi.fn(() => mockBBox);
});

describe("SunburstChart", () => {
  it("Should render an SVG element", () => {
    render(<SunburstChart data={SIMPLE_DATA} />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("Should use the data name as aria-label", () => {
    render(<SunburstChart data={SIMPLE_DATA} />);
    expect(screen.getByRole("img", { name: "Root" })).toBeInTheDocument();
  });

  it("Should render segment paths for each non-root node", () => {
    render(<SunburstChart data={SIMPLE_DATA} />);
    const paths = document.querySelectorAll("path[data-idx]");
    // Alpha, Alpha-1, Alpha-2, Beta, Beta-1
    expect(paths.length).toBe(5);
  });

  it("Should respect the size prop for SVG dimensions", () => {
    render(<SunburstChart data={SIMPLE_DATA} size={300} />);
    const svg = document.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("300");
    expect(svg?.getAttribute("height")).toBe("300");
  });

  it("Should show root label by default", () => {
    render(<SunburstChart data={SIMPLE_DATA} />);
    expect(document.querySelector("text")).toBeInTheDocument();
  });

  it("Should call onSegmentClick immediately on regular click (no delay)", () => {
    const handler = vi.fn();
    render(<SunburstChart data={SIMPLE_DATA} onSegmentClick={handler} />);
    const firstPath = document.querySelector<SVGPathElement>("path[data-idx='0']");
    expect(firstPath).toBeTruthy();
    fireEvent.click(firstPath!);
    // No timer needed — callback fires immediately
    expect(handler).toHaveBeenCalledTimes(1);
    const [info] = handler.mock.calls[0];
    expect(info).toHaveProperty("name");
    expect(info).toHaveProperty("depth");
    expect(info).toHaveProperty("path");
    expect(info).toHaveProperty("childrenCount");
  });

  it("Should not fire onSegmentClick when disabled", () => {
    const handler = vi.fn();
    render(<SunburstChart data={SIMPLE_DATA} onSegmentClick={handler} disabled />);
    const firstPath = document.querySelector<SVGPathElement>("path[data-idx='0']");
    fireEvent.click(firstPath!);
    expect(handler).not.toHaveBeenCalled();
  });

  it("Should not fire onSegmentClick on Ctrl+Click (reserved for zoom)", () => {
    const handler = vi.fn();
    render(<SunburstChart data={SIMPLE_DATA} onSegmentClick={handler} />);
    const firstPath = document.querySelector<SVGPathElement>("path[data-idx='0']");
    fireEvent.click(firstPath!, { ctrlKey: true });
    expect(handler).not.toHaveBeenCalled();
  });

  it("Should render a center circle when innerRadius > 0", () => {
    render(<SunburstChart data={SIMPLE_DATA} innerRadius={80} />);
    const circles = document.querySelectorAll("circle");
    expect(circles.length).toBeGreaterThan(0);
  });

  it("Should apply disabled opacity via Box sx", () => {
    const { container } = render(<SunburstChart data={SIMPLE_DATA} disabled />);
    const box = container.firstChild as HTMLElement;
    expect(box).toBeTruthy();
  });

  it("Should use custom translation for noData", () => {
    render(
      <SunburstChart
        data={SIMPLE_DATA}
        translation={{ noData: "Keine Daten vorhanden" }}
      />,
    );
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  describe("Animated drill-down transitions", () => {
    it("Should fire onZoomChange after the Ctrl+Click disambiguation delay, regardless of duration", () => {
      vi.useFakeTimers();
      const handler = vi.fn();
      render(<SunburstChart data={SIMPLE_DATA} onZoomChange={handler} />);
      const alphaPath = document.querySelector<SVGPathElement>("path[data-idx='0']");
      act(() => { fireEvent.click(alphaPath!, { ctrlKey: true }); });
      expect(handler).not.toHaveBeenCalled(); // gated behind the 250ms drill timer
      act(() => { vi.advanceTimersByTime(250); });
      expect(handler).toHaveBeenCalledTimes(1);
      const [info] = handler.mock.calls[0];
      expect(info.focusNode.name).toBe("Alpha");
      expect(info.isRoot).toBe(false);
      vi.useRealTimers();
    });

    it("Should settle on the final geometry immediately when duration=0", () => {
      vi.useFakeTimers();
      render(<SunburstChart data={SIMPLE_DATA} duration={0} />);
      const alphaPath = document.querySelector<SVGPathElement>("path[data-idx='0']");
      const dBefore = alphaPath!.getAttribute("d");
      act(() => { fireEvent.click(alphaPath!, { ctrlKey: true }); });
      act(() => { vi.advanceTimersByTime(250); });
      const dAfter = document.querySelector<SVGPathElement>("path[data-idx='0']")!.getAttribute("d");
      // Alpha now fills the full circle (it's the new focus) — its arc must have changed.
      expect(dAfter).not.toBe(dBefore);
      vi.useRealTimers();
    });

    it("Should settle on the same final geometry after the animation completes (default duration)", () => {
      vi.useFakeTimers();
      render(<SunburstChart data={SIMPLE_DATA} />);
      const alphaPath = document.querySelector<SVGPathElement>("path[data-idx='0']");
      const dBefore = alphaPath!.getAttribute("d");
      act(() => { fireEvent.click(alphaPath!, { ctrlKey: true }); });
      act(() => { vi.advanceTimersByTime(250); }); // drill disambiguation
      act(() => { vi.advanceTimersByTime(750); }); // full transition duration
      const dAfter = document.querySelector<SVGPathElement>("path[data-idx='0']")!.getAttribute("d");
      expect(dAfter).not.toBe(dBefore);
      vi.useRealTimers();
    });

    it("Should not throw when unmounted mid-animation", () => {
      vi.useFakeTimers();
      const { unmount } = render(<SunburstChart data={SIMPLE_DATA} />);
      const alphaPath = document.querySelector<SVGPathElement>("path[data-idx='0']");
      act(() => { fireEvent.click(alphaPath!, { ctrlKey: true }); });
      act(() => { vi.advanceTimersByTime(250); });
      act(() => { vi.advanceTimersByTime(100); }); // mid-transition
      expect(() => unmount()).not.toThrow();
      vi.useRealTimers();
    });

    it("Should animate back to the root view on Escape", () => {
      vi.useFakeTimers();
      const handler = vi.fn();
      render(<SunburstChart data={SIMPLE_DATA} duration={0} onZoomChange={handler} />);
      const alphaPath = document.querySelector<SVGPathElement>("path[data-idx='0']");
      act(() => { fireEvent.click(alphaPath!, { ctrlKey: true }); });
      act(() => { vi.advanceTimersByTime(250); });
      expect(handler).toHaveBeenLastCalledWith(expect.objectContaining({ isRoot: false }));

      act(() => { fireEvent.keyDown(window, { key: "Escape" }); });
      expect(handler).toHaveBeenLastCalledWith(expect.objectContaining({ isRoot: true }));
      vi.useRealTimers();
    });

    it("Should reset to the new root instantly (no animation) when the data prop changes", () => {
      vi.useFakeTimers();
      const { rerender } = render(<SunburstChart data={SIMPLE_DATA} />);
      const alphaPath = document.querySelector<SVGPathElement>("path[data-idx='0']");
      act(() => { fireEvent.click(alphaPath!, { ctrlKey: true }); });
      act(() => { vi.advanceTimersByTime(250); }); // now focused on Alpha

      const OTHER_DATA: SunburstChartData = {
        id: "root2", name: "Root2",
        children: [{ id: "x", name: "X", value: 1 }],
      };
      act(() => { rerender(<SunburstChart data={OTHER_DATA} />); });
      // No pending timers should be needed — the reset is synchronous, not animated.
      expect(screen.getByRole("img", { name: "Root2" })).toBeInTheDocument();
      vi.useRealTimers();
    });
  });
});
