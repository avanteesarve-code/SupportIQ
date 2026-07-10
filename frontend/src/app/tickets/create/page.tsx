'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTicket } from '@/services/ticket.service';

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

      router.push(`/tickets/${ticket.id}`);
    } catch (error) {
      console.error(
        'Failed to create ticket:',
        error,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="container mx-auto p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">
          Create Ticket
        </h1>

        <p className="mt-2 text-muted-foreground">
          Submit a support request for AI-powered
          classification and assignment.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter ticket title"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue..."
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Customer Email
            </label>

            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              placeholder="customer@example.com"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {isSubmitting
              ? 'Creating...'
              : 'Create Ticket'}
          </button>
        </form>
      </div>
    </main>
  );
}