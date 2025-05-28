import { defineCollection, z, type RenderedContent } from "astro:content";
import { fetchBGGGameData } from "./api";
import { EMPTY_BOARD_GAME_DATA, SUPPORTED_GAMES } from "./lib/consts";

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
  usersRated: z.number(),
});

export type BoardGame = z.infer<typeof boardGameSchema>;
const boardGames = defineCollection({
  loader: async () => {
    const supportedGames: BoardGame[] = [];
    for (const game of SUPPORTED_GAMES) {
      try {
        const boardGame = await fetchBGGGameData(game.id);

        if (!boardGame) throw null;

        supportedGames.push(boardGame);
        // :: Add a small delay to be nice to BGG's API
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        supportedGames.push({
          ...EMPTY_BOARD_GAME_DATA,
          id: game.id,
          name: game.name,
        });
      }
    }
    return supportedGames;
  },
  schema: boardGameSchema,
});

export type BoardGameCollection = {
  id: string;
  body?: string;
  collection: "boardGames";
  data: BoardGame;
  rendered?: RenderedContent;
  filePath?: string;
};

export const collections = { boardGames };
