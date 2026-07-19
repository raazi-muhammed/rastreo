"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useAppSelector } from "@/hooks/redux";
import { CHART_COLORS } from "@/lib/constants";

export function AllPlayersProgressChart({
    showLegend = false,
}: {
    showLegend?: boolean;
}) {
    const scores = useAppSelector((state) => state.scores);
    const players = useAppSelector((state) => state.players);

    const chartConfig = players.reduce<ChartConfig>(
        (config, player, index) => {
            config[player.name] = {
                label: player.name,
                color: CHART_COLORS[index % CHART_COLORS.length],
            };
            return config;
        },
        {}
    );

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
        <ChartContainer config={chartConfig} className="max-h-[80vh]">
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
                {showLegend && (
                    <ChartLegend content={<ChartLegendContent />} />
                )}
                {players.map((player, index) => {
                    const color = CHART_COLORS[index % CHART_COLORS.length];
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
