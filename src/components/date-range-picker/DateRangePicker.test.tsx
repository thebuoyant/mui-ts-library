import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DateRangePicker } from "./DateRangePicker";

const START = new Date("2026-01-15T00:00:00");
const END   = new Date("2026-03-31T00:00:00");

function getStart() { return screen.getByTestId("date-range-start") as HTMLInputElement; }
function getEnd()   { return screen.getByTestId("date-range-end")   as HTMLInputElement; }

describe("DateRangePicker", () => {
  it("renders From and To inputs", () => {
    render(<DateRangePicker />);
    expect(getStart()).toBeInTheDocument();
    expect(getEnd()).toBeInTheDocument();
  });

  it("displays the controlled value", () => {
    render(<DateRangePicker value={{ start: START, end: END }} />);
    expect(getStart().value).toBe("2026-01-15");
    expect(getEnd().value).toBe("2026-03-31");
  });

  it("calls onChange with DateRangeEntry objects when start date changes", () => {
    const onChange = vi.fn();
    render(<DateRangePicker value={{ start: null, end: END }} onChange={onChange} />);
    fireEvent.change(getStart(), { target: { value: "2026-01-10" } });
    expect(onChange).toHaveBeenCalledWith({
      start: { date: new Date("2026-01-10T00:00:00"), iso: "2026-01-10" },
      end:   { date: END, iso: "2026-03-31" },
    });
  });

  it("calls onChange with DateRangeEntry objects when end date changes", () => {
    const onChange = vi.fn();
    render(<DateRangePicker value={{ start: START, end: null }} onChange={onChange} />);
    fireEvent.change(getEnd(), { target: { value: "2026-06-30" } });
    expect(onChange).toHaveBeenCalledWith({
      start: { date: START, iso: "2026-01-15" },
      end:   { date: new Date("2026-06-30T00:00:00"), iso: "2026-06-30" },
    });
  });

  it("clears end and returns null entry when new start is after current end", () => {
    const onChange = vi.fn();
    render(<DateRangePicker value={{ start: START, end: END }} onChange={onChange} />);
    fireEvent.change(getStart(), { target: { value: "2026-04-01" } });
    expect(onChange).toHaveBeenCalledWith({
      start: { date: new Date("2026-04-01T00:00:00"), iso: "2026-04-01" },
      end:   null,
    });
  });

  it("end input min is set to the selected start value", () => {
    render(<DateRangePicker value={{ start: START, end: END }} />);
    expect(getEnd().min).toBe("2026-01-15");
  });

  it("applies minDate and maxDate as HTML attributes", () => {
    const min = new Date("2025-01-01T00:00:00");
    const max = new Date("2027-12-31T00:00:00");
    render(<DateRangePicker minDate={min} maxDate={max} />);
    expect(getStart().min).toBe("2025-01-01");
    expect(getStart().max).toBe("2027-12-31");
    expect(getEnd().max).toBe("2027-12-31");
  });

  it("renders with custom translation labels", () => {
    render(<DateRangePicker translation={{ fromLabel: "Von", toLabel: "Bis" }} />);
    expect(screen.getByLabelText("Von")).toBeInTheDocument();
    expect(screen.getByLabelText("Bis")).toBeInTheDocument();
  });

  it("disables both inputs when disabled=true", () => {
    render(<DateRangePicker disabled />);
    expect(getStart()).toBeDisabled();
    expect(getEnd()).toBeDisabled();
  });

  it("works in uncontrolled mode and reflects local state changes", () => {
    render(<DateRangePicker defaultValue={{ start: START, end: END }} />);
    expect(getStart().value).toBe("2026-01-15");
    fireEvent.change(getStart(), { target: { value: "2026-02-01" } });
    expect(getStart().value).toBe("2026-02-01");
  });

  it("iso field matches YYYY-MM-DD format", () => {
    const onChange = vi.fn();
    render(<DateRangePicker value={{ start: null, end: null }} onChange={onChange} />);
    fireEvent.change(getStart(), { target: { value: "2026-07-04" } });
    const call = onChange.mock.calls[0][0];
    expect(call.start.iso).toBe("2026-07-04");
    expect(call.start.iso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
