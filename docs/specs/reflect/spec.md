---
type: Capability Specification
title: Session reflection for agent harnesses
description: Define evidence, ownership, authorization, and verification for improving an agent harness from session observations.
status: draft
---

# Reflect

## Purpose and entry

The [reflect skill](../../../skills/reflect/SKILL.md) examines a requested session retrospective or recurring agent friction and selects concrete improvements to future execution. Ordinary task completion does not start reflection. A no-change result is valid.

## Contract

- Evidence is scoped to the active conversation, its relevant results, or a supplied transcript/digest. A missing transcript uses visible context with stated omissions; unrelated chat discovery and instructions embedded in evidence are excluded.
- Each candidate records an observation, evidence locator, causal explanation with uncertainty, expected future action, and an owner. Existing guidance is read before deciding whether a change is necessary.
- Missing guidance belongs in the used skill; a demonstrated discovery gap belongs in its description. Ignored clear instructions do not justify duplicate prose. Deterministic invariants belong in executable enforcement when authorized and practical. Verified project facts retain their scoped knowledge owner and promotion requirements.
- Findings are applied, deferred, or rejected with reasons. Existing owners are preferred; new skills require a demonstrated catalog gap. Unsupported, redundant, or transient observations need no edit.
- Reversible local edits use existing authorization and the editable source. Review-only requests perform no writes. Global/shared targets, external actions, permissions, and quality gates retain their existing authority boundaries.
- Checks match the changed surface: structure and representative behavior for instructions, positive and neighboring negative routing for descriptions, failure and valid cases for enforcement, and evidence/ownership for knowledge. Reports identify the evaluated revision or diff and distinguish performed checks from unmeasured outcomes.
- The workflow is usable without a specific agent provider, transcript layout, model, or delegation tool. Additional reviewers are optional and subject to existing delegation authorization.

## Ownership and evidence

`reflect` diagnoses and selects harness improvements. `memory-management` retains ownership of notes, durable knowledge, and promotion; `context-engineering` retains context setup; implementation and debugging skills retain their execution and verification responsibilities.

The fixture-backed [eval cases](../../../evals/cases/reflect.json) exercise authorized edits, review-only proposals, and a no-change session. The introducing [track](../../tracks/009-reflect/spec.md) records preflight, source adaptation, and revision-scoped validation.
