import 'dotenv/config';

import bcrypt from 'bcrypt';
import { PrismaClient, PriorityLabel, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Technical Support', description: 'Login issues, configuration help, and troubleshooting.' },
  { name: 'Billing', description: 'Invoices, payments, refunds, and account charges.' },
  { name: 'Feature Request', description: 'Requests for new capabilities or product improvements.' },
  { name: 'Bug Report', description: 'Application defects, outages, and reproducible errors.' },
  { name: 'General Inquiry', description: 'General questions that do not require specialized handling.' },
];

const priorities = [
  { label: PriorityLabel.LOW, rank: 1 },
  { label: PriorityLabel.MEDIUM, rank: 2 },
  { label: PriorityLabel.HIGH, rank: 3 },
  { label: PriorityLabel.URGENT, rank: 4 },
];

const knowledgeBaseDocuments = [
  {
    title: 'Password Reset Issues',
    content: `
Customers who cannot reset their password should first verify that they are using the correct email address.
Ask the customer to check spam and junk folders for the reset email.
If the reset link has expired, generate a new password reset link.
If multiple reset attempts fail, escalate to technical support.
    `,
  },
  {
    title: 'Login Troubleshooting',
    content: `
If a customer cannot log in, verify their username and password.
Check whether the account is locked due to multiple failed login attempts.
Ask the customer to clear browser cache and cookies.
If login problems continue, investigate authentication service availability.
    `,
  },
  {
    title: 'Billing and Refund Policy',
    content: `
Customers requesting refunds should provide their invoice number.
Refund requests submitted within 30 days of purchase are eligible for review.
Billing disputes should be escalated to the finance team.
Always verify payment status before issuing refunds.
    `,
  },
  {
    title: 'Account Access Issues',
    content: `
Customers reporting account access issues should be asked to verify their identity.
Check whether the account has been suspended or deactivated.
Review recent account activity for suspicious login attempts.
Escalate security-related concerns immediately.
    `,
  },
];

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 10);

  await prisma.$transaction([
    prisma.ticketActivity.deleteMany(),
    prisma.aIResponse.deleteMany(),
    prisma.kBChunk.deleteMany(),
    prisma.knowledgeBaseDocument.deleteMany(),
    prisma.ticket.deleteMany(),
    prisma.analyticsDailyRollup.deleteMany(),
    prisma.user.deleteMany(),
    prisma.category.deleteMany(),
    prisma.priority.deleteMany(),

    prisma.category.createMany({
      data: categories,
    }),

    prisma.priority.createMany({
      data: priorities,
    }),

    prisma.user.createMany({
      data: [
        {
          name: 'Admin User',
          email: 'admin@supportiq.com',
          passwordHash,
          role: UserRole.ADMIN,
        },
        {
          name: 'Rahul Sharma',
          email: 'rahul@supportiq.com',
          passwordHash,
          role: UserRole.AGENT,
        },
        {
          name: 'Priya Patel',
          email: 'priya@supportiq.com',
          passwordHash,
          role: UserRole.AGENT,
        },
        {
          name: 'Amit Verma',
          email: 'amit@supportiq.com',
          passwordHash,
          role: UserRole.AGENT,
        },
      ],
    }),
  ]);

  for (const document of knowledgeBaseDocuments) {
    await prisma.knowledgeBaseDocument.create({
      data: {
        title: document.title,
        content: document.content.trim(),
      },
    });
  }

  const documentCount = await prisma.knowledgeBaseDocument.count();

  console.log('Seed completed successfully');
  console.log(`Knowledge Base Documents created: ${documentCount}`);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });