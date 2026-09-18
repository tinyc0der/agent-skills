---
type: Change Specification
title: Epic parent and child tracks
description: Proposed requirements for classifying large work and organizing parent/child track artifacts.
status: draft
workflow_status: in_progress
role: feature
---

# Spec: Epic parent and child tracks

**Authorization and readiness:** User asked to update the skills so large work (epics and migrations) uses the parent/child artifact model already sketched in `using-agent-skills`.
**Affected capabilities:** [Feature development workflow](../../specs/feature-development-workflow/spec.md), [Memory management](../../specs/memory-management/spec.md)

## Objective

Make the Epic route executable. Agents must distinguish a Feature that uses a capability map from an Epic with child tracks, keep tracks flat, and run spec/plan/build/verify/git against that fork instead of flattening independently shippable work into one task list.

## Non-Goals

- A new skill, `docs/epics/` tree, or nested `docs/tracks/` directories
- Changing merge, deployment, or external-tracker authority
- Requiring `role` / `parent` / `children` on historical tracks

## Success Criteria

- The delivery fork (Feature+map vs Epic vs migration phases) has one home in `using-agent-skills`; other skills and commands apply it rather than restating it
- An Epic parent spec records initiative outcomes; child Feature specs own detailed change proposals
- Parent `todo.md` indexes child tracks; `/build` on a parent does not implement those children
- Parent `/verify` requires assembled-revision integration evidence; a child PASS is not a parent PASS
- Tracks stay a flat `NNN-name` list linked by optional metadata
- Destructive migration phases do not share a PR with additive expands
- Evals no longer reward putting an independently shippable portal initiative in one track spec

## Spec reconciliation

- [Feature development workflow](../../specs/feature-development-workflow/spec.md): delivery fork, parent/child artifacts, `/build` and `/verify` roles
- [Memory management](../../specs/memory-management/spec.md): optional `role`, `parent`, and `children` on track specs and bug reports
