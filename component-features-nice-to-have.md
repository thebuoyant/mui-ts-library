# Component Features — Nice to Have

Ideen für zukünftige Features an bestehenden Komponenten.
Priorisierung nach User-Nutzen und Implementierungsaufwand.

**Legende:** ⭐ Hoher User-Nutzen, Niedrig/Mittel Aufwand — direkt angehen | 🔴 Adoption-Stopper | 🟡 Bekannter Bug / Inkonsistenz

---

## 🔴🟡 Priorität: Adoption & Qualität (zuerst angehen)

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| **🔴 StackBlitz / CodeSandbox Template** | "Try it now"-Link in README — Entwickler entscheiden in 30 Sek. ohne Installation. Ohne diesen Link verlieren wir potenzielle Nutzer sofort. | Niedrig | ⚡ offen |
| **🔴 Bundle-Bloat / Tree-Shaking** | D3 + CodeMirror + Tiptap landen im Bundle auch wenn nur `TagSelection` genutzt wird. Lösung: separate `"exports"`-Entry-Points pro Komponente in package.json. | Hoch | ⚡ offen |
| **🟡 ChordChart Dark-Mode** | `mixBlendMode: "multiply"` macht Ribbons auf dunklem Hintergrund fast unsichtbar. Fix: theme-aware blend-mode (`normal` im dark mode, `multiply` im light mode). | Niedrig | ⚡ offen |
| **🟡 HorizontalTreeChart Link-Opacity** | `linkStrokeOpacity`-Default `0.4` (zu blass) vs. RadialTreeChart `1.0` — inkonsistent. Fix: Default auf `1.0`. | Niedrig | ⚡ offen |
| **🟡 Storybook Charts — play-Funktionen** | D3-Charts zeigen bei Story-Öffnung nur leeren Container. `play`-Funktionen rendern Charts sofort (wie TagSelection SearchHighlight). Betrifft: SunburstChart, ChordChart, RadialTreeChart, CirclePackingChart, HorizontalTreeChart. | Mittel | ⚡ offen |

---

## GanttChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~Spalte: Assignee~~ | ~~Zusätzliche Spalte im Task-Panel für Verantwortliche~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~CSV / Excel Export~~ | ~~Tasks als Tabelle exportieren~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~Zoom per Scroll~~ | ~~Ctrl / Cmd ⌘+Scroll ändert TimeScale~~ | ~~Mittel~~ | ✅ v1.5.0 |
| ~~Today-Button~~ | ~~Toolbar-Button scrollt zum heutigen Tag~~ | ~~Niedrig~~ | ✅ implementiert |
| ~~Heute-Chip~~ | ~~Chip an der gestrichelten Heute-Linie~~ | ~~Niedrig~~ | ✅ v1.5.0 |
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

---

## RichTextEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~Word Count~~ | ~~Wörter- und Zeichen-Zähler im Footer~~ | ~~Niedrig~~ | ✅ v1.4.0 |
| ~~Full Screen Mode~~ | ~~Editor nimmt den gesamten Viewport ein~~ | ~~Niedrig~~ | ✅ v1.4.0 |
| ~~Tabellen~~ | ~~Tiptap Table Extension — Zeilen/Spalten einfügen~~ | ~~Mittel~~ | ✅ v2.1.0 |
| ~~Bild-Embed~~ | ~~`<img>` per URL oder Base64 einfügen~~ | ~~Mittel~~ | ✅ v2.1.0 |
| ~~Emoji Picker~~ | ~~😀 Button mit Such-Emoji-Popover~~ | ~~Mittel~~ | ✅ v2.1.0 |
| ⭐ Einfügen als Klartext | Toggle: Eingefügter Inhalt wird automatisch von Formatierung befreit — häufigste Nutzer-Frustration bei RTE | Niedrig | — |
| ⭐ Markdown-Import/Export | Zwischen HTML-Inhalt und Markdown per Klick konvertieren — Entwickler erwarten das | Mittel | — |
| Mention (@) | Personen oder Entitäten per `@` referenzieren mit Autocomplete | Hoch | — |
| Slash Commands (/) | Kontextmenü beim Tippen von `/` — Blöcke einfügen (Notion-Pattern) | Hoch | — |
| Custom Content Blocks | Eigene Block-Typen registrieren (Callout-Box, Alert, Info-Panel) | Hoch | — |
| Diff View | Zwei HTML-Versionen readonly nebeneinander vergleichen | Hoch | — |
| Mathformel (KaTeX) | `$$`-Block für LaTeX-Formeln | Hoch | — |

---

## SqlEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~Keyboard Shortcut Execute~~ | ~~Cmd / Ctrl+Enter für `onExecute`~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~Zeilennummern-Gutter anpassen~~ | ~~Breite auto an max. Zeilenzahl~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ⭐ Query-Verlauf | Letzte N Abfragen speichern/laden (localStorage) — Nutzer erwarten das von jedem SQL-Editor | Mittel | — |
| ⭐ Hover-Doku | Spalten-/Tabellen-Kommentar als Tooltip aus Schema beim Hover | Mittel | — |
| ⭐ AI-Autocomplete | LLM-Endpoint für SQL-Vorschläge — klares Differenzierungsmerkmal, kein anderer MUI-Editor bietet das | Hoch | — |
| Ergebnis-Metadaten-Footer | Nach `onExecute`: Zeilenanzahl + Ausführungszeit im Footer | Mittel | — |
| Snippet-Bibliothek | Gespeicherte SQL-Bausteine mit Namen einfügen | Mittel | — |
| Multi-Tab Queries | Mehrere SQL-Abfragen in Tabs — je eigene History/Ausführung | Hoch | — |

---

## JsonEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~Minimap~~ | ~~Vertikale Übersicht für große JSON-Dokumente~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ⭐ JSON Path Finder | Klick auf Wert kopiert vollständigen JSON-Path — extrem nützlich für Entwickler | Niedrig | — |
| ⭐ Folding / Collapsible | Objekte und Arrays inline ein-/aufklappen | Mittel | — |
| JSON Schema Validierung | Schema-Prop für strukturelle Validierung (Typ, Required-Felder, Enum) | Hoch | — |
| Beispiel-JSON Generator | Button generiert minimales Placeholder-JSON für schnelles Testen | Niedrig | — |
| Diff Mode | Zwei JSON-Strings readonly nebeneinander vergleichen | Hoch | — |
| Tree View | Toggle zwischen Text- und Baumansicht | Hoch | — |

---

## TagSelection

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~Tag Colors~~ | ~~`color`-Prop pro Tag für farbige Chips~~ | ~~Niedrig~~ | ✅ implementiert |
| ~~Max-Tags-Limit~~ | ~~Verhindert Auswahl über n Tags hinaus~~ | ~~Niedrig~~ | ✅ implementiert |
| ~~Farbe bei Tag-Erstellung~~ | ~~Custom Color Picker beim Anlegen neuer Tags~~ | ~~Niedrig~~ | ✅ v2.8.0 |
| ~~Suchergebnis-Highlighting~~ | ~~Matching-Text im Dropdown fett hervorheben~~ | ~~Niedrig~~ | ✅ v3.1.0 |
| ⭐ Async Search | `onSearch`-Callback mit Debounce für Server-seitige Tags — fast jedes Produktiv-Projekt braucht das | Mittel | — |
| Tag Groups | Tags in Kategorien einteilen (Group-Header im Dropdown) | Mittel | — |
| Drag to Reorder | Ausgewählte Tags per Drag neu sortieren | Mittel | — |

---

## PasswordStrengthMeter

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~Passwort-Generator~~ | ~~Button generiert ein sicheres Passwort~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~Confirm-Feld~~ | ~~Zweites Eingabefeld mit Match-Validierung~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~Custom Requirements~~ | ~~Eigene Anforderungen als Array-Prop~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~Animated Segments~~ | ~~Strength-Bar als 4 separate Segmente~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ⭐ Passwort in Zwischenablage | Copy-Button neben generiertem Passwort — ohne diesen ist der Generator auf Mobile unbenutzbar | Niedrig | — |
| Sichtbarkeit nach Stärke | "Anzeigen"-Button erst ab konfigurierbarer Stärke freischalten | Niedrig | — |
| Requirements einklappen | Anforderungs-Checkliste auf- und zuklappen | Niedrig | — |
| HaveIBeenPwned-Prüfung | Async-Check ob Passwort in bekannten Datenlecks vorkommt | Hoch | — |

---

## Developer Experience

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~Live Storybook~~ | ~~`https://thebuoyant.github.io/mui-ts-library/`~~ | ~~Mittel~~ | ✅ aktiv — auto-deploy |
| ~~npm-app Showcase/Playground~~ | ~~Eigenständige Vite-React-App, konsumiert veröffentlichtes npm-Paket~~ | ~~Hoch~~ | ✅ implementiert |
| ~~npm-app auf aktuelle Version~~ | ~~Dependency auf `^3.0.0` gebumpt~~ | ~~Niedrig~~ | ✅ v3.1.0 |
| ~~Changelog in README sichtbar~~ | ~~Letzte 2 Versionen direkt in README.md eingebettet (EN+DE) — auf npm ohne Link-Klick lesbar~~ | ~~Niedrig~~ | ✅ v3.1.1 |
| ⭐ GitHub Releases anlegen | Für `v3.0.0`, `v3.1.0`, `v3.1.1` — GitHub zeigt Releases prominent in der Sidebar; aktuell nur nackte Tags ohne Beschreibung | Niedrig | ⚡ offen |
| ⭐ npm-app Demo für Highlighting | TagSelectionDemo zeigt v3.1.0-Feature (Search Highlight) noch nicht — nach nächstem Publish nachziehen | Niedrig | ⚡ offen |
| VS Code Snippets | `rte-basic`, `gantt-basic` → autovervollständigt fertiges Snippet | Niedrig | — |
| Playwright Visual Tests | Screenshot-Vergleiche für Chart-Rendering | Hoch | — |
