---
type: Change Specification
title: Steering project understanding
description: Clarify knowledge collection goals, expand steering suggestions, and name the decision collection decision-records.
status: draft
---

# Steering Project Understanding

## Scope and Acceptance

The user requested broader steering file suggestions and revised memory-folder goals after reviewing [Kiro steering](https://kiro.dev/docs/steering/).

- Define steering as broad current project understanding, decisions as individual contextual choices, and runbooks as procedural knowledge.
- Include foundation and specialist steering examples with useful purposes; keep them optional and preserve existing canonical owners.
- Explain how current architecture/technology overviews link to decision history and how operational overviews link to procedures.
- Use `decision-records/` for the decision collection in repository/package bundles and the standalone ADR default, updating examples, links, fixture paths, and evaluation references together. Preserve record contents and existing external ADR locations.
- Document permissive reading of older `decisions/` collections and authorized migration of paths, indexes, and sources without changing their OKF version.
- Preserve the bundle root, project anchor, OKF format, and progressive loading. Inclusion-mode changes and creation of a project knowledge bundle are outside scope.

This is a bounded documentation change in the [memory-management skill](../../../skills/memory-management/SKILL.md), its [capability contract](../../specs/memory-management/spec.md), and the [ADR-writing convention](../../../skills/documentation-and-adrs/SKILL.md), including their examples and fixtures. The existing sequence is edit, validate, review, and commit locally.

## Spec Reconciliation

The owning capability contract is updated with the collection goals and optional-topic policy in this change. Verification will check skill structure, repository contracts, links, and consistency with the user's requested distinction.
