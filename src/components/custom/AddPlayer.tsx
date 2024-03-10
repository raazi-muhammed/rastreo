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

export default function AddPlayer({
    handleAddPerson,
}: {
    handleAddPerson: (name: string) => void;
}) {
    const [inputPerson, setInputPerson] = useState<string>("");

    return (
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
                    <AlertDialogTitle>Add an person</AlertDialogTitle>
                </AlertDialogHeader>
                <Input
                    value={inputPerson}
                    onChange={(e) => setInputPerson(e.target.value)}
                    placeholder="name"
                />
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
