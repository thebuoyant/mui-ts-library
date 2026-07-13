/**
 * CSS class names for every named slot in the PopoverColorPicker component.
 *
 * @example
 * ```css
 * .MuiTsPopoverColorPicker-root { border-radius: 50%; }
 * .MuiTsPopoverColorPicker-root.MuiTs-disabled { opacity: 0.4; pointer-events: none; }
 * ```
 */
export const popoverColorPickerClasses = {
  /** The swatch button that triggers the popover. Also receives `MuiTs-disabled` when `disabled={true}`. */
  root:   "MuiTsPopoverColorPicker-root",
  /** The inner colored box inside the swatch button. */
  swatch: "MuiTsPopoverColorPicker-swatch",
} as const;
