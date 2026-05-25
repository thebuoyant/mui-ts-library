import { useTheme } from "@mui/material";
import { useGanttTheme } from "./GanttChart";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

type DependencyLine = { key: string; d: string };

type GanttDependencyArrowsProps = {
  dependencyLines: DependencyLine[];
  todayX:          number | null;
  totalWidth:      number;
  height:          number;
  top:             number;
  arrowMarkerId:   string;
};

// ---------------------------------------------------------------------------
// Komponente
// ---------------------------------------------------------------------------

/**
 * SVG-Layer über allen Gantt-Balken. Zeichnet:
 * - Z-förmige Abhängigkeitspfeile zwischen Vorgänger und Nachfolger
 * - Vertikale Today-Line am heutigen Datum
 *
 * pointerEvents: none — Klicks auf Balken und Zeilen gehen durch.
 * Farben werden intern via useTheme() / useGanttTheme() gelesen.
 */
export function GanttDependencyArrows({
  dependencyLines,
  todayX,
  totalWidth,
  height,
  top,
  arrowMarkerId,
}: GanttDependencyArrowsProps) {
  const theme              = useTheme();
  const { todayLineColor } = useGanttTheme();

  if (dependencyLines.length === 0 && todayX === null) return null;

  return (
    <svg
      data-testid="gantt-dependency-arrows"
      style={{
        position:      "absolute",
        top,
        left:          0,
        width:         totalWidth,
        height,
        pointerEvents: "none",
        overflow:      "visible",
      }}
    >
      {dependencyLines.length > 0 && (
        <defs>
          <marker
            id={arrowMarkerId}
            markerWidth="6"
            markerHeight="4"
            refX="5"
            refY="2"
            orient="auto"
          >
            <polygon points="0 0, 6 2, 0 4" fill="currentColor" />
          </marker>
        </defs>
      )}

      {dependencyLines.map((line) => (
        <path
          key={line.key}
          data-testid={`gantt-dep-${line.key}`}
          d={line.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeOpacity={0.4}
          markerEnd={`url(#${arrowMarkerId})`}
        />
      ))}

      {todayX !== null && (
        <line
          data-testid="gantt-today-line"
          x1={todayX}
          y1={0}
          x2={todayX}
          y2={height}
          stroke={todayLineColor ?? theme.palette.primary.main}
          strokeWidth={1.5}
          strokeDasharray="4 2"
        />
      )}
    </svg>
  );
}
