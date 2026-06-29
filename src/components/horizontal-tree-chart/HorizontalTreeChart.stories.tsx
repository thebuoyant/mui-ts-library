import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, fireEvent, within } from "storybook/test";
import { HorizontalTreeChart } from "./HorizontalTreeChart";
import type { HorizontalTreeData } from "./HorizontalTreeChart.types";

const meta: Meta<typeof HorizontalTreeChart> = {
  title: "Components/HorizontalTreeChart",
  component: HorizontalTreeChart,
  argTypes: {
    // Props A–Z
    chartColors:              { control: false },
    data:                     { control: false },
    disabled:                 { control: "boolean" },
    drillable:                { control: "boolean" },
    duration:                 { control: "number" },
    height:                   { control: "number" },
    labelColor:               { control: "color" },
    labelFontSize:            { control: "number" },
    levelSpacing:             { control: "number" },
    linkColor:                { control: "color" },
    linkStrokeOpacity:        { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    linkStrokeWidth:          { control: "number" },
    nodeRadius:               { control: "number" },
    orientation:              { control: "radio", options: ["LR", "RL", "TB", "BT"] },
    renderNodePopoverContent: { control: false },
    showIcons:                { control: "boolean" },
    showLabels:               { control: "boolean" },
    showNodePopover:          { control: "boolean" },
    sortBy:                   { control: "radio", options: ["name", "value"] },
    translation:              { control: false },
    width:                    { control: "number" },
    zoomable:                 { control: "boolean" },
    // Callbacks A–Z
    onFocusChange:            { control: false },
    onNodeClick:              { control: false },
  },
  args: {
    disabled:          false,
    drillable:         false,
    duration:          750,
    height:            500,
    labelColor:        "",
    labelFontSize:     12,
    levelSpacing:      200,
    linkColor:         "",
    linkStrokeOpacity: 0.4,
    linkStrokeWidth:   1.5,
    nodeRadius:        10,
    orientation:       "LR",
    showIcons:         true,
    showLabels:        true,
    showNodePopover:   false,
    sortBy:            "name",
    width:             800,
    zoomable:          false,
    onFocusChange:     fn(),
    onNodeClick:       fn(),
  },
  parameters: {
    controls: { sort: 'alpha' },
  },
};

export default meta;
type Story = StoryObj<typeof HorizontalTreeChart>;

// ── Demo data: Software Architecture ─────────────────────────────────────────

const ARCH_DATA: HorizontalTreeData = {
  id: "platform", name: "Platform",
  subname: "v2.5 Architecture",
  children: [
    {
      id: "frontend", name: "Frontend",
      subname: "React / TypeScript",
      specialValueA: "React 19", specialValueB: "TypeScript 5",
      children: [
        { id: "web",     name: "Web App",      subname: "Next.js 15",   specialValueA: "SSR",   specialValueB: "18 screens" },
        { id: "mobile",  name: "Mobile",       subname: "React Native", specialValueA: "iOS/Android", specialValueB: "12 screens" },
        { id: "desktop", name: "Desktop",      subname: "Electron",     specialValueA: "Win/Mac/Linux", specialValueB: "8 screens" },
      ],
    },
    {
      id: "backend", name: "Backend",
      subname: "Node.js / Go",
      specialValueA: "Node 22 + Go 1.22", specialValueB: "REST + gRPC",
      children: [
        { id: "api-gw",  name: "API Gateway",  subname: "Kong",         specialValueA: "Rate limiting", specialValueB: "5k req/s" },
        { id: "auth",    name: "Auth Service", subname: "OAuth 2.0",    specialValueA: "JWT + OIDC", specialValueB: "SSO" },
        { id: "core",    name: "Core API",     subname: "Node.js",      specialValueA: "REST",       specialValueB: "220 endpoints",
          children: [
            { id: "users",    name: "Users",    subname: "CRUD",  specialValueA: "PostgreSQL" },
            { id: "billing",  name: "Billing",  subname: "Stripe",specialValueA: "PCI DSS" },
            { id: "notifications", name: "Notifications", subname: "Email/Push", specialValueA: "AWS SES" },
          ],
        },
        { id: "search",  name: "Search",       subname: "Elasticsearch", specialValueA: "Full-text", specialValueB: "< 50ms" },
      ],
    },
    {
      id: "data", name: "Data",
      subname: "Analytics & ML",
      specialValueA: "Python 3.12", specialValueB: "Snowflake",
      children: [
        { id: "pipeline", name: "Pipeline",   subname: "Apache Kafka", specialValueA: "Streaming", specialValueB: "1M events/h" },
        { id: "warehouse",name: "Warehouse",  subname: "Snowflake",    specialValueA: "Batch",     specialValueB: "10TB" },
        { id: "ml",       name: "ML Platform",subname: "PyTorch",      specialValueA: "Training",  specialValueB: "GPU cluster" },
      ],
    },
    {
      id: "infra", name: "Infrastructure",
      subname: "AWS / Kubernetes",
      specialValueA: "EKS + ECS", specialValueB: "Multi-region",
      children: [
        { id: "k8s",       name: "Kubernetes",  subname: "EKS",       specialValueA: "3 clusters" },
        { id: "ci-cd",     name: "CI/CD",       subname: "GitHub Actions", specialValueA: "500 builds/d" },
        { id: "monitoring",name: "Monitoring",  subname: "Datadog",   specialValueA: "Metrics + Traces" },
      ],
    },
  ],
};

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Left → Right** (default) — classic horizontal tree layout. ' +
          '**Click** any node → `onNodeClick`. ' +
          '**Hover** → MUI tooltip with name, subname, and data values. ' +
          'Bold labels for branch nodes, normal for leaves.',
      },
    },
  },
  args: { data: ARCH_DATA },
};

export const RightToLeft: Story = {
  parameters: {
    docs: {
      description: {
        story: '`orientation="RL"` — tree grows right → left. Root on the right, leaves on the left.',
      },
    },
  },
  args: { data: ARCH_DATA, orientation: "RL" },
};

export const TopToBottom: Story = {
  parameters: {
    docs: {
      description: {
        story: '`orientation="TB"` — classic top-down org chart layout. Root at the top.',
      },
    },
  },
  args: { data: ARCH_DATA, orientation: "TB", width: 900, height: 600 },
};

export const BottomToTop: Story = {
  parameters: {
    docs: {
      description: {
        story: '`orientation="BT"` — tree grows bottom → top. Useful for dependency pyramids.',
      },
    },
  },
  args: { data: ARCH_DATA, orientation: "BT", width: 900, height: 600 },
};

export const WithDrillDown: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`drillable={true}` + `zoomable={true}`. ' +
          '`Ctrl / Cmd ⌘+Click` on a branch node → drill into that subtree. ' +
          '`Ctrl / Cmd ⌘+DblClick` → zoom out. `Escape` → reset. ' +
          'Breadcrumb shows current position. ' +
          'This story auto-runs a Ctrl+Click on the "Frontend" node so you land already drilled in.',
      },
    },
  },
  args: { data: ARCH_DATA, drillable: true, zoomable: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    fireEvent.click(canvas.getByText("Frontend"), { ctrlKey: true });
  },
};

export const AnimatedDrillTransitions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Drilling in/out (`Ctrl+Click` / `Ctrl+DblClick` / `Escape`) now crossfades the previous layout ' +
          'out on top of the new one instead of jump-cutting, via `duration` (ms). ' +
          'Unlike `SunburstChart` — which reuses one hierarchy and just animates the view window — drilling here ' +
          're-roots the hierarchy entirely (a different node set per focus level), so a position-tween isn\'t ' +
          'straightforward without enter/update/exit node matching. A crossfade gets rid of the hard cut with much ' +
          'less complexity. This story slows it down to 2000ms so the effect is easy to see; the default is 750ms. ' +
          'Set `duration={0}` to disable it entirely.',
      },
    },
  },
  args: { data: ARCH_DATA, drillable: true, duration: 2000 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    fireEvent.click(canvas.getByText("Frontend"), { ctrlKey: true });
  },
};

export const WithColorConfig: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`colorConfig: { fill }` per node overrides the default depth palette. ' +
          'Frontend = blue, Backend = purple, Data = teal, Infrastructure = orange.',
      },
    },
  },
  args: {
    data: {
      ...ARCH_DATA,
      children: [
        { ...ARCH_DATA.children![0], colorConfig: { fill: "#1565C0" },
          children: ARCH_DATA.children![0].children?.map(c => ({ ...c, colorConfig: { fill: "#42A5F5" } })) },
        { ...ARCH_DATA.children![1], colorConfig: { fill: "#6A1B9A" },
          children: ARCH_DATA.children![1].children?.map(c => ({ ...c, colorConfig: { fill: "#AB47BC" } })) },
        { ...ARCH_DATA.children![2], colorConfig: { fill: "#00695C" },
          children: ARCH_DATA.children![2].children?.map(c => ({ ...c, colorConfig: { fill: "#26A69A" } })) },
        { ...ARCH_DATA.children![3], colorConfig: { fill: "#E65100" },
          children: ARCH_DATA.children![3].children?.map(c => ({ ...c, colorConfig: { fill: "#FFA726" } })) },
      ],
    },
  },
};

export const WithPopover: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showNodePopover={true}` — clicking a node opens a MUI Popover with name, subname, and data values.',
      },
    },
  },
  args: {
    data: ARCH_DATA,
    showNodePopover: true,
    translation: { specialValueA: "Tech Stack", specialValueB: "Details" },
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '`disabled={true}` mutes all interactions and reduces opacity.',
      },
    },
  },
  args: { data: ARCH_DATA, disabled: true },
};

export const EmptyData: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'When `data` has no `children` and no `value`, the chart renders the `translation.noData` ' +
          'message (default `"No data"`) centered in the SVG instead of an empty tree. ' +
          'Override it via `translation={{ noData: "..." }}`.',
      },
    },
  },
  args: {
    data: { id: "root", name: "Root" },
    translation: { noData: "Nothing to show yet" },
  },
};

// ── Use case: support ticket routing decision tree ───────────────────────────

const DECISION_TREE_DATA: HorizontalTreeData = {
  name: "New Support Ticket",
  children: [
    {
      name: "Billing question?", subname: "Keyword match",
      children: [
        { name: "Refund request",      subname: "→ Billing team",      specialValueA: "SLA: 4h" },
        { name: "Plan upgrade",        subname: "→ Sales team",        specialValueA: "SLA: 8h" },
        { name: "Invoice mismatch",    subname: "→ Billing team",      specialValueA: "SLA: 4h" },
      ],
    },
    {
      name: "Technical issue?", subname: "Keyword match",
      children: [
        {
          name: "Severity check", subname: "Auto-triage",
          children: [
            { name: "Outage / data loss", subname: "→ On-call engineer", specialValueA: "SLA: 15min" },
            { name: "Bug, non-blocking",  subname: "→ Engineering queue", specialValueA: "SLA: 2d" },
          ],
        },
        { name: "How-to question",     subname: "→ Knowledge base bot", specialValueA: "SLA: instant" },
      ],
    },
    {
      name: "Account access?", subname: "Keyword match",
      children: [
        { name: "Password reset",      subname: "→ Self-service flow",  specialValueA: "SLA: instant" },
        { name: "2FA locked out",      subname: "→ Identity team",      specialValueA: "SLA: 1h" },
      ],
    },
  ],
};

export const DecisionTree: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Real-world use case: a support-ticket routing tree** for an internal ops dashboard. ' +
          'Each leaf shows the resulting queue and SLA via `specialValueA` — exactly the kind of automation flow ' +
          'this chart is well suited for (decision logic, escalation paths, triage rules).',
      },
    },
  },
  args: {
    data: DECISION_TREE_DATA,
    orientation: "LR",
    width: 900,
    height: 480,
    showNodePopover: true,
    translation: { specialValueA: "Routing" },
  },
};
