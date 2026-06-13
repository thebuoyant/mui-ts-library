import type { SunburstChartData } from "@thebuoyant-tsdev/mui-ts-library";

export const SUNBURST_DATA: SunburstChartData = {
  id: "company",
  name: "Company Budget",
  children: [
    {
      id: "engineering",
      name: "Engineering",
      children: [
        { id: "frontend", name: "Frontend", value: 480 },
        { id: "backend", name: "Backend", value: 620 },
        { id: "devops", name: "DevOps", value: 210 },
      ],
    },
    {
      id: "sales",
      name: "Sales",
      children: [
        { id: "emea", name: "EMEA", value: 540 },
        { id: "americas", name: "Americas", value: 490 },
      ],
    },
    {
      id: "marketing",
      name: "Marketing",
      children: [
        { id: "content", name: "Content", value: 180 },
        { id: "events", name: "Events", value: 260 },
      ],
    },
  ],
};
