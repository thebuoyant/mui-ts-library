# ConfirmDialog — Benutzerhandbuch

> [English Version →](ConfirmDialog.md)

## Übersicht

`ConfirmDialog` ist ein deklaratives Bestätigungs-Dialog-System auf Basis von MUI. Es ersetzt den wiederholenden `useState + Dialog + DialogTitle + DialogContent + DialogActions`-Boilerplate durch einen einzigen `await confirm({ ... })`-Aufruf — verwendbar von überall im App-Baum.

**Typische Anwendungsfälle:**

- Bestätigung destruktiver Aktionen (Löschen, Zurücksetzen, Veröffentlichen)
- Informationshinweise mit einem einzelnen OK-Button
- Binäre Ja/Nein-Entscheidung vor einem Seiteneffekt

---

## Voraussetzungen

| Abhängigkeit | Mindestversion |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |
| `@mui/icons-material` | 9 |

Keine weiteren Peer Dependencies über den Standard-MUI-Stack hinaus.

---

## Import

```tsx
import {
  ConfirmDialogProvider,
  useConfirm,
  DEFAULT_CONFIRM_DIALOG_TRANSLATION,
} from '@thebuoyant-tsdev/mui-ts-library';
import type {
  ConfirmDialogOptions,
  ConfirmDialogSeverity,
  ConfirmDialogTranslation,
  ConfirmDialogProviderProps,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Schnellstart

```tsx
// 1. App einmalig einschließen (z. B. in main.tsx oder App.tsx)
import { ConfirmDialogProvider } from '@thebuoyant-tsdev/mui-ts-library';

function App() {
  return (
    <ConfirmDialogProvider>
      <MyApp />
    </ConfirmDialogProvider>
  );
}

// 2. Hook überall innerhalb verwenden
import { useConfirm } from '@thebuoyant-tsdev/mui-ts-library';

function DeleteButton({ onDelete }: { onDelete: () => void }) {
  const confirm = useConfirm();

  const handleClick = async () => {
    const confirmed = await confirm({
      title:        'Eintrag löschen?',
      description:  'Diese Aktion kann nicht rückgängig gemacht werden.',
      confirmLabel: 'Löschen',
      severity:     'error',
    });
    if (confirmed) onDelete();
  };

  return <button onClick={handleClick}>Löschen</button>;
}
```

---

## Props von `ConfirmDialogProvider`

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `children` | `ReactNode` | — | App-Inhalt, der vom Provider eingeschlossen wird |
| `translation` | `Partial<ConfirmDialogTranslation>` | — | Standard-Labels für alle Dialoge dieses Providers |

---

## `useConfirm` — Hook

```ts
const confirm = useConfirm();
const confirmed: boolean = await confirm(options);
```

Gibt `true` zurück wenn der Nutzer den Bestätigen-Button klickt, `false` bei Abbrechen, Escape oder Backdrop-Klick.

---

## `ConfirmDialogOptions`

Alle Eigenschaften sind optional. Jeder `confirm()`-Aufruf kann eine beliebige Teilmenge übergeben.

| Option | Typ | Standard | Beschreibung |
|---|---|---|---|
| `title` | `string` | — | Dialog-Überschrift |
| `description` | `string \| ReactNode` | — | Body-Text oder beliebiges JSX |
| `confirmLabel` | `string` | aus `translation` | Überschreibt das Provider-Label für diesen Aufruf |
| `cancelLabel` | `string` | aus `translation` | Überschreibt das Provider-Label für diesen Aufruf |
| `severity` | `ConfirmDialogSeverity` | `"info"` | Färbt den Bestätigen-Button und zeigt ein passendes Icon |
| `hideCancelButton` | `boolean` | `false` | Blendet den Abbrechen-Button aus (Alert-/Hinweis-Modus) |
| `maxWidth` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"xs"` | MUI-Dialog-Maximalbreite |
| `showIcon` | `boolean` | `true` | Severity-Icon im Titel ein-/ausblenden |

---

## TypeScript-Typen

### `ConfirmDialogSeverity`

```ts
type ConfirmDialogSeverity = "info" | "warning" | "error" | "success";
```

| Wert | Button-Farbe | Icon |
|---|---|---|
| `"info"` | `primary` | Info-Kreis |
| `"warning"` | `warning` | Warndreieck |
| `"error"` | `error` | Fehler-Kreis |
| `"success"` | `success` | Haken-Kreis |

### `ConfirmDialogTranslation`

```ts
type ConfirmDialogTranslation = {
  confirmLabel: string;   // "Confirm"
  cancelLabel:  string;   // "Cancel"
};
```

```tsx
import { DEFAULT_CONFIRM_DIALOG_TRANSLATION } from '@thebuoyant-tsdev/mui-ts-library';
// { confirmLabel: "Confirm", cancelLabel: "Cancel" }
```

---

## Severity

```tsx
{/* Error — roter Bestätigen-Button */}
const ok = await confirm({ title: 'Löschen?', severity: 'error', confirmLabel: 'Löschen' });

{/* Warning — gelber Bestätigen-Button */}
const ok = await confirm({ title: 'Veröffentlichen?', severity: 'warning' });

{/* Success — grüner Bestätigen-Button */}
const ok = await confirm({ title: 'Als erledigt markieren?', severity: 'success' });

{/* Info (Standard) — primärer Bestätigen-Button */}
const ok = await confirm({ title: 'Bestätigen?' });
```

---

## Alert-Modus (kein Abbrechen-Button)

```tsx
await confirm({
  title:           'Sitzung läuft bald ab',
  description:     'Deine Sitzung läuft in 5 Minuten ab. Bitte speichere deine Arbeit.',
  confirmLabel:    'Verstanden',
  hideCancelButton: true,
  severity:        'warning',
});
```

Löst `true` auf wenn der Nutzer den Button klickt. Backdrop-Klick und Escape lösen weiterhin `false` auf.

---

## ReactNode-Beschreibung

```tsx
import { Stack, Typography } from '@mui/material';

await confirm({
  title:   'Nutzungsbedingungen',
  description: (
    <Stack spacing={1}>
      <Typography variant="body2">
        Mit Bestätigen stimmst du unseren Nutzungsbedingungen zu.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Du kannst die Zustimmung jederzeit in den Kontoeinstellungen widerrufen.
      </Typography>
    </Stack>
  ),
  confirmLabel: 'Zustimmen',
  cancelLabel:  'Ablehnen',
  maxWidth:     'sm',
});
```

---

## i18n — Provider-Übersetzungen

Standard-Labels global für alle Dialoge im Teilbaum überschreiben:

```tsx
<ConfirmDialogProvider
  translation={{ confirmLabel: 'Bestätigen', cancelLabel: 'Abbrechen' }}
>
  <App />
</ConfirmDialogProvider>
```

Per-Aufruf-Labels in `ConfirmDialogOptions` haben immer Vorrang vor dem Provider-Standard.

---

## Label-Priorität

```
per-Aufruf (confirmLabel / cancelLabel in ConfirmDialogOptions)
  ↓ falls nicht gesetzt
Provider-Translation (translation-Prop des ConfirmDialogProvider)
  ↓ falls nicht gesetzt
DEFAULT_CONFIRM_DIALOG_TRANSLATION ("Confirm" / "Cancel")
```

---

## Verhalten im Detail

| Szenario | Ergebnis |
|---|---|
| Nutzer klickt Bestätigen | `Promise<true>` |
| Nutzer klickt Abbrechen | `Promise<false>` |
| Nutzer drückt Escape | `Promise<false>` |
| Nutzer klickt Backdrop | `Promise<false>` |
| Zweites `confirm()` während Dialog offen ist | Erstes Promise löst `false` auf; zweiter Dialog öffnet sich |

---

## Storybook-Stories

| Story | Beschreibung |
|---|---|
| `Default` | Einfacher Bestätigungs-Dialog mit Titel und Beschreibung |
| `NoDescription` | Nur Titel, kein Body |
| `Destructive` | `severity="error"` — roter Bestätigen-Button |
| `Warning` | `severity="warning"` — gelber Bestätigen-Button |
| `Success` | `severity="success"` — grüner Bestätigen-Button |
| `AlertOnly` | `hideCancelButton=true` — einzelner OK-Button |
| `NoIcon` | `showIcon=false` — kein Severity-Icon im Titel |
| `CustomLabels` | Per-Aufruf Label-Override |
| `LargeDialog` | `maxWidth="sm"` mit ReactNode-Body |
| `GermanTranslation` | Provider-Level deutsche Labels |
| `MultipleDialogs` | Zwei unabhängige Trigger, ein Provider |

---

## Architektur-Entscheidungen

| Thema | Entscheidung |
|---|---|
| **`resolveRef` statt State** | Die Resolve-Funktion liegt in einem `useRef` um Stale-Closure-Probleme zu vermeiden — der Handler ruft immer die aktuellste Version auf |
| **Ein Dialog pro Provider** | Es wird zu jedem Zeitpunkt nur ein Dialog im DOM gerendert; ein zweiter `confirm()`-Aufruf schließt den vorherigen Promise automatisch mit `false` ab |
| **Per-Aufruf-Label schlägt Provider** | `confirmLabel` / `cancelLabel` in `ConfirmDialogOptions` haben Vorrang vor der Provider-`translation`, die selbst auf `DEFAULT_CONFIRM_DIALOG_TRANSLATION` zurückfällt |
| **Backdrop / Escape = Abbrechen** | Der MUI-Dialog-`onClose`-Callback (von beiden ausgelöst) löst den Promise immer als `false` auf |
| **Interner Dialog** | Die Dialog-UI wird nicht exportiert — sie ist ein Implementierungsdetail des Providers und kann nicht standalone gerendert werden |
