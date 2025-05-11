import useGamesStats from "@/hooks/useGamesStats";

const NumberOfGameIndex = () => {
    const { maxGamesPlayed } = useGamesStats();
    return (
        <div className="flex flex-col gap-2 mt-[3.75rem] p-2">
            {new Array(maxGamesPlayed).fill(0).map((_, index) => (
                <p className="h-12 text-xs text-muted-foreground font-mono text-right">
                    {index + 1}
                </p>
            ))}
        </div>
    );
};

export default NumberOfGameIndex;
