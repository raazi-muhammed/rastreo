import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Trash2 as DeleteIcon } from "lucide-react";
import { Label } from "../ui/label";
import { useAppDispatch } from "@/hooks/redux";
import { deletePersonScores } from "@/store/features/scoreSlice";
import { deletePerson, editPerson } from "@/store/features/playerSlice";

export default function TablePlayerCard({
    player,
}: {
    player: { id: string; name: string };
}) {
    const [inputPerson, setInputPerson] = useState<string>("");
    const dispatch = useAppDispatch();

    function handleDeletePerson(userId: string) {
        dispatch(deletePersonScores(userId));
        dispatch(deletePerson(userId));
    }
    function handleChangePersonName(userId: string, name: string) {
        dispatch(editPerson({ id: userId, name: name }));
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-10 w-full rounded"
                    onClick={() => setInputPerson(player.name)}>
                    <p className="w-full text-start text-xl font-semibold">
                        {player.name}
                    </p>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleChangePersonName(player.id, inputPerson);
                    }}>
                    <Label>Change player name</Label>
                    <Input
                        value={inputPerson}
                        onChange={(e) => setInputPerson(e.target.value)}
                        placeholder="name"
                    />
                    <div className="mt-3 flex justify-end gap-2">
                        <Button
                            variant="destructive"
                            type="button"
                            onClick={() => handleDeletePerson(player.id)}>
                            <DeleteIcon size="1.2em" />
                        </Button>
                        <Button>Change</Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
