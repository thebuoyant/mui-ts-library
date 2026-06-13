import { useState } from "react";
import { PasswordStrengthMeter } from "@thebuoyant-tsdev/mui-ts-library";
import { ControlsPanel } from "../controls/ControlsPanel";
import { DemoLayout } from "../controls/DemoLayout";
import type { ControlDef, ControlValues } from "../controls/types";

const CONTROLS: ControlDef[] = [
  { key: "disabled", label: "disabled", type: "boolean" },
  { key: "error", label: "error", type: "boolean" },
  { key: "helperText", label: "helperText", type: "text" },
  { key: "inputSize", label: "inputSize", type: "select", options: ["small", "medium"] },
  { key: "passwordMinLength", label: "passwordMinLength", type: "number", min: 4, max: 32, step: 1 },
  { key: "showMeter", label: "showMeter", type: "boolean" },
  { key: "showPasswordAdornment", label: "showPasswordAdornment", type: "boolean" },
  { key: "showSegmentedBar", label: "showSegmentedBar", type: "boolean" },
  { key: "showSummary", label: "showSummary", type: "boolean" },
];

const DEFAULT_VALUES: ControlValues = {
  disabled: false,
  error: false,
  helperText: "",
  inputSize: "medium",
  passwordMinLength: 8,
  showMeter: true,
  showPasswordAdornment: true,
  showSegmentedBar: false,
  showSummary: true,
};

export function PasswordStrengthMeterDemo() {
  const [values, setValues] = useState<ControlValues>(DEFAULT_VALUES);

  const handleChange = (key: string, value: ControlValues[string]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DemoLayout
      preview={
        <PasswordStrengthMeter
          disabled={values.disabled as boolean}
          error={values.error as boolean}
          helperText={values.helperText as string}
          inputSize={values.inputSize as "small" | "medium"}
          passwordMinLength={values.passwordMinLength as number}
          showMeter={values.showMeter as boolean}
          showPasswordAdornment={values.showPasswordAdornment as boolean}
          showSegmentedBar={values.showSegmentedBar as boolean}
          showSummary={values.showSummary as boolean}
        />
      }
      controls={<ControlsPanel controls={CONTROLS} values={values} onChange={handleChange} />}
    />
  );
}
