import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Paper, List, ListItemButton, Typography, Popper } from "@mui/material";
import type { MentionItem } from "./RichTextEditor.types";

export type MentionListProps = {
  items: MentionItem[];
  noResultsLabel: string;
  clientRect: (() => DOMRect | null) | null;
  onSelect: (item: MentionItem) => void;
};

export type MentionListRef = {
  onKeyDown: (event: KeyboardEvent) => boolean;
};

export const RichTextEditorMentionList = forwardRef<MentionListRef, MentionListProps>(
  function RichTextEditorMentionList({ items, noResultsLabel, clientRect, onSelect }, ref) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => { setSelectedIndex(0); }, [items]);

    useEffect(() => {
      const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
      el?.scrollIntoView({ block: "nearest" });
    }, [selectedIndex]);

    useImperativeHandle(ref, () => ({
      onKeyDown(event: KeyboardEvent) {
        if (event.key === "ArrowUp") {
          setSelectedIndex((i) => (i - 1 + items.length) % items.length);
          return true;
        }
        if (event.key === "ArrowDown") {
          setSelectedIndex((i) => (i + 1) % items.length);
          return true;
        }
        if (event.key === "Enter") {
          if (items[selectedIndex]) onSelect(items[selectedIndex]);
          return true;
        }
        return false;
      },
    }));

    // Virtual anchor element for MUI Popper derived from the editor caret position
    const virtualEl = clientRect
      ? { getBoundingClientRect: clientRect as () => DOMRect }
      : null;

    return (
      <Popper
        open={!!virtualEl}
        anchorEl={virtualEl}
        placement="bottom-start"
        modifiers={[{ name: "offset", options: { offset: [0, 4] } }]}
        style={{ zIndex: 1400 }}
      >
        <Paper elevation={4} sx={{ maxHeight: 240, overflow: "auto", minWidth: 180 }}>
          {items.length === 0 ? (
            <Typography variant="body2" sx={{ px: 2, py: 1, color: "text.secondary" }}>
              {noResultsLabel}
            </Typography>
          ) : (
            <List ref={listRef} dense disablePadding>
              {items.map((item, index) => (
                <ListItemButton
                  key={item.id}
                  selected={index === selectedIndex}
                  onMouseDown={(e) => {
                    // prevent editor from losing focus
                    e.preventDefault();
                    onSelect(item);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {item.label}
                </ListItemButton>
              ))}
            </List>
          )}
        </Paper>
      </Popper>
    );
  }
);
