import type { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

import { ApiResponse } from '../utils/ApiResponse.js';
import { AppError } from '../utils/appError.js';

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ZodError) {
    return res.status(400).json(
      ApiResponse.error(
        error.issues.map((issue) => issue.message).join(', '),
      ),
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(409).json(ApiResponse.error('Duplicate record found'));
    }

    if (error.code === 'P2025') {
      return res.status(404).json(ApiResponse.error('Record not found'));
    }
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json(ApiResponse.error(error.message));
  }

  if (error instanceof Error) {
    return res.status(500).json(ApiResponse.error('Something went wrong'));
  }

  return res.status(500).json(ApiResponse.error('Something went wrong'));
}