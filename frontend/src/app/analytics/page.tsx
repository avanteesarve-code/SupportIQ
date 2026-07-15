'use client';

import { useEffect, useState } from 'react';

import {
  getDashboardOverview,
  getCategoryDistribution,
  getAgentWorkloads,
} from '@/services/dashboard.service';

import type {
  CategoryDistribution,
  AgentWorkload,
} from '@/types/dashboard';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';


import {
  Ticket,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Users,
  BarChart3,
} from 'lucide-react';

interface DashboardOverview {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  urgentTickets: number;
  totalAgents: number;
  averageTicketsPerAgent: number;
}

export default function AnalyticsPage() {
  const [data, setData] =
    useState<DashboardOverview | null>(null);

  const [categoryData, setCategoryData] =
    useState<CategoryDistribution[]>([]);

    const [workloadData, setWorkloadData] =
  useState<AgentWorkload[]>([]);

  const [loading, setLoading] =
    useState(true);

    const CategoryData = categoryData.filter(
  (item) => item.count > 0
);

const filteredWorkloadData = workloadData.filter(
  (agent) =>
    agent.openTickets > 0 ||
    agent.inProgressTickets > 0
);

  useEffect(() => {
    async function loadData() {
      try {
        const [
  overview,
  categories,
  workloads,
] = await Promise.all([
  getDashboardOverview(),
  getCategoryDistribution(),
  getAgentWorkloads(),
]);

setData(overview);
setCategoryData(categories);
setWorkloadData(workloads);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl p-8">
        Loading Analytics...
      </main>
    );
  }

 if (!data) {
  return (
    <main>
      Failed to load analytics
    </main>
  );
}
const topCategory = [...categoryData].sort(
  (a, b) => b.count - a.count
)[0];

const busiestAgent = [...workloadData].sort(
  (a, b) =>
    b.openTickets +
    b.inProgressTickets -
    (a.openTickets + a.inProgressTickets)
)[0];
const insights = [
  `${data.openTickets} tickets currently require attention.`,
  `${topCategory?.category ?? 'No category data'} is the most common ticket category.`,
  `${busiestAgent?.agentName ?? 'No agent assigned'} currently has the highest workload.`,
  `${data.averageTicketsPerAgent} average tickets per agent.`,
];

  return (
    <main className="mx-auto max-w-7xl px-8 py-10">
      <div className="mb-10">
        <div className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
          Prioro Analytics
        </div>

        <h1 className="mt-4 text-5xl font-bold tracking-tight">
          Support Operations Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-gray-500">
          Monitor ticket volume, team performance,
          workload distribution, and support trends.
        </p>
      </div>

  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
  <MetricCard
    title="Total Tickets"
    value={data.totalTickets}
    subtitle="System Activity"
    icon={<Ticket size={20} />}
    gradient="from-violet-500 to-indigo-600"
  />

  <MetricCard
    title="Open Tickets"
    value={data.openTickets}
    subtitle="Needs Attention"
    icon={<Clock3 size={20} />}
    gradient="from-blue-500 to-cyan-500"
  />

  <MetricCard
    title="Resolved Tickets"
    value={data.resolvedTickets}
   subtitle="Completed Cases"
    icon={<CheckCircle2 size={20} />}
    gradient="from-emerald-500 to-green-600"
  />

  <MetricCard
    title="Urgent Tickets"
    value={data.urgentTickets}
    subtitle="High Priority"
    icon={<AlertTriangle size={20} />}
    gradient="from-orange-500 to-red-500"
  />

  <MetricCard
    title="Total Agents"
    value={data.totalAgents}
    subtitle="Support Team"
    icon={<Users size={20} />}
    gradient="from-pink-500 to-rose-500"
  />

  <MetricCard
    title="Avg Tickets / Agent"
    value={data.averageTicketsPerAgent}
     subtitle="Current Load"
    icon={<BarChart3 size={20} />}
    gradient="from-purple-500 to-fuchsia-500"
  />
</div>


<div className="mt-8 rounded-3xl border border-indigo-900/40 bg-gradient-to-r from-indigo-950/50 to-purple-950/50 p-6">
  <h3 className="text-lg font-semibold">
    🤖 AI Insights
  </h3>

  <ul className="mt-3 space-y-2 text-sm text-zinc-300">
    {insights.map((insight, index) => (
      <li key={index}>{insight}</li>
    ))}
  </ul>
</div>


           <div className="mt-10 grid gap-6 lg:grid-cols-2">
  <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900 p-6 shadow-lg">
    <h2 className="mb-6 text-2xl font-semibold">
      📊 Tickets by Category
    </h2>

    <div className="h-70">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={CategoryData}>
          <XAxis
            dataKey="category"
            stroke="#94a3b8"
          />

          <YAxis stroke="#94a3b8" />
          

          <Tooltip
            contentStyle={{
              backgroundColor: '#09090b',
              border: '1px solid #27272a',
              borderRadius: '12px',
            }}
            labelStyle={{
              color: '#fff',
            }}
          />

          <Bar
            dataKey="count"
            fill="#6366f1"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900 p-6 shadow-lg">
    <h2 className="mb-6 text-2xl font-semibold">
      👥 Agent Workload
    </h2>

    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={filteredWorkloadData}>
          <XAxis
            dataKey="agentName"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#09090b',
              border: '1px solid #27272a',
              borderRadius: '12px',
            }}
            labelStyle={{
              color: '#fff',
            }}
          />

          <Legend
            wrapperStyle={{
              color: '#a1a1aa',
              paddingTop: '20px',
            }}
          />

          <Bar
            dataKey="openTickets"
            name="Open Tickets"
            fill="#6366f1"
            radius={[8, 8, 0, 0]}
          />

          <Bar
            dataKey="inProgressTickets"
            name="In Progress"
            fill="#22c55e"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>
    </main>
  );
}

function MetricCard({
  title,
  value,
  icon,
  subtitle,
  gradient,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  subtitle: string;
  gradient: string;
}) {
  return (
    <div className="group relative h-40 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 transition-opacity duration-300 group-hover:opacity-20`}
      />

      <div className="relative z-10">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
          {icon}
        </div>

        <p className="text-sm font-medium text-zinc-400">
          {title}
        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">
          {value}
        </h2>
 <p className="mt-1 text-xs text-zinc-500">
  {subtitle}
</p>
       

        <div className="mt-4 h-1 w-12 rounded-full bg-white/20 transition-all duration-300 group-hover:w-20" />
      </div>
    </div>
  );
}