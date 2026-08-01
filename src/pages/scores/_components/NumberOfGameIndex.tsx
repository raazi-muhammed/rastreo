import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import useGameDurations, { GameDuration } from "@/hooks/useGameDurations";
import { formatDuration } from "@/lib/utils";

function formatEntryTime(timestamp?: number) {
    if (!timestamp) return "No time recorded";
    return new Date(timestamp).toLocaleString([], {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
    });
}

const GameIndexItem = ({ game }: { game: GameDuration }) => {
    const { index, startedAt, finishedAt, duration } = game;

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
                    <p>Started: {formatEntryTime(startedAt)}</p>
                    <p>Finished: {formatEntryTime(finishedAt)}</p>
                    {duration !== undefined && (
                        <p>Duration: {formatDuration(duration)}</p>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

const NumberOfGameIndex = () => {
    const { games } = useGameDurations();
    return (
        <div className="flex flex-col gap-2 px-2 py-2">
            {/* spacer matching TablePlayerCard height so rows line up */}
            <div className="h-10" />
            {games.map((game) => (
                <GameIndexItem key={game.index} game={game} />
            ))}
        </div>
    );
};

export default NumberOfGameIndex;
