import { Award, Crown as WinnerIcon } from "lucide-react";
import Container from "../layout/Container";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { formatNumber } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import NextDealer from "./NextDealer";
import {
    SortOptions,
    changeSortOption,
    toggleFitEveryone,
    toggleTouchMode,
} from "@/store/features/settingsSlice";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type LeaderBoardItem = { player: string; sum: number; difference?: number };

export default function LeaderBoard() {
    const players = useAppSelector((state) => state.players);
    const scores = useAppSelector((state) => state.scores);

    const settings = useAppSelector((state) => state.settings);
    const { sortOption, isTouchModeOn, isFitEveryoneOn } = settings;
    const dispatch = useAppDispatch();

    const [leaderBoardData, setLeaderBoardData] = useState<LeaderBoardItem[]>(
        []
    );
    function findSumOfPlayerWithId(id: string) {
        let sum = 0;
        scores.map((e) => {
            if (e.id === id) sum = e.scores.reduce((a, e) => (a += e.val), 0);
        });
        return sum;
    }

    function addDifferences(lbData: LeaderBoardItem[]) {
        let lastSum = 0;
        return lbData.map((l, i) => {
            l.difference = Math.abs(l.sum - lastSum);
            lastSum = l.sum;
            if (i === 0) l.difference = undefined;
            return l;
        });
    }

    useEffect(() => {
        const lbData: LeaderBoardItem[] = [];
        for (let i = 0; i < players.length; i++) {
            const sum = findSumOfPlayerWithId(players[i].id);
            lbData.push({
                player: players[i].name,
                sum,
            });
        }

        let withDifference: LeaderBoardItem[] = lbData;
        if (sortOption == SortOptions.TO_HIGH) {
            lbData.sort((a, b) => a.sum - b.sum);
            withDifference = addDifferences(lbData);
        } else {
            lbData.sort((a, b) => b.sum - a.sum);
            withDifference = addDifferences(lbData);
        }
        setLeaderBoardData(withDifference);
    }, [players, scores, sortOption]);

    return (
        <aside className="h-svh w-[20rem] overflow-scroll bg-background shadow-xl">
            <Container className="flex h-full flex-col justify-between align-middle">
                <h3 className="mt-8 flex gap-1 text-3xl font-semibold text-primary">
                    <Award size="1.2em" />
                    Leaderboard
                </h3>
                <Separator className="my-2" />
                {leaderBoardData.length > 0 ? (
                    <AnimatePresence>
                        <motion.section
                            initial={{ x: -100 }}
                            animate={{ x: 0 }}
                            exit={{
                                transition: { duration: 0 },
                            }}
                            key={sortOption}>
                            {leaderBoardData.map((l, index) => (
                                <motion.div
                                    className="rounded shadow-accent hover:shadow-lg"
                                    initial={{ scale: 0.7 }}
                                    whileHover={{ scale: 1.05 }}
                                    animate={{ scale: 1 }}
                                    key={l.player}>
                                    {index === 0 && sortOption ? (
                                        <section className="my-2 flex justify-between rounded border bg-indigo-50 px-4 py-2 shadow-md shadow-accent">
                                            <div>
                                                <WinnerIcon className="text-primary" />
                                                <p className="my-auto text-lg">
                                                    {l.player}
                                                </p>
                                            </div>
                                            <p className="-me-1 mt-auto font-semibold">
                                                {formatNumber(l.sum)}
                                            </p>
                                        </section>
                                    ) : (
                                        <section className="my-2 flex justify-between rounded bg-indigo-50 p-2">
                                            <div className="flex gap-2">
                                                <p className="my-auto w-6 rounded bg-accent p-1 text-center text-xs text-primary">
                                                    {index + 1}
                                                </p>
                                                <p className="my-auto">
                                                    {l.player}
                                                </p>
                                            </div>
                                            <div className="me-1">
                                                <p className="me-0 ms-auto w-fit font-semibold">
                                                    {formatNumber(l.sum)}
                                                </p>
                                                {l.difference ? (
                                                    <small className="-mt-1 flex justify-end text-end text-indigo-400">
                                                        {formatNumber(
                                                            l.difference
                                                        )}
                                                    </small>
                                                ) : null}
                                            </div>
                                        </section>
                                    )}
                                </motion.div>
                            ))}
                        </motion.section>
                    </AnimatePresence>
                ) : (
                    <p className="my-8 text-primary/50">No players</p>
                )}
                <section className="mb-8 mt-auto space-y-4">
                    <NextDealer />
                    <section className="flex justify-between gap-4 rounded bg-secondary p-3">
                        <p>Fit everyone</p>
                        <Switch
                            defaultChecked={isFitEveryoneOn}
                            onCheckedChange={() => {
                                dispatch(toggleFitEveryone());
                            }}
                        />
                    </section>
                    <section className="flex justify-between gap-4 rounded bg-secondary p-3">
                        <p>Touch Mode</p>
                        <Switch
                            defaultChecked={isTouchModeOn}
                            onCheckedChange={() => {
                                dispatch(toggleTouchMode());
                            }}
                        />
                    </section>
                    <section className="flex justify-between gap-4 rounded bg-secondary px-3 py-2">
                        <p className="my-auto">Who wins</p>
                        <Select
                            defaultValue={sortOption}
                            onValueChange={(value) => {
                                dispatch(
                                    changeSortOption(value as SortOptions)
                                );
                            }}>
                            <SelectTrigger className="-me-1 h-8 w-fit bg-secondary">
                                <SelectValue placeholder="none" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={SortOptions.TO_HIGH}>
                                    Lowest
                                </SelectItem>
                                <SelectItem value={SortOptions.TO_LOW}>
                                    Highest
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </section>
                </section>
            </Container>
        </aside>
    );
}
