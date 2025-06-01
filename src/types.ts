import { z } from "astro:content";

import { boardGameSchema, boardGamePluginSchema } from "./content.config";

export type BoardGame = z.infer<typeof boardGameSchema>;
export type BoardGamePluginManifest = z.infer<typeof boardGamePluginSchema>;

export type BGGBoardGameData = {
  id: string;
  name: string;
  description: string;
  image?: string | null;
  thumbnail?: string | null;
  yearPublished?: string | null;
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
  rating: number;
  weight: number;
  rank: number;
  usersRated: number;
};

export type BoardGameManifest = {
  id: string;
  name: string;
  plugins?: BoardGamePluginData[];
};

export type BoardGamePluginData = {
  name: string;
  description?: string;
  componentId: Components;
  framework: Framework;
};

export type Components =
  | "acquire-banking-assistant"
  | "acquire-player-assistant";

export type Framework = "react" | "vue" | "svelte" | "astro";

export type ComponentRegistryEntry = {
  component: any; // :: Generic to accept any framework component
  framework: Framework;
};
