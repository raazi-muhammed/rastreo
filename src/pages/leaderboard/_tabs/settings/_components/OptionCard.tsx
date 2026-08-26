import { HugeiconsIcon } from "@hugeicons/react";
import { CheckIcon } from "@hugeicons/core-free-icons";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

function OptionCard({
    label,
    selected,
    onClick,
    children,
}: {
    label: string;
    selected: boolean;
    onClick: () => void;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex flex-col items-center gap-2">
            <div
                className={cn(
                    "relative flex h-16 w-full items-center justify-center overflow-hidden rounded-xl border-2 bg-card",
                    selected
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/30"
                )}>
                {children}
                {selected && (
                    <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <HugeiconsIcon icon={CheckIcon} size="0.65em" />
                    </span>
                )}
            </div>
            <span className="text-xs text-muted-foreground">{label}</span>
        </button>
    );
}

export default OptionCard;
