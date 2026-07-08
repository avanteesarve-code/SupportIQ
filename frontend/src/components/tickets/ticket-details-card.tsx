import type { Ticket } from '@/types/ticket';

interface TicketDetailsCardProps {
  ticket: Ticket;
}

export function TicketDetailsCard({
  ticket,
}: TicketDetailsCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          {ticket.subject}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Ticket ID: {ticket.id}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 font-semibold">
          Description
        </h3>

        <p className="text-muted-foreground">
          {ticket.body}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-muted-foreground">
            Status
          </p>

          <span className="inline-block rounded-md border px-3 py-1 text-sm font-medium">
            {ticket.status}
          </span>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Priority
          </p>

          <span className="inline-block rounded-md border px-3 py-1 text-sm font-medium">
            {ticket.priority?.label ?? '-'}
          </span>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Category
          </p>

          <p>{ticket.category?.name ?? '-'}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Customer
          </p>

          <p>
            {ticket.customerName ??
              ticket.customerEmail ??
              '-'}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Created
          </p>

          <p>
            {new Date(
              ticket.createdAt,
            ).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
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