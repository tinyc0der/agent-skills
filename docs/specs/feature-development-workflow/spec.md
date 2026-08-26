# Spec: Durable Feature Workflow Artifacts

**Status:** Approved and implemented

> Source: [Feature Development Workflow](../../feature-development-workflow.md)

## Objective

Replace repository-global specification and task paths with one durable, branch-scoped feature bundle so concurrent work remains isolated and future sessions can trace intent, implementation, verification, review, and release preparation.

## Non-Goals

- Automatically assign ambiguous legacy artifacts to a feature.
- Store the authoritative release-wide deployment decision in the release target itself.
- Replace pull requests, CI, external task trackers, release systems, or deployment records.

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

## Open Questions

None.
