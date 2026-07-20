# mui-ts-library

> [English Version →](README.md)

[![CI](https://github.com/thebuoyant/mui-ts-library/actions/workflows/ci.yml/badge.svg)](https://github.com/thebuoyant/mui-ts-library/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@thebuoyant-tsdev/mui-ts-library)](https://www.npmjs.com/package/@thebuoyant-tsdev/mui-ts-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Eine typsichere React-Komponentenbibliothek auf Basis von **TypeScript** und **MUI (Material UI v9)**. Die Komponenten folgen MUI's Design-Sprache, unterstützen Dark Mode und Theming von Haus aus und werden mit vollständigen TypeScript-Typen, Storybook-Stories und Unit-Tests ausgeliefert.

**[→ Live-Storybook](https://thebuoyant.github.io/mui-ts-library/)** — alle Komponenten interaktiv erkunden, ohne Installation.

**[→ Im Browser ausprobieren (StackBlitz)](https://stackblitz.com/github/thebuoyant/mui-ts-library/tree/main/stackblitz-demo?startScript=dev)** — live bearbeitbare Demo, keine Installation nötig.

---

## Komponenten

15 produktionsreife Komponenten in drei Kategorien. Jede verlinkt zu einer interaktiven Live-Demo und einem vollständigen Manual mit allen Props, Typen und Mustern.

### Interaktive UI

| Komponente | Wofür | Ausprobieren |
|---|---|---|
| [`GanttChart`](#ganttchart) | Drag-and-Drop-Projekt-Timelines mit Meilensteinen, Abhängigkeiten und CSV-Export | [Live-Demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-ganttchart--default) · [Docs](user-manuals/GanttChart.de.md) |
| [`KanbanBoard`](#kanbanboard) | Drag-and-Drop-Kanban-Board mit eingebauten CRUD-Dialogen, WIP-Limits und i18n | [Live-Demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-kanbanboard--default) · [Docs](user-manuals/KanbanBoard.de.md) |
| [`DateRangePicker`](#daterangepicker) | Start- und Enddatum in einem Inline-Picker — schließt die MUI X Pro-Lücke, kostenlos und ohne zusätzliche Abhängigkeiten | [Live-Demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-daterangepicker--default) · [Docs](user-manuals/DateRangePicker.de.md) |
| [`TagSelection`](#tagselection) | Multi-Tag-Autocomplete mit freier Tag-Erstellung und Suchergebnis-Highlighting | [Live-Demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-tagselection--default) · [Docs](user-manuals/TagSelection.de.md) |
| [`PasswordStrengthMeter`](#passwordstrengthmeter) | Echtzeit-Stärke-Feedback mit eingebautem sicheren Passwort-Generator | [Live-Demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-passwordstrengthmeter--default) · [Docs](user-manuals/PasswordStrengthMeter.de.md) |
| [`ColorPicker`](#colorpicker) | Sättigung/Farbton/Alpha-Farbwähler-Panel mit Pipette-Werkzeug — MUI bringt keinen mit | [Live-Demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-colorpicker--default) · [Docs](user-manuals/ColorPicker.de.md) |

### Code-Editoren

| Komponente | Wofür | Ausprobieren |
|---|---|---|
| [`RichTextEditor`](#richtexteditor) | WYSIWYG-Editing (TipTap v3) mit Tabellen, Bildern und Emoji-Picker | [Live-Demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-richtexteditor--default) · [Docs](user-manuals/RichTextEditor.de.md) |
| [`SqlEditor`](#sqleditor) | SQL-Editing (CodeMirror 6) mit dialekt-bewusstem Autocomplete und Query-Verlauf | [Live-Demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-sqleditor--default) · [Docs](user-manuals/SqlEditor.de.md) |
| [`JsonEditor`](#jsoneditor) | JSON-Editing (CodeMirror 6) mit Schema-Validierung, Folding und Path Finder | [Live-Demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-jsoneditor--default) · [Docs](user-manuals/JsonEditor.de.md) |

### D3-Datenvisualisierung

| Komponente | Wofür | Ausprobieren |
|---|---|---|
| [`SunburstChart`](#sunburstchart) | Hierarchische Daten als konzentrische Ringe — Drill-Down mit `Ctrl+Click` | [Live-Demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-sunburstchart--default) · [Docs](user-manuals/SunburstChart.de.md) |
| [`ChordChart`](#chordchart) | Fluss und Beziehungen zwischen benannten Gruppen als kreisförmiges Diagramm | [Live-Demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-chordchart--default) · [Docs](user-manuals/ChordChart.de.md) |
| [`RadialTreeChart`](#radialtreechart) | Org-Charts und Taxonomien als radialer Baum, mit Drill-Down | [Live-Demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-radialtreechart--default) · [Docs](user-manuals/RadialTreeChart.de.md) |
| [`CirclePackingChart`](#circlepackingchart) | Verschachtelte Kreise mit animiertem Zoom — Speicher und Hierarchie auf einen Blick | [Live-Demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-circlepackingchart--default) · [Docs](user-manuals/CirclePackingChart.de.md) |
| [`HorizontalTreeChart`](#horizontaltreechart) | Entscheidungsbäume und Hierarchien in 4 Orientierungen (LR/RL/TB/BT) | [Live-Demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-horizontaltreechart--default) · [Docs](user-manuals/HorizontalTreeChart.de.md) |
| [`RadialStackedBarChart`](#radialstackedbarchart) | Mehrreihige gestapelte Balken in polarem Layout — Kategorien über Segmente vergleichen | [Live-Demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-radialstackedbarchart--default) · [Docs](user-manuals/RadialStackedBarChart.de.md) |

Alle Charts teilen sich Ctrl / Cmd ⌘+Scroll-Zoom und vollständige MUI-Theme-Integration (Dark Mode inklusive).

---

## Installation

### Schritt 1 — Bibliothek installieren

```bash
npm install @thebuoyant-tsdev/mui-ts-library
```

### Schritt 2 — Peer-Dependencies installieren

Falls MUI noch nicht im Projekt vorhanden ist:

```bash
npm install react@^19 react-dom@^19 @mui/material@^9 @emotion/react @emotion/styled @mui/icons-material@^9
```

### Schritt 3 — Fertig

Beliebige Komponente importieren — TypeScript-Typen sind automatisch verfügbar:

```tsx
import { GanttChart, JsonEditor, useConfirm } from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Schnellstart

Die App wie gewohnt in MUI's `ThemeProvider` einschließen — alle Komponenten funktionieren ohne zusätzlichen Provider.

### GanttChart

Interaktive Projekt-Timeline für Planung und Aufgaben-Tracking. Einsetzbar in Projektmanagement-Dashboards, Sprint-Planern und Ressourcenansichten — mit Drag & Drop, Größenänderung, Ctrl / Cmd ⌘+Scroll-Zoom, Meilensteinen, Abhängigkeiten und Heute-Chip.

```tsx
import { GanttChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { GanttTask } from '@thebuoyant-tsdev/mui-ts-library';

const tasks: GanttTask[] = [
  { id: '1', name: 'Phase 1', status: 'in-progress', startDate: new Date('2026-01-01'), endDate: new Date('2026-03-31') },
  { id: '2', name: 'Go-Live', status: 'planned', startDate: new Date('2026-03-31'), endDate: new Date('2026-03-31'), isMilestone: true },
];

<GanttChart tasks={tasks} timeScale="months" height={500} draggable resizable zoomable onTasksChange={save} />
```

→ [Vollständige Dokumentation](user-manuals/GanttChart.de.md)

---

### KanbanBoard

Ein Drag-and-Drop-Kanban-Board mit eingebauten Hinzufügen-/Bearbeiten-/Löschen-Dialogen, WIP-Limits und vollständiger i18n. Ideal für Task-Management-Dashboards, Sprint-Boards oder jeden Workflow, bei dem Nutzer Aufgaben zwischen Statusspalten verschieben sollen — mit Kartenfarben, Prioritäts-Punkten, Zuständige-Person-Chips, Fälligkeitsdatum-Chips mit Überfälligkeits-Warnung und `filterText`-Prop für Live-Suche.

```tsx
import { KanbanBoard } from '@thebuoyant-tsdev/mui-ts-library';
import type { KanbanColumn, KanbanTask } from '@thebuoyant-tsdev/mui-ts-library';
import { useState } from 'react';

const columns: KanbanColumn[] = [
  { id: 'todo',        label: 'Zu erledigen', color: '#9e9e9e' },
  { id: 'in-progress', label: 'In Arbeit',    color: '#2196f3' },
  { id: 'done',        label: 'Erledigt',     color: '#4caf50' },
];

function App() {
  const [tasks, setTasks] = useState<KanbanTask[]>([
    { id: '1', title: 'Projekt aufsetzen',  status: 'todo',        assignee: 'Alice' },
    { id: '2', title: 'Feature umsetzen',   status: 'in-progress', assignee: 'Bob', dueDate: new Date('2026-08-01') },
    { id: '3', title: 'Tests schreiben',    status: 'done' },
  ]);

  return (
    <KanbanBoard
      columns={columns}
      tasks={tasks}
      onTasksChange={setTasks}
      height={500}
    />
  );
}
```

→ [Vollständige Dokumentation](user-manuals/KanbanBoard.de.md)

---

### DateRangePicker

Start- und Enddatum in einem einzigen Inline-Picker — kein MUI X Pro-Lizenz erforderlich. Entwickelt für Formulare, Filter und Buchungsflows. Unterstützt Controlled/Uncontrolled-Modus, `minDate`/`maxDate`, `required`, Inline-Validierung und vollständige i18n. `onChange` gibt für jedes Datum sowohl ein `Date`-Objekt als auch einen ISO-String zurück.

```tsx
import { DateRangePicker } from '@thebuoyant-tsdev/mui-ts-library';
import type { DateRange, DateRangeInput } from '@thebuoyant-tsdev/mui-ts-library';
import { useState } from 'react';

function App() {
  const [range, setRange] = useState<DateRangeInput>({ start: null, end: null });

  return (
    <DateRangePicker
      value={range}
      onChange={(r) => setRange({ start: r.start?.date ?? null, end: r.end?.date ?? null })}
      required
      translation={{ fromLabel: 'Von', toLabel: 'Bis' }}
    />
  );
}
```

→ [Vollständige Dokumentation](user-manuals/DateRangePicker.de.md)

---

### TagSelection

Multi-Select-Eingabe mit Autocomplete für Tag- und Label-Verwaltung. Ideal für Filter-UIs, Content-Tagging, Skill-Auswahl und alle Szenarien, in denen Nutzer aus einer vordefinierten Liste wählen oder neue Einträge erstellen sollen.

```tsx
import { TagSelection } from '@thebuoyant-tsdev/mui-ts-library';
import type { TagSelectionItem } from '@thebuoyant-tsdev/mui-ts-library';

const tags: TagSelectionItem[] = [
  { id: 'react', label: 'React', selected: true },
  { id: 'ts',    label: 'TypeScript' },
];

<TagSelection tags={tags} onTagsChange={(selected) => console.log(selected)} />
```

→ [Vollständige Dokumentation](user-manuals/TagSelection.de.md)

---

### PasswordStrengthMeter

Passwort-Eingabe mit Echtzeit-Stärke-Feedback und eingebautem sicheren Passwort-Generator. Konzipiert für Registrierungs- und Passwort-Änderungs-Flows — Nutzer zu starken Passwörtern führen oder per Klick eines generieren lassen.

```tsx
import { PasswordStrengthMeter } from '@thebuoyant-tsdev/mui-ts-library';

<PasswordStrengthMeter
  passwordMinLength={10}
  showSegmentedBar
  showConfirmField                 // zweites Feld mit ✓/✗ Match-Validierung
  showPasswordGenerator            // generiert ein kryptographisch sicheres Passwort
  generatorOptions={{ length: 20 }}
  onPasswordChange={(password, result) => console.log(result.score)}
  onConfirmChange={(value, matches) => console.log('Übereinstimmung:', matches)}
  onPasswordGenerated={(pw) => console.log('Generiert:', pw)}
/>
```

→ [Vollständige Dokumentation](user-manuals/PasswordStrengthMeter.de.md)

---

### ColorPicker

Ein Sättigung/Farbton/Alpha-Farbwähler-Panel — schließt eine echte MUI-Lücke, denn MUI bringt überhaupt keinen Farbwähler mit. Nutze es für Theme-Customizer, Markenfarben-Auswahl oder Design-System-Playgrounds. Vollständig kontrolliert; du besitzt `value` und aktualisierst es über `onChange`.

```tsx
import { useState } from 'react';
import { ColorPicker } from '@thebuoyant-tsdev/mui-ts-library';

function BrandColorPicker() {
  const [color, setColor] = useState('#1976d2');

  return (
    <ColorPicker
      value={color}
      onChange={(hex) => setColor(hex)}
      savedColors={['#f44336', '#2196f3', '#4caf50', '#ffeb3b']}
    />
  );
}
```

| Neu in v3.23.0 | |
|---|---|
| **`format`-Prop** | Kontrolliertes Anzeigeformat (`'hex' \| 'rgb' \| 'hsl'`) — der Parent bestimmt das aktive Format, z.B. um den Picker programmatisch per Formular-Reset zurückzusetzen. Mit `onFormatChange` kombinieren. Weglassen für `defaultFormat` (unkontrolliert, bisheriges Verhalten). |

→ [Vollständige Dokumentation](user-manuals/ColorPicker.de.md)

---

### RichTextEditor

Vollständiger WYSIWYG-Editor für formatierte Langtexte. Ideal für CMS-Felder, E-Mail-Templates, Kommentarbereiche und alle Eingaben, die mehr als ein einfaches `<textarea>` benötigen — mit Toolbar, Tabellen, Bild-Embed, Emoji-Picker, Vollbild und Markdown-Einfügen.

```tsx
import { RichTextEditor } from '@thebuoyant-tsdev/mui-ts-library';

<RichTextEditor
  placeholder="Hier tippen …"
  onChange={(html) => console.log(html)}
/>
```

→ [Vollständige Dokumentation](user-manuals/RichTextEditor.de.md)

---

### SqlEditor

SQL-Code-Editor mit Syntax-Highlighting, dialektbewusstem Autocomplete und Inline-Linting. Konzipiert für Developer-Tools, Datenbank-Clients und Admin-Panels — mit `Cmd+Enter` (Ausführen) und `Shift+Alt+F` (SQL formatieren) als Tastenkürzel, Multi-Dialekt-Support (MySQL, PostgreSQL, SQLite, MSSQL) und Schema-basiertem Autocomplete.

```tsx
import { SqlEditor } from '@thebuoyant-tsdev/mui-ts-library';

<SqlEditor
  placeholder="SQL-Abfrage eingeben …"
  dialect="postgresql"
  onChange={(sql) => console.log(sql)}
  onExecute={(sql) => query(sql)}
/>
```

→ [Vollständige Dokumentation](user-manuals/SqlEditor.de.md)

---

### JsonEditor

JSON-Code-Editor mit Echtzeit-Validierung, Formatierung und optionaler Minimap. Ideal für Konfigurations-Panels, API-Explorer und Developer-Tools — mit sofortigen Fehler-Markierungen, Format- und Komprimieren-Buttons sowie Cursorpositionsanzeige.

```tsx
import { JsonEditor } from '@thebuoyant-tsdev/mui-ts-library';

<JsonEditor
  placeholder="JSON eingeben …"
  showValidation
  showMinimap
  onChange={(json) => console.log(json)}
/>
```

→ [Vollständige Dokumentation](user-manuals/JsonEditor.de.md)

---

### SunburstChart

Hierarchische Datenvisualisierung als konzentrische Ringe — Wurzel im Zentrum, jede Tiefenebene bildet einen Ring. Perfekt für Budget-Aufschlüsselungen, Org-Charts, Dateisystemgrößen und alle Daten, die sowohl hierarchisch als auch proportional sind. Ctrl+Click zum Drill-down in ein Segment.

```tsx
import { SunburstChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { SunburstChartData } from '@thebuoyant-tsdev/mui-ts-library';

const data: SunburstChartData = {
  id: 'root', name: 'Budget',
  children: [
    { id: 'eng',  name: 'Engineering', children: [
      { id: 'fe', name: 'Frontend', value: 480 },
      { id: 'be', name: 'Backend',  value: 620 },
    ]},
    { id: 'sales', name: 'Vertrieb', value: 890 },
  ],
};

<SunburstChart
  data={data}
  size={500}
  onSegmentClick={(info) => console.log(info.path, info.value)}
/>
```

**Zoom:** `Ctrl+Click` → Drill-down · `Ctrl / Cmd ⌘+Doppelklick` → Zoom out · `Escape` → Reset

→ [Vollständige Dokumentation](user-manuals/SunburstChart.de.md)

---

### ChordChart

Fluss- und Beziehungsvisualisierung zwischen benannten Gruppen als Kreisdiagramm. Ideal für Abhängigkeitskarten, Migrationsflüsse, Handelsbeziehungen und alle Quelle→Ziel-Daten mit numerischem Gewicht. Hover über eine Gruppe hebt deren Verbindungen hervor, Klick löst Callbacks aus.

```tsx
import { ChordChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { ChordChartData } from '@thebuoyant-tsdev/mui-ts-library';

const data: ChordChartData[] = [
  { source: 'Frontend', target: 'Backend',  value: 45 },
  { source: 'Backend',  target: 'Frontend', value: 20 },
  { source: 'Backend',  target: 'DevOps',   value: 35 },
];

<ChordChart
  data={data}
  size={500}
  onGroupClick={(info) => console.log(info.name, info.valueOut)}
  onChordClick={(info) => console.log(info.source.name, '→', info.target.name)}
/>
```

→ [Vollständige Dokumentation](user-manuals/ChordChart.de.md)

---

### RadialTreeChart

Hierarchische Daten als radialer Baum — Knoten auf konzentrischen Ringen, verbunden durch geschwungene Links. Ideal für Org-Charts, Skill-Taxonomien und Abhängigkeitsbäume. `Ctrl / Cmd ⌘+Click` bohrt in Teilbäume, `Ctrl / Cmd ⌘+Scroll` zoomt.

```tsx
import { RadialTreeChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { RadialTreeChartData } from '@thebuoyant-tsdev/mui-ts-library';

const data: RadialTreeChartData = {
  id: 'ceo', name: 'CEO', subname: 'Führung',
  children: [
    { id: 'cto', name: 'CTO', subname: 'Technologie',
      children: [
        { id: 'fe', name: 'Frontend Lead' },
        { id: 'be', name: 'Backend Lead'  },
      ]},
    { id: 'cpo', name: 'CPO', subname: 'Produkt' },
  ],
};

<RadialTreeChart
  data={data}
  size={600}
  drillable    // Ctrl / Cmd ⌘+Click zum Drill-in, DblClick zurück
  zoomable     // Ctrl / Cmd ⌘+Scroll zum Zoomen
  showNodePopover
  onNodeClick={(info) => console.log(info.name, info.depth)}
/>
```

→ [Vollständige Dokumentation](user-manuals/RadialTreeChart.de.md)

---

### CirclePackingChart

Hierarchische Daten als verschachtelte Kreise, proportional zum Wert skaliert. Ideal für Speicherplatz-Auswertungen, Budget-Übersichten oder jede Hierarchie, bei der relative Größe auf einen Blick zählt. `Ctrl / Cmd ⌘+Click` (oder Doppelklick) auf einen Kreis mit Kindern zoomt mit sanfter animierter Transition hinein; Klick auf den Hintergrund oder `Escape` zoomt zurück.

```tsx
import { CirclePackingChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { CirclePackingData } from '@thebuoyant-tsdev/mui-ts-library';

const data: CirclePackingData = {
  id: 'disk', name: 'Festplatte',
  children: [
    { id: 'photos', name: 'Fotos', value: 120 },
    { id: 'videos', name: 'Videos', value: 340 },
    { id: 'apps', name: 'Apps',
      children: [
        { id: 'xcode', name: 'Xcode', value: 48 },
        { id: 'docker', name: 'Docker', value: 12 },
      ]},
  ],
};

<CirclePackingChart
  data={data}
  size={500}
  onCircleClick={(info) => console.log(info.name, info.value)}
/>
```

→ [Vollständige Dokumentation](user-manuals/CirclePackingChart.de.md)

---

### HorizontalTreeChart

Hierarchische Daten als links-nach-rechts (oder eine der 4 Ausrichtungen) Entscheidungsbaum mit geschwungenen Links. Ideal für Entscheidungslogik, Eskalationspfade oder Org-Charts, die natürlicher von oben nach unten oder seitlich gelesen werden als radial. `Ctrl / Cmd ⌘+Click` bohrt in Teilbäume, `Ctrl / Cmd ⌘+Scroll` zoomt.

```tsx
import { HorizontalTreeChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { HorizontalTreeData } from '@thebuoyant-tsdev/mui-ts-library';

const data: HorizontalTreeData = {
  id: 'ticket', name: 'Neues Ticket',
  children: [
    { id: 'bug', name: 'Bug', specialValueA: 'P1 — 4h SLA',
      children: [
        { id: 'bug-fe', name: 'Frontend-Team' },
        { id: 'bug-be', name: 'Backend-Team'  },
      ]},
    { id: 'feature', name: 'Feature-Anfrage', specialValueA: 'P3 — Backlog' },
  ],
};

<HorizontalTreeChart
  data={data}
  orientation="LR"
  width={700}
  drillable
  onNodeClick={(info) => console.log(info.name, info.depth)}
/>
```

→ [Vollständige Dokumentation](user-manuals/HorizontalTreeChart.de.md)

---

### RadialStackedBarChart

Mehrreihiges gestapeltes Balkendiagramm in polarem Layout. Jedes Balkensegment repräsentiert einen Datenpunkt, jede Bogen-Ebene eine Datenreihe — ideal für Quartalsvergleiche, Budgetaufschlüsselungen oder mehrere Kategorien über eine Menge von Einträgen. Konzentrische Gitterringe geben visuelle Skala; eine automatisch zentrierte Legende ist integriert. `Ctrl / Cmd ⌘+Scroll` zoomt den Chart.

```tsx
import { RadialStackedBarChart } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  RadialStackedBarData,
  RadialStackedBarSeries,
} from '@thebuoyant-tsdev/mui-ts-library';

const keys: RadialStackedBarSeries[] = [
  { key: 'q1', label: 'Q1' },
  { key: 'q2', label: 'Q2' },
  { key: 'q3', label: 'Q3' },
  { key: 'q4', label: 'Q4' },
];

const data: RadialStackedBarData[] = [
  { id: 'berlin',  label: 'Berlin',  values: { q1: 120, q2: 145, q3: 98,  q4: 175 } },
  { id: 'hamburg', label: 'Hamburg', values: { q1: 95,  q2: 110, q3: 130, q4: 88  } },
  { id: 'munich',  label: 'Munich',  values: { q1: 200, q2: 185, q3: 210, q4: 230 } },
];

<RadialStackedBarChart
  data={data}
  keys={keys}
  size={480}
  sortBy="value"
  onBarClick={(info) => console.log(info.label, info.seriesKey, info.value)}
/>
```

→ [Vollständige Dokumentation](user-manuals/RadialStackedBarChart.de.md)

---

## TypeScript

Alle Typen und Defaults werden direkt exportiert — kein separates `@types/...`-Paket nötig.

```tsx
import type {
  // GanttChart
  GanttTask, GanttTranslations, GanttTheme, GanttToolbarConfig,

  // KanbanBoard
  KanbanTask, KanbanColumn, KanbanBoardProps, KanbanBoardTranslation,

  // DateRangePicker
  DateRange, DateRangeEntry, DateRangeInput, DateRangePickerProps, DateRangePickerTranslation,

  // TagSelection
  TagSelectionItem,

  // PasswordStrengthMeter
  CustomRequirement, StrengthResult,

  // RichTextEditor
  RichTextEditorToolbarConfig, RichTextEditorTranslation,

  // SqlEditor
  SqlEditorDialect, SqlEditorTranslation, SqlEditorToolbarConfig,

  // JsonEditor
  JsonEditorHighlightColors, JsonEditorTranslation, JsonEditorToolbarConfig,

  // SunburstChart
  SunburstChartData, SunburstSegmentInfo, SunburstZoomInfo,

  // ChordChart
  ChordChartData, ChordGroupInfo, ChordInfo, ChordSortBy,

  // RadialTreeChart
  RadialTreeChartData, RadialTreeNodeInfo, RadialTreeNodeIconSpec, RadialTreeSortBy,

  // CirclePackingChart
  CirclePackingData, CirclePackingNodeInfo, CirclePackingZoomInfo, CirclePackingSortBy,

  // HorizontalTreeChart
  HorizontalTreeData, HorizontalTreeNodeInfo, HorizontalTreeOrientation,

  // RadialStackedBarChart
  RadialStackedBarData, RadialStackedBarSeries, RadialStackedBarClickInfo,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Versionierung & Abwärtskompatibilität

Dieses Projekt folgt [Semantic Versioning](https://semver.org/):

- **Patch** — nur Bugfixes, jederzeit gefahrlos aktualisierbar.
- **Minor** — neue Features, vollständig abwärtskompatibel.
- **Major** — Breaking Changes, explizit im [Changelog](#changelog) gekennzeichnet.

**Bisher nur ein Breaking Release:** [`3.0.0`](#300--2026-06-15--breaking-changes) hat `ConfirmDialog` / `ConfirmDialogProvider` / `useConfirm` entfernt und die Signatur von `TagSelection`s `onTagCreate` geändert. Jedes andere Release war additiv.

**TypeScript-Hinweis:** Translation-Objekte immer als `Partial<...>` inline übergeben — z.B. `translation={{ noData: 'Keine Daten' }}`. Translation-Typen bekommen mit neuen Features optionale Felder hinzu; `Partial<...>` macht den Code automatisch vorwärtskompatibel.

---

## Changelog

### [Unveröffentlicht]

**Hinzugefügt**
- **KanbanBoard — `subtasks` in `KanbanTask`**: Neues Feld `subtasks?: KanbanSubtask[]` — auf der Karte erscheint ein Fortschrittsbalken (`{erledigt} / {gesamt} ✓`), im Dialog eine Checkliste. Sichtbarkeit über `showSubtasks` steuerbar (Standard `true`).
- **KanbanBoard — Typ `KanbanSubtask`**: Neuer exportierter Typ `{ id: string; title: string; done: boolean }`.
- **KanbanBoard — `+`-Button in Subtask-Zeile**: Beim Hover erscheint ein kleiner `+`-Button mit Tooltip in der Fortschrittszeile der Karte, der den Bearbeiten-Dialog direkt öffnet.
- **KanbanBoard — CSS-Klassen**: `MuiTsKanbanBoard-cardSubtasks` und `MuiTsKanbanBoard-cardSubtasksBar`. Siehe [Vollständiger Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.de.md) für Details.

---

### [3.34.0] — 2026-07-18

**Hinzugefügt**
- **KanbanBoard — `showSearchField`**: Neues Boolean-Prop, das ein eingebautes `size="small"`-Suchfeld mit Lupen-Icon über dem Board rendert. Das Board verwaltet den Filterzustand intern — kein zusätzliches Wiring nötig. Placeholder-Text über `translation.searchFieldPlaceholder` anpassbar. Das bestehende `filterText`-Prop funktioniert weiterhin für Consumer, die ein eigenes Suchfeld bauen.
- **KanbanBoard — `translation.searchFieldPlaceholder`**: Neuer Translation-Key (Standard `"Search by title or assignee…"`).
- **KanbanBoard — CSS-Klassen**: `MuiTsKanbanBoard-searchFieldWrapper` und `MuiTsKanbanBoard-searchField`. Siehe [Vollständiger Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.de.md) für Details.

---

### [3.33.1] — 2026-07-18

**Geändert**
- **KanbanBoard — Docs**: Überblick-Abschnitt und README-Beschreibung aktualisiert — Prioritäts-Punkte, Überfälligkeits-Warnung und `filterText` jetzt in der Einleitung genannt. Siehe [Vollständiger Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.de.md) für Details.

---

### [3.33.0] — 2026-07-18

**Hinzugefügt**
- **KanbanBoard — `filterText`-Prop**: `filterText?: string` filtert sichtbare Karten nach Titel und Zuständiger Person. Der Consumer rendert das Suchfeld selbst und übergibt den String. Spalten-Counter passen sich an; WIP-Limit-Prüfungen nutzen die ungefilterte Gesamtanzahl. Siehe [Vollständiger Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.de.md) für Details.

---

### [3.32.0] — 2026-07-18

**Hinzugefügt**
- **KanbanBoard — `priority`-Feld + `showPriority`-Prop**: `priority?: "low" | "medium" | "high" | "critical"` auf `KanbanTask` — als farbiger Punkt neben dem Kartentitel. `showPriority={false}` blendet alle Punkte aus. Neuer Typ-Export: `KanbanTaskPriority`. Siehe [Vollständiger Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.de.md) für Details.

---

### [3.31.0] — 2026-07-18

**Hinzugefügt**
- **KanbanBoard — `showDueDateWarning`**: Überfällige Karten (dueDate in der Vergangenheit) erhalten automatisch roten Chip, Hintergrundton und linken Rahmen. `showDueDateWarning={false}` zum Deaktivieren. Siehe [Vollständiger Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.de.md) für Details.
- **KanbanBoard — `width`-Prop**: `width?: number | string` (Standard `"100%"`).

**Behoben**
- **KanbanBoard — Spalten-Scroll**: Karten in einer hohen Spalte scrollen jetzt korrekt statt still abgeschnitten zu werden.

**Geändert**
- **KanbanBoard — Kartenoptik poliert**: Expliziter `1px`-Rahmen, kontrollierter Box-Shadow mit Hover-Lift, ausgeblendeter Scrollbalken, `fontWeight: 700`-Titel. Siehe [Vollständiger Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.de.md) für Details.

---

### [3.30.0] — 2026-07-17

**Hinzugefügt**
- **KanbanBoard** — neue Drag-and-Drop-Kanban-Board-Komponente mit eingebauten CRUD-Dialogen, WIP-Limits, Kartenfarben, Zuständige-Person- und Fälligkeitsdatum-Chips, `chipVariant`-Prop, vollständiger i18n und CSS-Klassen-API (`kanbanBoardClasses`). Siehe [Vollständiger Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.de.md) für Details.

---

### [3.29.2] — 2026-07-16

**Behoben**
- `README.md` / `README.de.md`: fehlende `DateRangePicker`-Typen im TypeScript-Import-Block nachgetragen. Siehe [Vollständiger Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.de.md) für Details.

---

### [3.29.1] — 2026-07-16

**Behoben**
- Release-Script und README-Dateien: Der leere `[Unveröffentlicht]`-Abschnitt, der über `[3.29.0]` auf npm angezeigt wurde, wurde entfernt; `release.sh` ersetzt `[Unveröffentlicht]` in README-Dateien jetzt direkt durch die Versionsnummer (kein leerer Platzhalter-Abschnitt mehr). Siehe [Vollständiger Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.de.md) für Details.

---

### [3.29.0] — 2026-07-16

**Hinzugefügt**
- **DateRangePicker** — neue inline Start- und Enddatum-Picker-Komponente — ohne MUI X Pro Lizenz. Kontrollierter und unkontrollierter Modus, `minDate`/`maxDate`, `required`-Validierung mit Touched-State, vollständige i18n über `translation`-Prop, CSS-Klassen-API (`dateRangePickerClasses` + gemeinsame `MuiTs-disabled`/`MuiTs-error` Zustandsklassen am Root-Element), `inputSize` und `inputMinWidth` zur Verhinderung von Layout-Shifts bei Fehlermeldungen. `onChange` liefert `DateRangeEntry` mit sowohl `Date`-Objekt als auch ISO-String. Siehe [Vollständiger Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.de.md) für Details.

---

### [3.28.1] — 2026-07-15

**Behoben**
- Release-Script: `[Unveröffentlicht]`-Überschriften werden jetzt vor dem Publish automatisch auf die Versionsnummer umbenannt — damit npm immer den korrekten Changelog-Eintrag anzeigt.

---

### [3.28.0] — 2026-07-15

**Hinzugefügt**
- `SqlEditor`: `Shift+Alt+F` Tastenkürzel — löst den vorhandenen SQL-Format-Button direkt aus dem Editor heraus aus (respektiert `readonly` und `toolbarConfig.showFormat`). Keine API-Änderung.

---

### [3.27.1] — 2026-07-14

**Behoben**
- `GanttChart`: Das linke Task-Panel kann nicht mehr so schmal gezogen werden, dass Spalten-Header überlappen oder Inhalte überlaufen. Der Trenner erzwingt nun eine spaltenbasierte Mindestbreite (Status + Aktionen + optionaler Assignee + 80 px für den Namen). Zeilen- und Header-Container schneiden Inhalte sauber mit `overflow: hidden` ab. Keine API-Änderung.

---

### [3.27.0] — 2026-07-14

**Hinzugefügt**
- Hover-Callbacks für alle 6 D3-Charts (`onSegmentHover`, `onGroupHover`, `onChordHover`, `onNodeHover`, `onCircleHover`, `onBarHover`) — feuern mit typisiertem Info-Objekt bei `mouseenter`, `null` bei `mouseleave`. Ermöglicht Linked-View-Muster. Alle Props optional, vollständig abwärtskompatibel.

**Behoben**
- `GanttChart`: `showAssigneeColumn={true}` lässt die Name-Spalte nicht mehr auf ~24 px zusammenfallen. Die initiale Panel-Breite addiert nun automatisch `ASSIGNEE_COL_WIDTH` (110 px) wenn die Spalte aktiviert ist.

---

### [3.26.1] — 2026-07-13

**Behoben**
- README-Changelog-Abschnitte (EN + DE) fehlten auf npmjs.com die Einträge für `[3.25.0]` und `[3.26.0]`. Keine Code-Änderungen.

---

### [3.26.0] — 2026-07-13

**Hinzugefügt**
- **`PopoverColorPicker`** — Convenience-Wrapper, der einen farbigen Swatch-Trigger-Button mit einem MUI-Popover und dem vollen `ColorPicker` kombiniert. Kein `Popover`, `anchorEl` oder Open/Close-State nötig — nur `value` + `onChange`. Alle `ColorPicker`-Props werden direkt durchgereicht. Neue Props: `swatchSize` (Standard `28`) und `swatchShape` (`"square"` | `"circle"`). Vollständig barrierefrei. Neue Exports: `popoverColorPickerClasses`. Vollständig rückwärtskompatibel. Siehe [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.de.md) für Details.

---

### [3.25.0] — 2026-07-12

**Hinzugefügt**
- **`JsonEditor` — Download-Button:** Neuer Toolbar-Button der den Editor-Inhalt als `.json`-Datei exportiert. Standardmäßig sichtbar (`showDownload: true`). Dateiname per `downloadFilename` steuerbar (Standard `"file.json"`). Mit `toolbarConfig={{ showDownload: false }}` ausblendbar. Vollständig rückwärtskompatibel. Siehe [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.de.md) für Details.
- **`GanttChart` — Tastaturnavigation:** Das Task-Panel ist jetzt per Tastatur bedienbar — `Tab` fokussiert, `↑`/`↓` bewegen die Auswahl, `Enter` öffnet den Bearbeiten-Dialog, `Escape` hebt die Auswahl auf. Keine neuen Props erforderlich. Siehe [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.de.md) für Details.

---

### [3.24.1] — 2026-07-10

**Behoben**
- `RichTextEditor`-Toolbar: `H1`/`H2`/`H3`- und `MD`-Button werden jetzt als `<svg><text>` gerendert statt als HTML-`<span>` — konsistente Render-Engine, Strichgewicht und Farbverhalten wie alle anderen SVG-Toolbar-Icons.
- `RadialStackedBarChart`-Stories: ungenutzten Parameter entfernt, der einen ESLint-Fehler verursachte.

---

### [3.24.0] — 2026-07-10

**Hinzugefügt**
- **CSS-Klassen-API** für `TagSelection`, `PasswordStrengthMeter` und `ColorPicker` — jedes bedeutende DOM-Element trägt jetzt einen stabilen `.MuiTs<Komponente>-<Slot>`-Klassennamen. Einzelne Slots per Plain CSS, CSS Modules oder Tailwind stylen ohne MUI-Interna anzufassen. Drei typisierte Konstanten-Objekte exportiert: `tagSelectionClasses`, `passwordStrengthMeterClasses`, `colorPickerClasses` + geteilte `muiTsStateClasses` (`.MuiTs-disabled`, `.MuiTs-error`, …). Siehe [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.de.md) für Details.

---

### [3.23.0] — 2026-07-10

**Hinzugefügt**
- `ColorPicker`: neue `format?: 'hex' | 'rgb' | 'hsl'`-Prop — kontrolliertes Anzeigeformat, ermöglicht dem Parent die Kontrolle über das aktive Format (z.B. für programmatische Form-Resets). Mit `onFormatChange` kombinieren. Ohne diese Prop bleibt das bisherige unkontrollierte Verhalten erhalten. Siehe [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.de.md) für Details.

---

### [3.22.0] — 2026-07-09

**Hinzugefügt**
- `RadialStackedBarChart`, `ChordChart`, `SunburstChart`, `CirclePackingChart`: neue `valueFormatter`-Prop für vollständige Kontrolle über numerische Tooltip-Werte — überschreibt die eingebauten `valueDecimalCount`/Separator-Props wenn gesetzt. `RadialStackedBarChart` erhält zusätzlich ein `seriesKey`-Argument für serienabhängige Formatierung. Siehe [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) für Details.

---

### [3.21.0] — 2026-07-09

**Hinzugefügt**
- `TagSelection`: neue Prop `chipVariant?: 'filled' | 'outlined'` (Standard: `'filled'`) — steuert die MUI-Chip-Variante für alle Tag-Chips im Auswahl-Bereich und im Autocomplete-Dropdown. Consumer mit eigenem Design-System, das `outlined`-Chips bevorzugt, müssen keine Styles mehr manuell überschreiben. Siehe [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) für Details.

---

### [3.20.0] — 2026-07-09

**Hinzugefügt**
- `RichTextEditor`: neue Prop `onMentionInserted?: (item: MentionItem) => void` — feuert wenn der Nutzer ein Element aus dem `@`-Mention-Dropdown auswählt. Das vollständige `MentionItem` (`{ id, label }`) wird übergeben — kein HTML-Parsen nötig. Rein additiv. Siehe [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) für Details.

---

### [3.19.0] — 2026-07-08

**Hinzugefügt**
- `RichTextEditor`: neue Prop `defaultValue?: string` für unkontrollierten Einsatz — setzt den initialen HTML-Inhalt einmalig beim Mount, kein externer State erforderlich. Analog zu MUI TextFields `defaultValue`. Wenn sowohl `value` als auch `defaultValue` angegeben werden, hat `value` Vorrang. Rein additiv. Siehe [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) für Details.

---

### [3.18.0] — 2026-07-08

**Hinzugefügt**
- `RichTextEditor`: neue Prop `onSave?: () => void` — feuert wenn der Nutzer **Ctrl+S** (Windows/Linux) oder **Cmd+S** (macOS) im Editor drückt. Der native „Seite speichern"-Dialog des Browsers wird im Editor immer unterdrückt. Rein additiv — kein bestehendes Verhalten ändert sich. Siehe [Full Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) für Details.

---

### [3.17.1] — 2026-07-05

**Behoben**
- `GanttChart`: Reset-View-Button (`showResetView`) aktiviert sich jetzt wenn ein Assignee-Filter gesetzt ist — bisher blieb der Button inaktiv obwohl ein Klick den Filter korrekt zurückgesetzt hätte. `isViewChanged` berücksichtigt nun korrekt den Assignee-Filter-Zustand.

---

### [3.17.0] — 2026-07-05

**Hinzugefügt**
- `GanttChart`: Assignee-Filter-Dropdown in der Toolbar — `toolbarConfig={{ showAssigneeFilter: true }}` fügt ein Select hinzu, das sichtbare Tasks nach Assignee filtert. Der Filter ist vorfahren-inklusiv (Parent-Tasks bleiben sichtbar wenn Nachkommen passen). Zwei neue optionale Übersetzungsschlüssel: `filterAssigneeAll`, `filterAssigneeLabel`.
- `GanttChart`: `onDragStart(task, type)`-Callback — feuert sofort bei mousedown auf einem zieh-/skalierbaren Balken (vor dem ≥ 5 px-Schwellwert). `type` ist `"move"` oder `"resize"`. Gedacht für optimistisches UI, Analytics und Shadow-Elemente. Kein Debounce nötig — feuert höchstens einmal pro Geste. Siehe [Vollständiger Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) für Details.

---

### [3.16.0] — 2026-07-03

**Hinzugefügt**
- `GanttChart`: Fortschritts-Slider im eingebauten Hinzufügen-/Bearbeiten-Dialog — `GanttTask.progress` (0–100 %) ist jetzt ohne Maus bearbeitbar, schließt eine Accessibility-Lücke für Tastatur-Nutzer. Slider wird im Bearbeiten-Modus aus bestehenden Task-Daten vorbelegt; setzt auf 0 zurück wenn Meilenstein aktiviert wird. Neuer optionaler Übersetzungsschlüssel `dialogFieldProgress`. Siehe [Vollständiger Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) für Details.

---

### [3.15.0] — 2026-07-03

**Hinzugefügt**
- Neue Komponente: `RadialStackedBarChart` — Mehrreihige Stapelbalken im radialen Layout (6. D3-Chart). Features: 20+ Props, konzentrische Gitterringe mit eigenem Formatter, automatisch zentrierte Legende mit Overflow-Schutz, `sortBy`, `colorConfig`, `onBarClick`, `zoomable` und volle Dark-Mode-Unterstützung. Siehe [Vollständiger Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) für Details.

---

### [3.14.1] — 2026-07-02

**Behoben**
- README: fehlender Changelog-Eintrag für 3.14.0 — keine Code-Änderungen.

---

### [3.14.0] — 2026-07-02

**Hinzugefügt**
- RichTextEditor: `@`-Mention-Autocomplete (`mentionItems`, `onMentionSearch`, `mentionTriggerChar`, `translation.mentionNoResults`). Dropdown am Cursor verankert, Tastaturnavigation (↑/↓/Enter/Escape), im HTML-Output als `<span data-type="mention" data-id="…">` serialisiert. Neuer Export: `MentionItem`. Neue Peer-Abhängigkeit: `@tiptap/extension-mention`. Siehe [Vollständiger Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md) für Details.

---

### [3.13.0] — 2026-06-29

**Hinzugefügt**
- Neue Komponente: `ColorPicker` — ein Sättigung/Farbton/Alpha-Farbwähler-Panel mit Pipette-Werkzeug, schließt eine echte MUI-Lücke. Siehe [Quick Start](#colorpicker) und [Changelog](#3130--2026-06-29) für Details.

---

### [3.12.0] — 2026-06-29

**Hinzugefügt**
- TagSelection: `searchDebounceMs` (debounced `onSearchChange`) und `serverSideFilter` (vertraut `tags` als bereits gefiltert, für Fuzzy-/Nicht-Substring-Server-Suche) — schließt die seit längerem offene "Async Search"-Lücke.

**Behoben**
- TagSelection: bei der Umsetzung oben gefunden — ein verirrter zweiter `onSearchChange("")`-Aufruf feuerte direkt nach jedem echten Tastenanschlag (MUIs internes `reason="reset"`-Event). Wird jetzt herausgefiltert.

Details siehe [Changelog](#3120--2026-06-29).

---

### [3.11.3] — 2026-06-29

**Behoben**
- GanttChart: Der eingebaute Task-Dialog schließt jetzt Tasks, die bereits (direkt oder transitiv) vom bearbeiteten Task abhängen, aus dem Dependencies-Dropdown aus — der letzte zurückgestellte Punkt aus dem Bug-Audit von v3.11.2 (kein Schutz gegen Abhängigkeitszyklen). Siehe [Changelog](#3113--2026-06-29).

---

### [3.11.2] — 2026-06-28

**Behoben**
- Eine tiefgreifende Bug-Prüfung über alle 11 Komponenten — veraltete Timer/Listener bei Unmount, `maxTags`-Umgehung, fehlendes `noData`-Rendering auf allen 5 D3-Charts, ChordChart valueIn/valueOut-Fehlzählung im undirected-Modus, HorizontalTreeChart RL/BT-Spiegelung außermittig bei flachen Bäumen, und mehr. Jeder Fix ist mit einem Regressionstest abgesichert. Vollständige Liste siehe [Changelog](#3112--2026-06-28).

---

### [3.11.1] — 2026-06-27

**Behoben**
- TagSelection: doppeltes Tag in der `WithCustomColorCreation`-Storybook-Story — ein Story-Bug, kein Komponenten-Bug. Siehe [Changelog](#3111--2026-06-27).

---

### [3.11.0] — 2026-06-25

**RadialTreeChart & HorizontalTreeChart**
- `duration`: Rein-/Rauszoomen und Escape-Resets crossfaden jetzt statt abrupt zu wechseln (Standard 750ms, `0` deaktiviert).

---

### [3.10.0] — 2026-06-25

**SunburstChart**
- `duration`: Rein-/Rauszoomen animiert jetzt sanft zwischen Fokus-Ebenen (Standard 750ms, `0` deaktiviert).

---

### [3.9.1] — 2026-06-25

**Behoben**
- GanttChart: `GanttTranslations` hatte 3 required Keys, die nach Release ergänzt wurden (`todayLabel`, `columnAssignee`, `exportCsvTooltip`) — jetzt optional, konsistent mit jedem anderen Translation-Typ. Siehe [Versionierung & Abwärtskompatibilität](#versionierung--abwärtskompatibilität).

---

### [3.9.0] — 2026-06-24

**PasswordStrengthMeter**
- `showCopyButton`: Kopier-Icon neben dem Passwortfeld, passt zu `showPasswordGenerator`.

---

### [3.8.0] — 2026-06-23

**RichTextEditor**
- `showPasteAsPlainTextButton`: Toolbar-Toggle, das eingefügten Inhalt von Formatierung befreit.
- `showMarkdownButton` + `onMarkdownChange`: Markdown-Import/Export-Dialog und ein Live-Markdown-Callback.

---

### [3.7.1] — 2026-06-23

**Re-Publish — fehlende README auf npm**
- `v3.7.0` wurde mit leerem `readme`-Registry-Feld veröffentlicht (npmjs.com zeigte keine README, obwohl der Tarball selbst korrekt war). Kein Code oder Inhalt hat sich geändert — diese Version existiert ausschließlich, um die Registry-Metadaten korrekt zu setzen.

---

### [3.7.0] — 2026-06-23

**JsonEditor — Folding, Path Finder und Schema-Validierung**
- Neu: `showFolding` (Fold-Gutter für Objects/Arrays), `enablePathFinder` (`Ctrl+Click` auf einen Wert kopiert den JSON-Path), und `schema`-Prop (strukturelle Validierung mit Inline-Fehler-Diagnostics — Typ, Required, Enum, verschachtelte Strukturen).

---

### [3.6.1] — 2026-06-22

**⚠️ TypeScript-Kompatibilitäts-Fix**
- `v3.4.0`/`v3.5.0` machten neue Translation-Felder auf `TagSelectionTranslation` und `SqlEditorTranslation` erforderlich, was TypeScript-Builds für Code brach, der eine eigenständige Variable gegen den vollen benannten Typ deklariert. Diese Felder sind jetzt optional — alte Objekt-Literale kompilieren wieder, keine Code-Änderung nötig.

---

### [3.6.0] — 2026-06-22

**Storybook & StackBlitz — Praxisnahe Vitrine**
- 17 neue Storybook-Stories über alle 11 Komponenten, jede mit einem komplett anderen, realistischen Datensatz (Festplatten-Analyse, Handelsströme, Bauprojekt-Zeitpläne, Support-Ticket-Routing u.v.m.) statt Prop-Toggle-Varianten auf einer generischen Fixture.
- StackBlitz-Demo-Karten zeigen jetzt eine Use-Case-Kategorie zur schnellen Einordnung, mit geschärftem Hero-Text.

---

### [3.5.0] — 2026-06-22

**SqlEditor — Query-Verlauf**
- Neue Option `toolbarConfig.showHistory` speichert jede ausgeführte Abfrage in `localStorage` und lädt sie per Klick wieder. Neue Props: `queryHistoryKey`, `queryHistoryMaxEntries`.
- D3-Chart-Storybook-Stories demonstrieren jetzt automatisch Drill-down, Zoom und Hover-Highlight beim Laden.

---

### [3.4.0] — 2026-06-21

**Accessibility & Test-Coverage**
- Fehlendes `aria-label` an 13 Icon-only-Buttons in GanttChart, TagSelection und RichTextEditor ergänzt — diese verließen sich bisher nur auf `Tooltip`, was Screenreadern keinen Accessible Name liefert.
- `SqlEditor`: 0 Tests → 82% Line-Coverage. Gesamt-Coverage der Library: 68% → 74% Lines.

---

### [3.3.0] — 2026-06-21

**Tree-Shaking — Build-Output pro Komponente**
- `import { TagSelection } from '@thebuoyant-tsdev/mui-ts-library'` zieht kein D3, TipTap oder CodeMirror mehr ins Bundle — gemessener Rückgang von 1.1 MB auf 22 KB in einem minimalen Testbundle. Keine API-Änderungen.

---

### [3.2.1] — 2026-06-17

**Bugfixes**
- **ChordChart** — Ribbons jetzt im Dark Mode sichtbar (`mixBlendMode` wechselt automatisch auf `"normal"` bei dunklem Hintergrund).
- **HorizontalTreeChart** — Link-Deckkraft-Standard von `0.4` auf `1.0` erhöht, konsistent mit RadialTreeChart.

---

### [3.2.0] — 2026-06-16

**StackBlitz Live Demo**
- Neue interaktive Demo — direkt im Browser öffnen, keine lokale Installation nötig: [→ Im Browser ausprobieren](https://stackblitz.com/github/thebuoyant/mui-ts-library/tree/main/stackblitz-demo?startScript=dev)
- Zeigt TagSelection (mit Search-Highlighting), PasswordStrengthMeter (mit Generator) und GanttChart (Drag & Resize).

---

### [3.1.0] — 2026-06-16

**TagSelection — Suchergebnis-Highlighting**
- Übereinstimmende Teile von Tag-Labels im Dropdown werden beim Tippen **fett** hervorgehoben (z. B. `"Reac"` → **Reac**t).
- Case-insensitiv, keine API-Änderungen.

---

### [3.0.0] — 2026-06-15 — Breaking Changes

**Entfernt**
- `ConfirmDialog`, `ConfirmDialogProvider`, `useConfirm` komplett entfernt. Migration: MUI `Dialog` direkt verwenden oder bei `2.x` bleiben.

**TagSelection — `onTagCreate`-Signatur geändert**
- Vorher: `(label: string, color: TagColor) => void`
- Nachher: `(tag: TagSelectionItem) => void` — Tag ist vollständig konstruiert, enthält bereits `selected: true` und gewählte Farben.

**TagSelection — Custom-Color-Picker**
- Neues Farb-Picker-Panel bei Tag-Erstellung: Hintergrund- und Textfarb-Swatches, Hex-Eingabe, Auto-WCAG-Kontrast-Toggle.

**Chart & Gantt — Farb-Prop-Fix**
- `linkColor`, `labelColor`, `todayColor` und weitere Farb-Props fallen jetzt korrekt auf Theme-Defaults zurück wenn sie `""` (leerer String) sind. Vorher verursachte das unsichtbare Chart-Links in Storybook.

---

[→ Vollständiger Changelog](https://github.com/thebuoyant/mui-ts-library/blob/main/CHANGELOG.md)

---

## Lizenz

MIT © Thomas Schlender
