import { Box } from "@mui/material";
import type { ReactNode } from "react";

type DemoLayoutProps = {
  preview: ReactNode;
  controls: ReactNode;
};

export function DemoLayout({ preview, controls }: DemoLayoutProps) {
  return (
    <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start", flexWrap: "wrap" }}>
      <Box sx={{ flex: 1, minWidth: 280, overflow: "auto" }}>{preview}</Box>
      {controls}
    </Box>
  );
}
