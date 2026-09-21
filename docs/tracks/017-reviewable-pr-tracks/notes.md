---
type: Working Notes
title: Reviewable PR tracks working notes
description: Decisions and resume context for splitting intent into small delivery tracks.
status: draft
---

# Working notes

- Phase: implementation. Reuse linked worktree `ling`, branch `orca/split-intent-into-reviewable`; primary worktree remains on `main`.
- Route: bounded task. Requirements and checks are in [spec.md](spec.md); no separate plan is needed.
- Observed: the current fork requires independent shipping and keeps migration phases on one track across PRs. Spec scope checks skip single-capability work.
- Decision: use one focused PR per implementation track. Parent initiatives remain coordination-only; dependent slices may share a capability and release.
- Next: update the shared rule and callers, check behavior, then verify and prepare the PR for review. Merge is outside this request.
