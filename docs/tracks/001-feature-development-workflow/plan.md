---
type: Implementation Plan
title: 'Implementation Plan: Durable Feature Workflow Artifacts'
description: Implementation steps, dependencies, and verification approach for feature development workflow.
---

# Implementation Plan: Durable Feature Workflow Artifacts

## Overview

Migrate the workflow contract, all harness adapters, validation, documentation, evals, and this feature's own artifacts to a per-feature bundle without weakening revision freshness or release-target pinning. Define one risk-based test admission contract so the lifecycle maximizes confidence per case instead of test count.

## Architecture Decisions

- Use the sanitized feature branch as the bundle identity.
- Keep multi-capability specs inside the same feature bundle.
- Keep `todo.md` as a durable index even when an external tracker owns task bodies.
- Treat repository evidence files as revision-scoped summaries; production-affecting changes invalidate them.
- Keep release-wide decisions external so recording evidence cannot change the pinned target.
- Centralize minimum-sufficient test selection in `test-case-design-review`; `test-driven-development` owns RED-GREEN-REFACTOR and delegates non-trivial case selection rather than duplicating the full design and review workflow.

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

### Phase 4: Lean test selection

- [x] Add a distinct-regression admission gate, change-type defaults, cheapest-layer rule, and stopping condition to `test-driven-development`.
- [x] Align planning, build, `/test`, review, `test-engineer`, `/ship`, the Definition of Done, and all harness adapters.
- [x] Add a behavioral eval for pressure to generate a generic cross-layer case matrix.
- [x] Remove validator cases whose defect signal is already protected by retained tests.

### Phase 5: Dedicated test design and review skill

- [x] Add the supplied `test-case-design-review` workflow with repository-standard anatomy and no unnecessary supporting files.
- [x] Move the existing minimum-sufficient dialogue eval to the new owner and add distinct positive and negative routing cases.
- [x] Route test design, pruning, and focused test review to the new skill while preserving TDD execution and general code-review boundaries.
- [x] Update the catalog, current skill counts, setup guidance, issue form, and feature evidence.
- [x] Run structural, routing, behavioral dry-run, link, hook, plugin, and regression checks.

### Checkpoint: Complete

- [x] Full deterministic validation passes on the implementation target.
- [x] Final diff review has no unresolved Critical or Required findings.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Evidence files create a later commit than the implementation they assess | Medium | Record the implementation revision and allow reuse only across workflow-artifact-only diffs |
| `/ship` changes its own target while recording a decision | High | Keep the authoritative decision in the release/deployment system |
| Existing global artifacts contain multiple features | Medium | Require explicit ownership instead of automatic migration |
| Harness adapters drift | High | Validate all producer and consumer paths in CI |
| Lean selection omits a real regression | Medium | Require a named changed contract or credible risk for every omission and report residual risk explicitly |
| Dedicated skill collides with TDD or open test-planning proposals | Medium | Keep the new skill scoped to case design and review, leave sequencing in TDD, and document how its lean review focus differs from open PRs #409 and #410 |

## Open Questions

None.
