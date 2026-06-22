import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { SqlEditor } from "./SqlEditor";

const SAMPLE_SQL = "SELECT * FROM users WHERE id = 1;";
const MESSY_SQL  = "select * from   users where id=1";

beforeEach(() => {
  window.localStorage.clear();
});

describe("SqlEditor", () => {
  it("renders without crashing", () => {
    render(<SqlEditor />);
    expect(screen.getByRole("toolbar", { name: "SQL editor actions" })).toBeInTheDocument();
  });

  it("renders default toolbar buttons", () => {
    render(<SqlEditor />);
    expect(screen.getByRole("button", { name: "Format SQL" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy"        })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear"       })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Undo"        })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Redo"        })).toBeInTheDocument();
  });

  it("does not render the Execute button by default", () => {
    render(<SqlEditor onExecute={vi.fn()} />);
    expect(screen.queryByRole("button", { name: "Execute" })).not.toBeInTheDocument();
  });

  it("renders the Execute button when toolbarConfig.showExecute and onExecute are set", () => {
    render(<SqlEditor onExecute={vi.fn()} toolbarConfig={{ showExecute: true }} />);
    expect(screen.getByRole("button", { name: "Execute" })).toBeInTheDocument();
  });

  it("hides toolbar in readonly mode", () => {
    render(<SqlEditor readonly />);
    expect(screen.queryByRole("toolbar")).not.toBeInTheDocument();
  });

  it("shows helperText when provided", () => {
    render(<SqlEditor helperText="Read-only connection." />);
    expect(screen.getByText("Read-only connection.")).toBeInTheDocument();
  });

  it("creates a hidden input when name is provided", () => {
    render(<SqlEditor name="query" value={SAMPLE_SQL} />);
    const hidden = document.querySelector('input[type="hidden"][name="query"]') as HTMLInputElement;
    expect(hidden).toBeInTheDocument();
    expect(hidden.value).toBe(SAMPLE_SQL);
  });

  it("does not create a hidden input without name", () => {
    render(<SqlEditor value={SAMPLE_SQL} />);
    expect(document.querySelector('input[type="hidden"]')).not.toBeInTheDocument();
  });

  it("respects toolbarConfig to hide specific buttons", () => {
    render(<SqlEditor toolbarConfig={{ showFormat: false, showUndoRedo: false }} />);
    expect(screen.queryByRole("button", { name: "Format SQL" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Undo"       })).not.toBeInTheDocument();
    expect(screen.getByRole("button",   { name: "Copy"       })).toBeInTheDocument();
  });

  it("renders translated toolbar labels", () => {
    render(
      <SqlEditor
        translation={{
          format: "SQL formatieren",
          copy:   "Kopieren",
          clear:  "Leeren",
          undo:   "Rückgängig",
          redo:   "Wiederholen",
        }}
      />,
    );
    expect(screen.getByRole("button", { name: "SQL formatieren" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Kopieren"        })).toBeInTheDocument();
  });

  it("shows line/column footer by default", () => {
    render(<SqlEditor />);
    expect(screen.getByText("Ln 1, Col 1")).toBeInTheDocument();
  });

  it("does not render footer when showLineColumn=false and no helperText", () => {
    render(<SqlEditor showLineColumn={false} />);
    expect(screen.queryByText(/Ln/)).not.toBeInTheDocument();
  });

  it("renders with fixed height via numeric prop", () => {
    render(<SqlEditor height={400} />);
    const paper = document.querySelector(".MuiPaper-root") as HTMLElement;
    expect(paper).toBeInTheDocument();
  });

  it("renders with width prop", () => {
    render(<SqlEditor width={600} />);
    const wrapper = document.querySelector(".MuiBox-root") as HTMLElement;
    expect(wrapper).toBeInTheDocument();
  });

  it("renders for every supported dialect without crashing", () => {
    const dialects = ["standard", "mysql", "postgresql", "sqlite", "mssql"] as const;
    for (const dialect of dialects) {
      const { unmount } = render(<SqlEditor dialect={dialect} value={SAMPLE_SQL} />);
      expect(screen.getByRole("toolbar")).toBeInTheDocument();
      unmount();
    }
  });

  it("accepts a schema prop without crashing", () => {
    render(
      <SqlEditor
        schema={{ tables: [{ name: "users", columns: [{ name: "id", type: "int" }] }] }}
        value={SAMPLE_SQL}
      />,
    );
    expect(screen.getByRole("toolbar")).toBeInTheDocument();
  });

  it("calls onExecute with the current SQL when Execute is clicked", () => {
    const onExecute = vi.fn();
    render(<SqlEditor value={SAMPLE_SQL} onExecute={onExecute} toolbarConfig={{ showExecute: true }} />);
    fireEvent.click(screen.getByRole("button", { name: "Execute" }));
    expect(onExecute).toHaveBeenCalledWith(SAMPLE_SQL);
  });

  it("reformats the SQL when Format is clicked", () => {
    render(<SqlEditor value={MESSY_SQL} />);
    fireEvent.click(screen.getByRole("button", { name: "Format SQL" }));
    const hidden = document.querySelector(".cm-content") as HTMLElement;
    expect(hidden.textContent).not.toBe(MESSY_SQL);
  });

  it("clears the editor when Clear is clicked", () => {
    render(<SqlEditor value={SAMPLE_SQL} />);
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    const content = document.querySelector(".cm-content") as HTMLElement;
    expect(content.textContent).toBe("");
  });

  it("shows 'Copied!' after the Copy button is clicked", async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
    render(<SqlEditor value={SAMPLE_SQL} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Copied!" })).toBeInTheDocument();
    });
  });

  it("reverts the last change when Undo is clicked", () => {
    render(<SqlEditor value={SAMPLE_SQL} />);
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    const content = document.querySelector(".cm-content") as HTMLElement;
    expect(content.textContent).toBe("");
    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(content.textContent).toBe(SAMPLE_SQL);
  });

  it("reapplies the last undone change when Redo is clicked", () => {
    render(<SqlEditor value={SAMPLE_SQL} />);
    const content = document.querySelector(".cm-content") as HTMLElement;
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    fireEvent.click(screen.getByRole("button", { name: "Undo"  }));
    expect(content.textContent).toBe(SAMPLE_SQL);
    fireEvent.click(screen.getByRole("button", { name: "Redo" }));
    expect(content.textContent).toBe("");
  });

  it("disables toolbar buttons when disabled prop is set", () => {
    render(<SqlEditor value={SAMPLE_SQL} disabled />);
    expect(screen.getByRole("button", { name: "Format SQL" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Copy"        })).toBeDisabled();
  });
});

describe("SqlEditor — query history", () => {
  it("does not render the history button by default", () => {
    render(<SqlEditor value={SAMPLE_SQL} onExecute={vi.fn()} />);
    expect(screen.queryByRole("button", { name: "Query history" })).not.toBeInTheDocument();
  });

  it("does not render the history button without onExecute, even if showHistory is set", () => {
    render(<SqlEditor value={SAMPLE_SQL} toolbarConfig={{ showHistory: true }} />);
    expect(screen.queryByRole("button", { name: "Query history" })).not.toBeInTheDocument();
  });

  it("renders the history button when showHistory and onExecute are set", () => {
    render(<SqlEditor value={SAMPLE_SQL} onExecute={vi.fn()} toolbarConfig={{ showHistory: true }} />);
    expect(screen.getByRole("button", { name: "Query history" })).toBeInTheDocument();
  });

  it("adds the executed query to history and shows it in the menu", async () => {
    render(
      <SqlEditor
        value={SAMPLE_SQL}
        onExecute={vi.fn()}
        toolbarConfig={{ showExecute: true, showHistory: true }}
        queryHistoryKey="test-history-1"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Execute" }));
    fireEvent.click(screen.getByRole("button", { name: "Query history" }));
    expect(await screen.findByText(SAMPLE_SQL)).toBeInTheDocument();
  });

  it("loads a history entry into the editor when clicked", async () => {
    const onChange = vi.fn();
    render(
      <SqlEditor
        value={SAMPLE_SQL}
        onChange={onChange}
        onExecute={vi.fn()}
        toolbarConfig={{ showExecute: true, showHistory: true }}
        queryHistoryKey="test-history-2"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Execute" }));
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(document.querySelector(".cm-content")!.textContent).toBe("");

    fireEvent.click(screen.getByRole("button", { name: "Query history" }));
    fireEvent.click(await screen.findByText(SAMPLE_SQL));

    expect(document.querySelector(".cm-content")!.textContent).toBe(SAMPLE_SQL);
    expect(onChange).toHaveBeenCalledWith(SAMPLE_SQL);
  });

  it("clears the history when 'Clear history' is clicked", async () => {
    render(
      <SqlEditor
        value={SAMPLE_SQL}
        onExecute={vi.fn()}
        toolbarConfig={{ showExecute: true, showHistory: true }}
        queryHistoryKey="test-history-3"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Execute" }));
    fireEvent.click(screen.getByRole("button", { name: "Query history" }));
    fireEvent.click(await screen.findByText("Clear history"));

    fireEvent.click(screen.getByRole("button", { name: "Query history" }));
    expect(await screen.findByText("No queries yet")).toBeInTheDocument();
  });

  it("persists history across remounts via localStorage", async () => {
    const { unmount } = render(
      <SqlEditor
        value={SAMPLE_SQL}
        onExecute={vi.fn()}
        toolbarConfig={{ showExecute: true, showHistory: true }}
        queryHistoryKey="test-history-persist"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Execute" }));
    unmount();

    render(
      <SqlEditor
        value=""
        onExecute={vi.fn()}
        toolbarConfig={{ showExecute: true, showHistory: true }}
        queryHistoryKey="test-history-persist"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Query history" }));
    expect(await screen.findByText(SAMPLE_SQL)).toBeInTheDocument();
  });
});
