import { motion } from "framer-motion";
import useGamesStats from "@/hooks/useGamesStats";

export default function NextDealer() {
    const { nextGamePlayer, maxGamesPlayed } = useGamesStats();

    return (
        <section>
            {nextGamePlayer ? (
                <motion.div
                    key={nextGamePlayer}
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
                            {nextGamePlayer}
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
