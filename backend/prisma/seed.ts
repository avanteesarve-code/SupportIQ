import 'dotenv/config';

import bcrypt from 'bcrypt';
import { PrismaClient, PriorityLabel, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Billing', description: 'Invoices, payments, refunds, and account charges.' },
  { name: 'Technical Issue', description: 'Application defects, outages, and bug reports.' },
  { name: 'Account', description: 'Login, profile, access, and account management issues.' },
  { name: 'Feature Request', description: 'Requests for new capabilities or product improvements.' },
  { name: 'Other', description: 'Requests that do not fit the primary support categories.' },
];

const priorities = [
  { label: PriorityLabel.LOW, rank: 1 },
  { label: PriorityLabel.MEDIUM, rank: 2 },
  { label: PriorityLabel.HIGH, rank: 3 },
  { label: PriorityLabel.URGENT, rank: 4 },
];

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 10);

  await prisma.$transaction([
    prisma.ticketActivity.deleteMany(),
    prisma.aiResponse.deleteMany(),
    prisma.kBChunk.deleteMany(),
    prisma.knowledgeBaseDocument.deleteMany(),
    prisma.ticket.deleteMany(),
    prisma.analyticsDailyRollup.deleteMany(),
    prisma.user.deleteMany(),
    prisma.category.deleteMany(),
    prisma.priority.deleteMany(),
    prisma.category.createMany({ data: categories }),
    prisma.priority.createMany({ data: priorities }),
    prisma.user.createMany({
      data: [
        {
          name: 'Admin User',
          email: 'admin@supportiq.com',
          passwordHash,
          role: UserRole.ADMIN,
        },
        {
          name: 'Agent User',
          email: 'agent@supportiq.com',
          passwordHash,
          role: UserRole.AGENT,
        },
      ],
    }),
  ]);

  console.log('Seed completed successfully');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
