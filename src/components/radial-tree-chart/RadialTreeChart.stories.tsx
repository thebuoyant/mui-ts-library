import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { RadialTreeChart } from "./RadialTreeChart";
import type { RadialTreeChartData } from "./RadialTreeChart.types";

const meta: Meta<typeof RadialTreeChart> = {
  title: "Components/RadialTreeChart",
  component: RadialTreeChart,
  argTypes: {
    // Props A–Z
    autoFit:                 { control: "boolean" },
    branchNodeRadius:        { control: "number" },
    chartColors:             { control: false },
    data:                    { control: false },
    disabled:                { control: "boolean" },
    drillable:               { control: "boolean" },
    labelColor:              { control: "color" },
    labelFontSize:           { control: "number" },
    leafNodeRadius:          { control: "number" },
    linkColor:               { control: "color" },
    linkStrokeOpacity:       { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    linkStrokeWidth:         { control: "number" },
    renderNodePopoverContent:{ control: false },
    rootNodeRadius:          { control: "number" },
    separationCousin:        { control: "number" },
    separationSibling:       { control: "number" },
    showIcons:               { control: "boolean" },
    showLabels:              { control: "boolean" },
    showNodePopover:         { control: "boolean" },
    size:                    { control: "number" },
    sortBy:                  { control: "radio", options: ["name", "value"] },
    translation:             { control: false },
    zoomable:                { control: "boolean" },
    // Callbacks A–Z
    onFocusChange:           { control: false },
    onNodeClick:             { control: false },
  },
  args: {
    size:              600,
    autoFit:           true,
    sortBy:            "name",
    showLabels:        true,
    showIcons:         true,
    rootNodeRadius:    22,
    branchNodeRadius:  16,
    leafNodeRadius:    11,
    linkStrokeOpacity: 1,
    linkStrokeWidth:   1.5,
    labelFontSize:     12,
    separationSibling: 1,
    separationCousin:  2,
    zoomable:          false,
    drillable:         false,
    showNodePopover:   false,
    disabled:          false,
    onNodeClick:       fn(),
  },
};

export default meta;
type Story = StoryObj<typeof RadialTreeChart>;

// ── Demo data: org chart ───────────────────────────────────────────────────

const ORG_DATA: RadialTreeChartData = {
  id: "ceo", name: "CEO", subname: "Thomas Müller",
  specialValueA: "Since 2019", specialValueB: "15 direct reports",
  children: [
    {
      id: "cto", name: "CTO", subname: "Anna Schmidt",
      specialValueA: "Since 2021", specialValueB: "Technology",
      children: [
        { id: "fe",     name: "Frontend Lead",  subname: "Marc Weber",   specialValueA: "Since 2022", specialValueB: "8 engineers" },
        { id: "be",     name: "Backend Lead",   subname: "Julia Fischer",specialValueA: "Since 2021", specialValueB: "6 engineers" },
        { id: "devops", name: "DevOps Lead",    subname: "Tim Bauer",    specialValueA: "Since 2023", specialValueB: "4 engineers" },
        { id: "qa",     name: "QA Lead",        subname: "Sara Klein",   specialValueA: "Since 2022", specialValueB: "3 engineers" },
      ],
    },
    {
      id: "cpo", name: "CPO", subname: "Laura Hoffmann",
      specialValueA: "Since 2020", specialValueB: "Product",
      children: [
        { id: "ux",  name: "UX Lead",         subname: "Nina Schulz",  specialValueA: "Since 2022", specialValueB: "5 designers" },
        { id: "pm1", name: "Product Manager", subname: "Ben Richter",  specialValueA: "Since 2021", specialValueB: "Core product" },
        { id: "pm2", name: "Product Analyst", subname: "Eva Wolf",     specialValueA: "Since 2023", specialValueB: "Insights" },
      ],
    },
    {
      id: "cmo", name: "CMO", subname: "Max Braun",
      specialValueA: "Since 2022", specialValueB: "Marketing",
      children: [
        { id: "content", name: "Content Lead", subname: "Lea Koch",    specialValueA: "Since 2023", specialValueB: "3 writers" },
        { id: "growth",  name: "Growth Lead",  subname: "Jan Meyer",   specialValueA: "Since 2022", specialValueB: "Acquisition" },
        { id: "seo",     name: "SEO Lead",     subname: "Mia Lange",   specialValueA: "Since 2023", specialValueB: "Organic" },
      ],
    },
    {
      id: "cfo", name: "CFO", subname: "Klaus Wagner",
      specialValueA: "Since 2020", specialValueB: "Finance",
      children: [
        { id: "controller", name: "Controller",  subname: "Petra Fuchs", specialValueA: "Since 2021", specialValueB: "Accounting" },
        { id: "fp-and-a",   name: "FP&A Lead",   subname: "Hans Keller", specialValueA: "Since 2022", specialValueB: "Planning" },
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
          'Org chart as a radial tree. **Hover** any node for a rich tooltip — name, person, tenure, department, reports. ' +
          '**Click** any node to fire `onNodeClick`.',
      },
    },
  },
  args: {
    data: ORG_DATA,
    translation: { specialValueA: "In Role Since", specialValueB: "Department" },
  },
};

export const WithNodePopover: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showNodePopover={true}` — clicking a node opens a built-in MUI Popover with name, subname, and special values. ' +
          'The popover content can be fully customized via `renderNodePopoverContent`.',
      },
    },
  },
  args: {
    data:           ORG_DATA,
    showNodePopover: true,
    translation: { specialValueA: "In Role Since", specialValueB: "Department" },
  },
};

export const CustomPalette: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`chartColors` overrides the default MUI theme palette. Colors are assigned per depth level and repeat cyclically.',
      },
    },
  },
  args: {
    data: ORG_DATA,
    chartColors: ["#1565C0", "#6A1B9A", "#00695C"],
  },
};

export const NoLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showLabels={false}` hides all text labels. Node details are still available via the MUI tooltip on hover.',
      },
    },
  },
  args: { data: ORG_DATA, showLabels: false },
};

export const WithColorConfig: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`colorConfig` in the data — each node can define its own `fill` color. ' +
          'Here, each C-level uses a distinct brand color for their subtree. ' +
          'Nodes without `colorConfig` fall back to the depth-based palette.',
      },
    },
  },
  args: {
    data: {
      id: "ceo", name: "CEO", subname: "Thomas Müller",
      specialValueA: "Since 2019", specialValueB: "15 direct reports",
      colorConfig: { fill: "#1A237E" },   // deep navy for root
      children: [
        {
          id: "cto", name: "CTO", subname: "Anna Schmidt",
          specialValueA: "Since 2021", specialValueB: "Technology",
          colorConfig: { fill: "#1565C0" },  // blue for tech
          children: [
            { id: "fe",     name: "Frontend Lead",  subname: "Marc Weber",    specialValueA: "Since 2022", specialValueB: "8 engineers",   colorConfig: { fill: "#1976D2" } },
            { id: "be",     name: "Backend Lead",   subname: "Julia Fischer", specialValueA: "Since 2021", specialValueB: "6 engineers",   colorConfig: { fill: "#0D47A1" } },
            { id: "devops", name: "DevOps Lead",    subname: "Tim Bauer",     specialValueA: "Since 2023", specialValueB: "4 engineers",   colorConfig: { fill: "#42A5F5" } },
            { id: "qa",     name: "QA Lead",        subname: "Sara Klein",    specialValueA: "Since 2022", specialValueB: "3 engineers",   colorConfig: { fill: "#90CAF9" } },
          ],
        },
        {
          id: "cpo", name: "CPO", subname: "Laura Hoffmann",
          specialValueA: "Since 2020", specialValueB: "Product",
          colorConfig: { fill: "#6A1B9A" },  // purple for product
          children: [
            { id: "ux",  name: "UX Lead",         subname: "Nina Schulz",  specialValueA: "Since 2022", specialValueB: "5 designers", colorConfig: { fill: "#7B1FA2" } },
            { id: "pm1", name: "Product Manager", subname: "Ben Richter",  specialValueA: "Since 2021", specialValueB: "Core",        colorConfig: { fill: "#AB47BC" } },
            { id: "pm2", name: "Product Analyst", subname: "Eva Wolf",     specialValueA: "Since 2023", specialValueB: "Insights",    colorConfig: { fill: "#CE93D8" } },
          ],
        },
        {
          id: "cmo", name: "CMO", subname: "Max Braun",
          specialValueA: "Since 2022", specialValueB: "Marketing",
          colorConfig: { fill: "#00695C" },  // teal for marketing
          children: [
            { id: "content", name: "Content Lead", subname: "Lea Koch",  specialValueA: "Since 2023", specialValueB: "3 writers",   colorConfig: { fill: "#00796B" } },
            { id: "growth",  name: "Growth Lead",  subname: "Jan Meyer", specialValueA: "Since 2022", specialValueB: "Acquisition", colorConfig: { fill: "#26A69A" } },
          ],
        },
        {
          id: "cfo", name: "CFO", subname: "Klaus Wagner",
          specialValueA: "Since 2020", specialValueB: "Finance",
          // no colorConfig → uses default palette
          children: [
            { id: "controller", name: "Controller",  subname: "Petra Fuchs", specialValueA: "Since 2021", specialValueB: "Accounting" },
            { id: "fp-and-a",   name: "FP&A Lead",   subname: "Hans Keller", specialValueA: "Since 2022", specialValueB: "Planning" },
          ],
        },
      ],
    },
    translation: { specialValueA: "In Role Since", specialValueB: "Department" },
    showNodePopover: true,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '`disabled={true}` mutes all interactions and reduces opacity to 0.5.',
      },
    },
  },
  args: { data: ORG_DATA, disabled: true },
};

// ── Deep tree dataset (5 levels, ~65 nodes) ───────────────────────────────
// Technology skill taxonomy: Company → Domain → Category → Skill → Subskill

const DEEP_TREE_DATA: RadialTreeChartData = {
  id: "root", name: "Tech Skills", subname: "Full taxonomy",
  children: [
    {
      id: "fe", name: "Frontend", subname: "UI Engineering",
      children: [
        {
          id: "fe-fw", name: "Frameworks", subname: "UI libraries",
          children: [
            { id: "fe-fw-react", name: "React", subname: "v19",
              children: [
                { id: "fe-fw-react-hooks", name: "Hooks",      subname: "useState/useEffect" },
                { id: "fe-fw-react-ctx",   name: "Context",    subname: "State management" },
                { id: "fe-fw-react-perf",  name: "Performance",subname: "memo/useMemo" },
              ],
            },
            { id: "fe-fw-vue",     name: "Vue",     subname: "v3 Composition" },
            { id: "fe-fw-angular", name: "Angular",  subname: "v18 Signals" },
          ],
        },
        {
          id: "fe-style", name: "Styling", subname: "CSS & design",
          children: [
            { id: "fe-style-ts",  name: "TypeScript", subname: "5.x strict" },
            { id: "fe-style-css", name: "CSS-in-JS",  subname: "MUI / styled" },
            { id: "fe-style-tw",  name: "Tailwind",   subname: "v4" },
          ],
        },
        {
          id: "fe-test", name: "Testing", subname: "Quality",
          children: [
            { id: "fe-test-vit",  name: "Vitest",   subname: "Unit tests" },
            { id: "fe-test-play", name: "Playwright",subname: "E2E tests" },
          ],
        },
      ],
    },
    {
      id: "be", name: "Backend", subname: "Server Engineering",
      children: [
        {
          id: "be-lang", name: "Languages", subname: "Server-side",
          children: [
            { id: "be-lang-node",   name: "Node.js",  subname: "v22 LTS" },
            { id: "be-lang-go",     name: "Go",       subname: "1.22" },
            { id: "be-lang-python", name: "Python",   subname: "3.12" },
            { id: "be-lang-rust",   name: "Rust",     subname: "2024 edition" },
          ],
        },
        {
          id: "be-db", name: "Databases", subname: "Storage",
          children: [
            { id: "be-db-pg",    name: "PostgreSQL", subname: "v16" },
            { id: "be-db-mongo", name: "MongoDB",    subname: "v7" },
            { id: "be-db-redis", name: "Redis",      subname: "Cache / PubSub" },
          ],
        },
        {
          id: "be-api", name: "APIs", subname: "Integration",
          children: [
            { id: "be-api-rest",  name: "REST",     subname: "OpenAPI 3.1" },
            { id: "be-api-gql",   name: "GraphQL",  subname: "Apollo v4" },
            { id: "be-api-grpc",  name: "gRPC",     subname: "Protobuf" },
          ],
        },
      ],
    },
    {
      id: "devops", name: "DevOps", subname: "Infrastructure",
      children: [
        {
          id: "devops-ci", name: "CI/CD", subname: "Automation",
          children: [
            { id: "devops-ci-gh",    name: "GitHub Actions", subname: "Workflows" },
            { id: "devops-ci-argocd",name: "ArgoCD",         subname: "GitOps" },
          ],
        },
        {
          id: "devops-cloud", name: "Cloud", subname: "Platforms",
          children: [
            { id: "devops-cloud-aws", name: "AWS",   subname: "ECS / Lambda" },
            { id: "devops-cloud-gcp", name: "GCP",   subname: "GKE / Cloud Run" },
            { id: "devops-cloud-az",  name: "Azure", subname: "AKS / Functions" },
          ],
        },
        {
          id: "devops-obs", name: "Observability", subname: "Monitoring",
          children: [
            { id: "devops-obs-prom",  name: "Prometheus", subname: "Metrics" },
            { id: "devops-obs-graf",  name: "Grafana",    subname: "Dashboards" },
            { id: "devops-obs-otel",  name: "OpenTelemetry",subname: "Traces" },
          ],
        },
      ],
    },
    {
      id: "data", name: "Data", subname: "Analytics & ML",
      children: [
        {
          id: "data-eng", name: "Engineering", subname: "Pipelines",
          children: [
            { id: "data-eng-spark", name: "Spark",  subname: "Batch processing" },
            { id: "data-eng-kafka", name: "Kafka",  subname: "Streaming" },
            { id: "data-eng-dbt",   name: "dbt",    subname: "Transformations" },
          ],
        },
        {
          id: "data-ml", name: "Machine Learning", subname: "AI/ML",
          children: [
            { id: "data-ml-pt",   name: "PyTorch",    subname: "Deep learning" },
            { id: "data-ml-hf",   name: "HuggingFace",subname: "LLM / NLP" },
            { id: "data-ml-sk",   name: "scikit-learn",subname: "Classical ML" },
          ],
        },
      ],
    },
  ],
};

export const DeepTree: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Stress test: 5 depth levels, ~65 nodes — both `drillable` and `zoomable` enabled.** ' +
          '`Ctrl+Click` on any branch node → drill down into that subtree. ' +
          '`Ctrl+Double-click` → zoom out one level. ' +
          '`Ctrl+Scroll` → visual zoom (content clipped at SVG boundary). ' +
          '`Escape` resets everything. Breadcrumb shown at top when drilled in.',
      },
    },
  },
  args: {
    data:             DEEP_TREE_DATA,
    size:             750,
    autoFit:          true,
    zoomable:         true,
    drillable:        true,
    showLabels:       true,
    labelFontSize:    10,
    branchNodeRadius: 13,
    leafNodeRadius:   8,
    separationCousin: 2.5,
    translation: { specialValueA: "Version", specialValueB: "Focus area" },
  },
};
