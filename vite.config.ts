/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));
const externalPackages = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];

export default defineConfig({
  plugins: [react()],
  // Public-Assets nicht in den Library-Build kopieren
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MuiTsLibrary",
    },
    rollupOptions: {
      // Alle dependencies + peerDependencies externalisieren — nicht in dist bundeln
      external: (id) =>
        externalPackages.some((dep) => id === dep || id.startsWith(dep + "/")),
      output: [
        // ESM — ein File pro Quell-Modul, damit Bundler beim Konsumenten nur die
        // tatsächlich importierten Komponenten (und ihre Dependencies) einschließen.
        {
          format: "es",
          dir: "dist",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].js",
        },
        // CJS — ein gebündeltes File, da require()-Konsumenten ohnehin nicht
        // tree-shaken.
        {
          format: "cjs",
          dir: "dist",
          entryFileNames: "index.cjs",
          exports: "named",
        },
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
