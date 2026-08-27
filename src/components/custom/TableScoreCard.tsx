import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { memo, useState } from "react";
import { Input } from "../ui/input";
import NumberInput from "./NumberInput";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import {
    CrownIcon,
    ThumbsDownIcon,
    Delete02Icon as DeleteIcon,
    MultiplicationSignIcon,
    FrownIcon,
    SmileIcon,
} from "@hugeicons/core-free-icons";
import { Label } from "@/components/ui/label";
import { calculateNumber, cn, formatNumber } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { deleteScore, editScore } from "@/store/features/scoreSlice";
import { motion } from "framer-motion";
import { usePlayInfo } from "@/hooks/usePlayInfo";
import { useStandingAtRound } from "@/hooks/useStandingAtRound";

function TableScoreCard({
    score,
    index,
    personId,
}: {
    score: number;
    index: number;
    personId: string;
}) {
    const [inputData, setInputData] = useState<string>("");
    const [open, setOpen] = useState(false);
    const isTouchModeOn = useAppSelector(
        (state) => state.settings.isTouchModeOn
    );
    const isLocked = useAppSelector((state) => state.settings.isLocked);
    const showLeaderboardBadges = useAppSelector(
        (state) => state.settings.showLeaderboardBadges
    );
    const showPerGameBadges = useAppSelector(
        (state) => state.settings.showPerGameBadges
    );
    const isMobileModeOn = useAppSelector(
        (state) => state.settings.isMobileModeOn
    );
    const dispatch = useAppDispatch();
    function handleEditScore(userId: string, index: number, newScore: number) {
        dispatch(editScore({ userId, index, newScore }));
    }
    function handleRemoveScore(userId: string, index: number) {
        dispatch(deleteScore({ userId, index }));
    }
    const { isTop, isBottom } = usePlayInfo({
        index,
        score,
    });
    const { isTop: isOverallTop, isBottom: isOverallBottom } =
        useStandingAtRound({
            index,
            personId,
        });
    const badges: { icon: IconSvgElement; tone: "primary" | "destructive" }[] =
        [
            showLeaderboardBadges &&
                isOverallTop && { icon: CrownIcon, tone: "primary" as const },
            showLeaderboardBadges &&
                isOverallBottom && {
                    icon: ThumbsDownIcon,
                    tone: "destructive" as const,
                },
            showPerGameBadges &&
                isTop && { icon: SmileIcon, tone: "primary" as const },
            showPerGameBadges &&
                isBottom && {
                    icon: FrownIcon,
                    tone: "destructive" as const,
                },
        ].filter(Boolean) as {
            icon: IconSvgElement;
            tone: "primary" | "destructive";
        }[];

    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <Button
                    className={`h-12 w-full rounded-sm bg-card relative hover:shadow-lg`}
                    variant="ghost"
                    onClick={() => {
                        if (isLocked) return;
                        setInputData(String(score));
                        setOpen(true);
                    }}>
                    <p className="me-auto truncate text-start text-foreground">
                        {formatNumber(score)}
                    </p>
                    {badges.length > 0 ? (
                        <div className="absolute bottom-2 right-2 flex items-center">
                            {badges.map((badge, i) => (
                                <span
                                    key={i}
                                    className={cn(
                                        "flex size-5 items-center justify-center rounded-full ring-2 ring-card",
                                        i > 0 && "-ml-2",
                                        badge.tone === "primary"
                                            ? "bg-primary-muted"
                                            : "bg-destructive-muted"
                                    )}>
                                    <HugeiconsIcon
                                        icon={badge.icon}
                                        className={cn(
                                            "size-3",
                                            badge.tone === "primary"
                                                ? "text-primary"
                                                : "text-destructive"
                                        )}
                                    />
                                </span>
                            ))}
                        </div>
                    ) : null}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side={isMobileModeOn ? "right" : "bottom"}
                onInteractOutside={() => setOpen(false)}
                onOpenAutoFocus={
                    isTouchModeOn
                        ? (e) => {
                              e.preventDefault();
                          }
                        : () => {}
                }>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleEditScore(
                            personId,
                            index,
                            calculateNumber(inputData)
                        );
                        setOpen(false);
                    }}>
                    <Label>Change your current score</Label>
                    <div className="flex gap-2">
                        <Input
                            value={inputData}
                            className="mb-4"
                            onChange={(e) => setInputData(e.target.value)}
                            placeholder="0"
                        />
                        <motion.div
                            className="w-fit flex"
                            whileTap={{ scale: 1.3 }}>
                            <Button
                                type="button"
                                className="w-fit"
                                onClick={() =>
                                    setInputData((e) =>
                                        String(calculateNumber(e) * 2)
                                    )
                                }
                                variant="secondary">
                                <HugeiconsIcon
                                    icon={MultiplicationSignIcon}
                                    size=".8rem"
                                    strokeWidth={2.5}
                                    className="my-auto"
                                />
                                2
                            </Button>
                        </motion.div>
                    </div>
                    {isTouchModeOn && (
                        <NumberInput setInputData={setInputData} />
                    )}
                    <div className="mt-3 flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => {
                                handleRemoveScore(personId, index);
                                setOpen(false);
                            }}>
                            <HugeiconsIcon icon={DeleteIcon} size="1.2em" />
                        </Button>
                        <Button>Save</Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}

const MemoizedTableScoreCard = memo(TableScoreCard);
export default MemoizedTableScoreCard;
