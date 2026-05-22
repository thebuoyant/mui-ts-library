# SqlEditor — Ideen & Implementierungsplan

## Idee

Ein SQL-Editor der visuell identisch zum `RichTextEditor` aufgebaut ist — gleiche Paper-Hülle, gleiche Props-API, gleiche MUI-Theme-Integration — aber statt WYSIWYG-Text einen vollwertigen Code-Editor mit SQL-Syntax-Highlighting, Echtzeit-Fehlermarkierung und SQL-spezifischer Toolbar liefert.

**Zielgruppe:** Entwickler, die SQL-Eingabefelder in React-Apps brauchen — für Query-Builder, Admin-Tools, BI-Dashboards, Datenbank-Frontends.

---

## Technologie-Entscheidung: CodeMirror 6

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
│  [Format] [Copy] [Clear]  │  [Undo] [Redo]  [Help]  │  ← SqlEditorToolbar
├─────────────────────────────────────────────────────┤  ← Divider
│ 1  SELECT u.name,                                   │
│ 2    COUNT(o.id) AS order_count                     │  ← CodeMirror Editor
│ 3  FROM users u                                     │     (scrollable)
│ 4  JOIN orders o ON o.user_id = u.id                │
│ 5  WHERE u.active = 1                               │
│ 6  GROUP BY u.name                                  │
│ 7  ▋                                                │
├─────────────────────────────────────────────────────┤
│  ⚠ 1 Fehler: Zeile 4 — unbekannte Tabelle 'orders'  │  ← SqlEditorFooter
│                                              Ln 7, Col 1 │
└─────────────────────────────────────────────────────┘
```

---

## Props-API (analog RichTextEditor)

```ts
type SqlEditorProps = {
  // Kern
  value?:     string;
  onChange?:  (sql: string) => void;
  placeholder?: string;

  // Größe (identisch RichTextEditor)
  height?: number | string;
  width?:  number | string;

  // Zustände (identisch RichTextEditor)
  disabled?:   boolean;
  readonly?:   boolean;
  error?:      boolean;
  helperText?: string;

  // Form
  name?: string;

  // SQL-spezifisch
  dialect?:  "standard" | "mysql" | "postgresql" | "sqlite" | "mssql";
  schema?:   SqlSchema;           // → Schema-aware Autocomplete
  onExecute?: (sql: string) => void; // → "Ausführen"-Button in Toolbar

  // Konfiguration
  showLineNumbers?:    boolean;   // default: true
  showLineColumn?:     boolean;   // default: true
  showErrorCount?:     boolean;   // default: true
  toolbarConfig?:      SqlEditorToolbarConfig;

  // i18n
  translation?: Partial<SqlEditorTranslation>;

  // Callbacks
  onBlur?:  () => void;
  onFocus?: () => void;
};
```

### `SqlSchema` — für Schema-aware Autocomplete

```ts
type SqlSchema = {
  tables: {
    name:    string;
    columns: { name: string; type?: string }[];
  }[];
};
```

Beispiel:
```ts
const schema: SqlSchema = {
  tables: [
    { name: "users",  columns: [{ name: "id" }, { name: "name" }, { name: "email" }] },
    { name: "orders", columns: [{ name: "id" }, { name: "user_id" }, { name: "total" }] },
  ]
};
```

---

## Syntax-Highlighting

CodeMirror 6 highlightet automatisch:

| Token | Farbe (MUI-Theme-aware) |
|---|---|
| Keywords (`SELECT`, `FROM`, `WHERE`, …) | `primary.main` |
| Funktionen (`COUNT`, `SUM`, `COALESCE`, …) | `secondary.main` |
| Strings (`'wert'`) | `success.dark` |
| Zahlen (`42`, `3.14`) | `warning.dark` |
| Kommentare (`--`, `/* */`) | `text.disabled` |
| Operatoren (`=`, `>`, `AND`, …) | `text.primary` (bold) |
| Fehler-Token | roter Underline + Tooltip |

Alle Farben kommen aus dem aktiven MUI-Theme — Dark Mode funktioniert automatisch.

---

## Fehler-Erkennung

### Echtzeit-Linting (Phase 2)

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
// Server-seitiges Linting via Prop
<SqlEditor
  onLint={async (sql) => {
    const res = await fetch('/api/lint', { body: sql });
    return res.json(); // [{ line: 4, message: "Unknown table 'orders'" }]
  }}
/>
```

---

## Toolbar-Buttons

| Button | Aktion | Tooltip |
|---|---|---|
| **Format** | SQL prettifizieren (`sql-formatter`) | "SQL formatieren" |
| **Copy** | Inhalt in Zwischenablage | "Kopieren" |
| **Clear** | Editor leeren (mit Bestätigung) | "Leeren" |
| **Execute** | `onExecute(sql)` aufrufen | "Ausführen" — nur wenn Prop gesetzt |
| **Undo / Redo** | CodeMirror History | "Rückgängig / Wiederholen" |

---

## Abhängigkeiten

```json
{
  "@codemirror/view":         "^6.x",
  "@codemirror/state":        "^6.x",
  "@codemirror/lang-sql":     "^6.x",
  "@codemirror/lint":         "^6.x",
  "@codemirror/autocomplete":  "^6.x",
  "@codemirror/commands":     "^6.x",
  "@codemirror/theme-one-dark": "^6.x",
  "sql-formatter":            "^15.x"
}
```

Alle als `peerDependencies` oder `dependencies` — CodeMirror ist modular, tree-shakeable.

---

## Implementierungsphasen

### Phase 1 — Foundation (MVP)
- [ ] Komponentenstruktur anlegen: `SqlEditor.tsx`, `SqlEditor.types.ts`, `SqlEditorToolbar.tsx`, `SqlEditorContent.tsx`, `SqlEditorFooter.tsx`
- [ ] CodeMirror 6 integrieren mit `@codemirror/lang-sql`
- [ ] MUI Paper-Layout (identisch RichTextEditor)
- [ ] Props: `value`, `onChange`, `height`, `width`, `disabled`, `readonly`, `error`, `helperText`, `name`
- [ ] SQL-Syntax-Highlighting mit MUI-Theme-Farben
- [ ] Zeilennummern
- [ ] `normalizeSize()` aus RichTextEditor wiederverwenden

### Phase 2 — SQL Intelligence
- [ ] Echtzeit-Linting via `@codemirror/lint`
- [ ] Fehleranzeige im Footer (Anzahl + erste Fehlermeldung)
- [ ] `onLint`-Callback für server-seitiges Linting
- [ ] Autocomplete für SQL-Keywords (`@codemirror/autocomplete`)
- [ ] Zeile/Spalte-Anzeige im Footer

### Phase 3 — Toolbar & UX
- [ ] Format-Button mit `sql-formatter`
- [ ] Copy-Button
- [ ] Clear-Button mit Bestätigungs-Dialog
- [ ] Undo/Redo
- [ ] `onExecute`-Callback + Execute-Button (nur wenn Prop gesetzt)
- [ ] `toolbarConfig` zum Ein-/Ausblenden einzelner Buttons
- [ ] i18n via `translation`-Prop

### Phase 4 — Advanced (optional)
- [ ] `schema`-Prop für Schema-aware Autocomplete (Tabellen- und Spaltennamen)
- [ ] `dialect`-Prop: MySQL, PostgreSQL, SQLite, MSSQL
- [ ] Multi-Statement-Support (mehrere Queries, trennbar per `;`)
- [ ] Minimap (optional, bei großen Queries)
- [ ] Storybook-Stories
- [ ] Unit-Tests

---

## Dateistruktur

```
src/components/sql-editor/
├── SqlEditor.tsx
├── SqlEditor.types.ts
├── SqlEditor.stories.tsx
├── SqlEditor.test.tsx
├── SqlEditorToolbar.tsx
├── SqlEditorContent.tsx
├── SqlEditorFooter.tsx
└── util/
    └── sql-editor.util.ts    ← normalizeSize, Theme-Mapping, etc.
```

---

## Meine Einschätzung

Diese Komponente macht für die Bibliothek sehr viel Sinn:

- Sie ist in keiner anderen MUI-Komponenten-Bibliothek so vorhanden
- Der Bedarf ist real — jede App die Datenbanken berührt braucht sowas
- Das visuelle Konsistenz-Versprechen zur restlichen Bibliothek ist ein echter USP
- CodeMirror 6 ist modern, leicht und produktionserprobt
- Phase 1 + 2 sind in einem überschaubaren Aufwand umsetzbar — Phase 3 und 4 können später nachgezogen werden

**Empfehlung:** Mit Phase 1 starten (Foundation + Syntax-Highlighting) — das gibt sofort einen nutzbaren Editor der sich anfühlt wie der RichTextEditor. Phase 2 (Linting) ist der entscheidende Mehrwert gegenüber einem einfachen `<textarea>`.
