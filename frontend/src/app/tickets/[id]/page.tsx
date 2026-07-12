"use client";

import { use, useEffect, useState } from 'react';

import { StatusSelector } from '@/components/tickets/status-selector';
import { useTicket } from '@/hooks/use-ticket';
import { updateTicketStatus } from '@/services/ticket.service';
import { StatusBadge } from '@/components/tickets/status-badge';
import { PriorityBadge } from '@/components/tickets/priority-badge';
import { AIInsightsCard } from '@/components/tickets/ai-insights-card';
import { AssignedAgentCard } from '@/components/tickets/assigned-agent-card';
import { ActivityTimeline } from '@/components/tickets/activity-timeline';

interface TicketDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function TicketDetailsPage({
  params,
}: TicketDetailsPageProps) {
  const { id } = use(params);

  return (
    <TicketDetailsContent
      id={id}
    />
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
      <main className="container mx-auto bg-white p-6 text-gray-900 dark:bg-black dark:text-white">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Loading Ticket...
        </h1>
      </main>
    );
  }

  if (!ticket) {
    return (
      <main className="container mx-auto bg-white p-6 text-gray-900 dark:bg-black dark:text-white">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Ticket Not Found
        </h1>
      </main>
    );
  }

  return (
  <main className="container mx-auto bg-white p-6 text-gray-900 dark:bg-black dark:text-white">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
      Ticket Details
    </h1>

    <div className="mt-6 grid gap-6 lg:grid-cols-3">

      {/* Left Column */}
      <div className="lg:col-span-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
            Ticket Information
          </h2>

          <div className="space-y-6">

            <div>
              <p className="text-sm text-gray-600 dark:text-zinc-400">
                Subject
              </p>

              <p className="font-medium text-gray-900 dark:text-white">
                {ticket.subject}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-zinc-400">
                Description
              </p>

              <p className="text-gray-900 dark:text-white">
                {ticket.body}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <strong>Status:</strong>

              <StatusSelector
                value={status}
                onChange={handleStatusChange}
              />

              <StatusBadge status={status} />
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-zinc-400">
                Category
              </p>

              <p className="font-medium text-gray-900 dark:text-white">
                {ticket.category?.name ?? 'N/A'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <strong>Priority:</strong>

              <PriorityBadge
                priority={
                  ticket.priority?.label ?? 'LOW'
                }
              />
            </div>

          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">

        <AssignedAgentCard
          agent={ticket.assignedAgent}
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

      </div>

    </div>

    <section className="mt-8">
      <ActivityTimeline
        activities={ticket.activities}
      />
    </section>
  </main>
);
}