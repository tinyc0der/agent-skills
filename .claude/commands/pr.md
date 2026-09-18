---
description: Create a draft pull request or mark it ready after revision-matched verification
---

Invoke the agent-skills:git-workflow-and-versioning skill.

**Workflow notes:** For an active track, read `docs/tracks/<track-id>/notes.md` at phase entry or resume and update it when useful context changes or before handoff. Capture observations, tentative ideas, outcomes, blockers, and next actions with evidence links. Follow the memory-management running-note and document-metadata protocols; honor explicit read-only or file-scope limits and keep writes outside pinned verification or release targets.

`$ARGUMENTS` selects one additive mode:

- **`/pr draft`** — create or update a draft pull request after the approved plan or first coherent implementation commit.
- **`/pr ready`** — mark the existing pull request ready only after verification evidence matches its current head revision.

Invoking this command authorizes the scoped remote push and pull-request mutation required by the selected mode. It does not authorize merge or deployment.

## Common checks

1. Resolve the current branch, default branch, remote, head SHA, working-tree state, and any existing PR. Never guess a branch or create a duplicate PR.
2. Resolve the numbered track under `docs/tracks/<track-id>/`; read its approved spec or bug report, linked `docs/specs/<capability>/spec.md` files, plan and task ledger when present, relevant commits, and existing PR body. One PR per child feature branch; do not open a single PR for an Epic's children. Parent planning documents may use a separate docs PR.
3. Do not expose secrets or include unrelated working-tree changes.

## Draft mode

1. Require a non-default branch with at least one coherent commit. If the branch has no upstream, push that exact branch with `git push -u <remote> <branch>`.
2. Apply the existing-PR state matrix: create when none exists; update an existing draft idempotently; when an open PR is already ready, update it and explicitly convert it back to draft because editing the body alone does not change state; when it is closed or merged, stop without reopening or creating a duplicate and ask whether to start a new branch/PR.
3. Create or update a draft PR containing: objective, spec and plan links, scope, non-goals, design summary, risks, task progress, planned verification, migrations, feature flags, screenshots, observability, and rollback notes where applicable.
4. Use a temporary body file for `gh pr create --draft` or `gh pr edit`; do not interpolate an untrusted body into a shell command.
5. Report the PR URL, head revision, previous/current PR state, and missing readiness evidence.

## Ready mode

1. Require an existing draft PR and a clean working tree. If the only uncommitted change is the newly generated `docs/tracks/<track-id>/verification.md`, stage that exact file and commit it as verification evidence before continuing; otherwise stop on unrelated changes.
2. Require `docs/tracks/<track-id>/verification.md` to contain a `/verify` PASS report for the current implementation revision. Reject stale, FAIL, or INCOMPLETE evidence. A later evidence-only commit is acceptable only when the intervening diff contains evidence or administrative updates in the same track, without changing requirements, scope, acceptance criteria, or canonical specs. A parent planning PR may become ready on a completeness PASS; do not require integration PASS or attach parent PASS to a child PR.
3. Spec reconciliation: require the implemented, verified requirements in `docs/specs/<capability>/spec.md`, with links or a justified no-change disposition recorded in the track spec or bug report. Require the PR description and task state to be current, the pre-review Definition of Done profile to pass, and no known Critical or Required findings to remain.
4. Push the exact current branch if local commits are not on the remote, update the PR body with final evidence, then run `gh pr ready`.
5. Report the PR URL and head revision. Do not merge.

For missing `draft` or `ready` arguments, show usage and stop without external mutation.
