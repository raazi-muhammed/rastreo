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
    toggleShowLeaderboardBadges,
    toggleShowPerGameBadges,
    toggleTouchMode,
} from "@/store/features/settingsSlice";
import { Settings01Icon } from "@hugeicons/core-free-icons";
import { ReactNode } from "react";
import SectionWrapper from "./_components/SectionWrapper";
import ThemePicker from "./_components/ThemePicker";
import LayoutPicker from "./_components/LayoutPicker";
import FitPicker from "./_components/FitPicker";
import WhoWinsPicker from "./_components/WhoWinsPicker";

const SettingsGroup = ({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) => (
    <div className="flex flex-col gap-3">
        <p className="ms-2 text-sm font-semibold text-foreground">{title}</p>
        {children}
    </div>
);

const SettingsTab = () => {
    const settings = useAppSelector((state) => state.settings);
    const dispatch = useAppDispatch();

    return (
        <>
            <Heading icon={Settings01Icon}>Settings</Heading>
            <section className="mt-auto h-full space-y-6">
                <SettingsGroup title="Game Rules">
                    <div className="flex flex-col gap-2">
                        <p className="ms-2 text-xs text-muted-foreground">
                            Who Wins
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <WhoWinsPicker />
                        </div>
                    </div>
                    <SectionWrapper
                        settings={[
                            <SettingIconTemplate
                                label="Next Dealer"
                                key="next-dealer">
                                <Switch
                                    checked={settings.showNextDealer}
                                    onCheckedChange={() =>
                                        dispatch(
                                            setShowNextDealer(
                                                !settings.showNextDealer
                                            )
                                        )
                                    }
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
                </SettingsGroup>
                <SettingsGroup title="Appearance">
                    <div className="flex flex-col gap-2">
                        <p className="ms-2 text-xs text-muted-foreground">
                            Theme
                        </p>
                        <ThemePicker />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="ms-2 text-xs text-muted-foreground">
                            Layout
                        </p>
                        <LayoutPicker />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="ms-2 text-xs text-muted-foreground">
                            Fit
                        </p>
                        <FitPicker />
                    </div>
                    <SectionWrapper
                        settings={[
                            <SettingIconTemplate
                                label="Leaderboard Badges"
                                key="leaderboard-badges">
                                <Switch
                                    checked={settings.showLeaderboardBadges}
                                    onCheckedChange={() =>
                                        dispatch(
                                            toggleShowLeaderboardBadges()
                                        )
                                    }
                                />
                            </SettingIconTemplate>,
                            <SettingIconTemplate
                                label="Per-Game Badges"
                                key="per-game-badges">
                                <Switch
                                    checked={settings.showPerGameBadges}
                                    onCheckedChange={() =>
                                        dispatch(toggleShowPerGameBadges())
                                    }
                                />
                            </SettingIconTemplate>,
                        ]}
                    />
                </SettingsGroup>
                <SettingsGroup title="Interaction">
                    <SectionWrapper
                        settings={[
                            <SettingIconTemplate
                                label="Mobile Mode"
                                key="mobile-mode">
                                <Switch
                                    checked={settings.isMobileModeOn}
                                    onCheckedChange={() => {
                                        dispatch(
                                            setMobileMode(
                                                !settings.isMobileModeOn
                                            )
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
                                    onCheckedChange={() =>
                                        dispatch(toggleTouchMode())
                                    }
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
                            <SettingIconTemplate
                                label="Keep Screen On"
                                key="keep-screen-on">
                                <Switch
                                    checked={settings.keepScreenOn}
                                    onCheckedChange={() =>
                                        dispatch(
                                            setKeepScreenOn(
                                                !settings.keepScreenOn
                                            )
                                        )
                                    }
                                />
                            </SettingIconTemplate>,
                        ]}
                    />
                </SettingsGroup>
                <SettingsGroup title="Data">
                    <SectionWrapper
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
                </SettingsGroup>
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
