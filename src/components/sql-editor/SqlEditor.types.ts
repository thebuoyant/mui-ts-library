export type SqlEditorToolbarConfig = {
  showCopy?:     boolean;
  showClear?:    boolean;
  showExecute?:  boolean;
  showUndoRedo?: boolean;
};

export const DEFAULT_SQL_EDITOR_TOOLBAR_CONFIG: Required<SqlEditorToolbarConfig> = {
  showCopy:     true,
  showClear:    true,
  showExecute:  false,
  showUndoRedo: true,
};

export type SqlEditorTranslation = {
  copy:        string;
  copySuccess: string;
  clear:       string;
  execute:     string;
  undo:        string;
  redo:        string;
  lineColumn:  string;
};

export const DEFAULT_SQL_EDITOR_TRANSLATION: SqlEditorTranslation = {
  copy:        "Copy",
  copySuccess: "Copied!",
  clear:       "Clear",
  execute:     "Execute",
  undo:        "Undo",
  redo:        "Redo",
  lineColumn:  "Ln {line}, Col {col}",
};

export type SqlEditorDialect = "standard" | "mysql" | "postgresql" | "sqlite" | "mssql";

export type SqlEditorProps = {
  value?:     string;
  onChange?:  (sql: string) => void;
  placeholder?: string;
  /** Total height (toolbar + content). Numbers → px. "auto" → fills surrounding flex container. */
  height?: number | string;
  /** Width. Numbers → px. Default → 100%. */
  width?:  number | string;
  disabled?:   boolean;
  readonly?:   boolean;
  error?:      boolean;
  helperText?: string;
  /** Name for native form submission via hidden input. */
  name?:       string;
  dialect?:    SqlEditorDialect;
  showLineNumbers?: boolean;
  showLineColumn?:  boolean;
  toolbarConfig?:   SqlEditorToolbarConfig;
  translation?:     Partial<SqlEditorTranslation>;
  onExecute?: (sql: string) => void;
  onBlur?:    () => void;
  onFocus?:   () => void;
};
