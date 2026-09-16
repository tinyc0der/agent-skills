---
type: Working Notes
title: Merge method policy notes
description: Decisions, evidence, and next steps for traceable merge method selection.
status: draft
---

# Merge method policy notes

## Resume

- Phase: source correction implemented; isolated execution evals in progress.
- Worktree: `galeocerdo`, branch `tinyc0der/fix-merge-method-policy`, based on
  `0e9bac9`; the primary checkout remains on `main`.
- Scope and criteria: [bug.md](bug.md). Next: inspect behavioral probe actions,
  record verification and review, and update the draft PR.

## Notes

- Observed: the baseline lifecycle validator passes; existing merge guidance
  omits resolution when several methods are enabled. This supports the reported
  gap, but does not reconstruct the cause of the earlier FastPodcast command.
- Decision: the owner explicitly chose rebase merges as the fallback. Preserve
  explicit user/project methods and keep local squashing a separate decision.
- Apply: canonical procedure, traceable merge record, handoff propagation, and
  action-based evals. Reject another generic clean-commits paragraph as duplicate
  guidance. Rewriting deployed history or patching the installed cache is outside
  scope.
- Tool evidence: [GitHub CLI merge](https://cli.github.com/manual/gh_pr_merge)
  documents explicit method flags and `--match-head-commit`; queues require
  checking their configured strategy. [GitHub merge semantics](https://docs.github.com/en/pull-requests/reference/pull-request-merges)
  explain that rebase preserves individual changes while rewriting commit IDs.
- Behavioral runner limitation: `claude auth status` reports `loggedIn: false`.
  Use the skill-creator independent forward-testing procedure with native agents
  in disposable workspaces; retain the standard runner cases for authenticated
  environments. Structural checks alone are not behavioral evidence.
- Observed: the old-skill default probe also chose an explicit, guarded rebase
  merge and verified its three logical changes. It did not reproduce the prior
  incident. Its record chose linear history by agent judgment; the new owner
  decision makes that choice a documented fallback rather than an inference.
- Verification so far: 74 Node tests pass, all repository validators pass,
  170 routing checks retain 98% rank-1, the hook and plugin checks pass, and
  both changed skills pass the skill-creator validator. Behavioral evidence is
  still being collected separately.
