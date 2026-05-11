# Gantt-Chart Komponente — Kickoff-Prompt für die nächste Session

## Kontext: Was dieses Projekt ist

Wir arbeiten an **`mui-ts-library`** — einer eigenen React-Komponentenbibliothek, die MUI (Material UI v7) ergänzt. Das Projekt liegt unter:

```
/Users/thomasschlender/Development-React-Components/mui-ts-library
```

### Bereits implementierte Komponenten

1. **`TagSelection`** — Multi-Tag-Picker mit Autocomplete, Chip-Anzeige, Zustand-Store und vollständiger Callback-API
2. **`PasswordStrengthMeter`** — Passwort-Eingabe mit Live-Stärkeberechnung, animiertem Meter-Balken und Anforderungsliste
3. **`GanttChart`** — Phase 1 abgeschlossen (siehe unten)

### Etablierte Patterns — diese müssen beim Gantt exakt eingehalten werden

| Pattern | Detail |
|---|---|
| **Sprache** | Code/Variablen/Methoden auf Englisch. Kommentare auf Deutsch, aber NUR wenn das WHY nicht-offensichtlich ist. Keine offensichtlichen Beschreibungen. |
| **State** | Zustand v5 Vanilla-Store via `createStore` aus `zustand/vanilla`, in React-Context verpackt |
| **Styling** | MUI `sx`-Prop, MUI-Theme-Farben (kein hardcodiertes Hex außer als expliziter Escape-Hatch) |
| **Typen** | Alle öffentlichen Typen in einer eigenen `*.types.ts`-Datei |
| **Tests** | Vitest + @testing-library/react — Tests beschreiben Verhalten, nicht Implementierung |
| **Stories** | Storybook mit `@storybook/react-vite`, MUI ThemeProvider global in `.storybook/preview.tsx` |
| **Exports** | Alles aus `src/index.ts` re-exportieren, inkl. separater `*.types.ts` |

### Tech-Stack

```
React 19, TypeScript 5.9, MUI v7, Zustand v5, Vite 8, Vitest 4, Storybook 10
```

---

## Ziel-Screenshot (microtool.de Referenz)

Das Gantt soll so aussehen:

```
┌──────────────────────────┬──────────────────────────────────────────────────────┐
│  Name          Zustand   │  Nov          Dez          Jan          Feb           │
│                          │  3  10  17  24  1   8  15  22  29   5  12  19  26    │
├──────────────────────────┼──────────────────────────────────────────────────────┤
│▼ 🔵 Hybrid agiles Projekt│  [══════════════════════════════════════════════════] │
│  ○  Ziele festlegen  ✓   │  [═══]                                               │
│  ○  Requirements Eng 🔵  │      [══════════════════════════════════════════════] │
│▼ ○  Release 1 entw.  🔵  │           [══════════════◆]                          │
│  ▼ 🔵 Team Genf Spr  🔵  │           [══════════════]                           │
│      Sprint 1.1      🔵  │           [═══]                                      │
│      Sprint 1.2      🔴  │               [═══]                                  │
│  ▷ 🔴 Team Berlin    🔴  │               [═══════]                              │
│  ◆  Release 1 Ende   🔴  │                         ◆  ← Meilenstein             │
│▷ ○  Release 2 entw.  🔴  │                         [══════════════════]         │
│  ◆  Release 2 Ende   🔴  │                                              ◆       │
└──────────────────────────┴──────────────────────────────────────────────────────┘
         (fest, kein H-Scroll)               (scrollt horizontal)
         vertikaler Scroll synchronisiert beide Seiten
```

**Nummerierte Pfeile im Screenshot** = SVG-Abhängigkeitspfeile (Phase 5).
**Rauten** = Meilensteine (`isMilestone: true` auf einem `GanttTask`).

---

## Was bisher implementiert ist (Phase 1 — FERTIG ✅)

### Dateien

| Datei | Status |
|---|---|
| `src/components/gantt-chart/GanttChart.types.ts` | ✅ fertig |
| `src/components/gantt-chart/util/gantt-chart.util.ts` | ✅ fertig |
| `src/components/gantt-chart/util/gantt-chart.util.test.ts` | ✅ 17 Tests grün |
| `src/components/gantt-chart/GanttChart.store.ts` | ✅ fertig |
| `src/components/gantt-chart/GanttChart.store.test.ts` | ✅ 11 Tests grün |
| `src/components/gantt-chart/GanttChart.tsx` | ✅ Platzhalter (einfache Task-Liste) |
| `src/components/gantt-chart/GanttChart.stories.tsx` | ✅ 3 Stories mit Mock-Daten |
| `src/index.ts` | ✅ Gantt-Exports hinzugefügt |

**Gesamt: 81 Tests, alle grün.**

### Wichtiger bekannter Bug — bereits gefixt

`getVisibleTasks()` darf NICHT als Zustand-Selector verwendet werden:

```tsx
// FALSCH — erzeugt bei jedem Render eine neue Array-Referenz → Endlosschleife
const visibleTasks = useGanttChartStore((s) => s.getVisibleTasks());

// RICHTIG — stabile Referenzen aus dem Store, Ableitung via useMemo
const taskTree = useGanttChartStore((s) => s.taskTree);
const expandedIds = useGanttChartStore((s) => s.expandedIds);
const visibleTasks = useMemo(() => getVisibleTasks(taskTree, expandedIds), [taskTree, expandedIds]);
```

**Grund:** Zustand vergleicht Selector-Rückgabewerte via `Object.is`. Jedes `getVisibleTasks()`-Call gibt ein neues Array zurück → immer "geändert" → Endlosschleife.

### Store-API (GanttChart.store.ts)

```ts
type GanttChartStoreState = {
  tasks: GanttTask[];
  taskTree: GanttTaskNode[];       // buildTaskTree(tasks), bei setTasks neu berechnet
  expandedIds: Set<string>;        // Root-Tasks standardmäßig aufgeklappt
  timeScale: GanttTimeScale;
  timelineRange: TimelineRange;    // { start: Date, end: Date }

  setTasks(tasks: GanttTask[]): void;
  toggleExpand(taskId: string): void;
  expandAll(): void;
  collapseAll(): void;
  setTimeScale(scale: GanttTimeScale): void;
  getVisibleTasks(): GanttTaskNode[];  // NUR für store-interne Nutzung, nicht als Selector!
};
```

### Util-Funktionen (gantt-chart.util.ts)

```ts
getTimelineRange(tasks): TimelineRange       // frühester Start bis spätestes Ende, startOfMonth padding
calculateTaskPosition(task, range): { left: number, width: number }  // Prozent-Werte 0–100
buildTaskTree(tasks): GanttTaskNode[]        // Flat-Liste → verschachtelter Baum mit depth-Property
getVisibleTasks(nodes, expandedIds): GanttTaskNode[]  // Flachliste der sichtbaren Knoten
startOfMonth(date): Date
endOfMonth(date): Date
addMonths(date, months): Date
getMonthsInRange(range): Date[]              // Für Timeline-Header
```

### Mock-Daten (GanttChart.stories.tsx)

Software-Projekt "E-Commerce Platform v2.0", März–Juni 2025:
- Projekt-Root → Release 1 (Backend API, März–April) + Release 2 (Frontend, Mai–Juni)
- Je 2 Teams (Alpha/Beta) mit je 2 Sprints
- Meilenstein "Go-Live" am 30.06.2025
- Statuse: done / in-progress / planned gemischt

---

## Nächste Schritte: Phase 2 — Split-Panel-Layout

### Ziel

Den Platzhalter in `GanttChart.tsx` durch das echte Split-Layout ersetzen:
- Links: fixe Breite (~280px), keine horizontale Scroll, vertikaler Scroll per Ref gesteuert
- Rechts: horizontaler Scroll (Timeline), vertikaler Scroll synchronisiert mit links

### Konkrete Implementierung

**Outer Container:**
```tsx
<Box sx={{ display: "flex", overflow: "hidden", height: "100%", border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
  <GanttTaskPanel />   {/* links, fix */}
  <GanttTimeline />    {/* rechts, scrollt */}
</Box>
```

**Scroll-Synchronisation:**
```tsx
// Beide Panels bekommen ein Ref auf ihren scroll-container
const leftRef = useRef<HTMLDivElement>(null);
const rightRef = useRef<HTMLDivElement>(null);

// Right → Left sync (nur vertikaler Scroll)
const handleRightScroll = () => {
  if (leftRef.current && rightRef.current) {
    leftRef.current.scrollTop = rightRef.current.scrollTop;
  }
};
// Left → Right sync (nur vertikaler Scroll)
const handleLeftScroll = () => {
  if (leftRef.current && rightRef.current) {
    rightRef.current.scrollTop = leftRef.current.scrollTop;
  }
};
```

> **Wichtig:** Kein Feedback-Loop möglich, da Browser `scrollTop`-Zuweisung ohne `onScroll` feuern.

**Timeline-Header (GanttTimelineHeader):**
```tsx
// Monate aus getMonthsInRange(timelineRange) — bereits in util
// Jeder Monat bekommt columnWidth px Breite
// Sub-Header: Wochen (getWeeksInRange) oder Tage je nach timeScale
```

**Zeilenbreite:**
- Jede Zeile in der Timeline muss dieselbe Höhe haben wie links (z. B. `ROW_HEIGHT = 40`)
- `ROW_HEIGHT` als Konstante in `GanttChart.constants.ts` oder direkt in der Komponente

### Neue Dateien für Phase 2

```
src/components/gantt-chart/
  GanttChart.tsx              ← Haupt-Komponente, ersetzt Platzhalter
  GanttTaskPanel.tsx          ← linke Spalte (Name + Status)
  GanttTimeline.tsx           ← rechte Seite (Header + Balken-Zeilen)
  GanttTimelineHeader.tsx     ← Monats-/Wochen-Header
  GanttChart.constants.ts     ← ROW_HEIGHT, LEFT_PANEL_WIDTH, COLUMN_WIDTH_MONTH, etc.
```

### Timeline-Breite berechnen

```ts
// Anzahl Monate × Pixel pro Monat
const months = getMonthsInRange(timelineRange); // bereits implementiert
const totalWidth = months.length * COLUMN_WIDTH_MONTH;
```

---

## Phase 3 — Task-Panel (linke Spalte)

Komponente `GanttTaskPanel.tsx`:

```tsx
// Jede Zeile:
<Box sx={{ display: "flex", alignItems: "center", height: ROW_HEIGHT, pl: 1 + depth * 2 }}>
  {/* Expand/Collapse-Button wenn children.length > 0 */}
  <StatusDot status={task.status} />
  <Typography noWrap>{task.name}</Typography>
  {/* Optional: + Button für onAddTask, Löschen-Icon für onDeleteTask */}
</Box>
```

**StatusDot-Farben (MUI semantic colors):**
```ts
const STATUS_COLORS: Record<GanttTaskStatus, string> = {
  "planned":     "warning.main",
  "in-progress": "info.main",
  "done":        "success.main",
  "blocked":     "error.main",
};
```

---

## Phase 4 — Balken-Rows (rechte Seite)

Komponente `GanttTimelineRow.tsx` (eine Zeile pro sichtbarem Task):

```tsx
// Balken-Position via calculateTaskPosition (bereits implementiert)
const { left, width } = calculateTaskPosition(task, timelineRange);

// Normaler Balken:
<Box sx={{
  position: "absolute",
  left: `${left}%`,
  width: `${width}%`,
  height: BAR_HEIGHT,           // z. B. 16px
  top: (ROW_HEIGHT - BAR_HEIGHT) / 2,
  bgcolor: STATUS_BGCOLOR[task.status],  // MUI theme colors
  borderRadius: 1,
}} />

// Meilenstein statt Balken:
<Box sx={{
  position: "absolute",
  left: `${left}%`,
  width: 12, height: 12,
  top: (ROW_HEIGHT - 12) / 2,
  bgcolor: "warning.main",
  transform: "rotate(45deg)",  // Raute
}} />
```

---

## Phase 5 — SVG-Abhängigkeitspfeile

SVG-Layer absolut über der Timeline (`pointer-events: none`):

```tsx
// Für jede dependency-Beziehung:
// - Quell-Task (predecessor) → Ziel-Task (successor)
// - Y-Position: Zeilen-Index × ROW_HEIGHT + ROW_HEIGHT/2
// - X-Position der Quell-Linie: calculateTaskPosition(predecessor).left + width
// - X-Position der Ziel-Linie: calculateTaskPosition(successor).left
// Pfeilspitze via SVG <marker>
```

---

## Phase 6 — Callback-API verdrahten

Alle Props optional:
- `onTaskClick` — Klick auf Task-Zeile oder Balken
- `onMilestoneClick` — Klick auf Meilenstein-Raute
- `onAddTask(parentTask?)` — "+" Button in der Zeile
- `onDeleteTask(task)` — Löschen-Icon
- `onStatusChange(task, status)` — Klick auf Status-Dot → MUI Menu mit Status-Optionen

---

## Phase 7 — Tests + Stories abrunden

- Story `FullProject` mit komplettem Mock-Datensatz und allen Callbacks als `console.log`
- Tests für Balken-Rendering, Meilenstein-Rendering, Callback-Aufrufe
- Tests für Scroll-Sync brauchen jsdom — ggf. überspringen und nur Store/Util testen

---

## So starten wir die nächste Session

```
Bitte lies zuerst die claude-gantt-kickoff.md im Root des Projekts.
Dann starte Phase 2: Split-Panel-Layout mit Scroll-Synchronisation und Timeline-Header.
GanttChart.tsx (Platzhalter) soll durch das echte Layout ersetzt werden.
Halte dich genau an die etablierten Patterns und die Implementierungsdetails in der Kickoff-Datei.
```

---

## Wichtige Hinweise für jede Session

1. **useMemo für abgeleitete Listen** — niemals `getVisibleTasks()` direkt als Zustand-Selector (neue Array-Referenz → Endlosschleife)
2. **Immer Tests mitschreiben** — kein Feature ohne Test
3. **Kommentare nur auf Deutsch und nur für nicht-offensichtliche WHYs**
4. **Farben immer via MUI `color`-Prop oder Theme** — kein hardcodiertes Hex
5. **SVG-Schicht ist Phase 5** — erst Layout und Balken stabilisieren, dann Pfeile
6. **81 Tests müssen nach jeder Phase weiter grün bleiben**
