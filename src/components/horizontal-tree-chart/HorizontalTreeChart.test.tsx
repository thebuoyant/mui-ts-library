import { render, fireEvent, act, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { HorizontalTreeChart } from "./HorizontalTreeChart";
import type { HorizontalTreeData } from "./HorizontalTreeChart.types";

const SIMPLE_DATA: HorizontalTreeData = {
  id: "root", name: "Platform",
  children: [
    { id: "fe", name: "Frontend", subname: "React",
      children: [
        { id: "web",    name: "Web App",  value: 100 },
        { id: "mobile", name: "Mobile",   value: 80  },
      ],
    },
    { id: "be", name: "Backend", subname: "Node.js" },
  ],
};

beforeAll(() => {
  const mockBBox = { x: -400, y: -250, width: 800, height: 500, top: 0, right: 0, bottom: 0, left: 0 };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (SVGElement.prototype as any).getBBox = vi.fn(() => mockBBox);
});

describe("HorizontalTreeChart", () => {
  it("Should render an SVG element", () => {
    render(<HorizontalTreeChart data={SIMPLE_DATA} />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("Should use the data name as aria-label", () => {
    render(<HorizontalTreeChart data={SIMPLE_DATA} />);
    expect(document.querySelector("svg[aria-label='Platform']")).toBeInTheDocument();
  });

  it("Should respect width and height props", () => {
    render(<HorizontalTreeChart data={SIMPLE_DATA} width={600} height={400} />);
    const svg = document.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("600");
    expect(svg?.getAttribute("height")).toBe("400");
  });

  it("Should render node groups for all nodes", () => {
    render(<HorizontalTreeChart data={SIMPLE_DATA} />);
    // Platform + Frontend + Backend + Web App + Mobile = 5
    const groups = document.querySelectorAll("g[style*='cursor']");
    expect(groups.length).toBe(5);
  });

  it("Should call onNodeClick on regular click", () => {
    const handler = vi.fn();
    render(<HorizontalTreeChart data={SIMPLE_DATA} onNodeClick={handler} />);
    const firstGroup = document.querySelector<SVGGElement>("g[style*='cursor']");
    if (firstGroup) fireEvent.click(firstGroup);
    expect(handler).toHaveBeenCalledTimes(1);
    const [info] = handler.mock.calls[0];
    expect(info).toHaveProperty("name");
    expect(info).toHaveProperty("depth");
    expect(info).toHaveProperty("path");
  });

  it("Should not fire onNodeClick when disabled", () => {
    const handler = vi.fn();
    render(<HorizontalTreeChart data={SIMPLE_DATA} onNodeClick={handler} disabled />);
    const firstGroup = document.querySelector<SVGGElement>("g[style*='cursor']");
    if (firstGroup) fireEvent.click(firstGroup);
    expect(handler).not.toHaveBeenCalled();
  });

  it("Should render all 4 orientations without crash", () => {
    for (const orientation of ["LR", "RL", "TB", "BT"] as const) {
      const { unmount } = render(<HorizontalTreeChart data={SIMPLE_DATA} orientation={orientation} />);
      expect(document.querySelector("svg")).toBeInTheDocument();
      unmount();
    }
  });

  it("Should render labels when showLabels is true", () => {
    render(<HorizontalTreeChart data={SIMPLE_DATA} showLabels />);
    const texts = document.querySelectorAll("text");
    expect(texts.length).toBeGreaterThan(0);
  });

  it("Should not render labels when showLabels is false", () => {
    render(<HorizontalTreeChart data={SIMPLE_DATA} showLabels={false} />);
    expect(document.querySelector("text")).not.toBeInTheDocument();
  });

  it("Should apply colorConfig fill from node data", () => {
    const dataWithColor: HorizontalTreeData = {
      ...SIMPLE_DATA,
      colorConfig: { fill: "#FF0000" },
    };
    render(<HorizontalTreeChart data={dataWithColor} />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("Should default linkStrokeOpacity to 1", () => {
    render(<HorizontalTreeChart data={SIMPLE_DATA} />);
    const linkGroup = document.querySelector<SVGGElement>("g[fill='none']");
    expect(linkGroup?.getAttribute("stroke-opacity")).toBe("1");
  });

  it("Should respect explicit linkStrokeOpacity prop", () => {
    render(<HorizontalTreeChart data={SIMPLE_DATA} linkStrokeOpacity={0.4} />);
    const linkGroup = document.querySelector<SVGGElement>("g[fill='none']");
    expect(linkGroup?.getAttribute("stroke-opacity")).toBe("0.4");
  });

  // Regression: the RL/BT mirror pivot used the hardcoded layoutH * 0.85 cap,
  // but the tree layout's actual depth-axis extent is
  // min(maxDepth * levelSpacing, layoutH * 0.85) — for a shallow tree (here:
  // maxDepth=2, levelSpacing=200 → 400, vs. layoutH=500 * 0.85 = 425) those
  // values diverge, so the mirrored tree rendered 25px off-center.
  it("Should mirror RL orientation around the actual used depth extent, not the hardcoded layoutH*0.85 cap", () => {
    render(<HorizontalTreeChart data={SIMPLE_DATA} orientation="RL" width={800} height={500} levelSpacing={200} />);
    const rootGroup = document.querySelectorAll<SVGGElement>("g[style*='cursor']")[0];
    // Root node: depth=0 → node.y=0 → x = depthExtent - 0 = min(2*200, 500*0.85) = 400
    const [x] = rootGroup.getAttribute("transform")!.match(/-?\d+(\.\d+)?/g)!;
    expect(Number(x)).toBe(400);
  });

  it("Should mirror BT orientation around the actual used depth extent, not the hardcoded layoutH*0.85 cap", () => {
    render(<HorizontalTreeChart data={SIMPLE_DATA} orientation="BT" width={800} height={500} levelSpacing={200} />);
    const rootGroup = document.querySelectorAll<SVGGElement>("g[style*='cursor']")[0];
    // BT: isVertical → layoutH = width = 800; depthExtent = min(2*200, 800*0.85) = 400
    const [, y] = rootGroup.getAttribute("transform")!.match(/-?\d+(\.\d+)?/g)!;
    expect(Number(y)).toBe(400);
  });

  describe("Drill transition (crossfade)", () => {
    // Sorted by name: Platform(0), Backend(1), Frontend(2, has children), Mobile(3), Web App(4)
    function getFrontendNode() {
      return document.querySelectorAll<SVGGElement>("g[style*='cursor']")[2];
    }

    // Regression: Escape reset focus/zoom but never cancelled a drill still
    // inside its 250ms disambiguation window — the stale timer fired
    // afterwards and silently re-drilled in, contradicting the reset.
    it("Should cancel a pending drill when Escape is pressed inside the disambiguation window", () => {
      vi.useFakeTimers();
      const handler = vi.fn();
      render(<HorizontalTreeChart data={SIMPLE_DATA} drillable onFocusChange={handler} />);
      act(() => { fireEvent.click(getFrontendNode(), { ctrlKey: true }); });
      act(() => { fireEvent.keyDown(window, { key: "Escape" }); });
      // Escape itself fires onFocusChange(root) synchronously — that's expected.
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenLastCalledWith(expect.objectContaining({ isRoot: true }));

      act(() => { vi.advanceTimersByTime(250); });
      expect(handler).toHaveBeenCalledTimes(1);
      vi.useRealTimers();
    });

    it("Should not throw or fire onFocusChange when unmounted inside the disambiguation window", () => {
      vi.useFakeTimers();
      const handler = vi.fn();
      const { unmount } = render(<HorizontalTreeChart data={SIMPLE_DATA} drillable onFocusChange={handler} />);
      act(() => { fireEvent.click(getFrontendNode(), { ctrlKey: true }); });

      expect(() => unmount()).not.toThrow();
      expect(() => act(() => { vi.advanceTimersByTime(250); })).not.toThrow();
      expect(handler).not.toHaveBeenCalled();
      vi.useRealTimers();
    });

    it("Should fire onFocusChange after the Ctrl+Click disambiguation delay", () => {
      vi.useFakeTimers();
      const handler = vi.fn();
      render(<HorizontalTreeChart data={SIMPLE_DATA} drillable onFocusChange={handler} />);
      act(() => { fireEvent.click(getFrontendNode(), { ctrlKey: true }); });
      expect(handler).not.toHaveBeenCalled();
      act(() => { vi.advanceTimersByTime(250); });
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].focusedNode.name).toBe("Frontend");
      vi.useRealTimers();
    });

    it("Should render a fading ghost layer of the previous tree during the transition", () => {
      vi.useFakeTimers();
      render(<HorizontalTreeChart data={SIMPLE_DATA} drillable />);
      expect(screen.queryByTestId("drill-ghost-layer")).not.toBeInTheDocument();

      act(() => { fireEvent.click(getFrontendNode(), { ctrlKey: true }); });
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
      render(<HorizontalTreeChart data={SIMPLE_DATA} drillable duration={0} />);
      act(() => { fireEvent.click(getFrontendNode(), { ctrlKey: true }); });
      act(() => { vi.advanceTimersByTime(250); });
      expect(screen.queryByTestId("drill-ghost-layer")).not.toBeInTheDocument();
      vi.useRealTimers();
    });

    it("Should not throw when unmounted mid-transition", () => {
      vi.useFakeTimers();
      const { unmount } = render(<HorizontalTreeChart data={SIMPLE_DATA} drillable />);
      act(() => { fireEvent.click(getFrontendNode(), { ctrlKey: true }); });
      act(() => { vi.advanceTimersByTime(250); });
      act(() => { vi.advanceTimersByTime(100); }); // mid-transition
      expect(() => unmount()).not.toThrow();
      vi.useRealTimers();
    });

    it("Should reset instantly (no ghost layer) when the data prop changes", () => {
      vi.useFakeTimers();
      const { rerender } = render(<HorizontalTreeChart data={SIMPLE_DATA} drillable />);
      act(() => { fireEvent.click(getFrontendNode(), { ctrlKey: true }); });
      act(() => { vi.advanceTimersByTime(250); }); // now focused on Frontend's subtree

      const OTHER_DATA: HorizontalTreeData = { id: "root2", name: "Root2", children: [{ id: "x", name: "X" }] };
      act(() => { rerender(<HorizontalTreeChart data={OTHER_DATA} drillable />); });
      expect(screen.queryByTestId("drill-ghost-layer")).not.toBeInTheDocument();
      expect(document.querySelector("svg[aria-label='Root2']")).toBeInTheDocument();
      vi.useRealTimers();
    });
  });

  describe("No data", () => {
    const EMPTY_DATA: HorizontalTreeData = { id: "root", name: "Root" };

    it("Should show the default noData message when data has no children and no value", () => {
      render(<HorizontalTreeChart data={EMPTY_DATA} />);
      expect(screen.getByText("No data")).toBeInTheDocument();
    });

    it("Should use a custom translation for noData", () => {
      render(<HorizontalTreeChart data={EMPTY_DATA} translation={{ noData: "Keine Daten" }} />);
      expect(screen.getByText("Keine Daten")).toBeInTheDocument();
    });

    it("Should not show the noData message when data has children", () => {
      render(<HorizontalTreeChart data={SIMPLE_DATA} />);
      expect(screen.queryByText("No data")).not.toBeInTheDocument();
    });
  });
});
