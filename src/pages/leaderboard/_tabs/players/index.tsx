import { useState } from "react";
import { Heading } from "@/pages/leaderboard/_components/LeaderBoard";
import MessageTemplate from "@/components/template/MessageTemplate";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addPerson, reorderPersons } from "@/store/features/playerSlice";
import {
    initializePerson,
    reorderPersonScores,
} from "@/store/features/scoreSlice";
import {
    setLastPlayersChangedAt,
    touchPlayersChangedIfNotStarted,
} from "@/store/features/playersMetaSlice";
import { formatEntryTime, toDatetimeLocalValue } from "@/lib/utils";
import { Pencil, UserRoundPlus as AddPersonIcon, Users } from "lucide-react";
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { v4 as uuidv4 } from "uuid";
import SortablePlayerRow from "./_components/SortablePlayerRow";

const PlayersTab = () => {
    const dispatch = useAppDispatch();
    const players = useAppSelector((state) => state.players);
    const isLocked = useAppSelector((state) => state.settings.isLocked);
    const lastPlayersChangedAt = useAppSelector(
        (state) => state.playersMeta.lastPlayersChangedAt
    );
    const [newPlayerName, setNewPlayerName] = useState("");
    const [isEditingStartTime, setIsEditingStartTime] = useState(false);
    const [startTimeInput, setStartTimeInput] = useState("");

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

        const oldIndex = players.findIndex((p) => p.id === active.id);
        const newIndex = players.findIndex((p) => p.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return;

        dispatch(reorderPersons({ oldIndex, newIndex }));
        dispatch(reorderPersonScores({ oldIndex, newIndex }));
        dispatch(touchPlayersChangedIfNotStarted());
    }

    function handleAddPlayer() {
        const name = newPlayerName.trim();
        if (name.length < 2) return;

        const id = uuidv4();
        dispatch(addPerson({ id, name }));
        dispatch(initializePerson(id));
        setNewPlayerName("");
    }

    function beginEditStartTime() {
        setStartTimeInput(
            toDatetimeLocalValue(lastPlayersChangedAt ?? Date.now())
        );
        setIsEditingStartTime(true);
    }

    function saveStartTime() {
        const timestamp = new Date(startTimeInput).getTime();
        if (!isNaN(timestamp)) {
            dispatch(setLastPlayersChangedAt(timestamp));
        }
        setIsEditingStartTime(false);
    }

    return (
        <>
            <Heading icon={Users}>Players</Heading>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAddPlayer();
                }}
                className="mb-4 flex gap-2">
                <Input
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    placeholder="New player name"
                    disabled={isLocked}
                />
                <Button type="submit" disabled={isLocked}>
                    <AddPersonIcon size="1.2em" className="me-1" />
                    Add
                </Button>
            </form>
            {players.length === 0 ? (
                <MessageTemplate
                    title="No players yet"
                    description="Add a player to get started"
                />
            ) : (
                <DndContext
                    sensors={sensors}
                    modifiers={[restrictToVerticalAxis]}
                    onDragEnd={handleDragEnd}>
                    <SortableContext
                        items={players.map((p) => p.id)}
                        strategy={verticalListSortingStrategy}>
                        <div className="flex flex-col gap-2">
                            {players.map((player) => (
                                <SortablePlayerRow
                                    key={player.id}
                                    player={player}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
            <div className="mt-4 flex justify-center text-xs text-muted-foreground">
                {isEditingStartTime ? (
                    <div className="flex items-center gap-2">
                        <input
                            type="datetime-local"
                            value={startTimeInput}
                            onChange={(e) => setStartTimeInput(e.target.value)}
                            className="rounded border border-input bg-background px-2 py-1 text-foreground"
                        />
                        <Button size="sm" onClick={saveStartTime}>
                            Save
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsEditingStartTime(false)}>
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={beginEditStartTime}
                        className="inline-flex items-center gap-1 hover:text-foreground">
                        {lastPlayersChangedAt
                            ? `First game started: ${formatEntryTime(lastPlayersChangedAt)}`
                            : "First game start time not recorded — tap to set"}
                        <Pencil size="0.9em" />
                    </button>
                )}
            </div>
        </>
    );
};

export default PlayersTab;
