import { useMemo } from "react";
import { SortOptions } from "@/store/features/settingsSlice";
import { useAppSelector } from "@/hooks/redux";
import useVisiblePlayers from "@/hooks/useVisiblePlayers";

export type LeaderBoardPlayer = { id: string; name: string };

export type LeaderBoardItem = {
    players: LeaderBoardPlayer[];
    sum: number;
    difference?: number;
    differenceBelow?: number;
    totalDifference?: number;
    differenceFromLast?: number;
};

export default function useLeaderBoardData() {
    const { players, scores } = useVisiblePlayers();
    const sortOption = useAppSelector((state) => state.settings.sortOption);

    return useMemo(() => {
        function findSumOfPlayerWithId(id: string) {
            let sum = 0;
            scores.map((e) => {
                if (e.id === id)
                    sum = e.scores.reduce((a, e) => (a += e.val), 0);
            });
            return sum;
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

        function addDifferences(lbData: LeaderBoardItem[]) {
            let lastSum = 0;
            let lastTotalDifference = lbData?.[0]?.sum;
            const lastPlaceSum = lbData?.[lbData.length - 1]?.sum;
            return lbData.map((l, i) => {
                l.difference = Math.abs(l.sum - lastSum);
                l.differenceBelow =
                    i < lbData.length - 1
                        ? Math.abs(l.sum - lbData[i + 1].sum)
                        : undefined;
                l.totalDifference = Math.abs(l.sum - lastTotalDifference);
                l.differenceFromLast = Math.abs(l.sum - lastPlaceSum);
                lastSum = l.sum;
                if (i === 0) l.difference = undefined;
                if (i === lbData.length - 1) l.differenceFromLast = undefined;
                return l;
            });
        }

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

        return addDifferences(mergeDraws(rawData));
    }, [players, scores, sortOption]);
}
