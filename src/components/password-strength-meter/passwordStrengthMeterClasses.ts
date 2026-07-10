/**
 * CSS class names for every named slot in the PasswordStrengthMeter component.
 *
 * Use these to style individual parts of the component without relying on
 * MUI's internal class names, which can change between versions.
 *
 * @example
 * ```css
 * .MuiTsPasswordStrengthMeter-strengthBar.MuiTsPasswordStrengthMeter-strengthBarWeak {
 *   /* custom weak-strength color *\/
 * }
 * .MuiTsPasswordStrengthMeter-root.MuiTs-error .MuiTsPasswordStrengthMeter-input {
 *   border-color: red;
 * }
 * ```
 */
export const passwordStrengthMeterClasses = {
  /** The outermost wrapper element. Also receives `MuiTs-disabled` and `MuiTs-error` state classes. */
  root:              "MuiTsPasswordStrengthMeter-root",
  /** The FormControl wrapping the main password input field. */
  input:             "MuiTsPasswordStrengthMeter-input",
  /** The "Generate password" button (only present when `showPasswordGenerator={true}`). */
  generatorButton:   "MuiTsPasswordStrengthMeter-generatorButton",
  /** The FormControl wrapping the confirm password input (only when `showConfirmField={true}`). */
  confirmInput:      "MuiTsPasswordStrengthMeter-confirmInput",
  /** The strength progress bar element. Also receives one of the strength state classes below. */
  strengthBar:       "MuiTsPasswordStrengthMeter-strengthBar",
  /** Added to the strength bar when the password is weak (score 0–25 %). */
  strengthBarWeak:   "MuiTsPasswordStrengthMeter-strengthBarWeak",
  /** Added to the strength bar when the password is acceptable (score ~50 %). */
  strengthBarOk:     "MuiTsPasswordStrengthMeter-strengthBarOk",
  /** Added to the strength bar when the password is good (score ~75 %). */
  strengthBarGood:   "MuiTsPasswordStrengthMeter-strengthBarGood",
  /** Added to the strength bar when the password is very good (score 100 %). */
  strengthBarVeryGood: "MuiTsPasswordStrengthMeter-strengthBarVeryGood",
  /** The requirements summary box below the bar (only when `showSummary={true}`). */
  summary:           "MuiTsPasswordStrengthMeter-summary",
  /** Each individual requirement row (label + check/error icon). */
  requirementItem:   "MuiTsPasswordStrengthMeter-requirementItem",
} as const;
