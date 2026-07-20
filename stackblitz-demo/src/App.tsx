import { useState, useMemo, useEffect } from "react";
import {
  AppBar, Box, Card, CardContent, Chip, Container,
  CssBaseline, Fab, IconButton, Stack, ThemeProvider,
  Toolbar, Tooltip, Typography, createTheme, Zoom,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import GitHubIcon from "@mui/icons-material/GitHub";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  TagSelection,
  PasswordStrengthMeter,
  GanttChart,
  KanbanBoard,
  RichTextEditor,
  SqlEditor,
  JsonEditor,
  SunburstChart,
  ChordChart,
  RadialTreeChart,
  CirclePackingChart,
  HorizontalTreeChart,
  ColorPicker,
  RadialStackedBarChart,
  DateRangePicker,
} from "@thebuoyant-tsdev/mui-ts-library";
import type {
  TagSelectionItem,
  GanttTask,
  KanbanColumn,
  KanbanTask,
  SunburstChartData,
  ChordChartData,
  RadialTreeChartData,
  CirclePackingData,
  HorizontalTreeData,
  RadialStackedBarData,
  RadialStackedBarSeries,
  DateRangeInput,
} from "@thebuoyant-tsdev/mui-ts-library";

// ── TagSelection ─────────────────────────────────────────────────────────────

const INITIAL_TAGS: TagSelectionItem[] = [
  { id: "react",      label: "React",      color: "primary",   selected: true },
  { id: "typescript", label: "TypeScript", color: "info",      selected: true },
  { id: "mui",        label: "MUI",        color: "secondary"                 },
  { id: "vite",       label: "Vite",       color: "success"                   },
  { id: "nodejs",     label: "Node.js",    color: "warning"                   },
  { id: "graphql",    label: "GraphQL",    color: "error"                     },
];

// ── KanbanBoard ──────────────────────────────────────────────────────────────

const KANBAN_COLUMNS: KanbanColumn[] = [
  { id: "todo",        label: "To Do",       color: "#9e9e9e" },
  { id: "in-progress", label: "In Progress", color: "#2196f3" },
  { id: "review",      label: "In Review",   color: "#ff9800" },
  { id: "done",        label: "Done",        color: "#4caf50" },
];

const INITIAL_KANBAN_TASKS: KanbanTask[] = [
  {
    id: "k1", title: "Design component API", status: "done", assignee: "Alice", priority: "low",
    subtasks: [
      { id: "k1s1", title: "Define TypeScript types", done: true },
      { id: "k1s2", title: "Document all props",      done: true },
      { id: "k1s3", title: "Review with team",        done: true },
    ],
  },
  {
    id: "k2", title: "Implement drag and drop", status: "in-progress", assignee: "Bob",
    dueDate: new Date(Date.now() + 3 * 86400000), priority: "medium",
    subtasks: [
      { id: "k2s1", title: "Core DnD logic",     done: true  },
      { id: "k2s2", title: "Column drop zones",  done: true  },
      { id: "k2s3", title: "In-column sorting",  done: false },
      { id: "k2s4", title: "Keyboard support",   done: false },
    ],
  },
  {
    id: "k3", title: "Write unit tests", status: "in-progress", assignee: "Alice",
    dueDate: new Date(Date.now() - 2 * 86400000) /* overdue */, priority: "high",
    subtasks: [
      { id: "k3s1", title: "Rendering tests",  done: true  },
      { id: "k3s2", title: "CRUD tests",       done: false },
      { id: "k3s3", title: "Filter tests",     done: false },
    ],
  },
  { id: "k4", title: "Add Storybook stories",    status: "review",      assignee: "Bob",   dueDate: new Date(Date.now() + 5 * 86400000)                                                },
  { id: "k5", title: "Write user documentation", status: "todo",        assignee: "Alice", dueDate: new Date(Date.now() - 5 * 86400000) /* overdue */,            priority: "critical" },
  { id: "k6", title: "Publish npm release",      status: "todo",                           dueDate: new Date(Date.now() + 14 * 86400000)                                               },
];

// ── GanttChart ───────────────────────────────────────────────────────────────

const d = (offset: number) => {
  const dt = new Date();
  dt.setDate(dt.getDate() + offset);
  return dt;
};

const TASKS: GanttTask[] = [
  { id: "1", name: "Project Kickoff", startDate: d(-10), endDate: d(-7),  status: "done",        progress: 100 },
  { id: "2", name: "Design Phase",    startDate: d(-6),  endDate: d(-2),  status: "done",        progress: 100 },
  { id: "3", name: "Development",     startDate: d(-1),  endDate: d(10),  status: "in-progress", progress: 40  },
  { id: "4", name: "Testing",         startDate: d(11),  endDate: d(18),  status: "planned",     progress: 0   },
  { id: "5", name: "Release",         startDate: d(20),  endDate: d(20),  status: "planned",     progress: 0, isMilestone: true },
];

// ── Editors ───────────────────────────────────────────────────────────────────

const INITIAL_SQL = `SELECT
  u.id,
  u.name,
  COUNT(o.id)  AS order_count,
  SUM(o.total) AS revenue
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE u.created_at >= '2026-01-01'
GROUP BY u.id, u.name
ORDER BY revenue DESC
LIMIT 20;`;

const INITIAL_JSON = JSON.stringify(
  {
    library: "@thebuoyant-tsdev/mui-ts-library",
    version: "3.x",
    components: ["GanttChart", "KanbanBoard", "DateRangePicker", "TagSelection", "PasswordStrengthMeter", "ColorPicker", "RichTextEditor", "SqlEditor", "JsonEditor"],
    charts: ["SunburstChart", "ChordChart", "RadialTreeChart", "CirclePackingChart", "HorizontalTreeChart", "RadialStackedBarChart"],
    peerDependencies: { react: "^19", "@mui/material": "^9" },
  },
  null,
  2
);

const INITIAL_HTML = `<h2>Welcome to mui-ts-library</h2>
<p>This is the <strong>RichTextEditor</strong> — a full-featured WYSIWYG editor built on <em>TipTap v3</em>.</p>
<ul>
  <li>Bold, italic, underline, strikethrough</li>
  <li>Tables, images, emoji picker</li>
  <li>Word count &amp; fullscreen mode</li>
</ul>
<p>Try editing this content — all changes happen in real time.</p>`;

// ── Charts ────────────────────────────────────────────────────────────────────

const SUNBURST_DATA: SunburstChartData = {
  id: "root", name: "Budget",
  children: [
    { id: "eng", name: "Engineering", children: [
      { id: "fe",  name: "Frontend",  value: 480 },
      { id: "be",  name: "Backend",   value: 620 },
      { id: "ops", name: "DevOps",    value: 210 },
    ]},
    { id: "sales",   name: "Sales",   value: 890 },
    { id: "product", name: "Product", value: 340 },
    { id: "design",  name: "Design",  value: 270 },
    { id: "support", name: "Support", value: 180 },
  ],
};

const CHORD_DATA: ChordChartData[] = [
  { source: "Frontend", target: "Backend",  value: 45 },
  { source: "Backend",  target: "Frontend", value: 20 },
  { source: "Backend",  target: "DevOps",   value: 35 },
  { source: "DevOps",   target: "Frontend", value: 12 },
  { source: "Frontend", target: "Design",   value: 28 },
  { source: "Design",   target: "Product",  value: 40 },
  { source: "Product",  target: "Backend",  value: 18 },
];

const RADIAL_TREE_DATA: RadialTreeChartData = {
  id: "ceo", name: "CEO", subname: "Executive",
  children: [
    { id: "cto", name: "CTO", subname: "Technology", children: [
      { id: "fe-lead", name: "Frontend Lead", subname: "UI/UX" },
      { id: "be-lead", name: "Backend Lead",  subname: "API"   },
      { id: "devops",  name: "DevOps Lead",   subname: "Infra" },
    ]},
    { id: "cpo", name: "CPO", subname: "Product", children: [
      { id: "pm1", name: "Product Manager", subname: "Growth" },
      { id: "des", name: "Design Lead",     subname: "UX"     },
    ]},
    { id: "cmo", name: "CMO", subname: "Marketing", children: [
      { id: "seo", name: "SEO Manager" },
      { id: "ads", name: "Ads Manager" },
    ]},
  ],
};

const CIRCLE_PACKING_DATA: CirclePackingData = {
  name: "Tech Stack",
  children: [
    { name: "Frontend", children: [
      { name: "React",      value: 80 },
      { name: "TypeScript", value: 60 },
      { name: "MUI",        value: 45 },
      { name: "Vite",       value: 30 },
    ]},
    { name: "Backend", children: [
      { name: "Node.js",    value: 70 },
      { name: "GraphQL",    value: 50 },
      { name: "PostgreSQL", value: 55 },
      { name: "Redis",      value: 25 },
    ]},
    { name: "DevOps", children: [
      { name: "Docker",    value: 40 },
      { name: "Kubernetes",value: 35 },
      { name: "GitHub CI", value: 30 },
    ]},
  ],
};

const HORIZONTAL_TREE_DATA: HorizontalTreeData = {
  name: "mui-ts-library",
  children: [
    { name: "Charts", children: [
      { name: "SunburstChart"        },
      { name: "ChordChart"           },
      { name: "RadialTreeChart"      },
      { name: "CirclePackingChart"   },
      { name: "HorizontalTreeChart"  },
    ]},
    { name: "Editors", children: [
      { name: "RichTextEditor" },
      { name: "SqlEditor"      },
      { name: "JsonEditor"     },
    ]},
    { name: "UI", children: [
      { name: "GanttChart"            },
      { name: "TagSelection"          },
      { name: "PasswordStrengthMeter" },
    ]},
  ],
};

// ── RadialStackedBarChart ─────────────────────────────────────────────────────

const RADIAL_KEYS: RadialStackedBarSeries[] = [
  { key: "q1", label: "Q1" },
  { key: "q2", label: "Q2" },
  { key: "q3", label: "Q3" },
  { key: "q4", label: "Q4" },
];

const RADIAL_DATA: RadialStackedBarData[] = [
  { id: "berlin",     label: "Berlin",     values: { q1: 120, q2: 145, q3: 98,  q4: 175 } },
  { id: "munich",     label: "Munich",     values: { q1: 210, q2: 185, q3: 220, q4: 195 } },
  { id: "hamburg",    label: "Hamburg",    values: { q1: 95,  q2: 110, q3: 88,  q4: 130 } },
  { id: "cologne",    label: "Cologne",    values: { q1: 80,  q2: 95,  q3: 105, q4: 90  } },
  { id: "frankfurt",  label: "Frankfurt",  values: { q1: 165, q2: 150, q3: 180, q4: 200 } },
  { id: "stuttgart",  label: "Stuttgart",  values: { q1: 75,  q2: 85,  q3: 70,  q4: 95  } },
  { id: "dusseldorf", label: "Düsseldorf", values: { q1: 60,  q2: 70,  q3: 65,  q4: 80  } },
  { id: "leipzig",    label: "Leipzig",    values: { q1: 45,  q2: 55,  q3: 60,  q4: 65  } },
];

// ── DemoCard ──────────────────────────────────────────────────────────────────

function DemoCard({
  title,
  useCase,
  subtitle,
  children,
}: {
  title: string;
  useCase: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const id = title.replace(/\s+/g, "-").toLowerCase();
  return (
    <Card id={id} variant="outlined" sx={{ borderRadius: 3, scrollMarginTop: 72 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5, flexWrap: "wrap" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
            {title}
          </Typography>
          <Chip
            label={useCase}
            size="small"
            sx={{ fontSize: 11, height: 22, bgcolor: "action.selected", fontWeight: 600 }}
          />
        </Box>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            {subtitle}
          </Typography>
        )}
        {!subtitle && <Box sx={{ mb: 2 }} />}
        {children}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Typography
            variant="caption"
            color="text.disabled"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{ cursor: "pointer", userSelect: "none", "&:hover": { color: "primary.main" } }}
          >
            ↑ back to top
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [mode, setMode]         = useState<"light" | "dark">("light");
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [tags, setTags]         = useState<TagSelectionItem[]>(INITIAL_TAGS);
  const [dateRange, setDateRange] = useState<DateRangeInput>({ start: null, end: null });

  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>(INITIAL_KANBAN_TASKS);
  const [password, setPassword] = useState("");
  const [sql, setSql]         = useState(INITIAL_SQL);
  const [json, setJson]       = useState(INITIAL_JSON);
  const [html, setHtml]       = useState(INITIAL_HTML);
  const [brandColor, setBrandColor] = useState("#1976d2");

  const theme = useMemo(
    () => createTheme({ palette: { mode } }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ── AppBar ── */}
      <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Toolbar sx={{ gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
            mui-ts-library
          </Typography>
          <Tooltip title="GitHub">
            <IconButton
              size="small"
              href="https://github.com/thebuoyant/mui-ts-library"
              target="_blank"
              rel="noopener"
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={mode === "light" ? "Dark mode" : "Light mode"}>
            <IconButton size="small" onClick={() => setMode(m => m === "light" ? "dark" : "light")}>
              {mode === "light" ? <Brightness4Icon fontSize="small" /> : <Brightness7Icon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* ── Hero ── */}
      <Box sx={{ bgcolor: "primary.main", color: "primary.contrastText", py: 6, px: 3, textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
          Production-ready components, not toy widgets
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.85, fontWeight: 400, mb: 1.5, maxWidth: 720, mx: "auto" }}>
          Project planning, Kanban task management, content editing, SQL &amp; JSON tooling, date interval selection, D3 data visualization, and theme tooling —
          15 fully-typed React 19 + MUI v9 components, each built for a real use case below.
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>
          Edit any file on the left — changes hot-reload instantly. No setup, no install.
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1, justifyContent: "center", flexWrap: "wrap" }}>
          {["ChordChart", "CirclePackingChart", "ColorPicker", "DateRangePicker", "GanttChart", "HorizontalTreeChart", "JsonEditor",
            "KanbanBoard", "PasswordStrengthMeter", "RadialStackedBarChart", "RadialTreeChart", "RichTextEditor", "SqlEditor", "SunburstChart", "TagSelection"]
            .map(name => (
              <Chip
                key={name}
                label={name}
                size="small"
                clickable
                onClick={() => {
                  const id = name.toLowerCase();
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                sx={{
                  bgcolor: "transparent",
                  color: "primary.contrastText",
                  fontSize: 11,
                  border: "1px solid rgba(255,255,255,0.6)",
                  "&:hover": { bgcolor: "primary.dark", border: "1px solid rgba(255,255,255,1)" },
                }}
              />
            ))}
        </Box>
      </Box>

      {/* ── Content ── */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Stack spacing={3}>

          {/* ChordChart */}
          <DemoCard
            title="ChordChart"
            useCase="Flow & Relationship Analysis"
            subtitle="Flow relationships between groups. Hover to highlight connections, click for details."
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ChordChart data={CHORD_DATA} size={380} zoomable />
            </Box>
          </DemoCard>

          {/* CirclePackingChart */}
          <DemoCard
            title="CirclePackingChart"
            useCase="Storage & Hierarchy Analysis"
            subtitle="Nested circles with D3 zoom animation. Click any circle to zoom in, DblClick root to reset."
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CirclePackingChart data={CIRCLE_PACKING_DATA} size={380} showAllLabels zoomable />
            </Box>
          </DemoCard>

          {/* ColorPicker */}
          <DemoCard
            title="ColorPicker"
            useCase="Theme & Brand Customization"
            subtitle="Saturation/hue/alpha color picker panel with an eyedropper tool — MUI ships no color picker at all. Drag, type a hex value, or pick a saved swatch."
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ColorPicker
                value={brandColor}
                onChange={(hex) => setBrandColor(hex)}
                savedColors={["#1976d2", "#388e3c", "#d32f2f", "#f57c00", "#7b1fa2"]}
              />
            </Box>
          </DemoCard>

          {/* GanttChart */}
          <DemoCard
            title="GanttChart"
            useCase="Project & Resource Planning"
            subtitle="Project timeline with drag & drop, resize handles, progress dragging, milestones, and Ctrl+Scroll zoom."
          >
            <GanttChart tasks={TASKS} draggable resizable progressDraggable height={320} />
          </DemoCard>

          {/* KanbanBoard */}
          <DemoCard
            title="KanbanBoard"
            useCase="Task & Sprint Management"
            subtitle="Drag cards between columns, add/edit/delete via built-in dialogs. Cards support subtasks with a progress bar. Use the built-in search field to filter by title or assignee."
          >
            <KanbanBoard
              columns={KANBAN_COLUMNS}
              tasks={kanbanTasks}
              showSearchField
              onTasksChange={setKanbanTasks}
              height={460}
            />
          </DemoCard>

          {/* DateRangePicker */}
          <DemoCard
            title="DateRangePicker"
            useCase="Date Interval Selection"
            subtitle="Start and end date in a single inline picker — no MUI X Pro license required. Includes end-before-start validation and ISO string output."
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <DateRangePicker
                value={dateRange}
                onChange={(r) => setDateRange({ start: r.start?.date ?? null, end: r.end?.date ?? null })}
                minDate={new Date("2025-01-01")}
                maxDate={new Date("2027-12-31")}
              />
              {dateRange.start && dateRange.end && (
                <Typography variant="body2" color="text.secondary">
                  Selected: {dateRange.start.toLocaleDateString()} → {dateRange.end.toLocaleDateString()}
                </Typography>
              )}
            </Box>
          </DemoCard>

          {/* HorizontalTreeChart */}
          <DemoCard
            title="HorizontalTreeChart"
            useCase="Decision Trees & Org Charts"
            subtitle="Component hierarchy as a left-to-right tree. Ctrl+Click to drill down, click nodes for a popover."
          >
            <Box sx={{ overflowX: "auto" }}>
              <HorizontalTreeChart
                data={HORIZONTAL_TREE_DATA}
                orientation="LR"
                width={680}
                height={320}
                drillable
                zoomable
                showNodePopover
              />
            </Box>
          </DemoCard>

          {/* JsonEditor */}
          <DemoCard
            title="JsonEditor"
            useCase="API & Config Tooling"
            subtitle="JSON editor with real-time validation, Format / Compact buttons, and optional minimap."
          >
            <JsonEditor
              value={json}
              onChange={setJson}
              height={200}
              showValidation
              showLineNumbers
              showMinimap
            />
          </DemoCard>

          {/* PasswordStrengthMeter */}
          <DemoCard
            title="PasswordStrengthMeter"
            useCase="Auth & Onboarding"
            subtitle="Real-time strength feedback, animated segments, confirm field with match validation, and built-in secure password generator."
          >
            <Box sx={{ maxWidth: 480 }}>
              <PasswordStrengthMeter
                value={password}
                onPasswordChange={(pw) => setPassword(pw)}
                showPasswordGenerator
                showConfirmField
                passwordMinLength={12}
              />
            </Box>
          </DemoCard>

          {/* RadialTreeChart */}
          <DemoCard
            title="RadialTreeChart"
            useCase="Org Charts & Taxonomies"
            subtitle="Org chart as a radial tree. Ctrl+Click to drill into a subtree, Ctrl+DblClick to go back."
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <RadialTreeChart data={RADIAL_TREE_DATA} size={460} drillable zoomable showNodePopover />
            </Box>
          </DemoCard>

          {/* RadialStackedBarChart */}
          <DemoCard
            title="RadialStackedBarChart"
            useCase="Multi-Series Data Visualization"
            subtitle="Quarterly sales by city as radial stacked bars. Each bar is one city; each color layer is a quarter. Hover for details, click a segment to inspect the full city breakdown."
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <RadialStackedBarChart
                data={RADIAL_DATA}
                keys={RADIAL_KEYS}
                size={420}
                sortBy="value"
                onBarClick={(info) =>
                  alert(`${info.label} — ${info.seriesKey}: ${info.value}\nTotal: ${info.total}`)
                }
              />
            </Box>
          </DemoCard>

          {/* RichTextEditor */}
          <DemoCard
            title="RichTextEditor"
            useCase="Content Management"
            subtitle="WYSIWYG editor with toolbar, tables, image embed, emoji picker, word count, and fullscreen mode."
          >
            <RichTextEditor value={html} onChange={setHtml} height={260} showWordCount />
          </DemoCard>

          {/* SqlEditor */}
          <DemoCard
            title="SqlEditor"
            useCase="Database & Analytics Tooling"
            subtitle="SQL editor with syntax highlighting, dialect-aware autocomplete, linting, query history, and Cmd+Enter to execute."
          >
            <SqlEditor
              value={sql}
              onChange={setSql}
              onExecute={(q) => alert(`Execute:\n${q.slice(0, 120)}…`)}
              dialect="postgresql"
              height={200}
              showLineNumbers
              showLineColumn
              toolbarConfig={{ showExecute: true, showHistory: true }}
            />
          </DemoCard>

          {/* SunburstChart */}
          <DemoCard
            title="SunburstChart"
            useCase="Hierarchical Data Visualization"
            subtitle="Hierarchical data as concentric rings. Ctrl+Click to drill into a segment, Escape to reset."
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <SunburstChart data={SUNBURST_DATA} size={380} zoomable />
            </Box>
          </DemoCard>

          {/* TagSelection */}
          <DemoCard
            title="TagSelection"
            useCase="Filtering & Tagging"
            subtitle='Multi-select with autocomplete and free tag creation. Type "Reac" to see search highlighting.'
          >
            <TagSelection
              tags={tags}
              allowCreate
              onTagsChange={(_selected, all) => setTags(all)}
            />
          </DemoCard>

        </Stack>
      </Container>

      {/* ── Back to top ── */}
      <Zoom in={showTopBtn}>
        <Fab
          size="small"
          color="primary"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1200 }}
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>

      {/* ── Footer ── */}
      <Box sx={{ borderTop: 1, borderColor: "divider", py: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          MIT © Thomas Schlender ·{" "}
          <a href="https://github.com/thebuoyant/mui-ts-library" target="_blank" rel="noopener"
            style={{ color: "inherit" }}>GitHub</a>{" "}·{" "}
          <a href="https://www.npmjs.com/package/@thebuoyant-tsdev/mui-ts-library" target="_blank" rel="noopener"
            style={{ color: "inherit" }}>npm</a>{" "}·{" "}
          <a href="https://thebuoyant.github.io/mui-ts-library/" target="_blank" rel="noopener"
            style={{ color: "inherit" }}>Storybook</a>
        </Typography>
      </Box>

    </ThemeProvider>
  );
}
