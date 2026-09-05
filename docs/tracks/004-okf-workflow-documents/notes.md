---
type: Working Notes
title: Workflow document metadata notes
description: Preserve decisions, observations, and next actions during the header adoption.
status: draft
---

# Notes: OKF Workflow Documents

## Resume

- Phase: local checks and artifact audit complete; live AI behavioral evidence is pending.
- Next: run affected behavioral scenarios when executor capacity returns, record fresh evidence, and keep the track open until verification and merge.
- Sources: [spec](spec.md), [plan](plan.md), [tasks](todo.md), [verification](verification.md), [artifact audit](review.md).

## Notes

- Decision — The user approved the proposed common header. Required fields are type, title, and description; workflow progress and verification outcomes keep their existing meaning.
- Observed — The pinned OKF v0.2 specification permits custom types and fields, free Markdown bodies, and document-relative source paths. No new external dependency is needed for this change.
- Decision — Add only known descriptive metadata to historical files and preserve their bodies. Do not infer authors, review events, maturity, or completion from existing prose status labels.
- Observed — The preceding memory change's behavioral evaluation remains incomplete because of a previously reported executor quota reset at 18:10 local time. Check the current time before considering a new attempt.
- Observed — At 10:15 UTC, the reported 11:10 UTC reset had not occurred. No new executor attempt was made.
- Decision — Shared frontmatter belongs to whole workflow documents; task subsections, ephemeral release previews, and skill/command configuration keep their existing formats.
- Observed — YAML parsing validates all 23 current spec/track documents and nine embedded examples. All 17 historical bodies in tracks 001–003 exactly match baseline `8734e98`; their new headers contain only type, title, and description.
- Observed — All 70 Node regression tests and 146 routing/fixture checks pass, with rank-1 rate 88% (79/90). Skill structure, command parity, lifecycle, artifact paths, Markdown/reference links, versions, and whitespace checks pass. The memory skill remains self-contained at 499 lines.
- Follow-up — Execute the extended creation/resumption cases and new metadata-preservation case after executor capacity returns; static parsing does not certify an AI's behavior.
- User correction — documentation-and-adrs needs explicit authoring guidance beyond its shared hook. Added an authoring workflow, maturity/progress/decision distinctions, historical preservation checks, and OKF-versus-external ADR handling.
- User request — Audit all other artifacts. Found additional saved idea/intent briefs and specialist report outputs; add headers when saved as standalone workflow documents, while preserving conversational fragments, native evidence, reserved indexes/logs, and established external homes.
- Applied — Updated saved brief producers, three specialist report personas, performance ledgers, runbook guidance, and the migration guide. The idea initializer creates only a directory and needs no document-template change. All 46 existing workflow hooks (16 phase skills and 30 command adapters) reference both shared protocols.
- Observed — Behavioral dry-runs enumerate eight memory-management cases and two documentation-and-adrs cases. The new mixed-format case checks that an external ADR collection retains its native convention while a track plan receives metadata; the original ADR case keeps its original single-file fixture input.
- Disposition — The requested skill/workflow improvements are applied to their owning files and reconciled into capability specs. No knowledge-bundle promotion is needed. Remaining uncertainty is live AI compliance with the instructions; local checks do not certify it.
- Observed — Implementation committed at `7bca7466d46383680ca26f1d26934c3a87de9128`. Verification and artifact-audit reports pin that revision; subsequent evidence-only documentation does not expand its coverage.
