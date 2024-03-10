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
import { Plus as AddIcon, UserRoundPlus as AddPersonIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Container from "./components/layout/Container";

export default function App() {
    const [inputData, setInputData] = useState<number>(0);
    const [inputPerson, setInputPerson] = useState<string>("");

    const [data, setData] = useState({
        players: [
            {
                id: "1",
                name: "Raazi",
            },
            {
                id: "2",
                name: "Remi",
            },
            {
                id: "3",
                name: "Rasal",
            },
        ],
        scores: [
            {
                id: "1",
                scores: [13, 4, 5, 3, 2, 323, 23, 242, 3],
            },
            {
                id: "2",
                scores: [13, 4, 5, 3, 2, 323, 23, 242, 3],
            },
            {
                id: "3",
                scores: [13, 4, 5, 3, 2, 323, 23, 242, 3],
            },
        ],
    });

    function handleAddInput(userId: string) {
        const scores = data.scores.map((e) => {
            if (e.id === userId) e.scores.push(inputData);
            return e;
        });
        setData({ ...data, scores });
        setInputData(0);
    }

    function handleEditScore(userId: string, index: number) {
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

    return (
        <main className="min-h-screen w-full overflow-auto bg-gradient-to-br from-purple-50 to-indigo-200">
            <Container>
                <section className="flex gap-1 text-primary">
                    {data.players.map((player) => (
                        <div className="flex w-44 flex-shrink-0 py-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="w-full"
                                        onClick={() =>
                                            setInputPerson(player.name)
                                        }>
                                        <p className="w-full text-start text-lg font-bold">
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
                        <AlertDialogTrigger className="me-4 ms-auto flex py-2">
                            <Button
                                className="my-auto flex"
                                onClick={() => setInputPerson("")}>
                                <AddPersonIcon size="1.25em" className="me-1" />
                                Add person
                            </Button>
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
                                                className="h-12 w-full rounded bg-card"
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
                                            <Button className="ms-auto mt-2 flex">
                                                <AddIcon
                                                    size="1.3em"
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
            </Container>
        </main>
    );
}
