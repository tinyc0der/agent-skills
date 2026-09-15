---
type: Verification Report
title: Branch worktree isolation verification
description: Acceptance evidence for mandatory branch worktrees at the recorded implementation revision.
status: draft
---

# Verification: PASS

Implementation revision: `e9b23874fd7ac1ba2db4f942a2bee9dba1b1d429`.
Checks ran against the working tree committed at that revision. Later updates
in this track record evidence and progress only.

## Acceptance trace

| Criterion | Evidence | State |
| --- | --- | --- |
| New work branches require linked worktrees; primary stays on the default branch | Git skill makes the rule mandatory for solo work, fixes, and docs; the documented `worktree add -b` sequence passed the disposable Git exercise | PASS |
| Reuse worktrees, use explicit bases, preserve existing changes, and work from the task directory | Exercise verified task commits, matching worktree lookup/reuse, a branch created from a linked worktree, and reattachment of an existing branch | PASS |
| Entry points and the capability contract agree | Reviewed Git skill, session policy, AGENTS.md, CLAUDE.md, workflow guide, and reconciled capability spec; lifecycle and link validators passed | PASS |
| Repository checks and preservation exercise pass | Commands and observed state below | PASS |

## Repository gates

All commands ran from the task's linked worktree with the repository's `rtk`
wrapper and exited zero:

- `rtk proxy node --test --test-reporter=dot scripts/*-test.js scripts/lib/*-test.js`: complete Node test suite passed.
- `rtk proxy node scripts/run-evals.js --min-rank1 95`: 170 checks passed; rank-1 routing 98% (103/105).
- `rtk proxy node scripts/validate-skills.js`: 30 skills, zero errors or warnings.
- `rtk proxy node scripts/validate-commands.js`: 11 commands passed parity and description checks.
- `rtk proxy node scripts/validate-lifecycle-contracts.js`: passed.
- `rtk proxy node scripts/validate-artifact-paths.js`: 34 files, zero errors.
- `rtk proxy node scripts/validate-reference-links.js`: 30 skills, zero errors.
- `rtk proxy node scripts/validate-markdown-links.js`: 135 tracked Markdown files, zero errors after staging the track.
- `rtk proxy node scripts/validate-versions.js`: all manifests remain at 0.7.0.
- `rtk proxy bash hooks/session-start-test.sh`: session-start JSON payload OK.
- `rtk proxy claude plugin validate .`: marketplace validation passed.
- `rtk git diff --cached --check`: passed before the implementation commit.
- Both changed skills passed the skill-creator `quick_validate.py` helper; the
  capability and track headers passed YAML metadata checks using
  `rtk proxy uv run --no-project --with PyYAML python`. System Python initially
  lacked PyYAML; the isolated environment resolved that prerequisite.

## Runtime evidence

A disposable repository exercised the documented commands with a primary
checkout on `main`, staged and unstaged edits, and an untracked file. Assertions
confirmed that task edits and commits stayed in linked worktrees, both branches
kept their assigned directories when branching from a linked worktree, and
reattaching an existing branch retained its commit. The primary branch, HEAD,
staged diff, unstaged diff, and untracked file bytes matched their initial state.

For this change itself, `git worktree list --porcelain` shows the task branch in
`/Users/maxwell/Projects/AI/agent-skills-branch-worktrees`. The primary checkout
remains clean on `main` at `d06ba0b1ae72365d80c580de60fa3e912af33e40`.

## Scope and limitations

This is instruction-level enforcement. No command-blocking hook or independent
agent behavioral evaluation was added; the Git exercise validates the procedure,
not a guarantee that every model obeys it. Browser, build/typecheck, deployment,
performance, and migration gates do not apply to this Markdown-only change.
