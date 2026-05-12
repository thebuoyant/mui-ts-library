import { Box, Typography } from "@mui/material";
import { HEADER_HEIGHT } from "./GanttChart.constants";

export type HeaderColumn = {
  key: string;
  label: string;
  width: number;
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

function HeaderRow({ items }: { items: Array<{ key: string; label: string; width: number }> }) {
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
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export function GanttTimelineHeader({ columns, groups }: GanttTimelineHeaderProps) {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        bgcolor: "background.paper",
        zIndex: 1,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {groups && <HeaderRow items={groups} />}
      <HeaderRow items={columns} />
    </Box>
  );
}
