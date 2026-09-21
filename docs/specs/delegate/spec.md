---
type: Capability Specification
title: Bounded delegation
description: Delegate engineering work with explicit ownership, preserved implementation context, and evidence-based acceptance.
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
- Runner selection follows the user's instruction, then the project mapping,
  then skill defaults: Codex for specification, planning, and review; Grok for
  implementation, routine verification, fixes, and independent verification when
  required. OpenCode and Antigravity remain alternatives. An implementation
  override includes its routine checks and fixes; it does not change the
  independent verifier. Explicit session boundaries remain binding.
- New tasks and independent implementation slices start fresh. Routine
  verification and bounded repairs reuse the original implementation session by
  default. Each assignment gets one complete packet with current artifact
  references. Blocking replies, explicit user steering, and bounded follow-up
  assignments after accepted settlement are allowed; unsolicited nudges are not.
- Reuse follows the live runtime's retention, resume, and cleanup rules, including
  explicit retention requirements and existing approval. Each coordinated
  follow-up gets new Task and Dispatch identities. A fresh worker is appropriate
  when the original is unavailable, its context is too large or unreliable, scope
  changes substantially, or it is stuck; record why and preserve retry limits.
- Worker checks are self-verification and must meet the existing acceptance and
  evidence requirements. A separate fresh verifier is required by the user or
  project, a high-risk change, or missing or unreliable evidence found in review.
  Self-verification never satisfies a required independent gate.
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
- Review fixes return to the implementation worker, followed by verification
  and fresh review of the updated target. One-shot handoffs do not gain automatic
  follow-ups: later repairs require a new user-owned request and resolved ownership.

## Workflow and evidence

The [delegate skill](../../../skills/delegate/SKILL.md) defines runner defaults,
task packets, and acceptance. [Track 011](../../tracks/011-delegate-one-shot/spec.md)
records the change and its verification. This contract governs agent decisions;
it does not implement Orca's lifecycle or notification service.

[Track 015](../../tracks/015-delegate-grok-defaults/spec.md) records the Grok runner
defaults. [Track 018](../../tracks/018-delegate-worker-context/spec.md) updates
session reuse and conditional independent verification while preserving overrides.
