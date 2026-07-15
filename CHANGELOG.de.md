# Changelog

> [English Version →](CHANGELOG.md)

Alle wesentlichen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unveröffentlicht]

### Hinzugefügt

- **SqlEditor — `Shift+Alt+F` Tastenkürzel für den SQL Formatter:** Der Format-Button (der bereits in der Toolbar vorhanden war) lässt sich jetzt auch direkt im Editor per `Shift+Alt+F` auslösen — analog zum `Cmd/Ctrl+Enter`-Shortcut für Execute. Das Kürzel respektiert den `readonly`-Modus und das `toolbarConfig.showFormat`-Flag. Keine API-Änderung.

---

## [3.27.1] — 2026-07-14

### Behoben

- **GanttChart — Panel-Overflow beim Schmalziehen des Trenners:** Das linke Task-Panel konnte so schmal gezogen werden, dass Spalten-Header überlappten, Status-Chips abgeschnitten wurden und die Name-Spalte verschwand. Der Trenner erzwingt nun eine spaltenbasierte Mindestbreite (`STATUS_COL_WIDTH + ACTIONS_COL_WIDTH + [ASSIGNEE_COL_WIDTH] + 80 px` für den Namen), und Zeilen-/Header-Container schneiden Inhalte sauber mit `overflow: hidden` ab. Keine API-Änderung.

---

## [3.27.0] — 2026-07-14

### Hinzugefügt

- **Hover-Callbacks für alle 6 D3-Charts** — jeder Chart unterstützt jetzt einen Hover-Callback, der bei `mouseenter` (mit typisiertem Info-Objekt) und `mouseLeave` (mit `null`) feuert. Damit lassen sich Linked-View-Muster umsetzen, bei denen ein Hover in einem Chart den entsprechenden Eintrag in einem anderen hervorhebt:
  - `SunburstChart`: `onSegmentHover?(info: SunburstSegmentInfo | null, event) => void`
  - `ChordChart`: `onGroupHover?(info: ChordGroupInfo | null, event) => void` + `onChordHover?(info: ChordInfo | null, event) => void`
  - `RadialTreeChart`: `onNodeHover?(info: RadialTreeNodeInfo | null, event) => void`
  - `CirclePackingChart`: `onCircleHover?(info: CirclePackingNodeInfo | null, event) => void`
  - `HorizontalTreeChart`: `onNodeHover?(info: HorizontalTreeNodeInfo | null, event) => void`
  - `RadialStackedBarChart`: `onBarHover?(info: RadialStackedBarBarInfo | null, event) => void`

### Behoben

- **GanttChart — Assignee-Spalten-Panelbreite:** Wenn `showAssigneeColumn={true}` gesetzt war, schrumpfte die Name-Spalte auf ~24 px (Assignee 110 + Aktionen 96 + Status 90 = 296 von den Standard-320 px). Dadurch überlagerte der Status-Punkt visuell den ersten Buchstaben von Aufgabennamen. Die initiale Panel-Breite addiert nun automatisch `ASSIGNEE_COL_WIDTH` (110 px), wenn die Spalte aktiviert ist. Keine API-Änderung.

---

## [3.26.1] — 2026-07-13

### Behoben

- **README-Changelog-Abschnitte (EN + DE):** Der eingebettete Changelog in `README.md` und `README.de.md` (was npmjs.com anzeigt) fehlte die Einträge für `[3.25.0]` und `[3.26.0]` — sie wurden nach dem Publish nachgetragen. Keine Code-Änderungen.

---

## [3.26.0] — 2026-07-13

### Hinzugefügt

- **`PopoverColorPicker` — Convenience-Popover-Wrapper:** Neue Komponente, die einen farbigen Swatch-Trigger-Button mit einem MUI-Popover kombiniert, das den vollständigen `ColorPicker` enthält. Eliminiert die ~15 Zeilen `Popover`-, `anchorEl`- und Open/Close-State-Boilerplate, die jeder Consumer bisher selbst schreiben musste. Alle `ColorPicker`-Props werden direkt durchgereicht. Zwei zusätzliche Props steuern den Trigger: `swatchSize` (Standard: `28` px) und `swatchShape` (`"square"` (Standard) oder `"circle"`). Der Swatch rendert ein Schachbrettmuster-Hintergrund, damit transparente/halbtransparente Farben auf einen Blick sichtbar sind. Der Button ist vollständig barrierefrei — `aria-expanded`, `aria-haspopup="dialog"`, Tastatursteuerung, Focus-Ring und ein übersetzbares `openLabel`-aria-label (Standard: `"Open color picker"`). Zwei neue Exports: `PopoverColorPicker`-Komponente und `popoverColorPickerClasses`-Konstantenobjekt (`root`, `swatch`). Vollständig rückwärtskompatibel — `ColorPicker` ist unverändert; `PopoverColorPicker` ist ein rein additiver neuer Export.

---

## [3.25.0] — 2026-07-12

### Hinzugefügt

- **`JsonEditor` — Download-Button:** Neuer Toolbar-Button, der den aktuellen Editor-Inhalt per `<a download>` als `.json`-Datei exportiert. Standardmäßig sichtbar (`showDownload: true` in `JsonEditorToolbarConfig`). Der Dateiname ist über `downloadFilename` in `JsonEditorProps` konfigurierbar (Standard: `"file.json"`). Zwei neue Translation-Keys mit Defaults: `download: "Download"` / `downloadSuccess: "Downloaded!"`. Der Button zeigt kurz ein Häkchen an (gleiches Timed-Flag-Muster wie beim Copy-Button). Vollständig rückwärtskompatibel — `showDownload` ist standardmäßig `true`, bestehende Consumer sehen den neuen Button ohne Codeänderung; mit `toolbarConfig={{ showDownload: false }}` ausblendbar.
- **`GanttChart` — Tastaturnavigation:** Das Task-Panel ist jetzt per Tastatur bedienbar. `Tab` fokussiert das Panel, dann wählen `↑`/`↓` die vorherige/nächste Zeile, `Enter` öffnet den Bearbeiten-Dialog für die ausgewählte Zeile (funktioniert sowohl mit `enableBuiltinDialogs` als auch mit dem `onEditTask`-Callback), `Escape` hebt die Auswahl auf. Auch ein Mausklick auf eine Zeile setzt die Auswahl, sodass die Tastaturnavigation von dort weitergeführt werden kann. Die ausgewählte Zeile wird mit `action.selected`-Hintergrund und einem 3 px linken Rahmen in der Primärfarbe hervorgehoben. Das Panel scrollt automatisch, damit die ausgewählte Zeile sichtbar bleibt. `aria-selected` ist auf jeder Zeile gesetzt. Keine neuen Props erforderlich — das Feature ist immer aktiv.

---

## [3.24.1] — 2026-07-10

### Behoben

- **`RichTextEditor`-Toolbar:** `H1`/`H2`/`H3`- und `MD`-Button werden jetzt als `<svg><text>` gerendert statt als HTML-`<span>`. Dadurch sind sie visuell konsistent mit den umgebenden Material-SVG-Icons — gleiche Render-Engine, gleiches `fill="currentColor"`-Farbverhalten, und `fontWeight="500"` passend zum Strichgewicht der Outlined-Icons. Vorher wirkten die fetten HTML-Texte schwerer und leicht versetzt gegenüber den SVG-Icons.
- **`RadialStackedBarChart`-Stories:** ungenutzten `_key`-Parameter aus dem `valueFormatter`-Story-Beispiel entfernt, der einen ESLint-`no-unused-vars`-Fehler verursachte.

---

## [3.24.0] — 2026-07-10

### Hinzugefügt

#### CSS-Klassen-API (Slot-Klassen) — `TagSelection`, `PasswordStrengthMeter`, `ColorPicker`

Jedes bedeutende DOM-Element in allen drei Komponenten trägt jetzt einen stabilen, dokumentierten CSS-Klassennamen. Consumer können einzelne Slots per Plain CSS, CSS Modules, Tailwind oder anderen CSS-Ansätzen stylen — ohne MUIs interne Klassennamen zu verwenden.

**Konvention**
- Slot-Klassen: `.MuiTs<Komponente>-<Slot>` (z.B. `.MuiTsTagSelection-chip`)
- Geteilte State-Klassen: `.MuiTs-disabled`, `.MuiTs-selected`, `.MuiTs-focused`, `.MuiTs-error`
- Stärken-State-Klassen (PasswordStrengthMeter): `.MuiTsPasswordStrengthMeter-strengthBarWeak/Ok/Good/VeryGood`

**Neue Exports**

Drei typisierte Konstanten-Objekte werden jetzt aus der Bibliothek exportiert — importieren, um Klassennamen sicher ohne Magic-Strings zu referenzieren:

```ts
import { tagSelectionClasses, passwordStrengthMeterClasses, colorPickerClasses, muiTsStateClasses } from '@thebuoyant-tsdev/mui-ts-library';
```

- **`tagSelectionClasses`** — `root`, `selectedTags`, `selectedTagsLabel`, `chipsStack`, `chip`, `overflowChip`, `overflowPopover`, `autocomplete`, `option`, `createPanel`
- **`passwordStrengthMeterClasses`** — `root`, `input`, `generatorButton`, `confirmInput`, `strengthBar`, `strengthBarWeak`, `strengthBarOk`, `strengthBarGood`, `strengthBarVeryGood`, `summary`, `requirementItem`
- **`colorPickerClasses`** — `root`, `gradientArea`, `gradientThumb`, `sliderSection`, `hueSlider`, `alphaSlider`, `inputSection`, `savedColors`, `swatchList`, `swatch`
- **`muiTsStateClasses`** — `disabled`, `selected`, `focused`, `error`

**Vollständig abwärtskompatibel** — keine bestehenden Props oder Verhaltensweisen verändert. Alle Klassen sind rein additiv.

---

## [3.23.0] — 2026-07-10

### Hinzugefügt

#### `ColorPicker` — controlled `format`-Prop

- Neue Prop **`format?: ColorPickerFormat`** (`'hex' | 'rgb' | 'hsl'`) macht das aktive Anzeigeformat vollständig von außen kontrollierbar — analog zu MUIs `value`-Pattern.
- Wenn `format` gesetzt ist, bestimmt der Parent das Format. Ein Klick auf das Format-Dropdown löst `onFormatChange` aus (bereits vorhanden), aber der Picker bleibt auf dem vom Parent vorgegebenen Format — der Parent reagiert, indem er `format` aktualisiert.
- Ohne `format` bleibt das Verhalten unverändert: `defaultFormat` initialisiert den internen State beim Mount, der Nutzer kann frei wechseln (uncontrolled, wie bisher).
- **Anwendungsfall:** programmatisches Format-Reset in Formularen — z.B. kann ein „Zurücksetzen"-Button `format="hex"` zusammen mit dem `value` zurücksetzen und beide Felder in einen definierten Zustand bringen.
- Vollständig abwärtskompatibel: `format` ist optional und fällt auf das bisherige uncontrolled-Verhalten zurück.

---

## [3.22.0] — 2026-07-09

### Hinzugefügt

#### D3-Charts — `valueFormatter`-Prop (4 Komponenten)

Neue Prop `valueFormatter` für alle D3-Charts die numerische Werte in Tooltips anzeigen. Überschreibt die bestehenden `valueDecimalCount` / `valueDecimalSeparator` / `valueThousandsSeparator`-Props wenn gesetzt. Alle vier Änderungen sind rein additiv — bestehendes Verhalten bleibt unverändert.

- **`RadialStackedBarChart`**: `valueFormatter?: (value: number, seriesKey: string) => string` — `seriesKey` ermöglicht unterschiedliche Einheiten pro Serie (z.B. `€` für Umsatz, `kg` für Gewicht).
- **`ChordChart`**: `valueFormatter?: (value: number) => string` — formatiert alle numerischen Werte in Gruppen- und Chord-Tooltips.
- **`SunburstChart`**: `valueFormatter?: (value: number) => string` — formatiert den aggregierten Wert im Segment-Tooltip.
- **`CirclePackingChart`**: `valueFormatter?: (value: number) => string` — formatiert Knotenwerte im Tooltip (bisher immer `toLocaleString()`).

---

## [3.21.0] — 2026-07-09

### Hinzugefügt

#### `TagSelection` — `chipVariant`-Prop

- Neue Prop `chipVariant?: 'filled' | 'outlined'` (Standard: `'filled'`) steuert die MUI-Chip-Variante für alle Tag-Chips — sowohl im Auswahl-Bereich als auch im Autocomplete-Dropdown.
- Consumer mit eigenem Design-System, das `outlined`-Chips bevorzugt, können jetzt `chipVariant="outlined"` setzen, anstatt Styles manuell zu überschreiben.

---

## [3.20.0] — 2026-07-09

### Hinzugefügt

#### `RichTextEditor` — `onMentionInserted`-Callback

Neue Prop `onMentionInserted?: (item: MentionItem) => void` — feuert unmittelbar nachdem der Nutzer ein Element aus dem `@`-Mention-Dropdown auswählt. Der Callback erhält das vollständige `MentionItem` (`{ id, label }`), sodass der Consumer genau weiß, wer erwähnt wurde — ohne den HTML-Output zu parsen.

```tsx
<RichTextEditor
  mentionItems={users}
  onMentionInserted={(item) => {
    console.log(`${item.label} (${item.id}) wurde erwähnt`);
    notifyUser(item.id);
  }}
/>
```

Nur aktiv wenn `mentionItems` oder `onMentionSearch` angegeben ist (d.h. wenn die Mention-Extension aktiviert ist). Rein additiv — kein bestehendes Verhalten ändert sich.

---

## [3.19.0] — 2026-07-08

### Hinzugefügt

#### `RichTextEditor` — `defaultValue`-Prop (unkontrollierter Modus)

Neue Prop `defaultValue?: string` — setzt den initialen HTML-Inhalt einmalig beim Mount, analog zu MUI TextFields `defaultValue`. Kein externer State erforderlich: der Editor verwaltet seinen Inhalt nach der Initialisierung selbst.

```tsx
// Unkontrolliert — kein useState nötig
<RichTextEditor
  defaultValue="<p>Initialer Inhalt</p>"
  onChange={(html) => console.log(html)}  // optional: bei Änderung auslesen
/>

// Kontrolliert (bestehendes Verhalten, unverändert)
<RichTextEditor
  value={html}
  onChange={setHtml}
/>
```

Wenn sowohl `value` als auch `defaultValue` angegeben werden, hat `value` Vorrang.

---

## [3.18.0] — 2026-07-08

### Hinzugefügt

#### `RichTextEditor` — `onSave`-Callback (Ctrl+S / Cmd+S)

Neue Prop `onSave?: () => void` — feuert, wenn der Nutzer innerhalb des Editors **Ctrl+S** (Windows/Linux) oder **Cmd+S** (macOS) drückt. Der native „Seite speichern"-Dialog des Browsers wird im Editor immer unterdrückt, unabhängig davon ob `onSave` gesetzt ist.

Die Komponente hat keine eigene Speicher-Schicht — der Consumer bestimmt was passiert (API-Aufruf, Local Storage, Status-Anzeige usw.):

```tsx
<RichTextEditor
  value={html}
  onChange={setHtml}
  onSave={() => saveToServer(html)}
/>
```

Dies entspricht dem Tastaturkürzel-Standard jedes verbreiteten webbasierten Editors (Notion, Google Docs, Confluence).

---

## [3.17.1] — 2026-07-05

### Behoben

#### `GanttChart` — Reset-View-Button bleibt inaktiv wenn Assignee-Filter gesetzt ist

Der **Reset-View-Button** (`showResetView`) wurde nicht aktiviert, wenn ein Assignee-Filter über `toolbarConfig={{ showAssigneeFilter: true }}` gesetzt war. Das interne `isViewChanged`-Flag berücksichtigte den Assignee-Filter-Zustand nicht, sodass der Button deaktiviert blieb — obwohl ein Klick den Filter korrekt zurückgesetzt hätte.

**Auswirkung:** War der Assignee-Filter die einzige aktive Ansichtsänderung, gab es keine Möglichkeit, ihn über den Reset-View-Button in der Toolbar zu löschen. Als Workaround musste manuell „Alle" im Filter-Dropdown gewählt werden.

**Fix:** `isViewChanged` berücksichtigt jetzt `assigneeFilter !== ""`. Der Reset-View-Button aktiviert sich sobald irgendein Ansichtszustand vom Standard abweicht — inklusive des Assignee-Filters.

**Dokumentiert:** Die Beschreibungen von `showResetView` und `onExportCSV` in `GanttToolbarConfig` und der Callback-Tabelle wurden präzisiert:
- Reset View setzt **alle** Ansichtszustände zurück: Skala, Datumsbereich, Expand/Collapse und den Assignee-Filter.
- CSV-Export exportiert immer **alle** Tasks, unabhängig von einem aktiven Assignee-Filter.

---

## [3.17.0] — 2026-07-05

### Hinzugefügt

#### `GanttChart` — Assignee-Filter in der Toolbar

Ein neues **Assignee-Filter-Dropdown** in der Toolbar ermöglicht es, die Chart-Ansicht auf Tasks einer bestimmten Person oder eines Teams einzuschränken — ohne die Daten zu ändern.

**Aktivierung:**

```tsx
<GanttChart
  tasks={tasks}
  showAssigneeColumn={true}            // optional — macht Assignees im Panel sichtbar
  toolbarConfig={{ showAssigneeFilter: true }}
/>
```

**Verhalten:**

- Standardmäßig deaktiviert (`showAssigneeFilter: false`) — vollständig abwärtskompatibel.
- Das Dropdown wird automatisch aus den eindeutigen, nicht-leeren `GanttTask.assignee`-Werten der aktuellen Task-Liste befüllt — alphabetisch sortiert. Verborgen wenn kein Task einen Assignee hat.
- **Vorfahren-inklusiver Filter**: Ein ausgewählter Assignee zeigt auch Parent-Tasks, deren Nachkommen passen — die Baumhierarchie bleibt lesbar.
- Die Auswahl von „Alle" (oder der übersetzten Bezeichnung) setzt den Filter zurück und zeigt alle Tasks.
- Der „Ansicht zurücksetzen"-Button löscht den Assignee-Filter ebenfalls.

**Neue optionale Übersetzungsschlüssel:**

| Schlüssel | Standard | Beschreibung |
|---|---|---|
| `filterAssigneeAll` | `"Alle"` | Bezeichnung der „Alle"-Option im Dropdown |
| `filterAssigneeLabel` | `"Assignee"` | Select-Label über dem Dropdown |

Beide Schlüssel sind in `GanttTranslations` als `optional` (`?`) deklariert — alle bestehenden vollständigen Übersetzungs-Literale kompilieren ohne Änderungen weiter.

**Tests:** 4 neue Tests ergänzt (Render, Standard verborgen, vorfahren-inklusiver Filter, Zurücksetzen auf Alle) — **700 Tests gesamt**, alle grün.

**Neue Storybook-Story:** `WithAssigneeFilter` — zeigt das Dropdown mit einem Mehrpersonen-Projekt und das vorfahren-inklusive Filterverhalten.

---

### Hinzugefügt — `onDragStart`-Callback

```tsx
onDragStart?: (task: GanttTask, type: "move" | "resize") => void
```

Ein neuer Callback, der **einmalig** bei mousedown feuert — sofort wenn der User die Maustaste auf einem zieh- oder skalierbaren Balken drückt, noch bevor ein Bewegungs-Schwellwert erreicht ist.

- `type: "move"` — feuert bei einem Balken-Drag-Gesture (`draggable={true}`)
- `type: "resize"` — feuert bei einer Resize-Gesture (`resizable={true}`)
- Feuert NICHT beim Progress-Drag (`progressDraggable={true}`)
- Vollständig abwärtskompatibel — neue optionale Prop, kein Verhaltensunterschied bei Weglassen

**Anwendungsfälle:**

- **Optimistisches UI**: Backend-State bereits beim Drag-Start updaten, damit der Schreibvorgang bei mouseup quasi sofort abgeschlossen ist
- **Analytics**: Welcher Task wurde angefasst und wie
- **Shadow-Element**: Ghost-Zeile / Indikator während des Dragens rendern

**Verhältnis zu anderen Drag-Callbacks:**

| Callback | Feuert wann | Anmerkung |
|---|---|---|
| `onDragStart` | mousedown — Geste beginnt (vor ≥ 5 px-Schwellwert) | Neu in v3.17.0 |
| `onTaskMoved` | mouseup — Geste endet, nur wenn ≥ 5 px bewegt | Bestehend |
| `onTaskResized` | mouseup — Geste endet, nur wenn ≥ 5 px bewegt | Bestehend |

Keiner dieser Callbacks muss gedebounced werden — jeder feuert höchstens einmal pro Geste. Siehe [GanttChart User Manual — Backend-Integration](user-manuals/GanttChart.de.md) für eine ausführliche Erklärung.

**Tests:** 2 neue Tests ergänzt (onDragStart für Move, onDragStart für Resize).

---

## [3.16.0] — 2026-07-03

### Hinzugefügt

#### `GanttChart` — Fortschrittsfeld im eingebauten Aufgaben-Dialog

`GanttTask.progress` (0–100 %) war bisher nur über den `progressDraggable`-Drag-Handle setzbar — ein Zeigegerät war Pflicht, Tastatur-Nutzer und Hilfstechnologien waren ausgeschlossen.

Der eingebaute **Hinzufügen- / Bearbeiten-Dialog** enthält jetzt einen **MUI-Slider** für den Fortschritt:

- **Hinzufügen-Dialog** — Slider startet bei `0 %`
- **Bearbeiten-Dialog** — Slider wird aus `initialTask.progress` vorbelegt (Fallback: `0`)
- **Meilenstein-Toggle** — setzt Fortschritt automatisch auf `0` zurück (Meilensteine haben keinen Fortschrittsbalken)
- **Speicher-Payload** — `progress` wird weggelassen wenn `0`, konsistent mit dem bestehenden `undefined`-Verhalten

**Neuer optionaler Übersetzungsschlüssel:**

| Schlüssel | Standard | Beschreibung |
|---|---|---|
| `dialogFieldProgress` | `"Fortschritt (%)"` | Slider-Label im Hinzufügen-/Bearbeiten-Dialog |

`dialogFieldProgress` ist in `GanttTranslations` als `optional` (`?`) deklariert — alle bestehenden vollständigen Übersetzungs-Literale kompilieren ohne Änderungen weiter.

**Tests:** 4 neue Tests ergänzt (Render, Vorbelegen, Meilenstein-Reset, Speicher-Payload) — **122 Tests gesamt**, alle grün.

**Neue Storybook-Story:** `WithProgressDialogField` — zeigt den vorbelegten Slider mit bestehenden Fortschritts-Tasks und das Slider-Deaktivieren bei Meilenstein-Toggle.

---

## [3.15.0] — 2026-07-03

### Hinzugefügt

#### Neue Komponente: `RadialStackedBarChart`

Ein neues D3-Chart — das 6. in der D3-Familie dieser Bibliothek — zur Visualisierung von Mehrreihendaten im radialen Stapelbalken-Layout. Balken strahlen von einer Mittelöffnung nach außen und sind in gestapelte farbcodierte Segmente unterteilt.

**Props und Funktionen:**

- **`data: RadialStackedBarData[]`** — ein Element pro Balken (id, Label, Values-Map). Fehlende Reihenschlüssel werden als 0 behandelt — kein Auffüllen aller Slots nötig.
- **`keys: RadialStackedBarSeries[] | string[]`** — Reihendefinitionen in Stapelreihenfolge (innerstes Segment zuerst). `string[]` für schnellen Einstieg; `RadialStackedBarSeries[]` wenn Legendenbeschriftungen unabhängig von den Datenschlüsseln gesetzt werden sollen.
- **`size?: number`** (Standard `500`) — SVG-Breite und -Höhe in Pixeln (immer quadratisch).
- **`innerRadius?: number`** (Standard `size × 0,18`) — Radius der Mittelöffnung; vergrößern für mehr Platz in der Zentrums-Legende.
- **`barPadding?: number`** (Standard `0,12`) — Anteilsmäßiger Winkelabstand zwischen Balken (0 = kein Abstand, 1 = nur Abstand).
- **`showGridLines?: boolean`** (Standard `true`), **`gridLineCount?: number`** (Standard `3`), **`showGridValues?: boolean`** (Standard `true`) — konzentrische gestrichelte Gitterringe mit Wertbeschriftungen oben.
- **`gridValueFormatter?: (v: number) => string`** — eigene Formatierungsfunktion für Gitterring-Werte (Standard: Kompaktnotation, z. B. `30000 → "30k"`, `3000000 → "3M"`).
- **`showLabels?: boolean`** (Standard `true`) — Außenrand-Balkenbeschriftungen, automatisch rotiert für gute Lesbarkeit unabhängig von der Winkelposition.
- **`showLegend?: boolean`** (Standard `true`) — Zentrums-Legende, die Reihenfarben auf Namen abbildet. Wird automatisch zentriert und bei Bedarf gekürzt, damit Text nie in die Chart-Segmente überläuft.
- **`sortBy?: 'value' | 'label' | 'none'`** (Standard `'none'`) — Balken nach Gesamtwert absteigend, Label aufsteigend oder in ursprünglicher Reihenfolge sortieren.
- **`chartColors?: string[]`** — eigene Farbpalette; fällt auf MUI-Theme-Tokens zurück wenn nicht gesetzt. Dark Mode automatisch unterstützt.
- **`colorConfig?: RadialStackedBarColorConfigs`** — reihenweise `fill`-Überschreibungen nach Reihenschlüssel; hat Vorrang vor `chartColors`.
- **`valueDecimalCount?`** / **`valueDecimalSeparator?`** / **`valueThousandsSeparator?`** — Zahlformatierung in Tooltips, konsistent mit allen anderen D3-Charts.
- **`onBarClick?: (info: RadialStackedBarBarInfo, event) => void`** — Klick-Callback mit vollständigem Kontext: `id`, `label`, `seriesKey`, `value` (Segment), `total` (Balken), `values` (alle Reihen dieses Balkens).
- **`zoomable?: boolean`** (Standard `false`) — `Ctrl / Cmd ⌘ + Scroll` visueller Zoom; `Escape` setzt zurück.
- **`disabled?: boolean`** (Standard `false`) — deaktiviert alle Interaktionen und reduziert die Deckkraft auf `0,5`.
- **`translation?: Partial<RadialStackedBarChartTranslation>`** — `noData` überschreiben (Standard `'No data'`).

**Neue Exporte:** `RadialStackedBarChart`, `RadialStackedBarData`, `RadialStackedBarSeries`, `RadialStackedBarBarInfo`, `RadialStackedBarColorConfigs`, `RadialStackedBarChartTranslation`, `DEFAULT_RADIAL_STACKED_BAR_CHART_TRANSLATION`.

**Tests:** 20 Tests — Smoke-Rendering, Leer-Zustand, String-Key-Kurzform, Pfad-Anzahl, Size-Prop, Disabled-Deckkraft, `onBarClick`-Payload, Klick-Guard bei Disabled, Außenbeschriftungen, Legende, `colorConfig`, `sortBy`-Varianten, Gitterkreise und `gridValueFormatter`.

**Stories:** 12 Storybook-Stories — Default (US-Bundesstaaten-Bevölkerung, 20 Balken × 7 Altersgruppen), SortedByValue, SalesQuarterly, CustomColors, NoLabels, NoLegend, NoGridLines, LargeInnerRadius, StringKeys, Disabled, ZoomableWithCtrlScroll, CustomGridValueFormatter, LegendOverflowProtection (Stress-Test-Story zum Nachweis der Texttrunkierung bei sehr langen Labels).

**Dokumentation:** [`user-manuals/RadialStackedBarChart.md`](user-manuals/RadialStackedBarChart.md) und [`user-manuals/RadialStackedBarChart.de.md`](user-manuals/RadialStackedBarChart.de.md).

---

## [3.14.0] — 2026-07-02

### Hinzugefügt

#### RichTextEditor — Mention (@) Autocomplete

`@`-getriggerte Autocomplete-Liste für Personen-/Entitäts-Mentions nach dem Tiptap-Mention-Extension-Pattern — die Bibliothek liefert die vollständige UI, der Consumer stellt die Daten bereit.

- **`mentionItems?: MentionItem[]`** — statische Liste für clientseitige Filterung (Substring-Match ohne Groß-/Kleinschreibung während der Eingabe). Die Mention-Extension wird nur aktiviert wenn diese Prop oder `onMentionSearch` gesetzt ist.
- **`onMentionSearch?: (query: string) => MentionItem[] | Promise<MentionItem[]>`** — ersetzt die eingebaute Filterung wenn angegeben (async-kompatibel für serverseitige Suche). Item-Updates werden über eine Ref geleitet — die Extension wird bei Item-Änderungen nicht neu erzeugt.
- **`mentionTriggerChar?: string`** (Standard: `"@"`) — eigenes Trigger-Zeichen.
- **`translation.mentionNoResults?: string`** (Standard: `"No results"`) — Label im Dropdown wenn keine Treffer vorhanden.
- Dropdown-UI: MUI `Popper` + `Paper` + `MenuList`, an der Cursor-Position verankert. Kein zusätzliches CSS-Dependency, kein Tippy.js.
- Tastaturnavigation: `↑`/`↓` zum Navigieren, `Enter` zum Einfügen, `Escape` zum Schließen.
- HTML-Ausgabe: jede Mention wird als `<span class="rte-mention" data-type="mention" data-id="…" data-label="…">@Name</span>` serialisiert — `data-id` im Backend auslesen um die referenzierte Entität aufzulösen.
- Neue Peer-Dependency: `@tiptap/extension-mention@^3.23.6` (passend zur bereits in dieser Bibliothek gepinnten Tiptap-Version).
- 13 neue Tests: 4 Integrationstests auf `RichTextEditor` (Smoke-Tests: Editor mountet fehlerfrei mit/ohne Mention-Props und mit Custom-Config), plus 9 Unit-Tests auf `RichTextEditorMentionList` für leeren Zustand, Item-Rendering, Klick-Auswahl, Popper offen/geschlossen, Tastaturnavigation (ArrowUp/Down, Enter), Rückgabewerte der Key-Handler und Index-Reset bei Item-Änderungen.

Neuer `MentionItem`-Typ wird aus dem Bibliotheks-Root exportiert.

---

## [3.13.0] — 2026-06-29

### Hinzugefügt

#### Neue Komponente: `ColorPicker`

Eine neue, 12. Komponente — ein eigenständiges Sättigung/Farbton/Alpha-Farbwähler-Panel, das eine echte Lücke schließt, da MUI überhaupt keinen Farbwähler mitbringt (extrahiert und verallgemeinert aus dem bereits in TagSelections Tag-Erstellungs-Flow genutzten Ad-hoc-Custom-Color-Picker).

- 2D-Sättigung/Helligkeit-Gradient-Fläche, Farbton-Slider und optionaler Alpha-Slider — alle per Pointer ziehbar, mit Live-Update bei jedem Move-Frame, nicht erst beim Loslassen. Thumbs sind um die halbe eigene Größe eingerückt, damit sie sowohl bei 0% als auch bei 100% vollständig innerhalb der Spur bleiben, statt über den Rand hinauszuragen.
- Pipette-Werkzeug über die native [EyeDropper-API](https://developer.mozilla.org/de/docs/Web/API/EyeDropper), automatisch ausgeblendet, wenn der Browser sie nicht unterstützt (Stand jetzt nur Chromium).
- Formatumschaltbares Wertefeld: `HEX`/`RGB`/`HSL`, jeweils unabhängig editierbar; `onChange` meldet immer einen sauberen `{ hex, rgb, hsl }`-Breakdown, unabhängig davon, welches Format gerade angezeigt wird.
- `onChangeCommitted` — feuert einmal pro "Geste" (Drag-Loslassen, Feld-Blur, oder sofort bei atomaren Swatch-/Pipetten-Aktionen) statt fortlaufend, dieselbe Dual-Callback-Aufteilung wie MUIs eigene `Slider`-Komponente. Statt `onChange` selbst zu debouncen für teure Seiteneffekte.
- `colorGradientSize?: 'small' | 'medium'` (umbenannt vom ursprünglichen `size`) und `inputSize?: 'small' | 'medium'` — unabhängig dimensioniert: `colorGradientSize` skaliert Gradient-Fläche, Slider und Swatches, `inputSize` dimensioniert Format-Dropdown und Werte-/Alpha-Felder, entspricht der bereits von `TagSelection`/`PasswordStrengthMeter` genutzten `inputSize`-Konvention. Format-Select, Hex-Feld und Zahlenfelder teilen sich jetzt konsistent eine Größe statt unterschiedlicher Höhen, und Alpha-/RGB-/HSL-Felder sind breit genug, dass dreistellige Werte (`100`, `255`, `360`) nicht mehr abgeschnitten werden — die RGB-/HSL-Felder bekommen jetzt eine eigene volle Zeile unter dem Format-Selector statt sich eine Zeile zu teilen.
- `showSliderSection?: boolean` / `showInputSection?: boolean` — schalten die Pipette+Slider-Zeile und die Format+Werte-Zeile unabhängig voneinander, für kompakte Layouts. Die Gradient-Fläche selbst wird immer angezeigt.
- `savedColors?: string[]`-Swatch-Raster — reine Anzeige/Auswahl, die Persistenz liegt beim Aufrufer.
- `name`-Prop rendert ein verstecktes Input-Feld für native/React Hook Form/Formik-Formular-Integration, konsistent mit `JsonEditor`/`SqlEditor`/`PasswordStrengthMeter`.
- Vollständig kontrolliert (`value`/`onChange`), themefähig über MUIs `useTheme()` (Border-/Radius-Tokens), `size`/`width`/`disabled`-Props und vollständige `translation`-Unterstützung für jede barrierefreie Beschriftung.
- Rendert bewusst nur das Picker-Panel — kein eingebauter Auslöser-Button oder Popover (in MUIs eigenes `Popover`/`Menu` einbetten für eine "Swatch + Dropdown"-UI, dieselbe Trennung, die MUIs eigene Date-Picker zwischen Feld und Kalender nutzen).

Neue `colorConversion.util.ts` mit HSV/RGB/HEX/HSL-Konvertierungsfunktionen, abgesichert durch 34 Unit-Tests, plus 30 Komponenten-Tests für Drag-Interaktionen, Format-Wechsel, die Pipette (inkl. Abbruch-Pfad), gespeicherte Farben, deaktivierten Zustand, Re-Sync des kontrollierten Werts, Formular-Integration, Thumb-Positionierungsgrenzen, `inputSize`-Konsistenz, Sektions-Sichtbarkeits-Toggles und `onChangeCommitted`-Timing.

---

## [3.12.0] — 2026-06-29

### Hinzugefügt

#### TagSelection — `searchDebounceMs` und `serverSideFilter`

Zwei neue Props für serverseitige Tag-Suche, die größte Lücke im bisherigen `onSearchChange`-Muster:

- **`searchDebounceMs?: number`** — verzögert den `onSearchChange`-Aufruf um diese Zeit (ms) nach dem letzten Tastenanschlag. Das Eingabefeld selbst bleibt sofort responsiv — nur der Callback an deinen Code wird debounced, sodass nicht bei jedem Tastenanschlag ein Request rausgeht.
- **`serverSideFilter?: boolean`** (Standard `false`) — wenn `true`, wird `tags` als bereits korrekt gefiltert vertraut. Ohne diese Prop filtert die Komponente (und MUIs eigene interne `Autocomplete`-Filterung) `tags` erneut per Substring-Abgleich gegen den eingegebenen Text — was korrekte Server-Ergebnisse stillschweigend versteckt, wenn der Server Fuzzy-Matching, Tippfehler-Toleranz oder Ranking macht, da diese Treffer den eingegebenen Text nicht zwingend wörtlich enthalten.

### Behoben

#### TagSelection — verirrter leerer `onSearchChange`-Aufruf nach jedem Tastenanschlag

Gefunden bei der Umsetzung der obigen Props: MUIs `Autocomplete` feuert `onInputChange` ein zweites Mal mit `reason="reset"` und leerem Wert direkt nach jeder echten `reason="input"`-Änderung — ein Seiteneffekt davon, dass diese Komponente nie einen kontrollierten `value` trackt (Auswahl läuft über ein separates `onChange`/`onTagSelect`, nicht über den eigenen Wert des Autocomplete). Dieser zweite Aufruf wurde ungefiltert an `onSearchChange` weitergereicht — jede dokumentierte "Serverseitige Filterung"-Integration feuerte also zwei Aufrufe pro Tastenanschlag: einen echten mit dem eingegebenen Text, direkt gefolgt von einem mit `""`. Jetzt wird nur noch `reason === "input"` weitergereicht.

(Das blieb bei manuellem Testen und in mit `@testing-library/user-event` geschriebenen Tests verdeckt, da die Simulation echter Tastendrücke MUIs internen Reset-Pfad nicht auf dieselbe Weise triggert wie das direkte Auslösen eines Change-Events — erst durch `searchDebounceMs` wurde das Zwei-Aufrufe-pro-Tastenanschlag-Muster überhaupt beobachtbar.)

Abgesichert durch 5 neue Tests (sofortiges vs. debounced `onSearchChange`-Timing, Cleanup bei Unmount während des Debounce, Default- vs. `serverSideFilter`-Substring-Filterung), jeweils empirisch gegen den Vorher-Code verifiziert.

---

## [3.11.3] — 2026-06-29

### Behoben

#### GanttChart — Abhängigkeitszyklus-Schutz im eingebauten Task-Dialog

Der letzte zurückgestellte Punkt aus dem Bug-Audit von v3.11.2: Das Bearbeiten der Abhängigkeiten eines Tasks über den eingebauten Dialog hatte keinen Schutz gegen einen Abhängigkeitszyklus (zwei Tasks, die transitiv voneinander abhängen — ein Scheduling-Deadlock). Der Dialog schloss den Task selbst und seine Baum-Nachkommen bereits aus dem *Eltern*-Dropdown aus, um eine zirkuläre Hierarchie zu verhindern; das *Dependencies*-Dropdown nutzte dieselbe Ausschlussmenge wieder — die aber nichts mit dem separaten Abhängigkeitsgraphen zu tun hat.

`getDependencyCycleCandidates()` (`gantt-chart.util.ts`) hinzugefügt: liefert für den bearbeiteten Task alle Tasks, die bereits (direkt oder transitiv) von ihm abhängen — also alle, die bei Auswahl als neue Dependency einen Zyklus schließen würden. Das Dependencies-Dropdown schließt diese Kandidaten jetzt aus, sodass der eingebaute Dialog von vornherein keinen Zyklus erzeugen kann. Die bestehende Successor-Map-Erstellung (vorher in `cascadeDateUpdate` inline) wurde in einen von beiden Funktionen geteilten Helper ausgelagert.

Abgesichert durch 6 neue Unit-Tests für die Zyklus-Erkennung selbst, plus 2 Dialog-Regressionstests, die bestätigen, dass der konfliktbehaftete Task aus dem Dropdown ausgeschlossen wird, während nicht betroffene Tasks weiterhin wählbar bleiben.

---

## [3.11.2] — 2026-06-28

### Behoben

Eine tiefgreifende, gezielte Bug-Prüfung aller 11 Komponenten, ausgelöst durch den TagSelection-Bug aus 3.11.1 — jeder Fund unten ist mit einem Regressionstest abgesichert, jeweils empirisch verifiziert: schlägt gegen den alten Code fehl, läuft gegen den Fix durch.

#### PasswordStrengthMeter

- `generateSecurePassword` erzeugte stillschweigend ein längeres Passwort (bei `length: 0` sogar ein nicht-leeres) als die angeforderte `generatorOptions.length`, sobald die angeforderte Länge kleiner war als die Anzahl aktiver Zeichenklassen — die garantierten Ein-pro-Klasse-Zeichen wurden nie auf die Ziellänge zurückgeschnitten.
- Das "Kopiert!"-Feedback-Timeout wurde beim Unmount oder bei schnellem erneutem Kopieren nie aufgeräumt (gestapelt statt neu gestartet). In einen gemeinsamen `useTimedFlag`-Hook ausgelagert, der jetzt auch vom identischen Copy-Feedback-Muster in JsonEditor und RichTextEditor genutzt wird.

#### TagSelection

- `maxTags` ließ sich umgehen: Custom-Color-Create-Modus öffnen, dann `tags` von außen (z. B. einer anderen Tab/Komponente) das Limit erreichen lassen, bevor bestätigt wird — der Bestätigungs-Haken und Enter respektieren `maxTags` jetzt auch, wenn der Create-Modus bereits offen ist.

#### GanttChart

- Die beim Drag-Start registrierten document-weiten `mousemove`/`mouseup`-Listener wurden nur vom passenden `mouseup`-Handler entfernt — Unmount (oder Einklappen der Zeile) während eines Drags hat sie geleakt. Werden jetzt auch beim Unmount aufgeräumt.

#### RichTextEditor

- Einfügen von Nicht-Text-Clipboard-Inhalten (z. B. einem Bild) bei aktivem "Als Plain Text einfügen" löschte die aktuelle Selektion — `DataTransfer.getData("text/plain")` liefert für Nicht-Text-Inhalte `""`, nicht `null`, und der Code prüfte nur auf `null`.

#### SqlEditor

- Ein Wechsel von `queryHistoryKey` an einer laufenden Instanz zeigte weiterhin die History des vorherigen Keys (der `useState`-Initializer läuft nur einmal beim Mount).
- History-Einträge wurden für Reacts `key`-Prop über `timestamp` identifiziert — zwei Einträge innerhalb derselben Millisekunde kollidierten. Einträge tragen jetzt eine auf `crypto.randomUUID()` basierende `id` (mit Counter-Fallback), transparent migriert für bereits zuvor gespeicherte Einträge.

#### JsonEditor

- `showFolding`, `showLineNumbers` und `placeholder` wurden nur beim Erstellen des Editors fest ins CodeMirror-Extensions-Array gebacken — ein Umschalten nach dem Mount hatte stillschweigend keine Wirkung, anders als `disabled`/`readonly`, die bereits CodeMirror-`Compartment`s zur Reaktivität nutzten. Alle drei nutzen jetzt das gleiche Compartment-Muster.

#### SunburstChart, ChordChart, RadialTreeChart, CirclePackingChart, HorizontalTreeChart

- `translation.noData` war auf allen fünf D3-Chart-Komponenten dokumentiert ("wird angezeigt, wenn die Daten leer sind"), aber nirgends gerendert — die Leer-Daten-Meldung war durchgängig toter Code. Alle fünf rendern sie jetzt (und nehmen `translation` überhaupt an, wo es noch nicht einmal destrukturiert war).

#### ChordChart

- `valueIn`/`valueOut` einer Gruppe zählte nur eine Seite jedes d3-Chord-Objekts. `d3.chord()` (undirected-Modus) verschmilzt beide Richtungen eines Paares in eine einzige Chord — der Beitrag einer Gruppe als die *andere* Seite eines asymmetrischen, bidirektionalen Paares wurde stillschweigend verworfen. `d3.chordDirected()` (der Default) erzeugt bereits eine Chord pro Richtung und war nicht betroffen — der Fix greift bedingt über die `directed`-Prop.

#### RadialTreeChart

- `autoFit={false}` wurde als Prop angenommen und in einem Effekt-Dependency-Array gelistet, aber nie tatsächlich abgefragt — ein Umschalten hatte keine Wirkung auf die gerenderte viewBox.
- `Escape` setzte Fokus/Zoom zurück, brach aber einen noch innerhalb seines 250ms-Ctrl+Click-Disambiguierungsfensters laufenden Drill nicht ab — der veraltete Timer feuerte danach und drillte stillschweigend wieder hinein, im Widerspruch zum Reset, und löste ein zweites, widersprüchliches `onFocusChange` aus. Derselbe ausstehende Timer wurde auch beim Unmount nie aufgeräumt.

#### CirclePackingChart

- Der Fokus-Reset-Guard prüfte nur, ob sich die `data`-Prop-Referenz geändert hat — der zugrundeliegende Node-Baum (`root`) wird aber auch neu berechnet, wenn sich `size`/`padding`/`sortBy` ändern. Das ließ `focus` auf verwaiste Nodes des alten Layouts zeigen, sobald sich eine dieser anderen Props während des Hineinzoomens änderte.
- Der `Escape`-Listener schließt `performZoom` bewusst aus seinen Effekt-Dependencies aus (um nicht bei jedem Fokuswechsel neu zu registrieren) und schloss daher über ein veraltetes `performZoom` — das den falschen `previousName` meldete, sobald tiefer gezoomt wurde, ohne dass sich `disabled`/`root`/`duration` dazwischen geändert hatten. Liest jetzt das aktuellste `performZoom` über eine Ref.

#### HorizontalTreeChart

- Die `RL`/`BT`-Orientierungs-Spiegelung drehte sich um eine fest codierte `layoutH * 0.85`-Obergrenze, aber der tatsächlich genutzte Tiefen-Extent des Tree-Layouts ist `min(maxDepth * levelSpacing, layoutH * 0.85)` — bei flacheren Bäumen weichen diese Werte voneinander ab, wodurch der gespiegelte Baum außermittig gerendert wurde.
- Dieselben Escape-bricht-laufenden-Drill-nicht-ab- und Timer-Leak-bei-Unmount-Probleme wie bei RadialTreeChart, auf die gleiche Weise gefixt.

### Dokumentation

- Zwei Prop-Doku/Code-Default-Abweichungen aus der Prüfung behoben: `ChordChart.labelOffset` (dokumentiert 6, tatsächlich 8), `HorizontalTreeChart.linkStrokeOpacity` (dokumentiert 0.4, tatsächlich und testfixiert 1).

### Bekannt, bewusst zurückgestellt

Zwei Befunde mit geringerer Konfidenz/Auswirkung aus der Prüfung wurden markiert, aber in diesem Durchgang nicht gefixt:

- **HorizontalTreeChart** — die ausblendende "Ghost"-Ebene des vorherigen Baums (während einer Drill-Transition sichtbar) wendet bei einem Orientierungswechsel mitten in der Transition die *aktuelle* Koordinatentransformation an, statt in ihrer ursprünglichen Orientierung einzufrieren. Rein kosmetisch — kein Absturz, keine falschen Daten.
- **GanttChart** — das Bearbeiten von Datums-/Abhängigkeitsangaben einer Aufgabe über den Aufgaben-Dialog kann ohne Schutzmechanismus einen Abhängigkeitszyklus erzeugen. Für einen zukünftigen Durchgang markiert; keine durch diese Prüfung eingeführte Regression.

---

## [3.11.1] — 2026-06-27

### Behoben

#### TagSelection — doppeltes Tag in der `WithCustomColorCreation`-Storybook-Story

Gemeldet von einem echten Besucher auf dem live Storybook-Deployment: Ein Tag mit Custom Color anlegen ließ es zweimal erscheinen. Der Bug saß in der Story, nicht in der Komponente — `TagSelection` feuert bei einer Erstellung korrekt sowohl `onTagCreate` (nur das neue Tag) als auch `onTagsChange` (die vollständige nächste Liste, die das neue Tag bereits enthält); der `onTagCreate`-Handler der Story hat das Tag zusätzlich zum lokalen State hinzugefügt — doppelt. Gefixt, indem `onTagsChange` jetzt die einzige Quelle der Wahrheit für die lokale Tag-Liste der Story ist.

Ein Regressionstest schreibt den Vertrag "beide Callbacks feuern mit konsistenten Daten fürs gleiche Erstellungs-Event" fest, da genau dieses Muster den Bug verursacht hat und in einer zukünftigen Story oder Konsumenten-Integration wieder auftreten könnte.

Alle anderen Komponenten auf dasselbe Dual-Callback-Muster geprüft (eine Story, die zwei für eine Aktion gemeinsam feuernde Callbacks abonniert und beide unabhängig denselben State mutieren) — keine weitere aktive Instanz gefunden.

---

## [3.11.0] — 2026-06-25

### Hinzugefügt

#### RadialTreeChart & HorizontalTreeChart — Drill-Übergangs-Crossfade

- `duration?: number`-Prop (Standard `750`, `0` deaktiviert) auf beiden Komponenten: Reinzoomen (`Ctrl+Click`), Rauszoomen (`Ctrl+DblClick`/Mitte, `Escape`) und Root-Resets blenden den vorherigen Layout-Zustand jetzt sanft aus, während der neue darunter erscheint, statt abrupt zu wechseln.
- Anders als bei `SunburstChart` (das eine Hierarchie wiederverwendet und nur das Winkel-/Radius-Sichtfenster animiert) verwurzelt das Drill-down hier die D3-Hierarchie komplett neu — ein anderer Knoten-Satz pro Fokus-Ebene — daher gibt es keinen gemeinsamen Koordinatenraum für eine Knoten-für-Knoten-Interpolation ohne Enter/Update/Exit-Matching per ID. Ein Crossfade (alter Layout-Zustand blendet via `requestAnimationFrame` + `d3.easeCubic` aus, gerendert als statischer, nicht-interaktiver Ghost-Layer) beseitigt den harten Schnitt mit deutlich weniger Komplexität und Regressionsrisiko als vollständiges Positions-Tweening.
- `onFocusChange`/`onNodeClick` feuern weiterhin sofort bei der Interaktion — nur die visuelle Darstellung ist animiert. Änderungen der `data`-Prop setzen sofort zurück, ohne zu crossfaden.

---

## [3.10.0] — 2026-06-25

### Hinzugefügt

#### SunburstChart — Animierte Drill-Down-Übergänge

- `duration?: number`-Prop (Standard `750`, `0` deaktiviert die Animation): Reinzoomen (`Ctrl+Click`) und Rauszoomen (Klick auf die Mitte, `Escape`) animieren jetzt sanft zwischen Fokus-Ebenen statt abrupt zu wechseln — via `requestAnimationFrame` + `d3.interpolateNumber`/`d3.easeCubic`, die das Winkelfenster und den radialen Versatz interpolieren, aus denen jedes Segment seinen Arc berechnet. `onZoomChange` feuert weiterhin sofort bei der Interaktion — nur die visuelle Darstellung ist animiert, nicht das Callback-Timing. Änderungen der `data`-Prop setzen sofort zurück, ohne zu animieren.
- Umgesetzt als React-State + `requestAnimationFrame`-Tween statt einer `d3 selection.transition()`-Kette, da die Komponente Segmente deklarativ über JSX rendert statt über imperative DOM-Selections (anders als `CirclePackingChart`, das bereits `.transition()`-basierten Zoom hatte). Gleiches visuelles Ergebnis, kein Architektur-Umbau.

---

## [3.9.1] — 2026-06-25

### Behoben

#### GanttChart — TypeScript-Abwärtskompatibilitätslücke in `GanttTranslations`

`todayLabel` (hinzugefügt in `v2.0.0`) und `columnAssignee`/`exportCsvTooltip` (hinzugefügt in `v2.7.0`) waren required Felder auf `GanttTranslations` — im Gegensatz zu jedem anderen Translation-Typ dieser Library, der neue Keys bewusst optional macht, um genau das zu vermeiden. Wer ein vollständiges `GanttTranslations`-Literal deklariert hat (statt ein partielles Objekt an die `translations`-Prop zu übergeben), wäre vor `v2.0.0` kompilierfähig gewesen, aber gegen `v2.0.0`–`v3.9.0` nicht mehr. Gefunden durch ein Audit aller Translation-Typen, nicht durch eine Nutzermeldung.

Alle drei Keys sind jetzt optional mit `@since`-Tags; `DEFAULT_GANTT_TRANSLATIONS` ist jetzt als `Required<GanttTranslations>` typisiert. Empirisch mit einem Literal im Pre-`v2.0.0`-Stil verifiziert. Keine Laufzeit-Änderung — die Komponente hat fehlende Keys schon immer gegen die Defaults aufgelöst.

---

## [3.9.0] — 2026-06-24

### Hinzugefügt

#### PasswordStrengthMeter — In Zwischenablage kopieren

- `showCopyButton` (Standard `false`): ergänzt ein Kopier-Icon neben dem Passwortfeld, sichtbar sobald ein Passwort vorhanden ist. Passt natürlich zu `showPasswordGenerator` — ohne diesen Button ist es auf Mobile umständlich, ein generiertes Passwort aus dem Feld zu bekommen, da manuelles Text-Markieren fiddly ist. Zeigt nach dem Kopieren kurz eine Haken-Bestätigung.

---

## [3.8.0] — 2026-06-23

### Hinzugefügt

#### RichTextEditor — Einfügen als Klartext

- `showPasteAsPlainTextButton` (Standard `false`): ergänzt einen Toolbar-Toggle. Im aktiven Zustand wird jeder eingefügte Inhalt — formatiertes HTML von einer Website, ein Word-Dokument, ein anderer Editor — von Formatierung befreit und als reiner Text eingefügt. Überschreibt im aktiven Zustand die bestehende automatische Markdown-Paste-Konvertierung.

#### RichTextEditor — Markdown-Import/Export

- `showMarkdownButton` (Standard `false`): ergänzt einen Toolbar-Button, der einen Dialog öffnet, vorbefüllt mit dem aktuellen Inhalt als Markdown. Zum Exportieren kopieren, oder bearbeiten und auf Anwenden klicken, um den Editor-Inhalt zu ersetzen.
- `onMarkdownChange?: (markdown: string) => void`: neuer Callback, wird bei jeder Inhaltsänderung zusätzlich zu `onChange` mit dem Inhalt als Markdown aufgerufen — unabhängig vom Dialog.

---

## [3.7.1] — 2026-06-23

### Behoben

#### Re-Publish — fehlende README auf npm

`v3.7.0` wurde erfolgreich veröffentlicht, aber das `readme`-Metadatenfeld der Registry kam leer an — die npmjs.com-Paketseite zeigte gar keine README, obwohl der Tarball selbst `README.md`/`README.de.md` korrekt enthielt (verifiziert via `npm publish --dry-run`). Verursacht wurde das offenbar durch einen Retry von `npm publish` nach einem OTP-Fehlschlag (2FA), der den separaten Readme-Metadaten-Write der Registry aus dem Tarball-Upload herauslösen kann.

**Kein Code oder Inhalt hat sich geändert** — das ist ein Re-Publish, um die Registry-Metadaten korrekt zu setzen. Wer bereits auf `3.7.0` ist, kann auf `3.7.1` aktualisieren, ändert funktional nichts — nur die README wird auf npm sichtbar.

---

## [3.7.0] — 2026-06-23

### Hinzugefügt

#### JsonEditor — Folding, Path Finder und Schema-Validierung

- **Folding** — `showFolding` (Default `true`) fügt ein Fold-Gutter hinzu; Klick auf die ▾/▸-Pfeile neben `{` oder `[` klappt das Objekt/Array inline zu. `@codemirror/lang-json` markiert Objects/Arrays bereits als faltbar — hier wird nur Gutter und Keymap angeschlossen.
- **JSON Path Finder** — `enablePathFinder` (Default `true`) erlaubt `Ctrl+Click` / `Cmd ⌘+Click` auf einen Wert oder Property-Key, um dessen vollständigen JSON-Path (z.B. `$.items[0].id`) in die Zwischenablage zu kopieren, mit kurzer "Copied: …"-Bestätigungsblase. Löst `onPathCopy(path)` aus.
- **Schema-Validierung** — neue `schema`-Prop validiert das Dokument strukturell gegen eine fokussierte JSON-Schema-Teilmenge (`type`, `required`, `enum`, verschachtelte `properties`/`items`). Verstöße werden als Inline-Fehler-Diagnostics angezeigt, genau wie Syntaxfehler. Wird übersprungen, solange das Dokument kein gültiges JSON ist.

---

## [3.6.1] — 2026-06-22

### Behoben

#### ⚠️ TypeScript-Kompatibilität

`v3.4.0` und `v3.5.0` haben neue Felder (`confirmCreateLabel`/`cancelCreateLabel` bei `TagSelectionTranslation`, `history`/`historyEmpty`/`clearHistory` bei `SqlEditorTranslation`) als **erforderliche** Eigenschaften zu den exportierten Typen hinzugefügt. Das brach TypeScript-Builds nur in dem schmalen Fall, dass jemand eine eigenständige Variable gegen den vollen benannten Typ deklariert hat, statt ein partielles Objekt direkt an die `translation`-Prop zu übergeben (das dokumentierte, empfohlene Muster) — aber es war ein echter, undokumentierter Breaking Change für dieses Muster, ohne Major-Version-Bump veröffentlicht.

**Fix:** Die neuen Felder sind jetzt optional (`confirmCreateLabel?: string`, `history?: string` usw.) bei `TagSelectionTranslation` und `SqlEditorTranslation`. Falls du betroffen warst, ist keine Code-Änderung nötig — deine bestehenden Objekt-Literale (mit oder ohne die neueren Keys) kompilieren wieder.

```tsx
// Kompiliert jetzt wieder, genau wie vor v3.4.0 / v3.5.0:
const de: TagSelectionTranslation = {
  selectedTagsLabel: 'Ausgewählte Tags',
  // ...weitere Keys, ohne confirmCreateLabel/cancelCreateLabel
};
```

---

## [3.6.0] — 2026-06-22

### Hinzugefügt

#### Storybook — Realistische Use-Case-Stories

Die Stories aller Komponenten drehten sich bisher um einen generischen Datensatz mit Prop-Toggle-Varianten. 17 neue Stories über alle 11 Komponenten ergänzt, jede mit einem komplett anderen, realistischen Datensatz:

- **SunburstChart** — `DiskUsageBreakdown` (Festplatten-Analyse)
- **ChordChart** — `TradeRelationships` (bilaterale Handelsströme zwischen Volkswirtschaften)
- **RadialTreeChart** — `ProductCatalog` (E-Commerce-Kategoriebaum)
- **CirclePackingChart** — `DiskUsageBreakdown` (Speicherplatz-Aufteilung)
- **HorizontalTreeChart** — `DecisionTree` (Support-Ticket-Routing-Logik)
- **GanttChart** — `ConstructionProject`, `MarketingCampaignLaunch`
- **RichTextEditor** — `BlogPostEditor`, `SupportTicketReply`
- **JsonEditor** — `ApiResponseViewer`, `WebhookPayloadInspector`
- **TagSelection** — `SkillSelector`, `EmailRecipients`
- **PasswordStrengthMeter** — `SignupForm`, `AdminPasswordReset`
- **SqlEditor** — `AnalyticsDashboardQuery`

#### StackBlitz-Demo

- Jede Komponenten-Karte zeigt jetzt einen Use-Case-Chip (z.B. "Database & Analytics Tooling", "Project & Resource Planning") zur schnellen Einordnung.
- Hero-Text geschärft — führt jetzt mit konkreten Wertversprechen statt einer generischen Tech-Stack-Liste.

---

## [3.5.0] — 2026-06-22

### Hinzugefügt

#### SqlEditor — Query-Verlauf

- Neue Option `toolbarConfig.showHistory` — fügt einen "Query history"-Toolbar-Button hinzu (benötigt `onExecute`). Jede ausgeführte Abfrage wird in `localStorage` gespeichert (neueste zuerst, exakte Duplikate werden nach vorne verschoben statt wiederholt) und kann per Klick wieder in den Editor geladen werden.
- Neue Props: `queryHistoryKey` (Default `"sql-editor-query-history"` — eindeutigen Wert setzen, wenn mehrere `SqlEditor` auf derselben Seite laufen) und `queryHistoryMaxEntries` (Default `20`).
- Neue Translation-Keys: `history`, `historyEmpty`, `clearHistory`.

#### Storybook — Interaktive Chart-Demos

- `SunburstChart`, `RadialTreeChart` und `HorizontalTreeChart` führen beim Laden automatisch einen `Ctrl+Click`-Drill-down aus.
- `CirclePackingChart` führt automatisch einen `Ctrl+Click`-Zoom aus.
- `ChordChart` hovert automatisch die erste Gruppe, um den Ribbon-Highlight-Effekt zu zeigen.
- `SqlEditor` hat eine neue `WithQueryHistory`-Story, die das neue Feature end-to-end zeigt.

---

## [3.4.0] — 2026-06-21

### Hinzugefügt

- **TagSelection** — zwei neue Translation-Keys, `confirmCreateLabel` und `cancelCreateLabel`, als `aria-label` für die Bestätigen-/Abbrechen-Icon-Buttons beim Anlegen eines neuen Tags.

### Behoben

#### Accessibility

- Fehlendes `aria-label` an 13 Icon-only-Buttons ergänzt: `GanttTaskPanel`, `GanttToolbar`, `TagSelectionAutocomplete`, `RichTextEditorColorPicker` (Farb-Swatches + Custom-Color-Trigger), `RichTextEditorEmojiPicker`. Diese verließen sich bisher nur auf `Tooltip`, was eine Beschreibung (`aria-describedby`) liefert, aber keinen Accessible Name.

#### Test-Coverage

- `SqlEditor` hatte keine Tests — 21 Tests ergänzt (Toolbar-Interaktionen: Format, Copy, Clear, Undo, Redo, Execute; alle 5 SQL-Dialekte; Schema-Prop; Disabled-State). Coverage: 0% → 82% Lines.
- `RichTextEditorImageDialog` (17% → 94%) und `RichTextEditorTableMenu` (20% → 96%) — eigene Testdateien ergänzt.
- `gantt-chart.util.ts` — Tests für `cascadeDateUpdate` und `computeCriticalPath` ergänzt, die zuvor einzigen ungetesteten Funktionen. 99% Lines.
- Gesamt-Coverage der Library: 68% → 74% Lines, 65% → 70% Branches.

---

## [3.3.0] — 2026-06-21

### Hinzugefügt

#### Tree-Shaking — Build-Output pro Komponente

- Der ESM-Build bündelt nicht mehr alle Komponenten in eine `dist/index.js`-Datei, sondern erhält die Modul-Grenzen — jede Komponente wird als eigene Datei ausgeliefert, analog zur `src/`-Struktur.
- **Der Import einer Komponente zieht keine Abhängigkeiten fremder Komponenten mehr mit.** Z.B. zieht `import { TagSelection } from '@thebuoyant-tsdev/mui-ts-library'` jetzt kein D3, TipTap oder CodeMirror mehr ins Bundle — gemessener Rückgang von 1.1 MB auf 22 KB in einem minimalen esbuild-Testbundle.
- Keine API-Änderungen — bestehende Imports funktionieren unverändert. Der CJS-Build (`require()`) bleibt eine gebündelte Datei, da CommonJS-Konsumenten ohnehin nicht tree-shaken.

---

## [3.2.1] — 2026-06-17

### Behoben

- **ChordChart** — `ribbonBlendMode` ist jetzt theme-aware: Standard `"normal"` im Dark Mode, `"multiply"` im Light Mode. Zuvor waren Ribbons auf dunklem Hintergrund kaum sichtbar.
- **HorizontalTreeChart** — `linkStrokeOpacity`-Default von `0.4` auf `1.0` angehoben, konsistent mit `RadialTreeChart`.

---

## [3.2.0] — 2026-06-16

### Hinzugefügt

#### StackBlitz Live Demo

- Neues `stackblitz-demo/`-Verzeichnis im Repository — das Projekt direkt im Browser öffnen via [StackBlitz](https://stackblitz.com/github/thebuoyant/mui-ts-library/tree/main/stackblitz-demo?startScript=dev), ohne lokale Installation.
- Zeigt `TagSelection` (Search-Highlighting, Creatable), `PasswordStrengthMeter` (Generator + Confirm-Feld) und `GanttChart` (Drag & Drop, Resize, Fortschritt).
- README.md (EN+DE): Prominenter "Im Browser ausprobieren"-Link direkt unter dem Storybook-Link ergänzt.

---

## [3.1.1] — 2026-06-16

### Geändert

- README.md (EN+DE): Changelog-Einträge der letzten zwei Versionen direkt eingebettet — auf npm ohne zusätzlichen Link-Klick sichtbar.

---

## [3.1.0] — 2026-06-16

### Hinzugefügt

#### TagSelection — Suchergebnis-Highlighting

- Übereinstimmende Teile von Tag-Labels im Dropdown werden jetzt **fett** dargestellt, während der Nutzer einen Suchbegriff tippt (z. B. zeigt `"Reac"` → **Reac**t im Options-Chip).
- Highlighting ist case-insensitive und markiert immer das erste übereinstimmende Segment pro Label.
- Keine API-Änderungen — rein visuelles Enhancement, vollständig abwärtskompatibel.

---

## [3.0.0] — 2026-06-15

### Entfernt

#### ConfirmDialog — Komponente entfernt (MTL-25)

- **Breaking:** `ConfirmDialog`, `ConfirmDialogProvider`, `useConfirm` sowie die Typen `ConfirmDialogOptions`/`ConfirmDialogSeverity` wurden vollständig aus dem Paket entfernt, inkl. des zugehörigen User-Manuals.
- Migration: Bestätigungsdialoge direkt mit MUI's `Dialog` umsetzen, oder bei einer `2.x`-Version bleiben, falls diese Komponente benötigt wird.

### Geändert

#### TagSelection — `onTagCreate`-Signatur (Breaking) (MTL-25)

- **Breaking:** `onTagCreate` erhält jetzt das vollständige `TagSelectionItem` (bereits mit `selected: true` und der gewählten `color` bzw. `backgroundColor`/`foregroundColor`) statt des alten `(label: string, color: TagColor)`.
- Migration: `onTagCreate={(label, color) => { ... }}` durch `onTagCreate={(tag) => setTags((prev) => [...prev, tag])}` ersetzen.

### Hinzugefügt

#### TagSelection — Custom-Color-Picker bei Tag-Erstellung (MTL-25)

- Der "Regenbogen-Chip" im Create-Mode (`allowCreate={true}`) öffnet jetzt ein Custom-Color-Picker-Panel mit Hintergrund- und Textfarb-Swatches, Hex-Eingaben und einem "Auto"-WCAG-Kontrast-Umschalter für die Textfarbe.
- Neue Translation-Keys: `backgroundColorLabel`, `textColorLabel`, `autoTextColorLabel`.

### Behoben

#### Chart- und Gantt-Farb-Overrides — Fallback bei leerem String (MTL-25)

- Die Farb-Override-Props von `RadialTreeChart`, `HorizontalTreeChart`, `CirclePackingChart` und `GanttChart` (z. B. `linkColor`, `labelColor`, `todayColor`, `todayLineColor`, `weekendColor`, `milestoneColor`, `criticalPathColor`) fallen jetzt auch bei einem leeren String `""` auf ihre Theme-Standardwerte zurück, nicht nur bei `undefined`/`null`.
- Vorher wurde ein leerer String (z. B. der Default-Wert eines Storybook-Color-Picker-Controls) direkt an `stroke`/`fill`/`bgcolor` durchgereicht — der Browser fällt dann stillschweigend auf den SVG-Initialwert zurück. Am sichtbarsten bei `stroke=""`, das zu `stroke: none` wird, wodurch Chart-Links standardmäßig unsichtbar waren.

---

## [2.7.0] — 2026-05-31

### Hinzugefügt

#### PasswordStrengthMeter — Passwort-Generator (MTL-25)

- **`showPasswordGenerator?: boolean`** (Standard `false`) — zeigt "Sicheres Passwort generieren"-Button; nutzt `window.crypto.getRandomValues`
- **`generatorOptions?: PasswordGeneratorOptions`** — `length`, `upper`, `lower`, `numbers`, `symbols` konfigurierbar; garantiert mindestens ein Zeichen jeder aktiven Klasse
- **`onPasswordGenerated?: (password: string) => void`** — Callback mit generiertem Passwort

#### GanttChart — Assignee-Spalte + CSV-Export (MTL-25)

- **`task.assignee?: string`** — neues optionales Feld in `GanttTask`; wird in der Panel-Spalte und im Add/Edit-Dialog angezeigt
- **`showAssigneeColumn?: boolean`** (Standard `false`) — zeigt eine "Assignee"-Spalte im Task-Panel
- **`toolbarConfig.showExportCSV?: boolean`** (Standard `false`) — Download-Button in der Toolbar; generiert CSV mit allen Task-Feldern und löst Browser-Download aus
- **`onExportCSV?: (csv: string, tasks: GanttTask[]) => void`** — optionaler Callback für eigene CSV-Verarbeitung
- Neue Translation-Keys: `columnAssignee`, `exportCsvTooltip`

---

## [2.6.0] — 2026-05-31

### Hinzugefügt

#### HorizontalTreeChart — Neue Komponente (MTL-24) · D3-Charts-Familie #5

- **4 Orientierungen** via `orientation?: 'LR' | 'RL' | 'TB' | 'BT'` — links→rechts (Standard), rechts→links, oben→unten, unten→oben
- **Geschwungene Bézier-Links** — `d3.linkHorizontal()` / vertikal je nach Orientierung
- **`data: HorizontalTreeData`** — reiches Datenmodell wie RadialTreeChart: `id`, `name`, `subname`, `value`, `specialValueA/B`, `colorConfig`, `children`
- **`drillable`** + **`zoomable`** — Ctrl / Cmd ⌘+Click/DblClick/Scroll wie alle anderen D3-Charts
- Alle Konventionen: `chartColors`, `colorConfig`, `disabled`, `translation`, MUI Tooltip

---

## [2.5.0] — 2026-05-30

### Hinzugefügt

#### CirclePackingChart — Neue Komponente (MTL-22) · D3-Charts-Familie #4

- **Hierarchische Daten als verschachtelte Kreise** — Größen proportional zu Werten; ideal für Budget-Aufschlüsselungen, Portfolio-Analysen und proportionale Hierarchien
- **Animierter D3-Zoom** — `Doppelklick` auf Kreis → sanfte `d3.interpolateZoom`-Transition; `Doppelklick` auf Hintergrund → zurück; Labels blenden während der Transition ein/aus
- **Alt+Doppelklick** → Zeitlupe (10× Dauer) für Präsentationen
- **`data: CirclePackingData`** — rekursiv: `{ name, value?, children? }`
- **Tiefenbasierte Farben** — zwei Modi: `chartColors` (Palette pro Tiefe) oder HCL-Gradient (`depthColorStart`/`depthColorEnd`, Standard: MUI-Theme-Palette)
- **`size`** — einzelner Prop statt `width`/`height`; `onCircleClick`, `onZoomChange`, `disabled`

---

## [2.4.0] — 2026-05-29

### Hinzugefügt

#### RadialTreeChart — Neue Komponente (MTL-21) · D3-Charts-Familie #3

- **Hierarchische Daten als radialer Baum** — Knoten auf konzentrischen Ringen, verbunden durch geschwungene Bézier-Links; ideal für Org-Charts, Taxonomien, Abhängigkeitsbäume und Wissensgraphen
- **`data: RadialTreeChartData`** — rekursiver Baum mit optionalen Feldern `subname`, `value`, `specialValueA`, `specialValueB`
- **Icons auf Knoten** (`showIcons`, Standard `true`) — Standard: `FolderOutlined` für Branch-Knoten, `PersonOutlined` für Blätter; Override per Tiefe via `nodeIconsByDepth` oder vollständig custom via `renderNodeIcon`
- **MUI-Tooltip** (`followCursor`) auf jedem Knoten — zeigt Name, Subname und Breadcrumb-Pfad beim Hover
- **Eingebautes MUI-Popover** (`showNodePopover`, Standard `false`) — Klick auf Knoten öffnet Karte mit Avatar, Name, Subname und beschrifteten Sonderwerten; ersetzbar via `renderNodePopoverContent`
- **`onNodeClick?: (info: RadialTreeNodeInfo, event) => void`** — sauberer Callback ohne D3- oder Fluent-UI-Typen
- **`chartColors?: string[]`** — Farben pro Tiefenebene; Fallback: MUI-Theme-Palette
- **`autoFit?: boolean`** (Standard `true`) — viewBox passt sich automatisch dem Inhalt an
- Von Fluent UI (`@fluentui/react-components`, `@fluentui/react-icons`) auf MUI migriert: Icons, Avatar, Popover
- **`zoomable?: boolean`** — `Ctrl / Cmd ⌘ + Scroll` visueller Zoom; clippt am `size`-Rand
- **`drillable?: boolean`** — `Ctrl / Cmd ⌘ + Click` Drill-Down; `Ctrl / Cmd ⌘ + DblClick` zurück; `Escape` Reset; Breadcrumb bei Drill-In
- **`onFocusChange?`** — Callback bei Drill-Down-Wechsel
- **`rootNodeRadius` / `branchNodeRadius` / `leafNodeRadius`** — Kreisgrößen pro Knotenrolle
- **`linkColor` / `labelFontSize` / `labelColor`** — vollständig konfigurierbare Visuelles
- `SunburstChart`: `zoomable`-Prop ergänzt — gleiche `Ctrl / Cmd ⌘ + Scroll` Zoom-Logik

> **Plattform-Hinweis:** Alle `Ctrl+...`-Shortcuts funktionieren auf macOS auch mit `Cmd ⌘`. Der Code prüft `ctrlKey || metaKey` für alle Modifier-Interaktionen.

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
