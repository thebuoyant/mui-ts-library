# mui-ts-library

> [English Version →](README.md)

Eine typsichere React-Komponentenbibliothek auf Basis von **TypeScript** und **MUI (Material UI v9)**. Die Komponenten folgen MUI's Design-Sprache, unterstützen Dark Mode und Theming von Haus aus und werden mit vollständigen TypeScript-Typen, Storybook-Stories und Unit-Tests ausgeliefert.

**[→ Live-Storybook](https://thebuoyant.github.io/mui-ts-library/)** — interaktive Demos für jede Komponente und jedes Feature, immer aktuell mit `main`.

---

## Komponenten

| Komponente | Beschreibung | Docs |
|---|---|---|
| [`ConfirmDialog`](#confirmdialog) | Deklarativer Async-Bestätigungs-Dialog — `await confirm({ title, severity })` von überall in der App. Unterstützt Countdown-Auto-Confirm und `Enter` = Bestätigen. | [Vollständiges Manual →](user-manuals/ConfirmDialog.de.md) |
| [`GanttChart`](#ganttchart) | Projekt-Timeline mit hierarchischen Aufgaben, Meilensteinen, Drag & Drop, Ctrl+Scroll-Zoom, Heute-Chip und integrierten CRUD-Dialogen | [Vollständiges Manual →](user-manuals/GanttChart.de.md) |
| [`TagSelection`](#tagselection) | Multi-Tag-Auswahlfeld mit Autocomplete, freier Tag-Erstellung, Overflow-Chips und MUI-Theme-Farben | [Vollständiges Manual →](user-manuals/TagSelection.de.md) |
| [`PasswordStrengthMeter`](#passwordstrengthmeter) | Passwort-Eingabe mit animiertem Stärke-Meter, segmentierter Balkenanzeige, eigenen Anforderungen und Anforderungsliste | [Vollständiges Manual →](user-manuals/PasswordStrengthMeter.de.md) |
| [`RichTextEditor`](#richtexteditor) | WYSIWYG-Editor (TipTap v3) mit Toolbar, Link-Dialog, Textfarbe, Hervorhebung, Wörter-Zähler, Vollbild-Modus und Markdown-Einfügen | [Vollständiges Manual →](user-manuals/RichTextEditor.de.md) |
| [`SqlEditor`](#sqleditor) | SQL-Code-Editor (CodeMirror 6) mit Syntax-Highlighting, Multi-Dialekt, Autocomplete, Linting und `Cmd+Enter`-Ausführen-Shortcut | [Vollständiges Manual →](user-manuals/SqlEditor.de.md) |
| [`JsonEditor`](#jsoneditor) | JSON-Code-Editor (CodeMirror 6) mit Echtzeit-Validierung, Format- und Komprimieren-Schaltfläche sowie optionaler Minimap | [Vollständiges Manual →](user-manuals/JsonEditor.de.md) |

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

## TypeScript

Alle Typen und Defaults werden direkt exportiert — kein separates `@types/...`-Paket nötig.

```tsx
import type {
  GanttTask,
  ConfirmDialogOptions,
  JsonEditorHighlightColors,
  SqlEditorProps,
  RichTextEditorTranslation,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Entwicklung

Für lokales Setup, Storybook, Tests und Publish-Anleitung: [DEVELOPMENT.md](DEVELOPMENT.md).

---

## Lizenz

MIT © Thomas Schlender
