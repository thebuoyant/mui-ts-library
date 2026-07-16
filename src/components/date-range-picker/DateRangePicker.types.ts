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
  fromLabel:           string;
  toLabel:             string;
  endBeforeStartError: string;
  startRequiredError:  string;
  endRequiredError:    string;
};

export const DEFAULT_DATE_RANGE_PICKER_TRANSLATION: Required<DateRangePickerTranslation> = {
  fromLabel:           "From",
  toLabel:             "To",
  endBeforeStartError: "End date must be after start date",
  startRequiredError:  "Start date is required",
  endRequiredError:    "End date is required",
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
  /** Marks both inputs as required — shows error after the user has interacted with a field. */
  required?: boolean;
  /** External error state — turns the helper text red. */
  error?: boolean;
  /** General hint or error message displayed below the picker. */
  helperText?: string;
  inputSize?: "small" | "medium";
  /** Minimum (and fixed) width of each date input in pixels. Prevents the field from stretching when a helperText or error message appears. Default: 170. */
  inputMinWidth?: number;
  /** Override any translation key — rest falls back to English defaults. */
  translation?: Partial<DateRangePickerTranslation>;
};
