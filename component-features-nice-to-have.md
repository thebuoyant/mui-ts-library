# Component Features — Nice to Have

Ideen für zukünftige Features an bestehenden Komponenten.
Priorisierung nach User-Nutzen und Implementierungsaufwand.

---

## GanttChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~Spalte: Assignee~~ | ~~Zusätzliche Spalte im Task-Panel für Verantwortliche~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~CSV / Excel Export~~ | ~~Tasks als Tabelle exportieren~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~Zoom per Scroll~~ | ~~Ctrl / Cmd ⌘+Scroll ändert TimeScale~~ | ~~Mittel~~ | ✅ v1.5.0 |
| ~~Today-Button~~ | ~~Toolbar-Button scrollt zum heutigen Tag~~ | ~~Niedrig~~ | ✅ implementiert |
| ~~Heute-Chip~~ | ~~Chip an der gestrichelten Heute-Linie~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| Baseline-Vergleich | Ursprungsplanung (geplant) vs. Ist-Stand visuell überlagern — zwei Balken pro Task | Hoch | — |
| Bulk-Status-Änderung | Mehrere Tasks markieren und Status/Fortschritt auf einmal ändern | Mittel | — |
| Schnell-Hinzufügen | Task direkt aus der Toolbar anlegen mit Preset-Daten (kein Dialog) | Mittel | — |
| Wiederkehrende Tasks | Zyklische Aufgaben mit Wiederholungsmuster (täglich/wöchentlich/monatlich) | Hoch | — |
| Resource View | Horizontale Ansicht: eine Zeile pro Person/Ressource | Hoch | — |
| Touch / Mobile Drag | Drag & Drop auf Touch-Geräten (Pointer Events API) | Hoch | — |
| Export PNG/PDF | Timeline als Bild oder PDF exportieren | Hoch | — |
| Keyboard Navigation | Pfeiltasten für Task-Auswahl, Enter zum Öffnen | Mittel | — |
| Undo / Redo | Ctrl+Z für Task-Verschiebungen | Hoch | — |
| Mini-Map | Kleine Übersichts-Timeline für schnelle Navigation bei vielen Tasks | Hoch | — |

---

## RichTextEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~Word Count~~ | ~~Wörter- und Zeichen-Zähler im Footer~~ | ~~Niedrig~~ | ✅ v1.4.0 |
| ~~Full Screen Mode~~ | ~~Editor nimmt den gesamten Viewport ein~~ | ~~Niedrig~~ | ✅ v1.4.0 |
| ~~Tabellen~~ | ~~Tiptap Table Extension — Zeilen/Spalten einfügen~~ | ~~Mittel~~ | ✅ v2.1.0 |
| ~~Bild-Embed~~ | ~~`<img>` per URL oder Base64 einfügen~~ | ~~Mittel~~ | ✅ v2.1.0 |
| ~~Emoji Picker~~ | ~~😀 Button mit Such-Emoji-Popover~~ | ~~Mittel~~ | ✅ v2.1.0 |
| Mention (@) | Personen oder Entitäten per `@` referenzieren mit Autocomplete | Hoch | — |
| Slash Commands (/) | Kontextmenü beim Tippen von `/` — Blöcke einfügen | Hoch | — |
| Mathformel (KaTeX) | `$$`-Block für LaTeX-Formeln | Hoch | — |
| Diff View | Zwei HTML-Versionen readonly nebeneinander vergleichen | Hoch | — |
| Einfügen als Klartext | Toggle: eingefügter Inhalt wird automatisch von Formatierung befreit | Niedrig | — |
| Markdown-Import/Export | Zwischen HTML-Inhalt und Markdown per Klick konvertieren | Mittel | — |
| Custom Content Blocks | Eigene Block-Typen registrieren (Callout-Box, Alert, Info-Panel) | Hoch | — |

---

## SqlEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~Keyboard Shortcut Execute~~ | ~~Cmd / Ctrl+Enter für `onExecute`~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~Zeilennummern-Gutter anpassen~~ | ~~Breite auto an max. Zeilenzahl~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| Query-Verlauf | Letzte N Abfragen speichern und laden (localStorage) | Mittel | — |
| Ergebnis-Metadaten-Footer | Nach `onExecute`: Zeilenanzahl + Ausführungszeit im Footer anzeigen | Mittel | — |
| Snippet-Bibliothek | Gespeicherte SQL-Bausteine mit Namen einfügen | Mittel | — |
| Hover-Doku | Spalten-/Tabellen-Kommentar als Tooltip (aus Schema) beim Hover | Mittel | — |
| Multi-Tab Queries | Mehrere SQL-Abfragen in Tabs — je eigene History/Ausführung | Hoch | — |
| AI-Autocomplete | LLM-Endpoint für SQL-Vorschläge — klares Differenzierungsmerkmal | Hoch | — |

---

## JsonEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~Minimap~~ | ~~Vertikale Übersicht für große JSON-Dokumente~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| JSON Path Finder | Klick auf einen Wert kopiert seinen vollständigen JSON-Path in die Zwischenablage | Niedrig | — |
| Folding / Collapsible | Objekte und Arrays inline ein-/aufklappen | Mittel | — |
| Diff Mode | Zwei JSON-Strings readonly nebeneinander vergleichen | Hoch | — |
| JSON Schema Validierung | Schema-Prop für strukturelle Validierung (Typ, Required-Felder, Enum) | Hoch | — |
| Beispiel-JSON Generator | Button generiert minimales Placeholder-JSON für schnelles Testen | Niedrig | — |
| Tree View | Toggle zwischen Text- und Baumansicht | Hoch | — |

---

## TagSelection

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~Tag Colors~~ | ~~`color`-Prop pro Tag für farbige Chips~~ | ~~Niedrig~~ | ✅ implementiert |
| ~~Max-Tags-Limit~~ | ~~Verhindert Auswahl über n Tags hinaus~~ | ~~Niedrig~~ | ✅ implementiert |
| Drag to Reorder | Ausgewählte Tags per Drag neu sortieren | Mittel | — |
| Tag Groups | Tags in Kategorien einteilen (Group-Header im Dropdown) | Mittel | — |
| Async Search | `onSearch`-Callback mit Debounce für Server-seitige Tags | Mittel | — |
| ~~Farbe bei Tag-Erstellung~~ | ~~Beim Anlegen neuer Tags direkt eine Farbe wählen (Color Picker)~~ | ~~Niedrig~~ | ✅ v2.8.0 |
| ~~Suchergebnis-Highlighting~~ | ~~Matching-Text im Dropdown-Ergebnis farbig hervorheben~~ | ~~Niedrig~~ | ✅ v3.1.0 |

---

## PasswordStrengthMeter

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~Passwort-Generator~~ | ~~Button generiert ein sicheres Passwort~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~Confirm-Feld~~ | ~~Zweites Eingabefeld mit Match-Validierung~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~Custom Requirements~~ | ~~Eigene Anforderungen als Array-Prop~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~Animated Segments~~ | ~~Strength-Bar als 4 separate Segmente~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| Passwort in Zwischenablage | Copy-Button neben generiertem Passwort — besonders nützlich auf Mobile | Niedrig | — |
| Requirements einklappen | Anforderungs-Checkliste auf- und zuklappen um Platz zu sparen | Niedrig | — |
| Sichtbarkeit nach Stärke | "Anzeigen"-Button erst ab konfigurierbarer Stärke (z.B. "good") freischalten | Niedrig | — |
| HaveIBeenPwned-Prüfung | Async-Check ob Passwort in bekannten Datenlecks vorkommt | Hoch | — |

---

## Developer Experience

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~Live Storybook~~ | ~~`https://thebuoyant.github.io/mui-ts-library/`~~ | ~~Mittel~~ | ✅ aktiv — auto-deploy |
| ~~npm-app Showcase/Playground~~ | ~~Eigenständige Vite-React-App (`npm-app/`), konsumiert das veröffentlichte npm-Paket; pro Komponente ein Accordion mit Live-Preview links und Storybook-ähnlicher Controls-Sidebar rechts (Switches, Slider, Select, Color-Picker), inkl. Light/Dark-Theme-Toggle~~ | ~~Hoch~~ | ✅ implementiert |
| ~~npm-app auf neue Version aktualisieren~~ | ~~`npm-app` nutzt aktuell `@thebuoyant-tsdev/mui-ts-library@2.6.0` (npm), lokaler Stand ist bereits v2.7.0+. Nach nächstem Publish: Dependency bumpen und neue Features (z.B. TagSelection Custom-Color bei Erstellung, PasswordStrengthMeter-Generator) in den jeweiligen Demos ergänzen~~ | ~~Niedrig~~ | ✅ v3.1.0 (auf 3.0.0 gebumpt) |
| **🔴 StackBlitz / CodeSandbox Templates** | "Try it now"-Links direkt in README — **Adoption-Stopper**: Entwickler wollen in 30 Sekunden sehen ob die Komponente ihren Fall abdeckt, ohne zu installieren. Ohne diesen Link verlieren wir potenzielle Nutzer sofort. | Niedrig | ⚡ NÄCHSTER SCHRITT |
| **🔴 Bundle-Bloat / Tree-Shaking** | D3 + CodeMirror + Tiptap landen im Bundle, egal ob der Nutzer nur `TagSelection` will. Lösung: separate Entry-Points pro Komponente (`"exports"` in package.json) oder Paket aufteilen. **Adoption-Stopper** für größere Projekte. | Hoch | ⚡ NÄCHSTER SCHRITT |
| **🟡 ChordChart Dark-Mode** | `mixBlendMode: "multiply"` macht Ribbons auf dunklem Hintergrund fast unsichtbar (Math: `source × 0.07 = black`). Fix: theme-aware blend-mode (`normal` im dark mode). | Niedrig | ⚡ NÄCHSTER SCHRITT |
| **🟡 HorizontalTreeChart Link-Opacity** | `linkStrokeOpacity`-Default ist `0.4` (Links zu blass), RadialTreeChart hat `1.0`. Inkonsistenz — sollte auf `1.0` vereinheitlicht werden. | Niedrig | ⚡ NÄCHSTER SCHRITT |
| **🟡 Storybook Charts — play-Funktionen** | D3-Charts zeigen bei Story-Öffnung nur einen leeren Container bis der Nutzer selbst interagiert. `play`-Funktionen würden die Charts sofort rendern und Features demonstrieren (wie bei TagSelection SearchHighlight). | Mittel | ⚡ NÄCHSTER SCHRITT |
| **🟡 Adoption-Signal** | 0 Dependents / 77 Downloads — sichtbares Qualitäts-Signal für neue Entwickler. Organisch schwer zu erzwingen, aber StackBlitz-Template + fixe Dark-Mode-Bugs helfen direkt. | — | offen |
| VS Code Snippets | `rte-basic`, `gantt-basic` → autovervollständigt fertiges Snippet | Niedrig | — |
| Playwright Visual Tests | Screenshot-Vergleiche für Chart-Rendering | Hoch | — |
