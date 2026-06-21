import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { RichTextEditorImageDialog } from "./RichTextEditorImageDialog";
import { DEFAULT_RICH_TEXT_EDITOR_TRANSLATION } from "./RichTextEditor.types";

function TestWrapper({ open, onClose }: { open: boolean; onClose: () => void }) {
  const editor = useEditor({ extensions: [StarterKit, Image] });
  if (!editor) return null;
  return (
    <RichTextEditorImageDialog
      open={open}
      onClose={onClose}
      editor={editor}
      translation={DEFAULT_RICH_TEXT_EDITOR_TRANSLATION}
    />
  );
}

describe("RichTextEditorImageDialog", () => {
  it("renders the dialog with URL and Alt fields when open", async () => {
    render(<TestWrapper open onClose={() => {}} />);
    await waitFor(() => {
      expect(screen.getByLabelText(DEFAULT_RICH_TEXT_EDITOR_TRANSLATION.imageDialogUrlLabel)).toBeInTheDocument();
    });
    expect(screen.getByLabelText(DEFAULT_RICH_TEXT_EDITOR_TRANSLATION.imageDialogAltLabel)).toBeInTheDocument();
  });

  it("does not render dialog content when closed", () => {
    render(<TestWrapper open={false} onClose={() => {}} />);
    expect(screen.queryByLabelText(DEFAULT_RICH_TEXT_EDITOR_TRANSLATION.imageDialogUrlLabel)).not.toBeInTheDocument();
  });

  it("disables Save button until a URL is entered", async () => {
    render(<TestWrapper open onClose={() => {}} />);
    const saveButton = await screen.findByRole("button", { name: DEFAULT_RICH_TEXT_EDITOR_TRANSLATION.imageDialogSave });
    expect(saveButton).toBeDisabled();

    const urlField = screen.getByLabelText(DEFAULT_RICH_TEXT_EDITOR_TRANSLATION.imageDialogUrlLabel);
    fireEvent.change(urlField, { target: { value: "https://example.com/cat.png" } });
    expect(saveButton).toBeEnabled();
  });

  it("calls onClose after Save is clicked with a URL", async () => {
    let closed = false;
    render(<TestWrapper open onClose={() => { closed = true; }} />);
    const urlField = await screen.findByLabelText(DEFAULT_RICH_TEXT_EDITOR_TRANSLATION.imageDialogUrlLabel);
    fireEvent.change(urlField, { target: { value: "https://example.com/cat.png" } });
    fireEvent.click(screen.getByRole("button", { name: DEFAULT_RICH_TEXT_EDITOR_TRANSLATION.imageDialogSave }));
    expect(closed).toBe(true);
  });

  it("calls onClose when Cancel is clicked", async () => {
    let closed = false;
    render(<TestWrapper open onClose={() => { closed = true; }} />);
    const cancelButton = await screen.findByRole("button", { name: DEFAULT_RICH_TEXT_EDITOR_TRANSLATION.imageDialogCancel });
    fireEvent.click(cancelButton);
    expect(closed).toBe(true);
  });

  it("submits via Enter key in the URL field", async () => {
    let closed = false;
    render(<TestWrapper open onClose={() => { closed = true; }} />);
    const urlField = await screen.findByLabelText(DEFAULT_RICH_TEXT_EDITOR_TRANSLATION.imageDialogUrlLabel);
    fireEvent.change(urlField, { target: { value: "https://example.com/cat.png" } });
    fireEvent.keyDown(urlField, { key: "Enter" });
    expect(closed).toBe(true);
  });

  it("does not submit via Enter key when URL is empty", async () => {
    let closed = false;
    render(<TestWrapper open onClose={() => { closed = true; }} />);
    const urlField = await screen.findByLabelText(DEFAULT_RICH_TEXT_EDITOR_TRANSLATION.imageDialogUrlLabel);
    fireEvent.keyDown(urlField, { key: "Enter" });
    expect(closed).toBe(false);
  });
});
