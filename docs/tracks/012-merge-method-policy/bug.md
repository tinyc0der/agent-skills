---
type: Bug Report
title: Traceable pull request merge methods
description: Resolve, execute, record, and verify a merge method before completing a pull request merge.
status: draft
workflow_status: in_progress
---

# Traceable pull request merge methods

## Evidence and scope

The supplied September 16, 2026 harness review reports that FastPodcast PR #359
was squash-merged despite all three methods being available. It does not
establish the agent's reason or a pre-existing user prohibition. Source revision
`0e9bac9` discourages squashing but its Review and merge gate supplies no method
resolution procedure. The lifecycle validator passes and the Git skill's four
behavioral evals do not exercise merge method selection.

Apply a bounded harness correction in the source repository. Preserve deployed
history and the installed cache. The owner selected **rebase merges** as the
harness fallback in this conversation: linear history with rewritten commit IDs.
This does not prohibit an explicitly selected squash or merge commit.

## Acceptance criteria

1. The Git skill owns one procedure: resolve explicit user instructions and
   project policy; treat enabled methods and past PRs as availability/history,
   not preference; use the owner-selected rebase fallback when still unresolved.
2. Preserve prohibitions and their sources across delegation and handoffs.
   Keep local cleanup permission separate from PR merge-method permission.
3. Select an explicit method and pin the reviewed PR head. In the existing
   merge record, save method, policy source, target, command arguments, outcome,
   and resulting commit. Verify the actual result, including rewritten commits
   for rebase; queuing is not completed integration.
4. Continue an authorized, policy-compliant merge without repeated permission.
   Stop the affected merge for unresolved policy/availability conflicts or
   changed heads; never silently substitute or bypass repository gates.
5. Add execution evals using a local fake forge that records attempted actions:
   no-squash instruction; old squash history versus current prohibition;
   project merge policy; explicit squash; local squashing; incompatible enabled
   methods. Also cover the newly chosen default and a mismatched actual result.

## Test selection

Existing structural checks cannot observe a merge attempt. Each requested
scenario protects a different policy input or boundary. Use isolated execution
evals, with command logs and merge records as evidence, plus small fixture tests
to ensure rejected attempts remain visible and head guards work. Do not test
policy by matching Markdown phrases or implement a second policy resolver in
the fake forge.

## Spec reconciliation

Owner: [Feature Development Workflow](../../specs/feature-development-workflow/spec.md).
Update its merge contract and the lifecycle guide to reference the Git skill's
canonical procedure. The delegation skill carries the effective policy to the
integration owner without duplicating resolution rules.
