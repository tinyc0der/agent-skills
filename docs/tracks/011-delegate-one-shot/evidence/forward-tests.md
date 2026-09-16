---
type: Verification Evidence
title: Delegation forward tests
description: Isolated scenario results and limitations for the one-shot delegation instructions.
status: draft
---

# Forward tests

## Method and target

The repository's `materializeWorkspace` helper created disposable Git workspaces
from [the delegate cases](../../../../evals/cases/delegate.json). Each fresh native
agent received the case prompt, local fixtures, and a read-only skill copy; no
expected answers, suspected defects, or prior conversation were supplied. The
agents could write only the designated output and could not contact external
services, launch Orca workers, or delegate again.

The primary agent inspected the resulting files against the case expectations.
Git status in each completed workspace showed only the designated new file.
This is artifact review and worker-reported execution evidence, not the standard
Claude runner's archived tool trace or automated grading output. Raw generated
plans remain temporary; the observations and excerpts below are the durable record.

Initial target: `af0f062587543e3abdf7448a0179a727905a5706`, delegate skill SHA-256
`706a110f2419ef5ad78cc9b1b47fb2f316b74cc2dce4d2d8ba310abe78243ace`.
The blocking-question correction is `6ff4dfef8f16061c4c757b2ee0cec1d44e6fa2c3`,
skill SHA-256 `ad59c81fc7192c0298a44989080c6b3f2cd09df3542109ee8ad14177cdd7f7ec`.
Only the coordinated task-packet scenario is affected by that correction.

## Scenario results

| Case | Observed behavior | Result |
| --- | --- | --- |
| 1: existing coordinated plan | Preserved Antigravity implementation/fixes, independent OpenCode verification, Codex review, unchanged-target gates, shared artifacts, fresh repair sessions, and preparation-only scope. The corrected rerun includes the live blocking ask/reply mechanism in each packet before declaring a blocker. | Initial 7/8; corrected rerun 8/8 expectations met by artifact review |
| 2: one-shot handoff | Ended the parent turn on the recorded delivery receipt, named session/worktree/report destination, left task success unverified, rejected monitoring/reminders, and required a fresh repair after the prior attempt ended. | 4/4 expectations met by artifact review |
| 3: missing completion | A stayed unknown/incomplete despite a saved report; B stayed unverifiable without a duplicate, stop, or release; C was handled as replay. Recovery preserved artifacts and used fresh sessions without fabricated completion. | 6/6 expectations met by artifact review |
| 4: missing runtime capability | Marked automatic execution NOT READY while preserving the requested phase mapping; distinguished durable enqueue from independent termination detection and coordinator resumption; prepared a concrete endpoint choice. | 5/5 expectations met by artifact review |

## Decision evidence

- Case 1 initially said: "Stop after producing the assigned result, including
  when blocked." It did not include the necessary blocking ask/reply route.
  The owner skill now requires that mechanism inside the packet before declaring
  an unresolved blocker. A fresh agent's rerun included: "For a necessary
  coordinator decision, use `<live_blocking_ask_reply_mechanism>` before declaring
  the phase blocked. Preserve work while awaiting the answer."
- Case 2: "Do not poll the terminal every 40 seconds, inspect progress, or send
  a reminder." Later repair waits until the earlier attempt has settled or is
  confirmed stopped and gets a fresh OpenCode session with artifact references.
- Case 3: "The outcome remains unknown/incomplete; neither the exit nor the saved
  report establishes successful settlement or phase acceptance." Its B decision
  explicitly blocks another writer from silence; C preserves original identity.
- Case 4: "Execution: NOT READY for the requested automatic phase progression."
  It offers preserving the request pending runtime support or explicitly
  authorizing supervision; it does not silently substitute either.

## Standard runner limitation

`rtk proxy node scripts/run-evals.js --behavioral delegate` exited 1 before the
first scenario ran: `Failed to authenticate: OAuth session expired and could not
be refreshed`. No standard execution or grading result passed. Its four-case
dry-run succeeded. Credentials and runner configuration were left unchanged;
the separate forward tests above supply the instruction-level behavior evidence.

No live Orca dispatch, autonomous completion notification, or resource reduction
was measured. These scenarios validate decisions over supplied runtime facts,
not an implementation of runtime-owned lifecycle monitoring.

Final artifact review: 23/23 expectations across the four scenarios. Only case 1
needed a corrected rerun; cases 2–4 cover unchanged decision paths. Every completed
workspace, including the rerun, contains only its designated added output file.
