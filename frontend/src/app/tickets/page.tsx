'use client';

import { TicketTable } from '@/components/tickets/ticket-table';
import { useTickets } from '@/hooks/use-tickets';
import { useState } from 'react';
import { TicketSearch } from '@/components/tickets/ticket-search';


export default function TicketsPage() {

    const [search, setSearch] = useState('');

    const { tickets, loading } = useTickets();

     const filteredTickets = tickets.filter((ticket) => ticket.subject
    .toLowerCase()
    .includes(search.toLowerCase())
);

if (loading) {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">
        Tickets
      </h1>

      <p className="mt-4">
        Loading tickets...
      </p>
    </main>
  );
}

if (!tickets.length) {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">
        Tickets
      </h1>

      <p className="mt-4 text-muted-foreground">
        No tickets found.
      </p>
    </main>
  );
}

if (!filteredTickets.length && search) {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">
        Tickets (0)
      </h1>

      <p className="mt-2 text-muted-foreground">
        Manage and monitor support tickets
      </p>

      <div className="mt-6">
        <TicketSearch
          value={search}
          onChange={setSearch}
        />
      </div>

      <p className="mt-6 text-muted-foreground">
        No tickets match your search.
      </p>
    </main>
  );
}

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">
  Tickets ({filteredTickets.length})
</h1>

      <p className="mt-2 text-muted-foreground">
        Manage and monitor support tickets
      </p>

<div className="mt-6">
  <TicketSearch
    value={search}
    onChange={setSearch}
  />
</div>



      <section className="mt-8">
  <TicketTable tickets={filteredTickets} />
</section>
    </main>
  );
}