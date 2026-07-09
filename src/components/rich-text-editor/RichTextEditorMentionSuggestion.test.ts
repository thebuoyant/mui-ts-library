import { describe, it, expect, vi } from "vitest";
import { createMentionSelectHandler } from "./RichTextEditorMentionSuggestion";
import type { MentionItem } from "./RichTextEditor.types";

const ITEM: MentionItem = { id: "1", label: "Alice" };

describe("createMentionSelectHandler", () => {
  it("Should call command with id and label when invoked", () => {
    const command = vi.fn();
    const handler = createMentionSelectHandler(command);
    handler(ITEM);
    expect(command).toHaveBeenCalledWith({ id: "1", label: "Alice" });
  });

  it("Should call onMentionInserted with the selected item", () => {
    const command = vi.fn();
    const onMentionInserted = vi.fn();
    const handler = createMentionSelectHandler(command, onMentionInserted);
    handler(ITEM);
    expect(onMentionInserted).toHaveBeenCalledOnce();
    expect(onMentionInserted).toHaveBeenCalledWith(ITEM);
  });

  it("Should call command before onMentionInserted", () => {
    const callOrder: string[] = [];
    const handler = createMentionSelectHandler(
      vi.fn(() => { callOrder.push("command"); }),
      vi.fn(() => { callOrder.push("callback"); }),
    );
    handler(ITEM);
    expect(callOrder).toEqual(["command", "callback"]);
  });

  it("Should not throw when onMentionInserted is not provided", () => {
    const command = vi.fn();
    const handler = createMentionSelectHandler(command);
    expect(() => handler(ITEM)).not.toThrow();
    expect(command).toHaveBeenCalledWith({ id: "1", label: "Alice" });
  });
});
