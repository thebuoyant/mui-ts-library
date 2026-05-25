# Changelog

> [English Version →](CHANGELOG.md)

Alle wesentlichen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unveröffentlicht]

### Intern — MTL-15: Code-Qualität & Refactoring

- `useGanttDrag`-Hook aus `GanttTimeline` extrahiert — gesamte Drag-, Resize- und Progress-Drag-Logik in `hooks/useGanttDrag.ts`; dokumentiert 4 Muster für komplexe Interaktions-Hooks (stabile Callback-Refs, Zwei-Ebenen-State, Document-Level-Listener, Suppress-Click)
- `GanttBarRow`-Komponente aus `GanttTimeline` extrahiert — Balken-Rendering mit Sub-Komponenten `GanttMilestoneBar`, `GanttTaskBar`, `DragTooltip`; liest Theme intern via `useGanttTheme()`
- `GanttWeekendStrips`-Komponente extrahiert — Wochenend-Hintergrundstreifen, liest `weekendColor` aus `useGanttTheme()`
- `GanttStatusContextMenu`-Komponente extrahiert — Rechtsklick-Statusmenü, rein präsentational; Business-Logik bleibt in GanttTimeline via `onSelect`-Callback
- `GanttDependencyArrows`-Komponente extrahiert — SVG-Layer für Abhängigkeitspfeile und Today-Line, liest Theme intern
- `GanttTimeline.tsx` von 811 auf ~300 Zeilen reduziert
- Gemeinsame `ToolbarButton`-Komponente in `src/components/shared/` — ersetzt drei identische lokale Implementierungen
- Gemeinsame `normalizeSize`-Hilfsfunktion in `src/components/shared/` — ersetzt drei identische lokale Funktionen
- Gantt-Status-Farbmaps (`STATUS_BAR_COLOR`, `STATUS_CHIP_COLOR`) in `GanttChart.constants.ts` zusammengeführt

---

## [1.3.1] — 2026-05-25

### Behoben

- Alle `dependencies` im Vite-Build externalisiert (TipTap, CodeMirror, sql-formatter, zustand, @tanstack/react-virtual) — werden nicht mehr in die dist-Dateien gebundelt
- `dist/index.js` von 1,7 MB auf 124 KB reduziert, `dist/index.cjs` von 1,4 MB auf 91 KB
- Paketgröße von 922 kB auf 69 kB (gepackt) reduziert
- publint-Warnung behoben: `exports`-Typen für ESM (`index.d.ts`) und CJS (`index.d.cts`) getrennt
- `repository.url` korrigiert — `git+`-Prefix gemäß npm-Konvention ergänzt

---

## [1.3.0] — 2026-05-23

### Hinzugefügt

#### JsonEditor

- JSON-Code-Editor auf Basis CodeMirror 6 mit demselben MUI-Paper-Layout wie der `SqlEditor`
- Echtzeit-JSON-Validierung via eingebautem `jsonParseLinter` — Inline-Fehlermarker und Wellenlinien
- **Format-Schaltfläche** — JSON verschönern mit konfigurierbarem Einzug (`indent`-Prop, Standard: 2 Leerzeichen)
- **Komprimieren-Schaltfläche** — JSON auf eine Zeile minimieren
- Validierungs-Statusanzeige im Footer — „Gültiges JSON" / „Ungültiges JSON" mit farbkodiertem Icon (`showValidation`)
- `onValidChange?: (isValid: boolean) => void`-Callback — wird ausgelöst, wenn sich die JSON-Gültigkeit ändert
- Konfigurierbare Syntax-Highlight-Farben über `highlightColors`-Prop (Property-Namen, Strings, Zahlen, Boolean, null)
- Vollständige i18n über `Partial<JsonEditorTranslation>` — alle Toolbar-Tooltips, Validierungs-Labels und Cursor-Positionsformat
- Cursor-Position im Footer (`showLineColumn`)
- `readonly`-Modus — Toolbar versteckt, Editor nicht editierbar
- `disabled`-Modus — Toolbar deaktiviert, Editor ausgegraut
- `error` + `helperText` für Formular-Integration konsistent mit MUI TextField
- `name`-Prop — verstecktes `<input type="hidden">` für native Formularübermittlung
- `height` / `width`-Props — numerische Werte → px, CSS-Strings direkt übergeben, `"auto"` füllt umgebenden Flex-Container
- 16 Storybook-Stories: Default, WithJson, WithValidation, InvalidJson, CompactJson, WithFixedHeight, WithAutoHeight, Controlled, IndentFour, ReadOnly, Disabled, WithError, NoLineNumbers, CustomHighlightColors, GermanTranslation, LargeDataset
- 17 Vitest-Unit-Tests für alle wichtigen Anwendungsfälle
- Zweisprachiges Benutzerhandbuch: `user-manuals/JsonEditor.md` (EN) und `user-manuals/JsonEditor.de.md` (DE)
- `@codemirror/lang-json` als Dependency ergänzt

---

## [1.2.0] — 2026-05-23

### Hinzugefügt

#### ConfirmDialog
- Deklaratives Bestätigungs-Dialog-System — ersetzt den `useState + Dialog + DialogTitle + DialogContent + DialogActions`-Boilerplate durch einen einzigen Hook-Aufruf
- `ConfirmDialogProvider` — rendert einen einzigen MUI-Dialog an der App-Wurzel; akzeptiert optionale Standard-`translation` (Bestätigen/Abbrechen-Labels)
- `useConfirm`-Hook — gibt eine `async (options) => Promise<boolean>`-Funktion zurück, die überall innerhalb des Providers nutzbar ist
- `ConfirmDialogOptions`-Konfiguration pro Aufruf:
  - `title` — Dialog-Überschrift
  - `description` — Body-Text (`string`) oder beliebiger React-Node (JSX, `<Stack>` etc.)
  - `confirmLabel` / `cancelLabel` — Labels pro Aufruf überschreiben (Fallback auf Provider-`translation`)
  - `severity` — `"info"` | `"warning"` | `"error"` | `"success"`: färbt den Bestätigen-Button und zeigt ein passendes Icon
  - `hideCancelButton` — Alert-Modus mit nur einem Bestätigen-Button (für reine Informationshinweise)
  - `maxWidth` — MUI-Dialog-Maximalbreite (`"xs"` Standard bis `"xl"`)
  - `showIcon` — Severity-Icon im Titel ein-/ausblenden (Standard: `true`)
- Backdrop-Klick und Escape-Taste lösen das Promise als `false` (Abbrechen) auf
- Sequentielle Aufrufe: Ein zweites `confirm()` während ein Dialog offen ist, schließt den ersten automatisch mit `false` ab
- `DEFAULT_CONFIRM_DIALOG_TRANSLATION` exportiert als Referenz
- Exportierte Typen: `ConfirmDialogOptions`, `ConfirmDialogSeverity`, `ConfirmDialogTranslation`, `ConfirmDialogProviderProps`
- 11 Storybook-Stories: Default, NoDescription, Destructive, Warning, Success, AlertOnly, NoIcon, CustomLabels, LargeDialog, GermanTranslation, MultipleDialogs
- 16 Vitest-Unit-Tests für alle Optionen, Übersetzungen, Severity, sequentielle Aufrufe und ReactNode-Beschreibungen
- Zweisprachiges Benutzerhandbuch: `user-manuals/ConfirmDialog.md` (EN) und `user-manuals/ConfirmDialog.de.md` (DE)

---

## [1.1.0] — 2026-05-22

### Hinzugefügt

#### SqlEditor
- SQL-Code-Editor auf Basis CodeMirror 6 mit demselben MUI-Paper-Layout wie der `RichTextEditor`
- SQL-Syntax-Highlighting mit MUI-Theme-Farben: Keywords (`primary.main`, fett), Strings (`success.main`, fett), Identifier (`info.main`), Zahlen (`warning.main`), Funktionen (`secondary.main`), Kommentare (`text.disabled`, kursiv)
- Dark-Mode-Unterstützung — alle Farben aus dem aktiven MUI-Theme
- 5 SQL-Dialekte: Standard SQL, MySQL, PostgreSQL, SQLite, MS SQL Server
- **Format-Schaltfläche** — SQL verschönern via `sql-formatter` (dialektspezifisch, try/catch-sicher)
- **Server-seitiges Linting** via asynchronem `onLint`-Callback (600 ms Debounce); Fehler als Wellenlinien und Lint-Gutter-Marker
- **Schema-aware Autocomplete** — `schema`-Prop nimmt `SqlSchema` (`tables` mit `name` + `columns`) und schlägt Tabellen-/Spaltennamen mit Typ-Hinweisen vor
- **Konfigurierbare Highlight-Farben** — `highlightColors`-Prop überschreibt Keyword-, String- und Identifier-Farben unabhängig voneinander
- SQL-Keyword-Autocomplete out of the box (`autocompletion()` + `completionKeymap`)
- Toolbar: Formatieren, Kopieren (mit „Kopiert!"-Feedback), Leeren, Rückgängig, Wiederholen, Ausführen (standardmäßig aus)
- Footer: Cursor-Position (`Ln {line}, Sp. {col}`) und Fehleranzahl (`showErrorCount`)
- `toolbarConfig`-Prop zum Ein-/Ausblenden einzelner Toolbar-Schaltflächen
- `translation`-Prop für vollständige i18n aller Toolbar-Tooltips und Footer-Beschriftungen
- `dialect`-Prop: `"standard"` | `"mysql"` | `"postgresql"` | `"sqlite"` | `"mssql"`
- Anzeigeflags: `showLineNumbers`, `showLineColumn`, `showErrorCount`
- Kontrollierter Modus via `value` / `onChange` (synchronisiert ohne Cursor-Sprung)
- `readonly`-Modus (keine Toolbar) und `disabled`-Modus (ausgegraut)
- `error`-Zustand und `helperText` — konsistent mit MUI TextField
- `onBlur` / `onFocus`-Callbacks
- `onExecute`-Callback für die Ausführen-Schaltfläche
- `name`-Prop für native Formularübermittlung via verstecktem `<input type="hidden">`
- Konfigurierbare `height` und `width` (Zahl → px, CSS-Strings, `"auto"` für Flex-Container)
- 17 Storybook-Stories für alle Features
- Exportierte Typen: `SqlEditorProps`, `SqlEditorDialect`, `SqlEditorToolbarConfig`, `SqlEditorTranslation`, `SqlEditorHighlightColors`, `SqlLintError`, `SqlSchema`, `SqlTable`, `SqlColumn`
- Exportierte Defaults: `DEFAULT_SQL_EDITOR_TOOLBAR_CONFIG`, `DEFAULT_SQL_EDITOR_TRANSLATION`

#### Storybook Docker Distribution
- Neues Script `npm run build-storybook-docker` — erstellt ein vollständiges ZIP zum Teilen von Storybook mit Nicht-Entwicklern
- ZIP enthält ein vorgefertigtes Docker-Image (nginx:alpine + Storybook-Static-Files), `docker-compose.yml`, `start.sh` (macOS/Linux), `start.bat` (Windows) und zweisprachige Anleitungen
- Empfänger benötigen nur Docker Desktop — kein Node.js, kein Build-Schritt
- Ausgabe: `storybook-docker/storybook-{version}.zip`
- Endnutzer-Anleitungen: `storybook-docker/how-to.md` (EN) und `storybook-docker/how-to.de.md` (DE)

#### Allgemein
- `@lezer/highlight` als explizite Dependency ergänzt (war zuvor nur transitive Dep, wird aber direkt in `SqlEditorContent` importiert)
- `package.json`-Beschreibung und Keywords um SqlEditor / CodeMirror / SQL erweitert
- Sicherheit: `ws` (8.20.0 → 8.20.1) und `brace-expansion` (5.0.5 → 5.0.6) via `npm audit fix` gepatcht
- `.gitignore` erweitert: `storybook-docker/storybook-*/`, `storybook-docker/*.tar`, `*.tgz` vom Repository ausgeschlossen
- Zweisprachiges Benutzerhandbuch: `user-manuals/SqlEditor.md` (EN) und `user-manuals/SqlEditor.de.md` (DE)
- `PROJECT-SHARE.md` aktualisiert: deckt nun beide Verteilungswege ab (`.tgz`-Bibliothek und Storybook-Docker-ZIP)

---

## [1.0.0] — 2026-05-21

Erste öffentliche Veröffentlichung von `@thebuoyant-tsdev/mui-ts-library`.

### Hinzugefügt

#### GanttChart
- Hierarchische Projekt-Zeitleiste mit ein-/ausklappbaren Aufgabengruppen
- Meilenstein-Marker mit eigenem visuellen Stil
- Drag-and-Drop zum Umsortieren von Zeilen via `@dnd-kit`
- Abhängigkeitspfeile zwischen Aufgaben
- Zoom-Stufen: Tag, Woche, Monat, Quartal
- Integrierte CRUD-Dialoge zum Erstellen, Bearbeiten und Löschen von Aufgaben
- Heute-Linie mit Auto-Scroll
- Virtualisiertes Zeilen-Rendering für große Datensätze
- Vollständige i18n-Unterstützung über `translation`-Prop
- Dark-Mode-Unterstützung via MUI-Theme

#### TagSelection
- Multi-Tag-Selektor mit Autocomplete-Suche
- Optionaler Tag-Erstellungsmodus (`allowCreate`) mit Enter-Taste als Shortcut
- Konfigurierbare Chip-Größe und maximale Anzahl sichtbarer Chips
- Alphabetische Sortierung der ausgewählten Chips und Dropdown-Optionen
- `onTagCreate`-Callback zum Persistieren neu erstellter Tags
- Vollständige i18n-Unterstützung über `translation`-Prop
- Dark-Mode-Unterstützung via MUI-Theme

#### PasswordStrengthMeter
- Passwort-Eingabe mit Live-Stärkebewertung (0–4 Stufen)
- Konfigurierbare Anforderungsliste für Passwort-Regeln
- Sichtbarkeits-Umschalter
- Anpassbare Stärkebezeichnungen über `translation`-Prop
- Dark-Mode-Unterstützung via MUI-Theme

#### RichTextEditor
- WYSIWYG-Editor auf Basis von TipTap v3 und ProseMirror
- Toolbar: Fett, Kursiv, Unterstrichen, Durchgestrichen, Überschriften (H1–H3), Aufzählung, Nummerierte Liste, Zitat, Code-Block, Link, Trennlinie, Textfarbe, Hervorheben, Rückgängig/Wiederholen, Formatierung löschen
- Konfigurierbare Toolbar über `toolbarConfig`-Prop (einzelne Buttons ein-/ausblenden)
- Textfarbe und Hervorhebung mit Farbpalette und nativem Browser-Farbwähler
- Dialog zum Einfügen und Bearbeiten von Links
- Zeichenzähler mit optionalem Hartlimit (`maxCharacters`)
- Kontrollierter Modus über `value` / `onChange`
- Ausgabeformat: `"html"` (Standard) oder `"json"`
- Markdown-zu-Rich-Text-Konvertierung beim Einfügen
- `readonly`-Modus (ohne Toolbar) und `disabled`-Modus
- Native Formular-Integration über verstecktes `<input type="hidden">`
- `error`-Zustand und `helperText` — konsistent mit MUI TextField
- `onBlur`- / `onFocus`-Callbacks
- Konfigurierbare `height` und `width` (Zahl → px, CSS-Strings, `"auto"` für Flex-Container)
- Vollständige i18n-Unterstützung über `translation`-Prop
- Dark-Mode-Unterstützung via MUI-Theme

#### Allgemein
- Dualer ESM + CJS Output (`dist/index.js` / `dist/index.cjs`)
- Vollständige TypeScript-Deklarationen (`.d.ts`) für alle Komponenten und Typen
- Tree-Shakeable (`sideEffects: false`)
- Peer-Dependencies: React 19, MUI 9, Emotion
- Storybook-10-Stories für alle Komponenten
- 271 Unit-Tests mit Vitest und Testing Library
- Zweisprachige Dokumentation: Englisch (`*.md`) und Deutsch (`*.de.md`)
