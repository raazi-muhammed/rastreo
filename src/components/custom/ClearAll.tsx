import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
    deleteAllPersons,
    setAllPlayersHidden,
} from "@/store/features/playerSlice";
import {
    deleteAllPersonScores,
    deleteAllScores,
} from "@/store/features/scoreSlice";
import { HugeiconsIcon } from "@hugeicons/react";
import { ListXIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";

enum ClearAllMode {
    SCORES_ONLY = "scores_only",
    DELETE_PLAYERS = "delete_players",
    HIDE_PLAYERS = "hide_players",
}

const MODE_DESCRIPTIONS: Record<ClearAllMode, string> = {
    [ClearAllMode.SCORES_ONLY]: "Players stay as they are, only scores reset.",
    [ClearAllMode.DELETE_PLAYERS]:
        "Players and their score history are permanently removed.",
    [ClearAllMode.HIDE_PLAYERS]:
        "Players are hidden and can be restored from the Players tab.",
};

export function ClearAll() {
    const dispatch = useAppDispatch();
    const isLocked = useAppSelector((state) => state.settings.isLocked);
    const [mode, setMode] = useState<ClearAllMode>(ClearAllMode.SCORES_ONLY);

    function handleClearAll() {
        if (mode === ClearAllMode.DELETE_PLAYERS) {
            dispatch(deleteAllPersons());
            dispatch(deleteAllPersonScores());
            return;
        }

        dispatch(deleteAllScores());
        if (mode === ClearAllMode.HIDE_PLAYERS) {
            dispatch(setAllPlayersHidden(true));
        }
    }

    return (
        <AlertDialog
            onOpenChange={(open) => {
                if (!open) setMode(ClearAllMode.SCORES_ONLY);
            }}>
            <AlertDialogTrigger asChild>
                <Button
                    disabled={isLocked}
                    variant="card"
                    className="my-auto ms-auto">
                    <HugeiconsIcon icon={ListXIcon} size="1em" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Clear all scores</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="space-y-2">
                    <Label>Also</Label>
                    <Select
                        value={mode}
                        onValueChange={(value) =>
                            setMode(value as ClearAllMode)
                        }>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={ClearAllMode.SCORES_ONLY}>
                                Just clear scores
                            </SelectItem>
                            <SelectItem value={ClearAllMode.DELETE_PLAYERS}>
                                Delete all players
                            </SelectItem>
                            <SelectItem value={ClearAllMode.HIDE_PLAYERS}>
                                Hide all players
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                        {MODE_DESCRIPTIONS[mode]}
                    </p>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleClearAll}
                        className="bg-destructive">
                        Clear all
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
