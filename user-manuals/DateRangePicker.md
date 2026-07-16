# DateRangePicker — User Manual

> [Deutsche Version →](DateRangePicker.de.md)

**A start + end date picker in a single inline component — no MUI X Pro license required.** Use `DateRangePicker` wherever users need to select a date interval: booking forms, report filters, project timelines, or any form field that requires a "from / to" date pair.

## Overview

`DateRangePicker` renders two `date` inputs side by side with a separator between them. It fills a genuine gap in the free MUI ecosystem — `DateRangePicker` from MUI X is exclusively available in the Pro tier.

**Typical use cases:**

- Booking and reservation forms (hotel, rental, event)
- Report or dashboard filters ("Show data from … to …")
- Project planning forms alongside a GanttChart
- HR leave-request forms

### What does this component do?

Two labeled date inputs appear inline:

- **From** — the start date. The browser's native date picker is used.
- **To** — the end date. Its minimum is automatically set to the selected start date, so the browser's date picker prevents end < start in the UI.

**Validation:**
- If `end < start` (e.g. the controlled value arrives in invalid state), an error message appears immediately below the end input.
- If `required` is set and a field is empty, the error appears after the user has interacted with (blurred) that field — not on first render.
- An external `error` + `helperText` prop is available for form-level validation.

**`onChange` output:** receives a `DateRange` object where each date is represented as both a `Date` object and an ISO string (`"YYYY-MM-DD"`), so you never need to convert.

---

## Prerequisites

| Dependency | Minimum version |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |

No additional dependencies — uses MUI's `TextField` and native `<input type="date">`.

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

## Quick Start

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

> **Minimal version:** omit `value` and `onChange` entirely to use uncontrolled mode with `defaultValue`.

---

## Props Reference

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `DateRangeInput` | — | Controlled value. Pass `{ start: Date \| null, end: Date \| null }`. Omit to use uncontrolled mode via `defaultValue`. |
| `defaultValue` | `DateRangeInput` | `{ start: null, end: null }` | Initial value for uncontrolled mode. |
| `onChange` | `(range: DateRange) => void` | — | Called on every change. Receives a `DateRange` with `DateRangeEntry \| null` for each date. |
| `minDate` | `Date` | — | Earliest selectable date (inclusive). Applied as the `min` HTML attribute. |
| `maxDate` | `Date` | — | Latest selectable date (inclusive). Applied as the `max` HTML attribute. |
| `disabled` | `boolean` | `false` | Disables both inputs. Also applies `MuiTs-disabled` to the root element. |
| `required` | `boolean` | `false` | Marks both inputs as required. Shows error messages after the user has interacted with an empty field. |
| `error` | `boolean` | `false` | External error state — turns the `helperText` red. Also applies `MuiTs-error` to the root element. |
| `helperText` | `string` | — | General hint or error message displayed below the picker row. |
| `inputSize` | `"small" \| "medium"` | `"small"` | MUI TextField size applied to both inputs. |
| `inputMinWidth` | `number` | `170` | Fixed width of each date input in pixels. Prevents the field from stretching when a validation message appears. |
| `translation` | `Partial<DateRangePickerTranslation>` | — | Override any label or error message. Unset keys fall back to English defaults. |

---

## Types Reference

### `DateRangeInput`

The simple input type used for `value` and `defaultValue` props.

```ts
type DateRangeInput = {
  start: Date | null;
  end:   Date | null;
};
```

### `DateRange`

The rich output type returned by `onChange`. Each date includes both representations.

```ts
type DateRange = {
  start: DateRangeEntry | null;
  end:   DateRangeEntry | null;
};
```

### `DateRangeEntry`

One date with both a `Date` object and an ISO string.

```ts
type DateRangeEntry = {
  date: Date;
  iso:  string;  // "YYYY-MM-DD" in local time
};
```

**Why both?** Eliminates the need to convert between formats on the consumer side:

```tsx
onChange={(r) => {
  r.start?.date   // → Date object for calculations
  r.start?.iso    // → "2026-01-15" ready for API calls, form state, display
  r.end?.date     // → Date object or undefined if not set
  r.end?.iso      // → "2026-03-31" or undefined
}}
```

---

## Translation

Override any label or error message by passing a partial translation object. Only the keys you specify are replaced — the rest fall back to English defaults.

| Key | Default (English) | When shown |
|---|---|---|
| `fromLabel` | `"From"` | Label of the start date input |
| `toLabel` | `"To"` | Label of the end date input |
| `endBeforeStartError` | `"End date must be after start date"` | Immediately when `end < start` |
| `startRequiredError` | `"Start date is required"` | After the start input is blurred, when empty and `required` |
| `endRequiredError` | `"End date is required"` | After the end input is blurred, when empty and `required` |

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

## Validation

### End before start

The end input's `min` attribute is automatically set to the selected start date. This prevents the user from picking an end date before the start date using the browser's native date picker UI.

If `end < start` still occurs — for example when a controlled `value` is passed with an invalid range — an error message appears immediately below the end input. The values are **not** auto-corrected; the consumer decides how to handle it.

```tsx
// This renders with an error on the end input:
<DateRangePicker value={{ start: new Date("2026-06-01"), end: new Date("2026-03-01") }} />
```

### Required fields

Set `required` to enforce that both dates are filled. Error messages appear only after the user has interacted with (blurred) the respective field, not on initial render.

```tsx
<DateRangePicker
  required
  translation={{
    startRequiredError: "Please select a start date",
    endRequiredError:   "Please select an end date",
  }}
/>
```

### External / form-level error

Use `error` + `helperText` for validation that lives outside the component (e.g. server-side errors, cross-field form validation):

```tsx
<DateRangePicker
  error={hasConflict}
  helperText={hasConflict ? "This range overlaps with an existing booking." : undefined}
/>
```

---

## CSS Classes

Use `dateRangePickerClasses` for targeting elements in `sx` or global CSS:

```ts
import { dateRangePickerClasses } from '@thebuoyant-tsdev/mui-ts-library';

dateRangePickerClasses.root       // "MuiTsDateRangePicker-root"
dateRangePickerClasses.inputs     // "MuiTsDateRangePicker-inputs"
dateRangePickerClasses.startInput // "MuiTsDateRangePicker-startInput"
dateRangePickerClasses.separator  // "MuiTsDateRangePicker-separator"
dateRangePickerClasses.endInput   // "MuiTsDateRangePicker-endInput"
dateRangePickerClasses.helperText // "MuiTsDateRangePicker-helperText"
```

### State classes

The root element receives shared state classes from `muiTsStateClasses` depending on the component's current state:

| State class | When applied |
|---|---|
| `MuiTs-disabled` | `disabled={true}` |
| `MuiTs-error` | `error={true}` or a built-in validation error is active |

```css
/* Example: dim the whole picker when disabled */
.MuiTsDateRangePicker-root.MuiTs-disabled {
  opacity: 0.5;
}

/* Example: color the separator red on any error */
.MuiTsDateRangePicker-root.MuiTs-error .MuiTsDateRangePicker-separator {
  color: var(--mui-palette-error-main);
}
```

---

## Examples

### Uncontrolled with default value

```tsx
<DateRangePicker
  defaultValue={{
    start: new Date("2026-01-01"),
    end:   new Date("2026-03-31"),
  }}
  onChange={(r) => console.log(r.start?.iso, r.end?.iso)}
/>
```

### Constrained to a calendar year

```tsx
<DateRangePicker
  minDate={new Date("2026-01-01")}
  maxDate={new Date("2026-12-31")}
  defaultValue={{ start: null, end: null }}
/>
```

### Required in a form

```tsx
function BookingForm() {
  const [range, setRange] = useState<DateRangeInput>({ start: null, end: null });
  const [submitted, setSubmitted] = useState(false);

  const isValid = range.start !== null && range.end !== null;

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (isValid) setSubmitted(true); }}>
      <DateRangePicker
        value={range}
        onChange={(r) => setRange({ start: r.start?.date ?? null, end: r.end?.date ?? null })}
        required
        translation={{ fromLabel: "Check-in", toLabel: "Check-out" }}
      />
      <button type="submit" disabled={!isValid}>Book</button>
    </form>
  );
}
```

### Consuming ISO strings directly

```tsx
<DateRangePicker
  onChange={(r) => {
    if (r.start && r.end) {
      fetch('/api/bookings', {
        method: 'POST',
        body: JSON.stringify({ from: r.start.iso, to: r.end.iso }),
      });
    }
  }}
/>
```
