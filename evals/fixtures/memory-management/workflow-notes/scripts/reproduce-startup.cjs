'use strict';

let seededRows = 0;

async function seedDatabase() {
  console.log('seed:start');
  await Promise.resolve();
  seededRows = 3;
  console.log('seed:complete');
}

function setupTests() {
  seedDatabase();
}

setupTests();
console.log(`test:observed ${seededRows} rows`);
if (seededRows !== 3) process.exitCode = 1;
