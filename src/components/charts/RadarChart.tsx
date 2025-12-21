'use client';

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { DimensionId, DimensionScore, DIMENSION_META, DIMENSIONS } from '@/types/assessment';

interface RadarChartProps {
  dimensionScores: Record<DimensionId, DimensionScore>;
  benchmarkScores: Record<DimensionId, number>;
}

export function RadarChart({ dimensionScores, benchmarkScores }: RadarChartProps) {
  const data = DIMENSIONS.map((dimId) => ({
    dimension: DIMENSION_META[dimId].shortLabel,
    fullName: DIMENSION_META[dimId].label,
    userScore: dimensionScores[dimId]?.weightedScore || 0,
    benchmark: benchmarkScores[dimId] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fill: '#64748b', fontSize: 12 }}
          tickLine={false}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 5]}
          tick={{ fill: '#94a3b8', fontSize: 10 }}
          tickCount={6}
          axisLine={false}
        />
        <Radar
          name="Your Score"
          dataKey="userScore"
          stroke="#2563eb"
          fill="#3b82f6"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Radar
          name="Industry Avg"
          dataKey="benchmark"
          stroke="#94a3b8"
          fill="#cbd5e1"
          fillOpacity={0.2}
          strokeWidth={2}
          strokeDasharray="5 5"
        />
        <Legend
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="circle"
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
                  <p className="font-medium text-slate-900 mb-2">{data.fullName}</p>
                  <p className="text-sm text-blue-600">
                    Your Score: {data.userScore.toFixed(1)}
                  </p>
                  <p className="text-sm text-slate-500">
                    Industry Avg: {data.benchmark.toFixed(1)}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
