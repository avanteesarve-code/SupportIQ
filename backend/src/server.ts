import 'dotenv/config';

import { app } from './app.js';
import { env } from './config/env.js';
import { aiRouter } from './routes/ai.routes.js';
import { apiRouter } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFound.middleware.js';

app.use('/api/ai', aiRouter);
app.use('/api', apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

const port = env.port;

console.log('Gemini API Key loaded:', !!env.geminiApiKey);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});