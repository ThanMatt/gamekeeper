import { useState } from "react";
import { TrendingUp, Package } from "lucide-react";
import { ChainCard } from "./ChainCard";
import type { Chain } from "../types";

export const BankerView = () => {
  const [gameMode, setGameMode] = useState<"classic" | "tycoon">("classic");

  const initialChains: Chain[] = [
    {
      name: "Sackson",
      color: "bg-red-600",
      tier: 1,
      tiles: 0,
      stock: 25,
      active: false,
      safe: false,
    },
    {
      name: "Tower",
      color: "bg-yellow-500",
      tier: 1,
      tiles: 0,
      stock: 25,
      active: false,
      safe: false,
    },
    {
      name: "American",
      color: "bg-blue-900",
      tier: 2,
      tiles: 0,
      stock: 25,
      active: false,
      safe: false,
    },
    {
      name: "Festival",
      color: "bg-green-700",
      tier: 2,
      tiles: 0,
      stock: 25,
      active: false,
      safe: false,
    },
    {
      name: "Worldwide",
      color: "bg-purple-700",
      tier: 2,
      tiles: 0,
      stock: 25,
      active: false,
      safe: false,
    },
    {
      name: "Continental",
      color: "bg-blue-500",
      tier: 3,
      tiles: 0,
      stock: 25,
      active: false,
      safe: false,
    },
    {
      name: "Imperial",
      color: "bg-orange-600",
      tier: 3,
      tiles: 0,
      stock: 25,
      active: false,
      safe: false,
    },
  ];

  const [chains, setChains] = useState(initialChains);

  const resetGame = () => {
    if (confirm("Reset all game data?")) {
      setChains(initialChains.map((chain) => ({ ...chain })));
    }
  };

  // Calculate summary stats
  const totalTiles = chains.reduce((sum, chain) => sum + chain.tiles, 0);
  const activeChains = chains.filter((chain) => chain.active).length;
  const totalStock = chains.reduce((sum, chain) => sum + (25 - chain.stock), 0);
  const safeChains = chains.filter((chain) => chain.safe).length;

  return (
    <div className="min-h-screen p-4 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 flex items-center justify-center gap-2 text-center text-3xl font-bold">
          <TrendingUp className="h-8 w-8" />
          Acquire Banker Assistant
        </h1>

        <div className="mb-6 flex justify-center gap-3">
          <button
            onClick={() => setGameMode("classic")}
            className={`rounded-full px-6 py-2 font-medium transition-all ${
              gameMode === "classic"
                ? "scale-105 transform bg-green-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Classic Mode
          </button>
          <button
            onClick={() => setGameMode("tycoon")}
            className={`rounded-full px-6 py-2 font-medium transition-all ${
              gameMode === "tycoon"
                ? "scale-105 transform bg-green-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Tycoon Mode
          </button>
        </div>

        <div className="mb-6 grid gap-4">
          {chains.map((chain, index) => (
            <ChainCard
              key={chain.name}
              chain={chain}
              index={index}
              setChains={setChains}
              gameMode={gameMode}
            />
          ))}
        </div>

        <div className="mb-6 rounded-xl bg-gray-800 p-4">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <Package className="h-5 w-5" />
            Game Summary
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-gray-700 p-3 text-center">
              <div className="mb-1 text-xs text-gray-400">Total Tiles</div>
              <div className="text-2xl font-bold">{totalTiles}</div>
            </div>
            <div className="rounded-lg bg-gray-700 p-3 text-center">
              <div className="mb-1 text-xs text-gray-400">Active Chains</div>
              <div className="text-2xl font-bold">{activeChains}</div>
            </div>
            <div className="rounded-lg bg-gray-700 p-3 text-center">
              <div className="mb-1 text-xs text-gray-400">Stock Out</div>
              <div className="text-2xl font-bold">{totalStock}</div>
            </div>
            <div className="rounded-lg bg-gray-700 p-3 text-center">
              <div className="mb-1 text-xs text-gray-400">Safe Chains</div>
              <div className="text-2xl font-bold">{safeChains}</div>
            </div>
          </div>
        </div>

        <button
          onClick={resetGame}
          className="w-full transform rounded-xl bg-red-600 py-4 text-lg font-bold transition-all hover:scale-[1.02] hover:bg-red-700"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};
