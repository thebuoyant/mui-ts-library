export type RichTextEditorOutputFormat = "html" | "json";

export type RichTextEditorToolbarConfig = {
  showBold?:           boolean;
  showItalic?:         boolean;
  showUnderline?:      boolean;
  showStrike?:         boolean;
  showHeading1?:       boolean;
  showHeading2?:       boolean;
  showHeading3?:       boolean;
  showBulletList?:     boolean;
  showOrderedList?:    boolean;
  showBlockquote?:     boolean;
  showCodeBlock?:      boolean;
  showLink?:           boolean;
  showHorizontalRule?: boolean;
  showTextColor?:      boolean;
  showHighlight?:      boolean;
  showUndoRedo?:       boolean;
  showClearFormat?:    boolean;
};

export const DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG: Required<RichTextEditorToolbarConfig> = {
  showBold:           true,
  showItalic:         true,
  showUnderline:      true,
  showStrike:         true,
  showHeading1:       true,
  showHeading2:       true,
  showHeading3:       true,
  showBulletList:     true,
  showOrderedList:    true,
  showBlockquote:     true,
  showCodeBlock:      true,
  showLink:           true,
  showHorizontalRule: true,
  showTextColor:      true,
  showHighlight:      true,
  showUndoRedo:       true,
  showClearFormat:    true,
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
};

export type RichTextEditorProps = {
  value?:        string;
  onChange?:     (value: string) => void;
  placeholder?:  string;
  outputFormat?: RichTextEditorOutputFormat;
  minHeight?:    number | string;
  maxHeight?:    number | string;
  showCharacterCount?: boolean;
  maxCharacters?:      number;
  toolbarConfig?: RichTextEditorToolbarConfig;
  disabled?: boolean;
  readonly?: boolean;
  name?:       string;
  error?:      boolean;
  helperText?: string;
  translation?: Partial<RichTextEditorTranslation>;
  onBlur?:  () => void;
  onFocus?: () => void;
};
