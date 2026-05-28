import { type Editor, EditorContent } from "@tiptap/react";
import { Box } from "@mui/material";

type RichTextEditorContentProps = {
  editor:    Editor | null;
  error?:    boolean;
  disabled?: boolean;
  readonly?: boolean;
};

export function RichTextEditorContent({
  editor,
  error,
  disabled,
  readonly,
}: RichTextEditorContentProps) {
  return (
    <Box
      sx={{
        flex:          1,
        minHeight:     0,
        display:       "flex",
        flexDirection: "column",
        px:            1.5,
        py:            1,
        cursor:  disabled || readonly ? "default" : "text",
        opacity: disabled ? 0.5 : 1,
        // EditorContent rendert ein umhüllendes <div> — auch dieses muss flex-column füllen
        "& > div": { flex: 1, display: "flex", flexDirection: "column", minHeight: 0 },
        "& .ProseMirror": {
          flex:         1,
          minHeight:    0,
          overflowY:    "auto",
          overflowX:    "hidden",
          wordBreak:    "break-word",
          overflowWrap: "break-word",
          outline:      "none",
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
            bgcolor:      "action.hover",
            px:           0.5,
            borderRadius: 0.5,
            fontFamily:   "monospace",
            fontSize:     "0.875em",
          },
          "& pre": {
            bgcolor:      "action.hover",
            p:            1.5,
            borderRadius: 1,
            overflowX:    "auto",
            "& code":     { bgcolor: "transparent", px: 0 },
          },
          "& a":    { color: "primary.main", cursor: "pointer" },
          "& mark": { borderRadius: 0.5, px: 0.25 },
          "& hr":   { borderColor: "divider", my: 2 },
          // Table styles
          "& table": {
            borderCollapse: "collapse",
            tableLayout:    "fixed",
            width:          "100%",
            margin:         "8px 0",
            overflowX:      "auto",
          },
          "& table td, & table th": {
            border:         "1px solid",
            borderColor:    "divider",
            padding:        "6px 8px",
            verticalAlign:  "top",
            boxSizing:      "border-box",
            minWidth:       "2em",
            position:       "relative",
          },
          "& table th": {
            fontWeight: "bold",
            bgcolor:    "action.hover",
          },
          "& table .selectedCell::after": {
            content:        '""',
            position:       "absolute",
            inset:          0,
            bgcolor:        "primary.main",
            opacity:        0.12,
            pointerEvents:  "none",
            zIndex:         2,
          },
          // Image styles
          "& img": {
            maxWidth:     "100%",
            height:       "auto",
            borderRadius: "4px",
            display:      "block",
            my:           1,
          },
        },
      }}
    >
      <EditorContent editor={editor} />
    </Box>
  );
}
