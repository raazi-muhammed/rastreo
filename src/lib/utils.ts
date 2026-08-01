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

export function arrayMove<T>(array: T[], from: number, to: number): T[] {
    const updated = array.slice();
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    return updated;
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
