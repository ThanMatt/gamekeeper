import type { Chain, Prices } from "./types";

export const initialChains: Chain[] = [
  {
    name: "Sackson",
    color: "bg-red-600",
    tier: 1,
    tiles: 0 as Prices,
    stock: 25,
    active: false,
    safe: false,
  },
  {
    name: "Tower",
    color: "bg-yellow-500",
    tier: 1,
    tiles: 0 as Prices,
    stock: 25,
    active: false,
    safe: false,
  },
  {
    name: "American",
    color: "bg-blue-900",
    tier: 2,
    tiles: 0 as Prices,
    stock: 25,
    active: false,
    safe: false,
  },
  {
    name: "Festival",
    color: "bg-green-700",
    tier: 2,
    tiles: 0 as Prices,
    stock: 25,
    active: false,
    safe: false,
  },
  {
    name: "Worldwide",
    color: "bg-purple-700",
    tier: 2,
    tiles: 0 as Prices,
    stock: 25,
    active: false,
    safe: false,
  },
  {
    name: "Continental",
    color: "bg-blue-500",
    tier: 3,
    tiles: 0 as Prices,
    stock: 25,
    active: false,
    safe: false,
  },
  {
    name: "Imperial",
    color: "bg-orange-600",
    tier: 3,
    tiles: 0 as Prices,
    stock: 25,
    active: false,
    safe: false,
  },
];

// Helper function to create a fresh copy of initial chains
export const createInitialChains = (): Chain[] => {
  return initialChains.map((chain) => ({ ...chain }));
};

// Price tables
export const classicPrices = {
  1: {
    2: 200,
    3: 300,
    4: 400,
    5: 500,
    6: 600,
    11: 700,
    21: 800,
    31: 900,
    41: 1000,
  },
  2: {
    2: 300,
    3: 400,
    4: 500,
    5: 600,
    6: 700,
    11: 800,
    21: 900,
    31: 1000,
    41: 1100,
  },
  3: {
    2: 400,
    3: 500,
    4: 600,
    5: 700,
    6: 800,
    11: 900,
    21: 1000,
    31: 1100,
    41: 1200,
  },
};
