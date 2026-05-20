# TagSelection – Next Steps

Erkenntnisse und offene Punkte aus der aktuellen Session.
Ziel: morgen hier weiterlesen und eine finale, stabile Variante implementieren.

---

## Was bisher implementiert wurde

- `startIcon` / `deleteIcon` Props komplett entfernt — die Chip-Farbe ist die visuelle Identität
- `onTagCreate` Signatur: `(label: string, color: TagColor) => void`
- Create-Mode aktiviert sich nur, wenn `allowCreate={true}`, ein Suchbegriff eingegeben wurde und **keine einzige Option** (auch keine Teilübereinstimmung) mehr in der Liste ist
- Im Create-Mode erscheinen unterhalb des Inputs Farb-Chips zur Auswahl der Tag-Farbe
- Alle 262 Tests laufen grün

---

## Kritische MUI v9 Erkenntnisse

### 1. `Autocomplete.renderInput` gibt `slotProps` zurück, nicht `InputProps`

In MUI v9 übergibt der `Autocomplete` an den `renderInput`-Callback ein Objekt mit `slotProps`,
**nicht mehr** das veraltete `InputProps`. Das bedeutet:

- `params.InputProps` ist `undefined` (kein TypeScript-Fehler, weil `InputProps` noch im Typ
  als deprecated steht, aber der Wert ist zur Laufzeit nicht gesetzt)
- `params.InputProps?.endAdornment` gibt `undefined` zurück → kein Fehler, aber auch kein Icon
- Richtig: `params.slotProps?.input?.endAdornment`

### 2. `hasClearIcon` in MUI v9 ignoriert den `inputValue`

Die interne `hasClearIcon`-Logik in MUI v9 Autocomplete:
```js
const dirty = freeSolo && inputValue.length > 0 || value !== null;
const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;
```

Mit `value={null}` und ohne `freeSolo` ist `dirty` immer `false` → `hasClearIcon` immer `false`.
**Konsequenz:** Die `clearIcon`/`clearIndicator`-Slot-Strategie funktioniert in unserem Setup
nicht, egal was man in `clearIcon` übergibt.

### 3. `slotProps` auf TextField darf `params.slotProps` nicht überschreiben

Wenn man in `renderInput` sowohl `{...params}` als auch ein eigenes `slotProps`-Objekt übergibt,
gewinnt das spätere — und das überschreibt das gesamte `params.slotProps`. Darin steckt aber:
- `ref: setAnchorEl` — ohne den findet MUI das Input-Element nicht → TypeError: null.focus()
- `onMouseDown` — ohne den funktioniert das Öffnen des Popups nicht
- `slotProps.htmlInput` — aria-Attribute, Value-Binding, alles bricht

**Richtige Merge-Strategie:**
```tsx
slotProps={{
  ...params.slotProps,           // inputLabel etc. erhalten
  input: {
    ...params.slotProps?.input,  // ref, onMouseDown, className erhalten
    endAdornment: (
      <>
        {/* eigene Icons */}
        {params.slotProps?.input?.endAdornment}  // originales Dropdown-Pfeil erhalten
      </>
    ),
  },
}}
```

---

## Aktueller Stand der Create-Mode-Implementierung

Wenn `isCreateMode === true`, werden **vor** dem Dropdown-Pfeil zwei `IconButton` injiziert:
- `CheckIcon` (grün via `sx={{ color: "success.main" }}`) → `handleConfirmCreate`
- `CloseIcon` → `handleCancelCreate`

Das `onMouseDown: e.preventDefault()` verhindert, dass das Input den Fokus verliert
bevor der `onClick` feuert.

**Storybook-Fix (erledigt):** `allowCreate` war in `meta.args` auf `false` gesetzt → wurde
auf `true` geändert. Damit sieht man im Default-Story die Create-Mode-UI sofort, wenn man
einen Begriff eingibt, der keinen bestehenden Tag trifft.

---

## Offene UX/UI-Punkte für die nächste Session

### 1. Visuelle Qualität der Create-Mode-Icons

Die aktuellen `IconButton`-Elemente sehen wahrscheinlich "nackt" aus — zu wenig Kontrast,
kein visueller Hinweis dass das Bestätigen/Abbrechen-Buttons sind. Mögliche Verbesserungen:

**Option A – Farbige Icon-Buttons mit Tooltip**
```tsx
<Tooltip title="Tag erstellen">
  <IconButton size="small" sx={{ color: "success.main" }} ...>
    <CheckIcon fontSize="small" />
  </IconButton>
</Tooltip>
<Tooltip title="Abbrechen">
  <IconButton size="small" sx={{ color: "text.secondary" }} ...>
    <CloseIcon fontSize="small" />
  </IconButton>
</Tooltip>
```

**Option B – InputAdornment-Wrapper für korrekte MUI-Abstände**
```tsx
<InputAdornment position="end">
  <IconButton size="small" sx={{ color: "success.main" }} ...>
    <CheckIcon fontSize="small" />
  </IconButton>
  <IconButton size="small" ...>
    <CloseIcon fontSize="small" />
  </IconButton>
</InputAdornment>
```

**Option C – Dropdown-Pfeil im Create-Mode ausblenden**
Damit klar ist, dass sich das Input jetzt im "Erstell-Modus" befindet:
```tsx
// Den Autocomplete-Popup-Pfeil verstecken wenn isCreateMode
open={isCreateMode ? false : undefined}
popupIcon={isCreateMode ? null : undefined}
```
Oder via `forcePopupIcon={!isCreateMode}`.

### 2. Farb-Auswahl unterhalb des Inputs

Aktuell werden die Farb-Chips unter dem Autocomplete-Input gerendert.
Offen: Sollen wirklich nur die MUI-Theme-Farben (`TagColor`) wählbar sein,
oder soll es auch eine Freitext-/Colorpicker-Eingabe für `foregroundColor` / `backgroundColor` geben?

Wenn nur Theme-Farben: aktueller Stand ist fertig.
Wenn Custom-Colors: braucht es einen zweiten Schritt mit zwei Colorpickern
(z.B. `react-colorful` oder ein MUI-Dialog).

### 3. `noOptionsText` im Create-Mode

Aktuell zeigt der Autocomplete-Popup "No tags available." wenn keine Optionen passen.
Im Create-Mode ist das verwirrend — der User sieht den Popup und die Icons gleichzeitig.
Besser wäre, den Popup im Create-Mode gar nicht zu öffnen:

```tsx
open={isCreateMode ? false : undefined}
```

Alternativ: `noOptionsText` kontextuell anpassen:
```tsx
noOptionsText={isCreateMode ? translation.createTagHintText : translation.noAvailableTagsText}
```

### 4. Nach `onTagCreate`: Input zurücksetzen

Aktuell wird nach `handleConfirmCreate` nur `selectedColor` zurückgesetzt.
Die `searchValue`-Leerstelle (also das Zurücksetzen des Input-Feldes nach der Erstellung)
passiert durch den aufrufenden Code. Das sollte konsistent dokumentiert werden —
am besten auch intern aufrufen: `onSearchChange("")` nach `onTagCreate?.()`.

---

## Neues aus der zweiten Session (gleicher Tag)

### Storybook: `allowCreate` default war `false` → auf `true` gesetzt
Solange `allowCreate={false}`, erscheinen weder CheckIcon noch CloseIcon, egal was man tippt.
Das war die Ursache der Verwirrung. Fix: `meta.args.allowCreate: true`.

### Nach CheckIcon-Klick: Tag erscheint nicht in der Selected-Tags-Box
Beobachtet im Default-Story. Ursache: **zwei separate Probleme**, die morgen beide gefixt werden müssen.

**Problem 1 – Input wird nach Confirm nicht geleert:**
`handleConfirmCreate` ruft `onTagCreate?.(...)` auf, setzt aber `searchValue` nicht zurück.
Damit bleibt der eingetippte Begriff im Input stehen und `isCreateMode` bleibt aktiv.
Fix: `onSearchChange("")` am Ende von `handleConfirmCreate` aufrufen.

**Problem 2 – Der neu erstellte Tag wird nicht automatisch selektiert:**
`onTagCreate` übergibt Label + Farbe an den Aufrufer. Der Aufrufer ist verantwortlich,
den neuen Tag zur `tags`-Liste hinzuzufügen UND ihn als `selected: true` zu markieren.
Im Default-Story ist `onTagCreate` nur ein `fn()`-Stub → passiert nichts.
Im Creatable-Story wird der Tag zur Liste hinzugefügt, aber **nicht** als `selected: true` —
also taucht er in den Available-Tags auf, aber nicht in der Selected-Tags-Box.

Fix-Optionen für Creatable-Story:
```tsx
onTagCreate={(label, color) => {
  setLocalTags((prev) => [
    ...prev,
    { id: label.toLowerCase().replace(/\s+/g, "-"), label, color, selected: true }, // ← selected!
  ]);
}}
```

Ob die interne Komponente nach Confirm automatisch `onTagSelect` aufrufen soll (damit der Tag
direkt als selektiert gilt), muss morgen entschieden werden. Die sauberere Variante wäre:
`handleConfirmCreate` ruft nach `onTagCreate` auch intern `onTagSelect` mit dem neuen Tag auf —
aber das würde bedeuten, dass `TagSelectionAutocomplete` mehr Verantwortung übernimmt als bisher.

---

## Erledigte Punkte (Session 3)

- ✅ `addTag`-Action im Store: fügt Tag als `selected: true` hinzu + leert `searchValue` atomar
- ✅ `handleTagCreate` in TagSelection.tsx: Auto-Select + `onTagSelect`/`onTagsChange` werden gefeuert
- ✅ Popup im Create-Mode geschlossen (`open={isCreateMode ? false : undefined}`)
- ✅ Creatable-Story: `selected: true` beim neu erstellten Tag
- ✅ Neuer Test: "Should auto-select the newly created tag and clear the input"
- ✅ 263 Tests grün

---

## Offenes Thema: Farb-Auswahl für neue Tags (nächste Session)

### Problem
Aktuell kann man beim Erstellen nur eine MUI-Theme-Farbe (`TagColor`) wählen.
Der User möchte aber auch `backgroundColor` + passende `foregroundColor` setzen können,
damit der Tag gut erkennbar ist.

### Empfohlener Ansatz: Theme-Farben + optionale Custom-Color mit Auto-Kontrast

**Stufe 1 — Theme-Farben (bereits implementiert)**
Die 7 MUI-Chip-Farben (default, primary, secondary, error, info, success, warning) sind immer
erreichbar und haben bereits getesteten Kontrast. Für schnelle Auswahl ideal.

**Stufe 2 — Custom Background mit Auto-Kontrast-Foreground**
Zusätzlich ein `<input type="color">` (oder ein `TextField` mit Hex-Eingabe) für eine
Hintergrundfarbe. Die Textfarbe wird automatisch berechnet:

```ts
// W3C relative luminance → entweder Weiß oder Schwarz als Textfarbe
function getContrastColor(hex: string): "#ffffff" | "#000000" {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}
```

**Live-Vorschau-Chip** zeigt sofort wie der Tag aussehen wird:
```tsx
<Chip
  label={searchValue}
  sx={{ backgroundColor: customColor, color: getContrastColor(customColor) }}
/>
```

**UX-Flow:**
1. User tippt neuen Tag-Namen → Create-Mode aktiviert
2. Farb-Bereich erscheint unterhalb:
   - Zeile 1: Theme-Farb-Chips (schnelle Wahl)
   - Zeile 2: `<input type="color">` + Live-Vorschau-Chip (custom Wahl)
3. Entweder Theme-Farbe ODER Custom-Color ist aktiv (mutual exclusive)
4. CheckIcon bestätigt → `onTagCreate(label, color, backgroundColor?, foregroundColor?)`

**Auswirkung auf `onTagCreate`-Signatur:**
Aktuell: `(label: string, color: TagColor) => void`
Neu: entweder bleibt die Signatur und wir nutzen `color: "custom"` als Marker,
oder wir erweitern auf `(label: string, colorConfig: TagColorConfig) => void`:
```ts
type TagColorConfig =
  | { type: "theme"; color: TagColor }
  | { type: "custom"; backgroundColor: string; foregroundColor: string };
```

**Entscheidung vor Implementierung:** Signatur-Änderung oder nicht?
→ Empfehlung: neue optionale Props statt Breaking Change:
`onTagCreate?: (label: string, color: TagColor, backgroundColor?: string, foregroundColor?: string) => void`
