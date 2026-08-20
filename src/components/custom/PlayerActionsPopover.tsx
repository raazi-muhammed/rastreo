import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { EyeOffIcon as HideIcon, Delete02Icon as DeleteIcon } from "@hugeicons/core-free-icons";
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
import useLeaderBoardData from "@/hooks/useLeaderBoardData";
import { formatNumber } from "@/lib/utils";

function StatTile({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-md bg-muted px-2 py-1.5">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                {label}
            </p>
            <p className="text-sm font-semibold">{value}</p>
        </div>
    );
}

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
    const leaderBoardData = useLeaderBoardData();
    const rank = leaderBoardData.findIndex((item) =>
        item.players.some((p) => p.id === player.id)
    );
    const stats = rank >= 0 ? leaderBoardData[rank] : undefined;

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
                    {stats && (
                        <div className="mb-3 grid grid-cols-2 gap-2">
                            <StatTile
                                label="Total"
                                value={formatNumber(stats.sum)}
                            />
                            <StatTile label="Rank" value={`#${rank + 1}`} />
                            {stats.totalDifference !== undefined && (
                                <StatTile
                                    label="Gap to leader"
                                    value={formatNumber(
                                        stats.totalDifference
                                    )}
                                />
                            )}
                            {stats.differenceFromLast !== undefined && (
                                <StatTile
                                    label="Gap to last"
                                    value={formatNumber(
                                        stats.differenceFromLast
                                    )}
                                />
                            )}
                            {stats.difference !== undefined && (
                                <StatTile
                                    label="Gap above"
                                    value={formatNumber(stats.difference)}
                                />
                            )}
                            {stats.differenceBelow !== undefined && (
                                <StatTile
                                    label="Gap below"
                                    value={formatNumber(stats.differenceBelow)}
                                />
                            )}
                        </div>
                    )}
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
                            <HugeiconsIcon icon={HideIcon} size="1.2em" />
                        </Button>
                        <Button
                            variant="destructive"
                            type="button"
                            onClick={() => handleDeletePerson(player.id)}>
                            <HugeiconsIcon icon={DeleteIcon} size="1.2em" />
                        </Button>
                        <Button>Change</Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
