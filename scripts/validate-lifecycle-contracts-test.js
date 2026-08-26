#!/usr/bin/env node

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { afterEach, test } = require('node:test');

const VALIDATOR = path.join(__dirname, 'validate-lifecycle-contracts.js');
const sandboxes = [];

function makeSandbox() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-skills-lifecycle-test-'));
  const scriptsDir = path.join(root, 'scripts');
  fs.mkdirSync(scriptsDir, { recursive: true });
  fs.copyFileSync(VALIDATOR, path.join(scriptsDir, 'validate-lifecycle-contracts.js'));
  sandboxes.push(root);
  return root;
}

function writeFile(root, relativePath, content) {
  const file = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function writeCanonicalFiles(root) {
  writeFile(root, 'AGENTS.md', 'VERIFY → `verification-and-validation`\n');
  writeFile(root, 'docs/opencode-setup.md', 'VERIFY → `verification-and-validation`\n');
  writeFile(root, 'README.md', '/spec /plan /pr draft /build /verify /pr ready /review /ship\n');
  writeFile(root, 'references/orchestration-patterns.md', '/spec /plan /pr draft /build /verify /pr ready /review /ship\n');

  const taxonomy = 'Critical Required Optional Nit FYI';
  for (const file of [
    'skills/code-review-and-quality/SKILL.md',
    'agents/code-reviewer.md',
    '.claude/commands/review.md',
    '.gemini/commands/review.toml',
    'commands/review.toml',
  ]) {
    writeFile(root, file, taxonomy);
  }

  for (const file of [
    '.claude/commands/ship.md',
    '.gemini/commands/ship.toml',
    'commands/ship.toml',
  ]) {
    writeFile(root, file, 'Critical Required exact release revision');
  }
}

function run(root) {
  return spawnSync(process.execPath, [path.join(root, 'scripts', 'validate-lifecycle-contracts.js')], {
    cwd: root,
    encoding: 'utf8',
  });
}

afterEach(() => {
  for (const root of sandboxes.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('passes when lifecycle and review contracts are aligned', () => {
  const root = makeSandbox();
  writeCanonicalFiles(root);

  const result = run(root);

  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /0 error\(s\) — PASSED/);
});

test('fails when routine verification maps to debugging', () => {
  const root = makeSandbox();
  writeCanonicalFiles(root);
  writeFile(root, 'AGENTS.md', 'VERIFY → `debugging-and-error-recovery`\n');

  const result = run(root);

  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /AGENTS\.md/);
  assert.match(result.stdout, /verification-and-validation/);
});

test('fails when a review producer uses the legacy Important taxonomy', () => {
  const root = makeSandbox();
  writeCanonicalFiles(root);
  writeFile(root, 'agents/code-reviewer.md', 'Critical Important Suggestion');

  const result = run(root);

  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /agents\/code-reviewer\.md/);
  assert.match(result.stdout, /Required/);
});
