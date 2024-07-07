import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Switch } from "../ui/switch";
import { toggleTouchMode } from "@/store/features/settingsSlice";

export default function TouchMode() {
    const settings = useAppSelector((state) => state.settings);
    const { isTouchModeOn } = settings;
    const dispatch = useAppDispatch();

    return (
        <>
            <section className="flex justify-between gap-4 rounded bg-secondary p-3">
                <p>Touch Mode</p>
                <Switch
                    defaultChecked={isTouchModeOn}
                    onCheckedChange={() => {
                        dispatch(toggleTouchMode());
                    }}
                />
            </section>
        </>
    );
}
