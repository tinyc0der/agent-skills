# Change Spec: Workflow Memory Notes

**Status:** Implemented locally; behavioral evaluation and merge remain pending.
**Capabilities:** [Memory management](../../specs/memory-management/spec.md), [Feature development workflow](../../specs/feature-development-workflow/spec.md).

## Objective

Use `notes.md` as the AI's running notes throughout an active track, preserving context for the next step or session. The user requested this broader role and the shorter filename for knowledge, skill/workflow improvements, and ad hoc context.

## Requirements

- Read the active track's notes at entry to every workflow phase and on resume. Write useful discoveries, concise decision rationale, hypotheses, attempts and outcomes, blockers, and next actions as work proceeds.
- Rename the active note file to `notes.md` and update live references and artifact checks. On resumption of older tracks, preserve and migrate existing notes only within an authorized edit; historical evidence remains intact.
- Keep a current resume checkpoint and clearly label working notes versus verified candidates for permanent knowledge. Notes do not override specs, tasks, evidence, code, or explicit user instructions.
- Update at meaningful discoveries, phase transitions, and before pause, handoff, or context compaction. Do not require a write after every tool call or generate empty entries.
- Link authoritative plans, tasks, specs, and evidence rather than duplicating their full contents. Keep hypotheses and failed experiments out of permanent knowledge unless verified reusable lessons emerge.
- Capture suggestions for skill and workflow improvements, reusable knowledge, and ad hoc notes. Triage useful items into their appropriate project files, a follow-up track/task, or track-only context; a note does not authorize an out-of-scope change.
- Use the notes throughout discovery, specification, planning, build, testing/debugging, verification, review, PR transitions, release, and cleanup. Before a track exists, retain discovery in its authorized brief and link it when a track is created.
- Preserve read-only/no-op requests and pinned release revisions. Record release notes in an authorized track workspace or follow-up documentation change without modifying the pinned target.

## Acceptance Criteria

- The memory skill provides a concise running-note format and a read/update/resume workflow distinct from knowledge promotion.
- Lifecycle skills and all command adapters use that workflow throughout the track, including specification and planning.
- Deterministic checks guard the note contract, and a focused behavioral fixture tests resumption and hypothesis handling. Unavailable executor capacity is reported honestly.

## Spec reconciliation

Reconciled [memory management](../../specs/memory-management/spec.md) with the running notebook, rename/resumption rules, evidence labels, and improvement destinations. Reconciled [feature development workflow](../../specs/feature-development-workflow/spec.md) with note consumption and updates across phases and the pinned-target boundary. Local checks pass; AI behavioral evaluation remains pending executor capacity. This track stays open until the remaining verification and merge.
