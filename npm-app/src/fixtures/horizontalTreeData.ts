import type { HorizontalTreeData } from "@thebuoyant-tsdev/mui-ts-library";

export const HORIZONTAL_TREE_DATA: HorizontalTreeData = {
  id: "platform",
  name: "Platform",
  subname: "v2.5 Architecture",
  children: [
    {
      id: "frontend",
      name: "Frontend",
      subname: "React / TypeScript",
      children: [
        { id: "web", name: "Web App", subname: "Next.js 15" },
        { id: "mobile", name: "Mobile", subname: "React Native" },
        { id: "desktop", name: "Desktop", subname: "Electron" },
      ],
    },
    {
      id: "backend",
      name: "Backend",
      subname: "Node.js / Go",
      children: [
        { id: "api-gw", name: "API Gateway", subname: "Kong" },
        { id: "auth", name: "Auth Service", subname: "OAuth 2.0" },
        { id: "data", name: "Data Service", subname: "PostgreSQL" },
      ],
    },
  ],
};
