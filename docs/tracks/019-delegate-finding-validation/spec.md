---
type: Change Specification
title: Validate delegated review findings before repairs
description: Require evidence before acting on review feedback while keeping unresolved blockers open.
status: draft
workflow_status: in_progress
---

# Delegate finding validation

The user approved an explicit validation step because reviewers can be wrong.
This bounded task updates the delegate skill and its capability contract on
`orca/delegate-loop-count`, based on `main` at `19d6587`.

## Acceptance criteria

1. The implementation worker checks each actionable finding against the current
   target, accepted requirements, and evidence before editing.
2. Valid Critical or Required findings must be fixed within the assigned scope.
   Optional and Nit suggestions remain optional; FYI needs no change.
3. Incorrect or unsupported findings receive an evidence-backed response in an
   existing result artifact. A disputed blocker stays open until the reviewer
   or coordinator resolves it; the implementer cannot silently dismiss it.
4. Unclear findings and scope changes return to the coordinator. Existing
   verification, rereview, session ownership, and retry limits remain intact.
5. The skill and [capability contract](../../specs/delegate/spec.md) agree, and
   applicable repository checks pass.

## Work and verification

Make one focused instruction change, run existing validators and regression
checks, and review the resulting policy against valid, incorrect, optional,
unclear, and out-of-scope feedback. No new wording-matching tests are needed.
Record verification and review in this track. No separate plan is needed.

## Spec reconciliation

Update the delegate capability contract with the finding-validation requirement.
Historical tracks retain their original evidence.
