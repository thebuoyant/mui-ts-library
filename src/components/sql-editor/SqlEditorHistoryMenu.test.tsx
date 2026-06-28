import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SqlEditorHistoryMenu } from "./SqlEditorHistoryMenu";
import { DEFAULT_SQL_EDITOR_TRANSLATION as t } from "./SqlEditor.types";
import type { SqlQueryHistoryEntry } from "./util/sqlQueryHistory.util";

const HISTORY: SqlQueryHistoryEntry[] = [
  { id: "a", sql: "SELECT * FROM users;", timestamp: 2000 },
  { id: "b", sql: "SELECT * FROM orders;", timestamp: 1000 },
];

describe("SqlEditorHistoryMenu", () => {
  it("renders the history button", () => {
    render(<SqlEditorHistoryMenu history={[]} onSelect={vi.fn()} onClear={vi.fn()} translation={t} />);
    expect(screen.getByRole("button", { name: t.history })).toBeInTheDocument();
  });

  it("disables the button when disabled prop is set", () => {
    render(<SqlEditorHistoryMenu history={[]} onSelect={vi.fn()} onClear={vi.fn()} translation={t} disabled />);
    expect(screen.getByRole("button", { name: t.history })).toBeDisabled();
  });

  it("shows the empty state when there is no history", () => {
    render(<SqlEditorHistoryMenu history={[]} onSelect={vi.fn()} onClear={vi.fn()} translation={t} />);
    fireEvent.click(screen.getByRole("button", { name: t.history }));
    expect(screen.getByText(t.historyEmpty)).toBeInTheDocument();
    expect(screen.queryByText(t.clearHistory)).not.toBeInTheDocument();
  });

  it("lists history entries with the most recent first", () => {
    render(<SqlEditorHistoryMenu history={HISTORY} onSelect={vi.fn()} onClear={vi.fn()} translation={t} />);
    fireEvent.click(screen.getByRole("button", { name: t.history }));
    const items = screen.getAllByText(/SELECT \* FROM/);
    expect(items[0]).toHaveTextContent("SELECT * FROM users;");
    expect(items[1]).toHaveTextContent("SELECT * FROM orders;");
  });

  it("calls onSelect with the entry's SQL when clicked", () => {
    const onSelect = vi.fn();
    render(<SqlEditorHistoryMenu history={HISTORY} onSelect={onSelect} onClear={vi.fn()} translation={t} />);
    fireEvent.click(screen.getByRole("button", { name: t.history }));
    fireEvent.click(screen.getByText("SELECT * FROM users;"));
    expect(onSelect).toHaveBeenCalledWith("SELECT * FROM users;");
  });

  it("truncates long queries", () => {
    const longSql = "SELECT " + "col, ".repeat(30) + "id FROM very_long_table_name;";
    render(
      <SqlEditorHistoryMenu
        history={[{ id: "c", sql: longSql, timestamp: 1 }]}
        onSelect={vi.fn()}
        onClear={vi.fn()}
        translation={t}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: t.history }));
    expect(screen.queryByText(longSql)).not.toBeInTheDocument();
    expect(screen.getByText(/…$/)).toBeInTheDocument();
  });

  it("shows a 'Clear history' option when history is non-empty", () => {
    render(<SqlEditorHistoryMenu history={HISTORY} onSelect={vi.fn()} onClear={vi.fn()} translation={t} />);
    fireEvent.click(screen.getByRole("button", { name: t.history }));
    expect(screen.getByText(t.clearHistory)).toBeInTheDocument();
  });

  it("calls onClear when 'Clear history' is clicked", () => {
    const onClear = vi.fn();
    render(<SqlEditorHistoryMenu history={HISTORY} onSelect={vi.fn()} onClear={onClear} translation={t} />);
    fireEvent.click(screen.getByRole("button", { name: t.history }));
    fireEvent.click(screen.getByText(t.clearHistory));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
