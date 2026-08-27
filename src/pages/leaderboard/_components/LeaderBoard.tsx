import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import {
    Award01Icon,
    ChartColumnIcon,
    Settings01Icon,
    UsersIcon,
} from "@hugeicons/core-free-icons";
import { ReactNode, useState } from "react";
import NextDealer from "../../../components/custom/NextDealer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useAppSelector } from "@/hooks/redux";
import { cn } from "@/lib/utils";
import LeaderboardTab from "../_tabs/leaderboard";
import AnalyticsTab from "../_tabs/analytics";
import SettingsTab from "../_tabs/settings";
import PlayersTab from "../_tabs/players";

export function Heading({
    icon: Icon,
    children,
}: {
    icon: IconSvgElement;
    children: ReactNode;
}) {
    return (
        <h3 className="mb-4 flex h-fit items-center gap-1 font-display text-2xl font-semibold text-primary">
            <HugeiconsIcon icon={Icon} size="1.5rem" />
            {children}
        </h3>
    );
}

enum TabsState {
    LEADERBOARD = "leaderboard",
    ANALYSIS = "analysis",
    PLAYERS = "players",
}
export default function LeaderBoard() {
    const [currentTab, setCurrentTab] = useState(TabsState.LEADERBOARD);
    const settings = useAppSelector((state) => state.settings);

    return (
        <aside className="relative flex h-svh w-full flex-col bg-secondary shadow-xl">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="card"
                        size="icon"
                        className="absolute right-4 top-4 z-10 h-8 w-8">
                        <HugeiconsIcon icon={Settings01Icon} size="1.2em" />
                        <span className="sr-only">Settings</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md p-4">
                    <DialogTitle className="sr-only">Settings</DialogTitle>
                    <SettingsTab />
                </DialogContent>
            </Dialog>
            <motion.section
                className="min-h-0 flex-1 overflow-auto no-scrollbar p-4"
                initial={{ scale: 0.85, originY: 0, originX: 0 }}
                animate={{ scale: 1 }}
                key={currentTab}>
                {currentTab === TabsState.LEADERBOARD ? (
                    <LeaderboardTab />
                ) : currentTab === TabsState.ANALYSIS ? (
                    <AnalyticsTab />
                ) : (
                    <PlayersTab />
                )}
            </motion.section>
            <div className="gap-4 flex flex-col align-middle overflow-hidden bg-gradient-to-t from-secondary to-transparent p-4 from-30%">
                {settings.showNextDealer ? <NextDealer /> : null}
                <Tabs defaultValue="leaderboard" className="mx-auto overflow-hidden">
                    <TabsList className="h-auto rounded-xl bg-card">
                        <TabsTrigger
                            onClick={() => setCurrentTab(TabsState.LEADERBOARD)}
                            value="leaderboard"
                            className={cn(
                                "flex-col gap-0 rounded-lg px-2",
                                settings.isCompactViewOn ? "w-10" : "w-16"
                            )}>
                            <HugeiconsIcon icon={Award01Icon} size={settings.isCompactViewOn ? "1.1em" : "1.4em"} />
                            {!settings.isCompactViewOn && (
                                <span className="text-[10px]">Ranks</span>
                            )}
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setCurrentTab(TabsState.PLAYERS)}
                            value="players"
                            className={cn(
                                "flex-col gap-0 rounded-lg px-2",
                                settings.isCompactViewOn ? "w-10" : "w-16"
                            )}>
                            <HugeiconsIcon icon={UsersIcon} size={settings.isCompactViewOn ? "1.1em" : "1.4em"} />
                            {!settings.isCompactViewOn && (
                                <span className="text-[10px]">Players</span>
                            )}
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setCurrentTab(TabsState.ANALYSIS)}
                            value="analysis"
                            className={cn(
                                "flex-col gap-0 rounded-lg px-2",
                                settings.isCompactViewOn ? "w-10" : "w-16"
                            )}>
                            <HugeiconsIcon icon={ChartColumnIcon} size={settings.isCompactViewOn ? "1.1em" : "1.4em"} />
                            {!settings.isCompactViewOn && (
                                <span className="text-[10px]">Analysis</span>
                            )}
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </aside>
    );
}
