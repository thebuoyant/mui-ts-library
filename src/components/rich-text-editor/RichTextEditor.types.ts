export type RichTextEditorOutputFormat = "html" | "json";

export type RichTextEditorToolbarConfig = {
  showBold?:             boolean;
  showItalic?:           boolean;
  showUnderline?:        boolean;
  showStrike?:           boolean;
  showHeading1?:         boolean;
  showHeading2?:         boolean;
  showHeading3?:         boolean;
  showBulletList?:       boolean;
  showOrderedList?:      boolean;
  showBlockquote?:       boolean;
  showCodeBlock?:        boolean;
  showLink?:             boolean;
  showHorizontalRule?:   boolean;
  showTextColor?:        boolean;
  showHighlight?:        boolean;
  showUndoRedo?:         boolean;
  showClearFormat?:      boolean;
  /** Fullscreen-Button in der Toolbar — standardmäßig deaktiviert (opt-in) */
  showFullscreenButton?: boolean;
};

export const DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG: Required<RichTextEditorToolbarConfig> = {
  showBold:             true,
  showItalic:           true,
  showUnderline:        true,
  showStrike:           true,
  showHeading1:         true,
  showHeading2:         true,
  showHeading3:         true,
  showBulletList:       true,
  showOrderedList:      true,
  showBlockquote:       true,
  showCodeBlock:        true,
  showLink:             true,
  showHorizontalRule:   true,
  showTextColor:        true,
  showHighlight:        true,
  showUndoRedo:         true,
  showClearFormat:      true,
  showFullscreenButton: false,
};

export type RichTextEditorTranslation = {
  bold:             string;
  italic:           string;
  underline:        string;
  strike:           string;
  heading1:         string;
  heading2:         string;
  heading3:         string;
  bulletList:       string;
  orderedList:      string;
  blockquote:       string;
  codeBlock:        string;
  link:             string;
  horizontalRule:   string;
  textColor:        string;
  removeTextColor:  string;
  highlight:        string;
  removeHighlight:  string;
  undo:             string;
  redo:             string;
  clearFormat:      string;
  linkDialogTitle:    string;
  linkDialogUrlLabel: string;
  linkDialogSave:     string;
  linkDialogCancel:   string;
  linkDialogRemove:   string;
  characterCount:    string;
  characterCountMax: string;
  /** Wörter-Zähler im Footer, z.B. "{count} words" */
  wordCount:         string;
  /** Tooltip für den Fullscreen-Button */
  fullscreen:        string;
  /** Tooltip für den Exit-Fullscreen-Button */
  exitFullscreen:    string;
};

export const DEFAULT_RICH_TEXT_EDITOR_TRANSLATION: RichTextEditorTranslation = {
  bold:             "Bold",
  italic:           "Italic",
  underline:        "Underline",
  strike:           "Strikethrough",
  heading1:         "Heading 1",
  heading2:         "Heading 2",
  heading3:         "Heading 3",
  bulletList:       "Bullet list",
  orderedList:      "Numbered list",
  blockquote:       "Blockquote",
  codeBlock:        "Code block",
  link:             "Insert link",
  horizontalRule:   "Horizontal rule",
  textColor:        "Text color",
  removeTextColor:  "Remove text color",
  highlight:        "Highlight",
  removeHighlight:  "Remove highlight",
  undo:             "Undo",
  redo:             "Redo",
  clearFormat:      "Clear formatting",
  linkDialogTitle:    "Insert link",
  linkDialogUrlLabel: "URL",
  linkDialogSave:     "Save",
  linkDialogCancel:   "Cancel",
  linkDialogRemove:   "Remove link",
  characterCount:    "{count} characters",
  characterCountMax: "{count} / {max} characters",
  wordCount:         "{count} words",
  fullscreen:        "Full screen",
  exitFullscreen:    "Exit full screen",
};

export type RichTextEditorProps = {
  disabled?:           boolean;
  error?:              boolean;
  /** Gesamthöhe des Editors (Toolbar + Inhalt). Zahlen → px. "auto" → füllt den umgebenden Flex-Container. */
  height?:             number | string;
  helperText?:         string;
  maxCharacters?:      number;
  name?:               string;
  outputFormat?:       RichTextEditorOutputFormat;
  placeholder?:        string;
  readonly?:           boolean;
  showCharacterCount?: boolean;
  /** Blendet die Toolbar aus ohne den Editor in den readonly-Modus zu versetzen */
  showToolbar?:        boolean;
  /** Zeigt einen Wörter-Zähler im Footer an */
  showWordCount?:      boolean;
  toolbarConfig?:      RichTextEditorToolbarConfig;
  translation?:        Partial<RichTextEditorTranslation>;
  value?:              string;
  /** Breite des Editors. Zahlen → px. "auto" oder leer → 100% des Elternelements. */
  width?:              number | string;
  // Callbacks
  onBlur?:   () => void;
  onChange?:  (value: string) => void;
  onFocus?:  () => void;
};
