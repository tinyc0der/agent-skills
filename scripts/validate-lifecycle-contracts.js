#!/usr/bin/env node

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

const REQUIRED_TEXT = [
  { file: 'AGENTS.md', values: ['VERIFY → `verification-and-validation`'] },
  { file: 'docs/opencode-setup.md', values: ['VERIFY → `verification-and-validation`'] },
  ...[
    'skills/spec-driven-development/SKILL.md',
    'skills/verification-and-validation/SKILL.md',
    'skills/code-review-and-quality/SKILL.md',
    '.claude/commands/pr.md', '.claude/commands/verify.md', '.claude/commands/review.md',
    '.gemini/commands/pr.toml', '.gemini/commands/verify.toml', '.gemini/commands/review.toml',
    'commands/pr.toml', 'commands/verify.toml', 'commands/review.toml',
  ].map(file => ({ file, values: ['Spec reconciliation', 'docs/specs/<capability>/spec.md'] })),
];

const LIFECYCLE_TOKENS = [
  '/spec', '/plan', '/pr draft', '/build', '/verify', '/pr ready', '/review', '/ship',
];
const ORDERED_LIFECYCLES = [
  { file: 'README.md', tokens: LIFECYCLE_TOKENS },
  { file: 'docs/feature-development-workflow.md', tokens: LIFECYCLE_TOKENS, section: '## Canonical Command Sequence' },
  { file: 'references/orchestration-patterns.md', tokens: LIFECYCLE_TOKENS },
  {
    file: 'skills/using-agent-skills/SKILL.md',
    section: '## Lifecycle Sequence',
    tokens: [
      'spec-driven-development',
      'planning-and-task-breakdown',
      'Draft PR',
      'incremental-implementation',
      'verification-and-validation',
      'Ready PR',
      'code-review-and-quality',
      'Merge',
      'shipping-and-launch',
    ],
  },
];

const REVIEW_PRODUCERS = [
  'skills/code-review-and-quality/SKILL.md',
  'agents/code-reviewer.md',
  '.claude/commands/review.md',
  '.gemini/commands/review.toml',
  'commands/review.toml',
];
const REVIEW_TAXONOMY = ['Critical', 'Required', 'Optional', 'Nit', 'FYI'];

const DURABLE_ARTIFACT_CONTRACTS = [
  ...[
    'skills/verification-and-validation/SKILL.md',
    '.claude/commands/verify.md',
    '.gemini/commands/verify.toml',
    'commands/verify.toml',
  ].map(file => ({ file, artifact: 'docs/tracks/<track-id>/verification.md' })),
  ...REVIEW_PRODUCERS.map(file => ({ file, artifact: 'docs/tracks/<track-id>/review.md' })),
  ...[
    'skills/shipping-and-launch/SKILL.md',
    '.claude/commands/ship.md',
    '.gemini/commands/ship.toml',
    'commands/ship.toml',
  ].map(file => ({ file, artifact: 'docs/tracks/<track-id>/ship.md' })),
];

const SHIP_SKILL = 'skills/shipping-and-launch/SKILL.md';
const SHIP_COMMANDS = [
  '.claude/commands/ship.md',
  '.gemini/commands/ship.toml',
  'commands/ship.toml',
];

const SHIP_REQUIREMENTS = [
  ['Critical', /Critical/],
  ['Required', /Required/],
  ['exact release revision', /exact\s+release\s+revision/i],
  ['reuse', /reuse/i],
  ['stale', /stale/i],
  ['zero-argument', /zero-argument/i],
  ['remote default branch', /remote default branch/i],
  ['pinned target revision', /pin(?:ned)? (?:the )?target revision/i],
  ['release baseline', /last successful production/i],
  ['deployment baseline', /deployment record/i],
  ['published release baseline', /published[\s\S]{0,80}release/i],
  ['non-prerelease production release', /non-prerelease production release/i],
  ['release-tag baseline', /reachable release tag/i],
  ['release-state baseline', /release-state/i],
  ['ancestor validation', /ancestor/i],
  ['release range', /(?:release|commit) range/i],
  ['merged PR discovery', /merged PRs/i],
  ['direct commits', /direct commits/i],
  ['reverts', /reverts/i],
  ['ambiguity handling', /ambigu(?:ous|ity)/i],
  ['nothing to ship', /nothing to ship/i],
  ['confirmation', /confirmation/i],
  ['stop rather than guess', /stop\s+(?:for\s+clarification\s+)?(?:rather|instead\s+of)(?:\s+than)?\s+guess/i],
  ['PR-scoped evidence', /PR-scoped/i],
  ['release-scoped checks', /release-scoped/i],
  ['untrusted release metadata', /untrusted data/i],
  ['metadata instructions', /never execute[\s\S]{0,120}(?:instructions|commands)[\s\S]{0,120}metadata/i],
];

const SHIP_COMMAND_REQUIREMENTS = [
  ['Critical', /Critical/],
  ['Required', /Required/],
  ['exact release revision', /exact\s+release\s+revision/i],
  ['reuse', /reuse/i],
  ['stale', /stale/i],
  ['zero-argument', /zero-argument/i],
  ['shipping-and-launch skill', /shipping-and-launch skill/i],
  ['automatic release discovery', /Automatic Release Discovery/i],
  ['confirmation', /confirmation/i],
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

function readSection(content, heading) {
  if (!heading) return content;
  const start = content.indexOf(heading);
  if (start === -1) return null;
  const nextHeading = content.indexOf('\n## ', start + heading.length);
  return nextHeading === -1 ? content.slice(start) : content.slice(start, nextHeading);
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

  for (const { file, tokens, section } of ORDERED_LIFECYCLES) {
    const content = read(file);
    if (content === null) {
      fail(file, 'required lifecycle file is missing');
      continue;
    }
    const contract = readSection(content, section);
    if (contract === null) {
      fail(file, `missing lifecycle section: ${section}`);
      continue;
    }
    const missing = missingOrderedTokens(contract, tokens);
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

  for (const { file, artifact } of DURABLE_ARTIFACT_CONTRACTS) {
    const content = read(file);
    if (content === null) {
      fail(file, 'required durable-artifact producer is missing');
      continue;
    }
    if (!content.includes(artifact)) fail(file, `missing durable artifact contract: ${artifact}`);
    else pass(file);
  }

  for (const [file, requirements] of [
    [SHIP_SKILL, SHIP_REQUIREMENTS],
    ...SHIP_COMMANDS.map(file => [file, SHIP_COMMAND_REQUIREMENTS]),
  ]) {
    const content = read(file);
    if (content === null) {
      fail(file, 'required ship consumer is missing');
      continue;
    }
    const missing = requirements.filter(([, pattern]) => !pattern.test(content)).map(([label]) => label);
    if (missing.length) fail(file, `missing blocking or freshness contract: ${missing.join(', ')}`);
    else pass(file);
  }

  const status = errors > 0 ? 'FAILED' : 'PASSED';
  console.log(`\n${errors} error(s) — ${status}`);
  if (errors > 0) process.exit(1);
}

main();
