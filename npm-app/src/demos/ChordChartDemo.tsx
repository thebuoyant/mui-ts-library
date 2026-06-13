import { useState } from "react";
import { ChordChart } from "@thebuoyant-tsdev/mui-ts-library";
import type { ChordSortBy } from "@thebuoyant-tsdev/mui-ts-library";
import { CHORD_CHART_DATA } from "../fixtures/chordChartData";
import { ControlsPanel } from "../controls/ControlsPanel";
import { DemoLayout } from "../controls/DemoLayout";
import type { ControlDef, ControlValues } from "../controls/types";

const CONTROLS: ControlDef[] = [
  { key: "directed", label: "directed", type: "boolean" },
  { key: "disabled", label: "disabled", type: "boolean" },
  { key: "innerRadius", label: "innerRadius", type: "number", min: 50, max: 300, step: 10 },
  { key: "labelOffset", label: "labelOffset", type: "number", min: 0, max: 30, step: 1 },
  { key: "ribbonBlendMode", label: "ribbonBlendMode", type: "text" },
  { key: "ribbonOpacity", label: "ribbonOpacity", type: "slider", min: 0, max: 1, step: 0.05 },
  { key: "ringThickness", label: "ringThickness", type: "number", min: 5, max: 60, step: 5 },
  { key: "showGroupLabels", label: "showGroupLabels", type: "boolean" },
  { key: "size", label: "size", type: "number", min: 200, max: 800, step: 10 },
  { key: "sortChords", label: "sortChords", type: "select", options: ["ascending", "descending", "none"] },
  { key: "sortSubgroups", label: "sortSubgroups", type: "select", options: ["ascending", "descending", "none"] },
  { key: "valueDecimalCount", label: "valueDecimalCount", type: "number", min: 0, max: 4, step: 1 },
  { key: "valueDecimalSeparator", label: "valueDecimalSeparator", type: "text" },
  { key: "valueThousandsSeparator", label: "valueThousandsSeparator", type: "text" },
  { key: "zoomable", label: "zoomable", type: "boolean" },
];

const DEFAULT_VALUES: ControlValues = {
  directed: true,
  disabled: false,
  innerRadius: 160,
  labelOffset: 8,
  ribbonBlendMode: "multiply",
  ribbonOpacity: 0.75,
  ringThickness: 20,
  showGroupLabels: true,
  size: 500,
  sortChords: "descending",
  sortSubgroups: "descending",
  valueDecimalCount: 0,
  valueDecimalSeparator: ".",
  valueThousandsSeparator: ",",
  zoomable: false,
};

export function ChordChartDemo() {
  const [values, setValues] = useState<ControlValues>(DEFAULT_VALUES);

  const handleChange = (key: string, value: ControlValues[string]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DemoLayout
      preview={
        <ChordChart
          data={CHORD_CHART_DATA}
          directed={values.directed as boolean}
          disabled={values.disabled as boolean}
          innerRadius={values.innerRadius as number}
          labelOffset={values.labelOffset as number}
          ribbonBlendMode={values.ribbonBlendMode as React.CSSProperties["mixBlendMode"]}
          ribbonOpacity={values.ribbonOpacity as number}
          ringThickness={values.ringThickness as number}
          showGroupLabels={values.showGroupLabels as boolean}
          size={values.size as number}
          sortChords={values.sortChords as ChordSortBy}
          sortSubgroups={values.sortSubgroups as ChordSortBy}
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
