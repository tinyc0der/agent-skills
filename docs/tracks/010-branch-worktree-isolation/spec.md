---
type: Change Specification
title: Require worktrees for branch creation
description: Keep the primary checkout on the default branch and isolate every new branch in a linked worktree.
status: draft
workflow_status: awaiting_merge
---

# Require worktrees for branch creation

## Scope and route

Bounded task: tighten the existing Git workflow and its entry points. The user
reported agents creating a branch from `main` in the primary checkout and
requested mandatory worktrees with `main` left in the main worktree.

The Git skill currently limits worktree guidance to parallel agents, and the
feature workflow accepts a branch or a worktree. Update those instructions,
the shared session policy, and repository rules together. This change adds
instruction and verification gates; it does not install a Git command hook.

## Acceptance criteria

1. Every new work branch uses a linked worktree, including solo work and small
   documentation edits. The primary worktree stays on `main` or the repository's
   configured default branch; branch creation never switches that checkout.
2. Agents inspect existing worktrees, reuse a matching branch's worktree, use an
   explicit base when creating a branch, and perform edits and commits in the
   linked directory. Existing unrelated changes and worktrees are preserved.
3. The Git skill, session policy, repository rules, and feature workflow agree
   on the requirement and verify both the primary and working branch locations.
4. Relevant repository validators and the session-start regression pass. A
   disposable Git exercise verifies the documented creation, reuse, and
   preservation behavior without mutating another person's checkout.

## Spec reconciliation

Owner: [Feature Development Workflow](../../specs/feature-development-workflow/spec.md).
Updated its Lifecycle contract with the verified branch/worktree invariant in
this implementation change. The detailed procedure remains in
`git-workflow-and-versioning`.
