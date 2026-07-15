'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTicket } from '@/services/ticket.service';
import { toast } from 'sonner';

export default function CreateTicketPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    customerEmail: '',
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const router = useRouter();

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const ticket = await createTicket(
        formData,
      );
      toast.success('Ticket created successfully');
      
      router.push(`/tickets/${ticket.id}`);
    } catch (error) {
      toast.error('Failed to create ticket');
      console.error(
        'Failed to create ticket:',
        error,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="container mx-auto bg-white p-6 text-gray-900 dark:bg-black dark:text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create Ticket
        </h1>

        <p className="mt-2 text-gray-600 dark:text-zinc-400">
          Submit a support request for AI-powered
          classification and assignment.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter ticket title"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 shadow-sm outline-none transition focus:ring-2 focus:ring-slate-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:ring-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue..."
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 shadow-sm outline-none transition focus:ring-2 focus:ring-slate-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:ring-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Customer Email
            </label>

            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              placeholder="customer@example.com"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 shadow-sm outline-none transition focus:ring-2 focus:ring-slate-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:ring-white"
            />
          </div>

          {isSubmitting ? (
  <div className="flex flex-col items-center justify-center py-8">
    <div className="loader" />

    <div className="mt-6 text-center">
      <p className="font-medium text-gray-900 dark:text-white">
        AI is analyzing your ticket...
      </p>

      <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
        Classifying issue • Setting priority • Finding best agent
      </p>
    </div>
  </div>
) : (
  <button
    type="submit"
    className="rounded-md bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
  >
    Create Ticket
  </button>
)}
        </form>
      </div>
    </main>
  );
}