import { useState } from "react";
import { SqlEditor } from "@thebuoyant-tsdev/mui-ts-library";
import type { SqlEditorDialect } from "@thebuoyant-tsdev/mui-ts-library";
import { SQL_EDITOR_SAMPLE_VALUE, SQL_EDITOR_SCHEMA } from "../fixtures/sqlEditorFixture";
import { ControlsPanel } from "../controls/ControlsPanel";
import { DemoLayout } from "../controls/DemoLayout";
import type { ControlDef, ControlValues } from "../controls/types";

const CONTROLS: ControlDef[] = [
  { key: "dialect", label: "dialect", type: "select", options: ["standard", "mysql", "postgresql", "sqlite", "mssql"] },
  { key: "disabled", label: "disabled", type: "boolean" },
  { key: "error", label: "error", type: "boolean" },
  { key: "height", label: "height", type: "text" },
  { key: "helperText", label: "helperText", type: "text" },
  { key: "placeholder", label: "placeholder", type: "text" },
  { key: "readonly", label: "readonly", type: "boolean" },
  { key: "showErrorCount", label: "showErrorCount", type: "boolean" },
  { key: "showLineColumn", label: "showLineColumn", type: "boolean" },
  { key: "showLineNumbers", label: "showLineNumbers", type: "boolean" },
  { key: "width", label: "width", type: "text" },
];

const DEFAULT_VALUES: ControlValues = {
  dialect: "standard",
  disabled: false,
  error: false,
  height: "300",
  helperText: "",
  placeholder: "Enter SQL query …",
  readonly: false,
  showErrorCount: true,
  showLineColumn: true,
  showLineNumbers: true,
  width: "",
};

export function SqlEditorDemo() {
  const [values, setValues] = useState<ControlValues>(DEFAULT_VALUES);
  const [editorValue, setEditorValue] = useState<string>(SQL_EDITOR_SAMPLE_VALUE);

  const handleChange = (key: string, value: ControlValues[string]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DemoLayout
      preview={
        <SqlEditor
          schema={SQL_EDITOR_SCHEMA}
          dialect={values.dialect as SqlEditorDialect}
          disabled={values.disabled as boolean}
          error={values.error as boolean}
          height={values.height as string}
          helperText={values.helperText as string}
          placeholder={values.placeholder as string}
          readonly={values.readonly as boolean}
          showErrorCount={values.showErrorCount as boolean}
          showLineColumn={values.showLineColumn as boolean}
          showLineNumbers={values.showLineNumbers as boolean}
          width={values.width as string}
          value={editorValue}
          onChange={setEditorValue}
        />
      }
      controls={<ControlsPanel controls={CONTROLS} values={values} onChange={handleChange} />}
    />
  );
}
