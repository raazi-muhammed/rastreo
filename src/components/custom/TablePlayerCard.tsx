import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export default function TablePlayerCard({
    player,
    handleChangePersonName,
    handleDeletePerson,
}: {
    player: { id: string; name: string };
    handleChangePersonName: (userId: string, name: string) => void;
    handleDeletePerson: (userId: string) => void;
}) {
    const [inputPerson, setInputPerson] = useState<string>("");

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
                    <Input
                        value={inputPerson}
                        onChange={(e) => setInputPerson(e.target.value)}
                        placeholder="name"
                    />
                    <div className="mt-2 flex justify-end gap-2">
                        <Button
                            variant="destructive"
                            type="button"
                            onClick={() => handleDeletePerson(player.id)}>
                            Delete
                        </Button>
                        <Button>Change</Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
