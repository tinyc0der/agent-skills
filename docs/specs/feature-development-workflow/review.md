# Review: Dedicated Test Case Design and Review Skill

**Verdict:** APPROVE

**Reviewed implementation target:** working tree based on `5c07d0fe41250a81b90cb6474242cc56ee95315f`, excluding this evidence update

## Overview

The change adds the supplied lean test-design workflow as a first-class project skill. It makes that skill the canonical owner of case selection, writing without TDD sequencing, pruning, and focused review while retaining RED-GREEN-REFACTOR in `test-driven-development` and broad merge assessment in `code-review-and-quality`.

## Critical issues

None.

## Required issues

None.

## Optional findings

None.

## Nits / FYI

- FYI — Open PR #409 proposes a much larger test-planner and case-specification system, while #410 proposes a TDD planner handoff. This skill deliberately stays at 146 lines and adds suite-pruning and focused-review behavior, but a future upstream PR should call out and coordinate the overlap.
- FYI — Token-backed execution of the dialogue eval remains a publication-time confidence check; deterministic, routing, and dry-run gates are green.

## Five-axis assessment

- Correctness: PASS — the skill preserves the supplied admission questions, change-type defaults, behavior partitions, layer selection, writing mode, review dispositions, and stopping condition; routing distinguishes it from TDD and general code review.
- Readability: PASS — the skill uses repository-standard sections, and duplicated selection guidance was removed from TDD and `test-engineer` in favor of explicit handoffs.
- Architecture: PASS — skills own workflow, commands own invocation, and the persona owns perspective/output. No extra slash command, helper, fixture, dependency, or routing persona was introduced.
- Security: PASS — no trust boundary, dependency, secret, permission, or executable-input behavior changed.
- Performance: PASS — the design-only behavioral eval was transferred rather than copied, and no new process-spawning deterministic test was added.

## Test-case assessment

- Add — three signature positive prompts protect design, pruning, and focused test-review routing.
- Add — two owner-backed negatives protect the TDD execution and general code-review boundaries.
- Move completed — the existing design-only matrix-pressure dialogue now belongs to `test-case-design-review`; it was removed from the TDD eval file instead of duplicated.
- Omit — no execution fixture or extra validator case was added because this skill's behavioral deliverable is the review conversation and existing structural/eval validators already catch packaging and routing regressions.
- Keep — the unchanged 56-test repository suite remains the proportionate regression gate.

## Verification story

- Tests reviewed: yes — every added, moved, or omitted eval has a distinct-defect disposition above.
- Build verified: not applicable — the repository has no build artifact for this workflow-only change.
- Full deterministic validation: PASS — see [verification.md](verification.md).
- Behavioral eval: dry-run PASS; token-backed execution NOT RUN as an optional publication-time gate.

## Disposition

No Critical or Required findings remain. The change is ready for human review; any later non-artifact edit invalidates affected evidence.

---

## Review: Copied memory-management skill

**Verdict: REQUEST CHANGES.** This separate review applies only to the imported
`skills/memory-management/` directory, not the earlier test-design change above.

**Reviewed target:** the 27 untracked imported files on branch
`feature/feature-development-workflow`, based on
`ed24989467ccfb55d0744f128249b35ede91eb24`. Tree SHA-256:
`3698c9099ee1d5100c1778289dbd1feec13aaa1844f7cc8a2d2463d27a389726`.
The digest hashes each sorted relative file path, NUL, file bytes, and NUL.
The skill files were not changed during this review.

### Required findings — open

1. **Honor established ADR locations before selecting Bootstrap or Migrate.**
   [SKILL.md](../../../skills/memory-management/SKILL.md), lines 134–138,
   recognizes only `project.md`, `steering/`, `decisions/`, and `runbooks/` under
   the prescribed memory root. A repository with existing `docs/adr/` and no
   recognized legacy homes is classified as Bootstrap; subsequent decision
   capture targets `docs/knowledge/decisions/`. That creates competing decision
   homes, contrary to this skill's canonical-location rule and
   [documentation-and-adrs](../../../skills/documentation-and-adrs/SKILL.md)'s
   explicit requirement to honor established locations and formats. Discover
   existing ADR/runbook conventions and resolve ownership before scaffolding
   or relocating those concepts.

2. **Separate producer verification from permissive consumption.**
   [SKILL.md](../../../skills/memory-management/SKILL.md), lines 322–330,
   requires every completed operation to have a v0.1 root, populated metadata,
   updated indexes, and a commit/PR. The included `unknown-version` eval instead
   requires a read-only answer from a v9.9 bundle without title, description,
   or collection indexes. Both requirements cannot be satisfied together.
   Scope generated-bundle checks to production/repair and define a read-only
   exit path that preserves imported metadata and the declared version.

3. **Make the description pass validation without displacing spec routing.**
   [SKILL.md](../../../skills/memory-management/SKILL.md), line 3,
   uses `Use whenever`, which the repository's structural validator rejects as
   a missing trigger clause. Adding this description also pushes the existing
   spec prompt “Draft a PRD with objectives and boundaries for this project”
   to rank 4, below its top-3 requirement; memory-management ranks second.
   Use a validator-compatible trigger and narrow its vocabulary to durable
   knowledge maintenance. Re-run both validators after editing it.

4. **Register and adapt the imported evals to this repository's schema.**
   [evals.json](../../../evals/cases/memory-management.json), lines 1–15,
   is outside the runner's `evals/cases/` discovery directory. All four cases
   also lack `expectations[]`; there are no positive/negative trigger cases,
   and fixture paths are relative to the imported skill rather than the
   runner's `evals/fixtures/` root. Both deterministic validation and the
   behavioral dry-run fail. Add the required case file, trigger coverage,
   expectations, and correctly mapped fixture inputs as documented in
   [evals/README.md](../../../evals/README.md).

5. **Integrate OKF examples and fixtures with Markdown-link validation.**
   [okf-v0.1.md](../../../skills/memory-management/references/okf-v0.1.md),
   lines 85 and 94, includes example links inside inline code that the current
   link checker treats as actual links. Once the import is tracked, the checker
   reports four failures: `path.md`, `/decisions/0004-auth.md`, the fixture's
   `/project.md`, and the deliberately broken `/steering/compatibility.md`.
   Put illustrative links in fenced examples and handle bundle-relative and
   intentional broken-link fixtures explicitly in validation. Preserve the
   negative fixture's meaning rather than manufacturing its missing target.

### Optional finding — open

- **Pin the versioned reference.** The links labeled “OKF v0.1 draft” point to
  the upstream mutable `main` branch. On inspection, the
  [linked specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
  declares Version 0.2, including a different provenance representation.
  Pin a v0.1 commit or versioned document to keep the local profile's derivation
  reproducible; upgrading the profile is a separate decision.

### Evidence and limits

- Baseline `node scripts/run-evals.js` in a temporary archive of HEAD: PASS,
  138 checks, zero errors, rank-1 rate 87%.
- Imported-tree `node scripts/validate-skills.js`: FAIL, one description error.
- Imported-tree `node scripts/run-evals.js`: FAIL, missing case file and one
  existing spec-routing regression; rank-1 rate 86%.
- `node scripts/run-evals.js --behavioral memory-management --dry-run`: FAIL,
  no eval case file.
- `node scripts/validate-markdown-links.js` after staging the import in an
  isolated temporary repository: FAIL, four new link errors. This check uses
  tracked files, so running it only against the untracked import would miss them.
- Behavioral agent execution was not run; workflow findings are instruction
  conflicts and scenario analysis, not observed execution results.
- Five-axis assessment: correctness and repository integration need the changes
  above; readability is adequate but the unreferenced draft duplicates the main
  skill; no concrete security or runtime-performance defect was identified.

All five Required findings remain open. Reverify affected checks and rereview
the updated skill before treating this import as ready to merge.
