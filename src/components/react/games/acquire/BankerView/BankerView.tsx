import { useEffect, useState } from "react";

import { TrendingUp, Package } from "lucide-react";

import { ChainCard } from "../ChainCard";
import { createInitialChains } from "../consts";

import type { Chain } from "../types";

const STORAGE_KEY = "acquire-banker-view-state";

interface GameState {
  chains: Chain[];
  gameMode: "classic" | "tycoon";
}

export const BankerView = () => {
  const [gameMode, setGameMode] = useState<"classic" | "tycoon">("classic");
  const [chains, setChains] = useState(createInitialChains);

  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState: GameState = JSON.parse(savedState);
        setChains(parsedState.chains);
        setGameMode(parsedState.gameMode);
      }
    } catch (error) {
      console.warn("Failed to load saved game state: ", error);
    }
  }, []);

  useEffect(() => {
    try {
      const gameState: GameState = {
        chains,
        gameMode,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (error) {
      console.warn("Failed to save game state: ", error);
    }
  }, [chains, gameMode]);

  const resetGame = () => {
    if (confirm("Reset all game data?")) {
      setChains(createInitialChains());
      setGameMode("classic");

      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.warn("Failed to clear saved game state: ", error);
      }
    }
  };

  // Calculate summary stats
  const totalTiles = chains.reduce((sum, chain) => sum + chain.tiles, 0);
  const activeChains = chains.filter((chain) => chain.active).length;
  const totalStock = chains.reduce((sum, chain) => sum + (25 - chain.stock), 0);
  const safeChains = chains.filter((chain) => chain.safe).length;

  return (
    <div className="min-h-screen p-4 text-white">
      <div className="mx-auto">
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

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
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
