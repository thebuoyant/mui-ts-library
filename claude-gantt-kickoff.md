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

## Aktueller Stand: Phasen 1–9+i18n+Layout-Fixes abgeschlossen ✅ (146 Tests grün)

### Alle vorhandenen Dateien

| Datei                           | Inhalt                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| `GanttChart.types.ts`           | `GanttTaskStatus`, `GanttTimeScale`, `GanttTask`, `GanttTaskNode`, `GanttTranslations`, `GanttChartProps` |
| `GanttChart.store.ts`           | Zustand-Store: `tasks`, `taskTree`, `expandedIds`, `timeScale`, `timelineRange`, `isRangeCustomized` + `addTask`, `updateTask`, `deleteTask` |
| `GanttChart.store.test.ts`      | 14 Store-Tests                                                                       |
| `GanttChart.constants.ts`       | alle Layout-Konstanten                                                               |
| `util/gantt-chart.util.ts`      | Datum- und Baum-Hilfsfunktionen                                                      |
| `util/gantt-chart.util.test.ts` | 34 Util-Tests                                                                        |
| `GanttChart.tsx`                | Haupt-Komponente: Store-Kontext, Translations-Kontext, `resolveSize`, Scroll-Sync    |
| `GanttChart.test.tsx`           | 98 Komponenten-Tests                                                                 |
| `GanttTaskPanel.tsx`            | Linkes Panel: `GanttTaskRow` mit Hover-Icons (Add/Edit/Delete) + Dialog-State        |
| `GanttTaskDialog.tsx`           | MUI Dialog für Add + Edit (Formularfelder inkl. Meilenstein-Checkbox + Elterntask)   |
| `GanttDeleteDialog.tsx`         | MUI Bestätigungs-Dialog für Löschen                                                  |
| `GanttTimelineHeader.tsx`       | Header mit optionalem zwei-Ebenen-Modus (`groups`) für Tages-Skala                  |
| `GanttTimeline.tsx`             | Rechtes Panel: Balken, Meilensteine, Gitterlinien, SVG-Pfeile                        |
| `GanttToolbar.tsx`              | Toolbar: Skala-Switcher + Von/Bis-Date-Inputs + Reset-Button                        |
| `GanttChart.stories.tsx`        | 11 Stories mit argTypes und meta args                                                |

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
LEFT_PANEL_WIDTH = 320;    // wurde von 280 auf 320 erhöht
COLUMN_WIDTH_DAY = 20;
COLUMN_WIDTH_WEEK = 40;
COLUMN_WIDTH_MONTH = 120;
COLUMN_WIDTH_QUARTER = 360;
BAR_HEIGHT = 16;
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

Ohne diese Angleichung starten Task-Panel-Zeilen und Timeline-Balken-Zeilen vertikal versetzt → horizontale Trennlinien wirken um 1px zu kurz.

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

Ohne den Puffer landen Meilensteine am letzten Task-Datum bei ~100% Position und werden rechts abgeschnitten.

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

`GanttTaskPanel`, `GanttTimeline`, `GanttToolbar` importieren `useGanttChartStore`/`useGanttTranslations` aus `./GanttChart`. Identisch mit TagSelection-Pattern.

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
  enableBuiltinDialogs={true}            // default: false — öffnet Dialoge statt direkter Callbacks
  onTaskClick={(task) => ...}
  onMilestoneClick={(task) => ...}
  onAddTask={(parentTask?) => ...}       // nur wenn enableBuiltinDialogs=false
  onDeleteTask={(task) => ...}           // nur wenn enableBuiltinDialogs=false
  onStatusChange={(task, status) => ...}
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

## Storybook — 11 Stories

| Story               | Besonderheit                                            |
| ------------------- | ------------------------------------------------------- |
| Default             | Months-Skala, onAdd/Delete/StatusChange verdrahtet      |
| WeeksScale          | KW-Header                                               |
| QuartersScale       | Q1-Q4                                                   |
| DaysScale           | Zwei-Ebenen-Header, TAGE-Button aktiv                   |
| FullyExpanded       | `initialExpandAll: true`, height: 700                   |
| WithDependencies    | Fan-in, Fan-out, Z-Pfeile, height: 400                  |
| CustomDateRange     | `defaultRangeStart/End` = ganzes Jahr 2025              |
| EnglishTranslations | `translations: EN_TRANSLATIONS`, W-prefix statt KW     |
| NoToolbar           | `showToolbar: false`                                    |
| MinimalFlat         | Nur Root-Tasks gefiltert, maxWidth: 700, height: 300    |
| WithBuiltinDialogs  | `enableBuiltinDialogs: true`, onTaskCreated/Updated/Deleted verdrahtet |

Meta `args`: `height: 500, width: "auto", initialExpandAll: false, showToolbar: true`
Meta `argTypes`: `timeScale` (radio), `height`/`width` (text), `initialExpandAll`/`showToolbar`/`enableBuiltinDialogs` (boolean)
Render-Funktionen nutzen `args.height` (kein hardcodierter Wert im Box-Wrapper).

---

## Phase 9 — CRUD Dialoge ✅ abgeschlossen

### Implementiertes Verhalten

- `enableBuiltinDialogs=false` (default): Hover-Icons rufen `onAddTask` / `onDeleteTask` direkt auf (bisheriges Verhalten, kein Edit-Icon)
- `enableBuiltinDialogs=true`: Edit/Add/Delete-Icons öffnen je einen MUI Dialog; Store wird sofort aktualisiert; danach werden `onTaskCreated` / `onTaskUpdated` / `onTaskDeleted` gefeuert

### Dialog-State-Architektur

- Dialog-State (`addOpen`, `editOpen`, `deleteOpen`, `activeTask`) lebt in `GanttTaskPanel`
- Dialoge werden nur gerendert wenn `enableBuiltinDialogs=true` (kein unnötiger DOM-Overhead)
- ID-Generierung für neue Tasks via `crypto.randomUUID()`
- Kaskadierendes Löschen: `deleteTask(id)` entfernt Task + alle Nachkommen rekursiv

### Formularfelder (GanttTaskDialog)

```
Name (TextField, required)
Startdatum (TextField type="date", required)
Enddatum (TextField type="date", required)
Status (Select: planned / in-progress / done / blocked)
Ist Meilenstein (Checkbox — setzt startDate = endDate automatisch)
Übergeordnete Aufgabe (Select der vorhandenen Tasks, optional)
```

### Props-Erweiterungen

```tsx
enableBuiltinDialogs?: boolean   // default: false
onTaskCreated?: (task: Omit<GanttTask, "id">) => void
onTaskUpdated?: (task: GanttTask) => void
onTaskDeleted?: (taskId: string) => void
```

### Verhalten

- `enableBuiltinDialogs=false` (default): Hover-Icons rufen `onAddTask` / `onDeleteTask` direkt auf (bisheriges Verhalten)
- `enableBuiltinDialogs=true`: Add-Icon öffnet `GanttTaskDialog` im "Neu"-Modus; Edit-Icon (neues drittes Icon auf hover) öffnet im "Bearbeiten"-Modus; Delete-Icon öffnet `GanttDeleteDialog`

### Doppelter Hover-Icon-Satz wenn enableBuiltinDialogs

```tsx
<EditIcon />   → öffnet Edit-Dialog
<AddIcon />    → öffnet Add-Dialog (parentTask = current task)
<DeleteIcon /> → öffnet Delete-Dialog
```

---

## Phase 10 — Progress-Balken + Today-Linie (nach Phase 9)

### Progress-Balken

```ts
// GanttTask Erweiterung:
progress?: number; // 0–100
```

In `GanttTimeline.tsx`: inneres `<Box>` mit `width: ${progress}%`, `bgcolor: "currentColor"`, `opacity: 0.4` über dem Haupt-Balken.

### Today-Linie

In `GanttTimeline.tsx` SVG-Layer: berechnete X-Position von `new Date()` relativ zu `displayRange`, dann `<line x1={x} y1={0} x2={x} y2={totalHeight} stroke="error.main" strokeWidth={1.5} strokeDasharray="4 2" />`.

---

## So starten wir die nächste Session

```
Bitte lies zuerst die claude-gantt-kickoff.md im Root des Projekts.
Dann implementiere Phase 10: Progress-Balken + Today-Linie.
146 Tests müssen nach den Änderungen grün bleiben.
```
