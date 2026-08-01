import { useMemo, useState } from "react";
import useVisiblePlayers from "./useVisiblePlayers";

const useGamesStats = () => {
    const { players, scores } = useVisiblePlayers();
    const [nextGamePlayer, setNextGamePlayer] = useState("");

    const maxGamesPlayed = useMemo(() => {
        const maxGamesPlayed = scores.reduce(
            (largestNumberOfGames, individualScores) => {
                if (largestNumberOfGames < individualScores.scores.length) {
                    largestNumberOfGames = individualScores.scores.length;
                }
                return largestNumberOfGames;
            },
            0
        );
        setNextGamePlayer(players[maxGamesPlayed % players.length]?.name);
        return maxGamesPlayed;
    }, [players, scores]);

    return { maxGamesPlayed, nextGamePlayer };
};

export default useGamesStats;
