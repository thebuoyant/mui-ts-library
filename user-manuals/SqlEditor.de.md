# SqlEditor — Benutzerhandbuch

> [English Version →](SqlEditor.md)

**Professioneller SQL-Editor mit Syntax-Highlighting, dialektbewusstem Autocomplete und `Cmd+Enter`-Ausführen — einsatzbereit in jedem Tool, das Abfragen ausführt.** `SqlEditor` in Datenbank-Clients, Admin-Panels, BI-Dashboards und Query-Buildern einsetzen, wo Entwickler oder Analysten SQL schreiben und ausführen.

## Übersicht

Der `SqlEditor` ist ein vollwertiger SQL-Code-Editor auf Basis [CodeMirror 6](https://codemirror.net/) mit demselben MUI-Paper-Layout wie der `RichTextEditor`. Er bietet eine komfortable SQL-Eingabe für Query-Builder, Admin-Tools, BI-Dashboards und Datenbank-Frontends — vollständig in das MUI-Theme integriert, ohne externe CSS-Abhängigkeiten.

### Was macht diese Komponente?

Der Nutzer sieht eine MUI-Paper-Karte mit zwei Bereichen:

- **Toolbar** (oben): Aktions-Buttons — SQL formatieren, Kopieren, Leeren, Rückgängig/Wiederholen und optional ein Ausführen-Button (standardmäßig ausgeblendet).
- **Editor-Bereich**: ein CodeMirror-Textfeld mit SQL-spezifischen Funktionen:
  - **Syntax-Highlighting**: SQL-Keywords (`SELECT`, `FROM`, `WHERE`) erscheinen in der Primärfarbe, Strings in Grün, Bezeichner in Blau/Info-Farbe — alles aus dem MUI-Theme, Dark-Mode-kompatibel.
  - **Zeilennummern** links.
  - **Autocomplete**: beim Tippen erscheinen SQL-Keyword-Vorschläge; mit `schema` kommen auch Tabellen- und Spaltennamen im Dropdown.
  - **Tastaturkürzel**: `Cmd+Enter` / `Strg+Enter` führt die Abfrage direkt aus (wenn `onExecute` übergeben ist).
- **Footer** (optional): zeigt Cursor-Position (z. B. „Zeile 3, Sp. 10") und optional Fehleranzahl für serverseitige Lint-Fehler.

> **Unterschied zum `RichTextEditor`:** SqlEditor produziert reinen SQL-Text (kein HTML). Er hat kein Rich-Text-Formatting — er ist ein Code-Editor, kein Dokument-Editor.

**Typische Anwendungsfälle:**

- Query-Builder und SQL-Playgrounds
- Admin-Tools und Datenbank-Frontends
- BI-Dashboards mit Abfrage-Eingabe
- Formularfelder für SQL-Konfigurationswerte

---

> ### Neu in v3.5.0
>
> | Feature | Beschreibung | Springe zu |
> |---|---|---|
> | **Query-Verlauf** | Letzte N Abfragen speichern und nachladen (`toolbarConfig.showHistory`) | [→ Query-Verlauf](#query-verlauf) |

---

## Voraussetzungen

| Abhängigkeit | Mindestversion |
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

## Schnellstart

```tsx
import { useState } from 'react';
import { SqlEditor } from '@thebuoyant-tsdev/mui-ts-library';
import type { SqlSchema } from '@thebuoyant-tsdev/mui-ts-library';

// Optional: Schema definieren für Tabellen-/Spalten-Autocomplete beim Tippen
const schema: SqlSchema = {
  tables: [
    {
      name: 'users',
      columns: [
        { name: 'id',    type: 'INT' },
        { name: 'name',  type: 'VARCHAR' },
        { name: 'email', type: 'VARCHAR' },
      ],
    },
  ],
};

function App() {
  const [sql, setSql] = useState('SELECT * FROM users WHERE active = true;');

  return (
    <SqlEditor
      value={sql}           // kontrolliert: du besitzt den SQL-State
      onChange={setSql}      // wird bei jeder Änderung aufgerufen
      dialect="postgresql"  // aktiviert PostgreSQL-spezifische Keywords und Formatierung
      schema={schema}       // „FROM u" eingeben → „users" erscheint im Autocomplete
      toolbarConfig={{ showExecute: true }}    // Ausführen-Button in der Toolbar anzeigen
      onExecute={(sql) => console.log('Ausführen:', sql)} // feuert auch bei Cmd+Enter / Strg+Enter
    />
  );
}
```

> **Minimalvariante** (unkontrolliert, ohne Schema, ohne Ausführen): `<SqlEditor onChange={(sql) => console.log(sql)} />` — ein einfacher Editor mit Format/Kopieren/Leeren-Toolbar, Syntax-Highlighting und sonst nichts. Props nach Bedarf ergänzen.

---

## Props

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `dialect` | `SqlEditorDialect` | `"standard"` | SQL-Dialekt für Syntax-Highlighting und Formatierung |
| `disabled` | `boolean` | `false` | Deaktiviert Editor und Toolbar vollständig |
| `error` | `boolean` | `false` | Roter Rahmen im Fehlerzustand |
| `height` | `number \| string` | `300` | Gesamthöhe (Toolbar + Inhalt). Zahlen → px. `"auto"` → füllt den umgebenden Flex-Container. |
| `helperText` | `string` | — | Hilfetext unterhalb des Editors (wie MUI TextField) |
| `highlightColors` | `SqlEditorHighlightColors` | — | Syntax-Highlight-Farben für Keywords, Strings und Identifier |
| `name` | `string` | — | Name für native Formularübermittlung (verstecktes `<input type="hidden">`) |
| `placeholder` | `string` | — | Platzhaltertext bei leerem Editor |
| `queryHistoryKey` | `string` | `"sql-editor-query-history"` | `localStorage`-Key für den Query-Verlauf — eindeutigen Wert setzen, wenn mehrere `SqlEditor` auf derselben Seite laufen |
| `queryHistoryMaxEntries` | `number` | `20` | Maximale Anzahl an Einträgen im Query-Verlauf |
| `readonly` | `boolean` | `false` | Nur-Lesen-Modus — keine Toolbar |
| `schema` | `SqlSchema` | — | Tabellen- und Spaltendefinitionen für Schema-aware Autocomplete |
| `showErrorCount` | `boolean` | `false` | Fehleranzahl im Footer ein-/ausblenden (benötigt `onLint`) |
| `showLineColumn` | `boolean` | `true` | Cursor-Position (Ln / Col) im Footer ein-/ausblenden |
| `showLineNumbers` | `boolean` | `true` | Zeilennummern ein-/ausblenden |
| `toolbarConfig` | `SqlEditorToolbarConfig` | alle `true` außer `showExecute` | Toolbar-Schaltflächen einzeln ein-/ausblenden |
| `translation` | `Partial<SqlEditorTranslation>` | — | UI-Texte für Toolbar-Tooltips und Footer überschreiben |
| `value` | `string` | — | SQL-Inhalt; aktiviert den kontrollierten Modus |
| `width` | `number \| string` | `"100%"` | Breite des Editors. Zahlen → px. |
| `onBlur` | `() => void` | — | Wird aufgerufen wenn der Editor den Fokus verliert |
| `onChange` | `(sql: string) => void` | — | Bei jeder Inhaltsänderung aufgerufen |
| `onExecute` | `(sql: string) => void` | — | Wird bei Klick auf Ausführen aufgerufen **oder wenn `Cmd+Enter` / `Ctrl+Enter` gedrückt wird**. Der Keyboard-Shortcut funktioniert immer wenn `onExecute` gesetzt ist, unabhängig von `toolbarConfig.showExecute`. |
| `onFocus` | `() => void` | — | Wird aufgerufen wenn der Editor den Fokus erhält |
| `onLint` | `(sql: string) => Promise<SqlLintError[]> \| SqlLintError[]` | — | Asynchroner Lint-Callback — Fehler werden als Wellenlinien im Editor angezeigt |

---

## TypeScript-Typen

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
  showFormat?:   boolean;  // SQL-Formatieren-Schaltfläche
  showCopy?:     boolean;  // In Zwischenablage kopieren
  showClear?:    boolean;  // Editor leeren
  showExecute?:  boolean;  // Ausführen-Schaltfläche (standardmäßig aus)
  showUndoRedo?: boolean;  // Rückgängig / Wiederholen
  showHistory?:  boolean;  // Query-Verlauf-Schaltfläche — benötigt onExecute (standardmäßig aus)
};
```

Standard-Konfiguration:

```tsx
import { DEFAULT_SQL_EDITOR_TOOLBAR_CONFIG } from '@thebuoyant-tsdev/mui-ts-library';
// { showFormat: true, showCopy: true, showClear: true, showExecute: false, showUndoRedo: true, showHistory: false }
```

### `SqlEditorTranslation`

```ts
type SqlEditorTranslation = {
  format:       string;   // "Format SQL"
  copy:         string;   // "Copy"
  copySuccess:  string;   // "Copied!"
  clear:        string;   // "Clear"
  execute:      string;   // "Execute"
  undo:         string;   // "Undo"
  redo:         string;   // "Redo"
  lineColumn:   string;   // "Ln {line}, Col {col}"
  errorCount:   string;   // "{count} error(s)"
  history?:      string;   // "Query history"
  historyEmpty?: string;   // "No queries yet"
  clearHistory?: string;   // "Clear history"
};
```

> **⚠️ Kompatibilitäts-Hinweis:** `history`, `historyEmpty` und `clearHistory` (hinzugefügt in `v3.5.0`) sind bei diesem Typ optional — im Gegensatz zu den anderen Keys, die erforderlich sind. Das ist bewusst so: dadurch kompiliert älterer Code, der ein vollständiges `SqlEditorTranslation`-Literal deklariert (statt ein partielles Objekt an die `translation`-Prop zu übergeben), auch dann weiter, wenn wir künftig neue Keys hinzufügen. Intern löst die Komponente fehlende Keys immer gegen `DEFAULT_SQL_EDITOR_TRANSLATION` auf — du musst sie also nie angeben.

```tsx
import { DEFAULT_SQL_EDITOR_TRANSLATION } from '@thebuoyant-tsdev/mui-ts-library';
```

### `SqlEditorHighlightColors`

```ts
type SqlEditorHighlightColors = {
  keyword?:    string;   // SQL-Keywords (SELECT, FROM, WHERE …) — Standard: theme primary.main, fett
  string?:     string;   // String-Literale ('wert') — Standard: theme success.main, fett
  identifier?: string;   // Identifier: Tabellen-/Spaltennamen, Aliase — Standard: theme info.main
};
```

### `SqlSchema`, `SqlTable`, `SqlColumn`

```ts
type SqlColumn = {
  name:  string;
  type?: string;   // Als Detail-Hinweis im Autocomplete-Tooltip angezeigt (z. B. "INT", "VARCHAR")
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

## Kontrollierter Modus

```tsx
const [sql, setSql] = useState('SELECT * FROM users;');

<SqlEditor
  value={sql}
  onChange={setSql}
/>
```

Der Editor synchronisiert `value` → CodeMirror-Dokument bei Änderungen von außen — ohne den Cursor zu verschieben.

---

## Syntax-Highlighting

Farben kommen standardmäßig aus dem aktiven MUI-Theme:

| Token | Standardfarbe | Stil |
|---|---|---|
| Keywords (`SELECT`, `FROM`, `WHERE` …) | `primary.main` | **fett** |
| String-Literale (`'wert'`) | `success.main` | **fett** |
| Identifier (Tabellen-/Spaltennamen, Aliase) | `info.main` | — |
| Zahlen (`42`, `3.14`) | `warning.main` | — |
| Funktionen (`COUNT`, `SUM`, `COALESCE` …) | `secondary.main` | — |
| Kommentare (`--`, `/* */`) | `text.disabled` | *kursiv* |
| Operatoren (`=`, `>`, `AND` …) | `text.secondary` | — |
| Fehler-Token | `error.main` | Wellenlinie |

Dark Mode wird automatisch unterstützt — alle Farben kommen aus dem aktiven MUI-Theme.

### Eigene Highlight-Farben

Die drei Haupt-Token-Farben können über `highlightColors` überschrieben werden:

```tsx
import type { SqlEditorHighlightColors } from '@thebuoyant-tsdev/mui-ts-library';

// One Dark Theme Farben
const colors: SqlEditorHighlightColors = {
  keyword:    '#c678dd',   // Lila
  string:     '#98c379',   // Grün
  identifier: '#e5c07b',   // Gold
};

<SqlEditor value={sql} highlightColors={colors} />
```

---

## SQL-Dialekte

```tsx
<SqlEditor dialect="postgresql" value={sql} />
```

| Dialekt | Wert | Formatter-Sprache |
|---|---|---|
| Standard SQL | `"standard"` | `sql` |
| MySQL | `"mysql"` | `mysql` |
| PostgreSQL | `"postgresql"` | `postgresql` |
| SQLite | `"sqlite"` | `sqlite` |
| MS SQL Server | `"mssql"` | `tsql` |

Der Dialekt beeinflusst sowohl das Syntax-Highlighting (dialektspezifische Keywords) als auch den Format-Button (sql-formatter verwendet die passende Sprache).

---

## Toolbar

Die Toolbar erscheint oberhalb des Editors (im Readonly-Modus ausgeblendet). Jede Schaltfläche kann einzeln ein- oder ausgeblendet werden:

| Schaltfläche | Standard | Beschreibung |
|---|---|---|
| Formatieren (`AutoFixHigh`) | sichtbar | SQL verschönern via `sql-formatter` |
| Kopieren (`ContentCopy`) | sichtbar | SQL in Zwischenablage; zeigt „Kopiert!" für 2 s |
| Leeren (`Delete`) | sichtbar | Editor-Inhalt löschen |
| Rückgängig (`Undo`) | sichtbar | Letzte Änderung rückgängig machen |
| Wiederholen (`Redo`) | sichtbar | Letzte rückgängig gemachte Änderung wiederherstellen |
| Ausführen (`PlayArrow`) | **ausgeblendet** | Ruft `onExecute(sql)` auf |

```tsx
// Ausführen anzeigen, Formatieren ausblenden
<SqlEditor
  toolbarConfig={{ showExecute: true, showFormat: false }}
  onExecute={(sql) => runQuery(sql)}
/>

// Readonly — keine Toolbar
<SqlEditor readonly value={sql} />
```

---

## Ausführen-Schaltfläche und Tastenkürzel

```tsx
<SqlEditor
  value={sql}
  toolbarConfig={{ showExecute: true }}
  onExecute={(sql) => {
    console.log('Abfrage ausführen:', sql);
    runQuery(sql);
  }}
/>
```

Die Ausführen-Schaltfläche ist standardmäßig ausgeblendet. Sie erscheint nur wenn sowohl `toolbarConfig.showExecute: true` als auch ein `onExecute`-Handler angegeben sind.

**Tastenkürzel:** Wenn `onExecute` gesetzt ist, kann die Abfrage mit `Cmd+Enter` (macOS) oder `Ctrl+Enter` (Windows/Linux) aus dem Editor heraus ausgeführt werden — unabhängig davon, ob die Toolbar-Schaltfläche sichtbar ist.

```tsx
{/* Nur Tastenkürzel — keine Ausführen-Schaltfläche in der Toolbar */}
<SqlEditor
  value={sql}
  onExecute={(sql) => runQuery(sql)}
/>

{/* Toolbar-Schaltfläche und Tastenkürzel */}
<SqlEditor
  value={sql}
  toolbarConfig={{ showExecute: true }}
  onExecute={(sql) => runQuery(sql)}
/>
```

---

## Query-Verlauf

```tsx
<SqlEditor
  value={sql}
  onChange={setSql}
  toolbarConfig={{ showExecute: true, showHistory: true }}
  onExecute={(sql) => runQuery(sql)}
  queryHistoryKey="my-app-sql-history"
  queryHistoryMaxEntries={20}
/>
```

Die "Query history"-Schaltfläche ist standardmäßig ausgeblendet. Sie erscheint nur wenn `toolbarConfig.showHistory: true` **und** ein `onExecute`-Handler angegeben sind — der Verlauf erfasst nur Abfragen, die tatsächlich ausgeführt wurden, genau wie bei DataGrip, TablePlus oder pgAdmin.

Jeder Aufruf von `onExecute` (egal ob per Toolbar-Schaltfläche oder `Cmd+Enter` / `Ctrl+Enter`) speichert die SQL in `localStorage`, neueste zuerst. Wird exakt dieselbe SQL erneut ausgeführt, wandert der bestehende Eintrag nach vorne statt dupliziert zu werden. Ein Klick auf einen Eintrag im Verlaufsmenü lädt ihn zurück in den Editor; ein "Verlauf leeren"-Eintrag am Ende des Menüs löscht den gesamten Verlauf.

| Prop | Standard | Beschreibung |
|---|---|---|
| `queryHistoryKey` | `"sql-editor-query-history"` | `localStorage`-Key. Eindeutigen Wert pro Editor setzen, wenn mehrere `SqlEditor` auf derselben Seite laufen — sonst teilen sie sich einen Verlauf. |
| `queryHistoryMaxEntries` | `20` | Maximale Anzahl an Einträgen. Älteste Einträge werden verworfen, wenn das Limit erreicht ist. |

---

## Linting

Lint-Fehler werden als Wellenlinien im Editor angezeigt. Der `onLint`-Callback wird mit 600 ms Debounce nach jeder Änderung aufgerufen.

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

Das `SqlLintError`-Format:

```ts
{ line: 1, col: 10, message: "Unbekanntes Keyword 'FORM'", severity: "error" }
```

- `severity` wird als `"error"` behandelt wenn nicht angegeben
- `col` fällt auf den Zeilenanfang zurück wenn nicht angegeben
- `showErrorCount` zeigt `⚠ N Fehler` im Footer

Zusätzlich erscheint ein farbiger Punkt im Zeilennummern-Gutter für jeden Fehler.

---

## Schema-aware Autocomplete

Tabellen- und Spaltendefinitionen bereitstellen, damit der Editor sie beim Tippen vorschlägt:

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

Das `type`-Feld jeder Spalte erscheint als Detail-Hinweis neben dem Vorschlag im Autocomplete-Dropdown. SQL-Keywords werden immer zusätzlich zu Schema-Einträgen vorgeschlagen.

---

## Footer

```tsx
{/* Nur Cursor-Position */}
<SqlEditor showLineColumn />

{/* Fehleranzahl + Cursor-Position */}
<SqlEditor showLineColumn showErrorCount onLint={myLinter} />

{/* Hilfetext (wie MUI TextField) */}
<SqlEditor error helperText="Ungültige SQL-Syntax." />

{/* Footer vollständig ausblenden */}
<SqlEditor showLineColumn={false} showErrorCount={false} />
```

Der Footer wird nur gerendert wenn mindestens eines von `showLineColumn`, `showErrorCount` oder `helperText` gesetzt ist.

---

## Höhe und Breite

```tsx
{/* Standard: 300px hoch, 100% breit */}
<SqlEditor />

{/* Feste Höhe — Inhalt scrollt vertikal */}
<SqlEditor height={400} />

{/* CSS-String */}
<SqlEditor height="50vh" />

{/* "auto" — füllt den umgebenden Flex-Container */}
<Box sx={{ height: 500, display: "flex", flexDirection: "column" }}>
  <SqlEditor height="auto" />
</Box>

{/* Feste Breite */}
<SqlEditor width={800} />
```

**Hinweis zu `height="auto"`:** Der umgebende Container benötigt `display: flex` und `flex-direction: column`.

---

## Readonly und Disabled

```tsx
{/* Nur-Lesen — keine Toolbar, kein blinkender Cursor */}
<SqlEditor value={sql} readonly />

{/* Deaktiviert — Toolbar und Editor ausgegraut */}
<SqlEditor value={sql} disabled />
```

---

## Formular-Integration

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
        rules={{ required: 'SQL-Abfrage ist erforderlich' }}
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
      <button type="submit">Ausführen</button>
    </form>
  );
}
```

### Native Formularübermittlung

```tsx
<form action="/execute" method="POST">
  <SqlEditor name="query" />
  <button type="submit">Ausführen</button>
</form>
```

Der Wert wird über ein verstecktes `<input type="hidden" name="query">` im Formular übermittelt.

---

## i18n — Übersetzungen

Nur die zu überschreibenden Schlüssel angeben — alle anderen behalten ihren Standardwert:

```tsx
import { DEFAULT_SQL_EDITOR_TRANSLATION } from '@thebuoyant-tsdev/mui-ts-library';

const DE = {
  format:       "Formatieren",
  copy:         "Kopieren",
  copySuccess:  "Kopiert!",
  clear:        "Leeren",
  execute:      "Ausführen",
  undo:         "Rückgängig",
  redo:         "Wiederholen",
  lineColumn:   "Zeile {line}, Sp. {col}",
  errorCount:   "{count} Fehler",
  history:      "Verlauf",
  historyEmpty: "Noch keine Abfragen",
  clearHistory: "Verlauf leeren",
};

<SqlEditor translation={DE} />
```

Die Platzhalter `{line}`, `{col}` und `{count}` werden zur Laufzeit ersetzt.

---

## Callbacks / Events

> **Welcher Callback feuert bei welcher Aktion?**
>
> | Aktion | Ausgelöste Callbacks |
> |---|---|
> | SQL-Inhalt tippen / bearbeiten | `onChange` |
> | Ausführen-Button oder `Strg / Cmd ⌘+Enter` | `onExecute` |
> | Linting-Diagnosen ändern sich | `onLint` |
> | Editor erhält Fokus | `onFocus` |
> | Editor verliert Fokus | `onBlur` |

| Callback | Signatur | Wann ausgelöst | Verwenden wenn... |
|---|---|---|---|
| `onChange` | `(value: string) => void` | Jede Inhaltsänderung (Tippen, Einfügen, Formatieren, Toolbar) | State-Sync im kontrollierten Modus |
| `onExecute` | `(value: string) => void` | Ausführen-Button geklickt oder `Strg / Cmd ⌘+Enter` gedrückt | Abfrage gegen eine Datenbank ausführen |
| `onLint` | `(diagnostics: Diagnostic[]) => void` | Linting-Ergebnisse ändern sich (erfordert Dialekt mit Lint-Support) | Fehlerzähler anzeigen, Ausführung bei Syntaxfehlern sperren |
| `onFocus` | `() => void` | Editor erhält Tastatur-Fokus | Visuelle Rückmeldung, bedingte UI |
| `onBlur` | `() => void` | Editor verliert Tastatur-Fokus | Validierung auslösen, Auto-Save |

---

## Storybook-Stories

| Story | Beschreibung |
|---|---|
| `Default` | Leerer Editor mit Platzhaltertext |
| `WithQuery` | Mit einer Beispiel-SELECT-Abfrage |
| `WithFixedHeight` | Lange Abfrage in einem 200px-hohen Editor (scrollbar) |
| `WithAutoHeight` | Editor füllt einen 400px Flex-Container |
| `Controlled` | Vollständig kontrolliert mit `useState` |
| `MySQLDialect` | MySQL-spezifische Syntax |
| `PostgreSQLDialect` | PostgreSQL-spezifische Syntax |
| `WithExecute` | Ausführen-Schaltfläche sichtbar |
| `WithQueryHistory` | Ausführen + Query-Verlauf-Schaltfläche, führt Execute automatisch einmal aus |
| `AnalyticsDashboardQuery` | BI-Dashboard-Abfrage mit Schema-aware Autocomplete und Linting |
| `WithSchema` | Schema-aware Autocomplete mit 3 Tabellen |
| `WithLinting` | Server-seitiges Linting mit simulierten Fehlern |
| `WithFormat` | Format-Schaltfläche mit unformatiertem SQL |
| `CustomHighlightColors` | One Dark Farbschema |
| `NoLineNumbers` | Zeilennummern und Cursor-Position ausgeblendet |
| `ReadOnly` | Keine Toolbar, Nur-Lesen-Inhalt |
| `Disabled` | Ausgegraut, nicht interaktiv |
| `WithError` | Roter Rahmen + Hilfetext |
| `GermanTranslation` | Toolbar und Footer auf Deutsch |

---

## Architektur-Entscheidungen

| Thema | Entscheidung |
|---|---|
| **CodeMirror 6** | ~150 kB vs. Monaco ~2 MB; vollständiger SQL-Support, MUI-themebar, genutzt von Replit / Observable / CodeSandbox |
| **Kein Monaco** | 2–3 MB Bundle, schwer ins MUI-Theme integrierbar, für eingebetteten Editor überdimensioniert |
| **`Compartment`** | `editable`- und `readOnly`-Zustand werden dynamisch via CodeMirror `Compartment` rekonfiguriert — vermeidet vollständige Editor-Neuerstellung bei Prop-Änderung |
| **Editor-Neuerstellung** | Vollständige Neuerstellung nur bei Änderung von `isDark`, `dialect`, `hasLint`, `highlightColors` oder `schema` — `value`, `disabled` und `readonly` werden ohne Neuerstellung synchronisiert |
| **`onLint`-Ref** | Lint-Callback in einem Ref gespeichert um Stale-Closures zu vermeiden — der Linter ruft immer die aktuellste Version auf |
| **`schemaKey`** | `JSON.stringify(schema)` als stabiler primitiver Dependency-Wert für `useEffect` |
| **`sql-formatter`** | Dialekt-Mapping: `standard→sql`, `mysql→mysql`, `postgresql→postgresql`, `sqlite→sqlite`, `mssql→tsql`; try/catch lässt den Editor unverändert wenn das SQL nicht parsebar ist |
| **`normalizeSize()`** | Konvertiert numerische Strings (`"300"`) zu Zahlen, damit MUI `px` anhängt — ermöglicht Storybook-Text-Controls |
| **`height="auto"`** | Bei `auto` verwendet der Editor `flex: 1` auf der äußeren `Box` und der `Paper`-Komponente um den umgebenden Flex-Container zu füllen |
| **Footer außerhalb Paper** | `SqlEditorFooter` befindet sich außerhalb des `Paper`-Rahmens, damit `helperText` dem MUI-TextField-Muster entspricht |
