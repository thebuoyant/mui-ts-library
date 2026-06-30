# ColorPicker — Benutzerhandbuch

> [English Version →](ColorPicker.md)

**Ein vollständiges Sättigung/Farbton/Alpha-Farbwähler-Panel — schließt eine echte MUI-Lücke, denn MUI bringt überhaupt keinen Farbwähler mit.** Nutze `ColorPicker` für Theme-Customizer, Markenfarben-Auswahl, Design-System-Playgrounds oder überall dort, wo Nutzer eine beliebige Farbe wählen sollen, statt aus einer festen Palette auszuwählen.

## Überblick

`ColorPicker` rendert ein eigenständiges Auswahl-**Panel** (eine 2D-Sättigung/Helligkeit-Fläche, einen Farbton-Slider, einen optionalen Alpha-Slider, ein Pipette-Werkzeug, ein formatumschaltbares Wertefeld und ein optionales Raster gespeicherter Farben) — es enthält keinen eigenen Auslöser-Button oder Popover. Das Einbetten in ein `Popover`/`Menu` für ein "Swatch + Dropdown"-Muster liegt beim Consumer, analog dazu, wie MUIs eigene Desktop-/Static-Date-Picker das "Feld" von der "Kalenderansicht" trennen.

Es ist eine vollständig kontrollierte Komponente: du besitzt `value` (einen Farb-String) und aktualisierst ihn über `onChange`.

**Typische Anwendungsfälle:**

- Theme-/Markenfarben-Anpassungsbildschirme
- Design-System- oder Komponenten-Playground-Tools
- Jedes Formular, das eine freie (nicht nur voreingestellte) Farbeingabe benötigt

---

## Voraussetzungen

| Abhängigkeit | Mindestversion |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |

---

## Import

```tsx
import { ColorPicker } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  ColorPickerProps,
  ColorPickerTranslation,
  ColorPickerColorInfo,
  ColorPickerFormat,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Quick Start

```tsx
import { useState } from 'react';
import { ColorPicker } from '@thebuoyant-tsdev/mui-ts-library';

function App() {
  const [color, setColor] = useState('#1976d2');

  return (
    <ColorPicker
      value={color}
      onChange={(hex) => setColor(hex)}
    />
  );
}
```

---

## Props-Referenz

| Prop | Typ | Default | Beschreibung |
|---|---|---|---|
| `value` | `string` | — | **Pflichtfeld.** Aktuelle Farbe. Akzeptiert Hex (`#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`), `rgb()`/`rgba()` oder `hsl()`/`hsla()`. |
| `onChange` | `(hex: string, info: ColorPickerColorInfo) => void` | — | **Pflichtfeld.** Feuert bei jeder Änderung — live während des Ziehens, nicht erst beim Loslassen. Siehe [Callbacks / Events](#callbacks--events). |
| `onChangeCommitted` | `(hex: string, info: ColorPickerColorInfo) => void` | — | Feuert einmal pro "Geste" statt fortlaufend. Siehe [Callbacks / Events](#callbacks--events). |
| `defaultFormat` | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` | Initiales Anzeigeformat für das Wertefeld. Nach dem Mount unkontrolliert — das Format-Dropdown verwaltet seinen eigenen State danach selbst. |
| `onFormatChange` | `(format: ColorPickerFormat) => void` | — | Feuert, wenn der Nutzer das Anzeigeformat über das Dropdown wechselt. |
| `showAlpha` | `boolean` | `true` | Zeigt den Alpha-Slider und das Deckkraft-(%)-Feld an. Auf `false` setzen für reine Vollfarben-Anwendungsfälle. |
| `showEyeDropper` | `boolean` | `true` | Zeigt das Pipette-Werkzeug an. Wird unabhängig von dieser Prop automatisch ausgeblendet, wenn der Browser die [EyeDropper-API](https://developer.mozilla.org/de/docs/Web/API/EyeDropper) nicht unterstützt (Stand jetzt nur Chromium-basierte Browser — nicht Safari/Firefox). |
| `showSliderSection` | `boolean` | `true` | Zeigt den Pipette-Button und die Farbton-/Alpha-Slider-Zeile an. Auf `false` setzen für einen minimalen, nur-Gradient-Picker. |
| `showInputSection` | `boolean` | `true` | Zeigt das Format-Dropdown und die Hex-/RGB-/HSL-/Alpha-Wertefelder-Zeile an. Auf `false` setzen für einen reinen Slider-Picker. |
| `savedColors` | `string[]` | — | Unterhalb des Pickers gerenderte Swatches — Klick zum Auswählen. Reine Anzeige-/Auswahlliste; die Persistenz (z.B. in `localStorage` oder einem Backend) liegt beim Consumer. |
| `disabled` | `boolean` | `false` | Deaktiviert alle Interaktionen (Ziehen, Tippen, Swatch-Klicks, Pipette) und reduziert die Deckkraft. |
| `colorGradientSize` | `'small' \| 'medium'` | `'medium'` | Skaliert Gradient-Flächenhöhe, Slider-Dicke und Swatch-Größe. |
| `inputSize` | `'small' \| 'medium'` | `'medium'` | Größe des Format-Dropdowns und der Werte-/Alpha-Felder, unabhängig von `colorGradientSize` — entspricht der `inputSize`-Konvention von `TagSelection`/`PasswordStrengthMeter`. |
| `width` | `number` | `280` | Gesamtbreite des Panels in px. |
| `name` | `string` | — | Formular-Integration: rendert ein verstecktes `<input>` mit dem aktuellen Hex-Wert, sodass der Picker ohne zusätzliche Verdrahtung an nativen Formularen/React Hook Form/Formik teilnimmt. |
| `translation` | `Partial<ColorPickerTranslation>` | Englische Defaults | Überschreibt barrierefreie Beschriftungen (Feld-/Slider-`aria-label`s und die Überschrift der gespeicherten Farben). Nur die gewünschten Keys angeben — siehe [Übersetzungen](#übersetzungen). |

---

## Callbacks / Events

`onChange` feuert live, fortlaufend, bei jeder Änderung:

- Fortlaufend während des Ziehens an der Gradient-Fläche, dem Farbton-Slider oder dem Alpha-Slider (bei jedem Pointer-Move-Frame, nicht erst beim Loslassen)
- Bei jedem gültigen Tastendruck in den Hex-/RGB-/HSL-/Alpha-Feldern (ungültige Zwischenzustände, wie ein halb getippter Hex-Code, werden lokal gehalten, ohne `onChange` auszulösen)
- Beim Klick auf einen gespeicherten Farb-Swatch
- Wenn die Pipette erfolgreich eine Farbe aufgenommen hat

Sowohl `onChange` als auch `onChangeCommitted` übergeben immer einen normalisierten Hex-String als ersten Parameter, plus ein sauberes `ColorPickerColorInfo`-Objekt als zweiten:

```ts
type ColorPickerColorInfo = {
  hex: string;                                          // "#rrggbb" oder "#rrggbbaa" (Alpha < 1)
  rgb: { r: number; g: number; b: number; a: number };  // r/g/b 0–255, a 0–1
  hsl: { h: number; s: number; l: number; a: number };  // h 0–360, s/l 0–100, a 0–1
};
```

Hex-/RGB-/HSL-Werte bleiben immer synchron, unabhängig davon, welches Format gerade im Wertefeld *angezeigt* wird — `defaultFormat` steuert nur, was der Nutzer sieht und eingibt, nicht, was `onChange`/`onChangeCommitted` melden.

### `onChange` vs. `onChangeCommitted`

`onChange` ist bewusst **nicht** debounced — es bleibt live, damit Gradient-Thumb, Swatch-Vorschau usw. dem Pointer in Echtzeit folgen. Wenn nur Updates benötigt werden, sobald der Nutzer mit einer Interaktion "fertig" ist (z.B. um ein Backend nicht bei jedem Drag-Frame zu belasten), `onChangeCommitted` nutzen statt `onChange` selbst zu debouncen. Das spiegelt MUIs eigene `Slider`-Komponente, die genau dieselbe `onChange`/`onChangeCommitted`-Aufteilung hat.

`onChangeCommitted` feuert:

- Einmal bei Pointer-Up, nach einem Drag an der Gradient-Fläche, dem Farbton-Slider oder dem Alpha-Slider
- Einmal bei Blur, nach Tippen in den Hex-/RGB-/HSL-/Alpha-Feldern
- Sofort (gleicher Tick wie `onChange`) bei atomaren Einzelschritt-Aktionen — Klick auf einen gespeicherten Farb-Swatch oder erfolgreiche Pipetten-Aufnahme, da es dort keine separate Drag-/Tipp-Phase gibt, auf die gewartet werden müsste

```tsx
<ColorPicker
  value={color}
  onChange={(hex) => setColor(hex)}              // Live-Vorschau
  onChangeCommitted={(hex) => saveToBackend(hex)} // einmal pro Geste
/>
```

---

## Kein Popover enthalten — selbst einbinden

`ColorPicker` ist nur das Panel. Für eine kompakte "Swatch-Button öffnet Picker"-UI in MUIs eigenes `Popover` einbetten:

```tsx
import { useState } from 'react';
import { Box, Popover } from '@mui/material';
import { ColorPicker } from '@thebuoyant-tsdev/mui-ts-library';

function SwatchColorPicker() {
  const [color, setColor] = useState('#1976d2');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ width: 32, height: 32, borderRadius: 1, backgroundColor: color, cursor: 'pointer', border: '1px solid', borderColor: 'divider' }}
      />
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2 }}>
          <ColorPicker value={color} onChange={(hex) => setColor(hex)} />
        </Box>
      </Popover>
    </>
  );
}
```

---

## Gespeicherte Farben

```tsx
<ColorPicker
  value={color}
  onChange={(hex) => setColor(hex)}
  savedColors={['#f44336', '#2196f3', '#4caf50', '#ffeb3b']}
/>
```

Ein Klick auf einen Swatch wählt ihn aus (feuert `onChange` wie jede andere Interaktion). Die Komponente verändert `savedColors` nie selbst — für ein "aktuelle Farbe speichern"-Feature musst du es selbst bauen, indem du den letzten `onChange`-Hex-Wert an deinen eigenen State anhängst.

---

## Formular-Integration

```tsx
<form onSubmit={handleSubmit}>
  <ColorPicker name="brandColor" value={color} onChange={(hex) => setColor(hex)} />
  <button type="submit">Speichern</button>
</form>
```

Mit gesetztem `name` wird ein verstecktes `<input type="hidden" name="brandColor" value={...} />` gerendert, sodass `FormData`, React Hook Forms `register` und Formik es wie jedes andere Formularfeld aufgreifen.

---

## Minimale Layouts

`showSliderSection` und `showInputSection` schalten jeweils eine ganze Zeile unabhängig voneinander für kompakte Anwendungsfälle:

```tsx
{/* Nur Gradient-Fläche + Slider — kein Format-Dropdown oder Zahlenfelder */}
<ColorPicker value={color} onChange={(hex) => setColor(hex)} showInputSection={false} />

{/* Nur Gradient-Fläche + Zahlenfelder — keine Pipette oder Farbton-/Alpha-Slider */}
<ColorPicker value={color} onChange={(hex) => setColor(hex)} showSliderSection={false} />
```

Die Gradient-Fläche selbst wird immer angezeigt — es gibt keine Prop, um sie auszublenden, da sie die primäre Interaktionsfläche des Pickers ist.

---

## Deaktivierter Zustand

```tsx
<ColorPicker value={color} onChange={() => {}} disabled />
```

Alle Interaktionen (Ziehen, Tippen, Swatch-Klicks, Pipette) sind deaktiviert. Das Panel wird mit reduzierter Deckkraft (`0.6`) gerendert.

---

## Übersetzungen

```tsx
type ColorPickerTranslation = {
  formatLabel:           string;
  hexFieldLabel:         string;
  redLabel:              string;
  greenLabel:            string;
  blueLabel:             string;
  hueFieldLabel:         string;
  saturationFieldLabel:  string;
  lightnessFieldLabel:   string;
  alphaFieldLabel:       string;
  eyeDropperLabel:       string;
  savedColorsLabel:      string;
  gradientAreaLabel:     string;
  hueSliderLabel:        string;
};
```

Übersetzbar sind nur `aria-label`s (für die Gradient-Fläche, Farbton-/Alpha-Slider und die RGB-/HSL-/Alpha-Zahlenfelder) sowie die "Gespeicherte Farben"-Überschrift — es gibt sonst keine weitere sichtbare Beschriftung (das Format-Dropdown zeigt feste `HEX`/`RGB`/`HSL`-Werte, konsistent damit, wie Farbwerkzeuge diese üblicherweise benennen).

```tsx
<ColorPicker
  value={color}
  onChange={(hex) => setColor(hex)}
  translation={{
    hexFieldLabel: 'Hex-Wert',
    savedColorsLabel: 'Gespeicherte Farben',
  }}
/>
```

Nur die benötigten Keys überschreiben — alles andere fällt auf die englischen Defaults zurück.

---

## TypeScript-Typen

```ts
type ColorPickerFormat = 'hex' | 'rgb' | 'hsl';

type ColorPickerColorInfo = {
  hex: string;
  rgb: { r: number; g: number; b: number; a: number };
  hsl: { h: number; s: number; l: number; a: number };
};

type ColorPickerProps = {
  value:              string;
  onChange:           (hex: string, info: ColorPickerColorInfo) => void;
  onChangeCommitted?: (hex: string, info: ColorPickerColorInfo) => void;
  defaultFormat?:     ColorPickerFormat;
  onFormatChange?:    (format: ColorPickerFormat) => void;
  showAlpha?:         boolean;
  showEyeDropper?:    boolean;
  showSliderSection?: boolean;
  showInputSection?:  boolean;
  savedColors?:       string[];
  disabled?:          boolean;
  colorGradientSize?: 'small' | 'medium';
  inputSize?:         'small' | 'medium';
  width?:             number;
  name?:              string;
  translation?:       Partial<ColorPickerTranslation>;
};
```

---

## Barrierefreiheit

- Die Gradient-Fläche und beide Slider exponieren `role="slider"` mit `aria-label`/`aria-valuenow`/`aria-valuemin`/`aria-valuemax` (wo zutreffend) und sind per Tastatur fokussierbar (`tabIndex={0}`, `-1` wenn deaktiviert).
- Jedes Zahlenfeld (Hex, R/G/B, H/S/L, Alpha) hat ein explizites `aria-label`.
- Der Pipette-Button hat sowohl ein `Tooltip` als auch ein explizites `aria-label`.
- Swatches gespeicherter Farben exponieren den Farb-String selbst als `aria-label`.

---

## Hinweise und bekannte Einschränkungen

| Thema | Hinweis |
|---|---|
| **Browser-Unterstützung der Pipette** | Die [EyeDropper-API](https://developer.mozilla.org/de/docs/Web/API/EyeDropper) ist Stand jetzt nur Chromium-basiert (Chrome, Edge, Opera) — nicht in Safari oder Firefox unterstützt. Der Button wird bei fehlender Unterstützung automatisch ausgeblendet, unabhängig von `showEyeDropper`. |
| **Kein eingebautes Popover/Auslöser** | `ColorPicker` ist nur das Panel — siehe [Kein Popover enthalten](#kein-popover-enthalten--selbst-einbinden) für das empfohlene Einbindungsmuster. |
| **HSV/HSL-Präzision nahe Schwarz/Weiß** | Wie praktisch alle Sättigung/Helligkeit-Farbwähler wird der Farbton bei reinem Schwarz oder Weiß mathematisch undefiniert — durch diese Ecken zu ziehen und wieder herauszufahren kann den Farbton auf einem anderen Wert belassen, als wo man gestartet ist. Das ist Standard- und erwartetes Verhalten für diesen Picker-Typ, kein Bug. |
