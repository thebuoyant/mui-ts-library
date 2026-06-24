import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { RichTextEditorMarkdownDialog } from "./RichTextEditorMarkdownDialog";
import { DEFAULT_RICH_TEXT_EDITOR_TRANSLATION } from "./RichTextEditor.types";

const t = DEFAULT_RICH_TEXT_EDITOR_TRANSLATION;

function TestWrapper({
  open,
  onClose,
  content = "<p>Hello <strong>world</strong></p>",
}: {
  open:     boolean;
  onClose:  () => void;
  content?: string;
}) {
  const editor = useEditor({ extensions: [StarterKit, Markdown], content });
  if (!editor) return null;
  return (
    <RichTextEditorMarkdownDialog open={open} onClose={onClose} editor={editor} translation={t} />
  );
}

describe("RichTextEditorMarkdownDialog", () => {
  it("pre-fills the textarea with the current content as Markdown when opened", async () => {
    render(<TestWrapper open onClose={() => {}} />);
    await waitFor(() => {
      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
      expect(textarea.value).toContain("Hello **world**");
    });
  });

  it("does not render dialog content when closed", () => {
    render(<TestWrapper open={false} onClose={() => {}} />);
    expect(screen.queryByText(t.markdownDialogTitle!)).not.toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", async () => {
    let closed = false;
    render(<TestWrapper open onClose={() => { closed = true; }} />);
    const cancelButton = await screen.findByRole("button", { name: t.markdownDialogCancel });
    fireEvent.click(cancelButton);
    expect(closed).toBe(true);
  });

  it("replaces the editor content and closes when Apply is clicked", async () => {
    let closed = false;
    render(<TestWrapper open onClose={() => { closed = true; }} />);
    const textarea = await screen.findByRole("textbox");
    fireEvent.change(textarea, { target: { value: "# New Title" } });
    fireEvent.click(screen.getByRole("button", { name: t.markdownDialogApply }));
    expect(closed).toBe(true);
  });

  it("copies the current textarea content to the clipboard", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<TestWrapper open onClose={() => {}} />);
    const copyButton = await screen.findByRole("button", { name: t.markdownDialogCopy });
    await act(async () => { fireEvent.click(copyButton); });

    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("Hello **world**"));
    await waitFor(() => {
      expect(screen.getByRole("button", { name: t.markdownDialogCopied })).toBeInTheDocument();
    });
  });
});
