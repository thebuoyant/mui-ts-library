import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useGanttTranslations } from "./GanttChart";
import type { GanttTask } from "./GanttChart.types";

type GanttDeleteDialogProps = {
  open: boolean;
  task: GanttTask | null;
  onConfirm: () => void;
  onClose: () => void;
};

export function GanttDeleteDialog({ open, task, onConfirm, onClose }: GanttDeleteDialogProps) {
  const t = useGanttTranslations();
  const message = t.dialogDeleteConfirm.replace("{name}", task?.name ?? "");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      data-testid="gantt-delete-dialog"
    >
      <DialogTitle>{t.dialogDeleteTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t.dialogCancel}</Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          data-testid="gantt-dialog-delete-confirm"
        >
          {t.dialogDelete}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
