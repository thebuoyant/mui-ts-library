import { useState } from "react";
import { Box, FormHelperText, TextField } from "@mui/material";
import type { DateRangeEntry, DateRangeInput, DateRangePickerProps } from "./DateRangePicker.types";
import { DEFAULT_DATE_RANGE_PICKER_TRANSLATION } from "./DateRangePicker.types";
import { dateRangePickerClasses } from "./dateRangePickerClasses";
import { muiTsStateClasses } from "../../utils/muiTsClasses";

/** Formats a Date to YYYY-MM-DD in local time (avoids UTC offset issues). */
function toIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Parses YYYY-MM-DD as local midnight to avoid UTC offset issues. */
function fromInputValue(value: string): Date | null {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00`);
  return isNaN(d.getTime()) ? null : d;
}

function toEntry(date: Date | null): DateRangeEntry | null {
  if (!date) return null;
  return { date, iso: toIso(date) };
}

function getValidationErrors(
  range: DateRangeInput,
  touched: { start: boolean; end: boolean },
  required: boolean,
  t: { endBeforeStartError: string; startRequiredError: string; endRequiredError: string },
): { startError: string; endError: string } {
  let startError = "";
  let endError   = "";

  // end-before-start: show immediately once both dates are present and invalid
  if (range.start && range.end && range.end < range.start) {
    endError = t.endBeforeStartError;
  }

  // required errors: only show after the user has interacted with that field
  if (required && !range.start && touched.start) {
    startError = t.startRequiredError;
  }
  if (required && !range.end && touched.end && !endError) {
    endError = t.endRequiredError;
  }

  return { startError, endError };
}

const EMPTY: DateRangeInput = { start: null, end: null };

export function DateRangePicker({
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  disabled      = false,
  required      = false,
  error         = false,
  helperText,
  inputSize     = "small",
  inputMinWidth = 170,
  translation,
}: DateRangePickerProps) {
  const t = { ...DEFAULT_DATE_RANGE_PICKER_TRANSLATION, ...translation };

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<DateRangeInput>(defaultValue ?? EMPTY);
  const [touched,  setTouched]  = useState({ start: false, end: false });

  const range: DateRangeInput = isControlled ? value! : internal;

  const { startError, endError } = getValidationErrors(range, touched, required, t);

  function emit(start: Date | null, end: Date | null) {
    if (!isControlled) setInternal({ start, end });
    onChange?.({ start: toEntry(start), end: toEntry(end) });
  }

  function handleStartChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTouched((p) => ({ ...p, start: true }));
    emit(fromInputValue(e.target.value), range.end);
  }

  function handleEndChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTouched((p) => ({ ...p, end: true }));
    emit(range.start, fromInputValue(e.target.value));
  }

  function handleStartBlur() { setTouched((p) => ({ ...p, start: true })); }
  function handleEndBlur()   { setTouched((p) => ({ ...p, end:   true })); }

  const minStr = minDate ? toIso(minDate) : undefined;
  const maxStr = maxDate ? toIso(maxDate) : undefined;
  // Native min on end input: browser prevents picking end < start in the date picker UI
  const endMin = range.start ? toIso(range.start) : minStr;

  const hasError = error || !!startError || !!endError;

  return (
    <Box
      className={[
        dateRangePickerClasses.root,
        disabled && muiTsStateClasses.disabled,
        hasError  && muiTsStateClasses.error,
      ].filter(Boolean).join(" ")}
      sx={{ display: "inline-flex", flexDirection: "column", gap: 0.25 }}
    >
      <Box
        className={dateRangePickerClasses.inputs}
        sx={{ display: "inline-flex", alignItems: "flex-start", gap: 1 }}
      >
        <TextField
          className={dateRangePickerClasses.startInput}
          type="date"
          label={t.fromLabel}
          value={range.start ? toIso(range.start) : ""}
          onChange={handleStartChange}
          onBlur={handleStartBlur}
          disabled={disabled}
          required={required}
          error={!!startError || error}
          helperText={startError || " "}
          size={inputSize}
          sx={{ width: inputMinWidth }}
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: {
              min: minStr,
              max: maxStr,
              "data-testid": "date-range-start",
            },
          }}
        />

        <Box
          component="span"
          className={dateRangePickerClasses.separator}
          aria-hidden
          sx={{
            color:      "text.disabled",
            userSelect: "none",
            flexShrink: 0,
            lineHeight: 1,
            // Skip past the floating label area and center in the input box body.
            // small: OutlinedInput = 40px → center at 20px → mt = 20 - 8 = 12px
            // medium: OutlinedInput = 56px → center at 28px → mt = 28 - 8 = 20px
            mt: inputSize === "small" ? "12px" : "20px",
          }}
        >
          –
        </Box>

        <TextField
          className={dateRangePickerClasses.endInput}
          type="date"
          label={t.toLabel}
          value={range.end ? toIso(range.end) : ""}
          onChange={handleEndChange}
          onBlur={handleEndBlur}
          disabled={disabled}
          required={required}
          error={!!endError || error}
          helperText={endError || " "}
          size={inputSize}
          sx={{ width: inputMinWidth }}
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: {
              min: endMin,
              max: maxStr,
              "data-testid": "date-range-end",
            },
          }}
        />
      </Box>

      {helperText && (
        <FormHelperText
          className={dateRangePickerClasses.helperText}
          error={error}
          sx={{ mx: "14px" }}
        >
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
}
