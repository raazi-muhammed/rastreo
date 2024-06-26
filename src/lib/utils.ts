import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatNumber(number: number) {
    return number.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function swapItems(array: any[], i: number, j: number) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return array;
}
