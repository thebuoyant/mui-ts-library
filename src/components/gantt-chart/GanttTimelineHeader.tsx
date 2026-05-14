import { Box, Typography } from "@mui/material";
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

export function GanttTimelineHeader({ columns, groups }: GanttTimelineHeaderProps) {
  // Explizite Höhe mit border-box sorgt dafür, dass Task-Panel- und Timeline-Header
  // exakt gleich hoch sind (beide: border-box = HEADER_HEIGHT, content = HEADER_HEIGHT - 1px).
  const totalHeight = groups ? HEADER_HEIGHT * 2 : HEADER_HEIGHT;

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
    </Box>
  );
}
