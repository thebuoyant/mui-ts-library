/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  // Public-Assets nicht in den Library-Build kopieren
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MuiTsLibrary",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@mui/material",
        "@mui/icons-material",
        "@emotion/react",
        "@emotion/styled",
      ],
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
      include: ["src/components/**/*.{ts,tsx}"],
      exclude: [
        "src/components/**/*.stories.{ts,tsx}",
        "src/components/**/*.types.ts",
      ],
    },
  },
});
