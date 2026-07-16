'use client';

import { useEffect, useState } from 'react';

import { getAgentWorkloads } from '@/services/dashboard.service';

import type {
  AgentWorkload,
} from '@/types/dashboard';

function getWorkloadLevel(
  open: number,
  inProgress: number,
) {
  const total = open + inProgress;

  if (total >= 10) {
    return {
      label: 'High',
      color:
        'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
    };
  }

  if (total >= 5) {
    return {
      label: 'Medium',
      color:
        'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
    };
  }

  return {
    label: 'Low',
    color:
      'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
  };
}

export default function WorkloadPage() {
  const [workloads, setWorkloads] =
    useState<AgentWorkload[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data =
          await getAgentWorkloads();

        setWorkloads(
          [...data].sort(
            (a, b) =>
              b.openTickets +
              b.inProgressTickets -
              (a.openTickets +
                a.inProgressTickets),
          ),
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <main className="container mx-auto p-6">
        Loading workloads...
      </main>
    );
  }

  return (
    <main className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Agent Workload
        </h1>

        <p className="mt-2 text-gray-600 dark:text-zinc-400">
          Monitor ticket distribution
          across support agents.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workloads.map((agent) => {
          const workload =
            getWorkloadLevel(
              agent.openTickets,
              agent.inProgressTickets,
            );

          return (
            <div
              key={agent.agentId}
              className="
                rounded-2xl
                border
                border-[#2a9d8f]/20
                bg-white
                p-6
                shadow-lg
                shadow-[#2a9d8f]/10
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#2a9d8f]/50
                hover:shadow-xl
                dark:bg-zinc-950
              "
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-lg">
                  {agent.agentName}
                </h2>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${workload.color}`}
                >
                  {workload.label}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>
                    Open Tickets
                  </span>

                  <span className="font-semibold">
                    {agent.openTickets}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>
                    In Progress
                  </span>

                  <span className="font-semibold">
                    {agent.inProgressTickets}
                  </span>
                </div>

                <div className="flex justify-between border-t pt-3">
                  <span>Total Load</span>

                  <span className="font-bold text-[#2a9d8f]">
                    {agent.openTickets +
                      agent.inProgressTickets}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}