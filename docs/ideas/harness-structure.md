---
type: Idea Brief
title: Harness structure
description: Preserve the rationale and validation questions for the harness structure now maintained in the blueprint.
status: deprecated
---

# Harness structure

The current design is maintained in the blueprint's [Harness Design](../../blueprint.md#harness-design) section, including its [Skill set](../../blueprint.md#skill-set) subsection. This earlier exploration is superseded; the rationale and validation questions below remain useful context.

## Problem statement

How might we organize a harness so humans can understand its behavior, agents can select the right capabilities, and builders can improve one part without destabilizing the rest?

## Decision rationale

- The five families make workflow coordination, continuity, reusable methods, specialized expertise, and harness improvement explicit.
- Domain and tool knowledge share the Expertise family, with descriptive tags preserving their differences for discovery and evaluation.
- The supported design consists of skills, hooks, evals, and scripts, with references and documentation as supporting information. Commands and agent personas are outside its scope.
- The design remains independent of any repository or platform. Component responsibilities and relationships provide a common basis for comparing implementations.
- File layouts, storage schemas, installation formats, and platform integrations belong in implementation guidance. Each implementation is assessed against the same design responsibilities and principles.

## Assumptions to validate

- **The families make selection easier.** Classify varied requests and inspect missed activations, ambiguous ownership, and duplicate guidance. Simplify the taxonomy if it adds decisions without improving selection.
- **The harness can preserve the agreement.** Test conflicting guidance, revised permission, interruption, and handoff. Observe whether affected work follows the current agreement.
- **Persistent records improve continuity without excessive overhead.** Compare resumed work with uninterrupted work for accuracy, repeated investigation, and effort.
- **The chosen host can support the promised controls.** Before implementation, establish its actual interruption, permission, persistence, and recovery capabilities; scope claims to what can be demonstrated.

## Scope limits

The documented structure does not establish that all promised capabilities are implemented or verified. Validate the integrated behavior through a complete workflow before expanding the catalog or team size.
