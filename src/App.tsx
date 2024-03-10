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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PanelRightClose } from "lucide-react";

export type InitData = {
    players: {
        id: string;
        name: string;
    }[];
    scores: { id: string; scores: number[] }[];
};

const initData: InitData = {
    players: [],
    scores: [],
};

export default function App() {
    const [data, setData] = useLocalStorage("__rastreo", initData);
    const [isOnTouchMode, setIsOnTouchMode] = useState(!isDesktop);

    function handleAddInput(userId: string, newScore: number) {
        const scores = data.scores.map((e) => {
            if (e.id === userId) e.scores.push(newScore);
            return e;
        });
        setData({ ...data, scores });
    }

    function handleEditScore(userId: string, index: number, newScore: number) {
        if (!data.scores) data.scores = [];
        const scores = data.scores.map((s) => {
            if (s.id === userId) s.scores[index] = newScore;
            return s;
        });
        setData({ ...data, scores });
    }

    function handleAddPerson(name: string) {
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
            <div className="hidden md:block">
                <LeaderBoard
                    isOnTouchMode={isOnTouchMode}
                    setIsOnTouchMode={setIsOnTouchMode}
                    data={data}
                />
            </div>
            <Container className="h-screen overflow-auto">
                <section className="mt-8 flex gap-4">
                    <Sheet>
                        <SheetTrigger className="md:hidden">
                            <PanelRightClose className="text-primary" />
                        </SheetTrigger>
                        <SheetContent className="p-0" side="left">
                            <LeaderBoard
                                isOnTouchMode={isOnTouchMode}
                                setIsOnTouchMode={setIsOnTouchMode}
                                data={data}
                            />
                        </SheetContent>
                    </Sheet>
                    <h3 className="text-3xl font-semibold text-primary">
                        Scores
                    </h3>
                </section>
                <Separator className="my-2" />
                <section className="flex gap-1 text-primary">
                    {data.players.map((player) => (
                        <div className="flex w-44 flex-shrink-0 py-2">
                            <TablePlayerCard
                                player={player}
                                handleChangePersonName={handleChangePersonName}
                                handleDeletePerson={handleDeletePerson}
                            />
                        </div>
                    ))}
                    <AddPlayer handleAddPerson={handleAddPerson} />
                </section>
                <section className="flex gap-1">
                    {data.scores.map((s) => (
                        <section className="flex w-44 flex-shrink-0 flex-col gap-2">
                            <>
                                {s.scores.map((score, index) => (
                                    <TableScoreCard
                                        isOnTouchMode={isOnTouchMode}
                                        handleEditScore={handleEditScore}
                                        score={score}
                                        personId={s.id}
                                        index={index}
                                    />
                                ))}
                                {s.scores.length === 0 && (
                                    <div className="grid h-12 w-full place-items-center rounded bg-card">
                                        <p className="mb-1 text-xs text-indigo-300">
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
                        </section>
                    ))}
                </section>
                {data.players.length === 0 && (
                    <div>
                        <p>No players</p>
                    </div>
                )}
            </Container>
        </main>
    );
}
