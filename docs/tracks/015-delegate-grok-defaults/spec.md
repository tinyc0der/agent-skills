---
type: Change Specification
title: Grok defaults for delegated implementation and verification
description: Add Grok to the delegate runner choices and use it for implementation and independent verification by default.
status: draft
workflow_status: in_progress
---

# Grok delegation defaults

## Scope

The user requested Grok support in `delegate` and Grok defaults for implementation
and verification. This bounded task updates the existing skill, its capability
contract, and affected eval expectations. Orca transport and installed plugin
copies are outside this repository change.

## Acceptance criteria

1. `delegate` lists Grok as a runner. Implementation, tests, fixes, and independent
   verification default to Grok, with a fresh session for each phase or repair.
2. Specification, planning, and independent review still default to Codex.
3. User choices take precedence over project mappings, then skill defaults.
   An override for one role changes only that role. OpenCode and Antigravity
   remain available alternatives; model settings and dispatch checks are kept.
4. Discovery text, examples, and existing eval expectations match the new policy.
   Existing one-shot, completion, and evidence gates remain intact.

## Implementation and verification

Update the runner policy and its affected evals in one increment. Use the
repository validators, trigger/routing suite, and a focused manual policy review.
No new script or test suite is needed for this instruction-only change. Review
and publish the scoped PR under the repository workflow; merging is a separate
endpoint.

## Spec reconciliation

Update the runner policy in [the delegate contract](../../specs/delegate/spec.md)
alongside [the skill](../../../skills/delegate/SKILL.md). Live runner availability
still depends on the selected Orca launch path; this change does not certify a
live Grok dispatch.
