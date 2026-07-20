# Component Features — Nice to Have

Ideen für zukünftige Features an bestehenden Komponenten — und für neue Komponenten,
die echte MUI-Lücken schließen. Priorisierung nach User-Nutzen und Implementierungsaufwand.

**Leitplanke:** Dieses Projekt ist eine **Ergänzung zu MUI**, kein generisches Feature-Sammelsurium.
Ein Eintrag muss eine konkrete, begründbare Lücke schließen — entweder in einer bestehenden
Komponente (löst ein reales Nutzungsproblem) oder als neue Komponente (MUI bietet das nicht,
oder nur kostenpflichtig in MUI X Pro/Premium). "Klingt nett" ist kein Aufnahmekriterium.

**Architekturprinzip:** Komponenten rendern UI und stellen Erweiterungspunkte (Callbacks/Props)
bereit — sie rufen selbst keine externen Services/APIs/LLMs auf. Wo ein Feature einen externen
Aufruf braucht (KI-Vorschläge, Leak-Datenbank-Check), bekommt der Consumer einen Callback und
liefert die Anbindung selbst. Kein Vendor-Lock-in, keine versteckten Netzwerk-Calls, keine API-Keys
in der Bibliothek.

**Legende:**
⭐ Hoher User-Nutzen, Niedrig/Mittel Aufwand — direkt angehen
🔴 Adoption-Stopper · 🟡 Bekannter Bug / Inkonsistenz
✅ Erledigt (Version in der letzten Spalte) · ⚡ Offen, aber bereits eingeplant · `—` Offen, noch nicht eingeplant

Innerhalb jeder Sektion stehen offene Items zuerst (⭐ oben), erledigte (durchgestrichen) am Ende der Tabelle.

---

## Neue Komponenten — mögliche MUI-Lücken

| Komponente | MUI-Lücke | Warum das zu uns passt |
|---|---|---|
| **DataTable** (Sortierung, Filter, Spalten-Resize, CSV-Export, Virtualisierung) | MUI X `DataGrid` Community ist stark eingeschränkt — Sortierung über mehrere Spalten, Filter-UI und Export sind Pro/Premium-Features. Der mit Abstand meistgenannte MUI-Schmerzpunkt. | GanttChart hat bereits eine eigene Virtualisierungs-Lösung (`virtualizeRows`) — die Grundlagen sind im Projekt vorhanden. |
| ~~**DateRangePicker**~~ | ~~MUI X `DateRangePicker` ist exklusiv Pro — keine freie MUI-Lösung für "Start- und Enddatum in einem Picker".~~ | ✅ v3.29.0 — zwei native `date`-Inputs inline, `DateRange`/`DateRangeEntry`-Typen (Date + ISO), Validierung (end < start, required), CSS-Klassen-API. |
| **FileUpload / Dropzone** | MUI hat **gar keine** Lösung — weder Community noch Pro. Drag & Drop, Fortschrittsanzeige, Datei-Vorschau muss jedes Projekt selbst bauen. | Komplementiert RichTextEditor (Bild-Embed nutzt aktuell nur URL/Base64) — ein Dropzone-Baustein würde dort direkt mit andocken. |
| **OTP / PIN-Input** | MUI hat keinen Verifikations-Code-Input. Jede App mit 2FA, E-Mail-Bestätigung oder Zahlungsverifizierung braucht das: 6 separate Felder, Auto-Fokus-Sprung nach jeder Ziffer, Einfügen von "123456" befüllt alle Felder auf einmal, Backspace springt rückwärts. | Passt zur Linie der auth-nahen Komponenten (PasswordStrengthMeter). Kleiner Scope, sehr hoher Nutzen. |
| ~~**Kanban Board**~~ | ~~Keine freie MUI-Komponente für spaltenbasiertes Task-Management (To Do / In Progress / Done / Blocked). MUI X hat keins.~~ | ✅ v3.30.0 — Drag & Drop (`@dnd-kit`), CRUD-Dialoge, WIP-Limits, Kartenfarben, Assignee/DueDate-Chips, `chipVariant`, i18n, CSS-Klassen-API, GanttChart-Adapter in den Docs. |
| ~~**ColorPicker**~~ | ~~MUI hat keinen eigenen Farbwähler.~~ | ✅ v3.13.0 — als eigenständige Komponente umgesetzt (Sättigung/Farbton/Alpha, Pipette, HEX/RGB/HSL, Saved Colors). |

---

## GanttChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Multi-select Tasks | `showCheckboxColumn?: boolean` — Checkbox-Spalte zum Markieren mehrerer Tasks. `selectedTaskIds?: string[]` + `onSelectionChange` für controlled use. Schaltet erst Bulk-Aktionen frei, die bisher sinnlos wären: Status mehrerer Tasks gleichzeitig ändern, mehrere Tasks auf einmal löschen. Ohne Mehrfachauswahl ist Bulk ein Anti-Pattern. | Mittel | — |
| ⭐ Arbeitstage & Feiertage | `workdays?: number[]` (Default `[1,2,3,4,5]` = Mo–Fr) + `holidays?: Date[]` — Wochenenden werden in der Timeline bereits grau hinterlegt, aber Dauerberechnungen, Auto-Advance und Clamp-Logik ignorieren bisher Nicht-Arbeitstage. Standard in jedem professionellen Gantt-Tool. Ein "5-Tage-Task" soll 5 Arbeitstage dauern, nicht 5 Kalendertage. | Mittel | — |
| Touch / Mobile Drag | Drag & Drop für Task-Balken auf Touch-Geräten über die Pointer Events API — aktuell nur Maus. | Hoch | — |
| Baseline-Vergleich | Ursprungsplanung als zweiter, schmalerer Balken hinter dem Ist-Balken — Standardmuster aus MS Project / Jira-Gantt-Plugins, kein Custom-Konzept. | Hoch | — |
| ~~⭐ Keyboard Navigation~~ | ~~Tab fokussiert das Panel, ↑/↓ bewegen die Auswahl, Enter öffnet den Edit-Dialog, Escape hebt die Auswahl auf.~~ | ~~Mittel~~ | ✅ v3.25.0 |
| ~~⭐ Panel-Splitter per Drag~~ | ~~`minPanelWidth` / `maxPanelWidth` als Constraints für den Drag-Handle.~~ | ~~Mittel~~ | ✅ seit v1.x |
| ~~Assignee-Filter in Toolbar~~ | ~~`toolbarConfig={{ showAssigneeFilter: true }}` — ancestor-inklusiver Filter.~~ | ~~Mittel~~ | ✅ v3.17.0 |
| ~~`onDragStart` Callback~~ | ~~Feuert bei mousedown, `type: "move" \| "resize"`.~~ | ~~Niedrig~~ | ✅ v3.17.0 |
| ~~⭐ Progress-Feld im Dialog~~ | ~~MUI-Slider im Add/Edit-Dialog, pre-filled, Rücksetzen bei Milestone.~~ | ~~Niedrig~~ | ✅ v3.16.0 |
| ~~Dependency-Zyklus-Schutz~~ | ~~Transitiv abhängige Tasks aus Dependency-Optionen ausgeschlossen.~~ | ~~Mittel~~ | ✅ v3.11.3 |
| ~~Spalte: Assignee~~ | ~~Zusätzliche Spalte im Task-Panel für Verantwortliche.~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~CSV Export~~ | ~~Tasks als Tabelle exportieren.~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~Zoom per Scroll~~ | ~~Ctrl/Cmd+Scroll ändert TimeScale.~~ | ~~Mittel~~ | ✅ v1.5.0 |

---

## KanbanBoard

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~⭐ Fälligkeits-Warnung~~ | ~~Karten deren `dueDate` in der Vergangenheit liegt, erhalten automatisch einen roten Chip-Ton und optionale `sx`-Variante für den Kartenhintergrund. `showDueDateWarning?: boolean` (Default `true`). Kein neues Datenmodell — nur eine konditionale Darstellungslogik auf dem vorhandenen `dueDate`-Feld. Sehr häufiger erster Wunsch bei Kanban-Tools.~~ | Niedrig | ✅ v3.31.0 |
| ~~⭐ Priorität auf Karten~~ | ~~`priority?: "low" \| "medium" \| "high" \| "critical"` auf `KanbanTask` — visuell als kleines farbiges Indikator-Feld (z.B. linker farbiger Punkt neben dem Titel). `showPriority?: boolean`-Prop. Kein neues Datenmodell, nur ein weiteres optionales Feld.~~ | Niedrig | ✅ v3.32.0 |
| ~~⭐ Filter / Suche~~ | ~~Zwei Patterns: `showSearchField={true}` für ein eingebautes `size="small"`-Suchfeld mit Lupen-Icon (Board verwaltet Zustand intern), oder `filterText?: string` als controlled Prop für Consumer, die ihr eigenes Suchfeld bauen. Spalten-Zähler passen sich an; WIP-Limit-Prüfung läuft immer gegen die ungefilterte Gesamtanzahl.~~ | Mittel | ✅ v3.34.0 |
| ⭐ Card Template pro Spalte | `getNewTaskDefaults?: (columnId: string) => Partial<KanbanTask>` — Consumer kann vorausgefüllte Felder liefern wenn "+ Karte hinzufügen" geklickt wird (z.B. `{ priority: "high" }` für die "Critical"-Spalte). Ohne das Muster müssen Consumer den Add-Dialog abfangen und selbst befüllen. | Niedrig | — |
| Spalten neu sortieren | Spalten per Drag & Drop neu ordnen — `onColumnsChange?: (columns: KanbanColumn[]) => void`. Baut auf @dnd-kit auf (bereits im Tree), aber Spalten-DnD + Karten-DnD brauchen separate DndContext-Ebenen. | Mittel | — |
| ~~Karten-Subtasks~~ | ~~`subtasks?: KanbanSubtask[]` auf `KanbanTask` (`KanbanSubtask = { id, title, done }`) — auf der Karte als Fortschrittsbalken (`2 / 5 ✓`) mit kleinem `+`-Hover-Button (Tooltip, öffnet Edit-Dialog via `stopPropagation`), im Add/Edit-Dialog als Checklist (Toggle/Add per Enter/`+`-Button, Remove per `×`). `showSubtasks?: boolean` (Default `true`) blendet Bar & Checklist aus. 3 neue Translation-Keys: `dialogFieldSubtasks`, `dialogSubtaskAdd`, `cardSubtaskAdd`. 2 neue CSS-Klassen: `MuiTsKanbanBoard-cardSubtasks`, `MuiTsKanbanBoard-cardSubtasksBar`.~~ | Mittel | ✅ v3.35.0 |
| Spalten-Management-UI | Spalten direkt im Board hinzufügen, umbenennen, löschen — `onColumnAdd / onColumnUpdate / onColumnDelete`-Callbacks. | Mittel | — |
| Touch / Mobile Drag | @dnd-kit's PointerSensor sollte Touch prinzipiell unterstützen, aber der Aktivierungsabstand und das Scroll-Verhalten auf Mobilgeräten brauchen spezifisches Tuning und Testing. | Niedrig | — |
| Swimlanes | Horizontale Gruppenzeilen innerhalb jeder Spalte (z.B. nach Assignee oder Priority) — ändert das Board-Layout fundamental. Höchster Nutzen für große Teams, höchster Aufwand. | Hoch | — |
| ~~MVP — Drag & Drop, CRUD-Dialoge, WIP-Limits, Chips, i18n, CSS-Klassen-API, `onTaskMoved`~~ | ~~Drag & Drop (`@dnd-kit`), Add/Edit/Delete-Dialoge, WIP-Limit-Anzeige, Assignee/DueDate-Chips (`chipVariant`), Kartenfarben, vollständige i18n, CSS-Klassen-API (`kanbanBoardClasses`), `onTaskMoved`-Callback für DnD-Spalten-Wechsel, GanttChart-Adapter-Doku, 8 Stories, 28 Tests.~~ | — | ✅ v3.30.0 |

---

## RichTextEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Variable Tokens | `tokens?: string[]` — `{{firstName}}`, `{{companyName}}` erscheinen als hervorgehobene, nicht-editierbare Chips im Fließtext. Autocomplete öffnet sich nach `{{`, bestehende Tokens beim Laden automatisch ausgezeichnet. Use Case: E-Mail-Vorlagen, Benachrichtigungs-Templates, Vertrags-Bausteine — jede App mit personalisierten Texten. Kein neues Datenmodell, der Output bleibt gewöhnliches HTML. | Mittel | — |
| Zeichenlimit — Warn-Phase | `maxCharacters` + `showCharacterCount` + Tiptap-Blocking sind bereits implementiert — der Footer zeigt "{count} / {max} characters" und blockiert Eingabe am Limit. Fehlt noch: visuelle Orange-Warn-Phase bei Annäherung (z.B. ab 90 % des Limits), analog zu Twitter/LinkedIn. | Niedrig | — |
| Toolbar Extensions | `toolbarExtensions?: React.ReactNode` — Consumer platzieren eigene Buttons direkt neben den Standard-Buttons ohne Fork. Render-Slot am Ende der Toolbar-Reihe. | Mittel | — |
| Slash Commands (/) | `/`-getriggertes Kontextmenü zum Einfügen von Blöcken (Notion-Pattern) — Tabelle, Bild, Emoji, Variable aus `tokens`. Kein neuer Funktionsumfang, nur ein zweiter, schnellerer Zugriffsweg zu bestehenden Features. | Hoch | — |
| ~~⭐ `onSave` / Ctrl+S~~ | ~~`onSave?: () => void` feuert bei Ctrl/Cmd+S.~~ | ~~Niedrig~~ | ✅ v3.18.0 |
| ~~⭐ `defaultValue`~~ | ~~Unkontrollierter Modus analog zu MUI TextField.~~ | ~~Niedrig~~ | ✅ v3.19.0 |
| ~~⭐ `onMentionInserted`~~ | ~~Callback mit dem eingefügten `MentionItem`.~~ | ~~Niedrig~~ | ✅ v3.20.0 |
| ~~Word Count~~ | ~~Wörter- und Zeichen-Zähler im Footer.~~ | ~~Niedrig~~ | ✅ v1.4.0 |
| ~~Full Screen Mode~~ | ~~Editor nimmt den gesamten Viewport ein.~~ | ~~Niedrig~~ | ✅ v1.4.0 |
| ~~Tabellen~~ | ~~Tiptap Table Extension — Zeilen/Spalten einfügen.~~ | ~~Mittel~~ | ✅ v2.1.0 |
| ~~Bild-Embed~~ | ~~`<img>` per URL oder Base64 einfügen.~~ | ~~Mittel~~ | ✅ v2.1.0 |
| ~~Emoji Picker~~ | ~~Button mit Such-Emoji-Popover.~~ | ~~Mittel~~ | ✅ v2.1.0 |
| ~~Einfügen als Klartext~~ | ~~Toggle: eingefügter Inhalt wird von Formatierung befreit.~~ | ~~Niedrig~~ | ✅ v3.8.0 |
| ~~Markdown-Import/Export~~ | ~~Zwischen HTML und Markdown per Klick konvertieren.~~ | ~~Mittel~~ | ✅ v3.8.0 |

---

## SqlEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ~~SQL Formatter — `Shift+Alt+F`~~ | ~~Format-Button in der Toolbar + `Shift+Alt+F` KeyBinding in CodeMirror. Via `sql-formatter` (MIT), dialektspezifisch.~~ | ~~Niedrig~~ | ✅ v3.28.0 |
| ⭐ Hover-Doku | Spalten- und Tabellen-Kommentar aus der vorhandenen `schema`-Prop als Tooltip beim Hover über einen Identifier — kein neues Datenmodell. | Mittel | — |
| ⭐ Nur-Selektion ausführen | Wenn Text markiert ist und Execute gedrückt wird, liefert `onExecute` nur den markierten Abschnitt — Standard in pgAdmin, DataGrip, DBeaver. Ermöglicht das Testen eines Sub-Statements ohne Aufteilen der Query. | Mittel | — |
| KI-Vervollständigung (Consumer-gesteuert) | `getSuggestions?: (context) => Promise<string[]>` — Bibliothek rendert Ghost-Text/Dropdown, Consumer liefert die Vorschläge (eigenes LLM, OpenAI, Copilot-API). Kein Vendor-Lock-in, keine API-Keys in der Bibliothek. | Hoch | — |
| ~~⭐ Query-Verlauf~~ | ~~Letzte N Abfragen speichern/laden (localStorage), History-Menü, "Clear history".~~ | ~~Mittel~~ | ✅ v3.5.0 |
| ~~Keyboard Shortcut Execute~~ | ~~Cmd/Ctrl+Enter für `onExecute`.~~ | ~~Niedrig~~ | ✅ v1.5.0 |

---

## JsonEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ JSON5 / JSONC Modus | `mode?: 'json' \| 'json5' \| 'jsonc'` — JSON5 erlaubt Kommentare, Trailing Commas, unquotierte Keys; JSONC ist das Format von VS Code (`settings.json`, `tsconfig.json`). Konkreter Use Case: App-Config-Dateien direkt im Browser bearbeiten lassen. CodeMirror-Erweiterung für JSON5 ist verfügbar. | Mittel | — |
| ~~⭐ Download-Button~~ | ~~Toolbar-Button exportiert den Inhalt als `.json`-Datei (`showDownload`, `downloadFilename`).~~ | ~~Niedrig~~ | ✅ v3.25.0 |
| ~~⭐ JSON Path Finder~~ | ~~`Ctrl/Cmd+Click` kopiert vollständigen JSON-Path (z.B. `$.items[0].id`).~~ | ~~Niedrig~~ | ✅ v3.7.0 |
| ~~⭐ Folding / Collapsible~~ | ~~Objekte und Arrays inline ein-/aufklappen, `showFolding` (Default `true`).~~ | ~~Mittel~~ | ✅ v3.7.0 |
| ~~JSON Schema Validierung~~ | ~~`schema`-Prop mit Typ/Required/Enum/verschachtelten properties+items als Inline-Diagnostics.~~ | ~~Hoch~~ | ✅ v3.7.0 |
| ~~Minimap~~ | ~~Vertikale Übersicht für große JSON-Dokumente.~~ | ~~Niedrig~~ | ✅ v1.5.0 |

---

## TagSelection

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| Tag Groups | Tags in Kategorien einteilen — Group-Header im Dropdown über ein optionales `group`-Feld pro Tag. Reine Darstellungsfrage, kein neues Datenmodell. | Mittel | — |
| `showSelectAll` | Checkbox "Alle auswählen / Alle abwählen" im Dropdown-Footer — für Bulk-Workflows wo viele Tags auf einmal selektiert werden. | Mittel | — |
| Drag to Reorder | Ausgewählte Tags in der Auswahl-Zeile per Drag neu sortieren — `onTagsChange` feuert mit neuer Reihenfolge. | Mittel | — |
| ~~⭐ `chipVariant` Prop~~ | ~~`chipVariant?: 'filled' \| 'outlined'` für alle Tag-Chips.~~ | ~~Niedrig~~ | ✅ v3.21.0 |
| ~~⭐ Async Search~~ | ~~`searchDebounceMs` + `serverSideFilter` — deaktiviert Client-seitige Re-Filterung für Fuzzy-/Alias-Server-Suche.~~ | ~~Mittel~~ | ✅ v3.12.0 |
| ~~Tag Colors~~ | ~~`color`-Prop pro Tag für farbige Chips.~~ | ~~Niedrig~~ | ✅ implementiert |
| ~~Max-Tags-Limit~~ | ~~Verhindert Auswahl über n Tags hinaus.~~ | ~~Niedrig~~ | ✅ implementiert |
| ~~Farbe bei Tag-Erstellung~~ | ~~Custom Color Picker beim Anlegen neuer Tags.~~ | ~~Niedrig~~ | ✅ v2.8.0 |
| ~~Suchergebnis-Highlighting~~ | ~~Matching-Text im Dropdown fett hervorheben.~~ | ~~Niedrig~~ | ✅ v3.1.0 |

---

## PasswordStrengthMeter

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| `showGeneratorOptions` | Wenn `showPasswordGenerator=true`, optionale Inline-UI mit Slider für Passwortlänge + Toggles für Zeichenklassen (Groß, Klein, Ziffern, Sonderzeichen). Baut auf `generatorOptions`-Prop auf — kein neues Datenmodell. | Mittel | — |
| Accessibility: `aria-describedby` | Das Passwort-Input-Feld semantisch mit der Anforderungsliste verknüpfen — Screen-Reader lesen die Regeln vor wenn das Feld fokussiert wird. Aktuell visuell aber nicht semantisch verbunden. | Niedrig | — |
| ~~Passwort-Generator~~ | ~~Button generiert ein sicheres Passwort.~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~Passwort in Zwischenablage~~ | ~~Copy-Button neben generiertem Passwort.~~ | ~~Niedrig~~ | ✅ v3.9.0 |
| ~~Confirm-Feld~~ | ~~Zweites Eingabefeld mit Match-Validierung.~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~Custom Requirements~~ | ~~Eigene Anforderungen als Array-Prop.~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~Animated Segments~~ | ~~Strength-Bar als 4 separate Segmente.~~ | ~~Niedrig~~ | ✅ v1.5.0 |

---

## ColorPicker

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| "Aktuelle Farbe speichern"-Button | `savedColors` ist aktuell reine Anzeige/Auswahl — ein optionaler "+"-Button würde die aktuelle Farbe anhängen. Braucht `onSavedColorsChange`-Callback, State bleibt beim Consumer. | Niedrig | — |
| ~~PopoverColorPicker-Wrapper~~ | ~~Swatch-Button + MUI-Popover + `ColorPicker`, alle Props durchgereicht, CSS-Klassen-API, vollständig barrierefrei.~~ | ~~Niedrig~~ | ✅ v3.26.0 |
| ~~Controlled `format` Prop~~ | ~~`format`-Prop (controlled), analog zu MUIs `value`.~~ | ~~Niedrig~~ | ✅ v3.23.0 |
| ~~ColorPicker als eigenständige Komponente~~ | ~~Aus TagSelection extrahiert — Sättigung/Farbton-Fläche, Hue-/Alpha-Slider, Pipette, HEX/RGB/HSL, Saved Colors.~~ | ~~Mittel~~ | ✅ v3.13.0 |

---

## D3-Charts (gemeinsam)

Cross-Cutting-Ideen, die für alle D3-Charts gleich umgesetzt werden würden.

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ `selectedId` controlled prop | Von außen einen Knoten / Balken / Segment hervorheben — `selectedId?: string` + `onSelectedIdChange` pro Chart. Vervollständigt Linked-View-Muster: Hover-Callbacks (✅ v3.27.0) zeigen was unter der Maus ist, `selectedId` hält die persistente Auswahl. Use Case: Tabellenzeile klicken → das zugehörige Chart-Segment leuchtet auf. Identisches Pattern wie GanttChart `selectedTaskIds`. | Niedrig pro Chart | — |
| ~~Hover-Callbacks~~ | ~~`onNodeHover` / `onBarHover` / `onSegmentHover` (je nach Chart) — für "linked views", null bei mouseleave.~~ | ~~Niedrig pro Chart~~ | ✅ v3.27.0 |

---

## SunburstChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Eingebautes Breadcrumb | Alle anderen Drill-down-Charts haben es (HorizontalTree ✅ v2.4.0, RadialTree ✅, CirclePacking ✅) — Sunburst hat trotz Drill-down keins. | Niedrig | — |
| Legende | Farbzuordnung Kategorie ↔ Farbe als Komponente unterhalb des Charts — bei vielen Segmenten schwer zuordenbar ohne sie. | Mittel | — |
| ~~Animierte Drill-Down-Übergänge~~ | ~~React-State+rAF-Tween, `duration`-Prop, Default 750ms.~~ | ~~Mittel~~ | ✅ v3.10.0 |
| ~~`valueFormatter` Prop~~ | ~~Alle Tooltip-Werte über eigene Funktion formatierbar.~~ | ~~Niedrig~~ | ✅ v3.22.0 |

---

## ChordChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Legende | Bei vielen Gruppen schwer erkennbar, welche Farbe zu welcher Gruppe gehört — ein häufiges erstes Feedback beim Einbetten in Dashboards. | Niedrig | — |
| Gruppen-Filter | Klick auf Legenden-Eintrag blendet die Gruppe + ihre Ribbons ein/aus — baut auf der Legende auf, macht ohne sie keinen Sinn. | Mittel | — |
| Such-Highlighting | Gruppenname eingeben → Gruppe hervorheben, Rest abdunkeln. Nützlich bei Diagrammen mit 15+ Gruppen. | Niedrig | — |
| ~~`valueFormatter` Prop~~ | ~~Numerische Werte in Gruppen- und Chord-Tooltips formatierbar.~~ | ~~Niedrig~~ | ✅ v3.22.0 |

---

## RadialTreeChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| Node-Suche / Highlight | `searchHighlightIds?: string[]` — Consumer übergibt IDs die hervorgehoben werden sollen, eigene Suche bleibt außerhalb der Komponente. Standardmuster für Suchfeatures in Baumvisualisierungen. | Mittel | — |
| ~~Eingebautes Breadcrumb~~ | ~~`focusStack.length > 1` → Breadcrumb über dem Chart, analog zu HorizontalTreeChart.~~ | ~~Niedrig~~ | ✅ |
| ~~Animierte Fokus-Übergänge~~ | ~~Crossfade beim Drill-down, `duration`-Prop, Default 750ms.~~ | ~~Mittel~~ | ✅ v3.11.0 |

---

## CirclePackingChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| Legende | Farbzuordnung Kategorie ↔ Farbe. | Mittel | — |
| Such-Highlighting | Knoten per Name finden, Pfad zur Wurzel hervorheben. | Mittel | — |
| ~~Eingebautes Breadcrumb~~ | ~~`focus !== root` → Breadcrumb über dem Chart, analog zu HorizontalTreeChart.~~ | ~~Niedrig~~ | ✅ |
| ~~`valueFormatter` Prop~~ | ~~Tooltip-Wert über eigene Funktion formatierbar.~~ | ~~Niedrig~~ | ✅ v3.22.0 |

---

## HorizontalTreeChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| Teilbaum Ein-/Ausklappen | Aktuell nur globaler Fokus-Wechsel — kein unabhängiges Collapse pro Knoten. Standard in Org-Chart-Tools: ein Klick klappt den Ast ein, ein zweiter klappt ihn wieder auf. | Mittel | — |
| ~~Eingebautes Breadcrumb~~ | ~~Fehlte trotz `focusedNode` / `onFocusChange`.~~ | ~~Niedrig~~ | ✅ v2.4.0 |
| ~~Animierte Fokus-Übergänge~~ | ~~Crossfade, `duration`-Prop, Default 750ms.~~ | ~~Mittel~~ | ✅ v3.11.0 |

---

## RadialStackedBarChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| Animierte Daten-Übergänge | Wenn `data` sich ändert, animierter Übergang der Balken (D3 `transition()` auf den Arc-Paths) — analog zu `duration`-Prop bei SunburstChart / RadialTreeChart. | Mittel | — |
| `selectedBarId` controlled prop | Von außen einen Balken hervorheben (z.B. wenn eine Tabellenzeile daneben selektiert wird) — Linked-View-Pattern. Ergänzt `selectedId` aus den D3-Charts-Shared-Plänen. | Mittel | — |
| ~~⭐ `valueFormatter` Prop~~ | ~~`seriesKey`-Argument für serienabhängige Formatierung (z.B. `€` für Umsatz, `kg` für Gewicht).~~ | ~~Niedrig~~ | ✅ v3.22.0 |
| ~~Hover-Callback~~ | ~~`onBarHover?` — feuert bei mouseenter / mouseleave.~~ | ~~Niedrig~~ | ✅ v3.27.0 |

---

## Historie: Bereits gelöste Adoption-Blocker

Cross-Cutting-Probleme die die Adoption des Pakets behindert haben — alle erledigt.

| Feature | Beschreibung | Status |
|---|---|---|
| ~~**🔴 StackBlitz / CodeSandbox Template**~~ | ~~"Try it now"-Link in README — Entwickler entscheiden in 30 Sek. ohne Installation.~~ | ✅ v3.2.0 |
| ~~**🔴 Bundle-Bloat / Tree-Shaking**~~ | ~~`preserveModules` — 1.1 MB → 22 KB für Single-Component-Import.~~ | ✅ v3.3.0 |
| ~~**🟡 CSS-Klassen-API (Slot-Klassen)**~~ | ~~Stabile `.MuiTs<Component>-<slot>`-Klassen für TagSelection, PasswordStrengthMeter, ColorPicker.~~ | ✅ v3.24.0 |
| ~~**🟡 ChordChart Dark-Mode**~~ | ~~`mixBlendMode` theme-aware.~~ | ✅ v3.2.1 |
| ~~**🟡 HorizontalTreeChart Link-Opacity**~~ | ~~`linkStrokeOpacity`-Default auf `1.0`.~~ | ✅ v3.2.1 |
| ~~**🟡 Storybook Charts — play-Funktionen**~~ | ~~Interaktionsfeatures automatisch demonstriert.~~ | ✅ v3.5.0 |
| ~~**🔴 SqlEditor — keine Tests**~~ | ~~21 Tests ergänzt, 0 % → 82 % Lines.~~ | ✅ v3.4.0 |
| ~~**🟡 Test-Coverage-Lücken**~~ | ~~ImageDialog → 94 %, TableMenu → 96 %.~~ | ✅ v3.4.0 |
| ~~**🟡 Accessibility-Audit**~~ | ~~13 fehlende `aria-label` ergänzt.~~ | ✅ v3.4.0 |
