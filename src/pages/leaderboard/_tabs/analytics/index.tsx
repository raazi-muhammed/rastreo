import { AllPlayersChart } from "@/components/charts/AllPlayersChart";
import { AllPlayersProgressChart } from "@/components/charts/AllPlayersProgressChart";
import { GameDurationsChart } from "@/components/charts/GameDurationsChart";
import { Heading } from "@/pages/leaderboard/_components/LeaderBoard";
import { BarChart } from "lucide-react";
import AnalyticsTemplate from "./AnalyticsTemplate";
import MessageTemplate from "@/components/template/MessageTemplate";
import useGamesStats from "@/hooks/useGamesStats";

const AnalyticsTab = () => {
    const { maxGamesPlayed } = useGamesStats();

    return (
        <>
            <Heading>
                <BarChart size="1.2em" />
                Analysis
            </Heading>
            {maxGamesPlayed > 1 ? (
                <>
                    <AnalyticsTemplate
                        title="Per game values"
                        expanded={<AllPlayersChart showLegend expanded />}>
                        <AllPlayersChart />
                    </AnalyticsTemplate>
                    <AnalyticsTemplate
                        title="Leaderboard progress"
                        expanded={
                            <AllPlayersProgressChart showLegend expanded />
                        }>
                        <AllPlayersProgressChart />
                    </AnalyticsTemplate>
                    <AnalyticsTemplate
                        title="Game durations"
                        expanded={<GameDurationsChart expanded />}>
                        <GameDurationsChart />
                    </AnalyticsTemplate>
                </>
            ) : (
                <MessageTemplate title="You have to play at least 2 games to see the analytics" />
            )}
        </>
    );
};

export default AnalyticsTab;
