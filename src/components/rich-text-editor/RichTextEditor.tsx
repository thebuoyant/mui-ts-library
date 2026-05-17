import { useEffect } from "react";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Markdown } from "tiptap-markdown";
import { Box, Divider, Paper } from "@mui/material";
import {
  type RichTextEditorProps,
  DEFAULT_RICH_TEXT_EDITOR_TRANSLATION,
  DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG,
} from "./RichTextEditor.types";
import { RichTextEditorContent } from "./RichTextEditorContent";
import { RichTextEditorToolbar } from "./RichTextEditorToolbar";
import { RichTextEditorFooter } from "./RichTextEditorFooter";

// Numerische Strings ("300") → Zahl, damit MUI "px" anhängt; alles andere unverändert
function normalizeSize(val: number | string | undefined): number | string | undefined {
  if (val === "" || val === undefined) return undefined;
  if (typeof val === "string" && val !== "auto" && !isNaN(Number(val))) return Number(val);
  return val;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  outputFormat = "html",
  height,
  width,
  showCharacterCount = false,
  maxCharacters,
  toolbarConfig,
  disabled = false,
  readonly = false,
  name,
  error = false,
  helperText,
  translation,
  onBlur,
  onFocus,
}: RichTextEditorProps) {
  const t = { ...DEFAULT_RICH_TEXT_EDITOR_TRANSLATION, ...translation };
  const tc = { ...DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG, ...toolbarConfig };

  const normH      = normalizeSize(height);
  const normW      = normalizeSize(width);
  const isAutoH    = normH === "auto";
  // undefined → 200px Standardhöhe
  const effectiveH = isAutoH ? undefined : (normH ?? 200);

  const editor = useEditor({
    // TipTap v3 rendert ohne dieses Flag nicht bei jedem Transaction neu → Toolbar-State wäre veraltet
    shouldRerenderOnTransaction: true,
    extensions: [
      // TipTap v3: StarterKit enthält bereits Underline und Link
      StarterKit.configure({
        link: { openOnClick: false },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      // Eingefügter Markdown-Text wird automatisch in Rich-Text umgewandelt
      Markdown.configure({ transformPastedText: true, transformCopiedText: false }),
      Placeholder.configure({ placeholder: placeholder ?? "" }),
      ...(maxCharacters !== undefined && maxCharacters > 0
        ? [CharacterCount.configure({ limit: maxCharacters })]
        : showCharacterCount
          ? [CharacterCount]
          : []),
    ],
    content: value ?? "",
    editable: !disabled && !readonly,
    onUpdate({ editor: e }) {
      if (!onChange) return;
      const output =
        outputFormat === "json"
          ? JSON.stringify(e.getJSON())
          : e.getHTML();
      onChange(output);
    },
    onBlur() { onBlur?.(); },
    onFocus() { onFocus?.(); },
  });

  // Externen value-Prop synchronisieren ohne Cursor-Reset, wenn sich der Inhalt wirklich unterscheidet
  useEffect(() => {
    if (!editor || value === undefined) return;
    const current =
      outputFormat === "json"
        ? JSON.stringify(editor.getJSON())
        : editor.getHTML();
    if (current !== value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value, outputFormat]);

  // editable-Flag bei disabled/readonly-Änderungen aktualisieren
  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled && !readonly);
  }, [editor, disabled, readonly]);

  const charCount = editor?.storage.characterCount?.characters?.() ?? 0;

  const showFooter =
    showCharacterCount || (maxCharacters !== undefined && maxCharacters > 0) || !!helperText;

  return (
    <Box
      sx={{
        width: normW ?? "100%",
        ...(isAutoH ? { display: "flex", flexDirection: "column", flex: 1 } : {}),
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          display:       "flex",
          flexDirection: "column",
          overflow:      "hidden",
          ...(isAutoH ? { flex: 1 } : { height: effectiveH }),
          borderColor: error ? "error.main" : undefined,
          "&:focus-within": {
            borderColor: error ? "error.main" : "primary.main",
            borderWidth: 2,
          },
        }}
      >
        {!readonly && (
          <>
            <RichTextEditorToolbar
              editor={editor}
              toolbarConfig={tc}
              translation={t}
              disabled={disabled}
            />
            <Divider />
          </>
        )}
        <RichTextEditorContent
          editor={editor}
          error={error}
          disabled={disabled}
          readonly={readonly}
        />
      </Paper>
      {showFooter && (
        <RichTextEditorFooter
          helperText={helperText}
          error={error}
          showCharacterCount={showCharacterCount || (maxCharacters !== undefined && maxCharacters > 0)}
          charCount={charCount}
          maxCharacters={maxCharacters && maxCharacters > 0 ? maxCharacters : undefined}
          translation={t}
        />
      )}
      {name && (
        <input
          type="hidden"
          name={name}
          value={
            editor
              ? outputFormat === "json"
                ? JSON.stringify(editor.getJSON())
                : editor.getHTML()
              : ""
          }
        />
      )}
    </Box>
  );
}
