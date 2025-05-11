import { AllPlayersChart } from "@/components/charts/AllPlayersChart";
import { AllPlayersProgressChart } from "@/components/charts/AllPlayersProgressChart";
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
                    <AnalyticsTemplate title="Per game values">
                        <AllPlayersChart />
                    </AnalyticsTemplate>
                    <AnalyticsTemplate title="Leaderboard progress">
                        <AllPlayersProgressChart />
                    </AnalyticsTemplate>
                </>
            ) : (
                <MessageTemplate title="You have to play at least 2 games to see the analytics" />
            )}
        </>
    );
};

export default AnalyticsTab;
