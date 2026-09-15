---
type: Working Notes
title: Branch worktree isolation notes
description: Scope, implementation decisions, and evidence for mandatory branch worktree isolation.
status: draft
---

# Working notes

- User requirement: create branches in linked worktrees and leave `main` in
  the primary checkout. This is a bounded policy change with explicit criteria
  in [spec.md](spec.md).
- Cause: the Git skill described worktrees only for parallel agents; Phase 2
  of the feature workflow allowed a feature branch without a worktree.
- Work location: `fix/require-branch-worktrees` in
  `/Users/maxwell/Projects/AI/agent-skills-branch-worktrees`, based on fetched
  `tinyc0der/main`. The original checkout remains clean on `main` at `d06ba0b`.
- Git worktree creation and existing-branch syntax were checked against the
  [official Git worktree documentation](https://github.com/git/htmldocs/blob/gh-pages/git-worktree.adoc)
  through Context7.
- Validation selection: use existing document and hook checks plus a disposable
  Git exercise. New tests matching policy wording would duplicate the document
  without proving that an agent follows it.
- Implemented the invariant in the Git skill, shared session policy, `AGENTS.md`,
  `CLAUDE.md`, the workflow guide, and the owning capability spec.
- Repository validators, the complete Node test suite, routing evals, plugin
  validation, and the session-start regression pass. The disposable Git
  exercise preserved the primary branch, commit, staged diff, unstaged diff,
  and untracked content while creating, reusing, and reattaching task worktrees.
- The system Python lacked PyYAML for the supplemental skill validator. Both
  skill validations and document metadata checks passed using the existing
  `uv` tool with an isolated PyYAML environment; no repository dependency changed.
- PR destination verified as `tinyc0der/agent-skills`, default branch `main`,
  with write access and no open PR or issue overlap.
- Next: commit the checked implementation, record revision-specific verification
  and review, and complete the repository's draft-PR handoff.
