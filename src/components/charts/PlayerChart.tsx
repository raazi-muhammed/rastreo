"use client";

import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useAppSelector } from "@/hooks/redux";

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function PlayerChart({
    player,
}: {
    player: { id: string; name: string };
}) {
    const playerScores = useAppSelector((state) =>
        state.scores.find((s) => s?.id == player?.id)
    );

    const data = useMemo(() => {
        let lastValue = 0;
        return playerScores?.scores.map((s, index) => {
            const toReturn = {
                index: index + 1,
                value: s.val + lastValue,
            };

            lastValue = s.val + lastValue;

            return toReturn;
        });
    }, [playerScores]);

    if (data?.length === 0) {
        return null;
    }

    return (
        <ChartContainer config={chartConfig}>
            <LineChart
                accessibilityLayer
                data={data}
                margin={{
                    left: 20,
                    right: 12,
                }}>
                <CartesianGrid vertical={false} />
                <YAxis
                    width={20}
                    dataKey="value"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                />
                <XAxis
                    dataKey="index"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Line
                    dataKey="value"
                    type="linear"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={{
                        fill: "var(--color-desktop)",
                    }}
                    activeDot={{
                        r: 6,
                    }}
                />
            </LineChart>
        </ChartContainer>
    );
}
