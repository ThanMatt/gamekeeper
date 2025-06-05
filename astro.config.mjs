// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), vue(), svelte()],

  vite: {
    plugins: [tailwindcss()],
  },
});
