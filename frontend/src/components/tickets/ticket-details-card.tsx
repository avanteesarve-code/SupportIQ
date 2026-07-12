import type { Ticket } from '@/types/ticket';

interface TicketDetailsCardProps {
  ticket: Ticket;
}

export function TicketDetailsCard({
  ticket,
}: TicketDetailsCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {ticket.subject}
        </h2>

        <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
          Ticket ID: {ticket.id}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 font-semibold">
          Description
        </h3>

        <p className="text-gray-600 dark:text-zinc-400">
          {ticket.body}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-600 dark:text-zinc-400">
            Status
          </p>

          <span className="inline-block rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-900 dark:border-zinc-700 dark:text-white">
            {ticket.status}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-zinc-400">
            Priority
          </p>

          <span className="inline-block rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-900 dark:border-zinc-700 dark:text-white">
            {ticket.priority?.label ?? '-'}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-zinc-400">
            Category
          </p>

          <p>{ticket.category?.name ?? '-'}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-zinc-400">
            Customer
          </p>

          <p>
            {ticket.customerName ??
              ticket.customerEmail ??
              '-'}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-zinc-400">
            Created
          </p>

          <p>
            {new Date(
              ticket.createdAt,
            ).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-zinc-400">
            Updated
          </p>

          <p>
            {new Date(
              ticket.updatedAt,
            ).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}