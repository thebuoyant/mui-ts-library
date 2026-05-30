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

// ── Demo data: company budget ─────────────────────────────────────────────────

const BUDGET_DATA: CirclePackingData = {
  name: "Company",
  children: [
    {
      name: "Engineering", children: [
        { name: "Frontend",  value: 480 },
        { name: "Backend",   value: 620 },
        { name: "DevOps",    value: 210 },
        { name: "QA",        value: 190 },
        { name: "Mobile",    value: 340 },
      ],
    },
    {
      name: "Sales", children: [
        { name: "EMEA",      value: 540 },
        { name: "Americas",  value: 490 },
        { name: "APAC",      value: 220 },
        { name: "Partners",  value: 180 },
      ],
    },
    {
      name: "Product", children: [
        { name: "Design",    value: 290 },
        { name: "Research",  value: 200 },
        { name: "Strategy",  value: 150 },
      ],
    },
    {
      name: "Marketing", children: [
        { name: "Content",   value: 180 },
        { name: "SEO",       value: 120 },
        { name: "Ads",       value: 310 },
        { name: "Events",    value: 140 },
      ],
    },
    {
      name: "Operations", children: [
        { name: "HR",        value: 180 },
        { name: "Finance",   value: 240 },
        { name: "Legal",     value: 130 },
        { name: "IT",        value: 160 },
      ],
    },
  ],
};

// ── Deep data: 4 levels ───────────────────────────────────────────────────────

const DEEP_DATA: CirclePackingData = {
  name: "Portfolio",
  children: [
    { name: "Platform", children: [
      { name: "Frontend", children: [
        { name: "Web",      value: 1200 },
        { name: "Mobile",   value: 950 },
        { name: "Desktop",  value: 400 },
      ]},
      { name: "Backend", children: [
        { name: "API",      value: 1100 },
        { name: "Auth",     value: 700 },
        { name: "Data",     value: 900 },
        { name: "Search",   value: 500 },
      ]},
    ]},
    { name: "Products", children: [
      { name: "Analytics", children: [
        { name: "Realtime", value: 1500 },
        { name: "Reports",  value: 1100 },
      ]},
      { name: "Commerce", children: [
        { name: "Checkout", value: 2000 },
        { name: "Catalog",  value: 1300 },
        { name: "Cart",     value: 800 },
      ]},
    ]},
    { name: "Infrastructure", children: [
      { name: "Cloud", children: [
        { name: "Compute",  value: 2200 },
        { name: "Storage",  value: 1400 },
        { name: "Network",  value: 800 },
      ]},
      { name: "Security", children: [
        { name: "IAM",      value: 500 },
        { name: "Audit",    value: 400 },
      ]},
    ]},
  ],
};

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Circle packing chart with company budget data. ' +
          '**Double-click** any circle to zoom in (animated D3 transition). ' +
          '**Double-click** the background to zoom out. ' +
          '**Single-click** fires `onCircleClick`. ' +
          '**Alt+Double-click** for slow-motion zoom. ' +
          'A breadcrumb appears when zoomed in.',
      },
    },
  },
  args: { data: BUDGET_DATA },
};

export const DeepHierarchy: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**4 depth levels** — shows how D3 circle packing handles deep hierarchies. ' +
          'Double-click any circle to drill in; the animation smoothly zooms to that circle. ' +
          'Double-click background to return up one level.',
      },
    },
  },
  args: { data: DEEP_DATA, size: 650 },
};

export const CustomColors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`chartColors` overrides the default depth-gradient with a fixed per-depth palette. ' +
          'Colors cycle: depth 0 → color[0], depth 1 → color[1], etc.',
      },
    },
  },
  args: {
    data: BUDGET_DATA,
    chartColors: ["#1565C0", "#1976D2", "#42A5F5", "#90CAF9", "#E3F2FD"],
    background: "#F5F5F5",
  },
};

export const GradientCustom: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`depthColorStart` / `depthColorEnd` customize the HCL gradient used when `chartColors` is not set. ' +
          'HCL interpolation produces perceptually uniform color progressions.',
      },
    },
  },
  args: {
    data: BUDGET_DATA,
    depthColorStart: "hsl(200, 80%, 85%)",
    depthColorEnd:   "hsl(260, 60%, 35%)",
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '`disabled={true}` mutes all interactions (zoom, click) and reduces opacity.',
      },
    },
  },
  args: { data: BUDGET_DATA, disabled: true },
};
