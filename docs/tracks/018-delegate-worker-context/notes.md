---
type: Working Notes
title: Delegate worker context notes
description: Decisions and validation progress for retaining implementation context across verification and review fixes.
status: draft
---

# Working notes

## Resume

- Phase: implementation, verification, and agent review passed in
  `orca/018-delegate-worker-context`.
- Next: repository review of [PR 17](https://github.com/tinyc0der/agent-skills/pull/17)
  and a merge decision. Merge is not authorized by this task.
- Sources: [accepted scope](spec.md), [verification](verification.md),
  [review](review.md).

## Notes

- User decision: routine verification and bounded review fixes stay with the
  implementation worker; review remains fresh and independent verification is
  conditional on requirements, risk, or unreliable evidence.
- Observed: the old policy also forbids follow-up assignments and releases
  completed workers. These instructions must change with the phase table.
- Runtime source: `orca skills get orchestration --reference
  references/coordinator-loop.md --json` documents same-terminal reuse after
  settlement. The recovery-and-cleanup guide requires explicit retention intent;
  preserve that requirement and existing user approval rather than inventing a
  retention or resume mechanism.
- Scope: update repository policy and prepare its PR; live worker dispatch,
  plugin installation, merge, and release are outside this change.
- Observed: all 74 regression tests and 174 routing checks pass; rank-1 routing
  remains 98%. Required structural validators pass. The new isolated scenario
  exercise meets all six expectations; see the verification report for limits.
- Review corrections: clarified that placement applies only to needed fresh
  sessions and that runtime retries remain distinct from new follow-up tasks.
  The evaluator reconciled its result with the final skill; no project decision
  changed. No unresolved skill-improvement item remains in this track.
