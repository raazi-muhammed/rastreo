import { Heading } from "@/pages/leaderboard/_components/LeaderBoard";
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
    setKeepScreenOn,
    setMobileMode,
    setShowDragHandle,
    setShowNextDealer,
    ThemeOptions,
    toggleCompactView,
    toggleFitEveryone,
    toggleLock,
    toggleTouchMode,
} from "@/store/features/settingsSlice";
import { Settings } from "lucide-react";
import SectionWrapper from "./_components/SectionWrapper";

const SettingsTab = () => {
    const settings = useAppSelector((state) => state.settings);
    const dispatch = useAppDispatch();
    const { setTheme, theme } = useTheme();

    return (
        <>
            <Heading icon={Settings}>Settings</Heading>
            <section className="mt-auto h-full space-y-4">
                <SectionWrapper
                    title="Game"
                    settings={[
                        <SortOption key="sort-option" />,
                        <SettingIconTemplate
                            label="Show Next Dealer"
                            key="show-next-dealer">
                            <Switch
                                checked={settings.showNextDealer}
                                onCheckedChange={() => {
                                    dispatch(
                                        setShowNextDealer(
                                            !settings.showNextDealer
                                        )
                                    );
                                }}
                            />
                        </SettingIconTemplate>,
                    ]}
                />
                <SectionWrapper
                    title="Usability"
                    settings={[
                        <SettingIconTemplate
                            label="Mobile Mode"
                            key="mobile-mode">
                            <Switch
                                checked={settings.isMobileModeOn}
                                onCheckedChange={() => {
                                    dispatch(
                                        setMobileMode(!settings.isMobileModeOn)
                                    );
                                    dispatch(
                                        setShowNextDealer(
                                            settings.isMobileModeOn
                                        )
                                    );
                                }}
                            />
                        </SettingIconTemplate>,
                        <SettingIconTemplate
                            label="Touch Mode"
                            key="touch-mode">
                            <Switch
                                checked={settings.isTouchModeOn}
                                onCheckedChange={() => {
                                    dispatch(toggleTouchMode());
                                }}
                            />
                        </SettingIconTemplate>,
                        <SettingIconTemplate
                            label="Keep Screen On"
                            key="keep-screen-on">
                            <Switch
                                checked={settings.keepScreenOn}
                                onCheckedChange={() => {
                                    dispatch(
                                        setKeepScreenOn(
                                            !settings.keepScreenOn
                                        )
                                    );
                                }}
                            />
                        </SettingIconTemplate>,
                        <SettingIconTemplate
                            label="Drag Handle"
                            key="drag-handle">
                            <Switch
                                checked={settings.showDragHandle}
                                onCheckedChange={() => {
                                    dispatch(
                                        setShowDragHandle(
                                            !settings.showDragHandle
                                        )
                                    );
                                }}
                            />
                        </SettingIconTemplate>,
                        <SettingIconTemplate label="Lock" key="lock">
                            <Switch
                                checked={settings.isLocked}
                                onDoubleClick={() => {
                                    if (settings.isLocked)
                                        dispatch(toggleLock());
                                }}
                                onClick={() => {
                                    if (!settings.isLocked)
                                        dispatch(toggleLock());
                                    else
                                        toast({
                                            title: "Locked",
                                            description:
                                                "Double click to unlock the game",
                                        });
                                }}
                            />
                        </SettingIconTemplate>,
                    ]}
                />
                <SectionWrapper
                    title="View"
                    settings={[
                        <SettingIconTemplate label="Theme" key="theme">
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
                        </SettingIconTemplate>,
                        <SettingIconTemplate
                            label="Fit Everyone"
                            key="fit-everyone">
                            <Switch
                                checked={settings.isFitEveryoneOn}
                                onCheckedChange={() => {
                                    dispatch(toggleFitEveryone());
                                }}
                            />
                        </SettingIconTemplate>,
                        <SettingIconTemplate
                            label="Compact View"
                            key="compact-view">
                            <Switch
                                checked={settings.isCompactViewOn}
                                onCheckedChange={() => {
                                    dispatch(toggleCompactView());
                                }}
                            />
                        </SettingIconTemplate>,
                    ]}
                />
                <p className="text-center text-xs text-muted-foreground">
                    Created by
                    <a
                        href="https://www.linkedin.com/in/raazimuhammed/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ms-1 font-semibold text-primary underline">
                        Raazi
                    </a>
                </p>
            </section>
        </>
    );
};

export default SettingsTab;
