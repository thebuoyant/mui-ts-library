# SqlEditor — User Manual

> [Deutsche Version →](SqlEditor.de.md)

## Overview

The `SqlEditor` is a full-featured SQL code editor built on [CodeMirror 6](https://codemirror.net/) with the same MUI Paper layout as the `RichTextEditor`. It provides a rich SQL input interface for query builders, admin tools, BI dashboards, and database frontends — fully integrated with the MUI theme, without any external CSS dependencies.

**Typical use cases:**

- Query builders and SQL playgrounds
- Admin tools and database frontends
- BI dashboards with query input
- Form fields for SQL configuration values

![SqlEditor – Component Preview](SqlEditor.png)

---

## Prerequisites

| Dependency | Minimum version |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |
| `@codemirror/view` | 6.x |
| `@codemirror/state` | 6.x |
| `@codemirror/lang-sql` | 6.x |
| `@codemirror/commands` | 6.x |
| `@codemirror/lint` | 6.x |
| `@codemirror/autocomplete` | 6.x |
| `@codemirror/language` | 6.x |
| `@lezer/highlight` | 1.x |
| `sql-formatter` | 15.x |

---

## Import

```tsx
import {
  SqlEditor,
  DEFAULT_SQL_EDITOR_TOOLBAR_CONFIG,
  DEFAULT_SQL_EDITOR_TRANSLATION,
} from '@thebuoyant-tsdev/mui-ts-library';
import type {
  SqlEditorProps,
  SqlEditorDialect,
  SqlEditorToolbarConfig,
  SqlEditorTranslation,
  SqlEditorHighlightColors,
  SqlLintError,
  SqlSchema,
  SqlTable,
  SqlColumn,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Quick Start

```tsx
import { SqlEditor } from '@thebuoyant-tsdev/mui-ts-library';

function App() {
  return (
    <SqlEditor
      placeholder="Enter SQL query…"
      onChange={(sql) => console.log(sql)}
    />
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | SQL content; enables controlled mode |
| `onChange` | `(sql: string) => void` | — | Called on every content change |
| `placeholder` | `string` | — | Placeholder shown when the editor is empty |
| `height` | `number \| string` | `300` | Total height (toolbar + content). Numbers → px. `"auto"` → fills the surrounding flex container. |
| `width` | `number \| string` | `"100%"` | Width of the editor. Numbers → px. |
| `disabled` | `boolean` | `false` | Disables the editor and toolbar completely |
| `readonly` | `boolean` | `false` | Read-only mode — no toolbar shown |
| `error` | `boolean` | `false` | Red border in error state |
| `helperText` | `string` | — | Helper text below the editor (like MUI TextField) |
| `name` | `string` | — | Name for native form submission (hidden `<input type="hidden">`) |
| `dialect` | `SqlEditorDialect` | `"standard"` | SQL dialect for syntax highlighting and formatting |
| `showLineNumbers` | `boolean` | `true` | Show/hide the line number gutter |
| `showLineColumn` | `boolean` | `true` | Show/hide the cursor position (Ln / Col) in the footer |
| `showErrorCount` | `boolean` | `false` | Show/hide the error count in the footer (requires `onLint`) |
| `toolbarConfig` | `SqlEditorToolbarConfig` | all `true` except `showExecute` | Show/hide individual toolbar buttons |
| `translation` | `Partial<SqlEditorTranslation>` | — | Override texts for toolbar tooltips and footer |
| `highlightColors` | `SqlEditorHighlightColors` | — | Override syntax highlight colors for keywords, strings, and identifiers |
| `schema` | `SqlSchema` | — | Table and column definitions for schema-aware autocomplete |
| `onExecute` | `(sql: string) => void` | — | Called when the Execute button is clicked (requires `toolbarConfig.showExecute: true`) |
| `onLint` | `(sql: string) => Promise<SqlLintError[]> \| SqlLintError[]` | — | Async linting callback — errors are shown as wavy underlines in the editor |
| `onBlur` | `() => void` | — | Called when the editor loses focus |
| `onFocus` | `() => void` | — | Called when the editor gains focus |

---

## TypeScript Types

### `SqlEditorDialect`

```ts
type SqlEditorDialect = "standard" | "mysql" | "postgresql" | "sqlite" | "mssql";
```

### `SqlLintError`

```ts
type SqlLintError = {
  line:      number;
  col?:      number;
  message:   string;
  severity?: "error" | "warning" | "info";
};
```

### `SqlEditorToolbarConfig`

```ts
type SqlEditorToolbarConfig = {
  showFormat?:   boolean;  // Format SQL button
  showCopy?:     boolean;  // Copy to clipboard
  showClear?:    boolean;  // Clear editor
  showExecute?:  boolean;  // Execute button (off by default)
  showUndoRedo?: boolean;  // Undo / Redo
};
```

Default configuration:

```tsx
import { DEFAULT_SQL_EDITOR_TOOLBAR_CONFIG } from '@thebuoyant-tsdev/mui-ts-library';
// { showFormat: true, showCopy: true, showClear: true, showExecute: false, showUndoRedo: true }
```

### `SqlEditorTranslation`

```ts
type SqlEditorTranslation = {
  format:      string;   // "Format SQL"
  copy:        string;   // "Copy"
  copySuccess: string;   // "Copied!"
  clear:       string;   // "Clear"
  execute:     string;   // "Execute"
  undo:        string;   // "Undo"
  redo:        string;   // "Redo"
  lineColumn:  string;   // "Ln {line}, Col {col}"
  errorCount:  string;   // "{count} error(s)"
};
```

```tsx
import { DEFAULT_SQL_EDITOR_TRANSLATION } from '@thebuoyant-tsdev/mui-ts-library';
```

### `SqlEditorHighlightColors`

```ts
type SqlEditorHighlightColors = {
  keyword?:    string;   // SQL keywords (SELECT, FROM, WHERE …) — default: theme primary.main, bold
  string?:     string;   // String literals ('value') — default: theme success.main, bold
  identifier?: string;   // Identifiers: table names, column names, aliases — default: theme info.main
};
```

### `SqlSchema`, `SqlTable`, `SqlColumn`

```ts
type SqlColumn = {
  name:  string;
  type?: string;   // shown as detail in the autocomplete tooltip (e.g. "INT", "VARCHAR")
};

type SqlTable = {
  name:     string;
  columns?: SqlColumn[];
};

type SqlSchema = {
  tables: SqlTable[];
};
```

---

## Controlled Mode

```tsx
const [sql, setSql] = useState('SELECT * FROM users;');

<SqlEditor
  value={sql}
  onChange={setSql}
/>
```

The editor synchronizes `value` → CodeMirror document when the external value changes — without moving the cursor.

---

## Syntax Highlighting

Colors come from the active MUI theme by default:

| Token | Default color | Style |
|---|---|---|
| Keywords (`SELECT`, `FROM`, `WHERE` …) | `primary.main` | **bold** |
| String literals (`'value'`) | `success.main` | **bold** |
| Identifiers (table / column names, aliases) | `info.main` | — |
| Numbers (`42`, `3.14`) | `warning.main` | — |
| Functions (`COUNT`, `SUM`, `COALESCE` …) | `secondary.main` | — |
| Comments (`--`, `/* */`) | `text.disabled` | *italic* |
| Operators (`=`, `>`, `AND` …) | `text.secondary` | — |
| Error tokens | `error.main` | wavy underline |

Dark mode is supported automatically — all colors are taken from the active MUI theme.

### Custom Highlight Colors

Override any of the three main token colors via `highlightColors`:

```tsx
import type { SqlEditorHighlightColors } from '@thebuoyant-tsdev/mui-ts-library';

// One Dark theme colors
const colors: SqlEditorHighlightColors = {
  keyword:    '#c678dd',   // purple
  string:     '#98c379',   // green
  identifier: '#e5c07b',   // golden
};

<SqlEditor value={sql} highlightColors={colors} />
```

---

## SQL Dialects

```tsx
<SqlEditor dialect="postgresql" value={sql} />
```

| Dialect | Value | Formatter language |
|---|---|---|
| Standard SQL | `"standard"` | `sql` |
| MySQL | `"mysql"` | `mysql` |
| PostgreSQL | `"postgresql"` | `postgresql` |
| SQLite | `"sqlite"` | `sqlite` |
| MS SQL Server | `"mssql"` | `tsql` |

The dialect affects both the syntax highlighting (dialect-specific keywords) and the Format button (sql-formatter uses the matching language).

---

## Toolbar

The toolbar appears above the editor (hidden in readonly mode). Each button can be individually shown or hidden:

| Button | Default | Description |
|---|---|---|
| Format (`AutoFixHigh`) | visible | Prettifies SQL via `sql-formatter` |
| Copy (`ContentCopy`) | visible | Copies SQL to clipboard; shows "Copied!" for 2 s |
| Clear (`Delete`) | visible | Clears the editor content |
| Undo (`Undo`) | visible | Undoes the last edit |
| Redo (`Redo`) | visible | Redoes the last undone edit |
| Execute (`PlayArrow`) | **hidden** | Calls `onExecute(sql)` |

```tsx
// Show Execute, hide Format
<SqlEditor
  toolbarConfig={{ showExecute: true, showFormat: false }}
  onExecute={(sql) => runQuery(sql)}
/>

// Read-only toolbar — no toolbar at all
<SqlEditor readonly value={sql} />
```

---

## Execute Button

```tsx
<SqlEditor
  value={sql}
  toolbarConfig={{ showExecute: true }}
  onExecute={(sql) => {
    console.log('Running query:', sql);
    runQuery(sql);
  }}
/>
```

The Execute button is hidden by default. It only appears when both `toolbarConfig.showExecute: true` and an `onExecute` handler are provided.

---

## Linting

Lint errors are displayed as wavy underlines in the editor. The `onLint` callback is called with a 600 ms debounce after each change.

```tsx
<SqlEditor
  value={sql}
  showErrorCount
  onLint={async (sql) => {
    const res = await fetch('/api/lint', {
      method: 'POST',
      body: sql,
      headers: { 'Content-Type': 'text/plain' },
    });
    return res.json(); // SqlLintError[]
  }}
/>
```

The `SqlLintError` format:

```ts
{ line: 1, col: 10, message: "Unknown keyword 'FORM'", severity: "error" }
```

- `severity` defaults to `"error"` if omitted
- `col` defaults to the start of the line if omitted
- `showErrorCount` shows `⚠ N error(s)` in the footer

A lint gutter (colored dot at the line number) is also shown for each error.

---

## Schema-aware Autocomplete

Provide table and column definitions so the editor suggests them during typing:

```tsx
import type { SqlSchema } from '@thebuoyant-tsdev/mui-ts-library';

const schema: SqlSchema = {
  tables: [
    {
      name: 'users',
      columns: [
        { name: 'id',         type: 'INT' },
        { name: 'name',       type: 'VARCHAR' },
        { name: 'email',      type: 'VARCHAR' },
        { name: 'active',     type: 'BOOLEAN' },
        { name: 'created_at', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'orders',
      columns: [
        { name: 'id',         type: 'INT' },
        { name: 'user_id',    type: 'INT' },
        { name: 'total',      type: 'DECIMAL' },
        { name: 'status',     type: 'VARCHAR' },
        { name: 'created_at', type: 'TIMESTAMP' },
      ],
    },
  ],
};

<SqlEditor value="SELECT " schema={schema} />
```

The `type` field of each column appears as a detail hint next to the suggestion in the autocomplete dropdown. SQL keywords are always suggested in addition to schema entries.

---

## Footer

```tsx
{/* Cursor position only */}
<SqlEditor showLineColumn />

{/* Error count + cursor position */}
<SqlEditor showLineColumn showErrorCount onLint={myLinter} />

{/* Helper text (like MUI TextField) */}
<SqlEditor error helperText="Invalid SQL syntax." />

{/* Hide the footer entirely */}
<SqlEditor showLineColumn={false} showErrorCount={false} />
```

The footer is only rendered when at least one of `showLineColumn`, `showErrorCount`, or `helperText` is set.

---

## Height and Width

```tsx
{/* Default: 300px tall, 100% wide */}
<SqlEditor />

{/* Fixed height — content scrolls vertically */}
<SqlEditor height={400} />

{/* CSS string */}
<SqlEditor height="50vh" />

{/* "auto" — fills the surrounding flex container */}
<Box sx={{ height: 500, display: "flex", flexDirection: "column" }}>
  <SqlEditor height="auto" />
</Box>

{/* Fixed width */}
<SqlEditor width={800} />
```

**Note on `height="auto"`:** The surrounding container must have `display: flex` and `flex-direction: column`.

---

## Readonly and Disabled

```tsx
{/* Read-only — no toolbar, no cursor blinking */}
<SqlEditor value={sql} readonly />

{/* Disabled — toolbar and editor grayed out */}
<SqlEditor value={sql} disabled />
```

---

## Form Integration

### React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { SqlEditor } from '@thebuoyant-tsdev/mui-ts-library';

function QueryForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<{ query: string }>();

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Controller
        name="query"
        control={control}
        rules={{ required: 'SQL query is required' }}
        render={({ field }) => (
          <SqlEditor
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={!!errors.query}
            helperText={errors.query?.message}
          />
        )}
      />
      <button type="submit">Run</button>
    </form>
  );
}
```

### Native Form Submission

```tsx
<form action="/execute" method="POST">
  <SqlEditor name="query" />
  <button type="submit">Execute</button>
</form>
```

The value is submitted via a hidden `<input type="hidden" name="query">` in the form.

---

## i18n — Translations

Only specify the keys you want to override — all others retain their default value:

```tsx
import { DEFAULT_SQL_EDITOR_TRANSLATION } from '@thebuoyant-tsdev/mui-ts-library';

const DE = {
  format:      "Formatieren",
  copy:        "Kopieren",
  copySuccess: "Kopiert!",
  clear:       "Leeren",
  execute:     "Ausführen",
  undo:        "Rückgängig",
  redo:        "Wiederholen",
  lineColumn:  "Zeile {line}, Sp. {col}",
  errorCount:  "{count} Fehler",
};

<SqlEditor translation={DE} />
```

The placeholders `{line}`, `{col}`, and `{count}` are replaced at runtime.

---

## Storybook Stories

| Story | Description |
|---|---|
| `Default` | Empty editor with placeholder |
| `WithQuery` | Pre-filled with a sample SELECT query |
| `WithFixedHeight` | Long query in a 200px-tall editor (scrollable) |
| `WithAutoHeight` | Editor fills a 400px flex container |
| `Controlled` | Fully controlled with `useState` |
| `MySQLDialect` | MySQL-specific syntax |
| `PostgreSQLDialect` | PostgreSQL-specific syntax |
| `WithExecute` | Execute button visible |
| `WithSchema` | Schema-aware autocomplete with 3 tables |
| `WithLinting` | Server-side linting with simulated errors |
| `WithFormat` | Format button with unformatted SQL |
| `CustomHighlightColors` | One Dark color scheme |
| `NoLineNumbers` | Line numbers and cursor position hidden |
| `ReadOnly` | No toolbar, read-only content |
| `Disabled` | Grayed-out, non-interactive |
| `WithError` | Red border + helper text |
| `GermanTranslation` | Toolbar and footer in German |

---

## Architecture Decisions

| Topic | Decision |
|---|---|
| **CodeMirror 6** | ~150 kB vs. Monaco ~2 MB; full SQL support, MUI-themeable, used by Replit / Observable / CodeSandbox |
| **No Monaco** | 2–3 MB bundle, hard to integrate with MUI theme, overkill for embedded editor |
| **`Compartment`** | `editable` and `readOnly` state are reconfigured dynamically via CodeMirror `Compartment` — avoids full editor recreation on prop change |
| **Editor recreation** | Full recreation only on `isDark`, `dialect`, `hasLint`, `highlightColors`, or `schema` change — `value`, `disabled`, and `readonly` are synced without recreation |
| **`onLint` ref** | Lint callback stored in a ref to avoid stale closures — the linter always calls the latest version |
| **`schemaKey`** | `JSON.stringify(schema)` as a stable primitive dependency for the `useEffect` |
| **`sql-formatter`** | Dialect map: `standard→sql`, `mysql→mysql`, `postgresql→postgresql`, `sqlite→sqlite`, `mssql→tsql`; try/catch leaves the editor unchanged if the SQL is unparseable |
| **`normalizeSize()`** | Converts numeric strings (`"300"`) to numbers so MUI appends `px` — enables Storybook text controls |
| **`height="auto"`** | When `auto`, the editor uses `flex: 1` on both the outer `Box` and the `Paper` to fill the surrounding flex container |
| **Footer outside Paper** | `SqlEditorFooter` sits outside the `Paper` border so `helperText` matches the MUI TextField pattern |
