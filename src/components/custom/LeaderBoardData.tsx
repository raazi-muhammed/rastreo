import { formatNumber } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Crown as WinnerIcon } from "lucide-react";
import { useEffect, useState } from "react";
type LeaderBoardItem = { player: string; sum: number; difference?: number };
import { SortOptions } from "@/store/features/settingsSlice";
import { useAppSelector } from "@/hooks/redux";

export default function LeaderBoardData() {
    const players = useAppSelector((state) => state.players);
    const scores = useAppSelector((state) => state.scores);

    const settings = useAppSelector((state) => state.settings);
    const { sortOption } = settings;
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
        return lbData.map((l, i) => {
            l.difference = Math.abs(l.sum - lastSum);
            lastSum = l.sum;
            if (i === 0) l.difference = undefined;
            return l;
        });
    }

    useEffect(() => {
        const lbData: LeaderBoardItem[] = [];
        for (let i = 0; i < players.length; i++) {
            const sum = findSumOfPlayerWithId(players[i].id);
            lbData.push({
                player: players[i].name,
                sum,
            });
        }

        let withDifference: LeaderBoardItem[] = lbData;
        if (sortOption == SortOptions.TO_HIGH) {
            lbData.sort((a, b) => a.sum - b.sum);
            withDifference = addDifferences(lbData);
        } else {
            lbData.sort((a, b) => b.sum - a.sum);
            withDifference = addDifferences(lbData);
        }
        setLeaderBoardData(withDifference);
    }, [players, scores, sortOption]);

    return (
        <>
            {leaderBoardData.length > 0 ? (
                <AnimatePresence>
                    <motion.section
                        className="mb-16"
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        exit={{
                            transition: { duration: 0 },
                        }}
                        key={sortOption}>
                        {leaderBoardData.map((l, index) => (
                            <motion.div
                                className="rounded shadow-accent hover:shadow-lg"
                                initial={{ scale: 0.7 }}
                                whileHover={{ scale: 1.05 }}
                                animate={{ scale: 1 }}
                                key={l.player}>
                                {index === 0 && sortOption ? (
                                    <section className="my-2 flex justify-between rounded border bg-muted px-4 py-2 shadow-md shadow-accent">
                                        <div>
                                            <WinnerIcon className="text-primary" />
                                            <p className="my-auto text-lg">
                                                {l.player}
                                            </p>
                                        </div>
                                        <p className="-me-1 mt-auto font-semibold">
                                            {formatNumber(l.sum)}
                                        </p>
                                    </section>
                                ) : (
                                    <section className="my-2 flex justify-between rounded bg-muted p-2">
                                        <div className="flex gap-2">
                                            <p className="my-auto w-6 rounded bg-accent p-1 text-center text-xs text-primary">
                                                {index + 1}
                                            </p>
                                            <p className="my-auto">
                                                {l.player}
                                            </p>
                                        </div>
                                        <div className="me-1">
                                            <p className="me-0 ms-auto w-fit font-semibold">
                                                {formatNumber(l.sum)}
                                            </p>
                                            {l.difference ? (
                                                <small className="-mt-1 flex justify-end text-end text-indigo-400">
                                                    {formatNumber(l.difference)}
                                                </small>
                                            ) : null}
                                        </div>
                                    </section>
                                )}
                            </motion.div>
                        ))}
                    </motion.section>
                </AnimatePresence>
            ) : (
                <p className="my-8 text-primary/50">No players</p>
            )}
        </>
    );
}
