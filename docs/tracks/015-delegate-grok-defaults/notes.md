---
type: Working Notes
title: Grok delegation default notes
description: Scope, runner decisions, and verification context for the Grok delegate update.
status: draft
---

# Working notes

- User authorization: support Grok in `delegate` and default to it for
  implementation and verification. Keep each role independently configurable.
- Reuse the clean linked worktree `guillemot`, branch
  `orca/delegate-default-grok-impl`, starting at `7773fdf`. The primary checkout
  stays on `main`.
- The existing skill defaults both roles to OpenCode. The repository already
  documents Grok Build in `docs/grok-setup.md`; no new runtime helper is needed.
- Eval 1 overrides implementation with Antigravity and uses the default verifier;
  update only its verifier expectation. Eval 4 explicitly requests OpenCode for
  both roles and must retain that mapping.
- Destination confirmed as `tinyc0der/agent-skills`, remote `orgin`, base `main`,
  with write access and no existing PR for this branch.
