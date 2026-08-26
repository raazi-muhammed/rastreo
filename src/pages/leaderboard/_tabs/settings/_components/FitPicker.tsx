import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleFitEveryone } from "@/store/features/settingsSlice";
import OptionCard from "./OptionCard";

const FitPreview = () => (
    <div className="flex h-full w-full items-stretch gap-1 p-2">
        {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="flex-1 rounded bg-background/60" />
        ))}
    </div>
);

const ScrollPreview = () => (
    <div className="flex h-full w-full items-stretch gap-1 overflow-hidden p-2">
        {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="w-8 shrink-0 rounded bg-background/60" />
        ))}
        <span className="w-4 shrink-0 rounded bg-background/60" />
    </div>
);

const FitPicker = () => {
    const dispatch = useAppDispatch();
    const isFitEveryoneOn = useAppSelector(
        (state) => state.settings.isFitEveryoneOn
    );

    return (
        <div className="grid grid-cols-2 gap-3">
            <OptionCard
                label="Fit Everyone"
                selected={isFitEveryoneOn}
                onClick={() => {
                    if (!isFitEveryoneOn) dispatch(toggleFitEveryone());
                }}>
                <FitPreview />
            </OptionCard>
            <OptionCard
                label="Scroll"
                selected={!isFitEveryoneOn}
                onClick={() => {
                    if (isFitEveryoneOn) dispatch(toggleFitEveryone());
                }}>
                <ScrollPreview />
            </OptionCard>
        </div>
    );
};

export default FitPicker;
