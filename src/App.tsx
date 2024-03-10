import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Plus as AddIcon,
    UserRoundPlus as AddPersonIcon,
    Award,
    SquareKanban,
    Crown as WinnerIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { v4 as uuidv4 } from "uuid";
import Container from "./components/layout/Container";
import useLocalStorage from "./hooks/useLocalStorage";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

enum SortOptions {
    TOHIGH = "TOHIGH",
    TOLOW = "TOLOW",
    NONE = "NONE",
}

type LeaderBoardItem = { player: string; sum: number; difference?: number };

export default function App() {
    const [inputData, setInputData] = useState<number>(0);
    const [inputPerson, setInputPerson] = useState<string>("");
    const [sortOption, setSortOption] = useState<SortOptions>(SortOptions.NONE);
    const [leaderBoardData, setLeaderBoardData] = useState<LeaderBoardItem[]>(
        []
    );

    type InitData = {
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

    const [data, setData] = useLocalStorage("__rastreo", initData);

    function handleAddInput(userId: string) {
        const scores = data.scores.map((e) => {
            if (e.id === userId) e.scores.push(inputData);
            return e;
        });
        setData({ ...data, scores });
        setInputData(0);
    }

    function handleEditScore(userId: string, index: number) {
        if (!data.scores) data.scores = [];
        const scores = data.scores.map((s) => {
            if (s.id === userId) s.scores[index] = inputData;
            return s;
        });
        setData({ ...data, scores });
        setInputData(0);
    }

    function handleAddPerson() {
        const newId = uuidv4();
        const newData = data;
        newData.players.push({ id: newId, name: inputPerson });
        newData.scores.push({ id: newId, scores: [] });
        // to cause a rerender (...)
        setData({ ...newData });
        setInputPerson("");
    }

    function handleDeletePerson(userId: string) {
        const newData = data;
        newData.players = newData.players.filter((p) => p.id !== userId);
        newData.scores = newData.scores.filter((s) => s.id !== userId);
        setData({ ...newData });
    }
    function handleChangePersonName(userId: string) {
        const newData = data;
        newData.players.map((p) => {
            if (p.id == userId) p.name = inputPerson;
            return p;
        });
        setData({ ...newData });
    }

    function findSumOfPlayerWithId(id: string) {
        let sum = 0;
        data.scores.map((e) => {
            if (e.id === id) sum = e.scores.reduce((a, e) => (a += e), 0);
        });
        return sum;
    }

    function addDifferences(lbData: LeaderBoardItem[]) {
        let lastSum = 0;
        return lbData.map((l, i) => {
            l.difference = l.sum - lastSum;
            lastSum = l.sum;
            if (i === 0) l.difference = undefined;
            return l;
        });
    }

    useEffect(() => {
        const lbData: LeaderBoardItem[] = [];
        for (let i = 0; i < data.players.length; i++) {
            const sum = findSumOfPlayerWithId(data.players[i].id);
            lbData.push({
                player: data.players[i].name,
                sum,
            });
        }

        let withDifference: LeaderBoardItem[] = lbData;
        if (sortOption == SortOptions.TOHIGH) {
            lbData.sort((a, b) => a.sum - b.sum);
            withDifference = addDifferences(lbData);
        } else if (sortOption == SortOptions.TOLOW) {
            lbData.sort((a, b) => b.sum - a.sum);
            withDifference = addDifferences(lbData);
        }
        setLeaderBoardData(withDifference);
    }, [data, sortOption]);

    return (
        <main className="flex min-h-screen w-full bg-gradient-to-br from-purple-50 to-indigo-200">
            <aside className="h-screen min-w-80 bg-background">
                <Container className="flex h-full flex-col justify-between align-middle">
                    <h3 className="mt-8 flex gap-1 text-3xl font-semibold text-primary">
                        <Award size="1.2em" />
                        Leaderboard
                    </h3>
                    <Separator className="my-2" />
                    <section>
                        {leaderBoardData.map((l, index) => (
                            <>
                                {index === 0 &&
                                sortOption != SortOptions.NONE ? (
                                    <section className="my-2 flex justify-between rounded border border-primary bg-indigo-50 px-4 py-2">
                                        <div>
                                            <WinnerIcon className="text-primary" />
                                            <p className="my-auto text-lg">
                                                {l.player}
                                            </p>
                                        </div>
                                        <p className="mt-auto font-semibold">
                                            {l.sum}
                                        </p>
                                    </section>
                                ) : (
                                    <section className="my-2 flex justify-between rounded bg-indigo-50 p-2">
                                        <div className="flex gap-2">
                                            <p className="my-auto w-6 rounded bg-accent p-1 text-center text-xs text-primary">
                                                {index + 1}
                                            </p>
                                            <p className="my-auto">
                                                {l.player}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">
                                                {l.sum}
                                            </p>
                                            <small className="-mt-1 flex justify-end text-end text-indigo-400">
                                                {l.difference}
                                            </small>
                                        </div>
                                    </section>
                                )}
                            </>
                        ))}
                    </section>
                    <Tabs
                        onValueChange={(value) => {
                            setSortOption(value as SortOptions);
                        }}
                        defaultValue={SortOptions.NONE}
                        className="mx-auto mb-8 mt-auto flex h-fit w-fit">
                        <TabsList>
                            <TabsTrigger value={SortOptions.TOLOW}>
                                Lowest
                            </TabsTrigger>
                            <TabsTrigger value={SortOptions.NONE}>
                                None
                            </TabsTrigger>
                            <TabsTrigger value={SortOptions.TOHIGH}>
                                Hightest
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </Container>
            </aside>
            <Container className="h-screen overflow-auto">
                <h3 className="mt-8 text-3xl font-semibold text-primary">
                    Scores
                </h3>
                <Separator className="my-2" />
                <section className="flex gap-1 text-primary">
                    {data.players.map((player) => (
                        <div className="flex w-44 flex-shrink-0 py-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="h-10 w-full rounded"
                                        onClick={() =>
                                            setInputPerson(player.name)
                                        }>
                                        <p className="w-full text-start text-xl font-semibold">
                                            {player.name}
                                        </p>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleChangePersonName(player.id);
                                        }}>
                                        <Input
                                            value={inputPerson}
                                            onChange={(e) =>
                                                setInputPerson(e.target.value)
                                            }
                                            placeholder="name"
                                        />
                                        <div className="mt-2 flex justify-end gap-2">
                                            <Button
                                                variant="destructive"
                                                type="button"
                                                onClick={() =>
                                                    handleDeletePerson(
                                                        player.id
                                                    )
                                                }>
                                                Delete
                                            </Button>
                                            <Button>Change</Button>
                                        </div>
                                    </form>
                                </PopoverContent>
                            </Popover>
                        </div>
                    ))}
                    <AlertDialog>
                        <AlertDialogTrigger className="mx-2 my-auto flex">
                            <Button
                                variant="accent"
                                size="icon"
                                onClick={() => setInputPerson("")}>
                                <AddPersonIcon size="1.35em" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Add an person
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <Input
                                value={inputPerson}
                                onChange={(e) => setInputPerson(e.target.value)}
                                placeholder="name"
                            />
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleAddPerson}>
                                    <AddPersonIcon
                                        size="1.25em"
                                        className="me-1"
                                    />
                                    Add person
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </section>
                <section className="flex gap-1">
                    {data.scores.map((s) => (
                        <section className="flex w-44 flex-shrink-0 flex-col gap-2">
                            <>
                                {s.scores.map((score, index) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                className="h-12 w-full rounded-xs bg-card"
                                                variant="ghost"
                                                onClick={() =>
                                                    setInputData(score)
                                                }>
                                                <p className="me-auto text-start">
                                                    {score}
                                                </p>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            Place content for the popover here.
                                            <Input
                                                value={inputData}
                                                onChange={(e) =>
                                                    setInputData(
                                                        Number(e.target.value)
                                                    )
                                                }
                                                type="number"
                                            />
                                            <Button
                                                onClick={() =>
                                                    handleEditScore(s.id, index)
                                                }>
                                                Save
                                            </Button>
                                        </PopoverContent>
                                    </Popover>
                                ))}
                                {s.scores.length === 0 && (
                                    <div className="grid h-12 w-full place-items-center rounded bg-card">
                                        <p className="mb-1 text-xs text-indigo-300">
                                            No score yet
                                        </p>
                                    </div>
                                )}
                                <Popover>
                                    <PopoverTrigger>
                                        <Button size="icon">
                                            <AddIcon size="1.5em" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleAddInput(s.id);
                                            }}>
                                            <Input
                                                value={inputData}
                                                onChange={(e) =>
                                                    setInputData(
                                                        Number(e.target.value)
                                                    )
                                                }
                                                type="number"
                                            />
                                            <Button
                                                size="sm"
                                                className="ms-auto mt-2 flex">
                                                <AddIcon
                                                    size="1.2em"
                                                    className="me-1"
                                                />
                                                Add
                                            </Button>
                                        </form>
                                    </PopoverContent>
                                </Popover>
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
