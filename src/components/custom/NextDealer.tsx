import { useAppSelector } from "@/hooks/redux";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export default function NextDealer() {
    const [next, setNext] = useState("raazi");

    const players = useAppSelector((state) => state.players);
    const scores = useAppSelector((state) => state.scores);

    const maxGamesPlayed = useMemo(() => {
        const maxGamesPlayed = scores.reduce(
            (largestNumberOfGames, individualScores) => {
                if (largestNumberOfGames < individualScores.scores.length) {
                    largestNumberOfGames = individualScores.scores.length;
                }
                return largestNumberOfGames;
            },
            0
        );
        setNext(players[maxGamesPlayed % players.length]?.name);
        return maxGamesPlayed;
    }, [players, scores]);

    return (
        <section>
            {next ? (
                <motion.div
                    key={next}
                    animate={{
                        scale: [1.1, 0.9, 1.5, 0.9, 1],
                    }}
                    initial={{ scale: 0.7, originX: 0, originY: 1 }}
                    transition={{ duration: 1 }}>
                    <p className="z-10 ms-2 text-sm text-primary">
                        Next Dealer
                    </p>
                    <section className="flex flex-col justify-between rounded bg-secondary p-3 shadow-sm">
                        <p className="text-lg">
                            <span className="mr-2 rounded bg-background px-3 py-1 text-primary text-sm">
                                {maxGamesPlayed + 1}
                            </span>
                            {next}
                        </p>
                        <small className="opacity-30">
                            Assumed that order of players is order of dealing
                        </small>
                    </section>
                </motion.div>
            ) : null}
        </section>
    );
}
