import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleCompactView } from "@/store/features/settingsSlice";
import OptionCard from "./OptionCard";

const Row = ({ dotClassName, lineClassName }: { dotClassName: string; lineClassName: string }) => (
    <div className="flex items-center gap-1">
        <span className={dotClassName} />
        <span className={lineClassName} />
    </div>
);

const LayoutPicker = () => {
    const dispatch = useAppDispatch();
    const isCompactViewOn = useAppSelector(
        (state) => state.settings.isCompactViewOn
    );

    return (
        <div className="grid grid-cols-2 gap-3">
            <OptionCard
                label="Comfortable"
                selected={!isCompactViewOn}
                onClick={() => {
                    if (isCompactViewOn) dispatch(toggleCompactView());
                }}>
                <div className="grid h-full w-full grid-cols-2 gap-1 p-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col justify-center gap-1 rounded bg-background/60 px-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span className="h-1 w-full rounded-full bg-muted-foreground/40" />
                        </div>
                    ))}
                </div>
            </OptionCard>
            <OptionCard
                label="Compact"
                selected={isCompactViewOn}
                onClick={() => {
                    if (!isCompactViewOn) dispatch(toggleCompactView());
                }}>
                <div className="flex h-full w-full flex-col justify-center gap-1 p-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Row
                            key={i}
                            dotClassName="h-1 w-1 shrink-0 rounded-full bg-primary"
                            lineClassName="h-1 w-full rounded-full bg-muted-foreground/40"
                        />
                    ))}
                </div>
            </OptionCard>
        </div>
    );
};

export default LayoutPicker;
