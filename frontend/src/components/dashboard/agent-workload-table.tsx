import type { AgentWorkload } from '@/types/dashboard';

interface AgentWorkloadTableProps {
  workloads: AgentWorkload[];
}

export function AgentWorkloadTable({
  workloads,
}: AgentWorkloadTableProps) {
  return (
    <div className="rounded-lg border">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Agent</th>
            <th className="p-3 text-left">Open Tickets</th>
            <th className="p-3 text-left">In Progress</th>
          </tr>
        </thead>

        <tbody>
          {workloads.map((workload) => (
            <tr
              key={workload.agentId}
              className="border-b"
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