import { Box, Typography } from "@mui/material";
import { HEADER_HEIGHT } from "./GanttChart.constants";

export type HeaderColumn = {
  key: string;
  label: string;
  width: number;
};

type GanttTimelineHeaderProps = {
  columns: HeaderColumn[];
};

export function GanttTimelineHeader({ columns }: GanttTimelineHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        position: "sticky",
        top: 0,
        bgcolor: "background.paper",
        zIndex: 1,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {columns.map((col) => (
        <Box
          key={col.key}
          sx={{
            width: col.width,
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
            {col.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
