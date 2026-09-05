# Plan: Capability Specs and Change Tracks

## Scope

Implement the [approved change](spec.md) in three increments on `migrate/capability-specs-and-tracks`. Tasks are tracked locally in [todo.md](todo.md).

1. Migrate the artifact contract, existing records, lifecycle skills, adapters, and path/lifecycle validators as one consistent cutover.
2. Update remaining context, memory, bug, documentation, and eval consumers; add only missing regression coverage and reconcile the canonical capability specification.
3. Run deterministic validation, review the final diff, and record revision-scoped evidence and any unavailable behavioral checks.

## Test Decisions

| Contract or risk | Existing coverage | Decision |
| --- | --- | --- |
| Producer and consumer path drift | Artifact-path CLI tests across all adapters | Update these tests to accept track files and canonical specs; add rejection of execution artifacts under specs and unsupported module-spec filenames. |
| Missing reconciliation at lifecycle gates | Lifecycle-contract CLI tests | Extend the existing canonical fixture and add one missing-reconciliation regression case. |
| Links break after artifact moves | Markdown and reference-link validators | Run existing validators; no duplicate link tests. |
| Agents put proposals in canonical specs or use old fixture paths | Existing skill behavioral scenarios | Adapt current assertions and fixtures; preserve the distinction between configuration checks and executed behavioral evidence. |

## Migration and Rollback

Follow [the migration guide](../../migrations/capability-specs-and-tracks.md). Preserve historical reports and their evaluated revisions; a filesystem move does not refresh their approval. Roll back the migration commits together if consumers cannot resolve the new layout.
