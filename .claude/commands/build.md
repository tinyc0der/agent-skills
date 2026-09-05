---
description: Implement tasks incrementally — build, test, verify, commit. Add "auto" to run the whole plan in one approved pass.
---

Invoke agent-skills:incremental-implementation and agent-skills:test-driven-development. For non-trivial case selection, also invoke agent-skills:test-case-design-review.

## Modes

- **`/build`** — implement the *next* pending task, then stop (careful, one slice at a time).
- **`/build auto`** — generate the plan if needed, get a single approval, then implement *every* task without stopping between them.

`$ARGUMENTS` selects the mode. Treat `auto` (canonical) or `all` as autonomous mode; anything else (or empty) is the default single-task mode. Note: autonomous mode is not faster *per task* — it runs the same test-driven loop — it only removes the human stepping *between* tasks.

## Default: one task

Pick the next pending task from the plan. Then:

1. Resolve the active numbered track and its approved docs/tracks/<track-id>/spec.md or docs/tracks/<track-id>/bug.md; read the affected docs/specs/<capability>/spec.md files. Use docs/tracks/<track-id>/plan.md for the task-list target when present; a bounded bug may use its report's acceptance criteria directly.
2. Read the task's acceptance criteria and load only the relevant code, patterns, and types.
3. Apply `test-case-design-review`'s test admission gate. For each materially changed contract or credible failure risk not already covered, write and run the smallest suitable failing behavior test (RED) through `test-driven-development`. If no new test is warranted because the change has no behavioral impact or existing coverage is sufficient, record why and identify the appropriate focused executable check; do not invent a test so the task has one.
4. Implement the minimum required change. For behavior, make the admitted or existing failing test pass (GREEN), then run the focused check.
5. Refactor while the focused check remains green.
6. Run the repository's affected and full regression tests, build, lint, formatting, and type-check gates where available.
7. Verify the slice at runtime when its acceptance criteria require observable behavior.
8. Apply the task acceptance criteria and the project-wide Definition of Done.
9. Update `docs/tracks/<track-id>/ship.md` when the slice changes rollout, migration, flag, monitoring, or rollback facts. When the slice reveals candidate project knowledge that should survive the feature, record the fact, evidence, proposed durable destination, and status in `docs/tracks/<track-id>/memory-delta.md`; do not create an empty ledger.
10. Spec reconciliation: incorporate verified requirement changes into docs/specs/<capability>/spec.md in the same PR, and record the affected paths or a justified no-change disposition in the track spec or bug report. Mark the task complete in its configured target; keep the track open until review and merge.
11. Inspect and stage only the slice's files and artifact updates, then commit with a descriptive message.
12. Stop after exactly one task.

## Autonomous: the whole plan (`/build auto`)

Use this once a spec exists and you want to collapse plan + build into one run. It removes the manual stepping between tasks — **not** the verification. Every behavioral task applies `test-case-design-review`'s admission gate and `test-driven-development`'s RED-GREEN-REFACTOR; non-behavioral tasks use a proportionate executable check. Every task still earns verification evidence and its own commit.

1. Require approved change requirements. Resolve the active numbered track using context-engineering. Accept docs/tracks/<track-id>/spec.md or docs/tracks/<track-id>/bug.md, and read the linked docs/specs/<capability>/spec.md files. An optional docs/tracks/<track-id>/capability-map.md selects sections of the track spec. A README or a canonical spec alone does not approve a new change. If requirements are missing, use /spec for a feature or debugging-and-error-recovery for a defect.
2. **Resolve the task target.** Read `docs/tracks/<track-id>/plan.md` when present and use `docs/tracks/<track-id>/todo.md` as the durable task ledger. It may contain the checklist or an index to the designated external tracker. If the tracker is unavailable, stop instead of silently creating a second task list.
3. **Establish a clean baseline.** Run `git status --porcelain`. Approved spec, plan, and task artifacts must be committed before implementation. If only newly generated approved planning artifacts are uncommitted, stage those exact files and commit them as a preparatory commit. Otherwise stop and ask how to handle the unrelated work.
4. **Plan if needed.** If `docs/tracks/<track-id>/plan.md` does not exist, invoke agent-skills:planning-and-task-breakdown, write both `docs/tracks/<track-id>/plan.md` and `docs/tracks/<track-id>/todo.md`, present them for approval, and commit all generated planning artifacts together.
5. **Single approval checkpoint.** Present the complete plan and wait for an unambiguous affirmative such as "approve", "go", or "yes". Hedged responses do not count. Routine plan checkpoints become automated verification checkpoints in auto mode; the risk gates below still require the human.
6. **Execute every task in dependency order.** For each task, run steps 1-11 of the default loop above; do not apply its final stop instruction. Make one focused commit per task and never use `git add -A` blindly.
7. **Run every planned checkpoint.** Stop immediately when an automated checkpoint fails. Record its evidence and follow agent-skills:debugging-and-error-recovery before resuming.
8. **Stop and ask the user** (do not push through) when:
   - a test can't be made to pass or the build breaks without an obvious fix → follow agent-skills:debugging-and-error-recovery
   - the spec is ambiguous, or a task needs a decision the spec doesn't cover
   - a task is high-risk or irreversible — auth/permission changes, destructive data migrations, payments, deletions, deploys, anything touching secrets, **or anything you can't undo with `git revert`** → follow agent-skills:doubt-driven-development and get explicit sign-off before continuing

   After the user resolves a blocker, they re-invoke `/build auto` — it resumes from the next pending task.
9. **Summarize at the end:** tasks completed, verification evidence, commits made, and anything skipped, flagged, or left for the user.

If any step fails, follow the agent-skills:debugging-and-error-recovery skill.
