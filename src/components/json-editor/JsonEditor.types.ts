export type JsonEditorToolbarConfig = {
  showFormat?:   boolean;
  showCompact?:  boolean;
  showCopy?:     boolean;
  showDownload?: boolean;
  showClear?:    boolean;
  showUndoRedo?: boolean;
};

export const DEFAULT_JSON_EDITOR_TOOLBAR_CONFIG: Required<JsonEditorToolbarConfig> = {
  showFormat:   true,
  showCompact:  true,
  showCopy:     true,
  showDownload: true,
  showClear:    true,
  showUndoRedo: true,
};

export type JsonEditorTranslation = {
  format:          string;
  compact:         string;
  copy:            string;
  copySuccess:     string;
  download:        string;
  downloadSuccess: string;
  clear:           string;
  undo:            string;
  redo:            string;
  lineColumn:      string;
  validJson:       string;
  invalidJson:     string;
};

export const DEFAULT_JSON_EDITOR_TRANSLATION: JsonEditorTranslation = {
  format:          "Format JSON",
  compact:         "Compact JSON",
  copy:            "Copy",
  copySuccess:     "Copied!",
  download:        "Download",
  downloadSuccess: "Downloaded!",
  clear:           "Clear",
  undo:            "Undo",
  redo:            "Redo",
  lineColumn:      "Ln {line}, Col {col}",
  validJson:       "Valid JSON",
  invalidJson:     "Invalid JSON",
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

export type JsonSchemaType = "string" | "number" | "integer" | "boolean" | "object" | "array" | "null";

/**
 * A focused subset of JSON Schema — type checking, required fields, enum, and
 * nested object/array shapes. Not a full JSON Schema implementation (no $ref,
 * oneOf/anyOf, pattern, min/max, etc.).
 */
export type JsonEditorSchema = {
  type?:       JsonSchemaType | JsonSchemaType[];
  properties?: Record<string, JsonEditorSchema>;
  required?:   string[];
  items?:      JsonEditorSchema;
  enum?:       unknown[];
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
  /**
   * Structurally validates the document against a focused JSON Schema subset
   * (type, required, enum, nested properties/items). Errors are shown as
   * inline diagnostics, same as parse errors. Skipped while the document
   * doesn't parse as valid JSON.
   */
  schema?:          JsonEditorSchema;
  showLineColumn?:  boolean;
  showLineNumbers?: boolean;
  /** Shows a scaled-down document overview (minimap) on the right side of the editor. */
  showMinimap?:     boolean;
  /** Shows a fold gutter — click the arrows to collapse/expand objects and arrays (default: true). */
  showFolding?:     boolean;
  /** Shows a Valid / Invalid JSON indicator in the footer. */
  showValidation?:  boolean;
  /** Filename for the Download button export. Default: "file.json". */
  downloadFilename?: string;
  toolbarConfig?:   JsonEditorToolbarConfig;
  translation?:     Partial<JsonEditorTranslation>;
  value?:           string;
  /** Width. Numbers → px. Default → 100%. */
  width?:           number | string;
  /**
   * Enables Ctrl / Cmd ⌘+Click on a value or property name to copy its full
   * JSON path (e.g. `$.users[0].name`) to the clipboard (default: true).
   */
  enablePathFinder?: boolean;
  // Callbacks
  onBlur?:        () => void;
  onChange?:      (json: string) => void;
  onFocus?:       () => void;
  /** Fired after Ctrl / Cmd ⌘+Click successfully copies a path via the path finder. */
  onPathCopy?:    (path: string) => void;
  onValidChange?: (isValid: boolean) => void;
};
