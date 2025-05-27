import { defineCollection, z } from "astro:content";
import { fetchBGGGameData } from "./api";
import { SUPPORTED_GAMES } from "./utils/consts";

const boardGameSchema = z.object({
  id: z.string(),
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
});

export type BoardGame = z.infer<typeof boardGameSchema>;
const boardGames = defineCollection({
  loader: async () => {
    const supportedGames: BoardGame[] = [];
    console.log("wow");
    for (const game of SUPPORTED_GAMES) {
      console.log("🚀 ~ loader: ~ game:", game);
      try {
        const boardGame = await fetchBGGGameData(game.id);
        console.log("🚀 ~ loader: ~ boardGame:", boardGame);

        if (!boardGame) throw null;

        supportedGames.push(boardGame);
        // :: Add a small delay to be nice to BGG's API
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        supportedGames.push({
          id: game.id,
          name: game.name,
          description: "Description unavailable",
          image: null,
          thumbnail: null,
          yearPublished: null,
          minPlayers: 0,
          maxPlayers: 0,
          playingTime: 0,
          rating: 0,
          weight: 0,
          rank: 0,
        });
      }
    }
    return supportedGames;
  },
  schema: boardGameSchema,
});

export const collections = { boardGames };
