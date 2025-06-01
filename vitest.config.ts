/// <reference types="vitest" />
import { resolve } from "path";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  plugins: [react(), svelte()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/lib/setup-tests.ts"],
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
  },
  resolve: {
    conditions: mode === "test" ? ["browser"] : [],
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
}));
