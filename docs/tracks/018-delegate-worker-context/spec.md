---
type: Change Specification
title: Preserve worker and reviewer context during delegated repairs
description: Keep bounded follow-ups in separate implementation and reviewer sessions while preserving required independent verification.
status: draft
role: task
workflow_status: in_progress
---

# Delegate worker context

The user approved reusing the implementation session for bounded review fixes
and routine verification, then approved reusing the reviewer's own session for
bounded rereviews. The first review starts fresh and stays separate from the
implementation conversation.

## Scope and acceptance

1. Routine checks and acceptance verification run in the implementation session.
   Reports identify this as self-verification and retain the existing evidence
   and readiness requirements.
2. Bounded review fixes return to the original implementation session by default.
   Each assignment has a current target, findings, scope, checks, and stopping
   condition. New assignments do not reuse settled Task or Dispatch identities;
   retries follow the live recovery contract.
3. A separate fresh verifier is required by an explicit user or project rule,
   a high-risk change, or missing or unreliable evidence found during review.
   Explicit runner and session choices retain precedence.
4. Initial review starts in a separate fresh session. Bounded rereviews reuse
   that reviewer after required verification passes. Each rereview checks fixes,
   all new changes, affected surrounding behavior, and current verification
   evidence, then issues a verdict for the latest target. Use a fresh reviewer
   when the original is unavailable, its context is too large or unreliable,
   scope changes substantially, or the user or project requires one. The reviewer
   and independent verifier do not edit code.
5. Runtime retention, settlement, cleanup, and single-writer rules remain intact.
   Use a fresh implementation session when the original is unavailable, its
   context is no longer usable, the scope changes substantially, or it is stuck.
   A new conversation does not reset retry limits.
6. One-shot handoffs still end at delivery. Later repairs need a new user request
   and resolved prior ownership before applying the session policy.
7. Skill instructions, the capability contract, README, and behavioral scenarios
   agree. Existing validators and routing thresholds remain unchanged.

## Work and validation

Update the policy and its direct consumers in one focused change, then run
repository checks and review the final diff. No separate plan is needed.
No runtime implementation, general lifecycle skill, plugin version, or installed
plugin cache changes are required.

| Behavior or risk | Existing coverage | Decision and reason |
| --- | --- | --- |
| Explicit independent verifier and runner override | Delegate evals 1 and 4 | Keep; update only the obsolete repair-session rule in eval 1. |
| One-shot endpoint and later ownership | Delegate eval 2 | Update later repair routing without adding supervision. |
| Unknown attempts and duplicate writers | Delegate eval 3 | Keep unchanged; conversation reuse cannot bypass recovery. |
| Ordinary reuse, risk-based verification, unavailable session | None | Add one recorded-decision fixture with these distinct policy boundaries. |
| Reviewer context, complete rereview, and explicit fresh-review rule | Delegate eval 5 | Extend the existing fixture and expectations; protect reviewer reuse without accepting stale evidence or narrowing review to old findings. |

## Spec reconciliation

Update [the delegate contract](../../specs/delegate/spec.md) with the implemented
session and verification policy. Historical tracks remain unchanged.
