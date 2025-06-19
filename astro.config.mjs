// @ts-check
import { defineConfig } from "astro/config";

import AstroPWA from "@vite-pwa/astro";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    vue(),
    svelte(),
    AstroPWA({
      devOptions: {
        enabled: true,
      },
      workbox: {
        navigateFallback: "/404",
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
