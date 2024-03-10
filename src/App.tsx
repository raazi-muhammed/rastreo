import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
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

export default function App() {
    const [inputData, setInputData] = useState<number>(0);
    const [inputPerson, setInputPerson] = useState<string>("");

    const [data, setData] = useState({
        players: [
            {
                id: 1,
                name: "Raazi",
            },
            {
                id: 2,
                name: "Remi",
            },
            {
                id: 3,
                name: "Rasal",
            },
        ],
        scores: [
            {
                id: 1,
                scores: [13, 4, 5, 3, 2, 323, 23, 242, 3],
            },
            {
                id: 2,
                scores: [13, 4, 5, 3, 2, 323, 23, 242, 3],
            },
            {
                id: 3,
                scores: [13, 4, 5, 3, 2, 323, 23, 242, 3],
            },
        ],
    });

    function handleAddInput(userId: number) {
        const scores = data.scores.map((e) => {
            if (e.id === userId) e.scores.push(inputData);
            return e;
        });
        setData({ ...data, scores });
        setInputData(0);
    }

    function handleEditScore(userId: number, index: number) {
        const scores = data.scores.map((s) => {
            if (s.id === userId) s.scores[index] = inputData;
            return s;
        });
        setData({ ...data, scores });
        setInputData(0);
    }

    function handleAddPerson() {
        const newData = data;
        newData.players.push({ id: 5, name: inputPerson });
        newData.scores.push({ id: 5, scores: [] });
        // to cause a rerender (...)
        setData({ ...newData });
        setInputPerson("");
    }

    function handleDeletePerson(userId: number) {
        const newData = data;
        newData.players = newData.players.filter((p) => p.id !== userId);
        newData.scores = newData.scores.filter((s) => s.id !== userId);
        setData({ ...newData });
    }
    function handleChangePersonName(userId: number) {
        const newData = data;
        newData.players.map((p) => {
            if (p.id == userId) p.name = inputPerson;
            return p;
        });
        setData({ ...newData });
    }

    return (
        <div>
            <section className="grid grid-cols-8 gap-3 text-white">
                {data.players.map((player) => (
                    <div className="flex rounded bg-primary p-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    onClick={() => setInputPerson(player.name)}>
                                    <p>{player.name}</p>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Button
                                    onClick={() =>
                                        handleDeletePerson(player.id)
                                    }>
                                    Delete
                                </Button>
                                <Input
                                    value={inputPerson}
                                    onChange={(e) =>
                                        setInputPerson(e.target.value)
                                    }
                                    placeholder="name"
                                />
                                <Button
                                    onClick={() =>
                                        handleChangePersonName(player.id)
                                    }>
                                    Change
                                </Button>
                            </PopoverContent>
                        </Popover>
                    </div>
                ))}
            </section>
            <section className="grid grid-cols-8 gap-4 bg-primary">
                {data.scores.map((s) => (
                    <section className="grid gap-2 bg-secondary">
                        <>
                            {s.scores.map((score, index) => (
                                <div className="rounded border p-2">
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button
                                                variant="ghost"
                                                onClick={() =>
                                                    setInputData(score)
                                                }>
                                                <p>{score}</p>
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
                                </div>
                            ))}
                            <Popover>
                                <PopoverTrigger>
                                    <Button>Add</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    Place content for the popover here.
                                    <Input
                                        value={inputData}
                                        onChange={(e) =>
                                            setInputData(Number(e.target.value))
                                        }
                                        type="number"
                                    />
                                    <Button
                                        onClick={() => handleAddInput(s.id)}>
                                        Save
                                    </Button>
                                </PopoverContent>
                            </Popover>
                        </>
                    </section>
                ))}
            </section>

            <section>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button>Add person</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
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
                                Add person
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </section>
        </div>
    );
}
