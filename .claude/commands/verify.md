---
description: Validate a completed change against acceptance criteria and readiness gates without adding behavior
---

Invoke the agent-skills:verification-and-validation skill.

Verify the current completed change against its approved specification:

1. Freeze and report the revision or working-tree state being verified.
2. Map every acceptance criterion to concrete evidence and an evidence state.
3. Discover and run the repository's full test, build, lint, format, and type-check gates where available.
4. Exercise integrated runtime behavior at the appropriate boundary.
5. Account for applicable security, accessibility, performance, migration, compatibility, documentation, feature-flag, and observability requirements.
6. Return `PASS`, `FAIL`, or `INCOMPLETE` using the skill's verdict rules.

Persist the complete report to `docs/specs/<feature-slug>/verification.md` and copy or link the same evidence from the PR. The report must name the exact implementation revision it evaluates; do not claim that a later evidence-only commit was part of that verification.

Do not add production behavior during verification. If a check fails, preserve the evidence, invoke agent-skills:debugging-and-error-recovery, and return to `/verify` after the fix.
