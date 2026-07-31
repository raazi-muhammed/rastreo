import { formatNumber } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Crown as WinnerIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { SortOptions } from "@/store/features/settingsSlice";
import { useAppSelector } from "@/hooks/redux";
import MessageTemplate from "@/components/template/MessageTemplate";
import useGamesStats from "@/hooks/useGamesStats";
import { Separator } from "@/components/ui/separator";

type LeaderBoardItem = {
    players: string[];
    sum: number;
    difference?: number;
    totalDifference?: number;
};

export default function LeaderBoardData() {
    const players = useAppSelector((state) => state.players);
    const scores = useAppSelector((state) => state.scores);

    const settings = useAppSelector((state) => state.settings);
    const { sortOption } = settings;
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
        return lbData.map((l, i) => {
            l.difference = Math.abs(l.sum - lastSum);
            l.totalDifference = Math.abs(l.sum - lastTotalDifference);
            lastSum = l.sum;
            if (i === 0) l.difference = undefined;
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
                                    <section className="my-2 flex justify-between rounded border bg-muted px-4 py-2 shadow-md shadow-accent">
                                        <div className="flex-1 pr-3">
                                            <WinnerIcon className="text-primary" />
                                            {l.players.map((p, i) => (
                                                <Fragment key={p}>
                                                    {i > 0 && (
                                                        <Separator className="my-2 bg-muted-foreground/20" />
                                                    )}
                                                    <p className="my-auto text-lg">
                                                        {p}
                                                    </p>
                                                </Fragment>
                                            ))}
                                        </div>
                                        <p className="-me-1 mt-auto font-semibold">
                                            {formatNumber(l.sum)}
                                        </p>
                                    </section>
                                ) : (
                                    <section className="my-2 flex justify-between rounded bg-muted p-2">
                                        <div className="flex flex-1 gap-2">
                                            <p className="my-auto w-6 rounded bg-accent p-1 text-center text-xs text-primary">
                                                {index + 1}
                                            </p>
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
                                        </div>
                                        <div className="me-1">
                                            <p className="me-0 ms-auto w-fit font-semibold">
                                                {formatNumber(l.sum)}
                                            </p>
                                            <small className="-mt-1 flex justify-end text-end text-indigo-800">
                                                {formatNumber(
                                                    l.totalDifference ?? 0
                                                )}
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
