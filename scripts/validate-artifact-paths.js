#!/usr/bin/env node
/**
 * validate-artifact-paths.js
 *
 * Guards the durable per-feature workflow bundle against silent path drift.
 *
 * The `/spec` and `/plan` commands (producers) write their artifacts to a set
 * of paths that the `/build` command and the spec/plan skills (consumers) read
 * back. When a producer moves an artifact without updating the consumers — as
 * in PR #93, which pointed `/spec` and `/plan` at docs/features/[name]/ while
 * `/build` still required SPEC.md and tasks/plan.md — the pipeline breaks, and
 * nothing else in CI catches it (command parity only compares descriptions).
 *
 * This validator enforces one canonical per-feature directory across the
 * lifecycle. Changing the convention means updating the allowed patterns and
 * every guarded producer and consumer in the same change; CI fails until they
 * agree.
 *
 * Scope is deliberately narrow: only workflow artifact filenames and only the
 * files that define their lifecycle. It is not a general markdown path linter.
 *
 * Exit codes: 0 = all clear, 1 = one or more drifted paths.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const FEATURE_SEGMENT = '(?:<feature-slug>|[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
const FIXED_ARTIFACT = '(?:spec|capability-map|plan|todo|verification|review|memory-delta|ship)';
const CANONICAL_ARTIFACT_RE = new RegExp(
  `^docs/specs/${FEATURE_SEGMENT}/${FIXED_ARTIFACT}\\.md$`,
);
const CANONICAL_MODULE_SPEC_RE = new RegExp(
  `^docs/specs/${FEATURE_SEGMENT}/spec-(?:<module-id>|[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\\.md$`,
);

// The files that make up the spec -> plan -> build pipeline. Absent files are
// skipped, not failed: this validator checks path consistency, not presence.
const GUARDED_FILES = [
  '.claude/commands/spec.md',
  '.claude/commands/plan.md',
  '.claude/commands/build.md',
  '.claude/commands/pr.md',
  '.claude/commands/verify.md',
  '.claude/commands/review.md',
  '.claude/commands/ship.md',
  '.gemini/commands/spec.toml',
  '.gemini/commands/planning.toml',
  '.gemini/commands/build.toml',
  '.gemini/commands/pr.toml',
  '.gemini/commands/verify.toml',
  '.gemini/commands/review.toml',
  '.gemini/commands/ship.toml',
  'commands/spec.toml',
  'commands/planning.toml',
  'commands/build.toml',
  'commands/pr.toml',
  'commands/verify.toml',
  'commands/review.toml',
  'commands/ship.toml',
  'skills/context-engineering/SKILL.md',
  'skills/spec-driven-development/SKILL.md',
  'skills/planning-and-task-breakdown/SKILL.md',
  'skills/verification-and-validation/SKILL.md',
  'skills/code-review-and-quality/SKILL.md',
  'skills/shipping-and-launch/SKILL.md',
  'skills/using-agent-skills/SKILL.md',
  'docs/feature-development-workflow.md',
  'docs/feature-development-workflow-release-notes.md',
  'docs/getting-started.md',
  'docs/adoption-guide.md',
];

// Artifact maps and overview documents may show filenames relative to the
// canonical bundle directory. Operational producers and consumers must always
// name the complete bundle path so they cannot accidentally read a root file.
const RELATIVE_PATH_FILES = new Set([
  'skills/context-engineering/SKILL.md',
  'docs/feature-development-workflow.md',
  'docs/feature-development-workflow-release-notes.md',
  'docs/getting-started.md',
  'docs/adoption-guide.md',
]);
const RELATIVE_ARTIFACT_RE = /^(?:spec|capability-map|plan|todo|verification|review|memory-delta|ship)\.md$/;
const RELATIVE_MODULE_SPEC_RE = /^spec-(?:<module-id>|[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\.md$/;
const LEGACY_MIGRATION_FILES = new Set([
  'docs/feature-development-workflow-release-notes.md',
]);
const LEGACY_ARTIFACT_RE = /^(?:specs\/(?:SPEC(?:-[a-z0-9-]+)?|capability-map)|tasks\/(?:plan|todo))\.md$/i;

// Match full path-like tokens, including documented angle- or square-bracket
// placeholders. Case-insensitive matching catches legacy `SPEC.md` paths;
// canonical validation below remains lowercase and exact.
const ARTIFACT_RE = /(?:[A-Za-z0-9._[\]<>-]+\/)*(?:spec(?:-(?:[a-z0-9-]+|<module-id>))?|capability-map|plan|todo|verification|review|memory-delta|ship)\.md/gi;

function isAllowedArtifactPath(artifactPath, relPath) {
  return CANONICAL_ARTIFACT_RE.test(artifactPath)
    || CANONICAL_MODULE_SPEC_RE.test(artifactPath)
    || (RELATIVE_PATH_FILES.has(relPath)
      && (RELATIVE_ARTIFACT_RE.test(artifactPath) || RELATIVE_MODULE_SPEC_RE.test(artifactPath)))
    || (LEGACY_MIGRATION_FILES.has(relPath) && LEGACY_ARTIFACT_RE.test(artifactPath));
}

function findViolations(relPath) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return null; // skipped

  const violations = [];
  const lines = fs.readFileSync(abs, 'utf8').split(/\r?\n/);
  lines.forEach((line, i) => {
    const matches = line.match(ARTIFACT_RE);
    if (!matches) return;
    for (const match of matches) {
      if (!isAllowedArtifactPath(match, relPath)) {
        violations.push({ line: i + 1, match });
      }
    }
  });
  return violations;
}

function main() {
  console.log('Checking durable workflow artifact paths...\n');

  let checked = 0;
  let errors = 0;

  for (const relPath of GUARDED_FILES) {
    const violations = findViolations(relPath);
    if (violations === null) continue; // file not present, skip
    checked++;

    if (violations.length === 0) {
      console.log(`  ✓  ${relPath}`);
    } else {
      console.log(`  ✗  ${relPath}`);
      for (const { line, match } of violations) {
        console.log(`       L${line}: ${match} — not an approved per-feature artifact path`);
        errors++;
      }
    }
  }

  const status = errors > 0 ? 'FAILED' : 'PASSED';
  console.log(`\n${checked} files checked — ${errors} error(s) — ${status}`);

  if (errors > 0) {
    console.log('\nThe workflow expects artifacts under docs/specs/<feature-slug>/.');
    console.log('Change every guarded producer and consumer together when migrating');
    console.log('this convention.');
    process.exit(1);
  }
}

main();
