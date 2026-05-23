# MUI Ideas — Progress

Dieses Dokument dokumentiert den Fortschritt der Komponenten-Entwicklung. Es wird am Ende jeder Session aktualisiert.

---

## Implementiert

### ConfirmDialog + `useConfirm` — ✅ Fertig

**Session:** 2026-05-23

**Beschreibung:**
Deklarative API für Bestätigungs-Dialoge. Ersetzt den Boilerplate aus `useState + Dialog + DialogTitle + DialogContent + DialogActions` durch einen einzigen Hook-Call.

**Dateien:**
- `src/components/confirm-dialog/ConfirmDialog.types.ts` — Types & Defaults
- `src/components/confirm-dialog/ConfirmDialogProvider.tsx` — Context, Provider, `useConfirm`-Hook, internes Dialog-UI
- `src/components/confirm-dialog/ConfirmDialog.stories.tsx` — 10 Storybook-Stories
- `src/components/confirm-dialog/ConfirmDialog.test.tsx` — 14 Vitest-Tests

**API:**
```tsx
// 1. Provider einmalig in der App (z. B. in main.tsx oder App.tsx)
<ConfirmDialogProvider translation={{ confirmLabel: "Bestätigen", cancelLabel: "Abbrechen" }}>
  <App />
</ConfirmDialogProvider>

// 2. Hook überall in der App
const confirm = useConfirm();

const handleDelete = async () => {
  const confirmed = await confirm({
    title:        "Eintrag löschen?",
    description:  "Diese Aktion kann nicht rückgängig gemacht werden.",
    confirmLabel: "Löschen",
    severity:     "error",
  });
  if (confirmed) deleteEntry();
};
```

**Konfigurierbare Options pro Dialog-Call:**

| Option | Typ | Default | Beschreibung |
|---|---|---|---|
| `title` | `string` | — | Dialog-Titel |
| `description` | `string \| ReactNode` | — | Body-Text oder beliebiges JSX |
| `confirmLabel` | `string` | aus `translation` | Überschreibt den Provider-Default |
| `cancelLabel` | `string` | aus `translation` | Überschreibt den Provider-Default |
| `severity` | `"info" \| "warning" \| "error" \| "success"` | `"info"` | Farbe des Confirm-Buttons + Icon |
| `hideCancelButton` | `boolean` | `false` | Nur OK-Button (für reine Info-Alerts) |
| `maxWidth` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"xs"` | Dialog-Breite |
| `showIcon` | `boolean` | `true` | Severity-Icon im Titel ein-/ausblenden |

**Provider-Translation (globale Defaults):**

```tsx
import { DEFAULT_CONFIRM_DIALOG_TRANSLATION } from '@thebuoyant-tsdev/mui-ts-library';
// { confirmLabel: "Confirm", cancelLabel: "Cancel" }
```

**Storybook-Stories:**

| Story | Beschreibung |
|---|---|
| `Default` | Einfacher Bestätigungs-Dialog |
| `NoDescription` | Nur Titel, kein Body |
| `Destructive` | `severity="error"` — roter Confirm-Button |
| `Warning` | `severity="warning"` |
| `Success` | `severity="success"` |
| `AlertOnly` | `hideCancelButton=true` — nur OK |
| `NoIcon` | `showIcon=false` |
| `CustomLabels` | Per-Call Label-Override |
| `LargeDialog` | `maxWidth="sm"` mit ReactNode-Description |
| `GermanTranslation` | Provider-Level Übersetzung |
| `MultipleDialogs` | Zwei unabhängige Trigger, ein Provider |

**Architektur-Entscheidungen:**

| Thema | Entscheidung |
|---|---|
| `resolveRef` statt State | Die `resolve`-Funktion liegt in einem `useRef`, um Stale-Closure-Probleme zu vermeiden |
| Kein separates Dialog-Atom | Der Dialog ist intern und nicht standalone nutzbar — saubere Kapselung |
| Per-Call Label überschreibt Provider | `confirmLabel` im Options-Objekt hat Vorrang vor `translation` des Providers |
| Escape / Backdrop = Cancel | `onClose` des MUI Dialog wird immer als `false` aufgelöst |
| Zweiter `confirm()`-Call | Löst den vorherigen Promise automatisch mit `false` auf |

---

## Geplant (nächste Sessions)

Die vollständige Ideen-Liste liegt in [mui-ideas.md](mui-ideas.md).

### Priorität 2 — JsonEditor

**Beschreibung:** CodeMirror-6-basierter JSON-Editor mit Syntax-Highlighting, Live-Linting (ungültiges JSON), Format-Button und optionalem Read-Only-Modus. Nutzt die bestehende SqlEditor-Infrastruktur wieder.

**Geplante API (Entwurf):**
```tsx
<JsonEditor
  value={json}
  onChange={setJson}
  height={300}
  showLineNumbers
  onLint={(json) => validateJson(json)}
  error={hasError}
  helperText="Invalid JSON"
/>
```

**Offene Fragen:**
- Soll der JsonEditor auch Schema-Validierung (JSON Schema) unterstützen?
- Soll er als eigenständige Komponente oder als `SqlEditor`-Erweiterung implementiert werden?

---

### Priorität 3 — FileUpload

**Beschreibung:** Drag-&-Drop-Upload-Feld mit MUI-Optik. API wie ein MUI TextField (`error`, `helperText`, `disabled`, `accept`, `multiple`). Dateivorschau für Bilder.

**Geplante API (Entwurf):**
```tsx
<FileUpload
  accept="image/*,.pdf"
  multiple
  maxSize={5 * 1024 * 1024}  // 5 MB
  onChange={(files) => uploadFiles(files)}
  error={uploadFailed}
  helperText="Max. 5 MB, PDF oder Bild"
/>
```

---

### Priorität 4 — OTP / PIN-Input

**Beschreibung:** Mehrteilige Eingabe für 2FA- und SMS-Verifizierungscodes. Einzelne Felder pro Ziffer, Auto-Advance, Paste-Support.

---

### Priorität 5 — StatCard

**Beschreibung:** Dashboard-Kachel: Zahl + Label + Trend-Pfeil + optional Sparkline.

---

### Weitere Ideen

Siehe [mui-ideas.md](mui-ideas.md) für die vollständige Liste.
