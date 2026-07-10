# ColorPicker — Benutzerhandbuch

> [English Version →](ColorPicker.md)

**Ein Farbwähler-Panel für React und Material UI — schließt eine echte Lücke, denn MUI bringt überhaupt keinen Farbwähler mit.** Nutze ihn überall dort, wo Nutzer eine beliebige Farbe wählen sollen: Theme-Customizer, Markenfarben-Screens, Design-System-Playgrounds oder Formularfelder die über eine feste Palette hinausgehen.

## Überblick

### Was macht diese Komponente?

Der Nutzer sieht ein Panel mit einer farbigen Gradientfläche. Er zieht einen kleinen Kreis (den "Thumb") durch die Fläche und wählt dabei Farbton und Helligkeit. Ein Slider rechts stellt den Farbton ein, ein zweiter Slider die Deckkraft (Alpha). Darunter zeigt ein Textfeld die aktuelle Farbe als Hex-Code, RGB- oder HSL-Wert — der Nutzer kann auch direkt tippen.

Optional dazu: ein Pipette-Werkzeug zum Aufnehmen beliebiger Farben vom Bildschirm, und eine Reihe gespeicherter Farb-Swatches für den schnellen Zugriff.

**Was die Komponente nicht enthält:** einen Auslöser-Button oder ein Popup/Popover. Sie rendert das Picker-Panel direkt — du entscheidest, wo es erscheint (inline auf der Seite, in einem MUI-`Popover`, in einem `Menu` usw.). Das ist der gleiche Ansatz, den MUI bei seinen eigenen Date-Pickern verfolgt, die das Eingabefeld ebenfalls vom Kalender-Panel trennen. Siehe [In ein Popover einbetten](#in-ein-popover-einbetten) für das häufigste Muster.

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
  // color enthält einen Hex-String wie "#1976d2"
  const [color, setColor] = useState('#1976d2');

  return (
    <ColorPicker
      value={color}                     // die aktuelle Farbe — du verwaltest diesen State
      onChange={(hex) => setColor(hex)} // wird bei jeder Änderung aufgerufen; hex ist die neue Farbe als String
    />
  );
}
```

`onChange` wird bei jeder Änderung mit einem Hex-String aufgerufen — auch während der Nutzer noch zieht, nicht erst beim Loslassen. Wenn du nur einen einzigen Update beim Abschluss einer Zieh-Geste möchtest, siehe [`onChangeCommitted`](#onchange-vs-onchangecommitted) weiter unten.

---

## Props-Referenz

| Prop | Typ | Default | Beschreibung |
|---|---|---|---|
| `value` | `string` | — | **Pflichtfeld.** Aktuelle Farbe. Akzeptiert Hex (`#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`), `rgb()`/`rgba()` oder `hsl()`/`hsla()`. |
| `onChange` | `(hex: string, info: ColorPickerColorInfo) => void` | — | **Pflichtfeld.** Feuert bei jeder Änderung — live während des Ziehens, nicht erst beim Loslassen. Siehe [Callbacks / Events](#callbacks--events). |
| `onChangeCommitted` | `(hex: string, info: ColorPickerColorInfo) => void` | — | Feuert einmal pro "Geste" statt fortlaufend. Siehe [Callbacks / Events](#callbacks--events). |
| `defaultFormat` | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` | Initiales Anzeigeformat. Nach dem Mount unkontrolliert — wird ignoriert wenn `format` gesetzt ist. |
| `format` | `'hex' \| 'rgb' \| 'hsl'` | — | Kontrolliertes Anzeigeformat. Wenn gesetzt, bestimmt der Parent das aktive Format. Mit `onFormatChange` kombinieren um es zu aktualisieren. Weglassen für `defaultFormat` (unkontrolliert). *Ab v3.23.0* |
| `onFormatChange` | `(format: ColorPickerFormat) => void` | — | Feuert, wenn der Nutzer das Anzeigeformat über das Dropdown wechselt. |
| `showAlpha` | `boolean` | `true` | Zeigt den Alpha-Slider und das Deckkraft-(%)-Feld an. Auf `false` setzen für reine Vollfarben-Anwendungsfälle. |
| `showEyeDropper` | `boolean` | `true` | Zeigt das Pipette-Werkzeug an. Wird automatisch ausgeblendet, wenn der Browser die [EyeDropper-API](https://developer.mozilla.org/de/docs/Web/API/EyeDropper) nicht unterstützt (Stand jetzt nur Chromium — nicht Safari/Firefox). |
| `showSliderSection` | `boolean` | `true` | Zeigt den Pipette-Button und die Farbton-/Alpha-Slider-Zeile an. Auf `false` setzen für einen minimalen Gradient-only-Picker. |
| `showInputSection` | `boolean` | `true` | Zeigt das Format-Dropdown und die Hex-/RGB-/HSL-/Alpha-Wertefelder an. Auf `false` setzen für einen reinen Slider-Picker. |
| `savedColors` | `string[]` | — | Unterhalb des Pickers gerenderte Swatches — Klick zum Auswählen. Reine Anzeige-/Auswahlliste; die Persistenz liegt bei dir. |
| `disabled` | `boolean` | `false` | Deaktiviert alle Interaktionen (Ziehen, Tippen, Swatch-Klicks, Pipette) und reduziert die Deckkraft. |
| `colorGradientSize` | `'small' \| 'medium'` | `'medium'` | Skaliert Gradient-Flächenhöhe, Slider-Dicke und Swatch-Größe. |
| `inputSize` | `'small' \| 'medium'` | `'medium'` | Größe des Format-Dropdowns und der Werte-/Alpha-Felder, unabhängig von `colorGradientSize`. |
| `width` | `number` | `280` | Gesamtbreite des Panels in px. |
| `name` | `string` | — | Formular-Integration: rendert ein verstecktes `<input>` mit dem aktuellen Hex-Wert, sodass der Picker ohne zusätzliche Verdrahtung an nativen Formularen/React Hook Form/Formik teilnimmt. |
| `translation` | `Partial<ColorPickerTranslation>` | Englische Defaults | Überschreibt barrierefreie Beschriftungen und die Überschrift der gespeicherten Farben. Nur die gewünschten Keys angeben — siehe [Übersetzungen](#übersetzungen). |

---

## Callbacks / Events

### Wann feuert `onChange`?

`onChange` feuert live, fortlaufend, bei jeder Änderung:

- Fortlaufend während des Ziehens an der Gradient-Fläche, dem Farbton-Slider oder dem Alpha-Slider (bei jedem Pointer-Move-Frame, nicht erst beim Loslassen)
- Bei jedem gültigen Tastendruck in den Hex-/RGB-/HSL-/Alpha-Feldern (ungültige Zwischenzustände wie ein halb getippter Hex-Code werden lokal gehalten, ohne `onChange` auszulösen)
- Beim Klick auf einen Farb-Swatch
- Wenn die Pipette erfolgreich eine Farbe aufgenommen hat

### `onChange` vs. `onChangeCommitted`

Stell es dir wie einen Lautstärkeregler vor: `onChange` feuert bei jeder kleinsten Bewegung, damit deine UI die Farbe in Echtzeit vorschauen kann. `onChangeCommitted` feuert einmal wenn der Nutzer loslässt — nutze es für alles Aufwändige wie das Speichern ins Backend, damit du es nicht bei jedem einzelnen Drag-Frame belastest.

```tsx
<ColorPicker
  value={color}
  onChange={(hex) => setColor(hex)}              // live: UI während des Ziehens aktualisieren
  onChangeCommitted={(hex) => saveToBackend(hex)} // einmal pro Geste: wenn der Nutzer fertig ist
/>
```

Das spiegelt MUIs eigene `Slider`-Komponente, die genau dieselbe `onChange`/`onChangeCommitted`-Aufteilung hat.

`onChangeCommitted` feuert:

- Einmal bei Pointer-Up nach einem Drag an der Gradient-Fläche, dem Farbton-Slider oder dem Alpha-Slider
- Einmal bei Blur nach dem Tippen in den Hex-/RGB-/HSL-/Alpha-Feldern
- Sofort (gleicher Tick wie `onChange`) bei atomaren Einzelschritt-Aktionen — Klick auf einen Farb-Swatch oder erfolgreiche Pipetten-Aufnahme, da es dort keine separate Drag-/Tipp-Phase gibt

### Das zweite Argument: `info`

Beide Callbacks erhalten auch ein `ColorPickerColorInfo`-Objekt als zweiten Parameter:

```ts
type ColorPickerColorInfo = {
  hex: string;                                          // "#rrggbb" oder "#rrggbbaa" (Alpha < 1)
  rgb: { r: number; g: number; b: number; a: number };  // r/g/b 0–255, a 0–1
  hsl: { h: number; s: number; l: number; a: number };  // h 0–360, s/l 0–100, a 0–1
};
```

**In den meisten Fällen reicht `hex`** — es ist das erste Argument und deckt die große Mehrzahl der Anwendungsfälle ab. `info` nutzt du, wenn du die Farbe in einem bestimmten Format benötigst, ohne sie selbst konvertieren zu müssen:

```tsx
// Anwendungsfall: du brauchst RGB-Werte für eine Canvas-Zeichen-API
<ColorPicker
  value={color}
  onChange={(hex, info) => {
    setColor(hex);
    ctx.fillStyle = `rgba(${info.rgb.r}, ${info.rgb.g}, ${info.rgb.b}, ${info.rgb.a})`;
  }}
/>
```

Hex-/RGB-/HSL-Werte bleiben immer synchron — `defaultFormat` steuert nur, was der Nutzer *sieht und tippt*, nicht was die Callbacks melden.

---

## In ein Popover einbetten

Das häufigste Muster: ein farbiger Swatch-Button, der beim Klick den Picker in einem schwebenden Panel öffnet.

```tsx
import { useState } from 'react';
import { Box, Popover } from '@mui/material';
import { ColorPicker } from '@thebuoyant-tsdev/mui-ts-library';

function SwatchColorPicker() {
  const [color, setColor] = useState('#1976d2');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      {/* Das farbige Quadrat — Klick öffnet den Picker */}
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          width: 32, height: 32, borderRadius: 1,
          backgroundColor: color,
          cursor: 'pointer',
          border: '1px solid', borderColor: 'divider',
        }}
      />

      {/* Der Picker erscheint unterhalb des Quadrats */}
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

Du kannst das Panel auch direkt auf der Seite rendern, ohne jegliches Popover — zum Beispiel in einer immer sichtbaren Einstellungs-Sidebar.

---

## Gespeicherte Farben

```tsx
<ColorPicker
  value={color}
  onChange={(hex) => setColor(hex)}
  savedColors={['#f44336', '#2196f3', '#4caf50', '#ffeb3b']}
/>
```

Ein Klick auf einen Swatch wählt ihn sofort aus (feuert `onChange` wie jede andere Interaktion). Die Komponente verändert `savedColors` nie selbst — du besitzt diese Liste. Wenn du ein "aktuelle Farbe speichern"-Feature willst, verwalte dein eigenes Array und hänge die letzte `onChange`-Farbe an:

```tsx
const [saved, setSaved] = useState<string[]>(['#f44336', '#2196f3']);

<ColorPicker
  value={color}
  onChange={(hex) => setColor(hex)}
  savedColors={saved}
/>
<Button onClick={() => setSaved((prev) => [...prev, color])}>
  Aktuelle Farbe speichern
</Button>
```

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

`showSliderSection` und `showInputSection` schalten jeweils eine ganze Zeile unabhängig voneinander:

```tsx
{/* Nur Gradient-Fläche + Slider — kein Format-Dropdown oder Zahlenfelder */}
<ColorPicker value={color} onChange={(hex) => setColor(hex)} showInputSection={false} />

{/* Nur Gradient-Fläche + Zahlenfelder — keine Pipette oder Farbton-/Alpha-Slider */}
<ColorPicker value={color} onChange={(hex) => setColor(hex)} showSliderSection={false} />
```

Die Gradient-Fläche selbst wird immer angezeigt — sie ist die primäre Interaktionsfläche des Pickers.

---

## Deaktivierter Zustand

```tsx
<ColorPicker value={color} onChange={() => {}} disabled />
```

Alle Interaktionen (Ziehen, Tippen, Swatch-Klicks, Pipette) sind deaktiviert. Das Panel wird mit reduzierter Deckkraft (`0.6`) gerendert.

---

## Übersetzungen

Alle übersetzbaren Texte sind `aria-label`s (für Screenreader und assistive Technologien) — es gibt sonst keine weitere sichtbare Beschriftung außer der "Gespeicherte Farben"-Überschrift.

```tsx
type ColorPickerTranslation = {
  formatLabel:           string; // aria-label für das Format-Dropdown
  hexFieldLabel:         string; // aria-label für das Hex-Eingabefeld
  redLabel:              string;
  greenLabel:            string;
  blueLabel:             string;
  hueFieldLabel:         string;
  saturationFieldLabel:  string;
  lightnessFieldLabel:   string;
  alphaFieldLabel:       string;
  eyeDropperLabel:       string; // Tooltip + aria-label für den Pipette-Button
  savedColorsLabel:      string; // sichtbare Überschrift über der Swatch-Reihe
  gradientAreaLabel:     string; // aria-label für die 2D-Gradient-Fläche
  hueSliderLabel:        string;
};
```

Nur die benötigten Keys überschreiben — alles andere fällt auf die englischen Defaults zurück:

```tsx
<ColorPicker
  value={color}
  onChange={(hex) => setColor(hex)}
  translation={{
    hexFieldLabel:    'Hex-Wert',
    savedColorsLabel: 'Gespeicherte Farben',
  }}
/>
```

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

- Die Gradient-Fläche und beide Slider exponieren `role="slider"` mit `aria-label`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` und sind per Tastatur fokussierbar.
- Jedes Zahlenfeld (Hex, R/G/B, H/S/L, Alpha) hat ein explizites `aria-label`.
- Der Pipette-Button hat sowohl einen Tooltip als auch ein explizites `aria-label`.
- Swatches gespeicherter Farben exponieren den Farb-String selbst als `aria-label`.

---

## Hinweise und bekannte Einschränkungen

| Thema | Hinweis |
|---|---|
| **Browser-Unterstützung der Pipette** | Die [EyeDropper-API](https://developer.mozilla.org/de/docs/Web/API/EyeDropper) ist Stand jetzt nur in Chromium-basierten Browsern verfügbar (Chrome, Edge, Opera) — nicht in Safari oder Firefox. Der Button wird bei fehlender Unterstützung automatisch ausgeblendet, unabhängig von `showEyeDropper`. |
| **Kein eingebautes Popover/Auslöser** | `ColorPicker` ist nur das Panel — siehe [In ein Popover einbetten](#in-ein-popover-einbetten) für das empfohlene Einbindungsmuster. |
| **HSV/HSL-Präzision nahe Schwarz/Weiß** | Wie praktisch alle Sättigung/Helligkeit-Farbwähler wird der Farbton bei reinem Schwarz oder Weiß mathematisch undefiniert — durch diese Ecken zu ziehen kann den Farbton auf einem anderen Wert belassen, als wo man gestartet ist. Das ist normales, erwartetes Verhalten für diesen Picker-Typ, kein Bug. |
