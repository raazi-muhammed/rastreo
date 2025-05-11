import ScoreAnimation from "@/components/animations/ScoreAnimation";
import AddScore from "@/components/custom/AddScore";
import TablePlayerCard from "@/components/custom/TablePlayerCard";
import TableScoreCard from "@/components/custom/TableScoreCard";
import { useAppSelector } from "@/hooks/redux";
import { AnimatePresence } from "framer-motion";

const ScoresTable = () => {
    const players = useAppSelector((state) => state.players);
    const scores = useAppSelector((state) => state.scores);
    const isFitEveryoneOn = useAppSelector(
        (state) => state.settings.isFitEveryoneOn
    );
    return (
        <>
            {players.map((player, i) => (
                <div
                    key={player.id}
                    className={`flex flex-col gap-2 w-44 ${
                        isFitEveryoneOn ? "flex-shrink" : "flex-shrink-0"
                    } py-2`}>
                    <TablePlayerCard player={player} />
                    <AnimatePresence initial={false}>
                        {scores[i].scores.map((score, index) => (
                            <ScoreAnimation>
                                <TableScoreCard
                                    score={score.val}
                                    personId={scores[i].id}
                                    index={index}
                                />
                            </ScoreAnimation>
                        ))}
                    </AnimatePresence>
                    {scores[i].scores.length === 0 && (
                        <div className="grid h-12 w-full place-items-center rounded-xs bg-card opacity-50">
                            <p className="my-auto text-xs text-card-foreground">
                                No score yet
                            </p>
                        </div>
                    )}
                    <AddScore playerId={scores[i].id} />
                </div>
            ))}
        </>
    );
};

export default ScoresTable;
