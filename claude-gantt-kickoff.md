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

## Aktueller Stand: Phasen 1–11 abgeschlossen ✅ (158 Tests grün)

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
| `GanttToolbar.tsx`              | Toolbar: Skala-Switcher + Von/Bis-Date-Inputs + Reset-Button                        |
| `GanttChart.stories.tsx`        | 12 Stories mit argTypes und meta args                                                |

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
  onTaskClick={(task) => ...}
  onMilestoneClick={(task) => ...}
  onAddTask={(parentTask?) => ...}       // nur wenn enableBuiltinDialogs=false
  onEditTask={(task) => ...}             // nur wenn enableBuiltinDialogs=false (Phase 11)
  onDeleteTask={(task) => ...}           // nur wenn enableBuiltinDialogs=false
  onStatusChange={(task, status) => ...}
  onTasksChange={(tasks) => ...}         // nach jeder CRUD-Aktion mit aktueller Task-Liste (Phase 11)
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

## Storybook — 12 Stories

| Story               | Besonderheit                                                        |
| ------------------- | ------------------------------------------------------------------- |
| Default             | Months-Skala, `enableBuiltinDialogs=true`, onTaskCreated/Updated/Deleted/Change verdrahtet |
| WeeksScale          | KW-Header                                                           |
| QuartersScale       | Q1-Q4                                                               |
| DaysScale           | Zwei-Ebenen-Header, TAGE-Button aktiv                               |
| FullyExpanded       | `initialExpandAll: true`, height: 700, built-in dialogs             |
| WithDependencies    | Fan-in, Fan-out, Z-Pfeile, height: 400                              |
| CustomDateRange     | `defaultRangeStart/End` = ganzes Jahr 2025                          |
| EnglishTranslations | `translations: EN_TRANSLATIONS`, W-prefix statt KW, built-in dialogs |
| NoToolbar           | `showToolbar: false`                                                |
| MinimalFlat         | Nur Root-Tasks gefiltert, maxWidth: 700, height: 300                |
| WithProgress        | `progress` auf allen Tasks, Today-Linie sichtbar, `initialExpandAll: true` |
| WithBuiltinDialogs  | `enableBuiltinDialogs: true`, alle Dialog-Callbacks verdrahtet      |

---

## Phase 9 — CRUD Dialoge ✅ abgeschlossen

- `enableBuiltinDialogs=false`: Icons rufen `onAddTask` / `onDeleteTask` direkt auf (kein Edit-Icon)
- `enableBuiltinDialogs=true` (jetzt Standard): Edit/Add/Delete-Icons öffnen MUI Dialoge; Store wird sofort aktualisiert; dann `onTaskCreated` / `onTaskUpdated` / `onTaskDeleted` / `onTasksChange`

---

## Phase 10 — Progress-Balken + Today-Linie ✅ abgeschlossen

- `GanttTask.progress?: number` (0–100) → halbopaker Overlay-Balken im Haupt-Balken
- Today-Linie: rote gestrichelte SVG-Linie bei `Date.now()` im SVG-Layer

---

## Phase 11 — Tabellarisches Layout + Split-Pane + onTasksChange + onEditTask ✅ abgeschlossen

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

---

## So starten wir die nächste Session

```
Bitte lies zuerst die claude-gantt-kickoff.md im Root des Projekts.
Dann besprechen wir Phase 12.
158 Tests müssen nach den Änderungen grün bleiben.
```
