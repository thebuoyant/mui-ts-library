import { useState } from "react";
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
import type { KanbanBoardTranslation, KanbanColumn } from "./KanbanBoard.types";

export type KanbanColumnDialogState =
  | { mode: "add" }
  | { mode: "delete"; column: KanbanColumn; cardCount: number };

type Props = {
  state: KanbanColumnDialogState | null;
  t: Required<KanbanBoardTranslation>;
  onAdd: (column: KanbanColumn) => void;
  onDelete: (columnId: string) => void;
  onClose: () => void;
};

export function KanbanBoardColumnDialog({ state, t, onAdd, onDelete, onClose }: Props) {
  const [name, setName] = useState("");

  if (!state) return null;

  function handleAdd() {
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd({ id: crypto.randomUUID(), label: trimmed });
    setName("");
  }

  if (state.mode === "add") {
    return (
      <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>{t.columnAddLabel}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            size="small"
            placeholder={t.columnAddPlaceholder}
            value={name}
            onChange={(e) => setName((e.target as HTMLInputElement).value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
              if (e.key === "Escape") onClose();
            }}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t.dialogCancel}</Button>
          <Button variant="contained" onClick={handleAdd} disabled={!name.trim()}>
            {t.dialogSave}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  // mode === "delete"
  const confirmTitle = t.columnDeleteConfirm.replace("{label}", state.column.label);
  const hasCards = state.cardCount > 0;

  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{confirmTitle}</DialogTitle>
      {hasCards && (
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {t.columnDeleteCardsWarning.replace("{count}", String(state.cardCount))}
            </Typography>
          </Box>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose}>{t.dialogCancel}</Button>
        <Button color="error" variant="contained" onClick={() => onDelete(state.column.id)}>
          {t.dialogDelete}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
