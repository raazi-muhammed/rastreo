import { Award } from "lucide-react";
import { ReactNode, useState } from "react";
import NextDealer from "./NextDealer";
import { ThemeToggle } from "../theme/ThemeToggle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TouchMode from "./TouchMode";
import FitEveryone from "./FitEveryone";
import SortOption from "./SortOption";
import LeaderBoardData from "./LeaderBoardData";

export function Heading({ children }: { children: ReactNode }) {
    return (
        <h3 className="mb-4 mt-8 flex h-fit gap-1 text-3xl font-semibold text-primary">
            <Award size="1.2em" />
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

    return (
        <aside className="flex h-svh w-[20rem] flex-col justify-between gap-4 overflow-scroll bg-background p-4 shadow-xl">
            <section className="h-full">
                {currentTab === TabsState.LEADERBOARD ? (
                    <>
                        <Heading>Leaderboard</Heading>
                        <LeaderBoardData />
                    </>
                ) : (
                    <>
                        <Heading>Settings</Heading>
                        <section className="mb-8 mt-auto h-full space-y-4">
                            <FitEveryone />
                            <TouchMode />
                            <ThemeToggle />
                            <SortOption />
                        </section>
                    </>
                )}
            </section>
            <NextDealer />
            <Tabs defaultValue="leaderboard" className="mx-auto">
                <TabsList>
                    <TabsTrigger
                        onClick={() => setCurrentTab(TabsState.LEADERBOARD)}
                        value="leaderboard">
                        Leaderboard
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setCurrentTab(TabsState.SETTINGS)}
                        value="settings">
                        Settings
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </aside>
    );
}
