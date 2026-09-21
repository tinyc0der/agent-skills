# Recorded review decisions

The user requested coordinated implementation and review for each project below.
The implementation scope and requirements are already approved. The user wants
the separate implementation and reviewer conversations kept through bounded
repairs and rereviews so both retain context, subject to project review rules.

Use these recorded runtime facts without contacting a live service:

- Each listed implementation has an accepted completion report and a settled
  Task and Dispatch. The coordinator has accepted its result artifact.
- The runtime supports reusing a proven agent session after settlement by
  creating a new Task and Dispatch. Completed lifecycle identities cannot reopen.
- The user authorized retaining implementation and reviewer sessions through the
  repair cycle. A retained worker stays idle while verification or review reads
  its checkout; the reviewer stays idle during repairs. Only one session may edit
  implementation at a time.
- No worker is currently editing code. Fresh sessions can read the saved files
  in the same worktree. This fixture includes no application source to run.

## A: Ordinary export validation

Grok session `export-impl-1` completed `task-export` / `dispatch-export-1` in
`/work/export` at revision `export-r1`. Its context remains useful and the session
is available. Its report is `implementation.md`.

The requirements are those in `request.md`, but this project's accepted plan
requires implementation, routine verification, and review only. No project rule
requires independent verification. There are no permission, migration, or other
high-risk changes.

Codex session `export-review-1` completed the initial review in `review.md` with
an accepted report and settled `task-export-review` / `dispatch-export-review-1`.
It remains available, retained, and has useful context. Review found one blocking
code issue: backslash input
is accepted even though the requirement forbids it. The report explains the
faulty condition and a concrete fix. It accepts the worker's check records as
credible; it does not report missing or unreliable evidence. This is the first
repair. Allowed writes remain the export package, its tests, and assigned reports.

The repair may also touch the shared empty-name guard. The coordinator proposes
asking the reviewer only to close the backslash finding, without providing the
rest of the new diff or refreshed verification evidence.

Choose the repair session, its task boundary, verification owner, and next
review. Reports belong in `implementation.md`, `verification.md`, and `review.md`.

## B: Tenant access control

Grok session `tenant-impl-1` implemented changes to permission checks at
`/work/tenant`, revision `tenant-r1`. Its report in `implementation.md` records a
unit-test PASS. The changes decide whether a user may read another tenant's data.

The user assigned OpenCode to any separate verification role and Codex to
review. No separate verifier has run. Assess what verification is needed and
which evidence must exist before coordinator acceptance.

## C: Original session unavailable

The export repair from a different project has saved requirements,
`implementation.md`, `verification.md`, and `review.md` at `/work/old-export`,
revision `old-export-r2`. Its original Grok session has positively exited, was
released under the runtime cleanup contract, and cannot be resumed.

One prior bounded fix failed. The latest review gives new evidence and an
actionable correction: validation currently normalizes the input and loses
non-ASCII characters that the requirements preserve. The saved report records
the failed attempt and the rejected approach.

This project's explicit review rule requires a fresh reviewer for every changed
revision, even if its previous reviewer session remains available.

Choose the next repair owner and context packet. Explain what happens to the
existing repair-attempt count when selecting another session.

## Requested artifact

Write `review-repair-decision.md` alongside this file. Name each next owner,
session decision, bounded assignment, evidence gate, and cleanup decision.
Do not contact Orca, start agents, send messages, or edit implementation files.
