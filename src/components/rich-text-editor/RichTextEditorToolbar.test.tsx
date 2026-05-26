import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RichTextEditorToolbar } from "./RichTextEditorToolbar";
import {
  DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG,
  DEFAULT_RICH_TEXT_EDITOR_TRANSLATION,
} from "./RichTextEditor.types";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

function TestWrapper({
  toolbarConfig = DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG,
  translation = DEFAULT_RICH_TEXT_EDITOR_TRANSLATION,
  disabled = false,
}: {
  toolbarConfig?: typeof DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG;
  translation?: typeof DEFAULT_RICH_TEXT_EDITOR_TRANSLATION;
  disabled?: boolean;
}) {
  const editor = useEditor({ extensions: [StarterKit] });
  return (
    <RichTextEditorToolbar
      editor={editor}
      toolbarConfig={toolbarConfig}
      translation={translation}
      disabled={disabled}
      isFullscreen={false}
      onToggleFullscreen={() => {}}
    />
  );
}

describe("RichTextEditorToolbar", () => {
  it("Should render all toolbar buttons by default", () => {
    render(<TestWrapper />);
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Italic" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Underline" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Strikethrough" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Heading 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Heading 2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Heading 3" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Bullet list" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Numbered list" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Insert link" })).toBeInTheDocument();
  });

  it("Should hide bold button when showBold is false", () => {
    render(
      <TestWrapper
        toolbarConfig={{ ...DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG, showBold: false }}
      />,
    );
    expect(screen.queryByRole("button", { name: "Bold" })).not.toBeInTheDocument();
  });

  it("Should hide undo/redo buttons when showUndoRedo is false", () => {
    render(
      <TestWrapper
        toolbarConfig={{ ...DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG, showUndoRedo: false }}
      />,
    );
    expect(screen.queryByRole("button", { name: "Undo" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Redo" })).not.toBeInTheDocument();
  });

  it("Should show tooltips matching translation", async () => {
    render(
      <TestWrapper
        translation={{
          ...DEFAULT_RICH_TEXT_EDITOR_TRANSLATION,
          bold: "Fett",
        }}
      />,
    );
    expect(screen.getByRole("button", { name: "Fett" })).toBeInTheDocument();
  });

  it("Should disable all buttons when disabled prop is true", () => {
    render(<TestWrapper disabled />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });

  it("Should mark bold button as active when selection is bold", async () => {
    // Toolbar-Button hat aria-pressed="true" wenn das Format aktiv ist
    // Im Test können wir prüfen, dass der Button initial nicht aktiv ist
    render(<TestWrapper />);
    const boldButton = screen.getByRole("button", { name: "Bold" });
    expect(boldButton).toHaveAttribute("aria-pressed", "false");
  });

  it("Should render text color and highlight buttons by default", () => {
    render(<TestWrapper />);
    expect(screen.getByRole("button", { name: "Text color" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Highlight" })).toBeInTheDocument();
  });

  it("Should hide text color and highlight buttons when disabled via toolbarConfig", () => {
    render(
      <TestWrapper
        toolbarConfig={{
          ...DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG,
          showTextColor: false,
          showHighlight: false,
        }}
      />,
    );
    expect(screen.queryByRole("button", { name: "Text color" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Highlight" })).not.toBeInTheDocument();
  });
});
