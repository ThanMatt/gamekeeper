import { filterByFramework } from "@/lib/utils";
import type { BoardGamePluginManifest } from "@/content.config";

const PLUGIN_COMPONENTS = filterByFramework("react");

type ReactGamePluginAdapterProps = {
  plugin: BoardGamePluginManifest;
};

export const ReactGamePluginAdapter = ({
  plugin,
}: ReactGamePluginAdapterProps) => {
  const ActiveComponent = PLUGIN_COMPONENTS[plugin.componentId]?.component;

  return (
    <div className="plugin-router">
      {/* :: Active plugin */}
      <div className="plugin-content">
        {ActiveComponent ? (
          <div>
            <ActiveComponent />
          </div>
        ) : (
          <div className="text-red-500">Plugin not found</div>
        )}
      </div>
    </div>
  );
};
