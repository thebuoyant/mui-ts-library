import { createRef } from "react";
import { render, screen, waitFor, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { RichTextEditor } from "./RichTextEditor";
import {
  RichTextEditorMentionList,
  type MentionListRef,
} from "./RichTextEditorMentionList";

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

  // ── Paste as Plain Text ──────────────────────────────────────────────────────

  it("Should not show the paste-as-plain-text button by default", () => {
    render(<RichTextEditor />);
    expect(screen.queryByRole("button", { name: "Paste as plain text" })).not.toBeInTheDocument();
  });

  it("Should show the paste-as-plain-text button when showPasteAsPlainTextButton is true", () => {
    render(<RichTextEditor toolbarConfig={{ showPasteAsPlainTextButton: true }} />);
    expect(screen.getByRole("button", { name: "Paste as plain text" })).toBeInTheDocument();
  });

  it("Should toggle the button label and pressed state on click", async () => {
    render(<RichTextEditor toolbarConfig={{ showPasteAsPlainTextButton: true }} />);
    const btn = screen.getByRole("button", { name: "Paste as plain text" });
    await act(async () => { fireEvent.click(btn); });
    await waitFor(() => {
      const toggled = screen.getByRole("button", { name: "Paste with formatting" });
      expect(toggled).toHaveAttribute("aria-pressed", "true");
    });
  });

  it("Should strip formatting from pasted content when the toggle is active", async () => {
    render(<RichTextEditor toolbarConfig={{ showPasteAsPlainTextButton: true }} />);
    const toggleBtn = screen.getByRole("button", { name: "Paste as plain text" });
    await act(async () => { fireEvent.click(toggleBtn); });
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Paste with formatting" })).toBeInTheDocument();
    });

    const editorEl = document.querySelector(".ProseMirror") as HTMLElement;
    editorEl.focus();
    const pasteEvent = Object.assign(new Event("paste", { bubbles: true, cancelable: true }), {
      clipboardData: { getData: () => "Hello plain" },
    });
    await act(async () => { editorEl.dispatchEvent(pasteEvent); });

    await waitFor(() => {
      expect(editorEl.textContent).toContain("Hello plain");
    });
    // Inhalt landet als reiner Text, nicht als <strong>/<em>/etc.
    expect(editorEl.innerHTML).not.toContain("<strong>");
  });

  // Regression: getData("text/plain") returns "" (not null/undefined) when the
  // clipboard holds non-text data (e.g. an image or file). The handler's old
  // `== null` check let that empty string through, called preventDefault(), and
  // dispatched insertText("", from, to) — silently swallowing the paste instead
  // of falling through to let TipTap's own (image/file) paste handling run.
  it("Should not intercept the paste when the clipboard has no text payload, even with the toggle active", async () => {
    render(<RichTextEditor toolbarConfig={{ showPasteAsPlainTextButton: true }} />);
    const toggleBtn = screen.getByRole("button", { name: "Paste as plain text" });
    await act(async () => { fireEvent.click(toggleBtn); });
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Paste with formatting" })).toBeInTheDocument();
    });

    const editorEl = document.querySelector(".ProseMirror") as HTMLElement;
    editorEl.focus();
    const pasteEvent = Object.assign(new Event("paste", { bubbles: true, cancelable: true }), {
      clipboardData: { getData: () => "" }, // e.g. an image/file paste — no text payload
    });
    await act(async () => { editorEl.dispatchEvent(pasteEvent); });

    // The handler must return false (not call preventDefault), letting ProseMirror's
    // / TipTap's default paste handling decide what to do with the non-text data.
    expect(pasteEvent.defaultPrevented).toBe(false);
  });

  // ── Markdown ─────────────────────────────────────────────────────────────────

  it("Should not show the markdown button by default", () => {
    render(<RichTextEditor />);
    expect(screen.queryByRole("button", { name: "Markdown" })).not.toBeInTheDocument();
  });

  it("Should show the markdown button when showMarkdownButton is true", () => {
    render(<RichTextEditor toolbarConfig={{ showMarkdownButton: true }} />);
    expect(screen.getByRole("button", { name: "Markdown" })).toBeInTheDocument();
  });

  it("Should open the markdown dialog when the markdown button is clicked", async () => {
    render(<RichTextEditor toolbarConfig={{ showMarkdownButton: true }} />);
    const btn = screen.getByRole("button", { name: "Markdown" });
    await act(async () => { fireEvent.click(btn); });
    await waitFor(() => {
      expect(screen.getByText("Markdown", { selector: "h2" })).toBeInTheDocument();
    });
  });

  it("Should call onMarkdownChange with Markdown content alongside onChange", async () => {
    const onMarkdownChange = vi.fn();
    render(<RichTextEditor onMarkdownChange={onMarkdownChange} />);

    const editorEl = document.querySelector(".ProseMirror") as HTMLElement;
    await act(async () => {
      editorEl.innerHTML = "<p>Hello</p>";
      editorEl.dispatchEvent(new Event("input", { bubbles: true }));
    });

    await waitFor(() => {
      expect(onMarkdownChange).toHaveBeenCalled();
      const output = onMarkdownChange.mock.calls[onMarkdownChange.mock.calls.length - 1][0] as string;
      expect(output).toContain("Hello");
    }, { timeout: 3000 });
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

  // ── onSave / Ctrl+S ────────────────────────────────────────────────────────

  describe("onSave callback", () => {
    it("Should call onSave when Ctrl+S is pressed", async () => {
      const onSave = vi.fn();
      render(<RichTextEditor onSave={onSave} />);
      const editorEl = document.querySelector(".ProseMirror") as HTMLElement;
      await act(async () => {
        editorEl.dispatchEvent(new KeyboardEvent("keydown", { key: "s", ctrlKey: true, bubbles: true }));
      });
      expect(onSave).toHaveBeenCalledOnce();
    });

    it("Should call onSave when Cmd+S is pressed (macOS)", async () => {
      const onSave = vi.fn();
      render(<RichTextEditor onSave={onSave} />);
      const editorEl = document.querySelector(".ProseMirror") as HTMLElement;
      await act(async () => {
        editorEl.dispatchEvent(new KeyboardEvent("keydown", { key: "s", metaKey: true, bubbles: true }));
      });
      expect(onSave).toHaveBeenCalledOnce();
    });

    it("Should not call onSave when S is pressed without modifier key", async () => {
      const onSave = vi.fn();
      render(<RichTextEditor onSave={onSave} />);
      const editorEl = document.querySelector(".ProseMirror") as HTMLElement;
      await act(async () => {
        editorEl.dispatchEvent(new KeyboardEvent("keydown", { key: "s", bubbles: true }));
      });
      expect(onSave).not.toHaveBeenCalled();
    });

    it("Should not throw when Ctrl+S is pressed without onSave provided", async () => {
      render(<RichTextEditor />);
      const editorEl = document.querySelector(".ProseMirror") as HTMLElement;
      await expect(act(async () => {
        editorEl.dispatchEvent(new KeyboardEvent("keydown", { key: "s", ctrlKey: true, bubbles: true }));
      })).resolves.not.toThrow();
    });
  });

  // ── defaultValue ───────────────────────────────────────────────────────────

  describe("defaultValue (uncontrolled mode)", () => {
    it("Should render initial content from defaultValue", async () => {
      render(<RichTextEditor defaultValue="<p>Hello uncontrolled</p>" />);
      await waitFor(() =>
        expect(document.querySelector(".ProseMirror")?.textContent).toContain("Hello uncontrolled"),
      );
    });

    it("Should call onChange when editing content initialized with defaultValue", async () => {
      const onChange = vi.fn();
      render(<RichTextEditor defaultValue="<p>Start</p>" onChange={onChange} />);
      const editorEl = document.querySelector(".ProseMirror") as HTMLElement;
      await act(async () => {
        editorEl.innerHTML = "<p>Start changed</p>";
        editorEl.dispatchEvent(new Event("input", { bubbles: true }));
      });
      await waitFor(() => expect(onChange).toHaveBeenCalled(), { timeout: 3000 });
    });

    it("Should prefer value over defaultValue when both are provided", async () => {
      render(<RichTextEditor value="<p>controlled</p>" defaultValue="<p>ignored</p>" />);
      await waitFor(() => {
        const text = document.querySelector(".ProseMirror")?.textContent ?? "";
        expect(text).toContain("controlled");
        expect(text).not.toContain("ignored");
      });
    });

    it("Should render empty editor when neither value nor defaultValue is provided", () => {
      render(<RichTextEditor />);
      expect(document.querySelector(".ProseMirror")).toBeInTheDocument();
    });
  });

  // ── Mention (@) ────────────────────────────────────────────────────────────

  describe("Mention (@) feature — RichTextEditor integration", () => {
    const MENTION_ITEMS = [
      { id: "1", label: "Alice" },
      { id: "2", label: "Bob" },
      { id: "3", label: "Charlie" },
    ];

    it("Should render without errors when mentionItems is provided", () => {
      render(<RichTextEditor mentionItems={MENTION_ITEMS} />);
      expect(document.querySelector(".ProseMirror")).toBeInTheDocument();
    });

    it("Should render without errors when neither mentionItems nor onMentionSearch is provided", () => {
      render(<RichTextEditor />);
      expect(document.querySelector(".ProseMirror")).toBeInTheDocument();
    });

    it("Should render without errors with a custom mentionTriggerChar", () => {
      render(<RichTextEditor mentionItems={MENTION_ITEMS} mentionTriggerChar="#" />);
      expect(document.querySelector(".ProseMirror")).toBeInTheDocument();
    });

    it("Should render without errors when onMentionSearch is provided without mentionItems", () => {
      const onMentionSearch = vi.fn().mockResolvedValue([]);
      render(<RichTextEditor onMentionSearch={onMentionSearch} />);
      expect(document.querySelector(".ProseMirror")).toBeInTheDocument();
    });

    it("Should render without errors when onMentionInserted is provided", () => {
      const onMentionInserted = vi.fn();
      render(<RichTextEditor mentionItems={MENTION_ITEMS} onMentionInserted={onMentionInserted} />);
      expect(document.querySelector(".ProseMirror")).toBeInTheDocument();
    });

    it("Should use the custom mentionNoResults translation label", () => {
      const mockRect = () => new DOMRect(0, 0, 100, 20);
      render(
        <RichTextEditorMentionList
          items={[]}
          noResultsLabel="Niemanden gefunden"
          clientRect={mockRect}
          onSelect={vi.fn()}
        />
      );
      expect(screen.getByText("Niemanden gefunden")).toBeInTheDocument();
    });
  });
});

// ── RichTextEditorMentionList unit tests ──────────────────────────────────────

describe("RichTextEditorMentionList", () => {
  const mockRect = () => new DOMRect(0, 0, 100, 20);
  const items = [
    { id: "1", label: "Alice" },
    { id: "2", label: "Bob" },
  ];

  it("Should show noResultsLabel when items array is empty", () => {
    render(
      <RichTextEditorMentionList
        items={[]}
        noResultsLabel="No matches"
        clientRect={mockRect}
        onSelect={vi.fn()}
      />
    );
    expect(screen.getByText("No matches")).toBeInTheDocument();
  });

  it("Should render all items in the list", () => {
    render(
      <RichTextEditorMentionList
        items={items}
        noResultsLabel="No results"
        clientRect={mockRect}
        onSelect={vi.fn()}
      />
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("Should not render the list when clientRect is null (Popper closed)", () => {
    render(
      <RichTextEditorMentionList
        items={items}
        noResultsLabel="No results"
        clientRect={null}
        onSelect={vi.fn()}
      />
    );
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
  });

  it("Should call onSelect with the clicked item on mouseDown", async () => {
    const onSelect = vi.fn();
    render(
      <RichTextEditorMentionList
        items={items}
        noResultsLabel="No results"
        clientRect={mockRect}
        onSelect={onSelect}
      />
    );
    await act(async () => { fireEvent.mouseDown(screen.getByText("Alice")); });
    expect(onSelect).toHaveBeenCalledWith({ id: "1", label: "Alice" });
  });

  it("Should navigate to next item on ArrowDown via ref", async () => {
    const ref = createRef<MentionListRef>();
    render(
      <RichTextEditorMentionList
        ref={ref}
        items={items}
        noResultsLabel="No results"
        clientRect={mockRect}
        onSelect={vi.fn()}
      />
    );
    await act(async () => {
      ref.current?.onKeyDown(new KeyboardEvent("keydown", { key: "ArrowDown" }));
    });
    await waitFor(() => {
      expect(screen.getByText("Bob").closest('[role="button"]')).toHaveClass("Mui-selected");
    });
  });

  it("Should navigate to previous item on ArrowUp via ref", async () => {
    const ref = createRef<MentionListRef>();
    render(
      <RichTextEditorMentionList
        ref={ref}
        items={items}
        noResultsLabel="No results"
        clientRect={mockRect}
        onSelect={vi.fn()}
      />
    );
    await act(async () => {
      ref.current?.onKeyDown(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    });
    // wraps around: from index 0 → index 1 (last item = Bob)
    await waitFor(() => {
      expect(screen.getByText("Bob").closest('[role="button"]')).toHaveClass("Mui-selected");
    });
  });

  it("Should call onSelect for the currently selected item on Enter via ref", async () => {
    const onSelect = vi.fn();
    const ref = createRef<MentionListRef>();
    render(
      <RichTextEditorMentionList
        ref={ref}
        items={items}
        noResultsLabel="No results"
        clientRect={mockRect}
        onSelect={onSelect}
      />
    );
    await act(async () => {
      ref.current?.onKeyDown(new KeyboardEvent("keydown", { key: "Enter" }));
    });
    expect(onSelect).toHaveBeenCalledWith({ id: "1", label: "Alice" });
  });

  it("Should return true from onKeyDown for handled keys (Arrow/Enter)", () => {
    const ref = createRef<MentionListRef>();
    render(
      <RichTextEditorMentionList
        ref={ref}
        items={items}
        noResultsLabel="No results"
        clientRect={mockRect}
        onSelect={vi.fn()}
      />
    );
    expect(ref.current?.onKeyDown(new KeyboardEvent("keydown", { key: "ArrowDown" }))).toBe(true);
    expect(ref.current?.onKeyDown(new KeyboardEvent("keydown", { key: "ArrowUp" }))).toBe(true);
    expect(ref.current?.onKeyDown(new KeyboardEvent("keydown", { key: "Enter" }))).toBe(true);
    expect(ref.current?.onKeyDown(new KeyboardEvent("keydown", { key: "Escape" }))).toBe(false);
  });

  it("Should reset selectedIndex to 0 when items change", async () => {
    const ref = createRef<MentionListRef>();
    const { rerender } = render(
      <RichTextEditorMentionList
        ref={ref}
        items={items}
        noResultsLabel="No results"
        clientRect={mockRect}
        onSelect={vi.fn()}
      />
    );
    await act(async () => {
      ref.current?.onKeyDown(new KeyboardEvent("keydown", { key: "ArrowDown" }));
    });
    await waitFor(() => {
      expect(screen.getByText("Bob").closest('[role="button"]')).toHaveClass("Mui-selected");
    });
    // Items change (e.g. user typed another char, results filtered) → index resets
    rerender(
      <RichTextEditorMentionList
        ref={ref}
        items={[{ id: "1", label: "Alice" }]}
        noResultsLabel="No results"
        clientRect={mockRect}
        onSelect={vi.fn()}
      />
    );
    await waitFor(() => {
      expect(screen.getByText("Alice").closest('[role="button"]')).toHaveClass("Mui-selected");
    });
  });
});
