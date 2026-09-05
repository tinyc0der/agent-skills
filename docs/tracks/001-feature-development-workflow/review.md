---
type: Review
title: 'Review: Dedicated Test Case Design and Review Skill'
description: Recorded findings, dispositions, and evaluated revisions for feature development workflow.
---

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
   `skills/memory-management/references/okf-v0.1.md` at checkpoint `3474029`,
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

---

## Rereview: Memory-management fixes

**Verdict: APPROVE.** All five Required findings and the optional source-pin
finding from the import review above are resolved for implementation revision
`7fc54cb17f6c3269f9559b89495954bb91189eb2`. This supersedes the import verdict,
not the separate test-design review at the start of this file. The implementation
is in `f0d3356` and `7fc54cb`; the original import remains available in `3474029`.

### Finding dispositions

| Finding | Disposition and evidence |
| --- | --- |
| Existing knowledge homes | Resolved. Discovery checks rules, existing documentation, and `.adr-dir`; established ADR/runbook locations and formats remain canonical. The new established-homes eval preserved the ADR unchanged and created only a bundle catalog pointing to it. |
| Read-only consumption | Resolved. Separate consumption and authored-change checklists preserve imported versions and metadata. The v9.9 eval made only read-only tool calls and neither normalized files nor committed. |
| Description and routing | Resolved. The description uses `Use when` and focuses on durable memory maintenance. Structural validation and all 144 routing checks pass, including the pre-existing PRD prompt. |
| Eval registration | Resolved. Five cases now live in `evals/cases/memory-management.json`, with expectations, three positive triggers, three owner-backed negatives, and fixtures under `evals/fixtures/memory-management/`. Prompts name the materialized project scope. |
| Markdown links | Resolved. Illustrative reference links use fenced examples. Repository link validation excludes fixture inputs, whose bundle-relative and deliberately broken links remain unchanged. A regression test protects that boundary while another checks that `evals/README.md` is still validated. |
| Versioned source | Resolved. The skill, profile, and historical draft cite the pinned [OKF v0.1 draft](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/ee67a5ca27044ebe7c38385f5b6cffc2305a9c1a/okf/SPEC.md). |

### Additional issues found during verification

- The behavioral runner supplied only `SKILL.md`, leaving required local
  references unavailable. It now copies the full skill into the disposable
  workspace, names the reference base in the executor prompt, and excludes that
  tooling directory from fixture git status. A CLI-boundary test exercises an
  executor reading the actual supporting file and confirms a clean baseline.
- The first link-not-copy execution added `AGENTS.md`; its grader incorrectly
  accepted that as preserving fixture content. The revised expectation expressly
  prohibits all new files and commits, and Sync now has an explicit no-op path.
  The affected eval was rerun: only reads occurred, with no new rules file or commit.
- The first bootstrap handoff failed review presentation, and the grader also
  conflated committing a proposal with approval. The skill and expectation now
  require an explicit proposal, source evidence, and unresolved inferences while
  allowing a reviewable local commit. The rerun passed all five expectations.

### Verification evidence

- `node --test` across all eight `scripts/**/*-test.js` files: **65 tests passed**.
  The two added runner/link-checker regressions first failed against the prior
  implementations, then passed after their fixes.
- All deterministic validators passed: skills, versions, commands, reference
  links, Markdown links, artifact paths, and lifecycle contracts.
- `node scripts/run-evals.js --min-rank1 80`: **144 checks passed**, zero errors
  or warnings, rank-1 rate **88% (77/88)**. The structural and routing checks
  were rerun after the final instruction changes.
- `node scripts/run-evals.js --behavioral memory-management`: real executor and
  grader runs exercised all five scenarios. The two affected scenarios were
  rerun in isolated copies after their instruction/expectation fixes; unaffected
  scenarios were retained. Final results are below. The original full run had a
  failure and is not represented as a clean first pass.

| Behavioral case | Final result | Observed behavior |
| --- | --- | --- |
| over-saving | 3/3 | Saved the verified missing-await lesson and index entry; omitted the pool experiment and cache speculation. |
| link-not-copy | 2/2 | Read and cited the existing contract, ADR, and indexes; made no edits or commits. |
| prune-not-size | 3/3 | Superseded stale Gulp guidance from package evidence; preserved valid preferences and the playbook. |
| unknown-version | 3/3 | Read the v9.9 bundle permissively; preserved its metadata, version, and files. |
| established-homes | 5/5 | Preserved `docs/adr/`, created the required bundle with external-home discovery, explained citation portability, and handed off a proposal for review. |

Detailed grader evidence is local under ignored `evals/results/`; the table and
dispositions above retain the material findings in version control. These
behavioral runs demonstrate the selected scenarios, not a guarantee of every
future model execution. No application build is applicable to this Markdown and
Node-script change.

### Review and test scope

- Correctness: the ownership and consumption contradictions are resolved;
  no-op and bootstrap handoffs have observed behavioral evidence.
- Readability and architecture: existing owners take precedence over documented
  defaults, the historical draft is labeled, and test inputs are separated from
  repository documentation without adding a special OKF link parser.
- Security: supporting skill files stay in the disposable workspace; no remote
  writes, production changes, dependencies, or credentials were introduced.
- Performance: the added deterministic tests use local fixture processes;
  token-backed behavioral evals remain opt-in.
- Test admission: retained four imported cases for distinct memory behaviors;
  added one established-home scenario and two runner/validator regressions.
  Extended the existing documentation-root test to protect `evals/README.md`.
  Existing structural/routing checks cover the description changes, so no
  implementation-mirroring prose tests were added.

No Critical or Required findings remain in this scope. This report adds evidence
only; any later implementation change requires affected checks and review again.

---

## Review: Self-contained OKF v0.2 skill

**Implementation revision:** `8fab66cb9817f8dc2100b3a999931316c8cc2d00`.
**Static review:** no new Critical or Required findings.
**Deterministic verification:** PASS. **Behavioral verification:** PARTIAL,
because the executor service exhausted its session quota. The prior v0.1
behavioral approval above does not certify this newer revision.

The user requested extracting the useful v0.2 rules into the skill instead of
shipping a draft and a separate format profile. The skill now consists of one
391-line `SKILL.md`, replacing the previous three files totaling 872 lines.
Both `memory-draft.md` and `references/okf-v0.1.md` were removed; historical
references to the deleted profile identify its local checkpoint instead of
linking to a missing file or inventing a published repository URL.

### Design and source review

The extracted rules were checked against the pinned
[OKF v0.2 specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/62432a095456147ee71e70ac6e4dc0d2dea3ac30/okf/SPEC.md).
The main skill contains the applicable structure, provenance, review, and
freshness rules; fetching the full specification is optional. Advanced
computation and attestation workflows were not imported.

- New bundles target v0.2. Existing bundles keep their version unless an upgrade
  is authorized; the existing v0.1 fixture remains a compatibility test.
- New provenance uses `sources`, with resource references and stable footnote IDs.
  Nested YAML is supported instead of the former flat producer convention.
- Optional authorship, verification, status, and expiry metadata carry only
  known evidence. Bootstrap proposals are `draft`; a commit or source author is
  not fabricated human approval.
- Legacy timestamps and citation lists remain readable. The skill does not
  manufacture authorship to convert a legacy timestamp.
- Existing knowledge owners, no-op behavior, reserved-file rules, migration
  safeguards, and permissive consumption remain in the self-contained workflow.

### Verification and limits

- **65 automated tests passed**, with no new executable code or prose-matching
  tests added for this documentation change.
- **144 routing checks passed**, zero errors or warnings, rank-1 rate 88%.
- Skill structure, reference links, Markdown links, artifact paths, lifecycle
  contracts, and whitespace checks passed.
- Existing behavioral expectations were updated for v0.2 provenance and draft
  status. The initial saving run retained an ineffective reverted experiment;
  a focused instruction clarification restored the intended promotion boundary,
  and its targeted rerun passed without weakening the expectation.

| Behavioral case | Evidence for this revision |
| --- | --- |
| over-saving | PASS, 3/3 after the focused correction and rerun. |
| link-not-copy | PASS, 2/2; read v0.1 as supported legacy content without edits, rules-file creation, or version changes. |
| prune-not-size | PASS, 3/3 with the v0.2 fixture. |
| unknown-version | INCOMPLETE; executor stopped on its session limit before grading. |
| established-homes | NOT RUN in the v0.2 pass because the preceding quota failure stopped the runner. |

The incomplete run reported a Claude session-limit error; this is an external
verification limit, not a demonstrated skill failure. Older grading files for
the last two cases were moved to `evals/results/memory-management-v0.1/` so they
cannot be mistaken for current results. Re-run the two remaining cases when
capacity is available before claiming all five v0.2 behavioral scenarios pass.
