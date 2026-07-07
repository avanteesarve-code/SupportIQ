import { z } from 'zod';

export const ticketStatusValues = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const;

export const createTicketSchema = z.object({
  title: z.string().trim().min(1, 'title is required'),
  description: z.string().trim().min(1, 'description is required'),
  customerEmail: z.string().email('email must be valid'),
  categoryId: z.string().uuid('categoryId is required'),
  priorityId: z.string().uuid('priorityId is required'),
});

export const updateTicketStatusSchema = z.object({
  status: z.enum(ticketStatusValues),
});

export const ticketListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  status: z.enum(ticketStatusValues).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const).optional(),
});

export const ticketIdParamSchema = z.object({
  id: z.string().uuid('Invalid ticket id'),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type UpdateTicketStatusInput = z.infer<typeof updateTicketStatusSchema>;
export type TicketListQuery = z.infer<typeof ticketListQuerySchema>;