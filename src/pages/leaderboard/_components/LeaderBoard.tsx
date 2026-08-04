import { Award, BarChart, Settings, Users } from "lucide-react";
import { ReactNode, useState } from "react";
import NextDealer from "../../../components/custom/NextDealer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useAppSelector } from "@/hooks/redux";
import LeaderboardTab from "../_tabs/leaderboard";
import AnalyticsTab from "../_tabs/analytics";
import SettingsTab from "../_tabs/settings";
import PlayersTab from "../_tabs/players";

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
    ANALYSIS = "analysis",
    PLAYERS = "players",
}
export default function LeaderBoard() {
    const [currentTab, setCurrentTab] = useState(TabsState.LEADERBOARD);
    const settings = useAppSelector((state) => state.settings);

    return (
        <aside className="flex h-svh w-full flex-col bg-background shadow-xl">
            <motion.section
                className="min-h-0 flex-1 overflow-auto no-scrollbar p-4"
                initial={{ scale: 0.85, originY: 0, originX: 0 }}
                animate={{ scale: 1 }}
                key={currentTab}>
                {currentTab === TabsState.LEADERBOARD ? (
                    <LeaderboardTab />
                ) : currentTab === TabsState.ANALYSIS ? (
                    <AnalyticsTab />
                ) : currentTab === TabsState.PLAYERS ? (
                    <PlayersTab />
                ) : (
                    <SettingsTab />
                )}
            </motion.section>
            <div className="gap-4 flex flex-col align-middle overflow-hidden bg-gradient-to-t from-background to-transparent p-4 from-30%">
                {settings.showNextDealer ? <NextDealer /> : null}
                <Tabs defaultValue="leaderboard" className="mx-auto overflow-hidden">
                    <TabsList className="h-auto rounded-3xl">
                        <TabsTrigger
                            onClick={() => setCurrentTab(TabsState.LEADERBOARD)}
                            value="leaderboard"
                            className="w-16 flex-col gap-0 rounded-2xl px-2">
                            <Award size="1.4em" />
                            <span className="text-[10px]">Ranks</span>
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setCurrentTab(TabsState.PLAYERS)}
                            value="players"
                            className="w-16 flex-col gap-0 rounded-2xl px-2">
                            <Users size="1.4em" />
                            <span className="text-[10px]">Players</span>
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setCurrentTab(TabsState.SETTINGS)}
                            value="settings"
                            className="w-16 flex-col gap-0 rounded-2xl px-2">
                            <Settings size="1.4em" />
                            <span className="text-[10px]">Settings</span>
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setCurrentTab(TabsState.ANALYSIS)}
                            value="analysis"
                            className="w-16 flex-col gap-0 rounded-2xl px-2">
                            <BarChart size="1.4em" />
                            <span className="text-[10px]">Analysis</span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                {!settings.isMobileModeOn ? (
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
                ) : null}
            </div>
        </aside>
    );
}
