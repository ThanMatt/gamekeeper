import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
