import { Box } from "@mui/material";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

type PasswordStrengthBarProps = {
  percent:    number;
  color:      string;
  ariaLabel:  string;
  /** When true, renders 4 separate animated segments instead of a single bar. */
  segments?:  boolean;
  className?: string;
};

// ---------------------------------------------------------------------------
// Komponente
// ---------------------------------------------------------------------------

/**
 * Visuelle Fortschrittsleiste für die Passwortstärke.
 * role="progressbar" macht die Anzeige für Screenreader zugänglich —
 * ohne aria-Attribute wäre sie für assistive Technologien unsichtbar.
 */
export function PasswordStrengthBar({ percent, color, ariaLabel, segments = false, className }: PasswordStrengthBarProps) {
  if (segments) {
    // 4 separate segments: filled segments = Math.round(percent / 25)
    const filledCount = Math.round(percent / 25);

    return (
      <Box
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className={className}
        sx={{
          width:   "100%",
          display: "flex",
          gap:     "3px",
          mt:      0.5,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <Box
            key={i}
            data-testid={i < filledCount ? "psm-meter-segment-active" : "psm-meter-segment"}
            sx={{
              flex:            1,
              height:          "8px",
              borderRadius:    "3px",
              border:          "1px solid",
              borderColor:     "divider",
              backgroundColor: i < filledCount ? color : "transparent",
              transition:      "background-color 0.3s ease-in-out",
            }}
          />
        ))}
      </Box>
    );
  }

  return (
    <Box
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={className}
      sx={{
        width:        "100%",
        height:       "8px",
        border:       "1px solid",
        borderColor:  "divider",
        borderRadius: "6px",
        mt:           0.5,
        display:      "flex",
      }}
    >
      <Box
        data-testid="psm-meter"
        sx={{
          height:          "100%",
          width:           `${percent}%`,
          backgroundColor: color,
          borderRadius:    "6px",
          transition:      "width 0.2s ease-in-out",
        }}
      />
    </Box>
  );
}
