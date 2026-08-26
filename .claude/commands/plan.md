---
description: Break work into small verifiable tasks with acceptance criteria and dependency ordering
---

Invoke the agent-skills:planning-and-task-breakdown skill.

Resolve the active feature bundle from the current branch. Read the approved spec from `docs/specs/<feature-slug>/spec.md` or select a module through `docs/specs/<feature-slug>/capability-map.md`, then read the relevant codebase sections. Then:

1. Enter plan mode — read only, no code changes
2. Identify the dependency graph between components
3. Slice work vertically (one complete path per task, not horizontal layers)
4. Write tasks with acceptance criteria and verification steps
5. Add checkpoints between phases
6. Present the plan for human review

Save the plan to `docs/specs/<feature-slug>/plan.md` and the durable task ledger to `docs/specs/<feature-slug>/todo.md`. When an external tracker is designated, keep `docs/specs/<feature-slug>/todo.md` as an ordered index of tracker items and lifecycle checkpoints rather than duplicating their bodies. Record the selected tracker, if any, in the plan.

For production-affecting work, initialize `docs/specs/<feature-slug>/ship.md` with rollout prerequisites, migrations, feature flags, success thresholds, monitoring, rollback triggers and steps, and owners.
