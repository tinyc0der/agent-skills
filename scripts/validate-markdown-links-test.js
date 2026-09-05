#!/usr/bin/env node

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { afterEach, test } = require('node:test');

const VALIDATOR = path.join(__dirname, 'validate-markdown-links.js');
const sandboxes = [];

function makeSandbox() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-skills-markdown-links-test-'));
  const scriptsDir = path.join(root, 'scripts');
  fs.mkdirSync(scriptsDir, { recursive: true });
  fs.copyFileSync(VALIDATOR, path.join(scriptsDir, 'validate-markdown-links.js'));
  sandboxes.push(root);
  return root;
}

function writeFile(root, relativePath, content) {
  const file = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function run(root) {
  const init = spawnSync('git', ['init', '--quiet'], { cwd: root, encoding: 'utf8' });
  assert.equal(init.status, 0, init.stdout + init.stderr);
  const add = spawnSync('git', ['add', '--all'], { cwd: root, encoding: 'utf8' });
  assert.equal(add.status, 0, add.stdout + add.stderr);
  return spawnSync(process.execPath, [path.join(root, 'scripts', 'validate-markdown-links.js')], {
    cwd: root,
    encoding: 'utf8',
  });
}

afterEach(() => {
  for (const root of sandboxes.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('passes local files and valid heading anchors', () => {
  const root = makeSandbox();
  writeFile(
    root,
    'README.md',
    '# All 25 Skills\n\nSee [setup](docs/setup.md#getting-started) and [API](docs/setup.md#api--integration).\n',
  );
  writeFile(root, 'docs/setup.md', '# Getting Started\n\n## API / Integration\n');

  const result = run(root);

  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /PASSED/);
});

test('fails a missing local file', () => {
  const root = makeSandbox();
  writeFile(root, 'README.md', 'See [missing](docs/missing.md).\n');

  const result = run(root);

  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /docs\/missing\.md/);
  assert.match(result.stdout, /does not exist/);
});

test('fails a stale heading anchor', () => {
  const root = makeSandbox();
  writeFile(root, 'README.md', '# All 25 Skills\n');
  writeFile(root, 'docs/adoption-guide.md', 'See [catalog](../README.md#all-24-skills).\n');

  const result = run(root);

  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /all-24-skills/);
  assert.match(result.stdout, /anchor does not exist/);
});

test('checks tracked Markdown outside the original documentation roots', () => {
  const root = makeSandbox();
  writeFile(root, 'CONTRIBUTING.md', '# Contributing\n');
  writeFile(root, '.claude/commands/example.md', 'See [missing](../../docs/missing.md).\n');
  writeFile(root, 'evals/README.md', 'See [missing](missing-guide.md).\n');

  const result = run(root);

  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /\.claude\/commands\/example\.md/);
  assert.match(result.stdout, /evals\/README\.md/);
  assert.match(result.stdout, /does not exist/);
});

test('treats eval fixture Markdown as test input rather than repository documentation', () => {
  const root = makeSandbox();
  writeFile(root, 'evals/README.md', 'See [fixture](fixtures/memory/docs/knowledge/project.md).\n');
  writeFile(root, 'evals/fixtures/memory/docs/knowledge/project.md',
    'A bundle-relative [decision](/decisions/store.md) and an intentionally [missing concept](missing.md).\n');

  const result = run(root);

  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /1 Markdown files checked/);
});

test('ignores external links and links inside fenced examples', () => {
  const root = makeSandbox();
  writeFile(
    root,
    'README.md',
    [
      '[External](https://example.com/docs#missing)',
      '```markdown',
      '[Example](docs/not-real.md)',
      '```',
      '',
    ].join('\n'),
  );

  const result = run(root);

  assert.equal(result.status, 0, result.stdout + result.stderr);
});
