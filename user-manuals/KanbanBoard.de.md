# KanbanBoard — Benutzerhandbuch

> [English version →](KanbanBoard.md)

**Ein Drag-and-Drop-Kanban-Board mit eingebauten CRUD-Dialogen, WIP-Limits und vollständiger i18n — direkt einsetzbar in jede React-App.** `KanbanBoard` eignet sich für Task-Management-Dashboards, Sprint-Boards oder jeden Workflow, bei dem Nutzer Aufgaben zwischen Statusspalten verschieben sollen.

## Überblick

`KanbanBoard` zeigt eine horizontale Reihe von Spalten, die jeweils eine Liste von Karten enthalten. Nutzer können Karten per Drag & Drop zwischen Spalten verschieben, Karten innerhalb einer Spalte neu sortieren und Karten über eingebaute Dialoge (Hinzufügen / Bearbeiten / Löschen) verwalten.

### Was macht die Komponente?

- **Spalten** zeigen einen Header mit Farbbalken, einem Anzahl-Chip und einem optionalen WIP-Limit-Indikator.
- **Karten** zeigen den Aufgabentitel und optionale Meta-Chips (Zuständige Person, Fälligkeitsdatum). Pro Karte kann ein farbiger linker Rahmen gesetzt werden.
- **Prioritäts-Punkte**: `priority` an einer Aufgabe setzen — ein farbiger Punkt erscheint neben dem Titel (`"low"` → grün, `"medium"` → orange, `"high"` → rot, `"critical"` → lila).
- **Überfälligkeits-Warnung**: Karten mit einem `dueDate` in der Vergangenheit erhalten automatisch einen roten Chip, Hintergrundton und linken Rahmen — steuerbar über `showDueDateWarning`.
- **Filter / Suche**: `filterText`-String übergeben, um sichtbare Karten nach Titel oder Zuständiger Person einzuschränken — das Suchfeld liegt beim Consumer.
- **Drag & Drop** (via `@dnd-kit`): Karte greifen und in eine beliebige Spalte ziehen. Neuordnung innerhalb einer Spalte wird ebenfalls unterstützt.
- **Eingebaute Dialoge**: Klick auf eine Karte öffnet den Bearbeiten-Dialog; Klick auf „+ Karte hinzufügen" in einer Spalte öffnet den Hinzufügen-Dialog. Ein Lösch-Bestätigungsdialog ist über den Bearbeiten-Dialog erreichbar.
- **WIP-Limits**: `wipLimit` an einer Spalte setzen — der Anzahl-Chip wird rot, wenn das Limit überschritten wird.
- **Tastatur-Sensor**: Karten sind auch per Tastatur zugänglich (`Leertaste` zum Aufnehmen, Pfeiltasten zur Navigation, `Leertaste`/`Enter` zum Ablegen).

---

## Schnellstart

```tsx
import { KanbanBoard } from "mui-ts-library";
import type { KanbanColumn, KanbanTask } from "mui-ts-library";

const columns: KanbanColumn[] = [
  { id: "todo",        label: "Zu erledigen", color: "#9e9e9e" },
  { id: "in-progress", label: "In Arbeit",    color: "#2196f3" },
  { id: "done",        label: "Erledigt",     color: "#4caf50" },
];

const [tasks, setTasks] = useState<KanbanTask[]>([
  { id: "1", title: "Projekt aufsetzen",   status: "todo",        assignee: "Alice" },
  { id: "2", title: "Feature umsetzen",    status: "in-progress", assignee: "Bob", dueDate: new Date("2026-08-01") },
  { id: "3", title: "Tests schreiben",     status: "done" },
]);

<KanbanBoard
  columns={columns}
  tasks={tasks}
  onTasksChange={setTasks}
  height={500}
/>
```

Jede Drag-and-Drop-Aktion sowie jedes Hinzufügen, Bearbeiten und Löschen ruft `onTasksChange` mit der vollständigen aktualisierten Task-Liste auf — der State bleibt automatisch synchron.

---

## Props

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `tasks` | `KanbanTask[]` | — | **Pflichtfeld.** Die aktuelle Aufgabenliste. `status` jeder Aufgabe muss mit einer `KanbanColumn.id` übereinstimmen. |
| `columns` | `KanbanColumn[]` | — | **Pflichtfeld.** Die anzuzeigenden Spalten von links nach rechts. |
| `onTasksChange` | `(tasks: KanbanTask[]) => void` | — | Wird nach jeder CRUD-Aktion und nach Drag & Drop mit der vollständigen aktualisierten Liste aufgerufen. |
| `onCardClick` | `(task: KanbanTask) => void` | — | Wird beim Klick auf eine Karte aufgerufen, wenn `enableBuiltinDialogs` den Wert `false` hat. |
| `enableBuiltinDialogs` | `boolean` | `true` | Eingebaute Hinzufügen-/Bearbeiten-/Löschen-Dialoge anzeigen. `false` setzen, um eigene Dialoge über `onCardClick` zu implementieren. |
| `onTaskCreated` | `(task: KanbanTask) => void` | — | Wird aufgerufen, nachdem eine neue Karte über den Hinzufügen-Dialog gespeichert wurde. |
| `onTaskUpdated` | `(task: KanbanTask) => void` | — | Wird aufgerufen, nachdem eine vorhandene Karte über den Bearbeiten-Dialog gespeichert wurde. |
| `onTaskDeleted` | `(taskId: string) => void` | — | Wird aufgerufen, nachdem eine Karte über die Löschbestätigung gelöscht wurde. |
| `onTaskMoved` | `(task: KanbanTask, fromColumnId: string, toColumnId: string) => void` | — | Wird aufgerufen, wenn eine Karte per Drag & Drop in eine **andere Spalte** verschoben wird. Feuert nicht bei Neuordnung innerhalb derselben Spalte oder bei dialog-basierter Status-Änderung — dafür ist `onTaskUpdated` zuständig. |
| `filterText` | `string` | `""` | Filtert sichtbare Karten nach Titel und Zuständiger Person (Groß-/Kleinschreibung egal, Substring-Suche). Der Consumer rendert das Suchfeld selbst und übergibt den String. Spalten-Counter zeigen die gefilterte Anzahl; WIP-Limit-Prüfungen nutzen immer die ungefilterte Gesamtanzahl. |
| `showPriority` | `boolean` | `true` | Prioritäts-Punkt auf Karten anzeigen. Keine Wirkung wenn eine Karte kein `priority`-Feld hat. |
| `showAssignee` | `boolean` | `true` | Zuständige-Person-Chip auf Karten anzeigen. |
| `showDueDate` | `boolean` | `true` | Fälligkeitsdatum-Chip auf Karten anzeigen. |
| `showDueDateWarning` | `boolean` | `true` | Wenn `true`, werden Karten mit einem `dueDate` in der Vergangenheit hervorgehoben: Der Datums-Chip wird rot und die Karte erhält einen roten Hintergrundton + linken Rahmen. Mit `false` deaktivieren. Ohne Wirkung wenn `showDueDate` den Wert `false` hat. |
| `chipVariant` | `"outlined" \| "filled"` | `"outlined"` | MUI-Chip-Variante für Zuständige-Person- und Fälligkeitsdatum-Chips. `"outlined"` = dezenter Rahmen; `"filled"` = solider Hintergrund. |
| `width` | `number \| string` | `"100%"` | Breite des Boards. Fixer Pixelwert oder beliebige CSS-Länge. |
| `height` | `number \| string` | `"100%"` | Höhe des Boards. Fixer Pixelwert oder beliebige CSS-Länge. |
| `translation` | `Partial<KanbanBoardTranslation>` | — | Beliebige Beschriftungen überschreiben. Nicht gesetzte Keys fallen auf englische Standardwerte zurück. |

---

## Typ KanbanTask

```ts
type KanbanTask = {
  id:           string;              // eindeutige ID
  title:        string;              // Kartentitel
  status:       string;              // muss mit einer KanbanColumn.id übereinstimmen
  description?: string;              // optionaler Langtext (wird im Bearbeiten-Dialog angezeigt)
  assignee?:    string;              // wird als Chip auf der Karte angezeigt
  color?:       string;              // linke Rahmenfarbe — beliebiger CSS-Farbwert
  dueDate?:     Date;                // wird als Chip auf der Karte angezeigt
  priority?:    KanbanTaskPriority;  // farbiger Punkt neben dem Titel
};

type KanbanTaskPriority = "low" | "medium" | "high" | "critical";
```

### Prioritätsfarben

| Wert | Farbe | Hex |
|---|---|---|
| `"low"` | Grün | `#4caf50` |
| `"medium"` | Orange | `#ff9800` |
| `"high"` | Rot | `#f44336` |
| `"critical"` | Lila | `#9c27b0` |

## Typ KanbanColumn

```ts
type KanbanColumn = {
  id:        string;    // eindeutig — muss mit KanbanTask.status-Werten übereinstimmen
  label:     string;    // Spaltenüberschrift
  color?:    string;    // Akzentfarbe des Farbstreifens im Spalten-Header (beliebiger CSS-Farbwert)
  wipLimit?: number;    // optionales WIP-Limit — Chip wird rot wenn überschritten
};
```

---

## Board selbst steuern (`enableBuiltinDialogs={false}`)

Wenn eigene Dialoge implementiert werden sollen, `enableBuiltinDialogs={false}` setzen. Der „+"-Button wird ausgeblendet; ein Klick auf eine Karte löst `onCardClick` aus statt den eingebauten Dialog zu öffnen.

```tsx
<KanbanBoard
  columns={columns}
  tasks={tasks}
  onTasksChange={setTasks}
  enableBuiltinDialogs={false}
  onCardClick={(task) => meineEigeneSeitenleiste(task)}
/>
```

---

## Auf Spalten-Wechsel reagieren (`onTaskMoved`)

`onTaskMoved` feuert ausschließlich, wenn eine Karte per Drag & Drop in eine andere Spalte gezogen wird. Der Callback liefert die vollständige aktualisierte Karte sowie beide Spalten-IDs — kein Full-List-Diff nötig.

```tsx
<KanbanBoard
  columns={columns}
  tasks={tasks}
  onTasksChange={setTasks}
  onTaskMoved={(task, fromColumnId, toColumnId) => {
    // Gezielter Status-Update ohne Full-List-Diff
    api.patch(`/tasks/${task.id}`, { status: task.status });

    // Business-Logik basierend auf dem Übergang
    if (toColumnId === "done") {
      slack.notify(`"${task.title}" wurde als erledigt markiert.`);
    }

    // Undo-Unterstützung
    undoStack.push({
      label: `"${task.title}" zurück nach ${fromColumnId}`,
      undo: () => api.patch(`/tasks/${task.id}`, { status: fromColumnId }),
    });
  }}
/>
```

**Wann feuert welcher Callback?**

| Aktion | `onTasksChange` | `onTaskUpdated` | `onTaskMoved` |
|---|---|---|---|
| Karte in andere Spalte gezogen | ✓ | — | ✓ |
| Karte innerhalb Spalte neu sortiert | ✓ | — | — |
| Karte über Bearbeiten-Dialog gespeichert | ✓ | ✓ | — |
| Status über Bearbeiten-Dialog geändert | ✓ | ✓ | — |
| Neue Karte hinzugefügt | ✓ | — | — |
| Karte gelöscht | ✓ | — | — |

---

## Prioritäts-Indikatoren (`showPriority`)

`priority` an einem `KanbanTask` setzen, um einen kleinen farbigen Punkt links neben dem Kartentitel anzuzeigen. Der Punkt erscheint wenn `showPriority` den Wert `true` hat (Standard).

```tsx
const tasks: KanbanTask[] = [
  { id: "1", title: "Prod-Ausfall beheben",  status: "todo", priority: "critical" },
  { id: "2", title: "Sicherheits-Patch",     status: "todo", priority: "high" },
  { id: "3", title: "Performance verbessern",status: "in-progress", priority: "medium" },
  { id: "4", title: "Readme aktualisieren",  status: "todo", priority: "low" },
  { id: "5", title: "Keine Priorität",       status: "todo" },  // kein Punkt
];

<KanbanBoard columns={columns} tasks={tasks} />
```

Mit `showPriority={false}` alle Punkte ausblenden ohne die Daten zu verändern:

```tsx
<KanbanBoard columns={columns} tasks={tasks} showPriority={false} />
```

**Hinweise:**
- Karten ohne `priority`-Feld zeigen keinen Punkt — unabhängig von `showPriority`.
- Der Punkt ist barrierefrei: `role="img"` und `aria-label="Priority: {level}"`.
- Die CSS-Klasse `MuiTsKanbanBoard-cardPriorityDot` ermöglicht eigenes Styling per Plain CSS.

---

## Überfälligkeits-Warnung (`showDueDateWarning`)

Wenn `showDueDateWarning` den Wert `true` hat (Standard), wird jede Karte deren `dueDate` vor dem heutigen Tag liegt automatisch hervorgehoben:

- Der Fälligkeitsdatum-Chip wird rot (`color="error"` — funktioniert mit beiden Chip-Varianten `"outlined"` und `"filled"`).
- Die Karte erhält einen subtilen roten Hintergrundton.
- Ein 4 px roter linker Rahmen wird hinzugefügt (außer `task.color` ist gesetzt — dann hat diese Farbe Priorität).

```tsx
// Warnung deaktivieren — Datums-Chips zeigen immer die Standardfarbe
<KanbanBoard
  columns={columns}
  tasks={tasks}
  showDueDateWarning={false}
/>
```

**Hinweise:**
- Keine visuelle Wirkung wenn `showDueDate` den Wert `false` hat oder eine Karte kein `dueDate` besitzt.
- „Überfällig" bedeutet `dueDate < Beginn des heutigen Tages` — Karten die heute fällig sind, werden nicht hervorgehoben.
- Die Hervorhebung gilt für Karten in allen Spalten, auch in „Erledigt"-Spalten. Um dies für abgeschlossene Aufgaben zu unterdrücken, `dueDate` bei erledigten Karten weglassen oder `showDueDateWarning={false}` für das gesamte Board setzen.

---

## Karten filtern (`filterText`)

Einen Suchstring via `filterText` übergeben, um die sichtbaren Karten einzuschränken. Das Board gleicht Groß-/Kleinschreibungsunabhängig gegen `task.title` und `task.assignee` ab. Ein leerer String (der Standard) zeigt alle Karten.

Der Consumer ist verantwortlich für das Rendern des Suchfelds und die Zustandsverwaltung:

```tsx
import { useState } from 'react';
import { TextField } from '@mui/material';
import { KanbanBoard } from '@thebuoyant-tsdev/mui-ts-library';

function App() {
  const [tasks, setTasks]   = useState(initialTasks);
  const [filter, setFilter] = useState('');

  return (
    <>
      <TextField
        size="small"
        placeholder="Nach Titel oder Person suchen…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <KanbanBoard
        columns={columns}
        tasks={tasks}
        filterText={filter}
        onTasksChange={setTasks}
      />
    </>
  );
}
```

**Hinweise:**
- Spalten-Counter zeigen die gefilterte Anzahl (z. B. `2` statt `5` wenn 2 Karten passen).
- WIP-Limit-Prüfungen verwenden immer die **ungefilterte** Gesamtanzahl — die Überlimit-Warnung bleibt also sichtbar, auch wenn der Filter die angezeigte Anzahl unter das Limit senkt.
- Ausgefilterte Karten werden aus dem Drag-and-Drop-Kontext entfernt. Wenn der Filter zurückgesetzt wird, erscheint die vollständige Liste wieder.

---

## WIP-Limits

`wipLimit` an einer Spalte setzen, um die maximale Kartenanzahl anzugeben. Der Anzahl-Chip im Spalten-Header zeigt `{Anzahl} / {Limit}` und wird rot, wenn das Limit überschritten wird. Dies ist nur ein visueller Hinweis — Nutzer können weiterhin Karten hineinziehen.

```tsx
const columns: KanbanColumn[] = [
  { id: "in-progress", label: "In Arbeit", color: "#2196f3", wipLimit: 3 },
  { id: "done",        label: "Erledigt",  color: "#4caf50" },
];
```

---

## Internationalisierung (i18n)

Ein `translation`-Objekt mit den zu überschreibenden Beschriftungen übergeben. Nicht gesetzte Keys fallen auf englische Standardwerte zurück.

```tsx
<KanbanBoard
  columns={columns}
  tasks={tasks}
  translation={{
    addCardLabel:           "Karte hinzufügen",
    dialogAddTitle:         "Karte hinzufügen",
    dialogEditTitle:        "Karte bearbeiten",
    dialogDeleteTitle:      "Karte löschen",
    dialogSave:             "Speichern",
    dialogCancel:           "Abbrechen",
    dialogDelete:           "Löschen",
    dialogDeleteConfirm:    '"{title}" wirklich löschen?',
    dialogFieldTitle:       "Titel",
    dialogFieldDescription: "Beschreibung",
    dialogFieldAssignee:    "Zuständig",
    dialogFieldDueDate:     "Fälligkeitsdatum",
    dialogFieldStatus:      "Status",
    noCardsLabel:           "Keine Karten",
  }}
/>
```

Der `dialogDeleteConfirm`-String unterstützt den Platzhalter `{title}` — er wird zur Laufzeit durch den Kartentitel ersetzt.

### Alle Translation-Keys

| Key | Standard | Beschreibung |
|---|---|---|
| `addCardLabel` | `"Add card"` | Beschriftung des „+"-Buttons im Spaltenfuß |
| `dialogAddTitle` | `"Add card"` | Titel des Hinzufügen-Dialogs |
| `dialogEditTitle` | `"Edit card"` | Titel des Bearbeiten-Dialogs |
| `dialogDeleteTitle` | `"Delete card"` | Titel des Lösch-Bestätigungsdialogs |
| `dialogSave` | `"Save"` | Speichern-Button im Hinzufügen-/Bearbeiten-Dialog |
| `dialogCancel` | `"Cancel"` | Abbrechen-Button in allen Dialogen |
| `dialogDelete` | `"Delete"` | Löschen-Button im Lösch-Bestätigungsdialog |
| `dialogDeleteConfirm` | `'Delete "{title}"?'` | Bestätigungstext — `{title}` wird durch den Kartentitel ersetzt |
| `dialogFieldTitle` | `"Title"` | Beschriftung des Titel-Felds im Hinzufügen-/Bearbeiten-Dialog |
| `dialogFieldDescription` | `"Description"` | Beschriftung des Beschreibungsfelds |
| `dialogFieldAssignee` | `"Assignee"` | Beschriftung des Zuständig-Felds und Chip-aria-label |
| `dialogFieldDueDate` | `"Due date"` | Beschriftung des Fälligkeitsdatum-Felds und Chip-aria-label |
| `dialogFieldStatus` | `"Status"` | Beschriftung des Status-Dropdowns im Hinzufügen-/Bearbeiten-Dialog |
| `noCardsLabel` | `"No cards"` | Platzhaltertext in leeren Spalten |

---

## CSS-Klassen-API

Jeder visuelle Bereich hat eine stabile CSS-Klasse zur individuellen Gestaltung. Alle Klassen verwenden das Präfix `MuiTsKanbanBoard-` und können mit der Zustandsklasse `MuiTs-selected` kombiniert werden (wird einer Karte während des Ziehens hinzugefügt).

```ts
import { kanbanBoardClasses } from "mui-ts-library";
// kanbanBoardClasses.root         → "MuiTsKanbanBoard-root"
// kanbanBoardClasses.columns      → "MuiTsKanbanBoard-columns"
// kanbanBoardClasses.column       → "MuiTsKanbanBoard-column"
// kanbanBoardClasses.columnHeader → "MuiTsKanbanBoard-columnHeader"
// kanbanBoardClasses.columnTitle  → "MuiTsKanbanBoard-columnTitle"
// kanbanBoardClasses.columnCount  → "MuiTsKanbanBoard-columnCount"
// kanbanBoardClasses.columnBody   → "MuiTsKanbanBoard-columnBody"
// kanbanBoardClasses.card         → "MuiTsKanbanBoard-card"
// kanbanBoardClasses.cardTitle    → "MuiTsKanbanBoard-cardTitle"
// kanbanBoardClasses.cardMeta     → "MuiTsKanbanBoard-cardMeta"
// kanbanBoardClasses.cardAssignee → "MuiTsKanbanBoard-cardAssignee"
// kanbanBoardClasses.cardDueDate  → "MuiTsKanbanBoard-cardDueDate"
// kanbanBoardClasses.addButton    → "MuiTsKanbanBoard-addButton"
```

### Beispiel: individuelle Kartenstile

```css
/* Erledigte Karten optisch dämpfen */
.done-column .MuiTsKanbanBoard-card {
  opacity: 0.6;
}

/* Karte beim Ziehen hervorheben */
.MuiTsKanbanBoard-card.MuiTs-selected {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transform: rotate(1.5deg);
}

/* Spaltenheader fett und in Großbuchstaben */
.MuiTsKanbanBoard-columnTitle {
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* „Karte hinzufügen"-Button anpassen */
.MuiTsKanbanBoard-addButton {
  border-style: solid !important;
  font-size: 0.9rem;
}
```

---

## KanbanBoard und GanttChart gemeinsam nutzen

`KanbanBoard` und `GanttChart` verwenden **separate, unabhängige Datenmodelle** — das ist bewusst so. Eine Gantt-Aufgabe enthält zeitliche Daten (`startDate`, `endDate`, `dependencies`, `progress`, `isMilestone`), die auf einer Kanban-Karte keine Bedeutung haben. Eine Kanban-Aufgabe hat eine `status`-Spalte, die im Gantt-Modell nicht existiert.

Wenn die Anwendung Aufgaben einmalig modelliert, aber in beiden Ansichten darstellen soll, werden dünne Adapter-Funktionen für jede Richtung geschrieben. Das Muster hält das Domain-Modell sauber und erlaubt es, jede Komponente mit genau der benötigten Datenform zu nutzen.

### Adapter: GanttTask → KanbanTask

```ts
import type { GanttTask } from "mui-ts-library";
import type { KanbanTask } from "mui-ts-library";

function ganttToKanban(ganttTask: GanttTask): KanbanTask {
  // Gantt-Status auf Kanban-Spalten-IDs mappen.
  // Die Spalten-IDs und Status-Werte müssen übereinstimmen — die Map unten anpassen.
  const statusMap: Record<string, string> = {
    planned:     "todo",
    in_progress: "in-progress",
    done:        "done",
    blocked:     "blocked",
  };

  return {
    id:          ganttTask.id,
    title:       ganttTask.name,
    status:      statusMap[ganttTask.status] ?? "todo",
    assignee:    ganttTask.assignee,
    color:       ganttTask.color,
    dueDate:     ganttTask.endDate ? new Date(ganttTask.endDate) : undefined,
    description: ganttTask.notes,
  };
}

// Verwendung
const kanbanTasks = ganttTasks.map(ganttToKanban);
```

### Adapter: KanbanTask → GanttTask

```ts
import type { GanttTask } from "mui-ts-library";
import type { KanbanTask } from "mui-ts-library";

function kanbanToGantt(kanbanTask: KanbanTask, heute: Date = new Date()): GanttTask {
  const statusMap: Record<string, string> = {
    "todo":        "planned",
    "in-progress": "in_progress",
    "done":        "done",
    "blocked":     "blocked",
  };

  // Gantt benötigt startDate und endDate — sinnvolle Standardwerte ableiten,
  // wenn Kanban-Aufgaben diese nicht enthalten.
  const startDate = heute.toISOString().split("T")[0];
  const endDate   = kanbanTask.dueDate
    ? kanbanTask.dueDate.toISOString().split("T")[0]
    : startDate;

  return {
    id:        kanbanTask.id,
    name:      kanbanTask.title,
    startDate,
    endDate,
    status:    statusMap[kanbanTask.status] ?? "planned",
    assignee:  kanbanTask.assignee,
    color:     kanbanTask.color,
  };
}

// Verwendung
const ganttTasks = kanbanTasks.map((t) => kanbanToGantt(t));
```

### Muster „Gleiche Daten, zwei Ansichten"

```tsx
import { useState }     from "react";
import { GanttChart }   from "mui-ts-library";
import { KanbanBoard }  from "mui-ts-library";
import type { GanttTask, KanbanTask, KanbanColumn } from "mui-ts-library";

const COLUMNS: KanbanColumn[] = [
  { id: "todo",        label: "Zu erledigen", color: "#9e9e9e" },
  { id: "in-progress", label: "In Arbeit",    color: "#2196f3" },
  { id: "done",        label: "Erledigt",     color: "#4caf50" },
];

export function ProjektDashboard({ initialGanttTasks }: { initialGanttTasks: GanttTask[] }) {
  const [ganttTasks, setGanttTasks] = useState(initialGanttTasks);
  const [ansicht, setAnsicht]       = useState<"gantt" | "kanban">("kanban");

  const kanbanTasks = ganttTasks.map(ganttToKanban);

  function handleKanbanChange(aktualisiert: KanbanTask[]) {
    // Status-Änderungen zurück ins Gantt-Modell übernehmen.
    const statusMap: Record<string, string> = {
      "todo": "planned", "in-progress": "in_progress", "done": "done",
    };
    setGanttTasks((prev) =>
      prev.map((g) => {
        const k = aktualisiert.find((k) => k.id === g.id);
        return k ? { ...g, status: statusMap[k.status] ?? g.status } : g;
      }),
    );
  }

  return (
    <>
      <button onClick={() => setAnsicht(ansicht === "gantt" ? "kanban" : "gantt")}>
        Wechseln zu {ansicht === "gantt" ? "Kanban" : "Gantt"}
      </button>

      {ansicht === "gantt" ? (
        <GanttChart tasks={ganttTasks} onTasksChange={setGanttTasks} />
      ) : (
        <KanbanBoard
          columns={COLUMNS}
          tasks={kanbanTasks}
          onTasksChange={handleKanbanChange}
        />
      )}
    </>
  );
}
```

---

## TypeScript-Exports

```ts
import {
  KanbanBoard,
  kanbanBoardClasses,
  // Typen
  type KanbanTask,
  type KanbanColumn,
  type KanbanBoardProps,
  type KanbanBoardTranslation,
} from "mui-ts-library";
```
