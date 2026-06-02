# PasswordStrengthMeter — Benutzerhandbuch

> [English Version →](PasswordStrengthMeter.md)

**Nutzer zu sicheren Passwörtern führen, ohne sie zu blockieren — mit Live-Stärke-Feedback, segmentiertem Balken und Anforderungs-Checkliste.** `PasswordStrengthMeter` in Registrierungs- und Passwort-Änderungs-Flows einsetzen, wo Sicherheit wichtig ist, die UX-Hürde aber minimal bleiben soll.

## Überblick

Der `PasswordStrengthMeter` ist eine Passwort-Eingabe-Komponente auf Basis von React und Material UI. Sie kombiniert ein Textfeld mit einem animierten Stärke-Balken und einer Anforderungscheckliste. Die Komponente ist vollständig in Formulare integrierbar (React Hook Form, Formik, native HTML-Forms) und unterstützt kontrollierten sowie unkontrollierten Betrieb.

**Typische Einsatzgebiete:**

- Registrierungsformulare mit Passwort-Anforderungen
- Passwort-Änderungs-Dialoge in Kontoeinstellungen
- Onboarding-Flows mit Sicherheitshinweisen
- Admin-Bereiche mit strengen Passwortrichtlinien

---

> ### ✨ Neu in v1.5.0
>
> | Feature | Beschreibung | Springe zu |
> |---|---|---|
> | **`showSegmentedBar`** | Stärkebalken als 4 einzeln animierte Segmente statt einem wachsenden Balken | [→ Segmentierter Stärkebalken](#segmentierter-stärkebalken) |
> | **`customRequirements`** | Eigene Passwort-Anforderungen mit Live-Auswertung via `(password) => boolean` | [→ Eigene Anforderungen](#eigene-anforderungen) |

---

## Technische Voraussetzungen

| Abhängigkeit | Mindestversion |
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
  StrengthResult,
  StrengthScore,
  MeterStatus,
  MeterColors,
  CheckColors,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Schnellstart

```tsx
import { PasswordStrengthMeter } from '@thebuoyant-tsdev/mui-ts-library';

function App() {
  return (
    <PasswordStrengthMeter
      passwordMinLength={8}
      onPasswordChange={(password, result) => {
        console.log(`Stärke: ${result.meterStatus} (Score ${result.score}/4)`);
      }}
    />
  );
}
```

---

## Props-Referenz

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `autoComplete` | `string` | — | Natives `autocomplete`-Attribut. Empfohlene Werte: `"new-password"` (Registrierung) oder `"current-password"` (Login). |
| `checkColors` | `CheckColors` | Rot / Grün | Farben der Haken- und Warnsymbole in der Anforderungscheckliste. Beide Felder müssen angegeben werden wenn das Objekt gesetzt wird. |
| `customRequirements` | `CustomRequirement[]` | — | Zusätzliche Anforderungen, die neben den eingebauten in der Zusammenfassung angezeigt werden. Jeder Eintrag hat ein `label` und einen `fulfilled`-Wert (Boolean oder Funktion). |
| `disabled` | `boolean` | `false` | Deaktiviert das Eingabefeld und den Sichtbarkeits-Umschalter. Stärke-Balken und Anforderungsliste bleiben sichtbar. |
| `error` | `boolean` | `false` | Setzt das Eingabefeld in den Fehlerzustand (roter Rahmen). Der `helperText` wird ebenfalls in Rot dargestellt. |
| `helperText` | `string` | — | Hilfs- oder Fehlermeldungstext unterhalb des Eingabefelds. Erscheint in Rot wenn `error={true}`. |
| `inputRef` | `React.Ref<HTMLInputElement>` | — | Ref auf das native `<input>`-Element. Wird von React Hook Form (`register().ref`) und Formik (`innerRef`) verwendet. |
| `inputSize` | `"small" \| "medium"` | `"medium"` | Größe des Eingabefelds gemäß MUI-Standard. Beeinflusst Schriftgröße, Innenabstand und Höhe. |
| `meterColors` | `Partial<MeterColors>` | Rot → Grün | Farben des Stärke-Balkens für jeden der vier Stärke-Stufen. Nur abweichende Keys angeben — nicht gesetzte Keys behalten die Standardfarben. |
| `name` | `string` | — | Natives `name`-Attribut des `<input>`-Elements. Benötigt von `register()` in React Hook Form und Formik. |
| `passwordMinLength` | `number` | `8` | Mindestlänge des Passworts. Steuert die Anforderungscheckliste und den Scoring-Algorithmus. Passwörter unter dieser Länge erhalten immer den Score `weak`. |
| `showMeter` | `boolean` | `true` | Zeigt den animierten Stärke-Balken unterhalb des Eingabefelds an. |
| `generatorOptions` | `PasswordGeneratorOptions` | — | Konfiguriert den eingebauten Generator (bei `showPasswordGenerator=true`). Felder: `length`, `upper`, `lower`, `numbers`, `symbols`. |
| `showPasswordAdornment` | `boolean` | `true` | Zeigt einen Button zum Sichtbar-Machen des Passworts im Klartext. |
| `showPasswordGenerator` | `boolean` | `false` | Zeigt einen "Sicheres Passwort generieren"-Button — generiert ein starkes Passwort und füllt das Eingabefeld. Das generierte Passwort wird automatisch sichtbar gemacht. |
| `showSegmentedBar` | `boolean` | `false` | Zeigt den Stärke-Balken als 4 separate animierte Segmente statt als einen wachsenden Balken. |
| `showSummary` | `boolean` | `true` | Zeigt die Anforderungscheckliste unterhalb des Stärke-Balkens an. |
| `translation` | `Partial<PasswordStrengthMeterTranslation>` | — | UI-Texte überschreiben — nur abweichende Keys angeben. |
| `value` | `string` | — | Setzt die Komponente in den **kontrollierten Modus**: Das Passwort wird von außen gesteuert. Änderungen werden über `onPasswordChange` nach oben gegeben. |
| `onPasswordChange` | `(password: string, strengthResult: StrengthResult) => void` | — | Wird bei jedem Tastendruck mit dem aktuellen Passwort und dem Stärke-Ergebnis aufgerufen. |
| `onPasswordGenerated` | `(password: string) => void` | — | Wird ausgelöst wenn der Generator-Button geklickt wird — mit dem generierten Passwort. |

**`MeterColors` — Struktur und Standardwerte:**

| Feld | Typ | Standard | Stärke-Stufe |
|---|---|---|---|
| `weak` | `string` | `"#cc0000"` | Score 1 — Passwort zu kurz oder zu einfach |
| `ok` | `string` | `"#fdc010"` | Score 2 — Passwort erfüllt Mindestanforderungen |
| `good` | `string` | `"#8bc34a"` | Score 3 — Passwort ist gut |
| `veryGood` | `string` | `"#43a047"` | Score 4 — Passwort ist sehr stark |

**`CheckColors` — Struktur und Standardwerte:**

| Feld | Typ | Standard | Verwendung |
|---|---|---|---|
| `failure` | `string` | `"#cc0000"` | Farbe des Warnsymbols (Anforderung nicht erfüllt) |
| `success` | `string` | `"#43a047"` | Farbe des Häkchens (Anforderung erfüllt) |

**TypeScript-Typen und Standardwerte:**

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

> **Hinweis:** `meterColors` akzeptiert `Partial<MeterColors>` — es müssen nur abweichende Keys angegeben werden. `checkColors` hingegen ist kein Partial: wenn das Objekt übergeben wird, müssen beide Felder (`failure` und `success`) gesetzt sein.

---

### Übersetzung

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `translation` | `Partial<PasswordStrengthMeterTranslation>` | Englische Defaults | Texte für alle angezeigten Beschriftungen und Aria-Labels. Nur abweichende Keys angeben — nicht gesetzte Keys fallen auf die englischen Standardwerte zurück. |

Die englischen Standardwerte können direkt importiert werden:

```ts
import { DEFAULT_PASSWORD_TRANSLATIONS } from '@thebuoyant-tsdev/mui-ts-library';
import type { PasswordStrengthMeterTranslation } from '@thebuoyant-tsdev/mui-ts-library';

// Vollständiger TypeScript-Typ:
type PasswordStrengthMeterTranslation = {
  label:                string;
  summaryHeaderLabel:   string;
  summaryMinChars:      string;  // {n} wird durch passwordMinLength ersetzt
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

| Callback | Signatur | Wann ausgelöst |
|---|---|---|
| `onPasswordChange` | `(password: string, result: StrengthResult) => void` | Wird bei jeder Eingabe-Änderung aufgerufen — also bei jedem Tastendruck. `password` ist der aktuelle Rohtext. `result` enthält die vollständige Stärkeanalyse (siehe [`StrengthResult`](#strengthresult)). |

---

## `StrengthResult` — Rückgabewert von `onPasswordChange` {#strengthresult}

Das `result`-Objekt liefert alle Informationen über das aktuelle Passwort und kann für eigene Validierungslogik genutzt werden.

| Feld | Typ | Beschreibung |
|---|---|---|
| `score` | `0 \| 1 \| 2 \| 3 \| 4` | Numerischer Stärke-Score. `0` = leer, `1` = schwach, `2` = ok, `3` = gut, `4` = sehr gut. |
| `percent` | `number` | Prozentwert entsprechend dem Score: `0` · `25` · `50` · `75` · `100`. Direkter Wert für eigene Progress-Bars oder UI-Elemente. |
| `meterStatus` | `MeterStatus` | Textueller Status: `"weak"` · `"ok"` · `"good"` · `"very good"`. |
| `length` | `number` | Aktuelle Länge des Passworts in Zeichen. |
| `hasLower` | `boolean` | Enthält mindestens einen Kleinbuchstaben. |
| `hasUpper` | `boolean` | Enthält mindestens einen Großbuchstaben. |
| `hasDigit` | `boolean` | Enthält mindestens eine Ziffer. |
| `hasSymbol` | `boolean` | Enthält mindestens ein Sonderzeichen (alles außer Buchstaben und Ziffern). |

**TypeScript-Typen:**

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

## Scoring-Algorithmus

Der Score wird intern über die Funktion `scorePassword()` berechnet. Der Algorithmus ist deterministisch und clientseitig — es werden keine externen Services aufgerufen.

**Regeln (in Reihenfolge der Auswertung):**

| Bedingung | Effekt |
|---|---|
| Passwort ist leer | Score = `0`, Status = `"weak"` |
| Passwort kürzer als `passwordMinLength` | Score = `1`, Status = `"weak"` — unabhängig von allen anderen Faktoren |
| Mindestlänge erfüllt | +1 Punkt |
| Länge ≥ `passwordMinLength + 4` | +1 Zusatzpunkt (Bonus für längere Passwörter) |
| Mindestens 2 verschiedene Zeichenklassen (Groß, Klein, Ziffern, Sonderzeichen) | +1 Punkt |
| Mindestens 3 verschiedene Zeichenklassen | +1 Punkt |
| Nur wiederholte Zeichen (z. B. `"aaaaaaa"`) | −2 Punkte |
| Bekanntes schwaches Muster (`"1234"`, `"abcd"`, `"password"` u. a.) | −2 Punkte |

Der finale Score wird auf den Bereich `0–4` begrenzt (Clamp). Malus-Regeln können also nicht unter 0 fallen.

**Beispiele:**

| Passwort | Score | Status |
|---|---|---|
| *(leer)* | 0 | weak |
| `"abc"` (zu kurz) | 1 | weak |
| `"password123"` (bekanntes Muster) | 1 | weak |
| `"Montag08"` | 2 | ok |
| `"Montag08!"` | 3 | good |
| `"Montag08!xZ"` | 4 | very good |

---

## Texte & Übersetzungen

Alle angezeigten Texte und Aria-Labels können über die `translation`-Prop überschrieben werden.

| Key | Standard-Wert | Beschreibung |
|---|---|---|
| `label` | `"Password"` | Label des Eingabefelds (schwebend, MUI-Standard). |
| `summaryHeaderLabel` | `"Requirements for your password"` | Überschrift der Anforderungscheckliste. Nur sichtbar wenn `showSummary={true}`. |
| `summaryMinChars` | `"At least {n} characters"` | Anforderungstext für die Mindestlänge. `{n}` wird zur Laufzeit durch den Wert von `passwordMinLength` ersetzt. |
| `summaryCapitalLetter` | `"At least 1 capital letter"` | Anforderungstext für Großbuchstaben. |
| `summaryLowerCaseLetter` | `"At least 1 lowercase letter"` | Anforderungstext für Kleinbuchstaben. |
| `summaryNumber` | `"At least 1 number"` | Anforderungstext für Ziffern. |
| `summarySpecialChar` | `"At least 1 special character"` | Anforderungstext für Sonderzeichen. |
| `showPasswordLabel` | `"Show password"` | Aria-Label des Umschalters im Sichtbarmachen-Zustand. Für Screenreader relevant. |
| `hidePasswordLabel` | `"Hide password"` | Aria-Label des Umschalters im Verbergen-Zustand. Für Screenreader relevant. |
| `meterAriaLabel` | `"Password strength"` | Aria-Label des Stärke-Balkens für Screenreader. |

**Vollständige deutsche Übersetzung:**

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

## `data-testid`-Referenz

Für automatisierte Tests stehen folgende stabile Test-IDs zur Verfügung:

| `data-testid` | Element | Beschreibung |
|---|---|---|
| `psm-input` | Natives `<input>` | Das Texteingabefeld. Nutzen für `userEvent.type()` oder `.value`-Abfragen. |
| `psm-toggle` | `<button>` (IconButton) | Sichtbarkeits-Umschalter. Nur vorhanden wenn `showPasswordAdornment={true}`. |
| `psm-meter` | `<div>` (innerer Balken) | Der farbige Stärke-Balken. Hat `style.width` und `style.backgroundColor` als messbare Werte. |
| `psm-summary` | `<div>` (äußere Box) | Container der Anforderungscheckliste. Nur vorhanden wenn `showSummary={true}`. |
| `psm-req-success` | `<svg>` (CheckCircle-Icon) | Grüner Haken für eine erfüllte Anforderung. Mehrfach vorhanden. |
| `psm-req-failure` | `<svg>` (ErrorOutline-Icon) | Rotes Warnsymbol für eine nicht erfüllte Anforderung. Mehrfach vorhanden. |

---

## Anwendungsbeispiele

### Unkontrolliert (einfachste Form)

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

### Kontrollierter Modus (externer State)

```tsx
const [password, setPassword] = useState('');

<PasswordStrengthMeter
  value={password}
  onPasswordChange={(pw) => setPassword(pw)}
/>
```

### Integration mit React Hook Form

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
        helperText={errors.password ? 'Passwort muss mindestens 8 Zeichen haben.' : undefined}
        passwordMinLength={8}
      />
    </form>
  );
}
```

### Integration mit Formik

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

### Nur Eingabefeld (ohne Meter und Zusammenfassung)

```tsx
// Minimale Variante — nur das Passwortfeld mit Sichtbarkeits-Toggle.
<PasswordStrengthMeter
  showMeter={false}
  showSummary={false}
/>
```

### Benutzerdefinierte Farben

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

### Formularvalidierung nach Submit

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
  helperText={submitted && !isStrong ? 'Bitte wählen Sie ein stärkeres Passwort.' : undefined}
/>
<button onClick={() => setSubmitted(true)}>Absenden</button>
```

### Deaktivierter Zustand

```tsx
<PasswordStrengthMeter
  disabled={true}
  value="••••••••"
/>
```

---

## Barrierefreiheit

- Der Stärke-Balken hat ein konfigurierbares `aria-label` (`translation.meterAriaLabel`) für Screenreader.
- Der Sichtbarkeits-Umschalter hat separate Aria-Labels für „Anzeigen"- und „Verbergen"-Zustand (`showPasswordLabel` / `hidePasswordLabel`), die vom Screenreader korrekt angesagt werden.
- `helperText` wird via MUI `FormHelperText` gerendert und ist mit dem Eingabefeld via `aria-describedby` verknüpft.
- Der Fehlerzustand (`error={true}`) wird durch `aria-invalid` am nativen `<input>` signalisiert.
- Die Anforderungsliste in `showSummary` ist visuell durch Farbe und Icon unterscheidbar — beide Signale sind vorhanden (kein reiner Color-only-Indikator).

---

## Hinweise und bekannte Einschränkungen

| Thema | Hinweis |
|---|---|
| **Score bei leerem Passwort** | Score `0` wird nur bei komplett leerem Passwort vergeben. Ein einziges Zeichen unter der Mindestlänge ergibt Score `1` (weak). |
| **`value` ohne `onPasswordChange`** | Im kontrollierten Modus (`value` gesetzt) ohne `onPasswordChange` ist das Feld read-only — der Nutzer kann keine Eingabe machen. Immer `onPasswordChange` setzen wenn `value` verwendet wird. |
| **Malus-Regeln kumulieren nicht** | Nur einer der beiden Malus-Faktoren (wiederholte Zeichen **oder** bekannte Muster) kann pro Passwort angewendet werden — nicht beide gleichzeitig. Der Algorithmus erkennt das erste zutreffende Muster. |
| **`checkColors` ist kein Partial** | Im Gegensatz zu `meterColors` und `translation` muss `checkColors` als vollständiges Objekt übergeben werden (beide Felder `failure` und `success` sind Pflicht). |
| **Keine serverseitige Validierung** | Der Scoring-Algorithmus läuft vollständig clientseitig. Er ersetzt keine serverseitige Passwortrichtlinien-Prüfung. Er dient als UX-Hilfe für den Nutzer. |
