import { cn, formatNumber } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    ArrowDownDoubleIcon,
    ArrowUp01Icon,
    ArrowUpDoubleIcon,
    CrownIcon as WinnerIcon,
} from "@hugeicons/core-free-icons";
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

function GapSummary({
    toLeader,
    toLast,
}: {
    toLeader?: number;
    toLast?: number;
}) {
    return (
        <>
            {toLast !== undefined ? (
                <span
                    className="flex items-center gap-0.5 text-primary"
                    title="Gap over last">
                    <HugeiconsIcon
                        icon={ArrowDownDoubleIcon}
                        className="size-[1em] text-red"
                    />
                    <span className="sr-only">Gap over last:</span>
                    {formatNumber(toLast)}
                </span>
            ) : null}
            {toLeader !== undefined ? (
                <span
                    className="flex items-center gap-0.5 text-primary"
                    title="Gap to 1st">
                    <HugeiconsIcon
                        icon={ArrowUpDoubleIcon}
                        className="size-[1em] text-green"
                    />
                    <span className="sr-only">Gap to 1st:</span>
                    {formatNumber(toLeader)}
                </span>
            ) : null}
        </>
    );
}

export default function LeaderBoardRow({
    item,
    index,
    isCompact,
    isWinnerRow,
    showGaps,
}: {
    item: LeaderBoardItem;
    index: number;
    isCompact: boolean;
    isWinnerRow: boolean;
    showGaps: boolean;
}) {
    const isSinglePlayer = item.players.length === 1;

    // Index 0 is the leader (or tied for it) and index 1's gap to the leader
    // equals its diff, so only show it from 3rd place on. The last row has no
    // gap to last. Compact rows have no room for the extra numbers.
    const canShowGaps = showGaps && !isCompact;
    const toLeader =
        canShowGaps && index > 1 ? item.totalDifference : undefined;
    const toLast = canShowGaps ? item.differenceFromLast : undefined;
    const hasGaps = toLeader !== undefined || toLast !== undefined;

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
                    className={cn(
                        "shrink-0 text-primary",
                        isCompact ? "size-4" : "size-6"
                    )}
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
                {item.difference !== undefined || hasGaps ? (
                    <small
                        className={cn(
                            "flex items-center justify-end gap-x-2 text-end tabular-nums",
                            !isCompact && "-mt-1"
                        )}>
                        {hasGaps ? <GapSummary toLeader={toLeader} toLast={toLast} /> : null}
                        {item.difference !== undefined ? (
                            <span
                                className="flex items-center gap-0.5 text-primary"
                                title="Gap to player above">
                                {canShowGaps ? (
                                    <>
                                        <HugeiconsIcon
                                            icon={ArrowUp01Icon}
                                            className="size-[1em] text-yellow"
                                        />
                                        <span className="sr-only">
                                            Gap to player above:
                                        </span>
                                    </>
                                ) : null}
                                {formatNumber(item.difference)}
                            </span>
                        ) : null}
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
