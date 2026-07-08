'use client';

import { useEffect, useState } from 'react';
import { getTickets } from '@/services/ticket.service';
import type { Ticket } from '@/types/ticket';

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTickets() {
      try {
        const data = await getTickets();
        setTickets(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void loadTickets();
  }, []);

  return {
    tickets,
    loading,
  };
}