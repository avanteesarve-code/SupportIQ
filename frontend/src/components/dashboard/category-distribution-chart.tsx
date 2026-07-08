'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { CategoryDistribution } from '@/types/dashboard';

interface CategoryDistributionChartProps {
  data: CategoryDistribution[];
}

export function CategoryDistributionChart({
  data,
}: CategoryDistributionChartProps) {
  return (
    <div className="h-80 rounded-lg border p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="count"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}