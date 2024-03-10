import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { Plus as AddIcon } from "lucide-react";

export default function AddScore({
    handleAddInput,
    playerId,
}: {
    playerId: string;
    handleAddInput: (userId: string, newScore: number) => void;
}) {
    const [inputData, setInputData] = useState<number>(0);

    return (
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
                        handleAddInput(playerId, inputData);
                    }}>
                    <Input
                        value={inputData}
                        onChange={(e) => setInputData(Number(e.target.value))}
                        type="number"
                    />
                    <Button size="sm" className="ms-auto mt-2 flex">
                        <AddIcon size="1.2em" className="me-1" />
                        Add
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    );
}
