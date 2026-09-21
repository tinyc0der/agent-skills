---
type: Working Notes
title: Delegate worker context notes
description: Decisions and validation progress for retaining implementation context across verification and review fixes.
status: draft
---

# Working notes

## Resume

- Phase: implement the approved bounded task in `orca/018-delegate-worker-context`.
- Next: update the skill, contract, catalog, and scoped evals; verify and review.
- Source: [accepted scope](spec.md).

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
