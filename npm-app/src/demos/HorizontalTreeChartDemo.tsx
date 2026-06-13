import { useState } from "react";
import { HorizontalTreeChart } from "@thebuoyant-tsdev/mui-ts-library";
import type { HorizontalTreeOrientation } from "@thebuoyant-tsdev/mui-ts-library";
import { HORIZONTAL_TREE_DATA } from "../fixtures/horizontalTreeData";
import { ControlsPanel } from "../controls/ControlsPanel";
import { DemoLayout } from "../controls/DemoLayout";
import type { ControlDef, ControlValues } from "../controls/types";

const CONTROLS: ControlDef[] = [
  { key: "disabled", label: "disabled", type: "boolean" },
  { key: "drillable", label: "drillable", type: "boolean" },
  { key: "height", label: "height", type: "number", min: 200, max: 1000, step: 10 },
  { key: "labelColor", label: "labelColor", type: "color" },
  { key: "labelFontSize", label: "labelFontSize", type: "number", min: 8, max: 24, step: 1 },
  { key: "levelSpacing", label: "levelSpacing", type: "number", min: 50, max: 400, step: 10 },
  { key: "linkColor", label: "linkColor", type: "color" },
  { key: "linkStrokeOpacity", label: "linkStrokeOpacity", type: "slider", min: 0, max: 1, step: 0.05 },
  { key: "linkStrokeWidth", label: "linkStrokeWidth", type: "number", min: 0.5, max: 5, step: 0.5 },
  { key: "nodeRadius", label: "nodeRadius", type: "number", min: 4, max: 30, step: 1 },
  { key: "orientation", label: "orientation", type: "select", options: ["LR", "RL", "TB", "BT"] },
  { key: "showIcons", label: "showIcons", type: "boolean" },
  { key: "showLabels", label: "showLabels", type: "boolean" },
  { key: "showNodePopover", label: "showNodePopover", type: "boolean" },
  { key: "sortBy", label: "sortBy", type: "select", options: ["name", "value"] },
  { key: "width", label: "width", type: "number", min: 300, max: 1400, step: 10 },
  { key: "zoomable", label: "zoomable", type: "boolean" },
];

const DEFAULT_VALUES: ControlValues = {
  disabled: false,
  drillable: false,
  height: 500,
  labelColor: "",
  labelFontSize: 12,
  levelSpacing: 200,
  linkColor: "",
  linkStrokeOpacity: 0.4,
  linkStrokeWidth: 1.5,
  nodeRadius: 10,
  orientation: "LR",
  showIcons: true,
  showLabels: true,
  showNodePopover: false,
  sortBy: "name",
  width: 800,
  zoomable: false,
};

export function HorizontalTreeChartDemo() {
  const [values, setValues] = useState<ControlValues>(DEFAULT_VALUES);

  const handleChange = (key: string, value: ControlValues[string]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DemoLayout
      preview={
        <HorizontalTreeChart
          data={HORIZONTAL_TREE_DATA}
          disabled={values.disabled as boolean}
          drillable={values.drillable as boolean}
          height={values.height as number}
          labelColor={values.labelColor as string}
          labelFontSize={values.labelFontSize as number}
          levelSpacing={values.levelSpacing as number}
          linkColor={values.linkColor as string}
          linkStrokeOpacity={values.linkStrokeOpacity as number}
          linkStrokeWidth={values.linkStrokeWidth as number}
          nodeRadius={values.nodeRadius as number}
          orientation={values.orientation as HorizontalTreeOrientation}
          showIcons={values.showIcons as boolean}
          showLabels={values.showLabels as boolean}
          showNodePopover={values.showNodePopover as boolean}
          sortBy={values.sortBy as "name" | "value"}
          width={values.width as number}
          zoomable={values.zoomable as boolean}
        />
      }
      controls={<ControlsPanel controls={CONTROLS} values={values} onChange={handleChange} />}
    />
  );
}
