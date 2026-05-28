import { useState } from "react";
import { Box, Divider } from "@mui/material";
import ContentCopyIcon   from "@mui/icons-material/ContentCopy";
import CheckIcon         from "@mui/icons-material/Check";
import DeleteIcon        from "@mui/icons-material/Delete";
import UndoIcon          from "@mui/icons-material/Undo";
import RedoIcon          from "@mui/icons-material/Redo";
import PlayArrowIcon     from "@mui/icons-material/PlayArrow";
import AutoFixHighIcon   from "@mui/icons-material/AutoFixHigh";
import { undo, redo }   from "@codemirror/commands";
import type { EditorView } from "@codemirror/view";
import { format as formatSql, type SqlLanguage } from "sql-formatter";
import type { SqlEditorDialect, SqlEditorToolbarConfig, SqlEditorTranslation } from "./SqlEditor.types";
import { ToolbarButton } from "../shared/ToolbarButton";

const DIALECT_MAP: Record<SqlEditorDialect, SqlLanguage> = {
  standard:   "sql",
  mysql:      "mysql",
  postgresql: "postgresql",
  sqlite:     "sqlite",
  mssql:      "tsql",
};

type SqlEditorToolbarProps = {
  editorView:    EditorView | null;
  toolbarConfig: Required<SqlEditorToolbarConfig>;
  translation:   SqlEditorTranslation;
  dialect:       SqlEditorDialect;
  disabled?:     boolean;
  onExecute?:    (sql: string) => void;
};

export function SqlEditorToolbar({
  editorView,
  toolbarConfig: tc,
  translation: t,
  dialect,
  disabled,
  onExecute,
}: SqlEditorToolbarProps) {
  const [copied, setCopied] = useState(false);
  const isDisabled = disabled || !editorView;

  function handleCopy() {
    const text = editorView?.state.doc.toString() ?? "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleClear() {
    const view = editorView;
    if (!view) return;
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: "" } });
    view.focus();
  }

  function handleUndo() {
    const view = editorView;
    if (!view) return;
    undo(view);
    view.focus();
  }

  function handleRedo() {
    const view = editorView;
    if (!view) return;
    redo(view);
    view.focus();
  }

  function handleFormat() {
    const view = editorView;
    if (!view) return;
    const sql = view.state.doc.toString();
    try {
      const formatted = formatSql(sql, { language: DIALECT_MAP[dialect] });
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: formatted } });
    } catch {
      // leave editor unchanged if sql-formatter can't parse the input
    }
    view.focus();
  }

  function handleExecute() {
    const view = editorView;
    if (!view || !onExecute) return;
    onExecute(view.state.doc.toString());
  }

  const hasFormatGroup  = tc.showFormat;
  const hasActionGroup  = tc.showCopy || tc.showClear;
  const hasHistoryGroup = tc.showUndoRedo;
  const hasExecuteGroup = tc.showExecute && !!onExecute;

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0.25, px: 1, py: 0.5 }}
      role="toolbar"
      aria-label="SQL editor actions"
    >
      {hasFormatGroup && (
        <Box sx={{ display: "flex", gap: 0.25 }}>
          <ToolbarButton
            label={t.format}
            icon={<AutoFixHighIcon fontSize="small" />}
            onClick={handleFormat}
            disabled={isDisabled}
          />
        </Box>
      )}

      {hasFormatGroup && (hasActionGroup || hasHistoryGroup) && (
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
      )}

      {hasActionGroup && (
        <Box sx={{ display: "flex", gap: 0.25 }}>
          {tc.showCopy && (
            <ToolbarButton
              label={copied ? t.copySuccess : t.copy}
              icon={copied ? <CheckIcon fontSize="small" color="success" /> : <ContentCopyIcon fontSize="small" />}
              onClick={handleCopy}
              disabled={isDisabled}
            />
          )}
          {tc.showClear && (
            <ToolbarButton
              label={t.clear}
              icon={<DeleteIcon fontSize="small" />}
              onClick={handleClear}
              disabled={isDisabled}
            />
          )}
        </Box>
      )}

      {hasActionGroup && hasHistoryGroup && (
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
      )}

      {hasHistoryGroup && (
        <Box sx={{ display: "flex", gap: 0.25 }}>
          <ToolbarButton
            label={t.undo}
            icon={<UndoIcon fontSize="small" />}
            onClick={handleUndo}
            disabled={isDisabled}
          />
          <ToolbarButton
            label={t.redo}
            icon={<RedoIcon fontSize="small" />}
            onClick={handleRedo}
            disabled={isDisabled}
          />
        </Box>
      )}

      {hasExecuteGroup && (
        <>
          {(hasActionGroup || hasHistoryGroup) && (
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          )}
          <ToolbarButton
            label={t.execute}
            icon={<PlayArrowIcon fontSize="small" />}
            onClick={handleExecute}
            disabled={isDisabled}
          />
        </>
      )}

      {!hasFormatGroup && !hasActionGroup && !hasHistoryGroup && !hasExecuteGroup && (
        <Box sx={{ height: 32 }} />
      )}
    </Box>
  );
}
