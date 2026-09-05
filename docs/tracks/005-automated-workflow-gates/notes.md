---
type: Working Notes
title: Autonomous workflow gate notes
description: Preserve the user's automation preference, policy decisions, and verification context.
status: draft
---

# Notes

## Resume

- Phase: implementation after a committed specification and plan.
- Next: update the central policy and direct human-gate consumers; preserve verification and scope boundaries.
- Sources: [spec](spec.md), [plan](plan.md), [tasks](todo.md).

## Observations and decisions

- User preference — Automate the workflow; involve the human only for critical steps the agent cannot handle itself. Apply this to the workflow's owning skills rather than creating a competing knowledge bundle.
- Baseline — Started clean at `84bf1d9`, including the user's recent Bug/Refactor/Epic/Task workflow-selection changes. Preserve that routing work.
- Finding — Routine prompts exist in specification, planning, build mode, cross-model review, and tool/release guidance. Verification gates remain required; normal technical failures should enter debugging before asking the user.
- Boundary — Automation is scoped authorization, not a claim of human review, a waiver of external policy, or permission to contact others or deploy unrelated changes.
