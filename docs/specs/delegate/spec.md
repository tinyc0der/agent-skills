---
type: Capability Specification
title: Bounded delegation
description: Delegate engineering work to fresh sessions with explicit ownership and evidence-based acceptance.
status: draft
---

# Bounded delegation

## Contract

- A bounded delegation without requested supervision, returned results, or
  automatic dependent phases uses a one-shot handoff. Its parent endpoint is
  confirmed prompt delivery and an identified result destination, not task success.
- Coordinated work preserves the requested phases and coordinator acceptance.
  The skill owns runner policy and task boundaries; the live Orca guides own
  transport, lifecycle authority, recovery, and cleanup.
- Every phase, slice, and repair gets one complete packet in a fresh session.
  Artifact references carry context. Blocking replies and explicit user steering
  are allowed; unsolicited nudges and follow-up assignments are not.
- Automatic continuation without active coordinator waiting requires verified
  runtime support for independent attempt-end detection, durable notification
  delivery, and coordinator resumption. Without it, use an authorized handoff
  or explicit supervision; never silently weaken the endpoint or invent support.
- Termination and acceptance are separate. Missing reports leave an unknown or
  incomplete outcome. Timeout, idle, and contact loss cannot establish success,
  authorize cleanup, or justify a duplicate writer. Recovery preserves artifacts
  and follows the runtime contract before assigning fresh work.
- Required independent verification and review inspect the actual target in
  separate fresh sessions. Failed, incomplete, stale, or unauthenticated reports
  cannot unlock dependent phases. Preparation-only requests launch no workers.

## Workflow and evidence

The [delegate skill](../../../skills/delegate/SKILL.md) defines runner defaults,
task packets, and acceptance. [Track 011](../../tracks/011-delegate-one-shot/spec.md)
records the change and its verification. This contract governs agent decisions;
it does not implement Orca's lifecycle or notification service.
