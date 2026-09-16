---
type: Working Notes
title: Merge method policy notes
description: Decisions, evidence, and next steps for traceable merge method selection.
status: draft
---

# Merge method policy notes

## Resume

- Phase: implementation, integration verification, and agent review complete;
  PR prepared for repository review.
- Worktree: `galeocerdo`, branch `tinyc0der/fix-merge-method-policy`, based on
  `0e9bac9`, integrated with `main` at `47b1bbc`; the primary checkout remains on `main`.
- Scope and criteria: [bug.md](bug.md). Evidence: [verification.md](verification.md)
  and [review.md](review.md). Next: repository review of
  [PR #8](https://github.com/tinyc0der/agent-skills/pull/8), then separately
  authorized merge and release.

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
- Verification: 74 Node tests pass, all repository validators pass,
  170 routing checks retain 98% rank-1, the hook and plugin checks pass, and
  both changed skills pass the skill-creator validator. All eight behavioral
  scenarios were repeated after simplification and pass action/record inspection.
- Review refinement: moved simulated fault configuration out of the assigned
  request and removed the rebase hint from the CLI example. A fresh neutral
  comparison chose merge under the old skill and the documented rebase fallback
  under the updated skill. See [forward tests](evidence/forward-tests.md) for
  exact evidence and limitations.
- No Critical or Required review findings remain. Original implementation:
  `689a0d3`; fixture refinements: `3ee379d`; simplified-procedure probes:
  `a296cd3`; final source clarification: `532dce2`. Evidence records distinguish
  these revisions. The installed cache remains unchanged.
- Owner feedback: the method procedure was too complicated. At `a296cd3`,
  shortened it from 503 to 156 words, removed repeated cautions and detailed
  mechanics, and retained the five essential decisions. All existing cases
  passed again. Final review restored six words to make record target/outcome
  and pending queue status explicit: 162 words total. The final clarification
  was checked in source; it does not claim another behavioral run.
- Owner feedback: completed PRs should be ready for review. The earlier handoff
  stopped at draft after verification; transition PR #8 once the final checks pass.
- Integration: `960f255` brings in `main` at `47b1bbc`. Resolve the adjacent
  delegation bullets by retaining both the merge-policy handoff and the updated
  stopping condition. Move this track to `012` because merged work owns `011`.
  The merge procedure and its fixtures are unchanged. All 74 tests and repository
  validators pass; routing now checks 171 cases at 98% rank-1 (104/106).
