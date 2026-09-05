---
type: Review
title: Workflow artifact metadata audit
description: Review the shared profile and every artifact producer, preserving native formats and historical evidence.
status: draft
sources:
  - resource: ./spec.md
  - resource: ./verification.md
---

# Review: Workflow Artifact Metadata

**Reviewed implementation:** `7bca7466d46383680ca26f1d26934c3a87de9128`

**Verdict:** REQUEST CHANGES — fresh AI behavioral evidence is still missing. Local review found no remaining instruction or artifact defect; the required follow-up is verification.

**Reviewer:** Codex self-review of the working diff committed at this revision. This is not an independent or human approval.

## Artifact audit

The audit inspected the repository's skills, personas, all three command adapters, workflow/migration guides, supporting references, stored specs/tracks, and artifact-producing helpers. The [shared profile](../../../skills/memory-management/SKILL.md#document-metadata-for-specs-and-tracks) owns type definitions; [documentation-and-adrs](../../../skills/documentation-and-adrs/SKILL.md#document-authoring-workflow) now explicitly applies ownership, formatting, evidence, and verification rules when writing documents.

| Artifact family | Producer or consumer | Disposition |
| --- | --- | --- |
| Capability and change specifications | spec-driven-development, context-engineering, `/spec` adapters | `Capability Specification` and `Change Specification`; canonical requirements and proposals keep separate authority. Existing repository specs now have headers. |
| Bug reports | debugging-and-error-recovery | `Bug Report`; reproduction, expected/actual behavior, workflow progress, and fix acceptance remain in the body. |
| Plans and task ledgers | planning-and-task-breakdown, build/planning adapters | `Implementation Plan` and `Task List`; one header per file. External tracker items and task subsections retain their containing format. |
| Capability maps | spec-driven-development | `Capability Map` in the full-file template; capability links and dependency ordering remain explicit. |
| Running notes | memory-management and lifecycle hooks | `Working Notes`; observations, uncertainty, resume context, and promotion disposition retain their meanings throughout the workflow. |
| Verification and code reviews | verification-and-validation, code-review-and-quality, code-reviewer | `Verification Report` and `Review`; verdicts and evaluated revisions remain independent of document maturity. |
| Launch dossiers | planning-and-task-breakdown, shipping-and-launch, ship adapters | `Launch Dossier`; pinned release targets, GO/NO-GO, deployment evidence, and follow-up writes keep their existing boundaries. |
| Saved intent and idea briefs | interview-me, idea-refine | Added `Intent Brief` and `Idea Brief` guidance for authorized saved files. Conversational output remains ordinary dialogue. |
| Security, performance, and test coverage reports | security-auditor, web-performance-auditor, test-engineer | Added `Security Audit`, `Performance Audit`, and `Test Coverage Analysis` for standalone saved reports, plus explicit evaluated revision/target and scope fields. Inline contributions and raw tool reports remain native. |
| Optimization ledgers (`PERF.md`) | performance-optimization | Added `Performance Record` for standalone ledgers. Actual measurement context and reverted attempts stay in the owning workflow record; reusable lessons still need promotion review. |
| ADRs and runbooks | documentation-and-adrs, memory-management, observability-and-instrumentation | Bundle concepts use `Architecture Decision`/`Playbook` and indexes. Existing external homes, numbering, formats, and decision status are preserved. Added explicit authoring/runbook guidance and a mixed-format behavioral case. |
| Reserved OKF indexes and logs | memory-management | Preserve the existing reserved formats; ordinary document headers do not apply. |
| Historical track documents and migration | migration guide, memory-management, documentation-and-adrs | Added descriptive headers to 17 historical files without changing their bodies or revision evidence. The migration guide now names the metadata-preservation step. |
| General guides, READMEs, changelogs, API schemas, and rules files | documentation-and-adrs and owning tools | Retain native formats. Shared workflow metadata does not turn all documentation into a knowledge bundle. |
| Skill/command configuration, PR bodies, inline release decisions, raw logs/JSON/traces/screenshots | owning runtime, command, or external system | Retain native schemas and containing-document formats; no nested or incompatible frontmatter. |
| Artifact helpers | idea-refine initializer | Creates the ideas directory and returns a JSON status; it does not write a brief template and needs no metadata change. |

## Findings and dispositions

- **Required — Pending behavioral evidence.** Static parsing, 70 regression tests, and 146 routing checks pass, but the configured AI executor is quota-blocked. Run the affected scenarios and record fresh evidence before treating behavioral verification as complete. See [verification.md](verification.md).
- **Resolved — Documentation authoring relied on a generic hook.** Added explicit ownership/format selection, maturity versus progress/decision distinctions, provenance rules, historical preservation, ADR conventions, and verification steps to documentation-and-adrs.
- **Resolved — Other saved artifacts lacked guidance.** Updated saved briefs, three specialist report personas, performance ledgers, and runbook/migration guidance. Native output formats and read-only/file-scope boundaries are explicit.
- **Resolved — Historical evidence risk.** Direct baseline comparison proves all 17 historical bodies are unchanged. No author, review event, maturity, or implementation-completion claim was inferred during header adoption.

The canonical [memory](../../specs/memory-management/spec.md) and [workflow](../../specs/feature-development-workflow/spec.md) specifications reflect the implemented document profile and producer contracts. No new runtime dependency, parser, duplicated knowledge home, or broader metadata conversion was introduced. The track stays open for behavioral verification and merge.
