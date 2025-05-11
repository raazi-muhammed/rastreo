import { Heading } from "@/pages/leaderboard/_components/LeaderBoard";
import LeaderBoardData from "@/pages/leaderboard/_components/LeaderBoardData";
import { Award } from "lucide-react";

const LeaderboardTab = () => {
    return (
        <>
            <Heading>
                <Award size="1.2em" />
                Leaderboard
            </Heading>
            <LeaderBoardData />
        </>
    );
};

export default LeaderboardTab;
