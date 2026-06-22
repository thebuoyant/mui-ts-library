import { useCallback, useRef, useState } from "react";
import { Box, Divider, Paper } from "@mui/material";
import type { EditorView } from "@codemirror/view";
import {
  type SqlEditorProps,
  DEFAULT_SQL_EDITOR_TRANSLATION,
  DEFAULT_SQL_EDITOR_TOOLBAR_CONFIG,
} from "./SqlEditor.types";
import { SqlEditorContent } from "./SqlEditorContent";
import { SqlEditorToolbar } from "./SqlEditorToolbar";
import { SqlEditorFooter }  from "./SqlEditorFooter";
import { normalizeSize } from "../shared/normalizeSize";
import { useSqlQueryHistory } from "./useSqlQueryHistory";

export function SqlEditor({
  value,
  onChange,
  placeholder,
  height,
  width,
  disabled        = false,
  readonly        = false,
  error           = false,
  helperText,
  name,
  dialect         = "standard",
  showLineNumbers = true,
  showLineColumn  = true,
  showErrorCount  = false,
  toolbarConfig,
  translation,
  highlightColors,
  schema,
  queryHistoryKey        = "sql-editor-query-history",
  queryHistoryMaxEntries = 20,
  onExecute,
  onLint,
  onBlur,
  onFocus,
}: SqlEditorProps) {
  const t  = { ...DEFAULT_SQL_EDITOR_TRANSLATION, ...translation };
  const tc = { ...DEFAULT_SQL_EDITOR_TOOLBAR_CONFIG, ...toolbarConfig };

  const { history, addEntry, clearHistory } = useSqlQueryHistory(queryHistoryKey, queryHistoryMaxEntries);

  const normH   = normalizeSize(height);
  const normW   = normalizeSize(width);
  const isAutoH = normH === "auto";
  const effectH = isAutoH ? undefined : (normH ?? 300);

  const viewRef = useRef<EditorView | null>(null);
  const [editorView,       setEditorView]       = useState<EditorView | null>(null);
  const [cursorPos,        setCursorPos]        = useState({ line: 1, col: 1 });
  const [diagnosticsCount, setDiagnosticsCount] = useState(0);

  const handleViewReady = useCallback((view: EditorView | null) => {
    viewRef.current = view;
    setEditorView(view);
  }, []);

  const handleCursorChange = useCallback((line: number, col: number) => {
    setCursorPos({ line, col });
  }, []);

  const handleDiagnosticsChange = useCallback((count: number) => {
    setDiagnosticsCount(count);
  }, []);

  const handleExecute = onExecute
    ? (sql: string) => { addEntry(sql); onExecute(sql); }
    : undefined;

  const handleSelectHistoryEntry = useCallback((sql: string) => {
    const view = viewRef.current;
    if (view) {
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: sql } });
      view.focus();
    }
    onChange?.(sql);
  }, [onChange]);

  const showFooter = showLineColumn || showErrorCount || !!helperText;

  return (
    <Box
      sx={{
        width: normW ?? "100%",
        ...(isAutoH ? { display: "flex", flexDirection: "column", flex: 1 } : {}),
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          display:       "flex",
          flexDirection: "column",
          overflow:      "hidden",
          ...(isAutoH ? { flex: 1 } : { height: effectH }),
          borderColor: error ? "error.main" : undefined,
          "&:focus-within": {
            borderColor: error ? "error.main" : "primary.main",
            borderWidth:  2,
          },
        }}
      >
        {!readonly && (
          <>
            <SqlEditorToolbar
              editorView={editorView}
              toolbarConfig={tc}
              translation={t}
              dialect={dialect}
              disabled={disabled}
              onExecute={handleExecute}
              queryHistory={history}
              onSelectHistoryEntry={handleSelectHistoryEntry}
              onClearHistory={clearHistory}
            />
            <Divider />
          </>
        )}
        <SqlEditorContent
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readonly={readonly}
          showLineNumbers={showLineNumbers}
          dialect={dialect}
          keywordColor={highlightColors?.keyword}
          stringColor={highlightColors?.string}
          identifierColor={highlightColors?.identifier}
          schema={schema}
          onExecute={handleExecute}
          onLint={onLint}
          onDiagnosticsChange={onLint ? handleDiagnosticsChange : undefined}
          onViewReady={handleViewReady}
          onCursorChange={handleCursorChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </Paper>

      {showFooter && (
        <SqlEditorFooter
          helperText={helperText}
          error={error}
          showLineColumn={showLineColumn}
          showErrorCount={showErrorCount}
          diagnosticsCount={diagnosticsCount}
          cursorLine={cursorPos.line}
          cursorCol={cursorPos.col}
          translation={t}
        />
      )}

      {name && (
        <input type="hidden" name={name} value={value ?? ""} />
      )}
    </Box>
  );
}
