import { Heading } from "@/components/custom/LeaderBoard";
import SortOption from "@/components/custom/SortOption";
import SettingIconTemplate from "@/components/template/SettingIconTemplate";
import { useTheme } from "@/components/theme/theme-provider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toast } from "@/hooks/use-toast";
import {
    setMobileMode,
    setShowNextDealer,
    ThemeOptions,
    toggleFitEveryone,
    toggleLock,
    toggleTouchMode,
} from "@/store/features/settingsSlice";
import { Settings } from "lucide-react";

const SettingsTab = () => {
    const settings = useAppSelector((state) => state.settings);
    const dispatch = useAppDispatch();
    const { setTheme, theme } = useTheme();

    return (
        <>
            <Heading>
                <Settings size="1.2em" />
                Settings
            </Heading>
            <section className="mt-auto h-full space-y-4">
                <SortOption />
                <SettingIconTemplate label="Touch Mode">
                    <Switch
                        checked={settings.isTouchModeOn}
                        onCheckedChange={() => {
                            dispatch(toggleTouchMode());
                        }}
                    />
                </SettingIconTemplate>
                <SettingIconTemplate label="Fit Everyone">
                    <Switch
                        checked={settings.isFitEveryoneOn}
                        onCheckedChange={() => {
                            dispatch(toggleFitEveryone());
                        }}
                    />
                </SettingIconTemplate>
                <SettingIconTemplate label="Mobile Mode">
                    <Switch
                        checked={settings.isMobileModeOn}
                        onCheckedChange={() => {
                            dispatch(setMobileMode(!settings.isMobileModeOn));
                            dispatch(
                                setShowNextDealer(settings.isMobileModeOn)
                            );
                        }}
                    />
                </SettingIconTemplate>
                <SettingIconTemplate label="Show Next Dealer">
                    <Switch
                        checked={settings.showNextDealer}
                        onCheckedChange={() => {
                            dispatch(
                                setShowNextDealer(!settings.showNextDealer)
                            );
                        }}
                    />
                </SettingIconTemplate>
                <SettingIconTemplate label="Lock">
                    <Switch
                        checked={settings.isLocked}
                        onDoubleClick={() => {
                            if (settings.isLocked) dispatch(toggleLock());
                        }}
                        onClick={() => {
                            if (!settings.isLocked) dispatch(toggleLock());
                            else
                                toast({
                                    title: "Locked",
                                    description:
                                        "Double click to unlock the game",
                                });
                        }}
                    />
                </SettingIconTemplate>
                <SettingIconTemplate label="Theme">
                    <Select
                        defaultValue={theme}
                        onValueChange={(value) => {
                            setTheme(value as ThemeOptions);
                        }}>
                        <SelectTrigger className="-me-1 h-8 w-fit bg-secondary">
                            <SelectValue placeholder="none" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={ThemeOptions.SYSTEM}>
                                System
                            </SelectItem>
                            <SelectItem value={ThemeOptions.LIGHT}>
                                Light
                            </SelectItem>
                            <SelectItem value={ThemeOptions.DARK}>
                                Dark
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </SettingIconTemplate>
            </section>
        </>
    );
};

export default SettingsTab;
