import { useState } from "react";
import { Plus, Minus, TrendingUp, Package } from "lucide-react";

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

  const getPrice = (tier, tiles) => {
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
        Math.min(25, newChains[index].stock + delta),
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
        className={`${chain.color} rounded-xl p-4 shadow-lg transform transition-all duration-200 hover:scale-[1.02] ${chain.safe ? "ring-4 ring-green-400" : ""}`}
      >
        <div className={`text-xs opacity-60 text-center mb-1 ${textColor}`}>
          {getTierName(chain.tier)} Chain
        </div>

        <div className="flex justify-between items-center mb-3">
          <h3 className={`text-lg font-bold ${textColor}`}>{chain.name}</h3>
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${isYellow ? "bg-gray-900/20" : "bg-white/20"} ${textColor}`}
          >
            {chain.tiles >= 11
              ? "SAFE"
              : chain.tiles >= 41
                ? "MAX"
                : `${chain.tiles} tiles`}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
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
            className={`${isYellow ? "bg-gray-900/20" : "bg-black/20"} rounded-lg p-2 mb-3`}
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
            className={`h-16 flex items-center justify-center ${textColor} opacity-50 text-xs`}
          >
            Chain needs 2+ tiles for value
          </div>
        )}

        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              onClick={() => modifyTiles(index, -1)}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                isYellow
                  ? "bg-gray-900/20 hover:bg-gray-900/30"
                  : "bg-white/20 hover:bg-white/30"
              } ${textColor}`}
            >
              <Minus className="w-4 h-4 mx-auto" />
            </button>
            <button
              onClick={() => modifyTiles(index, 1)}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                isYellow
                  ? "bg-gray-900/30 hover:bg-gray-900/40"
                  : "bg-white/30 hover:bg-white/40"
              } ${textColor}`}
            >
              <Plus className="w-4 h-4 mx-auto" />
            </button>
            <button
              onClick={() => toggleActive(index)}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-xs transition-all ${
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
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                isYellow
                  ? "bg-gray-900/20 hover:bg-gray-900/30"
                  : "bg-white/20 hover:bg-white/30"
              } ${textColor}`}
            >
              <Minus className="w-4 h-4 mx-auto" />
            </button>
            <button
              onClick={() => modifyStock(index, -1)}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                isYellow
                  ? "bg-gray-900/30 hover:bg-gray-900/40"
                  : "bg-white/30 hover:bg-white/40"
              } ${textColor}`}
            >
              <Plus className="w-4 h-4 mx-auto" />
            </button>
            <button
              onClick={() =>
                chain.active && chain.stock > 0 && modifyStock(index, -1)
              }
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-xs transition-all ${
                chain.active && chain.stock > 0
                  ? isYellow
                    ? "bg-gray-900/30 hover:bg-gray-900/40"
                    : "bg-white/30 hover:bg-white/40"
                  : isYellow
                    ? "bg-gray-900/10"
                    : "bg-white/10"
              } ${textColor} ${!chain.active || chain.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Buy Stock
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4 flex items-center justify-center gap-2">
          <TrendingUp className="w-8 h-8" />
          Acquire Banker Assistant
        </h1>

        <div className="flex justify-center mb-6 gap-3">
          <button
            onClick={() => setGameMode("classic")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              gameMode === "classic"
                ? "bg-green-500 text-white transform scale-105"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Classic Mode
          </button>
          <button
            onClick={() => setGameMode("tycoon")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              gameMode === "tycoon"
                ? "bg-green-500 text-white transform scale-105"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Tycoon Mode
          </button>
        </div>

        <div className="grid gap-4 mb-6">
          {chains.map((chain, index) => (
            <ChainCard key={chain.name} chain={chain} index={index} />
          ))}
        </div>

        <div className="bg-gray-800 rounded-xl p-4 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Game Summary
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-700 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400 mb-1">Total Tiles</div>
              <div className="text-2xl font-bold">{totalTiles}</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400 mb-1">Active Chains</div>
              <div className="text-2xl font-bold">{activeChains}</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400 mb-1">Stock Out</div>
              <div className="text-2xl font-bold">{totalStock}</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400 mb-1">Safe Chains</div>
              <div className="text-2xl font-bold">{safeChains}</div>
            </div>
          </div>
        </div>

        <button
          onClick={resetGame}
          className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02]"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};
