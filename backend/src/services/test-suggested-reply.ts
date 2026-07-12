import 'dotenv/config';

import { generateSuggestedReply } from './ai.service.js';

async function main() {
  const result = await generateSuggestedReply(
    'Password Reset Problem',
    'I cannot reset my password and I never receive the reset email.',
  );

  console.log(JSON.stringify(result, null, 2));
}

main();