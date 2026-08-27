import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HugeiconsIcon } from "@hugeicons/react";
import { GripVerticalIcon } from "@hugeicons/core-free-icons";
import { ReactNode } from "react";
import { useAppSelector } from "@/hooks/redux";
import { Button } from "@/components/ui/button";
import TablePlayerCard from "./TablePlayerCard";

export default function SortablePlayerColumn({
    player,
    children,
}: {
    player: { id: string; name: string };
    children: ReactNode;
}) {
    const isFitEveryoneOn = useAppSelector(
        (state) => state.settings.isFitEveryoneOn
    );
    const showDragHandle = useAppSelector(
        (state) => state.settings.showDragHandle
    );
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: player.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex flex-col gap-2 min-w-0 ${
                isFitEveryoneOn
                    ? "flex-1 basis-0 max-w-44"
                    : "w-44 flex-shrink-0"
            } py-2 ${isDragging ? "z-10 opacity-80" : ""}`}>
            <div className="flex h-10 items-center gap-1">
                {showDragHandle && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Drag to reorder player"
                        className="shrink-0 cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
                        {...attributes}
                        {...listeners}>
                        <HugeiconsIcon icon={GripVerticalIcon} size="1.1em" />
                    </Button>
                )}
                <div className="min-w-0 flex-1">
                    <TablePlayerCard player={player} />
                </div>
            </div>
            {children}
        </div>
    );
}
