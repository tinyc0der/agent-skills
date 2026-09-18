---
type: Review
title: Harness review against the blueprint
description: Evidence and prioritized gaps between the existing harness and the harness design blueprint.
status: draft
---

# Harness review against the blueprint

## Verdict and scope

**Changes required to meet the blueprint.** The harness has useful skills, memory procedures, reflection, validators, and evaluation fixtures. Two runtime probes expose correctness problems in optional hooks. Seven further findings concern evidence, automation, ownership, packaging, and source tracking.

Reviewed revision: `d7bb02a7708b1790b3f03fb0915e5ca25c2fe9d5`, against [blueprint.md](../../../blueprint.md) at that revision.

During this review, the user requested a rebase onto `main`. The branch was rebased onto `af972f10622f4644e28dd36a4104393508b2690d`. All ten blueprint commits replayed without conflicts. `git range-diff` showed equivalent patches. This report includes the newer reflection, worktree, and merge-policy work brought in by that rebase.

The review covers the checked-out skills, hooks, scripts, evaluation runner and cases, package manifests, and relevant ownership documentation. Findings are review results; fixes are not part of this change. P1 means address first because work can be lost. P2 means a correctness or blueprint-conformance gap that needs a planned correction. All findings remain open.

## Findings

### R1 — Required / P1: The simplify hook changes runnable files and can discard other edits

The optional [simplify hook](../../../hooks/simplify-ignore.sh) overwrites a source file with placeholders during `Read` at line 209. Its Stop handler then copies the saved backup over the current file at line 154. Edits made through a shell, formatter, editor, or another participant do not update that backup.

In a temporary workspace, a JavaScript file ran successfully before `Read` and failed afterward with `ReferenceError: preserved is not defined`. An edit appended by another tool disappeared after Stop, which returned success. The existing hook tests pass because they focus mostly on filtering, rather than preserving the working file through the complete lifecycle.

This conflicts with the blueprint's requirements to preserve unrelated work, verify the actual result, and recover a coherent state. The hook is opt-in; this is not a claim that the default SessionStart hook loses files.

**Correction:** Present a filtered view without rewriting the working source. If an implementation must restore files, detect intervening changes and reconcile them before writing. Verify ordinary execution, outside edits, interruption, and recovery in an isolated workspace.

### R2 — Required / P2: The documentation cache can claim that stale content is current

The [cache post-hook](../../../hooks/sdd-cache-post.sh), line 82, obtains validators through a separate HEAD request after receiving the tool's content. It stores those validators with that earlier content. The [pre-hook](../../../hooks/sdd-cache-pre.sh), line 96, later reports the cached content as revalidated when those validators receive a 304 response.

A local HTTP-server probe fetched version one, changed the server to version two, and then ran the post-hook. The cache stored the version-one body with the version-two ETag. Its next read returned version one while claiming successful revalidation. The server behaved correctly.

This violates the blueprint's evidence and freshness promises. The cache is also opt-in.

**Correction:** Associate cached content with validators from the same response. When the tool cannot provide that pairing, bypass this cache path. Add coverage for a source change between the original fetch and cache storage.

### R3 — Required / P2: Behavioral evaluation results cannot be fully audited or compared later

The [evaluation runner](../../../scripts/run-evals.js) captures an execution trace at line 522, passes it to a grader, and saves only the grading result under a reusable skill/case filename at line 550. It removes the workspace at line 563. Successful runs do not save the raw execution trace, the evaluated skill revision, or a distinct run identity. Repeating a case overwrites the previous grading file.

Some historical track reports manually attach revision information. That helps those specific reports, but the runner itself cannot provide the durable evidence needed to compare a change with its baseline or inspect the actions behind a grade.

**Correction:** Preserve each run's trace and grade with the evaluated revision or content hashes, fixture identity, model/configuration, and a unique run identifier. Keep temporary-workspace cleanup, with retained evidence scoped and handled appropriately.

### R4 — Required / P2: The complete recovery and learning workflow is not demonstrated

The [runner](../../../scripts/run-evals.js), line 517, copies one selected skill and starts a separate execution for each case. The cases cover useful individual behaviors, including resumed notes and reflection. The runner does not explicitly assemble the versioned skill dependencies and hooks or drive one continuing workflow through interruption, changed human direction, recovery, and use of a verified lesson in a later session.

The blueprint explicitly requires that complete demonstration. There are 75 behavioral cases, but case count and lexical routing results do not establish this integrated behavior. Live model evaluations were not rerun during this review.

**Correction:** Add one controlled workflow scenario that exercises the blueprint's full sequence. Retain its sessions and checkpoints, and check that later work uses the corrected agreement and learned lesson. Extend coverage from observed failures rather than adding a broad generic matrix.

### R5 — Required / P2: Frequent Git operations still lack a reusable automated path

The [Git workflow skill](../../../skills/git-workflow-and-versioning/SKILL.md), lines 151 and 298, describes worktree checks and commit hygiene as steps for the agent to execute. It includes a sample lint hook, but no bundled operation for the repeated validate-stage-commit sequence. Across the 30 skill directories, the only runnable helper is [idea-refine.sh](../../../skills/idea-refine/scripts/idea-refine.sh), which only prepares the ideas directory.

Repository validation is already automated. The gap is automation used while an agent performs ordinary work. Reconstructing this sequence on each run conflicts with the new rule to automate frequent, well-defined work. The actual time and token savings have not been measured.

**Correction:** Start with a tested local-commit operation owned by the Git skill. Give it explicit scope and expected repository state, run the project's configured checks, preserve unrelated changes, and return the commit or a clear exception with completed progress. Keep semantic review and unresolved decisions with the agent. Measure effort and reliability before adding more operations.

### R6 — Required / P2: Skill packaging and its validator follow an older reference policy

Eleven of 30 skills contain `../../references/` links. For example, the [review skill](../../../skills/code-review-and-quality/SKILL.md), line 385, points to repository-level checklists. [Skill Anatomy](../../../docs/skill-anatomy.md), line 113, explicitly places shared material outside skills. The [reference validator](../../../scripts/validate-reference-links.js), line 57, accepts that layout when references are marked optional.

These optional references do not prove that a skill cannot execute alone: required minimum guidance is embedded. They still conflict with the blueprint's stricter rule that references outside a skill point only to other declared skill dependencies. A passing validator currently confirms the older policy.

**Correction:** Give shared guidance an owning skill, bundle its supporting material there, declare dependent skills, and update the authoring guidance and validator together. Keep generated project paths distinct from packaged dependencies when checking references.

### R7 — Required / P2: Workflow ownership still depends on commands and personas

The [plugin manifest](../../../.claude-plugin/plugin.json), line 11, ships command directories. More importantly, [the ship command](../../../.claude/commands/ship.md), line 17, owns specialist dispatch and report synthesis using named personas. [The PR command](../../../.claude/commands/pr.md) also maintains a detailed state transition procedure alongside the Git skill.

The blueprint puts reusable workflow coordination in skills and excludes commands and personas from the supported core. The issue is where decisions live, not merely the presence of legacy files. A skill-only installation does not carry all of the command-owned coordination, and duplicated procedures can drift.

**Correction:** Move reusable coordination and transition rules into their owning skills and automation. Reconcile the [existing workflow contract](../../specs/feature-development-workflow/spec.md), which still names command-based lifecycle entry points. Decide how to retire or retain compatibility adapters without leaving them as policy owners.

### R8 — Required / P2: The five skill families have no catalog mapping

The [catalog](../../../README.md), line 262, groups skills mainly by lifecycle phase. The skill files and discovery code do not map every skill to one primary Workflow, Memory, Method, Expertise, or Meta family. Phase labels can remain useful, but they do not provide the ownership classification required by the blueprint.

**Correction:** Add one authoritative mapping of each skill to its primary family and dependencies. Keep phase and domain/tool labels as additional discovery information. Validate the mapping and exercise ambiguous routing examples; a directory reorganization is not required.

### R9 — Required / P2: An adapted skill has no maintained source-version record

The [code-simplification skill](../../../skills/code-simplification/SKILL.md), line 8, explicitly says it was adapted from an external skill, but links to a mutable `main` path. Its directory contains only `SKILL.md`, with no adopted version, last reviewed version, local adaptation record, or update decisions. No skill directory currently has a maintenance README.

This is a concrete mismatch with the source-tracking rule. Without a known baseline, a later maintainer cannot reliably separate new source changes from our adaptations.

**Correction:** Add maintenance documentation with the known source and local changes. Recover the adopted revision from evidence where possible; otherwise mark it unknown rather than inventing it. Record the last reviewed revision and future accepted/skipped changes separately.

## Coverage against the six promises

| Blueprint promise | Existing support | Remaining evidence or gap |
|---|---|---|
| Understand the requirement | Discovery, interview, specification, and constraint skills; routing cases. | Real semantic routing across the assembled harness remains only partly assessed. |
| Deliver quality and demonstrate it | Validators, tests, verification reports, and behavioral case definitions. | R2 and R3 weaken freshness and traceability; R4 leaves integrated behavior unproven. |
| Work independently within agreed boundaries | Autonomous workflow guidance, worktree rules, merge-policy fixtures, and delegated-work procedures. | R1 violates preservation of outside edits; R5 leaves repeated execution to the agent. |
| Maintain shared understanding | Scoped knowledge, running notes, source metadata for memory, and resume fixtures. | R4 does not demonstrate continuity through a real sequence of sessions. |
| Make progress inspectable and recoverable | Commits, revision-scoped reports, checkpoint guidance, and recovery instructions. | R1 can replace current state with an older backup; R3 discards raw evaluation evidence. |
| Learn to work smarter | The reflection skill routes verified lessons to their owners and allows a no-change result. | R4 does not demonstrate later adoption; R9 prevents reliable source-update comparisons. |

The [reflection skill](../../../skills/reflect/SKILL.md) is a useful foundation already present after the rebase. It should be extended through evidence and automation where needed, rather than adding another competing improvement workflow.

## Checks and evidence

The following repository checks ran successfully on the rebased revision:

| Check | Result |
|---|---|
| `node --test scripts/*-test.js scripts/lib/*-test.js` | 74 tests passed; none failed or skipped. |
| `node scripts/validate-skills.js` | All 30 skills passed. |
| `node scripts/validate-versions.js` | Manifests aligned at 0.7.0. |
| `node scripts/run-evals.js --min-rank1 95` | 171 checks passed; rank-one routing was 104/106, reported as 98%. |
| `node scripts/validate-reference-links.js` | Passed under the existing policy described in R6. |
| `node scripts/validate-markdown-links.js` | 151 tracked Markdown files passed before adding this report. |
| `node scripts/validate-commands.js` | All 11 command families passed parity and description checks. |
| `node scripts/validate-artifact-paths.js` | All 34 checked files passed. |
| `node scripts/validate-lifecycle-contracts.js` | Passed. |
| `bash hooks/session-start-test.sh` | Passed. |
| `bash hooks/simplify-ignore-test.sh` | All 21 assertions passed. |

The hook tests and initial runtime probes ran before the rebase. A content comparison confirmed the hook files, their tests, and the evaluation runner were unchanged by it. The retained [runtime probes](evidence/runtime-probes.py) were then run on the rebased target; [their results](evidence/runtime-probes.json) reproduce R1 and R2 using temporary files and a local HTTP server.

The successful structural and lexical checks do not establish all behavioral promises. This review did not rerun the 75 live model cases, install the plugin into a host, test every skill in a live session, or measure model cost and task latency. The two runtime defects were reproduced without a live model. Review observations and automated checks are recorded separately from unmeasured outcomes.

## Suggested order

1. Correct the two optional hooks and cover their complete lifecycle.
2. Preserve evaluation traces and revision information, then demonstrate one complete recovery and learning workflow.
3. Automate the local Git happy path and measure whether it reduces effort without weakening checks.
4. Align ownership, packaging, family mapping, and source tracking with the blueprint. Update the existing validators alongside those changes.

No implementation correction is included in this review. Findings remain open until their fixes are verified against a new revision.
