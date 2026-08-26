import { Heading } from "@/pages/leaderboard/_components/LeaderBoard";
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
    toggleLock,
    toggleTouchMode,
} from "@/store/features/settingsSlice";
import {
    Cards01Icon,
    Settings01Icon,
    SmartPhone01Icon,
    SunMediumIcon,
    TouchInteraction01Icon,
} from "@hugeicons/core-free-icons";
import SectionWrapper from "./_components/SectionWrapper";
import ThemePicker from "./_components/ThemePicker";
import LayoutPicker from "./_components/LayoutPicker";
import FitPicker from "./_components/FitPicker";
import WhoWinsPicker from "./_components/WhoWinsPicker";
import ToggleOptionCard from "./_components/ToggleOptionCard";

const SettingsTab = () => {
    const settings = useAppSelector((state) => state.settings);
    const dispatch = useAppDispatch();

    return (
        <>
            <Heading icon={Settings01Icon}>Settings</Heading>
            <section className="mt-auto h-full space-y-6">
                <div className="flex flex-col gap-2">
                    <p className="ms-2 text-sm text-muted-foreground">
                        Who Wins
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <WhoWinsPicker />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="ms-2 text-sm text-muted-foreground">
                        Usability
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                        <ToggleOptionCard
                            label="Mobile Mode"
                            icon={SmartPhone01Icon}
                            checked={settings.isMobileModeOn}
                            onToggle={() => {
                                dispatch(
                                    setMobileMode(!settings.isMobileModeOn)
                                );
                                dispatch(
                                    setShowNextDealer(settings.isMobileModeOn)
                                );
                            }}
                        />
                        <ToggleOptionCard
                            label="Touch Mode"
                            icon={TouchInteraction01Icon}
                            checked={settings.isTouchModeOn}
                            onToggle={() => dispatch(toggleTouchMode())}
                        />
                        <ToggleOptionCard
                            label="Keep Screen On"
                            icon={SunMediumIcon}
                            checked={settings.keepScreenOn}
                            onToggle={() =>
                                dispatch(
                                    setKeepScreenOn(!settings.keepScreenOn)
                                )
                            }
                        />
                        <ToggleOptionCard
                            label="Next Dealer"
                            icon={Cards01Icon}
                            checked={settings.showNextDealer}
                            onToggle={() =>
                                dispatch(
                                    setShowNextDealer(!settings.showNextDealer)
                                )
                            }
                        />
                    </div>
                </div>
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
                <div className="flex flex-col gap-2">
                    <p className="ms-2 text-sm text-muted-foreground">Fit</p>
                    <FitPicker />
                </div>
                <SectionWrapper
                    title="Advanced"
                    settings={[
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
