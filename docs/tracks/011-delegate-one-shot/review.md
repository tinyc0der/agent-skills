---
type: Review
title: One-shot delegation review
description: Findings and dispositions for the delegation instruction and scenario changes.
status: draft
---

# Review

Implementation revision: `6ff4dfef8f16061c4c757b2ee0cec1d44e6fa2c3`.
Author review of the diff from `0e9bac9`, the accepted track criteria, live Orca
guide excerpts, and isolated scenario artifacts. This is not independent human
approval. Fresh agents independently exercised the supplied skill scenarios.

## Findings

- **Required — blocking replies missing from the generated task packet.** The
  initial coordinated-plan scenario ended blocked work without including the
  necessary ask/reply mechanism. Fixed the owner's packet contract to require
  that mechanism before declaring an unresolved blocker. **Resolved:** a fresh
  rerun includes the mechanism in every packet and meets all eight expectations.
- **FYI — runtime capability is external.** The skill now checks for independent
  attempt-end detection, durable notifications, and resumption before promising
  automatic progression. This repository does not implement those mechanisms;
  the current live guide still requires worker-authored completion.
- **FYI — standard behavioral runner unavailable.** Authentication failed before
  evaluation. Separate fresh-session artifact evidence is explicitly identified
  and does not claim an automated Claude grading result.

## Five-axis assessment

- Correctness: handoff delivery, attempt termination, and accepted work have
  separate meanings. Explicit coordinated requests keep phase and evidence gates.
  The corrected blocking-reply scenario passes its fresh rerun.
- Readability: mode selection appears before dispatch; a compact recovery table
  identifies which observations permit action. Detailed CLI syntax stays in its
  external owner.
- Architecture: task/runner policy stays in `delegate`; live transport, authority,
  lifecycle recovery, and cleanup remain Orca responsibilities. No new watcher,
  helper, dependency, global configuration, or cached skill copy was added.
- Security: unknown liveness cannot justify another writer, cleanup, or invented
  completion. No secrets are present in the scoped diff or evidence.
- Performance: the default handoff ends without an LLM polling loop; subsequent
  assignments use artifact references and fresh sessions. The review claims no
  measured runtime or token savings.

Test selection preserves the existing coordinated-plan scenario and adds three
distinct decisions: unmonitored handoff, missing-report recovery/replay, and a
runtime capability gap. No production-code tests or wording-matching assertions
were added. The capability spec and catalog reconcile with the changed skill.

## Verdict

Approve the scoped instruction change for review: no unresolved Critical or
Required findings. All acceptance criteria have evidence in
[verification.md](verification.md), with the provider/runtime limits preserved.
Merge remains outside this task's endpoint.
