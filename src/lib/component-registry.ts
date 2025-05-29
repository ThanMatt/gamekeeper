// :: Import all the game components
import { BankerView } from "@/components/react/games/acquire/BankerView";
import { PlayerView } from "@/components/react/games/acquire/PlayerView";
import { Components, type ComponentRegistryEntry } from "@/types";

export const COMPONENT_REGISTRY: Record<Components, ComponentRegistryEntry> = {
  [Components.ACQUIRE_BANKING_ASSISTANT]: {
    component: BankerView,
    framework: "react",
  },
  [Components.ACQUIRE_PLAYER_ASSISTANT]: {
    component: PlayerView,
    framework: "react",
  },
};
