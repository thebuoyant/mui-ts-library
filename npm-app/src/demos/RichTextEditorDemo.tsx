import { useState } from "react";
import { RichTextEditor } from "@thebuoyant-tsdev/mui-ts-library";
import { RICH_TEXT_SAMPLE_VALUE } from "../fixtures/richTextFixture";
import { ControlsPanel } from "../controls/ControlsPanel";
import { DemoLayout } from "../controls/DemoLayout";
import type { ControlDef, ControlValues } from "../controls/types";

const CONTROLS: ControlDef[] = [
  { key: "disabled", label: "disabled", type: "boolean" },
  { key: "error", label: "error", type: "boolean" },
  { key: "height", label: "height", type: "text" },
  { key: "helperText", label: "helperText", type: "text" },
  { key: "maxCharacters", label: "maxCharacters", type: "number", min: 0, max: 5000, step: 100 },
  { key: "placeholder", label: "placeholder", type: "text" },
  { key: "readonly", label: "readonly", type: "boolean" },
  { key: "showCharacterCount", label: "showCharacterCount", type: "boolean" },
  { key: "showToolbar", label: "showToolbar", type: "boolean" },
  { key: "showWordCount", label: "showWordCount", type: "boolean" },
  { key: "width", label: "width", type: "text" },
];

const DEFAULT_VALUES: ControlValues = {
  disabled: false,
  error: false,
  height: "300",
  helperText: "",
  maxCharacters: 0,
  placeholder: "Hier tippen …",
  readonly: false,
  showCharacterCount: true,
  showToolbar: true,
  showWordCount: true,
  width: "",
};

export function RichTextEditorDemo() {
  const [values, setValues] = useState<ControlValues>(DEFAULT_VALUES);
  const [editorValue, setEditorValue] = useState<string>(RICH_TEXT_SAMPLE_VALUE);

  const handleChange = (key: string, value: ControlValues[string]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DemoLayout
      preview={
        <RichTextEditor
          disabled={values.disabled as boolean}
          error={values.error as boolean}
          height={values.height as string}
          helperText={values.helperText as string}
          maxCharacters={values.maxCharacters as number}
          placeholder={values.placeholder as string}
          readonly={values.readonly as boolean}
          showCharacterCount={values.showCharacterCount as boolean}
          showToolbar={values.showToolbar as boolean}
          showWordCount={values.showWordCount as boolean}
          width={values.width as string}
          value={editorValue}
          onChange={setEditorValue}
        />
      }
      controls={<ControlsPanel controls={CONTROLS} values={values} onChange={handleChange} />}
    />
  );
}
