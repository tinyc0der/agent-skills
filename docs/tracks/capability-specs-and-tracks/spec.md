# Change Spec: Capability Specs and Change Tracks

**Status:** Approved for implementation by the user's spec/track layout instruction.
**Capability:** [Feature development workflow](../../specs/feature-development-workflow/spec.md)

## Objective

Keep the accepted contract for each capability at `docs/specs/<capability>/spec.md` and each change's requirements and execution history at `docs/tracks/<track-id>/`.

## Requirements

- Capability identifiers are stable across changes and independent of branch names. A track may affect several capabilities.
- Each track uses `spec.md` for proposed requirements or `bug.md` for expected behavior, reproduction, actual behavior, and fix acceptance criteria. Create both only when the work needs both.
- Plans, task ledgers, verification, review, candidate memory, and launch dossiers belong to the track and are created only when needed.
- Track specifications describe changes to linked capability specs. Multi-capability changes keep one track specification with a section per capability; an optional capability map links those sections and their canonical targets.
- Reconcile implemented, verified requirements into the owning capability specs in the same implementation PR before completion. Record an explicit no-change rationale when a fix restores an already-correct contract. Deferred and canceled requirements stay out of canonical specs.
- Preserve revision-scoped evidence. Canonical spec changes are contract changes and cannot be treated as evidence-only commits.
- Move existing execution artifacts into tracks, retain historical evidence, and update workflow skills, all three command adapters, validators, documentation, and eval inputs together.

## Non-Goals

- Adding a new command, tracker service, or metadata framework.
- Changing approval, merge, deployment, or external-tracker authority.
- Claiming previous behavioral results cover the new workflow revision.

## Acceptance Criteria

- Canonical specs contain current capability requirements; plans and reviews are absent from `docs/specs/`.
- Operational guidance consistently selects the active track and reads its linked capability specs.
- Path validation accepts canonical specs and all track artifacts, including `bug.md`, and rejects execution artifacts under specs.
- Verification, PR readiness, review, and completion require spec reconciliation.
- Existing deterministic suites and routing checks pass; behavioral scenarios are updated to the new contract and execution limits are reported honestly.

## Reconciliation

Pending implementation and verification.
