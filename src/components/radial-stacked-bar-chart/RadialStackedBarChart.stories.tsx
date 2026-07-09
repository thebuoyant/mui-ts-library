import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { RadialStackedBarChart } from "./RadialStackedBarChart";

const meta: Meta<typeof RadialStackedBarChart> = {
  title:     "Components/RadialStackedBarChart",
  component: RadialStackedBarChart,
  argTypes: {
    barPadding:              { control: { type: "range", min: 0, max: 0.8, step: 0.01 } },
    disabled:                { control: "boolean" },
    gridLineCount:           { control: { type: "number", min: 1, max: 10 } },
    innerRadius:             { control: { type: "number", min: 0, max: 250, step: 5 } },
    showGridLines:           { control: "boolean" },
    showGridValues:          { control: "boolean" },
    showLabels:              { control: "boolean" },
    showLegend:              { control: "boolean" },
    size:                    { control: { type: "number", min: 200, max: 900, step: 50 } },
    sortBy:                  { control: "radio", options: ["none", "value", "label"] },
    valueDecimalCount:       { control: { type: "number", min: 0, max: 4 } },
    valueDecimalSeparator:   { control: "text" },
    valueThousandsSeparator: { control: "text" },
    zoomable:                { control: "boolean" },
    // complex — dedicated stories
    chartColors:             { control: false },
    colorConfig:             { control: false },
    data:                    { control: false },
    gridValueFormatter:      { control: false },
    valueFormatter:          { control: false },
    keys:                    { control: false },
    translation:             { control: false },
    onBarClick:              { control: false },
  },
  args: {
    barPadding:              0.12,
    disabled:                false,
    gridLineCount:           3,
    innerRadius:             90,   // = size(500) × 0.18 — matches component default
    showGridLines:           true,
    showGridValues:          true,
    showLabels:              true,
    showLegend:              true,
    size:                    500,
    sortBy:                  "none",
    valueDecimalCount:       0,
    valueDecimalSeparator:   ".",
    valueThousandsSeparator: ",",
    zoomable:                false,
    onBarClick:              fn(),
  },
  parameters: {
    controls: { sort: "alpha" },
  },
};

export default meta;
type Story = StoryObj<typeof RadialStackedBarChart>;

// ── fixtures ──────────────────────────────────────────────────────────────────

const AGE_KEYS = [
  { key: "under5",   label: "Under 5 Years" },
  { key: "age5_13",  label: "5 to 13 Years" },
  { key: "age14_17", label: "14 to 17 Years" },
  { key: "age18_24", label: "18 to 24 Years" },
  { key: "age25_44", label: "25 to 44 Years" },
  { key: "age45_64", label: "45 to 64 Years" },
  { key: "age65plus",label: "65 Years and Over" },
];

const US_STATES_DATA = [
  { id: "CA", label: "CA", values: { under5: 2486000, age5_13: 4926000, age14_17: 1897000, age18_24: 3981000, age25_44: 9109000, age45_64: 7793000, age65plus: 4032000 } },
  { id: "TX", label: "TX", values: { under5: 1965000, age5_13: 3773000, age14_17: 1428000, age18_24: 2951000, age25_44: 6823000, age45_64: 5360000, age65plus: 2636000 } },
  { id: "FL", label: "FL", values: { under5: 1075000, age5_13: 2097000, age14_17: 838000,  age18_24: 1769000, age25_44: 4120000, age45_64: 4061000, age65plus: 3329000 } },
  { id: "NY", label: "NY", values: { under5: 1174000, age5_13: 2202000, age14_17: 861000,  age18_24: 1974000, age25_44: 4618000, age45_64: 4213000, age65plus: 2876000 } },
  { id: "PA", label: "PA", values: { under5: 701000,  age5_13: 1378000, age14_17: 554000,  age18_24: 1314000, age25_44: 2734000, age45_64: 2891000, age65plus: 2024000 } },
  { id: "IL", label: "IL", values: { under5: 805000,  age5_13: 1568000, age14_17: 610000,  age18_24: 1296000, age25_44: 3006000, age45_64: 2744000, age65plus: 1766000 } },
  { id: "OH", label: "OH", values: { under5: 679000,  age5_13: 1382000, age14_17: 559000,  age18_24: 1270000, age25_44: 2611000, age45_64: 2693000, age65plus: 1852000 } },
  { id: "GA", label: "GA", values: { under5: 651000,  age5_13: 1291000, age14_17: 514000,  age18_24: 1107000, age25_44: 2676000, age45_64: 2282000, age65plus: 1228000 } },
  { id: "NC", label: "NC", values: { under5: 605000,  age5_13: 1208000, age14_17: 488000,  age18_24: 1077000, age25_44: 2375000, age45_64: 2310000, age65plus: 1467000 } },
  { id: "MI", label: "MI", values: { under5: 570000,  age5_13: 1144000, age14_17: 475000,  age18_24: 1063000, age25_44: 2175000, age45_64: 2247000, age65plus: 1595000 } },
  { id: "NJ", label: "NJ", values: { under5: 522000,  age5_13: 1058000, age14_17: 415000,  age18_24: 870000,  age25_44: 2162000, age45_64: 2028000, age65plus: 1259000 } },
  { id: "VA", label: "VA", values: { under5: 492000,  age5_13: 978000,  age14_17: 388000,  age18_24: 912000,  age25_44: 2073000, age45_64: 1863000, age65plus: 1102000 } },
  { id: "WA", label: "WA", values: { under5: 452000,  age5_13: 887000,  age14_17: 356000,  age18_24: 776000,  age25_44: 1880000, age45_64: 1680000, age65plus: 1006000 } },
  { id: "AZ", label: "AZ", values: { under5: 445000,  age5_13: 882000,  age14_17: 363000,  age18_24: 788000,  age25_44: 1700000, age45_64: 1632000, age65plus: 1135000 } },
  { id: "MA", label: "MA", values: { under5: 378000,  age5_13: 730000,  age14_17: 299000,  age18_24: 818000,  age25_44: 1756000, age45_64: 1699000, age65plus: 1077000 } },
  { id: "TN", label: "TN", values: { under5: 400000,  age5_13: 793000,  age14_17: 323000,  age18_24: 703000,  age25_44: 1526000, age45_64: 1494000, age65plus: 921000 } },
  { id: "IN", label: "IN", values: { under5: 418000,  age5_13: 826000,  age14_17: 330000,  age18_24: 744000,  age25_44: 1481000, age45_64: 1361000, age65plus: 854000 } },
  { id: "MO", label: "MO", values: { under5: 363000,  age5_13: 720000,  age14_17: 293000,  age18_24: 680000,  age25_44: 1321000, age45_64: 1316000, age65plus: 869000 } },
  { id: "MD", label: "MD", values: { under5: 363000,  age5_13: 715000,  age14_17: 287000,  age18_24: 636000,  age25_44: 1484000, age45_64: 1367000, age65plus: 778000 } },
  { id: "WI", label: "WI", values: { under5: 328000,  age5_13: 660000,  age14_17: 272000,  age18_24: 621000,  age25_44: 1218000, age45_64: 1226000, age65plus: 823000 } },
];

const QUARTERLY_KEYS = [
  { key: "q1", label: "Q1" },
  { key: "q2", label: "Q2" },
  { key: "q3", label: "Q3" },
  { key: "q4", label: "Q4" },
];

const SALES_DATA = [
  { id: "berlin",   label: "Berlin",   values: { q1: 120, q2: 145, q3: 98,  q4: 175 } },
  { id: "munich",   label: "Munich",   values: { q1: 210, q2: 185, q3: 220, q4: 195 } },
  { id: "hamburg",  label: "Hamburg",  values: { q1: 95,  q2: 110, q3: 88,  q4: 130 } },
  { id: "cologne",  label: "Cologne",  values: { q1: 80,  q2: 95,  q3: 105, q4: 90  } },
  { id: "frankfurt",label: "Frankfurt",values: { q1: 165, q2: 150, q3: 180, q4: 200 } },
  { id: "stuttgart",label: "Stuttgart",values: { q1: 75,  q2: 85,  q3: 70,  q4: 95  } },
  { id: "dusseldorf",label:"Düsseldorf",values: { q1: 60, q2: 70,  q3: 65,  q4: 80  } },
  { id: "leipzig",  label: "Leipzig",  values: { q1: 45,  q2: 55,  q3: 60,  q4: 65  } },
];

// ── stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "US state population by age group — 20 states, 7 age-group series. " +
          "Hover over any segment for a tooltip showing the series value, percentage, and total. " +
          "Grid rings mark 10M and 20M population milestones.",
      },
    },
  },
  args: {
    data:             US_STATES_DATA,
    keys:             AGE_KEYS,
    size:             600,
    gridValueFormatter: (v) => `${(v / 1e6).toFixed(0)}M`,
  },
};

export const SortedByValue: Story = {
  parameters: {
    docs: {
      description: {
        story: "Bars sorted by total value descending — the largest states appear at the top (12 o'clock) and values decrease clockwise.",
      },
    },
  },
  args: {
    data:             US_STATES_DATA,
    keys:             AGE_KEYS,
    size:             600,
    sortBy:           "value",
    gridValueFormatter: (v) => `${(v / 1e6).toFixed(0)}M`,
  },
};

export const SalesQuarterly: Story = {
  parameters: {
    docs: {
      description: {
        story: "Quarterly sales per city — a smaller dataset with only 4 series, showing the chart at a more compact size.",
      },
    },
  },
  args: {
    data: SALES_DATA,
    keys: QUARTERLY_KEYS,
    size: 480,
  },
};

export const CustomColors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`chartColors` replaces the entire palette. `colorConfig` overrides individual series — " +
          "here Q2 and Q4 get brand colors while Q1 and Q3 use the custom palette.",
      },
    },
  },
  args: {
    data:        SALES_DATA,
    keys:        QUARTERLY_KEYS,
    size:        480,
    chartColors: ["#e8f5e9", "#a5d6a7", "#388e3c", "#1b5e20"],
    colorConfig: {
      q2: { fill: "#f57c00" },
      q4: { fill: "#6a1b9a" },
    },
  },
};

export const NoLabels: Story = {
  parameters: {
    docs: {
      description: {
        story: "`showLabels={false}` removes the outer-edge bar labels — useful in space-constrained layouts or when bar identities are shown elsewhere.",
      },
    },
  },
  args: {
    data:       SALES_DATA,
    keys:       QUARTERLY_KEYS,
    size:       440,
    showLabels: false,
  },
};

export const NoLegend: Story = {
  parameters: {
    docs: {
      description: {
        story: "`showLegend={false}` removes the center legend — use when a separate legend is rendered outside the chart.",
      },
    },
  },
  args: {
    data:       SALES_DATA,
    keys:       QUARTERLY_KEYS,
    size:       440,
    showLegend: false,
  },
};

export const NoGridLines: Story = {
  args: {
    data:          SALES_DATA,
    keys:          QUARTERLY_KEYS,
    size:          440,
    showGridLines: false,
  },
};

export const LargeInnerRadius: Story = {
  parameters: {
    docs: {
      description: {
        story: "A large `innerRadius` creates a wide donut hole — the legend sits comfortably in the center.",
      },
    },
  },
  args: {
    data:        SALES_DATA,
    keys:        QUARTERLY_KEYS,
    size:        480,
    innerRadius: 130,
  },
};

export const StringKeys: Story = {
  parameters: {
    docs: {
      description: {
        story: "`keys` can be a plain `string[]` — the key string is used as both the data field name and the legend label.",
      },
    },
  },
  args: {
    data: SALES_DATA,
    keys: ["q1", "q2", "q3", "q4"],
    size: 480,
  },
};

export const Disabled: Story = {
  args: {
    data:     SALES_DATA,
    keys:     QUARTERLY_KEYS,
    size:     440,
    disabled: true,
  },
};

export const ZoomableWithCtrlScroll: Story = {
  parameters: {
    docs: {
      description: {
        story: "`zoomable={true}` enables Ctrl/Cmd+Scroll zoom. Press Escape to reset. Content outside `size` is clipped.",
      },
    },
  },
  args: {
    data:     US_STATES_DATA,
    keys:     AGE_KEYS,
    size:     600,
    zoomable: true,
    gridValueFormatter: (v) => `${(v / 1e6).toFixed(0)}M`,
  },
};

export const WithValueFormatter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`valueFormatter` gives full control over tooltip bar values — " +
          "here quarterly sales are formatted as `€ X,XXX` with locale separators. " +
          "Use `seriesKey` to apply different units per series.",
      },
    },
  },
  args: {
    data:           SALES_DATA,
    keys:           QUARTERLY_KEYS,
    size:           480,
    valueFormatter: (v, _key) => `€ ${v.toLocaleString("de-DE")}`,
    gridValueFormatter: (v) => `€${v}k`,
  },
};

export const CustomGridValueFormatter: Story = {
  parameters: {
    docs: {
      description: {
        story: "`gridValueFormatter` controls the text on grid ring labels — here the raw values are formatted as currency.",
      },
    },
  },
  args: {
    data:               SALES_DATA,
    keys:               QUARTERLY_KEYS,
    size:               480,
    gridValueFormatter: (v) => `€${v}k`,
  },
};

export const LegendOverflowProtection: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Stress-test for the legend overflow guard: all series labels are intentionally very long. " +
          "Labels that exceed the available inner-radius width are automatically truncated with '...' — " +
          "no legend text bleeds into the chart segments. " +
          "Try reducing `size` or `innerRadius` via the controls to see the truncation kick in earlier.",
      },
    },
  },
  args: {
    data: [
      { id: "a", label: "Alpha", values: { cat1: 120, cat2: 95,  cat3: 60,  cat4: 40  } },
      { id: "b", label: "Beta",  values: { cat1: 80,  cat2: 110, cat3: 75,  cat4: 55  } },
      { id: "c", label: "Gamma", values: { cat1: 100, cat2: 70,  cat3: 90,  cat4: 30  } },
      { id: "d", label: "Delta", values: { cat1: 60,  cat2: 85,  cat3: 50,  cat4: 70  } },
    ],
    keys: [
      { key: "cat1", label: "This is a Very Long Category Name — Alpha" },
      { key: "cat2", label: "This is a Very Long Category Name — Beta"  },
      { key: "cat3", label: "This is a Very Long Category Name — Gamma" },
      { key: "cat4", label: "This is a Very Long Category Name — Delta" },
    ],
    size:        400,
    innerRadius: 70,
  },
};
