export type SunburstSortBy = 'value' | 'name';

export type SunburstChartData = {
  id:           string;
  name:         string;
  value?:       number;
  /** Per-node color overrides — null / omit = use chart default palette */
  colorConfig?: { fill?: string; textColor?: string; stroke?: string } | null;
  children?:    SunburstChartData[];
};

export type SunburstSegmentInfo = {
  /** Node ID — direct access, same as `data.id` */
  id:            string;
  name:          string;
  /** D3 aggregate value — sum of all descendant leaf values */
  value:         number | null;
  /** Percentage of root total — `(value / root.value) * 100` */
  percentage:    number;
  depth:         number;
  /** Breadcrumb path from root — array of node names */
  path:          string[];
  /** Breadcrumb path from root — array of node IDs (for backend linking) */
  pathIds:       string[];
  childrenCount: number;
  /** Original data node as passed to the chart */
  data:          SunburstChartData;
};

export type SunburstZoomInfo = {
  /** The node that is now the focus center */
  focusNode: SunburstSegmentInfo;
  /** True when zoom has been reset to root */
  isRoot:    boolean;
};

export type SunburstChartTranslation = {
  /** Shown when data has no children and no value */
  noData: string;
};

export const DEFAULT_SUNBURST_CHART_TRANSLATION: SunburstChartTranslation = {
  noData: 'No data',
};

export type SunburstChartProps = {
  /** Hierarchical data tree — root node with optional nested children */
  data:                     SunburstChartData;
  /** Width and height of the SVG in pixels (default: 500) */
  size?:                    number;
  /** Show name labels on segments (default: true) */
  showSegmentLabels?:       boolean;
  /** Inner hole radius in px — 0 = solid sunburst, > 0 = donut style (default: 0) */
  innerRadius?:             number;
  /** Sort segments by value (largest first) or by name (default: 'value') */
  sortBy?:                  SunburstSortBy;
  /** Custom color palette for top-level segments — falls back to MUI theme palette */
  chartColors?:             string[];
  /** Show the root node name in the center (default: true) */
  showRootLabel?:           boolean;
  /** Fired on single-click on any segment */
  onSegmentClick?:          (info: SunburstSegmentInfo, event: React.MouseEvent<SVGPathElement | SVGCircleElement>) => void;
  /** Fired on mouse enter/leave — `null` on leave. Use for linked-view highlighting. */
  onSegmentHover?:          (info: SunburstSegmentInfo | null, event: React.MouseEvent<SVGPathElement | SVGCircleElement> | null) => void;
  /** Fired when zoom focus changes (Ctrl+Click in/out, Escape reset) */
  onZoomChange?:            (zoom: SunburstZoomInfo) => void;
  /** Decimal places for value display in tooltips (default: 0) */
  valueDecimalCount?:       number;
  /** Decimal separator for values (default: '.') */
  valueDecimalSeparator?:   string;
  /** Thousands separator for values (default: ',') */
  valueThousandsSeparator?: string;
  /**
   * Custom formatter for numeric values in tooltips. Overrides `valueDecimalCount`,
   * `valueDecimalSeparator`, and `valueThousandsSeparator`.
   * Example: `(v) => \`${v.toLocaleString('de-DE')} MB\``
   * @since 3.22.0
   */
  valueFormatter?:          (value: number) => string;
  /** Enable Ctrl+Scroll zoom — content outside `size` is clipped (default: false) */
  zoomable?:                boolean;
  /** Drill-down/out transition duration in ms — set to 0 to disable animation (default: 750) */
  duration?:                number;
  /** Disables all interactions (default: false) */
  disabled?:                boolean;
  /** Override any translation string */
  translation?:             Partial<SunburstChartTranslation>;
};
