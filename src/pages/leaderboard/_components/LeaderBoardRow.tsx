import { cn, formatNumber } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { CrownIcon as WinnerIcon } from "@hugeicons/core-free-icons";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import PlayerActionsPopover from "@/components/custom/PlayerActionsPopover";
import type {
    LeaderBoardItem,
    LeaderBoardPlayer,
} from "@/hooks/useLeaderBoardData";

function PlayerNames({
    players,
    isCompact,
    wrapperClassName,
    itemClassName,
}: {
    players: LeaderBoardPlayer[];
    isCompact: boolean;
    wrapperClassName?: string;
    itemClassName?: string;
}) {
    // When players are tied the card as a whole isn't clickable (ambiguous
    // target), so each tied name keeps its own trigger and stops the click
    // from reaching anything above it.
    const isTie = players.length > 1;

    if (isCompact) {
        return (
            <p className={cn("truncate", wrapperClassName)}>
                {players.map((p, i) => (
                    <Fragment key={p.id}>
                        {i > 0 && ", "}
                        {isTie ? (
                            <PlayerActionsPopover player={p} side="right">
                                <span
                                    className="cursor-pointer"
                                    onClick={(e) => e.stopPropagation()}>
                                    {p.name}
                                </span>
                            </PlayerActionsPopover>
                        ) : (
                            p.name
                        )}
                    </Fragment>
                ))}
            </p>
        );
    }

    return (
        <>
            {players.map((p, i) => (
                <Fragment key={p.id}>
                    {i > 0 && (
                        <Separator className="my-2 bg-muted-foreground/20" />
                    )}
                    {isTie ? (
                        <PlayerActionsPopover player={p}>
                            <p
                                className={cn("cursor-pointer", itemClassName)}
                                onClick={(e) => e.stopPropagation()}>
                                {p.name}
                            </p>
                        </PlayerActionsPopover>
                    ) : (
                        <p className={itemClassName}>{p.name}</p>
                    )}
                </Fragment>
            ))}
        </>
    );
}

export default function LeaderBoardRow({
    item,
    index,
    isCompact,
    isWinnerRow,
}: {
    item: LeaderBoardItem;
    index: number;
    isCompact: boolean;
    isWinnerRow: boolean;
}) {
    const isSinglePlayer = item.players.length === 1;

    const rowClassName = isWinnerRow
        ? cn(
              "flex justify-between rounded",
              isCompact
                  ? "my-1 items-center gap-2 px-2 py-1"
                  : "my-2 px-4 py-2"
          )
        : cn(
              "flex justify-between rounded",
              isCompact ? "my-1 items-center gap-2 px-2 py-1" : "my-2 p-2"
          );

    const rowBody = isWinnerRow ? (
        <>
            <div
                className={cn(
                    "flex-1",
                    isCompact
                        ? "flex items-center gap-1.5 overflow-hidden"
                        : "pr-3"
                )}>
                <HugeiconsIcon
                    icon={WinnerIcon}
                    className="shrink-0 text-primary"
                    size={isCompact ? "1em" : "1.8em"}
                />
                <PlayerNames
                    players={item.players}
                    isCompact={isCompact}
                    wrapperClassName="text-lg"
                    itemClassName="my-auto text-lg"
                />
            </div>
            <div
                className={cn(
                    "text-right",
                    isCompact ? "shrink-0" : "-me-1 mt-auto"
                )}>
                <p className="font-semibold">{formatNumber(item.sum)}</p>
            </div>
        </>
    ) : (
        <>
            <div
                className={cn(
                    "flex flex-1",
                    isCompact
                        ? "items-center gap-1.5 overflow-hidden"
                        : "gap-2"
                )}>
                <p
                    className={cn(
                        "my-auto shrink-0 rounded bg-accent text-center text-xs text-primary",
                        isCompact ? "w-4" : "w-6 p-1"
                    )}>
                    {index + 1}
                </p>
                {isCompact ? (
                    <PlayerNames players={item.players} isCompact />
                ) : (
                    <div className="my-auto flex-1 pr-3">
                        <PlayerNames players={item.players} isCompact={false} />
                    </div>
                )}
            </div>
            <div className={cn("shrink-0", !isCompact && "me-1")}>
                <p className="me-0 ms-auto w-fit font-semibold">
                    {formatNumber(item.sum)}
                </p>
                {item.difference !== undefined ? (
                    <small
                        className={cn(
                            "flex items-center justify-end text-end text-primary",
                            !isCompact && "-mt-1"
                        )}>
                        {formatNumber(item.difference)}
                    </small>
                ) : null}
            </div>
        </>
    );

    if (isSinglePlayer) {
        return (
            <PlayerActionsPopover player={item.players[0]} side="right">
                <Button
                    variant="card"
                    className={cn(
                        rowClassName,
                        "h-auto w-full text-start font-normal"
                    )}>
                    {rowBody}
                </Button>
            </PlayerActionsPopover>
        );
    }

    return <section className={cn("bg-card", rowClassName)}>{rowBody}</section>;
}
