import { AllPlayersChart } from "@/components/charts/AllPlayersChart";
import { AllPlayersProgressChart } from "@/components/charts/AllPlayersProgressChart";
import { Heading } from "@/pages/leaderboard/_components/LeaderBoard";
import { BarChart } from "lucide-react";
import AnalyticsTemplate from "./AnalyticsTemplate";
import { useAppSelector } from "@/hooks/redux";

const AnalyticsTab = () => {
    const scores = useAppSelector((state) => state.scores);

    const numberOfGamesPlayed = scores?.[0]?.scores?.length;

    return (
        <>
            <Heading>
                <BarChart size="1.2em" />
                Analysis
            </Heading>
            {numberOfGamesPlayed > 1 ? (
                <>
                    <AnalyticsTemplate title="Per game values">
                        <AllPlayersChart />
                    </AnalyticsTemplate>
                    <AnalyticsTemplate title="Leaderboard progress">
                        <AllPlayersProgressChart />
                    </AnalyticsTemplate>
                </>
            ) : (
                <p className="text-left text-muted-foreground">
                    You have to play at least 2 games to see the analytics
                </p>
            )}
        </>
    );
};

export default AnalyticsTab;
