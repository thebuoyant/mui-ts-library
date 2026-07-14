/** Tree orientation — defines the direction the tree grows */
export type HorizontalTreeOrientation = 'LR' | 'RL' | 'TB' | 'BT';

export type HorizontalTreeData = {
  id?:          string;
  name:         string;
  subname?:     string;
  value?:       number;
  specialValueA?: string | number;
  specialValueB?: string | number;
  /** Per-node color overrides */
  colorConfig?: { fill?: string; textColor?: string; stroke?: string } | null;
  children?:    HorizontalTreeData[];
};

/** Clean callback payload — no D3 types exposed */
export type HorizontalTreeNodeInfo = {
  id:            string | null;
  name:          string;
  subname:       string | null;
  value:         number | null;
  specialValueA: string | number | null;
  specialValueB: string | number | null;
  depth:         number;
  /** Breadcrumb from root */
  path:          string[];
  childrenCount: number;
  data:          HorizontalTreeData;
};

export type HorizontalTreeZoomInfo = {
  focusedNode: HorizontalTreeNodeInfo;
  isRoot:      boolean;
};

export type HorizontalTreeTranslation = {
  noData:         string;
  specialValueA?: string;
  specialValueB?: string;
};

export const DEFAULT_HORIZONTAL_TREE_TRANSLATION: HorizontalTreeTranslation = {
  noData:         'No data',
  specialValueA:  'Value A',
  specialValueB:  'Value B',
};

export type HorizontalTreeChartProps = {
  /** Root node of the hierarchy */
  data:                      HorizontalTreeData;
  /**
   * Tree growth direction (default: 'LR')
   * - 'LR' left → right
   * - 'RL' right → left
   * - 'TB' top → bottom
   * - 'BT' bottom → top
   */
  orientation?:              HorizontalTreeOrientation;
  /** Chart width in px (default: 800) */
  width?:                    number;
  /** Chart height in px (default: 500) */
  height?:                   number;
  /** Horizontal distance between depth levels in px (default: 200) */
  levelSpacing?:             number;
  /** Node circle radius in px (default: 10) */
  nodeRadius?:               number;
  /** Sort children alphabetically or by value (default: 'name') */
  sortBy?:                   'name' | 'value';
  /** Show name labels on nodes (default: true) */
  showLabels?:               boolean;
  /** Label font size in px (default: 12) */
  labelFontSize?:            number;
  /** Label color — defaults to theme.palette.text.primary */
  labelColor?:               string;
  /** Show icons inside node circles (default: true) */
  showIcons?:                boolean;
  /** Per-depth color palette — falls back to MUI theme palette */
  chartColors?:              string[];
  /** Link stroke opacity (default: 1) */
  linkStrokeOpacity?:        number;
  /** Link stroke width in px (default: 1.5) */
  linkStrokeWidth?:          number;
  /** Link color — defaults to theme.palette.text.secondary */
  linkColor?:                string;
  /** Enable Ctrl / Cmd ⌘ + Scroll visual zoom (default: false) */
  zoomable?:                 boolean;
  /** Enable Ctrl / Cmd ⌘ + Click drill-down into subtrees (default: false) */
  drillable?:                boolean;
  /** Fires when drill-down focus changes */
  onFocusChange?:            (info: HorizontalTreeZoomInfo) => void;
  /** Show built-in MUI Popover on node click (default: false) */
  showNodePopover?:          boolean;
  /** Custom popover content */
  renderNodePopoverContent?: (info: HorizontalTreeNodeInfo) => React.ReactNode;
  /** Fires on every node click */
  onNodeClick?:              (info: HorizontalTreeNodeInfo, event: React.MouseEvent<SVGGElement>) => void;
  /** Fired on mouse enter/leave a node — `null` on leave. Use for linked-view highlighting. */
  onNodeHover?:              (info: HorizontalTreeNodeInfo | null, event: React.MouseEvent<SVGGElement> | null) => void;
  /** Drill-down/out crossfade duration in ms — set to 0 to disable (default: 750) */
  duration?:                 number;
  /** Disables all interactions (default: false) */
  disabled?:                 boolean;
  /** Override translation strings */
  translation?:              Partial<HorizontalTreeTranslation>;
};
