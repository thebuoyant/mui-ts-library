import { useState } from "react";
import { type Editor } from "@tiptap/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { type RichTextEditorTranslation } from "./RichTextEditor.types";

type RichTextEditorImageDialogProps = {
  open:        boolean;
  onClose:     () => void;
  editor:      Editor;
  translation: RichTextEditorTranslation;
};

export function RichTextEditorImageDialog({
  open,
  onClose,
  editor,
  translation: t,
}: RichTextEditorImageDialogProps) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");

  function handleSave() {
    const trimmed = url.trim();
    if (!trimmed) return;
    editor.chain().focus().setImage({ src: trimmed, alt: alt.trim() || undefined }).run();
    setUrl("");
    setAlt("");
    onClose();
  }

  function handleClose() {
    setUrl("");
    setAlt("");
    onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSave();
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t.imageDialogTitle}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "16px !important" }}>
        <TextField
          autoFocus
          fullWidth
          label={t.imageDialogUrlLabel}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="outlined"
          size="small"
          placeholder="https://example.com/image.png"
        />
        <TextField
          fullWidth
          label={t.imageDialogAltLabel}
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="outlined"
          size="small"
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button onClick={handleClose}>{t.imageDialogCancel}</Button>
        <Button onClick={handleSave} variant="contained" disabled={!url.trim()}>
          {t.imageDialogSave}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
