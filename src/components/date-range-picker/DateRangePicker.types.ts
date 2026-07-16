/** One date within the range — returned by `onChange` with both representations. */
export type DateRangeEntry = {
  date: Date;
  /** ISO date string in local time: "YYYY-MM-DD" */
  iso:  string;
};

/** Rich output type returned by `onChange`. */
export type DateRange = {
  start: DateRangeEntry | null;
  end:   DateRangeEntry | null;
};

/** Simple input type for the `value` and `defaultValue` props. */
export type DateRangeInput = {
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
  /** Controlled value — pass simple `Date` objects. Omit to use uncontrolled mode via `defaultValue`. */
  value?: DateRangeInput;
  /** Initial value for uncontrolled mode. */
  defaultValue?: DateRangeInput;
  /** Called on every change — receives both `Date` and ISO string per date. */
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
