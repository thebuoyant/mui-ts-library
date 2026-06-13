import { useState } from "react";
import { TagSelection } from "@thebuoyant-tsdev/mui-ts-library";
import type { TagSelectionItem } from "@thebuoyant-tsdev/mui-ts-library";
import { TAG_SELECTION_TAGS } from "../fixtures/tagSelectionTags";
import { ControlsPanel } from "../controls/ControlsPanel";
import { DemoLayout } from "../controls/DemoLayout";
import type { ControlDef, ControlValues } from "../controls/types";

const CONTROLS: ControlDef[] = [
  { key: "allowCreate", label: "allowCreate", type: "boolean" },
  { key: "chipSize", label: "chipSize", type: "select", options: ["small", "medium"] },
  { key: "disabled", label: "disabled", type: "boolean" },
  { key: "inputSize", label: "inputSize", type: "select", options: ["small", "medium"] },
  { key: "listboxMaxHeight", label: "listboxMaxHeight", type: "number", min: 100, max: 600, step: 10 },
  { key: "loading", label: "loading", type: "boolean" },
  { key: "maxTags", label: "maxTags", type: "number", min: 1, max: 20, step: 1 },
  { key: "maxVisibleChips", label: "maxVisibleChips", type: "number", min: 1, max: 20, step: 1 },
  { key: "popoverPlacement", label: "popoverPlacement", type: "select", options: ["top", "bottom"] },
  { key: "showAutoComplete", label: "showAutoComplete", type: "boolean" },
  { key: "showSelectedTags", label: "showSelectedTags", type: "boolean" },
  { key: "showSelectedTagsLabel", label: "showSelectedTagsLabel", type: "boolean" },
];

const DEFAULT_VALUES: ControlValues = {
  allowCreate: true,
  chipSize: "small",
  disabled: false,
  inputSize: "medium",
  listboxMaxHeight: 200,
  loading: false,
  maxTags: 10,
  maxVisibleChips: 10,
  popoverPlacement: "bottom",
  showAutoComplete: true,
  showSelectedTags: true,
  showSelectedTagsLabel: true,
};

export function TagSelectionDemo() {
  const [values, setValues] = useState<ControlValues>(DEFAULT_VALUES);
  const [tags, setTags] = useState<TagSelectionItem[]>(TAG_SELECTION_TAGS);

  const handleChange = (key: string, value: ControlValues[string]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DemoLayout
      preview={
        <TagSelection
          tags={tags}
          allowCreate={values.allowCreate as boolean}
          chipSize={values.chipSize as "small" | "medium"}
          disabled={values.disabled as boolean}
          inputSize={values.inputSize as "small" | "medium"}
          listboxMaxHeight={values.listboxMaxHeight as number}
          loading={values.loading as boolean}
          maxTags={values.maxTags as number}
          maxVisibleChips={values.maxVisibleChips as number}
          popoverPlacement={values.popoverPlacement as "top" | "bottom"}
          showAutoComplete={values.showAutoComplete as boolean}
          showSelectedTags={values.showSelectedTags as boolean}
          showSelectedTagsLabel={values.showSelectedTagsLabel as boolean}
          onTagsChange={(_selected, allTags) => setTags(allTags)}
        />
      }
      controls={<ControlsPanel controls={CONTROLS} values={values} onChange={handleChange} />}
    />
  );
}
