import { type Editor, EditorContent } from "@tiptap/react";
import { Box } from "@mui/material";

type RichTextEditorContentProps = {
  editor: Editor | null;
  error?:     boolean;
  disabled?:  boolean;
  readonly?:  boolean;
  minHeight?: number | string;
  maxHeight?: number | string;
};

// Storybook-Kontrollen übergeben numerische Strings ("120") — in Zahlen umwandeln damit MUI "px" anhängt
function normalizeHeight(val: number | string | undefined): number | string | undefined {
  if (typeof val === "string" && val !== "" && val !== "auto" && !isNaN(Number(val))) {
    return Number(val);
  }
  return val;
}

export function RichTextEditorContent({
  editor,
  error,
  disabled,
  readonly,
  minHeight = 120,
  maxHeight,
}: RichTextEditorContentProps) {
  const normalizedMin = normalizeHeight(minHeight);
  const normalizedMax = normalizeHeight(maxHeight);

  // "auto" bedeutet: Editor füllt den umgebenden Container (height: 100%)
  const isAutoHeight = normalizedMax === "auto";
  // Leerer String oder undefined = kein Limit, Editor wächst mit dem Inhalt
  const hasMaxHeight = normalizedMax !== undefined && normalizedMax !== "" && !isAutoHeight;

  return (
    <Box
      sx={{
        px:       1.5,
        py:       1,
        ...(isAutoHeight ? { flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" } : {}),
        cursor:   disabled || readonly ? "default" : "text",
        opacity:  disabled ? 0.5 : 1,
        "& .ProseMirror": {
          minHeight: normalizedMin,
          ...(isAutoHeight  ? { flex: 1, height: "100%" } : {}),
          ...(hasMaxHeight  ? { maxHeight: normalizedMax } : {}),
          // Nur vertikale Scrollbar — Text bricht am Rand um, kein horizontales Scrollen
          overflowY:    hasMaxHeight ? "auto" : "visible",
          overflowX:    "hidden",
          wordBreak:    "break-word",
          overflowWrap: "break-word",
          outline: "none",
          "& p.is-editor-empty:first-of-type::before": {
            content:       "attr(data-placeholder)",
            color:         "text.disabled",
            pointerEvents: "none",
            float:         "left",
            height:        0,
          },
          "& h1": { typography: "h4", mb: 1 },
          "& h2": { typography: "h5", mb: 1 },
          "& h3": { typography: "h6", mb: 1 },
          "& p":  { my: 0.5 },
          "& ul, & ol": { pl: 3 },
          "& blockquote": {
            borderLeft:  "4px solid",
            borderColor: error ? "error.main" : "divider",
            pl:          2,
            color:       "text.secondary",
            my:          1,
          },
          "& code": {
            bgcolor:     "action.hover",
            px:          0.5,
            borderRadius: 0.5,
            fontFamily:  "monospace",
            fontSize:    "0.875em",
          },
          "& pre": {
            bgcolor:     "action.hover",
            p:           1.5,
            borderRadius: 1,
            overflowX:   "auto",
            "& code":    { bgcolor: "transparent", px: 0 },
          },
          "& a":    { color: "primary.main", cursor: "pointer" },
          // TipTap-Highlight rendert als <mark style="background-color: ...">
          "& mark": { borderRadius: 0.5, px: 0.25 },
          "& hr":   { borderColor: "divider", my: 2 },
        },
      }}
    >
      <EditorContent editor={editor} />
    </Box>
  );
}
