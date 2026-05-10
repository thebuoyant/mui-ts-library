# Gantt-Chart Komponente — Kickoff-Prompt für die nächste Session

## Kontext: Was dieses Projekt ist

Wir arbeiten an **`mui-ts-library`** — einer eigenen React-Komponentenbibliothek, die MUI (Material UI v7) ergänzt. Das Projekt liegt unter:

```
/Users/thomasschlender/Development-React-Components/mui-ts-library
```

### Bereits implementierte Komponenten

1. **`TagSelection`** — Multi-Tag-Picker mit Autocomplete, Chip-Anzeige, Zustand-Store und vollständiger Callback-API
2. **`PasswordStrengthMeter`** — Passwort-Eingabe mit Live-Stärkeberechnung, animiertem Meter-Balken und Anforderungsliste

### Etablierte Patterns — diese müssen beim Gantt exakt eingehalten werden

| Pattern | Detail |
|---|---|
| **Sprache** | Code/Variablen/Methoden auf Englisch. Kommentare auf Deutsch, aber NUR wenn das WHY nicht-offensichtlich ist. Keine offensichtlichen Beschreibungen. |
| **State** | Zustand (Zustand v5, Vanilla-Store) via `createStore` aus `zustand/vanilla`, in einen React-Context verpackt |
| **Styling** | MUI `sx`-Prop, MUI-Theme-Farben (kein hardcodiertes Hex außer als expliziter Escape-Hatch) |
| **Typen** | Alle öffentlichen Typen in einer eigenen `*.types.ts`-Datei (nicht im Komponent-File) |
| **Tests** | Vitest + @testing-library/react — Tests beschreiben Verhalten, nicht Implementierung |
| **Stories** | Storybook mit `@storybook/react-vite`, MUI ThemeProvider ist global in `.storybook/preview.tsx` |
| **Exports** | Alles aus `src/index.ts` re-exportieren, inkl. separater `*.types.ts` |
| **Dateistruktur** | `src/components/gantt-chart/GanttChart.tsx`, `GanttChart.types.ts`, `GanttChart.store.ts`, Sub-Komponenten, `.test.tsx`, `.stories.tsx` |

### Tech-Stack

```
React 19, TypeScript 5.9, MUI v7, Zustand v5, Vite 8, Vitest 4, Storybook 10
```

---

## Was wir für den Gantt-Chart entschieden haben

### Scope (bewusst eingeschränkt — kein Drag & Drop)

- ✅ Hierarchischer Task-Baum links (expand/collapse)
- ✅ Timeline rechts mit Monats-/Wochen-Skala
- ✅ Balken farbig nach Status
- ✅ SVG-Abhängigkeitspfeile zwischen Tasks
- ✅ Meilenstein-Marker (Rauten)
- ✅ Scroll-Synchronisation (linke Tabelle + rechte Timeline)
- ✅ Klick-Interaktionen → Callbacks nach außen (Dialoge liegen beim Aufrufer)
- ✅ Backend-Daten kommen via `tasks`-Prop rein
- ❌ Kein Drag & Drop (bewusst ausgeschlossen)
- ❌ Keine eingebetteten Dialoge (die Komponente feuert nur Callbacks)

### Referenz-Screenshot

Das Ziel orientiert sich am Gantt-Chart von microtool.de — Screenshot zeigt:
- Linke Spalten: Name, Zustand (mit farbigen Status-Dots)
- Rechte Timeline: Monate als Spalten, farbige Balken, Abhängigkeitspfeile, Meilenstein-Rauten
- Toolbar oben mit Zoom-Buttons
- Hierarchie: Projekt → Releases → Teams → Sprints (beliebig tief verschachtelbar)

### Geplante Props-API

```tsx
<GanttChart
  tasks={tasks}                              // GanttTask[] — kommt vom Backend
  timeScale="months"                         // "days" | "weeks" | "months"
  onTaskClick={(task) =>                     // Klick auf Task-Zeile oder Balken
    openEditDialog(task)}
  onMilestoneClick={(milestone) =>           // Klick auf Meilenstein-Raute
    openMilestoneDialog(milestone)}
  onAddTask={(parentTask?) =>                // Klick auf "+" in einer Zeile
    openCreateDialog(parentTask)}
  onDeleteTask={(task) =>                    // Klick auf Löschen-Icon
    confirmDelete(task)}
  onStatusChange={(task, status) =>          // Klick auf Status-Dot → Dropdown
    patchBackend(task.id, status)}
/>
```

---

## Implementierungsplan (Phasen)

### Phase 1 — Typen, Store, Mock-Daten (Start hier!)

**`GanttChart.types.ts`** — mindestens diese Typen:

```ts
type GanttTaskStatus = "planned" | "in-progress" | "done" | "blocked";

type GanttTask = {
  id: string;
  parentId?: string;        // null = Root-Task
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  dependencies?: string[];  // IDs anderer Tasks
  isMilestone?: boolean;
};

type GanttMilestone = {     // oder isMilestone auf GanttTask
  id: string;
  name: string;
  date: Date;
  taskId: string;           // zu welchem Task gehört er
};
```

**`GanttChart.store.ts`** — Vanilla Zustand-Store mit:
- `tasks: GanttTask[]`
- `expandedIds: Set<string>` (welche Tasks aufgeklappt sind)
- `timeScale: "days" | "weeks" | "months"`
- `setTasks`, `toggleExpand`, `setTimeScale`

**Mock-Daten** — analog zu den sampleTags in TagSelection.stories.tsx, z. B. ein Software-Projekt mit 2–3 Releases, je 2 Teams, je 2–3 Sprints. Abdeckung: ca. 4 Monate Zeitraum.

### Phase 2 — Layout

- Split-Panel: linke Spalte fix (min-width ~280px), rechte Timeline scrollt horizontal
- Vertikaler Scroll synchronisiert beide Seiten (`onScroll` event weiterleiten)
- Timeline-Header: Monate als Spalten, Tage/Wochen als Unterteilung

### Phase 3 — Task-Baum (links)

- Hierarchische Liste aus `tasks` aufbauen (parentId-Beziehungen)
- Expand/Collapse per Store-Action
- Status-Dot (farbiger Kreis nach `GanttTaskStatus`)
- Indent je Tiefe-Level

### Phase 4 — Balken (rechts)

- Balken-Position = `(startDate - timelineStart) / totalDuration * 100%`
- Balken-Breite = `(endDate - startDate) / totalDuration * 100%`
- Farbe nach Status (MUI semantic colors: `success`, `warning`, `error`, `info`)
- Meilenstein: Raute-Icon (`Transform` oder eigenes SVG) statt Balken

### Phase 5 — SVG-Abhängigkeitspfeile

- SVG-Layer über der gesamten Timeline (absolute positioned, pointer-events: none)
- Für jede Abhängigkeit: Linie von rechtem Rand des Vorgängers zum linken Rand des Nachfolgers
- Mit Pfeilspitze (SVG `marker`)
- Neu berechnen wenn Expand/Collapse sich ändert

### Phase 6 — Callback-API

- Alle Klick-Handler in `GanttChart.tsx` verdrahten
- Props optional (`onTaskClick?`, etc.) — Komponente funktioniert auch ohne Callbacks

### Phase 7 — Tests + Stories

- Story mit vollständigen Mock-Daten und `console.log`-Callbacks
- Tests für: Expand/Collapse, Store-Logik, Balken-Positionsberechnung (Unit-Test der Util-Funktion), Callback-Aufrufe

---

## Wichtige Hinweise für die Session

1. **Immer Tests mitschreiben** — kein Feature ohne Test
2. **Kommentare nur auf Deutsch und nur für nicht-offensichtliche WHYs** — keine offensichtlichen Beschreibungen wie `// renders the task list`
3. **Farben immer via MUI `color`-Prop oder Theme** — kein hardcodiertes Hex
4. **`TagColor`-Typ aus `TagSelection.types.ts`** kann für Status-Farben wiederverwendet werden
5. **Die SVG-Schicht** ist der technisch schwierigste Teil — erst alle anderen Phasen stabilisieren, dann Pfeile
6. **Datum-Arithmetik** in eine eigene `gantt-chart.util.ts` auslagern (analog zu `password-strength.util.ts`) — diese Funktionen sind isoliert testbar

---

## So starten wir

```
Bitte lies zuerst die claude-gantt-kickoff.md im Root des Projekts.
Dann starte Phase 1: Typen, Store und Mock-Daten für die GanttChart-Komponente.
Halte dich genau an die etablierten Patterns des Projekts.
```
