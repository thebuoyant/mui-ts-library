# Changelog

> [English Version →](CHANGELOG.md)

Alle wesentlichen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unveröffentlicht]

---

## [2.3.0] — 2026-05-29

### Hinzugefügt

#### ChordChart — Neue Komponente (MTL-20) · D3-Charts-Familie #2

- **Fluss-Visualisierung** als konzentrische Arc-Gruppen verbunden durch Bänder — ideal für Abhängigkeitskarten, Migrationen, Handelsströme oder beliebige Quelle→Ziel-Beziehungen
- **`data: ChordChartData[]`** — flaches Array aus `{ source: string, target: string, value: number }` Links; Gruppen werden automatisch aus eindeutigen Namen abgeleitet
- **Hover-Highlight** — beim Hovern einer Arc-Gruppe werden nicht zugehörige Bänder gedimmt (Opacity 0.12)
- **`directed?: boolean`** (Standard: `true`) — `true` = Pfeil-Bänder (gerichtete Flüsse); `false` = symmetrische Bänder
- **`chartColors?: string[]`** — eigene Palette; Fallback: MUI-Theme-Palette
- **`showGroupLabels?: boolean`** (Standard: `true`) — Gruppenname-Labels außerhalb des Arc-Rings
- **`ringThickness?: number`** (Standard: `20`) — Dicke des Arc-Rings in px
- **`ribbonOpacity?: number`** (Standard: `0.75`) — Opacity aller Bänder
- **`ribbonBlendMode?`** (Standard: `'multiply'`) — CSS mix-blend-mode für Bänder
- **`sortSubgroups?` / `sortChords?`** — `'ascending' | 'descending' | 'none'`
- **`onGroupClick?: (info: ChordGroupInfo, event) => void`** — `ChordGroupInfo`: `{ name, index, valueOut, valueIn }`
- **`onChordClick?: (info: ChordInfo, event) => void`** — `ChordInfo`: `{ source: { name, index, value }, target: { name, index, value } }`
- **`disabled?: boolean`** — deaktiviert alle Interaktionen, reduziert Opacity
- MUI `<Tooltip followCursor>` auf jedem Arc und Band — sofortiges Erscheinen, kein Browser-Delay
- MUI-Theme-Integration: Farben, Schriftart, Textfarbe, Dark Mode
- Neue exportierte Typen: `ChordChartData`, `ChordGroupInfo`, `ChordInfo`, `ChordChartTranslation`, `ChordSortBy`

---

## [2.2.0] — 2026-05-28

### Hinzugefügt

#### SunburstChart — Neue Komponente (MTL-19) · Erste der D3-Chart-Familie

Der `SunburstChart` ist die erste Komponente der neuen **D3-Charts**-Familie. Weitere Charts (Treemap, ZoomableCirclePacking, Chord, RadialTree) folgen in späteren Versionen.

- **Hierarchische Datenvisualisierung** als konzentrische Ringe — Wurzel im Zentrum, jede Tiefenebene bildet einen Ring
- **`data: SunburstChartData`** — rekursive Baumstruktur: `{ id, name, value?, children? }`
- **Zoom-Interaktionen:**
  - `Ctrl+Click` auf ein Segment mit Kindern → Zoom in (Drill-down)
  - `Ctrl+Doppelklick` → Zoom out eine Ebene
  - `Ctrl+Click` auf das Center-Label → Zoom out eine Ebene
  - `Escape` → Zoom zur Root zurücksetzen
  - Normaler `Click` → löst `onSegmentClick`-Callback sofort aus (kein Delay)
- **`innerRadius?: number`** — `0` = solider Sunburst (Standard); `> 0` = Donut-Stil
- **`sortBy?: 'value' | 'name'`** — Segmente nach Wert (größte zuerst) oder alphabetisch sortieren
- **`chartColors?: string[]`** — eigene Farbpalette; Fallback: MUI-Theme-Palette (`primary`, `secondary`, `error`, `warning`, `success`, `info`)
- **`showSegmentLabels?: boolean`** — Arc-ausgerichtete Textlabels (Standard: `true`)
- **`showRootLabel?: boolean`** — Center-Label mit aktuellem Fokus-Node-Namen (Standard: `true`)
- **`onSegmentClick?: (info: SunburstSegmentInfo, event) => void`** — sauberer Callback mit `name`, `value`, `depth`, `path[]`, `childrenCount`, `data`
- **`disabled?: boolean`** — deaktiviert alle Interaktionen, reduziert Opacity
- **`translation?: Partial<SunburstChartTranslation>`** — i18n für Tooltip-Hints
- MUI-Theme-Integration: Farben, Schriftart, Textfarbe, Dark Mode
- Neue exportierte Typen: `SunburstChartData`, `SunburstSegmentInfo`, `SunburstChartTranslation`
- Neue Abhängigkeit: `d3@^7.9.0`

---

## [2.1.0] — 2026-05-28

### Hinzugefügt

#### RichTextEditor — Phase 2: Inhaltsanreicherung (MTL-18)

- **`showTableButton?: boolean`** (Standard: `false`) — Tabellen-Toolbar-Button; öffnet ein Dropdown-Menü zum Einfügen einer 3×3-Tabelle mit Kopfzeile; wenn der Cursor in einer Tabelle steht, bietet das Menü auch: Zeile davor/danach einfügen, Zeile löschen, Spalte davor/danach einfügen, Spalte löschen, Tabelle löschen; basiert auf `@tiptap/extension-table` (TableKit)
- **`showImageButton?: boolean`** (Standard: `false`) — Bild-Toolbar-Button; öffnet einen Dialog mit Bild-URL und optionalem Alternativtext; Bilder werden inline mit `max-width: 100%` dargestellt; unterstützt Base64-URLs; basiert auf `@tiptap/extension-image`
- **`showEmojiButton?: boolean`** (Standard: `false`) — Emoji-Picker-Toolbar-Button; öffnet ein MUI-Popover mit ca. 200 kuratierten Emojis in 6 Kategorien (Smileys, Gesten, Herzen & Symbole, Natur, Essen, Objekte & Reisen); Live-Suche nach Emoji-Namen; keine externe Abhängigkeit
- Neue Translation-Keys: `table`, `insertTable`, `addRowBefore`, `addRowAfter`, `deleteRow`, `addColumnBefore`, `addColumnAfter`, `deleteColumn`, `deleteTable`, `image`, `imageDialogTitle`, `imageDialogUrlLabel`, `imageDialogAltLabel`, `imageDialogSave`, `imageDialogCancel`, `emoji`, `emojiSearchPlaceholder`
- Neue Abhängigkeiten: `@tiptap/extension-table@^3.23.6`, `@tiptap/extension-image@^3.23.6`; alle anderen `@tiptap/*`-Pakete auf `^3.23.6` aktualisiert

---

## [2.0.1] — 2026-05-27

### Geändert

- GitHub Pages Storybook-Deployment-Workflow entfernt (Infrastruktur zu fragil für öffentliche Repos ohne Enterprise-Plan)
- `preview-storybook` npm-Script und `http-server` devDependency entfernt
- `README.md` aktualisiert — toten Live-Storybook-Link entfernt
- Storybook bleibt lokal via `npm run storybook` und als Docker-Distribution via `npm run build-storybook-docker` verfügbar

---

## [2.0.0] — 2026-05-27

### Hinzugefügt

#### SqlEditor — Quick Wins (MTL-17)

- **`Cmd+Enter` / `Ctrl+Enter`-Tastaturkürzel** — löst `onExecute` direkt aus dem Editor heraus aus ohne den Execute-Toolbar-Button zu klicken; implementiert via CodeMirror `keymap.of([{ key: "Mod-Enter" }])`; funktioniert unabhängig von der Toolbar-Sichtbarkeit
- **Auto-Sizing-Gutter** — die Zeilennummern-Spalte passt ihre Breite nun automatisch an die Anzahl der Stellen an; bisher war eine feste `minWidth: 36px` hartkodiert, die bei kurzen Dateien unnötigen Leerraum erzeugte

#### ConfirmDialog — Quick Wins (MTL-17)

- **`countdown?: number`-Prop** — bestätigt den Dialog automatisch nach n Sekunden; der Bestätigen-Button zeigt einen Live-Countdown (`"Löschen (5)"`, `"Löschen (4)"`, …) und löst `onConfirm` bei 0 aus; der Countdown setzt sich zurück wenn der Dialog geschlossen wird
- **`Enter`-Tastaturkürzel** — Enter in einem offenen Dialog löst Bestätigen aus; implementiert via `onKeyDown` am Dialog-Element; Escape bricht weiterhin ab

#### PasswordStrengthMeter — Quick Wins (MTL-17)

- **`showSegmentedBar?: boolean`-Prop** (Standard: `false`) — ersetzt den einzelnen animierten Stärkebalken durch 4 einzeln animierte Segmente; die Anzahl gefüllter Segmente entspricht direkt dem Stärke-Score (0–4)
- **`customRequirements?: CustomRequirement[]`-Prop** — zusätzliche Passwort-Anforderungen über die eingebauten 5 hinaus; jeder Eintrag hat `label: string` und `fulfilled: boolean | ((password: string) => boolean)`; die Funktionsform wird bei jedem Tastenanschlag live ausgewertet
- Neuer exportierter Typ: `CustomRequirement`

#### JsonEditor — Quick Wins (MTL-17)

- **`showMinimap?: boolean`-Prop** (Standard: `false`) — fügt ein 80 px breites Minimap-Panel auf der rechten Seite des Editors für schnelle Navigation in großen Dokumenten hinzu; basiert auf `@replit/codemirror-minimap` (MIT, 1 transitive Abhängigkeit)
- Neue Abhängigkeit: `@replit/codemirror-minimap`

#### GanttChart — Quick Wins (MTL-17)

- **Heute-Chip** — ein kleiner beschrifteter Chip schwebt am oberen Ende der gestrichelten Heute-Linie, genau auf der Grenze zwischen Timeline-Header und Task-Zeilen; Farbe entspricht `ganttTheme.todayLineColor` (Fallback: MUI `primary.main`), Textkontrasst wird automatisch via `theme.palette.getContrastText` berechnet; ein Tooltip beim Hover zeigt das aktuelle Datum als lokalisiertes Langformat (z. B. „Mittwoch, 27. Mai 2026") gemäß `translations.dateLocale`
- Neuer Translation-Key **`todayLabel`** in `GanttTranslations` — Standard `"Heute"`, Englisch: `"Today"`, auf `""` setzen um den Chip vollständig auszublenden

---

## [1.4.0] — 2026-05-26

### Hinzugefügt

#### RichTextEditor — Phase 1: Quick Wins (MTL-16)

- **`showWordCount`-Prop** — zeigt einen Wörter-Zähler im Footer neben dem bestehenden Zeichen-Zähler an; vollständig unabhängig (kann mit oder ohne `showCharacterCount` / `maxCharacters` verwendet werden); die `CharacterCount`-TipTap-Extension wird automatisch geladen wenn aktiviert
- **`showToolbar`-Prop** (Standard: `true`) — blendet die Toolbar aus ohne den Editor in den readonly-Modus zu versetzen; der Editor bleibt vollständig editierbar (nützlich für minimale Editoren oder eigene Toolbar-Implementierungen)
- **`showFullscreenButton` in `toolbarConfig`** (Standard: `false`, opt-in) — fügt einen Fullscreen-Umschalter am rechten Rand der Toolbar ein; Klick expandiert den Editor auf den gesamten Viewport (`100vw × 100vh`) via CSS `position: fixed`; keine neuen Dependencies
- **3 neue Translation-Keys** in `RichTextEditorTranslation`: `wordCount` (Standard: `"{count} words"`), `fullscreen` (Standard: `"Full screen"`), `exitFullscreen` (Standard: `"Exit full screen"`)
- Alle Props nun alphabetisch sortiert (A–Z) in Stories und User Manual dokumentiert
- 2 neue Storybook-Stories: `WithWordCount`, `WithFullscreen`
- 9 neue Vitest-Tests (4 für Word Count, 5 für Fullscreen)

---

## [1.3.2] — 2026-05-25

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
- `PasswordStrengthBar`-Komponente aus `PasswordStrengthMeter` extrahiert — Props: `percent`, `color`, `ariaLabel`; bessere Testbarkeit und Wiederverwendbarkeit
- Drei identische `H1Icon`/`H2Icon`/`H3Icon`-Komponenten durch `HeadingIcon({ level: 1 | 2 | 3 })` in `RichTextEditorToolbar` ersetzt

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

Vollständig interaktive Projekt-Zeitleiste auf Basis von React, MUI und Zustand.

**Datenmodell**
- Hierarchische Aufgabenstruktur via flachem `tasks`-Array + `parentId` — Baum wird intern aufgebaut
- Aufgaben-Felder: `id`, `name`, `status`, `startDate`, `endDate`, `parentId?`, `dependencies?`, `isMilestone?`, `progress?`, `color?`
- 4 Status: `"planned"` · `"in-progress"` · `"done"` · `"blocked"` — farbkodierte Balken und Status-Chips
- Meilenstein-Marker als rotierende Raute (♦) statt Balken
- Individuelle Farb-Override pro Aufgabe via `GanttTask.color` (beliebige CSS-Farbe)
- Fortschrittsfeld (0–100 %) als halbtransparenter Overlay-Streifen auf dem Balken

**Timeline-Ansicht**
- 4 Zoom-Stufen: `"days"` · `"weeks"` · `"months"` · `"quarters"` — jederzeit über Toolbar wechselbar
- Z-förmige Finish-to-Start-Abhängigkeitspfeile zwischen Aufgaben
- Heute-Linie mit automatischem horizontalem Scroll zum Mittelpunkt beim ersten Laden
- Wochenend-Hintergrund-Hervorhebung in der Tages-Skala
- Größenveränderbares linkes Panel via ziehbarem Trenner (`minPanelWidth`, `maxPanelWidth`)
- Virtualisiertes Zeilen-Rendering für große Datensätze (`virtualizeRows`) via `@tanstack/react-virtual`
- `defaultRangeStart` / `defaultRangeEnd` zur Fixierung des sichtbaren Datumsbereichs

**Toolbar**
- Skala-Schaltflächen, Von/Bis-Datumseingaben, Alle auf-/zuklappen, Zum heutigen Tag, Ansicht zurücksetzen
- Feingranulare Steuerung via `toolbarConfig` — einzelne Toolbar-Elemente unabhängig ein-/ausblenden
- `showToolbar={false}` zum Ausblenden der gesamten Toolbar

**Interaktion**
- `draggable` — Aufgaben-Balken horizontal verschieben; `startDate` und `endDate` werden synchron aktualisiert
- `resizable` — rechte Balkenkante ziehen um `endDate` zu verändern
- `progressDraggable` — Fortschritts-Handle auf dem Balken ziehen (0–100 %) für interaktive Eingabe
- `cascadeDependencies` — verschiebt alle Finish-to-Start-Nachfolger automatisch wenn ein Vorgänger bewegt wird (transitiv, kreiserkennungs-sicher)
- `showCriticalPath` — markiert den längsten Abhängigkeitspfad, der die Projektdauer bestimmt
- `zoomable` — `Strg + Mausrad` wechselt durch Zoom-Stufen
- `inlineEdit` — Doppelklick auf Aufgabenname im linken Panel für direkte Bearbeitung
- Rechtsklick-Kontextmenü auf Balken für sofortigen Statuswechsel (`onStatusChange`-Callback)
- Zeilen-Umsortierung im Panel via Drag & Drop (`@dnd-kit`)

**CRUD-Dialoge**
- Integrierte MUI-Dialoge für Hinzufügen / Bearbeiten / Löschen (`enableBuiltinDialogs={true}`, Standard)
- Dialog-Felder: Name, Startdatum, Enddatum, Status, Übergeordnete Aufgabe, Meilenstein-Flag, Vorgänger (Mehrfachauswahl)
- `enableBuiltinDialogs={false}` — deaktiviert integrierte Dialoge, ruft stattdessen `onAddTask` / `onEditTask` / `onDeleteTask` auf (eigene Dialog-Integration)

**Theming** — via `ganttTheme: GanttTheme`
- `statusColors` — Balkenfarben pro Status als CSS-Werte
- `criticalPathColor` — Hervorhebungsfarbe für den kritischen Pfad (Standard: `error.main`)
- `milestoneColor` — Rautenfarbe für Meilensteine (Standard: `warning.main`)
- `todayLineColor` — Farbe der Heute-Linie (Standard: `primary.main`)
- `weekendColor` — Hintergrundfarbe der Wochenend-Spalten (Standard: `action.hover`)
- `barBorderRadius` — Ecken-Radius der Aufgaben-Balken in px (Standard: `4`)

**Callbacks**
- `onTaskClick(task)` · `onMilestoneClick(task)` — Klick auf Balken / Meilenstein-Raute
- `onTaskMoved(task, newStart, newEnd)` — nach erfolgreichem Balken-Drag
- `onTaskResized(task, newEnd)` — nach Resize-Drag
- `onStatusChange(task, status)` — nach Kontextmenü-Statuswahl
- `onTasksChange(tasks)` — nach jeder Änderung mit der vollständigen aktuellen Aufgabenliste (zentraler Callback für datengetriebene Architekturen)
- `onTaskCreated(task)` · `onTaskUpdated(task)` · `onTaskDeleted(taskId)` — spezifische Callbacks für integrierte Dialog-Aktionen
- `onAddTask(parent?)` · `onEditTask(task)` · `onDeleteTask(task)` — bei `enableBuiltinDialogs={false}`

**TypeScript-Exports**
- Typen: `GanttTask`, `GanttTaskNode`, `GanttTaskStatus`, `GanttTimeScale`, `GanttTranslations`, `GanttTheme`, `GanttStatusColors`, `GanttChartProps`, `GanttToolbarConfig`
- `DEFAULT_GANTT_TRANSLATIONS` — vorbefüllte Standard-Übersetzungen (Mix aus Deutsch/Englisch)

**i18n & Barrierefreiheit**
- Alle UI-Texte über `translations`-Prop überschreibbar — 30+ Schlüssel inkl. Dialog-Labels, Toolbar-Tooltips, Status-Labels, Datums-Locale
- Aktions-Icon-Tooltips dienen als `aria-label`; Dialoge haben Fokus-Trap + Escape-Handling
- Dark-Mode-Unterstützung via MUI-Theme

**Storybook & Tests**
- Storybook-Stories für alle wichtigen Szenarien
- Vitest-Unit-Tests (in den 271 Gesamttests bei v1.0.0 enthalten)
- Zweisprachiges Benutzerhandbuch: `user-manuals/GanttChart.md` (EN) + `user-manuals/GanttChart.de.md` (DE)

#### TagSelection

Multi-Tag-Selektor mit Autocomplete, Chip-Anzeige, Async-Unterstützung und freier Tag-Erstellung.

**Datenmodell**
- `TagSelectionItem`-Felder: `id`, `label`, `selected?`, `disabled?`, `color?`, `foregroundColor?`, `backgroundColor?`
- `TagColor`: `"default"` · `"primary"` · `"secondary"` · `"error"` · `"info"` · `"success"` · `"warning"`
- Zwei Farbsysteme: semantisches `color` (MUI-Theme, Dark-Mode-sicher) oder `foregroundColor`/`backgroundColor` (CSS) — gegenseitig ausschließend
- Deaktivierte Tags können nicht ausgewählt werden; bereits ausgewählte `disabled`-Tags können nicht entfernt werden
- Chips und Dropdown-Einträge immer alphabetisch sortiert

**Anzeige & Sichtbarkeit**
- `showSelectedTags` — Chip-Bereich ein-/ausblenden
- `showSelectedTagsLabel` — Überschrift über den Chips ein-/ausblenden
- `showAutoComplete` — Suche ein-/ausblenden (reiner Anzeigemodus wenn `false`)
- `inputSize` / `chipSize` — `"small"` oder `"medium"` (MUI-Standard)

**Interaktion**
- `maxTags` — maximale Anzahl gleichzeitig ausgewählter Tags; Input wird automatisch deaktiviert wenn Limit erreicht
- `maxVisibleChips` — überzählige Chips hinter `+N`-Chip versteckt; Klick öffnet Overflow-Popover (`popoverPlacement`: `"top"` oder `"bottom"`)
- `loading` — Ladezustand im Dropdown für asynchrone Tag-Quellen
- `disabled` — gesamte Komponente gesperrt; Chips ohne Löschen-Icon sichtbar
- `listboxMaxHeight` — maximale Höhe der Autocomplete-Dropdown-Liste in px

**Freie Tag-Erstellung** (`allowCreate={true}`)
- Wenn getippter Text keinem bestehenden Tag entspricht, wechselt der Input in den Erstellen-Modus
- CheckIcon (Bestätigen) + CloseIcon (Abbrechen) im Feld; 7 MUI-Theme-Farb-Chips zur Farbauswahl
- Bestätigung per CheckIcon-Klick **oder Enter-Taste**
- Neuer Tag wird intern sofort als ausgewählt markiert; `onTagCreate` feuert zur externen Synchronisierung

**Callbacks**
- `onTagSelect(tag, selectedTags, allTags)` — Tag aus Dropdown ausgewählt
- `onTagDelete(tag, selectedTags, allTags)` — Chip entfernt
- `onTagsChange(selectedTags, allTags)` — zentraler Callback, feuert nach jeder Auswahlveränderung
- `onSearchChange(value)` — für serverseitige Filterung und asynchrones Laden
- `onTagCreate(label, color)` — neuer Tag in Erstellen-Modus bestätigt

**TypeScript-Exports**
- Typen: `TagSelectionItem`, `TagSelectionProps`, `TagSelectionTranslation`, `TagColor`
- `DEFAULT_TAG_SELECTION_TRANSLATION`

**i18n** (7 Schlüssel): `selectedTagsLabel`, `autoCompleteLabel`, `noSelectedTagsText`, `noAvailableTagsText`, `placeholder`, `loadingText`, `maxTagsReachedText`

**Storybook & Tests**
- Storybook-v10-Stories für alle wichtigen Szenarien
- Vitest-Unit-Tests (in den 271 Gesamttests bei v1.0.0 enthalten)
- Zweisprachiges Benutzerhandbuch: `user-manuals/TagSelection.md` (EN) + `user-manuals/TagSelection.de.md` (DE)

#### PasswordStrengthMeter

Passwort-Eingabe mit animiertem Stärkebalken, Anforderungsliste und vollständiger Formular-Bibliothek-Integration.

**Kernfunktionen**
- Live-Stärkebewertung (5 Stufen: leer/schwach/ok/gut/sehr gut) bei jedem Tastendruck
- Animierter Stärkebalken mit konfigurierbaren Farben pro Stufe (`meterColors`)
- Anforderungsliste mit 5 Kriterien: Mindestlänge, Großbuchstabe, Kleinbuchstabe, Ziffer, Sonderzeichen
- Sichtbarkeits-Umschalter (Passwort anzeigen/verbergen)
- Kontrollierter und unkontrollierter Modus

**Props**
- `value` — kontrollierter Modus (externer State)
- `passwordMinLength` (Standard: `8`) — Mindestlängen-Schwellwert; Passwörter darunter erhalten immer `weak`
- `showMeter`, `showSummary`, `showPasswordAdornment` — einzelne UI-Bereiche unabhängig ein-/ausblenden
- `inputSize` — `"small"` oder `"medium"` (MUI-Standard)

**Formular-Integration**
- `name` — für natives `<form>`-Submit und React Hook Form `register()`
- `inputRef` — Ref auf das native `<input>` für React Hook Form / Formik
- `disabled`, `error`, `helperText`, `autoComplete` — konsistent mit MUI `TextField`

**Farb-Anpassung**
- `meterColors: Partial<MeterColors>` — Balkenfarben für `weak`, `ok`, `good`, `veryGood`
- `checkColors: CheckColors` — Icon-Farben für `failure` (nicht erfüllt) und `success` (erfüllt)
- `DEFAULT_METER_COLORS`, `DEFAULT_CHECK_COLORS` als Referenz exportiert

**Callback**
- `onPasswordChange(password: string, result: StrengthResult)` — feuert bei jedem Tastendruck

**`StrengthResult`** (Rückgabe in `onPasswordChange`)
- `score: 0|1|2|3|4`, `percent: 0|25|50|75|100`, `meterStatus: "weak"|"ok"|"good"|"very good"`
- `length`, `hasLower`, `hasUpper`, `hasDigit`, `hasSymbol`

**Scoring-Algorithmus** (client-seitig, deterministisch, keine externen Dienste)
- Basis: Mindestlänge erfüllt +1, Längen-Bonus +1
- Zeichenvielfalt: 2 Klassen +1, 3 Klassen +1
- Malus: Wiederholungszeichen −2, bekannte Schwach-Muster (`1234`, `password`, …) −2
- Score auf 0–4 geklemmt

**TypeScript-Exports**
- Typen: `PasswordStrengthMeterProps`, `PasswordStrengthMeterTranslation`, `StrengthResult`, `StrengthScore`, `MeterStatus`, `MeterColors`, `CheckColors`
- `DEFAULT_PASSWORD_TRANSLATIONS`, `DEFAULT_METER_COLORS`, `DEFAULT_CHECK_COLORS`

**Stabile `data-testid`-Attribute**: `psm-input`, `psm-toggle`, `psm-meter`, `psm-summary`, `psm-req-success`, `psm-req-failure`

**i18n** (10 Schlüssel): `label`, `summaryHeaderLabel`, `summaryMinChars` (mit `{n}`-Platzhalter für `passwordMinLength`), `summaryCapitalLetter`, `summaryLowerCaseLetter`, `summaryNumber`, `summarySpecialChar`, `showPasswordLabel`, `hidePasswordLabel`, `meterAriaLabel`

**Storybook & Tests**
- Storybook-v10-Stories für alle wichtigen Szenarien
- Vitest-Unit-Tests (in den 271 Gesamttests bei v1.0.0 enthalten)
- Zweisprachiges Benutzerhandbuch: `user-manuals/PasswordStrengthMeter.md` (EN) + `user-manuals/PasswordStrengthMeter.de.md` (DE)

#### RichTextEditor

Vollwertiger WYSIWYG-Editor auf Basis von TipTap v3 und ProseMirror — ohne externe CSS-Abhängigkeiten.

**Toolbar** (alle Buttons über `toolbarConfig` einzeln ein-/ausblendbar)
- Textformatierung: Fett, Kursiv, Unterstrichen, Durchgestrichen
- Überschriften: H1, H2, H3
- Listen: Aufzählung, Nummerierte Liste
- Blöcke: Zitat, Code-Block, Trennlinie
- Link: Einfügen-/Bearbeiten-Dialog mit URL-Feld und Entfernen-Button
- Textfarbe + Hervorhebung: Farbpalette mit 10 Voreinstellungen, Regenbogen-Swatch öffnet nativen Browser-Farbwähler, Papierkorb entfernt Farbe
- Verlauf: Rückgängig, Wiederholen, Formatierung löschen

**Props**
- `value` / `onChange` — kontrollierter Modus; externe Synchronisierung ohne Cursor-Sprung
- `placeholder` — Platzhaltertext wenn Editor leer ist
- `outputFormat` — `"html"` (Standard) oder `"json"` (TipTap/ProseMirror-Dokumentformat)
- `showCharacterCount` — Zeichenzähler rechts unten
- `maxCharacters` — Hartlimit; Eingabe blockiert wenn erreicht, Zähler wird rot
- `height` / `width` — Zahl → px, CSS-Strings, `"auto"` füllt umgebenden Flex-Container
- `readonly` — keine Toolbar, nicht editierbar
- `disabled` — Toolbar deaktiviert, Editor ausgegraut
- `name` — verstecktes `<input type="hidden">` für natives `<form>`-Submit
- `error` + `helperText` — konsistent mit MUI `TextField`
- `onBlur` / `onFocus`-Callbacks

**Markdown-Einfügen**
- Eingefügtes Markdown (aus `.md`-Dateien, GitHub-READMEs, Markdown-Editoren) wird automatisch in Rich-Text konvertiert via `tiptap-markdown` — Überschriften, Listen, Fett, Kursiv, Zitate, Code, Links

**TypeScript-Exports**
- Typen: `RichTextEditorProps`, `RichTextEditorOutputFormat`, `RichTextEditorToolbarConfig`, `RichTextEditorTranslation`
- `DEFAULT_RICH_TEXT_EDITOR_TRANSLATION`, `DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG`

**i18n** (26 Schlüssel): Toolbar-Tooltips für alle 18 Buttons, Link-Dialog-Labels (Titel/URL/Speichern/Abbrechen/Entfernen), Zeichenzähler-Format-Strings (`{count}`, `{count}/{max}`)

**Storybook & Tests**
- Storybook-v10-Stories für alle wichtigen Szenarien
- Vitest-Unit-Tests (in den 271 Gesamttests bei v1.0.0 enthalten)
- Zweisprachiges Benutzerhandbuch: `user-manuals/RichTextEditor.md` (EN) + `user-manuals/RichTextEditor.de.md` (DE)

#### Allgemein
- Dualer ESM + CJS Output (`dist/index.js` / `dist/index.cjs`)
- Vollständige TypeScript-Deklarationen (`.d.ts`) für alle Komponenten und Typen
- Tree-Shakeable (`sideEffects: false`)
- Peer-Dependencies: React 19, MUI 9, Emotion
- Storybook-v10-Stories für alle Komponenten — mehrere Szenarien pro Komponente
- 271 Unit-Tests mit Vitest und Testing Library
- Zweisprachige Dokumentation: Englisch (`*.md`) und Deutsch (`*.de.md`)
