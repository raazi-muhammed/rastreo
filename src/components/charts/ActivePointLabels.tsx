import { Fragment } from "react";

type LinePoint = {
    x: number | null;
    y: number | null;
    value?: number;
};

type FormattedGraphicalItem = {
    item: { props: { dataKey?: string; stroke?: string } };
    props: { points?: LinePoint[] };
};

type ActivePointLabelsProps = {
    isTooltipActive?: boolean;
    activeTooltipIndex?: number;
    formattedGraphicalItems?: FormattedGraphicalItem[];
    width?: number;
};

// Minimum vertical distance (px) kept between two labels so lines with
// the same value at the hovered index don't render on top of each other.
const MIN_LABEL_GAP = 16;

const PADDING_X = 8;
const DOT_RADIUS = 3;
const DOT_TEXT_GAP = 5;
const RECT_HEIGHT = 18;
const POINT_GAP = 8;
const CHAR_WIDTH = 7;

export function ActivePointLabels({
    isTooltipActive,
    activeTooltipIndex,
    formattedGraphicalItems,
    width,
}: ActivePointLabelsProps) {
    if (
        !isTooltipActive ||
        activeTooltipIndex === undefined ||
        activeTooltipIndex < 0 ||
        !formattedGraphicalItems
    ) {
        return null;
    }

    const points = formattedGraphicalItems
        .map((entry) => {
            const point = entry.props.points?.[activeTooltipIndex];
            if (!point || point.x === null || point.y === null) return null;
            const label = `${entry.item.props.dataKey}${
                point.value !== undefined ? `: ${point.value}` : ""
            }`;
            const rectWidth =
                DOT_RADIUS * 2 +
                DOT_TEXT_GAP +
                label.length * CHAR_WIDTH +
                PADDING_X * 2;
            return {
                dataKey: entry.item.props.dataKey,
                stroke: entry.item.props.stroke,
                x: point.x,
                y: point.y,
                labelY: point.y,
                label,
                rectWidth,
            };
        })
        .filter((p): p is NonNullable<typeof p> => p !== null)
        .sort((a, b) => a.y - b.y);

    for (let i = 1; i < points.length; i++) {
        if (points[i].labelY - points[i - 1].labelY < MIN_LABEL_GAP) {
            points[i].labelY = points[i - 1].labelY + MIN_LABEL_GAP;
        }
    }

    // All points share the same x for a given hovered index, so decide once
    // whether labels fit to the right or need to flip to the left instead.
    const sharedX = points[0]?.x ?? 0;
    const widestRect = Math.max(0, ...points.map((p) => p.rectWidth));
    const flip =
        width !== undefined && sharedX + POINT_GAP + widestRect > width;

    return (
        <>
            {points.map((p) => {
                const rectX = flip
                    ? p.x - POINT_GAP - p.rectWidth
                    : p.x + POINT_GAP;
                const dotCx = rectX + PADDING_X + DOT_RADIUS;
                const textX = dotCx + DOT_RADIUS + DOT_TEXT_GAP;

                return (
                    <Fragment key={p.dataKey}>
                        <circle
                            cx={p.x}
                            cy={p.y}
                            r={5}
                            fill={p.stroke}
                            stroke="hsl(var(--background))"
                            strokeWidth={2}
                        />
                        <rect
                            x={rectX}
                            y={p.labelY - RECT_HEIGHT / 2}
                            width={p.rectWidth}
                            height={RECT_HEIGHT}
                            rx={4}
                            fill="hsl(var(--background))"
                            stroke="hsl(var(--border))"
                            strokeWidth={1}
                        />
                        <circle
                            cx={dotCx}
                            cy={p.labelY}
                            r={DOT_RADIUS}
                            fill={p.stroke}
                        />
                        <text
                            x={textX}
                            y={p.labelY}
                            dy={4}
                            fontSize={12}
                            fontWeight={600}
                            fill="white">
                            {p.label}
                        </text>
                    </Fragment>
                );
            })}
        </>
    );
}
