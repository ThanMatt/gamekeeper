import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { COMPONENT_REGISTRY } from "./component-registry";
import type { ComponentRegistryEntry, Components, Framework } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * :: Converts an array of strings or numbers into a single URL-friendly slug
 * @param items - Array of strings or numbers to slugify
 * @returns Single slugified string combining all items
 */
export function slugify(...items: (string | number)[]): string {
  return items
    .map((item) => String(item))
    .join(" ")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * :: Filters component registry by framework
 * @param framework - Accepts react, svelte, vue, or astro
 * @returns Filtered components for that framework
 */
export function filterByFramework(framework: Framework) {
  return Object.fromEntries(
    Object.entries(COMPONENT_REGISTRY).filter(([, value]) => {
      return value.framework === framework;
    })
  ) as Record<Components, ComponentRegistryEntry>;
}
