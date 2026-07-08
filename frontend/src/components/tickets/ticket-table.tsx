'use client';

import { useRouter } from 'next/navigation';
import type { Ticket } from '@/types/ticket';

interface TicketTableProps {
  tickets: Ticket[];
}

export function TicketTable({
  tickets,
}: TicketTableProps) {
  const router = useRouter();

  return (
    <div className="rounded-lg border">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Priority</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="border-b cursor-pointer hover:bg-muted"
              onClick={() =>
                router.push(`/tickets/${ticket.id}`)
              }
            >
              <td className="p-3">
                {ticket.subject}
              </td>

              <td className="p-3">
                {ticket.status}
              </td>

              <td className="p-3">
                {ticket.category?.name ?? '-'}
              </td>

              <td className="p-3">
                {ticket.priority?.label ?? '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}