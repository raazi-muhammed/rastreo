import { Separator } from "@/components/ui/separator";
import LeaderBoard from "./components/custom/LeaderBoard";
import TablePlayerCard from "./components/custom/TablePlayerCard";
import AddPlayer from "./components/custom/AddPlayer";
import TableScoreCard from "./components/custom/TableScoreCard";
import AddScore from "./components/custom/AddScore";
import { useState } from "react";
import { isDesktop } from "react-device-detect";
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ClearAll } from "./components/custom/ClearAll";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import {
    addScore,
    deleteAllScores,
    deletePersonScores,
    deleteScore,
    editScore,
    initializePerson,
} from "./store/features/scoreSlice";
import {
    addPerson,
    deletePerson,
    editPerson,
} from "./store/features/playerSlice";
import { v4 as uuidv4 } from "uuid";

export default function App() {
    const data = useAppSelector((state) => state);
    const [isOnTouchMode, setIsOnTouchMode] = useState(!isDesktop);
    const [showLeaderBoard, setShowLeaderBoard] = useState(isDesktop);
    const dispatch = useAppDispatch();

    function handleAddInput(userId: string, newScore: number) {
        dispatch(addScore({ userId, newScore }));
    }

    function handleEditScore(userId: string, index: number, newScore: number) {
        if (!data.scores) data.scores = [];
        dispatch(editScore({ userId, index, newScore }));
    }
    function handleRemoveScore(userId: string, index: number) {
        if (!data.scores) data.scores = [];
        dispatch(deleteScore({ userId, index }));
    }

    function handleAddPerson(name: string) {
        if (!name) return;
        const id = uuidv4();
        dispatch(addPerson({ id, name }));
        dispatch(initializePerson(id));
    }

    function handleDeletePerson(userId: string) {
        dispatch(deletePersonScores(userId));
        dispatch(deletePerson(userId));
    }
    function handleChangePersonName(userId: string, name: string) {
        dispatch(editPerson({ id: userId, name: name }));
    }

    function handleClearAll() {
        dispatch(deleteAllScores());
    }
    return (
        <main className="flex min-h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-200">
            <AnimatePresence>
                {showLeaderBoard ? (
                    <div className="relative">
                        <PanelLeftClose
                            onClick={() => setShowLeaderBoard(false)}
                            size="1.2em"
                            className="absolute right-4 top-4 my-auto ms-auto text-indigo-400"
                        />
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{
                                x: -300,
                                position: "absolute",
                            }}>
                            <LeaderBoard
                                isOnTouchMode={isOnTouchMode}
                                setIsOnTouchMode={setIsOnTouchMode}
                                data={data}
                            />
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
                            onClick={() => setShowLeaderBoard(true)}
                            className="my-auto text-primary"
                        />
                    )}
                    <h3 className="text-3xl font-semibold text-primary">
                        Scores
                    </h3>
                    <div className="ms-auto flex w-fit align-middle">
                        <ClearAll handleClearAll={handleClearAll} />
                        <AddPlayer handleAddPerson={handleAddPerson} />
                    </div>
                </section>
                <Separator className="my-2" />
                {data.players.length !== 0 ? (
                    <div className="h-screen w-full overflow-auto px-8 pb-44">
                        <section className="flex gap-1 text-primary">
                            {data.players.map((player) => (
                                <div
                                    key={player.id}
                                    className="flex w-44 flex-shrink-0 py-2">
                                    <TablePlayerCard
                                        player={player}
                                        handleChangePersonName={
                                            handleChangePersonName
                                        }
                                        handleDeletePerson={handleDeletePerson}
                                    />
                                </div>
                            ))}
                        </section>
                        <section className="flex gap-1">
                            <AnimatePresence>
                                {data.scores.map((s) => (
                                    <motion.section
                                        initial={{ scale: 0 }}
                                        animate={{
                                            scale: 1,
                                            originY: 0,
                                        }}
                                        exit={{
                                            scale: 0,
                                            originY: 0,
                                        }}
                                        key={s.id}
                                        className="flex w-44 flex-shrink-0 flex-col gap-2">
                                        <>
                                            <AnimatePresence initial={false}>
                                                {s.scores.map(
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
                                                                handleRemoveScore={
                                                                    handleRemoveScore
                                                                }
                                                                isOnTouchMode={
                                                                    isOnTouchMode
                                                                }
                                                                handleEditScore={
                                                                    handleEditScore
                                                                }
                                                                score={
                                                                    score.val
                                                                }
                                                                personId={s.id}
                                                                index={index}
                                                            />
                                                        </motion.div>
                                                    )
                                                )}
                                            </AnimatePresence>
                                            {s.scores.length === 0 && (
                                                <div className="grid h-12 w-full place-items-center rounded-xs bg-card opacity-50">
                                                    <p className="my-auto text-xs text-indigo-300">
                                                        No score yet
                                                    </p>
                                                </div>
                                            )}
                                            <AddScore
                                                isOnTouchMode={isOnTouchMode}
                                                playerId={s.id}
                                                handleAddInput={handleAddInput}
                                            />
                                        </>
                                    </motion.section>
                                ))}
                            </AnimatePresence>
                        </section>
                    </div>
                ) : (
                    <div className="grid min-h-64 place-content-center gap-4">
                        <AddPlayer
                            variant="lg"
                            handleAddPerson={handleAddPerson}
                        />
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
