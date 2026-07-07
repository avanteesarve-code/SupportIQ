import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(5000),
  DATABASE_URL: z.string().trim().min(1, 'DATABASE_URL is required'),
  GEMINI_API_KEY: z.string().trim().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const message = parsedEnv.error.issues.map((issue) => issue.message).join(', ');
  throw new Error(`Environment validation failed: ${message}`);
}

export const env = {
  port: parsedEnv.data.PORT,
  databaseUrl: parsedEnv.data.DATABASE_URL,
  geminiApiKey: parsedEnv.data.GEMINI_API_KEY ?? '',
};

export function assertGeminiApiKey() {
  if (!env.geminiApiKey) {
    throw new Error('GEMINI_API_KEY is required for AI operations');
  }

  return env.geminiApiKey;
}