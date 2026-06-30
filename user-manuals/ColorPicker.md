# ColorPicker — User Manual

> [Deutsche Version →](ColorPicker.de.md)

**A full saturation/hue/alpha color picker panel — fills a real MUI gap, since MUI ships no color picker at all.** Use `ColorPicker` for theme customizers, brand-color pickers, design-system playgrounds, or anywhere a user needs to pick an arbitrary color rather than choose from a fixed palette.

## Overview

`ColorPicker` renders a self-contained picker **panel** (a 2D saturation/brightness area, a hue slider, an optional alpha slider, an eyedropper tool, a format-switchable value field, and an optional saved-colors swatch grid) — it does not include its own trigger button or popover. Embedding it in a `Popover`/`Menu` for a "swatch + dropdown" pattern is the consumer's choice, matching how MUI's own desktop/static date pickers separate the "field" from the "calendar."

It's a fully controlled component: you own the `value` (a color string) and update it from `onChange`.

**Typical use cases:**

- Theme/brand-color customization screens
- Design-system or component-playground tooling
- Any form needing a free-form (not just preset-swatch) color input

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

## Props Reference

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | **Required.** Current color. Accepts hex (`#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`), `rgb()`/`rgba()`, or `hsl()`/`hsla()`. |
| `onChange` | `(hex: string, info: ColorPickerColorInfo) => void` | — | **Required.** Fires on every change — live while dragging, not just on release. See [Callbacks / Events](#callbacks--events). |
| `defaultFormat` | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` | Initial display format for the value field. Uncontrolled after mount — the format dropdown manages its own state from there. |
| `onFormatChange` | `(format: ColorPickerFormat) => void` | — | Fires when the user switches the display format via the dropdown. |
| `showAlpha` | `boolean` | `true` | Shows the alpha slider and the opacity (%) field. Set `false` for opaque-only use cases. |
| `showEyeDropper` | `boolean` | `true` | Shows the eyedropper tool. Auto-hidden regardless of this prop when the browser doesn't support the [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper) (Chromium-based browsers only as of writing — not Safari/Firefox). |
| `savedColors` | `string[]` | — | Swatches rendered below the picker — click to select. Purely a display/select list; you own persisting it (e.g. to `localStorage` or a backend). |
| `disabled` | `boolean` | `false` | Mutes all interactions (drag, typing, swatch clicks, eyedropper) and reduces opacity. |
| `size` | `'small' \| 'medium'` | `'medium'` | Scales the gradient area height, slider thickness, and swatch size. |
| `width` | `number` | `280` | Overall panel width in px. |
| `name` | `string` | — | Form-integration: renders a hidden `<input>` carrying the current hex value, so the picker participates in native/React Hook Form/Formik form submission without extra wiring. |
| `translation` | `Partial<ColorPickerTranslation>` | English defaults | Override accessible labels (field/slider `aria-label`s and the saved-colors heading). Only the keys you want to change — see [Translations](#translations). |

---

## Callbacks / Events

`onChange` is the single source of truth — there's no separate "commit" event. It fires:

- Continuously while dragging the gradient area, hue slider, or alpha slider (every pointer-move frame, not just on release)
- On every valid keystroke in the hex/RGB/HSL/alpha fields (invalid in-progress input, like a half-typed hex code, is held locally without firing `onChange`)
- When a saved-color swatch is clicked
- When the eyedropper successfully picks a color

It always passes a normalized hex string as the first argument, plus a clean `ColorPickerColorInfo` object as the second:

```ts
type ColorPickerColorInfo = {
  hex: string;                                          // "#rrggbb" or "#rrggbbaa" (alpha < 1)
  rgb: { r: number; g: number; b: number; a: number };  // r/g/b 0–255, a 0–1
  hsl: { h: number; s: number; l: number; a: number };  // h 0–360, s/l 0–100, a 0–1
};
```

The hex/rgb/hsl values are always kept in sync regardless of which format is currently *displayed* in the value field — `defaultFormat` only controls what the user sees and types, not what `onChange` reports.

---

## No Popover Included — Wrap It Yourself

`ColorPicker` is the panel only. For a compact "swatch button that opens a picker" UI, wrap it in MUI's own `Popover`:

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

## Saved Colors

```tsx
<ColorPicker
  value={color}
  onChange={(hex) => setColor(hex)}
  savedColors={['#f44336', '#2196f3', '#4caf50', '#ffeb3b']}
/>
```

Clicking a swatch selects it (fires `onChange` like any other interaction). The component never mutates `savedColors` itself — if you want an "add current color to saved" feature, build it yourself by appending the latest `onChange` hex to your own state.

---

## Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <ColorPicker name="brandColor" value={color} onChange={(hex) => setColor(hex)} />
  <button type="submit">Save</button>
</form>
```

With `name` set, a hidden `<input type="hidden" name="brandColor" value={...} />` is rendered, so `FormData`, React Hook Form's `register`, and Formik all pick it up like any other form field.

---

## Disabled State

```tsx
<ColorPicker value={color} onChange={() => {}} disabled />
```

All interactions (drag, typing, swatch clicks, eyedropper) are muted. The panel renders at reduced opacity (`0.6`).

---

## Translations

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

Only `aria-label`s (for the gradient area, hue/alpha sliders, and the RGB/HSL/alpha numeric fields) and the "Saved colors" heading are translatable — there's no other visible chrome (the format dropdown shows fixed `HEX`/`RGB`/`HSL` values, consistent with how color tooling conventionally labels these).

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

Only override the keys you need — everything else falls back to the English defaults.

---

## TypeScript Types

```ts
type ColorPickerFormat = 'hex' | 'rgb' | 'hsl';

type ColorPickerColorInfo = {
  hex: string;
  rgb: { r: number; g: number; b: number; a: number };
  hsl: { h: number; s: number; l: number; a: number };
};

type ColorPickerProps = {
  value:            string;
  onChange:         (hex: string, info: ColorPickerColorInfo) => void;
  defaultFormat?:   ColorPickerFormat;
  onFormatChange?:  (format: ColorPickerFormat) => void;
  showAlpha?:       boolean;
  showEyeDropper?:  boolean;
  savedColors?:     string[];
  disabled?:        boolean;
  size?:            'small' | 'medium';
  width?:           number;
  name?:            string;
  translation?:     Partial<ColorPickerTranslation>;
};
```

---

## Accessibility

- The gradient area and both sliders expose `role="slider"` with `aria-label`/`aria-valuenow`/`aria-valuemin`/`aria-valuemax` (where applicable) and are keyboard-focusable (`tabIndex={0}`, `-1` when disabled).
- Every numeric field (hex, R/G/B, H/S/L, alpha) has an explicit `aria-label`.
- The eyedropper button has both a `Tooltip` and an explicit `aria-label`.
- Saved-color swatches expose the color string itself as their `aria-label`.

---

## Notes and Known Limitations

| Topic | Note |
|---|---|
| **Browser support for the eyedropper** | The [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper) is Chromium-only as of writing (Chrome, Edge, Opera) — not supported in Safari or Firefox. The button is automatically hidden when unsupported, regardless of `showEyeDropper`. |
| **No built-in popover/trigger** | `ColorPicker` is the panel only — see [No Popover Included](#no-popover-included--wrap-it-yourself) for the recommended wrapping pattern. |
| **HSV/HSL precision near black/white** | Like virtually all saturation/value color pickers, hue becomes mathematically undefined at pure black or white — dragging through those corners and back out can leave hue at a different value than where you started. This is standard, expected behavior for this style of picker, not a bug. |
