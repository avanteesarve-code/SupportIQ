'use client';

import { useEffect, useState } from 'react';

import { StatusSelector } from '@/components/tickets/status-selector';
import { useTicket } from '@/hooks/use-ticket';
import { updateTicketStatus } from '@/services/ticket.service';
import { StatusBadge } from '@/components/tickets/status-badge';
import { PriorityBadge } from '@/components/tickets/priority-badge';
import { AIInsightsCard } from '@/components/tickets/ai-insights-card';
import { AssignedAgentCard } from '@/components/tickets/assigned-agent-card';

interface TicketDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TicketDetailsPage({
  params,
}: TicketDetailsPageProps) {
  const { id } = await params;

  return (
    <TicketDetailsContent id={id} />
  );
}

function TicketDetailsContent({
  id,
}: {
  id: string;
}) {
  const { ticket, loading } = useTicket(id);

  const [status, setStatus] =
    useState('');

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
    }
  }, [ticket]);

  async function handleStatusChange(
    newStatus: string,
  ) {
    try {
      setStatus(newStatus);

      await updateTicketStatus(
        ticket!.id,
        newStatus,
      );
    } catch (error) {
      console.error(
        'Failed to update status:',
        error,
      );

      alert(
        'Failed to update ticket status',
      );
    }
  }

  if (loading) {
    return (
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">
          Loading Ticket...
        </h1>
      </main>
    );
  }

  if (!ticket) {
    return (
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">
          Ticket Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">
        Ticket Details
      </h1>

      <div className="mt-6 space-y-4">
        <p>
          <strong>Subject:</strong>{' '}
          {ticket.subject}
        </p>

        <p>
          <strong>Description:</strong>{' '}
          {ticket.body}
        </p>

        <div className="flex items-center gap-3">
  <strong>Status:</strong>

  <StatusSelector
    value={status}
    onChange={handleStatusChange}
  />

  <StatusBadge status={status} />
</div>

        <p>
          <strong>Category:</strong>{' '}
          {ticket.category?.name}
        </p>

        <div className="flex items-center gap-3">
  <strong>Priority:</strong>

  <PriorityBadge
    priority={
      ticket.priority?.label ?? 'LOW'
    }
  />
  <AIInsightsCard
  category={ticket.category?.name}
  priority={ticket.priority?.label}
  categoryConfidence={
    ticket.aiConfidenceCategory
  }
  priorityConfidence={
    ticket.aiConfidencePriority
  }
  reasoning={
    ticket.aiResponses?.[0]
      ?.generatedText
  }
/>

<AssignedAgentCard
  agent={ticket.assignedAgent}
/>

</div>
      </div>
    </main>
  );
}