import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useConfirm } from "@thebuoyant-tsdev/mui-ts-library";
import type { ConfirmDialogOptions, ConfirmDialogSeverity } from "@thebuoyant-tsdev/mui-ts-library";
import { ControlsPanel } from "../controls/ControlsPanel";
import { DemoLayout } from "../controls/DemoLayout";
import type { ControlDef, ControlValues } from "../controls/types";

const CONTROLS: ControlDef[] = [
  { key: "cancelLabel", label: "cancelLabel", type: "text" },
  { key: "confirmLabel", label: "confirmLabel", type: "text" },
  { key: "countdown", label: "countdown", type: "number", min: 0, max: 10, step: 1 },
  { key: "description", label: "description", type: "text" },
  { key: "hideCancelButton", label: "hideCancelButton", type: "boolean" },
  { key: "maxWidth", label: "maxWidth", type: "select", options: ["xs", "sm", "md", "lg", "xl"] },
  { key: "severity", label: "severity", type: "select", options: ["info", "warning", "error", "success"] },
  { key: "showIcon", label: "showIcon", type: "boolean" },
  { key: "title", label: "title", type: "text" },
];

const DEFAULT_VALUES: ControlValues = {
  cancelLabel: "Abbrechen",
  confirmLabel: "Bestätigen",
  countdown: 0,
  description: "Diese Aktion kann nicht rückgängig gemacht werden.",
  hideCancelButton: false,
  maxWidth: "sm",
  severity: "warning",
  showIcon: true,
  title: "Eintrag löschen?",
};

export function ConfirmDialogDemo() {
  const [values, setValues] = useState<ControlValues>(DEFAULT_VALUES);
  const [result, setResult] = useState<boolean | null>(null);
  const confirm = useConfirm();

  const handleChange = (key: string, value: ControlValues[string]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleOpen = async () => {
    const options: ConfirmDialogOptions = {
      title: values.title as string,
      description: values.description as string,
      confirmLabel: values.confirmLabel as string,
      cancelLabel: values.cancelLabel as string,
      severity: values.severity as ConfirmDialogSeverity,
      showIcon: values.showIcon as boolean,
      hideCancelButton: values.hideCancelButton as boolean,
      maxWidth: values.maxWidth as ConfirmDialogOptions["maxWidth"],
      ...(Number(values.countdown) > 0 ? { countdown: Number(values.countdown) } : {}),
    };

    const confirmed = await confirm(options);
    setResult(confirmed);
  };

  const resultLabel =
    result === null ? "Noch keine Interaktion" : result ? "Ergebnis: Bestätigt ✅" : "Ergebnis: Abgebrochen ❌";

  return (
    <DemoLayout
      preview={
        <Stack spacing={2}>
          <Button variant="contained" onClick={handleOpen}>
            Dialog öffnen
          </Button>
          <Typography>{resultLabel}</Typography>
        </Stack>
      }
      controls={<ControlsPanel controls={CONTROLS} values={values} onChange={handleChange} />}
    />
  );
}
