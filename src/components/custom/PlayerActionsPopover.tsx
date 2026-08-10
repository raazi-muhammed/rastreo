import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { EyeOff as HideIcon, Trash2 as DeleteIcon } from "lucide-react";
import { Label } from "../ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { deletePersonScores } from "@/store/features/scoreSlice";
import {
    deletePerson,
    editPerson,
    setPlayerHidden,
} from "@/store/features/playerSlice";
import {
    touchPlayersChangedIfNotStarted,
    touchPlayersModified,
} from "@/store/features/playersMetaSlice";
import { PlayerChart } from "../charts/PlayerChart";

export default function PlayerActionsPopover({
    player,
    children,
    side = "bottom",
}: {
    player: { id: string; name: string };
    children: ReactNode;
    side?: "top" | "right" | "bottom" | "left";
}) {
    const [inputPerson, setInputPerson] = useState<string>(player.name);
    const dispatch = useAppDispatch();
    const isTouchModeOn = useAppSelector(
        (state) => state.settings.isTouchModeOn
    );

    function handleDeletePerson(userId: string) {
        dispatch(deletePersonScores(userId));
        dispatch(deletePerson(userId));
        dispatch(touchPlayersModified());
    }
    function handleHidePerson(userId: string) {
        dispatch(setPlayerHidden({ id: userId, hidden: true }));
        dispatch(touchPlayersModified());
    }
    function handleChangePersonName(userId: string, name: string) {
        dispatch(editPerson({ id: userId, name: name }));
        dispatch(touchPlayersChangedIfNotStarted());
        dispatch(touchPlayersModified());
    }

    return (
        <Popover
            onOpenChange={(open) => {
                if (open) setInputPerson(player.name);
            }}>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent
                side={side}
                align="start"
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
                    <PlayerChart player={player} />
                    <Label>Change player name</Label>
                    <Input
                        value={inputPerson}
                        onChange={(e) => setInputPerson(e.target.value)}
                        placeholder="name"
                    />
                    <div className="mt-3 flex justify-end gap-2">
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => handleHidePerson(player.id)}>
                            <HideIcon size="1.2em" />
                        </Button>
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
