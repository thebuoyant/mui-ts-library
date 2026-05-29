export type RadialTreeSortBy = 'name' | 'value';

export type RadialTreeChartData = {
  id:            string;
  name:          string;
  /** Subtitle shown below the name in the built-in node popover */
  subname?:      string;
  value?:        number;
  /** Custom field A — shown in the built-in node popover */
  specialValueA?: string | number;
  /** Custom field B — shown in the built-in node popover */
  specialValueB?: string | number;
  children?:     RadialTreeChartData[];
};


/** Clean payload passed to `onNodeClick` — no D3 or Fluent UI types exposed */
export type RadialTreeNodeInfo = {
  id:            string;
  name:          string;
  subname:       string | null;
  value:         number | null;
  specialValueA: string | number | null;
  specialValueB: string | number | null;
  depth:         number;
  /** Breadcrumb from root to this node */
  path:          string[];
  childrenCount: number;
  data:          RadialTreeChartData;
};

export type RadialTreeChartTranslation = {
  /** Shown when data is empty */
  noData:         string;
  /** Label for specialValueA in the built-in node popover */
  specialValueA?: string;
  /** Label for specialValueB in the built-in node popover */
  specialValueB?: string;
};

export const DEFAULT_RADIAL_TREE_CHART_TRANSLATION: RadialTreeChartTranslation = {
  noData:         'No data',
  specialValueA:  'Value A',
  specialValueB:  'Value B',
};

export type RadialTreeChartProps = {
  /** Root node of the hierarchy */
  data:                      RadialTreeChartData;
  /** Width and height of the SVG in pixels (default: 600) */
  size?:                     number;
  /** Auto-fit viewBox to the rendered content (default: true) */
  autoFit?:                  boolean;
  /** Sort child nodes alphabetically ('name') or by value ('value') — default: 'name' */
  sortBy?:                   RadialTreeSortBy;
  /** Show node name labels (default: true) */
  showLabels?:               boolean;
  /** Per-depth node colors — falls back to MUI theme palette when omitted */
  chartColors?:              string[];
  /** Link line opacity (default: 0.4) */
  linkStrokeOpacity?:        number;
  /** Link line width in px (default: 1.5) */
  linkStrokeWidth?:          number;
  /** Node circle radius in px (default: 4) */
  nodeRadius?:               number;
  /** Separation factor between sibling nodes (default: 1) */
  separationSibling?:        number;
  /** Separation factor between cousin nodes (default: 2) */
  separationCousin?:         number;
  /** Show white icons (folder/person) inside the node circles (default: true) */
  showIcons?:                boolean;
  /** Show a built-in MUI Popover with node details on click (default: false) */
  showNodePopover?:          boolean;
  /** Render custom content inside the built-in node popover */
  renderNodePopoverContent?: (info: RadialTreeNodeInfo) => React.ReactNode;
  /** Fired on every node click */
  onNodeClick?:              (info: RadialTreeNodeInfo, event: React.MouseEvent<SVGGElement>) => void;
  /** Disables all interactions (default: false) */
  disabled?:                 boolean;
  /** Override translation strings */
  translation?:              Partial<RadialTreeChartTranslation>;
};
