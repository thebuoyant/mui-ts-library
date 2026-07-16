import { useState } from "react";
import { Box, TextField } from "@mui/material";
import type { DateRangeEntry, DateRangeInput, DateRangePickerProps } from "./DateRangePicker.types";
import { DEFAULT_DATE_RANGE_PICKER_TRANSLATION } from "./DateRangePicker.types";
import { dateRangePickerClasses } from "./dateRangePickerClasses";

/** Formats a Date to YYYY-MM-DD in local time (avoids UTC offset issues). */
function toIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Parses YYYY-MM-DD as local midnight to avoid timezone offset issues. */
function fromInputValue(value: string): Date | null {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00`);
  return isNaN(d.getTime()) ? null : d;
}

function toEntry(date: Date | null): DateRangeEntry | null {
  if (!date) return null;
  return { date, iso: toIso(date) };
}

const EMPTY: DateRangeInput = { start: null, end: null };

export function DateRangePicker({
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  size = "small",
  translation,
}: DateRangePickerProps) {
  const t = { ...DEFAULT_DATE_RANGE_PICKER_TRANSLATION, ...translation };

  const isControlled = value !== undefined;
  // Internal state always stores simple Date | null (same as DateRangeInput)
  const [internal, setInternal] = useState<DateRangeInput>(defaultValue ?? EMPTY);

  const range: DateRangeInput = isControlled ? value! : internal;

  function emit(start: Date | null, end: Date | null) {
    if (!isControlled) setInternal({ start, end });
    onChange?.({ start: toEntry(start), end: toEntry(end) });
  }

  function handleStartChange(e: React.ChangeEvent<HTMLInputElement>) {
    const start = fromInputValue(e.target.value);
    // If new start is after current end, clear end
    const end = start && range.end && start > range.end ? null : range.end;
    emit(start, end);
  }

  function handleEndChange(e: React.ChangeEvent<HTMLInputElement>) {
    emit(range.start, fromInputValue(e.target.value));
  }

  const minStr = minDate ? toIso(minDate) : undefined;
  const maxStr = maxDate ? toIso(maxDate) : undefined;
  // End input's min is either the selected start date or the global minDate
  const endMin = range.start ? toIso(range.start) : minStr;

  return (
    <Box
      className={dateRangePickerClasses.root}
      sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}
    >
      <TextField
        className={dateRangePickerClasses.startInput}
        type="date"
        label={t.fromLabel}
        value={range.start ? toIso(range.start) : ""}
        onChange={handleStartChange}
        disabled={disabled}
        size={size}
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
        sx={{ color: "text.disabled", userSelect: "none", flexShrink: 0 }}
      >
        –
      </Box>

      <TextField
        className={dateRangePickerClasses.endInput}
        type="date"
        label={t.toLabel}
        value={range.end ? toIso(range.end) : ""}
        onChange={handleEndChange}
        disabled={disabled}
        size={size}
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
  );
}
