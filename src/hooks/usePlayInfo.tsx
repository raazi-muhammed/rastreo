import { SortOptions } from "@/store/features/settingsSlice";
import { useAppSelector } from "./redux";
import useVisiblePlayers from "./useVisiblePlayers";

export const usePlayInfo = ({
    index,
    score,
}: {
    index: number;
    score: number;
}) => {
    const { scores } = useVisiblePlayers();
    const sortOption = useAppSelector((state) => state.settings.sortOption);

    const playScores = scores
        .map((s) => s.scores[index])
        .filter((entry) => entry != null)
        .map((entry) => ({ id: entry.id, score: entry.val }));

    if (playScores.length === 0) return { isTop: false, isBottom: false };

    const playerScoreSorted =
        sortOption == SortOptions.TO_HIGH
            ? playScores.sort((a, b) => a.score - b.score)
            : playScores.sort((a, b) => b.score - a.score);

    const isTop = playerScoreSorted[0].score === score;
    const isBottom =
        playerScoreSorted[playerScoreSorted.length - 1].score === score;

    return { isTop, isBottom: isTop ? false : isBottom };
};
