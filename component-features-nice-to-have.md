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

Noch keine Entscheidung, sondern Diskussionsgrundlage: Stellen, an denen MUI-Nutzer typischerweise
auf eine Wand laufen — entweder gibt's nichts, oder nur in MUI X Pro/Premium gegen Lizenzgebühr.

| Komponente | MUI-Lücke | Warum das zu uns passt |
|---|---|---|
| **DataTable** (Sortierung, Filter, Spalten-Resize, CSV-Export, Virtualisierung) | MUI X `DataGrid` Community ist stark eingeschränkt — Sortierung über mehrere Spalten, Filter-UI und Export sind Pro/Premium-Features. Der mit Abstand meistgenannte MUI-Schmerzpunkt. | GanttChart hat bereits eine eigene Virtualisierungs-Lösung (`virtualizeRows`) — die Grundlagen sind im Projekt schon vorhanden. |
| **DateRangePicker** | MUI X `DateRangePicker` ist exklusiv Pro — keine freie MUI-Lösung für "Start- und Enddatum in einem Picker". | GanttChart bringt bereits Datums-Range-Logik (`TimelineRange`, Clamping) mit — direkt wiederverwendbar. |
| **FileUpload / Dropzone** | MUI hat **gar keine** Lösung — weder Community noch Pro. Drag & Drop, Progress, Vorschau muss jedes Projekt selbst bauen. | Komplementiert RichTextEditor (Bild-Embed nutzt aktuell nur URL/Base64) — ein Dropzone-Baustein würde dort direkt mit andocken. |
| ~~**ColorPicker**~~ | ~~MUI hat keinen eigenen Farbwähler.~~ | ✅ v3.13.0 — als eigenständige Komponente umgesetzt (Sättigung/Farbton/Alpha, Pipette, HEX/RGB/HSL, Saved Colors). Siehe eigene Sektion unten. |

---

## GanttChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Keyboard Navigation | `↑`/`↓` wählt die nächste/vorherige Task-Zeile, `Enter` öffnet den Bearbeiten-Dialog für die ausgewählte Zeile, `Escape` schließt ihn. Aktuell nur mausbedienbar — fehlende Accessibility-Grundlage. | Mittel | — |
| ~~⭐ Panel-Splitter per Drag~~ | ~~`minPanelWidth` / `maxPanelWidth` als statische Props.~~ Drag-Handle zwischen Task-Panel und Timeline war bereits von Anfang an implementiert (`handleDividerMouseDown`, `cursor: col-resize`, `minPanelWidth`/`maxPanelWidth` als Constraints). Storybook-Controls vorhanden. | ~~Mittel~~ | ✅ seit v1.x |
| ~~Assignee-Filter in Toolbar~~ | ~~Dropdown-Filter in der Toolbar zum Einschränken auf einen Assignee — baut auf `showAssigneeColumn` + `GanttTask.assignee` auf, kein neues Datenmodell.~~ `toolbarConfig={{ showAssigneeFilter: true }}` — ancestor-inklusiver Filter, 2 optionale Translation-Keys (`filterAssigneeAll`, `filterAssigneeLabel`), 4 neue Tests, Story `WithAssigneeFilter`. | ~~Mittel~~ | ✅ v3.17.0 |
| ~~`onDragStart` Callback~~ | ~~Feuert wenn der User beginnt, einen Balken zu verschieben oder zu resizen — für optimistic UI / Shadow-Balken während des Dragens. Aktuell gibt es nur das Endergebnis via `onTaskMoved` / `onTaskResized`.~~ Einmalig bei mousedown (vor 5-px-Schwellwert), `type: "move" | "resize"`, vollständig in `useGanttDrag` via Callback-Ref, 2 neue Tests, Backend-Integration-Doku in GanttChart.md. Debouncing-Abschnitt in allen Editor-Manuals (EN+DE). | ~~Niedrig~~ | ✅ v3.17.0 |
| Export PNG/PDF | Sichtbarer Ausschnitt der Timeline als Bild — andere Rendering-Basis als die D3-Charts (Mix aus HTML-Panel + SVG-Timeline statt reines SVG), daher eigene Lösung nötig, nicht über die D3-Charts-Export-Utility wiederverwendbar. | Hoch | — |
| Touch / Mobile Drag | Drag & Drop für Task-Balken auf Touch-Geräten über die Pointer Events API — aktuell nur Maus. | Hoch | — |
| Baseline-Vergleich | Ursprungsplanung als zweiter, schmalerer Balken hinter dem Ist-Balken — Standardmuster aus MS Project/Jira-Gantt-Plugins, kein Custom-Konzept. | Hoch | — |
| ~~⭐ Progress-Feld im eingebauten Dialog~~ | ~~`GanttTask.progress` (0–100 %) war nur via `progressDraggable` setzbar — Nicht-Maus-Nutzer und Accessibility-Szenarien ausgeschlossen.~~ MUI-Slider im eingebauten Add/Edit-Dialog, pre-filled aus `initialTask.progress`, Rücksetzen auf 0 bei Milestone-Toggle, `aria-valuenow` testbar. | ~~Niedrig~~ | ✅ v3.16.0 |
| ~~Dependency-Zyklus-Schutz~~ | ~~Bearbeiten der Task-Daten/Abhängigkeiten über den Task-Dialog konnte ohne Warnung einen Abhängigkeitszyklus erzeugen.~~ Tasks, die bereits (direkt oder transitiv) vom bearbeiteten Task abhängen, werden jetzt aus den Dependency-Optionen ausgeschlossen. | ~~Mittel~~ | ✅ v3.11.3 |
| ~~Spalte: Assignee~~ | ~~Zusätzliche Spalte im Task-Panel für Verantwortliche~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~CSV / Excel Export~~ | ~~Tasks als Tabelle exportieren~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~Zoom per Scroll~~ | ~~Ctrl / Cmd ⌘+Scroll ändert TimeScale~~ | ~~Mittel~~ | ✅ v1.5.0 |
| ~~Today-Button~~ | ~~Toolbar-Button scrollt zum heutigen Tag~~ | ~~Niedrig~~ | ✅ implementiert |
| ~~Heute-Chip~~ | ~~Chip an der gestrichelten Heute-Linie~~ | ~~Niedrig~~ | ✅ v1.5.0 |

**Verworfen** (zu vage oder architektonisch nicht zur Komponente passend): *Schnell-Hinzufügen* und
*Bulk-Status-Änderung* setzen eine Mehrfachauswahl voraus, die es noch gar nicht gibt — erst dort
ansetzen, falls Mehrfachauswahl mal kommt. *Undo/Redo* ist für eine komplett controlled Komponente
(Consumer besitzt `tasks`) unklar verortet — die History müsste der Consumer ohnehin selbst führen.
*Wiederkehrende Tasks* ist Scheduling-Geschäftslogik, nicht Visualisierung — gehört in die
Backend-/Datenschicht des Consumers. *Resource View* ist de facto eine andere Komponente
(Ressourcen-Auslastung), kein Feature von GanttChart. *Mini-Map* ist hier kein echtes Problem —
die Timeline hat bereits Scroll + Zoom-Controls.

---

## RichTextEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ `onSave` / Ctrl+S | Callback-Prop `onSave?: () => void` — feuert bei Ctrl/Cmd+S. Standardmuster in jedem webbasierten Editor (Notion, Google Docs, Confluence). Die Komponente braucht dafür keinen eigenen Speicher-Layer — der Consumer bestimmt was passiert. | Niedrig | — |
| ⭐ `defaultValue` (unkontrollierter Modus) | `value` ist aktuell für kontrolliertes und unkontrolliertes Verhalten zuständig, kein `defaultValue`. Eine unkontrollierte `defaultValue`-Prop — analog zu MUI TextField — würde einfachere Integration ohne externen State ermöglichen. | Niedrig | — |
| ⭐ `onMentionInserted` Callback | Wenn ein Mention eingefügt wird (`@Name`), gibt es keinen Callback mit dem eingefügten `MentionItem`. Consumer können nicht wissen, welche Mentions im Text enthalten sind, ohne den HTML zu parsen. `onMentionInserted?: (item: MentionItem) => void` | Niedrig | — |
| Toolbar Extensions | `toolbarExtensions?: React.ReactNode` — Consumer können eigene Buttons neben den Standard-Buttons platzieren ohne Fork. Setzt keine neue Interne Struktur voraus, nur ein Render-Slot am Ende der Toolbar. | Mittel | — |
| Slash Commands (/) | `/`-getriggertes Kontextmenü zum Einfügen von Blöcken (Notion-Pattern), Optionen aus den bereits vorhandenen Toolbar-Features (Tabelle, Bild, Emoji) gespeist — kein neuer Funktionsumfang, nur ein zweiter Zugriffsweg. | Hoch | — |
| Diff View | Zwei HTML-Versionen readonly nebeneinander, wortweise Differenz hervorgehoben (z.B. via `diff-match-patch`) — Use Case: Edit-Historie in einem CMS-Review-Flow. | Hoch | — |
| ~~Word Count~~ | ~~Wörter- und Zeichen-Zähler im Footer~~ | ~~Niedrig~~ | ✅ v1.4.0 |
| ~~Full Screen Mode~~ | ~~Editor nimmt den gesamten Viewport ein~~ | ~~Niedrig~~ | ✅ v1.4.0 |
| ~~Tabellen~~ | ~~Tiptap Table Extension — Zeilen/Spalten einfügen~~ | ~~Mittel~~ | ✅ v2.1.0 |
| ~~Bild-Embed~~ | ~~`<img>` per URL oder Base64 einfügen~~ | ~~Mittel~~ | ✅ v2.1.0 |
| ~~Emoji Picker~~ | ~~😀 Button mit Such-Emoji-Popover~~ | ~~Mittel~~ | ✅ v2.1.0 |
| ~~Einfügen als Klartext~~ | ~~Toggle: Eingefügter Inhalt wird automatisch von Formatierung befreit~~ | ~~Niedrig~~ | ✅ v3.8.0 |
| ~~Markdown-Import/Export~~ | ~~Zwischen HTML-Inhalt und Markdown per Klick konvertieren~~ | ~~Mittel~~ | ✅ v3.8.0 |

**Verworfen:** *Custom Content Blocks* ("eigene Block-Typen registrieren") ist zu vage für eine
Aufwandsschätzung und würde den Editor von einer fokussierten, opinionierten Komponente zu einem
generischen Tiptap-Wrapper verschieben — käme erst zurück auf die Liste mit einem konkreten
API-Vorschlag (welche Blocktypen, welche Registrierungs-API). *Mathformel (KaTeX)* ist eine
Nischenanforderung (wissenschaftliche/akademische Anwendungen) ohne erkennbaren Bezug zu typischen
Web-App-Use-Cases dieser Komponente.

---

## SqlEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Hover-Doku | Spalten-/Tabellen-Kommentar aus der bereits vorhandenen `schema`-Prop als Tooltip beim Hover über einen Identifier. | Mittel | — |
| ⭐ Nur-Selektion ausführen | Wenn Text im Editor markiert ist und der User Execute drückt, wird nur der markierte Abschnitt an `onExecute` geliefert — Standard in pgAdmin, DataGrip, DBeaver. Ermöglicht das Testen eines einzelnen Sub-Statements ohne Aufteilen der Query. Technisch: CodeMirror `editor.state.selection` vs. ganzer Inhalt. | Mittel | — |
| Schema-Explorer Panel | Collapsible Sidebar mit `schema.tables` als Baumansicht — Klick fügt Tabellen- oder Spaltennamen an der Cursor-Position ein. Baut auf der vorhandenen `schema`-Prop auf, keine neue Datenquelle. | Hoch | — |
| KI-Vervollständigung (Consumer-gesteuert) | `getSuggestions?: (context) => Promise<string[]>`-Callback-Prop — die Bibliothek ruft **kein** eigenes LLM/keine eigene API auf, sondern rendert nur die Vorschlags-UI (Ghost-Text/Dropdown) und ruft den vom Consumer bereitgestellten Callback auf. Kein Vendor-Lock-in, keine Kosten/Datenschutzfragen auf Bibliotheksseite. | Hoch | — |
| Ergebnis-Metadaten-Footer | Nach `onExecute`: Zeilenanzahl + Ausführungszeit im Footer — Werte kommen vom `onExecute`-Resultat, keine neue Datenquelle. | Mittel | — |
| Snippet-Bibliothek | Gespeicherte SQL-Bausteine mit Namen einfügen — gleiches Formprinzip wie die bestehende Query-History (`localStorage`, Key-Prop, Max-Entries). | Mittel | — |
| ~~Keyboard Shortcut Execute~~ | ~~Cmd / Ctrl+Enter für `onExecute`~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~Zeilennummern-Gutter anpassen~~ | ~~Breite auto an max. Zeilenzahl~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~⭐ Query-Verlauf~~ | ~~Letzte N Abfragen speichern/laden (localStorage)~~ — `toolbarConfig.showHistory` + `queryHistoryKey`/`queryHistoryMaxEntries`, History-Menu zum Nachladen, "Clear history". | ~~Mittel~~ | ✅ v3.5.0 |

**Verworfen:** *Multi-Tab Queries* würde die Komponente von einem fokussierten Single-Query-Editor zu
einem Tab-Manager umbauen — das lässt sich schon heute durch mehrere `SqlEditor`-Instanzen im
eigenen Tab-Layout des Consumers erreichen, ohne dass die Bibliothek selbst Tabs verwalten muss.

---

## JsonEditor

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ JSON5 / JSONC Modus | `mode?: 'json' | 'json5' | 'jsonc'` — JSON5 erlaubt Kommentare, Trailing Commas, unquotierte Keys; JSONC ist das Format von VS Code (`settings.json`, `tsconfig.json`). Konkreter Use Case: Config-Dateien bearbeiten. CodeMirror-Erweiterung für JSON5 ist verfügbar. | Mittel | — |
| Beispiel-JSON Generator | Nur sinnvoll mit gesetzter `schema`-Prop: Button generiert ein minimales, zum Schema passendes Placeholder-JSON (ein Wert pro Required-Feld, korrekter Typ). Ohne Schema kein Mehrwert gegenüber leerem Editor — daher kein generischer Fallback. | Niedrig | — |
| Download-Button | Toolbar-Button exportiert den Inhalt als `file.json` — kein neues Feature außer einem `<a download>`-Trigger. Analog zum Copy-Button. | Niedrig | — |
| Diff Mode | Zwei JSON-Strings readonly nebeneinander, strukturell verglichen (nicht nur Text-Diff) — gleiches Bedürfnis wie RichTextEditors Diff View. | Hoch | — |
| Tree View | Toggle zwischen Text- und Baumansicht — Standardmuster bekannter JSON-Tools (z.B. zum Durchsuchen großer API-Responses). | Hoch | — |
| ~~Minimap~~ | ~~Vertikale Übersicht für große JSON-Dokumente~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~⭐ JSON Path Finder~~ | ~~Klick auf Wert kopiert vollständigen JSON-Path~~ — `Ctrl/Cmd+Click` kopiert Pfad (z.B. `$.items[0].id`) via Lezer-Syntaxbaum, mit visuellem Feedback. `enablePathFinder`, `onPathCopy`. | ~~Niedrig~~ | ✅ v3.7.0 |
| ~~⭐ Folding / Collapsible~~ | ~~Objekte und Arrays inline ein-/aufklappen~~ — `@codemirror/lang-json` hatte Folding schon eingebaut, nur Gutter + Keymap fehlten. `showFolding` (Default `true`). | ~~Mittel → Niedrig~~ | ✅ v3.7.0 |
| ~~JSON Schema Validierung~~ | ~~Schema-Prop für strukturelle Validierung (Typ, Required-Felder, Enum)~~ — `schema`-Prop mit Typ/Required/Enum/verschachtelten properties+items, Fehler als Inline-Diagnostics wie der Parse-Linter. | ~~Hoch~~ | ✅ v3.7.0 |

---

## TagSelection

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ `chipVariant` Prop | `chipVariant?: 'filled' | 'outlined'` — MUI Chip unterstützt beide Varianten nativ, aber TagSelection exponiert das nicht. Consumer mit eigenem Design-System wollen oft `outlined`. Niedrig-Aufwand: eine Prop, die direkt an MUI Chip weitergereicht wird. | Niedrig | — |
| Tag Groups | Tags in Kategorien einteilen (Group-Header im Dropdown) — reine Darstellungsfrage, keine neue Datenstruktur (Gruppierung über ein optionales `group`-Feld pro Tag). | Mittel | — |
| `showSelectAll` | Checkbox "Alle auswählen / Alle abwählen" im Dropdown-Footer — für Bulk-Workflows wo viele Tags auf einmal selektiert werden. | Mittel | — |
| Drag to Reorder | Ausgewählte Tags per Drag neu sortieren. | Mittel | — |
| ~~⭐ Async Search~~ | ~~`onSearchChange` feuerte ungebremst bei jedem Tastenanschlag, und Server-Ergebnisse wurden zusätzlich clientseitig per Substring re-gefiltert.~~ `searchDebounceMs` (debounced den Callback) + `serverSideFilter` (deaktiviert die eigene und MUIs interne Substring-Filterung, vertraut `tags` wie geliefert — nötig für Fuzzy-/Alias-Server-Suche). Beim Umsetzen zusätzlich einen Bug gefunden und gefixt: MUI feuert `onInputChange` mit `reason="reset"` und leerem Wert direkt nach jedem `"input"`-Event — wurde ungefiltert weitergereicht. | ~~Mittel~~ | ✅ v3.12.0 |
| ~~Tag Colors~~ | ~~`color`-Prop pro Tag für farbige Chips~~ | ~~Niedrig~~ | ✅ implementiert |
| ~~Max-Tags-Limit~~ | ~~Verhindert Auswahl über n Tags hinaus~~ | ~~Niedrig~~ | ✅ implementiert |
| ~~Farbe bei Tag-Erstellung~~ | ~~Custom Color Picker beim Anlegen neuer Tags~~ | ~~Niedrig~~ | ✅ v2.8.0 |
| ~~Suchergebnis-Highlighting~~ | ~~Matching-Text im Dropdown fett hervorheben~~ | ~~Niedrig~~ | ✅ v3.1.0 |

---

## PasswordStrengthMeter

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| HaveIBeenPwned-Prüfung (Consumer-gesteuert) | `onCheckLeaked?: (password) => Promise<boolean>`-Callback — die Bibliothek ruft selbst keine externe API auf (Datenschutz: Passwort verlässt sonst die Kontrolle des Consumers ungefragt). Consumer implementiert den k-Anonymity-Range-Query gegen die HIBP-API oder einen eigenen Dienst. | Hoch | — |
| `showGeneratorOptions` | Wenn `showPasswordGenerator=true`, optionale Inline-UI mit Slider für Passwortlänge + Toggles für Zeichenklassen (Groß, Klein, Ziffern, Sonderzeichen). Baut auf `generatorOptions`-Prop auf — kein neues Datenmodell. | Mittel | — |
| Accessibility: `aria-describedby` für Anforderungsliste | Das Passwort-Input-Feld sollte via `aria-describedby` mit der Anforderungsliste verknüpft sein, damit Screen-Reader die Regeln vorlesen wenn das Feld fokussiert wird. Aktuell sind Input und Checkliste visuell aber nicht semantisch verbunden. | Niedrig | — |
| Requirements einklappen | Anforderungs-Checkliste auf- und zuklappen. | Niedrig | — |
| ~~Passwort-Generator~~ | ~~Button generiert ein sicheres Passwort~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~Passwort in Zwischenablage~~ | ~~Copy-Button neben generiertem Passwort~~ | ~~Niedrig~~ | ✅ v3.9.0 |
| ~~Confirm-Feld~~ | ~~Zweites Eingabefeld mit Match-Validierung~~ | ~~Mittel~~ | ✅ v2.7.0 |
| ~~Custom Requirements~~ | ~~Eigene Anforderungen als Array-Prop~~ | ~~Niedrig~~ | ✅ v1.5.0 |
| ~~Animated Segments~~ | ~~Strength-Bar als 4 separate Segmente~~ | ~~Niedrig~~ | ✅ v1.5.0 |

**Verworfen:** *Sichtbarkeit nach Stärke* (Anzeigen-Button erst ab Mindeststärke freischalten) bringt
keinen Sicherheitsgewinn — der Nutzer tippt das Passwort ohnehin selbst in sein eigenes Browserfenster
— und wäre nur eine zusätzliche, verwirrende Hürde ohne Nutzen.

---

## ColorPicker

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| PopoverColorPicker-Wrapper | Vorgefertigte Swatch-Button-+-Popover-Kombination als Convenience-Komponente — aktuell muss jeder Consumer das Popover selbst bauen (im Manual dokumentiert). | Niedrig | — |
| "Aktuelle Farbe speichern"-Button | `savedColors` ist aktuell reine Anzeige/Auswahl — ein optionaler "+"-Button würde die aktuelle Farbe anhängen, bräuchte aber einen `onSavedColorsChange`-Callback (state bleibt beim Consumer). | Niedrig | — |
| Controlled `format` Prop | `defaultFormat` ist uncontrolled — nach dem Mount kann der Consumer das aktive Format (HEX / RGB / HSL) nicht mehr von außen steuern. Ein `format`-Prop (controlled, analog zu MUIs `value`) würde das ermöglichen, z.B. wenn der Picker in einem Formular resettet werden soll. `onFormatChange` ist bereits vorhanden. | Niedrig | — |
| ~~ColorPicker als eigenständige Komponente~~ | ~~Existierte nur ad-hoc in TagSelection (Custom-Color-Picker bei Tag-Erstellung)~~ — als volle, eigenständige Komponente extrahiert: Sättigung/Farbton-Fläche, Hue-/Alpha-Slider, Pipette (EyeDropper-API), HEX/RGB/HSL-Format-Umschaltung, Saved-Colors-Raster, Formular-Integration via `name`. | ~~Mittel~~ | ✅ v3.13.0 |

---

## D3-Charts (gemeinsam)

Cross-Cutting-Ideen, die für alle D3-Charts gleich umgesetzt werden würden — eine gemeinsame Utility statt N× derselbe Code.

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ PNG/SVG Export | Diagramm als Bild speichern (SVG → Canvas → PNG) — aktuell kann **keiner** der D3-Charts exportiert werden | Mittel | — |
| Hover-Callbacks | `onNodeHover` / `onBarHover` / `onSegmentHover` (je nach Chart) — für "linked views": Hover in Chart A hebt den entsprechenden Eintrag in Chart B hervor. Aktuell haben alle Charts nur `onClick`-Callbacks. Technisch: `onMouseEnter`-Handler, der ein Payload-Objekt (analog zu `onNodeClick`) nach oben reicht. | Niedrig pro Chart (1 Tag für alle) | — |
| `colorMode` Prop | `colorMode?: 'light' \| 'dark'` — zwingt den Chart zur Light- oder Dark-Palette unabhängig vom App-Theme. Nützlich für Export-Thumbnails, E-Mail-Einbettungen oder wenn der Chart in einem Iframe gerendert wird, der immer hell sein soll. | Mittel | — |

---

## SunburstChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Eingebautes Breadcrumb | `CirclePackingChart` zeigt beim Reinzoomen automatisch ein Breadcrumb — Sunburst hat trotz Drill-down keins | Niedrig | — |
| Legende | Farbzuordnung Kategorie ↔ Farbe als eigene Komponente — bei vielen Segmenten schwer zuordenbar | Mittel | — |
| `focusedNodeId` controlled prop | Von außen programmatisch einen Knoten als Drill-down-Fokus setzen (z.B. wenn ein Breadcrumb außerhalb des Charts geklickt wird). Aktuell nur interaktiv per Ctrl+Click steuerbar. | Mittel | — |
| `maxDepth` | Rendert nur N Ebenen tief — für sehr tiefe Hierarchien, wo die inneren Ringe unlesbar klein werden. | Mittel | — |
| ~~Animierte Drill-Down-Übergänge~~ | ~~Zoom passierte als Hard-Cut (kein `.transition()`)~~ — Als React-State+rAF-Tween umgesetzt (kein D3-Imperativ-Umbau nötig), `duration`-Prop, Default 750ms. | ~~Mittel~~ | ✅ v3.10.0 |

---

## ChordChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Legende | Bei vielen Gruppen schwer erkennbar, welche Farbe zu welcher Gruppe gehört | Niedrig | — |
| Gruppen-Filter | Klick auf Legenden-Eintrag blendet die Gruppe + ihre Ribbons ein/aus — baut auf der Legende oben auf, macht ohne sie keinen Sinn | Mittel | — |
| Such-Highlighting | Gruppenname eingeben → hervorheben, Rest abdunkeln | Niedrig | — |
| `valueFormatter` Prop | Aktuell gibt es `valueDecimalCount` / `valueDecimalSeparator` / `valueThousandsSeparator` für Tooltips — aber kein `valueFormatter?: (v: number) => string` für komplett eigene Formatierung (z.B. "3,2 Mrd. €" oder Einheiten wie "kg"). Gleiche Lücke wie bei anderen Charts. | Niedrig | — |

---

## RadialTreeChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Eingebautes Breadcrumb | Fehlt trotz vorhandenem `onFocusChange`/Drill-down — Storybook-Demo baut sich aktuell ein eigenes | Niedrig | — |
| Mini-Map | Kleine Ecken-Übersicht mit Viewport-Rechteck bei sehr tiefen/breiten Bäumen — konkretes, bekanntes Muster (analog zur Minimap, die JsonEditor bereits hat), kein generisches "wäre nett". Sinnvoll, weil Drill-down + Zoom bei tiefen Bäumen den Überblick tatsächlich verlieren lässt. | Hoch | — |
| Node-Suche / Highlight | `searchHighlightIds?: string[]` — Consumer übergibt IDs die hervorgehoben werden sollen, eigene Suche bleibt außerhalb der Komponente. Standardmuster für Such-Features in Baumvisualisierungen. | Mittel | — |
| `maxDepth` | Rendert nur N Ebenen tief — für sehr große Bäume, wo Leaf-Ebenen zu klein zum Klicken werden. | Mittel | — |
| ~~Animierte Fokus-Übergänge~~ | ~~Fokus-Wechsel beim Drill-down passierte als Hard-Cut~~ — Als Crossfade umgesetzt (alter Layout-Zustand blendet aus, neuer darunter) statt Positions-Tweening, da Drill-down die Hierarchie komplett neu verwurzelt. `duration`-Prop, Default 750ms. | ~~Mittel~~ | ✅ v3.11.0 |

---

## CirclePackingChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ Eingebautes Breadcrumb | HorizontalTreeChart hat es, RadialTreeChart hat es noch nicht (separate Sektion), CirclePackingChart auch nicht — obwohl alle drei Drill-down-fähig sind. Konsistenz über alle Tree-Charts hinweg. | Niedrig | — |
| Legende | Farbzuordnung Kategorie ↔ Farbe als eigene Komponente | Mittel | — |
| Such-Highlighting | Knoten per Name finden, Pfad zur Wurzel hervorheben | Mittel | — |

---

## HorizontalTreeChart

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| 🟡 Ghost-Layer bei Orientation-Wechsel | Wechselt `orientation` während einer laufenden Drill-Transition, springt die ausblendende Ghost-Ebene auf die neue Orientierung statt eingefroren zu bleiben. Rein kosmetisch, kein Crash/falsche Daten. Gefunden im Bug-Audit v3.11.2. | Niedrig | — |
| Teilbaum Ein-/Ausklappen | Aktuell nur globaler Fokus-Wechsel — kein unabhängiges Collapse pro Knoten | Mittel | — |
| `showValueBadge` | Wenn `HorizontalTreeData.value` gesetzt ist, zeige einen kleinen Badge am Knoten-Rand mit dem formatierten Wert — Standardmuster in Org-Chart-Tools. Baut auf vorhandene `value`-Prop auf, kein neues Datenmodell. | Niedrig | — |
| `renderNodeLabel` Prop | `renderNodeLabel?: (info: HorizontalTreeNodeInfo) => React.ReactNode` — Custom-Render für die Node-Labels, z.B. Status-Chips, Avatar, Icon neben dem Namen. | Mittel | — |
| ~~Eingebautes Breadcrumb~~ | ~~Fehlte trotz `focusedNode`/`onFocusChange`~~ | ~~Niedrig~~ | ✅ v2.4.0 |
| ~~Animierte Fokus-Übergänge~~ | ~~Fokus-Wechsel passierte als Hard-Cut~~ — Als Crossfade umgesetzt, gleiches Muster wie RadialTreeChart. `duration`-Prop, Default 750ms. | ~~Mittel~~ | ✅ v3.11.0 |

---

## RadialStackedBarChart

Neue Komponente seit v3.15.0 — Sektion wächst mit den ersten Erfahrungen aus dem Einsatz.

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ PNG/SVG Export | Via die geplante D3-Charts-Shared-Export-Utility — identisches Pattern wie alle anderen D3-Charts. | Mittel | — |
| ⭐ `valueFormatter` Prop | `valueFormatter?: (value: number, seriesKey: string) => string` — eigene Formatierung der Tooltip-Werte, unabhängig von `gridValueFormatter` (der nur Grid-Ring-Labels formatiert). Aktuell nutzt der Tooltip intern `formatNumber` mit den `valueDecimal*`-Props. | Niedrig | — |
| Animierte Daten-Übergänge | Wenn `data` sich ändert, animierter Übergang der Balken (D3 `transition()` auf den Arc-Paths) — analog zu `duration`-Prop bei SunburstChart / RadialTreeChart. | Mittel | — |
| `startAngle` Prop | In Grad ab welchem Winkel der erste Balken startet — Standard ist 12 Uhr (−90° = 0° intern). `startAngle?: number` würde erlauben, den Chart z.B. bei 3 Uhr zu beginnen. | Niedrig | — |
| `selectedBarId` controlled prop | Von außen einen Balken hervorheben (z.B. wenn eine Tabellenzeile daneben selektiert wird) — linked views. Aktuell nur intern bei Hover via Opacity-Effekt. | Mittel | — |
| Hover-Callback | `onBarHover?: (info: RadialStackedBarBarInfo | null, event: React.MouseEvent) => void` — feuert bei mouseenter/mouseleave auf einem Segment. Baut auf die bereits vorhandene Hover-Opacity-Logik auf. | Niedrig | — |

---

## Developer Experience

| Feature | Beschreibung | Aufwand | Status |
|---|---|---|---|
| ⭐ GitHub Releases anlegen | Für `v3.0.0`, `v3.1.0`, `v3.1.1` — GitHub zeigt Releases prominent in der Sidebar; aktuell nur nackte Tags ohne Beschreibung | Niedrig | ⚡ offen |
| Playwright Visual Tests | Screenshot-Vergleiche für Chart-Rendering — Qualitätsinvestition, kein User-Feature | Hoch | — |
| ~~Live Storybook~~ | ~~`https://thebuoyant.github.io/mui-ts-library/`~~ | ~~Mittel~~ | ✅ aktiv — auto-deploy |
| ~~npm-app Showcase/Playground~~ | ~~Eigenständige Vite-React-App~~ — ~~ersetzt durch stackblitz-demo~~ | ~~Hoch~~ | ✅ entfernt v3.2.0 |
| ~~Changelog in README sichtbar~~ | ~~Letzte 2 Versionen direkt in README.md eingebettet (EN+DE) — auf npm ohne Link-Klick lesbar~~ | ~~Niedrig~~ | ✅ v3.1.1 |
| ~~⭐ npm-app Demo für Highlighting~~ | ~~npm-app entfernt — stackblitz-demo zeigt Highlighting~~ | ~~Niedrig~~ | ✅ v3.2.0 |
| ~~⭐ Storybook — diverse Use-Case-Stories~~ | ~~Alle Stories liefen auf eine generische Default-Fixture pro Komponente hinaus — fühlte sich wie Controls-Spielerei statt Produktpräsentation an.~~ 17 neue Stories mit komplett unterschiedlichen, realistischen Datensätzen (z.B. Disk-Usage, Handelsbeziehungen, Bauprojekt, Blog-Editor, Skill-Selector) über alle 11 Komponenten. | ~~Hoch~~ | ✅ v3.6.0 |
| ~~⭐ StackBlitz — Use-Case-Einordnung~~ | ~~Demo-Karten zeigten nur Feature-Liste, keine Einordnung wofür man die Komponente einsetzt.~~ Use-Case-Chip pro Karte (z.B. "Database & Analytics Tooling") + geschärfter Hero-Text mit konkreten Wertversprechen. | ~~Niedrig~~ | ✅ v3.6.0 |

**Verworfen:** *VS Code Snippets* — geringer Mehrwert gegenüber Copy-Paste aus den Storybook-Beispielen,
kein echter Schmerzpunkt.

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
