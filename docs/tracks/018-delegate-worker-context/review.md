---
type: Review
title: Delegate worker context review
description: Findings and dispositions for the final session-reuse policy and its evidence.
status: draft
---

# Review: PASS

Reviewed implementation: `a5724ada0af49d16c6f97d3c18ee2bfebca3c109`.
The parent agent reviewed the full diff against [the accepted scope](spec.md),
[verification evidence](verification.md), and the live Orca reuse and cleanup
guides. The isolated evaluator checked policy decisions, not the code-review
verdict. This report records agent review, not human approval.

## Findings and dispositions

| Severity | Finding | Disposition |
| --- | --- | --- |
| Required | The inherited placement sentence could imply that every phase still starts fresh. | Resolved before the recorded commit: placement guidance now applies only when a new session is needed. |
| Required | New-assignment identity rules could be read as blocking the runtime's retry path. | Resolved before the recorded commit: new assignments receive new identities; failed-assignment retries follow the live recovery contract and retain history. |

No Critical or Required finding remains.

## Review coverage

- Correctness: routine self-verification, same-worker repair, fresh review,
  independent-verification triggers, explicit overrides, and unavailable-worker
  fallback match the accepted scope and saved scenarios.
- Clarity: the phase table, assignment rules, cleanup, examples, and checklist
  now use the same session policy. Fresh conversation and new worktree remain
  separate decisions.
- Architecture: delegate retains task and runner policy; the live Orca guides
  retain transport, settlement, retry, retention, and cleanup authority. General
  lifecycle skills already permit worker-owned verification and need no edit.
- Ownership and safety: no follow-up may bypass accepted settlement, missing
  completion, single-writer isolation, or explicit retention requirements.
  One-shot handoffs still end at delivery; independent reviewers cannot patch code.
- Cost: preserving useful worker context avoids mandatory reconstruction. No
  measured token or latency claim is made.
- Test design: retained explicit-verifier and recovery scenarios protect distinct
  boundaries. One new fixture covers ordinary reuse, permission risk, and an
  unavailable worker. No wording-matching test or weakened validator was added.

The change is ready for PR review. Track completion and merge are not claimed.
