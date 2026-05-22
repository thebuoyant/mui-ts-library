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

// Numeric strings ("300") → number so MUI appends "px"; everything else unchanged
function normalizeSize(val: number | string | undefined): number | string | undefined {
  if (val === "" || val === undefined) return undefined;
  if (typeof val === "string" && val !== "auto" && !isNaN(Number(val))) return Number(val);
  return val;
}

export function SqlEditor({
  value,
  onChange,
  placeholder,
  height,
  width,
  disabled  = false,
  readonly  = false,
  error     = false,
  helperText,
  name,
  dialect   = "standard",
  showLineNumbers = true,
  showLineColumn  = true,
  toolbarConfig,
  translation,
  onExecute,
  onBlur,
  onFocus,
}: SqlEditorProps) {
  const t  = { ...DEFAULT_SQL_EDITOR_TRANSLATION, ...translation };
  const tc = { ...DEFAULT_SQL_EDITOR_TOOLBAR_CONFIG, ...toolbarConfig };

  const normH   = normalizeSize(height);
  const normW   = normalizeSize(width);
  const isAutoH = normH === "auto";
  const effectH = isAutoH ? undefined : (normH ?? 300);

  const viewRef = useRef<EditorView | null>(null);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const handleViewReady = useCallback((view: EditorView | null) => {
    viewRef.current = view;
  }, []);

  const handleCursorChange = useCallback((line: number, col: number) => {
    setCursorPos({ line, col });
  }, []);

  const showFooter = showLineColumn || !!helperText;

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
              viewRef={viewRef}
              toolbarConfig={tc}
              translation={t}
              disabled={disabled}
              onExecute={onExecute}
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
