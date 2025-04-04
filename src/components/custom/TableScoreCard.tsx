import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import NumberInput from "./NumberInput";
import { Crown, Trash2 as DeleteIcon, X, Frown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { calculateNumber, formatNumber } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { deleteScore, editScore } from "@/store/features/scoreSlice";
import { motion } from "framer-motion";
import { usePlayInfo } from "@/hooks/usePlayInfo";

export default function TableScoreCard({
    score,
    index,
    personId,
}: {
    score: number;
    index: number;
    personId: string;
}) {
    const [inputData, setInputData] = useState<string>("");
    const [open, setOpen] = useState(false);
    const isTouchModeOn = useAppSelector(
        (state) => state.settings.isTouchModeOn
    );
    const isLocked = useAppSelector((state) => state.settings.isLocked);
    const dispatch = useAppDispatch();

    function handleEditScore(userId: string, index: number, newScore: number) {
        dispatch(editScore({ userId, index, newScore }));
    }
    function handleRemoveScore(userId: string, index: number) {
        dispatch(deleteScore({ userId, index }));
    }
    const { isTop, isBottom } = usePlayInfo({
        index,
        score,
    });

    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <Button
                    className={`h-12 w-full rounded-xs bg-card hover:bg-secondary relative hover:shadow-lg ${
                        isTop ? "border-primary/30 border" : ""
                    }`}
                    variant="ghost"
                    onClick={() => {
                        if (isLocked) return;
                        setInputData(String(score));
                        setOpen(true);
                    }}>
                    <p className="me-auto text-start text-foreground">
                        {formatNumber(score)}
                    </p>
                    {isTop ? (
                        <Crown
                            size="0.75em"
                            className="absolute bottom-2 right-2"
                        />
                    ) : null}
                    {isBottom ? (
                        <Frown
                            size="0.75em"
                            className="absolute bottom-2 right-2 stroke-red-400"
                        />
                    ) : null}
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
                        handleEditScore(
                            personId,
                            index,
                            calculateNumber(inputData)
                        );
                        setOpen(false);
                    }}>
                    <Label>Change your current score</Label>
                    <div className="flex gap-2">
                        <Input
                            value={inputData}
                            className="mb-4"
                            onChange={(e) => setInputData(e.target.value)}
                            placeholder="0"
                        />
                        <motion.div
                            className="w-fit flex"
                            whileTap={{ scale: 1.3 }}>
                            <Button
                                type="button"
                                className="w-fit"
                                onClick={() =>
                                    setInputData((e) =>
                                        String(calculateNumber(e) * 2)
                                    )
                                }
                                variant="secondary">
                                <X
                                    size=".8rem"
                                    strokeWidth={2.5}
                                    className="my-auto"
                                />
                                2
                            </Button>
                        </motion.div>
                    </div>
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
