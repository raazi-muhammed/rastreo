import { cn, formatNumber } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
    ChevronsDown,
    ChevronsUp,
    Crown as WinnerIcon,
} from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { SortOptions } from "@/store/features/settingsSlice";
import { useAppSelector } from "@/hooks/redux";
import MessageTemplate from "@/components/template/MessageTemplate";
import useGamesStats from "@/hooks/useGamesStats";
import useVisiblePlayers from "@/hooks/useVisiblePlayers";
import { Separator } from "@/components/ui/separator";

type LeaderBoardItem = {
    players: string[];
    sum: number;
    difference?: number;
    totalDifference?: number;
    differenceFromLast?: number;
};

export default function LeaderBoardData() {
    const { players, scores } = useVisiblePlayers();

    const settings = useAppSelector((state) => state.settings);
    const { sortOption, isCompactViewOn: isCompact } = settings;
    const { maxGamesPlayed } = useGamesStats();
    const [leaderBoardData, setLeaderBoardData] = useState<LeaderBoardItem[]>(
        []
    );
    function findSumOfPlayerWithId(id: string) {
        let sum = 0;
        scores.map((e) => {
            if (e.id === id) sum = e.scores.reduce((a, e) => (a += e.val), 0);
        });
        return sum;
    }

    function addDifferences(lbData: LeaderBoardItem[]) {
        let lastSum = 0;
        let lastTotalDifference = lbData?.[0]?.sum;
        const lastPlaceSum = lbData?.[lbData.length - 1]?.sum;
        return lbData.map((l, i) => {
            l.difference = Math.abs(l.sum - lastSum);
            l.totalDifference = Math.abs(l.sum - lastTotalDifference);
            l.differenceFromLast = Math.abs(l.sum - lastPlaceSum);
            lastSum = l.sum;
            if (i === 0) l.difference = undefined;
            if (i === lbData.length - 1) l.differenceFromLast = undefined;
            return l;
        });
    }

    function mergeDraws(
        rawData: { player: string; sum: number }[]
    ): LeaderBoardItem[] {
        const merged: LeaderBoardItem[] = [];
        for (const entry of rawData) {
            const last = merged[merged.length - 1];
            if (last && last.sum === entry.sum) {
                last.players.push(entry.player);
            } else {
                merged.push({ players: [entry.player], sum: entry.sum });
            }
        }
        return merged;
    }

    useEffect(() => {
        const rawData: { player: string; sum: number }[] = [];
        for (let i = 0; i < players.length; i++) {
            const sum = findSumOfPlayerWithId(players[i].id);
            rawData.push({
                player: players[i].name,
                sum,
            });
        }

        if (sortOption == SortOptions.TO_HIGH) {
            rawData.sort((a, b) => a.sum - b.sum);
        } else {
            rawData.sort((a, b) => b.sum - a.sum);
        }

        const withDifference = addDifferences(mergeDraws(rawData));
        setLeaderBoardData(withDifference);
    }, [players, scores, sortOption]);

    return (
        <>
            {leaderBoardData.length === 0 ? (
                <MessageTemplate
                    title="No players yet"
                    description="Add player to see leaderboard"
                />
            ) : maxGamesPlayed === 0 ? (
                <MessageTemplate title="Add a score to see the leaderboard" />
            ) : (
                <AnimatePresence>
                    <section key={sortOption}>
                        {leaderBoardData.map((l, index) => (
                            <motion.div
                                className="rounded shadow-accent hover:shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                animate={{ scale: 1 }}
                                key={l.players.join("-")}>
                                {index === 0 &&
                                sortOption &&
                                leaderBoardData.length > 1 ? (
                                    <section
                                        className={cn(
                                            "flex justify-between rounded border bg-muted shadow-md shadow-accent",
                                            isCompact
                                                ? "my-1 items-center gap-2 px-2 py-1"
                                                : "my-2 px-4 py-2"
                                        )}>
                                        <div
                                            className={cn(
                                                "flex-1",
                                                isCompact
                                                    ? "flex items-center gap-1.5 overflow-hidden"
                                                    : "pr-3"
                                            )}>
                                            <WinnerIcon
                                                className="shrink-0 text-primary"
                                                size={isCompact ? "1em" : undefined}
                                            />
                                            {isCompact ? (
                                                <p className="truncate text-lg">
                                                    {l.players.join(", ")}
                                                </p>
                                            ) : (
                                                l.players.map((p, i) => (
                                                    <Fragment key={p}>
                                                        {i > 0 && (
                                                            <Separator className="my-2 bg-muted-foreground/20" />
                                                        )}
                                                        <p className="my-auto text-lg">
                                                            {p}
                                                        </p>
                                                    </Fragment>
                                                ))
                                            )}
                                        </div>
                                        <div
                                            className={cn(
                                                "text-right",
                                                isCompact
                                                    ? "shrink-0"
                                                    : "-me-1 mt-auto"
                                            )}>
                                            <p className="font-semibold">
                                                {formatNumber(l.sum)}
                                            </p>
                                            {l.differenceFromLast !==
                                            undefined ? (
                                                <small className="flex items-center justify-end gap-0.5 text-end text-indigo-800">
                                                    <ChevronsDown
                                                        className="text-red-800/60"
                                                        size="0.9em"
                                                    />
                                                    {formatNumber(
                                                        l.differenceFromLast
                                                    )}
                                                </small>
                                            ) : null}
                                        </div>
                                    </section>
                                ) : (
                                    <section
                                        className={cn(
                                            "flex justify-between rounded bg-muted",
                                            isCompact
                                                ? "my-1 items-center gap-2 px-2 py-1"
                                                : "my-2 p-2"
                                        )}>
                                        <div
                                            className={cn(
                                                "flex flex-1",
                                                isCompact
                                                    ? "items-center gap-1.5 overflow-hidden"
                                                    : "gap-2"
                                            )}>
                                            <p
                                                className={cn(
                                                    "my-auto shrink-0 rounded bg-accent text-center text-xs text-primary",
                                                    isCompact ? "w-4" : "w-6 p-1"
                                                )}>
                                                {index + 1}
                                            </p>
                                            {isCompact ? (
                                                <p className="truncate">
                                                    {l.players.join(", ")}
                                                </p>
                                            ) : (
                                                <div className="my-auto flex-1 pr-3">
                                                    {l.players.map((p, i) => (
                                                        <Fragment key={p}>
                                                            {i > 0 && (
                                                                <Separator className="my-2 bg-muted-foreground/20" />
                                                            )}
                                                            <p>{p}</p>
                                                        </Fragment>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={cn(
                                                "shrink-0",
                                                !isCompact && "me-1"
                                            )}>
                                            <p className="me-0 ms-auto w-fit font-semibold">
                                                {formatNumber(l.sum)}
                                            </p>
                                            <small
                                                className={cn(
                                                    "flex items-center justify-end text-end text-indigo-800",
                                                    !isCompact && "-mt-1"
                                                )}>
                                                <ChevronsUp
                                                    className="text-green-800/60"
                                                    size="0.9em"
                                                />
                                                {formatNumber(
                                                    l.totalDifference ?? 0
                                                )}
                                                {l.differenceFromLast !==
                                                undefined ? (
                                                    <>
                                                        <span className="mx-1">
                                                            •
                                                        </span>
                                                        <span className="flex items-center gap-0.5">
                                                            <ChevronsDown
                                                                className="text-red-800/60"
                                                                size="0.9em"
                                                            />
                                                            {formatNumber(
                                                                l.differenceFromLast
                                                            )}
                                                        </span>
                                                    </>
                                                ) : null}
                                                <span className="mx-1">•</span>
                                                <span className="text-indigo-400">
                                                    {formatNumber(
                                                        l.difference ?? 0
                                                    )}
                                                </span>
                                            </small>
                                        </div>
                                    </section>
                                )}
                            </motion.div>
                        ))}
                    </section>
                </AnimatePresence>
            )}
        </>
    );
}
