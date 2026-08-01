"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import useGameDurations from "@/hooks/useGameDurations";
import { formatDuration } from "@/lib/utils";

const chartConfig = {
    duration: {
        label: "Duration",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export function GameDurationsChart() {
    const { games } = useGameDurations();

    const data = games
        .filter((game) => game.duration !== undefined)
        .map((game) => ({
            index: game.index + 1,
            duration: Math.round((game.duration as number) / 1000),
        }));

    if (data.length === 0) {
        return null;
    }

    return (
        <ChartContainer config={chartConfig} className="max-h-[80vh]">
            <BarChart
                accessibilityLayer
                data={data}
                margin={{
                    left: 20,
                    right: 12,
                }}>
                <CartesianGrid vertical={false} />
                <YAxis
                    width={20}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    tickFormatter={(value) => formatDuration(value * 1000)}
                />
                <XAxis
                    dataKey="index"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            hideLabel
                            formatter={(value) => (
                                <div className="flex w-full items-center justify-between gap-4">
                                    <span className="text-muted-foreground">
                                        Duration
                                    </span>
                                    <span className="font-mono font-medium tabular-nums text-foreground">
                                        {formatDuration(Number(value) * 1000)}
                                    </span>
                                </div>
                            )}
                        />
                    }
                />
                <Bar dataKey="duration" fill="var(--color-duration)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
}
