import { Heading } from "@/pages/leaderboard/_components/LeaderBoard";
import LeaderBoardData from "@/pages/leaderboard/_components/LeaderBoardData";
import { Award } from "lucide-react";

const LeaderboardTab = () => {
    return (
        <>
            <Heading icon={Award}>Ranks</Heading>
            <LeaderBoardData />
        </>
    );
};

export default LeaderboardTab;
