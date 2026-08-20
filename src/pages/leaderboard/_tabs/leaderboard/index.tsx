import { Heading } from "@/pages/leaderboard/_components/LeaderBoard";
import LeaderBoardData from "@/pages/leaderboard/_components/LeaderBoardData";
import { Award01Icon } from "@hugeicons/core-free-icons";

const LeaderboardTab = () => {
    return (
        <>
            <Heading icon={Award01Icon}>Ranks</Heading>
            <LeaderBoardData />
        </>
    );
};

export default LeaderboardTab;
