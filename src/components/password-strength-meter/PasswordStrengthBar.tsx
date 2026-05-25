import { Box } from "@mui/material";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

type PasswordStrengthBarProps = {
  percent:   number;
  color:     string;
  ariaLabel: string;
};

// ---------------------------------------------------------------------------
// Komponente
// ---------------------------------------------------------------------------

/**
 * Visuelle Fortschrittsleiste für die Passwortstärke.
 * role="progressbar" macht die Anzeige für Screenreader zugänglich —
 * ohne aria-Attribute wäre sie für assistive Technologien unsichtbar.
 */
export function PasswordStrengthBar({ percent, color, ariaLabel }: PasswordStrengthBarProps) {
  return (
    <Box
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
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
