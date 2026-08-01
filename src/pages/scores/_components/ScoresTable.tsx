import ScoreAnimation from "@/components/animations/ScoreAnimation";
import AddScore from "@/components/custom/AddScore";
import SortablePlayerColumn from "@/components/custom/SortablePlayerColumn";
import TableScoreCard from "@/components/custom/TableScoreCard";
import { useAppDispatch } from "@/hooks/redux";
import useVisiblePlayers from "@/hooks/useVisiblePlayers";
import { reorderPersons } from "@/store/features/playerSlice";
import { touchPlayersChangedIfNotStarted } from "@/store/features/playersMetaSlice";
import { reorderPersonScores } from "@/store/features/scoreSlice";
import { AnimatePresence } from "framer-motion";
import {
    DndContext,
    DragEndEvent,
    PointerSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";

const ScoresTable = () => {
    const dispatch = useAppDispatch();
    const { players, scores, allPlayers } = useVisiblePlayers();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = allPlayers.findIndex((p) => p.id === active.id);
        const newIndex = allPlayers.findIndex((p) => p.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return;

        dispatch(reorderPersons({ oldIndex, newIndex }));
        dispatch(reorderPersonScores({ oldIndex, newIndex }));
        dispatch(touchPlayersChangedIfNotStarted());
    }

    return (
        <DndContext
            sensors={sensors}
            modifiers={[restrictToHorizontalAxis]}
            onDragEnd={handleDragEnd}>
            <SortableContext
                items={players.map((p) => p.id)}
                strategy={horizontalListSortingStrategy}>
                {players.map((player, i) => (
                    <SortablePlayerColumn key={player.id} player={player}>
                        <AnimatePresence initial={false}>
                            {scores[i].scores.map((score, index) => (
                                <ScoreAnimation>
                                    <TableScoreCard
                                        score={score.val}
                                        personId={scores[i].id}
                                        index={index}
                                    />
                                </ScoreAnimation>
                            ))}
                        </AnimatePresence>
                        {scores[i].scores.length === 0 && (
                            <div className="grid h-12 w-full place-items-center rounded-xs bg-card opacity-50">
                                <p className="my-auto text-xs text-card-foreground">
                                    No score yet
                                </p>
                            </div>
                        )}
                        <AddScore playerId={scores[i].id} />
                    </SortablePlayerColumn>
                ))}
            </SortableContext>
        </DndContext>
    );
};

export default ScoresTable;
