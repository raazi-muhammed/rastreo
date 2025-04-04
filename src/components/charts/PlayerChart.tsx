"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
    const scores = useAppSelector((state) => state.scores);

    const playerScores = scores.find((s) => s?.id == player?.id);

    const data = playerScores?.scores.map((s, index) => ({
        index: index + 1,
        desktop: s.val,
        mobile: s.val,
    }));

    return (
        <ChartContainer config={chartConfig}>
            <LineChart
                accessibilityLayer
                data={data}
                margin={{
                    left: 12,
                    right: 12,
                }}>
                <CartesianGrid vertical={false} />
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
                    dataKey="desktop"
                    type="natural"
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
