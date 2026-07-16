export type DateRange = {
  start: Date | null;
  end:   Date | null;
};

export type DateRangePickerTranslation = {
  fromLabel: string;
  toLabel:   string;
};

export const DEFAULT_DATE_RANGE_PICKER_TRANSLATION: Required<DateRangePickerTranslation> = {
  fromLabel: "From",
  toLabel:   "To",
};

export type DateRangePickerProps = {
  /** Controlled value. Omit to use uncontrolled mode via `defaultValue`. */
  value?: DateRange;
  /** Initial value for uncontrolled mode. */
  defaultValue?: DateRange;
  onChange?: (range: DateRange) => void;
  /** Earliest selectable date (inclusive). */
  minDate?: Date;
  /** Latest selectable date (inclusive). */
  maxDate?: Date;
  disabled?: boolean;
  size?: "small" | "medium";
  /** Override any translation key — rest falls back to English defaults. */
  translation?: Partial<DateRangePickerTranslation>;
};
