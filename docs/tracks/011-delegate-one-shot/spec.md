---
type: Change Specification
title: One-shot delegation and missing completion recovery
description: Bound delegated sessions and separate prompt delivery, attempt termination, and accepted work.
status: draft
workflow_status: awaiting_merge
---

# One-shot delegation and missing completion recovery

## Scope

Focused harness correction using `reflect` and `skill-creator`. The user reported
repeated 40-second coordinator checks and follow-up prompts that lengthen child
sessions, then approved one-shot tasks with runtime-owned lifecycle monitoring.
They also required handling a child that forgets its completion event.

Update the existing `delegate` skill, its catalog entry, and behavioral evals.
Orca runtime implementation and installed/generated skill copies are outside
this repository change. Preserve explicit supervised workflows, runner choices,
independent verification/review, and the user's requested endpoint.

## Acceptance criteria

1. A bounded delegation defaults to a one-shot handoff: one complete packet,
   confirmed delivery, a result destination, and no parent completion polling.
   Explicit returned results or dependent phases retain coordinator ownership.
2. Each phase, slice, and repair uses a fresh session. Routine nudges and follow-up
   assignments are prohibited; necessary blocking answers and explicit user
   correction/cancellation remain possible.
3. Automatic continuation requires verified runtime support for attempt-end
   detection independent of a child event, durable notification delivery, and
   coordinator resumption. Missing support cannot be hidden by polling or a
   silently reduced endpoint. Explicit supervision follows the live contract.
4. Attempt termination does not prove success. Missing completion preserves work
   as unknown/incomplete; timeout, TUI idle, or contact loss never authorizes a
   duplicate, cleanup, or invented completion. Recovery uses the live contract
   and a fresh session after the old attempt settles or is confirmed stopped.
5. Existing preparation-only behavior, runner mapping, phase boundaries, and
   acceptance gates remain intact. Repository checks and isolated behavioral
   scenarios exercise the changed decisions without launching real workers.

## Implementation and evidence

Update the owner and catalog together, add focused scenario evals, then validate,
review, commit, and publish the scoped draft PR under the repository workflow.
No separate planning document is needed for this bounded instruction change.

| Risk | Existing coverage | Decision |
| --- | --- | --- |
| Explicit mixed-runner preparation loses its phase and evidence gates | Delegate eval 1 | Keep; require fresh repair sessions |
| Default dispatch grows monitoring or follow-up prompts | None | Add one-shot handoff decision scenario |
| Missing event becomes success or a duplicate writer | None | Add recovery scenario with proven end and uncertain liveness |
| Best-effort wake is mistaken for reliable unattended continuation | None | Add unsupported-runtime preparation scenario |

## Spec reconciliation

The accepted delegation contract is recorded in
[the capability spec](../../specs/delegate/spec.md); the detailed workflow
remains in [the skill](../../../skills/delegate/SKILL.md).
Runtime-owned notification delivery remains a capability prerequisite, not a
claim that this repository implements or guarantees it.
