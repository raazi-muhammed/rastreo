import { Button } from "../ui/button";
import PlayerActionsPopover from "./PlayerActionsPopover";

export default function TablePlayerCard({
    player,
}: {
    player: { id: string; name: string };
}) {
    return (
        <PlayerActionsPopover player={player}>
            <Button
                variant="ghost"
                className="h-10 w-full rounded overflow-hidden text-ellipsis">
                <p className="w-full truncate text-start text-xl font-semibold">
                    {player.name}
                </p>
            </Button>
        </PlayerActionsPopover>
    );
}
