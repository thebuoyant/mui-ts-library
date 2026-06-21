import { useRef } from "react";
import { Box, IconButton, Popover, Tooltip } from "@mui/material";
import FormatColorResetIcon from "@mui/icons-material/FormatColorReset";

// Farbpaletten — angelehnt an Google Docs / Microsoft Word
const TEXT_COLORS = [
  "#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#ffffff",
  "#ff0000", "#ff4500", "#ff8c00", "#ffd700", "#9acd32", "#008000",
  "#00ced1", "#1e90ff", "#0000ff", "#8a2be2", "#ff1493", "#a52a2a",
];

const HIGHLIGHT_COLORS = [
  "#ffff00", "#ffd700", "#ffa500", "#ff69b4", "#ff6347", "#fa8072",
  "#adff2f", "#90ee90", "#00fa9a", "#00ffff", "#87ceeb", "#add8e6",
  "#dda0dd", "#ee82ee", "#d2b48c", "#f5f5dc", "#ffffff", "#000000",
];

type RichTextEditorColorPickerProps = {
  anchorEl:       HTMLElement | null;
  open:           boolean;
  onClose:        () => void;
  mode:           "textColor" | "highlight";
  activeColor?:   string | null;
  onSelectColor:  (color: string) => void;
  onRemoveColor:  () => void;
  removeLabel:    string;
};

function ColorSwatch({
  color,
  active,
  onClick,
}: {
  color: string;
  active: boolean;
  onClick: (c: string) => void;
}) {
  const isLight = color === "#ffffff" || color === "#f5f5dc" || color === "#ffd700"
    || color === "#ffff00" || color === "#adff2f" || color === "#ffa500"
    || color === "#b7b7b7" || color === "#d2b48c";

  return (
    <Tooltip title={color} placement="top" arrow>
      <Box
        component="button"
        type="button"
        onClick={() => onClick(color)}
        aria-label={color}
        aria-pressed={active}
        sx={{
          width:        22,
          height:       22,
          bgcolor:      color,
          border:       active ? "2px solid" : "1px solid",
          borderColor:  active ? "primary.main" : color === "#ffffff" || color === "#f5f5dc" ? "divider" : "transparent",
          borderRadius: 0.5,
          cursor:       "pointer",
          p:            0,
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          transition:   "transform 0.1s",
          "&:hover": { transform: "scale(1.2)", zIndex: 1 },
        }}
      >
        {active && (
          <Box
            component="span"
            sx={{
              width:       10,
              height:      6,
              borderLeft:  "2px solid",
              borderBottom: "2px solid",
              borderColor: isLight ? "#000" : "#fff",
              transform:   "rotate(-45deg) translateY(-1px)",
              display:     "block",
            }}
          />
        )}
      </Box>
    </Tooltip>
  );
}

export function RichTextEditorColorPicker({
  anchorEl,
  open,
  onClose,
  mode,
  activeColor,
  onSelectColor,
  onRemoveColor,
  removeLabel,
}: RichTextEditorColorPickerProps) {
  const customInputRef = useRef<HTMLInputElement>(null);
  const palette = mode === "highlight" ? HIGHLIGHT_COLORS : TEXT_COLORS;

  function handleCustomColor(e: React.ChangeEvent<HTMLInputElement>) {
    onSelectColor(e.target.value);
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{ paper: { sx: { p: 1.5 } } }}
    >
      {/* Farbraster */}
      <Box
        sx={{
          display:             "grid",
          gridTemplateColumns: "repeat(6, 22px)",
          gap:                 0.5,
          mb:                  1,
        }}
      >
        {palette.map((color) => (
          <ColorSwatch
            key={color}
            color={color}
            active={activeColor?.toLowerCase() === color.toLowerCase()}
            onClick={(c) => { onSelectColor(c); onClose(); }}
          />
        ))}
      </Box>

      {/* Aktionen: Benutzerdefinierte Farbe + Farbe entfernen */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {/* Native color-Picker als verstecktes Input — ausgelöst durch ein farbiges Swatch */}
        <Tooltip title="Custom color" arrow>
          <Box
            component="button"
            type="button"
            onClick={() => customInputRef.current?.click()}
            aria-label="Custom color"
            sx={{
              width:        22,
              height:       22,
              background:   "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)",
              border:       "1px solid",
              borderColor:  "divider",
              borderRadius: 0.5,
              cursor:       "pointer",
              p:            0,
              flexShrink:   0,
              "&:hover": { transform: "scale(1.2)" },
              transition:   "transform 0.1s",
            }}
          />
        </Tooltip>
        <input
          ref={customInputRef}
          type="color"
          defaultValue={activeColor ?? "#000000"}
          onChange={handleCustomColor}
          onBlur={onClose}
          style={{ visibility: "hidden", width: 0, height: 0, position: "absolute" }}
        />

        <Tooltip title={removeLabel} arrow>
          <IconButton
            size="small"
            onClick={() => { onRemoveColor(); onClose(); }}
            aria-label={removeLabel}
            sx={{ borderRadius: 1, ml: "auto" }}
          >
            <FormatColorResetIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Popover>
  );
}
