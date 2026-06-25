# Component Features — Nice to Have

Ideen für zukünftige Features an bestehenden Komponenten.
Priorisierung nach User-Nutzen und Implementierungsaufwand.

**Legende:**
⭐ Hoher User-Nutzen, Niedrig/Mittel Aufwand — direkt angehen
🔴 Adoption-Stopper · 🟡 Bekannter Bug / Inkonsistenz
✅ Erledigt (Version in der letzten Spalte) · ⚡ Offen, aber bereits eingeplant · `—` Offen, noch nicht eingeplant

Innerhalb jeder Sektion stehen offene Items zuerst (⭐ oben), erledigte (durchgestrichen) am Ende der Tabelle.

---

## GanttChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Keyboard Navigation | Pfeiltasten für Task-Auswahl, Enter zum Öffnen — Accessibility-Grundlage | Mittel | — |
| ⭐ Export PNG/PDF | Timeline als Bild oder PDF — meistgefragtes Feature in Gantt-Bibliotheken | Hoch | — |
| Schnell-Hinzufügen | Task direkt aus der Toolbar anlegen mit Preset-Daten (kein Dialog) | Mittel | — |
| Bulk-Status-Änderung | Mehrere Tasks markieren und Status/Fortschritt auf einmal ändern | Mittel | — |
| Undo / Redo | Ctrl+Z für Task-Verschiebungen | Hoch | — |
| Baseline-Vergleich | Ursprungsplanung vs. Ist-Stand visuell überlagern — zwei Balken pro Task | Hoch | — |
| Wiederkehrende Tasks | Zyklische Aufgaben mit Wiederholungsmuster (täglich/wöchentlich/monatlich) | Hoch | — |
| Resource View | Horizontale Ansicht: eine Zeile pro Person/Ressource | Hoch | — |
| Touch / Mobile Drag | Drag & Drop auf Touch-Geräten (Pointer Events API) | Hoch | — |
| Mini-Map | Kleine Übersichts-Timeline für schnelle Navigation bei vielen Tasks | Hoch | — |
| ~~Spalte: Assignee~~ | ~~Zusätzliche Spalte im Task-Panel für Verantwortliche~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~CSV / Excel Export~~ | ~~Tasks als Tabelle exportieren~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~Zoom per Scroll~~ | ~~Ctrl / Cmd ⌘+Scroll ändert TimeScale~~ | ~~Mittel~~ | ✅ v1.5.0 |
| ~~Today-Button~~ | ~~Toolbar-Button scrollt zum heutigen Tag~~ | ~~Niedrig~~ | ✅ implementiert |
| ~~Heute-Chip~~ | ~~Chip an der gestrichelten Heute-Linie~~ | ~~Niedrig~~ | ✅ v1.5.0 |

---

## RichTextEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| Mention (@) | Personen oder Entitäten per `@` referenzieren mit Autocomplete | Hoch | — |
| Slash Commands (/) | Kontextmenü beim Tippen von `/` — Blöcke einfügen (Notion-Pattern) | Hoch | — |
| Custom Content Blocks | Eigene Block-Typen registrieren (Callout-Box, Alert, Info-Panel) | Hoch | — |
| Diff View | Zwei HTML-Versionen readonly nebeneinander vergleichen | Hoch | — |
| Mathformel (KaTeX) | `$$`-Block für LaTeX-Formeln | Hoch | — |
| ~~Word Count~~ | ~~Wörter- und Zeichen-Zähler im Footer~~ | ~~Niedrig~~ | ✅ v1.4.0 |
| ~~Full Screen Mode~~ | ~~Editor nimmt den gesamten Viewport ein~~ | ~~Niedrig~~ | ✅ v1.4.0 |
| ~~Tabellen~~ | ~~Tiptap Table Extension — Zeilen/Spalten einfügen~~ | ~~Mittel~~ | ✅ v2.1.0 |
| ~~Bild-Embed~~ | ~~`<img>` per URL oder Base64 einfügen~~ | ~~Mittel~~ | ✅ v2.1.0 |
| ~~Emoji Picker~~ | ~~😀 Button mit Such-Emoji-Popover~~ | ~~Mittel~~ | ✅ v2.1.0 |
| ~~Einfügen als Klartext~~ | ~~Toggle: Eingefügter Inhalt wird automatisch von Formatierung befreit~~ | ~~Niedrig~~ | ✅ v3.8.0 |
| ~~Markdown-Import/Export~~ | ~~Zwischen HTML-Inhalt und Markdown per Klick konvertieren~~ | ~~Mittel~~ | ✅ v3.8.0 |

---

## SqlEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Hover-Doku | Spalten-/Tabellen-Kommentar als Tooltip aus Schema beim Hover | Mittel | — |
| ⭐ AI-Autocomplete | LLM-Endpoint für SQL-Vorschläge — klares Differenzierungsmerkmal, kein anderer MUI-Editor bietet das | Hoch | — |
| Ergebnis-Metadaten-Footer | Nach `onExecute`: Zeilenanzahl + Ausführungszeit im Footer | Mittel | — |
| Snippet-Bibliothek | Gespeicherte SQL-Bausteine mit Namen einfügen | Mittel | — |
| Multi-Tab Queries | Mehrere SQL-Abfragen in Tabs — je eigene History/Ausführung | Hoch | — |
| ~~Keyboard Shortcut Execute~~ | ~~Cmd / Ctrl+Enter für `onExecute`~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~Zeilennummern-Gutter anpassen~~ | ~~Breite auto an max. Zeilenzahl~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~⭐ Query-Verlauf~~ | ~~Letzte N Abfragen speichern/laden (localStorage)~~ — `toolbarConfig.showHistory` + `queryHistoryKey`/`queryHistoryMaxEntries`, History-Menu zum Nachladen, "Clear history". | ~~Mittel~~ | ✅ v3.5.0 |

---

## JsonEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| Beispiel-JSON Generator | Button generiert minimales Placeholder-JSON für schnelles Testen | Niedrig | — |
| Diff Mode | Zwei JSON-Strings readonly nebeneinander vergleichen | Hoch | — |
| Tree View | Toggle zwischen Text- und Baumansicht | Hoch | — |
| ~~Minimap~~ | ~~Vertikale Übersicht für große JSON-Dokumente~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~⭐ JSON Path Finder~~ | ~~Klick auf Wert kopiert vollständigen JSON-Path~~ — `Ctrl/Cmd+Click` kopiert Pfad (z.B. `$.items[0].id`) via Lezer-Syntaxbaum, mit visuellem Feedback. `enablePathFinder`, `onPathCopy`. | ~~Niedrig~~ | ✅ v3.7.0 |
| ~~⭐ Folding / Collapsible~~ | ~~Objekte und Arrays inline ein-/aufklappen~~ — `@codemirror/lang-json` hatte Folding schon eingebaut, nur Gutter + Keymap fehlten. `showFolding` (Default `true`). | ~~Mittel → Niedrig~~ | ✅ v3.7.0 |
| ~~JSON Schema Validierung~~ | ~~Schema-Prop für strukturelle Validierung (Typ, Required-Felder, Enum)~~ — `schema`-Prop mit Typ/Required/Enum/verschachtelten properties+items, Fehler als Inline-Diagnostics wie der Parse-Linter. | ~~Hoch~~ | ✅ v3.7.0 |

---

## TagSelection

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Async Search | `onSearch`-Callback mit Debounce für Server-seitige Tags — fast jedes Produktiv-Projekt braucht das | Mittel | — |
| Tag Groups | Tags in Kategorien einteilen (Group-Header im Dropdown) | Mittel | — |
| Drag to Reorder | Ausgewählte Tags per Drag neu sortieren | Mittel | — |
| ~~Tag Colors~~ | ~~`color`-Prop pro Tag für farbige Chips~~ | ~~Niedrig~~ | ✅ implementiert |
| ~~Max-Tags-Limit~~ | ~~Verhindert Auswahl über n Tags hinaus~~ | ~~Niedrig~~ | ✅ implementiert |
| ~~Farbe bei Tag-Erstellung~~ | ~~Custom Color Picker beim Anlegen neuer Tags~~ | ~~Niedrig~~ | ✅ v2.8.0 |
| ~~Suchergebnis-Highlighting~~ | ~~Matching-Text im Dropdown fett hervorheben~~ | ~~Niedrig~~ | ✅ v3.1.0 |

---

## PasswordStrengthMeter

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| Sichtbarkeit nach Stärke | "Anzeigen"-Button erst ab konfigurierbarer Stärke freischalten | Niedrig | — |
| Requirements einklappen | Anforderungs-Checkliste auf- und zuklappen | Niedrig | — |
| HaveIBeenPwned-Prüfung | Async-Check ob Passwort in bekannten Datenlecks vorkommt | Hoch | — |
| ~~Passwort-Generator~~ | ~~Button generiert ein sicheres Passwort~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~Passwort in Zwischenablage~~ | ~~Copy-Button neben generiertem Passwort~~ | ~~Niedrig~~ | ✅ v3.9.0 |
| ~~Confirm-Feld~~ | ~~Zweites Eingabefeld mit Match-Validierung~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~Custom Requirements~~ | ~~Eigene Anforderungen als Array-Prop~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~Animated Segments~~ | ~~Strength-Bar als 4 separate Segmente~~ | ~~Niedrig~~ | ✅ v1.5.0 |

---

## D3-Charts (gemeinsam)

Cross-Cutting-Ideen, die für alle 5 D3-Charts gleich umgesetzt werden würden — eine gemeinsame Utility statt 5× derselbe Code.

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ PNG/SVG Export | Diagramm als Bild speichern (SVG → Canvas → PNG) — aktuell kann **keiner** der 5 D3-Charts exportiert werden | Mittel | — |

---

## SunburstChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Animierte Drill-Down-Übergänge | Zoom passiert aktuell als Hard-Cut (kein `.transition()`) — Arc-Tweening wie im klassischen D3-Zoomable-Sunburst würde sich deutlich poliert anfühlen | Mittel | — |
| ⭐ Eingebautes Breadcrumb | `CirclePackingChart` zeigt beim Reinzoomen automatisch ein Breadcrumb — Sunburst hat trotz Drill-down keins | Niedrig | — |
| Legende | Farbzuordnung Kategorie ↔ Farbe als eigene Komponente — bei vielen Segmenten schwer zuordenbar | Mittel | — |

---

## ChordChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Legende | Bei vielen Gruppen schwer erkennbar, welche Farbe zu welcher Gruppe gehört | Niedrig | — |
| Gruppen-Filter | Klick auf Legenden-Eintrag blendet die Gruppe + ihre Ribbons ein/aus | Mittel | — |
| Such-Highlighting | Gruppenname eingeben → hervorheben, Rest abdunkeln | Niedrig | — |

---

## RadialTreeChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Animierte Fokus-Übergänge | Kein `.transition()` — Fokus-Wechsel beim Drill-down passiert als Hard-Cut | Mittel | — |
| ⭐ Eingebautes Breadcrumb | Fehlt trotz vorhandenem `onFocusChange`/Drill-down — Storybook-Demo baut sich aktuell ein eigenes | Niedrig | — |
| Mini-Map | Übersicht bei sehr tiefen/breiten Bäumen | Hoch | — |

---

## CirclePackingChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| Legende | Farbzuordnung Kategorie ↔ Farbe als eigene Komponente | Mittel | — |
| Such-Highlighting | Knoten per Name finden, Pfad zur Wurzel hervorheben | Mittel | — |

---

## HorizontalTreeChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Eingebautes Breadcrumb | Fehlt trotz `focusedNode`/`onFocusChange` — Storybook-Demo baut sich aktuell ein eigenes | Niedrig | — |
| ⭐ Animierte Fokus-Übergänge | Kein `.transition()` — Fokus-Wechsel passiert als Hard-Cut | Mittel | — |
| Teilbaum Ein-/Ausklappen | Aktuell nur globaler Fokus-Wechsel — kein unabhängiges Collapse pro Knoten | Mittel | — |

---

## Developer Experience

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ GitHub Releases anlegen | Für `v3.0.0`, `v3.1.0`, `v3.1.1` — GitHub zeigt Releases prominent in der Sidebar; aktuell nur nackte Tags ohne Beschreibung | Niedrig | ⚡ offen |
| VS Code Snippets | `rte-basic`, `gantt-basic` → autovervollständigt fertiges Snippet | Niedrig | — |
| Playwright Visual Tests | Screenshot-Vergleiche für Chart-Rendering | Hoch | — |
| ~~Live Storybook~~ | ~~`https://thebuoyant.github.io/mui-ts-library/`~~ | ~~Mittel~~ | ✅ aktiv — auto-deploy |
| ~~npm-app Showcase/Playground~~ | ~~Eigenständige Vite-React-App~~ — ~~ersetzt durch stackblitz-demo~~ | ~~Hoch~~ | ✅ entfernt v3.2.0 |
| ~~Changelog in README sichtbar~~ | ~~Letzte 2 Versionen direkt in README.md eingebettet (EN+DE) — auf npm ohne Link-Klick lesbar~~ | ~~Niedrig~~ | ✅ v3.1.1 |
| ~~⭐ npm-app Demo für Highlighting~~ | ~~npm-app entfernt — stackblitz-demo zeigt Highlighting~~ | ~~Niedrig~~ | ✅ v3.2.0 |
| ~~⭐ Storybook — diverse Use-Case-Stories~~ | ~~Alle Stories liefen auf eine generische Default-Fixture pro Komponente hinaus — fühlte sich wie Controls-Spielerei statt Produktpräsentation an.~~ 17 neue Stories mit komplett unterschiedlichen, realistischen Datensätzen (z.B. Disk-Usage, Handelsbeziehungen, Bauprojekt, Blog-Editor, Skill-Selector) über alle 11 Komponenten. | ~~Hoch~~ | ✅ v3.6.0 |
| ~~⭐ StackBlitz — Use-Case-Einordnung~~ | ~~Demo-Karten zeigten nur Feature-Liste, keine Einordnung wofür man die Komponente einsetzt.~~ Use-Case-Chip pro Karte (z.B. "Database & Analytics Tooling") + geschärfter Hero-Text mit konkreten Wertversprechen. | ~~Niedrig~~ | ✅ v3.6.0 |

---

## Historie: Bereits gelöste Adoption-Blocker

Cross-Cutting-Probleme (nicht an eine einzelne Komponente gebunden), die die Adoption des Pakets behindert haben — alle erledigt, hier nur noch als Nachweis/Referenz.

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~**🔴 StackBlitz / CodeSandbox Template**~~ | ~~"Try it now"-Link in README — Entwickler entscheiden in 30 Sek. ohne Installation.~~ | ~~Niedrig~~ | ✅ v3.2.0 |
| ~~**🔴 Bundle-Bloat / Tree-Shaking**~~ | ~~D3 + CodeMirror + Tiptap landen im Bundle auch wenn nur `TagSelection` genutzt wird.~~ Gelöst via Rollup `preserveModules` — ESM-Build liefert ein File pro Komponente statt einer Bundle-Datei. Kein API-Change, gemessen: 1.1 MB → 22 KB für Single-Component-Import. | ~~Hoch~~ | ✅ v3.3.0 |
| ~~**🟡 ChordChart Dark-Mode**~~ | ~~`mixBlendMode: "multiply"` → theme-aware: `normal` im dark mode, `multiply` im light mode.~~ | ~~Niedrig~~ | ✅ v3.2.1 |
| ~~**🟡 HorizontalTreeChart Link-Opacity**~~ | ~~`linkStrokeOpacity`-Default `0.4` → `1.0`, konsistent mit RadialTreeChart.~~ | ~~Niedrig~~ | ✅ v3.2.1 |
| ~~**🟡 Storybook Charts — play-Funktionen**~~ | ~~D3-Charts zeigten Interaktionsfeatures nur statisch in der Beschreibung.~~ `play`-Funktionen demonstrieren jetzt automatisch: Ctrl+Click Drill-down (Sunburst, RadialTree, HorizontalTree), Ctrl+Click Zoom (CirclePacking), Hover-Highlight (Chord). | ~~Mittel~~ | ✅ v3.5.0 |
| ~~**🔴 SqlEditor — keine Tests**~~ | ~~`sql-editor/*.test.tsx` existiert nicht.~~ 21 Tests ergänzt (Toolbar-Interaktionen, Dialekte, Schema, Disabled-State). 0% → 82% Lines. | ~~Mittel~~ | ✅ v3.4.0 |
| ~~**🟡 Test-Coverage-Lücken**~~ | ~~`RichTextEditorImageDialog` (17%), `RichTextEditorTableMenu` (20%), `gantt-chart.util.ts` (0%, Artefakt-Messung) ungetestet.~~ ImageDialog → 94%, TableMenu → 96%, gantt-chart.util → 99% (cascadeDateUpdate + computeCriticalPath ergänzt). Gesamt 68%→74% Lines. | ~~Mittel~~ | ✅ v3.4.0 |
| ~~**🟡 Accessibility-Audit**~~ | ~~`aria-*` nur in 23 von ~60 Source-Dateien.~~ 13 fehlende `aria-label` ergänzt (GanttTaskPanel, GanttToolbar, TagSelectionAutocomplete Confirm/Cancel, RichTextEditor Color-Swatches + Emoji-Picker). 2 neue TagSelection-Translation-Keys (`confirmCreateLabel`, `cancelCreateLabel`). | ~~Mittel~~ | ✅ v3.4.0 |
