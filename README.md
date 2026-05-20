# mui-ts-library

Eine typsichere React-Komponentenbibliothek auf Basis von **TypeScript** und **MUI (Material UI v9)**. Die Komponenten sind als eigenständige Ergänzungen zu MUI konzipiert — sie folgen MUI's Design-Sprache, unterstützen Theming von Haus aus und werden mit vollständigen TypeScript-Typen, Storybook-Stories und Unit-Tests ausgeliefert.

---

## Inhaltsverzeichnis

- [Komponenten](#komponenten)
- [Voraussetzungen](#voraussetzungen)
- [Installation](#installation)
- [Verwendung](#verwendung)
  - [GanttChart](#gantchart)
  - [TagSelection](#tagselection)
  - [PasswordStrengthMeter](#passwordstrengthmeter)
  - [RichTextEditor](#richtexteditor)
- [Dokumentation](#dokumentation)
- [Entwicklung](#entwicklung)
- [Veröffentlichung auf npm](#veröffentlichung-auf-npm)
- [Lizenz](#lizenz)

---

## Komponenten

| Komponente | Beschreibung |
|---|---|
| `GanttChart` | Vollständige Projekt-Timeline mit hierarchischen Aufgaben, Meilensteinen, Abhängigkeitspfeilen, Drag & Drop, kaskadierenden Abhängigkeiten, Fortschritts-Tracking, Zoom, Split-Pane, integrierten CRUD-Dialogen und konfigurierbarer Toolbar |
| `TagSelection` | Multi-Tag-Auswahlfeld mit Such-Autocomplete, alphabetisch sortierter Chip-Anzeige, Overflow-Begrenzung (`maxVisibleChips`), freier Tag-Erstellung (`allowCreate`), MUI-Theme- und Custom-Farben, Tag-Limit und vollständiger Callback-API |
| `PasswordStrengthMeter` | Passwort-Eingabefeld mit Live-Stärkebewertung, animiertem Meter und Anforderungscheckliste |
| `RichTextEditor` | WYSIWYG-Editor auf Basis TipTap v3 mit MUI-Toolbar, Textfarbe, Hervorhebung, Link-Dialog, automatischer Markdown-Konvertierung beim Einfügen, Zeichenzähler, Zeichenbegrenzung, konfigurierbarer Höhe/Breite, Readonly/Disabled-Modus und vollständiger Form-Integration |

---

## Voraussetzungen

Die folgenden Pakete werden als **Peer Dependencies** behandelt und müssen im Zielprojekt installiert sein:

```
react >= 19
react-dom >= 19
@mui/material >= 9
@emotion/react >= 11
@emotion/styled >= 11
@mui/icons-material >= 9
```

---

## Installation

```bash
# npm
npm install @tsdev/mui-ts-library

# yarn
yarn add @tsdev/mui-ts-library

# pnpm
pnpm add @tsdev/mui-ts-library
```

> **Hinweis:** Alle Peer Dependencies müssen installiert sein. Falls MUI noch nicht eingerichtet ist, folge dem [MUI-Installationsguide](https://mui.com/material-ui/getting-started/installation/).

---

## Verwendung

Die App wie gewohnt in MUI's `ThemeProvider` einbetten. Für diese Bibliothek ist kein zusätzlicher Provider erforderlich.

---

### GanttChart

Eine vollständige Projekt-Timeline-Komponente auf Basis von MUI. Wichtigste Features:

- **Hierarchische Aufgaben** über `parentId` — unbegrenzte Verschachtelungstiefe, Ein-/Ausklappen pro Knoten oder global
- **Meilensteine** als Rauten (`isMilestone: true`)
- **Fortschrittsbalken** — halbdurchsichtiger Overlay für 0–100 % Fertigstellung (`progress`)
- **Fortschritt per Drag** — Fortschritts-Handle direkt im Balken verschiebbar (`progressDraggable`)
- **Abhängigkeitspfeile** — Z-förmige SVG-Pfeile für Finish-to-Start-Beziehungen
- **Kaskadierende Abhängigkeiten** — Nachfolger-Aufgaben werden beim Verschieben eines Vorgängers automatisch mitgeschoben
- **4 Zeitskalen** — Tage, Wochen, Monate, Quartale mit sofortigem Wechsel
- **Zoom** — Strg + Mausrad wechselt zwischen Skalen (`zoomable`)
- **Drag & Drop** — Balken horizontal verschieben (`draggable`) oder Enddatum per Ziehen anpassen (`resizable`)
- **Inline-Editierung** — Doppelklick auf einen Task-Namen startet die direkte Bearbeitung im Panel (`inlineEdit`)
- **Heute-Linie** — gestrichelte vertikale Markierung am aktuellen Tag; Schaltfläche „Heute anzeigen"
- **Wochenend-Hervorhebung** — schattierte Spalten auf der Tages-Skala
- **Split-Pane** — Trennlinie ziehen um den Aufgaben-Panel zu vergrößern/verkleinern (begrenzt durch `minPanelWidth` / `maxPanelWidth`)
- **Integrierte CRUD-Dialoge** — Hinzufügen / Bearbeiten / Löschen mit Validierung und Eltern-Aufgaben-Auswahl
- **Konfigurierbare Toolbar** — jedes Toolbar-Element einzeln ein-/ausblendbar über `toolbarConfig`
- **Ansicht zurücksetzen** — Skala, Datumsbereich und Auf-/Zugeklappt-Zustand mit einem Klick wiederherstellen
- **Row-Virtualisierung** — nur sichtbare Zeilen rendern; für 200+ Tasks empfohlen (`virtualizeRows`)
- **Individuelle Task-Farbe** — `color` auf `GanttTask` überschreibt die Status-Farbe für einzelne Tasks
- **Theming** — Balkenfarben, Meilenstein-Farbe, Heute-Linie, Wochenend-Farbe, Eckenradius über `ganttTheme` konfigurierbar
- **Vollständige i18n** — jeden UI-Text über die `translations`-Prop überschreiben (deutsche Standardwerte)

```tsx
import { GanttChart } from '@tsdev/mui-ts-library';
import type { GanttTask } from '@tsdev/mui-ts-library';

const tasks: GanttTask[] = [
  {
    id: 'project',
    name: 'Mein Projekt',
    status: 'in-progress',
    startDate: new Date('2026-03-01'),
    endDate: new Date('2026-06-30'),
  },
  {
    id: 'phase-1',
    parentId: 'project',
    name: 'Phase 1 — Backend',
    status: 'done',
    startDate: new Date('2026-03-01'),
    endDate: new Date('2026-04-30'),
    progress: 100,
  },
  {
    id: 'phase-2',
    parentId: 'project',
    name: 'Phase 2 — Frontend',
    status: 'in-progress',
    startDate: new Date('2026-05-01'),
    endDate: new Date('2026-06-30'),
    progress: 40,
    dependencies: ['phase-1'],
  },
  {
    id: 'go-live',
    parentId: 'project',
    name: 'Go-Live',
    status: 'planned',
    startDate: new Date('2026-06-30'),
    endDate: new Date('2026-06-30'),
    isMilestone: true,
    dependencies: ['phase-2'],
  },
];

function App() {
  return (
    <GanttChart
      tasks={tasks}
      timeScale="months"
      height={500}
      draggable
      resizable
      cascadeDependencies
      onTaskCreated={(task) => console.log('Erstellt:', task)}
      onTaskUpdated={(task) => console.log('Aktualisiert:', task)}
      onTaskDeleted={(id) => console.log('Gelöscht:', id)}
      onTasksChange={(all) => console.log('Alle Aufgaben:', all)}
      onTaskMoved={(task, newStart, newEnd) => console.log('Verschoben:', task.name, newStart, newEnd)}
      onTaskResized={(task, newEnd) => console.log('Größe geändert:', task.name, newEnd)}
    />
  );
}
```

**Mit externem CRUD-Control (`enableBuiltinDialogs={false}`):**

```tsx
<GanttChart
  tasks={tasks}
  enableBuiltinDialogs={false}
  onAddTask={(parentTask) => openMyDialog({ parentId: parentTask?.id })}
  onEditTask={(task) => openMyDialog(task)}
  onDeleteTask={(task) => confirmAndDelete(task.id)}
  onTaskClick={(task) => console.log('Angeklickt:', task.name)}
  onMilestoneClick={(task) => console.log('Meilenstein:', task.name)}
/>
```

**Mit Inline-Editierung, Fortschritt-Drag und Virtualisierung:**

```tsx
<GanttChart
  tasks={tasks}
  inlineEdit
  progressDraggable
  virtualizeRows
  onTasksChange={(all) => console.log('Alle Aufgaben:', all)}
/>
```

**Mit individuellem Theming:**

```tsx
import type { GanttTheme } from '@tsdev/mui-ts-library';

const theme: GanttTheme = {
  statusColors: {
    planned:     '#90caf9',
    'in-progress': '#ffe082',
    done:        '#a5d6a7',
    blocked:     '#ef9a9a',
  },
  barBorderRadius: 8,
  todayLineColor: '#e91e63',
};

<GanttChart tasks={tasks} ganttTheme={theme} />
```

**Mit benutzerdefinierter Toolbar-Konfiguration:**

```tsx
import type { GanttToolbarConfig } from '@tsdev/mui-ts-library';

const toolbarConfig: GanttToolbarConfig = {
  showScaleDays: false,       // Schaltfläche "Tage" ausblenden
  showScaleQuarters: false,   // Schaltfläche "Quartale" ausblenden
  showDateRange: false,       // Von/Bis-Datumsauswahl ausblenden
};

<GanttChart
  tasks={tasks}
  toolbarConfig={toolbarConfig}
/>
```

**Mit benutzerdefiniertem Datumsbereich und englischen Übersetzungen:**

```tsx
import type { GanttTranslations } from '@tsdev/mui-ts-library';

const EN: Partial<GanttTranslations> = {
  scaleDays: 'Days', scaleWeeks: 'Weeks', scaleMonths: 'Months', scaleQuarters: 'Quarters',
  rangeFrom: 'From', rangeTo: 'To', rangeResetTooltip: 'Reset range',
  scrollToTodayTooltip: 'Scroll to today', expandAllTooltip: 'Expand all',
  collapseAllTooltip: 'Collapse all', resetViewTooltip: 'Reset view',
  weekColumnPrefix: 'W', dateLocale: 'en-US',
  columnName: 'Name', columnStatus: 'Status', columnActions: 'Actions',
  addTaskTooltip: 'Add task', editTaskTooltip: 'Edit task', deleteTaskTooltip: 'Delete task',
  dialogAddTitle: 'Add Task', dialogEditTitle: 'Edit Task', dialogDeleteTitle: 'Delete Task',
  dialogSave: 'Save', dialogCancel: 'Cancel', dialogDelete: 'Delete',
  dialogFieldName: 'Name', dialogFieldStartDate: 'Start date', dialogFieldEndDate: 'End date',
  dialogFieldStatus: 'Status', dialogFieldMilestone: 'Is milestone',
  dialogFieldParent: 'Parent task', dialogFieldParentNone: '— None —',
  dialogDeleteConfirm: 'Delete task "{name}"?',
  dialogFieldDependencies: 'Predecessors', dialogFieldDependenciesNone: '— None —',
  statusPlanned: 'Planned', statusInProgress: 'In Progress', statusDone: 'Done', statusBlocked: 'Blocked',
};

<GanttChart
  tasks={tasks}
  timeScale="quarters"
  defaultRangeStart={new Date('2026-01-01')}
  defaultRangeEnd={new Date('2026-12-31')}
  translations={EN}
  height="auto"
  width="auto"
/>
```

---

### TagSelection

```tsx
import { TagSelection } from '@tsdev/mui-ts-library';
import type { TagSelectionItem } from '@tsdev/mui-ts-library';

const tags: TagSelectionItem[] = [
  { id: 'react',      label: 'React',      selected: true  },
  { id: 'typescript', label: 'TypeScript'                  },
  { id: 'legacy',     label: 'Legacy',     disabled: true  },
];

function App() {
  return (
    <TagSelection
      tags={tags}
      onTagSelect={(tag, selectedTags) => console.log('Ausgewählt:', tag.label)}
      onTagDelete={(tag, selectedTags) => console.log('Entfernt:', tag.label)}
      onTagsChange={(selectedTags) => console.log('Auswahl:', selectedTags)}
    />
  );
}
```

**Mit benutzerdefinierten Farben:**

Jeder Tag unterstützt entweder eine MUI-Theme-Farbe (`color`) oder vollständig eigene Farben
(`backgroundColor` + `foregroundColor`). Beide Varianten können gemischt werden:

```tsx
const tags: TagSelectionItem[] = [
  // MUI-Theme-Farbe
  { id: 'react',    label: 'React',    selected: true, color: 'primary'  },
  { id: 'success',  label: 'Done',     selected: true, color: 'success'  },

  // Eigene Hex-Farben — foregroundColor sollte zur backgroundColor kontrastieren
  { id: 'brand',    label: 'Branding', selected: true, foregroundColor: '#ffffff', backgroundColor: '#6200ea' },
  { id: 'warning',  label: 'Achtung',  selected: true, foregroundColor: '#1a1a1a', backgroundColor: '#ffea00' },
];
```

**Mit Ladezustand (asynchrones Tag-Laden):**

```tsx
const [tags, setTags] = useState<TagSelectionItem[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchTags().then((result) => {
    setTags(result);
    setLoading(false);
  });
}, []);

<TagSelection tags={tags} loading={loading} />
```

**Mit Tag-Limit:**

```tsx
{/* Maximal 3 Tags auswählbar — Autocomplete sperrt sich danach automatisch */}
<TagSelection tags={tags} maxTags={3} />
```

**Mit Overflow-Begrenzung:**

```tsx
{/* Zeigt maximal 3 Chips — weitere werden hinter einem "+N"-Chip verborgen */}
<TagSelection
  tags={tags}
  maxVisibleChips={3}
  popoverPlacement="bottom"
  listboxMaxHeight={250}
/>
```

**Mit erstellbaren Tags:**

Wenn `allowCreate={true}` gesetzt ist, erscheinen im Input ein CheckIcon (bestätigen) und ein
CloseIcon (abbrechen), sobald der Suchbegriff keinem bestehenden Tag entspricht. Darunter
werden 7 Theme-Farb-Chips zur Farbauswahl angezeigt.

Der neue Tag wird intern **sofort als selektiert** markiert. `onTagCreate` wird aufgerufen
damit der externe State synchronisiert werden kann — dabei `selected: true` setzen, damit
der Tag beim nächsten Re-Render nicht aus der Auswahl fällt:

```tsx
const [tags, setTags] = useState<TagSelectionItem[]>(initialTags);

<TagSelection
  tags={tags}
  allowCreate={true}
  onTagCreate={(label, color) => {
    setTags((prev) => [
      ...prev,
      {
        id: label.toLowerCase().replace(/\s+/g, '-'),
        label,
        color,         // vom User im Farb-Picker gewählt
        selected: true // wichtig: sonst verschwindet der Tag beim nächsten Re-Render
      },
    ]);
  }}
/>
```

Wer eigene Hex-Farben vergeben möchte, kann `backgroundColor` und `foregroundColor` direkt
im `onTagCreate`-Handler setzen — die Komponente selbst gibt nur den gewählten `color`-Wert
(MUI-Theme-Farbe) zurück:

```tsx
onTagCreate={(label, color) => {
  const myBackgroundColor = computeColorForLabel(label); // eigene Logik
  setTags((prev) => [
    ...prev,
    {
      id: label.toLowerCase().replace(/\s+/g, '-'),
      label,
      selected: true,
      foregroundColor: '#ffffff',
      backgroundColor: myBackgroundColor,
    },
  ]);
}}
```

---

### PasswordStrengthMeter

```tsx
import { PasswordStrengthMeter } from '@tsdev/mui-ts-library';
import type { StrengthResult } from '@tsdev/mui-ts-library';

function App() {
  return (
    <PasswordStrengthMeter
      passwordMinLength={10}
      onPasswordChange={(password, result: StrengthResult) => {
        console.log(`Punktzahl: ${result.score}/4 — ${result.meterStatus}`);
      }}
    />
  );
}
```

**Minimale Variante (nur Eingabe, ohne Meter und Zusammenfassung):**

```tsx
<PasswordStrengthMeter
  showMeter={false}
  showSummary={false}
  inputSize="small"
/>
```

**Mit deutschen Texten und eigenen Meter-Farben:**

```tsx
import type { PasswordStrengthMeterTranslation, MeterColors } from '@tsdev/mui-ts-library';

const DE: Partial<PasswordStrengthMeterTranslation> = {
  label: 'Passwort',
  summaryHeaderLabel: 'Anforderungen',
  summaryMinChars: 'Mindestens {n} Zeichen',
  summaryCapitalLetter: 'Mindestens 1 Großbuchstabe',
  summaryLowerCaseLetter: 'Mindestens 1 Kleinbuchstabe',
  summaryNumber: 'Mindestens 1 Zahl',
  summarySpecialChar: 'Mindestens 1 Sonderzeichen',
  showPasswordLabel: 'Passwort anzeigen',
  hidePasswordLabel: 'Passwort verbergen',
};

const colors: Partial<MeterColors> = {
  weak: '#d32f2f',
  ok: '#f57c00',
  good: '#388e3c',
  veryGood: '#1b5e20',
};

<PasswordStrengthMeter
  passwordMinLength={10}
  translation={DE}
  meterColors={colors}
  onPasswordChange={(password, result) => console.log(result.score)}
/>
```

**Mit React Hook Form:**

```tsx
import { useForm } from 'react-hook-form';
import { PasswordStrengthMeter } from '@tsdev/mui-ts-library';

function SignUpForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<{ password: string }>();
  const { ref, ...rest } = register('password', { required: 'Passwort ist erforderlich' });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <PasswordStrengthMeter
        {...rest}
        inputRef={ref}
        autoComplete="new-password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
    </form>
  );
}
```

---

### RichTextEditor

```tsx
import { RichTextEditor } from '@tsdev/mui-ts-library';

function App() {
  return (
    <RichTextEditor
      placeholder="Hier tippen …"
      showCharacterCount
      onChange={(html) => console.log(html)}
      onBlur={() => console.log('blur')}
    />
  );
}
```

**Kontrollierter Modus:**

```tsx
const [content, setContent] = useState('<p>Initialinhalt</p>');

<RichTextEditor value={content} onChange={setContent} />
```

**Minimale Toolbar (nur Bold, Italic, Underline):**

```tsx
<RichTextEditor
  toolbarConfig={{
    showBold: true, showItalic: true, showUnderline: true,
    showStrike: false, showHeading1: false, showHeading2: false,
    showHeading3: false, showBulletList: false, showOrderedList: false,
    showBlockquote: false, showCodeBlock: false, showLink: false,
    showHorizontalRule: false, showUndoRedo: false, showClearFormat: false,
  }}
/>
```

**Mit Zeichenbegrenzung und Fehlerzustand:**

```tsx
<RichTextEditor
  maxCharacters={500}
  error={true}
  helperText="Pflichtfeld."
/>
```

**Höhe und Breite:**

```tsx
{/* Feste Höhe — Inhalt scrollt vertikal */}
<RichTextEditor height={400} />

{/* Editor füllt den umgebenden Flex-Container */}
<Box sx={{ height: 500, display: "flex", flexDirection: "column" }}>
  <RichTextEditor height="auto" />
</Box>

{/* Feste Breite */}
<RichTextEditor height={300} width={600} />
```

**JSON-Output statt HTML:**

```tsx
{/* Gibt den Inhalt als TipTap-JSON-Dokument zurück statt als HTML-String */}
<RichTextEditor outputFormat="json" onChange={(json) => console.log(json)} />
```

**Mit deutschen Toolbar-Texten:**

```tsx
import type { RichTextEditorTranslation } from '@tsdev/mui-ts-library';

const DE: Partial<RichTextEditorTranslation> = {
  bold: 'Fett', italic: 'Kursiv', underline: 'Unterstrichen',
  heading1: 'Überschrift 1', heading2: 'Überschrift 2', heading3: 'Überschrift 3',
  bulletList: 'Aufzählung', orderedList: 'Nummerierte Liste',
  link: 'Link einfügen', linkDialogTitle: 'Link einfügen',
  linkDialogUrlLabel: 'URL', linkDialogSave: 'Speichern',
  linkDialogCancel: 'Abbrechen', linkDialogRemove: 'Link entfernen',
  undo: 'Rückgängig', redo: 'Wiederholen', clearFormat: 'Formatierung entfernen',
};

<RichTextEditor translation={DE} />
```

**Markdown einfügen:**

Beim Einfügen (`Ctrl+V`) von Markdown-Text aus `.md`-Dateien oder Markdown-Editoren wird die Syntax automatisch in Rich-Text umgewandelt — `**fett**` wird zu Fettschrift, `## Heading` zu einer Überschrift usw.

**Mit React Hook Form:**

```tsx
import { Controller } from 'react-hook-form';

<Controller
  name="description"
  control={control}
  render={({ field, fieldState }) => (
    <RichTextEditor
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  )}
/>
```

---

## Dokumentation

Ausführliche Prop-Referenzen, Verwendungsbeispiele und i18n-Anleitungen für jede Komponente befinden sich im Ordner [`user-manuals/`](user-manuals/):

| Komponente | Benutzerhandbuch |
|---|---|
| `GanttChart` | [user-manuals/GanttChart.md](user-manuals/GanttChart.md) |
| `TagSelection` | [user-manuals/TagSelection.md](user-manuals/TagSelection.md) |
| `PasswordStrengthMeter` | [user-manuals/PasswordStrengthMeter.md](user-manuals/PasswordStrengthMeter.md) |
| `RichTextEditor` | [user-manuals/RichTextEditor.md](user-manuals/RichTextEditor.md) |

---

## Entwicklung

### Lokales Setup

```bash
# 1. Repository klonen
git clone <repo-url>
cd mui-ts-library

# 2. Abhängigkeiten installieren
npm install

# 3. Vite-Entwicklungsserver starten
npm run dev
```

### Storybook

Jede Komponente enthält Storybook-Stories für alle wesentlichen Anwendungsfälle.

```bash
# Storybook-Entwicklungsserver starten (http://localhost:6006)
npm run storybook

# Statisches Storybook für Deployment bauen
npm run build-storybook
```

### Tests

Tests sind mit [Vitest](https://vitest.dev/) und [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) geschrieben.

```bash
# Tests im Watch-Modus ausführen
npm run test

# Tests einmalig ausführen (CI)
npm run test:run
```

### Coverage

```bash
npm run test:coverage
```

Coverage-Berichte werden in `./coverage/` generiert. `coverage/index.html` im Browser öffnen für den vollständigen Bericht. Die Coverage-Konfiguration schließt alle Komponenten-Quelldateien (`src/components/**/*.{ts,tsx}`) ein und blendet Stories sowie reine Typ-Dateien aus.

---

## Veröffentlichung auf npm

### Deploy-Script

Alle Schritte sind in einem einzigen Befehl zusammengefasst:

```bash
npm run npm-deploy
```

Das Script läuft automatisch durch:

1. **User-Check** — prüft ob npm-User `tsdev` eingeloggt ist; falls nicht, Abbruch mit Hinweis auf `npm login`
2. **Git-Check** — prüft ob keine uncommitteten Änderungen vorhanden sind
3. **Versionsauswahl** — interaktiv: `patch` / `minor` / `major` oder keine Änderung
4. **Tests → Build → Publish** — läuft automatisch via `prepublishOnly`
5. **Git-Push** — Commit und Tag werden nach `main` gepusht

> npm fragt am Ende automatisch nach dem 2FA-Code aus der Authenticator-App.

### Versionierung (SemVer)

| Änderungstyp | Stufe | Beispiel |
|---|---|---|
| Bugfix, nicht brechende Verbesserung | **patch** | `0.1.0` → `0.1.1` |
| Neues Feature, abwärtskompatibel | **minor** | `0.1.0` → `0.2.0` |
| Brechende API-Änderung | **major** | `0.1.0` → `1.0.0` |

### Automatisierung mit GitHub Actions (optional)

Ein npm Automation-Token unter **GitHub → Settings → Secrets → Actions** als `NPM_TOKEN` hinterlegen, dann `.github/workflows/publish.yml` anlegen:

```yaml
name: Publish to npm

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'

      - run: npm ci
      - run: npm run test:run
      - run: npm run build
      - run: npm publish --access public --provenance
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Release auslösen: `npm version minor && git push origin main --tags`

---

## Lizenz

MIT © Thomas Schlender
