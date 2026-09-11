---
type: Working Notes
title: Autonomy human attention notes
description: Preserve the accepted escalation distinctions, implementation scope, and verification context.
status: draft
---

# Notes

## Resume

- Phase: bounded requirements recorded; implement the central policy and its consumers, then verify and review.
- Sources: [spec](spec.md), [existing autonomy policy](../../../skills/using-agent-skills/SKILL.md#autonomous-execution-and-critical-human-gates).

## Decisions and observations

- User decision — Multiple approaches warrant a question only when their consequential trade-offs remain unresolved by established intent or delegated judgment. Routine technical choices stay autonomous.
- User decision — Serious incidents need prompt visibility even when the agent can fix them; notifications and requests for decisions have different timing and stopping behavior.
- Review baseline — Clean `main` at `a7dbd15f6634af3c9555f1f050de98a7250f954b`. Core commands already preserve autonomy, but orchestration/comparison guidance and Copilot examples retain manual defaults.
- Verification design — Existing structural checks miss semantic contradictions. Reuse existing behavioral cases and add only focused dialogue cases covering consequential choice and urgent notification; no runtime code or new validator is needed.
- Scope — This updates reusable policy in its existing home, with no new skill or knowledge bundle and no remote publication.
