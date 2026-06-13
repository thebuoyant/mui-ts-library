import { createTheme, type PaletteMode } from "@mui/material";

export function createAppTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
    },
  });
}
