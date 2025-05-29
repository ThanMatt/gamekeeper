import { useState } from "react";
import { Plus, Minus, TrendingUp, Package } from "lucide-react";

enum Tier {
  BUDGET = "budget",
  STANDARD = "standard",
  PREMIUM = "premium",
}

export const BankerView = () => {
  const [gameMode, setGameMode] = useState("classic");

  const initialChains = [
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

  // Price tables
  const classicPrices = {
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

  const getPrice = (tier, tiles: number) => {
    if (tiles < 2) return 0;
    const tierPrices = classicPrices[tier];
    const multiplier = gameMode === "tycoon" ? 10 : 1;

    if (tiles >= 41) return tierPrices[41] * multiplier;
    if (tiles >= 31) return tierPrices[31] * multiplier;
    if (tiles >= 21) return tierPrices[21] * multiplier;
    if (tiles >= 11) return tierPrices[11] * multiplier;
    if (tiles >= 6) return tierPrices[6] * multiplier;
    return (tierPrices[tiles] || tierPrices[2]) * multiplier;
  };

  const formatPrice = (price) => {
    if (gameMode === "classic") {
      return `$${price.toLocaleString()}`;
    } else {
      return `$${price / 1000}K`;
    }
  };

  const getTierName = (tier) => {
    switch (tier) {
      case 1:
        return "Budget";
      case 2:
        return "Standard";
      case 3:
        return "Premium";
      default:
        return "";
    }
  };

  const modifyTiles = (index, delta) => {
    setChains((prevChains) => {
      const newChains = [...prevChains];
      const chain = newChains[index];
      chain.tiles = Math.max(0, Math.min(41, chain.tiles + delta));
      chain.active = chain.tiles > 0;
      chain.safe = chain.tiles >= 11;
      return newChains;
    });
  };

  const modifyStock = (index, delta) => {
    setChains((prevChains) => {
      const newChains = [...prevChains];
      newChains[index].stock = Math.max(
        0,
        Math.min(25, newChains[index].stock + delta)
      );
      return newChains;
    });
  };

  const toggleActive = (index) => {
    setChains((prevChains) => {
      const newChains = [...prevChains];
      if (newChains[index].tiles > 0) {
        newChains[index].active = !newChains[index].active;
      }
      return newChains;
    });
  };

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

  const ChainCard = ({ chain, index }) => {
    const stockPrice = getPrice(chain.tier, chain.tiles);
    const majorityBonus = stockPrice * 10;
    const minorityBonus = stockPrice * 5;
    const isYellow = chain.name === "Tower";
    const textColor = isYellow ? "text-gray-900" : "text-white";

    return (
      <div
        className={`${chain.color} transform rounded-xl p-4 shadow-lg transition-all duration-200 hover:scale-[1.02] ${chain.safe ? "ring-4 ring-green-400" : ""}`}
      >
        <div className={`mb-1 text-center text-xs opacity-60 ${textColor}`}>
          {getTierName(chain.tier)} Chain
        </div>

        <div className="mb-3 flex items-center justify-between">
          <h3 className={`text-lg font-bold ${textColor}`}>{chain.name}</h3>
          <span
            className={`rounded-md px-2 py-1 text-xs font-medium ${isYellow ? "bg-gray-900/20" : "bg-white/20"} ${textColor}`}
          >
            {chain.tiles >= 11
              ? "SAFE"
              : chain.tiles >= 41
                ? "MAX"
                : `${chain.tiles} tiles`}
          </span>
        </div>

        <div className="mb-3 grid grid-cols-2 gap-2">
          <div
            className={`${isYellow ? "bg-gray-900/20" : "bg-black/30"} rounded-lg p-2 text-center`}
          >
            <div className={`text-xs opacity-80 ${textColor}`}>Tiles</div>
            <div className={`text-xl font-bold ${textColor}`}>
              {chain.tiles}
            </div>
          </div>
          <div
            className={`${isYellow ? "bg-gray-900/20" : "bg-black/30"} rounded-lg p-2 text-center`}
          >
            <div className={`text-xs opacity-80 ${textColor}`}>Stock Left</div>
            <div className={`text-xl font-bold ${textColor}`}>
              {chain.stock}
            </div>
          </div>
        </div>

        {chain.tiles >= 2 ? (
          <div
            className={`${isYellow ? "bg-gray-900/20" : "bg-black/20"} mb-3 rounded-lg p-2`}
          >
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className={`text-xs opacity-70 ${textColor}`}>Share</div>
                <div
                  className={`text-sm font-bold text-green-${isYellow ? "700" : "400"}`}
                >
                  {formatPrice(stockPrice)}
                </div>
              </div>
              <div className="text-center">
                <div className={`text-xs opacity-70 ${textColor}`}>
                  Majority
                </div>
                <div
                  className={`text-sm font-bold text-green-${isYellow ? "700" : "400"}`}
                >
                  {formatPrice(majorityBonus)}
                </div>
              </div>
              <div className="text-center">
                <div className={`text-xs opacity-70 ${textColor}`}>
                  Minority
                </div>
                <div
                  className={`text-sm font-bold text-green-${isYellow ? "700" : "400"}`}
                >
                  {formatPrice(minorityBonus)}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`flex h-16 items-center justify-center ${textColor} text-xs opacity-50`}
          >
            Chain needs 2+ tiles for value
          </div>
        )}

        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              onClick={() => modifyTiles(index, -1)}
              className={`flex-1 rounded-lg py-2 font-medium transition-all ${
                isYellow
                  ? "bg-gray-900/20 hover:bg-gray-900/30"
                  : "bg-white/20 hover:bg-white/30"
              } ${textColor}`}
            >
              <Minus className="mx-auto h-4 w-4" />
            </button>
            <button
              onClick={() => modifyTiles(index, 1)}
              className={`flex-1 rounded-lg py-2 font-medium transition-all ${
                isYellow
                  ? "bg-gray-900/30 hover:bg-gray-900/40"
                  : "bg-white/30 hover:bg-white/40"
              } ${textColor}`}
            >
              <Plus className="mx-auto h-4 w-4" />
            </button>
            <button
              onClick={() => toggleActive(index)}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                chain.active
                  ? isYellow
                    ? "bg-gray-900/40"
                    : "bg-white/40"
                  : isYellow
                    ? "bg-gray-900/20"
                    : "bg-white/20"
              } ${textColor}`}
            >
              {chain.active ? "Active" : "Inactive"}
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => modifyStock(index, 1)}
              className={`flex-1 rounded-lg py-2 font-medium transition-all ${
                isYellow
                  ? "bg-gray-900/20 hover:bg-gray-900/30"
                  : "bg-white/20 hover:bg-white/30"
              } ${textColor}`}
            >
              <Minus className="mx-auto h-4 w-4" />
            </button>
            <button
              onClick={() => modifyStock(index, -1)}
              className={`flex-1 rounded-lg py-2 font-medium transition-all ${
                isYellow
                  ? "bg-gray-900/30 hover:bg-gray-900/40"
                  : "bg-white/30 hover:bg-white/40"
              } ${textColor}`}
            >
              <Plus className="mx-auto h-4 w-4" />
            </button>
            <button
              onClick={() =>
                chain.active && chain.stock > 0 && modifyStock(index, -1)
              }
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                chain.active && chain.stock > 0
                  ? isYellow
                    ? "bg-gray-900/30 hover:bg-gray-900/40"
                    : "bg-white/30 hover:bg-white/40"
                  : isYellow
                    ? "bg-gray-900/10"
                    : "bg-white/10"
              } ${textColor} ${!chain.active || chain.stock === 0 ? "cursor-not-allowed opacity-50" : ""}`}
            >
              Buy Stock
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 text-white">
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
            <ChainCard key={chain.name} chain={chain} index={index} />
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
