# mui-ts-library

> [English Version →](README.md)

Eine typsichere React-Komponentenbibliothek auf Basis von **TypeScript** und **MUI (Material UI v9)**. Die Komponenten folgen MUI's Design-Sprache, unterstützen Dark Mode und Theming von Haus aus und werden mit vollständigen TypeScript-Typen, Storybook-Stories und Unit-Tests ausgeliefert.

**[→ Live-Storybook](https://thebuoyant.github.io/mui-ts-library/)** — alle Komponenten interaktiv erkunden, ohne Installation.

**[→ Im Browser ausprobieren (StackBlitz)](https://stackblitz.com/github/thebuoyant/mui-ts-library/tree/main/stackblitz-demo?startScript=dev)** — live bearbeitbare Demo, keine Installation nötig.

---

## Komponenten

12 produktionsreife Komponenten in drei Kategorien. Jede verlinkt zu einer interaktiven Live-Demo und einem vollständigen Manual mit allen Props, Typen und Mustern.

### Interaktive UI

| Komponente | Wofür | Ausprobieren |
|---|---|---|
| [`GanttChart`](#ganttchart) | Drag-and-Drop-Projekt-Timelines mit Meilensteinen, Abhängigkeiten und CSV-Export | [Live-Demo](https://thebuoyant.github.io/mui-ts-library/?path=/story/components-ganttchart--default) · [Docs](user-manuals/GanttChart.de.md) |
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

## TypeScript

Alle Typen und Defaults werden direkt exportiert — kein separates `@types/...`-Paket nötig.

```tsx
import type {
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

  // HorizontalTreeChart
  HorizontalTreeData, HorizontalTreeNodeInfo, HorizontalTreeOrientation,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Versionierung & Abwärtskompatibilität

Dieses Projekt folgt [Semantic Versioning](https://semver.org/). In der Praxis bedeutet das:

- **Patch** (`3.7.0` → `3.7.1`) — nur Bugfixes, jederzeit gefahrlos aktualisierbar.
- **Minor** (`3.6.0` → `3.7.0`) — neue Features, vollständig abwärtskompatibel.
- **Major** (`2.x` → `3.0.0`) — Breaking Changes, explizit im [Changelog](#changelog) gekennzeichnet.

**Bisher nur ein Breaking Release:** [`3.0.0`](#300--2026-06-15--breaking-changes) hat `ConfirmDialog` / `ConfirmDialogProvider` / `useConfirm` entfernt und die Signatur von `TagSelection`s `onTagCreate` geändert. Jedes Release seitdem war additiv.

**TypeScript-Hinweis:** Translation-Typen (z.B. `TagSelectionTranslation`, `SqlEditorTranslation`, `GanttTranslations`) bekommen mit der Zeit neue optionale Felder, wenn Features hinzukommen — ein `Partial<...>`-Objekt direkt an die `translation`/`translations`-Prop zu übergeben (das in dieser README durchgängig verwendete Muster) ist immer vorwärtskompatibel. Eine eigenständige Variable, die gegen den vollen benannten Typ deklariert wird, bleibt nur kompatibel, solange neue Felder optional sind. Ein Audit über alle Komponenten fand eine Lücke — `GanttTranslations` hatte 3 nach Release ergänzte required Felder — behoben in `3.9.1` (siehe [Changelog](#391--2026-06-25)). Seit dieser Version ist jeder Translation-Typ optional-sicher.

---

## Changelog

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
