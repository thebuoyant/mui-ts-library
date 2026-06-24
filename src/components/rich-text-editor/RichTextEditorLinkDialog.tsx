import { useState, useEffect } from "react";
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

type RichTextEditorLinkDialogProps = {
  open:        boolean;
  onClose:     () => void;
  editor:      Editor;
  translation: Required<RichTextEditorTranslation>;
};

export function RichTextEditorLinkDialog({
  open,
  onClose,
  editor,
  translation: t,
}: RichTextEditorLinkDialogProps) {
  const [url, setUrl] = useState("");

  // Beim Öffnen die aktuelle Link-URL vorbelegen
  useEffect(() => {
    if (open) {
      const existing = editor.getAttributes("link").href as string | undefined;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUrl(existing ?? "");
    }
  }, [open, editor]);

  const hasExistingLink = editor.isActive("link");

  function handleSave() {
    if (!url.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url.trim() })
        .run();
    }
    onClose();
  }

  function handleRemove() {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSave();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t.linkDialogTitle}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label={t.linkDialogUrlLabel}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
          placeholder="https://"
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        {hasExistingLink && (
          <Button onClick={handleRemove} color="error" sx={{ mr: "auto" }}>
            {t.linkDialogRemove}
          </Button>
        )}
        <Button onClick={onClose}>{t.linkDialogCancel}</Button>
        <Button onClick={handleSave} variant="contained">
          {t.linkDialogSave}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
