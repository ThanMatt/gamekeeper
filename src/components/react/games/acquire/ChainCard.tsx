import { Minus, Plus } from "lucide-react";

import { classicPrices } from "./consts";

import type { Chain, Prices, Tier } from "./types";

type ChainCardProps = {
  chain: Chain;
  index: number;
  gameMode: "tycoon" | "classic";
  setChains: React.Dispatch<React.SetStateAction<Chain[]>>;
  onDeductBalance?: (price: number) => void; // :: For non-banker players
  playerBalance?: number;
};

export const ChainCard = ({
  chain,
  index,
  gameMode,
  setChains,
  onDeductBalance,
  playerBalance,
}: ChainCardProps) => {
  const getPrice = (tier: Tier, tiles: Prices) => {
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

  const formatPrice = (price: number) => {
    if (gameMode === "classic") {
      return `$${price.toLocaleString()}`;
    } else {
      return `$${price / 1000}K`;
    }
  };

  const getTierName = (tier: Tier) => {
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

  const modifyTiles = (index: number, delta: number) => {
    setChains((prevChains) => {
      const newChains = [...prevChains];
      const chain = newChains[index];
      chain.tiles = Math.max(0, Math.min(41, chain.tiles + delta)) as Prices;
      chain.active = chain.tiles > 0;
      chain.safe = chain.tiles >= 11;
      return newChains;
    });
  };

  const modifyStock = (index: number, delta: number) => {
    setChains((prevChains) => {
      const newChains = [...prevChains];
      newChains[index].stock = Math.max(
        0,
        Math.min(25, newChains[index].stock + delta)
      );
      return newChains;
    });
  };

  const toggleActive = (index: number) => {
    setChains((prevChains) => {
      const newChains = [...prevChains];
      if (newChains[index].tiles > 0) {
        newChains[index].active = !newChains[index].active;
      }
      return newChains;
    });
  };
  const stockPrice = getPrice(chain.tier, chain.tiles);
  const majorityBonus = stockPrice * 10;
  const minorityBonus = stockPrice * 5;
  const isYellow = chain.name === "Tower";
  const textColor = isYellow ? "text-gray-900" : "text-white";

  const boughtStocks = 25 - chain.stock;

  const isDisabled =
    !chain.active ||
    chain.stock === 0 ||
    (playerBalance !== undefined &&
      (playerBalance <= 0 || playerBalance < stockPrice));

  const buyStock = (index: number) => {
    if (!isDisabled) {
      setChains((prevChains) => {
        const newChains = [...prevChains];
        newChains[index].stock = Math.max(
          0,
          Math.min(25, newChains[index].stock - 1)
        );

        if (onDeductBalance) {
          onDeductBalance(
            getPrice(newChains[index].tier, newChains[index].tiles)
          );
        }
        return newChains;
      });
    }
  };

  return (
    <div
      className={`${chain.color} transform rounded-xl p-4 shadow-lg transition-all duration-200 hover:scale-[1.02] ${chain.safe ? "ring-4 ring-green-400" : ""}`}
    >
      <div className={`mb-1 text-center text-xs opacity-60 ${textColor}`}>
        {getTierName(chain.tier)} Chain
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h3 className={`text-lg font-bold ${textColor}`}>{chain.name}</h3>
        <span className="flex gap-4">
          <span
            className={`rounded-md px-2 py-1 text-xs font-medium ${isYellow ? "bg-gray-900/20" : "bg-white/20"} ${textColor}`}
          >
            {boughtStocks} bought {boughtStocks === 1 ? "stock" : "stocks"}
          </span>
          <span
            className={`rounded-md px-2 py-1 text-xs font-medium ${isYellow ? "bg-gray-900/20" : "bg-white/20"} ${textColor}`}
          >
            {chain.tiles >= 41
              ? "MAX"
              : chain.tiles >= 11
                ? "SAFE"
                : `${chain.tiles} tiles`}
          </span>
        </span>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <div
          className={`${isYellow ? "bg-gray-900/20" : "bg-black/30"} rounded-lg p-2 text-center`}
        >
          <div className={`text-xs opacity-80 ${textColor}`}>Tiles</div>
          <div className={`text-xl font-bold ${textColor}`}>{chain.tiles}</div>
        </div>
        <div
          className={`${isYellow ? "bg-gray-900/20" : "bg-black/30"} rounded-lg p-2 text-center`}
        >
          <div className={`text-xs opacity-80 ${textColor}`}>Stock Left</div>
          <div className={`text-xl font-bold ${textColor}`}>{chain.stock}</div>
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
              <div className={`text-xs opacity-70 ${textColor}`}>Majority</div>
              <div
                className={`text-sm font-bold text-green-${isYellow ? "700" : "400"}`}
              >
                {formatPrice(majorityBonus)}
              </div>
            </div>
            <div className="text-center">
              <div className={`text-xs opacity-70 ${textColor}`}>Minority</div>
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
            onClick={() => buyStock(index)}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
              chain.active && chain.stock > 0
                ? isYellow
                  ? "bg-gray-900/30 hover:bg-gray-900/40"
                  : "bg-white/30 hover:bg-white/40"
                : isYellow
                  ? "bg-gray-900/10"
                  : "bg-white/10"
            } ${textColor} ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
          >
            Buy Stock
          </button>
        </div>
      </div>
    </div>
  );
};
