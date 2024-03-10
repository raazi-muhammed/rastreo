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
                    type="button"
                    variant="accent"
                    onClick={() => setInputData((i) => Number(i + n))}>
                    {n}
                </Button>
            ))}
            <Button
                type="button"
                onClick={() => setInputData(0)}
                variant="destructive">
                Clear
            </Button>
        </div>
    );
}
