import { HugeiconsIcon } from "@hugeicons/react";
import {
    ArrowLeft01Icon,
    EqualIcon,
    MinusSignIcon,
    PlusSignIcon,
    MultiplicationSignIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { calculateNumber } from "@/lib/utils";
export default function NumberInput({
    setInputData,
}: {
    setInputData: React.Dispatch<React.SetStateAction<string>>;
}) {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "00"];
    const calculation = [
        { icon: PlusSignIcon, value: "+" },
        { icon: MinusSignIcon, value: "-" },
        { icon: MultiplicationSignIcon, value: "*" },
        { icon: EqualIcon, value: "=" },
    ];
    return (
        <div className="grid grid-cols-4 gap-2">
            {calculation.map((n, index) => (
                <motion.div
                    className={`w-full ${
                        index === 0
                            ? "row-start-1 col-start-4"
                            : index === 1
                            ? "row-start-2 col-start-4"
                            : index === 2
                            ? "row-start-3 col-start-4"
                            : "row-start-4 col-start-4"
                    } `}
                    whileTap={{ scale: 1.3 }}>
                    <Button
                        key={n.value}
                        type="button"
                        className="w-full"
                        variant="card"
                        onDoubleClick={() =>
                            setInputData((inputData) =>
                                String(calculateNumber(inputData))
                            )
                        }
                        onClick={() => {
                            if (n.value === "=") {
                                setInputData((inputData) =>
                                    String(calculateNumber(inputData))
                                );
                            } else setInputData((i) => i + n.value);
                        }}>
                        <HugeiconsIcon icon={n.icon} size="1em" />
                    </Button>
                </motion.div>
            ))}
            {numbers.map((n) => (
                <motion.div className="w-full" whileTap={{ scale: 1.3 }}>
                    <Button
                        key={n}
                        type="button"
                        className="w-full bg-muted"
                        variant="secondary"
                        onClick={() => setInputData((i) => i + n)}>
                        {n}
                    </Button>
                </motion.div>
            ))}
            <motion.div className="w-full" whileTap={{ scale: 1.3 }}>
                <Button
                    type="button"
                    className="w-full"
                    onClick={() =>
                        setInputData((e) => e.toString().slice(0, -1))
                    }
                    variant="destructive">
                    <HugeiconsIcon icon={ArrowLeft01Icon} size="1.3em" />
                </Button>
            </motion.div>
        </div>
    );
}
