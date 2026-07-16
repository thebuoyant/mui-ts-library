import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DateRangePicker } from "./DateRangePicker";

const START = new Date("2026-01-15T00:00:00");
const END   = new Date("2026-03-31T00:00:00");

function getStart() { return screen.getByTestId("date-range-start") as HTMLInputElement; }
function getEnd()   { return screen.getByTestId("date-range-end")   as HTMLInputElement; }

describe("DateRangePicker", () => {
  // ── Rendering ────────────────────────────────────────────────────────────────
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

  // ── onChange / value ──────────────────────────────────────────────────────────
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

  it("iso field matches YYYY-MM-DD format", () => {
    const onChange = vi.fn();
    render(<DateRangePicker value={{ start: null, end: null }} onChange={onChange} />);
    fireEvent.change(getStart(), { target: { value: "2026-07-04" } });
    const call = onChange.mock.calls[0][0];
    expect(call.start.iso).toBe("2026-07-04");
    expect(call.start.iso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("works in uncontrolled mode", () => {
    render(<DateRangePicker defaultValue={{ start: START, end: END }} />);
    expect(getStart().value).toBe("2026-01-15");
    fireEvent.change(getStart(), { target: { value: "2026-02-01" } });
    expect(getStart().value).toBe("2026-02-01");
  });

  // ── min / max ─────────────────────────────────────────────────────────────────
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

  // ── Validation: end before start ─────────────────────────────────────────────
  it("shows end-before-start error immediately when end < start", () => {
    render(<DateRangePicker value={{ start: END, end: START }} />);
    expect(screen.getByText("End date must be after start date")).toBeInTheDocument();
  });

  it("does NOT show end-before-start error when end === start", () => {
    render(<DateRangePicker value={{ start: START, end: START }} />);
    expect(screen.queryByText("End date must be after start date")).not.toBeInTheDocument();
  });

  it("clears end-before-start error once end is corrected", () => {
    const { rerender } = render(<DateRangePicker value={{ start: END, end: START }} />);
    expect(screen.getByText("End date must be after start date")).toBeInTheDocument();
    rerender(<DateRangePicker value={{ start: START, end: END }} />);
    expect(screen.queryByText("End date must be after start date")).not.toBeInTheDocument();
  });

  it("no longer auto-clears end when start changes to a date after end", () => {
    const onChange = vi.fn();
    render(<DateRangePicker value={{ start: START, end: END }} onChange={onChange} />);
    fireEvent.change(getStart(), { target: { value: "2026-04-01" } });
    // end should still be END, not null
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ end: { date: END, iso: "2026-03-31" } }),
    );
  });

  it("uses custom translation for end-before-start error", () => {
    render(
      <DateRangePicker
        value={{ start: END, end: START }}
        translation={{ endBeforeStartError: "Enddatum muss nach Startdatum liegen" }}
      />,
    );
    expect(screen.getByText("Enddatum muss nach Startdatum liegen")).toBeInTheDocument();
  });

  // ── Validation: required ──────────────────────────────────────────────────────
  it("does not show required errors before the user has touched the fields", () => {
    render(<DateRangePicker required />);
    expect(screen.queryByText("Start date is required")).not.toBeInTheDocument();
    expect(screen.queryByText("End date is required")).not.toBeInTheDocument();
  });

  it("shows startRequiredError after start field is blurred", () => {
    render(<DateRangePicker required />);
    fireEvent.blur(getStart());
    expect(screen.getByText("Start date is required")).toBeInTheDocument();
  });

  it("shows endRequiredError after end field is blurred", () => {
    render(<DateRangePicker required />);
    fireEvent.blur(getEnd());
    expect(screen.getByText("End date is required")).toBeInTheDocument();
  });

  it("hides required error once a date is picked", () => {
    render(<DateRangePicker required defaultValue={{ start: null, end: null }} />);
    fireEvent.blur(getStart());
    expect(screen.getByText("Start date is required")).toBeInTheDocument();
    fireEvent.change(getStart(), { target: { value: "2026-01-01" } });
    expect(screen.queryByText("Start date is required")).not.toBeInTheDocument();
  });

  // ── External error + helperText ───────────────────────────────────────────────
  it("renders helperText below the picker", () => {
    render(<DateRangePicker helperText="Pick a valid project window" />);
    expect(screen.getByText("Pick a valid project window")).toBeInTheDocument();
  });

  it("renders helperText in error color when error=true", () => {
    render(<DateRangePicker error helperText="Invalid range" />);
    const helper = screen.getByText("Invalid range");
    expect(helper).toBeInTheDocument();
    // MUI renders error helper text with the error class
    expect(helper.className).toMatch(/error/i);
  });
});
