/**
 * Per-node color overrides — takes priority over the chart's depth palette.
 * Set any key to override; omit or set to null to fall back to chart defaults.
 * Shared across all D3 charts (SunburstChart, ChordChart, RadialTreeChart, CirclePackingChart).
 */
export type NodeColorConfig = {
  /** Fill / background color of the circle or arc segment */
  fill?:      string;
  /** Label text color (overrides chart-level `labelColor`) */
  textColor?: string;
  /** Stroke / border color */
  stroke?:    string;
};

export type CirclePackingData = {
  /** Optional ID for backend linking */
  id?:          string;
  name:         string;
  value?:       number;
  /** Per-node color overrides — null / omit = use chart default palette */
  colorConfig?: NodeColorConfig | null;
  children?:    CirclePackingData[];
};

export type CirclePackingSortBy = 'value' | 'name';

/** Clean callback payload — no D3 types exposed */
export type CirclePackingNodeInfo = {
  /** Node id — same as data.id when provided */
  id:            string | null;
  name:          string;
  /** D3 aggregate value — sum of all descendant leaf values */
  value:         number | null;
  /** Percentage of root total — (value / root.value) * 100 */
  percentage:    number;
  depth:         number;
  /** Breadcrumb from root to this node — array of names */
  path:          string[];
  childrenCount: number;
  data:          CirclePackingData;
};

export type CirclePackingZoomInfo = {
  previousName:  string;
  currentName:   string;
  currentDepth:  number;
  /** true when zoomed back to root */
  isRoot:        boolean;
};

export type CirclePackingTranslation = {
  noData: string;
};

export const DEFAULT_CIRCLE_PACKING_TRANSLATION: CirclePackingTranslation = {
  noData: 'No data',
};

export type CirclePackingChartProps = {
  /** Root node of the hierarchy */
  data:              CirclePackingData;
  /** Width and height of the SVG in pixels — always square (default: 600) */
  size?:             number;
  /** Padding between nested circles in px (default: 3) */
  padding?:          number;
  /** Sort children by value or alphabetically (default: 'value') */
  sortBy?:           CirclePackingSortBy;
  /** Show name labels on the outer (focused) ring circles (default: true) */
  showLabels?:       boolean;
  /**
   * Show labels on ALL visible inner circles too — truncated with "…" when the
   * text doesn't fit inside the circle. Outer-ring labels stay bold; inner labels
   * use a smaller font. (default: false)
   */
  showAllLabels?:    boolean;
  /** Outer-ring label font size in px (default: 13, bold) */
  labelFontSize?:    number;
  /** Inner circle label font size in px — used when `showAllLabels` is true (default: 9) */
  innerLabelFontSize?: number;
  /** Label text color — defaults to `theme.palette.text.primary` */
  labelColor?:       string;
  /**
   * Custom depth-based color palette — overrides the default MUI theme palette.
   * colors[depth % length] per node. Falls back to MUI palette when not set.
   */
  chartColors?:      string[];
  /**
   * HCL gradient start color — when set together with `depthColorEnd`,
   * overrides `chartColors` and the MUI palette with a smooth gradient.
   */
  depthColorStart?:  string;
  /**
   * HCL gradient end color — see `depthColorStart`.
   */
  depthColorEnd?:    string;
  /** SVG background fill. Default: `theme.palette.background.default` */
  background?:       string;
  /**
   * Zoom animation duration in ms (default: 750).
   * Alt+Ctrl / Alt+Cmd+Click uses 10× for slow-motion demos.
   */
  duration?:         number;
  /** Enable Ctrl / Cmd ⌘ + Scroll visual zoom — clips content at `size` boundary (default: false) */
  zoomable?:         boolean;
  /** Disables all interactions (default: false) */
  disabled?:         boolean;
  /** Fires on regular click — immediately, no delay */
  onCircleClick?:    (info: CirclePackingNodeInfo, event: React.MouseEvent<SVGCircleElement>) => void;
  /** Fires when the zoom focus changes */
  onZoomChange?:     (zoom: CirclePackingZoomInfo) => void;
  /** Override translation strings */
  translation?:      Partial<CirclePackingTranslation>;
};
