import { XMLParser } from "fast-xml-parser";
import { EMPTY_BOARD_GAME_DATA } from "./lib/consts";
import type { BoardGameData } from "./types";

const BGG_URL = "https://boardgamegeek.com";

export async function fetchBGGGameData(
  gameId: string
): Promise<BoardGameData | null> {
  try {
    const response = await fetch(
      `${BGG_URL}/xmlapi2/thing?id=${gameId}&stats=1`
    );
    const xmlText = await response.text();

    if (
      xmlText.includes("Your request for this information has been accepted")
    ) {
      console.log("🚀 ~ BGG API rate limited");
      return null;
    }

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    });
    const result = parser.parse(xmlText);

    const item = result.items?.item;

    if (!item) return null;
    return {
      id: gameId,
      name: Array.isArray(item.name)
        ? item.name.find((n: any) => n["@_type"] === "primary")?.["@_value"] ??
          "Name unavailable"
        : item.name?.["@_value"] ?? "Name unavailable",
      description: item.description ?? "Description unavailable",
      image: item.image,
      thumbnail: item.thumbnail,
      yearPublished: item.yearpublished?.["@_value"],
      minPlayers: parseInt(item.minplayers?.["@_value"] ?? "0"),
      maxPlayers: parseInt(item.maxplayers?.["@_value"] ?? "0"),
      playingTime: parseInt(item.playingtime?.["@_value"] ?? "0"),
      rating: parseFloat(item.statistics?.ratings?.average?.["@_value"] ?? "0"),
      weight: parseFloat(
        item.statistics?.ratings?.averageweight?.["@_value"] ?? "0"
      ),
      rank: parseInt(
        Array.isArray(item.statistics?.ratings?.ranks?.rank)
          ? item.statistics.ratings.ranks.rank.find(
              (r: any) => r["@_name"] === "boardgame"
            )?.["@_value"] ?? "0"
          : item.statistics?.ratings?.ranks?.rank?.["@_value"] ?? "0"
      ),
      usersRated: parseFloat(
        item.statistics?.ratings?.usersrated?.["@_value"] ?? "0"
      ),
    };
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return {
      ...EMPTY_BOARD_GAME_DATA,
      id: gameId,
    };
  }
}
