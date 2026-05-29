# JsonEditor — Benutzerhandbuch

> [English Version →](JsonEditor.md)

**Echtzeit-JSON-Validierung mit Inline-Fehlermarkierungen, Format- und Komprimieren-Buttons und optionaler Minimap — im gewohnten MUI-Paper-Layout.** `JsonEditor` in Konfigurations-Panels, API-Explorern und Developer-Tools einsetzen, wo Nutzer JSON ansehen, bearbeiten oder validieren müssen.

## Überblick

Der `JsonEditor` ist ein vollständiger JSON-Code-Editor auf Basis von [CodeMirror 6](https://codemirror.net/) und Material UI. Er bietet Echtzeit-JSON-Validierung mit Inline-Fehlermarkern, Format- (Pretty-Print) und Komprimieren-Schaltflächen sowie einen Validierungsstatus-Anzeiger im Footer — alles im selben MUI-Paper-Layout wie der `SqlEditor`.

**Typische Einsatzgebiete:**

- API-Konfigurationspanels in Admin-Dashboards
- JSON-Payload-Editoren in Entwicklertools
- Konfigurationsdatei-Editoren in Einstellungsscreens
- Request-Body-Editoren in REST-API-Explorern
- Debug-Ansichten mit direkter JSON-Bearbeitung

---

> ### ✨ Neu in v1.5.0
>
> | Feature | Beschreibung | Springe zu |
> |---|---|---|
> | **`showMinimap`** | Minimap-Panel für schnelle Navigation in großen Dokumenten | [→ Minimap](#minimap) |

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
import { JsonEditor } from '@thebuoyant-tsdev/mui-ts-library';

function App() {
  return (
    <JsonEditor
      placeholder="JSON eingeben …"
      showValidation
      onChange={(json) => console.log(json)}
    />
  );
}
```

---

## Props

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `disabled` | `boolean` | `false` | Deaktiviert Editor und Toolbar vollständig |
| `error` | `boolean` | `false` | Roter Rahmen im Fehlerzustand |
| `height` | `number \| string` | `300` | Gesamthöhe (Toolbar + Inhalt). Zahlen → px. `"auto"` → füllt den umgebenden Flex-Container. |
| `helperText` | `string` | — | Hilfetext unter dem Editor (wie MUI TextField) |
| `highlightColors` | `JsonEditorHighlightColors` | — | Syntax-Highlight-Farben überschreiben |
| `indent` | `number` | `2` | Leerzeichen-Einzug für die Format-Schaltfläche |
| `name` | `string` | — | Name für natives Form-Submit (verstecktes `<input type="hidden">`) |
| `placeholder` | `string` | — | Platzhaltertext wenn der Editor leer ist |
| `readonly` | `boolean` | `false` | Schreibgeschützter Modus — keine Toolbar |
| `showLineColumn` | `boolean` | `true` | Cursor-Position im Footer anzeigen (Ln / Sp.) |
| `showLineNumbers` | `boolean` | `true` | Zeilennummern-Gutter anzeigen |
| `showMinimap` | `boolean` | `false` | Zeigt eine verkleinerte Dokumentenübersicht (Minimap) auf der rechten Seite des Editors an. Nützlich für die Navigation in großen JSON-Dateien. |
| `showValidation` | `boolean` | `false` | „Gültiges JSON" / „Ungültiges JSON"-Anzeige im Footer |
| `toolbarConfig` | `JsonEditorToolbarConfig` | alle `true` | Einzelne Toolbar-Buttons ein-/ausblenden |
| `translation` | `Partial<JsonEditorTranslation>` | — | Abweichende Texte für Tooltips und Footer |
| `value` | `string` | — | Kontrollierter Wert — der im Editor angezeigte JSON-String |
| `width` | `number \| string` | `"100%"` | Breite. Zahlen → px. Leer oder nicht gesetzt → 100% des Elternelements. |
| `onBlur` | `() => void` | — | Wird aufgerufen wenn der Editor den Fokus verliert |
| `onChange` | `(json: string) => void` | — | Wird bei jeder Inhaltsänderung aufgerufen |
| `onFocus` | `() => void` | — | Wird aufgerufen wenn der Editor den Fokus erhält |
| `onValidChange` | `(isValid: boolean) => void` | — | Wird aufgerufen, wenn sich die JSON-Gültigkeit ändert |

---

## TypeScript-Typen

### `JsonEditorToolbarConfig`

```ts
type JsonEditorToolbarConfig = {
  showFormat?:   boolean;
  showCompact?:  boolean;
  showCopy?:     boolean;
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
  format:      string;   // "Format JSON"
  compact:     string;   // "Compact JSON"
  copy:        string;   // "Copy"
  copySuccess: string;   // "Copied!"
  clear:       string;   // "Clear"
  undo:        string;   // "Undo"
  redo:        string;   // "Redo"
  lineColumn:  string;   // "Ln {line}, Col {col}"
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

Nur Format und Kopieren, ohne Komprimieren, Leeren und Rückgängig/Wiederholen:

```tsx
<JsonEditor
  toolbarConfig={{
    showFormat:   true,
    showCompact:  false,
    showCopy:     true,
    showClear:    false,
    showUndoRedo: false,
  }}
/>
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

## API-Callbacks

| Callback | Signatur | Auslöser |
|---|---|---|
| `onChange` | `(json: string) => void` | Jede Inhaltsänderung (Tippen, Formatieren, Einfügen) |
| `onValidChange` | `(isValid: boolean) => void` | Wenn die JSON-Gültigkeit wechselt |
| `onBlur` | `() => void` | Editor verliert den Fokus |
| `onFocus` | `() => void` | Editor erhält den Fokus |

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
