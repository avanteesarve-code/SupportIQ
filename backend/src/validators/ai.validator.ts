import { z } from 'zod';

export const aiAnalyzeSchema = z.object({
  subject: z.string().trim().min(1, 'subject is required'),
  body: z.string().trim().min(1, 'body is required'),
});

export type AIAnalyzeInput = z.infer<typeof aiAnalyzeSchema>;