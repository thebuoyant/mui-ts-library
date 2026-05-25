import { Box } from "@mui/material";
import { useGanttTheme } from "./GanttChart";
import { COLUMN_WIDTH_DAY } from "./GanttChart.constants";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

type WeekendStrip = { key: string; left: number };

type GanttWeekendStripsProps = {
  strips:     WeekendStrip[];
  totalWidth: number;
  height:     number;
  top:        number;
};

// ---------------------------------------------------------------------------
// Komponente
// ---------------------------------------------------------------------------

/**
 * Zeichnet halbtransparente Hintergrundstreifen für Wochenend-Spalten
 * in der Tages-Skala. Eigener Layer (pointerEvents: none) damit Klicks
 * auf Balken und Zeilen durchgehen.
 */
export function GanttWeekendStrips({ strips, totalWidth, height, top }: GanttWeekendStripsProps) {
  const { weekendColor } = useGanttTheme();
  if (strips.length === 0) return null;

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
            bgcolor:  weekendColor ?? "action.hover",
          }}
        />
      ))}
    </Box>
  );
}
