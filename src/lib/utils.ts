import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
) {
  let timeoutID: NodeJS.Timeout | undefined;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => fn.apply(this, args), delay);
  };
}
