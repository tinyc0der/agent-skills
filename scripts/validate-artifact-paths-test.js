#!/usr/bin/env node

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { afterEach, test } = require('node:test');

const VALIDATOR = path.join(__dirname, 'validate-artifact-paths.js');
const sandboxes = [];

function makeSandbox() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-skills-validate-artifact-paths-test-'));
  const scriptsDir = path.join(root, 'scripts');
  fs.mkdirSync(scriptsDir, { recursive: true });
  fs.copyFileSync(VALIDATOR, path.join(scriptsDir, 'validate-artifact-paths.js'));
  sandboxes.push(root);
  return root;
}

function writeFile(root, relativePath, content) {
  const file = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function run(root) {
  return spawnSync(process.execPath, [path.join(root, 'scripts', 'validate-artifact-paths.js')], {
    cwd: root,
    encoding: 'utf8',
  });
}

afterEach(() => {
  for (const root of sandboxes.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('passes when producers and consumers use the canonical artifact paths', () => {
  const root = makeSandbox();
  writeFile(root, '.claude/commands/spec.md', 'Save the spec as `specs/SPEC.md`.\n');
  writeFile(root, '.claude/commands/plan.md', 'Save the plan to `tasks/plan.md` and task list to `tasks/todo.md`.\n');
  writeFile(root, '.claude/commands/build.md', 'Look for `specs/SPEC.md` or `specs/capability-map.md`. Require `tasks/plan.md`.\n');
  writeFile(root, 'skills/spec-driven-development/SKILL.md', 'Save the plan to `tasks/plan.md` and the task list to `tasks/todo.md`.\n');
  writeFile(root, 'skills/planning-and-task-breakdown/SKILL.md', 'Save to `tasks/plan.md` and `tasks/todo.md`.\n');

  const result = run(root);

  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /5 files checked — 0 error\(s\) — PASSED/);
});

test('fails when a producer drifts to an unapproved artifact path (the #93 regression)', () => {
  const root = makeSandbox();
  // Only the producers are changed to the per-feature layout; consumers stay on the old paths.
  writeFile(root, '.claude/commands/spec.md', 'Save the spec to `docs/features/[feature-name]/spec.md`.\n');
  writeFile(root, '.claude/commands/plan.md', 'Save the plan to `docs/features/[feature-name]/plan.md`.\n');
  writeFile(root, '.claude/commands/build.md', 'Require a spec at `SPEC.md` and a plan at `tasks/plan.md`.\n');

  const result = run(root);

  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /docs\/features\/\[feature-name\]\/spec\.md/);
  assert.match(result.stdout, /docs\/features\/\[feature-name\]\/plan\.md/);
  assert.match(result.stdout, /error\(s\) — FAILED/);
});

test('fails when Gemini command artifacts drift', () => {
  const root = makeSandbox();
  writeFile(root, '.gemini/commands/spec.toml', 'prompt = "Save to docs/SPEC.md"\n');
  writeFile(root, '.gemini/commands/planning.toml', 'prompt = "Save to docs/plan.md"\n');
  writeFile(root, '.gemini/commands/build.toml', 'prompt = "Read docs/SPEC-module.md"\n');

  const result = run(root);

  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /\.gemini\/commands\/spec\.toml/);
  assert.match(result.stdout, /\.gemini\/commands\/planning\.toml/);
  assert.match(result.stdout, /\.gemini\/commands\/build\.toml/);
});

test('fails when Antigravity command artifacts drift', () => {
  const root = makeSandbox();
  writeFile(root, 'commands/spec.toml', 'prompt = "Save to docs/SPEC.md"\n');
  writeFile(root, 'commands/planning.toml', 'prompt = "Save to docs/plan.md"\n');
  writeFile(root, 'commands/build.toml', 'prompt = "Read docs/SPEC-module.md"\n');

  const result = run(root);

  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /commands\/spec\.toml/);
  assert.match(result.stdout, /commands\/planning\.toml/);
  assert.match(result.stdout, /commands\/build\.toml/);
});

test('reports the offending file and line number', () => {
  const root = makeSandbox();
  writeFile(root, '.claude/commands/plan.md', 'Intro line.\nSave the plan to `plan.md` in the root.\n');

  const result = run(root);

  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /\.claude\/commands\/plan\.md/);
  assert.match(result.stdout, /L2:/);
});

test('accepts the multi-capability map location', () => {
  const root = makeSandbox();
  writeFile(root, '.claude/commands/build.md', 'Look for `specs/capability-map.md`.\n');

  const result = run(root);

  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /1 files checked — 0 error\(s\) — PASSED/);
});

test('accepts canonical module specs and rejects module specs outside specs/', () => {
  const validRoot = makeSandbox();
  writeFile(validRoot, '.claude/commands/build.md', 'Select `specs/SPEC-identity.md`.\n');

  const validResult = run(validRoot);

  assert.equal(validResult.status, 0, validResult.stdout + validResult.stderr);

  const invalidRoot = makeSandbox();
  writeFile(invalidRoot, '.claude/commands/build.md', 'Select `docs/SPEC-identity.md`.\n');

  const invalidResult = run(invalidRoot);

  assert.equal(invalidResult.status, 1, invalidResult.stdout + invalidResult.stderr);
  assert.match(invalidResult.stdout, /docs\/SPEC-identity\.md/);
});

test('ignores non-artifact markdown references (no false positives)', () => {
  const root = makeSandbox();
  writeFile(
    root,
    'skills/spec-driven-development/SKILL.md',
    'See `SKILL.md` and `references/testing-patterns.md`. Save the plan to `tasks/plan.md`.\n',
  );

  const result = run(root);

  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /1 files checked — 0 error\(s\) — PASSED/);
});

test('skips guarded files that do not exist', () => {
  const root = makeSandbox();
  writeFile(root, '.claude/commands/spec.md', 'Save the spec as `specs/SPEC.md`.\n');
  // No other guarded files present.

  const result = run(root);

  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /1 files checked — 0 error\(s\) — PASSED/);
});
