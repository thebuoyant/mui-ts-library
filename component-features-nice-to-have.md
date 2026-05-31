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
| ~~Zoom per Scroll~~ | ~~Ctrl / Cmd ⌘+Scroll ändert TimeScale~~ | ~~Mittel~~ | ✅ v1.5.0 |
| Multi-Select | Mehrere Tasks gleichzeitig verschieben | Hoch | — |
| ~~Today-Button~~ | ~~Toolbar-Button scrollt zum heutigen Tag~~ | ~~Niedrig~~ | ✅ bereits implementiert |
| ~~Heute-Chip~~ | ~~Chip an der gestrichelten Heute-Linie~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| Mini-Map | Kleine Übersichts-Timeline zum schnellen Navigieren | Hoch | — |
| Undo / Redo | Ctrl+Z für Task-Moves | Hoch | — |
| CSV / Excel Export | Tasks als Tabelle exportieren | Mittel | — |

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
| AI-Autocomplete | LLM-Endpoint für SQL-Vorschläge — Differenzierungsmerkmal | Hoch | — |
| ~~Keyboard Shortcut Execute~~ | ~~Cmd / Ctrl+Enter für `onExecute`~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~Zeilennummern-Gutter anpassen~~ | ~~Breite auto an max. Zeilenzahl~~ | ~~Niedrig~~ | ✅ v1.5.0 |

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
| ~~Custom Requirements~~ | ~~Eigene Anforderungen als Array-Prop~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~Animated Segments~~ | ~~Strength-Bar als 4 separate Segmente~~ | ~~Niedrig~~ | ✅ v1.5.0 |

---

## ConfirmDialog

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| Loading State | `confirm()` bleibt offen mit Spinner während async Action | Mittel | — |
| ~~Countdown~~ | ~~Auto-Close nach n Sekunden~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~Keyboard Shortcut~~ | ~~Enter = Confirm, Escape = Cancel~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| Stacked Dialogs | Mehrere Dialoge in einer Queue statt auto-cancel | Mittel | — |

---

## Developer Experience

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~Live Storybook~~ | ~~`https://thebuoyant.github.io/mui-ts-library/` — interaktive Demos ohne Installation~~ | ~~Mittel~~ | ✅ Aktiv — auto-deploy bei jedem Push auf `main` |
| StackBlitz / CodeSandbox Templates | "Try it now"-Links direkt in README | Niedrig | — |
| VS Code Snippets | `rte-basic`, `gantt-basic` → autovervollständigt ein fertiges Snippet | Niedrig | — |
| Playwright Visual Tests | Screenshot-Vergleiche für Chart-Rendering | Hoch | — |

---

## D3 Charts — Komponentenfamilie

> **Quell-Projekt:** `/Users/thomasschlender/Development-PCF/skejlo-charts`  
> **Gemeinsame Konventionen aller D3-Charts:**
> - `chartColors?: string[]` + `colorConfig?` pro Knoten — Palette oder Per-Node-Override
> - `zoomable?: boolean` — Ctrl / Cmd ⌘+Scroll visueller Zoom, Escape-Reset
> - `drillable?: boolean` (Hierarchie-Charts) — Ctrl / Cmd ⌘+Click Drill-Down
> - `disabled?: boolean` — alle Interaktionen aus, Opacity 0.5
> - `translation?` — i18n, MUI `<Tooltip followCursor>`, User Manuals EN + DE

---

### ~~MTL-19 — SunburstChart~~ ✅ v2.2.0

Konzentrische Ringe, Ctrl / Cmd ⌘+Click Drill-Down + visueller Scroll-Zoom, Label-Truncation, `onSegmentClick` mit `id`/`percentage`/`pathIds`, `onZoomChange`, Donut-Modus, `colorConfig`.

---

### ~~MTL-20 — ChordChart~~ ✅ v2.3.0

Arc-Gruppen + Ribbon-Bänder, Hover-Highlight, `directed`/`undirected`, `groupColorConfigs`, `zoomable`.

---

### ~~MTL-21 — RadialTreeChart~~ ✅ v2.4.0

Farbige Bubble-Nodes mit Icons, `drillable`, `zoomable`, `showNodePopover`, `colorConfig`, Breadcrumb.

---

### ~~MTL-22 — CirclePackingChart~~ ✅ v2.5.0

D3 pack-Layout, animierter `d3.interpolateZoom`-Zoom (DblClick), visueller Scroll-Zoom, `showAllLabels` (fit oder `…`), fette Eltern-Labels, `colorConfig`, HCL-Gradient-Modus.

---

### ~~MTL-23 — Live Storybook (GitHub Pages)~~ ✅ Deployed

`https://thebuoyant.github.io/mui-ts-library/` — auto-deploy bei jedem Push auf `main` via `peaceiris/actions-gh-pages@v4`.

---

### ~~MTL-24 — HorizontalTreeChart~~ ✅ v2.6.0 — Branch MTL-24, merge ausstehend

4 Orientierungen (`LR` / `RL` / `TB` / `BT`), geschwungene Bézier-Links, Bubble-Nodes mit Icons, `drillable`, `zoomable`, `showNodePopover`, `colorConfig`, 7 Stories, 10 Tests.

---

### MTL-25 — TreemapChart ⭐ Als nächstes

> Quelle: `skejlo-charts/src/components/_charts/treemap-chart/TreemapChart.tsx`  
> **Aufwand: Niedrig** — kein Fluent UI, reines D3 + React SVG

Hierarchische Daten als verschachtelte Rechtecke. Ideal für Proportionsvergleiche: Budgets, Speicherverbrauch, Marktanteile. Gleiche Konventionen wie alle D3-Charts.

| Status | — (nach MTL-24 merge) |
|---|---|

---

### D3 Charts — Feature-Ideen (aus User-Sicht)

| Feature | Komponenten | Beschreibung | Aufwand |
|---|---|---|---|
| **Responsive `size="auto"`** | Alle D3 Charts | Passt sich dem Container an | Mittel |
| **Export PNG / SVG** | Alle D3 Charts | Download-Button für Präsentationen | Mittel |
| **Daten-Animation** | Alle D3 Charts | Smooth animieren wenn `data` sich ändert | Hoch |
| **Loading Skeleton** | Alle D3 Charts | `loading={true}` zeigt animierten Platzhalter | Niedrig |
| **Empty State** | Alle D3 Charts | Hübsche Darstellung wenn `data` leer ist | Niedrig |
| **Legende** | Sunburst, Chord | Farb-Legende mit Segment/Gruppen-Namen + Wert | Niedrig |
| **`focusId` controlled** | Sunburst, RadialTree, HorizontalTree | Parent steuert Drill-Down (URL-persistierbar) | Mittel |
| **Animierte Drill-Down-Übergänge** | SunburstChart | D3 arc interpolation beim Ctrl+Click | Mittel |
| **Collapsible Nodes** | RadialTree, HorizontalTree | Klick klappt Teilbaum zusammen/auf | Hoch |
| **Suche / Highlight** | RadialTree, HorizontalTree, CirclePacking | Knoten nach Name suchen + hervorheben | Mittel |

---

### Neue Komponenten — die die Nische vervollständigen

| Idee | Beschreibung | Priorität |
|---|---|---|
| **HeatmapChart** | Matrix-Heatmap (GitHub Contribution Graph, Wochentag × Stunde) | ⭐⭐⭐ |
| **SankeyChart** | Flussdiagramm für Mengenverlauf (Sales Funnel, Budget-Verteilung) | ⭐⭐⭐ |
| **KPICard** | Kennzahlen-Chip mit Trend-Indikator, Sparkline, Farb-Threshold | ⭐⭐⭐ |
| **TimelineChart** | Ereignishistorie auf einer Achse (Audit-Log, Incident-Timeline) | ⭐⭐ |
| **ForceGraph** | Netzwerk-/Abhängigkeitsgraph (D3 Force Layout) | ⭐⭐ |
