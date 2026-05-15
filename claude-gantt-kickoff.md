# Gantt-Chart Komponente — Kickoff-Prompt für die nächste Session

## Kontext: Was dieses Projekt ist

Wir arbeiten an **`mui-ts-library`** — einer eigenen React-Komponentenbibliothek, die MUI (Material UI v7) ergänzt. Das Projekt liegt unter:

```
/Users/thomasschlender/Development-React-Components/mui-ts-library
```

### Etablierte Patterns — diese müssen beim Gantt exakt eingehalten werden

| Pattern     | Detail                                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| **Sprache** | Code/Variablen/Methoden auf Englisch. Kommentare auf Deutsch, aber NUR wenn das WHY nicht-offensichtlich ist. |
| **State**   | Zustand v5 Vanilla-Store via `createStore` aus `zustand/vanilla`, in React-Context verpackt                   |
| **Styling** | MUI `sx`-Prop, MUI-Theme-Farben (kein hardcodiertes Hex)                                                      |
| **Typen**   | Alle öffentlichen Typen in einer eigenen `*.types.ts`-Datei                                                   |
| **Tests**   | Vitest + @testing-library/react — Tests beschreiben Verhalten, nie Implementierung                            |
| **Stories** | Storybook mit `@storybook/react-vite`, MUI ThemeProvider global in `.storybook/preview.tsx`                   |
| **Exports** | Alles aus `src/index.ts` re-exportieren                                                                       |

### Tech-Stack

```
React 19, TypeScript 5.9, MUI v7, Zustand v5, Vite 8, Vitest 4, Storybook 10
```

---

## Aktueller Stand: Phasen 1–18 abgeschlossen ✅ (227 Tests grün, README aktuell)

### Alle vorhandenen Dateien

| Datei                           | Inhalt                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| `GanttChart.types.ts`           | `GanttTaskStatus`, `GanttTimeScale`, `GanttTask` (inkl. `progress?`), `GanttTaskNode`, `GanttTranslations`, `GanttChartProps` |
| `GanttChart.store.ts`           | Zustand-Store: `tasks`, `taskTree`, `expandedIds`, `timeScale`, `timelineRange`, `isRangeCustomized` + `addTask`, `updateTask`, `deleteTask` |
| `GanttChart.store.test.ts`      | 14 Store-Tests                                                                       |
| `GanttChart.constants.ts`       | alle Layout-Konstanten                                                               |
| `util/gantt-chart.util.ts`      | Datum- und Baum-Hilfsfunktionen                                                      |
| `util/gantt-chart.util.test.ts` | 34 Util-Tests                                                                        |
| `GanttChart.tsx`                | Haupt-Komponente: Store-Kontext, Translations-Kontext, `resolveSize`, Scroll-Sync, Split-Pane-Divider |
| `GanttChart.test.tsx`           | 110 Komponenten-Tests                                                                |
| `GanttTaskPanel.tsx`            | Linkes Panel: Tabellarisches Layout (Name-Spalte flex, Aktionen-Spalte fix, Status-Spalte fix), Dialog-State, `panelWidth` prop |
| `GanttTaskDialog.tsx`           | MUI Dialog für Add + Edit (Formularfelder inkl. Meilenstein-Checkbox + Elterntask)   |
| `GanttDeleteDialog.tsx`         | MUI Bestätigungs-Dialog für Löschen                                                  |
| `GanttTimelineHeader.tsx`       | Header mit optionalem zwei-Ebenen-Modus (`groups`) für Tages-Skala                  |
| `GanttTimeline.tsx`             | Rechtes Panel: Balken + Progress-Overlay, Meilensteine, Gitterlinien, SVG (Pfeile + Today-Linie) |
| `GanttToolbar.tsx`              | Toolbar: Skala-Switcher + Von/Bis-Date-Inputs + Reset-Button + Heute-Button + Expand/Collapse-All-Button |
| `GanttChart.stories.tsx`        | 16 Stories mit argTypes und meta args                                                |

### GanttTimeScale — implementierter Stand

| Skala      | Status | Spaltenbreite                  |
| ---------- | ------ | ------------------------------ |
| `months`   | ✅     | `COLUMN_WIDTH_MONTH = 120px`   |
| `quarters` | ✅     | `COLUMN_WIDTH_QUARTER = 360px` |
| `weeks`    | ✅     | `COLUMN_WIDTH_WEEK = 40px`     |
| `days`     | ✅     | `COLUMN_WIDTH_DAY = 20px`      |

### Konstanten (GanttChart.constants.ts)

```ts
ROW_HEIGHT = 40;
HEADER_HEIGHT = 40;        // border-box Höhe inkl. borderBottom (1px)
LEFT_PANEL_WIDTH = 320;    // Anfangsbreite des Panels
COLUMN_WIDTH_DAY = 20;
COLUMN_WIDTH_WEEK = 40;
COLUMN_WIDTH_MONTH = 120;
COLUMN_WIDTH_QUARTER = 360;
BAR_HEIGHT = 16;
STATUS_COL_WIDTH = 90;     // Phase 11: feste Breite der Status-Spalte
ACTIONS_COL_WIDTH = 96;    // Phase 11: feste Breite der Aktions-Icons-Spalte
DIVIDER_WIDTH = 4;         // Phase 11: Breite des Split-Pane-Dividers
```

---

## Kritisches Wissen für alle Sessions

### 1. useMemo-Pflicht für getVisibleTasks

```tsx
// FALSCH — neue Array-Referenz → Endlosschleife
const visibleTasks = useGanttChartStore((s) => s.getVisibleTasks());

// RICHTIG
const taskTree = useGanttChartStore((s) => s.taskTree);
const expandedIds = useGanttChartStore((s) => s.expandedIds);
const visibleTasks = useMemo(
  () => getVisibleTasks(taskTree, expandedIds),
  [taskTree, expandedIds],
);
```

### 2. displayRange — Skala-Ausweitung in GanttTimeline

```ts
if (timeScale === "weeks")    displayRange.start = startOfWeek(timelineRange.start);
if (timeScale === "quarters") displayRange = { start: startOfQuarter(...), end: endOfQuarter(...) };
// "months"/"days" brauchen keine Anpassung
```

### 3. SVG-Abhängigkeitspfeile

- `computeDependencyLines(visibleTasks, displayRange, totalWidth)` — Z-förmige Pfade (3 Fälle: viel Platz, wenig Platz, Rand)
- SVG-Layer: `position: absolute, top: headerTotalHeight, pointerEvents: none`
- `useId()` für einzigartige Marker-ID pro Instanz
- `headerTotalHeight = groups ? HEADER_HEIGHT * 2 : HEADER_HEIGHT`

### 4. Header-Höhe — WICHTIG für Pixel-genaue Ausrichtung

Sowohl `GanttTaskPanel`-Header als auch `GanttTimelineHeader` müssen **exakt dieselbe border-box-Höhe** haben:

- Beide haben `height: HEADER_HEIGHT` (explizit) + `borderBottom: 1px solid`
- Mit `box-sizing: border-box` → content = 39px, total = 40px
- `GanttTimelineHeader` hat `overflow: visible` damit Items (height: 40px) nicht geclippt werden
- Für Tages-Skala: beide haben `height: HEADER_HEIGHT * 2` (= 80px total)

### 5. Days-Skala Zwei-Ebenen-Header

- `GanttTimelineHeader`: wenn `groups` gesetzt → Gruppen-Box mit `height: HEADER_HEIGHT, borderBottom: 1px solid`, dann Spalten-Row darunter
- `GanttTaskPanel`: wenn `timeScale === "days"` → Header hat zwei Zeilen: Zeile 1 mit "Name"/"Status" + `borderBottom: 1px`, Zeile 2 leer (height: HEADER_HEIGHT)
- So sitzen "Name"/"Status" auf gleicher Höhe wie die Monats-Gruppen-Zeile ("Feb. 25")

### 6. getTimelineRange hat 1-Monat-Puffer auf beiden Seiten

```ts
return {
  start: startOfMonth(addMonths(earliest, -1)),  // 1 Monat Puffer davor
  end: endOfMonth(addMonths(latest, 1)),          // 1 Monat Puffer danach
};
```

### 7. resolveSize — "auto" für height/width

In `GanttChart.tsx`:
```ts
function resolveSize(value, fallback) {
  if (value === undefined) return fallback;
  if (value === "auto") return "100%";
  if (typeof value === "string" && /^\d+$/.test(value)) return Number(value); // Storybook-Fix
  return value;
}
```
`"auto"` → `"100%"` (füllt Eltern-Container). Reine Zahl-Strings ("500") → Zahl damit MUI korrekte px-Ausgabe macht.

### 8. borderRight auf Zeilen, nicht auf Container

Der `borderRight` (vertikaler Separator zwischen Panel und Timeline) liegt auf dem **Header-Box und jeder Task-Zeile** (nicht auf dem Panel-Container). So teilen `borderBottom` und `borderRight` dieselbe Ecke → kein 1px-Gap.

### 9. Circular Import (bewusst)

`GanttTaskPanel`, `GanttTimeline`, `GanttToolbar`, `GanttTaskDialog`, `GanttDeleteDialog` importieren `useGanttChartStore` / `useGanttTranslations` / `useRawGanttChartStore` aus `./GanttChart`. Identisch mit TagSelection-Pattern.

### 10. Action-Icons — immer sichtbar (kein Hover-Opacity-Pattern)

Icons (Add/Edit/Delete) haben **keine** `opacity: 0` / `:hover`-Logik mehr. Sie sind immer sichtbar wenn `enableBuiltinDialogs=true` (Standard) oder direkte Callbacks gesetzt sind.

### 11. Tabellarisches Layout — Phase 11

`GanttTaskRow` hat drei feste Spalten in einer `display: flex`-Zeile:
1. **Name-Spalte** (`flex: 1, minWidth: 0`): Einzug (`pl: 1 + depth * 2`) + Expand-Icon (16px) + Status-Dot (8px) + Typografie noWrap
2. **Aktions-Spalte** (`width: ACTIONS_COL_WIDTH = 96px`, nur wenn `hasActionsColumn`): Edit + Add + Delete Icons
3. **Status-Spalte** (`width: STATUS_COL_WIDTH = 90px`): Chip zentriert

`hasActionsColumn = !!(rowOnAdd || rowOnEdit || rowOnDelete)` — auch der Panel-Header zeigt die gleiche Spaltenstruktur.

### 12. Split-Pane — Phase 11

```tsx
const [panelWidth, setPanelWidth] = useState(LEFT_PANEL_WIDTH);

const handleDividerMouseDown = useCallback((e: React.MouseEvent) => {
  e.preventDefault();
  const startX = e.clientX;
  const startWidth = panelWidth;
  const onMouseMove = (ev: MouseEvent) => {
    const delta = ev.clientX - startX;
    const newWidth = Math.max(minPanelWidth, Math.min(maxPanelWidth, startWidth + delta));
    setPanelWidth(newWidth);
  };
  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}, [panelWidth, minPanelWidth, maxPanelWidth]);
```

Der Divider hat `data-testid="gantt-panel-divider"`.

### 13. useRawGanttChartStore — Phase 11

Exportiert aus `GanttChart.tsx`:
```ts
export function useRawGanttChartStore(): GanttChartStore {
  const store = useContext(GanttChartStoreContext);
  if (!store) throw new Error("GanttChartStoreContext is missing.");
  return store;
}
```

Wird in `GanttTaskPanel` nach jedem CRUD-Aufruf verwendet:
```ts
storeAddTask(newTask);
onTasksChange?.(rawStore.getState().tasks); // synchron — Zustand-set ist synchron
```

---

## Props-API (vollständig)

```tsx
<GanttChart
  tasks={tasks}                          // GanttTask[]
  timeScale="months"                     // "days" | "weeks" | "months" | "quarters"
  height={500}                           // number | string | "auto" (100%), Default: 400
  width="auto"                           // number | string | "auto" (100%), Default: "100%"
  initialExpandAll={false}               // alle Knoten aufgeklappt statt nur Root
  showToolbar={true}                     // Toolbar ein-/ausblenden (Standard: true)
  defaultRangeStart={new Date(...)}      // optionaler initialer Von-Wert (setzt isRangeCustomized)
  defaultRangeEnd={new Date(...)}        // optionaler initialer Bis-Wert
  translations={{ scaleDays: "Days" }}   // Partial<GanttTranslations> — nur abweichende Keys
  minPanelWidth={200}                    // Mindestbreite des linken Panels, Default: 200
  maxPanelWidth={600}                    // Maximalbreite des linken Panels, Default: 600
  enableBuiltinDialogs={true}            // DEFAULT: true — öffnet Dialoge statt direkter Callbacks
  draggable={false}                      // Balken horizontal verschiebbar
  resizable={false}                      // endDate per Drag am rechten Rand änderbar
  cascadeDependencies={false}            // Nachfolger bei Datumsänderung automatisch mitverschieben
  onTaskClick={(task) => ...}
  onMilestoneClick={(task) => ...}
  onAddTask={(parentTask?) => ...}       // nur wenn enableBuiltinDialogs=false
  onEditTask={(task) => ...}             // nur wenn enableBuiltinDialogs=false (Phase 11)
  onDeleteTask={(task) => ...}           // nur wenn enableBuiltinDialogs=false
  onStatusChange={(task, status) => ...}
  onTasksChange={(tasks) => ...}         // nach jeder CRUD-Aktion und nach Drag/Resize mit aktueller Task-Liste
  onTaskMoved={(task, newStart, newEnd) => ...}  // nach Drag-Verschiebung eines Balkens
  onTaskResized={(task, newEnd) => ...}           // nach Resize am rechten Balkenrand
  onTaskCreated={(task) => ...}          // enthält generierte UUID (enableBuiltinDialogs=true)
  onTaskUpdated={(task) => ...}          // (enableBuiltinDialogs=true)
  onTaskDeleted={(taskId) => ...}        // (enableBuiltinDialogs=true)
/>
```

`GanttTask.dependencies?: string[]` — IDs der Vorgänger-Tasks (Finish-to-Start).

**Store-Aktionen (via `useGanttChartStore`):**

- `setTimelineRange(range)` — manuellen Datumsbereich setzen, setzt `isRangeCustomized = true`
- `resetTimelineRange()` — auf auto-berechneten Bereich (mit 1-Monat-Puffer) zurücksetzen
- `setTimeScale(scale)` — Skala wechseln
- `setTasks(tasks)` — Tasks ersetzen (überschreibt Range nicht wenn `isRangeCustomized`)
- `addTask(task)` — Task hinzufügen und Baum neu aufbauen
- `updateTask(task)` — Task aktualisieren und Baum neu aufbauen
- `deleteTask(taskId)` — Task + alle Nachkommen kaskadierend löschen

---

## Storybook — 16 Stories

| Story               | Besonderheit                                                        |
| ------------------- | ------------------------------------------------------------------- |
| Default             | Months-Skala, `enableBuiltinDialogs=true`, onTaskCreated/Updated/Deleted/Change verdrahtet |
| WeeksScale          | KW-Header                                                           |
| QuartersScale       | Q1-Q4                                                               |
| DaysScale           | Zwei-Ebenen-Header, TAGE-Button aktiv                               |
| FullyExpanded       | `initialExpandAll: true`, height: 700, built-in dialogs             |
| WithDependencies    | Fan-in, Fan-out, Z-Pfeile, height: 400                              |
| CustomDateRange     | `defaultRangeStart/End` = ganzes Jahr 2026                          |
| EnglishTranslations | `translations: EN_TRANSLATIONS`, W-prefix statt KW, built-in dialogs |
| NoToolbar           | `showToolbar: false`                                                |
| MinimalFlat         | Nur Root-Tasks gefiltert, maxWidth: 700, height: 300                |
| WithProgress        | `progress` auf allen Tasks, Today-Linie sichtbar, `initialExpandAll: true` |
| WithBuiltinDialogs  | `enableBuiltinDialogs: true`, alle Dialog-Callbacks verdrahtet      |
| ZoomAndToday        | `zoomable: true`, built-in dialogs, height: 500                     |
| DragAndResize       | `draggable: true`, `resizable: true`, `initialExpandAll: true`, `cascadeDependencies: true` |
| CustomStatusColors  | `statusColors` mit Violett/Blau/Grün/Rot, `initialExpandAll: true`                         |
| LargeDataset        | 360 Tasks, `virtualizeRows: true`, `initialExpandAll: true`                                 |

---

## Phase 9 — CRUD Dialoge ✅ abgeschlossen

- `enableBuiltinDialogs=false`: Icons rufen `onAddTask` / `onDeleteTask` direkt auf (kein Edit-Icon)
- `enableBuiltinDialogs=true` (jetzt Standard): Edit/Add/Delete-Icons öffnen MUI Dialoge; Store wird sofort aktualisiert; dann `onTaskCreated` / `onTaskUpdated` / `onTaskDeleted` / `onTasksChange`

---

## Phase 10 — Progress-Balken + Today-Linie ✅ abgeschlossen

- `GanttTask.progress?: number` (0–100) → halbopaker Overlay-Balken im Haupt-Balken
- Today-Linie: rote gestrichelte SVG-Linie bei `Date.now()` im SVG-Layer

---

## Phase 11 + Fixes ✅ abgeschlossen (164 Tests)

### Implementiertes Verhalten

- **Tabellarisches Layout**: Jede Task-Zeile hat 3 Spalten (Name flex, Aktionen 96px, Status 90px); Header-Zeile gleiche Struktur → perfekte vertikale Ausrichtung unabhängig von Einzugstiefe
- **Split-Pane**: Divider zwischen Panel und Timeline (`data-testid="gantt-panel-divider"`), per Drag resizable; `minPanelWidth` / `maxPanelWidth` Props
- **`enableBuiltinDialogs` Default**: Geändert von `false` → `true` — Dialoge sind jetzt standardmäßig aktiv
- **`onEditTask`**: Direkter Edit-Callback für `enableBuiltinDialogs=false`-Modus
- **`onTasksChange`**: Feuert nach jeder CRUD-Aktion mit der vollständigen aktuellen `GanttTask[]`-Liste; nutzt `rawStore.getState().tasks` (synchron nach Zustand-set)

### Neue Exports aus GanttChart.tsx

```ts
export function useRawGanttChartStore(): GanttChartStore
```

### Fixes nach Phase 11

- **Timeline-Clipping**: Balken und Meilensteine außerhalb der `displayRange` werden nicht mehr gerendert → `position: absolute`-Elemente dehnen den Scroll-Bereich nicht mehr aus
- **GanttTaskDialog — Default-Datum**: Neues Standard-Datum = `clampDate(new Date(), range.start, range.end)` → neue Tasks liegen immer im sichtbaren Bereich
- **GanttTaskDialog — Parent-Dropdown**: Flache Liste → DFS-Baum-Reihenfolge mit `depth`-Einzug (`└`-Symbol), eigene ID + alle Nachkommen im Edit-Modus ausgeschlossen
- **Storybook**: Alle Callbacks als `fn()` aus `storybook/test` in meta `args` → erscheinen im Actions-Tab; `minPanelWidth: 200` / `maxPanelWidth: 600` als Defaults sichtbar
- **GanttTaskDialog — Scrollbares Parent-Dropdown**: `MenuProps={{ PaperProps: { sx: { maxHeight: 280 } } }}` + `OverflowTooltip`-Komponente (Tooltip nur wenn Text abgeschnitten ist, via `scrollWidth > clientWidth` auf `onMouseEnter`)
- **Timeline-Standardbereich = aktuelles Quartal**: `getTimelineRange` ankert jetzt auf dem aktuellen Quartal; Tasks außerhalb werden mit ±1-Monat-Puffer einbezogen, das Quartal wird nie verkleinert. Alle Story-Daten auf 2026 aktualisiert.
- **Auto-Scroll zu heute**: `GanttTimeline` scrollt beim ersten Rendern so, dass der heutige Tag horizontal in der Mitte des sichtbaren Bereichs liegt (`scrollLeft = todayX − viewportWidth/2`)
- **Heute-Linie**: Farbe von `error.main` (Rot) auf `primary.main` geändert
- **addTask / updateTask expandieren die Timeline-Range**: Nach jeder CRUD-Aktion wird `expandRangeForTask` aufgerufen — neu angelegte Tasks außerhalb des Bereichs sind sofort sichtbar
- **GanttTaskDialog — End-Datum-Validierung**: End-Datum kann nicht mehr vor Start-Datum gesetzt werden:
  - `handleStartDateChange`: advances `endDate` auf `startDate` wenn `endDate < startDate` (oder Meilenstein)
  - `handleEndDateChange`: klemmt `endDate` auf `startDate` wenn der neue Wert < `startDate`
  - `inputProps.min = form.startDate` auf dem End-Datum-Feld (Browser-Level-Constraint)
  - `isValid` prüft zusätzlich `form.endDate >= form.startDate`

---

## So starten wir die nächste Session

```
Bitte lies zuerst die claude-gantt-kickoff.md im Root des Projekts.
Dann besprechen wir die nächste geplante Phase.
227 Tests müssen nach den Änderungen grün bleiben.
```

---

## Abgeschlossene Phasen

### Phase 12 ✅ abgeschlossen (177 Tests)

**Drag & Drop: Balken verschieben + Resize**

**Neue Util-Funktion**
```ts
// util/gantt-chart.util.ts
export function addDays(date: Date, days: number): Date
```

**Neue Props**
```ts
draggable?: boolean;        // Balken horizontal verschiebbar (Default: false)
resizable?: boolean;        // endDate per Drag am rechten Rand änderbar (Default: false)
onTaskMoved?: (task: GanttTask, newStart: Date, newEnd: Date) => void;
onTaskResized?: (task: GanttTask, newEnd: Date) => void;
```

**Implementierung in `GanttTimeline.tsx`**
- `dragInitRef` (DragInit | null) — fester Drag-Start-Zustand (Ref, kein State)
- `activeDragRef` (für Zugriff aus mouseup-Closure ohne stale state)
- `activeDrag` (State) — löst Re-render für Balken-Positionsupdate aus
- `suppressClickRef` — verhindert `onClick` nach Drag ≥ 5px
- `dayWidthPxRef` — immer aktueller Wert von `totalWidth / totalDays`, kein stale closure
- Callback-Refs (`onTaskMovedRef`, `onTaskResizedRef`, `onTasksChangeRef`) damit Props-Updates in Event-Handler-Closures sichtbar sind
- `document.body.style.cursor` für globalen Cursor während Drag
- `updateTask` aus Store + `rawStore.getState().tasks` für synchronen onTasksChange-Aufruf
- `effectiveTask` — während Drag adjustierte Task-Daten für Positionsberechnung und Datum-Label

**Visuelle Rückmeldung während Drag**
- Balken: `opacity: 0.75` + Cursor `grab`/`grabbing`/`ew-resize`
- Datum-Label (`top: 2px` im Row-Box): `"DD. Mon – DD. Mon"` (move) oder `"→ DD. Mon"` (resize)
- Label nur sichtbar wenn `deltaDays !== 0`

**Click vs. Drag Unterscheidung**
- `suppressClickRef.current = true` wenn `abs(deltaPx) >= 5`
- Bar's `onClick` prüft `suppressClickRef.current` und unterdrückt ggf. `onTaskClick`

**Snap auf Tagesgrenzen**
```ts
const deltaDays = Math.round(deltaPx / dayWidthPxRef.current);
```

**Neue data-testids**
- `gantt-resize-handle-{taskId}` — Resize-Handle am rechten Balkenrand

**Neue Story**
- `DragAndResize` — `draggable: true`, `resizable: true`, `initialExpandAll: true`

---

### Cascade Dependencies ✅ abgeschlossen (181 Tests)

**Automatisches Verschieben von Nachfolger-Tasks bei Datumsänderungen**

**Neue Prop**
```ts
cascadeDependencies?: boolean;  // Default: false
```

**Neue Util-Funktion**
```ts
// util/gantt-chart.util.ts
export function cascadeDateUpdate(
  tasks: GanttTask[],
  changedTaskId: string,
  deltaMs: number,
): GanttTask[]
```

BFS-Traversierung: Vorgänger→Nachfolger-Map aufbauen → alle direkten und indirekten Finish-to-Start-Nachfolger um `deltaMs` verschieben. Zirkuläre Abhängigkeiten durch `visited`-Set abgefangen. Original-Reihenfolge der Task-Liste bleibt erhalten.

**Store-Integration in `updateTask`**
```ts
if (state.cascadeDependencies && original) {
  const deltaMs = task.endDate.getTime() - original.endDate.getTime();
  tasks = cascadeDateUpdate(tasks, task.id, deltaMs);
}
```
Gilt für Drag-Move, Drag-Resize und Dialog-Edit gleichermassen (alles läuft durch `updateTask`).

**Verhalten**
- Vorwärts (Task verlängert/nach rechts gezogen) → Nachfolger werden nach rechts verschoben
- Rückwärts (Task verkürzt/nach links gezogen) → Nachfolger werden nach links verschoben
- Kaskade ist transitiv: A → B → C: Änderung an A kaskadiert bis C
- Ohne `cascadeDependencies=true` ändert sich das bestehende Verhalten nicht

---

### Toolbar-Konfiguration ✅ abgeschlossen (188 Tests)

**Feingranulare Kontrolle über jeden Toolbar-Bestandteil**

**Neuer Typ**
```ts
export type GanttToolbarConfig = {
  showScaleDays?: boolean;        // Default: true
  showScaleWeeks?: boolean;       // Default: true
  showScaleMonths?: boolean;      // Default: true
  showScaleQuarters?: boolean;    // Default: true
  showExpandCollapseAll?: boolean; // Default: true
  showScrollToToday?: boolean;    // Default: true
  showDateRange?: boolean;        // Von/Bis-Inputs — Default: true
  showRangeReset?: boolean;       // Restore-Button — Default: true
  showResetView?: boolean;        // Reset-Button (Skala + Range) — Default: true
};
```

**Neue Prop**
```ts
toolbarConfig?: GanttToolbarConfig;  // nur abweichende Keys angeben
```

**Reset-View-Button**
- Icon: `RestartAltIcon`
- Setzt Zeitskala auf `defaultTimeScale` (in Store gespeichert) und Datumsbereich auf Auto-Range zurück
- Disabled wenn `timeScale === defaultTimeScale && !isRangeCustomized`
- `data-testid="gantt-reset-view"`

**Store-Additions**
- `defaultTimeScale: GanttTimeScale` — gespeicherte Ausgangsskala
- `resetView()` — Action die `timeScale`, `timelineRange` und `isRangeCustomized` zurücksetzt

**Neue Translation**
- `resetViewTooltip: "Ansicht zurücksetzen"`

**Implementation**
- `DEFAULT_TOOLBAR_CONFIG` in `GanttChart.tsx` — alle Felder `true`
- `resolvedToolbarConfig = { ...DEFAULT_TOOLBAR_CONFIG, ...toolbarConfig }` via `useMemo`
- Wird als `config: Required<GanttToolbarConfig>` an `GanttToolbar` übergeben

---

### Phase 13 ✅ abgeschlossen (172 Tests)

**"Heute"-Button**
- `TodayIcon` in `GanttToolbar`, Prop `onScrollToToday?: () => void`
- `scrollToToday` in `GanttChartInner` via `getDisplayRange` + `rightRef.current.scrollWidth`
- Disabled wenn `Date.now()` außerhalb `timelineRange` — `isTodayInRange` direkt in `GanttToolbar` berechnet
- `data-testid="gantt-scroll-to-today"`; neue Translation: `scrollToTodayTooltip`

**Wochenend-Hervorhebung (Tages-Skala)**
- `isWeekend?: boolean` in `HeaderColumn` — Header-Zellen mit `bgcolor: "action.hover"`, Text `color: "text.disabled"`
- Weekend-Strip-Layer: absolut positioniertes `Box`-Container über allen Zeilen (`data-testid="gantt-weekend-strips"`), `pointerEvents: none`
- Nur bei `timeScale === "days"` gerendert

**Zoom per Strg+Mausrad**
- Neue Prop `zoomable?: boolean` (Default: false)
- `useEffect` in `GanttChartInner` mit `addEventListener("wheel", ..., { passive: false })` auf `rightRef.current`
- Skalen-Reihenfolge: `days ↔ weeks ↔ months ↔ quarters`

**Neue Utility-Funktion**
```ts
// util/gantt-chart.util.ts
export function getDisplayRange(timelineRange: TimelineRange, timeScale: GanttTimeScale): TimelineRange
```
Wird von `GanttTimeline` (ersetzt lokales `useMemo`) und `GanttChartInner` (`scrollToToday`) geteilt.

**Neue data-testids**
- `gantt-scroll-to-today` — Heute-Button
- `gantt-weekend-strips` — Wochenend-Hintergrund-Layer
- `gantt-timeline-scroll` — scrollbares Timeline-Container-div

---

### Expand/Collapse All ✅ abgeschlossen (172 Tests)

**Expand/Collapse-All-Button in der Toolbar**
- `UnfoldMoreIcon` / `UnfoldLessIcon` aus `@mui/icons-material`
- Zustand: `allExpanded = tasks.length > 0 && tasks.every((t) => expandedIds.has(t.id))`
- Klick auf `expandAll` (Store-Aktion: `expandedIds = new Set(tasks.map(t => t.id))`) oder `collapseAll` (Store-Aktion: `expandedIds = new Set()`)
- Icon und Tooltip wechseln je nach `allExpanded`-Zustand
- `data-testid="gantt-expand-collapse-all"`
- Neue Translations: `expandAllTooltip: "Alle aufklappen"`, `collapseAllTooltip: "Alle zuklappen"`

---

### Phase 14 — Inline-Editierung + Schnellaktionen

**Task-Name Inline-Edit**
- Doppelklick auf den Namen → `TextField` mit `autoFocus` ersetzt die `Typography`
- Enter / Blur → `updateTask` direkt, kein Dialog nötig
- Escape → Abbrechen

**Schnell-Statuswechsel direkt am Balken**
- Rechtsklick auf Balken (oder Balken-Doppelklick) → MUI `Menu` mit den 4 Statuswerten
- `onStatusChange?.(task, newStatus)` feuert + Store-Update

**Fortschritt per Drag setzen**
- Wenn `progress` gesetzt: Klick+Drag auf dem Progress-Overlay → `progress` aktualisieren (0–100)
- Tooltip zeigt aktuellen %-Wert während des Drags

---

### Phase 15 ✅ abgeschlossen (212 Tests)

**Abhängigkeiten im Dialog + kritischer Pfad**

**Neues Multiselect-Feld "Vorgänger" im `GanttTaskDialog`**
- DFS-geordnete Liste, identisch zum Parent-Dropdown
- Eigene ID + alle Nachkommen ausgeblendet (keine Zyklen möglich)
- Neue Translations: `dialogFieldDependencies`, `dialogFieldDependenciesNone`

**Neue Util-Funktion**
```ts
// util/gantt-chart.util.ts
export function computeCriticalPath(tasks: GanttTask[]): Set<string>
```
DFS mit Memoisation + `inStack`-Guard für Zyklen. Gibt alle Task-IDs zurück, die über Abhängigkeiten den Projekt-Endpunkt erreichen können.

**Neue Prop**
```ts
showCriticalPath?: boolean;  // Default: false
```
Balken auf dem kritischen Pfad: `boxShadow: inset 0 0 0 2.5px error.main`
Meilensteine: `boxShadow: 0 0 0 2.5px error.main`

---

### Phase 16 ✅ abgeschlossen (216 Tests)

**Virtualisierung für große Datensätze**

**Neue Prop**
```ts
virtualizeRows?: boolean;  // Default: false
```

**Implementierung**
- `@tanstack/react-virtual` v3 in `GanttTaskPanel` + `GanttTimeline`
- `useVirtualizer({ count, getScrollElement, estimateSize: () => ROW_HEIGHT, overscan: 5 })`
- Virtual Rows: `position: absolute` + `transform: translateY(vRow.start)` in `position: relative`-Container mit `height: getTotalSize()`
- Inline-Style überschreibt MUI `sx` (CSS-Spezifität)
- jsdom-Limitation: Timeline-Virtualizer rendert 0 Items (kein Layout) → Panel-Test via `.gantt-task-row`-DOM-Klasse

**Neue Story**
- `LargeDataset` — 360 Tasks (4×4×5×4 hierarchisch generiert), `virtualizeRows: true`

---

### Phase 17 ✅ abgeschlossen (221 Tests)

**„Aktionen"-Spalten-Header + konfigurierbare Status-Farben + vollständige Translations**

**Neuer Spalten-Header**
- "Aktionen"-Label über der Icon-Buttons-Spalte im `GanttTaskPanel`-Header
- `Typography variant="caption"` mit `{t.columnActions}`, zentriert in `ACTIONS_COL_WIDTH`

**Icon-Button-Tooltips**
- Edit/Add/Delete-Icons in `GanttTaskRow` in MUI `<Tooltip>` gewrapped
- Texte über Translations konfigurierbar: `editTaskTooltip`, `addTaskTooltip`, `deleteTaskTooltip`

**Neue Translations-Keys**
```ts
columnActions: string;      // Default: "Aktionen"
addTaskTooltip: string;     // Default: "Aufgabe hinzufügen"
editTaskTooltip: string;    // Default: "Aufgabe bearbeiten"
deleteTaskTooltip: string;  // Default: "Aufgabe löschen"
```

**Neuer Typ + Prop**
```ts
export type GanttStatusColors = Partial<Record<GanttTaskStatus, string>>;

statusColors?: GanttStatusColors;
```

**Implementierung via Context**
```ts
// GanttChart.tsx
const GanttStatusColorsContext = createContext<GanttStatusColors>({});
export function useGanttStatusColors(): GanttStatusColors
```
- `GanttTaskPanel`: Dot-Farbe + Chip-Border/Color (`statusColors[status] ?? STATUS_DOT_COLOR[status]`)
- `GanttTimeline`: Bar bgcolor (`statusColors[status] ?? BAR_COLOR[status] ?? "grey.300"`)

**Neue Story**
- `CustomStatusColors` — Violett/Blau/Grün/Rot per `statusColors`-Prop

---

## Geplante Phasen (noch nicht implementiert)

### Phase 18 ✅ abgeschlossen (227 Tests)

**`ganttTheme` + `GanttTask.color` — gebündeltes Theming**

**Neuer Typ**
```ts
export type GanttTheme = {
  statusColors?: GanttStatusColors;   // per-Status Balkenfarben
  criticalPathColor?: string;         // Default: error.main
  milestoneColor?: string;            // Default: warning.main
  todayLineColor?: string;            // Default: primary.main
  weekendColor?: string;              // Default: action.hover
  barBorderRadius?: number;           // px, Default: 4
};
```

**Neue Prop**
```ts
ganttTheme?: GanttTheme;
```

**Prioritäten-Kette für Balken/Dot/Chip-Farbe:**
`task.color` → `ganttTheme.statusColors[status]` → `statusColors[status]` (backwards compat, deprecated) → MUI-Palette-Default

**Implementierung via `GanttThemeContext`**
```ts
// GanttChart.tsx
const GanttThemeContext = createContext<GanttTheme>({});
export function useGanttTheme(): GanttTheme
```
Intern werden `statusColors`-Prop und `ganttTheme.statusColors` gemergt (`ganttTheme` hat Vorrang):
```ts
const resolvedTheme = { ...ganttTheme, statusColors: { ...statusColors, ...ganttTheme?.statusColors } };
```

**`GanttTask.color?: string`** — überschreibt die Status-Farbe für genau diesen Task (höchste Priorität); wirkt auf Balken, Status-Dot und Chip.

**Neue Stories**
- `CustomGanttTheme` — zeigt alle `ganttTheme`-Felder inkl. kritischem Pfad und `barBorderRadius: 8`
- `PerTaskColor` — jeder 5. Task hat eine individuelle `color`-Property

**Renames**
- `useGanttStatusColors()` → `useGanttTheme()` in allen Consumers (`GanttTaskPanel`, `GanttTimeline`)
- `GanttStatusColorsContext` → `GanttThemeContext` in `GanttChart.tsx`

---

### Phase 19 — Export

**PNG/SVG-Export**
- Neuer Export-Button in der Toolbar (optional, Prop `showExport?: boolean`)
- `html-to-image` oder `dom-to-svg` — rendert den sichtbaren Chart-Bereich
- Dateiname: `gantt-export-{ISO-Datum}.png`

**Print-CSS**
- `@media print`: Toolbar ausblenden, Scrollbereich aufklappen, Seitenumbrüche zwischen Monaten

---

## Ideen für weitere Phasen / Improvements

### Idee A — Undo / Redo

- Store-History als Snapshot-Stack (max. ~50 Einträge)
- `undo()` / `redo()` als Store-Aktionen
- Keyboard-Shortcuts: Ctrl+Z / Ctrl+Y
- Toolbar-Buttons mit `UndoIcon` / `RedoIcon` (optional über `toolbarConfig`)
- Interagiert gut mit Drag & Drop, Dialog-CRUD und Cascade-Dependencies

### Idee B — Inline-Editierung von Task-Namen

- Doppelklick auf den Task-Namen → `TextField` mit `autoFocus` ersetzt `Typography`
- Enter / Blur → `updateTask`, Escape → Abbrechen
- Vermeidet den Dialog-Overhead für schnelle Umbenennung
- Neue Prop `inlineEdit?: boolean` (Default: false)

### Idee C — Schnell-Statuswechsel per Rechtsklick / Kontextmenü

- Rechtsklick auf Balken → MUI `Menu` mit den 4 Status-Optionen
- `onStatusChange?.(task, newStatus)` feuert + direktes Store-Update
- Alternativ: Doppelklick auf Balken öffnet das Menü (besser für Touch)

### Idee D — Fortschritt per Drag setzen

- Klick + Drag auf das Progress-Overlay → `progress` (0–100) live aktualisieren
- Tooltip zeigt aktuellen %-Wert während des Drags
- Neue Prop `progressDraggable?: boolean` (Default: false)
- Callback: `onProgressChange?: (task, progress) => void`

### Idee E — Abhängigkeiten im Dialog verwalten

- Multiselect-Feld "Vorgänger" im `GanttTaskDialog`
- DFS-geordnete Liste wie beim Parent-Dropdown
- Zirkuläre Abhängigkeiten ausschließen (eigene ID + alle Nachkommen ausblenden)
- Ermöglicht vollständiges Dependency-Management ohne manuelles `dependencies[]`-Array

### Idee F — Kritischer Pfad

- Neue Prop `showCriticalPath?: boolean`
- Berechnung: längste Abhängigkeitskette bis zum letzten Task (CPM)
- Balken auf dem kritischen Pfad erhalten einen farbigen Rand (`error.main` oder konfigurierbares Theming)
- Wird als SVG-Overlay oder durch Klassen auf den Bar-Elementen visualisiert

### Idee G — Baseline / Soll-Ist-Vergleich

- Neuer optionaler Typ `GanttTaskBaseline { id; baselineStart; baselineEnd }`
- Prop `baselines?: GanttTaskBaseline[]`
- Visualisierung als dünner transparenter Balken hinter dem aktuellen Balken
- Nützlich für Plan-vs.-Actual-Darstellungen

### Idee H — Custom Columns im Task-Panel

- Prop `extraColumns?: GanttColumnDef[]` mit `{ key; label; width; render: (task) => ReactNode }`
- Werden rechts von der Status-Spalte eingereiht
- Ermöglicht z. B. Assignee-Avatar, Datum, Budget-Felder ohne Fork

### Idee I — Swimlanes / Gruppierung

- Prop `groupBy?: (task: GanttTask) => string` — Tasks werden nach Rückgabewert in beschriftete Abschnitte gruppiert
- Trennlinien + Gruppen-Header-Zeile im Panel und in der Timeline
- Kombinierbar mit der bestehenden Hierarchie (parentId innerhalb einer Gruppe)

### Idee J — Import aus CSV / Zwischenablage

- Toolbar-Button "Import" → Textarea-Dialog, erwartet CSV mit Spalten `id,name,start,end,parentId,status`
- Parsed und ruft `setTasks` auf — optionales `onImport` Callback
- Passend zu Phase 19 (Export): vollständiger Round-Trip

### Idee K — Virtualisierung für große Datensätze ✅ als Phase 16 implementiert

### Idee L — Timeline-Annotationen / Marker

- Prop `markers?: { date: Date; label?: string; color?: string }[]`
- Werden als vertikale Linien in der Timeline gerendert (ähnlich Today-Linie, aber konfigurierbar)
- Nützlich für Sprint-Grenzen, Freeze-Dates, Meilensteine außerhalb der Task-Liste

### Idee M — Theming per Task-Kategorie / Farbe

- Optionales Feld `GanttTask.color?: string` — überschreibt die Status-Farbe für diesen Balken
- Alternativ: Prop `getTaskColor?: (task: GanttTask) => string`
- Ermöglicht team-basierte Farbgebung ohne Statusänderung

---
