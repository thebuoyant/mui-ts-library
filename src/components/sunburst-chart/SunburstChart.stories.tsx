import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { SunburstChart } from "./SunburstChart";
import type { SunburstChartData } from "./SunburstChart.types";

const meta: Meta<typeof SunburstChart> = {
  title: "Components/SunburstChart",
  component: SunburstChart,
  argTypes: {
    // Props A–Z
    chartColors:             { control: false },
    data:                    { control: false },
    disabled:                { control: "boolean" },
    innerRadius:             { control: "number" },
    showRootLabel:           { control: "boolean" },
    showSegmentLabels:       { control: "boolean" },
    size:                    { control: "number" },
    sortBy:                  { control: "radio", options: ["value", "name"] },
    translation:             { control: false },
    valueDecimalCount:       { control: "number" },
    valueDecimalSeparator:   { control: "text" },
    valueThousandsSeparator: { control: "text" },
    zoomable:                { control: "boolean" },
    // Callbacks A–Z
    onSegmentClick:          { control: false },
    onZoomChange:            { control: false },
  },
  args: {
    size:                    500,
    showSegmentLabels:       true,
    innerRadius:             0,
    sortBy:                  "value",
    showRootLabel:           true,
    zoomable:                false,
    disabled:                false,
    valueDecimalCount:       0,
    valueDecimalSeparator:   ".",
    valueThousandsSeparator: ",",
    onSegmentClick:          fn(),
  },
  parameters: {
    controls: { sort: 'alpha' },
  },
};

export default meta;
type Story = StoryObj<typeof SunburstChart>;

// ── Demo data: company budget breakdown ─────────────────────────────────────

const BUDGET_DATA: SunburstChartData = {
  id: "company", name: "Company",
  children: [
    {
      id: "engineering", name: "Engineering",
      children: [
        { id: "frontend",  name: "Frontend",  value: 480 },
        { id: "backend",   name: "Backend",   value: 620 },
        { id: "devops",    name: "DevOps",    value: 210 },
        { id: "qa",        name: "QA",        value: 190 },
      ],
    },
    {
      id: "sales", name: "Sales",
      children: [
        { id: "emea",     name: "EMEA",     value: 540 },
        { id: "americas", name: "Americas", value: 490 },
        { id: "apac",     name: "APAC",     value: 220 },
      ],
    },
    {
      id: "operations", name: "Operations",
      children: [
        { id: "hr",      name: "HR",      value: 180 },
        { id: "finance", name: "Finance", value: 240 },
        { id: "legal",   name: "Legal",   value: 130 },
        { id: "it",      name: "IT",      value: 160 },
      ],
    },
    {
      id: "product", name: "Product",
      children: [
        { id: "design",     name: "Design",     value: 290 },
        { id: "research",   name: "Research",   value: 200 },
        { id: "management", name: "Management", value: 150 },
      ],
    },
    {
      id: "marketing", name: "Marketing",
      children: [
        { id: "content", name: "Content",  value: 180 },
        { id: "seo",     name: "SEO",      value: 120 },
        { id: "ads",     name: "Ads",      value: 310 },
      ],
    },
  ],
};

// ── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Full sunburst chart with company budget data. ' +
          '**Click** any segment → fires `onSegmentClick` immediately (no delay). ' +
          '**Ctrl+Click** a segment with children → zoom in. ' +
          '**Ctrl+Double-click** any segment → zoom out one level. ' +
          '**Escape** → reset zoom to root.',
      },
    },
  },
  args: { data: BUDGET_DATA },
};

export const DonutStyle: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`innerRadius={120}` creates a donut-style hole in the center. ' +
          'The center area is clickable — single-click fires `onSegmentClick` for the parent node, ' +
          'double-click zooms out.',
      },
    },
  },
  args: { data: BUDGET_DATA, innerRadius: 120 },
};

export const SortedByName: Story = {
  parameters: {
    docs: {
      description: {
        story: '`sortBy="name"` sorts all segments alphabetically at every depth level.',
      },
    },
  },
  args: { data: BUDGET_DATA, sortBy: "name" },
};

export const NoLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showSegmentLabels={false}` hides all text labels — tooltips (native SVG `<title>`) ' +
          'still work on hover.',
      },
    },
  },
  args: { data: BUDGET_DATA, showSegmentLabels: false },
};

export const CustomPalette: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`chartColors` overrides the default MUI-theme palette with a custom array. ' +
          'Colors repeat cyclically if there are more top-level segments than colors.',
      },
    },
  },
  args: {
    data: BUDGET_DATA,
    chartColors: ["#1565C0", "#6A1B9A", "#00695C", "#E65100", "#AD1457"],
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`disabled={true}` mutes all interactions (click, double-click) and reduces opacity. ' +
          'Useful for read-only dashboards or loading states.',
      },
    },
  },
  args: { data: BUDGET_DATA, disabled: true },
};

// ── colorConfig demo data — per-segment brand colors ─────────────────────────

const COLOR_CONFIG_DATA: SunburstChartData = {
  id: "company", name: "Company",
  children: [
    {
      id: "engineering", name: "Engineering",
      colorConfig: { fill: "#1565C0" },   // brand blue
      children: [
        { id: "fe",     name: "Frontend",  value: 480, colorConfig: { fill: "#1976D2" } },
        { id: "be",     name: "Backend",   value: 620, colorConfig: { fill: "#0D47A1" } },
        { id: "devops", name: "DevOps",    value: 210, colorConfig: { fill: "#42A5F5" } },
        { id: "qa",     name: "QA",        value: 190, colorConfig: { fill: "#90CAF9" } },
      ],
    },
    {
      id: "sales", name: "Sales",
      colorConfig: { fill: "#6A1B9A" },   // brand purple
      children: [
        { id: "emea",     name: "EMEA",     value: 540, colorConfig: { fill: "#7B1FA2" } },
        { id: "americas", name: "Americas", value: 490, colorConfig: { fill: "#AB47BC" } },
        { id: "apac",     name: "APAC",     value: 220, colorConfig: { fill: "#CE93D8" } },
      ],
    },
    {
      id: "product", name: "Product",
      colorConfig: { fill: "#00695C" },   // brand teal
      children: [
        { id: "design",   name: "Design",   value: 290, colorConfig: { fill: "#00796B" } },
        { id: "research", name: "Research", value: 200, colorConfig: { fill: "#26A69A" } },
        { id: "strategy", name: "Strategy", value: 150 },  // no colorConfig → uses default
      ],
    },
    {
      id: "ops", name: "Operations",
      // no colorConfig → uses chart default palette
      children: [
        { id: "hr",      name: "HR",      value: 180 },
        { id: "finance", name: "Finance", value: 240 },
        { id: "legal",   name: "Legal",   value: 130 },
      ],
    },
  ],
};

export const WithColorConfig: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`colorConfig` in the data — each node can override its fill color independently. ' +
          'Engineering (blues), Sales (purples), Product (teals) use brand colors via `colorConfig: { fill }`. ' +
          'Operations has no `colorConfig` and falls back to the default MUI palette.',
      },
    },
  },
  args: { data: COLOR_CONFIG_DATA },
};

// ── Deep hierarchy dataset (5 levels) ───────────────────────────────────────

const DEEP_DATA: SunburstChartData = {
  id: "root", name: "Portfolio",
  children: [
    { id: "p1", name: "Platform", children: [
      { id: "p1-a", name: "Frontend", children: [
        { id: "p1-a1", name: "Web App",   children: [
          { id: "p1-a1-x", name: "Dashboard", value: 1200 },
          { id: "p1-a1-y", name: "Reports",   value: 800 },
          { id: "p1-a1-z", name: "Settings",  value: 400 },
        ]},
        { id: "p1-a2", name: "Mobile", children: [
          { id: "p1-a2-x", name: "iOS",     value: 950 },
          { id: "p1-a2-y", name: "Android", value: 870 },
        ]},
      ]},
      { id: "p1-b", name: "Backend", children: [
        { id: "p1-b1", name: "API Gateway",  value: 1100 },
        { id: "p1-b2", name: "Auth Service", value: 700 },
        { id: "p1-b3", name: "Data Service", value: 900 },
      ]},
    ]},
    { id: "p2", name: "Products", children: [
      { id: "p2-a", name: "Analytics", children: [
        { id: "p2-a1", name: "Realtime",  value: 1500 },
        { id: "p2-a2", name: "Historical",value: 1100 },
      ]},
      { id: "p2-b", name: "Commerce", children: [
        { id: "p2-b1", name: "Checkout", value: 2000 },
        { id: "p2-b2", name: "Catalog",  value: 1300 },
        { id: "p2-b3", name: "Search",   value: 900 },
      ]},
      { id: "p2-c", name: "Messaging", children: [
        { id: "p2-c1", name: "Email",    value: 600 },
        { id: "p2-c2", name: "Push",     value: 450 },
        { id: "p2-c3", name: "In-App",   value: 380 },
      ]},
    ]},
    { id: "p3", name: "Infrastructure", children: [
      { id: "p3-a", name: "Cloud",  children: [
        { id: "p3-a1", name: "Compute",  value: 2200 },
        { id: "p3-a2", name: "Storage",  value: 1400 },
        { id: "p3-a3", name: "Network",  value: 800 },
      ]},
      { id: "p3-b", name: "Security", children: [
        { id: "p3-b1", name: "IAM",       value: 500 },
        { id: "p3-b2", name: "Encryption",value: 400 },
        { id: "p3-b3", name: "Audit",     value: 350 },
      ]},
    ]},
  ],
};

export const DeepHierarchy: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**5 depth levels — combines Ctrl+Click drill-down with Ctrl+Scroll zoom.** ' +
          '`Ctrl+Click` any ring segment → drill-down into that subtree. ' +
          '`Ctrl+Scroll` → visual zoom (content outside `size` is clipped). ' +
          '`Escape` resets both zoom and drill-down to root.',
      },
    },
  },
  args: {
    data:      DEEP_DATA,
    size:      520,
    sortBy:    "value",
    zoomable:  true,
    showSegmentLabels: true,
  },
};
