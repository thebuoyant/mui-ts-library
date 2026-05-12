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

## Aktueller Stand: Phasen 1–8+i18n abgeschlossen ✅ (130 Tests grün)

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
| `GanttToolbar.tsx` | Toolbar: `ToggleButtonGroup` Skala-Switcher + `TextField type="date"` Von/Bis-Range |
| `GanttChart.stories.tsx` | 7 Stories inkl. FullyExpanded, WithDependencies, DaysScale |

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
  height={500}                    // number | string, Default: 400 (inkl. Toolbar)
  initialExpandAll={false}        // alle Knoten aufgeklappt statt nur Root
  showToolbar={true}              // Toolbar ein-/ausblenden (Standard: true)
  onTaskClick={(task) => ...}
  onMilestoneClick={(task) => ...}
  onAddTask={(parentTask?) => ...}
  onDeleteTask={(task) => ...}
  onStatusChange={(task, status) => ...}
/>
```

`GanttTask.dependencies?: string[]` — IDs der Vorgänger-Tasks (Finish-to-Start).

**Store-Aktionen (via `useGanttChartStore`):**
- `setTimelineRange(range)` — manuellen Datumsbereich setzen, setzt `isRangeCustomized = true`
- `resetTimelineRange()` — auf auto-berechneten Bereich aus Tasks zurücksetzen
- `setTimeScale(scale)` — Skala wechseln
- `setTasks(tasks)` — Tasks ersetzen (überschreibt Range nicht wenn `isRangeCustomized`)

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

---

## Phase 8 — Toolbar: Scale-Switcher + Date-Range-Controls ✅

Neue Datei `GanttToolbar.tsx` (importiert `useGanttChartStore` aus `./GanttChart` — circular OK):
- `ToggleButtonGroup` (size="small") mit 4 Skalen-Buttons: Tage / Wochen / Monate / Quartale
- `data-testid="gantt-scale-{scale}"` für Tests
- Zwei `TextField type="date"` (Von/Bis) mit timezone-sicherer Formatierung via `toDateInputValue` (lokales Datum, nicht UTC)
- Reset-Button (`RestoreIcon`) erscheint nur wenn `isRangeCustomized === true`
- `data-testid="gantt-range-start"`, `"gantt-range-end"`, `"gantt-range-reset"` für Tests

Store-Erweiterungen:
- `isRangeCustomized: boolean` — verhindert Auto-Überschreiben durch `setTasks`
- `setTimelineRange(range)` — setzt Range + `isRangeCustomized = true`
- `resetTimelineRange()` — recalculates from tasks, `isRangeCustomized = false`
- `setTasks` respektiert `isRangeCustomized` via Spread-Pattern: `...(state.isRangeCustomized ? {} : { timelineRange: getTimelineRange(tasks) })`

`GanttChart.tsx` Layout-Änderung: äußerer Container ist jetzt `flexDirection: "column"`, Split-Panel bekommt `flex: 1`. Toolbar ist oben im gleichen Border-Box-Bereich.

Kritisch: `parseDateInput("2025-03-01")` → `new Date(2025, 2, 1, 0, 0, 0, 0)` (lokale Mitternacht) — NICHT `new Date("2025-03-01")` (UTC, erzeugt Timezone-Offset-Bug).

---

## Phase 9 — CRUD Dialoge (nächste Session)

### Ziel
Built-in MUI Dialoge für Add/Edit/Delete wenn `enableBuiltinDialogs?: boolean` gesetzt.

### Neue Dateien
- `GanttTaskDialog.tsx` — MUI Dialog mit Formularfeldern für Add + Edit
- `GanttDeleteDialog.tsx` — Bestätigungs-Dialog mit Aufgabenname

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
- `GanttTaskPanel` bekommt neues `enableBuiltinDialogs` Prop; Dialog-State (`open`, `editTask`) lebt in `GanttTaskRow`

### Doppelter Hover-Icon-Satz wenn enableBuiltinDialogs
```tsx
// Hover-Icons wenn enableBuiltinDialogs:
<EditIcon />  → öffnet Edit-Dialog
<AddIcon />   → öffnet Add-Dialog (parentTask = current task)
<DeleteIcon /> → öffnet Delete-Dialog
```

### ID-Generierung
Da die Library keine IDs kennt, erzeugt sie temporäre IDs via `crypto.randomUUID()` oder ruft `onTaskCreated` mit `Omit<GanttTask, "id">` auf — der Caller vergibt die echte ID und gibt `tasks` neu zurück.

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

---

## Phase 8b — defaultRangeStart/End + i18n/Translations ✅

**Neue Props:**
- `defaultRangeStart?: Date` und `defaultRangeEnd?: Date` — initialer Sichtbereich, setzt `isRangeCustomized = true` im Store sodass `setTasks` ihn nicht überschreibt
- `translations?: Partial<GanttTranslations>` — nur abweichende Keys angeben, Rest kommt aus `DEFAULT_GANTT_TRANSLATIONS`

**`GanttTranslations` Typ (in `GanttChart.types.ts`):**
| Key | Default | Zweck |
|---|---|---|
| `scaleDays/Weeks/Months/Quarters` | Tage/Wochen/Monate/Quartale | Toolbar Skalen-Buttons |
| `rangeFrom` / `rangeTo` | Von / Bis | Toolbar Datums-Inputs |
| `rangeResetTooltip` | Bereich zurücksetzen | Reset-Button Tooltip |
| `columnName` / `columnStatus` | Name / Status | Panel-Header |
| `statusPlanned/InProgress/Done/Blocked` | Planned/In Progress/Done/Blocked | Status Chip + Menü |
| `weekColumnPrefix` | KW | Vor der Wochennummer (→ "W1" für Englisch) |
| `dateLocale` | de-DE | `toLocaleString()` in Timeline-Header |

**Translations-Kontext:** `GanttTranslationsContext` in `GanttChart.tsx`, zugänglich via `useGanttTranslations()` (exportiert). Alle Komponenten (Toolbar, Panel, Timeline) rufen diesen Hook auf.

**Kritisch:** `useMemo` für `mergedTranslations` in `GanttChart` verhindert unnötige Context-Updates. Columns-Memos haben `t.weekColumnPrefix` und `t.dateLocale` in den deps.

---

## So starten wir die nächste Session

```
Bitte lies zuerst die claude-gantt-kickoff.md im Root des Projekts.
Dann implementiere Phase 9: CRUD Dialoge.
enableBuiltinDialogs?: boolean Prop.
GanttTaskDialog.tsx für Add/Edit, GanttDeleteDialog.tsx für Delete-Bestätigung.
130 Tests müssen nach den Änderungen grün bleiben.
```
