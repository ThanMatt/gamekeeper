import { Components, type BoardGameManifest } from "@/types";

export const SUPPORTED_GAMES: BoardGameManifest[] = [
  {
    id: "5",
    name: "Acquire",
    plugins: [
      {
        name: "Banking assistant",
        description:
          "Monitor hotel chain stocks and stockholder bonuses easily",
        componentId: Components.ACQUIRE_BANKING_ASSISTANT,
        framework: "react",
      },
      {
        name: "Player assistant",
        description: "Monitor your value easily",
        componentId: Components.ACQUIRE_PLAYER_ASSISTANT,
        framework: "react",
      },
    ],
  },
  // :: Add more games here
];

export const EMPTY_BOARD_GAME_DATA = {
  name: "Name unavailable",
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
  usersRated: 0,
};
