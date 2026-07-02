# ColorPicker — User Manual

> [Deutsche Version →](ColorPicker.de.md)

**A color picker panel for React and Material UI — fills a real gap, since MUI ships no color picker of its own.** Use it wherever a user needs to pick an arbitrary color: theme customizers, brand-color screens, design-system playgrounds, or any form field that goes beyond a fixed palette.

## Overview

### What does this component do?

The user sees a picker panel with a colored gradient area. They drag a small circle (the "thumb") through the gradient to choose a hue and brightness. A slider on the right adjusts the hue, a second slider sets the opacity (alpha). Below that, a text field shows the current color as a hex code, RGB values, or HSL values — the user can also type directly.

Optional extras: an eyedropper tool to sample any color from the screen, and a row of saved-color swatches for quick reuse.

**What the component does not include:** a trigger button or a popup/popover. It renders the picker panel directly — you decide where it appears (inline on the page, inside an MUI `Popover`, inside a `Menu`, etc.). This is the same approach MUI takes with its own date pickers, which also separate the input field from the calendar panel. See [Embedding in a Popover](#embedding-in-a-popover) for the most common pattern.

**Typical use cases:**

- Theme or brand-color customization screens
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
  // color holds a hex string like "#1976d2"
  const [color, setColor] = useState('#1976d2');

  return (
    <ColorPicker
      value={color}              // the current color — you own this state
      onChange={(hex) => setColor(hex)} // called on every change; hex is the new color as a string
    />
  );
}
```

`onChange` is called with a hex string on every change — while the user is still dragging, not just when they let go. If you only want a single update when the user finishes a drag, see [`onChangeCommitted`](#onchange-vs-onchangecommitted) below.

---

## Props Reference

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | **Required.** Current color. Accepts hex (`#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`), `rgb()`/`rgba()`, or `hsl()`/`hsla()`. |
| `onChange` | `(hex: string, info: ColorPickerColorInfo) => void` | — | **Required.** Fires on every change — live while dragging, not just on release. See [Callbacks / Events](#callbacks--events). |
| `onChangeCommitted` | `(hex: string, info: ColorPickerColorInfo) => void` | — | Fires once per "gesture" instead of continuously. See [Callbacks / Events](#callbacks--events). |
| `defaultFormat` | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` | Initial display format for the value field. Uncontrolled after mount — the format dropdown manages its own state from there. |
| `onFormatChange` | `(format: ColorPickerFormat) => void` | — | Fires when the user switches the display format via the dropdown. |
| `showAlpha` | `boolean` | `true` | Shows the alpha slider and the opacity (%) field. Set `false` for opaque-only use cases. |
| `showEyeDropper` | `boolean` | `true` | Shows the eyedropper tool. Auto-hidden regardless of this prop when the browser doesn't support the [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper) (Chromium-based browsers only as of writing — not Safari/Firefox). |
| `showSliderSection` | `boolean` | `true` | Shows the eyedropper button and the hue/alpha slider row. Set `false` for a minimal gradient-area-only picker. |
| `showInputSection` | `boolean` | `true` | Shows the format dropdown and the hex/RGB/HSL/alpha value fields row. Set `false` for a slider-only picker. |
| `savedColors` | `string[]` | — | Swatches rendered below the picker — click to select. Purely a display/select list; you own persisting it (e.g. to `localStorage` or a backend). |
| `disabled` | `boolean` | `false` | Mutes all interactions (drag, typing, swatch clicks, eyedropper) and reduces opacity. |
| `colorGradientSize` | `'small' \| 'medium'` | `'medium'` | Scales the gradient area height, slider thickness, and swatch size. |
| `inputSize` | `'small' \| 'medium'` | `'medium'` | Size of the format dropdown and value/alpha fields, independent of `colorGradientSize`. |
| `width` | `number` | `280` | Overall panel width in px. |
| `name` | `string` | — | Form-integration: renders a hidden `<input>` carrying the current hex value, so the picker participates in native/React Hook Form/Formik form submission without extra wiring. |
| `translation` | `Partial<ColorPickerTranslation>` | English defaults | Override accessible labels and the saved-colors heading. Only the keys you want to change — see [Translations](#translations). |

---

## Callbacks / Events

### When does `onChange` fire?

`onChange` fires live, continuously, with every change:

- Continuously while dragging the gradient area, hue slider, or alpha slider (every pointer-move frame, not just on release)
- On every valid keystroke in the hex/RGB/HSL/alpha fields (invalid in-progress input, like a half-typed hex code, is held locally without firing)
- When a saved-color swatch is clicked
- When the eyedropper successfully picks a color

### `onChange` vs. `onChangeCommitted`

Think of it like a volume knob: `onChange` fires for every tiny movement so your UI can preview the color in real time. `onChangeCommitted` fires once when the user lets go — use it for anything expensive like saving to a backend, so you don't hammer it on every drag frame.

```tsx
<ColorPicker
  value={color}
  onChange={(hex) => setColor(hex)}              // live: update your preview as the user drags
  onChangeCommitted={(hex) => saveToBackend(hex)} // once per gesture: only when the user is done
/>
```

This mirrors MUI's own `Slider` component, which has the exact same `onChange`/`onChangeCommitted` split.

`onChangeCommitted` fires:

- Once on pointer-up, after a drag on the gradient area, hue slider, or alpha slider
- Once on blur, after typing in the hex/RGB/HSL/alpha fields
- Immediately (same tick as `onChange`) for atomic, single-step actions — a saved-color swatch click or a successful eyedropper pick, since there's no separate drag/typing phase to defer past

### The second argument: `info`

Both callbacks also receive a `ColorPickerColorInfo` object as their second argument:

```ts
type ColorPickerColorInfo = {
  hex: string;                                          // "#rrggbb" or "#rrggbbaa" (alpha < 1)
  rgb: { r: number; g: number; b: number; a: number };  // r/g/b 0–255, a 0–1
  hsl: { h: number; s: number; l: number; a: number };  // h 0–360, s/l 0–100, a 0–1
};
```

**Most of the time you only need `hex`** — it's the first argument and covers the majority of use cases. Use `info` when you need to work with the color in a specific format without converting it yourself:

```tsx
// Use case: you need the RGB values to pass to a canvas drawing API
<ColorPicker
  value={color}
  onChange={(hex, info) => {
    setColor(hex);
    ctx.fillStyle = `rgba(${info.rgb.r}, ${info.rgb.g}, ${info.rgb.b}, ${info.rgb.a})`;
  }}
/>
```

The hex/rgb/hsl values are always kept in sync — `defaultFormat` only controls what the user *sees and types*, not what the callbacks report.

---

## Embedding in a Popover

The most common pattern: a colored swatch button that opens the picker in a floating panel when clicked.

```tsx
import { useState } from 'react';
import { Box, Popover } from '@mui/material';
import { ColorPicker } from '@thebuoyant-tsdev/mui-ts-library';

function SwatchColorPicker() {
  const [color, setColor] = useState('#1976d2');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      {/* The colored square — clicking it opens the picker */}
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          width: 32, height: 32, borderRadius: 1,
          backgroundColor: color,
          cursor: 'pointer',
          border: '1px solid', borderColor: 'divider',
        }}
      />

      {/* The picker appears below the square */}
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

You can also render the picker panel directly on the page without any popover — for example, in a settings sidebar that's always visible.

---

## Saved Colors

```tsx
<ColorPicker
  value={color}
  onChange={(hex) => setColor(hex)}
  savedColors={['#f44336', '#2196f3', '#4caf50', '#ffeb3b']}
/>
```

Clicking a swatch selects it immediately (fires `onChange` like any other interaction). The component never mutates `savedColors` itself — you own this list. If you want an "add current color" button, maintain your own array in state and append to it:

```tsx
const [saved, setSaved] = useState<string[]>(['#f44336', '#2196f3']);

<ColorPicker
  value={color}
  onChange={(hex) => setColor(hex)}
  savedColors={saved}
/>
<Button onClick={() => setSaved((prev) => [...prev, color])}>
  Save current color
</Button>
```

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

## Minimal Layouts

`showSliderSection` and `showInputSection` each toggle a whole row independently:

```tsx
{/* Gradient area + sliders only — no format dropdown or numeric fields */}
<ColorPicker value={color} onChange={(hex) => setColor(hex)} showInputSection={false} />

{/* Gradient area + numeric fields only — no eyedropper or hue/alpha sliders */}
<ColorPicker value={color} onChange={(hex) => setColor(hex)} showSliderSection={false} />
```

The gradient area itself is always shown — it's the picker's primary interaction surface.

---

## Disabled State

```tsx
<ColorPicker value={color} onChange={() => {}} disabled />
```

All interactions (drag, typing, swatch clicks, eyedropper) are muted. The panel renders at reduced opacity (`0.6`).

---

## Translations

All translatable strings are `aria-label`s (for screen readers and assistive technology) — there is no other visible text in the component except the "Saved colors" heading.

```tsx
type ColorPickerTranslation = {
  formatLabel:           string; // aria-label for the format dropdown
  hexFieldLabel:         string; // aria-label for the hex input field
  redLabel:              string;
  greenLabel:            string;
  blueLabel:             string;
  hueFieldLabel:         string;
  saturationFieldLabel:  string;
  lightnessFieldLabel:   string;
  alphaFieldLabel:       string;
  eyeDropperLabel:       string; // tooltip + aria-label for the eyedropper button
  savedColorsLabel:      string; // visible heading above the swatch row
  gradientAreaLabel:     string; // aria-label for the 2D gradient area
  hueSliderLabel:        string;
};
```

Only override the keys you need — everything else falls back to the English defaults:

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

## TypeScript Types

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

## Accessibility

- The gradient area and both sliders expose `role="slider"` with `aria-label`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` and are keyboard-focusable.
- Every numeric field (hex, R/G/B, H/S/L, alpha) has an explicit `aria-label`.
- The eyedropper button has both a tooltip and an explicit `aria-label`.
- Saved-color swatches expose the color string itself as their `aria-label`.

---

## Notes and Known Limitations

| Topic | Note |
|---|---|
| **Browser support for the eyedropper** | The [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper) is Chromium-only as of writing (Chrome, Edge, Opera) — not supported in Safari or Firefox. The button is automatically hidden when unsupported, regardless of `showEyeDropper`. |
| **No built-in popover/trigger** | `ColorPicker` is the panel only — see [Embedding in a Popover](#embedding-in-a-popover) for the recommended wrapping pattern. |
| **HSV/HSL precision near black/white** | Like virtually all saturation/value color pickers, hue becomes mathematically undefined at pure black or white — dragging through those corners can leave hue at a different value. This is standard behavior for this style of picker, not a bug. |
