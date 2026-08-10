import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SortOptions } from "@/store/features/settingsSlice";
import { useAppSelector } from "@/hooks/redux";
import MessageTemplate from "@/components/template/MessageTemplate";
import useGamesStats from "@/hooks/useGamesStats";
import useVisiblePlayers from "@/hooks/useVisiblePlayers";
import LeaderBoardRow, { LeaderBoardItem } from "./LeaderBoardRow";

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
        rawData: { id: string; player: string; sum: number }[]
    ): LeaderBoardItem[] {
        const merged: LeaderBoardItem[] = [];
        for (const entry of rawData) {
            const last = merged[merged.length - 1];
            if (last && last.sum === entry.sum) {
                last.players.push({ id: entry.id, name: entry.player });
            } else {
                merged.push({
                    players: [{ id: entry.id, name: entry.player }],
                    sum: entry.sum,
                });
            }
        }
        return merged;
    }

    useEffect(() => {
        const rawData: { id: string; player: string; sum: number }[] = [];
        for (let i = 0; i < players.length; i++) {
            const sum = findSumOfPlayerWithId(players[i].id);
            rawData.push({
                id: players[i].id,
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
                                key={l.players.map((p) => p.id).join("-")}>
                                <LeaderBoardRow
                                    item={l}
                                    index={index}
                                    isCompact={isCompact}
                                    isWinnerRow={
                                        index === 0 &&
                                        !!sortOption &&
                                        leaderBoardData.length > 1
                                    }
                                />
                            </motion.div>
                        ))}
                    </section>
                </AnimatePresence>
            )}
        </>
    );
}
