import { api } from '@/lib/api';
import type { Ticket } from '@/types/ticket';

export async function getTickets(): Promise<Ticket[]> {
  const response = await api.get('/tickets');
  return response.data.data.tickets;
}

export async function getTicketById(
  id: string,
): Promise<Ticket> {
  const response = await api.get(`/tickets/${id}`);
  return response.data.data;
}

export async function updateTicketStatus(
  id: string,
  status: string,
): Promise<Ticket> {
  const response = await api.patch(
    `/tickets/${id}/status`,
    {
      status,
    },
  );

  return response.data.data;
}