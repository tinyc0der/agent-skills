---
type: Review
title: Branch worktree isolation review
description: Review findings for the mandatory worktree policy at the recorded implementation revision.
status: draft
---

# Review: Approve

Implementation revision: `e9b23874fd7ac1ba2db4f942a2bee9dba1b1d429`.
Author self-review; no independent or human approval is claimed.

## Evidence and findings

Reviewed the full implementation diff against [spec.md](spec.md) and
[verification.md](verification.md).

| Axis | Assessment |
| --- | --- |
| Correctness | Every new work branch requires a linked worktree, including when starting from another linked worktree. Existing task worktrees are reused and the primary/default branch mapping is checked before commits and handoff. |
| Readability | One procedure in the Git skill owns inspection, creation/reuse, preservation, directory selection, and cleanup. Entry points state the invariant and route there. |
| Architecture | Uses the existing skill and session hook, with the owning capability reconciled. No new skill, command adapter, or shell interceptor. |
| Security and data preservation | Instructions prohibit destructive cleanup or blind stashing to satisfy the rule. The disposable exercise preserved staged, unstaged, and untracked work. |
| Performance | Markdown-only change with no runtime dependencies. Both skills remain within the skill-anatomy size guidance. |

No Critical or Required findings remain. Existing repository checks and the
manual Git exercise are proportionate to this instruction change; tests that
assert exact wording would not establish agent compliance. Independent agent
behavior was not evaluated.

The draft-PR handoff is the current endpoint. Merge retains the repository's
authorization and external review gates.
