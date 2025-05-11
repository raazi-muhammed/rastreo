import { Award, BarChart, Settings } from "lucide-react";
import { ReactNode, useState } from "react";
import NextDealer from "../../../components/custom/NextDealer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useAppSelector } from "@/hooks/redux";
import LeaderboardTab from "../_tabs/leaderboard";
import AnalyticsTab from "../_tabs/analytics";
import SettingsTab from "../_tabs/settings";

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
}
export default function LeaderBoard() {
    const [currentTab, setCurrentTab] = useState(TabsState.LEADERBOARD);
    const settings = useAppSelector((state) => state.settings);

    return (
        <aside className="flex h-svh w-[20rem] flex-col justify-between gap-4 bg-background shadow-xl overflow-auto no-scrollbar">
            <motion.section
                className="h-full mb-24 p-4"
                initial={{ scale: 0.85, originY: 0, originX: 0 }}
                animate={{ scale: 1 }}
                key={currentTab}>
                {currentTab === TabsState.LEADERBOARD ? (
                    <LeaderboardTab />
                ) : currentTab === TabsState.ANALYSIS ? (
                    <AnalyticsTab />
                ) : (
                    <SettingsTab />
                )}
                <div className={settings.showNextDealer ? "h-56" : "h-24"} />
            </motion.section>
            <div className="fixed w-[20rem] bottom-0 gap-4 flex flex-col align-middle bg-gradient-to-t from-background to-transparent p-4 from-30%">
                {settings.showNextDealer ? <NextDealer /> : null}
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
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setCurrentTab(TabsState.ANALYSIS)}
                            value="analysis"
                            className="gap-1">
                            <BarChart size="1.2em" />
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                {!settings.isMobileModeOn ? (
                    <p className="text-center text-xs text-muted-foreground">
                        Created by
                        <a
                            href="https://raazi.live/"
                            className="ms-1 font-semibold text-primary underline">
                            Raazi
                        </a>
                    </p>
                ) : null}
            </div>
        </aside>
    );
}
