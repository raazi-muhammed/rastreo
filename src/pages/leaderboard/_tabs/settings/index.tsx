import { Heading } from "@/pages/leaderboard/_components/LeaderBoard";
import SortOption from "@/components/custom/SortOption";
import {
    ExportScoresButton,
    ImportScoresButton,
} from "@/components/custom/ImportExportScores";
import SettingIconTemplate from "@/components/template/SettingIconTemplate";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toast } from "@/hooks/use-toast";
import {
    setKeepScreenOn,
    setMobileMode,
    setShowDragHandle,
    setShowNextDealer,
    toggleFitEveryone,
    toggleLock,
    toggleTouchMode,
} from "@/store/features/settingsSlice";
import { Settings01Icon } from "@hugeicons/core-free-icons";
import SectionWrapper from "./_components/SectionWrapper";
import ThemePicker from "./_components/ThemePicker";
import LayoutPicker from "./_components/LayoutPicker";

const SettingsTab = () => {
    const settings = useAppSelector((state) => state.settings);
    const dispatch = useAppDispatch();

    return (
        <>
            <Heading icon={Settings01Icon}>Settings</Heading>
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
                <div className="flex flex-col gap-2">
                    <p className="ms-2 text-sm text-muted-foreground">
                        Theme
                    </p>
                    <ThemePicker />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="ms-2 text-sm text-muted-foreground">
                        Layout
                    </p>
                    <LayoutPicker />
                </div>
                <SectionWrapper
                    title="View"
                    settings={[
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
                    ]}
                />
                <SectionWrapper
                    title="Data"
                    settings={[
                        <SettingIconTemplate
                            label="Export Scores"
                            key="export-scores">
                            <ExportScoresButton />
                        </SettingIconTemplate>,
                        <SettingIconTemplate
                            label="Import Scores"
                            key="import-scores">
                            <ImportScoresButton />
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
