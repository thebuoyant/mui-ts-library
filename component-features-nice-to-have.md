# Component Features — Nice to Have

Ideen für zukünftige Features an bestehenden Komponenten.
Priorisierung nach User-Nutzen und Implementierungsaufwand.

---

## 🚀 Nächste Aktion: Live-Storybook auf GitHub Pages

**Ziel:** Jeder User kann die Komponenten online ausprobieren — ohne Installation, direkt im Browser.  
**URL (nach Setup):** `https://thebuoyant.github.io/mui-ts-library/`  
**Ansatz:** `peaceiris/actions-gh-pages@v4` — baut Storybook und pusht auf `gh-pages` Branch

### Warum dieser Ansatz (und nicht der alte)?

Der erste Versuch scheiterte an `actions/deploy-pages@v4` (OIDC 404-Fehler, GitHub-seitige Provisioning-Probleme).  
`peaceiris/actions-gh-pages@v4` umgeht das komplett: baut Storybook → pusht HTML/JS in `gh-pages` Branch → GitHub Pages served daraus. Kein OIDC, kein Environment-Problem.

### Setup-Schritte (einmalig, ~5 Minuten)

**Schritt 1 — Workflow-Datei anlegen** *(Claude erledigt das)*  
Datei: `.github/workflows/deploy-storybook.yml`  
Trigger: jeder Push auf `main`  
Action: `peaceiris/actions-gh-pages@v4` mit `publish_dir: ./storybook-static`

**Schritt 2 — GitHub Repository Settings** *(du, 3 Klicks)*  
`github.com/thebuoyant/mui-ts-library/settings/pages`  
→ **Source:** "Deploy from a branch"  
→ **Branch:** `gh-pages`  
→ **Folder:** `/ (root)`  
→ **Save**

**Schritt 3 — Ersten Push machen** *(Claude)*  
Commit + Push auf `main` → Workflow läuft → `gh-pages` Branch wird angelegt → Pages aktiv

**Schritt 4 — URL in README + npm eintragen** *(Claude)*  
`https://thebuoyant.github.io/mui-ts-library/` in README.md ergänzen

### Wichtig: npm publish v2.5.0 vorher!
Bevor das Storybook live geht, sollte v2.5.0 auf npm published sein.  
`npm login` → `npm publish --access public`

| Status | ⏳ Nächste Session — Implementierung ausstehend |
|---|---|

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
| ~~Zoom per Scroll~~ | ~~Ctrl / Cmd ⌘+Scroll ändert TimeScale~~ | ~~Mittel~~ | ✅ v1.5.0 (`zoomable={true}`) |
| Multi-Select | Mehrere Tasks gleichzeitig verschieben | Hoch | — |
| ~~Today-Button~~ | ~~Toolbar-Button scrollt zum heutigen Tag~~ | ~~Niedrig~~ | ✅ bereits implementiert |
| ~~Heute-Chip~~ | ~~Chip an der gestrichelten Heute-Linie~~ | ~~Niedrig~~ | ✅ v1.5.0 |
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

## D3 Charts — Komponentenfamilie

> **Quell-Projekt:** `/Users/thomasschlender/Development-PCF/skejlo-charts`  
> Alle Charts: D3 v7 + React SVG + MUI-Theme-Integration.  
> **Gemeinsame Konventionen aller D3-Charts:**
> - `chartColors?: string[]` — eigene Palette; Fallback: MUI-Palette (primary → secondary → ...)
> - `colorConfig?: { fill?, textColor?, stroke? }` **pro Daten-Knoten** — überschreibt Palette für diesen Knoten
> - `zoomable?: boolean` — Ctrl / Cmd ⌘+Scroll visueller Zoom, Escape-Reset, overflow-Clipping
> - `disabled?: boolean` — alle Interaktionen aus, Opacity 0.5
> - `translation?: Partial<XxxTranslation>` — i18n wie überall in der Library
> - MUI `<Tooltip followCursor>` — kein Browser-Delay, direkt am Mauszeiger
> - Vollständige User Manuals EN + DE, CHANGELOG EN + DE, README EN + DE

---

### ~~MTL-19 — SunburstChart~~ ✅ v2.2.0

**Features:** Konzentrische Ringe, Ctrl / Cmd ⌘+Click Drill-Down, Ctrl / Cmd ⌘+DblClick Zoom-Out, Ctrl / Cmd ⌘+Scroll visueller Zoom, Label-Truncation (MIN_LABEL_L), `onSegmentClick` mit `id`/`percentage`/`pathIds`, `onZoomChange`, `innerRadius` (Donut), `sortBy`, `colorConfig` pro Knoten.

---

### ~~MTL-20 — ChordChart~~ ✅ v2.3.0

**Features:** Arc-Gruppen + Ribbon-Bänder, Hover-Highlight, `directed`/`undirected`, `onGroupClick`/`onChordClick` mit sauberen Infos, `groupColorConfigs` (Record<groupName, config>) für Gruppen-Farb-Override, Ctrl / Cmd ⌘+Scroll visueller Zoom.

---

### ~~MTL-21 — RadialTreeChart~~ ✅ v2.4.0

**Features:** Farbige Bubble-Nodes (Kreise mit weißem Icon), `drillable` (Ctrl / Cmd ⌘+Click Drill-Down / DblClick Zoom-Out), `zoomable` (Ctrl / Cmd ⌘+Scroll), Breadcrumb-Anzeige beim Drill-In, `onFocusChange`, `showNodePopover` (MUI Popover mit Avatar + Datenwerten), `colorConfig` pro Knoten, konfigurierbare Node-Radien/Farben/Abstände.

---

### ~~MTL-22 — CirclePackingChart~~ ✅ v2.5.0 — Branch MTL-22, merge ausstehend

**Features:**
| Feature | Beschreibung | Status |
|---|---|---|
| D3 pack-Layout | Kreise proportional zur Größe, automatisch verschachtelt | ✅ |
| Animierter Zoom | Ctrl / Cmd ⌘+Click → smooth `d3.interpolateZoom`-Transition; Ctrl / Cmd ⌘+DblClick → zurück | ✅ |
| Visueller Zoom | `zoomable`: Ctrl / Cmd ⌘+Scroll → ViewBox-Skalierung, Escape-Reset | ✅ |
| `showAllLabels` | Inner-Circle Labels — voller Text wenn passt, `…` bei overflow, ab r≥14px | ✅ |
| Outer-Labels | Fett für Eltern-Kreise, normal für Blätter | ✅ |
| `colorConfig` | Per-Knoten Farb-Override im Datenmodell | ✅ |
| Farb-Modi | MUI-Palette (default), `chartColors` (Palette), `depthColorStart`+`depthColorEnd` (HCL-Gradient) | ✅ |
| `onCircleClick` | `CirclePackingNodeInfo`: `id`, `name`, `value`, `percentage`, `depth`, `path`, `childrenCount` | ✅ |
| `onZoomChange` | `CirclePackingZoomInfo`: `previousName`, `currentName`, `currentDepth`, `isRoot` | ✅ |
| Storybook | Default, DeepHierarchy, CustomColors, GradientMode, WithColorConfig, WithAllLabels, Disabled | ✅ |

---

### D3 Charts — Feature-Ideen (nach v2.5.0, aus User-Sicht)

| Feature | Komponenten | Beschreibung | Aufwand |
|---|---|---|---|
| **Responsive `size`** | Alle 4 | `size="auto"` passt sich dem Container an — kein fixer Pixel-Wert | Mittel |
| **Export PNG/SVG** | Alle 4 | Download-Button — Browser-nativer SVG/Canvas-Export | Mittel |
| **Legende** | Sunburst, Chord | Farb-Legende mit Segment/Gruppen-Namen + Wert | Niedrig |
| **`focusId` controlled** | Sunburst, RadialTree, CirclePacking | Parent steuert Drill-Down-Zustand (URL-persistierbar, Breadcrumb-Sync) | Mittel |
| **Animierte Drill-Down-Übergänge** | SunburstChart | D3 arc interpolation beim Ctrl+Click — weiche Überblendung | Mittel |
| **Prozentlabels** | SunburstChart | `labelMode: 'name' \| 'percent' \| 'both'` | Niedrig |
| **Collapsible Nodes** | RadialTreeChart | Klick klappt Teilbaum zusammen/auf | Hoch |
| **Suche / Highlight** | RadialTreeChart, CirclePacking | Knoten nach Name suchen — Treffer hervorheben | Mittel |
| **"Sonstige"-Kollaps** | Sunburst, CirclePacking | Sehr kleine Segmente (< X%) → "Other"-Gruppe | Mittel |
| **`colorConfig.gradient`** | Alle 4 | Pro-Knoten Gradient-Farben (Start → Ende) | Niedrig |

---

### MTL-23 — TreemapChart ⭐ Als nächstes

> Quelle: `skejlo-charts/src/components/_charts/treemap-chart/TreemapChart.tsx`  
> **Aufwand: Niedrig** — kein Fluent UI, reines D3 + React SVG

Hierarchische Daten als verschachtelte Rechtecke. Ideal für Proportionsvergleiche: Budgets, Speicherverbrauch, Marktanteile.

Gleiche Konventionen wie alle D3-Charts: `chartColors`, `colorConfig`, `zoomable`, `disabled`, `translation`, MUI Tooltip.

| Status | — (nach Storybook-Live, MTL-23) |
|---|---|

---

## 💡 Ideen aus der Perspektive eines Dashboard-Entwicklers

*Was würde mich als Nutzer dieser Library wirklich begeistern — und was fehlt noch, um die "Dashboards & Daten-Apps mit MUI"-Nische vollständig zu besetzen?*

### Übergreifend — alle D3-Charts

| Idee | Warum wertvoll | Aufwand |
|---|---|---|
| **Export PNG / SVG** | Jeder Dashboard-User will Charts in Präsentationen / Reports | Mittel |
| **Responsive `size="auto"`** | Charts passen sich dem Container an — kein hardcoded `size={600}` | Mittel |
| **Daten-Animation** | Wenn sich die Daten ändern, animiert das Chart — lebendig statt statisch | Hoch |
| **Shared `D3ChartTheme`** | Ein zentrales Theming-Objekt für alle D3-Charts — konsistente Farben/Stile im Dashboard | Mittel |
| **Linked Selection** | Klick in Chart A hebt dasselbe Element in Chart B hervor — "Linked Brushing" für Dashboards | Hoch |
| **Loading Skeleton** | `loading={true}` zeigt einen animierten Platzhalter — kein weißes Aufflackern beim Datenladen | Niedrig |
| **Empty State** | Eigene, hübsche Darstellung wenn `data` leer ist — statt leerem SVG | Niedrig |

### Neue Komponenten — die die Nische vervollständigen

| Idee | Beschreibung | Priorität |
|---|---|---|
| **HeatmapChart** | Matrix-Heatmap (z.B. GitHub Contribution Graph, Wochentag × Stunde) — D3 sehr gut geeignet | ⭐⭐⭐ |
| **SankeyChart** | Flussdiagramm für Mengenverlauf (z.B. Sales Funnel, Budget-Verteilung) — mächtiger als ChordChart für sequentielle Flows | ⭐⭐⭐ |
| **TimelineChart** | Ereignishistorie auf einer Achse (Audit-Log, Release-History, Incident-Timeline) — anders als GanttChart | ⭐⭐ |
| **ForceGraph** | Netzwerk-/Abhängigkeitsgraph mit D3 Force Layout — ideal für Microservice-Maps, Beziehungsgraphen | ⭐⭐ |
| **KPICard** | Einzelner Kennzahlen-Chip mit Trend-Indikator, Sparkline und Farb-Threshold — Dashboard-Grundbaustein | ⭐⭐⭐ |

### Bestehende Komponenten — das Sahnehäubchen

| Idee | Komponente | Warum jetzt noch nicht, aber bald | Aufwand |
|---|---|---|---|
| **Query History** | SqlEditor | localStorage-basierter Verlauf der letzten 20 Queries — Entwickler lieben das | Niedrig |
| **Undo / Redo** | GanttChart | Ctrl+Z für Task-Moves — fehlt bei jedem Gantt-Tool und ist überraschend selten | Hoch |
| **CSV/Excel Export** | GanttChart | Tasks als Tabelle exportieren — Brücke zu PM-Tools wie Excel/Jira | Mittel |
| **AI-Autocomplete** | SqlEditor | Integration mit LLM-Endpoint für SQL-Vorschläge — Differenzierungsmerkmal | Hoch |
| **Mentions (@)** | RichTextEditor | Users/Tags referenzieren — macht Editor für Team-Apps nutzbar | Hoch |
| **Daten-Update-Animation** | Alle D3 Charts | Wenn `data` Prop sich ändert, smooth animieren statt hart neu rendern | Mittel |

### Developer Experience — was Users dazu bringt, die Library zu wählen

| Idee | Beschreibung | Aufwand |
|---|---|---|
| **StackBlitz / CodeSandbox Templates** | "Try it now"-Links direkt in README — kein `npm install` nötig zum Ausprobieren | Niedrig |
| **VS Code Snippets** | `rte-basic`, `gantt-basic` → autovervollständigt ein fertiges Snippet | Niedrig |
| **Storybook Live** | `https://thebuoyant.github.io/mui-ts-library/` — ⏳ MTL-23 in Arbeit | **Nächste Aktion** |
| **Playwright Visual Tests** | Screenshot-Vergleiche für Chart-Rendering — keine Regressionen in Looks | Hoch |
