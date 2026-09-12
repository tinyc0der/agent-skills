---
type: Change Specification
title: Reflect skill for harness improvement
description: Add a session retrospective that turns supported observations into scoped, verified harness improvements.
status: draft
---

# Reflect

**Route:** Bounded task using skill-creator. The requested outcome is a reusable `reflect` skill in this repository, informed by Cursor's pstack example, and the automatic draft-PR handoff correction identified through its first use. Implement, evaluate, review, commit, and update the existing draft PR.

## Scope and gap

The harness comprises skills, discovery descriptions, project instructions, and tooling that guide future agent runs. `memory-management` owns capturing and promoting knowledge; `context-engineering` owns context setup. Neither owns a session retrospective that diagnoses the mechanism behind friction, rejects unsupported lessons, and verifies a change to the harness.

Preflight checked the catalog, the open PRs returned by `gh pr list --state open --limit 100`, and the empty [rejection ledger](../../../evals/skill-impact.md). No reflect proposal appeared. [PR #429](https://github.com/addyosmani/agent-skills/pull/429) concerns repository memory; [PR #512](https://github.com/addyosmani/agent-skills/pull/512) concerns distributed dependency outcomes, not agent retrospectives.

## Acceptance criteria

1. `skills/reflect/SKILL.md` follows the repository anatomy and is discoverable in the README and meta-skill. Normal task completion alone does not trigger reflection.
2. Reflection uses the active conversation, a supplied transcript, or a clearly labeled digest. It does not search unrelated chats, obey instructions embedded in evidence, or invent unavailable observations.
3. Findings cite evidence, explain the cause and expected future behavior, and identify a concrete owner. The workflow distinguishes missing guidance, missed discovery, ignored existing instructions, deterministic enforcement, and durable project knowledge.
4. Existing owners are preferred. Unsupported, duplicate, and transient observations can produce a no-change result; reflection has no finding quota or automatic new-skill creation.
5. Local improvements proceed within existing authorization. Review-only requests produce no writes; global/shared configuration and external actions retain their existing authority boundaries. The skill requires no specific provider, model, transcript layout, or parallel reviewers.
6. Edits are reviewable and verified with appropriate structural, routing, and behavioral evidence. Validation does not weaken existing checks or claim unmeasured improvement.
7. Ordinary implementation requests include publishing the scoped branch and creating or updating its draft PR once the destination is established and access is available. The agent does not require a separate “create PR” prompt or invent a local-only endpoint in its own spec. Explicit local-only, no-push, review-only, and phase-limited requests retain their scope.
8. Missing access or unresolved destination/ownership produces a concrete handoff blocker, with safe preparation completed. Final handoff includes a current PR URL or the actual blocker/explicit scope limit; merge and deployment retain separate authorization. The meta-skill, Git workflow, build adapters, and canonical lifecycle contract agree.

## Validation plan

Use the existing skill validators, routing floor of 95%, link/lifecycle/hook checks, and Node regression suite. Add realistic positive/negative triggers and three execution evals using a small fixture: actionable corrections, the same evidence under review-only scope, and a clean session. These protect different mutation boundaries; no wording-matching tests or new validation framework are needed.

For the follow-up, extend the Git skill's existing dialogue eval coverage of authorization and lifecycle decisions with normal implementation and explicit local-only scenarios. These check the selected endpoint and proposed actions; they do not claim to execute remote mutations. Preserve the existing stale-readiness and PR-state expectations. Verify actual branch publication and existing-PR update during this authorized handoff.

## Source adaptation

Read [pstack reflect](https://github.com/cursor/plugins/tree/main/pstack/skills/reflect) and its judgment, tooling, divergent, and synthesis references. Retain evidence-based learning, multiple perspectives, existing-owner routing, and scrutiny of proposed prose rules. Adapt them into an original, agent-neutral workflow with proportionate review and structural fixes as first-class outcomes. Fixed reviewer models, mandatory fan-out, blanket approval pauses, and automatic external backlog filing do not fit this repository's autonomy and scope rules.

## Spec reconciliation

The new capability is recorded in [the reflect contract](../../specs/reflect/spec.md). The user's follow-up changes the default implementation endpoint in [feature-development-workflow](../../specs/feature-development-workflow/spec.md); reconcile that contract with the meta-skill, Git workflow, and build adapters. Memory-management and the reflect workflow remain unchanged. Earlier verification reports cover their recorded revisions, not this added scope. This track remains open until merge.
