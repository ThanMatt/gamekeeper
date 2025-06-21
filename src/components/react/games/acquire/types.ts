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

export type BankerGameState = {
  chains: Chain[];
  gameMode: "classic" | "tycoon";
};

export type PlayerGameState = {
  chains: Chain[];
  gameMode: "classic" | "tycoon";
  balance: number;
  playerChain: PlayerChain | null;
};

export type PlayerChain = Record<string, { boughtStocks: number }>;
