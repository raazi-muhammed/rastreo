import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useAppSelector } from "@/hooks/redux";
import useGamesStats from "@/hooks/useGamesStats";

function formatEntryTime(timestamp?: number) {
    if (!timestamp) return "No time recorded";
    return new Date(timestamp).toLocaleString([], {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
    });
}

function formatDuration(milliseconds: number) {
    const totalSeconds = Math.round(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours) return `${hours}h ${minutes}m`;
    if (minutes) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
}

function getEntryTimes(
    scores: { scores: { createdAt?: number }[] }[],
    index: number
) {
    const entryTimes = scores
        .map((player) => player.scores[index]?.createdAt)
        .filter((time): time is number => typeof time === "number");

    return {
        firstEntry: entryTimes.length ? Math.min(...entryTimes) : undefined,
        lastEntry: entryTimes.length ? Math.max(...entryTimes) : undefined,
    };
}

const GameIndexItem = ({ index }: { index: number }) => {
    const scores = useAppSelector((state) => state.scores);

    const { firstEntry, lastEntry } = getEntryTimes(scores, index);
    const { lastEntry: previousGameLastEntry } =
        index > 0 ? getEntryTimes(scores, index - 1) : { lastEntry: undefined };

    const durationFromLastGame =
        lastEntry && previousGameLastEntry
            ? lastEntry - previousGameLastEntry
            : undefined;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="flex h-12 items-center justify-end text-xs text-muted-foreground font-mono hover:text-foreground">
                    {index + 1}
                </button>
            </PopoverTrigger>
            <PopoverContent side="right" className="w-fit">
                <p className="text-sm font-medium mb-2">Game {index + 1}</p>
                <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                    <p>First entry: {formatEntryTime(firstEntry)}</p>
                    <p>Last entry: {formatEntryTime(lastEntry)}</p>
                    {durationFromLastGame !== undefined && (
                        <p>
                            Duration from last game:{" "}
                            {formatDuration(durationFromLastGame)}
                        </p>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

const NumberOfGameIndex = () => {
    const { maxGamesPlayed } = useGamesStats();
    return (
        <div className="flex flex-col gap-2 px-2 py-2">
            {/* spacer matching TablePlayerCard height so rows line up */}
            <div className="h-10" />
            {new Array(maxGamesPlayed).fill(0).map((_, index) => (
                <GameIndexItem key={index} index={index} />
            ))}
        </div>
    );
};

export default NumberOfGameIndex;
