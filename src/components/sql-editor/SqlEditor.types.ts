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
  /** Shows a "Query history" button — requires `onExecute` to be set (default: false). */
  showHistory?:  boolean;
};

export const DEFAULT_SQL_EDITOR_TOOLBAR_CONFIG: Required<SqlEditorToolbarConfig> = {
  showFormat:   true,
  showCopy:     true,
  showClear:    true,
  showExecute:  false,
  showUndoRedo: true,
  showHistory:  false,
};

export type SqlEditorTranslation = {
  format:        string;
  copy:          string;
  copySuccess:   string;
  clear:         string;
  execute:       string;
  undo:          string;
  redo:          string;
  lineColumn:    string;
  errorCount:    string;
  history:       string;
  historyEmpty:  string;
  clearHistory:  string;
};

export const DEFAULT_SQL_EDITOR_TRANSLATION: SqlEditorTranslation = {
  format:        "Format SQL",
  copy:          "Copy",
  copySuccess:   "Copied!",
  clear:         "Clear",
  execute:       "Execute",
  undo:          "Undo",
  redo:          "Redo",
  lineColumn:    "Ln {line}, Col {col}",
  errorCount:    "{count} error(s)",
  history:       "Query history",
  historyEmpty:  "No queries yet",
  clearHistory:  "Clear history",
};

export type SqlEditorDialect = "standard" | "mysql" | "postgresql" | "sqlite" | "mssql";

export type SqlColumn = {
  name:  string;
  type?: string;
};

export type SqlTable = {
  name:     string;
  columns?: SqlColumn[];
};

export type SqlSchema = {
  tables: SqlTable[];
};

export type SqlEditorHighlightColors = {
  /** SQL keywords like SELECT, FROM, WHERE. Default: theme primary.main (bold). */
  keyword?:    string;
  /** String literals like 'value'. Default: theme success.main (bold). */
  string?:     string;
  /** Identifiers: table names, column names, aliases. Default: theme info.main. */
  identifier?: string;
};

export type SqlEditorProps = {
  dialect?:         SqlEditorDialect;
  disabled?:        boolean;
  error?:           boolean;
  /** Total height (toolbar + content). Numbers → px. "auto" → fills surrounding flex container. */
  height?:          number | string;
  helperText?:      string;
  highlightColors?: SqlEditorHighlightColors;
  /** Name for native form submission via hidden input. */
  name?:            string;
  placeholder?:     string;
  /** localStorage key for the query history — set a unique value if multiple SqlEditors run on the same page (default: "sql-editor-query-history"). */
  queryHistoryKey?:        string;
  /** Maximum number of entries kept in the query history (default: 20). */
  queryHistoryMaxEntries?: number;
  readonly?:        boolean;
  schema?:          SqlSchema;
  showErrorCount?:  boolean;
  showLineColumn?:  boolean;
  showLineNumbers?: boolean;
  toolbarConfig?:   SqlEditorToolbarConfig;
  translation?:     Partial<SqlEditorTranslation>;
  value?:           string;
  /** Width. Numbers → px. Default → 100%. */
  width?:           number | string;
  // Callbacks
  onBlur?:    () => void;
  onChange?:  (sql: string) => void;
  onExecute?: (sql: string) => void;
  onFocus?:   () => void;
  onLint?:    (sql: string) => Promise<SqlLintError[]> | SqlLintError[];
};
