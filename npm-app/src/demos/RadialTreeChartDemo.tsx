import { useState } from "react";
import { RadialTreeChart } from "@thebuoyant-tsdev/mui-ts-library";
import type { RadialTreeSortBy } from "@thebuoyant-tsdev/mui-ts-library";
import { RADIAL_TREE_DATA } from "../fixtures/radialTreeData";
import { ControlsPanel } from "../controls/ControlsPanel";
import { DemoLayout } from "../controls/DemoLayout";
import { colorProp } from "../controls/types";
import type { ControlDef, ControlValues } from "../controls/types";

const CONTROLS: ControlDef[] = [
  { key: "autoFit", label: "autoFit", type: "boolean" },
  { key: "branchNodeRadius", label: "branchNodeRadius", type: "number", min: 4, max: 30, step: 1 },
  { key: "disabled", label: "disabled", type: "boolean" },
  { key: "drillable", label: "drillable", type: "boolean" },
  { key: "labelColor", label: "labelColor", type: "color" },
  { key: "labelFontSize", label: "labelFontSize", type: "number", min: 8, max: 24, step: 1 },
  { key: "leafNodeRadius", label: "leafNodeRadius", type: "number", min: 4, max: 30, step: 1 },
  { key: "linkColor", label: "linkColor", type: "color" },
  { key: "linkStrokeOpacity", label: "linkStrokeOpacity", type: "slider", min: 0, max: 1, step: 0.05 },
  { key: "linkStrokeWidth", label: "linkStrokeWidth", type: "number", min: 0.5, max: 5, step: 0.5 },
  { key: "rootNodeRadius", label: "rootNodeRadius", type: "number", min: 4, max: 40, step: 1 },
  { key: "separationCousin", label: "separationCousin", type: "number", min: 0.5, max: 5, step: 0.5 },
  { key: "separationSibling", label: "separationSibling", type: "number", min: 0.5, max: 5, step: 0.5 },
  { key: "showIcons", label: "showIcons", type: "boolean" },
  { key: "showLabels", label: "showLabels", type: "boolean" },
  { key: "showNodePopover", label: "showNodePopover", type: "boolean" },
  { key: "size", label: "size", type: "number", min: 200, max: 900, step: 10 },
  { key: "sortBy", label: "sortBy", type: "select", options: ["name", "value"] },
  { key: "zoomable", label: "zoomable", type: "boolean" },
];

const DEFAULT_VALUES: ControlValues = {
  autoFit: true,
  branchNodeRadius: 16,
  disabled: false,
  drillable: false,
  labelColor: "",
  labelFontSize: 12,
  leafNodeRadius: 11,
  linkColor: "",
  linkStrokeOpacity: 1,
  linkStrokeWidth: 1.5,
  rootNodeRadius: 22,
  separationCousin: 2,
  separationSibling: 1,
  showIcons: true,
  showLabels: true,
  showNodePopover: false,
  size: 600,
  sortBy: "name",
  zoomable: false,
};

export function RadialTreeChartDemo() {
  const [values, setValues] = useState<ControlValues>(DEFAULT_VALUES);

  const handleChange = (key: string, value: ControlValues[string]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DemoLayout
      preview={
        <RadialTreeChart
          data={RADIAL_TREE_DATA}
          autoFit={values.autoFit as boolean}
          branchNodeRadius={values.branchNodeRadius as number}
          disabled={values.disabled as boolean}
          drillable={values.drillable as boolean}
          labelColor={colorProp(values.labelColor)}
          labelFontSize={values.labelFontSize as number}
          leafNodeRadius={values.leafNodeRadius as number}
          linkColor={colorProp(values.linkColor)}
          linkStrokeOpacity={values.linkStrokeOpacity as number}
          linkStrokeWidth={values.linkStrokeWidth as number}
          rootNodeRadius={values.rootNodeRadius as number}
          separationCousin={values.separationCousin as number}
          separationSibling={values.separationSibling as number}
          showIcons={values.showIcons as boolean}
          showLabels={values.showLabels as boolean}
          showNodePopover={values.showNodePopover as boolean}
          size={values.size as number}
          sortBy={values.sortBy as RadialTreeSortBy}
          zoomable={values.zoomable as boolean}
        />
      }
      controls={<ControlsPanel controls={CONTROLS} values={values} onChange={handleChange} />}
    />
  );
}
