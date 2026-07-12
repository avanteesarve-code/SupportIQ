import { retrieveRelevantKnowledge } from './kb-retrieval.service.js';

async function main() {
  const results = await retrieveRelevantKnowledge(
    'customer cannot reset password and login',
  );

  console.log(JSON.stringify(results, null, 2));
}

main();