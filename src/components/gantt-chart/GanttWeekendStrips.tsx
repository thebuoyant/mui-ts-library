import { Box } from "@mui/material";
import { useGanttTheme } from "./GanttChart";
import { COLUMN_WIDTH_DAY } from "./GanttChart.constants";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type NonWorkingStrip = {
  key:       string;
  left:      number;
  /** true = Feiertag (eigene Farbe), false/undefined = Wochenende */
  isHoliday?: boolean;
};

type GanttWeekendStripsProps = {
  strips:     NonWorkingStrip[];
  totalWidth: number;
  height:     number;
  top:        number;
};

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

/** Warmes Amber bei ~18 % Deckkraft — sichtbar anders als das neutrale Grau der Wochenenden. */
const DEFAULT_HOLIDAY_COLOR = "rgba(255, 152, 0, 0.18)";

// ---------------------------------------------------------------------------
// Komponente
// ---------------------------------------------------------------------------

/**
 * Zeichnet halbtransparente Hintergrundstreifen für nicht-arbeitende Tage
 * (Wochenenden + Feiertage) in der Tages-Skala.
 * Wochenenden = `weekendColor` (grau), Feiertage = `holidayColor` (amber).
 * Eigener Layer (pointerEvents: none) damit Klicks auf Balken und Zeilen durchgehen.
 */
export function GanttWeekendStrips({ strips, totalWidth, height, top }: GanttWeekendStripsProps) {
  const { weekendColor, holidayColor } = useGanttTheme();
  if (strips.length === 0) return null;

  const resolvedHolidayColor = holidayColor || DEFAULT_HOLIDAY_COLOR;
  const resolvedWeekendColor = weekendColor || "action.hover";

  return (
    <Box
      aria-hidden
      data-testid="gantt-weekend-strips"
      sx={{
        position:      "absolute",
        top,
        left:          0,
        width:         totalWidth,
        height,
        pointerEvents: "none",
      }}
    >
      {strips.map((strip) => (
        <Box
          key={strip.key}
          sx={{
            position: "absolute",
            left:     strip.left,
            width:    COLUMN_WIDTH_DAY,
            top:      0,
            height:   "100%",
            bgcolor:  strip.isHoliday ? resolvedHolidayColor : resolvedWeekendColor,
          }}
        />
      ))}
    </Box>
  );
}
