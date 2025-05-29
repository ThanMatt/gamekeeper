import type { BoardGamePluginManifest } from "./content.config";

export type BoardGameData = {
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
  plugins?: BoardGamePluginManifest[];
};
