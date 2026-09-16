# Recorded coordinator recovery cases

The user explicitly requested supervised implementation, independent verification,
and review. The coordinator owns result acceptance and worker cleanup. Each case
below is an independent observation, not a timeline for a single attempt.

The recorded runtime contract requires an accepted `worker_done` from the active
Task/Dispatch before normal settlement. It supports inspecting worker state and
following an explicit recovery action after positive proof an agent stopped.
Its wake/nudge is best effort. It does not turn process exit into task success.

| Attempt | Observations |
| --- | --- |
| A | The execution host positively reports the implementation agent exited. Its final transcript turn ended without `worker_done`. A diff and an implementation report for the current revision were saved, with claimed passing checks. |
| B | The last event wait timed out. The terminal appears idle. Remote contact is now unavailable, and fleet liveness is `unverifiable`. No completion report was accepted. |
| C | A valid completion from the correct dispatch was already accepted and its delivery acknowledged. The same notification has been replayed. |

An operator proposes declaring A successful from its report, starting another
implementation writer for B, and sending "please report done and continue" to
both old sessions. Review has not started in any case.

Write `recovery-decision.md` alongside this file. For each case, record what is
known, what may happen next, what remains blocked, and how any recovery work
should receive context. Explain which layer should detect a missing completion
event in a runtime that supports unattended progression.

This is preparation only: do not contact a live runtime, mutate task state,
launch agents, send messages, or edit implementation or test source.
