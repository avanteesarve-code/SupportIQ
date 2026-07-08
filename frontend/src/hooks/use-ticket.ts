'use client';

import { useEffect, useState } from 'react';

import { getTicketById } from '@/services/ticket.service';
import type { Ticket } from '@/types/ticket';

export function useTicket(id: string) {
  const [ticket, setTicket] =
    useState<Ticket | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadTicket() {
      try {
        const data =
          await getTicketById(id);

        setTicket(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      void loadTicket();
    }
  }, [id]);

  return {
    ticket,
    loading,
  };
}