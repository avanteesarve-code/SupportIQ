import 'dotenv/config';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CHUNK_SIZE = 200;

function splitIntoChunks(text: string, chunkSize: number): string[] {
  const cleaned = text.replace(/\s+/g, ' ').trim();

  const chunks: string[] = [];

  for (let i = 0; i < cleaned.length; i += chunkSize) {
    chunks.push(cleaned.slice(i, i + chunkSize));
  }

  return chunks;
}

async function main() {
  const documents = await prisma.knowledgeBaseDocument.findMany();

  if (!documents.length) {
    console.log('No knowledge base documents found.');
    return;
  }

  await prisma.kBChunk.deleteMany();

  let totalChunks = 0;

  for (const document of documents) {
    const chunks = splitIntoChunks(document.content, CHUNK_SIZE);

    for (let index = 0; index < chunks.length; index++) {
      await prisma.kBChunk.create({
        data: {
          documentId: document.id,
          chunkText: chunks[index],
          chunkIndex: index,
        },
      });

      totalChunks++;
    }
  }

  console.log(`Processed ${documents.length} documents`);
  console.log(`Created ${totalChunks} chunks`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });