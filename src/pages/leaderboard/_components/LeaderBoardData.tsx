import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "@/hooks/redux";
import MessageTemplate from "@/components/template/MessageTemplate";
import useGamesStats from "@/hooks/useGamesStats";
import useLeaderBoardData from "@/hooks/useLeaderBoardData";
import LeaderBoardRow from "./LeaderBoardRow";

export default function LeaderBoardData() {
    const settings = useAppSelector((state) => state.settings);
    const { sortOption, isCompactViewOn: isCompact } = settings;
    const { maxGamesPlayed } = useGamesStats();
    const leaderBoardData = useLeaderBoardData();

    return (
        <>
            {leaderBoardData.length === 0 ? (
                <MessageTemplate
                    title="No players yet"
                    description="Add player to see leaderboard"
                />
            ) : maxGamesPlayed === 0 ? (
                <MessageTemplate title="Add a score to see the leaderboard" />
            ) : (
                <AnimatePresence>
                    <section key={sortOption}>
                        {leaderBoardData.map((l, index) => (
                            <motion.div
                                className="rounded shadow-accent hover:shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                animate={{ scale: 1 }}
                                key={l.players.map((p) => p.id).join("-")}>
                                <LeaderBoardRow
                                    item={l}
                                    index={index}
                                    isCompact={isCompact}
                                    isWinnerRow={
                                        index === 0 &&
                                        !!sortOption &&
                                        leaderBoardData.length > 1
                                    }
                                />
                            </motion.div>
                        ))}
                    </section>
                </AnimatePresence>
            )}
        </>
    );
}
