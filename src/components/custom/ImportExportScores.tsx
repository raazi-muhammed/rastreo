import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toast } from "@/hooks/use-toast";
import {
    buildScoresExport,
    downloadScoresExport,
    parseScoresImport,
    ScoresExport,
} from "@/lib/scores-export";
import { setPlayers } from "@/store/features/playerSlice";
import { setScores } from "@/store/features/scoreSlice";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download04Icon, Upload04Icon } from "@hugeicons/core-free-icons";
import { useRef, useState } from "react";

export function ExportScoresButton() {
    const players = useAppSelector((state) => state.players);
    const scores = useAppSelector((state) => state.scores);

    function handleExport() {
        downloadScoresExport(buildScoresExport(players, scores));
    }

    return (
        <Button variant="card" size="sm" onClick={handleExport}>
            <HugeiconsIcon icon={Download04Icon} size="1em" />
            Export
        </Button>
    );
}

export function ImportScoresButton() {
    const dispatch = useAppDispatch();
    const isLocked = useAppSelector((state) => state.settings.isLocked);
    const inputRef = useRef<HTMLInputElement>(null);
    const [pendingImport, setPendingImport] = useState<ScoresExport | null>(
        null
    );

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file) return;

        try {
            const data = parseScoresImport(await file.text());
            setPendingImport(data);
        } catch {
            toast({
                title: "Import failed",
                description: "That file isn't a valid scores export.",
                variant: "destructive",
            });
        }
    }

    function handleConfirmImport() {
        if (!pendingImport) return;
        dispatch(setPlayers(pendingImport.players));
        dispatch(setScores(pendingImport.scores));
        setPendingImport(null);
        toast({
            title: "Import complete",
            description: "Players and scores have been restored.",
        });
    }

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={handleFileChange}
            />
            <Button
                variant="card"
                size="sm"
                disabled={isLocked}
                onClick={() => inputRef.current?.click()}>
                <HugeiconsIcon icon={Upload04Icon} size="1em" />
                Import
            </Button>
            <AlertDialog
                open={pendingImport !== null}
                onOpenChange={(open) => {
                    if (!open) setPendingImport(null);
                }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Import scores</AlertDialogTitle>
                        <AlertDialogDescription>
                            This replaces all current players and scores with
                            the contents of the file. This can't be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmImport}>
                            Import
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
