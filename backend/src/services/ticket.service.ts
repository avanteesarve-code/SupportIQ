import { Prisma, PriorityLabel, TicketStatus } from '@prisma/client';

import { prisma } from '../config/prisma.js';
import { AppError } from '../utils/appError.js';
import type {
  CreateTicketInput,
  TicketListQuery,
  UpdateTicketStatusInput,
} from '../validators/ticket.validator.js';

const ticketInclude = {
  category: true,
  priority: true,
};

const ticketDetailInclude = {
  category: true,
  priority: true,
  aiResponses: {
    orderBy: {
      createdAt: 'desc' as const,
    },
  },
  activities: {
    orderBy: {
      createdAt: 'desc' as const,
    },
  },
};

export async function createTicket(data: CreateTicketInput) {
  const [category, priority] = await Promise.all([
    prisma.category.findUnique({ where: { id: data.categoryId } }),
    prisma.priority.findUnique({ where: { id: data.priorityId } }),
  ]);

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  if (!priority) {
    throw new AppError('Priority not found', 404);
  }

  return prisma.ticket.create({
    data: {
      subject: data.title,
      body: data.description,
      customerEmail: data.customerEmail,
      customerName: data.customerEmail,
      categoryId: data.categoryId,
      priorityId: data.priorityId,
      status: TicketStatus.OPEN,
    },
    include: ticketInclude,
  });
}

export async function getTickets(query: TicketListQuery) {
  const where: Prisma.TicketWhereInput = {
    ...(query.status ? { status: query.status } : {}),
    ...(query.priority ? { priority: { label: query.priority } } : {}),
  };

  const [tickets, totalCount] = await Promise.all([
    prisma.ticket.findMany({
      where,
      include: ticketInclude,
      orderBy: { createdAt: 'desc' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    }),
    prisma.ticket.count({ where }),
  ]);

  return {
    tickets,
    totalCount,
    totalPages: Math.ceil(totalCount / query.limit),
    currentPage: query.page,
  };
}

export async function getTicketById(id: string) {
  return prisma.ticket.findUnique({
    where: { id },
    include: ticketDetailInclude,
  });
}

export async function updateTicketStatus(id: string, data: UpdateTicketStatusInput) {
  return prisma.ticket.update({
    where: { id },
    data: { status: data.status },
    include: ticketDetailInclude,
  });
}

export async function getTicketStats() {
  const [totalTickets, openTickets, resolvedTickets, closedTickets, urgentTickets] = await Promise.all([
    prisma.ticket.count(),
    prisma.ticket.count({ where: { status: TicketStatus.OPEN } }),
    prisma.ticket.count({ where: { status: TicketStatus.RESOLVED } }),
    prisma.ticket.count({ where: { status: TicketStatus.CLOSED } }),
    prisma.ticket.count({ where: { priority: { label: PriorityLabel.URGENT } } }),
  ]);

  return {
    totalTickets,
    openTickets,
    resolvedTickets,
    closedTickets,
    urgentTickets,
  };
}