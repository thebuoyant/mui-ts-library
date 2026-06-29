import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, userEvent } from "storybook/test";
import { ChordChart } from "./ChordChart";
import type { ChordChartData } from "./ChordChart.types";

const meta: Meta<typeof ChordChart> = {
  title: "Components/ChordChart",
  component: ChordChart,
  argTypes: {
    // Props A–Z
    chartColors:             { control: false },
    data:                    { control: false },
    directed:                { control: "boolean" },
    disabled:                { control: "boolean" },
    groupColorConfigs:       { control: false },
    innerRadius:             { control: "number" },
    labelOffset:             { control: "number" },
    padAngle:                { control: false },
    ribbonBlendMode:         { control: "text" },
    ribbonOpacity:           { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    ribbonPadAngle:          { control: false },
    ringThickness:           { control: "number" },
    showGroupLabels:         { control: "boolean" },
    size:                    { control: "number" },
    sortChords:              { control: "radio", options: ["ascending", "descending", "none"] },
    sortSubgroups:           { control: "radio", options: ["ascending", "descending", "none"] },
    translation:             { control: false },
    valueDecimalCount:       { control: "number" },
    valueDecimalSeparator:   { control: "text" },
    valueThousandsSeparator: { control: "text" },
    zoomable:                { control: "boolean" },
    // Callbacks A–Z
    onChordClick:            { control: false },
    onGroupClick:            { control: false },
  },
  args: {
    directed:                true,
    disabled:                false,
    innerRadius:             160,
    labelOffset:             8,
    ribbonBlendMode:         "multiply",
    ribbonOpacity:           0.75,
    ringThickness:           20,
    showGroupLabels:         true,
    size:                    500,
    sortChords:              "descending",
    sortSubgroups:           "descending",
    valueDecimalCount:       0,
    valueDecimalSeparator:   ".",
    valueThousandsSeparator: ",",
    zoomable:                false,
    onChordClick:            fn(),
    onGroupClick:            fn(),
  },
  parameters: {
    controls: { sort: 'alpha' },
  },
};

export default meta;
type Story = StoryObj<typeof ChordChart>;

// ── Demo data: team dependencies ─────────────────────────────────────────────

const TEAM_DATA: ChordChartData[] = [
  { source: "Frontend",  target: "Backend",   value: 45 },
  { source: "Frontend",  target: "Design",    value: 30 },
  { source: "Backend",   target: "Frontend",  value: 20 },
  { source: "Backend",   target: "DevOps",    value: 35 },
  { source: "Backend",   target: "Data",      value: 25 },
  { source: "Design",    target: "Frontend",  value: 18 },
  { source: "DevOps",    target: "Backend",   value: 12 },
  { source: "DevOps",    target: "Data",      value: 20 },
  { source: "Data",      target: "Backend",   value: 30 },
  { source: "Data",      target: "Analytics", value: 40 },
  { source: "Analytics", target: "Frontend",  value: 22 },
  { source: "Analytics", target: "Data",      value: 28 },
];

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Chord chart showing team dependency flows. **Hover** any arc group to highlight its ribbons and dim the rest. ' +
          '**Click** a group arc → `onGroupClick` with `{ name, valueOut, valueIn }`. ' +
          '**Click** a ribbon → `onChordClick` with `{ source, target }`. ' +
          'Tooltip appears near the cursor with name and flow values. ' +
          'This story auto-hovers the first group so you can see the highlight effect immediately.',
      },
    },
  },
  args: { data: TEAM_DATA },
  play: async ({ canvasElement }) => {
    const firstGroup = canvasElement.querySelector<SVGGElement>("g[style*='cursor']");
    if (firstGroup) await userEvent.hover(firstGroup);
  },
};

export const Undirected: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`directed={false}` — ribbons are symmetric (no arrowheads). ' +
          'Use for bidirectional relationships where direction is irrelevant.',
      },
    },
  },
  args: { data: TEAM_DATA, directed: false },
};

export const NoLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showGroupLabels={false}` hides the text labels outside the arc ring. ' +
          'Full group names still appear in the tooltip on hover.',
      },
    },
  },
  args: { data: TEAM_DATA, showGroupLabels: false },
};

export const CustomPalette: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`chartColors` overrides the default MUI-theme palette. Colors are assigned to groups in sorted order and repeat cyclically.',
      },
    },
  },
  args: {
    data: TEAM_DATA,
    chartColors: ["#1565C0", "#6A1B9A", "#00695C", "#E65100", "#AD1457", "#37474F"],
  },
};

export const WithColorConfig: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`groupColorConfigs` maps **group names** to color overrides — more granular than `chartColors`. ' +
          'Each group can have its own `fill` color while others fall back to the palette. ' +
          'Ribbons automatically use the target group\'s color.',
      },
    },
  },
  args: {
    data: TEAM_DATA,
    groupColorConfigs: {
      "Frontend":  { fill: "#1565C0" },  // brand blue
      "Backend":   { fill: "#0D47A1" },  // darker blue
      "Design":    { fill: "#6A1B9A" },  // brand purple
      "DevOps":    { fill: "#00695C" },  // brand teal
      "Data":      { fill: "#E65100" },  // brand orange
      "Analytics": { fill: "#AD1457" },  // brand pink
      // "Sales" has no entry → uses default palette color
    },
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`disabled={true}` mutes all interactions (hover highlight, click callbacks) and reduces opacity to 0.5.',
      },
    },
  },
  args: { data: TEAM_DATA, disabled: true },
};

export const EmptyData: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'When `data` is an empty array, the chart renders the `translation.noData` message ' +
          '(default `"No data"`) centered in the SVG instead of an empty ring. ' +
          'Override it via `translation={{ noData: "..." }}`.',
      },
    },
  },
  args: {
    data: [],
    translation: { noData: "Nothing to show yet" },
  },
};

// ── Use case: international trade flows ──────────────────────────────────────

const TRADE_DATA: ChordChartData[] = [
  { source: "China",   target: "USA",          value: 536 },
  { source: "USA",     target: "China",         value: 154 },
  { source: "China",   target: "EU",            value: 472 },
  { source: "EU",      target: "China",         value: 230 },
  { source: "USA",     target: "EU",            value: 350 },
  { source: "EU",      target: "USA",           value: 380 },
  { source: "China",   target: "Japan",         value: 165 },
  { source: "Japan",   target: "China",         value: 142 },
  { source: "USA",     target: "Mexico",        value: 290 },
  { source: "Mexico",  target: "USA",           value: 310 },
  { source: "EU",      target: "Japan",         value: 88 },
  { source: "Japan",   target: "EU",            value: 76 },
  { source: "China",   target: "Mexico",        value: 45 },
];

export const TradeRelationships: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Real-world use case: bilateral trade flows in $B between major economies.** ' +
          'A classic chord diagram application — visualizing import/export volume between countries or regions. ' +
          'Hover "China" to see at a glance which partners dominate its trade, both incoming and outgoing.',
      },
    },
  },
  args: {
    data: TRADE_DATA,
    valueDecimalCount: 0,
    valueThousandsSeparator: ",",
    sortChords: "descending",
  },
};
