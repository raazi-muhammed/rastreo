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
import { Button } from "../ui/button";
import { UserRoundPlus as AddPersonIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Label } from "../ui/label";

export default function AddPlayer({
    handleAddPerson,
    variant,
}: {
    variant?: "default" | "lg";
    handleAddPerson: (name: string) => void;
}) {
    const [inputPerson, setInputPerson] = useState<string>("");

    return (
        <AlertDialog>
            <AlertDialogTrigger className="min-w-24">
                {variant ? (
                    <Button
                        className="mx-auto my-auto flex size-16 shadow-md"
                        size="icon"
                        onClick={() => setInputPerson("")}>
                        <AddPersonIcon size="1.35em" />
                    </Button>
                ) : (
                    <Button
                        className="mx-auto my-auto flex shadow-md"
                        variant="accent"
                        size="icon"
                        onClick={() => setInputPerson("")}>
                        <AddPersonIcon size="1.35em" />
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-screen flex h-svh w-full flex-col justify-center bg-white sm:h-fit sm:max-w-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>Add an player</AlertDialogTitle>
                </AlertDialogHeader>
                <div>
                    <Label>Enter player name</Label>
                    <Input
                        value={inputPerson}
                        onChange={(e) => setInputPerson(e.target.value)}
                        placeholder="name"
                    />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => handleAddPerson(inputPerson)}>
                        <AddPersonIcon size="1.25em" className="me-1" />
                        Add person
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
