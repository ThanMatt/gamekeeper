<template>
  <component
    v-if="ActiveComponent"
    :is="ActiveComponent"
    :key="plugin.componentId"
  />
  <div v-else class="text-red-500">
    Plugin not found: {{ plugin.componentId }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { BoardGamePluginManifest } from "@/content.config";
import { filterByFramework } from "@/lib/utils";

// :: Define props
interface Props {
  plugin: BoardGamePluginManifest;
}

const props = defineProps<Props>();

// :: Get Vue-specific components from the registry
const PLUGIN_COMPONENTS = filterByFramework("vue");

// :: Compute the active component
const ActiveComponent = computed(() => {
  return PLUGIN_COMPONENTS[props.plugin.componentId]?.component;
});
</script>
