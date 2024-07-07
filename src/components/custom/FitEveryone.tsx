import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleFitEveryone } from "@/store/features/settingsSlice";
import { Switch } from "../ui/switch";

export default function FitEveryone() {
    const settings = useAppSelector((state) => state.settings);
    const { isFitEveryoneOn } = settings;
    const dispatch = useAppDispatch();

    return (
        <>
            <section className="flex justify-between gap-4 rounded bg-secondary p-3">
                <p>Fit everyone</p>
                <Switch
                    defaultChecked={isFitEveryoneOn}
                    onCheckedChange={() => {
                        dispatch(toggleFitEveryone());
                    }}
                />
            </section>
        </>
    );
}
