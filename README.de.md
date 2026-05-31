# mui-ts-library

> [English Version →](README.md)

Eine typsichere React-Komponentenbibliothek auf Basis von **TypeScript** und **MUI (Material UI v9)**. Die Komponenten folgen MUI's Design-Sprache, unterstützen Dark Mode und Theming von Haus aus und werden mit vollständigen TypeScript-Typen, Storybook-Stories und Unit-Tests ausgeliefert.

**[→ Live-Storybook](https://thebuoyant.github.io/mui-ts-library/)** — alle Komponenten interaktiv erkunden, ohne Installation.

---

## Komponenten

| Komponente | Beschreibung | Docs |
|---|---|---|
| [`ConfirmDialog`](#confirmdialog) | Deklarativer Async-Bestätigungs-Dialog — `await confirm({ title, severity })` von überall in der App. Unterstützt Countdown-Auto-Confirm und `Enter` = Bestätigen. | [Vollständiges Manual →](user-manuals/ConfirmDialog.de.md) |
| [`GanttChart`](#ganttchart) | Projekt-Timeline mit hierarchischen Aufgaben, Meilensteinen, Drag & Drop, Ctrl / Cmd ⌘+Scroll-Zoom, Heute-Chip und integrierten CRUD-Dialogen | [Vollständiges Manual →](user-manuals/GanttChart.de.md) |
| [`TagSelection`](#tagselection) | Multi-Tag-Auswahlfeld mit Autocomplete, freier Tag-Erstellung, Overflow-Chips und MUI-Theme-Farben | [Vollständiges Manual →](user-manuals/TagSelection.de.md) |
| [`PasswordStrengthMeter`](#passwordstrengthmeter) | Passwort-Eingabe mit animiertem Stärke-Meter, segmentierter Balkenanzeige, eigenen Anforderungen und Anforderungsliste | [Vollständiges Manual →](user-manuals/PasswordStrengthMeter.de.md) |
| [`RichTextEditor`](#richtexteditor) | WYSIWYG-Editor (TipTap v3) mit Toolbar, Link-Dialog, Textfarbe, Hervorhebung, Wörter-Zähler, Vollbild-Modus, Markdown-Einfügen, Tabellen-Bearbeitung, Bild-Embed und Emoji-Picker | [Vollständiges Manual →](user-manuals/RichTextEditor.de.md) |
| [`SqlEditor`](#sqleditor) | SQL-Code-Editor (CodeMirror 6) mit Syntax-Highlighting, Multi-Dialekt, Autocomplete, Linting und `Cmd+Enter`-Ausführen-Shortcut | [Vollständiges Manual →](user-manuals/SqlEditor.de.md) |
| [`JsonEditor`](#jsoneditor) | JSON-Code-Editor (CodeMirror 6) mit Echtzeit-Validierung, Format- und Komprimieren-Schaltfläche sowie optionaler Minimap | [Vollständiges Manual →](user-manuals/JsonEditor.de.md) |
| [`SunburstChart`](#sunburstchart) | D3 v7 hierarchisches Chart — konzentrische Ringe, Ctrl / Cmd ⌘+Click Drill-Down, Ctrl / Cmd ⌘+Scroll Zoom, Donut-Modus, eigene Farben, MUI-Theme-Integration. Erste der D3-Chart-Familie. | [Vollständiges Manual →](user-manuals/SunburstChart.de.md) |
| [`ChordChart`](#chordchart) | D3 v7 Fluss-Chart — Arc-Gruppen, Bänder, Hover-Highlight, Ctrl / Cmd ⌘+Scroll-Zoom, gerichtet/ungerichtet, MUI-Theme-Integration | [Vollständiges Manual →](user-manuals/ChordChart.de.md) |
| [`RadialTreeChart`](#radialtreedchart) | D3 v7 radialer Baum — Knoten auf konzentrischen Ringen, MUI-Icons, Ctrl / Cmd ⌘+Click Drill-Down, Ctrl / Cmd ⌘+Scroll Zoom, MUI-Theme-Integration | [Vollständiges Manual →](user-manuals/RadialTreeChart.de.md) |
| [`CirclePackingChart`](#circlepackingchart) | D3 v7 Circle Packing — verschachtelte Kreise, animierter D3-Zoom, Ctrl / Cmd ⌘+Scroll-Zoom, Tiefen-Gradient oder Palette, MUI-Theme-Integration | [Vollständiges Manual →](user-manuals/CirclePackingChart.de.md) |

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

Die App wie gewohnt in MUI's `ThemeProvider` einschließen. `ConfirmDialog` benötigt zusätzlich einen `ConfirmDialogProvider` nahe der App-Wurzel — alle anderen Komponenten funktionieren ohne Provider.

### ConfirmDialog

Ersetzt jedes manuelle `open/setOpen`-State-Muster durch einen einzigen `await confirm(...)`-Aufruf. Eliminiert Boilerplate bei Lösch-Bestätigungen, destruktiven Aktionen und allen Flows, die vor dem Fortfahren eine Nutzerzustimmung benötigen — mit optionalem Countdown-Auto-Confirm und Enter = Bestätigen.

```tsx
import { ConfirmDialogProvider, useConfirm } from '@thebuoyant-tsdev/mui-ts-library';

// App-Wurzel — einmalig
<ConfirmDialogProvider>
  <App />
</ConfirmDialogProvider>

// Überall innerhalb der App
const confirm = useConfirm();
const ok = await confirm({ title: 'Eintrag löschen?', severity: 'error', confirmLabel: 'Löschen', countdown: 10 });
if (ok) handleDelete();
```

→ [Vollständige Dokumentation](user-manuals/ConfirmDialog.de.md)

---

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

Passwort-Eingabe mit Echtzeit-Stärke-Feedback. Konzipiert für Registrierungs- und Passwort-Änderungs-Flows, bei denen Nutzer zu sicheren Passwörtern geführt werden sollen — mit animiertem Stärke-Meter, segmentierten Balken und einer Live-Anforderungs-Checkliste.

```tsx
import { PasswordStrengthMeter } from '@thebuoyant-tsdev/mui-ts-library';

<PasswordStrengthMeter
  passwordMinLength={10}
  showSegmentedBar
  onPasswordChange={(password, result) => console.log(result.score)}
/>
```

→ [Vollständige Dokumentation](user-manuals/PasswordStrengthMeter.de.md)

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

SQL-Code-Editor mit Syntax-Highlighting, dialektbewusstem Autocomplete und Inline-Linting. Konzipiert für Developer-Tools, Datenbank-Clients und Admin-Panels — mit `Cmd+Enter`-Shortcut, Multi-Dialekt-Support (MySQL, PostgreSQL, SQLite, MSSQL) und Schema-basiertem Autocomplete.

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

## TypeScript

Alle Typen und Defaults werden direkt exportiert — kein separates `@types/...`-Paket nötig.

```tsx
import type {
  // ConfirmDialog
  ConfirmDialogOptions, ConfirmDialogSeverity,

  // GanttChart
  GanttTask, GanttTranslations, GanttTheme, GanttToolbarConfig,

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
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Lizenz

MIT © Thomas Schlender
