import { AIResponseStatus, Prisma, PriorityLabel, TicketStatus } from '@prisma/client';

import { prisma } from '../config/prisma.js';
import { classifyTicket } from './ai.service.js';
import { AppError } from '../utils/appError.js';
import type { SupportedTicketCategory } from '../types/ai.types.js';
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

  assignedAgent: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },

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

const categoryResolutionMap: Record<SupportedTicketCategory, string[]> = {
  'Technical Support': ['Technical Support', 'Technical Issue', 'Account'],
  Billing: ['Billing'],
  'Feature Request': ['Feature Request'],
  'Bug Report': ['Bug Report', 'Technical Issue'],
  'General Inquiry': ['General Inquiry', 'Other'],
};

async function resolveCategoryId(categoryName: SupportedTicketCategory, fallbackCategoryId?: string) {
  const aliases = categoryResolutionMap[categoryName];
  const category = await prisma.category.findFirst({
    where: {
      OR: aliases.map((name) => ({
        name: {
          equals: name,
          mode: 'insensitive',
        },
      })),
    },
    select: { id: true },
  });

  if (category?.id) {
    return category.id;
  }

  if (!fallbackCategoryId) {
    return null;
  }

  const existingFallback = await prisma.category.findUnique({
    where: { id: fallbackCategoryId },
    select: { id: true },
  });

  return existingFallback?.id ?? null;
}

async function resolvePriorityId(priorityLabel: PriorityLabel, fallbackPriorityId?: string) {
  const priority = await prisma.priority.findFirst({
    where: { label: priorityLabel },
    select: { id: true },
  });

  if (priority?.id) {
    return priority.id;
  }

  if (!fallbackPriorityId) {
    return null;
  }

  const existingFallback = await prisma.priority.findUnique({
    where: { id: fallbackPriorityId },
    select: { id: true },
  });

  return existingFallback?.id ?? null;
}

async function findLeastLoadedAgent() {
  const agents = await prisma.user.findMany({
    where: {
      role: 'AGENT',
    },
    include: {
      assignedTickets: {
        where: {
          status: {
            in: ['OPEN', 'IN_PROGRESS'],
          },
        },
      },
    },
  });

  if (agents.length === 0) {
    return null;
  }

  const sortedAgents = agents.sort(
    (a, b) => a.assignedTickets.length - b.assignedTickets.length,
  );

  return sortedAgents[0];
}

export async function createTicket(data: CreateTicketInput) {
  const ticket = await prisma.ticket.create({
    data: {
      subject: data.title,
      body: data.description,
      customerEmail: data.customerEmail,
      customerName: data.customerEmail,
      status: TicketStatus.OPEN,
    },
    include: ticketInclude,
  });

  const classification = await classifyTicket({
    subject: data.title,
    body: data.description,
  });

  const [resolvedCategoryId, resolvedPriorityId, assignedAgent] =
  await Promise.all([
    resolveCategoryId(classification.category, data.categoryId),
    resolvePriorityId(classification.priority, data.priorityId),
    findLeastLoadedAgent(),
  ]);

  const updatedTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: {
      categoryId: resolvedCategoryId,
      priorityId: resolvedPriorityId,
      assignedAgentId: assignedAgent?.id ?? null,
      aiConfidenceCategory: classification.confidenceCategory ?? null,
      aiConfidencePriority: classification.confidencePriority ?? null,
    },
    include: ticketInclude,
  });

  try {
    await prisma.aIResponse.create({
      data: {
        ticketId: ticket.id,
        prompt: classification.prompt,
        response: classification.response,
        generatedText: classification.reason ?? 'AI classification completed',
        confidenceScore:
          classification.confidenceCategory !== undefined &&
          classification.confidencePriority !== undefined
            ? (classification.confidenceCategory + classification.confidencePriority) / 2
            : null,
        status: AIResponseStatus.SUGGESTED,
      },
    });
  } catch (error) {
    console.error('Failed to persist AIResponse for ticket:', ticket.id, error);
  }

if (assignedAgent) {
  await prisma.ticketActivity.create({
    data: {
      ticketId: ticket.id,
      actorType: 'SYSTEM',
      action: 'AUTO_ASSIGNED',
      detail: {
        assignedAgentId: assignedAgent.id,
        assignedAgentName: assignedAgent.name,
      },
    },
  });
}

  return updatedTicket;
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
  try {
    return await prisma.ticket.findUnique({
      where: { id },
      include: ticketDetailInclude,
    });
  } catch (error) {
    console.error('GET TICKET ERROR:', error);
    throw error;
  }
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

export async function getTicketsByAgent(agentId: string) {
  console.log('Agent ID:', agentId);

  const agent = await prisma.user.findUnique({
    where: {
      id: agentId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  console.log('Agent Found:', agent);

  if (!agent) {
    throw new AppError('Agent not found', 404);
  }

  const activeTickets = await prisma.ticket.findMany({
    where: {
      assignedAgentId: agentId,
      status: {
        in: ['OPEN', 'IN_PROGRESS'],
      },
    },
    include: {
      category: true,
      priority: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    agent,
    activeTicketCount: activeTickets.length,
    activeTickets,
  };
}