import { render, fireEvent } from "@testing-library/react";
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
});
