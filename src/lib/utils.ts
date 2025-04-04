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
    const sanitizedNumber = Number(
        eval(removeTrailingOperators(removeLeadingZeros(number)))
    );
    if (isNaN(sanitizedNumber)) return 0;
    return sanitizedNumber;
}

export function removeLeadingZeros(number: string) {
    if (number == "0") return "0";
    return number.replace(/^0+(?=\d)/, "");
}

export function removeTrailingOperators(number: string) {
    return number.replace(/[+\-*/]+$/, "");
}
