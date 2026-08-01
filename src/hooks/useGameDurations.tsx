import { useAppSelector } from "@/hooks/redux";
import useGamesStats from "@/hooks/useGamesStats";

export type GameDuration = {
    index: number;
    startedAt?: number;
    finishedAt?: number;
    duration?: number;
};

function getLastEntry(
    scores: { scores: { createdAt?: number }[] }[],
    index: number
) {
    const entryTimes = scores
        .map((player) => player.scores[index]?.createdAt)
        .filter((time): time is number => typeof time === "number");

    return entryTimes.length ? Math.max(...entryTimes) : undefined;
}

const useGameDurations = () => {
    const scores = useAppSelector((state) => state.scores);
    const lastPlayersChangedAt = useAppSelector(
        (state) => state.playersMeta.lastPlayersChangedAt
    );
    const { maxGamesPlayed } = useGamesStats();

    const games: GameDuration[] = Array.from(
        { length: maxGamesPlayed },
        (_, index) => {
            const finishedAt = getLastEntry(scores, index);
            // A game's start is when the previous game finished, or when
            // the player list was last touched for the very first game.
            const startedAt =
                index > 0 ? getLastEntry(scores, index - 1) : lastPlayersChangedAt;

            const duration =
                finishedAt && startedAt ? finishedAt - startedAt : undefined;

            return { index, startedAt, finishedAt, duration };
        }
    );

    return { games };
};

export default useGameDurations;
