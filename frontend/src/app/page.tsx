'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight">
            SupportIQ
          </h1>

          <p className="mt-4 text-2xl font-semibold text-slate-600">
            AI-Powered Customer Support Ticket Triage
          </p>

          <p className="mt-6 text-lg text-slate-600">
            Automatically classify, prioritize,
            assign, and manage customer support
            tickets using AI.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/tickets"
              className="rounded-md bg-slate-900 px-6 py-3 font-medium hover:bg-slate-800"
              style={{ color: '#ffffff' }}
            >
              View Tickets
            </Link>

            <Link
              href="/tickets/create"
              className="rounded-md border border-slate-300 px-6 py-3 font-medium text-slate-900 hover:bg-slate-100"
            >
              Create Ticket
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Key Features
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="text-xl font-semibold">
              AI Classification
            </h3>

            <p className="mt-3 text-slate-600">
              Automatically detects ticket
              category and priority.
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="text-xl font-semibold">
              Auto Assignment
            </h3>

            <p className="mt-3 text-slate-600">
              Routes tickets to the most suitable
              support agent.
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="text-xl font-semibold">
              Analytics & Insights
            </h3>

            <p className="mt-3 text-slate-600">
              Monitor ticket trends and support
              performance.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border p-6 text-center">
            <p className="text-4xl font-bold">250+</p>
            <p className="mt-2 text-slate-600">
              Tickets Processed
            </p>
          </div>

          <div className="rounded-lg border p-6 text-center">
            <p className="text-4xl font-bold">12</p>
            <p className="mt-2 text-slate-600">
              Support Agents
            </p>
          </div>

          <div className="rounded-lg border p-6 text-center">
            <p className="text-4xl font-bold">94%</p>
            <p className="mt-2 text-slate-600">
              AI Accuracy
            </p>
          </div>

          <div className="rounded-lg border p-6 text-center">
            <p className="text-4xl font-bold">2.5h</p>
            <p className="mt-2 text-slate-600">
              Avg Resolution
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-3xl font-bold">
          Ready to streamline support?
        </h2>

        <p className="mt-4 text-slate-600">
          Create and manage support tickets with AI.
        </p>

        <Link
          href="/tickets/create"
          className="mt-8 inline-block rounded-md bg-slate-900 px-6 py-3 font-medium hover:bg-slate-800"
          style={{ color: '#ffffff' }}
        >
          Create Ticket
        </Link>
      </section>
    </main>
  );
}