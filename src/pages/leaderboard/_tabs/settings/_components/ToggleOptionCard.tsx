import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import OptionCard from "./OptionCard";

function ToggleOptionCard({
    label,
    icon,
    checked,
    onToggle,
    onDoubleClick,
}: {
    label: string;
    icon: IconSvgElement;
    checked: boolean;
    onToggle: () => void;
    onDoubleClick?: () => void;
}) {
    return (
        <OptionCard
            label={label}
            selected={checked}
            onClick={onToggle}
            onDoubleClick={onDoubleClick}>
            <HugeiconsIcon
                icon={icon}
                size="1.6em"
                className={cn(
                    checked ? "text-primary" : "text-muted-foreground/50"
                )}
            />
        </OptionCard>
    );
}

export default ToggleOptionCard;
