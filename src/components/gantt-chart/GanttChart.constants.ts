export const ROW_HEIGHT = 40;
export const HEADER_HEIGHT = 40;
export const LEFT_PANEL_WIDTH = 320;
export const COLUMN_WIDTH_DAY = 20;
export const COLUMN_WIDTH_WEEK = 40;
export const COLUMN_WIDTH_MONTH = 120;
export const COLUMN_WIDTH_QUARTER = 360; // = 3 × COLUMN_WIDTH_MONTH
export const BAR_HEIGHT = 16;
export const STATUS_COL_WIDTH = 90;
export const ACTIONS_COL_WIDTH = 96;
export const DIVIDER_WIDTH = 4;

// ---------------------------------------------------------------------------
// Status-Farb-Maps — gemeinsam für GanttTimeline und GanttTaskPanel
// ---------------------------------------------------------------------------

/** MUI-Farb-Token für Balken und Status-Punkte (bgcolor-kompatibel) */
export const STATUS_BAR_COLOR: Record<string, string> = {
  planned:      "warning.light",
  "in-progress": "info.main",
  done:         "success.main",
  blocked:      "error.main",
};

/** MUI-Chip-Color-Werte für den Status-Chip im Task-Panel */
export const STATUS_CHIP_COLOR: Record<string, "default" | "warning" | "info" | "success" | "error"> = {
  planned:      "warning",
  "in-progress": "info",
  done:         "success",
  blocked:      "error",
};
