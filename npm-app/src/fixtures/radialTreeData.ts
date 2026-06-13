import type { RadialTreeChartData } from "@thebuoyant-tsdev/mui-ts-library";

export const RADIAL_TREE_DATA: RadialTreeChartData = {
  id: "ceo",
  name: "CEO",
  subname: "Thomas Müller",
  children: [
    {
      id: "cto",
      name: "CTO",
      subname: "Anna Schmidt",
      children: [
        { id: "fe", name: "Frontend Lead", subname: "Marc Weber" },
        { id: "be", name: "Backend Lead", subname: "Julia Fischer" },
        { id: "devops", name: "DevOps Lead", subname: "Tim Bauer" },
      ],
    },
    {
      id: "cpo",
      name: "CPO",
      subname: "Laura Hoffmann",
      children: [
        { id: "ux", name: "UX Lead", subname: "Nina Schulz" },
        { id: "pm1", name: "Product Manager", subname: "Ben Richter" },
      ],
    },
  ],
};
