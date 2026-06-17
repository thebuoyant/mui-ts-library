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
  RichTextEditor,
  SqlEditor,
  JsonEditor,
  SunburstChart,
  ChordChart,
  RadialTreeChart,
  CirclePackingChart,
  HorizontalTreeChart,
} from "@thebuoyant-tsdev/mui-ts-library";
import type {
  TagSelectionItem,
  GanttTask,
  SunburstChartData,
  ChordChartData,
  RadialTreeChartData,
  CirclePackingData,
  HorizontalTreeData,
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
    components: ["GanttChart", "TagSelection", "PasswordStrengthMeter", "RichTextEditor", "SqlEditor", "JsonEditor"],
    charts: ["SunburstChart", "ChordChart", "RadialTreeChart", "CirclePackingChart", "HorizontalTreeChart"],
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

// ── DemoCard ──────────────────────────────────────────────────────────────────

function DemoCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const id = title.replace(/\s+/g, "-").toLowerCase();
  return (
    <Card id={id} variant="outlined" sx={{ borderRadius: 3, scrollMarginTop: 72 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 0.5 }}>
          {title}
        </Typography>
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

  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [password, setPassword] = useState("");
  const [sql, setSql]         = useState(INITIAL_SQL);
  const [json, setJson]       = useState(INITIAL_JSON);
  const [html, setHtml]       = useState(INITIAL_HTML);

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
          Live Component Demo
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.85, fontWeight: 400, mb: 3 }}>
          11 TypeScript-typed components for React 19 + MUI v9
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1, justifyContent: "center", flexWrap: "wrap" }}>
          {["ChordChart", "CirclePackingChart", "GanttChart", "HorizontalTreeChart", "JsonEditor",
            "PasswordStrengthMeter", "RadialTreeChart", "RichTextEditor", "SqlEditor", "SunburstChart", "TagSelection"]
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
            subtitle="Flow relationships between groups. Hover to highlight connections, click for details."
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ChordChart data={CHORD_DATA} size={380} zoomable />
            </Box>
          </DemoCard>

          {/* CirclePackingChart */}
          <DemoCard
            title="CirclePackingChart"
            subtitle="Nested circles with D3 zoom animation. Click any circle to zoom in, DblClick root to reset."
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CirclePackingChart data={CIRCLE_PACKING_DATA} size={380} showAllLabels zoomable />
            </Box>
          </DemoCard>

          {/* GanttChart */}
          <DemoCard
            title="GanttChart"
            subtitle="Project timeline with drag & drop, resize handles, progress dragging, milestones, and Ctrl+Scroll zoom."
          >
            <GanttChart tasks={TASKS} draggable resizable progressDraggable height={320} />
          </DemoCard>

          {/* HorizontalTreeChart */}
          <DemoCard
            title="HorizontalTreeChart"
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
            subtitle="Org chart as a radial tree. Ctrl+Click to drill into a subtree, Ctrl+DblClick to go back."
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <RadialTreeChart data={RADIAL_TREE_DATA} size={460} drillable zoomable showNodePopover />
            </Box>
          </DemoCard>

          {/* RichTextEditor */}
          <DemoCard
            title="RichTextEditor"
            subtitle="WYSIWYG editor with toolbar, tables, image embed, emoji picker, word count, and fullscreen mode."
          >
            <RichTextEditor value={html} onChange={setHtml} height={260} showWordCount />
          </DemoCard>

          {/* SqlEditor */}
          <DemoCard
            title="SqlEditor"
            subtitle="SQL editor with syntax highlighting, dialect-aware autocomplete, linting, and Cmd+Enter to execute."
          >
            <SqlEditor
              value={sql}
              onChange={setSql}
              onExecute={(q) => alert(`Execute:\n${q.slice(0, 120)}…`)}
              dialect="postgresql"
              height={200}
              showLineNumbers
              showLineColumn
            />
          </DemoCard>

          {/* SunburstChart */}
          <DemoCard
            title="SunburstChart"
            subtitle="Hierarchical data as concentric rings. Ctrl+Click to drill into a segment, Escape to reset."
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <SunburstChart data={SUNBURST_DATA} size={380} zoomable />
            </Box>
          </DemoCard>

          {/* TagSelection */}
          <DemoCard
            title="TagSelection"
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
