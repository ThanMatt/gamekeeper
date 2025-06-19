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
      manifest: {
        icons: [
          {
            src: "/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
        theme_color: "#121212",
        background_color: "#121212"
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
