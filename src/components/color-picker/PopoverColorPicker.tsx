import { useState } from "react";
import { Box, Popover, useTheme } from "@mui/material";
import { ColorPicker } from "./ColorPicker";
import { popoverColorPickerClasses } from "./popoverColorPickerClasses";
import { muiTsStateClasses } from "../../utils/muiTsClasses";
import {
  DEFAULT_POPOVER_COLOR_PICKER_TRANSLATION,
  type PopoverColorPickerProps,
} from "./ColorPicker.types";

const checkeredBackground = {
  backgroundImage:
    "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), " +
    "linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
  backgroundSize: "8px 8px",
  backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
};

export function PopoverColorPicker({
  value,
  onChange,
  onChangeCommitted,
  swatchSize = 28,
  swatchShape = "square",
  disabled = false,
  translation,
  ...colorPickerProps
}: PopoverColorPickerProps) {
  const theme = useTheme();
  const t = { ...DEFAULT_POPOVER_COLOR_PICKER_TRANSLATION, ...translation };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const borderRadius =
    swatchShape === "circle" ? "50%" : `${theme.shape.borderRadius}px`;

  return (
    <>
      <Box
        component="button"
        type="button"
        disabled={disabled}
        aria-label={t.openLabel}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          setAnchorEl(e.currentTarget)
        }
        className={[
          popoverColorPickerClasses.root,
          disabled ? muiTsStateClasses.disabled : undefined,
        ]
          .filter(Boolean)
          .join(" ")}
        sx={{
          width: swatchSize,
          height: swatchSize,
          minWidth: swatchSize,
          p: 0,
          borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          cursor: disabled ? "default" : "pointer",
          overflow: "hidden",
          flexShrink: 0,
          ...checkeredBackground,
          "&:hover:not(:disabled)": {
            borderColor: theme.palette.primary.main,
          },
          "&:focus-visible": {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 2,
          },
        }}
      >
        <Box
          className={popoverColorPickerClasses.swatch}
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
            backgroundColor: value,
          }}
        />
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{ paper: { sx: { p: 1.5 }, "data-testid": "popover-color-picker" } as object }}
      >
        <ColorPicker
          value={value}
          onChange={onChange}
          onChangeCommitted={onChangeCommitted}
          disabled={disabled}
          translation={translation}
          {...colorPickerProps}
        />
      </Popover>
    </>
  );
}
