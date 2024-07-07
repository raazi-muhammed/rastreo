import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Trash2 as DeleteIcon } from "lucide-react";
import { Label } from "../ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
    deletePersonScores,
    movePersonScoresLeft,
    movePersonScoresRight,
} from "@/store/features/scoreSlice";
import {
    deletePerson,
    editPerson,
    movePersonLeft,
    movePersonRight,
} from "@/store/features/playerSlice";

export default function TablePlayerCard({
    player,
}: {
    player: { id: string; name: string };
}) {
    const [inputPerson, setInputPerson] = useState<string>("");
    const dispatch = useAppDispatch();
    const isTouchModeOn = useAppSelector(
        (state) => state.settings.isTouchModeOn
    );

    function handleDeletePerson(userId: string) {
        dispatch(deletePersonScores(userId));
        dispatch(deletePerson(userId));
    }
    function handleChangePersonName(userId: string, name: string) {
        dispatch(editPerson({ id: userId, name: name }));
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-10 w-full rounded"
                    onClick={() => setInputPerson(player.name)}>
                    <p className="w-full text-start text-xl font-semibold">
                        {player.name}
                    </p>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                onOpenAutoFocus={
                    isTouchModeOn
                        ? (e) => {
                              e.preventDefault();
                          }
                        : () => {}
                }>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleChangePersonName(player.id, inputPerson);
                    }}>
                    <Label>Change player name</Label>
                    <Input
                        value={inputPerson}
                        onChange={(e) => setInputPerson(e.target.value)}
                        placeholder="name"
                    />
                    <div className="mt-3 flex justify-end gap-2">
                        <div className="flex gap-1">
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => {
                                    dispatch(movePersonLeft(player.id));
                                    dispatch(movePersonScoresLeft(player.id));
                                }}>
                                <ChevronLeft size="1.3em" />
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    dispatch(movePersonRight(player.id));
                                    dispatch(movePersonScoresRight(player.id));
                                }}>
                                <ChevronRight size="1.3em" />
                            </Button>
                        </div>
                        <Button
                            variant="destructive"
                            type="button"
                            onClick={() => handleDeletePerson(player.id)}>
                            <DeleteIcon size="1.2em" />
                        </Button>
                        <Button>Change</Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
