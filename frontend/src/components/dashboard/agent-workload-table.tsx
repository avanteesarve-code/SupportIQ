import type { AgentWorkload } from '@/types/dashboard';

interface AgentWorkloadTableProps {
  workloads: AgentWorkload[];
}

export function AgentWorkloadTable({
  workloads,
}: AgentWorkloadTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full text-gray-900 dark:text-white">
        <thead>
          <tr className="border-b border-gray-200 dark:border-zinc-800">
            <th className="p-3 text-left text-gray-600 dark:text-zinc-400">Agent</th>
            <th className="p-3 text-left text-gray-600 dark:text-zinc-400">Open Tickets</th>
            <th className="p-3 text-left text-gray-600 dark:text-zinc-400">In Progress</th>
          </tr>
        </thead>

        <tbody>
          {workloads.map((workload) => (
            <tr
              key={workload.agentId}
              className="border-b border-gray-200 last:border-b-0 dark:border-zinc-800"
            >
              <td className="p-3">{workload.agentName}</td>
              <td className="p-3">{workload.openTickets}</td>
              <td className="p-3">{workload.inProgressTickets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}