# PasswordStrengthMeter — User Manual

> [Deutsche Version →](PasswordStrengthMeter.de.md)

## Overview

The `PasswordStrengthMeter` is a password input component built on React and Material UI. It combines a text field with an animated strength bar and a requirements checklist. The component is fully integrable into forms (React Hook Form, Formik, native HTML forms) and supports both controlled and uncontrolled operation.

**Typical use cases:**

- Registration forms with password requirements
- Password change dialogs in account settings
- Onboarding flows with security hints
- Admin areas with strict password policies

---

## Prerequisites

| Dependency | Minimum version |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |

---

## Import

```tsx
import { PasswordStrengthMeter } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  PasswordStrengthMeterProps,
  PasswordStrengthMeterTranslation,
  CustomRequirement,
  StrengthResult,
  StrengthScore,
  MeterStatus,
  MeterColors,
  CheckColors,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Quick Start

```tsx
import { PasswordStrengthMeter } from '@thebuoyant-tsdev/mui-ts-library';

function App() {
  return (
    <PasswordStrengthMeter
      passwordMinLength={8}
      onPasswordChange={(password, result) => {
        console.log(`Strength: ${result.meterStatus} (Score ${result.score}/4)`);
      }}
    />
  );
}
```

---

## Props Reference

| Prop | Type | Default | Description |
|---|---|---|---|
| `autoComplete` | `string` | — | Native `autocomplete` attribute. Recommended: `"new-password"` (registration) or `"current-password"` (login). |
| `checkColors` | `CheckColors` | Red / Green | Colors of the checkmark and warning symbols in the requirements checklist. Both fields must be provided when the object is set. |
| `customRequirements` | `CustomRequirement[]` | — | Additional requirements shown in the summary alongside the built-in ones. Each entry has a `label` and a `fulfilled` value (boolean or function). |
| `disabled` | `boolean` | `false` | Disables the input field and the visibility toggle. Strength bar and requirements list remain visible. |
| `error` | `boolean` | `false` | Puts the input field into error state (red border). The `helperText` is also displayed in red. |
| `helperText` | `string` | — | Helper or error message text below the input field. Appears in red when `error={true}`. |
| `inputRef` | `React.Ref<HTMLInputElement>` | — | Ref to the native `<input>` element. Used by React Hook Form (`register().ref`) and Formik (`innerRef`). |
| `inputSize` | `"small" \| "medium"` | `"medium"` | Size of the input field per MUI standard. Affects font size, padding, and height. |
| `meterColors` | `Partial<MeterColors>` | Red → Green | Colors of the strength bar for each of the four strength levels. Only specify deviating keys — unset keys keep the default colors. |
| `name` | `string` | — | Native `name` attribute of the `<input>` element. Required by `register()` in React Hook Form and Formik. |
| `passwordMinLength` | `number` | `8` | Minimum password length. Controls the requirements checklist ("At least {n} characters") and influences the scoring algorithm. Passwords below this length always receive a `weak` score. |
| `showMeter` | `boolean` | `true` | Shows the animated strength bar below the input field. |
| `showPasswordAdornment` | `boolean` | `true` | Shows a toggle button to reveal the password in plain text. |
| `showSegmentedBar` | `boolean` | `false` | Renders the strength bar as 4 separate animated segments instead of a single growing bar. Each segment fills with color as strength increases. |
| `showSummary` | `boolean` | `true` | Shows the requirements checklist below the strength bar. |
| `translation` | `Partial<PasswordStrengthMeterTranslation>` | — | Override UI labels — only specify deviating keys. |
| `value` | `string` | — | Puts the component into **controlled mode**: the password is managed externally. Changes are passed up via `onPasswordChange`. |
| `onPasswordChange` | `(password: string, strengthResult: StrengthResult) => void` | — | Called on every keystroke with the current password and strength result. |

**`MeterColors` — Structure and defaults:**

| Field | Type | Default | Strength level |
|---|---|---|---|
| `weak` | `string` | `"#cc0000"` | Score 1 — Password too short or too simple |
| `ok` | `string` | `"#fdc010"` | Score 2 — Password meets minimum requirements |
| `good` | `string` | `"#8bc34a"` | Score 3 — Password is good |
| `veryGood` | `string` | `"#43a047"` | Score 4 — Password is very strong |

**`CheckColors` — Structure and defaults:**

| Field | Type | Default | Usage |
|---|---|---|---|
| `failure` | `string` | `"#cc0000"` | Color of the warning symbol (requirement not met) |
| `success` | `string` | `"#43a047"` | Color of the checkmark (requirement met) |

**TypeScript types and defaults:**

```ts
import {
  DEFAULT_METER_COLORS,
  DEFAULT_CHECK_COLORS,
} from '@thebuoyant-tsdev/mui-ts-library';
import type { MeterColors, CheckColors } from '@thebuoyant-tsdev/mui-ts-library';

type MeterColors = {
  weak:     string;
  ok:       string;
  good:     string;
  veryGood: string;
};

type CheckColors = {
  failure: string;
  success: string;
};
```

> **Note:** `meterColors` accepts `Partial<MeterColors>` — only deviating keys need to be specified. `checkColors`, however, is not a Partial: when the object is passed, both fields (`failure` and `success`) must be set.

---

### Translation

| Prop | Type | Default | Description |
|---|---|---|---|
| `translation` | `Partial<PasswordStrengthMeterTranslation>` | English defaults | Texts for all displayed labels and aria labels. Only specify deviating keys — unset keys fall back to the English defaults. |

The English defaults can be imported directly:

```ts
import { DEFAULT_PASSWORD_TRANSLATIONS } from '@thebuoyant-tsdev/mui-ts-library';
import type { PasswordStrengthMeterTranslation } from '@thebuoyant-tsdev/mui-ts-library';

// Full TypeScript type:
type PasswordStrengthMeterTranslation = {
  label:                string;
  summaryHeaderLabel:   string;
  summaryMinChars:      string;  // {n} is replaced by passwordMinLength at runtime
  summaryCapitalLetter: string;
  summaryLowerCaseLetter: string;
  summaryNumber:        string;
  summarySpecialChar:   string;
  showPasswordLabel:    string;
  hidePasswordLabel:    string;
  meterAriaLabel:       string;
};
```

---

## Callbacks / Events

| Callback | Signature | When fired |
|---|---|---|
| `onPasswordChange` | `(password: string, result: StrengthResult) => void` | Called on every input change — i.e. on every keystroke. `password` is the current raw text. `result` contains the complete strength analysis (see [`StrengthResult`](#strengthresult)). |

---

## `StrengthResult` — Return value of `onPasswordChange` {#strengthresult}

The `result` object provides all information about the current password and can be used for custom validation logic.

| Field | Type | Description |
|---|---|---|
| `score` | `0 \| 1 \| 2 \| 3 \| 4` | Numeric strength score. `0` = empty, `1` = weak, `2` = ok, `3` = good, `4` = very good. |
| `percent` | `number` | Percentage value corresponding to the score: `0` · `25` · `50` · `75` · `100`. Direct value for custom progress bars or UI elements. |
| `meterStatus` | `MeterStatus` | Text status: `"weak"` · `"ok"` · `"good"` · `"very good"`. |
| `length` | `number` | Current length of the password in characters. |
| `hasLower` | `boolean` | Contains at least one lowercase letter. |
| `hasUpper` | `boolean` | Contains at least one uppercase letter. |
| `hasDigit` | `boolean` | Contains at least one digit. |
| `hasSymbol` | `boolean` | Contains at least one special character (everything except letters and digits). |

**TypeScript types:**

```ts
type StrengthScore = 0 | 1 | 2 | 3 | 4;
type MeterStatus   = "weak" | "ok" | "good" | "very good";

type StrengthResult = {
  score:      StrengthScore;
  percent:    number;       // 0 | 25 | 50 | 75 | 100
  meterStatus: MeterStatus;
  length:     number;
  hasLower:   boolean;
  hasUpper:   boolean;
  hasDigit:   boolean;
  hasSymbol:  boolean;
};
```

---

## Scoring Algorithm

The score is calculated internally by the `scorePassword()` function. The algorithm is deterministic and client-side — no external services are called.

**Rules (in order of evaluation):**

| Condition | Effect |
|---|---|
| Password is empty | Score = `0`, status = `"weak"` |
| Password shorter than `passwordMinLength` | Score = `1`, status = `"weak"` — regardless of all other factors |
| Minimum length met | +1 point |
| Length ≥ `passwordMinLength + 4` | +1 bonus point (bonus for longer passwords) |
| At least 2 different character classes (upper, lower, digits, special) | +1 point |
| At least 3 different character classes | +1 point |
| Only repeated characters (e.g. `"aaaaaaa"`) | −2 points |
| Known weak pattern (`"1234"`, `"abcd"`, `"password"`, etc.) | −2 points |

The final score is clamped to the range `0–4`. Penalty rules cannot therefore go below 0.

**Examples:**

| Password | Score | Status |
|---|---|---|
| *(empty)* | 0 | weak |
| `"abc"` (too short) | 1 | weak |
| `"password123"` (known pattern) | 1 | weak |
| `"Monday08"` | 2 | ok |
| `"Monday08!"` | 3 | good |
| `"Monday08!xZ"` | 4 | very good |

---

## Translations

All displayed texts and aria labels can be overridden via the `translation` prop.

| Key | Default value | Description |
|---|---|---|
| `label` | `"Password"` | Label of the input field (floating, MUI standard). |
| `summaryHeaderLabel` | `"Requirements for your password"` | Heading of the requirements checklist. Only visible when `showSummary={true}`. |
| `summaryMinChars` | `"At least {n} characters"` | Requirement text for minimum length. `{n}` is replaced at runtime by the value of `passwordMinLength`. |
| `summaryCapitalLetter` | `"At least 1 capital letter"` | Requirement text for uppercase letters. |
| `summaryLowerCaseLetter` | `"At least 1 lowercase letter"` | Requirement text for lowercase letters. |
| `summaryNumber` | `"At least 1 number"` | Requirement text for digits. |
| `summarySpecialChar` | `"At least 1 special character"` | Requirement text for special characters. |
| `showPasswordLabel` | `"Show password"` | Aria label of the toggle in show state. Relevant for screen readers. |
| `hidePasswordLabel` | `"Hide password"` | Aria label of the toggle in hide state. Relevant for screen readers. |
| `meterAriaLabel` | `"Password strength"` | Aria label of the strength bar for screen readers. |

**Full German translation:**

```tsx
<PasswordStrengthMeter
  passwordMinLength={10}
  translation={{
    label:                  'Passwort',
    summaryHeaderLabel:     'Anforderungen an Ihr Passwort',
    summaryMinChars:        'Mindestens {n} Zeichen',
    summaryCapitalLetter:   'Mindestens 1 Großbuchstabe',
    summaryLowerCaseLetter: 'Mindestens 1 Kleinbuchstabe',
    summaryNumber:          'Mindestens 1 Zahl',
    summarySpecialChar:     'Mindestens 1 Sonderzeichen',
    showPasswordLabel:      'Passwort anzeigen',
    hidePasswordLabel:      'Passwort verbergen',
    meterAriaLabel:         'Passwortstärke',
  }}
/>
```

---

## `data-testid` Reference

The following stable test IDs are available for automated tests:

| `data-testid` | Element | Description |
|---|---|---|
| `psm-input` | Native `<input>` | The text input field. Use for `userEvent.type()` or `.value` queries. |
| `psm-toggle` | `<button>` (IconButton) | Visibility toggle. Only present when `showPasswordAdornment={true}`. |
| `psm-meter` | `<div>` (inner bar) | The colored strength bar (single-bar mode). Has `style.width` and `style.backgroundColor` as measurable values. |
| `psm-meter-segment-active` | `<div>` | A filled segment (segmented bar mode, `showSegmentedBar`). One per active segment. |
| `psm-meter-segment` | `<div>` | An empty segment (segmented bar mode). |
| `psm-summary` | `<div>` (outer box) | Container of the requirements checklist. Only present when `showSummary={true}`. |
| `psm-req-success` | `<svg>` (CheckCircle icon) | Green checkmark for a met requirement. Present multiple times. |
| `psm-req-failure` | `<svg>` (ErrorOutline icon) | Red warning symbol for an unmet requirement. Present multiple times. |

---

## Usage Examples

### Uncontrolled (simplest form)

```tsx
<PasswordStrengthMeter
  passwordMinLength={8}
  onPasswordChange={(password, result) => {
    if (result.score >= 3) {
      setIsPasswordValid(true);
    }
  }}
/>
```

### Controlled mode (external state)

```tsx
const [password, setPassword] = useState('');

<PasswordStrengthMeter
  value={password}
  onPasswordChange={(pw) => setPassword(pw)}
/>
```

### Integration with React Hook Form

```tsx
import { useForm } from 'react-hook-form';

function RegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { ref, ...rest } = register('password', { required: true, minLength: 8 });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PasswordStrengthMeter
        {...rest}
        inputRef={ref}
        name="password"
        autoComplete="new-password"
        error={!!errors.password}
        helperText={errors.password ? 'Password must be at least 8 characters.' : undefined}
        passwordMinLength={8}
      />
    </form>
  );
}
```

### Integration with Formik

```tsx
import { useField } from 'formik';

function FormikPasswordField() {
  const [field, meta] = useField('password');

  return (
    <PasswordStrengthMeter
      name={field.name}
      value={field.value}
      onPasswordChange={(pw) => field.onChange({ target: { name: field.name, value: pw } })}
      error={meta.touched && !!meta.error}
      helperText={meta.touched ? meta.error : undefined}
      autoComplete="new-password"
    />
  );
}
```

### Input only (no meter or summary)

```tsx
{/* Minimal variant — just the password field with visibility toggle. */}
<PasswordStrengthMeter
  showMeter={false}
  showSummary={false}
/>
```

### Custom colors

```tsx
<PasswordStrengthMeter
  meterColors={{
    weak:     '#e91e63',
    ok:       '#ff9800',
    good:     '#2196f3',
    veryGood: '#9c27b0',
  }}
  checkColors={{
    failure: '#e91e63',
    success: '#9c27b0',
  }}
/>
```

### Form validation after submit

```tsx
const [submitted, setSubmitted] = useState(false);
const [password, setPassword] = useState('');
const [isStrong, setIsStrong] = useState(false);

<PasswordStrengthMeter
  onPasswordChange={(pw, result) => {
    setPassword(pw);
    setIsStrong(result.score >= 3);
  }}
  error={submitted && !isStrong}
  helperText={submitted && !isStrong ? 'Please choose a stronger password.' : undefined}
/>
<button onClick={() => setSubmitted(true)}>Submit</button>
```

### Disabled state

```tsx
<PasswordStrengthMeter
  disabled={true}
  value="••••••••"
/>
```

### Segmented strength bar

```tsx
{/* 4 separate animated segments instead of a single growing bar */}
<PasswordStrengthMeter
  showSegmentedBar
  passwordMinLength={8}
/>
```

### Custom requirements

```tsx
import type { CustomRequirement } from '@thebuoyant-tsdev/mui-ts-library';

const requirements: CustomRequirement[] = [
  {
    label:     'No spaces allowed',
    fulfilled: (pw) => !pw.includes(' '),
  },
  {
    label:     'Must start with a letter',
    fulfilled: (pw) => /^[a-zA-Z]/.test(pw),
  },
];

<PasswordStrengthMeter
  customRequirements={requirements}
  passwordMinLength={10}
/>
```

Each `CustomRequirement` has:
- `label: string` — Requirement text shown in the checklist
- `fulfilled: boolean | ((password: string) => boolean)` — Static boolean or a function evaluated on the current password

---

## `CustomRequirement` Type

```ts
type CustomRequirement = {
  label:     string;
  fulfilled: boolean | ((password: string) => boolean);
};
```

---

## Accessibility

- The strength bar has a configurable `aria-label` (`translation.meterAriaLabel`) for screen readers.
- The visibility toggle has separate aria labels for "show" and "hide" states (`showPasswordLabel` / `hidePasswordLabel`), which are correctly announced by screen readers.
- `helperText` is rendered via MUI `FormHelperText` and linked to the input field via `aria-describedby`.
- The error state (`error={true}`) is signaled by `aria-invalid` on the native `<input>`.
- The requirements list in `showSummary` is visually distinguishable by both color and icon — both signals are present (no color-only indicator).

---

## Notes and Known Limitations

| Topic | Note |
|---|---|
| **Score for empty password** | Score `0` is only assigned for a completely empty password. A single character below the minimum length yields Score `1` (weak). |
| **`value` without `onPasswordChange`** | In controlled mode (`value` set) without `onPasswordChange`, the field is read-only — the user cannot type. Always set `onPasswordChange` when using `value`. |
| **Penalty rules do not accumulate** | Only one of the two penalty factors (repeated characters **or** known patterns) can be applied per password — not both simultaneously. The algorithm detects the first matching pattern. |
| **`checkColors` is not a Partial** | Unlike `meterColors` and `translation`, `checkColors` must be passed as a complete object (both fields `failure` and `success` are required). |
| **No server-side validation** | The scoring algorithm runs entirely client-side. It does not replace server-side password policy checks. It serves as a UX aid for the user. |
