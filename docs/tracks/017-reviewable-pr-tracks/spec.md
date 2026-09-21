---
type: Change Specification
title: Small tracks for reviewable PRs
description: Split large intent into tracks that each fit one focused pull request.
status: draft
workflow_status: in_progress
role: task
---

# Small tracks for reviewable PRs

**Authorization:** The user asked to update the skills so intent is split into small tracks, each with a reviewable PR.
**Affected capability:** [Feature development workflow](../../specs/feature-development-workflow/spec.md).

## Outcome and scope

Each implementation track owns one focused PR. Apply this before detailed planning and again when scope grows. One capability can need several tracks. Dependencies or a shared release date do not justify a huge PR.

Keep the delivery rule in `using-agent-skills`. Align spec, plan, build, Git, review, migration, verification, command adapters, and workflow documentation. Parent initiatives coordinate child tracks and keep their existing planning and integration docs PRs. This exception must not absorb implementation work.

Small coherent changes keep one track. Do not impose a new hard line-count limit, invent new capability ids, rewrite historical tracks, or change merge and deployment authority.

## Acceptance criteria

1. Scope checks run for every request. A small change stays in one track; a large single-capability or multi-capability intent splits into tracks before implementation tasks are written.
2. Each implementation track records one PR outcome, boundaries, acceptance evidence, dependencies/base, and a safe merge state. Dependent tracks can be sequenced or stacked without requiring separate user releases.
3. Build and PR review check the whole track, not only commit size. Scope growth returns to planning and preserves existing work. Migration expand and destructive contract use separate tracks and PRs.
4. Skills, all three command adapters, and the canonical workflow spec agree. Initiative parents remain coordination records with separate integration evidence.
5. Behavioral cases cover dependent work within one capability and a small-change control. Structural, routing, link, lifecycle, and hook checks pass.

## Work and verification

This is one bounded instruction change with one PR. Update the shared rule and its callers, align behavioral cases, then run repository checks and an independent skill evaluation in a temporary workspace. No application code changes or wording-only tests are needed.

## Spec reconciliation

Update [Feature development workflow](../../specs/feature-development-workflow/spec.md) with the verified track boundary and scope-growth behavior in this PR. Other capability contracts stay unchanged.
