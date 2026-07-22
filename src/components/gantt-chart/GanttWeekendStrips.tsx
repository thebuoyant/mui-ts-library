import { Box } from "@mui/material";
import { useGanttTheme } from "./GanttChart";
import { COLUMN_WIDTH_DAY } from "./GanttChart.constants";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type NonWorkingStrip = {
  key:       string;
  left:      number;
  /** true = Feiertag (erhält zusätzlichen Punkt-Marker), false/undefined = Wochenende */
  isHoliday?: boolean;
};

type GanttWeekendStripsProps = {
  strips:     NonWorkingStrip[];
  totalWidth: number;
  height:     number;
  top:        number;
};

// ---------------------------------------------------------------------------
// Komponente
// ---------------------------------------------------------------------------

/**
 * Zeichnet halbtransparente Hintergrundstreifen für nicht-arbeitende Tage
 * (Wochenenden + Feiertage) in der Tages-Skala.
 * Feiertage erhalten zusätzlich einen kleinen orangen Punkt oben im Streifen.
 * Eigener Layer (pointerEvents: none) damit Klicks auf Balken und Zeilen durchgehen.
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
            bgcolor:  weekendColor || "action.hover",
          }}
        >
          {strip.isHoliday && (
            <Box
              sx={{
                position:        "absolute",
                top:             6,
                left:            "50%",
                transform:       "translateX(-50%)",
                width:           5,
                height:          5,
                borderRadius:    "50%",
                bgcolor:         "warning.main",
                opacity:         0.75,
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}
