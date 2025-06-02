import { defineCollection, z } from "astro:content";

import { fetchBGGGameData } from "@/api";
import { EMPTY_BOARD_GAME_DATA, SUPPORTED_GAMES } from "@/lib/consts";
import { slugify } from "@/lib/utils";
import type { BoardGame } from "@/types";

export const boardGamePluginSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  componentId: z.enum([
    "acquire-banking-assistant",
    "acquire-player-assistant",
  ]),
  framework: z.enum(["react", "svelte", "vue", "astro"]),
  slug: z.string(),
});

export const boardGameSchema = z.object({
  id: z.string(),
  officialName: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  yearPublished: z.string().optional().nullable(),
  minPlayers: z.number(),
  maxPlayers: z.number(),
  playingTime: z.number(),
  rating: z.number(),
  weight: z.number(),
  rank: z.number(),
  usersRated: z.number(),
  slug: z.string(),
  plugins: z.array(boardGamePluginSchema),
});

const boardGames = defineCollection({
  loader: async () => {
    const supportedGames: BoardGame[] = [];
    for (const game of SUPPORTED_GAMES) {
      try {
        const boardGame = await fetchBGGGameData(game.id);

        if (!boardGame) throw null;

        supportedGames.push({
          ...boardGame,
          slug: slugify(game.name, boardGame.id),
          plugins: game.plugins
            ? game.plugins.map((plugin) => {
                return {
                  ...plugin,
                  slug: slugify(plugin.name, boardGame.id),
                };
              })
            : [],
          name: game.name,
        });
        // :: Add a small delay to be nice to BGG's API
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch {
        supportedGames.push({
          ...EMPTY_BOARD_GAME_DATA,
          id: game.id,
          name: game.name,
          slug: slugify(game.name, game.id),
          plugins: [],
        });
      }
    }
    return supportedGames;
  },
  schema: boardGameSchema,
});

export const collections = { boardGames };
