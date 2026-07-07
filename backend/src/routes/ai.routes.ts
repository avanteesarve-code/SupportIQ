import { Router } from 'express';

import { analyzeTicketController } from '../controllers/ai.controller.js';

export const aiRouter = Router();

aiRouter.post('/analyze', analyzeTicketController);