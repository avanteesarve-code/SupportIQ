import 'dotenv/config';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const [categoryCount, priorityCount, userCount] = await Promise.all([
    prisma.category.count(),
    prisma.priority.count(),
    prisma.user.count(),
  ]);

  console.log(`categories inserted: ${categoryCount}`);
  console.log(`priorities inserted: ${priorityCount}`);
  console.log(`users inserted: ${userCount}`);
}

main()
  .catch((error) => {
    console.error('Verification failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
