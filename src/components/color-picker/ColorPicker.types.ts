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
  /** Fires on every change (live while dragging) with a normalized hex string plus a clean rgb/hsl breakdown. */
  onChange:             (hex: string, info: ColorPickerColorInfo) => void;
  /** Initial display format for the value field — uncontrolled after mount (default: 'hex'). */
  defaultFormat?:       ColorPickerFormat;
  /** Fires when the user switches the display format via the dropdown. */
  onFormatChange?:      (format: ColorPickerFormat) => void;
  /** Shows the alpha slider and opacity field (default: true). */
  showAlpha?:           boolean;
  /** Shows the eyedropper tool — auto-hidden when the browser doesn't support the EyeDropper API regardless of this prop (default: true). */
  showEyeDropper?:      boolean;
  /** Swatches shown below the picker — click to select. Purely a display list; the caller owns persistence. */
  savedColors?:         string[];
  disabled?:            boolean;
  size?:                "small" | "medium";
  /** Overall panel width in px (default: 280). */
  width?:               number;
  /** Form-integration: renders a hidden input so the value participates in native/React Hook Form/Formik form submission. */
  name?:                string;
  translation?:         Partial<ColorPickerTranslation>;
};
