import { render, fireEvent, act } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { CirclePackingChart } from "./CirclePackingChart";
import type { CirclePackingData } from "./CirclePackingChart.types";

const SIMPLE_DATA: CirclePackingData = {
  name: "Root",
  children: [
    { name: "Alpha", value: 100, children: [
      { name: "Alpha-1", value: 60 },
      { name: "Alpha-2", value: 40 },
    ]},
    { name: "Beta",  value: 80 },
    { name: "Gamma", value: 60 },
  ],
};

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (SVGElement.prototype as any).getBBox = vi.fn(() => ({ x: -300, y: -300, width: 600, height: 600, top: 0, right: 0, bottom: 0, left: 0 }));
});

describe("CirclePackingChart", () => {
  it("Should render an SVG element", () => {
    render(<CirclePackingChart data={SIMPLE_DATA} />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("Should use the data name as aria-label", () => {
    render(<CirclePackingChart data={SIMPLE_DATA} />);
    expect(document.querySelector("svg[aria-label='Root']")).toBeInTheDocument();
  });

  it("Should respect the size prop", () => {
    render(<CirclePackingChart data={SIMPLE_DATA} size={400} />);
    const svg = document.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("400");
    expect(svg?.getAttribute("height")).toBe("400");
  });

  it("Should render one circle per non-root node", () => {
    render(<CirclePackingChart data={SIMPLE_DATA} />);
    // Root has no circle, all 5 descendants do
    const circles = document.querySelectorAll("circle");
    expect(circles.length).toBe(5);
  });

  it("Should call onCircleClick on single click after timer", () => {
    vi.useFakeTimers();
    const handler = vi.fn();
    render(<CirclePackingChart data={SIMPLE_DATA} onCircleClick={handler} />);
    const firstCircle = document.querySelector<SVGCircleElement>("circle");
    if (firstCircle) fireEvent.click(firstCircle);
    vi.runAllTimers();
    expect(handler).toHaveBeenCalledTimes(1);
    const [info] = handler.mock.calls[0];
    expect(info).toHaveProperty("name");
    expect(info).toHaveProperty("value");
    expect(info).toHaveProperty("percentage");
    expect(info).toHaveProperty("depth");
    expect(info).toHaveProperty("path");
    vi.useRealTimers();
  });

  it("Should not call onCircleClick when disabled", () => {
    vi.useFakeTimers();
    const handler = vi.fn();
    render(<CirclePackingChart data={SIMPLE_DATA} onCircleClick={handler} disabled />);
    const firstCircle = document.querySelector<SVGCircleElement>("circle");
    if (firstCircle) fireEvent.click(firstCircle);
    vi.runAllTimers();
    expect(handler).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("Should render labels when showLabels is true", () => {
    render(<CirclePackingChart data={SIMPLE_DATA} showLabels />);
    const texts = document.querySelectorAll("text");
    expect(texts.length).toBeGreaterThan(0);
  });

  it("Should not render labels when showLabels is false", () => {
    render(<CirclePackingChart data={SIMPLE_DATA} showLabels={false} />);
    expect(document.querySelector("text")).not.toBeInTheDocument();
  });

  it("Should render without chartColors (gradient mode)", () => {
    render(<CirclePackingChart data={SIMPLE_DATA} />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("Should render with chartColors (palette mode)", () => {
    render(<CirclePackingChart data={SIMPLE_DATA} chartColors={["#1976D2", "#42A5F5"]} />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("Should apply disabled opacity", () => {
    const { container } = render(<CirclePackingChart data={SIMPLE_DATA} disabled />);
    expect(container.firstChild).toBeTruthy();
  });

  // Regression: the Escape key listener deliberately excludes `performZoom`
  // from its effect deps (to avoid re-registering on every focus change), so
  // it used to close over a stale performZoom from whenever the effect last
  // ran — reporting the WRONG previousName (captured inside performZoom's own
  // closure) once the user had zoomed deeper without disabled/root/duration
  // changing in between.
  it("Should report the actual current focus as previousName on Escape, even after zooming twice without other prop changes", () => {
    // Needs two levels of zoomable (non-leaf) nesting, unlike SIMPLE_DATA where
    // only Alpha has children — zooming into a leaf is a no-op.
    const NESTED_DATA: CirclePackingData = {
      name: "Root",
      children: [
        { name: "Alpha", value: 50, children: [
          { name: "Beta", value: 30, children: [
            { name: "Gamma", value: 20 },
          ]},
        ]},
      ],
    };
    vi.useFakeTimers();
    const handler = vi.fn();
    render(<CirclePackingChart data={NESTED_DATA} onZoomChange={handler} />);
    const circles = document.querySelectorAll<SVGCircleElement>("circle");

    // Pre-order: Alpha(0), Beta(1), Gamma(2)
    act(() => { fireEvent.click(circles[0], { ctrlKey: true }); }); // zoom into Alpha
    act(() => { vi.advanceTimersByTime(250); });
    act(() => { fireEvent.click(circles[1], { ctrlKey: true }); }); // zoom into Beta
    act(() => { vi.advanceTimersByTime(250); });
    expect(handler).toHaveBeenLastCalledWith(expect.objectContaining({ currentName: "Beta" }));

    act(() => { fireEvent.keyDown(window, { key: "Escape" }); });
    expect(handler).toHaveBeenLastCalledWith(expect.objectContaining({ previousName: "Beta", isRoot: true }));
    vi.useRealTimers();
  });

  // Regression: the focus-reset guard only checked whether the `data` prop
  // reference changed, but `root` (the actual tree of node objects `focus`
  // points into) is ALSO recomputed when size/padding/sortBy change — leaving
  // `focus` pointing at orphaned nodes from the old layout.
  it("Should reset focus to the new root when sortBy changes while zoomed in (no spurious re-navigation)", () => {
    vi.useFakeTimers();
    const handler = vi.fn();
    const { rerender } = render(<CirclePackingChart data={SIMPLE_DATA} sortBy="value" onZoomChange={handler} />);
    const firstCircle = document.querySelector<SVGCircleElement>("circle");
    act(() => { fireEvent.click(firstCircle!, { ctrlKey: true }); }); // zoom into Alpha
    act(() => { vi.advanceTimersByTime(250); });
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenLastCalledWith(expect.objectContaining({ isRoot: false }));

    expect(() => {
      rerender(<CirclePackingChart data={SIMPLE_DATA} sortBy="name" onZoomChange={handler} />);
    }).not.toThrow();

    // With the fix, focus is reset to the (recomputed) root, so a Ctrl+DblClick
    // zoom-out is a no-op there (target === focus) and fires no extra callback.
    // Without the fix, `focus` still points at the OLD Alpha node, whose
    // `.parent` is the OLD orphaned root object (!== the new `root`) — so the
    // stale guard would have let a spurious extra navigation fire here with
    // isRoot: false.
    const circleAfterResort = document.querySelector<SVGCircleElement>("circle")!;
    act(() => { fireEvent.doubleClick(circleAfterResort, { ctrlKey: true }); });
    expect(handler).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  describe("No data", () => {
    const EMPTY_DATA: CirclePackingData = { name: "Root" };

    it("Should show the default noData message when data has no children and no value", () => {
      render(<CirclePackingChart data={EMPTY_DATA} />);
      expect(document.querySelector("svg")?.textContent).toContain("No data");
    });

    it("Should use a custom translation for noData", () => {
      render(<CirclePackingChart data={EMPTY_DATA} translation={{ noData: "Keine Daten" }} />);
      expect(document.querySelector("svg")?.textContent).toContain("Keine Daten");
    });

    it("Should not show the noData message when data has children", () => {
      render(<CirclePackingChart data={SIMPLE_DATA} />);
      expect(document.querySelector("svg")?.textContent).not.toContain("No data");
    });
  });

  // ── onCircleHover ──────────────────────────────────────────────────────────

  describe("onCircleHover", () => {
    it("calls onCircleHover with node info on mouse enter", () => {
      const onCircleHover = vi.fn();
      render(<CirclePackingChart data={SIMPLE_DATA} onCircleHover={onCircleHover} />);
      const circles = document.querySelectorAll<SVGCircleElement>("circle");
      fireEvent.mouseEnter(circles[1]!);
      expect(onCircleHover).toHaveBeenCalledOnce();
      expect(onCircleHover.mock.calls[0][0]).not.toBeNull();
      expect(onCircleHover.mock.calls[0][0]).toMatchObject({ name: expect.any(String) });
    });

    it("calls onCircleHover with null on mouse leave", () => {
      const onCircleHover = vi.fn();
      render(<CirclePackingChart data={SIMPLE_DATA} onCircleHover={onCircleHover} />);
      const circles = document.querySelectorAll<SVGCircleElement>("circle");
      fireEvent.mouseEnter(circles[1]!);
      fireEvent.mouseLeave(circles[1]!);
      expect(onCircleHover).toHaveBeenCalledTimes(2);
      expect(onCircleHover.mock.calls[1][0]).toBeNull();
    });
  });
});
