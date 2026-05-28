export type SunburstSortBy = 'value' | 'name';

export type SunburstChartData = {
  id:        string;
  name:      string;
  value?:    number;
  children?: SunburstChartData[];
};

export type SunburstSegmentInfo = {
  name:          string;
  value:         number | null;
  depth:         number;
  path:          string[];
  childrenCount: number;
  data:          SunburstChartData;
};

export type SunburstChartTranslation = {
  /** Shown when data has no children and no value */
  noData:                string;
  /** SVG tooltip hint on segments with children */
  ctrlClickToZoomIn:     string;
  /** SVG tooltip hint on center label / root area */
  ctrlDblClickToZoomOut: string;
  /** Tooltip hint shown on center when zoomed in */
  escToResetZoom:        string;
};

export const DEFAULT_SUNBURST_CHART_TRANSLATION: SunburstChartTranslation = {
  noData:                'No data',
  ctrlClickToZoomIn:     'Ctrl+Click to zoom in',
  ctrlDblClickToZoomOut: 'Ctrl+Double-click to zoom out',
  escToResetZoom:        'Esc to reset zoom',
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
  /** Decimal places for value display in tooltips (default: 0) */
  valueDecimalCount?:       number;
  /** Decimal separator for values (default: '.') */
  valueDecimalSeparator?:   string;
  /** Thousands separator for values (default: ',') */
  valueThousandsSeparator?: string;
  /** Disables all interactions (default: false) */
  disabled?:                boolean;
  /** Override any translation string */
  translation?:             Partial<SunburstChartTranslation>;
};
