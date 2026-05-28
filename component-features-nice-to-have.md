# Component Features — Nice to Have

Ideen für zukünftige Features an bestehenden Komponenten.
Priorisierung nach User-Nutzen und Implementierungsaufwand.

---

## GanttChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| Touch / Mobile Drag | Drag & Drop auf Touch-Geräten (Pointer Events API) | Hoch | — |
| Export PNG/PDF | Timeline als Bild oder PDF exportieren | Hoch | — |
| Keyboard Navigation | Pfeiltasten für Task-Auswahl, Enter zum Öffnen | Mittel | — |
| Spalte: Assignee | Zusätzliche Spalte im Task-Panel für Verantwortliche | Mittel | — |
| Resource View | Horizontale Ansicht: eine Zeile pro Person | Hoch | — |
| Baseline-Vergleich | Ursprungsplanung vs. Ist-Stand visuell überlagern | Hoch | — |
| ~~Zoom per Scroll~~ | ~~Ctrl+Scroll ändert TimeScale (days/weeks/months/quarters)~~ | ~~Mittel~~ | ✅ bereits implementiert (`zoomable={true}`) |
| Multi-Select | Mehrere Tasks gleichzeitig verschieben | Hoch | — |
| ~~Today-Button~~ | ~~Toolbar-Button scrollt automatisch zum heutigen Tag~~ | ~~Niedrig~~ | ✅ bereits implementiert |
| ~~Heute-Chip~~ | ~~Kleiner Chip oben an der gestrichelten Heute-Linie, Tooltip = aktuelles Datum, `todayLabel`-Translation~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| Mini-Map | Kleine Übersichts-Timeline zum schnellen Navigieren | Hoch | — |

---

## RichTextEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~Word Count~~ | ~~Wörter- und Zeichen-Zähler im Footer~~ | ~~Niedrig~~ | ✅ v1.4.0 |
| ~~Full Screen Mode~~ | ~~Editor nimmt den gesamten Viewport ein~~ | ~~Niedrig~~ | ✅ v1.4.0 |
| ~~Tabellen~~ | ~~Tiptap Table Extension — Zeilen/Spalten einfügen~~ | ~~Mittel~~ | ✅ v2.1.0 |
| ~~Bild-Embed~~ | ~~`<img>` per URL oder Base64 einfügen~~ | ~~Mittel~~ | ✅ v2.1.0 |
| ~~Emoji Picker~~ | ~~😀 Button mit Such-Emoji-Popover~~ | ~~Mittel~~ | ✅ v2.1.0 |
| Mention (@) | Personen oder Entitäten referenzieren mit Autocomplete | Hoch | — |
| Slash Commands (/) | Kontextmenü beim Tippen von `/` für Blöcke | Hoch | — |
| Mathformel (KaTeX) | `$$`-Block für LaTeX-Formeln | Hoch | — |
| Diff View | Zwei Versionen vergleichen (readonly) | Hoch | — |

---

## SqlEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| Multi-Tab Queries | Mehrere SQL-Abfragen in Tabs | Hoch | — |
| Ergebnis-Panel | Vorschau-Tabelle für Query-Ergebnisse direkt im Editor | Hoch | — |
| Query-Verlauf | Letzte N Abfragen im Dropdown | Mittel | — |
| Snippet-Bibliothek | Gespeicherte SQL-Bausteine einfügen | Mittel | — |
| Hover-Doku | Spalten-/Tabellen-Kommentar als Tooltip beim Hover | Mittel | — |
| ~~Keyboard Shortcut Execute~~ | ~~Cmd+Enter für `onExecute`~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~Zeilennummern-Gutter anpassen~~ | ~~Breite automatisch an max. Zeilenzahl anpassen~~ | ~~Niedrig~~ | ✅ v1.5.0 |

---

## JsonEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| JSON Schema Validierung | Schema-Props für strukturelle Validierung | Hoch | — |
| Tree View | Toggle zwischen Text- und Baumansicht | Hoch | — |
| JSON Path Finder | Klick auf Wert zeigt den JSON-Path | Mittel | — |
| Diff Mode | Zwei JSON-Strings vergleichen (readonly) | Hoch | — |
| Folding | Collapsible Objekte und Arrays per Gutter-Klick | Mittel | — |
| ~~Minimap~~ | ~~Vertikale Übersicht für große JSON-Dokumente~~ | ~~Niedrig~~ | ✅ v1.5.0 |

---

## TagSelection

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| Drag to Reorder | Selected Tags per Drag umsortieren | Mittel | — |
| Tag Groups | Tags in Kategorien einteilen (Group-Header im Dropdown) | Mittel | — |
| ~~Tag Colors~~ | ~~`color`-Prop pro Tag für farbige Chips~~ | ~~Niedrig~~ | ✅ bereits implementiert |
| ~~Max-Tags-Limit~~ | ~~Verhindert Auswahl über n Tags hinaus~~ | ~~Niedrig~~ | ✅ bereits implementiert |
| Async Search | `onSearch`-Callback mit Debounce für Server-seitige Tags | Mittel | — |

---

## PasswordStrengthMeter

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| Passwort-Generator | Button generiert ein sicheres Passwort | Mittel | — |
| Confirm-Feld | Zweites Eingabefeld mit Match-Validierung | Mittel | — |
| ~~Custom Requirements~~ | ~~Eigene Anforderungen als Array-Prop übergeben~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~Animated Segments~~ | ~~Strength-Bar als 4 separate Segmente statt einer Bar~~ | ~~Niedrig~~ | ✅ v1.5.0 |

---

## ConfirmDialog

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| Loading State | `confirm()` bleibt offen mit Spinner während async Action läuft | Mittel | — |
| ~~Countdown~~ | ~~Auto-Close nach n Sekunden mit Timer-Anzeige~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~Keyboard Shortcut~~ | ~~Enter = Confirm, Escape = Cancel~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| Stacked Dialogs | Mehrere Dialoge in einer Queue statt auto-cancel | Mittel | — |

---

## D3 Charts — Neue Komponentenfamilie

> **Quell-Projekt (Fluent UI Basis):** `/Users/thomasschlender/Development-PCF/skejlo-charts`  
> Alle Charts befinden sich unter `src/components/_charts/`, Demo-Daten unter `src/_demo-data/*.json`.  
> Alle Charts basieren auf **D3 v7** + React SVG. Fluent UI-Abhängigkeiten werden durch MUI-Integration ersetzt.  
> **Neue peer dependency:** `d3@^7` (muss zu `peerDependencies` + `devDependencies` hinzugefügt werden).

### Migration-Strategie (gilt für alle Charts)

#### Look & Feel — wie aus einem Guss mit der bestehenden Library

1. **D3-Kern-Logik 1:1 übernehmen** (keine Fluent UI-Imports außer in RadialTreeChart)
2. **SVG in MUI `Box` / `Paper` wrappen** — gleiche Struktur wie SqlEditor, JsonEditor, RichTextEditor
3. **MUI-Theme-Integration (Pflicht für jeden Chart):**
   - Dark Mode automatisch: SVG-Texte via `theme.palette.text.primary`, Hintergründe via `theme.palette.background.paper`
   - Schriftart: `theme.typography.fontFamily` statt hardcoded `'sans-serif'`
   - Segment-Hover: `theme.palette.action.hover`

#### Farb-Prop — Spielraum für den User

Jeder Chart bekommt ein `chartColors?: string[]`-Prop (opt-in Override):
- **Kein Prop gesetzt** → automatische MUI-Palette: `[primary.main, secondary.main, error.main, warning.main, success.main, info.main, ...]` aus `useTheme()` — passt automatisch zum aktiven Theme (light/dark/custom)
- **`chartColors` gesetzt** → User-Palette wird 1:1 verwendet (wie bisher `colors` in SunburstChart)
- Export: `DEFAULT_CHART_COLORS` — die 6 MUI-Palette-Farben als Fallback-Array für Tests und Dokumentation

#### Translation-Prop — wie überall in der Library

Jeder Chart bekommt:
```ts
translation?: Partial<XxxChartTranslation>
```
mit exportiertem `DEFAULT_XXX_CHART_TRANSLATION` (englische Defaults) — analog zu `RichTextEditorTranslation`, `SqlEditorTranslation` etc.

Typische Translation-Keys pro Chart (je nach Bedarf):
- `noData` — Platzhalter wenn `data` leer ist
- `ctrlClickToZoomIn` / `ctrlDblClickToZoomOut` / `escToResetZoom` — Interaktions-Hints (Ctrl+Click-Modell)
- Komponentenspezifische Labels

#### Weitere Konventionen
- `console.log` entfernen — nur strukturierte Callbacks (`onSegmentClick`, `onNodeClick` etc.)
- `disabled?: boolean` — deaktiviert Interaktionen, reduziert Opacity (wie überall)
- Storybook: pre-filled Demo-Daten aus `_demo-data/*.json`, alle wichtigen Features als dedizierte named Stories mit `parameters.docs.description.story`
- Vitest: render-Test, prop-defaults, Callback-Test
- User Manual EN + DE mit `✨ New in vX.X.X`-Callout
- CHANGELOG EN + DE, README EN + DE, `component-features-nice-to-have.md` aktualisieren

---

### ~~MTL-19 — SunburstChart~~ ✅ v2.2.0 — Branch bereit zum Merge

> Quelle: `skejlo-charts/src/components/_charts/sunburst-chart/SunburstChart.tsx`  
> Branch: `MTL-19` — noch nicht in main gemergt, noch nicht auf npm

**Implementiert:**

| Feature | Beschreibung |
|---|---|
| Hierarchische Daten | `SunburstChartData { id, name, value?, children? }` |
| Konzentrische Ringe | Jede Ebene = ein Ring; Wurzel im Zentrum |
| **Ctrl+Click Zoom-Modell** | Click → `onSegmentClick` sofort; Ctrl+Click → Zoom in; Ctrl+DblClick → Zoom out; Escape → Reset |
| Donut-Modus | `innerRadius > 0` |
| Label-Truncation | Arc-Breite berechnet, Ellipsis + MIN_LABEL_L=5 (zu kurze Labels werden ausgeblendet) |
| MUI Tooltip | `followCursor`, `enterDelay=50ms` — erscheint direkt am Mauszeiger; zeigt Name, Wert, Breadcrumb |
| MUI-Theme-Palette | Default-Farben aus `useTheme()` (primary → secondary → error → warning → success → info) |
| Farbpalette | `chartColors?: string[]` Override |
| `onSegmentClick` | `SunburstSegmentInfo`: `id`, `name`, `value`, `percentage`, `depth`, `path`, `pathIds`, `childrenCount`, `data` |
| `onZoomChange` | `SunburstZoomInfo { focusNode, isRoot }` — feuert bei jedem Zoom-Wechsel |
| Sortierung | `sortBy: 'value' \| 'name'` |
| `disabled` | Interaktionen deaktiviert, Opacity 0.5 |
| Stories | Default, DonutStyle, SortedByName, NoLabels, CustomPalette, Disabled |
| Tests | 11 Vitest-Tests, alle grün |
| Docs | User Manual EN+DE, CHANGELOG EN+DE, README EN+DE |

| Status | ✅ v2.2.0 — Branch `MTL-19`, merge + npm publish ausstehend |
|---|---|

---

### SunburstChart — Feature-Ideen (nach v2.2.0)

| Feature | Beschreibung | Aufwand |
|---|---|---|
| **Animierte Zoom-Übergänge** | D3 arc interpolation beim Drill-down — weiche Überblendung statt Sofortschnitt | Mittel |
| **`onZoomChange` Callback** | Feuert beim Zoom-Wechsel mit `{ focusNode, isRoot }` — damit der Parent Breadcrumb außerhalb anzeigen oder Zoom-State persistieren kann | ✅ v2.2.0 |
| **`focusId` controlled prop** | Parent kann den Zoom-Zustand von außen steuern — z.B. Breadcrumb-Click außerhalb des Charts navigiert hinein | Mittel |
| **Hover-Highlight** | Fill-Opacity-Änderung beim Hover auf Segmente — visuelles Feedback bevor Click | Niedrig |
| **"Sonstige"-Kollaps** | Sehr kleine Segmente (< X % des Gesamtwerts) werden zu einem "Other"-Segment zusammengefasst — `minPercentage?: number`-Prop | Mittel |
| **Legende** | Optionale Farb-Legende unterhalb/seitlich des Charts — zeigt Top-Level-Segmente mit Farbe + Name + Wert | Mittel |
| **Responsive Größe** | `size="auto"` passt sich dem Container an — statt fixer Pixelgröße | Mittel |
| **Prozentanzeige in Labels** | Labels zeigen % statt Name — oder beides: `"Frontend 10.2%"` — `labelMode: 'name' | 'percent' | 'both'`-Prop | Niedrig |
| **Export PNG/SVG** | Download-Button — Chart als Bild exportieren | Mittel |
| **Multi-Ring Font-Sizes** | Tiefere Ringe → kleinere Schrift — `labelFontSizeByDepth?: number[]` | Niedrig |
| **`id` in `SunburstSegmentInfo`** | Direkt zugängliche ID im Callback (kein `info.data.id`) + `pathIds` + `percentage` | ✅ v2.2.0 |

---

### MTL-20 — TreemapChart ⭐ Als nächstes

> Quelle: `skejlo-charts/src/components/_charts/treemap-chart/TreemapChart.tsx`  
> **Aufwand: Niedrig** — kein Fluent UI, reines D3 + React SVG (ähnlich SunburstChart)

Hierarchische Daten als verschachtelte Rechtecke. Gut für Proportionsvergleiche auf einer Ebene.

| Status | — (nach MTL-19) |
|---|---|

---

### MTL-21 — ZoomableCirclePackingChart

> Quelle: `skejlo-charts/src/components/_charts/zoomable-circle-packing-chart/ZoomableCirclePackingChart.tsx`  
> **Aufwand: Mittel** — kein Fluent UI; Zoom-Animation via D3 interpolation

Hierarchische Daten als ineinander geschachtelte Kreise. Zoom per Klick.

| Status | — (nach MTL-20) |
|---|---|

---

### MTL-22 — ChordChart

> Quelle: `skejlo-charts/src/components/_charts/chord-chart/ChordChart.tsx`  
> **Aufwand: Mittel** — Fluent UI nur in Stories (nicht in der Komponente); Stories müssen angepasst werden

Beziehungen zwischen Gruppen als Chord-Diagramm. Ideal für Netzwerk- und Flow-Daten.

| Status | — (nach MTL-21) |
|---|---|

---

### MTL-23 — RadialTreeChart

> Quelle: `skejlo-charts/src/components/_charts/radial-tree-chart/RadialTreeChart.tsx`  
> **Aufwand: Hoch** — Fluent UI tief integriert in der Komponente selbst (`@fluentui/react-components`, `@fluentui/react-icons`)  
> Fluent UI Icons müssen durch MUI Icons (`@mui/icons-material`) oder eigene SVG-Icons ersetzt werden

Hierarchische Daten als radialer Baum. Nodes können eigene Icons haben (File, Folder, Person…).

| Status | — (nach MTL-22, größter Umbau) |
|---|---|
