import { useState } from "react";
import { SunburstChart } from "@thebuoyant-tsdev/mui-ts-library";
import type { SunburstSortBy } from "@thebuoyant-tsdev/mui-ts-library";
import { SUNBURST_DATA } from "../fixtures/sunburstData";
import { ControlsPanel } from "../controls/ControlsPanel";
import { DemoLayout } from "../controls/DemoLayout";
import type { ControlDef, ControlValues } from "../controls/types";

const CONTROLS: ControlDef[] = [
  { key: "disabled", label: "disabled", type: "boolean" },
  { key: "innerRadius", label: "innerRadius", type: "number", min: 0, max: 200, step: 5 },
  { key: "showRootLabel", label: "showRootLabel", type: "boolean" },
  { key: "showSegmentLabels", label: "showSegmentLabels", type: "boolean" },
  { key: "size", label: "size", type: "number", min: 200, max: 800, step: 10 },
  { key: "sortBy", label: "sortBy", type: "select", options: ["value", "name"] },
  { key: "valueDecimalCount", label: "valueDecimalCount", type: "number", min: 0, max: 4, step: 1 },
  { key: "valueDecimalSeparator", label: "valueDecimalSeparator", type: "text" },
  { key: "valueThousandsSeparator", label: "valueThousandsSeparator", type: "text" },
  { key: "zoomable", label: "zoomable", type: "boolean" },
];

const DEFAULT_VALUES: ControlValues = {
  disabled: false,
  innerRadius: 0,
  showRootLabel: true,
  showSegmentLabels: true,
  size: 500,
  sortBy: "value",
  valueDecimalCount: 0,
  valueDecimalSeparator: ".",
  valueThousandsSeparator: ",",
  zoomable: false,
};

export function SunburstChartDemo() {
  const [values, setValues] = useState<ControlValues>(DEFAULT_VALUES);

  const handleChange = (key: string, value: ControlValues[string]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DemoLayout
      preview={
        <SunburstChart
          data={SUNBURST_DATA}
          disabled={values.disabled as boolean}
          innerRadius={values.innerRadius as number}
          showRootLabel={values.showRootLabel as boolean}
          showSegmentLabels={values.showSegmentLabels as boolean}
          size={values.size as number}
          sortBy={values.sortBy as SunburstSortBy}
          valueDecimalCount={values.valueDecimalCount as number}
          valueDecimalSeparator={values.valueDecimalSeparator as string}
          valueThousandsSeparator={values.valueThousandsSeparator as string}
          zoomable={values.zoomable as boolean}
        />
      }
      controls={<ControlsPanel controls={CONTROLS} values={values} onChange={handleChange} />}
    />
  );
}
