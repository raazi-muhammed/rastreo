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
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { deleteScore, editScore } from "@/store/features/scoreSlice";

export default function TableScoreCard({
    score,
    index,
    personId,
}: {
    score: number;
    index: number;
    personId: string;
}) {
    const [inputData, setInputData] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const isTouchModeOn = useAppSelector(
        (state) => state.settings.isTouchModeOn
    );

    const dispatch = useAppDispatch();

    function handleEditScore(userId: string, index: number, newScore: number) {
        dispatch(editScore({ userId, index, newScore }));
    }
    function handleRemoveScore(userId: string, index: number) {
        dispatch(deleteScore({ userId, index }));
    }

    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <Button
                    className="h-12 w-full rounded-xs bg-card hover:bg-secondary hover:shadow-lg"
                    variant="ghost"
                    onClick={() => {
                        setInputData(score);
                        setOpen(true);
                    }}>
                    <p className="me-auto text-start text-foreground">
                        {formatNumber(score)}
                    </p>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                onInteractOutside={() => setOpen(false)}
                onOpenAutoFocus={
                    isTouchModeOn
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
                    {isTouchModeOn && (
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
