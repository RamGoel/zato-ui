import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const themes = [
  { name: "light", label: "Light" },
  { name: "dark", label: "Dark" },
] as const;

export type Theme = (typeof themes)[number]["name"];
