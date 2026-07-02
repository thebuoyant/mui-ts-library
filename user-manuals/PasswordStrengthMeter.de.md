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

### Was macht diese Komponente?

Wenn `PasswordStrengthMeter` gerendert wird, sieht der Nutzer drei gestapelte Elemente:

**1 — Passwort-Eingabe:** Ein Standard-MUI-Textfeld mit einem Passwort-Anzeigen/Verbergen-Toggle-Button rechts. Optional erweiterbar mit einem Passwort-generieren-Button und einem Kopieren-in-Zwischenablage-Button.

**2 — Stärke-Balken:** Ein animierter farbiger Balken unterhalb der Eingabe, der beim Tippen wächst und die Farbe ändert. Bei Score 1 ist er rot und kurz; bei Score 4 ist er grün und vollständig ausgefüllt. Alternativ rendert `showSegmentedBar` 4 separate Segmente, die sich einzeln füllen.

| Score | Status | Farbe | Bedeutung |
|---|---|---|---|
| 0 | — | (leer) | Noch kein Passwort eingegeben |
| 1 | weak | Rot | Zu kurz, oder nur wiederholte Zeichen / bekanntes Muster |
| 2 | ok | Gelb | Mindestlänge erfüllt, aber nur eine Zeichenklasse |
| 3 | good | Hellgrün | Mindestlänge + 2–3 Zeichenklassen |
| 4 | very good | Grün | Langes Passwort mit 3+ Zeichenklassen |

**3 — Anforderungscheckliste:** Eine Liste von Passwortregeln, jede mit einem ✓ (grün) oder ✗ (rot) Icon, das sich in Echtzeit aktualisiert. Standardregeln: Mindestlänge · Großbuchstabe · Kleinbuchstabe · Ziffer · Sonderzeichen. Eigene Regeln können über `customRequirements` hinzugefügt werden.

> **Kernprinzip — Score statt Blockierung:** Die Komponente blockiert den Nutzer nie beim Tippen. Sie meldet die aktuelle Stärke über `onPasswordChange`, damit *deine* Formularlogik entscheiden kann, ob der Senden-Button aktiviert werden soll.

---

> ### Neu in v3.9.0
>
> | Feature | Beschreibung | Springe zu |
> |---|---|---|
> | **`showCopyButton`** | Kopier-Icon neben dem Passwortfeld, sichtbar sobald ein Passwort vorhanden ist — passt natürlich zu `showPasswordGenerator` | [→ In Zwischenablage kopieren](#in-zwischenablage-kopieren) |

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
  CustomRequirement,
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
      passwordMinLength={8}          // legt die „Mindestens 8 Zeichen"-Regel in der Checkliste fest
                                     // und erzwingt Score 1 („weak") bis die Länge erreicht ist
      onPasswordChange={(password, result) => {
        // wird bei jedem Tastendruck aufgerufen — mit dem aktuellen Passwort und seiner Analyse
        // result.score       = 0–4 (damit kann der Senden-Button aktiviert/deaktiviert werden)
        // result.meterStatus = "weak" | "ok" | "good" | "very good"
        console.log(`Stärke: ${result.meterStatus} (Score ${result.score}/4)`);
      }}
    />
  );
}
```

> **Minimalversion:** Nur `passwordMinLength` + `onPasswordChange` liefern die Eingabe, den animierten Balken und die vollständige Anforderungscheckliste.

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
| `showConfirmField` | `boolean` | `false` | Zeigt ein zweites "Passwort bestätigen"-Eingabefeld — grünes ✓ / rotes ✗ mit Hilfstext beim Tippen. Funktioniert kontrolliert (`confirmValue`) und unkontrolliert. |
| `showCopyButton` | `boolean` | `false` | Zeigt ein Kopier-Icon neben dem Passwortfeld, sichtbar sobald ein Passwort vorhanden ist. |
| `showPasswordAdornment` | `boolean` | `true` | Zeigt einen Button zum Sichtbar-Machen des Passworts im Klartext. |
| `showPasswordGenerator` | `boolean` | `false` | Zeigt einen "Sicheres Passwort generieren"-Button — generiert ein starkes Passwort und füllt das Eingabefeld. Das generierte Passwort wird automatisch sichtbar gemacht. |
| `showSegmentedBar` | `boolean` | `false` | Zeigt den Stärke-Balken als 4 separate animierte Segmente statt als einen wachsenden Balken. |
| `showSummary` | `boolean` | `true` | Zeigt die Anforderungscheckliste unterhalb des Stärke-Balkens an. |
| `translation` | `Partial<PasswordStrengthMeterTranslation>` | — | UI-Texte überschreiben — nur abweichende Keys angeben. |
| `value` | `string` | — | Setzt die Komponente in den **kontrollierten Modus**: Das Passwort wird von außen gesteuert. Änderungen werden über `onPasswordChange` nach oben gegeben. |
| `confirmValue` | `string` | — | Kontrollierter Wert für das Confirm-Feld (bei `showConfirmField`). |
| `onConfirmChange` | `(confirmValue: string, matches: boolean) => void` | — | Wird bei jedem Tastendruck im Confirm-Feld ausgelöst — inkl. ob die Passwörter übereinstimmen. |
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
  generatePasswordLabel: string;
  confirmLabel:          string;
  confirmMatchLabel:     string;
  confirmMismatchLabel:  string;
  copyPasswordLabel?:    string; // @since 3.9.0 — siehe Kompatibilitätshinweis unten
  copiedLabel?:          string; // @since 3.9.0 — siehe Kompatibilitätshinweis unten
};
```

> **⚠️ Kompatibilitätshinweis:** `copyPasswordLabel` und `copiedLabel` (hinzugefügt in `v3.9.0`) sind auf diesem Typ optional — im Gegensatz zu den anderen Keys, die required sind. Das ist beabsichtigt: dadurch bleibt älterer Code, der ein vollständiges `PasswordStrengthMeterTranslation`-Literal deklariert (statt ein partielles Objekt an die `translation`-Prop zu übergeben), auch bei zukünftigen neuen Keys kompilierbar. Intern löst die Komponente fehlende Keys immer gegen `DEFAULT_PASSWORD_TRANSLATIONS` auf — sie müssen also nie angegeben werden.

---

## In Zwischenablage kopieren

```tsx
<PasswordStrengthMeter
  showPasswordGenerator
  showCopyButton
/>
```

`showCopyButton` aktivieren, um ein Kopier-Icon neben dem Passwortfeld anzuzeigen — es erscheint erst, wenn das Feld tatsächlich einen Wert hat, damit ein leeres Eingabefeld nicht überladen wirkt. Passt natürlich zu `showPasswordGenerator`: ohne eine Ein-Klick-Kopierfunktion ist es auf Mobile umständlich, ein generiertes Passwort aus dem Feld zu bekommen, da manuelles Text-Markieren auf einem Touchscreen fiddly ist. Klick auf das Icon kopiert das aktuelle Passwort in die Zwischenablage und wechselt kurz (2 Sekunden) zu einem Haken als visuelle Bestätigung — unabhängig davon, ob das Passwort eingetippt oder generiert wurde.

---

## Callbacks / Events

> **Welcher Callback feuert bei welcher Aktion?**
>
> | Aktion | Ausgelöste Callbacks |
> |---|---|
> | Tastendruck im Passwort-Feld | `onPasswordChange` |
> | Tastendruck im Bestätigungs-Feld (`showConfirmField`) | `onConfirmChange` |
> | Generator-Button geklickt (`showPasswordGenerator`) | `onPasswordChange` · `onPasswordGenerated` |
>
> **Hinweis zum Generator:** Wenn der „Generieren"-Button geklickt wird, feuern **beide** Callbacks — zuerst `onPasswordChange` (mit dem generierten Passwort und dessen Stärke-Ergebnis), dann `onPasswordGenerated` (nur mit dem Passwort). `onPasswordChange` für die State-Aktualisierung im kontrollierten Modus verwenden; `onPasswordGenerated` wenn ein dedizierter Hook für Generator-Ereignisse benötigt wird (z. B. Logging oder Toast).

| Callback | Signatur | Wann ausgelöst | Verwenden wenn... |
|---|---|---|---|
| `onPasswordChange` | `(password: string, result: StrengthResult) => void` | Jeder Tastendruck im Passwort-Feld sowie wenn der Generator ein Passwort erzeugt | State-Sync im kontrollierten Modus, stärkebasierte Formularvalidierung |
| `onConfirmChange` | `(confirmValue: string, matches: boolean) => void` | Jeder Tastendruck im Bestätigungs-Feld (`showConfirmField={true}`) | Kontrollierter Modus für das Bestätigungs-Feld, Aktivieren/Deaktivieren des Submit-Buttons |
| `onPasswordGenerated` | `(password: string) => void` | Generator-Button geklickt — feuert **nach** `onPasswordChange` | Speziell auf generierte Passwörter reagieren (Logging, Clipboard-Kopie, Toast) |

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
| `psm-copy` | `<button>` (IconButton) | Kopier-Button. Nur vorhanden bei `showCopyButton={true}` und nicht-leerem Passwort. |

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

### Segmentierter Stärke-Balken

```tsx
{/* 4 separate animierte Segmente statt eines einzelnen wachsenden Balkens */}
<PasswordStrengthMeter
  showSegmentedBar
  passwordMinLength={8}
/>
```

### Benutzerdefinierte Anforderungen

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

Jede `CustomRequirement` hat:
- `label: string` — Anforderungstext, der in der Checkliste angezeigt wird
- `fulfilled: boolean | ((password: string) => boolean)` — Statischer Boolean oder eine Funktion, die auf dem aktuellen Passwort ausgewertet wird

---

## `CustomRequirement`-Typ

```ts
type CustomRequirement = {
  label:     string;
  fulfilled: boolean | ((password: string) => boolean);
};
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
