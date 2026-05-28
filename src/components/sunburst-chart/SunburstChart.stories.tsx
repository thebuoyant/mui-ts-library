import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { SunburstChart } from "./SunburstChart";
import type { SunburstChartData } from "./SunburstChart.types";

const meta: Meta<typeof SunburstChart> = {
  title: "Components/SunburstChart",
  component: SunburstChart,
  argTypes: {
    size:                    { control: "number" },
    showSegmentLabels:       { control: "boolean" },
    innerRadius:             { control: "number" },
    sortBy:                  { control: "radio", options: ["value", "name"] },
    showRootLabel:           { control: "boolean" },
    disabled:                { control: "boolean" },
    valueDecimalCount:       { control: "number" },
    valueDecimalSeparator:   { control: "text" },
    valueThousandsSeparator: { control: "text" },
    chartColors: { control: false },
    translation: { control: false },
    data:        { control: false },
    onSegmentClick: { control: false },
  },
  args: {
    size:                    500,
    showSegmentLabels:       true,
    innerRadius:             0,
    sortBy:                  "value",
    showRootLabel:           true,
    disabled:                false,
    valueDecimalCount:       0,
    valueDecimalSeparator:   ".",
    valueThousandsSeparator: ",",
    onSegmentClick:          fn(),
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
