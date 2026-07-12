import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface RetrievedChunk {
  documentTitle: string;
  chunkText: string;
}

function calculateScore(
  queryWords: string[],
  chunkText: string,
): number {
  const text = chunkText.toLowerCase();

  let score = 0;

  for (const word of queryWords) {
    if (text.includes(word)) {
      score++;
    }
  }

  return score;
}

export async function retrieveRelevantKnowledge(
  query: string,
  limit = 3,
): Promise<RetrievedChunk[]> {
  const chunks = await prisma.kBChunk.findMany({
    include: {
      document: true,
    },
  });

  const queryWords = query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2);

  const rankedChunks = chunks
    .map((chunk) => ({
      chunk,
      score: calculateScore(queryWords, chunk.chunkText),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return rankedChunks.map((item) => ({
    documentTitle: item.chunk.document.title,
    chunkText: item.chunk.chunkText,
  }));
}