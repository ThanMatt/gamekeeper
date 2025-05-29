import type { BoardGameManifest } from "@/types";

export const SUPPORTED_GAMES: BoardGameManifest[] = [
  {
    id: "5",
    name: "Acquire",
    plugins: [
      {
        name: "Banking assistant",
        description:
          "Monitor hotel chain stocks and stockholder bonuses easily",
        component: "../components/react/games/acquire/BankerView.tsx",
      },
      {
        name: "Player assistant",
        description: "Monitor your value easily",
        component: "../components/react/games/acquire/PlayerView.tsx",
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
