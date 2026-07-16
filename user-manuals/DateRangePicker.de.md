# DateRangePicker — Benutzerhandbuch

> [English version →](DateRangePicker.md)

**Start- und Enddatum in einem einzigen, inline gerenderten Picker — ohne MUI X Pro Lizenz.** `DateRangePicker` eignet sich überall dort, wo Benutzer ein Datumsintervall auswählen müssen: Buchungsformulare, Report-Filter, Projektzeitpläne oder beliebige Formularfelder mit einem Von-/Bis-Datumspaar.

## Übersicht

`DateRangePicker` rendert zwei `date`-Eingabefelder nebeneinander mit einem Trennzeichen dazwischen. Die Komponente schließt eine echte Lücke im freien MUI-Ökosystem — der `DateRangePicker` von MUI X ist ausschließlich in der Pro-Stufe verfügbar.

**Typische Anwendungsfälle:**

- Buchungs- und Reservierungsformulare (Hotel, Mietwagen, Veranstaltungen)
- Report- oder Dashboard-Filter ("Daten anzeigen von … bis …")
- Projektplanungsformulare gemeinsam mit einem GanttChart
- HR-Urlaubsantragsformulare

### Was macht diese Komponente?

Zwei beschriftete Datumseingaben erscheinen inline:

- **Von** — das Startdatum. Der native Datumspicker des Browsers wird verwendet.
- **Bis** — das Enddatum. Sein Mindestwert wird automatisch auf das ausgewählte Startdatum gesetzt, sodass der native Datumspicker des Browsers `End < Start` in der Oberfläche verhindert.

**Validierung:**
- Wenn `end < start` (z. B. wenn ein gesteuerter Wert in einem ungültigen Zustand ankommt), erscheint sofort eine Fehlermeldung unterhalb des Enddatum-Feldes.
- Wenn `required` gesetzt ist und ein Feld leer ist, erscheint die Fehlermeldung erst, nachdem der Benutzer das Feld verlassen (blur) hat — nicht beim ersten Render.
- Ein externes `error`- und `helperText`-Prop steht für formularweite Validierung zur Verfügung.

**`onChange`-Ausgabe:** erhält ein `DateRange`-Objekt, bei dem jedes Datum sowohl als `Date`-Objekt als auch als ISO-String (`"YYYY-MM-DD"`) verfügbar ist — kein manuelles Konvertieren mehr nötig.

---

## Voraussetzungen

| Abhängigkeit | Mindestversion |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |

Keine zusätzlichen Abhängigkeiten — nutzt MUIs `TextField` und natives `<input type="date">`.

---

## Import

```tsx
import { DateRangePicker } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  DateRange,
  DateRangeEntry,
  DateRangeInput,
  DateRangePickerProps,
  DateRangePickerTranslation,
} from '@thebuoyant-tsdev/mui-ts-library';
import { dateRangePickerClasses } from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Schnellstart

```tsx
import { DateRangePicker } from '@thebuoyant-tsdev/mui-ts-library';
import type { DateRangeInput } from '@thebuoyant-tsdev/mui-ts-library';
import { useState } from 'react';

function App() {
  const [range, setRange] = useState<DateRangeInput>({ start: null, end: null });

  return (
    <DateRangePicker
      value={range}
      onChange={(r) => setRange({ start: r.start?.date ?? null, end: r.end?.date ?? null })}
    />
  );
}
```

> **Minimale Version:** `value` und `onChange` weglassen und stattdessen `defaultValue` für den unkontrollierten Modus verwenden.

---

## Props-Referenz

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `value` | `DateRangeInput` | — | Gesteuerter Wert. `{ start: Date \| null, end: Date \| null }` übergeben. Weglassen für den unkontrollierten Modus via `defaultValue`. |
| `defaultValue` | `DateRangeInput` | `{ start: null, end: null }` | Anfangswert für den unkontrollierten Modus. |
| `onChange` | `(range: DateRange) => void` | — | Wird bei jeder Änderung aufgerufen. Erhält ein `DateRange` mit `DateRangeEntry \| null` für jedes Datum. |
| `minDate` | `Date` | — | Frühestes wählbares Datum (einschließlich). Wird als `min`-HTML-Attribut gesetzt. |
| `maxDate` | `Date` | — | Spätestes wählbares Datum (einschließlich). Wird als `max`-HTML-Attribut gesetzt. |
| `disabled` | `boolean` | `false` | Deaktiviert beide Eingabefelder. Setzt auch `MuiTs-disabled` am Root-Element. |
| `required` | `boolean` | `false` | Markiert beide Eingabefelder als Pflichtfelder. Fehlermeldungen erscheinen erst, nachdem der Benutzer mit einem leeren Feld interagiert hat. |
| `error` | `boolean` | `false` | Externer Fehlerzustand — färbt den `helperText` rot. Setzt auch `MuiTs-error` am Root-Element. |
| `helperText` | `string` | — | Allgemeiner Hinweis oder Fehlermeldung, der unterhalb der Picker-Zeile angezeigt wird. |
| `inputSize` | `"small" \| "medium"` | `"small"` | MUI-TextField-Größe, die auf beide Eingabefelder angewendet wird. |
| `inputMinWidth` | `number` | `170` | Feste Breite jedes Datumseingabefeldes in Pixeln. Verhindert, dass sich das Feld beim Erscheinen einer Fehlermeldung ausdehnt. |
| `translation` | `Partial<DateRangePickerTranslation>` | — | Überschreibt beliebige Beschriftungen oder Fehlermeldungen. Nicht gesetzte Schlüssel fallen auf englische Standardwerte zurück. |

---

## Typen-Referenz

### `DateRangeInput`

Der einfache Eingabetyp für `value`- und `defaultValue`-Props.

```ts
type DateRangeInput = {
  start: Date | null;
  end:   Date | null;
};
```

### `DateRange`

Der erweiterte Ausgabetyp, der von `onChange` zurückgegeben wird. Jedes Datum enthält beide Darstellungsformen.

```ts
type DateRange = {
  start: DateRangeEntry | null;
  end:   DateRangeEntry | null;
};
```

### `DateRangeEntry`

Ein Datum mit sowohl `Date`-Objekt als auch ISO-String.

```ts
type DateRangeEntry = {
  date: Date;
  iso:  string;  // "YYYY-MM-DD" in Ortszeit
};
```

**Warum beide?** Eliminiert die Notwendigkeit, Formate auf der Verbraucherseite zu konvertieren:

```tsx
onChange={(r) => {
  r.start?.date   // → Date-Objekt für Berechnungen
  r.start?.iso    // → "2026-01-15" bereit für API-Aufrufe, Formularstatus, Anzeige
  r.end?.date     // → Date-Objekt oder undefined, wenn nicht gesetzt
  r.end?.iso      // → "2026-03-31" oder undefined
}}
```

---

## Übersetzungen

Beliebige Beschriftungen oder Fehlermeldungen können durch ein partielles Übersetzungsobjekt überschrieben werden. Nur die angegebenen Schlüssel werden ersetzt — die übrigen fallen auf englische Standardwerte zurück.

| Schlüssel | Standard (Englisch) | Wann angezeigt |
|---|---|---|
| `fromLabel` | `"From"` | Beschriftung des Startdatum-Eingabefeldes |
| `toLabel` | `"To"` | Beschriftung des Enddatum-Eingabefeldes |
| `endBeforeStartError` | `"End date must be after start date"` | Sofort wenn `end < start` |
| `startRequiredError` | `"Start date is required"` | Nach dem Verlassen des Startdatum-Feldes, wenn leer und `required` |
| `endRequiredError` | `"End date is required"` | Nach dem Verlassen des Enddatum-Feldes, wenn leer und `required` |

```tsx
<DateRangePicker
  translation={{
    fromLabel:           "Von",
    toLabel:             "Bis",
    endBeforeStartError: "Enddatum muss nach dem Startdatum liegen",
    startRequiredError:  "Startdatum ist erforderlich",
    endRequiredError:    "Enddatum ist erforderlich",
  }}
/>
```

---

## Validierung

### Enddatum vor Startdatum

Das `min`-Attribut des Enddatum-Feldes wird automatisch auf das ausgewählte Startdatum gesetzt. Dadurch wird verhindert, dass der Benutzer ein Enddatum vor dem Startdatum über den nativen Datumspicker des Browsers auswählt.

Falls `end < start` dennoch auftritt — z. B. wenn ein gesteuerter `value` mit einem ungültigen Bereich übergeben wird — erscheint sofort eine Fehlermeldung unterhalb des Enddatum-Feldes. Die Werte werden **nicht** automatisch korrigiert; die Entscheidung darüber liegt beim Verbraucher.

```tsx
// Rendert mit einem Fehler am Enddatum-Feld:
<DateRangePicker value={{ start: new Date("2026-06-01"), end: new Date("2026-03-01") }} />
```

### Pflichtfelder

`required` setzen, um zu erzwingen, dass beide Daten ausgefüllt werden. Fehlermeldungen erscheinen erst, nachdem der Benutzer das jeweilige Feld verlassen (blur) hat — nicht beim ersten Render.

```tsx
<DateRangePicker
  required
  translation={{
    startRequiredError: "Bitte wählen Sie ein Startdatum",
    endRequiredError:   "Bitte wählen Sie ein Enddatum",
  }}
/>
```

### Externer / formularweiter Fehler

`error` und `helperText` für Validierung verwenden, die außerhalb der Komponente liegt (z. B. serverseitige Fehler, komponentenübergreifende Formularvalidierung):

```tsx
<DateRangePicker
  error={hatKonflikt}
  helperText={hatKonflikt ? "Dieser Zeitraum überschneidet sich mit einer bestehenden Buchung." : undefined}
/>
```

---

## CSS-Klassen

`dateRangePickerClasses` für die Ausrichtung von Elementen in `sx` oder globalem CSS verwenden:

```ts
import { dateRangePickerClasses } from '@thebuoyant-tsdev/mui-ts-library';

dateRangePickerClasses.root       // "MuiTsDateRangePicker-root"
dateRangePickerClasses.inputs     // "MuiTsDateRangePicker-inputs"
dateRangePickerClasses.startInput // "MuiTsDateRangePicker-startInput"
dateRangePickerClasses.separator  // "MuiTsDateRangePicker-separator"
dateRangePickerClasses.endInput   // "MuiTsDateRangePicker-endInput"
dateRangePickerClasses.helperText // "MuiTsDateRangePicker-helperText"
```

### Zustandsklassen

Das Root-Element erhält je nach aktuellem Zustand der Komponente gemeinsame Zustandsklassen aus `muiTsStateClasses`:

| Zustandsklasse | Wann gesetzt |
|---|---|
| `MuiTs-disabled` | `disabled={true}` |
| `MuiTs-error` | `error={true}` oder ein eingebauter Validierungsfehler ist aktiv |

```css
/* Beispiel: gesamten Picker abdunkeln wenn deaktiviert */
.MuiTsDateRangePicker-root.MuiTs-disabled {
  opacity: 0.5;
}

/* Beispiel: Separator rot einfärben bei beliebigem Fehler */
.MuiTsDateRangePicker-root.MuiTs-error .MuiTsDateRangePicker-separator {
  color: var(--mui-palette-error-main);
}
```

---

## Beispiele

### Unkontrolliert mit Standardwert

```tsx
<DateRangePicker
  defaultValue={{
    start: new Date("2026-01-01"),
    end:   new Date("2026-03-31"),
  }}
  onChange={(r) => console.log(r.start?.iso, r.end?.iso)}
/>
```

### Auf ein Kalenderjahr beschränkt

```tsx
<DateRangePicker
  minDate={new Date("2026-01-01")}
  maxDate={new Date("2026-12-31")}
  defaultValue={{ start: null, end: null }}
/>
```

### Pflichtfeld in einem Formular

```tsx
function BuchungsFormular() {
  const [range, setRange] = useState<DateRangeInput>({ start: null, end: null });
  const [abgeschickt, setAbgeschickt] = useState(false);

  const istGueltig = range.start !== null && range.end !== null;

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (istGueltig) setAbgeschickt(true); }}>
      <DateRangePicker
        value={range}
        onChange={(r) => setRange({ start: r.start?.date ?? null, end: r.end?.date ?? null })}
        required
        translation={{ fromLabel: "Check-in", toLabel: "Check-out" }}
      />
      <button type="submit" disabled={!istGueltig}>Buchen</button>
    </form>
  );
}
```

### ISO-Strings direkt verwenden

```tsx
<DateRangePicker
  onChange={(r) => {
    if (r.start && r.end) {
      fetch('/api/buchungen', {
        method: 'POST',
        body: JSON.stringify({ von: r.start.iso, bis: r.end.iso }),
      });
    }
  }}
/>
```
