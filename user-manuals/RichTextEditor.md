# RichTextEditor — Benutzerhandbuch

## Überblick

Der `RichTextEditor` ist ein vollständiger WYSIWYG-Texteditor auf Basis von [TipTap v3](https://tiptap.dev) und Material UI. Er bietet eine formatreiche Eingabeoberfläche für Inhalte wie CMS-Texte, E-Mail-Templates, Kommentare und Beschreibungsfelder — vollständig in das MUI-Theme integriert, ohne externe CSS-Abhängigkeiten.

**Typische Einsatzgebiete:**

- CMS-Formulare und Content-Management
- Beschreibungsfelder in Ticketsystemen oder Projektmanagement-Tools
- E-Mail-Template-Editoren
- Kommentarfelder mit Formatierungsmöglichkeiten
- Formularfelder die mehr als `<TextField multiline>` benötigen

---

## Technische Voraussetzungen

| Abhängigkeit | Mindestversion |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 7 |
| `@tiptap/react` | 3.x |
| `@tiptap/starter-kit` | 3.x |
| `@tiptap/extension-placeholder` | 3.x |
| `@tiptap/extension-character-count` | 3.x |

---

## Import

```tsx
import { RichTextEditor } from 'mui-ts-library';
import type {
  RichTextEditorProps,
  RichTextEditorOutputFormat,
  RichTextEditorToolbarConfig,
  RichTextEditorTranslation,
  DEFAULT_RICH_TEXT_EDITOR_TRANSLATION,
  DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG,
} from 'mui-ts-library';
```

---

## Schnellstart

```tsx
import { RichTextEditor } from 'mui-ts-library';

function App() {
  return (
    <RichTextEditor
      placeholder="Hier tippen …"
      onChange={(html) => console.log(html)}
    />
  );
}
```

---

## Props

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `value` | `string` | — | Initialwert als HTML- oder JSON-String; ermöglicht kontrollierten Modus |
| `onChange` | `(value: string) => void` | — | Wird bei jeder Inhaltsänderung aufgerufen |
| `placeholder` | `string` | — | Platzhaltertext wenn der Editor leer ist |
| `outputFormat` | `RichTextEditorOutputFormat` | `"html"` | Ausgabeformat für `onChange` — `"html"` oder `"json"` |
| `minHeight` | `number \| string` | `120` | Mindesthöhe des Editorbereichs |
| `maxHeight` | `number \| string` | — | Maximale Höhe (überschüssiger Inhalt scrollt) |
| `showCharacterCount` | `boolean` | `false` | Zeigt Zeichenzähler unten rechts |
| `maxCharacters` | `number` | — | Maximale Zeichenanzahl — Eingabe wird bei Erreichen blockiert |
| `toolbarConfig` | `RichTextEditorToolbarConfig` | alle `true` | Einzelne Toolbar-Buttons ein-/ausblenden |
| `disabled` | `boolean` | `false` | Deaktiviert Editor und Toolbar vollständig |
| `readonly` | `boolean` | `false` | Schreibgeschützter Modus — keine Toolbar |
| `name` | `string` | — | Name für natives Form-Submit (verstecktes `<input type="hidden">`) |
| `error` | `boolean` | `false` | Roter Rahmen im Fehlerzustand |
| `helperText` | `string` | — | Hilfetext unter dem Editor (wie MUI TextField) |
| `translation` | `Partial<RichTextEditorTranslation>` | — | Abweichende Texte für Tooltips, Dialog und Zeichenzähler |
| `onBlur` | `() => void` | — | Wird aufgerufen wenn der Editor den Fokus verliert |
| `onFocus` | `() => void` | — | Wird aufgerufen wenn der Editor den Fokus erhält |

---

## TypeScript-Typen

### `RichTextEditorOutputFormat`

```ts
type RichTextEditorOutputFormat = "html" | "json";
```

### `RichTextEditorToolbarConfig`

```ts
type RichTextEditorToolbarConfig = {
  showBold?:           boolean;
  showItalic?:         boolean;
  showUnderline?:      boolean;
  showStrike?:         boolean;
  showHeading1?:       boolean;
  showHeading2?:       boolean;
  showHeading3?:       boolean;
  showBulletList?:     boolean;
  showOrderedList?:    boolean;
  showBlockquote?:     boolean;
  showCodeBlock?:      boolean;
  showLink?:           boolean;
  showHorizontalRule?: boolean;
  showUndoRedo?:       boolean;
  showClearFormat?:    boolean;
};
```

Standard-Konfiguration (alle `true`):

```tsx
import { DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG } from 'mui-ts-library';
```

### `RichTextEditorTranslation`

```ts
type RichTextEditorTranslation = {
  // Toolbar-Tooltips
  bold:             string;
  italic:           string;
  underline:        string;
  strike:           string;
  heading1:         string;
  heading2:         string;
  heading3:         string;
  bulletList:       string;
  orderedList:      string;
  blockquote:       string;
  codeBlock:        string;
  link:             string;
  horizontalRule:   string;
  textColor:        string;
  removeTextColor:  string;
  highlight:        string;
  removeHighlight:  string;
  undo:             string;
  redo:             string;
  clearFormat:      string;
  // Link-Dialog
  linkDialogTitle:    string;
  linkDialogUrlLabel: string;
  linkDialogSave:     string;
  linkDialogCancel:   string;
  linkDialogRemove:   string;
  // Zeichenzähler ({count} und {max} werden zur Laufzeit ersetzt)
  characterCount:    string;
  characterCountMax: string;
};
```

Englische Standardwerte:

```tsx
import { DEFAULT_RICH_TEXT_EDITOR_TRANSLATION } from 'mui-ts-library';
```

---

## Ausgabeformat

### HTML (Standard)

`onChange` liefert einen HTML-String, z. B.:

```html
<h2>Titel</h2><p>Text mit <strong>Fett</strong> und <em>Kursiv</em>.</p>
```

### JSON

```tsx
<RichTextEditor outputFormat="json" onChange={(json) => JSON.parse(json)} />
```

Der JSON-String entspricht dem TipTap/ProseMirror-Dokumentformat (kann direkt zurück an `value` übergeben werden).

---

## Kontrollierter Modus

```tsx
const [content, setContent] = useState('<p>Initialinhalt</p>');

<RichTextEditor
  value={content}
  onChange={setContent}
/>
```

Der Editor synchronisiert `value` → `editor.setContent()` automatisch, wenn sich der externe Wert ändert — ohne den Cursor zu verstellen.

---

## Textfarbe und Hervorhebung

Text markieren und über die Toolbar-Buttons **Textfarbe** (A-Icon) oder **Hervorheben** (Pinsel-Icon) eine Farbe aus der Palette wählen:

```tsx
<RichTextEditor placeholder="Markiere Text, dann wähle eine Farbe …" />
```

Beide Buttons zeigen eine farbige Indikatorlinie unter dem Icon — die zuletzt verwendete oder am Cursor aktive Farbe. Über den Regenbogen-Swatch in der Palette ist ein freier Farbwähler (nativer Browser-Picker) verfügbar. Der Papierkorb-Button entfernt die Farbe wieder.

Über `toolbarConfig` lassen sich beide Buttons einzeln ausblenden:

```tsx
<RichTextEditor
  toolbarConfig={{ showTextColor: false, showHighlight: false }}
/>
```

---

## Toolbar konfigurieren

Nur Bold, Italic und Underline:

```tsx
import { DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG } from 'mui-ts-library';

<RichTextEditor
  toolbarConfig={{
    ...DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG,
    showHeading1: false,
    showHeading2: false,
    showHeading3: false,
    showBulletList: false,
    showOrderedList: false,
    showBlockquote: false,
    showCodeBlock: false,
    showLink: false,
    showHorizontalRule: false,
    showUndoRedo: false,
    showClearFormat: false,
  }}
/>
```

---

## Zeichenbegrenzung

```tsx
{/* Nur Anzeige, keine Begrenzung */}
<RichTextEditor showCharacterCount />

{/* Anzeige + Begrenzung auf 500 Zeichen */}
<RichTextEditor maxCharacters={500} />
```

Der Zähler färbt sich rot wenn das Limit erreicht ist.

---

## Readonly und Disabled

```tsx
{/* Kein Editieren, keine Toolbar — reine Darstellung */}
<RichTextEditor value={content} readonly />

{/* Editor ausgegraut, Toolbar deaktiviert */}
<RichTextEditor value={content} disabled />
```

---

## Form-Integration

### React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { RichTextEditor } from 'mui-ts-library';

function MyForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<{ description: string }>();

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Controller
        name="description"
        control={control}
        rules={{ required: 'Beschreibung ist erforderlich' }}
        render={({ field }) => (
          <RichTextEditor
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={!!errors.description}
            helperText={errors.description?.message}
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
  <RichTextEditor name="content" />
  <button type="submit">Absenden</button>
</form>
```

Der Wert wird über ein verstecktes `<input type="hidden" name="content">` im Formular mitgeschickt.

---

## i18n — Übersetzungen

Nur abweichende Schlüssel angeben — alle anderen behalten den Standardwert:

```tsx
import { DEFAULT_RICH_TEXT_EDITOR_TRANSLATION } from 'mui-ts-library';

const DE_TRANSLATION = {
  bold:             "Fett",
  italic:           "Kursiv",
  underline:        "Unterstrichen",
  strike:           "Durchgestrichen",
  heading1:         "Überschrift 1",
  heading2:         "Überschrift 2",
  heading3:         "Überschrift 3",
  bulletList:       "Aufzählung",
  orderedList:      "Nummerierte Liste",
  blockquote:       "Zitat",
  codeBlock:        "Code-Block",
  link:             "Link einfügen",
  horizontalRule:   "Trennlinie",
  textColor:        "Textfarbe",
  removeTextColor:  "Textfarbe entfernen",
  highlight:        "Hervorheben",
  removeHighlight:  "Hervorhebung entfernen",
  undo:             "Rückgängig",
  redo:             "Wiederholen",
  clearFormat:      "Formatierung löschen",
  linkDialogTitle:    "Link einfügen",
  linkDialogUrlLabel: "URL",
  linkDialogSave:     "Speichern",
  linkDialogCancel:   "Abbrechen",
  linkDialogRemove:   "Link entfernen",
  characterCount:    "{count} Zeichen",
  characterCountMax: "{count} / {max} Zeichen",
};

<RichTextEditor translation={DE_TRANSLATION} />
```

Das Merge-Muster ist `{ ...DEFAULT_RICH_TEXT_EDITOR_TRANSLATION, ...translation }` — nur überschriebene Schlüssel müssen angegeben werden.

---

## Fehlerzustand

```tsx
<RichTextEditor
  error={true}
  helperText="Dieses Feld ist erforderlich."
/>
```

Der Editor-Rahmen erscheint in `error.main` (MUI-Fehlerfarbe), der `helperText` darunter ebenfalls in Rot — analog zum MUI `TextField`.

---

## API-Callbacks

| Callback | Signatur | Auslöser |
|---|---|---|
| `onChange` | `(value: string) => void` | Jede Inhaltsänderung (Tippen, Formatieren, Einfügen) |
| `onBlur` | `() => void` | Editor verliert den Fokus |
| `onFocus` | `() => void` | Editor erhält den Fokus |

**Wichtig:** `onChange` feuert NICHT wenn `value` von außen über die Prop gesetzt wird (externer Sync via `setContent`). Dies verhindert Endlosschleifen im kontrollierten Modus.

---

## Architektur-Entscheidungen

| Thema | Entscheidung |
|---|---|
| **Kein Zustand-Store** | TipTap `useEditor` verwaltet den Editor-State intern |
| **Kein CSS** | Ausschließlich MUI `sx`-Prop und `.ProseMirror`-Selector |
| **TipTap v3** | StarterKit enthält bereits `Link` und `Underline` — keine separaten Imports |
| **`shouldRerenderOnTransaction: true`** | Notwendig in TipTap v3 damit Toolbar-Buttons ihren aktiven Zustand reflektieren |
| **`onMouseDown` preventDefault** | Jeder Toolbar-Button verhindert damit das Blur des Editors beim Klicken |
