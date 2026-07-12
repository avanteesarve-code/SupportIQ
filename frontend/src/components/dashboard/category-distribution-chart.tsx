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
    <div className="h-80 rounded-lg border border-gray-200 bg-white p-4 text-gray-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis dataKey="category" tick={{ fill: 'var(--muted-foreground)' }} axisLine={{ stroke: 'var(--border)' }} tickLine={{ stroke: 'var(--border)' }} />
          <YAxis tick={{ fill: 'var(--muted-foreground)' }} axisLine={{ stroke: 'var(--border)' }} tickLine={{ stroke: 'var(--border)' }} />
          <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--card-foreground)', borderRadius: '0.75rem' }} labelStyle={{ color: 'var(--muted-foreground)' }} cursor={{ fill: 'var(--muted)' }} />

          <Bar
            dataKey="count"
            radius={[4, 4, 0, 0]}
            fill="var(--primary)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}