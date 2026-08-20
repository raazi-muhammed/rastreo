import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HugeiconsIcon } from "@hugeicons/react";
import { GripVerticalIcon } from "@hugeicons/core-free-icons";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch } from "@/hooks/redux";
import { setPlayerHidden } from "@/store/features/playerSlice";

export default function SortablePlayerRow({
    player,
}: {
    player: { id: string; name: string; hidden?: boolean };
}) {
    const dispatch = useAppDispatch();
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
        <section
            ref={setNodeRef}
            style={style}
            className={`flex items-center justify-between gap-4 rounded bg-card p-3 ${
                isDragging ? "z-10 opacity-80" : ""
            }`}>
            <div className="flex min-w-0 items-center gap-2">
                <button
                    type="button"
                    aria-label="Drag to reorder player"
                    className="shrink-0 cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
                    {...attributes}
                    {...listeners}>
                    <HugeiconsIcon icon={GripVerticalIcon} size="1.1em" />
                </button>
                <p className="truncate">{player.name}</p>
            </div>
            <Switch
                checked={!player.hidden}
                onCheckedChange={(checked) => {
                    dispatch(
                        setPlayerHidden({ id: player.id, hidden: !checked })
                    );
                }}
            />
        </section>
    );
}
