"use client";

import { use, useEffect, useState } from 'react';

import { StatusSelector } from '@/components/tickets/status-selector';
import { useTicket } from '@/hooks/use-ticket';
import {
  updateTicketStatus,
  getSuggestedReply,
} from '@/services/ticket.service';
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

    const [replyLoading, setReplyLoading] =
  useState(false);

const [suggestedReply, setSuggestedReply] =
  useState('');

const [replyHistory, setReplyHistory] =
  useState<string[]>([]);

const [knowledgeSources, setKnowledgeSources] =
  useState<string[]>([]);

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

async function handleCopyReply() {
  try {
    await navigator.clipboard.writeText(
      suggestedReply,
    );


    alert('Reply copied');
  } catch (error) {
    console.error(error);
    alert('Failed to copy reply');
  }
}

function handleUseReply(
  reply: string,
) {
  setSuggestedReply(reply);
}

  async function handleGenerateReply() {
  try {
    setReplyLoading(true);

    const result =
      await getSuggestedReply(id);

    setSuggestedReply(
      result.suggestedReply,
    );

    setReplyHistory([
  result.suggestedReply,
]);

    setKnowledgeSources(
      result.knowledgeSources,
    );
  } catch (error) {
    console.error(error);

    alert(
      'Failed to generate reply',
    );
  } finally {
    setReplyLoading(false);
  }
}

async function handleRegenerateReply() {
  try {
    setReplyLoading(true);

    const result =
      await getSuggestedReply(id);

    setSuggestedReply(
      result.suggestedReply,
    );

setReplyHistory((prev) => [
  ...prev,
  result.suggestedReply,
]);

    setKnowledgeSources(
      result.knowledgeSources,
    );
  } catch (error) {
    console.error(error);

    alert(
      'Failed to regenerate reply',
    );
  } finally {
    setReplyLoading(false);
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
      {/* Left Column */}
<div className="lg:col-span-2">
  <div className="rounded-2xl border border-[#2a9d8f]/20 bg-white p-6 shadow-lg shadow-[#2a9d8f]/10 dark:bg-zinc-950">
    <div className="mb-6 flex items-center gap-2">
      <div className="rounded-full bg-[#2a9d8f]/15 px-3 py-1 text-xs font-medium text-[#2a9d8f]">
        🎫 Ticket
      </div>

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Ticket Information
      </h2>
    </div>

    <div className="space-y-5">
      <div className="group relative rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#2a9d8f]/50 hover:shadow-xl hover:shadow-[#2a9d8f]/20 dark:border-zinc-800">
        <p className="mb-2 text-sm text-gray-600 dark:text-zinc-400">
          Subject
        </p>

        <p className="font-medium text-gray-900 dark:text-white">
          {ticket.subject}
        </p>
      </div>

      <div className="group relative rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#2a9d8f]/50 hover:shadow-xl hover:shadow-[#2a9d8f]/20 dark:border-zinc-800">
        <p className="mb-2 text-sm text-gray-600 dark:text-zinc-400">
          Description
        </p>

        <p className="text-gray-900 dark:text-white">
          {ticket.body}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="group relative rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#2a9d8f]/50 hover:shadow-xl hover:shadow-[#2a9d8f]/20 dark:border-zinc-800">
  <p className="mb-3 text-sm text-gray-600 transition-colors duration-300 group-hover:text-[#2a9d8f] dark:text-zinc-400">
    Status
  </p>

          <div className="space-y-3">
            <StatusSelector
              value={status}
              onChange={handleStatusChange}
            />

            <StatusBadge status={status} />
          </div>
        </div>

        <div className="group relative rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#2a9d8f]/50 hover:shadow-xl hover:shadow-[#2a9d8f]/20 dark:border-zinc-800">
          <p className="font-medium text-gray-900 transition-colors duration-300 group-hover:text-[#2a9d8f] dark:text-white">
            Category
          </p>

          <p className="font-medium text-gray-900 dark:text-white">
            {ticket.category?.name ?? 'N/A'}
          </p>
        </div>

        <div className="group relative rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#2a9d8f]/50 hover:shadow-xl hover:shadow-[#2a9d8f]/20 dark:border-zinc-800">
          <p className="mb-3 text-sm text-gray-600 dark:text-zinc-400">
            Priority
          </p>

          <PriorityBadge
            priority={
              ticket.priority?.label ?? 'LOW'
            }
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={handleGenerateReply}
          disabled={replyLoading}
          className="
            flex items-center gap-2
            rounded-xl
            bg-[#2a9d8f]
            px-5
            py-3
            font-medium
            text-white
            transition
            hover:bg-[#23867a]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Generate AI Reply
        </button>
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

    {suggestedReply && (
  <section className="mt-8">
    <div className="rounded-2xl border border-[#2a9d8f]/20 bg-white p-6 shadow-lg shadow-[#2a9d8f]/10 dark:bg-zinc-950">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-[#2a9d8f]/15 px-3 py-1 text-sm font-medium text-[#2a9d8f]">
            ✨ AI Generated
          </div>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Suggested Reply
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleRegenerateReply}
            disabled={replyLoading}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm transition hover:border-[#2a9d8f] hover:text-[#2a9d8f] disabled:opacity-50"
          >
            {replyLoading
              ? 'AI Thinking...'
              : 'Regenerate'}
          </button>

          <button
            onClick={handleCopyReply}
            className="rounded-lg bg-[#2a9d8f] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#23867a]"
          >
            Copy Reply
          </button>
        </div>
      </div>

      {replyLoading && (
        <div className="mb-6 flex flex-col items-center">
          <div className="loader" />

          <p className="mt-4 text-sm text-[#2a9d8f]">
            Generating AI response...
          </p>
        </div>
      )}

      <div className=" rounded-xl borderborder-gray-200 bg-gray-50 p-5 dark:border-zinc-800 dark:bg-black/40">
        <p className="whitespace-pre-wrap text-gray-900 dark:text-white">
          {suggestedReply}
        </p>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-medium text-gray-900 dark:text-white">
            Knowledge Sources
          </h3>

          <span className="rounded-full bg-[#2a9d8f]/15 px-3 py-1 text-xs text-[#2a9d8f]">
            {knowledgeSources.length} sources
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {knowledgeSources.map((source) => (
            <span
              key={source}
              className="rounded-full border border-zinc-700 px-3 py-1 text-sm dark:border-zinc-700
dark:text-zinc-300"
            >
              {source}
            </span>
          ))}
        </div>
      </div>

      {replyHistory.length > 1 && (
        <div className="mt-8">
          <h3 className="mb-4 font-medium text-white">
            Previous Generations
          </h3>

          <div className="space-y-3">
            {replyHistory.map((reply, index) => (
              <div
                key={index}
                onClick={() => handleUseReply(reply)}
                className="cursor-pointer rounded-xl border border-zinc-800 bg-black/30 p-4 transition hover:border-[#2a9d8f]/50"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900
dark:text-white text-white">
                    Version {index + 1}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUseReply(reply);
                    }}
                    className="
cursor-pointer rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:border-[#2a9d8f]/50 dark:border-zinc-800 dark:bg-black/30"
                  >
                    Use This
                  </button>
                </div>

                <p className="line-clamp-3 whitespace-pre-wrap text-sm text-gray-600
dark:text-zinc-300">
                  {reply}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </section>
)}

    <section className="mt-8">
      <ActivityTimeline
        activities={ticket.activities}
      />
    </section>
  </main>
);}