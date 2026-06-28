export type ChordSortBy = 'ascending' | 'descending' | 'none';

/** A single directed or undirected flow between two named groups */
export type ChordChartData = {
  source: string;
  target: string;
  value:  number;
};

/**
 * Per-group color overrides for ChordChart.
 * Key = group name (same as `source` / `target` in the data).
 * Value = color config — null / omit keys = use chart default palette.
 * Example: `{ Engineering: { fill: '#1565C0' }, Sales: { fill: '#6A1B9A' } }`
 */
export type ChordGroupColorConfigs = Record<string, {
  fill?:      string;
  textColor?: string;
  stroke?:    string;
} | null>;

/** Callback payload for a click on a group arc */
export type ChordGroupInfo = {
  /** Group name */
  name:     string;
  /** Zero-based index in the sorted names array */
  index:    number;
  /** Total outgoing flow from this group */
  valueOut: number;
  /** Total incoming flow into this group */
  valueIn:  number;
};

/** Callback payload for a click on a ribbon (chord) */
export type ChordInfo = {
  source: { name: string; index: number; value: number };
  target: { name: string; index: number; value: number };
};

export type ChordChartTranslation = {
  /** Shown when data is empty */
  noData: string;
};

export const DEFAULT_CHORD_CHART_TRANSLATION: ChordChartTranslation = {
  noData: 'No data',
};

export type ChordChartProps = {
  /** Array of directed or undirected flows — `{ source, target, value }` */
  data:                     ChordChartData[];
  /** Width and height of the SVG in pixels (default: 500) */
  size?:                    number;
  /** Inner radius of the arc ring in px — auto-computed when omitted */
  innerRadius?:             number;
  /** Thickness of the arc ring in px (default: 20) */
  ringThickness?:           number;
  /** Padding angle between arc groups in radians (auto-computed when omitted) */
  padAngle?:                number;
  /** Padding angle inside ribbons in radians (auto-computed when omitted) */
  ribbonPadAngle?:          number;
  /** Sort order for subgroups within each arc (default: 'descending') */
  sortSubgroups?:           ChordSortBy;
  /** Sort order for ribbons (default: 'descending') */
  sortChords?:              ChordSortBy;
  /** Custom color palette — falls back to MUI theme palette when omitted */
  chartColors?:             string[];
  /** Per-group color overrides keyed by group name — overrides `chartColors` for specific groups */
  groupColorConfigs?:       ChordGroupColorConfigs;
  /** Show group name labels outside the arc ring (default: true) */
  showGroupLabels?:         boolean;
  /** Gap between arc outer edge and label text in px (default: 8) */
  labelOffset?:             number;
  /** Opacity of ribbons — 0 to 1 (default: 0.75) */
  ribbonOpacity?:           number;
  /** CSS mix-blend-mode for ribbons (default: 'multiply') */
  ribbonBlendMode?:         React.CSSProperties['mixBlendMode'];
  /** When true, ribbons are directional arrows (default: true) */
  directed?:                boolean;
  /** Decimal places for values in tooltip (default: 0) */
  valueDecimalCount?:       number;
  /** Decimal separator (default: '.') */
  valueDecimalSeparator?:   string;
  /** Thousands separator (default: ',') */
  valueThousandsSeparator?: string;
  /** Fired on click of a group arc */
  onGroupClick?:            (info: ChordGroupInfo, event: React.MouseEvent<SVGGElement>) => void;
  /** Fired on click of a ribbon */
  onChordClick?:            (info: ChordInfo, event: React.MouseEvent<SVGPathElement>) => void;
  /** Enable Ctrl / Cmd ⌘ + Scroll visual zoom — clips content at `size` boundary (default: false) */
  zoomable?:                boolean;
  /** Disables all interactions (default: false) */
  disabled?:                boolean;
  /** Override translation strings */
  translation?:             Partial<ChordChartTranslation>;
};
