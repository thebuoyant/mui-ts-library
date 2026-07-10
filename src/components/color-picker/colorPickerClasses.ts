/**
 * CSS class names for every named slot in the ColorPicker component.
 *
 * Use these to style individual parts of the component without relying on
 * MUI's internal class names, which can change between versions.
 *
 * @example
 * ```css
 * .MuiTsColorPicker-root { border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.15); }
 * .MuiTsColorPicker-swatch:hover { transform: scale(1.2); }
 * .MuiTsColorPicker-root.MuiTs-disabled { pointer-events: none; }
 * ```
 */
export const colorPickerClasses = {
  /** The outermost wrapper element. Also receives `MuiTs-disabled` when `disabled={true}`. */
  root:          "MuiTsColorPicker-root",
  /** The 2D gradient area used to pick saturation and brightness. */
  gradientArea:  "MuiTsColorPicker-gradientArea",
  /** The draggable circle (thumb) inside the gradient area. */
  gradientThumb: "MuiTsColorPicker-gradientThumb",
  /** The row containing the eyedropper button and the hue/alpha sliders (when `showSliderSection={true}`). */
  sliderSection: "MuiTsColorPicker-sliderSection",
  /** The horizontal hue slider bar. */
  hueSlider:     "MuiTsColorPicker-hueSlider",
  /** The horizontal alpha (opacity) slider bar (when `showAlpha={true}`). */
  alphaSlider:   "MuiTsColorPicker-alphaSlider",
  /** The row containing the format dropdown and hex/RGB/HSL input fields (when `showInputSection={true}`). */
  inputSection:  "MuiTsColorPicker-inputSection",
  /** The saved-colors section wrapper (when `savedColors` is non-empty). */
  savedColors:   "MuiTsColorPicker-savedColors",
  /** The flex row that wraps all swatch buttons. */
  swatchList:    "MuiTsColorPicker-swatchList",
  /** Each individual saved-color swatch button. */
  swatch:        "MuiTsColorPicker-swatch",
} as const;
