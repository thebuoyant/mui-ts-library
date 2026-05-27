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
  disabled?:        boolean;
  error?:           boolean;
  /** Total height (toolbar + content). Numbers → px. "auto" → fills surrounding flex container. */
  height?:          number | string;
  helperText?:      string;
  highlightColors?: JsonEditorHighlightColors;
  /** Indentation spaces used by the Format button. Default: 2. */
  indent?:          number;
  /** Name for native form submission via hidden input. */
  name?:            string;
  placeholder?:     string;
  readonly?:        boolean;
  showLineColumn?:  boolean;
  showLineNumbers?: boolean;
  /** Shows a scaled-down document overview (minimap) on the right side of the editor. */
  showMinimap?:     boolean;
  /** Shows a Valid / Invalid JSON indicator in the footer. */
  showValidation?:  boolean;
  toolbarConfig?:   JsonEditorToolbarConfig;
  translation?:     Partial<JsonEditorTranslation>;
  value?:           string;
  /** Width. Numbers → px. Default → 100%. */
  width?:           number | string;
  // Callbacks
  onBlur?:        () => void;
  onChange?:      (json: string) => void;
  onFocus?:       () => void;
  onValidChange?: (isValid: boolean) => void;
};
