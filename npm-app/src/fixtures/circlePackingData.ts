import type { CirclePackingData } from "@thebuoyant-tsdev/mui-ts-library";

export const CIRCLE_PACKING_DATA: CirclePackingData = {
  id: "root",
  name: "Global Software Market",
  children: [
    {
      id: "cloud",
      name: "Cloud & Infrastructure",
      children: [
        { id: "aws", name: "AWS", value: 90757 },
        { id: "azure", name: "Azure", value: 75000 },
        { id: "gcp", name: "Google Cloud", value: 33000 },
      ],
    },
    {
      id: "saas",
      name: "SaaS Platforms",
      children: [
        { id: "salesforce", name: "Salesforce", value: 34900 },
        { id: "sap", name: "SAP", value: 31600 },
        { id: "servicenow", name: "ServiceNow", value: 21000 },
      ],
    },
    {
      id: "devtools",
      name: "Developer Tools",
      children: [
        { id: "github", name: "GitHub", value: 12000 },
        { id: "atlassian", name: "Atlassian", value: 9800 },
      ],
    },
  ],
};
