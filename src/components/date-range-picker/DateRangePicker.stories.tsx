import type { ComponentProps } from "react";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box, Typography } from "@mui/material";
import { DateRangePicker } from "./DateRangePicker";
import type { DateRange, DateRangeInput } from "./DateRangePicker.types";

const meta: Meta<typeof DateRangePicker> = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  args: {
    disabled:      false,
    error:         false,
    helperText:    "",
    inputMinWidth: 170,
    inputSize:     "small",
    required:      false,
    onChange:      fn(),
  },
  argTypes: {
    // A–Z
    disabled:      { control: "boolean" },
    error:         { control: "boolean" },
    helperText:    { control: "text" },
    inputMinWidth: { control: "number" },
    inputSize:     { control: "radio", options: ["small", "medium"] },
    required:      { control: "boolean" },
    // Komplexe Objekte — stattdessen dedizierte Stories verwenden.
    defaultValue:  { control: false },
    maxDate:       { control: false },
    minDate:       { control: false },
    translation:   { control: false },
    value:         { control: false },
    // Callbacks
    onChange:      { control: false },
  },
  parameters: {
    controls: { sort: "alpha" },
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

function ControlledStory(args: ComponentProps<typeof DateRangePicker>) {
  const [range, setRange] = useState<DateRangeInput>({
    start: new Date("2026-06-01T00:00:00"),
    end:   new Date("2026-08-31T00:00:00"),
  });
  function handleChange(r: DateRange) {
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
}

export const Controlled: Story = {
  name: "Controlled",
  render: (args) => <ControlledStory {...args} />,
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

export const EndBeforeStart: Story = {
  name: "Validation — End before Start",
  args: {
    value: {
      start: new Date("2026-06-01T00:00:00"),
      end:   new Date("2026-03-01T00:00:00"),
    },
  },
};

export const Required: Story = {
  name: "Validation — Required (blur to trigger)",
  args: {
    required: true,
    defaultValue: { start: null, end: null },
  },
};

export const ExternalError: Story = {
  name: "External error + helperText",
  args: {
    error:      true,
    helperText: "The selected range overlaps with an existing booking.",
    defaultValue: {
      start: new Date("2026-03-01T00:00:00"),
      end:   new Date("2026-03-15T00:00:00"),
    },
  },
};

export const GermanValidation: Story = {
  name: "German — validation messages",
  args: {
    translation: {
      fromLabel:           "Von",
      toLabel:             "Bis",
      endBeforeStartError: "Enddatum muss nach dem Startdatum liegen",
      startRequiredError:  "Startdatum ist erforderlich",
      endRequiredError:    "Enddatum ist erforderlich",
    },
    required: true,
    value: {
      start: new Date("2026-06-01T00:00:00"),
      end:   new Date("2026-03-01T00:00:00"),
    },
  },
};
