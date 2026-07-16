/**
 * CSS class names for every named slot in the DateRangePicker component.
 *
 * Use these to style individual parts of the component without relying on
 * MUI's internal class names, which can change between versions.
 *
 * @example
 * ```css
 * .MuiTsDateRangePicker-root.MuiTs-disabled { opacity: 0.5; }
 * .MuiTsDateRangePicker-root.MuiTs-error .MuiTsDateRangePicker-separator { color: red; }
 * ```
 */
export const dateRangePickerClasses = {
  /** The outermost wrapper element. Also receives `MuiTs-disabled` and `MuiTs-error` state classes. */
  root:       "MuiTsDateRangePicker-root",
  /** The flex row that holds the start input, separator, and end input. */
  inputs:     "MuiTsDateRangePicker-inputs",
  /** The start-date TextField. */
  startInput: "MuiTsDateRangePicker-startInput",
  /** The "–" character between the two inputs. */
  separator:  "MuiTsDateRangePicker-separator",
  /** The end-date TextField. */
  endInput:   "MuiTsDateRangePicker-endInput",
  /** The FormHelperText shown below the picker row when `helperText` is set. */
  helperText: "MuiTsDateRangePicker-helperText",
} as const;
