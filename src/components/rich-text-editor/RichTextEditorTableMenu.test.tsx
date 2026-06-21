import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TableKit } from "@tiptap/extension-table";
import { RichTextEditorTableMenu } from "./RichTextEditorTableMenu";
import { DEFAULT_RICH_TEXT_EDITOR_TRANSLATION as t } from "./RichTextEditor.types";

function TestWrapper({ disabled, withTable }: { disabled?: boolean; withTable?: boolean }) {
  const editor = useEditor({
    extensions: [StarterKit, TableKit],
    content: withTable
      ? "<table><tbody><tr><td>A</td><td>B</td></tr></tbody></table>"
      : "<p>Hello</p>",
  });
  return <RichTextEditorTableMenu editor={editor} translation={t} disabled={disabled} />;
}

describe("RichTextEditorTableMenu", () => {
  it("renders the table toolbar button", () => {
    render(<TestWrapper />);
    expect(screen.getByRole("button", { name: t.table })).toBeInTheDocument();
  });

  it("disables the button when disabled prop is set", () => {
    render(<TestWrapper disabled />);
    expect(screen.getByRole("button", { name: t.table })).toBeDisabled();
  });

  it("opens the menu with 'Insert table' when not inside a table", async () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getByRole("button", { name: t.table }));
    expect(await screen.findByText(t.insertTable)).toBeInTheDocument();
    expect(screen.queryByText(t.addRowBefore)).not.toBeInTheDocument();
  });

  it("inserts a table and closes the menu when 'Insert table' is clicked", async () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getByRole("button", { name: t.table }));
    const insertItem = await screen.findByText(t.insertTable);
    fireEvent.click(insertItem);
    await waitFor(() => {
      expect(screen.queryByText(t.insertTable)).not.toBeInTheDocument();
    });
  });

  it("shows row/column edit options when the cursor is inside a table", async () => {
    render(<TestWrapper withTable />);
    fireEvent.click(screen.getByRole("button", { name: t.table }));
    expect(await screen.findByText(t.addRowBefore)).toBeInTheDocument();
    expect(screen.getByText(t.addRowAfter)).toBeInTheDocument();
    expect(screen.getByText(t.deleteRow)).toBeInTheDocument();
    expect(screen.getByText(t.addColumnBefore)).toBeInTheDocument();
    expect(screen.getByText(t.addColumnAfter)).toBeInTheDocument();
    expect(screen.getByText(t.deleteColumn)).toBeInTheDocument();
    expect(screen.getByText(t.deleteTable)).toBeInTheDocument();
  });

  it("marks the button as pressed when inside a table", () => {
    render(<TestWrapper withTable />);
    expect(screen.getByRole("button", { name: t.table })).toHaveAttribute("aria-pressed", "true");
  });

  it.each([
    t.addRowBefore,
    t.addRowAfter,
    t.deleteRow,
    t.addColumnBefore,
    t.addColumnAfter,
    t.deleteColumn,
    t.deleteTable,
  ])("runs the editor command and closes the menu when '%s' is clicked", async (label) => {
    render(<TestWrapper withTable />);
    fireEvent.click(screen.getByRole("button", { name: t.table }));
    const item = await screen.findByText(label);
    fireEvent.click(item);
    await waitFor(() => {
      expect(screen.queryByText(label)).not.toBeInTheDocument();
    });
  });
});
