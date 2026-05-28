import { useCallback, useRef, useState } from "react";
import { Box, Divider, Paper } from "@mui/material";
import type { EditorView } from "@codemirror/view";
import {
  type JsonEditorProps,
  DEFAULT_JSON_EDITOR_TRANSLATION,
  DEFAULT_JSON_EDITOR_TOOLBAR_CONFIG,
} from "./JsonEditor.types";
import { JsonEditorContent } from "./JsonEditorContent";
import { JsonEditorToolbar } from "./JsonEditorToolbar";
import { JsonEditorFooter }  from "./JsonEditorFooter";
import { normalizeSize } from "../shared/normalizeSize";

function isValidJson(str: string): boolean {
  if (!str.trim()) return false;
  try { JSON.parse(str); return true; } catch { return false; }
}

export function JsonEditor({
  value,
  onChange,
  onValidChange,
  placeholder,
  height,
  width,
  disabled        = false,
  readonly        = false,
  error           = false,
  helperText,
  name,
  indent          = 2,
  showLineNumbers = true,
  showLineColumn  = true,
  showMinimap     = false,
  showValidation  = false,
  toolbarConfig,
  translation,
  highlightColors,
  onBlur,
  onFocus,
}: JsonEditorProps) {
  const t  = { ...DEFAULT_JSON_EDITOR_TRANSLATION, ...translation };
  const tc = { ...DEFAULT_JSON_EDITOR_TOOLBAR_CONFIG, ...toolbarConfig };

  const normH   = normalizeSize(height);
  const normW   = normalizeSize(width);
  const isAutoH = normH === "auto";
  const effectH = isAutoH ? undefined : (normH ?? 300);

  const viewRef = useRef<EditorView | null>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [isValid,   setIsValid]   = useState(() => isValidJson(value ?? ""));

  const handleViewReady = useCallback((view: EditorView | null) => {
    viewRef.current = view;
    setEditorView(view);
  }, []);

  const handleCursorChange = useCallback((line: number, col: number) => {
    setCursorPos({ line, col });
  }, []);

  const handleChange = useCallback((json: string) => {
    const valid = isValidJson(json);
    setIsValid(valid);
    onValidChange?.(valid);
    onChange?.(json);
  }, [onChange, onValidChange]);

  const showFooter = showLineColumn || showValidation || !!helperText;

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
            borderWidth: 2,
          },
        }}
      >
        {!readonly && (
          <>
            <JsonEditorToolbar
              editorView={editorView}
              toolbarConfig={tc}
              translation={t}
              indent={indent}
              disabled={disabled}
            />
            <Divider />
          </>
        )}
        <JsonEditorContent
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readonly={readonly}
          showLineNumbers={showLineNumbers}
          showMinimap={showMinimap}
          highlightColors={highlightColors}
          onViewReady={handleViewReady}
          onCursorChange={handleCursorChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </Paper>

      {showFooter && (
        <JsonEditorFooter
          helperText={helperText}
          error={error}
          showLineColumn={showLineColumn}
          showValidation={showValidation}
          isValid={isValid}
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
