import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";

export default function TableScoreCard({
    score,
    index,
    personId,
    handleEditScore,
}: {
    score: number;
    index: number;
    personId: string;
    handleEditScore: (userId: string, index: number, newScore: number) => void;
}) {
    const [inputData, setInputData] = useState<number>(0);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className="h-12 w-full rounded-xs bg-card"
                    variant="ghost"
                    onClick={() => setInputData(score)}>
                    <p className="me-auto text-start">{score}</p>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                Place content for the popover here.
                <Input
                    value={inputData}
                    onChange={(e) => setInputData(Number(e.target.value))}
                    type="number"
                />
                <Button
                    onClick={() => handleEditScore(personId, index, inputData)}>
                    Save
                </Button>
            </PopoverContent>
        </Popover>
    );
}
