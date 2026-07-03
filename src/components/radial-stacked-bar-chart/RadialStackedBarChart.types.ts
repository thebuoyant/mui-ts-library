/** One series (stack layer) — key is the data field name, label overrides the legend text */
export type RadialStackedBarSeries = {
  key:    string;
  label?: string;
};

/** One bar (e.g. one country, state, or category) */
export type RadialStackedBarData = {
  /** Unique identifier — used as React key and in callback payloads */
  id:     string;
  /** Outer-edge label shown next to the bar */
  label:  string;
  /** Value per series key — missing keys are treated as 0 */
  values: Record<string, number>;
};

/**
 * Per-series color overrides.
 * Key = series key. Value = color config — null / omit = use palette.
 * Example: `{ "65 Years and Over": { fill: "#1565C0" } }`
 */
export type RadialStackedBarColorConfigs = Record<string, { fill?: string } | null>;

/** Payload delivered to `onBarClick` */
export type RadialStackedBarBarInfo = {
  id:        string;
  label:     string;
  /** Series key that was clicked */
  seriesKey: string;
  /** Value of the clicked segment */
  value:     number;
  /** Total bar value (sum of all series) */
  total:     number;
  /** All values for this bar */
  values:    Record<string, number>;
};

export type RadialStackedBarChartTranslation = {
  noData: string;
};

export const DEFAULT_RADIAL_STACKED_BAR_CHART_TRANSLATION: RadialStackedBarChartTranslation = {
  noData: 'No data',
};

export type RadialStackedBarChartProps = {
  /** Array of bars — each bar has a label and a value per series key */
  data:                     RadialStackedBarData[];
  /**
   * Series definitions in stack order (innermost first).
   * Pass `string[]` for quick setup — the string becomes both key and legend label.
   * Pass `RadialStackedBarSeries[]` to customize the legend label independently from the key.
   */
  keys:                     RadialStackedBarSeries[] | string[];
  /** Width and height of the SVG in pixels (default: 500) */
  size?:                    number;
  /** Inner radius of the bar area in px — controls the center hole size (default: size * 0.18) */
  innerRadius?:             number;
  /** Fractional gap between adjacent bars — 0 = no gap, 1 = all gap (default: 0.12) */
  barPadding?:              number;
  /** Custom color palette for the series — falls back to MUI theme palette when omitted */
  chartColors?:             string[];
  /** Per-series color overrides keyed by series key — takes precedence over `chartColors` */
  colorConfig?:             RadialStackedBarColorConfigs;
  /** Show bar labels on the outer edge (default: true) */
  showLabels?:              boolean;
  /** Show concentric grid rings (default: true) */
  showGridLines?:           boolean;
  /** Number of concentric grid rings (default: 3) */
  gridLineCount?:           number;
  /** Show value labels on the outermost grid ring (default: true) */
  showGridValues?:          boolean;
  /** Show the series legend (default: true) */
  showLegend?:              boolean;
  /** Sort bars by total descending ('value'), by label ascending ('label'), or keep original order ('none') — default: 'none' */
  sortBy?:                  'value' | 'label' | 'none';
  /** Decimal places for values in tooltips (default: 0) */
  valueDecimalCount?:       number;
  /** Decimal separator for values (default: '.') */
  valueDecimalSeparator?:   string;
  /** Thousands separator for values (default: ',') */
  valueThousandsSeparator?: string;
  /**
   * Custom formatter for the grid ring value labels.
   * Defaults to compact notation (e.g. 30000 → "30k", 3000000 → "3M").
   * Example: `(v) => \`${(v / 1e6).toFixed(0)}M\``
   */
  gridValueFormatter?:      (value: number) => string;
  /** Enable Ctrl/Cmd+Scroll visual zoom — content outside `size` is clipped (default: false) */
  zoomable?:                boolean;
  /** Fired on click of any bar segment */
  onBarClick?:              (info: RadialStackedBarBarInfo, event: React.MouseEvent<SVGPathElement>) => void;
  /** Disables all interactions (default: false) */
  disabled?:                boolean;
  /** Override any translation string */
  translation?:             Partial<RadialStackedBarChartTranslation>;
};
