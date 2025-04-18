import { Separator } from "@/components/ui/separator";
import LeaderBoard from "./components/custom/LeaderBoard";
import TablePlayerCard from "./components/custom/TablePlayerCard";
import AddPlayer from "./components/custom/AddPlayer";
import TableScoreCard from "./components/custom/TableScoreCard";
import AddScore from "./components/custom/AddScore";
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ClearAll } from "./components/custom/ClearAll";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import ReactGa from "react-ga";
import { setShowLeaderBoard } from "./store/features/settingsSlice";

export default function App() {
    const players = useAppSelector((state) => state.players);
    const scores = useAppSelector((state) => state.scores);
    const dispatch = useAppDispatch();
    const showLeaderBoard = useAppSelector(
        (state) => state.settings.showLeaderBoard
    );
    const isFitEveryoneOn = useAppSelector(
        (state) => state.settings.isFitEveryoneOn
    );

    ReactGa.pageview("/");

    return (
        <main className="flex min-h-screen w-screen overflow-hidden bg-secondary">
            <AnimatePresence>
                {showLeaderBoard ? (
                    <div className="relative">
                        <PanelLeftClose
                            onClick={() => dispatch(setShowLeaderBoard(false))}
                            size="1.2em"
                            className="absolute right-4 top-4 my-auto ms-auto text-primary"
                        />
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{
                                x: -300,
                                position: "absolute",
                            }}>
                            <LeaderBoard />
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <section
                className={`h-screen ${
                    showLeaderBoard ? "w-[calc(100vw-20rem)]" : "w-[100vw]"
                } `}>
                <section className="mt-8 flex w-full gap-4 px-8">
                    {showLeaderBoard ? null : (
                        <PanelRightClose
                            onClick={() => dispatch(setShowLeaderBoard(true))}
                            className="my-auto text-primary"
                        />
                    )}
                    <h3 className="text-3xl font-semibold text-primary">
                        Scores
                    </h3>
                    <div className="ms-auto gap-2 flex w-fit align-middle">
                        <ClearAll />
                        <AddPlayer />
                    </div>
                </section>
                <Separator className="my-2" />
                {players.length !== 0 ? (
                    <div className="h-screen w-full overflow-auto px-8 pb-44">
                        <section
                            className={`flex gap-1 text-primary min-w-full ${
                                isFitEveryoneOn ? "" : "w-max"
                            }`}>
                            {players.map((player, i) => (
                                <div
                                    key={player.id}
                                    className={`flex flex-col gap-2 w-44 ${
                                        isFitEveryoneOn
                                            ? "flex-shrink"
                                            : "flex-shrink-0"
                                    } py-2`}>
                                    <TablePlayerCard player={player} />
                                    <AnimatePresence initial={false}>
                                        {scores[i].scores.map(
                                            (score, index) => (
                                                <motion.div
                                                    initial={{
                                                        scale: 0.7,
                                                        height: 0,
                                                    }}
                                                    animate={{
                                                        scale: 1,
                                                        height: "auto",
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        scale: 0,
                                                        height: 0,
                                                    }}
                                                    whileHover={{
                                                        scale: 1.05,
                                                    }}
                                                    key={score.id}>
                                                    <TableScoreCard
                                                        score={score.val}
                                                        personId={scores[i].id}
                                                        index={index}
                                                    />
                                                </motion.div>
                                            )
                                        )}
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
                        </section>
                        <section className="flex gap-1"></section>
                    </div>
                ) : (
                    <div className="grid min-h-64 place-content-center gap-4">
                        <AddPlayer variant="lg" />
                        <p className="text-center text-xs text-primary/50">
                            No players yet,
                            <br />
                            Add a player to start tracking
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}
