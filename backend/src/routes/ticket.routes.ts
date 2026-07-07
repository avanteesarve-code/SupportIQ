import { Router } from 'express';

import {
  createTicketController,
  getTicketByIdController,
  getTicketStatsController,
  getTicketsController,
  updateTicketStatusController,
} from '../controllers/ticket.controller.js';

export const ticketRouter = Router();

ticketRouter.get('/stats', getTicketStatsController);
ticketRouter.post('/', createTicketController);
ticketRouter.get('/', getTicketsController);
ticketRouter.get('/:id', getTicketByIdController);
ticketRouter.patch('/:id/status', updateTicketStatusController);