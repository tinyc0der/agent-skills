---
description: Create a draft pull request or mark it ready after revision-matched verification
---

Invoke the agent-skills:git-workflow-and-versioning skill.

`$ARGUMENTS` selects one additive mode:

- **`/pr draft`** — create or update a draft pull request after the approved plan or first coherent implementation commit.
- **`/pr ready`** — mark the existing pull request ready only after verification evidence matches its current head revision.

Invoking this command authorizes the scoped remote push and pull-request mutation required by the selected mode. It does not authorize merge or deployment.

## Common checks

1. Resolve the current branch, default branch, remote, head SHA, working-tree state, and any existing PR. Never guess a branch or create a duplicate PR.
2. Read the approved spec under `specs/`, `tasks/plan.md`, the relevant commits, and existing PR body.
3. Do not expose secrets or include unrelated working-tree changes.

## Draft mode

1. Require a non-default branch with at least one coherent commit. If the branch has no upstream, push that exact branch with `git push -u <remote> <branch>`.
2. Create or update a draft PR containing: objective, spec and plan links, scope, non-goals, design summary, risks, task progress, planned verification, migrations, feature flags, screenshots, observability, and rollback notes where applicable.
3. Use a temporary body file for `gh pr create --draft` or `gh pr edit`; do not interpolate an untrusted body into a shell command.
4. Report the PR URL, head revision, and missing readiness evidence.

## Ready mode

1. Require an existing draft PR and a clean working tree.
2. Require a `/verify` PASS report for the exact current head SHA. Reject stale, FAIL, or INCOMPLETE evidence.
3. Require the PR description and task state to be current, with no known Critical or Required findings.
4. Push the exact current branch if local commits are not on the remote, update the PR body with final evidence, then run `gh pr ready`.
5. Report the PR URL and head revision. Do not merge.

For missing `draft` or `ready` arguments, show usage and stop without external mutation.
