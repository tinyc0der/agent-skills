---
type: Verification Report
title: Workflow document metadata verification
description: Record local validation and missing behavioral evidence for the shared artifact headers.
status: draft
sources:
  - resource: ./spec.md
---

# Verification: INCOMPLETE

**Implementation revision:** `7bca7466d46383680ca26f1d26934c3a87de9128`

**Comparison baseline:** `8734e98` (committed requirements and plan before implementation).

The implementation was checked locally and committed at the revision above. Local validation passes; fresh AI behavioral evidence is unavailable. This report and its accompanying review/notes are evidence-only additions and do not extend coverage to another implementation revision.

## Local evidence

| Check | Result | Evidence |
| --- | --- | --- |
| Workflow document headers | PASS | PyYAML parsed all 23 implementation spec/track documents; required string fields, artifact types, maturity values, and local source paths were valid. |
| Historical preservation | PASS | All 17 Markdown bodies in tracks 001–003 match baseline `8734e98` byte-for-byte after removing the new header and its separator. Their headers add only `type`, `title`, and `description`. |
| Embedded document templates | PASS | Nine frontmatter examples parse across memory, documentation/ADRs, specification, planning, verification, review, and the reviewer persona. |
| Repository regression tests | PASS | All 70 Node tests passed across the artifact-path, Markdown-link, skill-lint, eval-runner, command, version, lifecycle, and reference-link test files. |
| Routing and fixture schema | PASS | `node scripts/run-evals.js --min-rank1 80`: 146 checks, zero errors/warnings; rank-1 rate 88% (79/90). |
| Skill structure | PASS | `validate-skills.js`: 27 skills. Skill-creator `quick_validate.py` passed for memory-management and documentation-and-adrs. |
| Command parity | PASS | `validate-commands.js`: ten commands across Claude, Gemini, and Antigravity. |
| Lifecycle and artifact paths | PASS | `validate-lifecycle-contracts.js` and `validate-artifact-paths.js`; 34 guarded path consumers. |
| Shared hooks | PASS | All 46 existing hooks (16 phase skills, 30 command adapters) reference the running-note and document-metadata protocols. No old header exemption or removed embedded-source reference remains in changed live producers. |
| Local Markdown/reference links | PASS | `validate-markdown-links.js`: 99 Markdown files at the implementation revision. `validate-reference-links.js`: 27 skills. |
| Versions and whitespace | PASS | `validate-versions.js`: manifests agree on 0.6.7. `git diff --cached --check`: clean before the implementation commit. |
| Artifact-producer audit | PASS | [Review inventory](review.md#artifact-audit) covers workflow documents, saved briefs, specialist reports, performance ledgers, ADRs/runbooks, reserved files, native outputs, and helpers. |

The new evidence documents are separately parsed and link-checked when recorded. Their metadata records no generated identity or verification event; document maturity does not change the INCOMPLETE verdict.

## Behavioral evidence

**NOT RUN.** The configured Claude executor previously reported a quota reset at 18:10 Asia/Ho_Chi_Minh (11:10 UTC) on 2026-09-05. At the 10:15 UTC clock check, that reset had not occurred. No additional executor attempt was made, and no older behavioral result is reused for this implementation.

Dry-runs successfully enumerate eight memory-management scenarios and two documentation-and-adrs scenarios. They validate invocation setup only and do not execute or grade agent behavior.

The changed behavioral coverage targets:

- Numbered change-spec creation and running-note resumption: appropriate headers while preserving authority and explicit file scope.
- Metadata adoption: nested extensions, document maturity, workflow progress, historical verdict/revision, unchanged bodies, and no fabricated provenance.
- Mixed documentation: a track plan receives metadata while the next ADR follows its existing external home, numbering, and native section format.

Run the affected behavioral suites after executor capacity returns, then record their actual results and rerun affected checks if the instructions or fixtures change. Track completion and merge remain pending; local structural checks do not prove AI compliance with the new guidance.
