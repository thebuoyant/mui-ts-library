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
| **Tests** | Vitest + @testing-library/react — Tests beschreiben Verhalten, nie Implementierung |
| **Stories** | Storybook mit `@storybook/react-vite`, MUI ThemeProvider global in `.storybook/preview.tsx` |
| **Exports** | Alles aus `src/index.ts` re-exportieren |

### Tech-Stack

```
React 19, TypeScript 5.9, MUI v7, Zustand v5, Vite 8, Vitest 4, Storybook 10
```

---

## Aktueller Stand: Phasen 1–7 abgeschlossen ✅ (120 Tests grün)

### Alle vorhandenen Dateien

| Datei | Inhalt |
|---|---|
| `GanttChart.types.ts` | `GanttTaskStatus`, `GanttTimeScale`, `GanttTask`, `GanttTaskNode`, `GanttChartProps` |
| `GanttChart.store.ts` | Zustand-Store: `tasks`, `taskTree`, `expandedIds`, `timeScale`, `timelineRange` |
| `GanttChart.store.test.ts` | 11 Store-Tests |
| `GanttChart.constants.ts` | alle Layout-Konstanten |
| `util/gantt-chart.util.ts` | Datum- und Baum-Hilfsfunktionen |
| `util/gantt-chart.util.test.ts` | 34 Util-Tests |
| `GanttChart.tsx` | Haupt-Komponente: Store-Kontext, Scroll-Sync, Split-Layout |
| `GanttChart.test.tsx` | 14 Komponenten-Tests (inkl. SVG-Pfeil-Tests) |
| `GanttTaskPanel.tsx` | Linkes Panel: Expand/Collapse, Status-Dot, Name, Status-Chip |
| `GanttTimelineHeader.tsx` | Generischer Spalten-Header: `columns: HeaderColumn[]` |
| `GanttTimeline.tsx` | Rechtes Panel: Balken, Meilensteine, Gitterlinien, SVG-Pfeile |
| `GanttTaskPanel.tsx` | Linkes Panel inkl. `GanttTaskRow` Sub-Komponente mit Hover-Icons + Status-Menü |
| `GanttChart.stories.tsx` | 4 Stories (Default hat `dependencies` auf release-2 und milestone-go-live) |

### GanttTimeScale — implementierter Stand

| Skala | Status | Spaltenbreite |
|---|---|---|
| `months` | ✅ | `COLUMN_WIDTH_MONTH = 120px` |
| `quarters` | ✅ | `COLUMN_WIDTH_QUARTER = 360px` |
| `weeks` | ✅ | `COLUMN_WIDTH_WEEK = 40px` |
| `days` | ✅ | `COLUMN_WIDTH_DAY = 20px` |

### Konstanten (GanttChart.constants.ts)

```ts
ROW_HEIGHT = 40
HEADER_HEIGHT = 40
LEFT_PANEL_WIDTH = 280
COLUMN_WIDTH_DAY = 20
COLUMN_WIDTH_WEEK = 40
COLUMN_WIDTH_MONTH = 120
COLUMN_WIDTH_QUARTER = 360
BAR_HEIGHT = 16
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
const visibleTasks = useMemo(() => getVisibleTasks(taskTree, expandedIds), [taskTree, expandedIds]);
```

### 2. displayRange — Skala-Ausweitung in GanttTimeline

```ts
if (timeScale === "weeks")    displayRange.start = startOfWeek(timelineRange.start);
if (timeScale === "quarters") displayRange = { start: startOfQuarter(...), end: endOfQuarter(...) };
// "months" braucht keine Anpassung (timelineRange.start ist bereits startOfMonth)
```

### 3. SVG-Abhängigkeitspfeile

Implementiert in `GanttTimeline.tsx`:
- `computeDependencyLines(visibleTasks, displayRange, totalWidth)` — berechnet L-förmige Pfade für alle sichtbaren Finish-to-Start-Abhängigkeiten
- Pfad: `M x1 y1 H midX V y2 H x2` (rechter Rand Vorgänger → Wendepunkt → linker Rand Nachfolger)
- `midX = x1 + Math.max((x2 - x1) / 2, 16)` — funktioniert auch bei Rückwärts-Abhängigkeiten
- SVG-Layer: `position: absolute, top: HEADER_HEIGHT, pointerEvents: none` — Klicks gehen durch
- `useId()` für einzigartige Marker-ID pro Instanz (verhindert Konflikte bei mehreren GanttCharts)
- Sichtbarkeitsfilter: `visibleIndexMap` (Map, O(n)) — nicht-sichtbare Vorgänger erzeugen keinen Pfeil
- Pfeile verschwinden automatisch wenn Vorgänger eingeklappt wird (da `visibleTasks` sich ändert)

### 4. GanttTimelineHeader ist generisch

`columns: HeaderColumn[]` (key, label, width). `GanttTimeline` baut das Array je nach `timeScale`.

### 5. Circular Import (bewusst)

`GanttTaskPanel` und `GanttTimeline` importieren `useGanttChartStore` aus `./GanttChart`. Identisch mit TagSelection-Pattern.

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

`GanttTask.dependencies?: string[]` — IDs der Vorgänger-Tasks (Finish-to-Start).

---

## Phase 5 — Callback-API vollständig verdrahten ✅

Implementiert in `GanttTaskPanel.tsx`:
- `GanttTaskRow` Sub-Komponente mit eigenem `anchorEl`-State für das Status-Menü
- Hover-Icons (`Add`, `Delete`) via `className="gantt-task-row"` + `.gantt-task-row:hover &` CSS-Selektor, `opacity: 0/1`
- Status-Chip öffnet bei Klick ein MUI `Menu` mit allen 4 Status-Optionen
- `e.stopPropagation()` bei allen Icon- und Chip-Klicks
- `data-testid="gantt-add-task-{id}"` / `"gantt-delete-task-{id}"` für Tests
- `GanttChartInner` leitet `onAddTask`, `onDeleteTask`, `onStatusChange` an `GanttTaskPanel` weiter

---

## Phase 6 — `days`-Skala + Zwei-Ebenen-Header ✅

Implementiert in `GanttTimeline.tsx` + `GanttTimelineHeader.tsx`:
- `getDaysInRange` in `util/gantt-chart.util.ts` — liefert alle Tage (Mitternacht) zwischen Start und Ende
- `COLUMN_WIDTH_DAY = 20px` in `GanttChart.constants.ts`
- `GanttTimelineHeader` unterstützt optional `groups?: HeaderGroup[]` — wenn gesetzt, wird eine zweite Zeile oben gerendert (Monatsüberschriften über Tages-Spalten)
- `GanttTimeline` berechnet `groups` für `days`-Skala via Gruppierung nach Monat
- `headerTotalHeight = groups ? HEADER_HEIGHT * 2 : HEADER_HEIGHT` — SVG-Layer (`top`) passt sich korrekt an
- Story `DaysScale` hinzugefügt
- Pre-existing TS-Fehler behoben: `RefObject<HTMLDivElement | null>` in Panel + Timeline Props
- Kritisches Wissen: `displayRange` für `days` braucht keine Anpassung — `timelineRange.start` ist bereits `startOfMonth` (= Tag 1 Mitternacht)

---

## Phase 7 — Stories + Tests abrunden ✅

Neues Prop `initialExpandAll?: boolean` in `GanttChartProps`:
- `createGanttChartStore` akzeptiert `initialExpandAll` als 3. Parameter — initialisiert `expandedIds` mit allen Task-IDs statt nur Root-IDs
- `GanttChart` leitet `initialExpandAll` an den Store-Konstruktor weiter (kein `useEffect` nötig)

Stories:
- `FullyExpanded`: `initialExpandAll={true}`, `height: 700`, zeigt alle 4 Hierarchie-Ebenen
- `WithDependencies`: 7 flache Tasks mit Fan-in, Fan-out und Ketten-Abhängigkeiten (design, research → dev+docs → testing → release → go-live milestone)

Tests: `initialExpandAll` zeigt Grandchild-Tasks die ohne das Flag eingeklappt wären

---

## So starten wir die nächste Session

Phasen 1–7 sind vollständig abgeschlossen. Das Gantt ist feature-complete.
Nächste mögliche Schritte: Drag-and-Drop (Balken verschieben), `today`-Markierung als vertikale Linie, oder Export als PNG/SVG.
