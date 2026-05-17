# RichTextEditor — Implementierungsplan

> **Session-Recovery-Dokument.** Dieses File wird am Ende jeder Session auf den aktuellen Stand gebracht.
> Eine neue Session liest es zuerst, bevor sie Quellcode anfasst.

---

## Metadaten

| | |
|---|---|
| **Komponenten-Name** | `RichTextEditor` |
| **Basis-Library** | TipTap (`@tiptap/react` + Extensions) |
| **Branch** | vom User angelegt (Feature-Branch) |
| **Aktueller Status** | ✅ Abgeschlossen — alle Phasen fertig |
| **Letzter Stand** | 2026-05-17 |

---

## Projekthintergrund (für neue Sessions)

`mui-ts-library` ist eine typsichere React-Komponentenbibliothek auf Basis von TypeScript + MUI v7.
Bestehende Komponenten: `GanttChart`, `TagSelection`, `PasswordStrengthMeter`.

**Verbindliche Conventions (aus memory/feedback_conventions.md):**
- Alle Code-Kommentare **ausschließlich auf Deutsch** — nur wenn das WHY nicht-offensichtlich ist
- Alle Vitest-Tests beginnen mit `it("Should ...)` — Verb im Infinitiv
- Exportierte `DEFAULT_*`-Konstanten in `*.types.ts` statt Inline-Defaults
- `translation?: Partial<TranslationType>` — Merge-Pattern: `const t = { ...DEFAULT_*, ...translation }`
- Kein CSS — ausschließlich MUI `sx`-Prop
- Kein Zustand-Store nötig (TipTap verwaltet seinen eigenen State intern via `useEditor`)

---

## Dateistruktur (Ziel)

```
src/components/rich-text-editor/
├── RichTextEditor.tsx                — Hauptkomponente
├── RichTextEditor.types.ts           — Alle Typen + DEFAULT_* Konstanten
├── RichTextEditor.stories.tsx        — 10 Storybook Stories
├── RichTextEditor.test.tsx           — Haupt-Integrationstests (≥ 14 Tests)
├── RichTextEditorToolbar.tsx         — MUI-styled Toolbar mit allen Buttons
├── RichTextEditorToolbar.test.tsx    — Toolbar-spezifische Tests (≥ 6 Tests)
├── RichTextEditorContent.tsx         — EditorContent-Wrapper + MUI-Styling
├── RichTextEditorLinkDialog.tsx      — MUI Dialog für Link-Einfügen/Bearbeiten
├── RichTextEditorFooter.tsx          — Zeichenzähler + helperText (FormHelperText)
└── util/
    └── rich-text-editor.util.ts      — Hilfsfunktionen (HTML↔JSON, Leerprüfung)
```

---

## Abhängigkeiten (npm install)

```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-underline @tiptap/extension-link @tiptap/extension-placeholder @tiptap/extension-character-count
```

**Was jedes Paket liefert:**

| Paket | Inhalt |
|---|---|
| `@tiptap/react` | Core: `useEditor`, `EditorContent` |
| `@tiptap/starter-kit` | Bold, Italic, Strike, Code, Heading (H1–H6), BulletList, OrderedList, Blockquote, HorizontalRule, History (Undo/Redo) |
| `@tiptap/extension-underline` | Underline (nicht in StarterKit enthalten) |
| `@tiptap/extension-link` | Link einfügen/bearbeiten/entfernen |
| `@tiptap/extension-placeholder` | Placeholder-Text wenn Editor leer |
| `@tiptap/extension-character-count` | Zeichenzähler + Limit-Enforcement |

---

## Vollständige Typen-Definitionen (`RichTextEditor.types.ts`)

```ts
export type RichTextEditorOutputFormat = "html" | "json";

export type RichTextEditorToolbarConfig = {
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

export const DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG: Required<RichTextEditorToolbarConfig> = {
  showBold:           true,
  showItalic:         true,
  showUnderline:      true,
  showStrike:         true,
  showHeading1:       true,
  showHeading2:       true,
  showHeading3:       true,
  showBulletList:     true,
  showOrderedList:    true,
  showBlockquote:     true,
  showCodeBlock:      true,
  showLink:           true,
  showHorizontalRule: true,
  showUndoRedo:       true,
  showClearFormat:    true,
};

export type RichTextEditorTranslation = {
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

export const DEFAULT_RICH_TEXT_EDITOR_TRANSLATION: RichTextEditorTranslation = {
  bold:             "Bold",
  italic:           "Italic",
  underline:        "Underline",
  strike:           "Strikethrough",
  heading1:         "Heading 1",
  heading2:         "Heading 2",
  heading3:         "Heading 3",
  bulletList:       "Bullet list",
  orderedList:      "Numbered list",
  blockquote:       "Blockquote",
  codeBlock:        "Code block",
  link:             "Insert link",
  horizontalRule:   "Horizontal rule",
  undo:             "Undo",
  redo:             "Redo",
  clearFormat:      "Clear formatting",
  linkDialogTitle:    "Insert link",
  linkDialogUrlLabel: "URL",
  linkDialogSave:     "Save",
  linkDialogCancel:   "Cancel",
  linkDialogRemove:   "Remove link",
  characterCount:    "{count} characters",
  characterCountMax: "{count} / {max} characters",
};

export type RichTextEditorProps = {
  // Kontrollierter Modus — HTML- oder JSON-String als Initialwert und Ausgabe
  value?: string;
  onChange?: (value: string) => void;
  // Darstellung
  placeholder?:    string;
  outputFormat?:   RichTextEditorOutputFormat;
  minHeight?:      number | string;
  maxHeight?:      number | string;
  // Zeichenzähler
  showCharacterCount?: boolean;
  maxCharacters?:      number;
  // Toolbar-Konfiguration
  toolbarConfig?: RichTextEditorToolbarConfig;
  // Zustand
  disabled?: boolean;
  readonly?: boolean;
  // Form-Integration (React Hook Form, Formik, native Forms)
  name?:       string;
  error?:      boolean;
  helperText?: string;
  // i18n — nur abweichende Keys angeben
  translation?: Partial<RichTextEditorTranslation>;
  // Callbacks
  onBlur?:  () => void;
  onFocus?: () => void;
};
```

---

## Storybook Stories (10 Stück)

| Story | Beschreibung |
|---|---|
| `Default` | Leerer Editor, alle Features aktiv, alle Callbacks via `fn()` |
| `WithInitialValue` | Vorausgefüllter HTML-Inhalt mit Formatierungen |
| `Controlled` | Kontrollierter Modus — eigene Wrapper-Komponente `ControlledStory` mit `useState` |
| `MinimalToolbar` | Nur Bold, Italic, Underline — via `toolbarConfig` |
| `ReadOnly` | Schreibgeschützter Inhalt, keine Toolbar |
| `Disabled` | Deaktivierter Zustand, Toolbar ausgegraut |
| `WithCharacterCount` | `showCharacterCount={true}` sichtbar unten rechts |
| `WithMaxCharacters` | `maxCharacters={200}` — Limit wird durchgesetzt |
| `WithError` | `error={true}` + `helperText="Pflichtfeld."` |
| `GermanTranslation` | Vollständige deutsche Übersetzung aller Texte |

**meta argTypes:** `disabled`, `readonly`, `showCharacterCount`, `outputFormat` als Controls; alle Callbacks via `fn()`.

---

## Vitest Tests

### `RichTextEditor.test.tsx` (≥ 14 Tests)

```
it("Should render the editor area")
it("Should render the toolbar")
it("Should show placeholder text when editor is empty")
it("Should apply bold formatting when bold button is clicked")
it("Should apply italic formatting when italic button is clicked")
it("Should apply underline formatting when underline button is clicked")
it("Should call onChange with HTML content when text is entered")
it("Should disable all toolbar buttons when disabled is true")
it("Should not render toolbar when readonly is true")
it("Should show character count when showCharacterCount is true")
it("Should not exceed maxCharacters limit")
it("Should show error border when error is true")
it("Should show helperText below the editor")
it("Should open link dialog when link button is clicked")
it("Should hide toolbar buttons based on toolbarConfig")
```

### `RichTextEditorToolbar.test.tsx` (≥ 6 Tests)

```
it("Should render all toolbar buttons by default")
it("Should hide bold button when showBold is false")
it("Should hide undo/redo buttons when showUndoRedo is false")
it("Should show tooltips matching translation")
it("Should disable all buttons when disabled prop is true")
it("Should mark bold button as active when selection is bold")
```

---

## Implementierungsphasen

### Phase 0 — Vorbereitung ✅
- [x] TipTap-Packages installieren (npm-Befehl oben)
- [x] Ordner `src/components/rich-text-editor/` anlegen

### Phase 1 — Typen & Grundstruktur ✅
- [x] `RichTextEditor.types.ts` — vollständig nach obiger Spezifikation
- [x] `RichTextEditor.tsx` — Hauptkomponente mit `useEditor`, alle Extensions konfigurieren, Props verdrahten
- [x] `RichTextEditorContent.tsx` — `EditorContent` in MUI `Box` gewrappt, TextField-ähnliches Styling (Border, Focus-Ring, Hover, `error`-Farbe)
- [x] Re-Export in `src/index.ts`
- [x] ESLint-Check: `npx eslint src/components/rich-text-editor/`

### Phase 2 — Toolbar ✅
- [x] `RichTextEditorToolbar.tsx` — alle Buttons als MUI `IconButton` + `Tooltip`
- [x] Aktiv-Status pro Button (TipTap `editor.isActive(...)`)
- [x] Gruppentrennlinie `Divider` zwischen logischen Gruppen (Text / Überschriften / Listen / Sonstiges / History)
- [x] `toolbarConfig`-Integration (alle `showX`-Flags)
- [x] `disabled`-Prop deaktiviert alle Buttons

### Phase 3 — Features ✅
- [x] `RichTextEditorLinkDialog.tsx` — MUI Dialog: URL-Input, Speichern / Abbrechen / Link entfernen
- [x] `RichTextEditorFooter.tsx` — Zeichenzähler rechts + `FormHelperText` links (wie MUI TextField)
- [x] `readonly`-Modus: `editable={false}` an TipTap, keine Toolbar
- [x] `outputFormat` — Ausgabe wahlweise als HTML-String (`editor.getHTML()`) oder JSON-String (`JSON.stringify(editor.getJSON())`)
- [x] Kontrollierter Modus: `value`-Prop sync über `editor.commands.setContent()`

### Phase 4 — Form-Integration & i18n ✅
- [x] `name`-Prop — verstecktes `<input type="hidden">` für native Form-Submission
- [x] `error` / `helperText` — roter Border + `FormHelperText`
- [x] `onBlur` / `onFocus` — via TipTap `onBlur`/`onFocus`-Hooks
- [x] `translation`-Prop vollständig verdrahtet (alle Tooltips, Dialog-Labels, Zeichenzähler)
- [x] Merge-Pattern: `const t = { ...DEFAULT_RICH_TEXT_EDITOR_TRANSLATION, ...translation }`

### Phase 5 — Stories, Tests, Dokumentation ✅
- [x] `RichTextEditor.stories.tsx` — alle 10 Stories nach obiger Liste
- [x] `RichTextEditor.test.tsx` — 15 Tests
- [x] `RichTextEditorToolbar.test.tsx` — 6 Tests
- [x] `npx vitest run` — 258 Tests grün (inkl. alle bestehenden)
- [x] `npx eslint src/` — 0 Errors, 0 Warnings
- [x] `README.md` — RichTextEditor-Abschnitt ergänzen
- [x] `user-manuals/RichTextEditor.md` — vollständiges Benutzerhandbuch
- [x] `ideas.md` — RichTextEditor als implementiert markiert
- [x] `memory/project_library_status.md` — Stand aktualisieren
- [x] Dieses Dokument: Status auf ✅ Abgeschlossen gesetzt

---

## TipTap v3 — Wichtige Erkenntnisse (für künftige Sessions)

| Problem | Ursache | Lösung |
|---|---|---|
| Duplicate extension warning | TipTap v3 StarterKit enthält bereits `Link` und `Underline` | Nur `StarterKit.configure({ link: { openOnClick: false } })`, keine separaten Imports |
| Toolbar `aria-pressed` nicht reaktiv | `useEditor` re-rendert in v3 NICHT bei jedem Transaction (breaking change) | `shouldRerenderOnTransaction: true` in `useEditor` |
| Toolbar-Button blendet Editor aus | Mousedown auf Button triggert blur des Editors | `onMouseDown={(e) => e.preventDefault()}` auf jedem ToolbarButton |

---

## Wichtige Architekturentscheidungen

| Thema | Entscheidung | Begründung |
|---|---|---|
| Kein Zustand-Store | TipTap `useEditor` ist selbst der State | Kein Zustand nötig — TipTap ist intern vollständig reaktiv |
| Kontrollierter Modus | `editor.commands.setContent(value)` bei `value`-Änderung | TipTap ist primär unkontrolliert — `value` ist ein Initialwert / externer Sync |
| Styling | Kein CSS, nur MUI `sx` | Convention der Library — TipTap ist headless, kein Stylesheet-Konflikt |
| `editorProps.attributes` | `{ class: "rte-content" }` für gezieltes globalen CSS wenn nötig | TipTap rendert natives `<div contenteditable>` — Inline-Styling über `sx` am Wrapper |
| Link-Dialog | Eigener MUI-Dialog statt TipTap Bubble-Menu | Konsistent mit dem GanttChart-Dialog-Pattern der Library |
| Output | HTML als Default | Universell kompatibel — JSON als opt-in für TipTap-native Pipelines |

---

## Typische MUI-Styling-Herausforderung

TipTap rendert natives `<div contenteditable>`. Das `sx`-Prop gilt für den Wrapper, nicht den Inhalt.
Für die Inhaltsformatierung (Absätze, Listen, `<h1>`-Tags etc.) muss `sx` global auf `.ProseMirror` zielen:

```tsx
<Box
  sx={{
    border: 1,
    borderColor: error ? 'error.main' : 'divider',
    borderRadius: 1,
    '& .ProseMirror': {
      minHeight,
      maxHeight,
      overflow: 'auto',
      p: 1.5,
      outline: 'none',
      '& h1': { typography: 'h4', mb: 1 },
      '& h2': { typography: 'h5', mb: 1 },
      '& h3': { typography: 'h6', mb: 1 },
      '& ul, & ol': { pl: 3 },
      '& blockquote': { borderLeft: 4, borderColor: 'divider', pl: 2, color: 'text.secondary' },
      '& code': { bgcolor: 'action.hover', px: 0.5, borderRadius: 0.5, fontFamily: 'monospace' },
      '& pre': { bgcolor: 'action.hover', p: 1.5, borderRadius: 1, overflow: 'auto' },
    },
  }}
>
  <EditorContent editor={editor} />
</Box>
```

---

## Session-Wiederaufnahme — Checkliste

Wenn diese Datei eine neue Session startet:

1. Diese Datei lesen (bereits getan)
2. `npx vitest run` — Baseline-Teststand prüfen
3. `npx eslint src/` — Baseline ESLint-Stand prüfen
4. Aktuell abgeschlossene Phase prüfen (Checkboxen oben)
5. An der ersten nicht abgehakten Phase weitermachen
