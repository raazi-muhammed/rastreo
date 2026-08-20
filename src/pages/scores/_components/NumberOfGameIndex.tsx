import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import useGameDurations, { GameDuration } from "@/hooks/useGameDurations";
import { formatDuration, formatEntryTime } from "@/lib/utils";

const GameIndexItem = ({ game }: { game: GameDuration }) => {
    const { index, startedAt, finishedAt, duration } = game;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-12 justify-end px-0 font-mono text-xs text-muted-foreground hover:bg-transparent hover:text-foreground">
                    {index + 1}
                </Button>
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
