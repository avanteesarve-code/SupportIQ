import type { NextFunction, Request, Response } from 'express';

import { ApiResponse } from '../utils/ApiResponse.js';
import {
  createTicketSchema,
  ticketIdParamSchema,
  ticketListQuerySchema,
  updateTicketStatusSchema,
} from '../validators/ticket.validator.js';
import {
  createTicket,
  getTicketById,
  getTicketStats,
  getTickets,
  updateTicketStatus,
} from '../services/ticket.service.js';

export async function createTicketController(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = createTicketSchema.parse(req.body);
    const ticket = await createTicket(payload);

    return res.status(201).json(ApiResponse.success('Ticket created successfully', ticket));
  } catch (error) {
    return next(error);
  }
}

export async function getTicketsController(req: Request, res: Response, next: NextFunction) {
  try {
    const query = ticketListQuerySchema.parse(req.query);
    const result = await getTickets(query);

    return res.status(200).json(ApiResponse.success('Tickets fetched successfully', result));
  } catch (error) {
    return next(error);
  }
}

export async function getTicketByIdController(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = ticketIdParamSchema.parse(req.params);
    const ticket = await getTicketById(id);

    if (!ticket) {
      return res.status(404).json(ApiResponse.error('Ticket not found'));
    }

    return res.status(200).json(ApiResponse.success('Ticket fetched successfully', ticket));
  } catch (error) {
    return next(error);
  }
}

export async function updateTicketStatusController(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = ticketIdParamSchema.parse(req.params);
    const payload = updateTicketStatusSchema.parse(req.body);
    const ticket = await updateTicketStatus(id, payload);

    return res.status(200).json(ApiResponse.success('Ticket status updated successfully', ticket));
  } catch (error) {
    return next(error);
  }
}

export async function getTicketStatsController(_req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await getTicketStats();

    return res.status(200).json(ApiResponse.success('Ticket stats fetched successfully', stats));
  } catch (error) {
    return next(error);
  }
}