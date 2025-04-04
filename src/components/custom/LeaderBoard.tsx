import { Award, Settings } from "lucide-react";
import { ReactNode, useState } from "react";
import NextDealer from "./NextDealer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SortOption from "./SortOption";
import LeaderBoardData from "./LeaderBoardData";
import { motion } from "framer-motion";
import SettingIconTemplate from "../template/SettingIconTemplate";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
    toggleFitEveryone,
    toggleLock,
    toggleTouchMode,
} from "@/store/features/settingsSlice";
import { Switch } from "../ui/switch";
import { useTheme } from "../theme/theme-provider";
import { toast } from "@/hooks/use-toast";

export function Heading({ children }: { children: ReactNode }) {
    return (
        <h3 className="mb-4 mt-8 flex h-fit gap-1 text-3xl font-semibold text-primary">
            {children}
        </h3>
    );
}

enum TabsState {
    SETTINGS = "settings",
    LEADERBOARD = "leaderboard",
}
export default function LeaderBoard() {
    const [currentTab, setCurrentTab] = useState(TabsState.LEADERBOARD);
    const settings = useAppSelector((state) => state.settings);
    const dispatch = useAppDispatch();
    const { setTheme, theme } = useTheme();

    return (
        <aside className="flex h-svh w-[20rem] flex-col justify-between gap-4 bg-background p-4 shadow-xl">
            <motion.section
                className="h-full"
                initial={{ scale: 0.85, originY: 0, originX: 0 }}
                animate={{ scale: 1 }}
                key={currentTab}>
                {currentTab === TabsState.LEADERBOARD ? (
                    <>
                        <Heading>
                            <Award size="1.2em" />
                            Leaderboard
                        </Heading>
                        <LeaderBoardData />
                    </>
                ) : (
                    <>
                        <Heading>
                            <Settings size="1.2em" />
                            Settings
                        </Heading>
                        <section className="mb-8 mt-auto h-full space-y-4">
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
                            <SettingIconTemplate label="Lock">
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
                            </SettingIconTemplate>
                            <SettingIconTemplate label="Theme">
                                <Switch
                                    checked={theme == "system"}
                                    onCheckedChange={(data) => {
                                        if (!data) {
                                            setTheme("light");
                                        } else {
                                            setTheme("system");
                                        }
                                    }}
                                />
                            </SettingIconTemplate>
                        </section>
                    </>
                )}
            </motion.section>
            <NextDealer />
            <Tabs defaultValue="leaderboard" className="mx-auto">
                <TabsList>
                    <TabsTrigger
                        onClick={() => setCurrentTab(TabsState.LEADERBOARD)}
                        value="leaderboard"
                        className="gap-1">
                        <Award size="1.2em" />
                        Leaderboard
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setCurrentTab(TabsState.SETTINGS)}
                        value="settings"
                        className="gap-1">
                        <Settings size="1.2em" />
                        Settings
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            <p className="text-center text-xs text-muted-foreground">
                Created by
                <a
                    href="https://raazi.live/"
                    className="ms-1 font-semibold text-primary underline">
                    Raazi
                </a>
            </p>
        </aside>
    );
}
