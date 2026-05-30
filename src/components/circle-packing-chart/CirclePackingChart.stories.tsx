import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CirclePackingChart } from "./CirclePackingChart";
import type { CirclePackingData } from "./CirclePackingChart.types";

const meta: Meta<typeof CirclePackingChart> = {
  title: "Components/CirclePackingChart",
  component: CirclePackingChart,
  argTypes: {
    size:           { control: "number" },
    padding:        { control: "number" },
    sortBy:         { control: "radio", options: ["value", "name"] },
    showLabels:     { control: "boolean" },
    labelFontSize:  { control: "number" },
    labelColor:     { control: "color" },
    background:     { control: "color" },
    depthColorStart:{ control: "color" },
    depthColorEnd:  { control: "color" },
    duration:       { control: "number" },
    disabled:       { control: "boolean" },
    chartColors:    { control: false },
    translation:    { control: false },
    data:           { control: false },
    onCircleClick:  { control: false },
    onZoomChange:   { control: false },
  },
  args: {
    size:          600,
    padding:       3,
    sortBy:        "value",
    showLabels:    true,
    labelFontSize: 11,
    duration:      750,
    disabled:      false,
    onCircleClick: fn(),
    onZoomChange:  fn(),
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
          'Regular click fires `onCircleClick` with name, value, percentage, and path.',
      },
    },
  },
  args: { data: GLOBAL_SOFTWARE },
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
