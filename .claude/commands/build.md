---
description: Implement the authorized scope autonomously with per-task checks and commits; use "step" for one task.
---

Invoke agent-skills:incremental-implementation and agent-skills:test-driven-development. For non-trivial case selection, also invoke agent-skills:test-case-design-review.

**Workflow notes:** For an active track, read `docs/tracks/<track-id>/notes.md` at phase entry or resume and update it when useful context changes or before handoff. Capture observations, tentative ideas, outcomes, blockers, and next actions with evidence links. Follow the memory-management running-note and document-metadata protocols; honor explicit read-only or file-scope limits and keep writes outside pinned verification or release targets.

## Modes

- **`/build`** — execute the authorized task scope in dependency order, with checks and a commit per slice.
- **`/build auto`** or **`/build all`** — explicit aliases for the autonomous default.
- **`/build step`** — execute exactly one pending task, then return its evidence and next action.

`$ARGUMENTS` may narrow the task scope. An explicit request for one task or a stepwise checkpoint takes precedence over the default; do not treat an unknown argument as authorization for unrelated tasks. `/build` authorizes implementation and local commits, not an unrequested push, merge, deployment, or message to another person.

## Per-task loop

Pick the next pending task from the plan, or the bounded defect from the active bug report when no plan is needed. Then:

1. Resolve the active numbered track and its authorized `docs/tracks/<track-id>/spec.md` or `docs/tracks/<track-id>/bug.md`; read the affected `docs/specs/<capability>/spec.md` files. Use `docs/tracks/<track-id>/plan.md` for the task-list target when present; a bounded bug may use its report's acceptance criteria directly.
2. Read the task's acceptance criteria and load only the relevant code, patterns, and types.
3. Apply `test-case-design-review`'s test admission gate. For each materially changed contract or credible failure risk not already covered, write and run the smallest suitable failing behavior test (RED) through `test-driven-development`. If no new test is warranted because the change has no behavioral impact or existing coverage is sufficient, record why and identify the appropriate focused executable check; do not invent a test so the task has one.
4. Implement the minimum required change. For behavior, make the admitted or existing failing test pass (GREEN), then run the focused check.
5. Refactor while the focused check remains green.
6. Run the repository's affected and full regression tests, build, lint, formatting, and type-check gates where available.
7. Verify the slice at runtime when its acceptance criteria require observable behavior.
8. Apply the task acceptance criteria and the project-wide Definition of Done.
9. Update `docs/tracks/<track-id>/ship.md` when the slice changes rollout, migration, flag, monitoring, or rollback facts. Refresh `docs/tracks/<track-id>/notes.md` with useful attempts, outcomes, discoveries, improvement ideas, blockers, and the next action; label uncertainty and link evidence. Mark reusable knowledge as a promotion candidate only when warranted.
10. Spec reconciliation: incorporate verified requirement changes into `docs/specs/<capability>/spec.md` in the same PR, and record the affected paths or a justified no-change disposition in the track spec or bug report. Mark the task complete in its configured target; keep the track open until review and merge.
11. Inspect and stage only the slice's files and artifact updates, then commit with a descriptive message.

## Execute the authorized scope

1. **Resolve requirements and endpoint.** Use the selected workflow's requirement record, active numbered track, and linked capability specs. A README or canonical spec alone does not authorize new behavior. Derive routine implementation choices from the actual request and contracts; ask only for a material unresolved intent or trade-off. Preserve an explicit single-task or read-only limit.
2. **Resolve the task target.** Use the plan and `docs/tracks/<track-id>/todo.md` when needed, including an index to an authoritative external tracker. A bounded bug or ready-to-build task may use its written acceptance criteria directly. If a required tracker is unavailable, diagnose access and preserve its authority; do not silently create a competing task list. Continue work independent of that blocker.
3. **Establish a safe baseline.** Inspect Git state. Preserve unrelated work and isolate the change when practical; ask only when ownership or a conflict cannot be resolved safely. Commit the scoped requirements, plan, and task artifacts before implementation. Stage exact files and never use `git add -A` blindly.
4. **Plan when the route needs it.** Invoke agent-skills:planning-and-task-breakdown, write the plan and task ledger, check dependencies and acceptance coverage, and commit the planning artifacts. Reuse existing scope authorization instead of asking for another plan approval.
5. **Execute and checkpoint.** Run the per-task loop for each authorized task. Stop after one only in `step` mode or when the user explicitly limited the scope. Keep every planned checkpoint as an automated evidence gate; review checkpoints do not imply a new human approval.
6. **Recover from failures.** Record failed evidence, invoke agent-skills:debugging-and-error-recovery, fix within scope, reverify, and resume. Do not advance a dependent task while its prerequisite is failing or retry indefinitely without new evidence.
7. **Escalate only a critical blocker.** Ask when a material goal or consequential trade-off requires the user's judgment, necessary access or enforced approval is unavailable, an external/irreversible action exceeds authorization, or material risk cannot be contained and verified with available safeguards. Sensitive auth or permission code alone warrants focused tests and review, not an automatic human gate. Complete safe preparation and independent work first.
8. **Resume and finish.** After the user resolves a critical blocker, resume the authorized work without requiring another `/build` invocation. Report tasks, evidence, commits, unresolved limitations, and the next lifecycle step. In an end-to-end assignment, continue into verification and review within the agreed endpoint; a build-only request ends with its handoff.

Every behavioral slice applies the test admission gate and RED-GREEN-REFACTOR; adequately covered or non-behavioral work uses proportionate executable checks. Automation preserves the Definition of Done, exact-revision evidence, artifact ownership, and external authorization boundaries.
