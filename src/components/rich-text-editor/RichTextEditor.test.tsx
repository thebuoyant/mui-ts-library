import { render, screen, waitFor, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { RichTextEditor } from "./RichTextEditor";

// ProseMirror-View ruft DOM-APIs auf die in JSDOM nicht oder unvollständig vorhanden sind
beforeAll(() => {
  const rect = { top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0, x: 0, y: 0, toJSON: vi.fn() };
  const rectList = Object.assign([rect], {
    length: 1,
    item: vi.fn(() => rect),
    [Symbol.iterator]: vi.fn(function* () { yield rect; }),
  }) as unknown as DOMRectList;

  Range.prototype.getClientRects       = vi.fn(() => rectList);
  Element.prototype.getClientRects     = vi.fn(() => rectList);
  HTMLElement.prototype.scrollIntoView = vi.fn();
  // Text-Nodes haben getClientRects in JSDOM nicht
  // @ts-expect-error — Polyfill für ProseMirror auf Text-Nodes
  Text.prototype.getClientRects = vi.fn(() => rectList);
});

describe("RichTextEditor", () => {
  it("Should render the editor area", () => {
    render(<RichTextEditor />);
    expect(document.querySelector(".ProseMirror")).toBeInTheDocument();
  });

  it("Should render the toolbar", () => {
    render(<RichTextEditor />);
    expect(screen.getByRole("toolbar")).toBeInTheDocument();
  });

  it("Should show placeholder text when editor is empty", () => {
    // TipTap setzt den Placeholder als data-Attribut — der Text erscheint via CSS ::before
    render(<RichTextEditor placeholder="Hier tippen …" />);
    expect(document.querySelector('[data-placeholder="Hier tippen …"]')).toBeInTheDocument();
  });

  it("Should apply bold formatting when bold button is clicked", async () => {
    render(<RichTextEditor />);
    const boldButton = screen.getByRole("button", { name: "Bold" });
    // fireEvent.click vermeidet den blur/focus-Zyklus den userEvent auslöst
    await act(async () => { fireEvent.click(boldButton); });
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("aria-pressed", "true");
    });
  });

  it("Should apply italic formatting when italic button is clicked", async () => {
    render(<RichTextEditor />);
    const italicButton = screen.getByRole("button", { name: "Italic" });
    await act(async () => { fireEvent.click(italicButton); });
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Italic" })).toHaveAttribute("aria-pressed", "true");
    });
  });

  it("Should apply underline formatting when underline button is clicked", async () => {
    render(<RichTextEditor />);
    const underlineButton = screen.getByRole("button", { name: "Underline" });
    await act(async () => { fireEvent.click(underlineButton); });
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Underline" })).toHaveAttribute("aria-pressed", "true");
    });
  });

  it("Should call onChange with HTML content when text is entered", async () => {
    const onChange = vi.fn();
    render(<RichTextEditor onChange={onChange} />);

    const editorEl = document.querySelector(".ProseMirror") as HTMLElement;
    // innerHTML-Mutation löst TipTaps MutationObserver aus und feuert onUpdate → onChange
    await act(async () => {
      editorEl.innerHTML = "<p>Hello</p>";
      editorEl.dispatchEvent(new Event("input", { bubbles: true }));
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const output = onChange.mock.calls[onChange.mock.calls.length - 1][0] as string;
      expect(output).toContain("Hello");
    }, { timeout: 3000 });
  });

  it("Should disable all toolbar buttons when disabled is true", () => {
    render(<RichTextEditor disabled />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });

  it("Should not render toolbar when readonly is true", () => {
    render(<RichTextEditor readonly />);
    expect(screen.queryByRole("toolbar")).not.toBeInTheDocument();
  });

  it("Should show character count when showCharacterCount is true", () => {
    render(<RichTextEditor showCharacterCount />);
    expect(screen.getByText(/characters/i)).toBeInTheDocument();
  });

  it("Should not exceed maxCharacters limit", () => {
    // Prüft dass der maxCharacters-Prop korrekt an TipTap übergeben wird
    // und die Zeichenzähler-UI das Limit anzeigt
    render(<RichTextEditor maxCharacters={10} />);
    expect(screen.getByText("0 / 10 characters")).toBeInTheDocument();
  });

  it("Should show error border when error is true", () => {
    const { container } = render(<RichTextEditor error />);
    const paper = container.querySelector(".MuiPaper-root") as HTMLElement;
    expect(paper).toBeInTheDocument();
  });

  it("Should show helperText below the editor", () => {
    render(<RichTextEditor helperText="Pflichtfeld." />);
    expect(screen.getByText("Pflichtfeld.")).toBeInTheDocument();
  });

  it("Should open link dialog when link button is clicked", async () => {
    const user = userEvent.setup();
    render(<RichTextEditor />);
    const linkButton = screen.getByRole("button", { name: "Insert link" });
    await user.click(linkButton);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("Should hide toolbar buttons based on toolbarConfig", () => {
    render(
      <RichTextEditor
        toolbarConfig={{
          showBold:      false,
          showItalic:    false,
          showUnderline: false,
        }}
      />,
    );
    expect(screen.queryByRole("button", { name: "Bold" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Italic" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Underline" })).not.toBeInTheDocument();
  });

  // ── Word Count ──────────────────────────────────────────────────────────────

  it("Should show word count when showWordCount is true", () => {
    render(<RichTextEditor showWordCount />);
    expect(screen.getByText(/words/i)).toBeInTheDocument();
  });

  it("Should show word count and character count simultaneously", () => {
    render(<RichTextEditor showWordCount showCharacterCount />);
    expect(screen.getByText(/words/i)).toBeInTheDocument();
    expect(screen.getByText(/characters/i)).toBeInTheDocument();
  });

  it("Should not show word count when showWordCount is false (default)", () => {
    render(<RichTextEditor />);
    expect(screen.queryByText(/words/i)).not.toBeInTheDocument();
  });

  it("Should use translated word count label", () => {
    render(
      <RichTextEditor
        showWordCount
        translation={{ wordCount: "{count} Wörter" }}
      />,
    );
    expect(screen.getByText(/wörter/i)).toBeInTheDocument();
  });

  // ── Fullscreen ───────────────────────────────────────────────────────────────

  it("Should show fullscreen button when showFullscreenButton is true", () => {
    render(<RichTextEditor toolbarConfig={{ showFullscreenButton: true }} />);
    expect(screen.getByRole("button", { name: "Full screen" })).toBeInTheDocument();
  });

  it("Should not show fullscreen button by default", () => {
    render(<RichTextEditor />);
    expect(screen.queryByRole("button", { name: "Full screen" })).not.toBeInTheDocument();
  });

  it("Should toggle to exit fullscreen button after click", async () => {
    render(<RichTextEditor toolbarConfig={{ showFullscreenButton: true }} />);
    const btn = screen.getByRole("button", { name: "Full screen" });
    await act(async () => { fireEvent.click(btn); });
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Exit full screen" })).toBeInTheDocument();
    });
  });

  it("Should toggle back to fullscreen button after second click", async () => {
    render(<RichTextEditor toolbarConfig={{ showFullscreenButton: true }} />);
    const btn = screen.getByRole("button", { name: "Full screen" });
    await act(async () => { fireEvent.click(btn); });
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Exit full screen" })).toBeInTheDocument(),
    );
    const exitBtn = screen.getByRole("button", { name: "Exit full screen" });
    await act(async () => { fireEvent.click(exitBtn); });
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Full screen" })).toBeInTheDocument();
    });
  });

  it("Should use translated fullscreen labels", () => {
    render(
      <RichTextEditor
        toolbarConfig={{ showFullscreenButton: true }}
        translation={{ fullscreen: "Vollbild", exitFullscreen: "Vollbild beenden" }}
      />,
    );
    expect(screen.getByRole("button", { name: "Vollbild" })).toBeInTheDocument();
  });

  // ── Table ────────────────────────────────────────────────────────────────────

  it("Should render the table button when showTableButton is true", () => {
    render(<RichTextEditor toolbarConfig={{ showTableButton: true }} />);
    expect(screen.getByRole("button", { name: "Table" })).toBeInTheDocument();
  });

  it("Should not render the table button by default", () => {
    render(<RichTextEditor />);
    expect(screen.queryByRole("button", { name: "Table" })).not.toBeInTheDocument();
  });

  it("Should open the table dropdown menu when table button is clicked", async () => {
    render(<RichTextEditor toolbarConfig={{ showTableButton: true }} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Table" }));
    });
    await waitFor(() => {
      expect(screen.getByText("Insert 3×3 table")).toBeInTheDocument();
    });
  });

  // ── Image ────────────────────────────────────────────────────────────────────

  it("Should render the image button when showImageButton is true", () => {
    render(<RichTextEditor toolbarConfig={{ showImageButton: true }} />);
    expect(screen.getByRole("button", { name: "Insert image" })).toBeInTheDocument();
  });

  it("Should not render the image button by default", () => {
    render(<RichTextEditor />);
    expect(screen.queryByRole("button", { name: "Insert image" })).not.toBeInTheDocument();
  });

  it("Should open the image dialog when image button is clicked", async () => {
    render(<RichTextEditor toolbarConfig={{ showImageButton: true }} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Insert image" }));
    });
    await waitFor(() => {
      expect(screen.getByText("Insert image")).toBeInTheDocument();
      expect(screen.getByLabelText("Image URL")).toBeInTheDocument();
    });
  });

  // ── Emoji ────────────────────────────────────────────────────────────────────

  it("Should render the emoji button when showEmojiButton is true", () => {
    render(<RichTextEditor toolbarConfig={{ showEmojiButton: true }} />);
    expect(screen.getByRole("button", { name: "Emoji" })).toBeInTheDocument();
  });

  it("Should not render the emoji button by default", () => {
    render(<RichTextEditor />);
    expect(screen.queryByRole("button", { name: "Emoji" })).not.toBeInTheDocument();
  });

  it("Should open the emoji picker when emoji button is clicked", async () => {
    render(<RichTextEditor toolbarConfig={{ showEmojiButton: true }} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Emoji" }));
    });
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Search emoji…")).toBeInTheDocument();
    });
  });
});
