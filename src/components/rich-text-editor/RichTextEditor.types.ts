export type MentionItem = {
  id: string;
  label: string;
};

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
  /** Tabellen einfügen + Zeilen/Spalten verwalten — standardmäßig deaktiviert (opt-in) */
  showTableButton?:      boolean;
  /** Bilder per URL einfügen — standardmäßig deaktiviert (opt-in) */
  showImageButton?:      boolean;
  /** Emoji-Picker — standardmäßig deaktiviert (opt-in) */
  showEmojiButton?:      boolean;
  /** Toggle: eingefügter Inhalt wird von Formatierung befreit — standardmäßig deaktiviert (opt-in) */
  showPasteAsPlainTextButton?: boolean;
  /** Markdown-Import/Export-Dialog — standardmäßig deaktiviert (opt-in) */
  showMarkdownButton?:   boolean;
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
  showTableButton:      false,
  showImageButton:      false,
  showEmojiButton:      false,
  showPasteAsPlainTextButton: false,
  showMarkdownButton:   false,
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
  // Table
  table:             string;
  insertTable:       string;
  addRowBefore:      string;
  addRowAfter:       string;
  deleteRow:         string;
  addColumnBefore:   string;
  addColumnAfter:    string;
  deleteColumn:      string;
  deleteTable:       string;
  // Image
  image:             string;
  imageDialogTitle:  string;
  imageDialogUrlLabel: string;
  imageDialogAltLabel: string;
  imageDialogSave:   string;
  imageDialogCancel: string;
  // Emoji
  emoji:                  string;
  emojiSearchPlaceholder: string;
  /** Tooltip wenn Klartext-Paste AUS ist (Klick aktiviert es) @since 3.8.0 */
  pasteAsPlainText?:        string;
  /** Tooltip wenn Klartext-Paste AN ist (Klick deaktiviert es) @since 3.8.0 */
  pasteAsHtml?:             string;
  /** Tooltip für den Markdown-Button @since 3.8.0 */
  markdown?:                string;
  /** @since 3.8.0 */
  markdownDialogTitle?:       string;
  /** @since 3.8.0 */
  markdownDialogDescription?: string;
  /** @since 3.8.0 */
  markdownDialogApply?:       string;
  /** @since 3.8.0 */
  markdownDialogCancel?:      string;
  /** @since 3.8.0 */
  markdownDialogCopy?:        string;
  /** @since 3.8.0 */
  markdownDialogCopied?:      string;
  /** Text shown in mention dropdown when no items match the query @since 3.14.0 */
  mentionNoResults?:          string;
};

export const DEFAULT_RICH_TEXT_EDITOR_TRANSLATION: Required<RichTextEditorTranslation> = {
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
  table:             "Table",
  insertTable:       "Insert 3×3 table",
  addRowBefore:      "Add row before",
  addRowAfter:       "Add row after",
  deleteRow:         "Delete row",
  addColumnBefore:   "Add column before",
  addColumnAfter:    "Add column after",
  deleteColumn:      "Delete column",
  deleteTable:       "Delete table",
  image:             "Insert image",
  imageDialogTitle:  "Insert image",
  imageDialogUrlLabel: "Image URL",
  imageDialogAltLabel: "Alt text (optional)",
  imageDialogSave:   "Insert",
  imageDialogCancel: "Cancel",
  emoji:                  "Emoji",
  emojiSearchPlaceholder: "Search emoji…",
  pasteAsPlainText:          "Paste as plain text",
  pasteAsHtml:               "Paste with formatting",
  markdown:                  "Markdown",
  markdownDialogTitle:       "Markdown",
  markdownDialogDescription: "Edit as Markdown, then apply to replace the editor content. Copy to export.",
  markdownDialogApply:       "Apply",
  markdownDialogCancel:      "Cancel",
  markdownDialogCopy:        "Copy",
  markdownDialogCopied:      "Copied!",
  mentionNoResults:          "No results",
};

export type RichTextEditorProps = {
  disabled?:           boolean;
  error?:              boolean;
  /** Gesamthöhe des Editors (Toolbar + Inhalt). Zahlen → px. "auto" → füllt den umgebenden Flex-Container. */
  height?:             number | string;
  helperText?:         string;
  maxCharacters?:      number;
  name?:               string;
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
  /**
   * Initial HTML content for uncontrolled usage — set once on mount, never re-synced.
   * Analogous to MUI TextField's `defaultValue`: the editor manages its own content
   * after initialisation, no external state required.
   * When both `value` and `defaultValue` are provided, `value` takes precedence.
   */
  defaultValue?:       string;
  /** Breite des Editors. Zahlen → px. "auto" oder leer → 100% des Elternelements. */
  width?:              number | string;
  /**
   * List of items for @-mention autocomplete. The Mention extension is only active when this prop is provided.
   * Used for client-side filtering when `onMentionSearch` is not provided.
   * @since 3.14.0
   */
  mentionItems?: MentionItem[];
  /**
   * Custom search/filter function called on each keystroke after @.
   * When provided, `mentionItems` is ignored for filtering — return the relevant subset.
   * Supports async for server-side search.
   * @since 3.14.0
   */
  onMentionSearch?: (query: string) => MentionItem[] | Promise<MentionItem[]>;
  /**
   * Character that triggers the mention autocomplete popup. Default: "@"
   * @since 3.14.0
   */
  mentionTriggerChar?: string;
  // Callbacks
  onBlur?:   () => void;
  onChange?:  (value: string) => void;
  onFocus?:  () => void;
  /** Wird bei jeder Änderung zusätzlich zu onChange mit dem Inhalt als Markdown aufgerufen */
  onMarkdownChange?: (markdown: string) => void;
  /**
   * Fires when the user presses Ctrl+S (Windows/Linux) or Cmd+S (macOS) inside the editor.
   * The browser's native "Save Page" dialog is always suppressed within the editor.
   * When provided, implement your own save logic (API call, local storage, etc.).
   */
  onSave?: () => void;
};
