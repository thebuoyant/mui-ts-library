import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import type { KanbanBoardTranslation, KanbanColumn, KanbanTask } from "./KanbanBoard.types";

export type KanbanDialogState =
  | { mode: "add"; columnId: string }
  | { mode: "edit"; task: KanbanTask }
  | { mode: "delete"; task: KanbanTask };

type KanbanBoardCardDialogProps = {
  state: KanbanDialogState | null;
  columns: KanbanColumn[];
  t: Required<KanbanBoardTranslation>;
  onSave: (task: KanbanTask) => void;
  onDelete: (taskId: string) => void;
  onClose: () => void;
  /** Switch from edit to delete confirmation — handled in parent. */
  onRequestDelete: (task: KanbanTask) => void;
};

export function KanbanBoardCardDialog({ state, columns, t, onSave, onDelete, onClose, onRequestDelete }: KanbanBoardCardDialogProps) {
  const isAdd    = state?.mode === "add";
  const isEdit   = state?.mode === "edit";
  const isDelete = state?.mode === "delete";

  const editTask  = isEdit   ? (state as { mode: "edit";   task: KanbanTask }).task : null;
  const deleteTask = isDelete ? (state as { mode: "delete"; task: KanbanTask }).task : null;
  const addColumnId = isAdd  ? (state as { mode: "add"; columnId: string }).columnId : null;

  // Lazy initializer — safe because the Dialog has a `key` that remounts it on each state change.
  const [form, setForm] = useState<KanbanTask>(() => {
    if (isEdit && editTask)    return { ...editTask };
    if (isAdd  && addColumnId) return { id: "", title: "", status: addColumnId };
    return { id: "", title: "", status: columns[0]?.id ?? "" };
  });

  function handleSave() {
    const title = form.title.trim();
    if (!title) return;
    onSave({ ...form, title, id: isEdit ? form.id : crypto.randomUUID() });
  }

  function field(key: keyof KanbanTask, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const titleText = isAdd ? t.dialogAddTitle : isEdit ? t.dialogEditTitle : t.dialogDeleteTitle;

  return (
    <Dialog
      open={!!state}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{titleText}</DialogTitle>

      {isDelete && deleteTask ? (
        <>
          <DialogContent>
            <DialogContentText>
              {t.dialogDeleteConfirm.replace("{title}", deleteTask.title)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>{t.dialogCancel}</Button>
            <Button color="error" startIcon={<DeleteIcon />} onClick={() => onDelete(deleteTask.id)}>
              {t.dialogDelete}
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 0.5 }}>
              <TextField
                label={t.dialogFieldTitle}
                value={form.title}
                onChange={(e) => field("title", e.target.value)}
                required
                fullWidth
                size="small"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
              <TextField
                label={t.dialogFieldDescription}
                value={form.description ?? ""}
                onChange={(e) => field("description", e.target.value || undefined)}
                fullWidth
                size="small"
                multiline
                rows={3}
              />
              <TextField
                label={t.dialogFieldAssignee}
                value={form.assignee ?? ""}
                onChange={(e) => field("assignee", e.target.value || undefined)}
                fullWidth
                size="small"
              />
              <TextField
                label={t.dialogFieldDueDate}
                type="date"
                value={form.dueDate ? form.dueDate.toISOString().split("T")[0] : ""}
                onChange={(e) =>
                  field("dueDate", e.target.value ? new Date(e.target.value + "T00:00:00") : undefined)
                }
                fullWidth
                size="small"
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                select
                label={t.dialogFieldStatus}
                value={form.status}
                onChange={(e) => field("status", e.target.value)}
                fullWidth
                size="small"
              >
                {columns.map((col) => (
                  <MenuItem key={col.id} value={col.id}>
                    {col.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ justifyContent: isEdit ? "space-between" : "flex-end" }}>
            {isEdit && editTask && (
              <Button color="error" startIcon={<DeleteIcon />} onClick={() => onRequestDelete(editTask)}>
                {t.dialogDelete}
              </Button>
            )}
            <Stack direction="row" spacing={1}>
              <Button onClick={onClose}>{t.dialogCancel}</Button>
              <Button variant="contained" onClick={handleSave} disabled={!form.title.trim()}>
                {t.dialogSave}
              </Button>
            </Stack>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
