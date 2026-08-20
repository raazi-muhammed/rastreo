import { cn, formatNumber } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    ChevronsDownIcon,
    ChevronsUpIcon,
    CrownIcon as WinnerIcon,
} from "@hugeicons/core-free-icons";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
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

    const content = isWinnerRow ? (
        <section
            className={cn(
                "flex justify-between rounded bg-card",
                isSinglePlayer && "cursor-pointer",
                isCompact
                    ? "my-1 items-center gap-2 px-2 py-1"
                    : "my-2 px-4 py-2"
            )}>
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
                    size={isCompact ? "1em" : undefined}
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
                {item.differenceFromLast !== undefined ? (
                    <small className="flex items-center justify-end gap-0.5 text-end text-indigo-800">
                        <HugeiconsIcon
                            icon={ChevronsDownIcon}
                            className="text-red-800/60"
                            size="0.9em"
                        />
                        {formatNumber(item.differenceFromLast)}
                    </small>
                ) : null}
            </div>
        </section>
    ) : (
        <section
            className={cn(
                "flex justify-between rounded bg-card",
                isSinglePlayer && "cursor-pointer",
                isCompact ? "my-1 items-center gap-2 px-2 py-1" : "my-2 p-2"
            )}>
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
                <small
                    className={cn(
                        "flex items-center justify-end text-end text-indigo-800",
                        !isCompact && "-mt-1"
                    )}>
                    <HugeiconsIcon icon={ChevronsUpIcon} className="text-green-800/60" size="0.9em" />
                    {formatNumber(item.totalDifference ?? 0)}
                    {item.differenceFromLast !== undefined ? (
                        <>
                            <span className="mx-1">•</span>
                            <span className="flex items-center gap-0.5">
                                <HugeiconsIcon
                                    icon={ChevronsDownIcon}
                                    className="text-red-800/60"
                                    size="0.9em"
                                />
                                {formatNumber(item.differenceFromLast)}
                            </span>
                        </>
                    ) : null}
                    <span className="mx-1">•</span>
                    <span className="text-indigo-400">
                        {formatNumber(item.difference ?? 0)}
                    </span>
                </small>
            </div>
        </section>
    );

    if (isSinglePlayer) {
        return (
            <PlayerActionsPopover player={item.players[0]} side="right">
                {content}
            </PlayerActionsPopover>
        );
    }

    return content;
}
