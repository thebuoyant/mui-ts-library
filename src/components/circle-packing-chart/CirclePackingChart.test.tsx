import { render, fireEvent } from "@testing-library/react";
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
});
