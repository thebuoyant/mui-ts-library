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
  id: "ceo", name: "CEO", subname: "Thomas Müller",
  specialValueA: "Since 2019", specialValueB: "15 direct reports",
  children: [
    {
      id: "cto", name: "CTO", subname: "Anna Schmidt",
      specialValueA: "Since 2021", specialValueB: "Technology",
      children: [
        { id: "fe",     name: "Frontend Lead",  subname: "Marc Weber",   specialValueA: "Since 2022", specialValueB: "8 engineers" },
        { id: "be",     name: "Backend Lead",   subname: "Julia Fischer",specialValueA: "Since 2021", specialValueB: "6 engineers" },
        { id: "devops", name: "DevOps Lead",    subname: "Tim Bauer",    specialValueA: "Since 2023", specialValueB: "4 engineers" },
        { id: "qa",     name: "QA Lead",        subname: "Sara Klein",   specialValueA: "Since 2022", specialValueB: "3 engineers" },
      ],
    },
    {
      id: "cpo", name: "CPO", subname: "Laura Hoffmann",
      specialValueA: "Since 2020", specialValueB: "Product",
      children: [
        { id: "ux",  name: "UX Lead",         subname: "Nina Schulz",  specialValueA: "Since 2022", specialValueB: "5 designers" },
        { id: "pm1", name: "Product Manager", subname: "Ben Richter",  specialValueA: "Since 2021", specialValueB: "Core product" },
        { id: "pm2", name: "Product Analyst", subname: "Eva Wolf",     specialValueA: "Since 2023", specialValueB: "Insights" },
      ],
    },
    {
      id: "cmo", name: "CMO", subname: "Max Braun",
      specialValueA: "Since 2022", specialValueB: "Marketing",
      children: [
        { id: "content", name: "Content Lead", subname: "Lea Koch",    specialValueA: "Since 2023", specialValueB: "3 writers" },
        { id: "growth",  name: "Growth Lead",  subname: "Jan Meyer",   specialValueA: "Since 2022", specialValueB: "Acquisition" },
        { id: "seo",     name: "SEO Lead",     subname: "Mia Lange",   specialValueA: "Since 2023", specialValueB: "Organic" },
      ],
    },
    {
      id: "cfo", name: "CFO", subname: "Klaus Wagner",
      specialValueA: "Since 2020", specialValueB: "Finance",
      children: [
        { id: "controller", name: "Controller",  subname: "Petra Fuchs", specialValueA: "Since 2021", specialValueB: "Accounting" },
        { id: "fp-and-a",   name: "FP&A Lead",   subname: "Hans Keller", specialValueA: "Since 2022", specialValueB: "Planning" },
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
    translation: { specialValueA: "In Role", specialValueB: "Department" },
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
