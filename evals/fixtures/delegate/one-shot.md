# Accepted one-shot task

The user asked: "Use delegate to give OpenCode the approved export filename
validation task. It owns implementation and its checks. Return after handing
it over; I will inspect its report later."

The packet references the accepted requirements in `request.md`, limits writes
to the export package, tests, and `implementation.md`, and tells the worker to
save its check results there before ending. Independent verification and review
are outside this particular assignment. The worktree must stay unchanged in
this exercise; no application source is included.

The recorded `orca-cli` handoff receipt identifies worktree `/work/export`,
session `export-impl-1`, and prompt request `prompt-1`. It reports `accepted: true`
and `turn_started`. No Run, Task, or Dispatch was created. No result report is
available yet. The child's elapsed time is 12 minutes.

An operator suggests checking the terminal every 40 seconds, sending a reminder
to write the report, and keeping the same conversation for any later repair.

Write `one-shot-decision.md` alongside this file with the parent's next action,
its user-facing handoff summary, and how a later repair would be assigned.
This is a decision exercise over recorded observations: do not contact Orca,
launch sessions, send messages, or create runtime tracking state.
