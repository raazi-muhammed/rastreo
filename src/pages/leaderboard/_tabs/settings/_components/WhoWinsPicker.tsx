import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { cn } from "@/lib/utils";
import { SortOptions, changeSortOption } from "@/store/features/settingsSlice";
import OptionCard from "./OptionCard";

const Bars = ({ winnerIndex }: { winnerIndex: number }) => (
    <div className="flex h-full w-full items-end justify-center gap-1.5 p-2">
        {["h-3", "h-5", "h-7"].map((height, i) => (
            <span
                key={i}
                className={cn(
                    "w-3 rounded-t",
                    height,
                    i === winnerIndex ? "bg-primary" : "bg-background/60"
                )}
            />
        ))}
    </div>
);

const WhoWinsPicker = () => {
    const dispatch = useAppDispatch();
    const sortOption = useAppSelector((state) => state.settings.sortOption);

    return (
        <>
            <OptionCard
                label="Highest"
                selected={sortOption === SortOptions.TO_LOW}
                onClick={() => dispatch(changeSortOption(SortOptions.TO_LOW))}>
                <Bars winnerIndex={2} />
            </OptionCard>
            <OptionCard
                label="Lowest"
                selected={sortOption === SortOptions.TO_HIGH}
                onClick={() =>
                    dispatch(changeSortOption(SortOptions.TO_HIGH))
                }>
                <Bars winnerIndex={0} />
            </OptionCard>
        </>
    );
};

export default WhoWinsPicker;
