import { cn } from "@/lib/utils";
import React from "react";

export interface DataGridProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  emptyContent?: string | React.ReactNode;
  gridClassName?: string;
  gridCols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  gridGap?: number | string;
}

/**
 * :: Astro doesn't like this component because of renderItem prop
 * TODO: Find a way to make this work with Astro
 */

export const DataGrid = <T extends object>({
  data,
  renderItem,
  keyExtractor,
  emptyContent = "No data found...",
  gridClassName,
  gridCols = {
    default: 1,
    md: 3,
    lg: 4,
  },
  gridGap = 6,
}: DataGridProps<T>) => {
  return (
    <div>
      <div
        className={cn(
          "grid",
          gridCols.default ? `grid-cols-${gridCols.default}` : "",
          gridCols.sm ? `sm:grid-cols-${gridCols.sm}` : "",
          gridCols.md ? `md:grid-cols-${gridCols.md}` : "",
          gridCols.lg ? `lg:grid-cols-${gridCols.lg}` : "",
          gridCols["2xl"] ? `2xl:grid-cols-${gridCols["2xl"]}` : "",
          gridGap ? `gap-${gridGap}` : "",
          gridClassName
        )}
      >
        {data.length ? (
          data.map((item, index) => (
            <div key={keyExtractor ? keyExtractor(item, index) : index}>
              {renderItem(item, index)}
            </div>
          ))
        ) : typeof emptyContent === "string" ? (
          <div className="text-gray-500">{emptyContent}</div>
        ) : (
          emptyContent
        )}
      </div>
    </div>
  );
};
