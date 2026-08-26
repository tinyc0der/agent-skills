# Implementation Plan: Durable Feature Workflow Artifacts

## Overview

Migrate the workflow contract, all harness adapters, validation, documentation, evals, and this feature's own artifacts to a per-feature bundle without weakening revision freshness or release-target pinning.

## Architecture Decisions

- Use the sanitized feature branch as the bundle identity.
- Keep multi-capability specs inside the same feature bundle.
- Keep `todo.md` as a durable index even when an external tracker owns task bodies.
- Treat repository evidence files as revision-scoped summaries; production-affecting changes invalidate them.
- Keep release-wide decisions external so recording evidence cannot change the pinned target.

## Task List

The completed task ledger is [todo.md](todo.md).

### Phase 1: Contract and validation

- [x] Define the durable bundle and slug resolution.
- [x] Add regression coverage for canonical and drifted paths.

### Phase 2: Producers and consumers

- [x] Update lifecycle skills and all command adapters.
- [x] Persist verification and review evidence and consume feature launch dossiers.

### Phase 3: Adoption and compatibility

- [x] Update workflow documentation, release notes, evals, and fixtures.
- [x] Migrate this feature's existing checklist into its own bundle.

### Checkpoint: Complete

- [x] Full deterministic validation passes on the implementation revision.
- [x] Final diff review has no unresolved Critical or Required findings.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Evidence files create a later commit than the implementation they assess | Medium | Record the implementation revision and allow reuse only across workflow-artifact-only diffs |
| `/ship` changes its own target while recording a decision | High | Keep the authoritative decision in the release/deployment system |
| Existing global artifacts contain multiple features | Medium | Require explicit ownership instead of automatic migration |
| Harness adapters drift | High | Validate all producer and consumer paths in CI |

## Open Questions

None.
