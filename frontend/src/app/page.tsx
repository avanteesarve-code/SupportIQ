'use client';

import Link from 'next/link';
import AnimatedCard from '@/components/ui/animated-card';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl">

          <div className="flex items-center justify-center gap-3 mb-6">

  <h1 className="text-6xl font-extrabold tracking-tight">
    PRIORO
  </h1>
</div>

          <p className="mt-4 text-center text-2xl font-semibold text-teal-600 dark:text-teal-400">
  AI-Powered Support Ticket Management
</p>

          <p className="mt-6 text-center text-lg text-gray-600 dark:text-zinc-400">
  Automatically classify, prioritize, assign,
  and resolve customer support tickets using
  AI-driven workflows and intelligent automation.
</p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
  href="/tickets"
  className="inline-flex items-center justify-center rounded-md border border-teal-600 px-6 py-3 font-medium text-teal-600 transition hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-950/40"
>
  View Tickets
</Link>
            <Link
  href="/tickets/create"
  className="inline-flex items-center justify-center rounded-md bg-teal-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-teal-700"
>
  Create Ticket
</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">

  {[
    {
      title: "AI Classification",
      description:
        "Automatically categorizes incoming support requests.",
    },
    {
      title: "Priority Detection",
      description:
        "Identifies urgent issues and escalations instantly.",
    },
    {
      title: "Auto Assignment",
      description:
        "Routes tickets to the most suitable support agent.",
    },
    {
      title: "Knowledge Retrieval",
      description:
        "Finds relevant documentation and previous solutions.",
    },
    {
      title: "AI Suggested Replies",
      description:
        "Generates contextual responses for faster resolution.",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Tracks workload, trends, and team performance.",
    },
  ].map((feature, index) => (
    <AnimatedCard
      key={feature.title}
      delay={index * 0.1}
      className="
group
rounded-3xl
border
border-teal-200
bg-white
p-8
min-h-[220px]
flex
flex-col
justify-between
transition-all
duration-300
hover:border-teal-500
hover:shadow-2xl
dark:border-teal-900
dark:bg-zinc-950
"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {feature.title}
      </h3>

      <p className="mt-3 text-gray-600 dark:text-zinc-400">
        {feature.description}
      </p>
    </AnimatedCard>
  ))}
</div>
       

      

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