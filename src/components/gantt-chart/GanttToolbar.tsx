import { Box, IconButton, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { useGanttChartStore, useGanttTranslations } from "./GanttChart";
import type { GanttTimeScale } from "./GanttChart.types";

// Timezone-sicheres Format für type="date"-Inputs (lokales Datum, nicht UTC).
function toDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDateInput(value: string): Date | null {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

export function GanttToolbar() {
  const t = useGanttTranslations();
  const timeScale = useGanttChartStore((s) => s.timeScale);
  const setTimeScale = useGanttChartStore((s) => s.setTimeScale);
  const timelineRange = useGanttChartStore((s) => s.timelineRange);
  const isRangeCustomized = useGanttChartStore((s) => s.isRangeCustomized);
  const setTimelineRange = useGanttChartStore((s) => s.setTimelineRange);
  const resetTimelineRange = useGanttChartStore((s) => s.resetTimelineRange);

  const SCALE_LABELS: Record<GanttTimeScale, string> = {
    days: t.scaleDays,
    weeks: t.scaleWeeks,
    months: t.scaleMonths,
    quarters: t.scaleQuarters,
  };

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const start = parseDateInput(e.target.value);
    if (start) setTimelineRange({ start, end: timelineRange.end });
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const end = parseDateInput(e.target.value);
    if (end) setTimelineRange({ start: timelineRange.start, end });
  };

  const handleScaleChange = (_: React.MouseEvent, value: GanttTimeScale | null) => {
    if (value) setTimeScale(value);
  };

  return (
    <Box
      data-testid="gantt-toolbar"
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1,
        px: 1.5,
        py: 0.75,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <ToggleButtonGroup
        value={timeScale}
        exclusive
        onChange={handleScaleChange}
        size="small"
        aria-label={t.scaleMonths}
      >
        {(Object.keys(SCALE_LABELS) as GanttTimeScale[]).map((scale) => (
          <ToggleButton key={scale} value={scale} data-testid={`gantt-scale-${scale}`}>
            {SCALE_LABELS[scale]}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          type="date"
          size="small"
          label={t.rangeFrom}
          value={toDateInputValue(timelineRange.start)}
          onChange={handleStartChange}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ width: 148 }}
          inputProps={{ "data-testid": "gantt-range-start" }}
        />
        <TextField
          type="date"
          size="small"
          label={t.rangeTo}
          value={toDateInputValue(timelineRange.end)}
          onChange={handleEndChange}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ width: 148 }}
          inputProps={{ "data-testid": "gantt-range-end" }}
        />
        {isRangeCustomized && (
          <Tooltip title={t.rangeResetTooltip}>
            <IconButton
              size="small"
              onClick={resetTimelineRange}
              data-testid="gantt-range-reset"
            >
              <RestoreIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}
