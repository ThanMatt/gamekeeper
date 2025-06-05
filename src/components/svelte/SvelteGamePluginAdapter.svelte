<script lang="ts">
	import type { BoardGamePluginManifest } from "@/types";
	import { filterByFramework } from "@/lib/utils";
	
	type SvelteGamePluginAdapterProps = {
		plugin: BoardGamePluginManifest;
	};
	
	let { plugin }: SvelteGamePluginAdapterProps = $props();
	
	// Get plugin components
	const PLUGIN_COMPONENTS = filterByFramework("svelte");
	
	// Use $derived for reactive component selection
	let ActiveComponent = $derived(
		PLUGIN_COMPONENTS[plugin.componentId]?.component
	);
	
	// Optional: Add error handling
	let hasValidComponent = $derived(!!ActiveComponent);
</script>

<div>
	<div>
		{#if hasValidComponent}
			<ActiveComponent />
		{:else}
			<p>Component not found for plugin: {plugin.componentId}</p>
		{/if}
	</div>
</div>
