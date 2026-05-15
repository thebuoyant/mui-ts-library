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
| **Tests** | Vitest + @testing-library/react — Tests beschreiben Verhalten, nie Implementierung |
| **Stories** | Storybook mit `@storybook/react-vite`, meta `args` + `argTypes` für Controls-Panel |
| **Exports** | Alles aus `src/index.ts` re-exportieren — kein Import aus internen Pfaden nötig |

### Tech-Stack

```
React 19, TypeScript 5.9, MUI v7, Vite 8, Vitest 4, Storybook 10
```

---

## Ist-Zustand (Analyse)

Die Komponente funktioniert grundsätzlich gut — Scoring-Algorithmus, Controlled Mode und Accessibility-Basics sind solide. Für eine professionelle Library fehlen aber noch folgende Dinge:

| Bereich | Problem |
|---|---|
| **Types** | `StrengthResult`, `StrengthScore`, `MeterStatus` leben in der util-Datei, nicht in `*.types.ts` |
| **Exports** | Types werden aus `PasswordStrengthMeter.tsx` re-exportiert statt aus `index.ts` |
| **Defaults** | Keine `DEFAULT_*`-Konstanten — Defaults sind inline in der Funktionssignatur vergraben |
| **Partial props** | `translation` und `meterColors` verlangen das volle Objekt — kein `Partial<>` |
| **Translations unvollständig** | `"Show password"` / `"Hide password"` / `"Password strength"` sind hardcoded auf Englisch |
| **Storybook** | Keine `argTypes` / meta `args` → kein Controls-Panel; nur 2 Stories |
| **Fragile Tests** | `querySelector(".meter-result")` und MUI-interne `data-testid`s statt eigener testids |
| **Form-Integration** | Kein `name`, `disabled`, `error`, `helperText`, `inputRef` → nicht React-Hook-Form-kompatibel |

---

## Alle vorhandenen Dateien

| Datei | Inhalt |
|---|---|
| `PasswordStrengthMeter.types.ts` | `CheckColors`, `MeterColors`, `PasswordStrengthMeterTranslation`, `PasswordStrengthMeterProps` |
| `PasswordStrengthMeter.tsx` | Haupt-Komponente: Input + Adornment + Meter-Balken + Requirement-Summary |
| `PasswordStrengthMeter.test.tsx` | 12 Komponenten-Tests |
| `PasswordStrengthMeter.stories.tsx` | 2 Stories (Default, Controlled) — noch ohne argTypes/Controls |
| `util/password-strength.util.ts` | `scorePassword()` — Scoring-Algorithmus mit Bonus/Malus-Regeln |
| `util/password-strength.util.test.ts` | 9 Util-Tests |

---

## Aktueller Stand der Props-API

```tsx
<PasswordStrengthMeter
  value="..."                    // kontrollierter Modus (optional)
  showPasswordAdornment={true}   // Show/Hide-Button am Input
  showMeter={true}               // Stärke-Balken anzeigen
  showSummary={true}             // Anforderungs-Checkliste anzeigen
  inputSize="medium"             // "small" | "medium"
  passwordMinLength={8}
  translation={{ label: "Password", ... }}   // Partial noch nicht unterstützt
  meterColors={{ weak: "#cc0000", ... }}     // Partial noch nicht unterstützt
  checkColors={{ failure: "#cc0000", success: "#43a047" }}
  onPasswordChange={(password, result) => ...}
/>
```

### StrengthResult (aus util — noch nicht in types.ts)

```ts
type StrengthResult = {
  score: 0 | 1 | 2 | 3 | 4;
  percent: number;        // score * 25
  meterStatus: "weak" | "ok" | "good" | "very good";
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasDigit: boolean;
  hasSymbol: boolean;
};
```

### Scoring-Algorithmus (scorePassword)

- Unter Mindestlänge → immer `weak` (score 0 wenn leer, 1 sonst)
- Mindestlänge erfüllt → +1 Punkt
- Mindestlänge + 4 Zeichen → +1 Bonus
- ≥ 2 Zeichenklassen → +1
- ≥ 3 Zeichenklassen → +1
- Nur wiederholte Zeichen (`/^(.)\1+$/`) → −2
- Bekannte Muster (`1234`, `abcd`, `password`, …) → −2
- Score wird auf 0–4 geklemmt

---

## So starten wir die nächste Session

```
Bitte lies zuerst die claude-psm-kickoff.md im Root des Projekts.
Dann besprechen wir die nächste geplante Phase.
227 Tests (gesamt im Projekt) müssen nach den Änderungen grün bleiben.
```

---

## Geplante Phasen

### PSM Phase 1 — Typen & Exports aufräumen

**Ziel:** Lib-Consumer können alle Types aus einem einzigen Import-Pfad beziehen; keine Überraschungen bei `Partial<>`.

- `StrengthResult`, `StrengthScore`, `MeterStatus` von `util/password-strength.util.ts` nach `PasswordStrengthMeter.types.ts` verschieben (util importiert dann aus types)
- `DEFAULT_PASSWORD_TRANSLATIONS`, `DEFAULT_METER_COLORS`, `DEFAULT_CHECK_COLORS` als exportierte Konstanten
- `translation?: Partial<PasswordStrengthMeterTranslation>` — Merge gegen Defaults (statt Komplett-Objekt-Pflicht)
- `meterColors?: Partial<MeterColors>` analog
- Re-exports aus `PasswordStrengthMeter.tsx` entfernen — alles läuft über `src/index.ts`
- Alle bestehenden Tests müssen grün bleiben

### PSM Phase 2 — Storybook professionalisieren

**Ziel:** Controls-Panel und volle Story-Coverage wie beim GanttChart.

- `meta` mit `args` + `argTypes` (alle bool-Props als `control: "boolean"`, komplexe Objekte `control: false`)
- `fn()` für `onPasswordChange`
- Neue Stories: `NoMeter`, `NoSummary`, `NoAdornment`, `GermanTranslation`, `CustomColors`, `SmallInput`
- Bestehende `Controlled`-Story bleibt, bekommt aber korrektes render-Pattern

### PSM Phase 3 — Translations vervollständigen + stabile Testids

**Ziel:** Vollständige i18n + keine fragilen CSS-Klassen/MUI-internen IDs in Tests.

- Neue Translation-Keys:
  - `showPasswordLabel: string` → `"Show password"` (aria-label)
  - `hidePasswordLabel: string` → `"Hide password"` (aria-label)
  - `meterAriaLabel: string` → `"Password strength"` (aria-label)
  - `summaryMinChars: string` → Template-String mit `{n}` Platzhalter z. B. `"At least {n} characters"` — ersetzt die unhandliche `summaryMinCharsLeft` / `summaryMinCharsRight`-Aufteilung
- Neue `data-testid`s: `psm-input`, `psm-meter`, `psm-toggle`, `psm-summary`
- Tests auf `getByTestId` umstellen (weg von `querySelector(".meter-result")` und MUI-internen testids)

### PSM Phase 4 — Form-Integration

**Ziel:** Drop-in-Ersatz für Standard-MUI-Passwortfelder in React-Hook-Form, Formik, native Forms.

- `name?: string` — für `<form>` submission und `register()`
- `inputRef?: React.Ref<HTMLInputElement>` — für `ref`-Callbacks
- `disabled?: boolean` — deaktiviert Input + Adornment
- `error?: boolean` + `helperText?: string` — Fehleranzeige wie bei MUI `TextField`
- `autoComplete?: string` — `"new-password"` / `"current-password"` für Browser-Hints
- Tests für alle neuen Props
