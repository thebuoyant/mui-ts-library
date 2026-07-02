import { ReactRenderer } from "@tiptap/react";
import type { SuggestionOptions } from "@tiptap/suggestion";
import {
  RichTextEditorMentionList,
  type MentionListRef,
} from "./RichTextEditorMentionList";
import type { MentionItem } from "./RichTextEditor.types";

type BuildSuggestionOptions = {
  getItems: () => MentionItem[];
  onMentionSearch?: (query: string) => MentionItem[] | Promise<MentionItem[]>;
  noResultsLabel: string;
};

export function buildMentionSuggestion({
  getItems,
  onMentionSearch,
  noResultsLabel,
}: BuildSuggestionOptions): Partial<SuggestionOptions<MentionItem>> {
  return {
    items: async ({ query }) => {
      if (onMentionSearch) return onMentionSearch(query);
      const all = getItems();
      const q = query.toLowerCase();
      return all.filter((item) => item.label.toLowerCase().includes(q));
    },

    render() {
      let renderer: ReactRenderer<MentionListRef> | null = null;

      return {
        onStart(props) {
          renderer = new ReactRenderer(RichTextEditorMentionList, {
            props: {
              items: props.items,
              noResultsLabel,
              clientRect: props.clientRect,
              onSelect: (item: MentionItem) => props.command({ id: item.id, label: item.label }),
            },
            editor: props.editor,
          });
          // Mount into document.body so the Popper is not clipped by overflow:hidden parents
          document.body.appendChild(renderer.element);
        },

        onUpdate(props) {
          renderer?.updateProps({
            items: props.items,
            clientRect: props.clientRect,
          });
        },

        onKeyDown(props) {
          if (props.event.key === "Escape") {
            renderer?.destroy();
            renderer = null;
            return true;
          }
          return renderer?.ref?.onKeyDown(props.event) ?? false;
        },

        onExit() {
          renderer?.element.remove();
          renderer?.destroy();
          renderer = null;
        },
      };
    },
  };
}
