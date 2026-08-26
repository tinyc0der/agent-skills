#!/usr/bin/env node

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

const REQUIRED_TEXT = [
  { file: 'AGENTS.md', values: ['VERIFY → `verification-and-validation`'] },
  { file: 'docs/opencode-setup.md', values: ['VERIFY → `verification-and-validation`'] },
];

const ORDERED_LIFECYCLES = ['README.md', 'references/orchestration-patterns.md'];
const LIFECYCLE_TOKENS = [
  '/spec', '/plan', '/pr draft', '/build', '/verify', '/pr ready', '/review', '/ship',
];

const REVIEW_PRODUCERS = [
  'skills/code-review-and-quality/SKILL.md',
  'agents/code-reviewer.md',
  '.claude/commands/review.md',
  '.gemini/commands/review.toml',
  'commands/review.toml',
];
const REVIEW_TAXONOMY = ['Critical', 'Required', 'Optional', 'Nit', 'FYI'];

const SHIP_CONSUMERS = [
  '.claude/commands/ship.md',
  '.gemini/commands/ship.toml',
  'commands/ship.toml',
];

function read(relativePath) {
  const absolutePath = path.join(ROOT, relativePath);
  if (!fs.existsSync(absolutePath)) return null;
  return fs.readFileSync(absolutePath, 'utf8');
}

function missingOrderedTokens(content, tokens) {
  let cursor = 0;
  const missing = [];
  for (const token of tokens) {
    const index = content.indexOf(token, cursor);
    if (index === -1) {
      missing.push(token);
    } else {
      cursor = index + token.length;
    }
  }
  return missing;
}

function main() {
  console.log('Checking lifecycle contracts...\n');
  let errors = 0;

  function fail(file, message) {
    console.log(`  ✗  ${file}: ${message}`);
    errors++;
  }

  function pass(file) {
    console.log(`  ✓  ${file}`);
  }

  for (const { file, values } of REQUIRED_TEXT) {
    const content = read(file);
    if (content === null) {
      fail(file, 'required contract file is missing');
      continue;
    }
    const missing = values.filter(value => !content.includes(value));
    if (missing.length) fail(file, `missing canonical mapping: ${missing.join(', ')}`);
    else pass(file);
  }

  for (const file of ORDERED_LIFECYCLES) {
    const content = read(file);
    if (content === null) {
      fail(file, 'required lifecycle file is missing');
      continue;
    }
    const missing = missingOrderedTokens(content, LIFECYCLE_TOKENS);
    if (missing.length) fail(file, `missing or out-of-order lifecycle tokens: ${missing.join(', ')}`);
    else pass(file);
  }

  for (const file of REVIEW_PRODUCERS) {
    const content = read(file);
    if (content === null) {
      fail(file, 'required review producer is missing');
      continue;
    }
    const missing = REVIEW_TAXONOMY.filter(value => !content.includes(value));
    if (missing.length) fail(file, `missing review severities: ${missing.join(', ')}`);
    else pass(file);
  }

  for (const file of SHIP_CONSUMERS) {
    const content = read(file);
    if (content === null) {
      fail(file, 'required ship consumer is missing');
      continue;
    }
    const missing = ['Critical', 'Required'].filter(value => !content.includes(value));
    if (!/revision/i.test(content)) missing.push('revision');
    if (missing.length) fail(file, `missing blocking or freshness contract: ${missing.join(', ')}`);
    else pass(file);
  }

  const status = errors > 0 ? 'FAILED' : 'PASSED';
  console.log(`\n${errors} error(s) — ${status}`);
  if (errors > 0) process.exit(1);
}

main();
