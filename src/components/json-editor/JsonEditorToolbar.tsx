import { useState } from "react";
import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon       from "@mui/icons-material/Check";
import DeleteIcon      from "@mui/icons-material/Delete";
import UndoIcon        from "@mui/icons-material/Undo";
import RedoIcon        from "@mui/icons-material/Redo";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CompressIcon    from "@mui/icons-material/Compress";
import { undo, redo } from "@codemirror/commands";
import type { EditorView } from "@codemirror/view";
import type { JsonEditorToolbarConfig, JsonEditorTranslation } from "./JsonEditor.types";

type JsonEditorToolbarProps = {
  viewRef:       React.MutableRefObject<EditorView | null>;
  toolbarConfig: Required<JsonEditorToolbarConfig>;
  translation:   JsonEditorTranslation;
  indent:        number;
  disabled?:     boolean;
};

type ToolbarButtonProps = {
  label:     string;
  icon:      React.ReactNode;
  onClick:   () => void;
  disabled?: boolean;
};

function ToolbarButton({ label, icon, onClick, disabled }: ToolbarButtonProps) {
  return (
    <Tooltip title={label} arrow>
      <span>
        <IconButton
          size="small"
          onClick={onClick}
          disabled={disabled}
          color="default"
          sx={{ borderRadius: 1 }}
          aria-label={label}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
}

export function JsonEditorToolbar({
  viewRef,
  toolbarConfig: tc,
  translation: t,
  indent,
  disabled,
}: JsonEditorToolbarProps) {
  const [copied, setCopied] = useState(false);
  const isDisabled = disabled || !viewRef.current;

  function handleFormat() {
    const view = viewRef.current;
    if (!view) return;
    const raw = view.state.doc.toString();
    try {
      const formatted = JSON.stringify(JSON.parse(raw), null, indent);
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: formatted } });
    } catch {
      // leave unchanged if JSON is invalid
    }
    view.focus();
  }

  function handleCompact() {
    const view = viewRef.current;
    if (!view) return;
    const raw = view.state.doc.toString();
    try {
      const compact = JSON.stringify(JSON.parse(raw));
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: compact } });
    } catch {
      // leave unchanged if JSON is invalid
    }
    view.focus();
  }

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

  const hasFormatGroup  = tc.showFormat || tc.showCompact;
  const hasActionGroup  = tc.showCopy || tc.showClear;
  const hasHistoryGroup = tc.showUndoRedo;

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0.25, px: 1, py: 0.5 }}
      role="toolbar"
      aria-label="JSON editor actions"
    >
      {hasFormatGroup && (
        <Box sx={{ display: "flex", gap: 0.25 }}>
          {tc.showFormat && (
            <ToolbarButton
              label={t.format}
              icon={<AutoFixHighIcon fontSize="small" />}
              onClick={handleFormat}
              disabled={isDisabled}
            />
          )}
          {tc.showCompact && (
            <ToolbarButton
              label={t.compact}
              icon={<CompressIcon fontSize="small" />}
              onClick={handleCompact}
              disabled={isDisabled}
            />
          )}
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

      {!hasFormatGroup && !hasActionGroup && !hasHistoryGroup && (
        <Box sx={{ height: 32 }} />
      )}
    </Box>
  );
}
