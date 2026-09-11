---
type: Change Specification
title: Clarify human attention in autonomous workflows
description: Distinguish delegated choices, blocking decisions, and urgent incident notifications while preserving autonomous execution.
status: draft
---

# Autonomy and human attention

**Route:** Bounded task. The user accepted the decision and notification distinctions and requested this update. Implement, verify, review, and commit locally; merge and release remain separate endpoints.

**Capability:** [Feature Development Workflow](../../specs/feature-development-workflow/spec.md).

## Acceptance criteria

1. Routine, reversible choices proceed within existing intent and delegated judgment. Multiple approaches alone do not create a human gate; unresolved consequential trade-offs require concrete options and a supported recommendation.
2. Missing material requirements, authority/access, consequential scope/cost/impact changes, unsafe ownership conflicts, and blockers needing human information or external change require a specific decision. Pause only dependent or unsafe work, continue safe independent work, and resume after resolution. Silence is not approval.
3. Evidence of an active production outage, suspected compromise, or ongoing data loss triggers prompt notification to the user without waiting for complete diagnosis or a finished proposal. Authorized containment and fixes can continue; notification does not expand external communication or remediation authority.
4. Critical/Required findings retain their quality gates. Technical severity alone does not require a human decision when the agent can fix and verify within scope.
5. Build adapters, orchestration guidance, comparison text, and Copilot examples reflect the autonomous default, explicit step mode, and existing endpoint limits.

## Scope and validation

Update the central skill, standalone build guidance, canonical contract, and the conflicting documentation identified in the preceding review. Reuse the existing lifecycle, command, link, skill, hook, and regression checks. Add focused dialogue evaluation coverage for the changed decision/notification boundaries; avoid wording-matching tests. Skill descriptions and routing thresholds remain unchanged.

## Spec reconciliation

Reconciled the accepted decision/notification distinctions into the linked capability specification and its skill/command consumers. Historical tracks and their evidence remain unchanged. All acceptance criteria pass focused review and the applicable repository/behavioral checks; the track remains open until merge.
