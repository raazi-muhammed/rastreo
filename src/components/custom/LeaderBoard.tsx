import { Award, Crown as WinnerIcon } from "lucide-react";
import Container from "../layout/Container";
import { Separator } from "../ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { InitData } from "@/App";

enum SortOptions {
    TOHIGH = "TOHIGH",
    TOLOW = "TOLOW",
    NONE = "NONE",
}
type LeaderBoardItem = { player: string; sum: number; difference?: number };

export default function LeaderBoard({ data }: { data: InitData }) {
    const [sortOption, setSortOption] = useState<SortOptions>(SortOptions.NONE);
    const [leaderBoardData, setLeaderBoardData] = useState<LeaderBoardItem[]>(
        []
    );
    function findSumOfPlayerWithId(id: string) {
        let sum = 0;
        data.scores.map((e) => {
            if (e.id === id) sum = e.scores.reduce((a, e) => (a += e), 0);
        });
        return sum;
    }

    function addDifferences(lbData: LeaderBoardItem[]) {
        let lastSum = 0;
        return lbData.map((l, i) => {
            l.difference = l.sum - lastSum;
            lastSum = l.sum;
            if (i === 0) l.difference = undefined;
            return l;
        });
    }

    useEffect(() => {
        const lbData: LeaderBoardItem[] = [];
        for (let i = 0; i < data.players.length; i++) {
            const sum = findSumOfPlayerWithId(data.players[i].id);
            lbData.push({
                player: data.players[i].name,
                sum,
            });
        }

        let withDifference: LeaderBoardItem[] = lbData;
        if (sortOption == SortOptions.TOHIGH) {
            lbData.sort((a, b) => a.sum - b.sum);
            withDifference = addDifferences(lbData);
        } else if (sortOption == SortOptions.TOLOW) {
            lbData.sort((a, b) => b.sum - a.sum);
            withDifference = addDifferences(lbData);
        }
        setLeaderBoardData(withDifference);
    }, [data, sortOption]);

    return (
        <aside className="h-screen min-w-80 bg-background">
            <Container className="flex h-full flex-col justify-between align-middle">
                <h3 className="mt-8 flex gap-1 text-3xl font-semibold text-primary">
                    <Award size="1.2em" />
                    Leaderboard
                </h3>
                <Separator className="my-2" />
                <section>
                    {leaderBoardData.map((l, index) => (
                        <>
                            {index === 0 && sortOption != SortOptions.NONE ? (
                                <section className="my-2 flex justify-between rounded border border-primary bg-indigo-50 px-4 py-2">
                                    <div>
                                        <WinnerIcon className="text-primary" />
                                        <p className="my-auto text-lg">
                                            {l.player}
                                        </p>
                                    </div>
                                    <p className="mt-auto font-semibold">
                                        {l.sum}
                                    </p>
                                </section>
                            ) : (
                                <section className="my-2 flex justify-between rounded bg-indigo-50 p-2">
                                    <div className="flex gap-2">
                                        <p className="my-auto w-6 rounded bg-accent p-1 text-center text-xs text-primary">
                                            {index + 1}
                                        </p>
                                        <p className="my-auto">{l.player}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{l.sum}</p>
                                        <small className="-mt-1 flex justify-end text-end text-indigo-400">
                                            {l.difference}
                                        </small>
                                    </div>
                                </section>
                            )}
                        </>
                    ))}
                </section>
                <Tabs
                    onValueChange={(value) => {
                        setSortOption(value as SortOptions);
                    }}
                    defaultValue={SortOptions.NONE}
                    className="mx-auto mb-8 mt-auto flex h-fit w-fit">
                    <TabsList>
                        <TabsTrigger value={SortOptions.TOLOW}>
                            Lowest
                        </TabsTrigger>
                        <TabsTrigger value={SortOptions.NONE}>None</TabsTrigger>
                        <TabsTrigger value={SortOptions.TOHIGH}>
                            Hightest
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </Container>
        </aside>
    );
}
