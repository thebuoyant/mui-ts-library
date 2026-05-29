import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { RadialTreeChart } from "./RadialTreeChart";
import type { RadialTreeChartData } from "./RadialTreeChart.types";

const meta: Meta<typeof RadialTreeChart> = {
  title: "Components/RadialTreeChart",
  component: RadialTreeChart,
  argTypes: {
    size:              { control: "number" },
    autoFit:           { control: "boolean" },
    sortBy:            { control: "radio", options: ["name", "value"] },
    showLabels:        { control: "boolean" },
    showIcons:         { control: "boolean" },
    rootNodeRadius:    { control: "number" },
    branchNodeRadius:  { control: "number" },
    leafNodeRadius:    { control: "number" },
    linkStrokeOpacity: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    linkStrokeWidth:   { control: "number" },
    linkColor:         { control: "color" },
    labelFontSize:     { control: "number" },
    labelColor:        { control: "color" },
    separationSibling: { control: "number" },
    separationCousin:  { control: "number" },
    showNodePopover:   { control: "boolean" },
    disabled:          { control: "boolean" },
    chartColors:              { control: false },
    renderNodePopoverContent: { control: false },
    translation:              { control: false },
    data:                     { control: false },
    onNodeClick:              { control: false },
  },
  args: {
    size:              600,
    autoFit:           true,
    sortBy:            "name",
    showLabels:        true,
    showIcons:         true,
    rootNodeRadius:    22,
    branchNodeRadius:  16,
    leafNodeRadius:    11,
    linkStrokeOpacity: 1,
    linkStrokeWidth:   1.5,
    labelFontSize:     12,
    separationSibling: 1,
    separationCousin:  2,
    showNodePopover:   false,
    disabled:          false,
    onNodeClick:       fn(),
  },
};

export default meta;
type Story = StoryObj<typeof RadialTreeChart>;

// ── Demo data: org chart ───────────────────────────────────────────────────

const ORG_DATA: RadialTreeChartData = {
  id: "ceo", name: "CEO", subname: "Leadership",
  specialValueA: "L0", specialValueB: "Executive",
  children: [
    {
      id: "cto", name: "CTO", subname: "Technology",
      specialValueA: "L1", specialValueB: "Engineering",
      children: [
        { id: "fe",     name: "Frontend Lead",  subname: "React / TS",     specialValueA: "L2", specialValueB: "8 reports" },
        { id: "be",     name: "Backend Lead",   subname: "Node / Go",      specialValueA: "L2", specialValueB: "6 reports" },
        { id: "devops", name: "DevOps Lead",    subname: "Infrastructure", specialValueA: "L2", specialValueB: "4 reports" },
        { id: "qa",     name: "QA Lead",        subname: "Quality",        specialValueA: "L2", specialValueB: "3 reports" },
      ],
    },
    {
      id: "cpo", name: "CPO", subname: "Product",
      specialValueA: "L1", specialValueB: "Strategy",
      children: [
        { id: "ux",  name: "UX Lead",         subname: "Design",   specialValueA: "L2", specialValueB: "5 reports" },
        { id: "pm1", name: "Product Manager", subname: "Core",     specialValueA: "L2", specialValueB: "2 reports" },
        { id: "pm2", name: "Product Analyst", subname: "Insights", specialValueA: "L2", specialValueB: "2 reports" },
      ],
    },
    {
      id: "cmo", name: "CMO", subname: "Marketing",
      specialValueA: "L1", specialValueB: "Growth",
      children: [
        { id: "content", name: "Content Lead", subname: "Brand",       specialValueA: "L2", specialValueB: "3 reports" },
        { id: "growth",  name: "Growth Lead",  subname: "Acquisition", specialValueA: "L2", specialValueB: "4 reports" },
        { id: "seo",     name: "SEO Lead",     subname: "Organic",     specialValueA: "L2", specialValueB: "2 reports" },
      ],
    },
    {
      id: "cfo", name: "CFO", subname: "Finance",
      specialValueA: "L1", specialValueB: "Operations",
      children: [
        { id: "controller", name: "Controller",  subname: "Accounting", specialValueA: "L2", specialValueB: "2 reports" },
        { id: "fp-and-a",   name: "FP&A Lead",   subname: "Planning",   specialValueA: "L2", specialValueB: "2 reports" },
      ],
    },
  ],
};

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Radial tree chart showing an org chart. **Hover** any node to see its details in a MUI tooltip. ' +
          '**Click** any node to fire `onNodeClick`. Default icons: folder for branch nodes, person for leaf nodes.',
      },
    },
  },
  args: { data: ORG_DATA },
};

export const WithNodePopover: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showNodePopover={true}` — clicking a node opens a built-in MUI Popover with name, subname, and special values. ' +
          'The popover content can be fully customized via `renderNodePopoverContent`.',
      },
    },
  },
  args: {
    data:           ORG_DATA,
    showNodePopover: true,
    translation: { specialValueA: "Level", specialValueB: "Team size" },
  },
};

export const CustomPalette: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`chartColors` overrides the default MUI theme palette. Colors are assigned per depth level and repeat cyclically.',
      },
    },
  },
  args: {
    data: ORG_DATA,
    chartColors: ["#1565C0", "#6A1B9A", "#00695C"],
  },
};

export const NoLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showLabels={false}` hides all text labels. Node details are still available via the MUI tooltip on hover.',
      },
    },
  },
  args: { data: ORG_DATA, showLabels: false },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '`disabled={true}` mutes all interactions and reduces opacity to 0.5.',
      },
    },
  },
  args: { data: ORG_DATA, disabled: true },
};
