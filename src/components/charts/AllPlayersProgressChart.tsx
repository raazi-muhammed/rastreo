"use client";

import {
    CartesianGrid,
    Customized,
    Line,
    LineChart,
    XAxis,
    YAxis,
} from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
} from "@/components/ui/chart";
import useVisiblePlayers from "@/hooks/useVisiblePlayers";
import { CHART_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ActivePointLabels } from "./ActivePointLabels";

export function AllPlayersProgressChart({
    showLegend = false,
    expanded = false,
}: {
    showLegend?: boolean;
    expanded?: boolean;
}) {
    const { players, scores } = useVisiblePlayers();

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
        <ChartContainer
            config={chartConfig}
            className={cn(
                "max-h-[80vh]",
                expanded && "aspect-auto h-full w-full"
            )}>
            <LineChart
                accessibilityLayer
                data={data}
                margin={{
                    left: 20,
                    right: 60,
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
                <ChartTooltip cursor={false} content={() => null} />
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
                            activeDot={false}
                        />
                    );
                })}
                <Customized component={<ActivePointLabels />} />
            </LineChart>
        </ChartContainer>
    );
}
