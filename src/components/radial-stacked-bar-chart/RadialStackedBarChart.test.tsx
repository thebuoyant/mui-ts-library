import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RadialStackedBarChart } from "./RadialStackedBarChart";

const KEYS = [
  { key: "a", label: "Series A" },
  { key: "b", label: "Series B" },
];

const DATA = [
  { id: "foo", label: "Foo", values: { a: 100, b: 200 } },
  { id: "bar", label: "Bar", values: { a: 150, b: 50  } },
];

const SINGLE = [{ id: "only", label: "Only", values: { a: 50, b: 50 } }];

describe("RadialStackedBarChart", () => {
  // ── smoke ──────────────────────────────────────────────────────────────────

  it("renders without crashing", () => {
    render(<RadialStackedBarChart data={DATA} keys={KEYS} />);
    expect(document.querySelector("svg")).toBeTruthy();
  });

  it("renders an SVG with role=img", () => {
    render(<RadialStackedBarChart data={DATA} keys={KEYS} />);
    expect(document.querySelector('svg[role="img"]')).toBeTruthy();
  });

  // ── empty state ────────────────────────────────────────────────────────────

  it("shows noData label when data is empty", () => {
    render(<RadialStackedBarChart data={[]} keys={KEYS} />);
    expect(screen.getByText("No data")).toBeTruthy();
  });

  it("shows noData label when keys is empty", () => {
    render(<RadialStackedBarChart data={DATA} keys={[]} />);
    expect(screen.getByText("No data")).toBeTruthy();
  });

  it("respects custom noData translation", () => {
    render(
      <RadialStackedBarChart
        data={[]}
        keys={KEYS}
        translation={{ noData: "Keine Daten" }}
      />,
    );
    expect(screen.getByText("Keine Daten")).toBeTruthy();
  });

  // ── string keys ────────────────────────────────────────────────────────────

  it("accepts string[] as keys", () => {
    render(<RadialStackedBarChart data={DATA} keys={["a", "b"]} />);
    expect(document.querySelector("svg")).toBeTruthy();
  });

  // ── bar segments rendered ──────────────────────────────────────────────────

  it("renders path elements for each bar × key combination", () => {
    const { container } = render(<RadialStackedBarChart data={DATA} keys={KEYS} />);
    // 2 bars × 2 keys = 4 paths (excluding grid / deco paths)
    const paths = container.querySelectorAll("path");
    expect(paths.length).toBeGreaterThanOrEqual(4);
  });

  it("renders paths for a single-bar dataset", () => {
    const { container } = render(<RadialStackedBarChart data={SINGLE} keys={KEYS} />);
    const paths = container.querySelectorAll("path");
    expect(paths.length).toBeGreaterThanOrEqual(2);
  });

  // ── size prop ──────────────────────────────────────────────────────────────

  it("applies size to svg width and height", () => {
    render(<RadialStackedBarChart data={DATA} keys={KEYS} size={400} />);
    const svg = document.querySelector("svg")!;
    expect(svg.getAttribute("width")).toBe("400");
    expect(svg.getAttribute("height")).toBe("400");
  });

  // ── disabled ───────────────────────────────────────────────────────────────

  it("applies reduced opacity when disabled", () => {
    const { container } = render(
      <RadialStackedBarChart data={DATA} keys={KEYS} disabled />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.opacity).toBe("0.5");
  });

  // ── onBarClick ────────────────────────────────────────────────────────────

  it("fires onBarClick when a segment is clicked", () => {
    const handler = vi.fn();
    const { container } = render(
      <RadialStackedBarChart data={DATA} keys={KEYS} onBarClick={handler} />,
    );
    const path = container.querySelector("path")!;
    fireEvent.click(path);
    expect(handler).toHaveBeenCalledTimes(1);
    const [info] = handler.mock.calls[0];
    expect(info).toHaveProperty("id");
    expect(info).toHaveProperty("seriesKey");
    expect(info).toHaveProperty("total");
    expect(info).toHaveProperty("values");
  });

  it("does not fire onBarClick when disabled", () => {
    const handler = vi.fn();
    const { container } = render(
      <RadialStackedBarChart data={DATA} keys={KEYS} onBarClick={handler} disabled />,
    );
    const path = container.querySelector("path")!;
    fireEvent.click(path);
    expect(handler).not.toHaveBeenCalled();
  });

  // ── labels ─────────────────────────────────────────────────────────────────

  it("renders outer bar labels by default", () => {
    render(<RadialStackedBarChart data={DATA} keys={KEYS} />);
    expect(screen.getByText("Foo")).toBeTruthy();
    expect(screen.getByText("Bar")).toBeTruthy();
  });

  it("hides outer labels when showLabels={false}", () => {
    render(<RadialStackedBarChart data={DATA} keys={KEYS} showLabels={false} />);
    expect(screen.queryByText("Foo")).toBeNull();
  });

  // ── legend ─────────────────────────────────────────────────────────────────

  it("renders legend labels by default", () => {
    render(<RadialStackedBarChart data={DATA} keys={KEYS} />);
    expect(screen.getByText("Series A")).toBeTruthy();
    expect(screen.getByText("Series B")).toBeTruthy();
  });

  it("hides legend when showLegend={false}", () => {
    render(<RadialStackedBarChart data={DATA} keys={KEYS} showLegend={false} />);
    expect(screen.queryByText("Series A")).toBeNull();
  });

  // ── colorConfig ────────────────────────────────────────────────────────────

  it("applies colorConfig fill to the correct series paths", () => {
    const { container } = render(
      <RadialStackedBarChart
        data={SINGLE}
        keys={KEYS}
        colorConfig={{ a: { fill: "#ff0000" } }}
      />,
    );
    const redPaths = Array.from(container.querySelectorAll("path")).filter(
      (p) => p.getAttribute("fill") === "#ff0000",
    );
    expect(redPaths.length).toBeGreaterThanOrEqual(1);
  });

  // ── sortBy ─────────────────────────────────────────────────────────────────

  it("renders without error with sortBy='value'", () => {
    render(<RadialStackedBarChart data={DATA} keys={KEYS} sortBy="value" />);
    expect(document.querySelector("svg")).toBeTruthy();
  });

  it("renders without error with sortBy='label'", () => {
    render(<RadialStackedBarChart data={DATA} keys={KEYS} sortBy="label" />);
    expect(document.querySelector("svg")).toBeTruthy();
  });

  // ── grid ───────────────────────────────────────────────────────────────────

  it("renders circle elements for grid lines by default", () => {
    const { container } = render(<RadialStackedBarChart data={DATA} keys={KEYS} />);
    const circles = container.querySelectorAll("circle");
    // At least 1 grid ring + 1 inner ring
    expect(circles.length).toBeGreaterThanOrEqual(2);
  });

  it("hides grid lines when showGridLines={false}", () => {
    const { container } = render(
      <RadialStackedBarChart data={DATA} keys={KEYS} showGridLines={false} />,
    );
    const circles = container.querySelectorAll("circle");
    expect(circles.length).toBe(0);
  });

  // ── custom gridValueFormatter ──────────────────────────────────────────────

  it("uses custom gridValueFormatter for grid value labels", () => {
    render(
      <RadialStackedBarChart
        data={DATA}
        keys={KEYS}
        gridValueFormatter={(v) => `€${v}`}
      />,
    );
    // At least one formatted label should be present
    const formatted = screen.queryAllByText(/^€\d/);
    expect(formatted.length).toBeGreaterThanOrEqual(1);
  });

  // ── onBarHover ─────────────────────────────────────────────────────────────

  describe("onBarHover", () => {
    it("calls onBarHover with bar info on mouse enter", () => {
      const onBarHover = vi.fn();
      render(<RadialStackedBarChart data={DATA} keys={KEYS} onBarHover={onBarHover} />);
      const paths = document.querySelectorAll<SVGPathElement>("path[d]");
      const barPath = Array.from(paths).find((p) => p.getAttribute("d") && p.getAttribute("d")!.length > 5);
      fireEvent.mouseEnter(barPath!);
      expect(onBarHover).toHaveBeenCalledOnce();
      expect(onBarHover.mock.calls[0][0]).not.toBeNull();
      expect(onBarHover.mock.calls[0][0]).toMatchObject({ id: expect.any(String), seriesKey: expect.any(String) });
    });

    it("calls onBarHover with null on mouse leave", () => {
      const onBarHover = vi.fn();
      render(<RadialStackedBarChart data={DATA} keys={KEYS} onBarHover={onBarHover} />);
      const paths = document.querySelectorAll<SVGPathElement>("path[d]");
      const barPath = Array.from(paths).find((p) => p.getAttribute("d") && p.getAttribute("d")!.length > 5);
      fireEvent.mouseEnter(barPath!);
      fireEvent.mouseLeave(barPath!);
      expect(onBarHover).toHaveBeenCalledTimes(2);
      expect(onBarHover.mock.calls[1][0]).toBeNull();
    });
  });
});
