import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, fireEvent } from "storybook/test";
import { CirclePackingChart } from "./CirclePackingChart";
import type { CirclePackingData } from "./CirclePackingChart.types";

const meta: Meta<typeof CirclePackingChart> = {
  title: "Components/CirclePackingChart",
  component: CirclePackingChart,
  argTypes: {
    // Props A–Z
    background:          { control: "color" },
    chartColors:         { control: false },
    data:                { control: false },
    depthColorEnd:       { control: "color" },
    depthColorStart:     { control: "color" },
    disabled:            { control: "boolean" },
    duration:            { control: "number" },
    innerLabelFontSize:  { control: "number" },
    labelColor:          { control: "color" },
    labelFontSize:       { control: "number" },
    padding:             { control: "number" },
    showAllLabels:       { control: "boolean" },
    showLabels:          { control: "boolean" },
    size:                { control: "number" },
    sortBy:              { control: "radio", options: ["value", "name"] },
    translation:         { control: false },
    zoomable:            { control: "boolean" },
    // Callbacks A–Z
    onCircleClick:       { control: false },
    onZoomChange:        { control: false },
  },
  args: {
    background:         "",
    depthColorEnd:      "",
    depthColorStart:    "",
    disabled:           false,
    duration:           750,
    innerLabelFontSize: 9,
    labelColor:         "",
    labelFontSize:      13,
    padding:            3,
    showAllLabels:      false,
    showLabels:         true,
    size:               600,
    sortBy:             "value",
    zoomable:           false,
    onCircleClick:      fn(),
    onZoomChange:       fn(),
  },
  parameters: {
    controls: { sort: 'alpha' },
  },
};

export default meta;
type Story = StoryObj<typeof CirclePackingChart>;

// ── Demo data: Global Software Market (realistic revenue figures in $M) ───────

const GLOBAL_SOFTWARE: CirclePackingData = {
  id: "root", name: "Global Software Market",
  children: [
    {
      id: "cloud", name: "Cloud & Infrastructure",
      children: [
        { id: "aws",      name: "AWS",           value: 90757 },
        { id: "azure",    name: "Azure",          value: 75000 },
        { id: "gcp",      name: "Google Cloud",   value: 33000 },
        { id: "ibm",      name: "IBM Cloud",      value: 21200 },
        { id: "oracle",   name: "Oracle Cloud",   value: 19800 },
      ],
    },
    {
      id: "saas", name: "SaaS Platforms",
      children: [
        { id: "salesforce",name: "Salesforce",    value: 34900 },
        { id: "sap",      name: "SAP",            value: 31600 },
        { id: "workday",  name: "Workday",         value: 7300  },
        { id: "servicenow",name: "ServiceNow",    value: 8970  },
        { id: "adobe",    name: "Adobe",           value: 19400 },
        { id: "hubspot",  name: "HubSpot",         value: 2170  },
      ],
    },
    {
      id: "collab", name: "Collaboration & Productivity",
      children: [
        { id: "msoffice", name: "Microsoft 365",  value: 63000 },
        { id: "google-w", name: "Google Workspace",value: 12000 },
        { id: "slack",    name: "Slack",           value: 1500  },
        { id: "zoom",     name: "Zoom",            value: 4600  },
        { id: "atlassian",name: "Atlassian",       value: 3570  },
        { id: "notion",   name: "Notion",          value: 800   },
      ],
    },
    {
      id: "dev", name: "Developer Tools",
      children: [
        { id: "github",   name: "GitHub",          value: 2000  },
        { id: "gitlab",   name: "GitLab",          value: 580   },
        { id: "jfrog",    name: "JFrog",           value: 350   },
        { id: "hashicorp",name: "HashiCorp",       value: 520   },
        { id: "datadog",  name: "Datadog",         value: 2100  },
        { id: "pagerduty",name: "PagerDuty",       value: 400   },
      ],
    },
    {
      id: "security", name: "Cybersecurity",
      children: [
        { id: "crowdstrike",name: "CrowdStrike",   value: 3100  },
        { id: "palo-alto", name: "Palo Alto",      value: 7800  },
        { id: "fortinet", name: "Fortinet",        value: 5300  },
        { id: "zscaler",  name: "Zscaler",         value: 1900  },
        { id: "okta",     name: "Okta",            value: 2260  },
      ],
    },
    {
      id: "data", name: "Data & Analytics",
      children: [
        { id: "snowflake",name: "Snowflake",       value: 2800  },
        { id: "databricks",name: "Databricks",    value: 1600  },
        { id: "tableau",  name: "Tableau",         value: 2000  },
        { id: "palantir", name: "Palantir",        value: 2230  },
        { id: "dbt",      name: "dbt Labs",        value: 300   },
      ],
    },
  ],
};

// ── Deep hierarchy: Open-Source Ecosystem ────────────────────────────────────

const OSS_ECOSYSTEM: CirclePackingData = {
  id: "oss", name: "Open Source Ecosystem",
  children: [
    { id: "frontend", name: "Frontend", children: [
      { id: "react-eco", name: "React Ecosystem", children: [
        { id: "react",     name: "React",          value: 48000 },
        { id: "next",      name: "Next.js",        value: 28000 },
        { id: "remix",     name: "Remix",          value: 5000  },
        { id: "gatsby",    name: "Gatsby",         value: 4000  },
      ]},
      { id: "vue-eco", name: "Vue Ecosystem", children: [
        { id: "vue",       name: "Vue",            value: 22000 },
        { id: "nuxt",      name: "Nuxt",           value: 12000 },
      ]},
      { id: "build", name: "Build Tools", children: [
        { id: "vite",      name: "Vite",           value: 18000 },
        { id: "webpack",   name: "Webpack",        value: 14000 },
        { id: "esbuild",   name: "esbuild",        value: 9000  },
        { id: "turbo",     name: "Turborepo",      value: 5000  },
      ]},
    ]},
    { id: "backend", name: "Backend", children: [
      { id: "node-fw", name: "Node.js Frameworks", children: [
        { id: "express",   name: "Express",        value: 25000 },
        { id: "fastify",   name: "Fastify",        value: 8000  },
        { id: "nestjs",    name: "NestJS",         value: 12000 },
      ]},
      { id: "go-fw", name: "Go Frameworks", children: [
        { id: "gin",       name: "Gin",            value: 7000  },
        { id: "echo",      name: "Echo",           value: 4500  },
        { id: "fiber",     name: "Fiber",          value: 5200  },
      ]},
      { id: "py-fw", name: "Python Frameworks", children: [
        { id: "fastapi",   name: "FastAPI",        value: 11000 },
        { id: "django",    name: "Django",         value: 9000  },
        { id: "flask",     name: "Flask",          value: 7500  },
      ]},
    ]},
    { id: "infra-oss", name: "Infrastructure", children: [
      { id: "k8s",       name: "Kubernetes",       value: 35000 },
      { id: "docker",    name: "Docker",           value: 22000 },
      { id: "terraform", name: "Terraform",        value: 12000 },
      { id: "prometheus",name: "Prometheus",       value: 9000  },
      { id: "grafana",   name: "Grafana",          value: 8500  },
    ]},
  ],
};

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Global Software Market** — annual revenue in $M by category. ' +
          '`Ctrl / Cmd ⌘+Click` any circle with children → animated zoom in. ' +
          '`Ctrl / Cmd ⌘+Double-click` → zoom out one level. ' +
          '`Escape` → reset to root. ' +
          'Regular click fires `onCircleClick` with name, value, percentage, and path. ' +
          'This story auto-runs a Ctrl+Click on the first eligible circle so you see the zoom animation.',
      },
    },
  },
  args: { data: GLOBAL_SOFTWARE },
  play: async ({ canvasElement }) => {
    const firstZoomable = canvasElement.querySelector<SVGCircleElement>('circle[style*="cursor: pointer"]');
    if (firstZoomable) fireEvent.click(firstZoomable, { ctrlKey: true });
  },
};

export const DeepHierarchy: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Open-Source Ecosystem** — 4 depth levels, npm weekly downloads in thousands. ' +
          'Shows how D3 circle packing handles deep hierarchies with the animated zoom.',
      },
    },
  },
  args: { data: OSS_ECOSYSTEM, size: 650 },
};

export const CustomPalette: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`chartColors` overrides the default MUI theme palette with a custom per-depth color array.',
      },
    },
  },
  args: {
    data: GLOBAL_SOFTWARE,
    chartColors: ["#1A237E", "#1565C0", "#0288D1", "#00ACC1", "#00897B", "#43A047"],
    background: "#0D1B2A",
    labelColor: "#FFFFFF",
  },
};

export const GradientMode: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`depthColorStart` + `depthColorEnd` enable HCL gradient mode — perceptually uniform color progression across depth levels.',
      },
    },
  },
  args: {
    data: GLOBAL_SOFTWARE,
    depthColorStart: "hsl(195, 100%, 85%)",
    depthColorEnd:   "hsl(250, 70%, 30%)",
    background:      "#F8F9FA",
  },
};

// ── colorConfig demo data ─────────────────────────────────────────────────────

const COLOR_CONFIG_BUDGET: CirclePackingData = {
  id: "company", name: "Company",
  children: [
    {
      id: "engineering", name: "Engineering",
      colorConfig: { fill: "#1565C0" },
      children: [
        { id: "fe",     name: "Frontend",  value: 480, colorConfig: { fill: "#1976D2" } },
        { id: "be",     name: "Backend",   value: 620, colorConfig: { fill: "#0D47A1" } },
        { id: "devops", name: "DevOps",    value: 210, colorConfig: { fill: "#42A5F5" } },
        { id: "mobile", name: "Mobile",    value: 340, colorConfig: { fill: "#90CAF9" } },
      ],
    },
    {
      id: "sales", name: "Sales",
      colorConfig: { fill: "#6A1B9A" },
      children: [
        { id: "emea",    name: "EMEA",    value: 540, colorConfig: { fill: "#7B1FA2" } },
        { id: "amer",    name: "Americas",value: 490, colorConfig: { fill: "#AB47BC" } },
        { id: "apac",    name: "APAC",    value: 220, colorConfig: { fill: "#CE93D8" } },
        { id: "partner", name: "Partners",value: 180, colorConfig: { fill: "#E1BEE7" } },
      ],
    },
    {
      id: "product", name: "Product",
      colorConfig: { fill: "#00695C" },
      children: [
        { id: "design",   name: "Design",   value: 290, colorConfig: { fill: "#00796B" } },
        { id: "research", name: "Research", value: 200, colorConfig: { fill: "#26A69A" } },
        { id: "strategy", name: "Strategy", value: 150, colorConfig: { fill: "#80CBC4" } },
      ],
    },
    {
      id: "ops", name: "Operations",
      // no colorConfig — uses default MUI palette
      children: [
        { id: "hr",      name: "HR",      value: 180 },
        { id: "finance", name: "Finance", value: 240 },
        { id: "legal",   name: "Legal",   value: 130 },
        { id: "it",      name: "IT",      value: 160 },
      ],
    },
    {
      id: "marketing", name: "Marketing",
      colorConfig: { fill: "#E65100" },
      children: [
        { id: "content", name: "Content", value: 180, colorConfig: { fill: "#EF6C00" } },
        { id: "seo",     name: "SEO",     value: 120, colorConfig: { fill: "#FB8C00" } },
        { id: "ads",     name: "Ads",     value: 310, colorConfig: { fill: "#FFA726" } },
      ],
    },
  ],
};

export const WithColorConfig: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`colorConfig: { fill }` per node in the data — each department and its sub-items use brand colors. ' +
          '"Operations" has no `colorConfig` and falls back to the default MUI palette. ' +
          'This works alongside `showAllLabels` to show a richly colored hierarchy.',
      },
    },
  },
  args: {
    data:          COLOR_CONFIG_BUDGET,
    showAllLabels: true,
    size:          620,
  },
};

export const WithAllLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showAllLabels={true}` shows labels on ALL visible inner circles — truncated with `…` if the text doesn\'t fit inside the circle. ' +
          'Outer-ring labels stay **bold** and larger. Inner labels use `innerLabelFontSize` (default 9px). ' +
          'Labels disappear automatically for circles that are too small.',
      },
    },
  },
  args: {
    data:          GLOBAL_SOFTWARE,
    showAllLabels: true,
    size:          650,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '`disabled={true}` mutes all interactions and reduces opacity.',
      },
    },
  },
  args: { data: GLOBAL_SOFTWARE, disabled: true },
};
