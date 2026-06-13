import { useState } from "react";
import { CirclePackingChart } from "@thebuoyant-tsdev/mui-ts-library";
import type { CirclePackingSortBy } from "@thebuoyant-tsdev/mui-ts-library";
import { CIRCLE_PACKING_DATA } from "../fixtures/circlePackingData";
import { ControlsPanel } from "../controls/ControlsPanel";
import { DemoLayout } from "../controls/DemoLayout";
import type { ControlDef, ControlValues } from "../controls/types";

const CONTROLS: ControlDef[] = [
  { key: "background", label: "background", type: "color" },
  { key: "depthColorEnd", label: "depthColorEnd", type: "color" },
  { key: "depthColorStart", label: "depthColorStart", type: "color" },
  { key: "disabled", label: "disabled", type: "boolean" },
  { key: "duration", label: "duration", type: "number", min: 0, max: 2000, step: 50 },
  { key: "innerLabelFontSize", label: "innerLabelFontSize", type: "number", min: 6, max: 20, step: 1 },
  { key: "labelColor", label: "labelColor", type: "color" },
  { key: "labelFontSize", label: "labelFontSize", type: "number", min: 8, max: 24, step: 1 },
  { key: "padding", label: "padding", type: "number", min: 0, max: 20, step: 1 },
  { key: "showAllLabels", label: "showAllLabels", type: "boolean" },
  { key: "showLabels", label: "showLabels", type: "boolean" },
  { key: "size", label: "size", type: "number", min: 200, max: 900, step: 10 },
  { key: "sortBy", label: "sortBy", type: "select", options: ["value", "name"] },
  { key: "zoomable", label: "zoomable", type: "boolean" },
];

const DEFAULT_VALUES: ControlValues = {
  background: "",
  depthColorEnd: "",
  depthColorStart: "",
  disabled: false,
  duration: 750,
  innerLabelFontSize: 9,
  labelColor: "",
  labelFontSize: 13,
  padding: 3,
  showAllLabels: false,
  showLabels: true,
  size: 600,
  sortBy: "value",
  zoomable: false,
};

export function CirclePackingChartDemo() {
  const [values, setValues] = useState<ControlValues>(DEFAULT_VALUES);

  const handleChange = (key: string, value: ControlValues[string]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DemoLayout
      preview={
        <CirclePackingChart
          data={CIRCLE_PACKING_DATA}
          background={values.background as string}
          depthColorEnd={values.depthColorEnd as string}
          depthColorStart={values.depthColorStart as string}
          disabled={values.disabled as boolean}
          duration={values.duration as number}
          innerLabelFontSize={values.innerLabelFontSize as number}
          labelColor={values.labelColor as string}
          labelFontSize={values.labelFontSize as number}
          padding={values.padding as number}
          showAllLabels={values.showAllLabels as boolean}
          showLabels={values.showLabels as boolean}
          size={values.size as number}
          sortBy={values.sortBy as CirclePackingSortBy}
          zoomable={values.zoomable as boolean}
        />
      }
      controls={<ControlsPanel controls={CONTROLS} values={values} onChange={handleChange} />}
    />
  );
}
