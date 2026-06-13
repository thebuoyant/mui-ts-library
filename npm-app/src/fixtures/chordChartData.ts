import type { ChordChartData } from "@thebuoyant-tsdev/mui-ts-library";

export const CHORD_CHART_DATA: ChordChartData[] = [
  { source: "Frontend", target: "Backend", value: 45 },
  { source: "Frontend", target: "Design", value: 30 },
  { source: "Backend", target: "Frontend", value: 20 },
  { source: "Backend", target: "DevOps", value: 35 },
  { source: "Backend", target: "Data", value: 25 },
  { source: "Design", target: "Frontend", value: 18 },
  { source: "DevOps", target: "Backend", value: 12 },
  { source: "DevOps", target: "Data", value: 20 },
  { source: "Data", target: "Backend", value: 30 },
  { source: "Data", target: "Analytics", value: 40 },
  { source: "Analytics", target: "Frontend", value: 22 },
  { source: "Analytics", target: "Data", value: 28 },
];
