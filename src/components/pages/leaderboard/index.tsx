import { Heading } from "@/components/custom/LeaderBoard";
import LeaderBoardData from "@/components/custom/LeaderBoardData";
import { Award } from "lucide-react";

const LeaderboardPage = () => {
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

export default LeaderboardPage;
