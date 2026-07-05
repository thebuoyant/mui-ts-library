# GanttChart — Benutzerhandbuch

> [English Version →](GanttChart.md)

**Interaktive Projekt-Timeline mit Drag & Drop, Meilensteinen und Abhängigkeiten — direkt in jede React-App integrierbar.** `GanttChart` einsetzen in Projektmanagement-Dashboards, Sprint-Planern und Ressourcenansichten, wo Teams Zeitpläne auf einen Blick sehen und verwalten müssen.

## Überblick

Der `GanttChart` ist eine vollständig interaktive Projektplanungs-Komponente auf Basis von React und Material UI. Er visualisiert Aufgaben (Tasks) als Balken auf einer Zeitleiste und unterstützt hierarchische Strukturen, Abhängigkeiten zwischen Tasks, Drag & Drop, Inline-Bearbeitung sowie einen kritischen-Pfad-Modus.

### Was macht diese Komponente?

Der Nutzer sieht **zwei Bereiche nebeneinander**:

- **Linkes Panel — Aufgabenliste:** Task-Namen in einer hierarchischen Liste. Unteraufgaben werden eingerückt unter dem Elterntask angezeigt. Jede Zeile zeigt einen Status-Chip (Planned / In Progress / Done / Blocked) sowie Aktions-Icons (Unteraufgabe hinzufügen, Bearbeiten, Löschen). Die Trennlinie zwischen Panel und Zeitleiste ist per Drag verschiebbar.
- **Rechts — die Zeitleiste:** Horizontale Balken ("Gantt-Balken"), die sich über ein Datumsgitter erstrecken. Die linke Balkenkante entspricht dem Startdatum, die rechte dem Enddatum. Die Farbe spiegelt den Task-Status wider (oder eine eigene Farbe, wenn `color` gesetzt ist). Eine gestrichelte vertikale Linie markiert den heutigen Tag.
- **Toolbar** (oben): Zeitskalenbuttons (Tage / Wochen / Monate / Quartale), Datumseingaben zum Verschieben des sichtbaren Bereichs, Alle auf-/zuklappen und ein „Zum heutigen Tag"-Button.

**Optionale Funktionen, die aktiviert werden können:**

| Funktion | Was der Nutzer sieht |
|---|---|
| `draggable` | Balken nach links/rechts ziehen — verschiebt Start- und Enddatum gemeinsam |
| `resizable` | Rechten Balkenrand ziehen — verlängert das Enddatum |
| `progressDraggable` | Kleiner Handle am Balken — Fertigstellungsgrad (0–100 %) per Drag setzen |
| `inlineEdit` | Doppelklick auf einen Task-Namen im Panel — direkt umbenennen |
| `showCriticalPath` | Die längste Abhängigkeitskette wird farblich hervorgehoben — sie bestimmt, wann das Projekt fertig wird |
| `cascadeDependencies` | Verschiebt einen Task → alle Nachfolger verschieben sich automatisch um denselben Zeitraum |
| `zoomable` | `Strg / Cmd ⌘+Scroll` wechselt die Zeitskala |

Rechtsklick auf einen Balken öffnet ein **Kontextmenü** zum direkten Ändern des Status — ohne Dialog.

**Typische Einsatzgebiete:**

- Projektmanagement-Anwendungen (Sprint-Planung, Release-Roadmaps)
- Ressourcenplanung und Kapazitätsdarstellung
- Visualisierung von Meilensteinen in agilen Projekten
- Dashboards mit zeitlicher Übersicht über laufende Aufgaben

---

> ### Neu in v3.17.0
>
> | Feature | Beschreibung | Springe zu |
> |---|---|---|
> | **Assignee-Filter in der Toolbar** | `toolbarConfig={{ showAssigneeFilter: true }}` fügt ein Select-Dropdown hinzu, das sichtbare Tasks nach Assignee filtert. Der Filter ist **vorfahren-inklusiv**: ein ausgewählter Assignee zeigt auch Parent-Tasks, deren Nachkommen passen. Zurücksetzen (Option „Alle" / übersetzte Bezeichnung) zeigt wieder alle Tasks. Zwei neue optionale Übersetzungsschlüssel: `filterAssigneeAll`, `filterAssigneeLabel`. | [→ Toolbar-Konfiguration](#ganttoolbarconfig) · [→ Übersetzungen](#übersetzungen) |
> | **`onDragStart`-Callback** | Feuert sofort wenn der User die Maustaste auf einem zieh- oder skalierbaren Balken drückt — noch bevor ein Bewegungs-Schwellwert erreicht ist. Geeignet für optimistisches UI, Analytics oder das Anzeigen eines Shadow-Elements während des Dragens. Erhält den Task und den Gesten-Typ (`"move"` oder `"resize"`). | [→ Props](#props-referenz) · [→ Backend-Integration](#backend-integration--debouncing) |

> ### Neu in v3.16.0
>
> | Feature | Beschreibung | Springe zu |
> |---|---|---|
> | **Fortschritts-Slider im Dialog** | `GanttTask.progress` ist jetzt via MUI-Slider im Hinzufügen-/Bearbeiten-Dialog bearbeitbar — ohne Maus. Wird im Bearbeiten-Modus aus bestehenden Task-Daten vorbelegt; setzt auf 0 zurück wenn Meilenstein aktiviert wird. Neuer optionaler Übersetzungsschlüssel `dialogFieldProgress`. | [→ GanttTask-Felder](#ganttask-felder) · [→ Übersetzungen](#übersetzungen) |

> ### Neu in v2.7.0
>
> | Feature | Beschreibung | Springe zu |
> |---|---|---|
> | **`showAssigneeColumn`** | Fügt eine Assignee-Spalte im Task-Panel hinzu | [→ Props](#props-referenz) |
> | **`showExportCSV`** | CSV-Download-Button für die aktuelle Task-Liste | [→ Props](#props-referenz) |

---

## Technische Voraussetzungen

| Abhängigkeit | Mindestversion |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |
| Zustand | 5 |

---

## Import

```tsx
import { GanttChart } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  GanttTask,
  GanttTaskStatus,
  GanttTimeScale,
  GanttTheme,
  GanttTranslations,
  GanttToolbarConfig,
  GanttStatusColors,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Schnellstart

```tsx
import { GanttChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { GanttTask } from '@thebuoyant-tsdev/mui-ts-library';

// Ein flaches Array — die Hierarchie wird intern aus den parentId-Referenzen aufgebaut.
const tasks: GanttTask[] = [
  {
    id: 'projekt',              // eindeutige ID — als React-Key und für Abhängigkeiten
    name: 'Webseite Relaunch',
    status: 'in-progress',      // steuert Balkenfarbe und Status-Chip
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-06-30'),
    // kein parentId → Root-Task (oberste Ebene)
  },
  {
    id: 'design',
    parentId: 'projekt',        // Kind von 'projekt' oben → eingerückt im Task-Panel
    name: 'Design-Phase',
    status: 'done',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-02-28'),
  },
  {
    id: 'entwicklung',
    parentId: 'projekt',
    name: 'Entwicklung',
    status: 'in-progress',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-05-31'),
    dependencies: ['design'],   // 'design' muss fertig sein, bevor 'entwicklung' starten kann
                                // → Abhängigkeitspfeil in der Zeitleiste; verhindert Zyklen im Dialog
  },
];

function App() {
  return (
    <GanttChart
      tasks={tasks}
      timeScale="months" // initialer Zoom — Nutzer kann über Toolbar wechseln
      height={400}
    />
  );
}
```

> **Erster Schritt fertig.** Dies rendert einen schreibgeschützten Chart mit eingebauten Dialogen für Hinzufügen/Bearbeiten/Löschen. `draggable resizable onTasksChange={setTasks}` hinzufügen für einen vollständig interaktiven Chart — siehe [Anwendungsbeispiele](#anwendungsbeispiele).


---

## Props-Referenz

### Datenstruktur: `GanttTask`

Jede Aufgabe wird als `GanttTask`-Objekt übergeben. Die `tasks`-Prop erwartet ein **flaches Array** — Kinder werden nicht in Eltern verschachtelt. Stattdessen bekommt jedes Kind eine `parentId`, die auf die `id` des Elterntasks zeigt. Die Komponente baut den Baum intern aus diesen Referenzen auf.

> **Mentales Modell:** Stell dir eine Tabelle vor, in der jede Zeile eine "Elternzeile"-Spalte hat. Die Zeilen bleiben flach, aber die Komponente rendert sie als Baum.

| Feld | Typ | Pflicht | Beschreibung |
|---|---|---|---|
| `id` | `string` | **Ja** | Eindeutige Kennung des Tasks. Wird als React-Key und für Abhängigkeits-Referenzen verwendet. Muss innerhalb der `tasks`-Liste einmalig sein. |
| `name` | `string` | **Ja** | Anzeigename des Tasks im linken Panel und in Dialogen. |
| `status` | `GanttTaskStatus` | **Ja** | Aktueller Status: `"planned"` · `"in-progress"` · `"done"` · `"blocked"`. Steuert Balkenfarbe und Status-Chip. |
| `startDate` | `Date` | **Ja** | Startdatum des Tasks. Bestimmt die linke Kante des Balkens. |
| `endDate` | `Date` | **Ja** | Enddatum des Tasks. Bestimmt die rechte Kante des Balkens. |
| `parentId` | `string` | Nein | ID des übergeordneten Tasks. Wird weggelassen für Root-Tasks (oberste Ebene). Erzeugt bei Angabe eine Einrückung im Panel und baut den Baum auf. |
| `dependencies` | `string[]` | Nein | IDs von Vorgänger-Tasks. Wird im Bearbeiten-Dialog als Multiselect angezeigt — Tasks, die bereits (direkt oder transitiv) vom bearbeiteten Task abhängen, werden aus den Optionen ausgeschlossen, sodass der eingebaute Dialog keinen Abhängigkeitszyklus erzeugen kann. In Kombination mit `cascadeDependencies` werden Nachfolger automatisch verschoben. |
| `isMilestone` | `boolean` | Nein | Wenn `true`, wird der Task als Raute (♦) statt als Balken dargestellt. Meilensteine sollten `startDate ≈ endDate` haben. |
| `progress` | `number` | Nein | Fortschritt in Prozent (0–100). Wird als halbopaker Overlay-Balken über den Task-Balken gerendert. Bearbeitbar via **eingebautem Dialog** (Slider, seit v3.16.0) oder per Drag wenn `progressDraggable={true}`. |
| `color` | `string` | Nein | Überschreibt die statusbasierte Balkenfarbe für diesen einzelnen Task (höchste Priorität). Beliebiger CSS-Farbwert (z. B. `"#e91e63"` oder `"rgb(0,150,136)"`). |
| `assignee` | `string` | Nein | Person oder Team, das für den Task verantwortlich ist — wird in der Assignee-Spalte angezeigt, wenn `showAssigneeColumn={true}`. |

> **Wie Abhängigkeiten in der Praxis funktionieren:** Angenommen "Entwicklung" hat `dependencies: ['design']`. In der Zeitleiste verbindet ein Pfeil die rechte Kante des "Design"-Balkens mit der linken Kante des "Entwicklung"-Balkens — sichtbar: "das kann erst starten, wenn jenes fertig ist." Mit `cascadeDependencies={true}` verschiebt sich "Entwicklung" automatisch um denselben Zeitraum, wenn "Design" per Drag zwei Wochen später gelegt wird — und alle Tasks, die von "Entwicklung" abhängen, ebenfalls (transitiv).

**TypeScript-Typen:**

```ts
type GanttTaskStatus = "planned" | "in-progress" | "done" | "blocked";
type GanttTimeScale  = "days" | "weeks" | "months" | "quarters";

type GanttTask = {
  id:            string;
  name:          string;
  status:        GanttTaskStatus;
  startDate:     Date;
  endDate:       Date;
  parentId?:     string;
  dependencies?: string[];
  isMilestone?:  boolean;
  progress?:     number;
  color?:        string;
  assignee?:     string;
};
```

---

### Komponenten-Props: `GanttChartProps`

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `cascadeDependencies` | `boolean` | `false` | Wenn `true`, werden beim Verschieben oder Resizen eines Tasks alle Finish-to-Start-Nachfolger (via `dependencies`) automatisch um den gleichen Zeitraum verschoben. Funktioniert transitiv über mehrere Ebenen. |
| `defaultRangeEnd` | `Date` | auto | Überschreibt den automatisch berechneten rechten Rand der Zeitleiste. |
| `defaultRangeStart` | `Date` | auto | Überschreibt den automatisch berechneten linken Rand der Zeitleiste. Nützlich um einen bestimmten Datumsbereich von Anfang an zu fixieren. |
| `draggable` | `boolean` | `false` | Erlaubt das horizontale Verschieben von Task-Balken per Drag. Ändert `startDate` und `endDate` synchron. |
| `enableBuiltinDialogs` | `boolean` | `true` | Wenn `true`, öffnen die Aktions-Icons (Hinzufügen, Bearbeiten, Löschen) eingebaute MUI-Dialoge. Wenn `false`, werden stattdessen nur die Callbacks `onAddTask`, `onEditTask`, `onDeleteTask` aufgerufen — für eigene Dialog-Implementierungen. |
| `ganttTheme` | `GanttTheme` | — | Gebündeltes Theming-Objekt. Empfohlener Weg zur visuellen Anpassung. Einzelne Keys überschreiben die Defaults — nicht gesetzte Keys behalten ihr Standard-Aussehen. Siehe [GanttTheme](#ganttTheme). |
| `height` | `number \| string` | `400` | Höhe des Gesamtcharts in Pixeln oder als CSS-Wert. `"auto"` passt sich dem Elternelement an. |
| `initialExpandAll` | `boolean` | `false` | Startet den Chart mit allen Hierarchieebenen aufgeklappt. Standard: nur Root-Tasks sind aufgeklappt, ihre direkten Kinder sind sichtbar. |
| `inlineEdit` | `boolean` | `false` | Aktiviert Inline-Editierung des Task-Namens per Doppelklick direkt im Panel. |
| `maxPanelWidth` | `number` | `600` | Maximalbreite des linken Aufgaben-Panels in Pixeln. |
| `minPanelWidth` | `number` | `200` | Mindestbreite des linken Aufgaben-Panels in Pixeln. Verhindert, dass der Nutzer das Panel zu schmal zieht. |
| `progressDraggable` | `boolean` | `false` | Zeigt einen Fortschritts-Handle am Task-Balken an. Der Nutzer kann den Fortschritt (0–100 %) per Drag direkt im Diagramm setzen. |
| `resizable` | `boolean` | `false` | Erlaubt das Verändern des `endDate` durch Ziehen am rechten Balkenrand. |
| `showAssigneeColumn` | `boolean` | `false` | Zeigt eine **Assignee**-Spalte im Task-Panel. Befüllung über `task.assignee`. |
| `showCriticalPath` | `boolean` | `false` | Hebt den kritischen Pfad farbig hervor — die längste Abhängigkeitskette, die die Projektlaufzeit bestimmt. |
| `showToolbar` | `boolean` | `true` | Blendet die gesamte Toolbar (Skalenbuttons, Datumsbereich, Aktionsbuttons) ein oder aus. |
| `tasks` | `GanttTask[]` | — | **Pflichtfeld.** Flaches Array aller Tasks. Hierarchie wird intern über `parentId` aufgebaut. Änderungen werden über die `onTasksChange`-Callback nach oben gespiegelt. |
| `timeScale` | `GanttTimeScale` | `"months"` | Initialer Zeitskalentyp: `"days"` · `"weeks"` · `"months"` · `"quarters"`. Der Nutzer kann die Skala über die Toolbar jederzeit wechseln. |
| `toolbarConfig` | `GanttToolbarConfig` | alle `true` | Feingranulare Steuerung einzelner Toolbar-Elemente. Nur abweichende Keys angeben — nicht gesetzte Keys bleiben sichtbar. Siehe [GanttToolbarConfig](#ganttToolbarConfig). |
| `translations` | `Partial<GanttTranslations>` | Deutsch/Englisch | Texte für alle UI-Elemente. Nur abweichende Keys angeben. Siehe [Texte & Übersetzungen](#texte--übersetzungen). |
| `virtualizeRows` | `boolean` | `false` | Wenn `true`, werden nur die aktuell sichtbaren Zeilen gerendert (virtuelle Liste). Empfohlen ab ca. 200 Tasks, da es die DOM-Größe drastisch reduziert. |
| `width` | `number \| string` | `"100%"` | Breite des Gesamtcharts. Standard füllt den verfügbaren Platz. |
| `zoomable` | `boolean` | `false` | Ermöglicht Zoom per `Strg + Mausrad`. Ändert die Zeitskala zyklisch (Tage ↔ Wochen ↔ Monate ↔ Quartale). |

> **Hinweis zu `defaultRangeStart`/`defaultRangeEnd`:** Werden diese nicht gesetzt, berechnet der Chart den Bereich automatisch aus den frühesten und spätesten Task-Daten und fügt einen 1-Monat-Puffer an beiden Enden hinzu.

---

### `GanttToolbarConfig` {#ganttToolbarConfig}

Erlaubt die selektive Ausblendung einzelner Toolbar-Elemente. Alle Felder sind optional — nicht gesetzte Keys bleiben sichtbar (`true`).

| Feld | Typ | Standard | Was wird gesteuert |
|---|---|---|---|
| `showScaleDays` | `boolean` | `true` | Schaltfläche für Tages-Skala |
| `showScaleWeeks` | `boolean` | `true` | Schaltfläche für Wochen-Skala |
| `showScaleMonths` | `boolean` | `true` | Schaltfläche für Monats-Skala |
| `showScaleQuarters` | `boolean` | `true` | Schaltfläche für Quartals-Skala |
| `showExpandCollapseAll` | `boolean` | `true` | Alle aufklappen / Alle zuklappen |
| `showScrollToToday` | `boolean` | `true` | „Zum heutigen Tag"-Button |
| `showDateRange` | `boolean` | `true` | Von/Bis-Datumseingaben |
| `showAssigneeFilter` | `boolean` | `false` | Assignee-Filter-Dropdown in der Toolbar (vorfahren-inklusiv, **@since 3.17.0**) |
| `showExportCSV` | `boolean` | `false` | CSV-Download-Button — löst `onExportCSV` aus oder Browser-Download. **Exportiert immer alle Tasks, unabhängig von einem aktiven Assignee-Filter.** |
| `showRangeReset` | `boolean` | `true` | Zurücksetzen-Button (erscheint nur wenn Bereich manuell angepasst wurde) |
| `showResetView` | `boolean` | `true` | Ansicht-Zurücksetzen-Button — setzt Zeitskala, Datumsbereich, Expand/Collapse-Zustand **und den Assignee-Filter** auf die Standardwerte zurück. Der Button ist deaktiviert solange die Ansicht im Ausgangszustand ist. |

**TypeScript-Typ:**

```ts
type GanttToolbarConfig = {
  showScaleDays?:         boolean;
  showScaleWeeks?:        boolean;
  showScaleMonths?:       boolean;
  showScaleQuarters?:     boolean;
  showExpandCollapseAll?: boolean;
  showScrollToToday?:     boolean;
  showDateRange?:         boolean;
  showRangeReset?:        boolean;
  showResetView?:         boolean;
};
```

**Beispiel — nur Skalenbuttons anzeigen:**

```tsx
<GanttChart
  tasks={tasks}
  toolbarConfig={{
    showExpandCollapseAll: false,
    showScrollToToday: false,
    showDateRange: false,
    showRangeReset: false,
    showResetView: false,
  }}
/>
```

---

### `GanttTheme` {#ganttTheme}

Alle Felder sind optional. Nicht gesetzte Keys verwenden die MUI-Palette-Defaults.

| Feld | Typ | Standard | Beschreibung |
|---|---|---|---|
| `statusColors` | `GanttStatusColors` | MUI-Palette | Balkenfarben je Status als CSS-Farbwerte. Alle vier Status können unabhängig gesetzt werden. |
| `criticalPathColor` | `string` | `error.main` | Farbe der Hervorhebung für Tasks auf dem kritischen Pfad (nur relevant wenn `showCriticalPath={true}`). |
| `milestoneColor` | `string` | `warning.main` | Farbe der Meilenstein-Raute. |
| `todayLineColor` | `string` | `primary.main` | Farbe der vertikalen „Heute"-Linie in der Zeitleiste. |
| `weekendColor` | `string` | `action.hover` | Hintergrundfarbe der Wochenend-Spalten (nur sichtbar in der Tages-Skala). |
| `barBorderRadius` | `number` | `4` | Eckenradius der Task-Balken in Pixeln. `0` = eckige Balken. |

**TypeScript-Typen:**

```ts
type GanttStatusColors = Partial<Record<GanttTaskStatus, string>>;

type GanttTheme = {
  statusColors?:      GanttStatusColors;
  criticalPathColor?: string;
  milestoneColor?:    string;
  todayLineColor?:    string;
  weekendColor?:      string;
  barBorderRadius?:   number;
};
```

**Beispiel:**

```tsx
const ganttTheme: GanttTheme = {
  statusColors: {
    planned:       '#7c3aed',
    'in-progress': '#0ea5e9',
    done:          '#16a34a',
    blocked:       '#dc2626',
  },
  criticalPathColor: '#f59e0b',
  barBorderRadius: 8,
};

<GanttChart tasks={tasks} ganttTheme={ganttTheme} />
```

---

## Callbacks / Events

> **Welcher Callback feuert bei welcher Aktion?**
>
> | Aktion | Ausgelöste Callbacks |
> |---|---|
> | Klick auf Task-Balken (Timeline) | `onTaskClick` |
> | Klick auf Meilenstein-Raute | `onMilestoneClick` |
> | Status über Kontextmenü geändert | `onStatusChange` · `onTasksChange` |
> | Task über eingebauten Dialog erstellt (`enableBuiltinDialogs={true}`) | `onTaskCreated` · `onTasksChange` |
> | Task über eingebauten Dialog bearbeitet (`enableBuiltinDialogs={true}`) | `onTaskUpdated` · `onTasksChange` |
> | Task über eingebauten Dialog gelöscht (`enableBuiltinDialogs={true}`) | `onTaskDeleted` · `onTasksChange` |
> | Hinzufügen-Icon geklickt (`enableBuiltinDialogs={false}`) | `onAddTask` |
> | Bearbeiten-Icon geklickt (`enableBuiltinDialogs={false}`) | `onEditTask` |
> | Löschen-Icon geklickt (`enableBuiltinDialogs={false}`) | `onDeleteTask` |
> | Maustaste auf ziehbarem Balken gedrückt (vor Bewegung) | `onDragStart` |
> | Task-Balken per Drag verschoben (`draggable={true}`) | `onTaskMoved` · `onTasksChange` |
> | Rechter Balkenrand per Drag geändert (`resizable={true}`) | `onTaskResized` · `onTasksChange` |
> | CSV-Export-Button geklickt | `onExportCSV` (oder Browser-Download wenn nicht angegeben) |
>
> **Empfehlung:** `onTasksChange` für einfache Datenspeicherung verwenden. `onTaskCreated`/`onTaskUpdated`/`onTaskDeleted` nur hinzufügen wenn das Backend separate API-Calls pro Aktionstyp benötigt.

| Callback | Signatur | Wann ausgelöst | Verwenden wenn... |
|---|---|---|---|
| `onTasksChange` | `(tasks: GanttTask[]) => void` | Nach jeder CRUD-Aktion mit der vollständigen aktuellen Task-Liste | Einfache State-Synchronisation — für die meisten Apps ausreichend |
| `onTaskClick` | `(task: GanttTask) => void` | Klick auf einen Task-Balken in der Zeitleiste | Detail-Panel oder eigener Dialog geöffnet werden soll |
| `onMilestoneClick` | `(task: GanttTask) => void` | Klick auf eine Meilenstein-Raute | Speziell auf Meilenstein-Interaktionen reagiert werden soll |
| `onStatusChange` | `(task: GanttTask, status: GanttTaskStatus) => void` | Neuer Status im Rechtsklick-Kontextmenü des Balkens gewählt | Statusänderungen sofort ins Backend synchronisiert werden sollen |
| `onTaskCreated` | `(task: GanttTask) => void` | Task im eingebauten Hinzufügen-Dialog bestätigt (`enableBuiltinDialogs={true}`) | Separater API-Call für Create vs. Update vs. Delete |
| `onTaskUpdated` | `(task: GanttTask) => void` | Task im eingebauten Bearbeiten-Dialog gespeichert (`enableBuiltinDialogs={true}`) | Separater API-Call für Updates |
| `onTaskDeleted` | `(taskId: string) => void` | Task im eingebauten Löschen-Dialog bestätigt (`enableBuiltinDialogs={true}`) | Separater API-Call für Deletes |
| `onAddTask` | `(parentTask?: GanttTask) => void` | Hinzufügen-Icon geklickt — **nur** wenn `enableBuiltinDialogs={false}` | Eigener Hinzufügen-Dialog / Drawer |
| `onEditTask` | `(task: GanttTask) => void` | Bearbeiten-Icon geklickt — **nur** wenn `enableBuiltinDialogs={false}` | Eigener Bearbeiten-Dialog / Drawer |
| `onDeleteTask` | `(task: GanttTask) => void` | Löschen-Icon geklickt — **nur** wenn `enableBuiltinDialogs={false}` | Eigene Löschbestätigung |
| `onDragStart` | `(task: GanttTask, type: "move" \| "resize") => void` | Maustaste auf zieh-/skalierbarem Balken gedrückt — feuert **vor** jedem Bewegungs-Schwellwert, einmal pro Geste. `type` ist `"move"` für Balken-Drag, `"resize"` für Rechtsrand-Resize. **@since 3.17.0** | Optimistisches UI, Analytics, Shadow-Element anzeigen |
| `onTaskMoved` | `(task: GanttTask, newStart: Date, newEnd: Date) => void` | Task-Balken per Drag horizontal verschoben (`draggable={true}`). `task` enthält die ursprünglichen Metadaten; neue Daten in `newStart`/`newEnd` | Drag-Ergebnisse ins Backend persistieren |
| `onTaskResized` | `(task: GanttTask, newEnd: Date) => void` | Rechter Balkenrand per Drag verändert (`resizable={true}`) | Resize-Ergebnisse persistieren |
| `onExportCSV` | `(csv: string, tasks: GanttTask[]) => void` | CSV-Export-Button geklickt — ohne Callback: automatischer Browser-Download `gantt-tasks.csv`. Der `tasks`-Parameter enthält **immer alle Tasks** (nicht nur die aktuell gefilterte Teilmenge). | Eigener Export (Server-Upload, eigener Dateiname) |

> **Tipp — `onTasksChange` vs. spezifische Callbacks:** Für einfache Datenspeicherung reicht `onTasksChange` allein aus. Die spezifischen Callbacks (`onTaskCreated`, `onTaskUpdated` etc.) sind für Anwendungen gedacht, die auf bestimmte Aktionen unterschiedlich reagieren müssen (z. B. separate API-Calls für Create/Update/Delete).

---

### Backend-Integration & Debouncing

#### Muss ich GanttChart-Callbacks debouncen?

**Nein.** Jeder GanttChart-Callback feuert genau einmal an einer klaren Interaktionsgrenze — es gibt nichts zu debouncen:

| Callback | Feuert | Bereits Grenz-gefeuert? |
|---|---|---|
| `onDragStart` | Einmal bei mousedown (Geste beginnt) | ✅ Ja |
| `onTaskMoved` | Einmal bei mouseup — nur wenn Bewegung ≥ 5 px | ✅ Ja |
| `onTaskResized` | Einmal bei mouseup — nur wenn Bewegung ≥ 5 px | ✅ Ja |
| `onTaskCreated/Updated/Deleted` | Einmal bei Dialog-Speichern/Löschen-Bestätigung | ✅ Ja |
| `onTasksChange` | Einmal nach jeder CRUD-Aktion, mit der vollen Liste | ✅ Ja |
| `onTaskClick`, `onMilestoneClick`, `onStatusChange` | Einmal pro diskretem Nutzerklick | ✅ Ja |
| `onExportCSV` | Einmal pro Button-Klick | ✅ Ja |

Du kannst dein Backend direkt in diesen Callbacks aufrufen, ohne Gefahr, es zu überfluten.

#### Typisches Drag-zu-Backend-Muster

```tsx
<GanttChart
  tasks={tasks}
  draggable
  resizable
  onDragStart={(task, type) => {
    // Sofort bei mousedown — für optimistisches UI
    setDragging({ taskId: task.id, type });
  }}
  onTaskMoved={(task, newStart, newEnd) => {
    // Einmal bei mouseup nach bestätigtem Verschieben
    setDragging(null);
    api.updateTask({ ...task, startDate: newStart, endDate: newEnd });
  }}
  onTaskResized={(task, newEnd) => {
    setDragging(null);
    api.updateTask({ ...task, endDate: newEnd });
  }}
/>
```

#### Warum die Bibliothek intern nicht debounced

Die Debounce-Verzögerung ist anwendungsspezifisch:
- 300 ms ist üblich für eine REST-API
- 0 ms ist korrekt für lokalen State oder `useState`
- Echtzeit-Zusammenarbeit (WebSockets, CRDTs) benötigt ggf. eigenes Throttling

Ein eingebautes Debounce würde alle Apps zwingen, dagegen anzukämpfen. Ungethrottelte Callbacks lassen jede App genau die Strategie anwenden, die sie benötigt — einschließlich gar keiner.

> **Hinweis für Editor-Komponenten:** Die Callbacks von `RichTextEditor`, `SqlEditor` und `JsonEditor` feuern bei jedem Tastendruck. Wenn du diese in ein Backend persistierst, lies die Debounce-Hinweise in den jeweiligen User-Manuals.

---

### Eingebaute Dialoge vs. eigene (`enableBuiltinDialogs`)

| | `enableBuiltinDialogs={true}` (Standard) | `enableBuiltinDialogs={false}` |
|---|---|---|
| **Was öffnet** | MUI-Dialoge für Hinzufügen / Bearbeiten / Löschen (eingebaut) | Nichts — du übernimmst die Steuerung |
| **Callbacks** | `onTaskCreated`, `onTaskUpdated`, `onTaskDeleted`, `onTasksChange` | `onAddTask`, `onEditTask`, `onDeleteTask` |
| **Verwenden wenn** | Du eine funktionierende UI ohne eigene Formulare willst | Du eigenes Design, Drawer oder spezielle Validierung brauchst |

**Faustregel:** Mit `enableBuiltinDialogs={true}` starten. Auf `false` nur wechseln, wenn du eigene Formularfelder, ein eigenes Design oder eine spezielle Validierung benötigst, die der eingebaute Dialog nicht abdecken kann.

---

## Texte & Übersetzungen

Alle angezeigten Texte können über die `translations`-Prop überschrieben werden. Es müssen nur die Keys angegeben werden, die vom Standard abweichen.

> **Wichtig:** Die Standardwerte der Komponente sind eine Mischung aus Deutsch (Toolbar-Labels) und Englisch (Status-Labels). Für eine vollständig einheitliche Sprache sollten **alle** Keys gesetzt werden.

Die vorausgefüllten deutschen Standardwerte können direkt importiert werden:

```ts
import { DEFAULT_GANTT_TRANSLATIONS } from '@thebuoyant-tsdev/mui-ts-library';
import type { GanttTranslations } from '@thebuoyant-tsdev/mui-ts-library';

// Vollständiger TypeScript-Typ:
type GanttTranslations = {
  scaleDays: string;
  scaleWeeks: string;
  scaleMonths: string;
  scaleQuarters: string;
  rangeFrom: string;
  rangeTo: string;
  rangeResetTooltip: string;
  scrollToTodayTooltip: string;
  expandAllTooltip: string;
  collapseAllTooltip: string;
  resetViewTooltip: string;
  weekColumnPrefix: string;
  todayLabel?: string;      // "" = Chip ausblenden — @since 2.0.0, siehe Kompatibilitätshinweis unten
  dateLocale: string;
  columnName: string;
  columnStatus: string;
  columnActions: string;
  columnAssignee?: string;  // @since 2.7.0, siehe Kompatibilitätshinweis unten
  addTaskTooltip: string;
  editTaskTooltip: string;
  deleteTaskTooltip: string;
  exportCsvTooltip?: string; // @since 2.7.0, siehe Kompatibilitätshinweis unten
  statusPlanned: string;
  statusInProgress: string;
  statusDone: string;
  statusBlocked: string;
  dialogAddTitle: string;
  dialogEditTitle: string;
  dialogDeleteTitle: string;
  dialogSave: string;
  dialogCancel: string;
  dialogDelete: string;
  dialogFieldName: string;
  dialogFieldStartDate: string;
  dialogFieldEndDate: string;
  dialogFieldStatus: string;
  dialogFieldMilestone: string;
  dialogFieldParent: string;
  dialogFieldParentNone: string;
  dialogDeleteConfirm: string;  // {name} wird durch den Task-Namen ersetzt
  dialogFieldDependencies: string;
  dialogFieldDependenciesNone: string;
  dialogFieldProgress?: string;  // @since 3.16.0, optional — bestehende Literals kompilieren ohne Änderungen
  filterAssigneeAll?: string;    // @since 3.17.0, optional
  filterAssigneeLabel?: string;  // @since 3.17.0, optional
};
```

> **⚠️ Kompatibilitätshinweis:** `todayLabel` (hinzugefügt in `v2.0.0`) und `columnAssignee`/`exportCsvTooltip` (hinzugefügt in `v2.7.0`) sind auf diesem Typ optional — im Gegensatz zu den anderen Keys, die required sind. Das ist beabsichtigt: dadurch bleibt älterer Code, der ein vollständiges `GanttTranslations`-Literal deklariert (statt ein partielles Objekt an die `translations`-Prop zu übergeben), auch bei zukünftigen neuen Keys kompilierbar. Intern löst die Komponente fehlende Keys immer gegen `DEFAULT_GANTT_TRANSLATIONS` auf — sie müssen also nie angegeben werden.

| Key | Standard-Wert | Beschreibung |
|---|---|---|
| `scaleDays` | `"Tage"` | Toolbar-Button für Tages-Skala |
| `scaleWeeks` | `"Wochen"` | Toolbar-Button für Wochen-Skala |
| `scaleMonths` | `"Monate"` | Toolbar-Button für Monats-Skala |
| `scaleQuarters` | `"Quartale"` | Toolbar-Button für Quartals-Skala |
| `rangeFrom` | `"Von"` | Label des Start-Datumseingabe |
| `rangeTo` | `"Bis"` | Label des End-Datumseingabe |
| `rangeResetTooltip` | `"Bereich zurücksetzen"` | Tooltip des Zurücksetzen-Buttons |
| `scrollToTodayTooltip` | `"Zum heutigen Tag"` | Tooltip des Heute-Buttons |
| `expandAllTooltip` | `"Alle aufklappen"` | Tooltip des Aufklappen-Buttons |
| `collapseAllTooltip` | `"Alle zuklappen"` | Tooltip des Zuklappen-Buttons |
| `resetViewTooltip` | `"Ansicht zurücksetzen"` | Tooltip des Ansicht-Reset-Buttons |
| `weekColumnPrefix` | `"KW"` | Prefix für Kalenderwochen-Spalten (z. B. „KW 12"). Englisch: `"W"` |
| `todayLabel` | `"Heute"` | Beschriftung des Chips, der am oberen Ende der gestrichelten Heute-Linie schwebt. `""` blendet den Chip vollständig aus. |
| `dateLocale` | `"de-DE"` | BCP-47-Locale für die Datumsformatierung im Timeline-Header (z. B. `"en-US"`, `"fr-FR"`) |
| `columnName` | `"Name"` | Spaltenheader des linken Panels |
| `columnStatus` | `"Status"` | Spaltenheader des Status-Chips |
| `columnActions` | `"Aktionen"` | Spaltenheader der Aktions-Icons |
| `columnAssignee` | `"Assignee"` | Spaltenheader der Assignee-Spalte — sichtbar bei `showAssigneeColumn={true}` |
| `addTaskTooltip` | `"Aufgabe hinzufügen"` | Tooltip des Plus-Icons in einer Zeile |
| `editTaskTooltip` | `"Aufgabe bearbeiten"` | Tooltip des Stift-Icons |
| `deleteTaskTooltip` | `"Aufgabe löschen"` | Tooltip des Papierkorb-Icons |
| `exportCsvTooltip` | `"Als CSV exportieren"` | Toolbar-Tooltip des CSV-Export-Buttons — sichtbar bei `showExportCSV={true}` |
| `statusPlanned` | `"Planned"` | Label für Status „geplant" |
| `statusInProgress` | `"In Progress"` | Label für Status „in Bearbeitung" |
| `statusDone` | `"Done"` | Label für Status „erledigt" |
| `statusBlocked` | `"Blocked"` | Label für Status „blockiert" |
| `dialogAddTitle` | `"Aufgabe hinzufügen"` | Titel des Hinzufügen-Dialogs |
| `dialogEditTitle` | `"Aufgabe bearbeiten"` | Titel des Bearbeiten-Dialogs |
| `dialogDeleteTitle` | `"Aufgabe löschen"` | Titel des Löschen-Dialogs |
| `dialogSave` | `"Speichern"` | Speichern-Button im Dialog |
| `dialogCancel` | `"Abbrechen"` | Abbrechen-Button im Dialog |
| `dialogDelete` | `"Löschen"` | Löschen-Button im Bestätigungs-Dialog |
| `dialogFieldName` | `"Name"` | Formularfeld-Label für den Task-Namen |
| `dialogFieldStartDate` | `"Startdatum"` | Formularfeld-Label für das Startdatum |
| `dialogFieldEndDate` | `"Enddatum"` | Formularfeld-Label für das Enddatum |
| `dialogFieldStatus` | `"Status"` | Formularfeld-Label für den Status |
| `dialogFieldMilestone` | `"Ist Meilenstein"` | Checkbox-Label für Meilenstein-Flag |
| `dialogFieldParent` | `"Übergeordnete Aufgabe"` | Formularfeld-Label für den Parent-Task |
| `dialogFieldParentNone` | `"— Keine —"` | Option für „kein übergeordneter Task" |
| `dialogFieldDependencies` | `"Vorgänger"` | Formularfeld-Label für Abhängigkeiten |
| `dialogFieldDependenciesNone` | `"— Keine —"` | Option für „keine Abhängigkeiten" |
| `dialogFieldProgress` | `"Fortschritt (%)"` | Slider-Label im Hinzufügen-/Bearbeiten-Dialog — **optional**, hinzugefügt in v3.16.0 |
| `filterAssigneeAll` | `"Alle"` | „Alle"-Option im Assignee-Filter-Dropdown — **optional**, hinzugefügt in v3.17.0 |
| `filterAssigneeLabel` | `"Assignee"` | Label des Assignee-Filter-Selects in der Toolbar — **optional**, hinzugefügt in v3.17.0 |
| `dialogDeleteConfirm` | `"Soll die Aufgabe \"{name}\" wirklich gelöscht werden?"` | Bestätigungstext. `{name}` wird durch den Task-Namen ersetzt. |

**Vollständige englische Übersetzung:**

```tsx
<GanttChart
  tasks={tasks}
  translations={{
    scaleDays: 'Days',
    scaleWeeks: 'Weeks',
    scaleMonths: 'Months',
    scaleQuarters: 'Quarters',
    rangeFrom: 'From',
    rangeTo: 'To',
    rangeResetTooltip: 'Reset range',
    scrollToTodayTooltip: 'Scroll to today',
    expandAllTooltip: 'Expand all',
    collapseAllTooltip: 'Collapse all',
    resetViewTooltip: 'Reset view',
    weekColumnPrefix: 'W',
    todayLabel: 'Today',
    dateLocale: 'en-US',
    columnName: 'Name',
    columnStatus: 'Status',
    columnActions: 'Actions',
    addTaskTooltip: 'Add task',
    editTaskTooltip: 'Edit task',
    deleteTaskTooltip: 'Delete task',
    statusPlanned: 'Planned',
    statusInProgress: 'In Progress',
    statusDone: 'Done',
    statusBlocked: 'Blocked',
    dialogAddTitle: 'Add Task',
    dialogEditTitle: 'Edit Task',
    dialogDeleteTitle: 'Delete Task',
    dialogSave: 'Save',
    dialogCancel: 'Cancel',
    dialogDelete: 'Delete',
    dialogFieldName: 'Name',
    dialogFieldStartDate: 'Start Date',
    dialogFieldEndDate: 'End Date',
    dialogFieldStatus: 'Status',
    dialogFieldMilestone: 'Is Milestone',
    dialogFieldParent: 'Parent Task',
    dialogFieldParentNone: '— None —',
    dialogFieldDependencies: 'Predecessors',
    dialogFieldDependenciesNone: '— None —',
    dialogFieldProgress: 'Progress (%)',   // optional — hinzugefügt in v3.16.0
    filterAssigneeAll: 'All',              // optional — hinzugefügt in v3.17.0
    filterAssigneeLabel: 'Assignee',       // optional — hinzugefügt in v3.17.0
    dialogDeleteConfirm: 'Delete task "{name}"?',
  }}
/>
```

---

## Anwendungsbeispiele

### Nur-Lese-Ansicht (keine Bearbeitung)

```tsx
<GanttChart
  tasks={tasks}
  timeScale="weeks"
  showToolbar={false}
  enableBuiltinDialogs={false}
  onTaskClick={(task) => console.log('Geklickt:', task.name)}
/>
```

### Vollständig interaktiv mit externem State

```tsx
const [tasks, setTasks] = useState<GanttTask[]>(initialTasks);

<GanttChart
  tasks={tasks}
  draggable
  resizable
  cascadeDependencies
  inlineEdit
  progressDraggable
  zoomable
  showCriticalPath
  onTasksChange={setTasks}
  onTaskCreated={(task) => api.createTask(task)}
  onTaskUpdated={(task) => api.updateTask(task)}
  onTaskDeleted={(id) => api.deleteTask(id)}
/>
```

### Mit benutzerdefiniertem Bearbeiten-Dialog

```tsx
const [editTarget, setEditTarget] = useState<GanttTask | null>(null);

<GanttChart
  tasks={tasks}
  enableBuiltinDialogs={false}
  onEditTask={(task) => setEditTarget(task)}
  onAddTask={(parent) => openCreateDialog(parent)}
  onDeleteTask={(task) => openDeleteConfirm(task)}
/>
{editTarget && <MyCustomDialog task={editTarget} onClose={() => setEditTarget(null)} />}
```

### Meilensteine

```tsx
const tasks: GanttTask[] = [
  {
    id: 'release',
    name: 'Release v2.0',
    status: 'planned',
    startDate: new Date('2025-06-30'),
    endDate: new Date('2025-06-30'),
    isMilestone: true,
  },
];
```

### Virtualisierung für große Datensätze

```tsx
// Empfohlen ab ca. 200 Tasks
<GanttChart
  tasks={largeTasks}
  virtualizeRows
  height={600}
/>
```

---

## Heute-Linie & Chip

Die gestrichelte Heute-Linie markiert das aktuelle Datum in der Timeline. Am oberen Ende dieser Linie schwebt ein kleiner beschrifteter **Chip**, der genau auf der Grenze zwischen Header und Task-Zeilen sitzt.

```tsx
{/* Standard: zeigt "Heute"-Chip */}
<GanttChart tasks={tasks} />

{/* Englisches Label */}
<GanttChart tasks={tasks} translations={{ todayLabel: 'Today' }} />

{/* Chip vollständig ausblenden */}
<GanttChart tasks={tasks} translations={{ todayLabel: '' }} />
```

**Anpassungsmöglichkeiten:**

| Aspekt | Steuerung |
|---|---|
| Chip-Label | `translations.todayLabel` (Standard: `"Heute"`, `""` = kein Chip) |
| Chip- & Linienfarbe | `ganttTheme.todayLineColor` (Standard: MUI `primary.main`) |
| Datumsformat im Tooltip | `translations.dateLocale` (BCP-47, z. B. `"de-DE"`) |

Beim Hover auf den Chip erscheint ein Tooltip mit dem vollständigen lokalisierten Datum (z. B. „Mittwoch, 27. Mai 2026").

---

## Ctrl+Scroll-Zoom

> **macOS:** Bitte `Cmd ⌘ + Scroll` statt `Strg + Scroll` verwenden.

Bei `zoomable={true}` kann der Nutzer direkt in der Timeline durch die Zoom-Stufen wechseln:

| Aktion | Ergebnis |
|---|---|
| `Strg + Scroll hoch` / `Cmd ⌘ + Scroll hoch` | Hereinzoomen — wechselt `Quartale` → `Monate` → `Wochen` → `Tage` |
| `Strg + Scroll runter` / `Cmd ⌘ + Scroll runter` | Herauszoomen — wechselt `Tage` → `Wochen` → `Monate` → `Quartale` |

```tsx
<GanttChart tasks={tasks} zoomable />
```

`zoomable` ist standardmäßig `false`, um unbeabsichtigtes Zoomen beim Scrollen der Seite zu vermeiden.

---

## Kritischer Pfad verstehen

> **Neu im Projektmanagement?** Der kritische Pfad ist die längste ununterbrochene Kette abhängiger Tasks vom Projektstart bis zum Projektende. Jede Verzögerung auf dem kritischen Pfad verzögert das gesamte Projekt — Tasks außerhalb des kritischen Pfads haben „Puffer" und können sich leicht verschieben, ohne das Enddatum zu beeinflussen.

```tsx
// Kritischen Pfad visuell hervorheben
<GanttChart
  tasks={tasks}
  showCriticalPath
  ganttTheme={{ criticalPathColor: '#e53935' }} // Standard: MUI error.main
/>
```

**Wie er berechnet wird:** Die Komponente findet die Task-Kette, bei der die Summe der Laufzeiten (von der ersten bis zur letzten Abhängigkeit) am längsten ist. Tasks auf dieser Kette werden hervorgehoben — alle anderen nicht.

**Praktischer Tipp:** Wenn ein Task auf dem kritischen Pfad in Verzug gerät, braucht er sofortige Aufmerksamkeit — er schiebt das Projekt-Enddatum direkt nach hinten. Tasks außerhalb des kritischen Pfads haben Spielraum und können vorübergehend niedriger priorisiert werden.

---

## Barrierefreiheit

- Alle Aktions-Icons (Hinzufügen, Bearbeiten, Löschen) sind mit Tooltips versehen, die als `aria-label` dienen.
- Status-Chips verwenden semantische MUI-Farbzuweisungen, die in Dark-Mode-Themes automatisch angepasst werden.
- Die Texte der Toolbar-Buttons und Dialog-Labels sind vollständig über `translations` lokalisierbar, inklusive der `aria`-relevanten Beschriftungen.
- Tastaturnavigation: Dialoge folgen dem MUI-Standard (Fokus-Trap, Escape zum Schließen).

---

## Hinweise und bekannte Einschränkungen

| Thema | Hinweis |
|---|---|
| **Standard-Sprache** | Die Standardtexte sind eine Mischung: Toolbar auf Deutsch, Status-Labels auf Englisch. Für einheitliche Lokalisierung alle Keys setzen. |
| **`virtualizeRows` in jsdom** | In Unit-Tests mit jsdom ist `clientHeight` immer 0, weshalb nur Overscan-Zeilen im DOM erscheinen. Das ist kein Fehler — in realen Browsern funktioniert die Virtualisierung korrekt. |
| **`cascadeDependencies`** | Wirkt nur auf Finish-to-Start-Abhängigkeiten (via `dependencies`-Array). Zirkuläre Abhängigkeiten werden erkannt und abgebrochen. |
| **Fortschritts-Drag** | `progressDraggable` benötigt `progress` in den Task-Daten. Wenn `progress` undefiniert ist, wird der Handle nicht angezeigt. |
