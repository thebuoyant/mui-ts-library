import { type ComponentProps, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, userEvent, within } from "storybook/test";
import { Box } from "@mui/material";
import { SqlEditor } from "./SqlEditor";

const meta: Meta<typeof SqlEditor> = {
  title: "Components/SqlEditor",
  component: SqlEditor,
  argTypes: {
    // A–Z: kontrollierbare Props
    dialect:         { control: "radio", options: ["standard", "mysql", "postgresql", "sqlite", "mssql"] },
    disabled:        { control: "boolean" },
    error:           { control: "boolean" },
    height:          { control: "text" },
    helperText:      { control: "text" },
    name:            { control: "text" },
    placeholder:     { control: "text" },
    readonly:        { control: "boolean" },
    showErrorCount:  { control: "boolean" },
    showLineColumn:  { control: "boolean" },
    showLineNumbers: { control: "boolean" },
    width:           { control: "text" },
    // Komplexe Objekte / Callbacks — dedizierte Stories verwenden
    highlightColors: { control: false },
    schema:          { control: false },
    toolbarConfig:   { control: false },
    translation:     { control: false },
    value:           { control: false },
    onBlur:          { control: false },
    onChange:        { control: false },
    onExecute:       { control: false },
    onFocus:         { control: false },
    onLint:          { control: false },
  },
  args: {
    // A–Z
    dialect:         "standard",
    disabled:        false,
    error:           false,
    height:          "",
    helperText:      "",
    name:            "",
    placeholder:     "Enter SQL query …",
    readonly:        false,
    showErrorCount:  false,
    showLineColumn:  true,
    showLineNumbers: true,
    width:           "",
    // Callbacks
    onBlur:          fn(),
    onChange:        fn(),
    onFocus:         fn(),
  },
  parameters: {
    controls: { sort: 'alpha' },
  },
};

export default meta;
type Story = StoryObj<typeof SqlEditor>;

const SAMPLE_SQL = `SELECT
  u.id,
  u.name,
  u.email,
  COUNT(o.id) AS order_count,
  SUM(o.total) AS total_spent
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.active = 1
  AND u.created_at >= '2024-01-01'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 50;`;

const LONG_SQL = `-- Report: Monthly Revenue by Category
SELECT
  c.name AS category,
  DATE_FORMAT(o.created_at, '%Y-%m') AS month,
  COUNT(DISTINCT o.id) AS order_count,
  COUNT(DISTINCT o.user_id) AS unique_customers,
  SUM(oi.quantity) AS units_sold,
  SUM(oi.quantity * oi.unit_price) AS gross_revenue,
  SUM(oi.quantity * oi.unit_price * (1 - COALESCE(d.discount_pct, 0))) AS net_revenue
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id
JOIN categories c ON c.id = p.category_id
LEFT JOIN discounts d ON d.order_id = o.id
WHERE o.status = 'completed'
  AND o.created_at BETWEEN '2024-01-01' AND '2024-12-31'
GROUP BY c.name, month
ORDER BY month DESC, net_revenue DESC;`;

export const Default: Story = {
  args: {
    placeholder: "Enter SQL query …",
  },
};

export const WithQuery: Story = {
  args: {
    value: SAMPLE_SQL,
  },
};

export const WithFixedHeight: Story = {
  args: {
    value:  LONG_SQL,
    height: "200",
  },
};

export const WithAutoHeight: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ height: 400, display: "flex", flexDirection: "column", border: "2px dashed", borderColor: "divider", p: 1 }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    value:  SAMPLE_SQL,
    height: "auto",
  },
};

function ControlledStory(args: ComponentProps<typeof SqlEditor>) {
  const [sql, setSql] = useState(SAMPLE_SQL);
  return (
    <SqlEditor
      {...args}
      value={sql}
      onChange={(val) => {
        setSql(val);
        args.onChange?.(val);
      }}
    />
  );
}

export const Controlled: Story = {
  render: (args) => <ControlledStory {...args} />,
};

export const MySQLDialect: Story = {
  args: {
    dialect: "mysql",
    value:   "SELECT * FROM users WHERE created_at >= NOW() - INTERVAL 7 DAY;",
  },
};

export const PostgreSQLDialect: Story = {
  args: {
    dialect: "postgresql",
    value:   "SELECT id, name, created_at::date FROM users WHERE active IS TRUE LIMIT 10;",
  },
};

export const WithExecute: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The `onExecute` prop enables two ways to run the query: the **Execute toolbar button** ' +
          '(`toolbarConfig.showExecute: true`) and the **`Cmd+Enter` / `Ctrl+Enter` keyboard shortcut**. ' +
          'The keyboard shortcut works whenever `onExecute` is provided — regardless of whether the button is visible. ' +
          'Try pressing **`Cmd+Enter`** (macOS) or **`Ctrl+Enter`** (Windows/Linux) while the editor is focused.',
      },
    },
  },
  args: {
    value:        SAMPLE_SQL,
    toolbarConfig: { showExecute: true },
    onExecute:    fn(),
  },
};

export const WithQueryHistory: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The **Query history** button (`toolbarConfig.showHistory: true`) appears next to Execute and ' +
          'requires `onExecute` to be set. Every executed query is saved to `localStorage` (capped at ' +
          '`queryHistoryMaxEntries`, default 20) and can be reloaded into the editor with one click. ' +
          'Use `queryHistoryKey` to namespace the storage when multiple editors run on the same page. ' +
          'This story auto-runs Execute once so you can open the history menu and see an entry.',
      },
    },
  },
  args: {
    value:          SAMPLE_SQL,
    toolbarConfig:  { showExecute: true, showHistory: true },
    queryHistoryKey: "storybook-sql-history-demo",
    onExecute:      fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Execute" }));
    await userEvent.click(canvas.getByRole("button", { name: "Query history" }));
  },
};

export const NoLineNumbers: Story = {
  args: {
    value:           SAMPLE_SQL,
    showLineNumbers: false,
    showLineColumn:  false,
  },
};

export const ReadOnly: Story = {
  args: {
    value:    SAMPLE_SQL,
    readonly: true,
  },
};

export const Disabled: Story = {
  args: {
    value:    SAMPLE_SQL,
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    error:      true,
    helperText: "Invalid SQL syntax.",
    value:      "SELECT * FORM users",
  },
};

export const WithLinting: Story = {
  args: {
    value: "SELECT * FORM users WHER id = 1",
    showErrorCount: true,
    onLint: async (sql) => {
      await new Promise((r) => setTimeout(r, 300));
      const errors = [];
      if (sql.includes("FORM"))  errors.push({ line: 1, col: 10, message: "Unknown keyword 'FORM' — did you mean 'FROM'?", severity: "error" as const });
      if (sql.includes("WHER"))  errors.push({ line: 1, col: 22, message: "Unknown keyword 'WHER' — did you mean 'WHERE'?", severity: "error" as const });
      return errors;
    },
  },
};

export const WithSchema: Story = {
  args: {
    value: "SELECT ",
    schema: {
      tables: [
        {
          name: "users",
          columns: [
            { name: "id",         type: "INT" },
            { name: "name",       type: "VARCHAR" },
            { name: "email",      type: "VARCHAR" },
            { name: "active",     type: "BOOLEAN" },
            { name: "created_at", type: "TIMESTAMP" },
          ],
        },
        {
          name: "orders",
          columns: [
            { name: "id",         type: "INT" },
            { name: "user_id",    type: "INT" },
            { name: "total",      type: "DECIMAL" },
            { name: "status",     type: "VARCHAR" },
            { name: "created_at", type: "TIMESTAMP" },
          ],
        },
        {
          name: "products",
          columns: [
            { name: "id",          type: "INT" },
            { name: "name",        type: "VARCHAR" },
            { name: "price",       type: "DECIMAL" },
            { name: "category_id", type: "INT" },
            { name: "stock",       type: "INT" },
          ],
        },
      ],
    },
  },
};

export const CustomHighlightColors: Story = {
  args: {
    value: SAMPLE_SQL,
    highlightColors: {
      keyword:    "#c678dd",   // purple — like One Dark
      string:     "#98c379",   // green
      identifier: "#e5c07b",   // golden — table/column names
    },
  },
};

export const WithFormat: Story = {
  args: {
    value: "select u.id,u.name,u.email from users u where u.active=1 and u.created_at>='2024-01-01' order by u.name asc limit 50",
    toolbarConfig: { showFormat: true },
  },
};

export const GermanTranslation: Story = {
  args: {
    value: SAMPLE_SQL,
    toolbarConfig: { showExecute: true, showHistory: true },
    onExecute: fn(),
    translation: {
      copy:         "Kopieren",
      copySuccess:  "Kopiert!",
      clear:        "Leeren",
      execute:      "Ausführen",
      undo:         "Rückgängig",
      redo:         "Wiederholen",
      lineColumn:   "Zeile {line}, Sp. {col}",
      history:      "Verlauf",
      historyEmpty: "Noch keine Abfragen",
      clearHistory: "Verlauf leeren",
    },
  },
};

// ── Use case: analytics dashboard query builder ──────────────────────────────

const ANALYTICS_SQL = `-- Weekly active users by acquisition channel
SELECT
  DATE_TRUNC('week', s.started_at) AS week,
  u.acquisition_channel,
  COUNT(DISTINCT s.user_id) AS weekly_active_users,
  ROUND(AVG(s.duration_seconds) / 60, 1) AS avg_session_minutes
FROM sessions s
JOIN users u ON u.id = s.user_id
WHERE s.started_at >= NOW() - INTERVAL '12 weeks'
GROUP BY week, u.acquisition_channel
ORDER BY week DESC, weekly_active_users DESC;`;

export const AnalyticsDashboardQuery: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Real-world use case: an internal BI / analytics dashboard query builder.** ' +
          'Schema-aware autocomplete (`schema` prop) helps analysts write correct joins without memorizing ' +
          'every column name, and `showErrorCount` + `onLint` catch typos before the query is sent to the warehouse.',
      },
    },
  },
  args: {
    value: ANALYTICS_SQL,
    dialect: "postgresql",
    toolbarConfig: { showExecute: true },
    onExecute: fn(),
    showErrorCount: true,
    schema: {
      tables: [
        { name: "users", columns: [
          { name: "id", type: "INT" },
          { name: "acquisition_channel", type: "VARCHAR" },
          { name: "created_at", type: "TIMESTAMP" },
        ]},
        { name: "sessions", columns: [
          { name: "id", type: "INT" },
          { name: "user_id", type: "INT" },
          { name: "started_at", type: "TIMESTAMP" },
          { name: "duration_seconds", type: "INT" },
        ]},
      ],
    },
  },
};
