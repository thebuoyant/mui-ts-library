import { useState } from "react";
import { Box } from "@mui/material";
import { GanttChart } from "@thebuoyant-tsdev/mui-ts-library";
import type { GanttTask, GanttTimeScale } from "@thebuoyant-tsdev/mui-ts-library";
import { GANTT_TASKS } from "../fixtures/ganttTasks";
import { ControlsPanel } from "../controls/ControlsPanel";
import { DemoLayout } from "../controls/DemoLayout";
import type { ControlDef, ControlValues } from "../controls/types";

const CONTROLS: ControlDef[] = [
  { key: "cascadeDependencies", label: "cascadeDependencies", type: "boolean" },
  { key: "draggable", label: "draggable", type: "boolean" },
  { key: "enableBuiltinDialogs", label: "enableBuiltinDialogs", type: "boolean" },
  { key: "height", label: "height", type: "text" },
  { key: "initialExpandAll", label: "initialExpandAll", type: "boolean" },
  { key: "inlineEdit", label: "inlineEdit", type: "boolean" },
  { key: "maxPanelWidth", label: "maxPanelWidth", type: "number", min: 300, max: 1000, step: 50 },
  { key: "minPanelWidth", label: "minPanelWidth", type: "number", min: 100, max: 400, step: 20 },
  { key: "progressDraggable", label: "progressDraggable", type: "boolean" },
  { key: "resizable", label: "resizable", type: "boolean" },
  { key: "showCriticalPath", label: "showCriticalPath", type: "boolean" },
  { key: "showToolbar", label: "showToolbar", type: "boolean" },
  { key: "timeScale", label: "timeScale", type: "select", options: ["days", "weeks", "months", "quarters"] },
  { key: "virtualizeRows", label: "virtualizeRows", type: "boolean" },
  { key: "width", label: "width", type: "text" },
  { key: "zoomable", label: "zoomable", type: "boolean" },
];

const DEFAULT_VALUES: ControlValues = {
  cascadeDependencies: true,
  draggable: true,
  enableBuiltinDialogs: true,
  height: "500",
  initialExpandAll: true,
  inlineEdit: true,
  maxPanelWidth: 600,
  minPanelWidth: 200,
  progressDraggable: true,
  resizable: true,
  showCriticalPath: false,
  showToolbar: true,
  timeScale: "months",
  virtualizeRows: false,
  width: "100%",
  zoomable: true,
};

function toSize(v: string): number | string {
  return /^\d+$/.test(v) ? Number(v) : v;
}

export function GanttChartDemo() {
  const [values, setValues] = useState<ControlValues>(DEFAULT_VALUES);
  const [tasks, setTasks] = useState<GanttTask[]>(GANTT_TASKS);

  const handleChange = (key: string, value: ControlValues[string]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DemoLayout
      preview={
        <Box sx={{ width: "100%" }}>
          <GanttChart
            tasks={tasks}
            cascadeDependencies={values.cascadeDependencies as boolean}
            draggable={values.draggable as boolean}
            enableBuiltinDialogs={values.enableBuiltinDialogs as boolean}
            height={toSize(values.height as string)}
            initialExpandAll={values.initialExpandAll as boolean}
            inlineEdit={values.inlineEdit as boolean}
            maxPanelWidth={values.maxPanelWidth as number}
            minPanelWidth={values.minPanelWidth as number}
            progressDraggable={values.progressDraggable as boolean}
            resizable={values.resizable as boolean}
            showCriticalPath={values.showCriticalPath as boolean}
            showToolbar={values.showToolbar as boolean}
            timeScale={values.timeScale as GanttTimeScale}
            virtualizeRows={values.virtualizeRows as boolean}
            width={toSize(values.width as string)}
            zoomable={values.zoomable as boolean}
            onTasksChange={(tasks) => setTasks(tasks)}
          />
        </Box>
      }
      controls={<ControlsPanel controls={CONTROLS} values={values} onChange={handleChange} />}
    />
  );
}
