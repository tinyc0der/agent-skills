---
type: Working Notes
title: One-shot delegation correction notes
description: Session evidence, implementation scope, and validation decisions for the delegation harness correction.
status: draft
---

# Working notes

- Evidence: the visible user report identifies repeated `--timeout-ms 40000`
  checks and extra prompts; no child transcript or resource measurements were
  supplied. The proposed policy targets those actions without claiming measured
  savings or a verified cause in an unseen session.
- User authorization: after discussing missing completion events and runtime
  ownership, the user requested "update the harness."
- Worktree: reuse `tinyc0der/fix-delegate-monitor-prompts` in `sanddollar`,
  initially clean at `0e9bac9`. The primary checkout remains on `main`.
- Apply: mode selection and fresh bounded sessions in `skills/delegate/SKILL.md`,
  catalog alignment, and behavioral coverage. Existing guidance required fresh
  verifier/reviewer sessions but did not require fresh repair sessions or stop
  default delegation from entering a supervised wait loop.
- Verified source: `orca skills get orca-cli --json` documents handoff completion
  at accepted prompt delivery. `orca skills get orchestration --json` and its
  `messaging-and-gates`, `worker-contract`, and `recovery-and-cleanup` references
  require worker-authored `worker_done`; wake/nudge is best effort. A proven
  final agent turn without its report requires recovery, not success.
- Defer: runtime-owned attempt-end detection, durable notification retries, and
  coordinator resumption. Their owner is Orca, not this Markdown skill pack.
  Verify advertised capabilities and supported APIs before a future runtime
  change; do not invent commands or install a polling wrapper here.
- Reject: extending the timeout alone, relying on a stronger reminder to the
  child, or relaunching on silence. None resolves both reported issues safely.
- Validation: retain the explicit coordinated plan case; add distinct default
  handoff, missing-report recovery, and unsupported-runtime scenarios. Use
  isolated plan artifacts with no live worker dispatch or external mutations.
- Destination: `tinyc0der/agent-skills`, base `main`, write access verified; no
  existing PR for this branch. End at a reviewed draft PR, without merge.
- The standard behavioral runner stopped before evaluation with "OAuth session
  expired and could not be refreshed." Isolated fresh-session forward tests use
  the same fixtures as separate evidence, not a claimed Claude/grader result.
- Initial coordinated-plan forward test preserved runner and acceptance gates
  but omitted necessary blocking replies from the packet, instructing workers
  to stop when blocked. Clarified the packet's stopping condition to include
  the live ask/reply mechanism before declaring an unresolved blocker. Rerun
  that scenario in a fresh session; the other three scenarios passed inspection.
