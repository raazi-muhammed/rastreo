import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatNumber(number: string | number) {
    if (!number) return "0";
    if (isNaN(Number(number))) return "0";
    return Number(number).toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function swapItems(array: any[], i: number, j: number) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return array;
}

export function calculateNumber(number: string) {
    return Number(number.replace(/^0+(?=\d)/, ""));
}

export function removeLeadingZeros(number: string) {
    return number.replace(/^0+(?=\d)/, "");
}
