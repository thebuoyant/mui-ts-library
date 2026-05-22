export type SqlLintError = {
  line:      number;
  col?:      number;
  message:   string;
  severity?: "error" | "warning" | "info";
};

export type SqlEditorToolbarConfig = {
  showFormat?:   boolean;
  showCopy?:     boolean;
  showClear?:    boolean;
  showExecute?:  boolean;
  showUndoRedo?: boolean;
};

export const DEFAULT_SQL_EDITOR_TOOLBAR_CONFIG: Required<SqlEditorToolbarConfig> = {
  showFormat:   true,
  showCopy:     true,
  showClear:    true,
  showExecute:  false,
  showUndoRedo: true,
};

export type SqlEditorTranslation = {
  format:      string;
  copy:        string;
  copySuccess: string;
  clear:       string;
  execute:     string;
  undo:        string;
  redo:        string;
  lineColumn:  string;
  errorCount:  string;
};

export const DEFAULT_SQL_EDITOR_TRANSLATION: SqlEditorTranslation = {
  format:      "Format SQL",
  copy:        "Copy",
  copySuccess: "Copied!",
  clear:       "Clear",
  execute:     "Execute",
  undo:        "Undo",
  redo:        "Redo",
  lineColumn:  "Ln {line}, Col {col}",
  errorCount:  "{count} error(s)",
};

export type SqlEditorDialect = "standard" | "mysql" | "postgresql" | "sqlite" | "mssql";

export type SqlEditorHighlightColors = {
  /** SQL keywords like SELECT, FROM, WHERE. Default: theme primary.main (bold). */
  keyword?:    string;
  /** String literals like 'value'. Default: theme success.main (bold). */
  string?:     string;
  /** Identifiers: table names, column names, aliases. Default: theme info.main. */
  identifier?: string;
};

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
  showErrorCount?:  boolean;
  toolbarConfig?:    SqlEditorToolbarConfig;
  translation?:      Partial<SqlEditorTranslation>;
  highlightColors?:  SqlEditorHighlightColors;
  onExecute?: (sql: string) => void;
  onLint?:    (sql: string) => Promise<SqlLintError[]> | SqlLintError[];
  onBlur?:    () => void;
  onFocus?:   () => void;
};
