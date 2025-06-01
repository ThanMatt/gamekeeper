// :: Import all the game components
import { BankerView } from "@/components/react/games/acquire/BankerView/BankerView";
import { PlayerView } from "@/components/react/games/acquire/PlayerView";
import ChessPlayerView from "@/components/svelte/games/chess/PlayerView.svelte";
import type { Components, ComponentRegistryEntry } from "@/types";

export const COMPONENT_REGISTRY: Record<Components, ComponentRegistryEntry> = {
  "acquire-banking-assistant": {
    component: BankerView,
    framework: "react",
  },
  "acquire-player-assistant": {
    component: PlayerView,
    framework: "react",
  },
  "chess-player-assistant": {
    component: ChessPlayerView,
    framework: "svelte",
  },
};
