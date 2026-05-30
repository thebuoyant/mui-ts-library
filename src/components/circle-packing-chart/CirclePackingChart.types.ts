export type CirclePackingData = {
  name:      string;
  value?:    number;
  children?: CirclePackingData[];
};

export type CirclePackingSortBy = 'value' | 'name';

/** Clean callback payload — no D3 types exposed */
export type CirclePackingNodeInfo = {
  name:          string;
  value:         number | null;
  depth:         number;
  /** Breadcrumb from root to this node */
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
  data:               CirclePackingData;
  /** Width and height of the SVG in pixels — always square (default: 600) */
  size?:              number;
  /** Padding between nested circles in px (default: 3) */
  padding?:           number;
  /** Sort children by value or alphabetically (default: 'value') */
  sortBy?:            CirclePackingSortBy;
  /** Show centered name labels on circles (default: true) */
  showLabels?:        boolean;
  /** Label font size in px (default: 11) */
  labelFontSize?:     number;
  /** Label text color — defaults to `theme.palette.text.primary` */
  labelColor?:        string;
  /**
   * Custom depth-based color palette — falls back to gradient when not set.
   * colors[depth % length] is used per node.
   */
  chartColors?:       string[];
  /**
   * Gradient start color for depth coloring (used when `chartColors` is not set).
   * Default: derived from `theme.palette.primary.light`
   */
  depthColorStart?:   string;
  /**
   * Gradient end color for depth coloring (used when `chartColors` is not set).
   * Default: derived from `theme.palette.secondary.dark`
   */
  depthColorEnd?:     string;
  /** Background fill of the SVG. Default: `theme.palette.background.default` */
  background?:        string;
  /**
   * Zoom animation duration in ms (default: 750).
   * Alt+Double-click uses 10× this value for slow-motion.
   */
  duration?:          number;
  /** Disables all interactions (default: false) */
  disabled?:          boolean;
  /** Fires on single click of any circle */
  onCircleClick?:     (info: CirclePackingNodeInfo, event: React.MouseEvent<SVGCircleElement>) => void;
  /** Fires when the zoom focus changes */
  onZoomChange?:      (zoom: CirclePackingZoomInfo) => void;
  /** Override translation strings */
  translation?:       Partial<CirclePackingTranslation>;
};
