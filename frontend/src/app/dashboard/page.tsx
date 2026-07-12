'use client';

import { AgentWorkloadTable } from '@/components/dashboard/agent-workload-table';
import { CategoryDistributionChart } from '@/components/dashboard/category-distribution-chart';
import { OverviewCard } from '@/components/dashboard/overview-card';
import { useDashboardData } from '@/hooks/use-dashboard-data';

export default function DashboardPage() {
  const {
    overview,
    workloads,
    categoryData,
  } = useDashboardData();

  return (
    <main className="container mx-auto bg-white p-6 text-gray-900 dark:bg-black dark:text-white">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SupportIQ Dashboard</h1>

      <p className="mt-2 text-gray-600 dark:text-zinc-400">
        Admin analytics and ticket monitoring
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <OverviewCard
          title="Total Tickets"
          value={overview?.totalTickets ?? 0}
        />

        <OverviewCard
          title="Open Tickets"
          value={overview?.openTickets ?? 0}
        />

        <OverviewCard
          title="Resolved Tickets"
          value={overview?.resolvedTickets ?? 0}
        />

        <OverviewCard
          title="Urgent Tickets"
          value={overview?.urgentTickets ?? 0}
        />

        <OverviewCard
          title="Total Agents"
          value={overview?.totalAgents ?? 0}
        />
      </div>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Agent Workloads
        </h2>

        <AgentWorkloadTable workloads={workloads} />
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Category Distribution
        </h2>

        <CategoryDistributionChart data={categoryData} />
      </section>
    </main>
  );
}