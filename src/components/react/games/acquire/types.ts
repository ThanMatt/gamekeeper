export type Chain = {
  name: string;
  color: string;
  tier: Tier;
  tiles: Prices;
  stock: number;
  active: boolean;
  safe: boolean;
};

export type Tier = 1 | 2 | 3;

export type Prices = 2 | 3 | 4 | 5 | 6 | 11 | 21 | 31 | 41;

export type GameState = {
  chains: Chain[];
  gameMode: "classic" | "tycoon";
  balance?: number;
};
