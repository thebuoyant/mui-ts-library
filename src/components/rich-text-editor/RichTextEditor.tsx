import { useEffect, useRef, useState } from "react";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import { CharacterCount } from "@tiptap/extension-character-count";
import { TableKit } from "@tiptap/extension-table";
import { Image } from "@tiptap/extension-image";
import { Markdown, type MarkdownStorage } from "tiptap-markdown";
import { Box, Divider, Paper } from "@mui/material";

// tiptap-markdown liefert keine Storage-Modulerweiterung mit — ohne das wäre
// editor.storage.markdown überall im Programm als `any`/unbekannt typisiert.
declare module "@tiptap/core" {
  interface Storage {
    markdown: MarkdownStorage;
  }
}
import {
  type RichTextEditorProps,
  DEFAULT_RICH_TEXT_EDITOR_TRANSLATION,
  DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG,
} from "./RichTextEditor.types";
import { RichTextEditorContent } from "./RichTextEditorContent";
import { RichTextEditorToolbar } from "./RichTextEditorToolbar";
import { RichTextEditorFooter } from "./RichTextEditorFooter";
import { normalizeSize } from "../shared/normalizeSize";

export function RichTextEditor({
  disabled = false,
  error = false,
  height,
  helperText,
  maxCharacters,
  name,
  placeholder,
  readonly = false,
  showCharacterCount = false,
  showToolbar = true,
  showWordCount = false,
  toolbarConfig,
  translation,
  value,
  width,
  onBlur,
  onChange,
  onFocus,
  onMarkdownChange,
}: RichTextEditorProps) {
  const t = { ...DEFAULT_RICH_TEXT_EDITOR_TRANSLATION, ...translation };
  const tc = { ...DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG, ...toolbarConfig };

  const [isFullscreen, setIsFullscreen] = useState(false);

  // Per Ref statt nur State gespiegelt, da editorProps.handlePaste einmalig beim
  // useEditor-Aufruf gebunden wird und sonst auf einen veralteten Wert zugreifen würde.
  const [pasteAsPlainText, setPasteAsPlainText] = useState(false);
  const pasteAsPlainTextRef = useRef(pasteAsPlainText);
  useEffect(() => { pasteAsPlainTextRef.current = pasteAsPlainText; }, [pasteAsPlainText]);

  const normH      = normalizeSize(height);
  const normW      = normalizeSize(width);
  const isAutoH    = normH === "auto";
  // undefined → 200px Standardhöhe
  const effectiveH = isAutoH ? undefined : (normH ?? 200);

  // CharacterCount wird auch für showWordCount benötigt
  const needsCharacterCount =
    (maxCharacters !== undefined && maxCharacters > 0) || showCharacterCount || showWordCount;

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
      ...(tc.showTableButton ? [TableKit] : []),
      ...(tc.showImageButton  ? [Image.configure({ inline: false, allowBase64: true })] : []),
      ...(needsCharacterCount
        ? maxCharacters !== undefined && maxCharacters > 0
          ? [CharacterCount.configure({ limit: maxCharacters })]
          : [CharacterCount]
        : []),
    ],
    content: value ?? "",
    editable: !disabled && !readonly,
    // editorProps.handlePaste wird vor den Plugin-Handlern der Markdown-Extension geprüft
    // (ProseMirror someProp-Reihenfolge) — überschreibt deren Auto-Konvertierung gezielt.
    editorProps: {
      handlePaste(view, event) {
        if (!pasteAsPlainTextRef.current) return false;
        const text = event.clipboardData?.getData("text/plain");
        // getData() returns "" (not null/undefined) when the clipboard has no text
        // payload at all (e.g. an image or file) — falling through here lets TipTap's
        // own paste handling take over instead of swallowing the paste into nothing.
        if (!text) return false;
        event.preventDefault();
        const { state } = view;
        view.dispatch(state.tr.insertText(text, state.selection.from, state.selection.to));
        return true;
      },
    },
    onUpdate({ editor: e }) {
      onChange?.(e.getHTML());
      onMarkdownChange?.(e.storage.markdown.getMarkdown());
    },
    onBlur() { onBlur?.(); },
    onFocus() { onFocus?.(); },
  });

  // Externen value-Prop synchronisieren ohne Cursor-Reset, wenn sich der Inhalt wirklich unterscheidet
  useEffect(() => {
    if (!editor || value === undefined) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  // editable-Flag bei disabled/readonly-Änderungen aktualisieren
  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled && !readonly);
  }, [editor, disabled, readonly]);

  const charCount = editor?.storage.characterCount?.characters?.() ?? 0;
  const wordCount = editor?.storage.characterCount?.words?.() ?? 0;

  const showFooter =
    showCharacterCount || (maxCharacters !== undefined && maxCharacters > 0) || showWordCount || !!helperText;

  return (
    <Box
      sx={
        isFullscreen
          ? {
              position:      "fixed",
              top:           0,
              left:          0,
              width:         "100vw",
              height:        "100vh",
              zIndex:        1300,
              display:       "flex",
              flexDirection: "column",
              bgcolor:       "background.default",
              p:             1,
            }
          : {
              width: normW ?? "100%",
              ...(isAutoH ? { display: "flex", flexDirection: "column", flex: 1 } : {}),
            }
      }
    >
      <Paper
        variant="outlined"
        sx={{
          display:       "flex",
          flexDirection: "column",
          overflow:      "hidden",
          ...(isFullscreen ? { flex: 1 } : isAutoH ? { flex: 1 } : { height: effectiveH }),
          borderColor: error ? "error.main" : undefined,
          "&:focus-within": {
            borderColor: error ? "error.main" : "primary.main",
            borderWidth: 2,
          },
        }}
      >
        {showToolbar && !readonly && (
          <>
            <RichTextEditorToolbar
              editor={editor}
              toolbarConfig={tc}
              translation={t}
              disabled={disabled}
              isFullscreen={isFullscreen}
              onToggleFullscreen={() => setIsFullscreen((prev) => !prev)}
              pasteAsPlainText={pasteAsPlainText}
              onTogglePasteAsPlainText={() => setPasteAsPlainText((prev) => !prev)}
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
          showWordCount={showWordCount}
          wordCount={wordCount}
          translation={t}
        />
      )}
      {name && (
        <input
          type="hidden"
          name={name}
          value={editor ? editor.getHTML() : ""}
        />
      )}
    </Box>
  );
}
