import { Separator } from "@/components/ui/separator";
import { v4 as uuidv4 } from "uuid";
import Container from "./components/layout/Container";
import useLocalStorage from "./hooks/useLocalStorage";
import LeaderBoard from "./components/custom/LeaderBoard";
import TablePlayerCard from "./components/custom/TablePlayerCard";
import AddPlayer from "./components/custom/AddPlayer";
import TableScoreCard from "./components/custom/TableScoreCard";
import AddScore from "./components/custom/AddScore";
import { useState } from "react";
import { isDesktop } from "react-device-detect";
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type InitData = {
    players: {
        id: string;
        name: string;
    }[];
    scores: { id: string; scores: { id: string; val: number }[] }[];
};

const initData: InitData = {
    players: [],
    scores: [],
};

export default function App() {
    const [data, setData] = useLocalStorage("__rastreo", initData);
    const [isOnTouchMode, setIsOnTouchMode] = useState(!isDesktop);
    const [showLeaderBoard, setShowLeaderBoard] = useState(isDesktop);

    function handleAddInput(userId: string, newScore: number) {
        const scores = data.scores.map((e) => {
            if (e.id === userId) e.scores.push({ id: uuidv4(), val: newScore });
            return e;
        });
        setData({ ...data, scores });
    }

    function handleEditScore(userId: string, index: number, newScore: number) {
        if (!data.scores) data.scores = [];
        const scores = data.scores.map((s) => {
            if (s.id === userId) s.scores[index].val = newScore;
            return s;
        });
        setData({ ...data, scores });
    }
    function handleRemoveScore(userId: string, index: number) {
        if (!data.scores) data.scores = [];
        const scores = data.scores.filter((s) => {
            if (s.id === userId) s.scores.splice(index, 1);
            return s;
        });
        setData({ ...data, scores });
    }

    function handleAddPerson(name: string) {
        if (!name) return;
        const newId = uuidv4();
        const newData = data;
        newData.players.push({ id: newId, name });
        newData.scores.push({ id: newId, scores: [] });
        // to cause a rerender (...)
        setData({ ...newData });
    }

    function handleDeletePerson(userId: string) {
        const newData = data;
        newData.players = newData.players.filter((p) => p.id !== userId);
        newData.scores = newData.scores.filter((s) => s.id !== userId);
        setData({ ...newData });
    }
    function handleChangePersonName(userId: string, name: string) {
        const newData = data;
        newData.players.map((p) => {
            if (p.id == userId) p.name = name;
            return p;
        });
        setData({ ...newData });
    }

    return (
        <main className="flex min-h-screen w-full bg-gradient-to-br from-purple-50 to-indigo-200">
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
            <Container className="h-screen overflow-auto">
                <section className="mt-8 flex gap-4">
                    {showLeaderBoard ? null : (
                        <PanelRightClose
                            onClick={() => setShowLeaderBoard(true)}
                            className="my-auto text-primary"
                        />
                    )}
                    <h3 className="text-3xl font-semibold text-primary">
                        Scores
                    </h3>
                </section>
                <Separator className="my-2" />
                {data.players.length !== 0 ? (
                    <>
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
                            <AddPlayer handleAddPerson={handleAddPerson} />
                        </section>
                        <section className="flex gap-1">
                            <AnimatePresence>
                                {data.scores.map((s) => (
                                    <motion.section
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1, originY: 0 }}
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
                    </>
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
            </Container>
        </main>
    );
}
