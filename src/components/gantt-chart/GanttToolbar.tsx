import { useMemo } from "react";
import { Box, IconButton, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import RestoreIcon from "@mui/icons-material/Restore";
import TodayIcon from "@mui/icons-material/Today";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { useGanttChartStore, useGanttTranslations } from "./GanttChart";
import type { GanttTimeScale, GanttToolbarConfig } from "./GanttChart.types";

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

type GanttToolbarProps = {
  onScrollToToday?: () => void;
  config: Required<GanttToolbarConfig>;
  onExportCSV?: () => void;
};

export function GanttToolbar({ onScrollToToday, config, onExportCSV }: GanttToolbarProps) {
  const t = useGanttTranslations();
  const timeScale = useGanttChartStore((s) => s.timeScale);
  const defaultTimeScale = useGanttChartStore((s) => s.defaultTimeScale);
  const setTimeScale = useGanttChartStore((s) => s.setTimeScale);
  const timelineRange = useGanttChartStore((s) => s.timelineRange);
  const isRangeCustomized = useGanttChartStore((s) => s.isRangeCustomized);
  const isExpandedCustomized = useGanttChartStore((s) => s.isExpandedCustomized);
  const setTimelineRange = useGanttChartStore((s) => s.setTimelineRange);
  const resetTimelineRange = useGanttChartStore((s) => s.resetTimelineRange);
  const resetView = useGanttChartStore((s) => s.resetView);
  const tasks = useGanttChartStore((s) => s.tasks);
  const expandedIds = useGanttChartStore((s) => s.expandedIds);
  const expandAll = useGanttChartStore((s) => s.expandAll);
  const collapseAll = useGanttChartStore((s) => s.collapseAll);

  const allExpanded = tasks.length > 0 && tasks.every((t) => expandedIds.has(t.id));
  const isViewChanged = timeScale !== defaultTimeScale || isRangeCustomized || isExpandedCustomized;

  // eslint-disable-next-line react-hooks/purity
  const now = useMemo(() => Date.now(), []);
  const isTodayInRange =
    now >= timelineRange.start.getTime() && now <= timelineRange.end.getTime();

  const SCALE_LABELS: Record<GanttTimeScale, string> = {
    days: t.scaleDays,
    weeks: t.scaleWeeks,
    months: t.scaleMonths,
    quarters: t.scaleQuarters,
  };

  const SCALE_VISIBLE: Record<GanttTimeScale, boolean> = {
    days: config.showScaleDays,
    weeks: config.showScaleWeeks,
    months: config.showScaleMonths,
    quarters: config.showScaleQuarters,
  };

  const visibleScales = (Object.keys(SCALE_LABELS) as GanttTimeScale[]).filter(
    (s) => SCALE_VISIBLE[s],
  );

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
      {visibleScales.length > 0 && (
        <ToggleButtonGroup
          value={timeScale}
          exclusive
          onChange={handleScaleChange}
          size="small"
          aria-label={t.scaleMonths}
        >
          {visibleScales.map((scale) => (
            <ToggleButton key={scale} value={scale} data-testid={`gantt-scale-${scale}`}>
              {SCALE_LABELS[scale]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}

      <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>
        {config.showExpandCollapseAll && (
          <Tooltip title={allExpanded ? t.collapseAllTooltip : t.expandAllTooltip}>
            <IconButton
              size="small"
              onClick={allExpanded ? collapseAll : expandAll}
              aria-label={allExpanded ? t.collapseAllTooltip : t.expandAllTooltip}
              data-testid="gantt-expand-collapse-all"
            >
              {allExpanded ? (
                <UnfoldLessIcon fontSize="small" />
              ) : (
                <UnfoldMoreIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        )}

        {config.showScrollToToday && onScrollToToday && (
          <Tooltip title={t.scrollToTodayTooltip}>
            <span>
              <IconButton
                size="small"
                onClick={onScrollToToday}
                disabled={!isTodayInRange}
                aria-label={t.scrollToTodayTooltip}
                data-testid="gantt-scroll-to-today"
              >
                <TodayIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        )}

        {config.showDateRange && (
          <>
            <TextField
              type="date"
              size="small"
              label={t.rangeFrom}
              value={toDateInputValue(timelineRange.start)}
              onChange={handleStartChange}
              slotProps={{ inputLabel: { shrink: true }, htmlInput: { "data-testid": "gantt-range-start" } }}
              sx={{ width: 148 }}
            />
            <TextField
              type="date"
              size="small"
              label={t.rangeTo}
              value={toDateInputValue(timelineRange.end)}
              onChange={handleEndChange}
              slotProps={{ inputLabel: { shrink: true }, htmlInput: { "data-testid": "gantt-range-end" } }}
              sx={{ width: 148 }}
            />
          </>
        )}

        {config.showRangeReset && isRangeCustomized && (
          <Tooltip title={t.rangeResetTooltip}>
            <IconButton
              size="small"
              onClick={resetTimelineRange}
              aria-label={t.rangeResetTooltip}
              data-testid="gantt-range-reset"
            >
              <RestoreIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {config.showExportCSV && onExportCSV && (
          <Tooltip title={t.exportCsvTooltip}>
            <IconButton
              size="small"
              onClick={onExportCSV}
              aria-label={t.exportCsvTooltip}
              data-testid="gantt-export-csv"
            >
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {config.showResetView && (
          <Tooltip title={t.resetViewTooltip}>
            <span>
              <IconButton
                size="small"
                onClick={resetView}
                disabled={!isViewChanged}
                aria-label={t.resetViewTooltip}
                data-testid="gantt-reset-view"
              >
                <RestartAltIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}
