import { useEffect, useState } from "react";
import { type Editor } from "@tiptap/react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { type RichTextEditorTranslation } from "./RichTextEditor.types";
import { useTimedFlag } from "../shared/useTimedFlag";

type RichTextEditorMarkdownDialogProps = {
  open:        boolean;
  onClose:     () => void;
  editor:      Editor;
  translation: Required<RichTextEditorTranslation>;
};

export function RichTextEditorMarkdownDialog({
  open,
  onClose,
  editor,
  translation: t,
}: RichTextEditorMarkdownDialogProps) {
  const [markdown, setMarkdown] = useState("");
  const [copied, triggerCopied] = useTimedFlag();

  // Inhalt bei jedem Öffnen neu aus dem aktuellen Editor-Inhalt befüllen
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMarkdown(editor.storage.markdown.getMarkdown());
    }
  }, [open, editor]);

  function handleApply() {
    editor.commands.setContent(markdown);
    onClose();
  }

  function handleCopy() {
    navigator.clipboard.writeText(markdown).then(() => {
      triggerCopied();
    });
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t.markdownDialogTitle}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: "16px !important" }}>
        <Typography variant="body2" color="text.secondary">
          {t.markdownDialogDescription}
        </Typography>
        <TextField
          autoFocus
          fullWidth
          multiline
          minRows={8}
          maxRows={16}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ fontFamily: "monospace" }}
          slotProps={{ htmlInput: { style: { fontFamily: "monospace", fontSize: "0.8125rem" } } }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Button
            onClick={handleCopy}
            startIcon={copied ? <CheckIcon fontSize="small" color="success" /> : <ContentCopyIcon fontSize="small" />}
          >
            {copied ? t.markdownDialogCopied : t.markdownDialogCopy}
          </Button>
        </Box>
        <Button onClick={onClose}>{t.markdownDialogCancel}</Button>
        <Button onClick={handleApply} variant="contained">
          {t.markdownDialogApply}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
