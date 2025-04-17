"use client";

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

export function AllPlayersChart() {
    const scores = useAppSelector((state) => state.scores);
    const players = useAppSelector((state) => state.players);

    // Find the maximum number of scores among all players
    const maxScores = Math.max(
        ...scores.map((playerScores) => playerScores.scores.length)
    );

    // Create data points for each score index
    const data = Array.from({ length: maxScores }, (_, scoreIndex) => {
        const dataPoint: Record<string, number> = {};

        // Add each player's score at this index
        scores.forEach((playerScores, playerIndex) => {
            const playerName = players[playerIndex]?.name;
            const score = playerScores.scores[scoreIndex];
            if (playerName && score) {
                dataPoint[playerName] = score.val;
            }
        });

        return dataPoint;
    });

    if (data.length === 0) {
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
                    content={<ChartTooltipContent />}
                />
                {players.map((player, index) => (
                    <Line
                        key={player.id}
                        dataKey={player.name}
                        type="linear"
                        stroke={`hsl(var(--chart-${(index % 2) + 1}))`}
                        strokeWidth={2}
                        dot={{
                            fill: `hsl(var(--chart-${(index % 2) + 1}))`,
                        }}
                        activeDot={{
                            r: 6,
                        }}
                    />
                ))}
            </LineChart>
        </ChartContainer>
    );
}
