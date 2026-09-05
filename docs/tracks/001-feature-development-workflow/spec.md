# Spec: Durable Feature Workflow Artifacts

> Historical change specification, retained from the workflow before the capability/track split. The current contract is [Feature Development Workflow](../../specs/feature-development-workflow/spec.md); the migration is recorded in [track 002](../002-capability-specs-and-tracks/spec.md). Historical approval and evidence below do not certify later revisions.

**Status:** Approved and implemented

> Source: [Feature Development Workflow](../../feature-development-workflow.md)

## Objective

Replace repository-global specification and task paths with one durable, branch-scoped feature bundle so concurrent work remains isolated and future sessions can trace intent, implementation, verification, review, and release preparation. Keep test generation proportionate by requiring every new case to protect a distinct material regression that existing coverage would miss, at the cheapest reliable layer.

## Non-Goals

- Automatically assign ambiguous legacy artifacts to a feature.
- Store the authoritative release-wide deployment decision in the release target itself.
- Replace pull requests, CI, external task trackers, release systems, or deployment records.
- Require fixed test counts, generic scenario matrices, or numerical coverage quotas.

## Affected Structure

All lifecycle artifacts live under `docs/specs/<feature-slug>/`. Multi-capability initiatives keep their capability map and module specifications in the same directory. External tracker tasks remain authoritative, while the bundle retains a durable index.

## Boundaries

- Always derive a filesystem-safe feature slug from a non-default branch.
- Always name the exact implementation or release revision covered by evidence.
- Ask when branch resolution is ambiguous or legacy artifacts have multiple possible owners.
- Never create feature artifacts on `main` or `master`.
- Never mutate a pinned release target merely to record its ship decision.

## Success Criteria

- `/spec`, `/plan`, `/build`, `/pr`, `/verify`, `/review`, and `/ship` agree on `docs/specs/<feature-slug>/` across Claude, Gemini, and Antigravity adapters.
- The bundle supports `spec.md`, `capability-map.md`, `spec-<module-id>.md`, `plan.md`, `todo.md`, `verification.md`, `review.md`, optional `memory-delta.md`, and production `ship.md` artifacts.
- Verification and review evidence can survive an evidence-only commit without silently covering production changes.
- Zero-argument `/ship` consumes feature launch dossiers while keeping its release-wide decision in the authoritative deployment or release system.
- Automated validators reject path drift and missing durable verification, review, or ship contracts.
- Documentation, eval cases, and fixtures use the durable layout.
- Specifications and plans map material behavior and risks to existing or proposed evidence instead of enumerating generic test categories.
- `/build`, `/build auto`, and `/test` apply one minimum-sufficient test admission gate, while adequately covered refactors and non-behavioral tasks use proportionate existing or executable checks.
- `test-engineer`, review, and `/ship` distinguish material coverage gaps from merge, rewrite, or removal opportunities and reject unjustified duplication across test layers.
- `test-case-design-review` is independently discoverable for planning, writing, pruning, and reviewing tests without forcing TDD sequencing or a general code review.
- `test-driven-development` retains RED-GREEN-REFACTOR ownership and delegates non-trivial case selection to `test-case-design-review` rather than duplicating its full workflow.
- The new skill has structural, routing, and dialogue-behavior eval coverage and is listed consistently across the public catalog and project routing surfaces.

## Open Questions

None.
