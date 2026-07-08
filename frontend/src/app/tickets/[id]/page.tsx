'use client';

import { useTicket } from '@/hooks/use-ticket';

interface TicketDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TicketDetailsPage({
  params,
}: TicketDetailsPageProps) {
  const { id } = await params;

  return (
    <TicketDetailsContent id={id} />
  );
}

function TicketDetailsContent({
  id,
}: {
  id: string;
}) {
  const { ticket, loading } =
    useTicket(id);

  if (loading) {
    return (
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">
          Loading Ticket...
        </h1>
      </main>
    );
  }

  if (!ticket) {
    return (
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">
          Ticket Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">
        Ticket Details
      </h1>

      <div className="mt-6 space-y-4">
        <p>
          <strong>Subject:</strong>{' '}
          {ticket.subject}
        </p>

        <p>
          <strong>Description:</strong>{' '}
          {ticket.body}
        </p>

        <p>
          <strong>Status:</strong>{' '}
          {ticket.status}
        </p>

        <p>
          <strong>Category:</strong>{' '}
          {ticket.category?.name}
        </p>

        <p>
          <strong>Priority:</strong>{' '}
          {ticket.priority?.label}
        </p>
      </div>
    </main>
  );
}