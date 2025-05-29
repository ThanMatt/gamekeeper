// :: Import all the game components
import { BankerView } from "@/components/react/games/acquire/BankerView";
import { PlayerView } from "@/components/react/games/acquire/PlayerView";
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
};
