'use strict';

const fs = require('node:fs');

for (const file of ['src/slug.js', 'test/slug.test.js']) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('\t')) {
    console.error(`${file}: tabs are not allowed`);
    process.exitCode = 1;
  }
}
