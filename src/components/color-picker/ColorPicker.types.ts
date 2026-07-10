export type ColorPickerFormat = "hex" | "rgb" | "hsl";

/** Clean payload passed to `onChange` alongside the primary hex string — no internal HSV state exposed. */
export type ColorPickerColorInfo = {
  hex: string;
  rgb: { r: number; g: number; b: number; a: number };
  hsl: { h: number; s: number; l: number; a: number };
};

export type ColorPickerTranslation = {
  formatLabel:           string;
  hexFieldLabel:         string;
  redLabel:               string;
  greenLabel:             string;
  blueLabel:              string;
  hueFieldLabel:          string;
  saturationFieldLabel:   string;
  lightnessFieldLabel:    string;
  alphaFieldLabel:        string;
  eyeDropperLabel:        string;
  savedColorsLabel:       string;
  gradientAreaLabel:      string;
  hueSliderLabel:         string;
};

export const DEFAULT_COLOR_PICKER_TRANSLATION: Required<ColorPickerTranslation> = {
  formatLabel:           "Color format",
  hexFieldLabel:         "Hex value",
  redLabel:               "Red",
  greenLabel:             "Green",
  blueLabel:              "Blue",
  hueFieldLabel:          "Hue",
  saturationFieldLabel:   "Saturation",
  lightnessFieldLabel:    "Lightness",
  alphaFieldLabel:        "Alpha",
  eyeDropperLabel:        "Pick color from screen",
  savedColorsLabel:       "Saved colors",
  gradientAreaLabel:      "Saturation and brightness",
  hueSliderLabel:         "Hue",
};

export type ColorPickerProps = {
  /** Current color — accepts hex (#rgb, #rgba, #rrggbb, #rrggbbaa), rgb()/rgba(), or hsl()/hsla(). */
  value:                string;
  /** Fires on every change — live while dragging, on every valid keystroke, and on swatch/eyedropper picks — with a normalized hex string plus a clean rgb/hsl breakdown. */
  onChange:             (hex: string, info: ColorPickerColorInfo) => void;
  /** Fires once per "gesture" instead of continuously: on pointer-up after a drag, on blur after typing, or immediately for atomic actions (swatch click, eyedropper). Same dual-callback pattern as MUI's own `Slider` — use this instead of debouncing `onChange` yourself for expensive side effects (persisting to a backend, etc.). */
  onChangeCommitted?:   (hex: string, info: ColorPickerColorInfo) => void;
  /** Initial display format — uncontrolled after mount (default: `'hex'`). Ignored when `format` is set. */
  defaultFormat?:       ColorPickerFormat;
  /** Controlled display format. When set, the parent owns the active format — combine with `onFormatChange` to update it. When omitted, falls back to `defaultFormat` (uncontrolled). @since 3.23.0 */
  format?:              ColorPickerFormat;
  /** Fires when the user switches the display format via the dropdown. */
  onFormatChange?:      (format: ColorPickerFormat) => void;
  /** Shows the alpha slider and opacity field (default: true). */
  showAlpha?:           boolean;
  /** Shows the eyedropper tool — auto-hidden when the browser doesn't support the EyeDropper API regardless of this prop (default: true). */
  showEyeDropper?:      boolean;
  /** Shows the eyedropper button + hue/alpha slider row (default: true). Set `false` for a minimal gradient-area-only picker. */
  showSliderSection?:   boolean;
  /** Shows the format dropdown + hex/RGB/HSL/alpha value fields row (default: true). Set `false` for a slider-only picker. */
  showInputSection?:    boolean;
  /** Swatches shown below the picker — click to select. Purely a display list; the caller owns persistence. */
  savedColors?:         string[];
  disabled?:            boolean;
  /** Scales the gradient area, slider thickness, and swatch size (default: 'medium'). */
  colorGradientSize?:   "small" | "medium";
  /** Size of the format dropdown and value/alpha input fields, independent of `colorGradientSize` (default: 'medium'). */
  inputSize?:           "small" | "medium";
  /** Overall panel width in px (default: 280). */
  width?:               number;
  /** Form-integration: renders a hidden input so the value participates in native/React Hook Form/Formik form submission. */
  name?:                string;
  translation?:         Partial<ColorPickerTranslation>;
};
