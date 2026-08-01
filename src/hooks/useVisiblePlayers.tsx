import { useMemo } from "react";
import { useAppSelector } from "./redux";

export default function useVisiblePlayers() {
    const allPlayers = useAppSelector((state) => state.players);
    const allScores = useAppSelector((state) => state.scores);

    const { players, scores } = useMemo(() => {
        const players: typeof allPlayers = [];
        const scores: typeof allScores = [];

        allPlayers.forEach((player, i) => {
            if (!player.hidden) {
                players.push(player);
                scores.push(allScores[i]);
            }
        });

        return { players, scores };
    }, [allPlayers, allScores]);

    return { players, scores, allPlayers, allScores };
}
