import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { Plus as AddIcon } from "lucide-react";
import NumberInput from "./NumberInput";
import { Label } from "../ui/label";

export default function AddScore({
    handleAddInput,
    isOnTouchMode,
    playerId,
}: {
    playerId: string;
    isOnTouchMode: boolean;
    handleAddInput: (userId: string, newScore: number) => void;
}) {
    const [inputData, setInputData] = useState<number>(0);
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <Button
                    onClick={() => setOpen(true)}
                    size="icon"
                    className="mx-auto flex shadow-md shadow-primary/80">
                    <AddIcon size="1.5em" className="mx-auto" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                onInteractOutside={() => setOpen(false)}
                onOpenAutoFocus={
                    isOnTouchMode
                        ? (e) => {
                              e.preventDefault();
                          }
                        : () => {}
                }>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddInput(playerId, inputData);
                        setOpen(false);
                        setInputData(0);
                    }}>
                    <Label>Add a new score record</Label>
                    <Input
                        value={inputData}
                        className="mb-4"
                        onChange={(e) => setInputData(Number(e.target.value))}
                        type="number"
                    />
                    {isOnTouchMode && (
                        <NumberInput setInputData={setInputData} />
                    )}
                    <Button size="sm" className="mx-auto mt-2 flex">
                        <AddIcon size="1.2em" className="me-1" />
                        Add
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    );
}
