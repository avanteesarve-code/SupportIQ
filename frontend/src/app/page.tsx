'use client';

import Link from 'next/link';
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-3xl">

          <div className="flex items-center justify-center gap-3 mb-6">
  <Image
    src="/logo.png"
    alt="PRIORO Logo"
    width={90}
    height={90}
  />

  <h1 className="text-6xl font-extrabold tracking-tight">
    PRIORO
  </h1>
</div>

          <p className="mt-4 text-center text-2xl font-semibold text-gray-600 dark:text-zinc-400">
            AI-Powered Customer Support Ticket Triage
          </p>

          <p className="mt-6 text-center text-lg text-gray-600 dark:text-zinc-400">
            Automatically classify, prioritize,
            assign, and manage customer support
            tickets using AI.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
  href="/tickets"
  className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-6 py-3 font-medium text-black shadow-sm hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
>
  View Tickets
</Link>
            <Link
              href="/tickets/create"
              className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-6 py-3 font-medium text-black shadow-sm hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
            >
              Create Ticket
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Key Features
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              AI Classification
            </h3>

            <p className="mt-3 text-gray-600 dark:text-zinc-400">
              Automatically detects ticket
              category and priority.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Auto Assignment
            </h3>

            <p className="mt-3 text-gray-600 dark:text-zinc-400">
              Routes tickets to the most suitable
              support agent.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Analytics & Insights
            </h3>

            <p className="mt-3 text-gray-600 dark:text-zinc-400">
              Monitor ticket trends and support
              performance.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-4xl font-bold text-gray-900 dark:text-white">250+</p>
            <p className="mt-2 text-gray-600 dark:text-zinc-400">
              Tickets Processed
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-4xl font-bold text-gray-900 dark:text-white">12</p>
            <p className="mt-2 text-gray-600 dark:text-zinc-400">
              Support Agents
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-4xl font-bold text-gray-900 dark:text-white">94%</p>
            <p className="mt-2 text-gray-600 dark:text-zinc-400">
              AI Accuracy
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-4xl font-bold text-gray-900 dark:text-white">2.5h</p>
            <p className="mt-2 text-gray-600 dark:text-zinc-400">
              Avg Resolution
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Ready to streamline support?
        </h2>

        <p className="mt-4 text-gray-600 dark:text-zinc-400">
          Create and manage support tickets with AI.
        </p>

        <Link
          href="/tickets/create"
          className="mt-8 inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-6 py-3 font-medium text-black shadow-sm hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
        >
          Create Ticket
        </Link>
      </section>
    </main>
  );
}