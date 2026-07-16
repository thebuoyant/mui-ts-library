import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { DateRangePicker } from "./DateRangePicker";
import type { DateRange, DateRangeInput } from "./DateRangePicker.types";

const meta: Meta<typeof DateRangePicker> = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  args: {
    disabled: false,
    size:     "small",
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  name: "Default (uncontrolled)",
  args: {
    defaultValue: {
      start: new Date("2026-01-01T00:00:00"),
      end:   new Date("2026-03-31T00:00:00"),
    },
  },
};

export const Controlled: Story = {
  name: "Controlled",
  render: (args) => {
    const [range, setRange] = useState<DateRangeInput>({
      start: new Date("2026-06-01T00:00:00"),
      end:   new Date("2026-08-31T00:00:00"),
    });
    function handleChange(r: DateRange) {
      // value prop accepts DateRangeInput (Date | null), onChange returns DateRange (with .date + .iso)
      setRange({ start: r.start?.date ?? null, end: r.end?.date ?? null });
      args.onChange?.(r);
    }
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <DateRangePicker {...args} value={range} onChange={handleChange} />
        <Typography variant="body2" color="text.secondary">
          Start: {range.start?.toLocaleDateString() ?? "—"}&nbsp;&nbsp;·&nbsp;&nbsp;
          End: {range.end?.toLocaleDateString() ?? "—"}
        </Typography>
      </Box>
    );
  },
};

export const WithMinMaxDate: Story = {
  name: "Min / Max Date",
  args: {
    minDate: new Date("2026-01-01T00:00:00"),
    maxDate: new Date("2026-12-31T00:00:00"),
    defaultValue: {
      start: new Date("2026-03-01T00:00:00"),
      end:   new Date("2026-06-30T00:00:00"),
    },
  },
};

export const GermanLabels: Story = {
  name: "German labels",
  args: {
    translation: { fromLabel: "Von", toLabel: "Bis" },
    defaultValue: {
      start: new Date("2026-01-01T00:00:00"),
      end:   new Date("2026-12-31T00:00:00"),
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: {
      start: new Date("2026-01-01T00:00:00"),
      end:   new Date("2026-03-31T00:00:00"),
    },
  },
};

export const EmptyRange: Story = {
  name: "Empty (no dates selected)",
  args: {
    defaultValue: { start: null, end: null },
  },
};
