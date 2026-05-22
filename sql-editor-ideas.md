# SqlEditor — Ideen & Implementierungsplan

## Idee

Ein SQL-Editor der visuell identisch zum `RichTextEditor` aufgebaut ist — gleiche Paper-Hülle, gleiche Props-API, gleiche MUI-Theme-Integration — aber statt WYSIWYG-Text einen vollwertigen Code-Editor mit SQL-Syntax-Highlighting, Echtzeit-Fehlermarkierung und SQL-spezifischer Toolbar liefert.

**Zielgruppe:** Entwickler, die SQL-Eingabefelder in React-Apps brauchen — für Query-Builder, Admin-Tools, BI-Dashboards, Datenbank-Frontends.

---

## Technologie-Entscheidung: CodeMirror 6 ✅

### Warum nicht Monaco (VS Code Editor)?
Monaco ist exzellent, aber 2–3 MB Bundle, schwer ins MUI-Theme zu integrieren, und für einen eingebetteten Editor overkill.

### Warum nicht TipTap CodeBlock?
TipTap hat CodeBlock-Support, aber kein echtes SQL-Linting und keine Cursor-Position-Anzeige — es bleibt ein Rich-Text-Editor mit Code-Styling.

### CodeMirror 6 — die richtige Wahl
| Kriterium | CodeMirror 6 |
|---|---|
| Bundle-Größe | ~150 kB (vs. Monaco ~2 MB) |
| SQL-Support | `@codemirror/lang-sql` — Keywords, Funktionen, Dialekte |
| Linting | `@codemirror/lint` — Echtzeit-Fehlermarkierung |
| Theming | vollständig per CSS-in-JS steuerbar → MUI-Theme |
| Autocomplete | `@codemirror/autocomplete` — SQL-Keywords + Schema-aware |
| Produktionsreife | genutzt von Observable, Replit, CodeSandbox, etc. |

---

## Layout — identisch zum RichTextEditor

```
┌─────────────────────────────────────────────────────┐  ← Paper (outlined)
│  [Copy] [Clear]  │  [Undo] [Redo]                   │  ← SqlEditorToolbar ✅
├─────────────────────────────────────────────────────┤  ← Divider
│ 1  SELECT u.name,                                   │
│ 2    COUNT(o.id) AS order_count                     │  ← CodeMirror Editor ✅
│ 3  FROM users u                                     │     (scrollable)
│ 4  JOIN orders o ON o.user_id = u.id                │
│ 5  WHERE u.active = 1                               │
│ 6  GROUP BY u.name                                  │
│ 7  ▋                                                │
├─────────────────────────────────────────────────────┤
│                                              Ln 7, Col 1 │  ← SqlEditorFooter ✅
└─────────────────────────────────────────────────────┘
```

---

## Props-API (analog RichTextEditor) ✅

```ts
type SqlEditorProps = {
  value?:     string;
  onChange?:  (sql: string) => void;
  placeholder?: string;
  height?: number | string;
  width?:  number | string;
  disabled?:   boolean;
  readonly?:   boolean;
  error?:      boolean;
  helperText?: string;
  name?:       string;
  dialect?:    "standard" | "mysql" | "postgresql" | "sqlite" | "mssql";
  showLineNumbers?: boolean;
  showLineColumn?:  boolean;
  toolbarConfig?:   SqlEditorToolbarConfig;
  translation?:     Partial<SqlEditorTranslation>;
  onExecute?: (sql: string) => void;
  onBlur?:    () => void;
  onFocus?:   () => void;
};
```

Noch geplant für Phase 4:
```ts
schema?: SqlSchema;   // → Schema-aware Autocomplete
```

---

## Syntax-Highlighting ✅

CodeMirror 6 highlightet mit MUI-Theme-Farben:

| Token | Farbe |
|---|---|
| Keywords (`SELECT`, `FROM`, `WHERE`, …) | `primary.main` (bold) |
| Funktionen (`COUNT`, `SUM`, `COALESCE`, …) | `secondary.main` |
| Strings (`'wert'`) | `success.dark` |
| Zahlen (`42`, `3.14`) | `warning.dark` |
| Kommentare (`--`, `/* */`) | `text.disabled` (italic) |
| Operatoren (`=`, `>`, `AND`, …) | `text.secondary` |
| Fehler-Token | `error.main` + wavy underline |

Dark Mode funktioniert automatisch — Farben kommen aus dem aktiven MUI-Theme.

---

## Fehler-Erkennung

### Echtzeit-Linting (Phase 2 — noch offen)

```
Zeile 4: Syntaxfehler — erwartet "ON", gefunden "WHERE"
         ↑
         Rote Wellenlinie direkt im Editor
```

**Ansätze:**

1. **CodeMirror built-in SQL-Linter** — erkennt grundlegende Syntaxfehler direkt im Client, kein Server nötig
2. **Server-seitiges Linting via `onLint`-Callback** — Nutzer schickt SQL an Backend, bekommt Fehler zurück, Editor zeigt sie an
3. **Kombiniert** — Client-Linter für Sofortfeedback, Server-Linter für semantische Fehler (unbekannte Tabellen etc.)

```ts
// Geplante API für Phase 2:
<SqlEditor
  onLint={async (sql) => {
    const res = await fetch('/api/lint', { body: sql });
    return res.json(); // [{ line: 4, message: "Unknown table 'orders'" }]
  }}
/>
```

---

## Toolbar-Buttons

| Button | Status | Aktion |
|---|---|---|
| **Copy** | ✅ Phase 1 | Inhalt in Zwischenablage + "Copied!"-Feedback |
| **Clear** | ✅ Phase 1 | Editor leeren |
| **Undo / Redo** | ✅ Phase 1 | CodeMirror History |
| **Execute** | ✅ Phase 1 | `onExecute(sql)` — nur wenn Prop gesetzt |
| **Format** | ✅ Phase 3 | SQL prettifizieren via `sql-formatter` |

---

## Implementierungsphasen

### Phase 1 — Foundation ✅ FERTIG
- [x] Komponentenstruktur: `SqlEditor.tsx`, `SqlEditor.types.ts`, `SqlEditorToolbar.tsx`, `SqlEditorContent.tsx`, `SqlEditorFooter.tsx`
- [x] CodeMirror 6 integrieren mit `@codemirror/lang-sql`
- [x] MUI Paper-Layout (identisch RichTextEditor)
- [x] Props: `value`, `onChange`, `height`, `width`, `disabled`, `readonly`, `error`, `helperText`, `name`
- [x] SQL-Syntax-Highlighting mit MUI-Theme-Farben (Dark Mode inklusive)
- [x] Zeilennummern + aktive Zeile
- [x] Cursor-Position (Zeile/Spalte) im Footer
- [x] Toolbar: Copy (mit Copied!-Feedback), Clear, Undo, Redo, Execute
- [x] `dialect`-Prop: standard, mysql, postgresql, sqlite, mssql
- [x] `toolbarConfig` + `translation` Props
- [x] Storybook-Stories (12 Stories)
- [x] Export aus `src/index.ts`
- [x] Build grün, alle 271 Tests bestanden

### Phase 2 — SQL Intelligence ✅ FERTIG
- [x] Echtzeit-Linting via `@codemirror/lint` + `lintGutter()`
- [x] Fehleranzeige im Footer mit ⚠-Icon (Anzahl + Fehlermeldung)
- [x] `onLint`-Callback für server-seitiges Linting (async, 600ms debounce)
- [x] Autocomplete für SQL-Keywords via `autocompletion()` + `completionKeymap`
- [x] MUI-Theme-Styling für Autocomplete-Tooltip + Lint-Marker
- [x] `showErrorCount`-Prop + `errorCount`-Translation-Key
- [x] `SqlLintError`-Typ: `{ line, col?, message, severity? }`
- [x] Storybook-Story `WithLinting`

### Phase 3 — Format ✅ FERTIG
- [x] Format-Button: SQL prettifizieren mit `sql-formatter`
- [x] `npm install sql-formatter`
- [x] `showFormat`-Prop in `SqlEditorToolbarConfig` (default: `true`)
- [x] `format`-Translation-Key in `SqlEditorTranslation` (default: `"Format SQL"`)
- [x] Dialect-Mapping: `standard→sql`, `mysql→mysql`, `postgresql→postgresql`, `sqlite→sqlite`, `mssql→tsql`
- [x] `AutoFixHighIcon` als Icon für den Format-Button
- [x] Try/catch: Editor bleibt unverändert bei nicht parsbarem SQL
- [x] Storybook-Story `WithFormat`

### Phase 4 — Schema-aware Autocomplete ✅ FERTIG
- [x] `schema`-Prop: Tabellen- und Spaltennamen als Autocomplete-Quelle
- [x] `SqlSchema`-Typ: `{ tables: SqlTable[] }` mit `SqlTable { name, columns? }` und `SqlColumn { name, type? }`
- [x] Spalten-Typen (`INT`, `VARCHAR`, …) erscheinen als `detail` im Autocomplete-Tooltip
- [x] Konvertierung in CodeMirror-Format (`Record<string, Completion[]>`) innerhalb des `useEffect`
- [x] `schemaKey = JSON.stringify(schema)` als stabile Dependency für `useEffect`
- [x] Storybook-Story `WithSchema` mit 3 Tabellen (users, orders, products)

---

## Dateistruktur (aktuell)

```
src/components/sql-editor/
├── SqlEditor.tsx            ✅
├── SqlEditor.types.ts       ✅
├── SqlEditor.stories.tsx    ✅
├── SqlEditorToolbar.tsx     ✅
├── SqlEditorContent.tsx     ✅
└── SqlEditorFooter.tsx      ✅
```

---

## Abhängigkeiten (installiert)

```json
{
  "@codemirror/view":        "^6.x  ✅",
  "@codemirror/state":       "^6.x  ✅",
  "@codemirror/lang-sql":    "^6.x  ✅",
  "@codemirror/lint":        "^6.x  ✅  (für Phase 2)",
  "@codemirror/autocomplete": "^6.x  ✅  (für Phase 2)",
  "@codemirror/commands":    "^6.x  ✅",
  "@codemirror/language":    "^6.x  ✅",
  "sql-formatter":           "noch nicht  (für Phase 3)"
}
```
