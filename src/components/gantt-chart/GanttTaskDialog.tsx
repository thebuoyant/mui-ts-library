import { useEffect, useState, type InputHTMLAttributes } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useGanttChartStore, useGanttTranslations } from "./GanttChart";
import type { GanttTask, GanttTaskStatus } from "./GanttChart.types";

type TaskFormState = {
  name: string;
  startDate: string;
  endDate: string;
  status: GanttTaskStatus;
  isMilestone: boolean;
  parentId: string;
};

function toDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

type GanttTaskDialogProps = {
  open: boolean;
  mode: "add" | "edit";
  initialTask?: GanttTask;
  defaultParentId?: string;
  onSave: (data: Omit<GanttTask, "id">) => void;
  onClose: () => void;
};

export function GanttTaskDialog({
  open,
  mode,
  initialTask,
  defaultParentId,
  onSave,
  onClose,
}: GanttTaskDialogProps) {
  const t = useGanttTranslations();
  const tasks = useGanttChartStore((s) => s.tasks);

  const [form, setForm] = useState<TaskFormState>({
    name: "",
    startDate: toDateString(new Date()),
    endDate: toDateString(new Date()),
    status: "planned",
    isMilestone: false,
    parentId: "",
  });

  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && initialTask) {
      setForm({
        name: initialTask.name,
        startDate: toDateString(initialTask.startDate),
        endDate: toDateString(initialTask.endDate),
        status: initialTask.status,
        isMilestone: initialTask.isMilestone ?? false,
        parentId: initialTask.parentId ?? "",
      });
    } else {
      setForm({
        name: "",
        startDate: toDateString(new Date()),
        endDate: toDateString(new Date()),
        status: "planned",
        isMilestone: false,
        parentId: defaultParentId ?? "",
      });
    }
  }, [open, mode, initialTask, defaultParentId]);

  const handleStartDateChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      startDate: value,
      // Bei Meilensteinen: End-Datum synchron zum Start-Datum halten.
      endDate: prev.isMilestone ? value : prev.endDate,
    }));
  };

  const handleMilestoneChange = (checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      isMilestone: checked,
      endDate: checked ? prev.startDate : prev.endDate,
    }));
  };

  const isValid = form.name.trim() !== "" && form.startDate !== "" && form.endDate !== "";

  const handleSave = () => {
    if (!isValid) return;
    onSave({
      name: form.name.trim(),
      startDate: new Date(form.startDate),
      endDate: new Date(form.endDate),
      status: form.status,
      isMilestone: form.isMilestone || undefined,
      parentId: form.parentId || undefined,
      // Abhängigkeiten werden beim Bearbeiten aus initialTask übernommen, beim Hinzufügen leer.
      dependencies: mode === "edit" ? initialTask?.dependencies : undefined,
    });
  };

  const statusOptions: GanttTaskStatus[] = ["planned", "in-progress", "done", "blocked"];
  const statusLabels: Record<GanttTaskStatus, string> = {
    planned: t.statusPlanned,
    "in-progress": t.statusInProgress,
    done: t.statusDone,
    blocked: t.statusBlocked,
  };

  // Im Edit-Modus: eigene ID aus der Elterntask-Liste ausschließen (verhindert zirkuläre Hierarchie).
  const parentOptions = tasks.filter((task) => mode === "add" || task.id !== initialTask?.id);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      data-testid="gantt-task-dialog"
    >
      <DialogTitle>{mode === "add" ? t.dialogAddTitle : t.dialogEditTitle}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "16px !important" }}>
        <TextField
          label={t.dialogFieldName}
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          required
          fullWidth
          size="small"
          autoFocus
          inputProps={{ "data-testid": "gantt-dialog-field-name" }}
        />
        <TextField
          label={t.dialogFieldStartDate}
          type="date"
          value={form.startDate}
          onChange={(e) => handleStartDateChange(e.target.value)}
          required
          fullWidth
          size="small"
          slotProps={{ inputLabel: { shrink: true } }}
          inputProps={{ "data-testid": "gantt-dialog-field-start" }}
        />
        <TextField
          label={t.dialogFieldEndDate}
          type="date"
          value={form.endDate}
          onChange={(e) => setForm((prev) => ({ ...prev, endDate: e.target.value }))}
          required
          fullWidth
          size="small"
          disabled={form.isMilestone}
          slotProps={{ inputLabel: { shrink: true } }}
          inputProps={{ "data-testid": "gantt-dialog-field-end" }}
        />
        <FormControl size="small" fullWidth>
          <InputLabel>{t.dialogFieldStatus}</InputLabel>
          <Select
            value={form.status}
            label={t.dialogFieldStatus}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, status: e.target.value as GanttTaskStatus }))
            }
            inputProps={{ "data-testid": "gantt-dialog-field-status" }}
          >
            {statusOptions.map((s) => (
              <MenuItem key={s} value={s}>
                {statusLabels[s]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={form.isMilestone}
              onChange={(e) => handleMilestoneChange(e.target.checked)}
              size="small"
              inputProps={{ "data-testid": "gantt-dialog-field-milestone" } as InputHTMLAttributes<HTMLInputElement>}
            />
          }
          label={t.dialogFieldMilestone}
        />
        <FormControl size="small" fullWidth>
          <InputLabel>{t.dialogFieldParent}</InputLabel>
          <Select
            value={form.parentId}
            label={t.dialogFieldParent}
            onChange={(e) => setForm((prev) => ({ ...prev, parentId: e.target.value }))}
            inputProps={{ "data-testid": "gantt-dialog-field-parent" }}
          >
            <MenuItem value="">{t.dialogFieldParentNone}</MenuItem>
            {parentOptions.map((task) => (
              <MenuItem key={task.id} value={task.id}>
                {task.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t.dialogCancel}</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!isValid}
          data-testid="gantt-dialog-save"
        >
          {t.dialogSave}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
