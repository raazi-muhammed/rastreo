import { Delete } from "lucide-react";
import { Button } from "../ui/button";

export default function NumberInput({
    setInputData,
}: {
    setInputData: React.Dispatch<React.SetStateAction<number>>;
}) {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "00"];
    return (
        <div className="grid grid-cols-3 gap-2">
            {numbers.map((n) => (
                <Button
                    key={n}
                    type="button"
                    className="bg-indigo-100"
                    variant="secondary"
                    onClick={() => setInputData((i) => Number(i + n))}>
                    {n}
                </Button>
            ))}
            <Button
                type="button"
                onDoubleClick={() => setInputData(0)}
                onClick={() =>
                    setInputData((e) => Number(e.toString().slice(0, -1)))
                }
                variant="destructive">
                <Delete size="1.3em" />
            </Button>
        </div>
    );
}
