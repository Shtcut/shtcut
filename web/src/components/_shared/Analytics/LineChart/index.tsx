'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Dot, Line, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../Chart';

// Function to normalize data to a range of 20% to 100%
const normalizeData = (data) => {
    const max = Math.max(...data.map((d) => d.value));
    const min = Math.min(...data.map((d) => d.value));

    return data.map((d) => ({
        ...d,
        value: ((d.value - min) / (max - min)) * 80 + 20
    }));
};

// Moderate zigzag pattern data
const chartData = normalizeData([
    { time: '09:00', value: 20 },
    { time: '09:30', value: 100 },
    { time: '10:00', value: 60 },
    { time: '10:30', value: 90 },
    { time: '11:00', value: 125 },
    { time: '11:30', value: 135 },
    { time: '12:00', value: 30 },
    { time: '12:30', value: 120 },
    { time: '13:00', value: 104 },
    { time: '13:30', value: 140 },
    { time: '14:00', value: 80 },
    { time: '14:30', value: 45 },
    { time: '15:00', value: 85 },
    { time: '15:30', value: 100 },
    { time: '16:00', value: 10 },
    { time: '16:30', value: 15 },
    { time: '17:00', value: 55 },
    { time: '17:30', value: 100 },
    { time: '18:00', value: 120 },
    { time: '18:30', value: 105 }
]);

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: '#e3ebfe'
    }
} satisfies ChartConfig;

// Define the gradient
const gradientId = 'gradient-dot';

const CustomDot = (props: any) => {
    const { cx, cy, stroke } = props;

    return (
        <>
            <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2F64E9" />
                    <stop offset="100%" stopColor="#e3ebfe" />
                </linearGradient>
            </defs>
            <Dot cx={cx} cy={cy} stroke={stroke} fill={'#2F64E9'} strokeWidth={0.5} r={4} />
        </>
    );
};

export const LineChartComponent = () => {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <ChartContainer config={chartConfig}>
                <AreaChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} horizontal stroke="#f5f5f5" />

                    <XAxis
                        dataKey="time"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value}
                    />
                    <YAxis
                        tickFormatter={(value) => `${value}%`}
                        domain={[20, 100]}
                        ticks={[20, 40, 60, 80, 100]}
                        axisLine={false}
                        tick={{ stroke: 'none' }}
                        tickLine={false}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <Area
                        dataKey="value"
                        type="linear"
                        fill={`url(#${gradientId})`}
                        fillOpacity={0.3}
                        stroke="var(--color-desktop)"
                        dot={<CustomDot />}
                    />
                    <Line
                        type="linear"
                        dataKey="value"
                        stroke="var(--color-desktop)"
                        strokeWidth={4}
                        dot={false}
                        strokeDasharray="4 4"
                    />
                </AreaChart>
            </ChartContainer>
        </ResponsiveContainer>
    );
};
