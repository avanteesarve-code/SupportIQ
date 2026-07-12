'use client';

import { useRouter } from 'next/navigation';
import type { Ticket } from '@/types/ticket';
import { StatusBadge } from '@/components/tickets/status-badge';
import { PriorityBadge } from '@/components/tickets/priority-badge';

interface TicketTableProps {
  tickets: Ticket[];
}

export function TicketTable({
  tickets,
}: TicketTableProps) {
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full text-gray-900 dark:text-white">
        <thead>
          <tr className="border-b border-gray-200 dark:border-zinc-800">
            <th className="p-3 text-left text-gray-600 dark:text-zinc-400">Subject</th>
            <th className="p-3 text-left text-gray-600 dark:text-zinc-400">Status</th>
            <th className="p-3 text-left text-gray-600 dark:text-zinc-400">Category</th>
            <th className="p-3 text-left text-gray-600 dark:text-zinc-400">Priority</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="cursor-pointer border-b border-gray-200 hover:bg-gray-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
              onClick={() =>
                router.push(`/tickets/${ticket.id}`)
              }
            >
              <td className="p-3">
                {ticket.subject}
              </td>

              <td className="p-3">
                <StatusBadge
                  status={ticket.status}
                />
              </td>

              <td className="p-3">
                {ticket.category?.name ?? '-'}
              </td>

              <td className="p-3">
  <PriorityBadge
    priority={
      ticket.priority?.label ?? 'LOW'
    }
  />
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}