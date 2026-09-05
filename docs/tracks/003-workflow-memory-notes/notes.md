# Notes: Workflow Memory Notes

## Resume

- Phase: handoff; implementation `8f95d47a4af368486dba6ace4cbe51b9c339ffb2` is committed and locally reviewed.
- Next: run affected AI behavior scenarios after the quota reset, record their revision and outcomes, and complete the track only after verification and merge.
- Source of truth: [change spec](spec.md), [plan](plan.md), [tasks](todo.md), [verification](verification.md), [review](review.md).
- Blocker: Claude's session quota is unavailable until 18:10 local time; do not claim a behavioral pass from older runs.

## Working Notes

- Observed — The user wants the AI to write notes throughout execution, including early phases. Current guidance only creates a delta when reusable knowledge emerges.
- Superseded — The initial choice to keep the filename was replaced by the user's request for `notes.md`. Working observations remain distinct from reviewed promotion candidates.
- Observed — A Markdown path in the spec command includes its sentence-ending period inside the code span. Correct it while updating that consumer so agents do not interpret the period as part of the filename.
- Observed — The new lifecycle regression fails as intended: an early phase that only mentions promotion currently passes validation without a running-note contract.
- User clarification — Notes can suggest skill/workflow improvements, preserve knowledge, and hold ad hoc context. Record destinations and dispositions; useful suggestions do not all belong in OKF.
- User clarification — Rename the file to `notes.md`; updated the active track, command adapters, phase skills, and canonical requirements. Historical reports retain their original contents.
- Observed — Both focused regression cases were RED before the guard changes. The artifact and lifecycle suites now pass together (26 tests), and both repository guards pass with the renamed artifact.
- Observed — The new routing prompt initially selected the workflow router first; the memory skill's description omitted ad hoc notes and improvement ideas. Added that scope to the description without weakening the routing expectation.
- Observed — The resumption fixture produces `seed:start`, `test:observed 0 rows`, then `seed:complete` with exit 1 as intended. This validates the fixture's evidence, not an AI's behavior on the scenario.
- Observed — All 70 Node tests and 145 routing/fixture checks pass. Skill structure, command parity, artifact paths, lifecycle contracts, Markdown/reference links, manifest versions, and the skill-creator validator pass. Routing rank-1 rate is 87% (77/89); no older AI behavior result certifies this change.
- Review — Live consumers use `notes.md`; former names remain only in migration guidance and historical records. The note protocol preserves read-only scope, pinned targets, canonical owners, and provisional status. No implementation defect found; behavioral execution remains outstanding.

## Follow-ups and Promotion Candidates

- Workflow requirements — Reconciled into the two linked capability specs for review with this implementation; behavioral verification remains pending executor capacity.
- Follow-up — Run affected behavioral scenarios after quota reset. Track status remains open until verification follow-up and merge.
