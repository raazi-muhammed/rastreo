import { SortOptions } from "@/store/features/settingsSlice";
import { useAppSelector } from "./redux";
import useVisiblePlayers from "./useVisiblePlayers";

export const useStandingAtRound = ({
    index,
    personId,
}: {
    index: number;
    personId: string;
}) => {
    const { scores } = useVisiblePlayers();
    const sortOption = useAppSelector((state) => state.settings.sortOption);

    const standings = scores
        .filter((s) => s.scores[index] != null)
        .map((s) => ({
            id: s.id,
            sum: s.scores.slice(0, index + 1).reduce((a, e) => a + e.val, 0),
        }));

    const current = standings.find((s) => s.id === personId);
    if (!current) return { isTop: false, isBottom: false };

    const sorted =
        sortOption === SortOptions.TO_HIGH
            ? [...standings].sort((a, b) => a.sum - b.sum)
            : [...standings].sort((a, b) => b.sum - a.sum);

    const isTop = sorted[0].sum === current.sum;
    const isBottom = sorted[sorted.length - 1].sum === current.sum;

    return { isTop, isBottom: isTop ? false : isBottom };
};
