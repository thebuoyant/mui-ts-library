import { useState } from "react";
import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon   from "@mui/icons-material/ContentCopy";
import CheckIcon         from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon          from "@mui/icons-material/Undo";
import RedoIcon          from "@mui/icons-material/Redo";
import PlayArrowIcon     from "@mui/icons-material/PlayArrow";
import { undo, redo }   from "@codemirror/commands";
import type { EditorView } from "@codemirror/view";
import type { SqlEditorToolbarConfig, SqlEditorTranslation } from "./SqlEditor.types";

type SqlEditorToolbarProps = {
  viewRef:       React.MutableRefObject<EditorView | null>;
  toolbarConfig: Required<SqlEditorToolbarConfig>;
  translation:   SqlEditorTranslation;
  disabled?:     boolean;
  onExecute?:    (sql: string) => void;
};

type ToolbarButtonProps = {
  label:     string;
  icon:      React.ReactNode;
  onClick:   () => void;
  active?:   boolean;
  disabled?: boolean;
};

function ToolbarButton({ label, icon, onClick, active, disabled }: ToolbarButtonProps) {
  return (
    <Tooltip title={label} arrow>
      <span>
        <IconButton
          size="small"
          onClick={onClick}
          disabled={disabled}
          color={active ? "primary" : "default"}
          sx={{ borderRadius: 1 }}
          aria-label={label}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
}

export function SqlEditorToolbar({
  viewRef,
  toolbarConfig: tc,
  translation: t,
  disabled,
  onExecute,
}: SqlEditorToolbarProps) {
  const [copied, setCopied] = useState(false);
  const isDisabled = disabled || !viewRef.current;

  function handleCopy() {
    const text = viewRef.current?.state.doc.toString() ?? "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleClear() {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: "" } });
    view.focus();
  }

  function handleUndo() {
    const view = viewRef.current;
    if (!view) return;
    undo(view);
    view.focus();
  }

  function handleRedo() {
    const view = viewRef.current;
    if (!view) return;
    redo(view);
    view.focus();
  }

  function handleExecute() {
    const view = viewRef.current;
    if (!view || !onExecute) return;
    onExecute(view.state.doc.toString());
  }

  const hasActionGroup  = tc.showCopy || tc.showClear;
  const hasHistoryGroup = tc.showUndoRedo;
  const hasExecuteGroup = tc.showExecute && !!onExecute;

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0.25, px: 1, py: 0.5 }}
      role="toolbar"
      aria-label="SQL editor actions"
    >
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

      {!hasActionGroup && !hasHistoryGroup && !hasExecuteGroup && (
        <Box sx={{ height: 32 }} />
      )}
    </Box>
  );
}
