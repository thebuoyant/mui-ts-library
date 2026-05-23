export type JsonEditorToolbarConfig = {
  showFormat?:   boolean;
  showCompact?:  boolean;
  showCopy?:     boolean;
  showClear?:    boolean;
  showUndoRedo?: boolean;
};

export const DEFAULT_JSON_EDITOR_TOOLBAR_CONFIG: Required<JsonEditorToolbarConfig> = {
  showFormat:   true,
  showCompact:  true,
  showCopy:     true,
  showClear:    true,
  showUndoRedo: true,
};

export type JsonEditorTranslation = {
  format:      string;
  compact:     string;
  copy:        string;
  copySuccess: string;
  clear:       string;
  undo:        string;
  redo:        string;
  lineColumn:  string;
  validJson:   string;
  invalidJson: string;
};

export const DEFAULT_JSON_EDITOR_TRANSLATION: JsonEditorTranslation = {
  format:      "Format JSON",
  compact:     "Compact JSON",
  copy:        "Copy",
  copySuccess: "Copied!",
  clear:       "Clear",
  undo:        "Undo",
  redo:        "Redo",
  lineColumn:  "Ln {line}, Col {col}",
  validJson:   "Valid JSON",
  invalidJson: "Invalid JSON",
};

export type JsonEditorHighlightColors = {
  /** JSON property names. Default: theme primary.main (bold). */
  propertyName?: string;
  /** String values. Default: theme success.main. */
  string?:       string;
  /** Number values. Default: theme warning.main. */
  number?:       string;
  /** Boolean values (true/false). Default: theme info.main. */
  boolean?:      string;
  /** Null values. Default: theme text.secondary. */
  null?:         string;
};

export type JsonEditorProps = {
  value?:           string;
  onChange?:        (json: string) => void;
  onValidChange?:   (isValid: boolean) => void;
  placeholder?:     string;
  /** Total height (toolbar + content). Numbers → px. "auto" → fills surrounding flex container. */
  height?:          number | string;
  /** Width. Numbers → px. Default → 100%. */
  width?:           number | string;
  disabled?:        boolean;
  readonly?:        boolean;
  error?:           boolean;
  helperText?:      string;
  /** Name for native form submission via hidden input. */
  name?:            string;
  /** Indentation spaces used by the Format button. Default: 2. */
  indent?:          number;
  showLineNumbers?: boolean;
  showLineColumn?:  boolean;
  /** Shows a Valid / Invalid JSON indicator in the footer. */
  showValidation?:  boolean;
  toolbarConfig?:   JsonEditorToolbarConfig;
  translation?:     Partial<JsonEditorTranslation>;
  highlightColors?: JsonEditorHighlightColors;
  onBlur?:          () => void;
  onFocus?:         () => void;
};
