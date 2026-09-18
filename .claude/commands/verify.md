---
description: Validate a completed change against acceptance criteria and readiness gates without adding behavior
---

Invoke the agent-skills:verification-and-validation skill.

**Workflow notes:** For an active track, read `docs/tracks/<track-id>/notes.md` at phase entry or resume and update it when useful context changes or before handoff. Capture observations, tentative ideas, outcomes, blockers, and next actions with evidence links. Follow the memory-management running-note and document-metadata protocols; honor explicit read-only or file-scope limits and keep writes outside pinned verification or release targets.

Verify the current completed change against its approved specification. Child tracks use Feature verification. An initiative parent **planning** PR verifies artifact completeness (map, initiative spec, child index, stubs), not integration. An initiative parent **integration** PR verifies the assembled revision (remote default-branch head with required children merged); child PASS reports are citations, not a substitute.

1. Freeze and report the revision or working-tree state being verified.
2. Map every acceptance criterion to concrete evidence and an evidence state.
3. Discover and run the repository's full test, build, lint, format, and type-check gates where available.
4. Exercise integrated runtime behavior at the appropriate boundary.
5. Account for applicable security, accessibility, performance, migration, compatibility, documentation, feature-flag, and observability requirements.
6. Return `PASS`, `FAIL`, or `INCOMPLETE` using the skill's verdict rules.

Spec reconciliation: compare the track's spec or bug report with the affected `docs/specs/<capability>/spec.md` files. Require verified requirement changes in the implementation PR, or a justified no-change disposition for unchanged contracts. Deferred and canceled proposals remain in the track. Canonical spec changes invalidate affected evidence; report missing reconciliation as incomplete verification or a Required review finding.

Persist the complete report to `docs/tracks/<track-id>/verification.md` and copy or link the same evidence from the PR. The report must name the exact implementation revision it evaluates; do not claim that a later evidence-only commit was part of that verification.

Do not add production behavior during verification. If a check fails, preserve the evidence, invoke agent-skills:debugging-and-error-recovery, and return to `/verify` after the fix.
