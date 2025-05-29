export type Chain = {
  name: string;
  color: string;
  tier: Tier;
  tiles: number;
  stock: number;
  active: boolean;
  safe: boolean;
};

export type Tier = 1 | 2 | 3;
