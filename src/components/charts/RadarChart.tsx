'use client';

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DIMENSIONS, DIMENSION_META } from '@/types/assessment';

type Props = {
  dimensionScores: Record<string, { weightedScore: number }>;
  benchmarkScores: Record<string, number>;
};

export function RadarChart({ dimensionScores, benchmarkScores }: Props) {
  const data = DIMENSIONS.map((dimId) => ({
    dimension: DIMENSION_META[dimId].label,
    you: Number(dimensionScores[dimId]?.weightedScore?.toFixed(2) ?? 0),
    benchmark: Number((benchmarkScores?.[dimId] ?? 0).toFixed(2)),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsRadarChart
        data={data}
        outerRadius="78%"
        margin={{ top: 24, right: 24, bottom: 24, left: 24 }}
      >
        <PolarGrid gridType="polygon" />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fontSize: 12 }}
          tickLine={false}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 5]}
          tickCount={6}
          tick={{ fontSize: 11 }}
          axisLine={false}
        />

        <Tooltip
          formatter={(value: number, name: string) => [
            value.toFixed(2),
            name === 'you' ? 'You' : 'Benchmark',
          ]}
        />

        <Legend verticalAlign="top" height={28} />

        <Radar
          name="You"
          dataKey="you"
          strokeWidth={3}
          fillOpacity={0.25}
          dot={{ r: 3 }}
          isAnimationActive
        />

        <Radar
          name="Benchmark"
          dataKey="benchmark"
          strokeWidth={2}
          fillOpacity={0.08}
          dot={false}
          isAnimationActive
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}