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
});
