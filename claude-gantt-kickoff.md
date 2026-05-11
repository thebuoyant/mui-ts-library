# Gantt-Chart Komponente — Kickoff-Prompt für die nächste Session

## Kontext: Was dieses Projekt ist

Wir arbeiten an **`mui-ts-library`** — einer eigenen React-Komponentenbibliothek, die MUI (Material UI v7) ergänzt. Das Projekt liegt unter:

```
/Users/thomasschlender/Development-React-Components/mui-ts-library
```

### Etablierte Patterns — diese müssen beim Gantt exakt eingehalten werden

| Pattern | Detail |
|---|---|
| **Sprache** | Code/Variablen/Methoden auf Englisch. Kommentare auf Deutsch, aber NUR wenn das WHY nicht-offensichtlich ist. |
| **State** | Zustand v5 Vanilla-Store via `createStore` aus `zustand/vanilla`, in React-Context verpackt |
| **Styling** | MUI `sx`-Prop, MUI-Theme-Farben (kein hardcodiertes Hex) |
| **Typen** | Alle öffentlichen Typen in einer eigenen `*.types.ts`-Datei |
| **Tests** | Vitest + @testing-library/react — Tests beschreiben Verhalten |
| **Stories** | Storybook mit `@storybook/react-vite`, MUI ThemeProvider global in `.storybook/preview.tsx` |
| **Exports** | Alles aus `src/index.ts` re-exportieren |

### Tech-Stack

```
React 19, TypeScript 5.9, MUI v7, Zustand v5, Vite 8, Vitest 4, Storybook 10
```

---

## Aktueller Stand: Phase 1 + 2 abgeschlossen ✅ (96 Tests grün)

### Alle vorhandenen Dateien

| Datei | Inhalt |
|---|---|
| `GanttChart.types.ts` | `GanttTaskStatus`, `GanttTimeScale`, `GanttTask`, `GanttTaskNode`, `GanttChartProps` |
| `GanttChart.store.ts` | Zustand-Store mit `tasks`, `taskTree`, `expandedIds`, `timeScale`, `timelineRange` |
| `GanttChart.store.test.ts` | 11 Store-Tests |
| `util/gantt-chart.util.ts` | Alle Datum- und Baum-Hilfsfunktionen |
| `util/gantt-chart.util.test.ts` | 23 Util-Tests |
| `GanttChart.constants.ts` | `ROW_HEIGHT=40`, `HEADER_HEIGHT=40`, `LEFT_PANEL_WIDTH=280`, `COLUMN_WIDTH_MONTH=120`, `COLUMN_WIDTH_QUARTER=360`, `BAR_HEIGHT=16` |
| `GanttChart.tsx` | Haupt-Komponente: Store-Kontext, Scroll-Sync, Split-Layout |
| `GanttChart.test.tsx` | 9 Komponenten-Tests |
| `GanttTaskPanel.tsx` | Linkes Panel: sticky Header, Task-Zeilen mit Expand/Collapse + Status-Dot |
| `GanttTimelineHeader.tsx` | Spalten-Header (generisch: `columns: HeaderColumn[]`) |
| `GanttTimeline.tsx` | Rechtes Panel: Balken, Meilensteine, Gitterlinien, `displayRange`-Logik |
| `GanttChart.stories.tsx` | 4 Stories: Default, WeeksScale, QuartersScale, MinimalFlat |

### GanttTimeScale

```ts
export type GanttTimeScale = "days" | "weeks" | "months" | "quarters";
```

Implementiert: `months` + `quarters`. `days` und `weeks` sind im Store vorhanden aber der Header-Renderer fällt noch auf `months` zurück (Phase 3+).

---

## Wie der Storybook-Screenshot aussieht (Referenz)

Die aktuelle Storybook-Ansicht zeigt:
- Linkes Panel: "Name"-Header, Task-Zeilen mit ▶/▼, farbigem Status-Dot, Task-Name
- Rechtes Panel: Monats-/Quartals-Header, Balken nach Status-Farbe, Meilenstein-Raute
- Farben: `done` = grün (success), `in-progress` = blau (info), `planned` = orange (warning), `blocked` = rot (error)
- Milestone = Raute ◆ in `warning.main`

---

## Kritisches Wissen für alle Sessions

### 1. useMemo-Pflicht für `getVisibleTasks`

```tsx
// FALSCH — neue Array-Referenz → Endlosschleife
const visibleTasks = useGanttChartStore((s) => s.getVisibleTasks());

// RICHTIG
const taskTree = useGanttChartStore((s) => s.taskTree);
const expandedIds = useGanttChartStore((s) => s.expandedIds);
const visibleTasks = useMemo(() => getVisibleTasks(taskTree, expandedIds), [taskTree, expandedIds]);
```

### 2. displayRange für Quarters

`calculateTaskPosition` arbeitet mit `timelineRange`. Bei Quartals-Ansicht muss die Range auf Quartalsgrenzen ausgeweitet werden, damit Balken-Prozente und Spalten-Anfänge übereinstimmen. `GanttTimeline.tsx` berechnet dafür `displayRange` lokal:

```ts
if (timeScale === "quarters") {
  displayRange = { start: startOfQuarter(timelineRange.start), end: endOfQuarter(timelineRange.end) };
}
```

### 3. GanttTimelineHeader ist generisch

`GanttTimelineHeader` nimmt `columns: HeaderColumn[]` (key, label, width). `GanttTimeline` baut das Array je nach `timeScale`.

### 4. Circular Import (bewusst so)

`GanttTaskPanel` und `GanttTimeline` importieren `useGanttChartStore` aus `./GanttChart`. Das ist derselbe Pattern wie in `TagSelection`. Vite/TypeScript handeln das korrekt.

---

## Props-API

```tsx
<GanttChart
  tasks={tasks}                   // GanttTask[]
  timeScale="months"              // "days" | "weeks" | "months" | "quarters"
  height={500}                    // number | string, Default: 400
  onTaskClick={(task) => ...}
  onMilestoneClick={(task) => ...}
  onAddTask={(parentTask?) => ...}
  onDeleteTask={(task) => ...}
  onStatusChange={(task, status) => ...}
/>
```

---

## Nächste Phase: Phase 3 — Wochen-Skala + Verfeinerungen

### 3a — Wochen-Header implementieren

`GanttTimeScale = "weeks"` fällt aktuell auf months zurück. Zu implementieren:

```ts
// In gantt-chart.util.ts
export function startOfWeek(date: Date): Date { /* Montag der Woche */ }
export function getWeeksInRange(range: TimelineRange): Date[]
```

```ts
// In GanttTimeline.tsx
if (timeScale === "weeks") {
  return getWeeksInRange(displayRange).map((w) => ({
    key: w.toISOString(),
    label: `KW ${getWeekNumber(w)}`,  // oder kurzes Datum "03.03."
    width: COLUMN_WIDTH_WEEK,          // = 30px
  }));
}
```

`COLUMN_WIDTH_WEEK = 30` zu `GanttChart.constants.ts` hinzufügen.

### 3b — Status-Chip / Status-Spalte im linken Panel (optional)

Im Referenz-Screenshot gibt es neben dem Namen noch eine "Zustand"-Spalte mit Chip. Kann als zweite Spalte rechts im `GanttTaskPanel` ergänzt werden:

```tsx
<Chip
  label={task.status}
  size="small"
  color={STATUS_COLORS[task.status]}  // semantic MUI color
  sx={{ ml: "auto", mr: 1 }}
/>
```

### 3c — Zwei-Ebenen-Header für Monate (Quartals-Oberzeile + Monats-Unterzeile)

Im Referenz-Screenshot: Quartal als Oberkopf, Monate darunter. `GanttTimelineHeader` müsste eine optionale Sub-Header-Zeile bekommen:

```tsx
type HeaderColumn = {
  key: string;
  label: string;
  width: number;
  subColumns?: HeaderColumn[];  // z. B. Monate innerhalb eines Quartals
};
```

---

## Phase 4 (nächste Prio) — SVG-Abhängigkeitspfeile

SVG-Layer absolut über der Timeline (`pointer-events: none`):

```tsx
// In GanttTimeline.tsx, nach den Bar-Rows:
<svg
  style={{ position: "absolute", top: HEADER_HEIGHT, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
>
  <defs>
    <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
      <polygon points="0 0, 6 2, 0 4" fill="currentColor" />
    </marker>
  </defs>
  {dependencyLines.map(...)}
</svg>
```

Für jede `task.dependencies[]`-Beziehung:
- `startX = calculateTaskPosition(predecessor, displayRange).left + width` (rechter Rand des Vorgängers) * totalWidth / 100
- `startY = visibleTasks.indexOf(predecessor) * ROW_HEIGHT + ROW_HEIGHT / 2 + HEADER_HEIGHT`
- Linie: L-förmig (erst nach rechts, dann nach unten/oben, dann nach rechts zur Ziel-Spalte)
- Nur zeichnen wenn beide Tasks sichtbar sind (in `visibleTasks`)

---

## Phase 5 — Callback-API vollständig verdrahten

- `onAddTask` → "+" Icon in jeder Task-Zeile im linken Panel (sichtbar bei Hover)
- `onDeleteTask` → Löschen-Icon im Hover-Zustand
- `onStatusChange` → Klick auf Status-Dot → MUI `Menu` mit Status-Optionen

---

## Phase 6 — Tests + Stories abrunden

- Story `FullyExpanded` mit `expandAll()` im Store nach mount
- Tests für Wochen-Header, SVG-Pfeile (ob DOM-Element vorhanden), Callback-Aufrufe

---

## So starten wir die nächste Session

```
Bitte lies zuerst die claude-gantt-kickoff.md im Root des Projekts.
Dann implementiere Phase 3a: Wochen-Skala (getWeeksInRange, COLUMN_WIDTH_WEEK, Integration in GanttTimeline).
Danach optional Phase 3b: Status-Chip im linken Panel.
96 Tests müssen nach den Änderungen grün bleiben.
```
