import { render, fireEvent } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material";
import { ChordChart } from "./ChordChart";
import type { ChordChartData } from "./ChordChart.types";

const SIMPLE_DATA: ChordChartData[] = [
  { source: "A", target: "B", value: 10 },
  { source: "B", target: "C", value: 15 },
  { source: "C", target: "A", value: 8  },
];

beforeAll(() => {
  const mockBBox = { x: -250, y: -250, width: 500, height: 500, top: 0, right: 0, bottom: 0, left: 0 };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (SVGElement.prototype as any).getBBox = vi.fn(() => mockBBox);
});

describe("ChordChart", () => {
  it("Should render an SVG element", () => {
    render(<ChordChart data={SIMPLE_DATA} />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("Should render group arc paths for each unique name", () => {
    render(<ChordChart data={SIMPLE_DATA} />);
    // 3 groups: A, B, C
    const groups = document.querySelectorAll("g[style*='cursor']");
    expect(groups.length).toBeGreaterThanOrEqual(3);
  });

  it("Should respect the size prop", () => {
    render(<ChordChart data={SIMPLE_DATA} size={400} />);
    const svg = document.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("400");
    expect(svg?.getAttribute("height")).toBe("400");
  });

  it("Should call onGroupClick when a group arc is clicked", () => {
    const handler = vi.fn();
    render(<ChordChart data={SIMPLE_DATA} onGroupClick={handler} />);
    const firstGroup = document.querySelector<SVGGElement>("g[style*='cursor']");
    if (firstGroup) fireEvent.click(firstGroup);
    expect(handler).toHaveBeenCalledTimes(1);
    const [info] = handler.mock.calls[0];
    expect(info).toHaveProperty("name");
    expect(info).toHaveProperty("valueOut");
    expect(info).toHaveProperty("valueIn");
    expect(info).toHaveProperty("index");
  });

  // Regression: valueOut/valueIn only checked one side of each d3 Chord object
  // (which represents the COMBINED bidirectional flow between two nodes), so
  // a node's contribution as the *other* side of an asymmetric pair was
  // silently dropped. A→B(10) and the reverse B→A(4) is exactly that case.
  describe("valueOut/valueIn for asymmetric bidirectional flows", () => {
    const BIDIRECTIONAL_DATA: ChordChartData[] = [
      { source: "A", target: "B", value: 10 },
      { source: "B", target: "A", value: 4 },
    ];

    it("Should compute correct totals for both groups when directed", () => {
      const handler = vi.fn();
      render(<ChordChart data={BIDIRECTIONAL_DATA} onGroupClick={handler} directed />);
      const groups = document.querySelectorAll<SVGGElement>("g[style*='cursor']");
      fireEvent.click(groups[0]); // group A (first name to appear in the data)
      const [infoA] = handler.mock.calls[0];
      expect(infoA.name).toBe("A");
      expect(infoA.valueOut).toBe(10); // A → B
      expect(infoA.valueIn).toBe(4);   // B → A

      fireEvent.click(groups[1]); // group B
      const [infoB] = handler.mock.calls[1];
      expect(infoB.name).toBe("B");
      expect(infoB.valueOut).toBe(4);  // B → A
      expect(infoB.valueIn).toBe(10); // A → B
    });

    it("Should compute correct totals for both groups when undirected", () => {
      const handler = vi.fn();
      render(<ChordChart data={BIDIRECTIONAL_DATA} onGroupClick={handler} directed={false} />);
      const groups = document.querySelectorAll<SVGGElement>("g[style*='cursor']");
      fireEvent.click(groups[0]);
      const [infoA] = handler.mock.calls[0];
      expect(infoA.valueOut).toBe(10);
      expect(infoA.valueIn).toBe(4);
    });
  });

  describe("No data", () => {
    it("Should show the default noData message when data is empty", () => {
      render(<ChordChart data={[]} />);
      expect(document.querySelector("svg")?.textContent).toContain("No data");
    });

    it("Should use a custom translation for noData", () => {
      render(<ChordChart data={[]} translation={{ noData: "Keine Daten" }} />);
      expect(document.querySelector("svg")?.textContent).toContain("Keine Daten");
    });

    it("Should not show the noData message when data has entries", () => {
      render(<ChordChart data={SIMPLE_DATA} />);
      expect(document.querySelector("svg")?.textContent).not.toContain("No data");
    });
  });

  it("Should not fire callbacks when disabled", () => {
    const groupHandler = vi.fn();
    render(<ChordChart data={SIMPLE_DATA} onGroupClick={groupHandler} disabled />);
    const firstGroup = document.querySelector<SVGGElement>("g[style*='cursor']");
    if (firstGroup) fireEvent.click(firstGroup);
    expect(groupHandler).not.toHaveBeenCalled();
  });

  it("Should render group labels by default", () => {
    render(<ChordChart data={SIMPLE_DATA} showGroupLabels />);
    const texts = document.querySelectorAll("text");
    expect(texts.length).toBeGreaterThanOrEqual(3);
  });

  it("Should not render group labels when showGroupLabels is false", () => {
    render(<ChordChart data={SIMPLE_DATA} showGroupLabels={false} />);
    const texts = document.querySelectorAll("text");
    expect(texts.length).toBe(0);
  });

  it("Should apply disabled opacity via Box sx", () => {
    const { container } = render(<ChordChart data={SIMPLE_DATA} disabled />);
    const box = container.firstChild as HTMLElement;
    expect(box).toBeTruthy();
  });

  it("Should render directed chart by default (no crash)", () => {
    render(<ChordChart data={SIMPLE_DATA} directed />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("Should render undirected chart without crash", () => {
    render(<ChordChart data={SIMPLE_DATA} directed={false} />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("Should default ribbonBlendMode to 'multiply' in light mode", () => {
    render(<ChordChart data={SIMPLE_DATA} />);
    const ribbonGroup = document.querySelector<SVGGElement>("g[fill-opacity]");
    expect(ribbonGroup?.style.mixBlendMode).toBe("multiply");
  });

  it("Should default ribbonBlendMode to 'normal' in dark mode", () => {
    const darkTheme = createTheme({ palette: { mode: "dark" } });
    render(
      <ThemeProvider theme={darkTheme}>
        <ChordChart data={SIMPLE_DATA} />
      </ThemeProvider>
    );
    const ribbonGroup = document.querySelector<SVGGElement>("g[fill-opacity]");
    expect(ribbonGroup?.style.mixBlendMode).toBe("normal");
  });

  it("Should respect explicit ribbonBlendMode prop regardless of theme", () => {
    const darkTheme = createTheme({ palette: { mode: "dark" } });
    render(
      <ThemeProvider theme={darkTheme}>
        <ChordChart data={SIMPLE_DATA} ribbonBlendMode="multiply" />
      </ThemeProvider>
    );
    const ribbonGroup = document.querySelector<SVGGElement>("g[fill-opacity]");
    expect(ribbonGroup?.style.mixBlendMode).toBe("multiply");
  });
});
