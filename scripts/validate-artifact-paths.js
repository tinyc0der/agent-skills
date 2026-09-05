#!/usr/bin/env node
/**
 * validate-artifact-paths.js
 *
 * Guards capability specifications and change tracks against silent path drift.
 *
 * The `/spec` and `/plan` commands (producers) write their artifacts to a set
 * of paths that the `/build` command and the spec/plan skills (consumers) read
 * back. When a producer moves an artifact without updating the consumers — as
 * in PR #93, which pointed `/spec` and `/plan` at docs/features/[name]/ while
 * `/build` still required SPEC.md and tasks/plan.md — the pipeline breaks, and
 * nothing else in CI catches it (command parity only compares descriptions).
 *
 * This validator separates canonical capability specs from execution artifacts
 * in tracks. Changing the convention means updating the allowed patterns and
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

const SLUG = '[a-z0-9](?:[a-z0-9-]*[a-z0-9])?';
const TRACK_ID = `(?!000)[0-9]{3}-${SLUG}`;
const FIXED_ARTIFACT = '(?:spec|bug|capability-map|plan|todo|verification|review|memory-delta|ship)';
const TRACK_ARTIFACT_RE = new RegExp(
  `^docs/tracks/(?:<track-id>|${TRACK_ID})/${FIXED_ARTIFACT}\\.md$`,
);
const CAPABILITY_SPEC_RE = new RegExp(
  `^docs/specs/(?:<capability>|${SLUG})/spec\\.md$`,
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
  'skills/memory-management/SKILL.md',
  'skills/debugging-and-error-recovery/SKILL.md',
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
  'skills/memory-management/SKILL.md',
  'docs/feature-development-workflow.md',
  'docs/feature-development-workflow-release-notes.md',
  'docs/getting-started.md',
  'docs/adoption-guide.md',
]);
const RELATIVE_ARTIFACT_RE = new RegExp(`^${FIXED_ARTIFACT}\\.md$`);
const LEGACY_MIGRATION_FILES = new Set([
  'docs/feature-development-workflow-release-notes.md',
]);
const LEGACY_ARTIFACT_RE = /^(?:specs\/(?:SPEC(?:-[a-z0-9-]+)?|capability-map)|tasks\/(?:plan|todo))\.md$/i;

// Match full path-like tokens, including documented angle- or square-bracket
// placeholders. Case-insensitive matching catches legacy `SPEC.md` paths;
// canonical validation below remains lowercase and exact.
const ARTIFACT_RE = /(?:[A-Za-z0-9._[\]<>-]+\/)*(?:spec(?:-(?:[a-z0-9-]+|<module-id>))?|bug|capability-map|plan|todo|verification|review|memory-delta|ship)\.md/gi;

function isAllowedArtifactPath(artifactPath, relPath) {
  return TRACK_ARTIFACT_RE.test(artifactPath)
    || CAPABILITY_SPEC_RE.test(artifactPath)
    || (RELATIVE_PATH_FILES.has(relPath) && RELATIVE_ARTIFACT_RE.test(artifactPath))
    || (LEGACY_MIGRATION_FILES.has(relPath) && LEGACY_ARTIFACT_RE.test(artifactPath));
}

function findViolations(relPath) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return null; // skipped

  const violations = [];
  const lines = fs.readFileSync(abs, 'utf8').split(/\r?\n/);
  lines.forEach((line, i) => {
    // Remote specifications do not prescribe a repository artifact location.
    const localText = line.replace(/https?:\/\/[^\s<>`"')]+/g, '');
    const matches = localText.match(ARTIFACT_RE);
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
        console.log(`       L${line}: ${match} — not an approved capability spec or track artifact path`);
        errors++;
      }
    }
  }

  // Checking references alone would miss a migrated report left under specs.
  function checkSpecDirectory(directory) {
    if (!fs.existsSync(directory)) return;
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) checkSpecDirectory(absolutePath);
      else if (entry.isFile() && entry.name.match(ARTIFACT_RE)) {
        const relativePath = path.relative(ROOT, absolutePath).split(path.sep).join('/');
        if (!CAPABILITY_SPEC_RE.test(relativePath)) {
          console.log(`  ✗  ${relativePath}: execution artifacts belong in docs/tracks/<track-id>/`);
          errors++;
        }
      }
    }
  }
  checkSpecDirectory(path.join(ROOT, 'docs', 'specs'));

  const tracksDirectory = path.join(ROOT, 'docs', 'tracks');
  if (fs.existsSync(tracksDirectory)) {
    const numbers = new Set();
    for (const entry of fs.readdirSync(tracksDirectory, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const relativePath = `docs/tracks/${entry.name}`;
      if (!new RegExp(`^${TRACK_ID}$`).test(entry.name)) {
        console.log(`  ✗  ${relativePath}: track ids must use NNN-name, starting at 001`);
        errors++;
        continue;
      }
      const number = entry.name.slice(0, 3);
      if (numbers.has(number)) {
        console.log(`  ✗  ${relativePath}: duplicate track number ${number}`);
        errors++;
      }
      numbers.add(number);
    }
  }

  const status = errors > 0 ? 'FAILED' : 'PASSED';
  console.log(`\n${checked} files checked — ${errors} error(s) — ${status}`);

  if (errors > 0) {
    console.log('\nThe workflow expects docs/specs/<capability>/spec.md and docs/tracks/<track-id>/ (NNN-name).');
    console.log('Change every guarded producer and consumer together when migrating');
    console.log('this convention.');
    process.exit(1);
  }
}

main();
