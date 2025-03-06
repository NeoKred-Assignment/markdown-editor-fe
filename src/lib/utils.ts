import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...params: unknown[]) => void>(
  fn: T,
  delay: number
) {
  let timeoutID: NodeJS.Timeout | undefined;

  return function (...params: Parameters<T>) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => fn(...params), delay);
  };
}
