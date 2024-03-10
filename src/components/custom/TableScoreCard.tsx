import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import NumberInput from "./NumberInput";
import { Trash2 as DeleteIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/lib/utils";

export default function TableScoreCard({
    score,
    index,
    personId,
    handleEditScore,
    handleRemoveScore,
    isOnTouchMode,
}: {
    score: number;
    index: number;
    isOnTouchMode: boolean;
    personId: string;
    handleRemoveScore: (userId: string, index: number) => void;
    handleEditScore: (userId: string, index: number, newScore: number) => void;
}) {
    const [inputData, setInputData] = useState<number>(0);
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <Button
                    className="h-12 w-full rounded-xs bg-card"
                    variant="ghost"
                    onClick={() => {
                        setInputData(score);
                        setOpen(true);
                    }}>
                    <p className="me-auto text-start">{formatNumber(score)}</p>
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
                        handleEditScore(personId, index, inputData);
                        setOpen(false);
                    }}>
                    <Label>Change your current score</Label>
                    <Input
                        value={inputData}
                        className="mb-4"
                        onChange={(e) => setInputData(Number(e.target.value))}
                        type="number"
                    />
                    {isOnTouchMode && (
                        <NumberInput setInputData={setInputData} />
                    )}
                    <div className="mt-3 flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => {
                                handleRemoveScore(personId, index);
                                setOpen(false);
                            }}>
                            <DeleteIcon size="1.2em" />
                        </Button>
                        <Button>Save</Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
