import type { BoardGame } from "./content.config";

const BGG_URL = "https://boardgamegeek.com";

export async function fetchBGGGameData(
  gameId: string
): Promise<BoardGame | null> {
  const response = await fetch(`${BGG_URL}/xmlapi2/thing?id=${gameId}&stats=1`);
  const xmlText = await response.text();

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  console.log("🚀 ~ xmlDoc:", xmlDoc);

  const item = xmlDoc.querySelector("item");
  console.log("🚀 ~ item:", item);

  if (!item) return null;
  return {
    id: gameId,
    name:
      item?.querySelector('name[type="primary"]')?.getAttribute("value") ??
      "Name unavailable",
    description:
      item?.querySelector("description")?.textContent ??
      "Description unavailable",
    image: item?.querySelector("image")?.textContent,
    thumbnail: item?.querySelector("thumbnail")?.textContent,
    yearPublished: item?.querySelector("yearpublished")?.getAttribute("value"),
    minPlayers: parseInt(
      item?.querySelector("minplayers")?.getAttribute("value") ?? "0"
    ),
    maxPlayers: parseInt(
      item?.querySelector("maxplayers")?.getAttribute("value") ?? "0"
    ),
    playingTime: parseInt(
      item?.querySelector("playingtime")?.getAttribute("value") ?? "0"
    ),
    rating: parseFloat(
      item
        ?.querySelector("statistics ratings average")
        ?.getAttribute("value") ?? "0"
    ),
    weight: parseFloat(
      item
        ?.querySelector("statistics ratings averageweight")
        ?.getAttribute("value") ?? "0"
    ),
    rank: parseInt(
      item
        ?.querySelector('statistics ratings ranks rank[name="boardgame"]')
        ?.getAttribute("value") ?? "0"
    ),
  };
}
