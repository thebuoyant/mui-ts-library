import { useEffect, useMemo, useRef, useState, type InputHTMLAttributes } from "react";
import {
  Box,
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
  Tooltip,
  Typography,
} from "@mui/material";
import { useGanttChartStore, useGanttTranslations } from "./GanttChart";
import type { GanttTask, GanttTaskNode, GanttTaskStatus } from "./GanttChart.types";

type TaskFormState = {
  name: string;
  startDate: string;
  endDate: string;
  status: GanttTaskStatus;
  isMilestone: boolean;
  parentId: string;
  dependencies: string[];
};

function toDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function clampDate(date: Date, start: Date, end: Date): Date {
  if (date < start) return start;
  if (date > end) return end;
  return date;
}

// DFS-Traversal des Task-Baums — liefert Tasks in Anzeigereihenfolge mit depth-Info.
function flattenTree(nodes: GanttTaskNode[]): GanttTaskNode[] {
  return nodes.flatMap((n) => [n, ...flattenTree(n.children)]);
}

// Tooltip nur wenn der Text tatsächlich abgeschnitten ist (scrollWidth > clientWidth).
function OverflowTooltip({ label }: { label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [overflow, setOverflow] = useState(false);
  return (
    <Tooltip title={label} disableHoverListener={!overflow}>
      <Typography
        ref={ref}
        component="span"
        variant="body2"
        noWrap
        sx={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}
        onMouseEnter={() => {
          if (ref.current) setOverflow(ref.current.scrollWidth > ref.current.clientWidth);
        }}
      >
        {label}
      </Typography>
    </Tooltip>
  );
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
  const taskTree = useGanttChartStore((s) => s.taskTree);
  const timelineRange = useGanttChartStore((s) => s.timelineRange);

  // Task-Liste in Baum-Reihenfolge (DFS) für die übergeordnete-Aufgabe-Auswahl.
  const flattenedTasks = useMemo(() => flattenTree(taskTree), [taskTree]);

  // Im Edit-Modus: aktuellen Task + alle Nachkommen ausschließen (verhindert zirkuläre Hierarchie).
  const excludedIds = useMemo(() => {
    if (mode === "add" || !initialTask) return new Set<string>();
    const collect = (node: GanttTaskNode): string[] => [node.id, ...node.children.flatMap(collect)];
    const node = flattenedTasks.find((n) => n.id === initialTask.id);
    return new Set(node ? collect(node) : [initialTask.id]);
  }, [mode, initialTask, flattenedTasks]);

  const parentOptions = flattenedTasks.filter((n) => !excludedIds.has(n.id));
  const dependencyOptions = parentOptions; // gleiche Ausschlussmenge wie Elternelement

  const defaultDate = toDateString(
    clampDate(new Date(), timelineRange.start, timelineRange.end),
  );

  const [form, setForm] = useState<TaskFormState>({
    name: "",
    startDate: defaultDate,
    endDate: defaultDate,
    status: "planned",
    isMilestone: false,
    parentId: "",
    dependencies: [],
  });

  useEffect(() => {
    if (!open) return;
    const clamped = toDateString(clampDate(new Date(), timelineRange.start, timelineRange.end));
    if (mode === "edit" && initialTask) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: initialTask.name,
        startDate: toDateString(initialTask.startDate),
        endDate: toDateString(initialTask.endDate),
        status: initialTask.status,
        isMilestone: initialTask.isMilestone ?? false,
        parentId: initialTask.parentId ?? "",
        dependencies: initialTask.dependencies ?? [],
      });
    } else {
      setForm({
        name: "",
        startDate: clamped,
        endDate: clamped,
        status: "planned",
        isMilestone: false,
        parentId: defaultParentId ?? "",
        dependencies: [],
      });
    }
  }, [open, mode, initialTask, defaultParentId, timelineRange]);

  const handleStartDateChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      startDate: value,
      // Bei Meilensteinen synchron; sonst sicherstellen dass End-Datum nicht vor Start-Datum liegt.
      endDate: prev.isMilestone || prev.endDate < value ? value : prev.endDate,
    }));
  };

  const handleEndDateChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      // End-Datum darf nicht vor Start-Datum liegen — auf Start klemmen falls nötig.
      endDate: value < prev.startDate ? prev.startDate : value,
    }));
  };

  const handleMilestoneChange = (checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      isMilestone: checked,
      endDate: checked ? prev.startDate : prev.endDate,
    }));
  };

  const isValid =
    form.name.trim() !== "" &&
    form.startDate !== "" &&
    form.endDate !== "" &&
    form.endDate >= form.startDate;

  const handleSave = () => {
    if (!isValid) return;
    onSave({
      name: form.name.trim(),
      startDate: new Date(form.startDate),
      endDate: new Date(form.endDate),
      status: form.status,
      isMilestone: form.isMilestone || undefined,
      parentId: form.parentId || undefined,
      dependencies: form.dependencies.length > 0 ? form.dependencies : undefined,
    });
  };

  const statusOptions: GanttTaskStatus[] = ["planned", "in-progress", "done", "blocked"];
  const statusLabels: Record<GanttTaskStatus, string> = {
    planned: t.statusPlanned,
    "in-progress": t.statusInProgress,
    done: t.statusDone,
    blocked: t.statusBlocked,
  };

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
          onChange={(e) => handleEndDateChange(e.target.value)}
          required
          fullWidth
          size="small"
          disabled={form.isMilestone}
          slotProps={{ inputLabel: { shrink: true } }}
          inputProps={{ "data-testid": "gantt-dialog-field-end", min: form.startDate }}
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
            MenuProps={{ PaperProps: { sx: { maxHeight: 280 } } }}
          >
            <MenuItem value="">{t.dialogFieldParentNone}</MenuItem>
            {parentOptions.map((task) => (
              <MenuItem key={task.id} value={task.id} sx={{ minWidth: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    pl: task.depth * 2,
                    gap: 0.75,
                    minWidth: 0,
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  {task.depth > 0 && (
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ color: "text.disabled", lineHeight: 1, flexShrink: 0 }}
                    >
                      {"└"}
                    </Typography>
                  )}
                  <OverflowTooltip label={task.name} />
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" fullWidth>
          <InputLabel>{t.dialogFieldDependencies}</InputLabel>
          <Select
            multiple
            value={form.dependencies}
            label={t.dialogFieldDependencies}
            onChange={(e) => {
              const val = e.target.value;
              setForm((prev) => ({
                ...prev,
                dependencies: typeof val === "string" ? val.split(",") : val,
              }));
            }}
            inputProps={{ "data-testid": "gantt-dialog-field-dependencies" }}
            renderValue={(selected) => {
              if (selected.length === 0) return t.dialogFieldDependenciesNone;
              return selected
                .map((id) => flattenedTasks.find((n) => n.id === id)?.name ?? id)
                .join(", ");
            }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 280 } } }}
          >
            {dependencyOptions.map((task) => (
              <MenuItem key={task.id} value={task.id} sx={{ minWidth: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    pl: task.depth * 2,
                    gap: 0.75,
                    minWidth: 0,
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  {task.depth > 0 && (
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ color: "text.disabled", lineHeight: 1, flexShrink: 0 }}
                    >
                      {"└"}
                    </Typography>
                  )}
                  <OverflowTooltip label={task.name} />
                </Box>
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
