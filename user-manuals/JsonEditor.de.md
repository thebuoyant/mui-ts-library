# JsonEditor — Benutzerhandbuch

> [English Version →](JsonEditor.md)

**Echtzeit-JSON-Validierung mit Inline-Fehlermarkierungen, Format- und Komprimieren-Buttons und optionaler Minimap — im gewohnten MUI-Paper-Layout.** `JsonEditor` in Konfigurations-Panels, API-Explorern und Developer-Tools einsetzen, wo Nutzer JSON ansehen, bearbeiten oder validieren müssen.

## Überblick

Der `JsonEditor` ist ein vollständiger JSON-Code-Editor auf Basis von [CodeMirror 6](https://codemirror.net/) und Material UI. Er bietet Echtzeit-JSON-Validierung mit Inline-Fehlermarkern, Format- (Pretty-Print) und Komprimieren-Schaltflächen sowie einen Validierungsstatus-Anzeiger im Footer — alles im selben MUI-Paper-Layout wie der `SqlEditor`.

### Was macht diese Komponente?

Der Nutzer sieht eine MUI-Paper-Karte mit zwei Bereichen:

- **Toolbar** (oben): JSON formatieren (Pretty-Print), Komprimieren (Minify), Kopieren, **Download** (speichert den aktuellen Inhalt als `.json`-Datei), Leeren, Rückgängig/Wiederholen.
- **Editor-Bereich**: ein CodeMirror-JSON-Editor mit:
  - **Syntax-Highlighting**: Property-Namen in der Primärfarbe (fett), Strings in Grün, Zahlen in Gelb, Booleans in Blau, `null` in Grau — alles aus dem MUI-Theme.
  - **Zeilennummern** und optionale **Falten-Arrows** (▾/▸) neben `{` und `[` zum Ein-/Ausklappen von Objects und Arrays.
  - **Wellige Unterstreichungen** für Syntaxfehler (fehlende Kommas, nicht geschlossene Klammern) — Hover für die Fehlermeldung.
  - **`Ctrl / Cmd ⌘+Click`** auf einen Wert oder Property-Key kopiert seinen vollständigen JSON-Pfad in die Zwischenablage (z. B. `$.users[0].address.city`).
- **Footer** (optional): Cursor-Position + „Gültiges JSON" / „Ungültiges JSON"-Anzeige.

> **Im Vergleich zum `SqlEditor`:** JsonEditor validiert die Struktur kontinuierlich — sofortiges visuelles Feedback bei ungültigem JSON, ohne eigenen Lint-Code.

**Typische Einsatzgebiete:**

- API-Konfigurationspanels in Admin-Dashboards
- JSON-Payload-Editoren in Entwicklertools
- Konfigurationsdatei-Editoren in Einstellungsscreens
- Request-Body-Editoren in REST-API-Explorern
- Debug-Ansichten mit direkter JSON-Bearbeitung

---

> ### Neu in v3.25.0
>
> | Feature | Beschreibung | Springe zu |
> |---|---|---|
> | **Download-Button** | Neuer Toolbar-Button, der den aktuellen Editor-Inhalt als `.json`-Datei speichert. Standardmäßig an (`showDownload: true`). Dateiname konfigurierbar über `downloadFilename` (Standard `"file.json"`). Zwei neue Translation-Keys: `download` / `downloadSuccess`. | [→ Toolbar konfigurieren](#toolbar-konfigurieren) · [→ TypeScript-Typen](#typescript-typen) |

> ### Neu in v3.7.0
>
> | Feature | Beschreibung | Springe zu |
> |---|---|---|
> | **`enablePathFinder`** | `Ctrl/Cmd+Click` auf einen Wert oder Key kopiert den vollständigen JSON-Path | [→ JSON Path Finder](#json-path-finder) |
> | **`showFolding`** | Objects und Arrays inline ein-/ausklappen | [→ Folding](#folding) |
> | **`schema`** | Strukturelle Validierung (Typ, Required, Enum) mit Inline-Fehlermarkern | [→ Schema-Validierung](#schema-validierung) |

---

## Technische Voraussetzungen

| Abhängigkeit | Mindestversion |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |
| `@codemirror/lang-json` | 6.x |

---

## Import

```tsx
import {
  JsonEditor,
  DEFAULT_JSON_EDITOR_TRANSLATION,
  DEFAULT_JSON_EDITOR_TOOLBAR_CONFIG,
} from '@thebuoyant-tsdev/mui-ts-library';
import type {
  JsonEditorProps,
  JsonEditorToolbarConfig,
  JsonEditorTranslation,
  JsonEditorHighlightColors,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Schnellstart

```tsx
import { useState } from 'react';
import { JsonEditor } from '@thebuoyant-tsdev/mui-ts-library';

function App() {
  const [json, setJson] = useState('{\n  "name": "Alice",\n  "age": 30\n}');

  return (
    <JsonEditor
      value={json}              // kontrolliert: du besitzt den JSON-String
      onChange={setJson}         // wird bei jeder Änderung aufgerufen
      showValidation             // zeigt „Gültiges JSON" / „Ungültiges JSON" im Footer
      onValidChange={(isValid) => console.log('Gültig:', isValid)} // feuert bei Wechsel der Validität
      // Toolbar: Formatieren, Komprimieren, Kopieren, Leeren, Rückgängig/Wiederholen — alle an
      // Strg/Cmd+Click auf Wert → JSON-Path in Zwischenablage kopieren
    />
  );
}
```

> **Minimalvariante** (kein kontrollierter State, keine Validierung): `<JsonEditor onChange={(json) => console.log(json)} />` — einfacher Editor mit Toolbar und Syntax-Highlighting. `showValidation`, `schema`, `onValidChange` nach Bedarf ergänzen.

---

## Props

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `disabled` | `boolean` | `false` | Deaktiviert Editor und Toolbar vollständig |
| `enablePathFinder` | `boolean` | `true` | Aktiviert `Ctrl / Cmd ⌘+Click` auf einen Wert oder Property-Key, um dessen JSON-Path in die Zwischenablage zu kopieren |
| `error` | `boolean` | `false` | Roter Rahmen im Fehlerzustand |
| `height` | `number \| string` | `300` | Gesamthöhe (Toolbar + Inhalt). Zahlen → px. `"auto"` → füllt den umgebenden Flex-Container. |
| `helperText` | `string` | — | Hilfetext unter dem Editor (wie MUI TextField) |
| `highlightColors` | `JsonEditorHighlightColors` | — | Syntax-Highlight-Farben überschreiben |
| `indent` | `number` | `2` | Leerzeichen-Einzug für die Format-Schaltfläche |
| `name` | `string` | — | Name für natives Form-Submit (verstecktes `<input type="hidden">`) |
| `placeholder` | `string` | — | Platzhaltertext wenn der Editor leer ist |
| `readonly` | `boolean` | `false` | Schreibgeschützter Modus — keine Toolbar |
| `schema` | `JsonEditorSchema` | — | Validiert das Dokument strukturell — siehe [Schema-Validierung](#schema-validierung) |
| `showFolding` | `boolean` | `true` | Zeigt ein Fold-Gutter — Klick auf die ▾/▸-Pfeile klappt Objects/Arrays ein-/aus |
| `showLineColumn` | `boolean` | `true` | Cursor-Position im Footer anzeigen (Ln / Sp.) |
| `showLineNumbers` | `boolean` | `true` | Zeilennummern-Gutter anzeigen |
| `showMinimap` | `boolean` | `false` | Zeigt eine verkleinerte Dokumentenübersicht (Minimap) auf der rechten Seite des Editors an. Nützlich für die Navigation in großen JSON-Dateien. |
| `showValidation` | `boolean` | `false` | „Gültiges JSON" / „Ungültiges JSON"-Anzeige im Footer |
| `downloadFilename` | `string` | `"file.json"` | Dateiname für den Download-Button-Export |
| `toolbarConfig` | `JsonEditorToolbarConfig` | alle `true` | Einzelne Toolbar-Buttons ein-/ausblenden |
| `translation` | `Partial<JsonEditorTranslation>` | — | Abweichende Texte für Tooltips und Footer |
| `value` | `string` | — | Kontrollierter Wert — der im Editor angezeigte JSON-String |
| `width` | `number \| string` | `"100%"` | Breite. Zahlen → px. Leer oder nicht gesetzt → 100% des Elternelements. |
| `onBlur` | `() => void` | — | Wird aufgerufen wenn der Editor den Fokus verliert |
| `onChange` | `(json: string) => void` | — | Wird bei jeder Inhaltsänderung aufgerufen |
| `onFocus` | `() => void` | — | Wird aufgerufen wenn der Editor den Fokus erhält |
| `onPathCopy` | `(path: string) => void` | — | Wird nach erfolgreichem `Ctrl / Cmd ⌘+Click`-Kopieren über den Path Finder aufgerufen |
| `onValidChange` | `(isValid: boolean) => void` | — | Wird aufgerufen, wenn sich die JSON-Gültigkeit ändert |

---

## TypeScript-Typen

### `JsonEditorToolbarConfig`

```ts
type JsonEditorToolbarConfig = {
  showFormat?:   boolean;
  showCompact?:  boolean;
  showCopy?:     boolean;
  showDownload?: boolean;  // Standard: true
  showClear?:    boolean;
  showUndoRedo?: boolean;
};
```

Standard-Konfiguration (alle `true`):

```tsx
import { DEFAULT_JSON_EDITOR_TOOLBAR_CONFIG } from '@thebuoyant-tsdev/mui-ts-library';
```

### `JsonEditorTranslation`

```ts
type JsonEditorTranslation = {
  format:          string;   // "Format JSON"
  compact:         string;   // "Compact JSON"
  copy:            string;   // "Copy"
  copySuccess:     string;   // "Copied!"
  download:        string;   // "Download"
  downloadSuccess: string;   // "Downloaded!"
  clear:           string;   // "Clear"
  undo:            string;   // "Undo"
  redo:            string;   // "Redo"
  lineColumn:      string;   // "Ln {line}, Col {col}"
  validJson:   string;   // "Valid JSON"
  invalidJson: string;   // "Invalid JSON"
};
```

Englische Standardwerte:

```tsx
import { DEFAULT_JSON_EDITOR_TRANSLATION } from '@thebuoyant-tsdev/mui-ts-library';
```

### `JsonEditorHighlightColors`

```ts
type JsonEditorHighlightColors = {
  propertyName?: string;   // Standard: theme primary.main (fett)
  string?:       string;   // Standard: theme success.main
  number?:       string;   // Standard: theme warning.main
  boolean?:      string;   // Standard: theme info.main
  null?:         string;   // Standard: theme text.secondary
};
```

### `JsonEditorSchema`

```ts
type JsonSchemaType = "string" | "number" | "integer" | "boolean" | "object" | "array" | "null";

type JsonEditorSchema = {
  type?:       JsonSchemaType | JsonSchemaType[];
  properties?: Record<string, JsonEditorSchema>;
  required?:   string[];
  items?:      JsonEditorSchema;
  enum?:       unknown[];
};
```

Eine fokussierte Teilmenge von JSON Schema — keine vollständige Implementierung (kein `$ref`, `oneOf`/`anyOf`, `pattern`, `minimum`/`maximum` usw.). Siehe [Schema-Validierung](#schema-validierung) weiter unten.

---

## Validierung

### Eingebautes Linting

Der `JsonEditor` verwendet intern CodeMirrors `jsonParseLinter` — keine Konfiguration nötig. Syntaxfehler erscheinen als Wellenlinien und Lint-Gutter-Marker in Echtzeit.

### Validierungsstatus-Anzeige

```tsx
{/* "Gültiges JSON" / "Ungültiges JSON" im Footer anzeigen */}
<JsonEditor value={json} showValidation />
```

Die Anzeige ist farbkodiert: Grün (`success.main`) für gültig, Rot (`error.main`) für ungültig.

### `onValidChange`-Callback

```tsx
<JsonEditor
  value={json}
  onValidChange={(isValid) => {
    setKannAbsenden(isValid);
  }}
/>
```

Wird bei jeder Inhaltsänderung ausgelöst, wenn die Gültigkeit zwischen `true` und `false` wechselt.

### Schema-Validierung

```tsx
import type { JsonEditorSchema } from '@thebuoyant-tsdev/mui-ts-library';

const userSchema: JsonEditorSchema = {
  type: 'object',
  required: ['name', 'age'],
  properties: {
    name: { type: 'string' },
    age:  { type: 'number' },
    role: { enum: ['admin', 'member', 'viewer'] },
  },
};

<JsonEditor value={json} schema={userSchema} />
```

Die `schema`-Prop validiert das Dokument strukturell gegen eine **fokussierte Teilmenge von JSON Schema** — `type`, `required`, `enum` sowie verschachtelte `properties`/`items`. Verstöße werden als Inline-Fehler-Diagnostics angezeigt, genau wie Syntaxfehler (rote Wellenlinie + Lint-Gutter-Marker; Hover zeigt die Meldung).

Die Schema-Validierung wird **übersprungen, solange das Dokument kein gültiges JSON ist** — der eingebaute Parse-Linter meldet das bereits, und es gibt noch keine sinnvolle Struktur zum Validieren.

```tsx
// Array-Elemente werden gegen `items` validiert
const listSchema: JsonEditorSchema = {
  type: 'array',
  items: { type: 'object', required: ['id'] },
};

// Mehrere erlaubte Typen
const nullableSchema: JsonEditorSchema = { type: ['string', 'null'] };
```

Das ist **keine vollständige JSON-Schema-Implementierung** — es gibt kein `$ref`, `oneOf`/`anyOf`, `pattern`, `minimum`/`maximum` oder Format-Validatoren. Abgedeckt sind die häufigsten Fälle realer Config-/API-Validierung: hat das Objekt die richtige Form, sind die Pflichtfelder vorhanden, und ist dieser Wert einer der erlaubten Optionen.

---

## Folding

```tsx
{/* Fold-Gutter standardmäßig sichtbar */}
<JsonEditor value={json} />

{/* Fold-Gutter ausblenden */}
<JsonEditor value={json} showFolding={false} />
```

Klick auf den ▾/▸-Pfeil neben einem `{` oder `[` klappt das jeweilige Objekt/Array inline zu — der zusammengeklappte Bereich zeigt einen kleinen Platzhalter, auf den erneut geklickt werden kann, um wieder aufzuklappen. Besonders nützlich für große, tief verschachtelte Dokumente (API-Responses, Config-Dateien). Der Fold-Zustand wird komplett von CodeMirror verwaltet — keine zusätzlichen Props nötig außer `showFolding`.

---

## JSON Path Finder

```tsx
<JsonEditor
  value={json}
  enablePathFinder
  onPathCopy={(path) => console.log('Kopiert:', path)}
/>
```

`Ctrl+Click` (Windows/Linux) oder `Cmd ⌘+Click` (macOS) auf einen beliebigen Wert oder Property-Key kopiert dessen vollständigen JSON-Path in die Zwischenablage — z.B. `$.users[0].address.city` — und zeigt eine kurze "Copied: …"-Bestätigungsblase nahe der Klickstelle. Ein Klick auf den Key oder den Wert derselben Property liefert denselben Pfad.

Standardmäßig aktiviert (`enablePathFinder={true}`); auf `false` setzen, um es zu deaktivieren. Mit `onPathCopy` lässt sich das Feature in eigene UI integrieren (Toast-Benachrichtigung, Verlaufsliste usw.) statt sich auf die eingebaute Blase zu verlassen.

---

## Formatieren und Komprimieren

```tsx
{/* Format-Button verschönert mit 2 Leerzeichen (Standard) */}
<JsonEditor value='{"name":"Alice","age":30}' />

{/* Benutzerdefinierter Einzug */}
<JsonEditor value={json} indent={4} />
```

Der **Komprimieren**-Button minimiert JSON auf eine Zeile. Beide Buttons sind ohne Wirkung, wenn der Inhalt kein gültiges JSON ist.

---

## Kontrollierter Modus

```tsx
const [json, setJson] = useState('{"name":"Alice"}');

<JsonEditor
  value={json}
  onChange={setJson}
  showValidation
/>
```

Externe `value`-Änderungen synchronisieren sich in den Editor, ohne die Cursor-Position zurückzusetzen.

---

## Höhe und Breite

```tsx
{/* Standard: 300px hoch, 100% breit */}
<JsonEditor />

{/* Feste Höhe — Inhalt scrollt vertikal wenn er überläuft */}
<JsonEditor height={500} />

{/* CSS-String direkt möglich */}
<JsonEditor height="50vh" />

{/* "auto" — Editor füllt den umgebenden Flex-Container */}
<Box sx={{ height: 600, display: "flex", flexDirection: "column" }}>
  <JsonEditor height="auto" />
</Box>

{/* Feste Breite */}
<JsonEditor width={800} />
```

**Hinweis zu `height="auto"`:** Der umgebende Container muss `display: flex` und `flex-direction: column` haben.

---

## Readonly und Disabled

```tsx
{/* Kein Editieren, keine Toolbar — reine Darstellung */}
<JsonEditor value={json} readonly showValidation />

{/* Editor ausgegraut, Toolbar deaktiviert */}
<JsonEditor value={json} disabled />
```

---

## Toolbar konfigurieren

Alle Buttons sind standardmäßig sichtbar. Einzelne Buttons lassen sich über `toolbarConfig` ausblenden:

```tsx
<JsonEditor
  toolbarConfig={{
    showFormat:   true,
    showCompact:  false,
    showCopy:     true,
    showDownload: true,   // neu in v3.25.0 — exportiert Inhalt als .json-Datei
    showClear:    false,
    showUndoRedo: false,
  }}
/>
```

Der **Download**-Button verwendet `<a download>` um einen Browser-Datei-Download auszulösen. Der Dateiname ist standardmäßig `"file.json"` und kann überschrieben werden:

```tsx
<JsonEditor downloadFilename="meine-konfiguration.json" />
```

Download-Button ausblenden:

```tsx
<JsonEditor toolbarConfig={{ showDownload: false }} />
```

---

## Form-Integration

### React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { JsonEditor } from '@thebuoyant-tsdev/mui-ts-library';

function MyForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<{ config: string }>();

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Controller
        name="config"
        control={control}
        rules={{
          validate: (v) => {
            try { JSON.parse(v); return true; }
            catch { return 'Ungültiges JSON'; }
          },
        }}
        render={({ field }) => (
          <JsonEditor
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={!!errors.config}
            helperText={errors.config?.message}
            showValidation
          />
        )}
      />
    </form>
  );
}
```

### Native Form-Submission

```tsx
<form action="/submit" method="POST">
  <JsonEditor name="payload" value={json} />
  <button type="submit">Absenden</button>
</form>
```

Der Wert wird über ein verstecktes `<input type="hidden" name="payload">` im Formular mitgeschickt.

---

## i18n — Übersetzungen

Nur abweichende Schlüssel angeben — alle anderen behalten den Standardwert:

```tsx
import { DEFAULT_JSON_EDITOR_TRANSLATION } from '@thebuoyant-tsdev/mui-ts-library';

const DE_TRANSLATION = {
  format:      "JSON formatieren",
  compact:     "JSON komprimieren",
  copy:        "Kopieren",
  copySuccess: "Kopiert!",
  clear:       "Leeren",
  undo:        "Rückgängig",
  redo:        "Wiederholen",
  lineColumn:  "Zeile {line}, Sp. {col}",
  validJson:   "Gültiges JSON",
  invalidJson: "Ungültiges JSON",
};

<JsonEditor translation={DE_TRANSLATION} showValidation />
```

Das Merge-Muster ist `{ ...DEFAULT_JSON_EDITOR_TRANSLATION, ...translation }` — nur überschriebene Schlüssel müssen angegeben werden.

---

## Benutzerdefinierte Highlight-Farben

```tsx
import type { JsonEditorHighlightColors } from '@thebuoyant-tsdev/mui-ts-library';

const colors: JsonEditorHighlightColors = {
  propertyName: '#c678dd',   // Lila — wie One Dark
  string:       '#98c379',   // Grün
  number:       '#d19a66',   // Orange
  boolean:      '#56b6c2',   // Blaugrün
  null:         '#abb2bf',   // Grau
};

<JsonEditor value={json} highlightColors={colors} />
```

---

## Callbacks / Events

> **Welcher Callback feuert bei welcher Aktion?**
>
> | Aktion | Ausgelöste Callbacks |
> |---|---|
> | JSON-Inhalt tippen / bearbeiten | `onChange` · `onValidChange` (wenn Gültigkeit wechselt) |
> | Toolbar: Formatieren oder Komprimieren | `onChange` · `onValidChange` (wenn Gültigkeit wechselt) |
> | Editor erhält Fokus | `onFocus` |
> | Editor verliert Fokus | `onBlur` |
>
> **Hinweis zu `onValidChange`:** Dieser Callback feuert nur wenn die Gültigkeit **wechselt** — nicht bei jedem Tastendruck. Er feuert einmalig wenn gültiges JSON ungültig wird (und umgekehrt).

| Callback | Signatur | Wann ausgelöst | Verwenden wenn... |
|---|---|---|---|
| `onChange` | `(json: string) => void` | Jede Inhaltsänderung (Tippen, Einfügen, Formatieren, Toolbar) | State-Sync im kontrollierten Modus |
| `onValidChange` | `(isValid: boolean) => void` | JSON-Gültigkeit wechselt (gültig → ungültig oder umgekehrt) | Submit-Button aktivieren/deaktivieren, Validierungsanzeige |
| `onFocus` | `() => void` | Editor erhält Tastatur-Fokus | Visuelle Rückmeldung, bedingte UI |
| `onBlur` | `() => void` | Editor verliert Tastatur-Fokus | Validierung auslösen, Auto-Save |

### Ins Backend persistieren — `onChange` debouncen

`onChange` feuert bei **jeder Inhaltsänderung** (Tastendruck, Einfügen, Formatierung). Für lokalen State ist das richtig. Wenn du ins Backend persistierst (z. B. Konfigurations-JSON automatisch speichern), debounce den Backend-Call:

```tsx
import { useCallback, useRef } from "react";

function useDebounce<T extends (...args: Parameters<T>) => void>(fn: T, ms: number): T {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  return useCallback((...args: Parameters<T>) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), ms);
  }, [fn, ms]) as T;
}

function MeinJsonEditor() {
  const [json, setJson] = useState('{"key": "value"}');

  const saveToBackend = useDebounce((value: string) => {
    api.saveConfig(value);
  }, 500);

  return (
    <JsonEditor
      value={json}
      onChange={(value) => {
        setJson(value);          // sofort — für den kontrollierten State
        saveToBackend(value);    // gedebounced — für das Backend
      }}
    />
  );
}
```

> **Hinweis:** `onValidChange` feuert nur bei Gültigkeitswechseln (nicht bei jedem Tastendruck) — kein Debounce nötig.

---

## Storybook-Stories

| Story | Beschreibung |
|---|---|
| `Default` | Leerer Editor mit Platzhalter |
| `WithJson` | Vorbefüllt mit einem gültigen JSON-Objekt |
| `WithValidation` | Gültiges JSON + `showValidation`-Anzeige |
| `InvalidJson` | Ungültiges JSON + `showValidation` zeigt Fehler |
| `CompactJson` | Vorbefüllt mit minimiertem JSON |
| `WithFixedHeight` | Großer Datensatz mit fixer Höhe von 200px |
| `WithAutoHeight` | Editor füllt einen umgebenden Flex-Container |
| `Controlled` | Kontrollierter Modus mit `showValidation` |
| `IndentFour` | Formatieren mit 4 Leerzeichen Einzug |
| `ReadOnly` | Keine Toolbar, schreibgeschützte Darstellung |
| `Disabled` | Ausgegraut, nicht editierbar |
| `WithError` | Roter Rahmen + Hilfetext |
| `NoLineNumbers` | Keine Zeilennummern oder Cursor-Footer |
| `CustomHighlightColors` | One-Dark-inspiriertes Farbschema |
| `GermanTranslation` | Vollständig übersetzte Toolbar und Validierungslabels |
| `LargeDataset` | 20-Element-Array, 500px Höhe |
| `WithMinimap` | Großer Datensatz mit aktiviertem Minimap-Panel |
| `ApiResponseViewer` | Schreibgeschützter REST-API-Response-Inspektor |
| `WebhookPayloadInspector` | Stripe-artiges Webhook-Event-Payload mit Validierung |
| `WithFolding` | Großer Datensatz zur Demonstration des Fold-Gutters |
| `WithPathFinder` | `Ctrl+Click` auf einen Wert kopiert dessen JSON-Path |
| `WithSchemaValidation` | Vorbefüllt mit Schema-Verstoß (fehlendes Feld + ungültiger Enum-Wert) |

---

## Minimap

Die `showMinimap`-Prop fügt ein **80 px breites Minimap-Panel** auf der rechten Seite des Editors hinzu. Es rendert eine komprimierte Vogelperspektive des gesamten Dokuments und ermöglicht per Klick oder Drag direktes Springen zu beliebigen Positionen — besonders nützlich bei großen JSON-Dateien mit Hunderten von Zeilen.

```tsx
<JsonEditor
  value={largesJSON}
  height="500"
  showMinimap
/>
```

Die Minimap wird von [`@replit/codemirror-minimap`](https://www.npmjs.com/package/@replit/codemirror-minimap) (MIT-Lizenz, 1 transitive Abhängigkeit) gerendert. Sie ist opt-in (`showMinimap={false}` standardmäßig) — kein Bundle-Einfluss wenn nicht verwendet.

---

## Architektur-Entscheidungen

| Thema | Entscheidung |
|---|---|
| **`jsonParseLinter`** | In `@codemirror/lang-json` eingebaut — kein eigenes Linting nötig; CodeMirror verwaltet Fehlerpositionen automatisch |
| **Validierungs-State im Parent** | `isValid` wird in `JsonEditor` (nicht in `JsonEditorContent`) via `JSON.parse` bei jedem `onChange` berechnet — hält die Content-Komponente zustandsfrei |
| **Format / Komprimieren sind bei ungültigem JSON ohne Wirkung** | `try { JSON.parse(...) }` lässt den Editor unverändert wenn der Inhalt nicht parsebar ist |
| **Gleiches Layout wie SqlEditor** | `Paper`-Wrapper, `Toolbar` + `Divider` + `Content` + optionaler `Footer` — konsistent mit der restlichen Bibliothek |
| **`normalizeSize()`** | Konvertiert numerische Strings (`"300"`) zu Zahlen, damit MUI `px` anhängt — ermöglicht Storybook-Text-Controls |
| **Dark Mode** | Alle Farben werden aus `useTheme()` bezogen — reagiert automatisch auf MUI-Theme-Moduswechsel |
| **Folding-Implementierung** | `@codemirror/lang-json` markiert `Object`/`Array`-Knoten bereits als faltbar (`foldNodeProp`) — `showFolding` fügt nur `foldGutter()` + `foldKeymap` hinzu, keine eigene Fold-Logik nötig |
| **Path-Finder-Implementierung** | Läuft den Lezer-JSON-Syntaxbaum von der Klick-Position bis zur Wurzel hoch, liest `PropertyName`-Text und zählt `Array`-Geschwister — kein erneutes JSON-Parsing nötig. `posAtCoords` ist in try/catch gekapselt, da es werfen kann, wenn der Klick vor abgeschlossenem Layout erfolgt |
| **Schema-Validierungsfehler → Quell-Bereich** | Fehler werden gegen den *geparsten* Wert berechnet (keine Positionsinfo), dann läuft ein Pfad-zu-Bereich-Resolver den Syntaxbaum von der Wurzel wieder *hinunter*, um den passenden Knoten zu finden. "Missing required property"-Fehler zeigen auf das *umschließende* Objekt, da der fehlende Key keinen eigenen Bereich hat |
| **Keine JSON-Schema-Abhängigkeit** | Der Validator ist eine kleine, fokussierte Implementierung für `type`/`required`/`enum`/verschachtelte Strukturen — bewusst keine vollständige JSON-Schema-Implementierung (kein `ajv` o.ä.), um die Bundle-Größe von `JsonEditor` vorhersehbar zu halten |
