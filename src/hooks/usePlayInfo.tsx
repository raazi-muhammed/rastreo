import { SortOptions } from "@/store/features/settingsSlice";
import { useAppSelector } from "./redux";

export const usePlayInfo = ({
    index,
    score,
}: {
    index: number;
    score: number;
}) => {
    const scores = useAppSelector((state) => state.scores);
    const sortOption = useAppSelector((state) => state.settings.sortOption);

    try {
        const playScores = scores.map((s) => ({
            id: s.id,
            score: s.scores[index].val,
        }));

        let playerScoreSorted = [];
        if (sortOption == SortOptions.TO_HIGH) {
            playerScoreSorted = playScores.sort((a, b) => a.score - b.score);
        } else {
            playerScoreSorted = playScores.sort((a, b) => b.score - a.score);
        }

        const isTop = playerScoreSorted[0].score === score;
        const isBottom =
            playerScoreSorted[playerScoreSorted.length - 1].score === score;

        return { isTop, isBottom };
    } catch (error) {
        console.log(error);
        return { isTop: false, isBottom: false };
    }
};
