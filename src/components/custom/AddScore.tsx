import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { Plus as AddIcon, X } from "lucide-react";
import NumberInput from "./NumberInput";
import { Label } from "../ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addScore } from "@/store/features/scoreSlice";
import { motion } from "framer-motion";
import { calculateNumber, removeLeadingZeros } from "@/lib/utils";

export default function AddScore({ playerId }: { playerId: string }) {
    const [inputData, setInputData] = useState<string>("");
    const [open, setOpen] = useState(false);
    const isTouchModeOn = useAppSelector(
        (state) => state.settings.isTouchModeOn
    );
    const isLocked = useAppSelector((state) => state.settings.isLocked);
    const dispatch = useAppDispatch();

    function handleAddInput(userId: string, newScore: number) {
        dispatch(addScore({ userId, newScore }));
    }

    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <Button
                    disabled={isLocked}
                    onClick={() => setOpen(true)}
                    size="icon"
                    className="mx-auto flex shadow-md shadow-primary/80">
                    <AddIcon size="1.5em" className="mx-auto" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                sideOffset={-20}
                side="bottom"
                align="center"
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
                        handleAddInput(playerId, calculateNumber(inputData));
                        setOpen(false);
                        setInputData("");
                    }}>
                    <Label>Add a new score record</Label>
                    <div className="flex gap-2 w-full">
                        <Input
                            value={inputData}
                            placeholder="0"
                            className="mb-4 w-full"
                            onChange={(e) => setInputData(e.target.value)}
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
                    <Button size="sm" className="mx-auto mt-2 flex">
                        <AddIcon size="1.2em" className="me-1" />
                        Add
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    );
}
