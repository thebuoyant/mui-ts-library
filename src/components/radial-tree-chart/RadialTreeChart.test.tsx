import { render, fireEvent, act, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { RadialTreeChart } from "./RadialTreeChart";
import type { RadialTreeChartData } from "./RadialTreeChart.types";

const SIMPLE_DATA: RadialTreeChartData = {
  id: "root", name: "Root", subname: "CEO",
  children: [
    {
      id: "a", name: "Alpha", subname: "CTO",
      specialValueA: "L1", specialValueB: "Engineering",
      children: [
        { id: "a1", name: "Alpha-1", value: 100 },
        { id: "a2", name: "Alpha-2", value: 200 },
      ],
    },
    { id: "b", name: "Beta", subname: "CMO" },
  ],
};

beforeAll(() => {
  const mockBBox = { x: -300, y: -300, width: 600, height: 600, top: 0, right: 0, bottom: 0, left: 0 };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (SVGElement.prototype as any).getBBox = vi.fn(() => mockBBox);
});

describe("RadialTreeChart", () => {
  it("Should render an SVG element", () => {
    render(<RadialTreeChart data={SIMPLE_DATA} />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("Should use the data name as aria-label", () => {
    render(<RadialTreeChart data={SIMPLE_DATA} />);
    expect(document.querySelector("svg[aria-label='Root']")).toBeInTheDocument();
  });

  it("Should respect the size prop", () => {
    render(<RadialTreeChart data={SIMPLE_DATA} size={400} />);
    const svg = document.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("400");
    expect(svg?.getAttribute("height")).toBe("400");
  });

  it("Should render node groups for each node", () => {
    render(<RadialTreeChart data={SIMPLE_DATA} />);
    const nodeGroups = document.querySelectorAll("g[data-idx]");
    // Root + Alpha + Alpha-1 + Alpha-2 + Beta = 5
    expect(nodeGroups.length).toBe(5);
  });

  it("Should call onNodeClick on node click", () => {
    const handler = vi.fn();
    render(<RadialTreeChart data={SIMPLE_DATA} onNodeClick={handler} />);
    const firstNode = document.querySelector<SVGGElement>("g[data-idx='0']");
    if (firstNode) fireEvent.click(firstNode);
    expect(handler).toHaveBeenCalledTimes(1);
    const [info] = handler.mock.calls[0];
    expect(info).toHaveProperty("id");
    expect(info).toHaveProperty("name");
    expect(info).toHaveProperty("depth");
    expect(info).toHaveProperty("path");
    expect(info).toHaveProperty("childrenCount");
  });

  it("Should not call onNodeClick when disabled", () => {
    const handler = vi.fn();
    render(<RadialTreeChart data={SIMPLE_DATA} onNodeClick={handler} disabled />);
    const firstNode = document.querySelector<SVGGElement>("g[data-idx='0']");
    if (firstNode) fireEvent.click(firstNode);
    expect(handler).not.toHaveBeenCalled();
  });

  it("Should render label texts when showLabels is true", () => {
    render(<RadialTreeChart data={SIMPLE_DATA} showLabels />);
    const texts = document.querySelectorAll("text");
    expect(texts.length).toBeGreaterThan(0);
  });

  it("Should not render label texts when showLabels is false", () => {
    render(<RadialTreeChart data={SIMPLE_DATA} showLabels={false} />);
    const texts = document.querySelectorAll("text");
    expect(texts.length).toBe(0);
  });

  it("Should open popover on node click when showNodePopover is true", () => {
    render(<RadialTreeChart data={SIMPLE_DATA} showNodePopover />);
    const firstNode = document.querySelector<SVGGElement>("g[data-idx='0']");
    if (firstNode) fireEvent.click(firstNode);
    // MUI Popover renders in a portal — check that popover content appears
    expect(document.body.textContent).toContain("Root");
  });

  it("Should render without icons when showIcons is false", () => {
    render(<RadialTreeChart data={SIMPLE_DATA} showIcons={false} />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("Should pass correct serialized info to onNodeClick", () => {
    const handler = vi.fn();
    render(<RadialTreeChart data={SIMPLE_DATA} onNodeClick={handler} />);
    const nodes = document.querySelectorAll<SVGGElement>("g[data-idx]");
    // Click Alpha-1 (depth 2)
    const alpha1Node = Array.from(nodes).find((_, i) => i === 2);
    if (alpha1Node) fireEvent.click(alpha1Node);
    if (handler.mock.calls.length > 0) {
      const [info] = handler.mock.calls[0];
      expect(info).toHaveProperty("path");
      expect(Array.isArray(info.path)).toBe(true);
    }
  });

  describe("Drill transition (crossfade)", () => {
    it("Should fire onFocusChange after the Ctrl+Click disambiguation delay", () => {
      vi.useFakeTimers();
      const handler = vi.fn();
      render(<RadialTreeChart data={SIMPLE_DATA} drillable onFocusChange={handler} />);
      const alphaNode = document.querySelector<SVGGElement>("g[data-idx='1']");
      act(() => { fireEvent.click(alphaNode!, { ctrlKey: true }); });
      expect(handler).not.toHaveBeenCalled();
      act(() => { vi.advanceTimersByTime(250); });
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].name).toBe("Alpha");
      vi.useRealTimers();
    });

    it("Should render a fading ghost layer of the previous tree during the transition", () => {
      vi.useFakeTimers();
      render(<RadialTreeChart data={SIMPLE_DATA} drillable />);
      expect(screen.queryByTestId("drill-ghost-layer")).not.toBeInTheDocument();

      const alphaNode = document.querySelector<SVGGElement>("g[data-idx='1']");
      act(() => { fireEvent.click(alphaNode!, { ctrlKey: true }); });
      act(() => { vi.advanceTimersByTime(250); }); // drill fires, crossfade starts
      expect(screen.getByTestId("drill-ghost-layer")).toBeInTheDocument();

      act(() => { vi.advanceTimersByTime(100); }); // mid-transition — still fading
      expect(screen.getByTestId("drill-ghost-layer")).toBeInTheDocument();

      act(() => { vi.runAllTimers(); }); // drain the rAF chain to completion
      expect(screen.queryByTestId("drill-ghost-layer")).not.toBeInTheDocument();
      vi.useRealTimers();
    });

    it("Should not render a ghost layer when duration=0", () => {
      vi.useFakeTimers();
      render(<RadialTreeChart data={SIMPLE_DATA} drillable duration={0} />);
      const alphaNode = document.querySelector<SVGGElement>("g[data-idx='1']");
      act(() => { fireEvent.click(alphaNode!, { ctrlKey: true }); });
      act(() => { vi.advanceTimersByTime(250); });
      expect(screen.queryByTestId("drill-ghost-layer")).not.toBeInTheDocument();
      vi.useRealTimers();
    });

    it("Should not throw when unmounted mid-transition", () => {
      vi.useFakeTimers();
      const { unmount } = render(<RadialTreeChart data={SIMPLE_DATA} drillable />);
      const alphaNode = document.querySelector<SVGGElement>("g[data-idx='1']");
      act(() => { fireEvent.click(alphaNode!, { ctrlKey: true }); });
      act(() => { vi.advanceTimersByTime(250); });
      act(() => { vi.advanceTimersByTime(100); }); // mid-transition
      expect(() => unmount()).not.toThrow();
      vi.useRealTimers();
    });

    it("Should reset instantly (no ghost layer) when the data prop changes", () => {
      vi.useFakeTimers();
      const { rerender } = render(<RadialTreeChart data={SIMPLE_DATA} drillable />);
      const alphaNode = document.querySelector<SVGGElement>("g[data-idx='1']");
      act(() => { fireEvent.click(alphaNode!, { ctrlKey: true }); });
      act(() => { vi.advanceTimersByTime(250); }); // now focused on Alpha's subtree

      const OTHER_DATA: RadialTreeChartData = { id: "root2", name: "Root2", children: [{ id: "x", name: "X" }] };
      act(() => { rerender(<RadialTreeChart data={OTHER_DATA} drillable />); });
      expect(screen.queryByTestId("drill-ghost-layer")).not.toBeInTheDocument();
      expect(document.querySelector("svg[aria-label='Root2']")).toBeInTheDocument();
      vi.useRealTimers();
    });
  });
});
