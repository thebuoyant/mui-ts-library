import { useEffect } from "react";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Box, Divider, Paper } from "@mui/material";
import {
  type RichTextEditorProps,
  DEFAULT_RICH_TEXT_EDITOR_TRANSLATION,
  DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG,
} from "./RichTextEditor.types";
import { RichTextEditorContent } from "./RichTextEditorContent";
import { RichTextEditorToolbar } from "./RichTextEditorToolbar";
import { RichTextEditorFooter } from "./RichTextEditorFooter";

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  outputFormat = "html",
  minHeight,
  maxHeight,
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
      Placeholder.configure({ placeholder: placeholder ?? "" }),
      ...(maxCharacters !== undefined
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
      editor.commands.setContent(value, false);
    }
  }, [editor, value, outputFormat]);

  // editable-Flag bei disabled/readonly-Änderungen aktualisieren
  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled && !readonly);
  }, [editor, disabled, readonly]);

  const charCount = editor?.storage.characterCount?.characters?.() ?? 0;

  const showFooter =
    showCharacterCount || maxCharacters !== undefined || !!helperText;

  return (
    <Box>
      <Paper
        variant="outlined"
        sx={{
          borderColor: error ? "error.main" : undefined,
          "&:focus-within": {
            borderColor: error ? "error.main" : "primary.main",
            borderWidth: 2,
          },
          overflow: "hidden",
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
          minHeight={minHeight}
          maxHeight={maxHeight}
        />
      </Paper>
      {showFooter && (
        <RichTextEditorFooter
          helperText={helperText}
          error={error}
          showCharacterCount={showCharacterCount || maxCharacters !== undefined}
          charCount={charCount}
          maxCharacters={maxCharacters}
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
