'use client';

import { TicketTable } from '@/components/tickets/ticket-table';
import { useTickets } from '@/hooks/use-tickets';
import { useState } from 'react';
import { TicketSearch } from '@/components/tickets/ticket-search';
import Link from 'next/link';


export default function TicketsPage() {

    const [search, setSearch] = useState('');

    const { tickets, loading } = useTickets();
    

     const filteredTickets = tickets.filter((ticket) => ticket.subject
    .toLowerCase()
    .includes(search.toLowerCase())
);

if (loading) {
  return (
    <main className="container mx-auto bg-white p-6 dark:bg-black">
      <div className="h-10 w-48 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />

      <div className="mt-3 h-5 w-72 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />

      <div className="mt-8 space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-16 animate-pulse rounded-lg border border-gray-200 bg-gray-100 dark:border-zinc-800 dark:bg-zinc-900"
          />
        ))}
      </div>
    </main>
  );
}

if (!tickets.length) {
  return (
    <main className="container mx-auto bg-white p-6 text-gray-900 dark:bg-black dark:text-white">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Tickets
      </h1>

      <div className="mt-12 rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          No Tickets Yet
        </h2>

        <p className="mt-3 text-gray-600 dark:text-zinc-400">
          Create your first support ticket to
          start tracking customer issues.
        </p>

        <Link
          href="/tickets/create"
          className="mt-6 inline-block rounded-md bg-slate-900 px-5 py-3 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Create Ticket
        </Link>
      </div>
    </main>
  );
}

if (!filteredTickets.length && search) {
  return (
    <main className="container mx-auto bg-white p-6 text-gray-900 dark:bg-black dark:text-white">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Tickets (0)
      </h1>

      <p className="mt-2 text-gray-600 dark:text-zinc-400">
        Manage and monitor support tickets
      </p>

      <div className="mt-6">
        <TicketSearch
          value={search}
          onChange={setSearch}
        />
      </div>

      <p className="mt-6 text-gray-600 dark:text-zinc-400">
        No tickets match your search.
      </p>
    </main>
  );
}

  return (
    <main className="container mx-auto bg-white p-6 text-gray-900 dark:bg-black dark:text-white">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Tickets ({filteredTickets.length})
      </h1>

      <p className="mt-2 text-gray-600 dark:text-zinc-400">
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