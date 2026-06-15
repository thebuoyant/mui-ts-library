import { Box, Chip, Tooltip, Typography, useTheme } from "@mui/material";
import { HEADER_HEIGHT } from "./GanttChart.constants";

export type HeaderColumn = {
  key: string;
  label: string;
  width: number;
  isWeekend?: boolean;
};

// Obere Gruppenzeile für den Zwei-Ebenen-Header (z. B. Monate über Tages-Spalten).
export type HeaderGroup = {
  key: string;
  label: string;
  width: number;
};

type GanttTimelineHeaderProps = {
  columns: HeaderColumn[];
  // Wenn gesetzt, wird eine zweite (obere) Zeile mit Gruppenüberschriften gerendert.
  groups?: HeaderGroup[];
  // Today-Chip — wird nur gerendert wenn todayX gesetzt und todayLabel nicht leer ist.
  todayX?:       number | null;
  todayLabel?:   string;
  todayTooltip?: string;
  todayColor?:   string;
};

function HeaderRow({ items }: { items: Array<{ key: string; label: string; width: number; isWeekend?: boolean }> }) {
  return (
    <Box sx={{ display: "flex" }}>
      {items.map((item) => (
        <Box
          key={item.key}
          sx={{
            width: item.width,
            flexShrink: 0,
            height: HEADER_HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "1px solid",
            borderColor: "divider",
            bgcolor: item.isWeekend ? "action.hover" : "transparent",
          }}
        >
          <Typography
            variant="caption"
            color={item.isWeekend ? "text.disabled" : "text.secondary"}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export function GanttTimelineHeader({
  columns,
  groups,
  todayX,
  todayLabel,
  todayTooltip,
  todayColor,
}: GanttTimelineHeaderProps) {
  const theme = useTheme();

  // Explizite Höhe mit border-box sorgt dafür, dass Task-Panel- und Timeline-Header
  // exakt gleich hoch sind (beide: border-box = HEADER_HEIGHT, content = HEADER_HEIGHT - 1px).
  const totalHeight = groups ? HEADER_HEIGHT * 2 : HEADER_HEIGHT;

  // Resolved color für Chip und Linie.
  const resolvedColor = todayColor || theme.palette.primary.main;

  // Kontrastfarbe für den Chip-Text — helle Farbe auf dunklem Hintergrund und umgekehrt.
  const chipTextColor = theme.palette.getContrastText(resolvedColor);

  const showTodayChip = todayX != null && todayLabel;

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        bgcolor: "background.paper",
        zIndex: 1,
        borderBottom: "1px solid",
        borderColor: "divider",
        height: totalHeight,
        overflow: "visible",
      }}
    >
      {groups && (
        <Box sx={{ height: HEADER_HEIGHT, borderBottom: "1px solid", borderColor: "divider", overflow: "visible" }}>
          <HeaderRow items={groups} />
        </Box>
      )}
      <HeaderRow items={columns} />

      {/* Heute-Chip — sitzt am unteren Rand des Headers, zentriert auf der Today-Linie.
          translateY(50%) lässt ihn halb aus dem Header herausragen sodass er optisch
          genau dort beginnt wo die gestrichelte Today-Linie startet. */}
      {showTodayChip && (
        <Tooltip
          title={todayTooltip ?? ""}
          placement="top"
          arrow
        >
          <Chip
            data-testid="gantt-today-chip"
            size="small"
            label={todayLabel}
            sx={{
              position:        "absolute",
              bottom:          0,
              left:            todayX,
              transform:       "translateX(-50%) translateY(50%)",
              zIndex:          3,
              height:          20,
              fontSize:        "0.65rem",
              fontWeight:      700,
              letterSpacing:   "0.03em",
              backgroundColor: resolvedColor,
              color:           chipTextColor,
              border:          `1.5px solid ${resolvedColor}`,
              boxShadow:       theme.shadows[2],
              cursor:          "default",
              userSelect:      "none",
              "& .MuiChip-label": { px: "6px", py: 0 },
              // Dezenter Hover-Effekt
              "&:hover": {
                backgroundColor: resolvedColor,
                opacity:         0.9,
              },
            }}
          />
        </Tooltip>
      )}
    </Box>
  );
}
