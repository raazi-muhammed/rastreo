import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Switch } from "../ui/switch";
import { toggleLock } from "@/store/features/settingsSlice";
import { toast } from "@/hooks/use-toast";

export default function LockSetting() {
    const settings = useAppSelector((state) => state.settings);
    const { isLocked } = settings;
    const dispatch = useAppDispatch();

    return (
        <>
            <section className="flex justify-between gap-4 rounded bg-secondary p-3">
                <p>Lock</p>
                <Switch
                    checked={isLocked}
                    onDoubleClick={() => {
                        if (isLocked) dispatch(toggleLock());
                    }}
                    onClick={() => {
                        if (!isLocked) dispatch(toggleLock());
                        else
                            toast({
                                title: "Locked",
                                description: "Double click to unlock the game",
                            });
                    }}
                />
            </section>
        </>
    );
}
