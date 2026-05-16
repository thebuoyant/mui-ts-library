# PasswordStrengthMeter — Kickoff-Prompt für die nächste Session

## Kontext: Was dieses Projekt ist

Wir arbeiten an **`mui-ts-library`** — einer eigenen React-Komponentenbibliothek, die MUI (Material UI v7) ergänzt. Das Projekt liegt unter:

```
/Users/thomasschlender/Development-React-Components/mui-ts-library
```

### Etablierte Patterns — diese müssen beim PSM exakt eingehalten werden

| Pattern | Detail |
|---|---|
| **Sprache** | Code/Variablen/Methoden auf Englisch. Kommentare auf Deutsch, aber NUR wenn das WHY nicht-offensichtlich ist. |
| **Styling** | MUI `sx`-Prop, MUI-Theme-Farben wo möglich |
| **Typen** | Alle öffentlichen Typen in `PasswordStrengthMeter.types.ts` |
| **Defaults** | Exportierte `DEFAULT_*`-Konstanten statt inline-Objekte in der Funktionssignatur |
| **Tests** | Vitest + @testing-library/react — Tests starten immer mit `it("Should ...)`, beschreiben Verhalten, nie Implementierung |
| **Stories** | Storybook mit `@storybook/react-vite`, meta `args` + `argTypes` für Controls-Panel |
| **Exports** | Alles aus `src/index.ts` re-exportieren — kein Import aus internen Pfaden nötig |
| **Kommentare** | Ausschließlich auf Deutsch |

### Tech-Stack

```
React 19, TypeScript 5.9, MUI v7, Vite 8, Vitest 4, Storybook 10
```

---

## Aktueller Stand: Phasen 1–4 abgeschlossen ✅ (232 Tests grün, README aktuell)

### Alle vorhandenen Dateien

| Datei | Inhalt |
|---|---|
| `PasswordStrengthMeter.types.ts` | `StrengthScore`, `MeterStatus`, `StrengthResult`, `CheckColors`, `MeterColors`, `PasswordStrengthMeterTranslation`, `PasswordStrengthMeterProps` + alle `DEFAULT_*`-Konstanten |
| `PasswordStrengthMeter.tsx` | Haupt-Komponente: Input + Adornment + Meter-Balken + Requirement-Summary |
| `PasswordStrengthMeter.test.tsx` | 17 Komponenten-Tests |
| `PasswordStrengthMeter.stories.tsx` | 10 Stories mit argTypes und meta args |
| `util/password-strength.util.ts` | `scorePassword()` — Scoring-Algorithmus mit Bonus/Malus-Regeln |
| `util/password-strength.util.test.ts` | 10 Util-Tests |

---

## Vollständige Props-API

```tsx
<PasswordStrengthMeter
  // Kern
  value="..."                    // kontrollierter Modus (optional)
  showPasswordAdornment={true}   // Show/Hide-Button am Input
  showMeter={true}               // Stärke-Balken anzeigen
  showSummary={true}             // Anforderungs-Checkliste anzeigen
  inputSize="medium"             // "small" | "medium"
  passwordMinLength={8}
  translation={{ label: "Passwort", summaryMinChars: "Mindestens {n} Zeichen", ... }}  // Partial<>
  meterColors={{ weak: "#cc0000", ... }}     // Partial<>
  checkColors={{ failure: "#cc0000", success: "#43a047" }}
  onPasswordChange={(password, result) => ...}

  // Form-Integration (React Hook Form, Formik, native Forms)
  name="password"                // natives name-Attribut
  inputRef={ref}                 // Ref auf das native <input>-Element
  disabled={false}
  error={false}
  helperText="Passwort ist zu schwach."
  autoComplete="new-password"
/>
```

### PasswordStrengthMeterTranslation (alle Keys)

```ts
type PasswordStrengthMeterTranslation = {
  label: string;                  // Default: "Password"
  summaryHeaderLabel: string;     // Default: "Requirements for your password"
  summaryMinChars: string;        // Default: "At least {n} characters"  — {n} wird ersetzt
  summaryCapitalLetter: string;   // Default: "At least 1 capital letter"
  summaryLowerCaseLetter: string; // Default: "At least 1 lowercase letter"
  summaryNumber: string;          // Default: "At least 1 number"
  summarySpecialChar: string;     // Default: "At least 1 special character"
  showPasswordLabel: string;      // Default: "Show password"  (aria-label)
  hidePasswordLabel: string;      // Default: "Hide password"  (aria-label)
  meterAriaLabel: string;         // Default: "Password strength"  (aria-label)
};
```

### data-testids

| Testid | Element |
|---|---|
| `psm-input` | Natives `<input>`-Element |
| `psm-toggle` | IconButton (Passwort anzeigen/verbergen) |
| `psm-meter` | Innerer Balken-Div (hat `width` + `backgroundColor`) |
| `psm-summary` | Äußeres Box-Element der Anforderungsliste |
| `psm-req-success` | CheckCircle-Icon (Anforderung erfüllt) |
| `psm-req-failure` | ErrorOutline-Icon (Anforderung nicht erfüllt) |

### Scoring-Algorithmus (scorePassword)

- Unter Mindestlänge → immer `weak` (score 0 wenn leer, 1 sonst)
- Mindestlänge erfüllt → +1 Punkt
- Mindestlänge + 4 Zeichen → +1 Bonus
- ≥ 2 Zeichenklassen → +1
- ≥ 3 Zeichenklassen → +1
- Nur wiederholte Zeichen (`/^(.)\1+$/`) → −2
- Bekannte Muster (`1234`, `abcd`, `password`, …) → −2
- Score wird auf 0–4 geklemmt

### Storybook — 10 Stories

| Story | Besonderheit |
|---|---|
| `Default` | Alle meta-Args, Controls-Panel aktiv |
| `SmallInput` | `inputSize: "small"` |
| `NoMeter` | `showMeter: false` |
| `NoSummary` | `showSummary: false` |
| `NoAdornment` | `showPasswordAdornment: false` |
| `GermanTranslation` | Vollständige deutsche Übersetzung inkl. Aria-Labels |
| `CustomColors` | Pink/Orange/Blau/Lila Farbschema |
| `Disabled` | `disabled: true` |
| `WithError` | `error: true` + `helperText` |
| `Controlled` | Passwort von externem TextField gesteuert |

---

## So starten wir die nächste Session

```
Bitte lies zuerst die claude-psm-kickoff.md im Root des Projekts.
Dann besprechen wir die nächste geplante Phase.
232 Tests (gesamt im Projekt) müssen nach den Änderungen grün bleiben.
Alle Code-Kommentare auf Deutsch. Tests starten immer mit it("Should ...").
```

---

## Ideen für weitere Phasen

### Idee A — Passwort-Generator-Button

- Optionaler Button neben dem Toggle (Prop `showGenerator?: boolean`)
- Generiert ein zufälliges, starkes Passwort direkt im Input
- Callback `onPasswordGenerated?: (password: string) => void`

### Idee B — Stärke-Label neben dem Balken

- Textuelle Bezeichnung der aktuellen Stärke (`"Schwach"`, `"OK"`, `"Gut"`, `"Sehr gut"`)
- Prop `showStrengthLabel?: boolean`
- Über Translation konfigurierbar: `strengthWeak`, `strengthOk`, `strengthGood`, `strengthVeryGood`

### Idee C — Bestätigungsfeld (Confirm Password)

- Zweites Passwort-Feld mit Match-Validierung
- Prop `showConfirm?: boolean`
- Eigene Translation-Keys für Label + Fehlermeldung
- `onConfirmChange?: (matches: boolean) => void`
