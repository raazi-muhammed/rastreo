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
    player1: {
        label: "Player 1",
        color: "#FF0000", // Red
    },
    player2: {
        label: "Player 2",
        color: "#0000FF", // Blue
    },
    player3: {
        label: "Player 3",
        color: "#00FF00", // Green
    },
    player4: {
        label: "Player 4",
        color: "#FFA500", // Orange
    },
    player5: {
        label: "Player 5",
        color: "#800080", // Purple
    },
} satisfies ChartConfig;

export function AllPlayersProgressChart() {
    const scores = useAppSelector((state) => state.scores);
    const players = useAppSelector((state) => state.players);

    // Find the maximum number of scores among all players
    const maxScores = Math.max(
        ...scores.map((playerScores) => playerScores.scores.length)
    );

    // Create data points for each score index
    const data = Array.from({ length: maxScores }, (_, scoreIndex) => {
        const dataPoint: Record<string, number> = {};

        // Add each player's cumulative score at this index
        scores.forEach((playerScores, playerIndex) => {
            const playerName = players[playerIndex]?.name;
            if (playerName) {
                // Calculate cumulative score up to this index
                const cumulativeScore = playerScores.scores
                    .slice(0, scoreIndex + 1)
                    .reduce((sum, score) => sum + (score?.val || 0), 0);
                dataPoint[playerName] = cumulativeScore;
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
                {players.map((player, index) => {
                    const colors = [
                        "#FF0000", // Red
                        "#0000FF", // Blue
                        "#00FF00", // Green
                        "#FFA500", // Orange
                        "#800080", // Purple
                    ];
                    const color = colors[index % colors.length];
                    return (
                        <Line
                            key={player.id}
                            dataKey={player.name}
                            type="linear"
                            stroke={color}
                            strokeWidth={2}
                            dot={{
                                fill: color,
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    );
                })}
            </LineChart>
        </ChartContainer>
    );
}
