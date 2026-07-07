import type { NextFunction, Request, Response } from 'express';

import { generateTicketAnalysis } from '../services/ai.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { aiAnalyzeSchema } from '../validators/ai.validator.js';

export async function analyzeTicketController(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = aiAnalyzeSchema.parse(req.body);
    const analysis = await generateTicketAnalysis(payload);

    return res.status(200).json(ApiResponse.success('AI analysis generated successfully', analysis));
  } catch (error) {
    return next(error);
  }
}