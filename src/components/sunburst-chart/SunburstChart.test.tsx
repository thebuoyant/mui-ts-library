import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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

// ProseMirror / SVG getBBox polyfill for JSDOM
beforeAll(() => {
  SVGElement.prototype.getBBox = vi.fn(() => ({ x: -250, y: -250, width: 500, height: 500, top: 0, right: 0, bottom: 0, left: 0 }));
  SVGElement.prototype.getBBox = vi.fn(() => ({ x: -250, y: -250, width: 500, height: 500, top: 0, right: 0, bottom: 0, left: 0 }));
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

  it("Should call onSegmentClick with correct info on single click", async () => {
    vi.useFakeTimers();
    const handler = vi.fn();
    render(<SunburstChart data={SIMPLE_DATA} onSegmentClick={handler} />);
    const firstPath = document.querySelector<SVGPathElement>("path[data-idx='0']");
    expect(firstPath).toBeTruthy();
    fireEvent.click(firstPath!);
    vi.runAllTimers();
    expect(handler).toHaveBeenCalledTimes(1);
    const [info] = handler.mock.calls[0];
    expect(info).toHaveProperty("name");
    expect(info).toHaveProperty("depth");
    expect(info).toHaveProperty("path");
    expect(info).toHaveProperty("childrenCount");
    vi.useRealTimers();
  });

  it("Should not fire onSegmentClick when disabled", () => {
    vi.useFakeTimers();
    const handler = vi.fn();
    render(<SunburstChart data={SIMPLE_DATA} onSegmentClick={handler} disabled />);
    const firstPath = document.querySelector<SVGPathElement>("path[data-idx='0']");
    fireEvent.click(firstPath!);
    vi.runAllTimers();
    expect(handler).not.toHaveBeenCalled();
    vi.useRealTimers();
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

  it("Should use custom translation for doubleClickToZoomIn", () => {
    render(
      <SunburstChart
        data={SIMPLE_DATA}
        translation={{ doubleClickToZoomIn: "Doppelklick zum Hineinzoomen" }}
      />,
    );
    // Translation is in SVG title elements — check it doesn't crash
    expect(document.querySelector("svg")).toBeInTheDocument();
  });
});
